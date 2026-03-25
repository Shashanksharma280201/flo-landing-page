import { Counter } from "@/components/ui/counter";
import { MagicDotPattern } from "@/components/ui/magicui-dot-pattern";

const STATS = [
  {
    value: 50,
    suffix: "+",
    label: "Robots Deployed",
  },
  {
    value: 10000,
    suffix: "+",
    label: "Hours Saved",
  },
  {
    value: 40,
    suffix: "%",
    label: "Cost Reduction",
  },
  {
    value: 200,
    suffix: "+",
    label: "Projects Completed",
  },
];

export function StatsSection() {
  return (
    <section className="relative bg-[#1a3a1f] py-20 lg:py-24 overflow-hidden">
      {/* MagicUI glowing dots — full coverage on dark bg */}
      <MagicDotPattern
        glow
        width={32}
        height={32}
        cr={1}
        className="text-[#7ccd54]/[0.15] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_40%,transparent_100%)]"
      />

      {/* Ambient green glow — top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[#7ccd54]/10 rounded-full blur-[100px] pointer-events-none" />
      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[--background] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {STATS.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/8 rounded-xl p-5 sm:p-7 lg:p-8 hover:border-[#7ccd54]/40 hover:bg-white/8 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                <div
                  className="text-[clamp(2.5rem,3.5vw+1rem,3.5rem)] font-semibold text-white"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
