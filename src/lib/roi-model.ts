/**
 * FLO MMR ROI model — pure, synchronous, framework-free calculation.
 *
 * This is a forward-running inversion of the retrospective cost model that ships
 * in FLO Mission Control. KEEP THE §3.1 CONSTANTS IN LOCKSTEP WITH:
 *   mission-control/backend/services/analyticsReport/costAnalysisService.ts (DEFAULT_LABOR_CONFIG)
 *   mission-control/backend/services/analyticsReport/chartDataExtractor.ts   (ROBOT_PAYLOAD_KG = 500)
 * If either recalibrates payload/ratio/multipliers, change both. See ROI_CALCULATOR_SPEC.md §9.
 *
 * No UI, no side effects. All times in minutes, money in INR, rates per day.
 */

export interface ROIInputs {
  materialPerDayTonnes: number; // Q
  haulDistanceM: number; // d — one-way haul distance
  labourDailyWage: number; // w
  workingDaysPerMonth: number; // D
  productiveHoursPerShift: number; // H
}

export interface ROIConstants {
  // §3.1 — inherited from the production model (must stay in lockstep with backend)
  payloadKg: number; // p
  payloadRatio: number; // k  (MMR : wheelbarrow)
  laborersPerWheelbarrow: number; // n_wb
  laborersLoadingMMR: number; // n_L
  laborersUnloadingMMR: number; // n_U
  loadingTimeMultiplier: number; // m_L
  tripTimeMultiplier: number; // m_T
  unloadingTimeMultiplier: number; // m_U
  returnTripTimeMultiplier: number; // m_R
  // §3.2 — machine cycle constants (PLACEHOLDERS — FLO to confirm before launch, §8)
  mmrLoadingTimeMin: number; // t_L
  mmrUnloadingTimeMin: number; // t_U
  haulSpeedMPerMin: number; // v
  monthlyRentalPerMMR: number; // C
  operatorDailyWage: number; // w_op
}

export interface ROIResult {
  // Robot-side intermediates
  robotTripsPerDay: number; // N_r
  robotCycleMin: number; // T_r
  robotHoursPerDay: number; // h_r
  fleetSize: number; // n  (derived output, minimum 1)
  // Wheelbarrow baseline intermediates
  wheelbarrowTripsPerDay: number; // N_w
  wheelbarrowCycleMin: number; // T_w
  manualManHoursPerDay: number; // M_w
  hourlyRate: number; // r
  // Cost breakdown (per day)
  costManualPerDay: number;
  costRentalPerDay: number;
  costLabourPerDay: number;
  costOperatorPerDay: number;
  costRobotPerDay: number;
  // Headline outputs
  dailySavings: number; // S_d
  monthlySavings: number; // S_m
  costReductionPct: number;
  manHoursSavedPerDay: number; // ΔM
  laborersFreed: number;
  wallClockHoursSavedPerDay: number; // Δt
  // Status / edge-case signalling
  isProfitable: boolean;
  breakevenDailyVolumeTonnes: number | null; // set only when not profitable
  longHaul: boolean; // d > 1000 m
}

/** §3.1 + §3.2 constants. Frozen so nothing mutates them at runtime. */
export const DEFAULT_CONSTANTS: ROIConstants = Object.freeze({
  // §3.1 — do not change without changing the backend model too
  payloadKg: 500,
  payloadRatio: 4,
  laborersPerWheelbarrow: 2,
  laborersLoadingMMR: 1,
  laborersUnloadingMMR: 1,
  loadingTimeMultiplier: 1.2,
  tripTimeMultiplier: 1.6,
  unloadingTimeMultiplier: 1.2,
  returnTripTimeMultiplier: 1.1,
  // §3.2 — PLACEHOLDERS. Replace with measured fleet medians before launch (§8).
  mmrLoadingTimeMin: 6,
  mmrUnloadingTimeMin: 3,
  haulSpeedMPerMin: 40,
  // Actual billed rate used IN the calculation. The site also shows a list price
  // (MMR_RENTAL_LIST) struck through next to this effective rate — the maths always
  // uses this number, never the list price.
  monthlyRentalPerMMR: 40000,
  operatorDailyWage: 900,
});

/**
 * List price for the MMR rental, shown on the site (struck through) next to the
 * effective rate. Display only — the calculation uses DEFAULT_CONSTANTS.monthlyRentalPerMMR.
 */
export const MMR_RENTAL_LIST = 60000;

/** §3.3 defaults (mirror the backend defaults). */
export const DEFAULT_INPUTS: ROIInputs = Object.freeze({
  materialPerDayTonnes: 40,
  haulDistanceM: 150,
  labourDailyWage: 650,
  workingDaysPerMonth: 26,
  productiveHoursPerShift: 9,
});

/** §3.3 bounds — enforced on both slider and numeric entry. */
export const INPUT_BOUNDS: Record<keyof ROIInputs, { min: number; max: number }> =
  Object.freeze({
    materialPerDayTonnes: { min: 1, max: 500 },
    haulDistanceM: { min: 10, max: 2000 },
    labourDailyWage: { min: 200, max: 5000 },
    workingDaysPerMonth: { min: 1, max: 31 },
    productiveHoursPerShift: { min: 1, max: 24 },
  });

