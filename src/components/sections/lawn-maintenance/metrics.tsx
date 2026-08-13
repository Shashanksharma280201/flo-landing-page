const PERFORMANCE = [
  { label: 'Drivetrain', value: 'Rugged 2W drive' },
  { label: 'Turning Radius', value: '0°' },
  { label: 'Operating Speed', value: '3 km/h' },
  { label: 'Lawn Coverage', value: '10,000 sqm / day' },
  { label: 'Cutting Width', value: '40 cm (16 inch)' },
  { label: 'Height Control', value: 'Electric actuator, 12–100 mm' },
  { label: 'Battery', value: '24V swappable LFP' },
  { label: 'Run Time', value: '3.5 hours' },
];

const NAVIGATION = [
  { label: 'Operating Sensors', value: 'Tilt & Lift, Rain, GPS, Sonar' },
  { label: 'Obstacle Avoidance', value: 'Yes' },
  { label: 'Object Detection', value: '8 inch height, 2m radius' },
  { label: 'Auto Charging', value: 'Dock based' },
  { label: 'Connectivity', value: 'Wi-Fi, Bluetooth' },
  { label: 'Modes', value: 'Teleoperation & Autonomy' },
  { label: 'Real-Time Monitoring', value: 'Yes' },
];

function SpecTable({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Table header */}
      <div className="border-b border-gray-200 bg-gray-50 px-8 py-6 lg:px-10">
        <h3
          className="text-lg font-semibold tracking-wider text-gray-900 uppercase lg:text-xl"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {title}
        </h3>
      </div>
      {/* Rows */}
      <div className="divide-y divide-gray-100">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="group flex cursor-pointer items-center justify-between gap-6 px-8 py-5 transition-colors duration-300 hover:bg-[#7ccd54]/25 lg:px-10 lg:py-6"
          >
            <dt className="text-base text-gray-600 lg:text-lg">{row.label}</dt>
            <dd
              className="shrink-0 text-right text-base font-semibold text-gray-900 lg:text-lg"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LawnMaintenanceMetrics() {
  return (
    <section className="overflow-hidden bg-white py-16 lg:py-20 xl:py-24">
      <div className="relative w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Section header */}
        <div className="mx-auto mb-20 max-w-5xl text-center lg:mb-28">
          <h2
            className="mb-8 text-5xl leading-[1.15] font-medium tracking-tight text-balance break-words text-gray-900 lg:text-6xl xl:text-7xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Engineered for high-performance{' '}
            <span className="inline [box-decoration-break:clone] text-[#7ccd54] [-webkit-box-decoration-break:clone]">
              turf management.
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 lg:text-2xl">
            Industrial-grade reliability across every operational parameter.
          </p>
        </div>

        {/* Two spec tables */}
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <SpecTable title="Performance" rows={PERFORMANCE} />
          <SpecTable title="Navigation & Control" rows={NAVIGATION} />
        </div>
      </div>
    </section>
  );
}
