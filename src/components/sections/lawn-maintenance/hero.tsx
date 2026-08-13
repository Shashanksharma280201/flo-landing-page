'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { VideoPlayer } from '@/components/shared/video-player';
import { MagicDotPattern } from '@/components/ui/magicui-dot-pattern';

const STATS = [
  { value: '10k sqm', label: 'Coverage per day' },
  { value: '0°', label: 'Turning radius' },
  { value: '12–100mm', label: 'Cut height range' },
  { value: '3.5 hrs', label: 'Battery run time' },
];

export function LawnMaintenanceHero() {
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
              The most reliable hand{' '}
              <span className="inline [box-decoration-break:clone] text-[#7ccd54] [-webkit-box-decoration-break:clone]">
                on your lawn.
              </span>
            </h1>

            <p className="max-w-2xl text-xl leading-relaxed text-gray-300 lg:text-2xl">
              Precise, efficient, and fully autonomous. Flo's robotic mower handles
              professional turf management across any terrain, so your team can focus on
              higher-value work.
            </p>

            {/* Key stats */}
            <div className="grid grid-cols-2 gap-5 pt-2">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <div
                    className="text-2xl leading-tight font-semibold text-[#7ccd54] lg:text-3xl"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-2 text-sm leading-tight text-gray-400 lg:text-base">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

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
          </div>

          {/* ── Right: Video thumbnail ── */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <VideoPlayer videoId="NDvQAb3qPzI" title="Flo Autonomous Lawn Mower" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
