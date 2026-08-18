# FLO MMR — Website ROI Calculator

**Spec + implementation brief for Claude Code**
Date: 2026-08-14
Status: Ready to build. Section 8 lists the values FLO must confirm before going live.

---

## 1. Purpose and scope

Build a public, client-side ROI calculator for the FLO marketing website. A visitor
enters five facts about their site and sees what an MMR fleet would save them per month
against their current wheelbarrow-based material movement.

**Business model assumed: rental / monthly subscription.** There is no capex, no
depreciation, no payback period. Savings are either positive from month one or they are
not. If FLO later sells outright, this document needs a payback section added — do not
improvise one.

**Non-goals.** No lead capture gating the result (show the number first, ask for the
email after). No login. No backend. No per-material breakdown. No site-utilization
modelling. The calculator is a persuasion tool that must not be able to be caught lying.

---

## 2. Where these formulas come from

This model is a forward-running inversion of the **retrospective** cost analysis that
already ships in FLO Mission Control at `/analytics` → "Generate PDF".

Source of truth in this repo:

| File                                                                        | What it holds                                                                                                                     |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `mission-control/backend/services/analyticsReport/costAnalysisService.ts`   | The whole cost model. `DEFAULT_LABOR_CONFIG` at line 18, `calculateMaterialBreakdown` at line 197, `calculateSummary` at line 495 |
| `mission-control/backend/services/analyticsReport/costAnalysisTypes.ts`     | Field-by-field meaning of every output                                                                                            |
| `mission-control/backend/services/analyticsReport/chartDataExtractor.ts:4`  | `ROBOT_PAYLOAD_KG = 500`                                                                                                          |
| `mission-control/backend/services/analyticsReport/AnalyticsPDFDocument.tsx` | How the numbers are labelled for clients                                                                                          |

The PDF version reads real telemetry — measured `loadingTime`, `tripTime`,
`unloadingTime`, `returnTripTime` per session — and synthesises a wheelbarrow baseline
from it. The website version has no telemetry, so it drives the same equations from
**material volume and haul distance** instead, using FLO's measured cycle times as
machine constants.

**This matters commercially:** every number the website quotes uses the same constants
and the same structure as the report a real client receives. When a prospect converts,
their first monthly report will corroborate the calculator instead of contradicting it.

---

## 3. Constants

### 3.1 Inherited from the production model — do not change without changing both

These are lifted directly from `DEFAULT_LABOR_CONFIG` and must stay in lockstep with the
backend. If FLO recalibrates one, recalibrate it in both places.

| Constant                          | Symbol | Value  | Source                      |
| --------------------------------- | ------ | ------ | --------------------------- |
| MMR payload per trip              | `p`    | 500 kg | `chartDataExtractor.ts:4`   |
| Payload ratio (MMR : wheelbarrow) | `k`    | 4      | `laborConfig.payloadRatio`  |
| Implied wheelbarrow payload       | `p/k`  | 125 kg | derived                     |
| Laborers per wheelbarrow          | `n_wb` | 2      | `laborersPerWheelbarrow`    |
| Laborers loading an MMR           | `n_L`  | 1      | `laborersPerRobotLoading`   |
| Laborers unloading an MMR         | `n_U`  | 1      | `laborersPerRobotUnloading` |
| Loading time multiplier           | `m_L`  | 1.20   | `loadingTimeMultiplier`     |
| Outbound trip multiplier          | `m_T`  | 1.60   | `tripTimeMultiplier`        |
| Unloading time multiplier         | `m_U`  | 1.20   | `unloadingTimeMultiplier`   |
| Return trip multiplier            | `m_R`  | 1.10   | `returnTripTimeMultiplier`  |

**What the multipliers mean.** A human pushing a loaded wheelbarrow over the same ground
takes 1.60× as long as the MMR does; walking back empty takes 1.10×; hand-loading and
hand-tipping a barrow take 1.20× the MMR's equivalent phase. They encode measured
human-versus-machine cycle variance, not a guess. They are the single most attackable
assumption in the model, so they must be defensible on request — see section 7.

### 3.2 Machine cycle constants — FLO must confirm (section 8)

Placeholders below are plausible but **unverified**. Ship with real numbers.

