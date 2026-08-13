const features = [
  {
    title: 'Driverless',
    titleHighlight: 'Operation',
    description:
      'Fully autonomous navigation eliminates human error and delivers consistent, repeatable results across every mowing session.',
  },
  {
    title: 'Electric',
    titleHighlight: 'Power Train',
    description:
      'Instant torque, zero emissions, and uncompromised power for professional turf, with significantly lower running costs.',
  },
  {
    title: 'Adjustable',
    titleHighlight: 'Cut Height',
    description:
      'Software-controlled electric actuator sets cutting height from 12 to 100mm. No manual adjustments, ever.',
  },
  {
    title: 'Collision',
    titleHighlight: 'Avoidance',
    description:
      'Integrated LiDAR and vision systems detect obstacles in real time, ensuring safe operation around people and objects.',
  },
  {
    title: 'Sensor Based',
    titleHighlight: 'Intelligence',
    description:
      'Real-time machine health monitoring lets you track performance, predict maintenance needs, and allocate resources efficiently.',
  },
  {
    title: 'Low OpEx &',
    titleHighlight: 'Maintenance',
    description:
      'Fewer moving parts, dock-based auto charging, and remote diagnostics keep your total cost of ownership minimal.',
  },
];

export function LawnMaintenanceFeatures() {
  return (
    <section
      id="features"
      className="overflow-hidden bg-gradient-to-b from-gray-200 to-gray-200 py-12 lg:py-24"
    >
      <div className="relative w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Section header */}
        <div className="mx-auto mb-20 max-w-5xl text-center lg:mb-28">
          <h2
            className="mb-8 text-5xl leading-[1.15] font-medium tracking-tight text-balance break-words text-gray-900 lg:text-6xl xl:text-7xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Professional turf care-zero compromise.
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 lg:text-2xl">
            Built for golf courses, commercial estates, and large-scale landscaping, where
            precision and reliability are non-negotiable.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="flex flex-col rounded-xl bg-gray-300 p-10 transition-all duration-200 lg:p-12"
            >
              <h3
                className="mb-6 text-2xl leading-[1.18] font-semibold text-balance break-words lg:text-3xl xl:text-4xl"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                <span className="text-gray-900">{feature.title} </span>
                <span className="inline [box-decoration-break:clone] text-[#7ccd54] [-webkit-box-decoration-break:clone]">
                  {feature.titleHighlight}
                </span>
              </h3>
              <p className="flex-1 text-base leading-relaxed text-gray-600 lg:text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
