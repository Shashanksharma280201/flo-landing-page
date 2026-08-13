'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { MagicDotPattern } from '@/components/ui/magicui-dot-pattern';

const TRUST_STATS = [
  { stat: '24/7', label: 'Support' },
  { stat: '99.9%', label: 'Uptime' },
  { stat: '100+', label: 'Fleets managed' },
];

const HIGHLIGHTS = [
  'Deploy & monitor unlimited robots',
  'Real-time telemetry & video feeds',
  'Cloud-based with 99.9% uptime',
];

export function FleetControlHero() {
  return (
    <section className="relative overflow-hidden bg-[#1a3a1f] py-20 sm:py-24 lg:py-32">
      {/* Dot pattern */}
      <MagicDotPattern
        glow
        width={32}
        height={32}
        cr={1}
        className="[mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_40%,transparent_100%)] text-[#7ccd54]/[0.10]"
      />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-[300px] w-[500px] rounded-full bg-[#7ccd54]/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-[200px] w-[400px] rounded-full bg-[#7ccd54]/5 blur-[100px]" />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-28">
          {/* ── Left: Text ── */}
          <div className="space-y-10">
            <h1
              className="text-4xl leading-[1.15] font-medium tracking-tight text-balance break-words text-white sm:text-5xl lg:text-6xl xl:text-7xl"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Manage your entire fleet from{' '}
              <span className="inline [box-decoration-break:clone] text-[#7ccd54] [-webkit-box-decoration-break:clone]">
                one dashboard.
              </span>
            </h1>

            <p className="max-w-2xl text-xl leading-relaxed text-gray-300 lg:text-2xl">
              A centralised interface for seamless coordination, real-time monitoring, and
              management of your entire autonomous robot fleet, from any device, anywhere.
            </p>

            {/* Highlight list */}
            <ul className="space-y-4 pt-2">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-[#7ccd54]" />
                  <span className="text-base text-gray-300 lg:text-lg">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-5 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-[#7ccd54] px-9 py-5 text-base font-semibold text-gray-900 transition-colors duration-200 hover:bg-[#5ba83d] lg:text-lg"
              >
                Request a Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#features"
                className="rounded-full border border-white/20 px-9 py-5 text-base font-semibold text-white transition-colors duration-200 hover:bg-white/5 lg:text-lg"
              >
                Explore Features
              </Link>
            </div>

            {/* Trust bar */}
            <div className="flex items-center gap-10 border-t border-white/10 pt-4 lg:gap-12">
              {TRUST_STATS.map((item) => (
                <div key={item.stat}>
                  <div
                    className="text-3xl font-semibold text-white lg:text-4xl"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {item.stat}
                  </div>
                  <div className="mt-1 text-sm text-gray-400 lg:text-base">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Dashboard mockup with HUD Image ── */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm">
              {/* Browser chrome */}
              <div className="mb-2 flex items-center gap-2 rounded-t-xl bg-white/5 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#7ccd54]/60" />
                </div>
                <div className="ml-2 flex-1 rounded bg-white/5 px-3 py-1 font-mono text-xs text-gray-400">
                  fleet.flomobility.com
                </div>
              </div>

              {/* Dashboard body with HUD Image */}
              <div className="relative overflow-hidden rounded-lg bg-[#0f1f0f]">
                <Image
                  src="/hud-dashboard.png"
                  alt="Fleet Control Dashboard - Real-time Robot Management"
                  width={1920}
                  height={1080}
                  className="h-auto w-full object-contain"
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
