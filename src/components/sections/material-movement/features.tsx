import {
  Cpu,
  Battery,
  Zap,
  ShieldCheck,
  Truck,
  LineChart,
} from "lucide-react";

const features = [
  {
    title: "Driverless Operation",
    description:
      "Eliminates human error and optimises performance through advanced autonomous navigation — no operator required on-site.",
    icon: ShieldCheck,
  },
  {
    title: "Electric Power Train",
    description:
      "Instant torque and uncompromised power for all terrains, with zero tailpipe emissions and lower fuel costs.",
    icon: Zap,
  },
  {
    title: "Customisable Dumper",
    description:
      "Versatile payload platform capable of carrying 500–700 kg. Swap body configurations to match your site requirements.",
    icon: Truck,
  },
  {
    title: "Swappable Batteries",
    description:
      "Hot-swap battery packs keep the robot running continuously across shifts — zero waiting for a full recharge cycle.",
    icon: Battery,
  },
  {
    title: "Sensor-Based Intelligence",
    description:
      "LiDAR + camera fusion delivers real-time spatial awareness, obstacle avoidance, and precise path following.",
    icon: Cpu,
  },
  {
    title: "Low OpEx & Maintenance",
    description:
      "Fewer moving parts, predictive diagnostics via Fleet Control, and remote servicing reduce your total cost of ownership.",
    icon: LineChart,
  },
];

export function MaterialMovementFeatures() {
  return (
    <section id="features" className="bg-[#fdfcf0] py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">

        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
            Capabilities
          </div>
          <h2
            className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mb-4 text-balance"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Built for the hardest environments on earth.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            From underground mines to urban construction sites — our autonomous
            mover adapts to every terrain and use case without missing a beat.
          </p>
        </div>

        {/* Feature cards — mirrors channel-partner partner-types grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="flex flex-col p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-[#7ccd54]/30 transition-all duration-200"
            >
              {/* Index */}
              <span
                className="text-xs font-semibold text-[#7ccd54]/60 block mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0faf0] mb-5">
                <feature.icon className="h-5 w-5 text-[#7ccd54]" />
              </div>

              {/* Title */}
              <h3
                className="text-base font-semibold text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
