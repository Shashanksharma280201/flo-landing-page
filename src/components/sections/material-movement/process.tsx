import { MagicDotPattern } from "@/components/ui/magicui-dot-pattern";

const STEPS = [
  {
    step: "01",
    title: "Deploy on Your Site",
    description:
      "Our team arrives, maps your site with LiDAR, and programmes the robot's routes. Typical commissioning takes less than a day.",
  },
  {
    step: "02",
    title: "Monitor via Fleet Control",
    description:
      "Track every robot in real time — speed, payload, battery level, and route deviations — from a single dashboard on any device.",
  },
  {
    step: "03",
    title: "Scale as You Grow",
    description:
      "Add more robots on demand. Our RaaS subscription means no large capex — just a predictable monthly cost that scales with your operation.",
  },
];

const USE_CASES = [
  { label: "Construction Sites", description: "Move concrete blocks, steel rebar, and aggregate between floors and work zones without manual labour." },
  { label: "Mining Operations", description: "Navigate rugged underground terrain carrying ore, equipment, and supplies over steep grades up to 20°." },
  { label: "Warehousing & Logistics", description: "Automate repetitive internal transport runs, freeing your workforce for higher-value tasks." },
];

export function MaterialMovementProcess() {
  return (
    <>
      {/* ── How It Works ── */}
      <section className="relative bg-[#1a3a1f] py-24 lg:py-32 overflow-hidden">
        <MagicDotPattern
          width={36}
          height={36}
          cr={1}
          className="text-[#7ccd54]/[0.08] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_100%)]"
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#7ccd54]/6 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#7ccd54] mb-6 border border-[#7ccd54]/20 uppercase">
              How It Works
            </div>
            <h2
              className="text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Up and running in under a day.
            </h2>
            <p className="text-lg text-gray-400">
              From site survey to first autonomous run — our deployment process
              is designed to be fast, low-friction, and reversible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {STEPS.map((s) => (
              <div key={s.step} className="flex flex-col">
                <span
                  className="text-5xl font-semibold text-[#7ccd54]/30 leading-none mb-5 block"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.step}
                </span>
                <h3
                  className="text-xl font-medium text-white mb-3"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="bg-[#fdfcf0] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Left — sticky label block */}
            <div className="py-20 lg:py-24 lg:pr-16 xl:pr-20">
              <div className="mb-12">
                <div className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
                  Where We Deploy
                </div>
                <h2
                  className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl mb-3"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Built for every industrial environment.
                </h2>
                <p className="text-gray-600">
                  The Flo AMR has been field-tested across the three most demanding
                  material-handling sectors.
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                {USE_CASES.map((uc, i) => (
                  <div key={i} className="py-6 flex gap-5 items-start">
                    <span
                      className="text-xs font-semibold text-[#7ccd54]/60 w-6 shrink-0 mt-0.5"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className="text-sm font-semibold text-gray-900 mb-1"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {uc.label}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {uc.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — stat visual */}
            <div className="relative min-h-[360px] lg:min-h-[600px] bg-[#1a3a1f] flex flex-col items-center justify-center p-12 text-center gap-10">
              {/* Decorative dot grid */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(124,205,84,0.5) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a1f]/60 to-transparent" />

              <div className="relative z-10 space-y-10">
                {[
                  { value: "200+", label: "Sites deployed" },
                  { value: "15+", label: "Enterprise clients" },
                  { value: "3", label: "Industry verticals" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="text-5xl font-semibold text-white mb-1"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
