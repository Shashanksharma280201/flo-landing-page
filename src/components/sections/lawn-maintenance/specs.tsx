import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const BUILD_SPECS = [
  'Precision cutting height (12–100 mm)',
  'Rugged 2W drive drivetrain',
  'Turf-friendly weight distribution',
  'Cloud-connected fleet management',
  'High-torque brushless motor system',
  'IP65 rated weather resistance',
];

export function LawnMaintenanceSpecs() {
  return (
    <>
      {/* ── Build Quality ── */}
      <section className="overflow-hidden bg-gradient-to-b from-gray-200 to-white py-16 lg:py-24">
        <div className="relative w-full px-6 sm:px-8 lg:px-16 xl:px-24">
          {/* Section header */}
          <div className="mx-auto mb-16 max-w-5xl text-center lg:mb-20">
            <h2
              className="mb-8 text-5xl leading-[1.15] font-medium tracking-tight text-balance break-words text-gray-900 lg:text-6xl xl:text-7xl"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Built to last.{' '}
              <span className="inline [box-decoration-break:clone] text-[#7ccd54] [-webkit-box-decoration-break:clone]">
                Proven in the field.
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 lg:text-2xl">
              Professional-grade materials and components engineered for long-term
              durability across weather conditions and terrain types.
            </p>
          </div>

          {/* Content Grid */}
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: Build specs checklist */}
            <div className="space-y-5">
              {BUILD_SPECS.map((spec) => (
                <div
                  key={spec}
                  className="flex items-start gap-4 rounded-xl bg-transparent p-6 transition-colors duration-300 hover:bg-[#7ccd54]/10"
                >
                  <span className="text-base leading-relaxed font-medium text-gray-700 lg:text-lg">
                    {spec}
                  </span>
                </div>
              ))}
            </div>

            {/* Right: Key stats */}
            <div className="relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#1a3a1f] p-12 text-center lg:min-h-[500px]">
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(124,205,84,0.5) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a1f]/60 to-transparent" />
              <div className="relative z-10 space-y-12">
                {[
                  { value: 'IP65', label: 'Weather resistance rating' },
                  { value: '40 cm', label: 'Precision cutting width' },
                  { value: '99.9%', label: 'Operational uptime' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="mb-2 text-5xl font-semibold text-white lg:text-6xl"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-base text-gray-400 lg:text-lg">{stat.label}</div>
                  </div>
                ))}
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
            Ready to automate your grounds?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-300">
            Talk to our team and get a deployment plan tailored to your property within 48
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