| Constant                    | Symbol | Placeholder | Notes                                          |
| --------------------------- | ------ | ----------- | ---------------------------------------------- |
| MMR loading time per trip   | `t_L`  | 6 min       | Median across deployed fleet                   |
| MMR unloading time per trip | `t_U`  | 3 min       | Median; actuator and manual averaged together  |
| MMR effective haul speed    | `v`    | 40 m/min    | ≈2.4 km/h, loaded, on site conditions          |
| Monthly rental per MMR      | `C`    | ₹60,000     | The number the calculator is most sensitive to |
| Operator daily wage         | `w_op` | ₹900        | Skilled rate, above general labour             |

### 3.3 Input defaults

| Input                           | Symbol | Default | Bounds     |
| ------------------------------- | ------ | ------- | ---------- |
| Material moved per day (tonnes) | `Q`    | 40      | 1 – 500    |
| One-way haul distance (metres)  | `d`    | 150     | 10 – 2000  |
| Labour daily wage (₹)           | `w`    | 650     | 200 – 5000 |
| Working days per month          | `D`    | 26      | 1 – 31     |
| Productive hours per shift      | `H`    | 9       | 1 – 24     |

`w = 650` and the 9-hour productive shift both mirror the backend defaults (10 nominal
hours minus 1 hour of break — see the `|| 9` fallback at `costAnalysisService.ts:657`).

---

## 4. The formulas

All times in minutes, all money in INR, all rates per day unless stated.

### 4.1 Robot side

```
Robot trips per day
    N_r = (Q × 1000) / p

Robot cycle time per trip
    T_r = t_L + t_U + (2d / v)

Robot operating hours per day
    h_r = (N_r × T_r) / 60

Fleet size required
    n = ceil(h_r / H)                          minimum 1
```

`n` is a **derived output, not an input.** The visitor should not have to guess how many
machines they need — telling them is a large part of the calculator's value.

### 4.2 Manual (wheelbarrow) baseline

```
Wheelbarrow trips per day
    N_w = N_r × k                              = N_r × 4

Wheelbarrow cycle time per trip
    T_w = (m_L × t_L) + (m_U × t_U) + (d/v) × (m_T + m_R)
        = 1.20·t_L + 1.20·t_U + (d/v) × 2.70

Manual man-hours per day
    M_w = (N_w × T_w / 60) × n_wb              = ... × 2
```

Outbound and return are multiplied separately because a loaded barrow and an empty walk
back are not the same journey. This mirrors `costAnalysisService.ts:235-239` exactly.

### 4.3 Costs

```
Hourly labour rate
    r = w / H

Manual process cost per day
    Cost_manual = M_w × r

MMR-side loading/unloading man-hours per day
    M_r = (N_r × t_L / 60) × n_L + (N_r × t_U / 60) × n_U

MMR process cost per day
    Cost_rental   = n × (C / 30)
    Cost_labour   = M_r × r
    Cost_operator = n × w_op
    Cost_robot    = Cost_rental + Cost_labour + Cost_operator
```

> **Deliberate divergence from the backend.** The production model does **not** include
> operator cost in `totalRobotCost` — operator hours appear only in the man-hours-saved
> metric (`OPERATORS_PER_ROBOT_FOR_MAN_HOURS_SAVED = 1`,
> `costAnalysisService.ts:31, 264`). On a public calculator that omission is a liability:
> the first prospect who notices it discounts every other number on the page. Include
> operator cost. It makes the result smaller and far more credible.

### 4.4 Headline outputs

```
Daily savings          S_d = Cost_manual − Cost_robot
Monthly savings        S_m = S_d × D
Cost reduction (%)          = (S_d / Cost_manual) × 100

Man-hours saved per day
    M_robot_side = h_r × 1  +  (N_r × t_L / 60) × 2  +  (N_r × t_U / 60) × 2
    ΔM           = M_w − M_robot_side
    Laborers freed = ΔM / H

Wall-clock time saved per day
    h_wb_single = (N_w × T_w / 60) / k          one barrow crew, not four
    Δt          = h_wb_single − h_r
```

The `M_robot_side` weights (1 operator, 2 loading, 2 unloading) come from
`costAnalysisService.ts:31-33` and are intentionally _more_ conservative than the cost-side
weights of 1 and 1. Keep them different; they answer different questions.

