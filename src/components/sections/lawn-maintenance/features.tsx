import { Bot, Zap, Ruler, Shield, Cpu, BarChart3 } from "lucide-react";

const features = [
  {
    title: "Driverless Operation",
    description:
      "Fully autonomous navigation eliminates human error and delivers consistent, repeatable results across every mowing session.",
    icon: Bot,
  },
  {
    title: "Electric Power Train",
    description:
      "Instant torque, zero emissions, and uncompromised power for professional turf — with significantly lower running costs.",
    icon: Zap,
  },
  {
    title: "Adjustable Cut Height",
    description:
      "Software-controlled electric actuator sets cutting height from 12 to 100mm — no manual adjustments, ever.",
    icon: Ruler,
  },
  {
    title: "Collision Avoidance",
    description:
      "Integrated LiDAR and vision systems detect obstacles in real time, ensuring safe operation around people and objects.",
    icon: Shield,
  },
  {
    title: "Sensor-Based Intelligence",
    description:
      "Real-time machine health monitoring lets you track performance, predict maintenance needs, and allocate resources efficiently.",
    icon: Cpu,
  },
  {
    title: "Low OpEx & Maintenance",
    description:
      "Fewer moving parts, dock-based auto charging, and remote diagnostics keep your total cost of ownership minimal.",
    icon: BarChart3,
  },
];

export function LawnMaintenanceFeatures() {
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
            Professional turf care, zero compromise.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Built for golf courses, commercial estates, and large-scale
            landscaping — where precision and reliability are non-negotiable.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="flex flex-col p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-[#7ccd54]/30 transition-all duration-200"
            >
              <span
                className="text-xs font-semibold text-[#7ccd54]/60 block mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0faf0] mb-5">
                <feature.icon className="h-5 w-5 text-[#7ccd54]" />
              </div>
              <h3
                className="text-base font-semibold text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {feature.title}
              </h3>
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
