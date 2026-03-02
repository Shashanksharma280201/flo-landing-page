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
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Table header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h3
          className="text-sm font-semibold text-gray-900 uppercase tracking-wider"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {title}
        </h3>
      </div>
      {/* Rows */}
      <div className="divide-y divide-gray-50">
        {rows.map((row, i) => (
          <div key={row.label} className="flex items-center justify-between px-6 py-4 gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className="text-xs font-semibold text-[#7ccd54]/50 shrink-0 w-5"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="text-sm text-gray-500 truncate">{row.label}</dt>
            </div>
            <dd
              className="text-sm font-semibold text-gray-900 text-right shrink-0"
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
    <section className="bg-white py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">

        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block rounded-full bg-[#fdfcf0] px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
            Technical Specs
          </div>
          <h2
            className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Engineered for high-performance turf management.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Industrial-grade reliability across every operational parameter.
          </p>
        </div>

        {/* Two spec tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpecTable title="Performance" rows={PERFORMANCE} />
          <SpecTable title="Navigation & Control" rows={NAVIGATION} />
        </div>

      </div>
    </section>
  );
}
