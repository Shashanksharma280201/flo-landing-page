"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MagicDotPattern } from "@/components/ui/magicui-dot-pattern";

const TRUST_STATS = [
  { stat: "24/7", label: "Support" },
  { stat: "99.9%", label: "Uptime SLA" },
  { stat: "100+", label: "Fleets managed" },
];

const HIGHLIGHTS = [
  "Deploy & monitor unlimited robots",
  "Real-time telemetry & video feeds",
  "Cloud-based with 99.9% uptime",
];

export function FleetControlHero() {
  return (
    <section className="relative bg-[#1a3a1f] overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Dot pattern */}
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

          {/* ── Left: Text ── */}
          <div className="space-y-8">
            <div className="inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#7ccd54] border border-[#7ccd54]/20 uppercase">
              Fleet Management Platform
            </div>

            <h1
              className="text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl text-balance leading-[1.15]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Manage your entire fleet from{" "}
              <span className="text-[#7ccd54]">one dashboard.</span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              A centralised interface for seamless coordination, real-time
              monitoring, and management of your entire autonomous robot fleet —
              from any device, anywhere.
            </p>

            {/* Highlight list */}
            <ul className="space-y-3 pt-1">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#7ccd54] shrink-0" />
                  <span className="text-sm text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

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

            {/* Trust bar */}
            <div className="flex items-center gap-8 pt-2 border-t border-white/10">
              {TRUST_STATS.map((item) => (
                <div key={item.stat}>
                  <div
                    className="text-2xl font-semibold text-white"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {item.stat}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Dashboard mockup ── */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-2 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 bg-white/5 rounded-t-xl px-4 py-3 mb-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7ccd54]/60" />
                </div>
                <div className="flex-1 bg-white/5 rounded px-3 py-1 text-xs text-gray-400 font-mono ml-2">
                  app.flomobility.com/control
                </div>
              </div>

              {/* Dashboard body */}
              <div className="bg-[#0f1f0f] rounded-lg p-5 space-y-4">
                {/* Status cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active", value: "24", dot: "bg-[#7ccd54]" },
                    { label: "Idle", value: "3", dot: "bg-gray-500" },
                    { label: "Charging", value: "5", dot: "bg-amber-400" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide">{s.label}</span>
                      </div>
                      <div
                        className="text-2xl font-semibold text-white"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map area */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 aspect-video relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(124,205,84,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,205,84,0.5) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  {[
                    { x: "25%", y: "35%", delay: "0ms" },
                    { x: "55%", y: "50%", delay: "300ms" },
                    { x: "75%", y: "40%", delay: "600ms" },
                  ].map((pos, i) => (
                    <div
                      key={i}
                      className="absolute w-2.5 h-2.5 bg-[#7ccd54] rounded-full border-2 border-[#1a3a1f] shadow-lg animate-pulse"
                      style={{ left: pos.x, top: pos.y, animationDelay: pos.delay }}
                    />
                  ))}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                      Live map view
                    </span>
                  </div>
                </div>

                {/* Efficiency bar */}
                <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Fleet Efficiency</div>
                    <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[96%] bg-[#7ccd54] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-xl font-semibold text-[#7ccd54]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      96%
                    </div>
                    <div className="text-[10px] text-gray-400">↑ 12% this week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
