'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Play,
  Bot,
  Zap,
  SlidersHorizontal,
  ShieldCheck,
  Cpu,
  LineChart,
  Leaf,
  Building2,
  Landmark,
} from 'lucide-react';
import { TrackedYouTubeIframe } from '@/components/shared/tracked-youtube-iframe';

// ─── Design tokens ────────────────────────────────────────────
const BG = '#ffffff';
const BG2 = '#f5f5f5';
const GREEN = '#7ccd54';
const TEXT = '#191c1a';
const MUTED = 'rgba(25,28,26,0.55)';
const DIM = 'rgba(25,28,26,0.15)';
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Shared animation primitives ──────────────────────────────

function RevealText({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <div ref={ref} className={className}>
      <div
        style={{
          clipPath: 'inset(-0.18em -0.08em -0.34em -0.08em)',
          overflow: 'visible',
          paddingBlock: '0.18em 0.34em',
          marginBlock: '-0.18em -0.34em',
        }}
      >
        <motion.div
          initial={{ y: '110%', opacity: 0 }}
          animate={inView ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 1.0, delay, ease: EASE }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionRule({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  return (
    <motion.div
      ref={ref}
      className="mb-16 flex items-center gap-5"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <span
        className="text-sm font-bold tracking-[0.26em] whitespace-nowrap uppercase"
        style={{ color: DIM }}
      >
        {label}
      </span>
      <motion.div
        className="h-px flex-1"
        style={{ background: DIM }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
      />
    </motion.div>
  );
}

// ─── YouTube embed ─────────────────────────────────────────────

function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(
    `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
  );
  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-2xl border"
      style={{ borderColor: DIM }}
    >
      {playing ? (
        <TrackedYouTubeIframe
          videoId={videoId}
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src={thumbSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            onError={() => setThumbSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`)}
          />
          <div className="absolute inset-0 bg-black/30" />
          <button
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex items-center justify-center"
            aria-label="Play video"
          >
            <motion.div
              className="flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: GREEN }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <Play className="ml-1 h-8 w-8 fill-white text-white" />
            </motion.div>
          </button>
          <div
            className="absolute bottom-4 left-4 rounded-full px-3 py-1.5 text-sm font-semibold tracking-[0.16em] uppercase"
            style={{ background: 'rgba(25,28,26,0.6)', color: '#fff' }}
          >
            Watch the robot in action
          </div>
        </>
      )}
    </div>
  );
}

// ─── Section 1 — Hero ─────────────────────────────────────────

const HERO_STATS = [
  { value: '10k', label: 'sqm / day' },
  { value: '0°', label: 'Turning radius' },
  { value: '12–100', label: 'mm cut height' },
  { value: '3.5 hrs', label: 'Battery runtime' },
];

