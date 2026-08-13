import { Cpu, Battery, Zap, ShieldCheck, Truck, LineChart } from 'lucide-react';

const features = [
  {
    title: 'Driverless Operation',
    description:
      'Eliminates human error and optimises performance through advanced autonomous navigation. No operator required on site.',
    icon: ShieldCheck,
  },
  {
    title: 'Electric Power Train',
    description:
      'Instant torque and uncompromised power for all terrains, with zero tailpipe emissions and lower fuel costs.',
    icon: Zap,
  },
  {
    title: 'Customisable Dumper',
    description:
      'Versatile payload platform capable of carrying 500 kg. Swap body configurations to match your site requirements.',
    icon: Truck,
  },
  {
    title: 'Swappable Batteries',
    description:
      'Hot-swap battery packs keep the robot running continuously across shifts. Zero waiting for a full recharge cycle.',
    icon: Battery,
  },
  {
    title: 'Sensor-Based Intelligence',
    description:
      'LiDAR + camera fusion delivers real-time spatial awareness, obstacle avoidance, and precise path following.',
    icon: Cpu,
  },
  {
    title: 'Low OpEx & Maintenance',
    description:
      'Fewer moving parts, predictive diagnostics via Fleet Control, and remote servicing reduce your total cost of ownership.',
    icon: LineChart,
  },
];

export function MaterialMovementFeatures() {
  return (
    <section id="features" className="overflow-hidden bg-white py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 uppercase shadow-sm">
            Capabilities
          </div>
          <h2
            className="mb-4 text-3xl font-medium tracking-tight text-balance text-gray-900 sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Built for the hardest environments on earth.
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            From underground mines to urban construction sites, our autonomous mover
            adapts to every terrain and use case without missing a beat.
          </p>
        </div>

        {/* Feature cards — mirrors channel-partner partner-types grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-200 hover:border-[#7ccd54]/30 hover:shadow-md"
            >
              {/* Index */}
              <span
                className="mb-4 block text-xs font-semibold text-[#7ccd54]/60"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0faf0]">
                <feature.icon className="h-5 w-5 text-[#7ccd54]" />
              </div>

              {/* Title */}
              <h3
                className="mb-2 text-base font-semibold text-gray-900"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p className="flex-1 text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
