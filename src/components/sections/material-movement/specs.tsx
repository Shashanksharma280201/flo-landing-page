import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { VideoPlayer } from '@/components/shared/video-player';

const SPECS = [
  { label: 'Load Capacity', value: '500 kg' },
  { label: 'Max Speed', value: '5 km/h' },
  { label: 'Gradeability', value: 'Up to 20°' },
  { label: 'Battery Life', value: '8–10 hours' },
  { label: 'Charging Time', value: '3 hrs' },
  { label: 'Navigation', value: 'LiDAR + Camera Fusion' },
];

export function MaterialMovementSpecs() {
  return (
    <>
      {/* ── Technical Specs ── */}
      <section id="specs" className="overflow-hidden bg-white py-24 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left: Specs list — channel-partner benefits style */}
            <div className="space-y-10">
              <div>
                <div className="mb-6 inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 uppercase shadow-sm">
                  Technical Data
                </div>
                <h2
                  className="mb-4 text-3xl leading-[1.15] font-medium tracking-tight text-balance break-words text-gray-900 sm:text-4xl lg:text-5xl"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Built to last. <br />
                  <span className="inline [box-decoration-break:clone] text-[#7ccd54] [-webkit-box-decoration-break:clone]">
                    Engineered to perform.
                  </span>
                </h2>
                <p className="max-w-lg text-lg leading-relaxed text-gray-600">
                  Industrial-grade components designed for continuous operation across
                  construction, mining, and warehouse environments.
                </p>
              </div>

              {/* Spec rows — divide-y pattern from channel-partner */}
              <div className="divide-y divide-gray-100 border-t border-gray-100">
                {SPECS.map((spec, i) => (
                  <div key={spec.label} className="flex items-center gap-5 py-5">
                    <span
                      className="w-6 shrink-0 text-xs font-semibold text-[#7ccd54]/60"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-1 items-center justify-between gap-4">
                      <dt className="text-sm font-medium text-gray-500">{spec.label}</dt>
                      <dd
                        className="text-right text-sm font-semibold text-gray-900"
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        {spec.value}
                      </dd>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Video thumbnail */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                <VideoPlayer videoId="KMTNnYjulQE" title="Flo AMR Technical Overview" />
              </div>
              {/* Caption */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <div className="h-1.5 w-1.5 rounded-full bg-[#7ccd54]" />
                Flo AMR v2. Field performance overview
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-[#1a3a1f] py-20 lg:py-28">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(124,205,84,0.6) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[200px] w-[700px] -translate-x-1/2 rounded-full bg-[#7ccd54]/8 blur-[100px]" />

        <div className="relative z-10 container mx-auto max-w-3xl px-4 text-center">
          <div className="mb-8 inline-block rounded-full border border-[#7ccd54]/20 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#7ccd54] uppercase">
            Get Started
          </div>
          <h2
            className="mb-6 text-3xl font-medium tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Ready to automate your site?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-300">
            Talk to our team and get a deployment plan tailored to your worksite within 48
            hours. No commitment required.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#7ccd54] px-7 py-3.5 font-semibold text-gray-900 transition-colors duration-200 hover:bg-[#5ba83d]"
            >
              Book a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/offerings/fleet-control"
              className="rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition-colors duration-200 hover:bg-white/5"
            >
              Explore Fleet Control
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
