import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BUILD_SPECS = [
  "Precision cutting height (12–100 mm)",
  "Rugged 2W drive drivetrain",
  "Turf-friendly weight distribution",
  "Cloud-connected fleet management",
  "High-torque brushless motor system",
  "IP65 rated weather resistance",
];

export function LawnMaintenanceSpecs() {
  return (
    <>
      {/* ── Build Quality ── */}
      <section className="bg-gradient-to-b from-gray-200 to-white py-16 lg:py-24 overflow-hidden">
        <div className="relative w-full px-6 sm:px-8 lg:px-16 xl:px-24">

          {/* Section header */}
          <div className="text-center mb-16 lg:mb-20 max-w-5xl mx-auto">
            <h2
              className="text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-gray-900 mb-8 leading-[1.1]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Built to last. <span className="text-[#7ccd54]">Proven in the field.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Professional-grade materials and components engineered for
              long-term durability across weather conditions and terrain types.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-[1600px] mx-auto">

            {/* Left: Build specs checklist */}
            <div className="space-y-5">
              {BUILD_SPECS.map((spec) => (
                <div key={spec} className="flex items-start gap-4 p-6 rounded-xl bg-transparent hover:bg-[#7ccd54]/10 transition-colors duration-300">
                  <span className="text-base lg:text-lg text-gray-700 leading-relaxed font-medium">{spec}</span>
                </div>
              ))}
            </div>

            {/* Right: Key stats */}
            <div className="relative min-h-[400px] lg:min-h-[500px] rounded-2xl bg-[#1a3a1f] overflow-hidden flex flex-col items-center justify-center p-12 text-center">
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(124,205,84,0.5) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a1f]/60 to-transparent" />
              <div className="relative z-10 space-y-12">
                {[
                  { value: "IP65", label: "Weather resistance rating" },
                  { value: "40 cm", label: "Precision cutting width" },
                  { value: "99.9%", label: "Operational uptime" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="text-5xl lg:text-6xl font-semibold text-white mb-2"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-base lg:text-lg text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1a3a1f] py-20 lg:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(124,205,84,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-[#7ccd54]/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <div className="inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#7ccd54] mb-8 border border-[#7ccd54]/20 uppercase">
            Get Started
          </div>
          <h2
            className="text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl text-balance mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ready to automate your grounds?
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-xl mx-auto">
            Talk to our team and get a deployment plan tailored to your property
            within 48 hours — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#7ccd54] text-gray-900 font-semibold hover:bg-[#5ba83d] transition-colors duration-200"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/offerings/fleet-control"
              className="px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors duration-200"
            >
              Explore Fleet Control
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
