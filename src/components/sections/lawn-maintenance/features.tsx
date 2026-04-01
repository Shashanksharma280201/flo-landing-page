const features = [
  {
    title: "Driverless",
    titleHighlight: "Operation",
    description:
      "Fully autonomous navigation eliminates human error and delivers consistent, repeatable results across every mowing session.",
  },
  {
    title: "Electric",
    titleHighlight: "Power Train",
    description:
      "Instant torque, zero emissions, and uncompromised power for professional turf — with significantly lower running costs.",
  },
  {
    title: "Adjustable",
    titleHighlight: "Cut Height",
    description:
      "Software-controlled electric actuator sets cutting height from 12 to 100mm — no manual adjustments, ever.",
  },
  {
    title: "Collision",
    titleHighlight: "Avoidance",
    description:
      "Integrated LiDAR and vision systems detect obstacles in real time, ensuring safe operation around people and objects.",
  },
  {
    title: "Sensor-Based",
    titleHighlight: "Intelligence",
    description:
      "Real-time machine health monitoring lets you track performance, predict maintenance needs, and allocate resources efficiently.",
  },
  {
    title: "Low OpEx &",
    titleHighlight: "Maintenance",
    description:
      "Fewer moving parts, dock-based auto charging, and remote diagnostics keep your total cost of ownership minimal.",
  },
];

export function LawnMaintenanceFeatures() {
  return (
    <section id="features" className="bg-gradient-to-b from-gray-200 to-gray-200 py-12 lg:py-24 overflow-hidden">
      <div className="relative w-full px-6 sm:px-8 lg:px-16 xl:px-24">

        {/* Section header */}
        <div className="text-center mb-20 lg:mb-28 max-w-5xl mx-auto">
          <h2
            className="text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-gray-900 mb-8 leading-[1.1]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Professional turf care-zero compromise.
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Built for golf courses, commercial estates, and large-scale
            landscaping — where precision and reliability are non-negotiable.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-[1600px] mx-auto">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="flex flex-col p-10 lg:p-12 rounded-xl bg-gray-300 transition-all duration-200"
            >
              <h3
                className="text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6 leading-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <span className="text-gray-900">{feature.title} </span>
                <span className="text-[#7ccd54]">{feature.titleHighlight}</span>
              </h3>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed flex-1">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
