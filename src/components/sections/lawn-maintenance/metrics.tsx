const PERFORMANCE = [
  { label: "Drivetrain", value: "Rugged 2W drive" },
  { label: "Turning Radius", value: "0°" },
  { label: "Operating Speed", value: "3 km/h" },
  { label: "Lawn Coverage", value: "10,000 sqm / day" },
  { label: "Cutting Width", value: "40 cm (16 inch)" },
  { label: "Height Control", value: "Electric actuator, 12–100 mm" },
  { label: "Battery", value: "24V swappable LFP" },
  { label: "Run Time", value: "3.5 hours" },
];

const NAVIGATION = [
  { label: "Operating Sensors", value: "Tilt & Lift, Rain, GPS, Sonar" },
  { label: "Obstacle Avoidance", value: "Yes" },
  { label: "Object Detection", value: "8 inch height, 2m radius" },
  { label: "Auto Charging", value: "Dock based" },
  { label: "Connectivity", value: "Wi-Fi, Bluetooth" },
  { label: "Modes", value: "Teleoperation & Autonomy" },
  { label: "Real-Time Monitoring", value: "Yes" },
];

function SpecTable({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      {/* Table header */}
      <div className="px-8 lg:px-10 py-6 border-b border-gray-200 bg-gray-50">
        <h3
          className="text-lg lg:text-xl font-semibold text-gray-900 uppercase tracking-wider"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {title}
        </h3>
      </div>
      {/* Rows */}
      <div className="divide-y divide-gray-100">
        {rows.map((row, i) => (
          <div key={row.label} className="group flex items-center justify-between px-8 lg:px-10 py-5 lg:py-6 gap-6 hover:bg-[#7ccd54]/25 transition-colors duration-300 cursor-pointer">
            <dt className="text-base lg:text-lg text-gray-600">{row.label}</dt>
            <dd
              className="text-base lg:text-lg font-semibold text-gray-900 text-right shrink-0"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
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
    <section className="bg-white py-16 lg:py-20 xl:py-24 overflow-hidden">
      <div className="relative w-full px-6 sm:px-8 lg:px-16 xl:px-24">

        {/* Section header */}
        <div className="text-center mb-20 lg:mb-28 max-w-5xl mx-auto">
          <h2
            className="text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-gray-900 mb-8 leading-[1.1]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Engineered for high-performance <span className="text-[#7ccd54]">turf management.</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Industrial-grade reliability across every operational parameter.
          </p>
        </div>

        {/* Two spec tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-[1600px] mx-auto">
          <SpecTable title="Performance" rows={PERFORMANCE} />
          <SpecTable title="Navigation & Control" rows={NAVIGATION} />
        </div>

      </div>
    </section>
  );
}
