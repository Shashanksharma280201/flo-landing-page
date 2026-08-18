'use client';

import { useId, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingDown, Users } from 'lucide-react';
import {
  calculateROI,
  DEFAULT_CONSTANTS,
  formatINR,
  INPUT_BOUNDS,
  MMR_RENTAL_LIST,
  type ROIInputs,
} from '@/lib/roi-model';

// ─── Design tokens (match the Contact page) ──────────────────────────────────
const GREEN = '#7ccd54';
const GREEN_D = '#286c00';
const TEXT = '#191c1a';
const MUTED = 'rgba(25,28,26,0.55)';
const DIM = 'rgba(25,28,26,0.12)';
const BG_DARK = '#0e1210';
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Full-width, responsive shell (matches the rest of the site).
const SHELL = 'mx-auto w-full max-w-[1800px] px-5 sm:px-8 lg:px-12 xl:px-20';

// The calculator asks only two things; everything else is a fixed constant.
const FIXED = { haulDistanceM: 150, workingDaysPerMonth: 26, productiveHoursPerShift: 9 };
const c = DEFAULT_CONSTANTS;

function num(v: number, dp = 0): string {
  return v.toLocaleString('en-IN', { maximumFractionDigits: dp, minimumFractionDigits: dp });
}

function clampV(key: 'materialPerDayTonnes' | 'labourDailyWage', v: number): number {
  const { min, max } = INPUT_BOUNDS[key];
  if (!Number.isFinite(v)) return min;
  return Math.min(max, Math.max(min, v));
}

