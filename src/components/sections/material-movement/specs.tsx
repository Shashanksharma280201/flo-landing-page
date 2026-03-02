import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VideoPlayer } from "@/components/shared/video-player";

const SPECS = [
  { label: "Load Capacity", value: "500–700 kg" },
  { label: "Max Speed", value: "5 km/h" },
  { label: "Gradeability", value: "Up to 20°" },
  { label: "Battery Life", value: "8–10 hours" },
  { label: "Charging Time", value: "3 hrs (fast charge)" },
  { label: "Navigation", value: "LiDAR + Camera Fusion" },
];

export function MaterialMovementSpecs() {
  return (
    <>
      {/* ── Technical Specs ── */}
      <section id="specs" className="bg-white py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* Left: Specs list — channel-partner benefits style */}
            <div className="space-y-10">
              <div>
                <div className="inline-block rounded-full bg-[#fdfcf0] px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
                  Technical Data
                </div>
                <h2
                  className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mb-4"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Built to last. <br />
                  <span className="text-[#7ccd54]">Engineered to perform.</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Industrial-grade components designed for continuous operation
                  across construction, mining, and warehouse environments.
                </p>
              </div>

              {/* Spec rows — divide-y pattern from channel-partner */}
              <div className="divide-y divide-gray-100 border-t border-gray-100">
                {SPECS.map((spec, i) => (
                  <div key={spec.label} className="py-5 flex gap-5 items-center">
                    <span
                      className="text-xs font-semibold text-[#7ccd54]/60 w-6 shrink-0"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-1 items-center justify-between gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        {spec.label}
                      </dt>
                      <dd
                        className="text-sm font-semibold text-gray-900 text-right"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
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
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                <VideoPlayer
                  videoId="KMTNnYjulQE"
                  title="Flo AMR Technical Overview"
                />
              </div>
              {/* Caption */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <div className="h-1.5 w-1.5 rounded-full bg-[#7ccd54]" />
                Flo AMR v2 — Field performance overview
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
            Ready to automate your site?
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-xl mx-auto">
            Talk to our team and get a deployment plan tailored to your worksite
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
