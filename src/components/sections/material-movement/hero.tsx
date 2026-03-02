"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VideoPlayer } from "@/components/shared/video-player";
import { MagicDotPattern } from "@/components/ui/magicui-dot-pattern";

const STATS = [
  { value: "6x", label: "Efficiency boost" },
  { value: "700 kg", label: "Max payload" },
  { value: "20°", label: "Gradeability" },
  { value: "8–10 hrs", label: "Battery life" },
];

export function MaterialMovementHero() {
  return (
    <section className="relative bg-[#1a3a1f] overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Dot pattern — same as channel-partner hero */}
      <MagicDotPattern
        glow
        width={32}
        height={32}
        cr={1}
        className="text-[#7ccd54]/[0.10] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_40%,transparent_100%)]"
      />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#7ccd54]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-[#7ccd54]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-14 items-center">

          {/* ── Left: Text content ── */}
          <div className="space-y-8">
            <div className="inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#7ccd54] border border-[#7ccd54]/20 uppercase">
              Autonomous Material Handling
            </div>

            <h1
              className="text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl text-balance leading-[1.15]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Logistics that move with{" "}
              <span className="text-[#7ccd54]">your business.</span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              Flo's autonomous material mover delivers safer, faster, and fully
              driverless payload transport — purpose-built for construction,
              mining, and industrial worksites.
            </p>

            {/* Key stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="border border-white/10 rounded-xl px-3 py-3 bg-white/5 text-center"
                >
                  <div
                    className="text-xl font-semibold text-[#7ccd54]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#7ccd54] text-gray-900 font-semibold hover:bg-[#5ba83d] transition-colors duration-200"
              >
                Request a Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#features"
                className="px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors duration-200"
              >
                Explore Features
              </Link>
            </div>
          </div>

          {/* ── Right: Video thumbnail ── */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            <VideoPlayer
              videoId="r_DdD3mPB_0"
              title="Flo Autonomous Material Mover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