> **Never present time saved and cost saved as the same comparison.** Cost compares one
> MMR against all four wheelbarrows it displaces. Wall-clock time compares one MMR against
> _one_ wheelbarrow crew, because four crews work in parallel. Both are correct, they are
> not interchangeable, and mixing them is how a calculator gets called dishonest. Label
> them distinctly.

---

## 5. Worked example — use this as the test fixture

Inputs: `Q = 40 t/day`, `d = 150 m`, `w = ₹650`, `D = 26`, `H = 9`
Constants: `p = 500`, `t_L = 6`, `t_U = 3`, `v = 40`, `C = ₹60,000`, `w_op = ₹900`

| Step                | Working                 | Result           |
| ------------------- | ----------------------- | ---------------- |
| Robot trips         | 40 × 1000 / 500         | 80 /day          |
| Robot cycle         | 6 + 3 + 300/40          | 16.5 min         |
| Robot hours         | 80 × 16.5 / 60          | 22.0 hrs         |
| **Fleet needed**    | ceil(22.0 / 9)          | **3 MMRs**       |
| Wheelbarrow trips   | 80 × 4                  | 320 /day         |
| Wheelbarrow cycle   | 7.2 + 3.6 + 3.75×2.70   | 20.925 min       |
| Manual man-hours    | (320 × 20.925 / 60) × 2 | 223.2 man-hrs    |
| Hourly rate         | 650 / 9                 | ₹72.22           |
| **Manual cost**     | 223.2 × 72.22           | **₹16,120 /day** |
| Rental              | 3 × 60000/30            | ₹6,000           |
| MMR labour          | 12 man-hrs × 72.22      | ₹867             |
| Operators           | 3 × 900                 | ₹2,700           |
| **MMR cost**        | sum                     | **₹9,567 /day**  |
| **Daily savings**   | 16,120 − 9,567          | **₹6,553**       |
| **Monthly savings** | × 26                    | **₹1,70,387**    |
| **Cost reduction**  | 6,553 / 16,120          | **40.7%**        |
| Man-hours saved     | 223.2 − 46.0            | 177.2 /day       |
| Laborers freed      | 177.2 / 9               | ≈19.7 people     |
| Wall-clock saved    | 27.9 − 22.0             | 5.9 hrs /day     |

Unit-test these to ±1%. If a refactor moves any of them, the model changed.

**Sensitivity warning for whoever sets `C`:** at `C = ₹1,00,000` the same site yields only
15.8% reduction; at `Q = 20 t/day` with `C = ₹1,00,000` savings go **negative**. The model
is honest enough to output a loss. Section 6.4 says what to do when it does.

---

## 6. Implementation instructions

### 6.1 Detect the stack first

This spec does not assume a framework. Before writing code, inspect the website repo
(`package.json`, directory layout) and match its existing conventions — framework,
styling system, component patterns, test runner. Do not introduce a new state library, a
new CSS approach, or a new test framework for this one feature.

### 6.2 Architecture — two units, one boundary

**Unit 1: `roiModel` — pure calculation, zero UI, zero framework imports.**

```
calculateROI(inputs: ROIInputs, constants: ROIConstants): ROIResult
```

- Every constant from section 3 lives in one exported, frozen object. No magic numbers
  scattered through the function.
- Pure and synchronous. Same inputs always give the same output.
- Fully unit-testable without rendering anything. This is where section 5 gets tested.
- Returns intermediates (`N_r`, `T_r`, `n`, `T_w`, `M_w`, both cost components) as well as
  headline figures, so the UI can show the derivation without recomputing.

**Unit 2: `ROICalculator` — the UI.** Owns input state, renders results, formats currency.
It calls `calculateROI` and displays what comes back. It performs no arithmetic of its own
beyond formatting.

The boundary is the point: FLO's sales team will want to recalibrate constants, and the
model must be changeable without touching a single line of UI.

### 6.3 UI requirements

- **Live recalculation.** No submit button. Values update as the visitor types or drags.
- **Sliders with numeric entry** for all five inputs. Sliders invite exploration; the
  number field keeps it precise. Enforce the section 3.3 bounds on both.
- **Results, in priority order:** monthly savings (largest element on screen), cost
  reduction %, fleet size required, laborers freed, wall-clock hours saved per day.
- **Show the working.** A collapsed "How is this calculated?" panel that expands to the
  intermediate values and the wheelbarrow-baseline assumptions. The buyer for this product
  is technical and will look.
