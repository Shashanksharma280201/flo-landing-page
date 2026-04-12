import { MagicDotPattern } from "@/components/ui/magicui-dot-pattern";
import { StatsBarGraph } from "@/components/sections/stats-bar-graph";

const STATS = [
  {
    value: 45,
    suffix: "%",
    label: "Labour Reduction",
  },
  {
    value: 51,
    suffix: "%",
    label: "Time Savings",
  },
  {
    value: 100,
    suffix: "%",
    label: "Hoist Utilisation Improvement",
  },
  {
    value: 30,
    suffix: "%",
    label: "Accidents Reduction",
  },
  {
    value: 60,
    suffix: "%",
    label: "Productivity Improvement",
  },
];

export function StatsSection() {
  return (
    <section className="relative z-10 overflow-hidden bg-white py-20 lg:py-14">
      <MagicDotPattern
        glow
        width={32}
        height={32}
        cr={1}
        className="text-[#7ccd54]/[0.14] mask-[radial-gradient(ellipse_100%_100%_at_50%_50%,#000_40%,transparent_100%)]"
      />

      <div className="pointer-events-none absolute left-1/2 top-0 h-50 w-200 -translate-x-1/2 rounded-full bg-[#7ccd54]/8 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-linear-to-b from-transparent to-white" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <StatsBarGraph stats={STATS} />
      </div>
    </section>
  );
}