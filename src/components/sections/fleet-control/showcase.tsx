export function FleetControlShowcase() {
  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50/30 to-white py-24 lg:py-32 xl:py-40 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7ccd54]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto w-[90%] lg:w-[75%]">
        <div className="flex flex-col gap-32 lg:gap-48">
          {/* ── 1. Multi-Robot Coordination ── */}
          <div className="grid grid-cols-1 items-center gap-16 lg:gap-24 lg:grid-cols-[1fr_1.4fr]">
            {/* Text — left on desktop */}
            <div className="order-2 lg:order-1 space-y-8 lg:space-y-10">
              {/* Heading */}
              <h2
                className="text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-gray-900 leading-[1.15]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Fleet Control for your{" "}
                <span className="text-[#7ccd54]">Autonomous Mobile Robots</span>
              </h2>

              {/* Description */}
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Streamline the control and coordination of multiple robots from
                a single platform.
              </p>

              {/* Feature List */}
              <ul className="space-y-5 pt-4">
                {[
                  "Centralised task assignment",
                  "Real-time fleet status overview",
                  "Automated mission planning",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#7ccd54] to-[#5ba83d] shrink-0 shadow-lg" />
                    <span className="text-lg lg:text-xl text-gray-700 font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Video — right on desktop, larger size */}
            <div className="order-1 lg:order-2 relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#7ccd54]/20 via-cyan-500/10 to-transparent rounded-lg blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Video container */}
              <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 shadow-[0_30px_80px_rgba(0,0,0,0.12)] ring-1 ring-gray-100">
                <video
                  src="https://flomobility.com/wp-content/uploads/2025/06/Flo-Nav.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* ── 2. Real-time Visualisation ── */}
          <div className="grid grid-cols-1 items-center gap-16 lg:gap-24 lg:grid-cols-[1.4fr_1fr]">
            {/* Video — left on desktop, larger size */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-bl from-cyan-500/20 via-[#7ccd54]/10 to-transparent rounded-lg blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Video container */}
              <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 shadow-[0_30px_80px_rgba(0,0,0,0.12)] ring-1 ring-gray-100">
                <video
                  src="https://flomobility.com/wp-content/uploads/2025/06/data-visualisation-realtime-1.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Text — right on desktop */}
            <div className="space-y-8 lg:space-y-10">
              {/* Heading */}
              <h2
                className="text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-gray-900 leading-[1.15]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Real time{" "}
                <span className="text-[#7ccd54]">data visualization</span>
              </h2>

              {/* Description */}
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Data collection and management for enhanced situational
                awareness.
              </p>

              {/* Feature List */}
              <ul className="space-y-5 pt-4">
                {[
                  "Live sensor data streaming",
                  "3D environment mapping",
                  "Performance analytics & reporting",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shrink-0 shadow-lg" />
                    <span className="text-lg lg:text-xl text-gray-700 font-medium">
                      {item}
                    </span>
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
