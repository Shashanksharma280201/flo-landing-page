import { VideoPlayer } from '@/components/shared/video-player';

export function FleetControlShowcase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white py-24 lg:py-32 xl:py-40">
      {/* Ambient background effects */}
      <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-[#7ccd54]/5 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="relative mx-auto w-[90%] lg:w-[75%]">
        <div className="flex flex-col gap-32 lg:gap-48">
          {/* ── 1. Multi-Robot Coordination ── */}
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
            {/* Text — left on desktop */}
            <div className="order-2 space-y-8 lg:order-1 lg:space-y-10">
              {/* Heading */}
              <h2
                className="text-4xl leading-[1.15] font-medium tracking-tight text-balance break-words text-gray-900 lg:text-5xl xl:text-6xl"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Fleet Control for your{' '}
                <span className="inline [box-decoration-break:clone] text-[#7ccd54] [-webkit-box-decoration-break:clone]">
                  Autonomous Mobile Robots
                </span>
              </h2>

              {/* Description */}
              <p className="max-w-2xl text-xl leading-relaxed text-gray-600 lg:text-2xl">
                Streamline the control and coordination of multiple robots from a single
                platform.
              </p>

              {/* Feature List */}
              <ul className="space-y-5 pt-4">
                {[
                  'Centralised task assignment',
                  'Real-time fleet status overview',
                  'Automated mission planning',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r from-[#7ccd54] to-[#5ba83d] shadow-lg" />
                    <span className="text-lg font-medium text-gray-700 lg:text-xl">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Video — right on desktop, larger size */}
            <div className="group relative order-1 lg:order-2">
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-lg bg-gradient-to-br from-[#7ccd54]/20 via-cyan-500/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Video container */}
              <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 shadow-[0_30px_80px_rgba(0,0,0,0.12)] ring-1 ring-gray-100">
                <VideoPlayer
                  videoId="xZUHuWx-K40"
                  title="Fleet navigation demo"
                  className="h-full w-full rounded-lg shadow-none transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* ── 2. Real-time Visualisation ── */}
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
            {/* Video — left on desktop, larger size */}
            <div className="group relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-lg bg-gradient-to-bl from-cyan-500/20 via-[#7ccd54]/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Video container */}
              <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 shadow-[0_30px_80px_rgba(0,0,0,0.12)] ring-1 ring-gray-100">
                <VideoPlayer
                  videoId="ujKah39dmkU"
                  title="Real-time data visualisation demo"
                  className="h-full w-full rounded-lg shadow-none transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            </div>

            {/* Text — right on desktop */}
            <div className="space-y-8 lg:space-y-10">
              {/* Heading */}
              <h2
                className="text-4xl leading-[1.15] font-medium tracking-tight text-balance break-words text-gray-900 lg:text-5xl xl:text-6xl"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Real time{' '}
                <span className="inline [box-decoration-break:clone] text-[#7ccd54] [-webkit-box-decoration-break:clone]">
                  data visualization
                </span>
              </h2>

              {/* Description */}
              <p className="max-w-2xl text-xl leading-relaxed text-gray-600 lg:text-2xl">
                Data collection and management for enhanced situational awareness.
              </p>

              {/* Feature List */}
              <ul className="space-y-5 pt-4">
                {[
                  'Live sensor data streaming',
                  '3D environment mapping',
                  'Performance analytics & reporting',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg" />
                    <span className="text-lg font-medium text-gray-700 lg:text-xl">
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
