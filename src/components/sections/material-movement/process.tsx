import { MagicDotPattern } from '@/components/ui/magicui-dot-pattern';

const STEPS = [
  {
    step: '01',
    title: 'Deploy on Your Site',
    description:
      "Our team arrives, maps your site with LiDAR, and programmes the robot's routes. Typical commissioning takes less than a day.",
  },
  {
    step: '02',
    title: 'Monitor via Fleet Control',
    description:
      'Track every robot in real time: speed, payload, battery level, and route deviations, from a single dashboard on any device.',
  },
  {
    step: '03',
    title: 'Scale as You Grow',
    description:
      'Add more robots on demand. Our RaaS subscription means no large capex, just a predictable monthly cost that scales with your operation.',
  },
];

const USE_CASES = [
  {
    label: 'Construction Sites',
    description:
      'Move concrete blocks, steel rebar, and aggregate between floors and work zones without manual labour.',
  },
  {
    label: 'Mining Operations',
    description:
      'Navigate rugged underground terrain carrying ore, equipment, and supplies over steep grades up to 20°.',
  },
  {
    label: 'Warehousing & Logistics',
    description:
      'Automate repetitive internal transport runs, freeing your workforce for higher-value tasks.',
  },
];

export function MaterialMovementProcess() {
  return (
    <>
      {/* ── How It Works ── */}
      <section className="relative overflow-hidden bg-[#1a3a1f] py-24 lg:py-32">
        <MagicDotPattern
          width={36}
          height={36}
          cr={1}
          className="[mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_100%)] text-[#7ccd54]/[0.08]"
        />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[250px] w-[600px] -translate-x-1/2 rounded-full bg-[#7ccd54]/6 blur-[120px]" />

        <div className="relative z-10 container mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-6 inline-block rounded-full border border-[#7ccd54]/20 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#7ccd54] uppercase">
              How It Works
            </div>
            <h2
              className="mb-4 text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Up and running in under a day.
            </h2>
            <p className="text-lg text-gray-400">
              From site survey to first autonomous run. Our deployment process is designed
              to be fast, low-friction, and reversible.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {STEPS.map((s) => (
              <div key={s.step} className="flex flex-col">
                <span
                  className="mb-5 block text-5xl leading-none font-semibold text-[#7ccd54]/30"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {s.step}
                </span>
                <h3
                  className="mb-3 text-xl font-medium text-white"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