function HeroSection() {
  return (
    <section
      className="mt-[40px] w-full px-6 pt-24 pb-0 md:px-16 md:pt-28 lg:px-24 xl:px-32"
      style={{ background: BG2 }}
    >
      <div className="grid items-center gap-16 pb-0 lg:grid-cols-2 lg:gap-24">
        {/* Left — text */}
        <div>
          <div className="mb-8">
            <RevealText>
              <h1
                className="text-[clamp(2.75rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                The robot that
              </h1>
            </RevealText>
            <RevealText delay={0.06}>
              <h1
                className="text-[clamp(2.75rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                never stops
              </h1>
            </RevealText>
            <RevealText delay={0.12}>
              <h1
                className="text-[clamp(2.75rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                mowing.
              </h1>
            </RevealText>
          </div>

          <FadeUp delay={0.2}>
            <div className="mb-8 h-px w-16" style={{ background: DIM }} />
          </FadeUp>

          <FadeUp delay={0.25} className="mb-10">
            <p
              className="max-w-lg text-lg leading-[1.85]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              Flo's autonomous lawn mower delivers driverless, zero-emission grounds
              maintenance at scale, purpose-built for campuses, estates, and commercial
              landscapes that demand precision and reliability.
            </p>
          </FadeUp>

          <FadeUp delay={0.35} className="mb-14 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full px-[clamp(1.125rem,1.5vw,2rem)] py-[clamp(0.7rem,0.8vw,1rem)] text-[clamp(0.75rem,0.68rem_+_0.32vw,0.9375rem)] font-bold tracking-wide uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: GREEN,
                color: '#fff',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              Book a Free Consultation{' '}
              <ArrowRight className="h-[clamp(0.875rem,1vw,1rem)] w-[clamp(0.875rem,1vw,1rem)]" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border px-[clamp(1.125rem,1.5vw,2rem)] py-[clamp(0.7rem,0.8vw,1rem)] text-[clamp(0.75rem,0.68rem_+_0.32vw,0.9375rem)] font-bold transition-all duration-300 hover:bg-white"
              style={{ borderColor: DIM, color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              Explore Features{' '}
              <ChevronDown className="h-[clamp(0.875rem,1vw,1rem)] w-[clamp(0.875rem,1vw,1rem)]" />
            </a>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div
              className="grid grid-cols-2 border-t border-b sm:grid-cols-4"
              style={{ borderColor: DIM }}
            >
              {HERO_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-4 py-6 text-center ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b sm:border-b-0' : ''}`}
                  style={{ borderColor: DIM }}
                >
                  <div
                    className="mb-1 text-[clamp(1.4rem,2.5vw,2.4rem)] leading-none font-black tracking-[-0.02em]"
                    style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="mt-1 text-sm font-semibold tracking-[0.18em] uppercase"
                    style={{ color: MUTED }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Right — video */}
        <FadeUp delay={0.15} className="flex flex-col gap-6">
          <VideoEmbed
            videoId="NDvQAb3qPzI"
            title="Flo Autonomous Lawn Maintenance Robot"
          />
          <div className="grid grid-cols-2 gap-4">
            <div
              className="flex flex-col justify-between rounded-xl border p-6"
              style={{ borderColor: DIM, background: BG, minHeight: 120 }}
            >
              <div
                className="mb-2 text-3xl font-black"
                style={{ color: GREEN, fontFamily: 'var(--font-dm-sans)' }}
              >
                0°
              </div>
              <div>
                <div
                  className="text-base font-black"
                  style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                >
                  Zero-Turn Radius
                </div>
                <div className="mt-0.5 text-sm" style={{ color: MUTED }}>
                  Precision corner handling
                </div>
              </div>
            </div>
            <div
              className="flex flex-col justify-between rounded-xl border p-6"
              style={{ borderColor: DIM, background: BG, minHeight: 120 }}
            >
              <div
                className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ background: `${GREEN}18` }}
              >
                <Zap className="h-5 w-5" style={{ color: GREEN }} />
              </div>
              <div>
                <div
                  className="text-base font-black"
                  style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                >
                  Electric Drive
                </div>
                <div className="mt-0.5 text-sm" style={{ color: MUTED }}>
                  Zero emissions, all day
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 2 — Proof ticker ──────────────────────────────────

const TICKER = [
  { value: '10k', label: 'sqm / day' },
  { value: '0°', label: 'Turning Radius' },
  { value: '40 cm', label: 'Cutting Width' },
  { value: '3.5 hrs', label: 'Battery Runtime' },
  { value: 'IP65', label: 'Weather Rating' },
  { value: '99.9%', label: 'Uptime' },
  { value: '12–100', label: 'mm Cut Height' },
  { value: '0', label: 'Emissions' },
];

function ProofBar() {
  return (
    <section
      className="relative mt-0 w-full overflow-hidden border-t border-b"
      style={{ background: BG2, borderColor: DIM }}
    >
      <div className="pointer-events-none absolute inset-0 z-10">
        <div
          className="absolute top-0 bottom-0 left-0 w-24"
          style={{ background: `linear-gradient(to right, ${BG2} 60%, transparent)` }}
        />
        <div
          className="absolute top-0 right-0 bottom-0 w-24"
          style={{ background: `linear-gradient(to left, ${BG2} 60%, transparent)` }}
        />
      </div>
      <div className="animate-lm-ticker flex items-center">
        {[...TICKER, ...TICKER, ...TICKER].map((m, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-6 border-r px-10 py-6"
            style={{ borderColor: DIM }}
          >
            <span
              className="text-3xl font-black tracking-tight tabular-nums"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              {m.value}
            </span>
            <span
              className="text-sm font-semibold tracking-[0.2em] whitespace-nowrap uppercase"
              style={{ color: MUTED }}
            >
              {m.label}
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes lm-ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
        .animate-lm-ticker {
          animation: lm-ticker 36s linear infinite;
        }
      `}</style>
    </section>
  );
}

// ─── Section 3 — Capabilities ──────────────────────────────────

const FEATURES = [
  {
    icon: Bot,
    title: 'Driverless Operation',
    body: 'Fully autonomous navigation across complex terrain. No operator required after initial boundary setup.',
  },
  {
    icon: Zap,
    title: 'Electric Power Train',
    body: 'Zero-emission brushless motor system with regenerative braking for maximum efficiency on every run.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Adjustable Cut Height',
    body: 'Precision blade height control from 12 mm to 100 mm, configurable remotely via the fleet dashboard.',
  },
  {
    icon: ShieldCheck,
    title: 'Collision Avoidance',
    body: '360° LiDAR + camera fusion detects obstacles in real time and reroutes automatically. Zero contact incidents.',
  },
  {
    icon: Cpu,
    title: 'Sensor Based Intelligence',
    body: 'Multi-sensor fusion stack continuously maps the environment, enabling adaptive path planning on every pass.',
  },
  {
    icon: LineChart,
    title: 'Low OpEx & Maintenance',
    body: 'Brushless motor architecture and modular design dramatically reduce maintenance intervals and total cost of ownership.',
  },
];

function FeatureCell({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !glowRef.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    glowRef.current.style.background = `radial-gradient(ellipse 160% 130% at ${x}% ${y}%, ${GREEN}60 0%, ${GREEN}25 40%, rgba(255,255,255,0.06) 70%, transparent 85%)`;
    glowRef.current.style.opacity = '1';
  };
  const onLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  };

  return (
    <motion.div
      ref={ref}
      className="group relative flex cursor-default flex-col overflow-hidden border-r border-b p-6"
      style={{ borderColor: DIM }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05 * index, ease: EASE }}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0"
        style={{ opacity: 0, transition: 'opacity 0.35s ease' }}
      />
      {/* Top accent bar */}
      <div
        className="absolute top-0 right-0 left-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, ${GREEN}, ${GREEN}60)` }}
      />
      {/* Icon + Number row */}
      <div className="mb-4 flex items-center justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
          style={{ background: `${GREEN}18` }}
        >
          <feature.icon className="h-5 w-5" style={{ color: GREEN }} />
        </div>
        <span
          className="text-sm font-bold tracking-[0.24em] uppercase"
          style={{ color: DIM }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      {/* Title */}
      <h3
        className="mb-2 text-lg leading-snug font-black tracking-[-0.02em]"
        style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
      >
        {feature.title}
      </h3>
      {/* Body */}
      <p
        className="text-base leading-[1.75]"
        style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
      >
        {feature.body}
      </p>
    </motion.div>
  );
}

function CapabilitiesSection() {
  return (
    <section
      id="features"
      className="w-full border-t"
      style={{ background: BG, borderColor: DIM }}
    >
      <div className="w-full px-6 pt-16 pb-8 md:px-16 md:pt-32 md:pb-16 lg:px-24 xl:px-32">
        <SectionRule label="Capabilities" />
        <div className="grid items-end gap-16 lg:grid-cols-[1fr_420px]">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.65rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Precision-engineered for
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2
                className="text-[clamp(2.65rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                every ground condition.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <p
              className="text-base leading-relaxed"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              From manicured golf greens to rugged industrial campuses, our autonomous
              mower adapts to every landscape without missing a pass.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="w-full border-t border-l" style={{ borderColor: DIM }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureCell key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4 — How It Works ──────────────────────────────────

const STEPS = [
  {
    number: '01',
    title: 'Map Your Property',
    body: 'Our team arrives and defines virtual boundary zones with LiDAR mapping. The robot learns every edge, slope, and obstacle across your property in a single survey session.',
  },
  {
    number: '02',
    title: 'Schedule & Deploy',
    body: 'Configure mowing schedules remotely from the Fleet Control dashboard: daily, weekly, or on demand. Set cut height, coverage zones, and no-go areas without leaving your desk.',
  },
  {
    number: '03',
    title: 'Monitor & Optimise',
    body: 'Track coverage, battery health, and cut quality in real-time. Receive automated alerts for obstacles and get performance analytics to continuously improve your grounds management.',
  },
];

function StepRow({ step, i }: { step: (typeof STEPS)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeUp delay={0.1 + i * 0.1}>
      <div
        className="group flex cursor-default gap-8 border-b py-12"
        style={{ borderColor: DIM }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="w-24 shrink-0 pt-1 text-[5rem] leading-none font-black tabular-nums transition-colors duration-500"
          style={{
            color: hovered ? GREEN : 'rgba(4 104 37 / 0.86)',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          {step.number}
        </div>
        <div className="flex-1 pt-3">
          <h3
            className="mb-4 text-2xl font-black"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            {step.title}
          </h3>
          <p
            className="text-base leading-[1.85]"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            {step.body}
          </p>
        </div>
        <div className="flex shrink-0 items-start pt-5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" style={{ color: GREEN }} />
        </div>
      </div>
    </FadeUp>
  );
}

function ProcessSection() {
  return (
    <section
      className="w-full border-t px-6 py-20 md:px-16 md:py-40 lg:px-24 xl:px-32"
      style={{ background: BG2, borderColor: DIM }}
    >
      <SectionRule label="How It Works" />
      <div className="grid items-start gap-24 lg:grid-cols-[520px_1fr]">
        <div className="lg:sticky lg:top-32">
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(2.6rem,5vw,5.75rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              Operational in
            </h2>
          </RevealText>
          <RevealText delay={0.05} className="mb-1">
            <h2
              className="text-[clamp(2.6rem,5vw,5.75rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{
                color: 'rgba(4 104 37 / 0.86)',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              under
            </h2>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              className="text-[clamp(2.6rem,5vw,5.75rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              a day.
            </h2>
          </RevealText>
          <FadeUp delay={0.3} className="mt-8">
            <p
              className="text-base leading-[1.85]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              From site survey to first autonomous mowing run. Our deployment process is
              designed to be fast, low-friction, and ready to scale.
            </p>
          </FadeUp>
        </div>

        <div>
          {STEPS.map((step, i) => (
            <StepRow key={step.number} step={step} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5 — Where We Deploy ──────────────────────────────

const USE_CASES = [
  {
    label: 'Golf Courses & Sports Fields',
    description:
      'Maintain pristine greens, fairways, and sports pitches with millimetre-precision cut height and 24/7 availability. No groundskeeping crew needed.',
    icon: Leaf,
    stat: '10k',
    statLabel: 'sqm maintained / day',
    gradient: 'linear-gradient(135deg, #d4f5b8 0%, #a8e87c 100%)',
  },
  {
    label: 'Real Estate & Residential Complexes',
    description:
      'Keep large residential communities and commercial estates immaculate. Scheduled, silent, and fully autonomous, even in gated zones.',
    icon: Building2,
    stat: '0°',
    statLabel: 'Turning radius',
    gradient: 'linear-gradient(135deg, #c8f0a4 0%, #8fd65a 100%)',
  },
  {
    label: 'Industrial & Airport Campuses',
    description:
      'Automate vast outdoor grounds across airports, factories, and logistics parks. IP65-rated for all weather. Zero downtime, zero fuel costs.',
    icon: Landmark,
    stat: 'IP65',
    statLabel: 'All-weather rated',
    gradient: 'linear-gradient(135deg, #b8e890 0%, #7ccd54 100%)',
  },
];

function UseCaseCard({ uc, index }: { uc: (typeof USE_CASES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border"
      style={{ borderColor: DIM }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 * index, ease: EASE }}
    >
      {/* Illustrated image area with parallax */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          className="absolute inset-0 flex scale-110 items-center justify-center"
          style={{ y: imgY, background: uc.gradient }}
        >
          <uc.icon className="h-28 w-28 opacity-20" style={{ color: '#fff' }} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        {/* Stat overlay */}
        <div className="absolute bottom-4 left-4">
          <div
            className="text-4xl leading-none font-black text-white"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            {uc.stat}
          </div>
          <div className="mt-1 text-sm font-semibold tracking-[0.2em] text-white/70 uppercase">
            {uc.statLabel}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-8" style={{ background: BG }}>
        <div
          className="mb-3 text-sm font-bold tracking-[0.22em] uppercase"
          style={{ color: DIM }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3
          className="mb-3 text-xl font-black tracking-[-0.02em]"
          style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
        >
          {uc.label}
        </h3>
        <p
          className="text-base leading-[1.85]"
          style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
        >
          {uc.description}
        </p>
      </div>
    </motion.div>
  );
}

function UseCasesSection() {
  return (
    <section className="w-full border-t" style={{ background: BG, borderColor: DIM }}>
      <div className="w-full px-6 pt-16 pb-12 md:px-16 md:pt-32 md:pb-24 lg:px-24 xl:px-32">
        <SectionRule label="Where We Deploy" />
        <div className="mb-20 grid items-end gap-16 lg:grid-cols-[1fr_400px]">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Built for every
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-1">
              <h2
                className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                outdoor
              </h2>
            </RevealText>
            <RevealText delay={0.12}>
              <h2
                className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                environment.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.3} className="pb-2">
            <div className="mb-8 h-10 w-px" style={{ background: GREEN }} />
            <p
              className="text-base leading-[1.85]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              The Flo Lawn Mower has been deployed across the most demanding outdoor
              grounds management sectors in India.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {USE_CASES.map((uc, i) => (
            <UseCaseCard key={uc.label} uc={uc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 6 — Specifications ────────────────────────────────

const SPECS = [
  { label: 'Drivetrain', value: 'Electric 2WD' },
  { label: 'Turning Radius', value: '0° (Zero-Turn)' },
  { label: 'Operating Speed', value: 'Up to 1.5 km/h' },
  { label: 'Lawn Coverage', value: '10,000 sqm / day' },
  { label: 'Cutting Width', value: '40 cm' },
  { label: 'Height Control', value: '12–100 mm' },
  { label: 'Battery Runtime', value: '3.5 hrs / charge' },
  { label: 'Weather Rating', value: 'IP65' },
];

function SpecsSection() {
  return (
    <section
      id="specs"
      className="w-full border-t"
      style={{ background: BG2, borderColor: DIM }}
    >
      <div className="w-full px-6 py-20 md:px-16 md:py-40 lg:px-24 xl:px-32">
        <SectionRule label="Technical Specifications" />
        <div className="grid items-start gap-24 lg:grid-cols-2">
          {/* Left — specs */}
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.35rem,5vw,5.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Built to last.
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-12">
              <h2
                className="text-[clamp(2.35rem,5vw,5.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                Engineered to perform.
              </h2>
            </RevealText>

            <FadeUp delay={0.15} className="mb-10">
              <p
                className="max-w-md text-base leading-[1.85]"
                style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
              >
                Industrial-grade components designed for continuous outdoor operation
                across all weather conditions and ground types.
              </p>
            </FadeUp>

            <div className="border-t" style={{ borderColor: DIM }}>
              {SPECS.map((spec, i) => (
                <FadeUp key={spec.label} delay={0.1 + i * 0.06}>
                  <div
                    className="flex items-center justify-between border-b py-5"
                    style={{ borderColor: DIM }}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className="w-6 shrink-0 text-sm font-bold"
                        style={{ color: DIM }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="text-base font-medium"
                        style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                      >
                        {spec.label}
                      </span>
                    </div>
                    <span
                      className="text-base font-black tracking-[-0.01em]"
                      style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {spec.value}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Right — video */}
          <FadeUp delay={0.2} className="lg:pt-24">
            <VideoEmbed
              videoId="NDvQAb3qPzI"
              title="Flo Lawn Mower. Technical Overview"
            />
            <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: DIM }}>
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
              <span style={{ fontFamily: 'var(--font-dm-sans)' }}>
                Flo Lawn Mower. Field performance overview
              </span>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Section 7 — CTA ──────────────────────────────────────────

function CTASection() {
  return (
    <section
      className="relative w-full overflow-hidden border-t px-6 py-24 md:px-16 md:py-48 lg:px-24 xl:px-32"
      style={{ background: BG, borderColor: DIM }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(${GREEN}18 1px, transparent 1px), linear-gradient(90deg, ${GREEN}18 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-[140px]"
          style={{ background: `${GREEN}22` }}
        />
      </div>

      <div className="relative text-center">
        <FadeUp>
          <p
            className="mb-12 text-sm font-black tracking-[0.32em] uppercase"
            style={{ color: MUTED }}
          >
            Get started today
          </p>
        </FadeUp>
        <RevealText className="mb-1">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            Ready to
          </h2>
        </RevealText>
        <RevealText delay={0.05} className="mb-1">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: 'rgba(4 104 37 / 0.86)', fontFamily: 'var(--font-dm-sans)' }}
          >
            automate your
          </h2>
        </RevealText>
        <RevealText delay={0.1} className="mb-20">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            grounds?
          </h2>
        </RevealText>

        <FadeUp delay={0.3}>
          <p
            className="mx-auto mb-12 max-w-xl text-lg leading-relaxed"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            Talk to our team and get a deployment plan tailored to your property within 48
            hours. No commitment required.
          </p>
        </FadeUp>

        <FadeUp delay={0.4} className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 rounded-full px-12 py-5 text-base font-black shadow-lg transition-all duration-300 hover:scale-105"
            style={{
              background: GREEN,
              color: '#ffffff',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            Book a Free Consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/offerings/fleet-control"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-12 py-5 text-base font-bold transition-all duration-300 hover:bg-white"
            style={{ borderColor: DIM, color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            Explore Fleet Control
          </Link>
        </FadeUp>

        <FadeUp
          delay={0.5}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {['10k sqm / day', '0° Turning', '3.5 hrs Runtime', '0 Emissions'].map((t) => (
            <div
              key={t}
              className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] uppercase"
              style={{ color: DIM }}
            >
              <span className="h-1 w-1 rounded-full" style={{ background: GREEN }} />
              {t}
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function LawnMaintenancePage() {
  return (
    <div className="w-full" style={{ color: TEXT, background: BG2 }}>
      <HeroSection />
      <ProofBar />
      <CapabilitiesSection />
      <SpecsSection />
      <UseCasesSection />
      <ProcessSection />
      <CTASection />
    </div>
  );
}