function Slider({
  label,
  unit,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="text-[15px] font-semibold"
          style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
        >
          {label}
        </label>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={step}
            value={value}
            aria-label={`${label} (${unit})`}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-24 rounded-lg border px-2.5 py-1.5 text-right text-[16px] font-bold tabular-nums outline-none focus:border-[#286c00]"
            style={{ borderColor: DIM, color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          />
          <span
            className="w-14 text-[12px] font-medium"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            {unit}
          </span>
        </div>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="roi-range"
        style={{
          background: `linear-gradient(to right, ${GREEN_D} 0%, ${GREEN_D} ${pct}%, rgba(25,28,26,0.10) ${pct}%, rgba(25,28,26,0.10) 100%)`,
        }}
      />
      <div
        className="flex justify-between text-[11px] tabular-nums"
        style={{ color: 'rgba(25,28,26,0.35)', fontFamily: 'var(--font-dm-sans)' }}
      >
        <span>{num(min)}</span>
        <span>{num(max)}</span>
      </div>
    </div>
  );
}

function ResultPanel({
  eyebrow,
  value,
  sub,
  icon,
}: {
  eyebrow: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-8 xl:p-10"
      style={{ background: BG_DARK }}
    >
      <div
        className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full blur-3xl"
        style={{ background: `${GREEN}26` }}
      />
      <div className="relative flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: 'rgba(124,205,84,0.14)', color: GREEN }}
          >
            {icon}
          </span>
          <p
            className="text-[12px] font-bold tracking-[0.22em] uppercase"
            style={{ color: GREEN, fontFamily: 'var(--font-dm-sans)' }}
          >
            {eyebrow}
          </p>
        </div>
        <div
          className="mt-2 text-5xl font-black tracking-tight tabular-nums sm:text-6xl xl:text-7xl"
          style={{ color: '#fff', fontFamily: 'var(--font-dm-sans)' }}
        >
          {value}
        </div>
        <p
          className="text-[14px]"
          style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-dm-sans)' }}
        >
          {sub}
        </p>
      </div>
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center gap-2 rounded-full border px-4 py-2 text-[13px]"
      style={{ borderColor: DIM, background: '#fff', fontFamily: 'var(--font-dm-sans)' }}
    >
      <span style={{ color: MUTED }}>{label}</span>
      <span className="font-bold tabular-nums" style={{ color: TEXT }}>
        {value}
      </span>
    </div>
  );
}

export function ROICalculatorSection() {
  const [q, setQ] = useState(10); // material moved per day (tonnes)
  const [w, setW] = useState(700); // labour cost per day (₹)

  const inputs: ROIInputs = useMemo(
    () => ({ materialPerDayTonnes: q, labourDailyWage: w, ...FIXED }),
    [q, w],
  );
  const r = useMemo(() => calculateROI(inputs), [inputs]);

  const scrollToForm = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <section id="roi-calculator" className="w-full border-t" style={{ background: '#f5f5f5', borderColor: DIM }}>
      {/* Slider styling — native range can't be styled with Tailwind alone */}
      <style>{`
        .roi-range { -webkit-appearance:none; appearance:none; width:100%; height:6px; border-radius:9999px; cursor:pointer; outline:none; }
        .roi-range::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:24px; height:24px; border-radius:9999px; background:${GREEN_D}; border:4px solid #fff; box-shadow:0 2px 10px rgba(25,28,26,0.25); cursor:pointer; transition:transform .15s ease; }
        .roi-range::-webkit-slider-thumb:hover { transform:scale(1.12); }
        .roi-range::-moz-range-thumb { width:24px; height:24px; border-radius:9999px; background:${GREEN_D}; border:4px solid #fff; box-shadow:0 2px 10px rgba(25,28,26,0.25); cursor:pointer; }
        .roi-range:focus-visible::-webkit-slider-thumb { box-shadow:0 0 0 4px rgba(124,205,84,0.35); }
      `}</style>

      <div className={`${SHELL} py-20 md:py-28`}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl"
        >
          <p
            className="mb-4 text-[12px] font-bold tracking-[0.28em] uppercase"
            style={{ color: GREEN_D, fontFamily: 'var(--font-dm-sans)' }}
          >
            ROI Calculation
          </p>
          <h2
            className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            Free up labour. Cut your costs.
          </h2>
          <p
            className="mt-5 text-[16px] leading-relaxed sm:text-lg"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            Tell us two things about your site and see how many labourers a FLO MMR fleet frees up
            and how much you save each month versus your manual wheelbarrow process. It&apos;s a
            monthly rental &mdash; no capital cost, so the saving starts from month one.
          </p>
        </motion.div>

        {/* Full-width calculator grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(340px,440px)_1fr] lg:gap-10">
          {/* Inputs + a few critical assumptions */}
          <div
            className="flex flex-col gap-9 rounded-3xl border p-7 sm:p-9"
            style={{ borderColor: DIM, background: '#fff' }}
          >
            <Slider
              label="Material moved per day"
              unit="tonnes"
              value={q}
              min={INPUT_BOUNDS.materialPerDayTonnes.min}
              max={INPUT_BOUNDS.materialPerDayTonnes.max}
              step={1}
              onChange={(v) => setQ(clampV('materialPerDayTonnes', v))}
            />
            <Slider
              label="Labour cost per day"
              unit="₹ / day"
              value={w}
              min={INPUT_BOUNDS.labourDailyWage.min}
              max={INPUT_BOUNDS.labourDailyWage.max}
              step={10}
              onChange={(v) => setW(clampV('labourDailyWage', v))}
            />

            <div className="mt-1 border-t pt-6" style={{ borderColor: DIM }}>
              <p
                className="mb-3 text-[11px] font-bold tracking-[0.22em] uppercase"
                style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
              >
                What this assumes
              </p>
              <ul
                className="space-y-2 text-[13px] leading-relaxed"
                style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
              >
                <li>One MMR ({c.payloadKg} kg payload) replaces about {c.payloadRatio} wheelbarrows.</li>
                <li>Manual baseline uses {c.laborersPerWheelbarrow} labourers per wheelbarrow.</li>
                <li>
                  Monthly rental per MMR: <span className='flex font-bold'>60000</span>
                  {/* <b style={{ color: TEXT }}>{formatINR(c.monthlyRentalPerMMR)} with FLO</b> &mdash; */}
                  operator included, no capital cost.
                </li>
                <li>Based on a typical {FIXED.haulDistanceM} m haul over {FIXED.workingDaysPerMonth} working days.</li>
              </ul>
            </div>
          </div>

          {/* Results */}
          <div aria-live="polite" className="flex flex-col gap-6">
            {r.isProfitable ? (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <ResultPanel
                    eyebrow="Labourers freed / day"
                    value={num(r.laborersFreed, 1)}
                    sub="redeployable headcount"
                    icon={<Users className="h-[18px] w-[18px]" />}
                  />
                  <ResultPanel
                    eyebrow="Saved / month"
                    value={formatINR(r.monthlySavings)}
                    sub={`${formatINR(r.dailySavings)} / day · ${num(r.costReductionPct, 1)}% lower cost`}
                    icon={<TrendingDown className="h-[18px] w-[18px]" />}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Chip label="Fleet needed" value={`${r.fleetSize} MMR${r.fleetSize > 1 ? 's' : ''}`} />
                  <Chip label="Wall-clock time saved" value={`${num(r.wallClockHoursSavedPerDay, 1)} hrs/day`} />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="inline-flex w-fit items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-bold text-white transition-transform duration-200 hover:scale-105"
                    style={{ background: GREEN, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    Get this on your site — talk to our team
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p
                    className="max-w-md text-[12px] leading-relaxed"
                    style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    Built on the same model behind the monthly report every FLO client receives.
                    Figures are indicative &mdash; your exact saving is confirmed on a site
                    assessment.
                  </p>
                </div>
              </>
            ) : (
              <div
                className="flex flex-col gap-4 rounded-3xl border p-8 sm:p-10"
                style={{ borderColor: DIM, background: '#fff' }}
              >
                <p
                  className="text-[12px] font-bold tracking-[0.24em] uppercase"
                  style={{ color: GREEN_D, fontFamily: 'var(--font-dm-sans)' }}
                >
                  Not the cheaper option — yet
                </p>
                <p
                  className="max-w-2xl text-[16px] leading-relaxed"
                  style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                >
                  At this daily volume an MMR fleet costs a little more than your manual process.{' '}
                  {r.breakevenDailyVolumeTonnes
                    ? `It becomes cheaper once you're moving about ${num(r.breakevenDailyVolumeTonnes, 1)} tonnes/day.`
                    : 'It does not become cheaper within the supported range at these settings.'}{' '}
                  We&apos;d rather tell you that than show a number that won&apos;t hold up.
                </p>
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex w-fit items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-bold text-white transition-transform duration-200 hover:scale-105"
                  style={{ background: GREEN, fontFamily: 'var(--font-dm-sans)' }}
                >
                  Talk to our team about your site
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
