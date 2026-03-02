import { LayoutDashboard, LineChart } from "lucide-react";

export function FleetControlShowcase() {
  return (
    <section className="bg-[#fdfcf0] py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col gap-24 lg:gap-32">

          {/* ── 1. Multi-Robot Coordination ── */}
          <div className="grid grid-cols-1 items-center gap-12 lg:gap-20 lg:grid-cols-2">

            {/* Text — left on desktop */}
            <div className="order-2 lg:order-1 space-y-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0faf0]">
                <LayoutDashboard className="h-5 w-5 text-[#7ccd54]" />
              </div>
              <div className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 border border-gray-200 uppercase shadow-sm">
                Coordination
              </div>
              <h2
                className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl text-balance"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Multi-robot coordination, <span className="text-[#7ccd54]">simplified.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Streamline control across multiple robots from a single platform.
                Assign tasks, monitor progress, and manage entire fleets with
                unparalleled ease.
              </p>
              <ul className="space-y-3">
                {[
                  "Centralised task assignment",
                  "Real-time fleet status overview",
                  "Automated mission planning",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#7ccd54] shrink-0" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Video — right on desktop */}
            <div className="order-1 lg:order-2 relative aspect-video overflow-hidden rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <video
                src="https://flomobility.com/wp-content/uploads/2025/06/Flo-Nav.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* ── 2. Real-time Visualisation ── */}
          <div className="grid grid-cols-1 items-center gap-12 lg:gap-20 lg:grid-cols-2">

            {/* Video — left on desktop */}
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <video
                src="https://flomobility.com/wp-content/uploads/2025/06/data-visualisation-realtime-1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </div>

            {/* Text — right on desktop */}
            <div className="space-y-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0faf0]">
                <LineChart className="h-5 w-5 text-[#7ccd54]" />
              </div>
              <div className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 border border-gray-200 uppercase shadow-sm">
                Visualisation
              </div>
              <h2
                className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl text-balance"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Real-time data, <span className="text-[#7ccd54]">at a glance.</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Enhanced situational awareness through comprehensive data
                collection and management. Visualise sensor feeds, telemetry,
                and environmental maps in real time.
              </p>
              <ul className="space-y-3">
                {[
                  "Live sensor data streaming",
                  "3D environment mapping",
                  "Performance analytics & reporting",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#7ccd54] shrink-0" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
