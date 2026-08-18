#!/usr/bin/env node
/**
 * ROI model verifier — runs the ROI_CALCULATOR_SPEC.md §5 worked example and the
 * §6.4 edge cases against the real model. No test framework (repo has none).
 *
 *   node --experimental-strip-types scripts/roi-verify.ts
 *
 * Exits non-zero on any failure so it can gate CI.
 */
import {
  calculateROI,
  DEFAULT_CONSTANTS,
  DEFAULT_INPUTS,
  type ROIConstants,
  type ROIInputs,
} from '../src/lib/roi-model.ts';

let failures = 0;
function check(name: string, cond: boolean, detail = '') {
  console.log(`  ${cond ? '✅' : '❌'} ${name}${cond ? '' : ` — ${detail}`}`);
  if (!cond) failures++;
}
// relative tolerance (±1% per spec)
function near(name: string, got: number, want: number, tolPct = 1) {
  const ok = Math.abs(got - want) <= Math.abs(want) * (tolPct / 100) || got === want;
  check(name, ok, `got ${got}, want ~${want}`);
}

// ── §5 worked example ─────────────────────────────────────────────────────────
console.log('\n# §5 worked example (Q=40, d=150, w=650, D=26, H=9)');
const fixture: ROIInputs = {
  materialPerDayTonnes: 40,
  haulDistanceM: 150,
  labourDailyWage: 650,
  workingDaysPerMonth: 26,
  productiveHoursPerShift: 9,
};
// The spec's §5 worked example is defined at the list rental (C = ₹60,000); the
// app now calculates on the effective ₹40,000, so pin 60,000 here for this fixture.
const r = calculateROI(fixture, { ...DEFAULT_CONSTANTS, monthlyRentalPerMMR: 60000 });
near('robot trips/day = 80', r.robotTripsPerDay, 80);
near('robot cycle = 16.5 min', r.robotCycleMin, 16.5);
near('robot hours = 22.0', r.robotHoursPerDay, 22.0);
check('fleet size = 3', r.fleetSize === 3, `got ${r.fleetSize}`);
near('wheelbarrow trips = 320', r.wheelbarrowTripsPerDay, 320);
near('wheelbarrow cycle = 20.925', r.wheelbarrowCycleMin, 20.925);
near('manual man-hours = 223.2', r.manualManHoursPerDay, 223.2);
near('hourly rate = 72.22', r.hourlyRate, 72.22);
near('manual cost/day = 16,120', r.costManualPerDay, 16120);
near('MMR cost/day = 9,567', r.costRobotPerDay, 9567);
near('daily savings = 6,553', r.dailySavings, 6553);
near('monthly savings = 1,70,387', r.monthlySavings, 170387);
near('cost reduction = 40.7%', r.costReductionPct, 40.7);
near('man-hours saved = 177.2', r.manHoursSavedPerDay, 177.2);
near('laborers freed = 19.7', r.laborersFreed, 19.7);
near('wall-clock saved = 5.9 hrs', r.wallClockHoursSavedPerDay, 5.9);
check('profitable', r.isProfitable === true);
check('no breakeven when profitable', r.breakevenDailyVolumeTonnes === null);

// ── §5 sensitivity + §6.4 edge cases ──────────────────────────────────────────
console.log('\n# edge cases');
const highRental: ROIConstants = { ...DEFAULT_CONSTANTS, monthlyRentalPerMMR: 100000 };
const loss = calculateROI({ ...fixture, materialPerDayTonnes: 20 }, highRental);
check('Q=20 @ C=1,00,000 is a loss', loss.isProfitable === false, `S_d=${loss.dailySavings}`);
check(
  'loss reports a breakeven volume',
  typeof loss.breakevenDailyVolumeTonnes === 'number' && loss.breakevenDailyVolumeTonnes! > 20,
  `breakeven=${loss.breakevenDailyVolumeTonnes}`,
);

const tiny = calculateROI({ ...fixture, materialPerDayTonnes: 1 });
check('fleet never below 1', tiny.fleetSize >= 1, `got ${tiny.fleetSize}`);

const zeroH = calculateROI({ ...fixture, productiveHoursPerShift: 0 });
check(
  'H=0 never yields NaN (guarded)',
  Number.isFinite(zeroH.monthlySavings) && Number.isFinite(zeroH.hourlyRate),
);

// ── §3.1 constants lockstep with backend ──────────────────────────────────────
console.log('\n# §3.1 constants match the production model');
check('payload = 500', DEFAULT_CONSTANTS.payloadKg === 500);
check('payload ratio = 4', DEFAULT_CONSTANTS.payloadRatio === 4);
check('laborers/wheelbarrow = 2', DEFAULT_CONSTANTS.laborersPerWheelbarrow === 2);
check('trip multiplier = 1.6', DEFAULT_CONSTANTS.tripTimeMultiplier === 1.6);
check('return multiplier = 1.1', DEFAULT_CONSTANTS.returnTripTimeMultiplier === 1.1);
check('defaults mirror backend (w=650, H=9, D=26)',
  DEFAULT_INPUTS.labourDailyWage === 650 &&
  DEFAULT_INPUTS.productiveHoursPerShift === 9 &&
  DEFAULT_INPUTS.workingDaysPerMonth === 26);

console.log(`\n${failures === 0 ? '✅ PASS' : '❌ FAIL'} — ${failures} failing check(s)\n`);
process.exit(failures === 0 ? 0 : 1);
