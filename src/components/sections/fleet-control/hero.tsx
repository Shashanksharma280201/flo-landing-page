"use client";

import Link from "next/link";
import Image from "next/image";
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

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-center">

          {/* ── Left: Text ── */}
          <div className="space-y-10">
            <h1
              className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl text-balance leading-[1.15]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Manage your entire fleet from{" "}
              <span className="text-[#7ccd54]">one dashboard.</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
              A centralised interface for seamless coordination, real-time
              monitoring, and management of your entire autonomous robot fleet —
              from any device, anywhere.
            </p>

            {/* Highlight list */}
            <ul className="space-y-4 pt-2">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-[#7ccd54] shrink-0" />
                  <span className="text-base lg:text-lg text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-5 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-9 py-5 rounded-full bg-[#7ccd54] text-gray-900 font-semibold text-base lg:text-lg hover:bg-[#5ba83d] transition-colors duration-200"
              >
                Request a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="px-9 py-5 rounded-full border border-white/20 text-white font-semibold text-base lg:text-lg hover:bg-white/5 transition-colors duration-200"
              >
                Explore Features
              </Link>
            </div>

            {/* Trust bar */}
            <div className="flex items-center gap-10 lg:gap-12 pt-4 border-t border-white/10">
              {TRUST_STATS.map((item) => (
                <div key={item.stat}>
                  <div
                    className="text-3xl lg:text-4xl font-semibold text-white"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {item.stat}
                  </div>
                  <div className="text-sm lg:text-base text-gray-400 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Dashboard mockup with HUD Image ── */}
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
                  fleet.flomobility.com
                </div>
              </div>

              {/* Dashboard body with HUD Image */}
              <div className="relative bg-[#0f1f0f] rounded-lg overflow-hidden">
                <Image
                  src="/hud-dashboard.png"
                  alt="Fleet Control Dashboard - Real-time Robot Management"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