// Core math without the breakeven search (keeps findBreakeven from recursing).
function core(
  inputs: ROIInputs,
  c: ROIConstants,
): Omit<ROIResult, 'breakevenDailyVolumeTonnes'> {
  const Q = inputs.materialPerDayTonnes;
  const d = inputs.haulDistanceM;
  const w = inputs.labourDailyWage;
  const D = inputs.workingDaysPerMonth;

  // Guard every division (mirrors the backend's `x > 0 ? … : 0` discipline, §6.4).
  const H = inputs.productiveHoursPerShift > 0 ? inputs.productiveHoursPerShift : 1;
  const v = c.haulSpeedMPerMin > 0 ? c.haulSpeedMPerMin : 1;
  const p = c.payloadKg > 0 ? c.payloadKg : 1;
  const k = c.payloadRatio > 0 ? c.payloadRatio : 1;

  // §4.1 Robot side
  const N_r = (Q * 1000) / p;
  const T_r = c.mmrLoadingTimeMin + c.mmrUnloadingTimeMin + (2 * d) / v;
  const h_r = (N_r * T_r) / 60;
  const fleetSize = Math.max(1, Math.ceil(h_r / H));

  // §4.2 Wheelbarrow baseline
  const N_w = N_r * k;
  const T_w =
    c.loadingTimeMultiplier * c.mmrLoadingTimeMin +
    c.unloadingTimeMultiplier * c.mmrUnloadingTimeMin +
    (d / v) * (c.tripTimeMultiplier + c.returnTripTimeMultiplier);
  const M_w = ((N_w * T_w) / 60) * c.laborersPerWheelbarrow;

  // §4.3 Costs
  const r = w / H;
  const costManual = M_w * r;
  const M_r =
    ((N_r * c.mmrLoadingTimeMin) / 60) * c.laborersLoadingMMR +
    ((N_r * c.mmrUnloadingTimeMin) / 60) * c.laborersUnloadingMMR;
  const costRental = fleetSize * (c.monthlyRentalPerMMR / 30);
  const costLabour = M_r * r;
  const costOperator = fleetSize * c.operatorDailyWage; // included on purpose (§4.3, §7.3)
  const costRobot = costRental + costLabour + costOperator;

  // §4.4 Headline
  const S_d = costManual - costRobot;
  const S_m = S_d * D;
  const costReductionPct = costManual > 0 ? (S_d / costManual) * 100 : 0;

  // Man-hours saved — robot-side weights are 1 operator / 2 loading / 2 unloading (§4.4).
  const M_robot_side =
    h_r * 1 + ((N_r * c.mmrLoadingTimeMin) / 60) * 2 + ((N_r * c.mmrUnloadingTimeMin) / 60) * 2;
  const dM = M_w - M_robot_side;
  const laborersFreed = dM / H;

  // Wall-clock time — ONE MMR vs ONE wheelbarrow crew (not all four), §4.4.
  const h_wb_single = (N_w * T_w) / 60 / k;
  const dt = h_wb_single - h_r;

  return {
    robotTripsPerDay: N_r,
    robotCycleMin: T_r,
    robotHoursPerDay: h_r,
    fleetSize,
    wheelbarrowTripsPerDay: N_w,
    wheelbarrowCycleMin: T_w,
    manualManHoursPerDay: M_w,
    hourlyRate: r,
    costManualPerDay: costManual,
    costRentalPerDay: costRental,
    costLabourPerDay: costLabour,
    costOperatorPerDay: costOperator,
    costRobotPerDay: costRobot,
    dailySavings: S_d,
    monthlySavings: S_m,
    costReductionPct,
    manHoursSavedPerDay: dM,
    laborersFreed,
    wallClockHoursSavedPerDay: dt,
    isProfitable: S_d > 0,
    longHaul: d > 1000,
  };
}

// The daily volume a site would need to GROW to for an MMR fleet to become the
// cheaper option, holding the other inputs fixed. Searched UPWARD from the
// current volume — because fleet size steps via ceil(), savings aren't monotonic
// in volume, so a smaller profitable pocket can exist below a loss; that pocket
// is not an actionable answer for someone sitting at the current volume.
// Returns null if it never turns profitable up to the max bound.
function findBreakevenVolume(inputs: ROIInputs, c: ROIConstants): number | null {
  const { max } = INPUT_BOUNDS.materialPerDayTonnes;
  for (let q = inputs.materialPerDayTonnes + 0.5; q <= max; q += 0.5) {
    if (core({ ...inputs, materialPerDayTonnes: q }, c).dailySavings > 0) {
      return Math.round(q * 10) / 10;
    }
  }
  return null;
}

export function calculateROI(
  inputs: ROIInputs,
  constants: ROIConstants = DEFAULT_CONSTANTS,
): ROIResult {
  const base = core(inputs, constants);
  return {
    ...base,
    breakevenDailyVolumeTonnes: base.isProfitable
      ? null
      : findBreakevenVolume(inputs, constants),
  };
}

/** Whole-rupee currency with Indian digit grouping (matches backend formatCurrency). */
export function formatINR(value: number): string {
  return '₹' + Math.round(value).toLocaleString('en-IN');
}