- **Currency:** `₹` with Indian digit grouping — `toLocaleString('en-IN')`, matching
  `formatCurrency` in `costAnalysisService.ts:728`. Round to whole rupees.
- **Mobile-first.** Substantial traffic will be phone-based. Sliders must have adequate
  touch targets.
- **Accessibility:** every slider labelled and keyboard-operable; results in an
  `aria-live="polite"` region so screen readers hear updates.
- **No emojis anywhere.**

### 6.4 Edge cases — all of these must be handled explicitly

| Condition                     | Required behaviour                                                                                                                                                                                                                                                                                                            |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `S_d ≤ 0` (MMR costs more)    | Do **not** show a negative number as if it were a win, and do not silently clamp to zero. Show an honest message — that at this volume and distance an MMR fleet is not yet the cheaper option — and state the breakeven daily volume. Then offer a "talk to us" link. Honesty here converts better than a broken calculator. |
| `Q` so low that `N_r < 1`     | Sub-single-trip days. Round `N_r` for display but keep fractional precision internally.                                                                                                                                                                                                                                       |
| `h_r / H` yields `n = 0`      | Clamp to `n = 1`. You cannot rent zero machines.                                                                                                                                                                                                                                                                              |
| `H = 0` or any divide-by-zero | Guard every division. The backend does this throughout (`x > 0 ? ... : 0`). Mirror it.                                                                                                                                                                                                                                        |
| Non-numeric / empty input     | Fall back to the section 3.3 default; never render `NaN`.                                                                                                                                                                                                                                                                     |
| `d` very large (>1000 m)      | Formula still holds, but flag in the assumptions panel that long hauls may warrant a different machine configuration.                                                                                                                                                                                                         |

### 6.5 Testing

- Unit tests on `calculateROI` covering the full section 5 fixture, every edge case in
  6.4, and both bounds of every input.
- At least one test asserting the constants object matches section 3.1 — it will catch a
  drift from the backend model during review.
- Component test: typing in an input updates the displayed monthly savings.

### 6.6 Copy and framing

- Call the baseline "manual wheelbarrow process", matching the client PDF's language.
- Label the two savings metrics distinctly: "Labour cost saved" and "Wall-clock time
  saved". Never merge them (section 4.4).
- State the key assumptions on the page, not buried in a tooltip: 500 kg payload,
  1 MMR ≈ 4 wheelbarrows, 2 laborers per wheelbarrow, operator cost included.
- Close with the strongest available proof: these are the same formulas used in the
  monthly performance report every FLO client already receives.

---

## 7. Defensibility notes

Anticipate these three challenges from a technical prospect. Have answers ready.

1. **"Where do the 1.20/1.60/1.20/1.10 multipliers come from?"** They are measured
   human-versus-MMR cycle variance per phase, derived from FLO's deployed-fleet telemetry.
   Whoever owns the model should be able to produce the underlying study on request.
2. **"Is 1 MMR really 4 wheelbarrows?"** It is a payload identity: 500 kg ÷ 125 kg. Say it
   that way — it is arithmetic, not marketing.
3. **"You've excluded your own operator cost."** Pre-empted: it is included (section 4.3).
   This is the whole reason to diverge from the backend model here.

---

## 8. Open items — confirm before launch

- [ ] `t_L`, `t_U`, `v` — real medians from deployed-fleet telemetry, not the placeholders
- [ ] `C` — the monthly rental figure to show publicly. Highest-leverage number in the
      model; see the sensitivity warning in section 5
- [ ] `w_op` — operator daily wage
- [ ] Whether more than one MMR variant should be selectable (this spec assumes one,
      at 500 kg)
- [ ] Whether `C` is shown to the visitor or held as a hidden constant. Hiding it makes
      the result feel like a black box; showing it starts the price conversation early.
      Recommend showing it.
- [ ] Confirm 500 kg is current for the fleet being sold — the constant is hardcoded in
      five separate files and may be stale

---

## 9. Keep this in sync

If `DEFAULT_LABOR_CONFIG`, `payloadRatio`, or `ROBOT_PAYLOAD_KG` changes in Mission
Control, this calculator diverges from the reports clients receive. Add a comment above
the constants block in `roiModel` pointing back to
`mission-control/backend/services/analyticsReport/costAnalysisService.ts` so the coupling
is visible to whoever edits either side.
