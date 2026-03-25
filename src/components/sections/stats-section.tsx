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
    <section className="relative bg-[#1a3a1f] py-12 lg:py-16 overflow-hidden">
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

      <div className="relative z-10 w-full px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 max-w-7xl mx-auto">
          {STATS.map((stat, index) => (
            <div
              key={index}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 hover:border-[#7ccd54]/50 hover:bg-white/10 transition-all duration-300 group overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7ccd54]/0 to-[#7ccd54]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex flex-col items-center text-center">
                <div
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 group-hover:text-[#7ccd54] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-400 font-medium uppercase tracking-wide">
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
