'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VideoPlayer } from '@/components/shared/video-player';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Cloud,
  MonitorSmartphone,
  Network,
  Users,
  Activity,
  Lock,
  Truck,
  Boxes,
  Globe,
} from 'lucide-react';

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

// ─── Dashboard mockup ──────────────────────────────────────────

function DashboardMockup({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border shadow-xl ${className}`}
      style={{ borderColor: DIM }}
    >
      <div
        className="flex items-center gap-2 border-b px-4 py-3"
        style={{ background: BG2, borderColor: DIM }}
      >
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: DIM }} />
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: DIM }} />
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: GREEN }} />
        </div>
        <div
          className="ml-2 flex-1 rounded px-3 py-1 font-mono text-[10px]"
          style={{ background: BG, color: MUTED }}
        >
          fleet.flomobility.com
        </div>
      </div>
      <div className="relative aspect-video" style={{ background: '#0a140a' }}>
        <Image
          src="/hud-dashboard.png"
          alt="Fleet Control Dashboard. Real-time Robot Management"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

// ─── Section 1 — Hero ─────────────────────────────────────────

const HERO_STATS = [
  { value: '24/7', label: 'Support' },
  { value: '99.9%', label: 'Uptime' },
  { value: '100+', label: 'Fleets managed' },
  { value: '<100', label: 'ms latency' },
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
                Manage your
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
                entire fleet from
              </h1>
            </RevealText>
            <RevealText delay={0.12}>
              <h1
                className="text-[clamp(2.75rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                one dashboard.
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
              A centralised interface for seamless coordination, real-time monitoring, and
              management of your entire autonomous robot fleet, from any device, anywhere
              in the world.
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
              Request a Demo{' '}
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
        </div>

        {/* Right — dashboard */}
        <FadeUp delay={0.15} className="flex flex-col gap-6">
          <DashboardMockup />
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: 'Real-Time Telemetry',
                value: 'Live',
                sub: 'Per-robot status feeds',
              },
              { label: 'Cloud Uptime', value: '99.9%', sub: 'Multi-region resilience' },
            ].map((c, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-xl border p-6"
                style={{ borderColor: DIM, background: BG, minHeight: 120 }}
              >
                <div
                  className="mb-2 text-3xl font-black"
                  style={{ color: GREEN, fontFamily: 'var(--font-dm-sans)' }}
                >
                  {c.value}
                </div>
                <div>
                  <div
                    className="text-base font-black"
                    style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {c.label}
                  </div>
                  <div className="mt-0.5 text-sm" style={{ color: MUTED }}>
                    {c.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 2 — Proof ticker ──────────────────────────────────

const TICKER = [
  { value: '24/7', label: 'Support' },
  { value: '99.9%', label: 'Uptime' },
  { value: '<100 ms', label: 'Response Latency' },
  { value: 'Unlimited', label: 'Robot Scale' },
  { value: 'AES-256', label: 'Encryption' },
  { value: '3', label: 'Access Tiers' },
];

function ProofBar() {
  const doubledTicker = [...TICKER, ...TICKER];
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
      <div className="animate-fc-ticker flex items-center">
        {doubledTicker.map((m, i) => (
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
        @keyframes fc-ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-fc-ticker {
          animation: fc-ticker 24s linear infinite;
          display: flex;
          width: max-content;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}

// ─── Section 3 — Showcase (video alternating) ──────────────────

const SHOWCASE = [
  {
    tag: 'Coordination',
    heading: ['Multi-robot coordination,', 'simplified.'],
    headingGreen: 1,
    body: 'Streamline control across multiple robots from a single platform. Assign tasks, monitor progress, and manage entire fleets with unparalleled ease.',
    bullets: [
      'Centralised task assignment',
      'Real-time fleet status overview',
      'Automated mission planning',
    ],
    videoId: 'xZUHuWx-K40',
    videoLeft: false,
  },
  {
    tag: 'Visualisation',
    heading: ['Real-time data,', 'at a glance.'],
    headingGreen: 1,
    body: 'Enhanced situational awareness through comprehensive data collection and management. Visualise sensor feeds, telemetry, and environmental maps in real time.',
    bullets: [
      'Live sensor data streaming',
      '3D environment mapping',
      'Performance analytics & reporting',
    ],
    videoId: 'ujKah39dmkU',
    videoLeft: true,
  },
];

function ShowcaseSection() {
  return (
    <section className="w-full border-t" style={{ background: BG, borderColor: DIM }}>
      <div className="w-full px-6 pt-16 pb-12 md:px-16 md:pt-32 md:pb-24 lg:px-24 xl:px-32">
        <SectionRule label="Platform in Action" />
        <div className="flex flex-col gap-32">
          {SHOWCASE.map((item) => (
            <FadeUp key={item.tag} delay={0.05}>
              <div
                className={`grid items-center gap-16 lg:grid-cols-2 lg:gap-24 ${item.videoLeft ? '' : ''}`}
              >
                {/* Video */}
                <div
                  className={`relative aspect-video overflow-hidden rounded-2xl border ${item.videoLeft ? 'lg:order-1' : 'lg:order-2'}`}
                  style={{ borderColor: DIM }}
                >
                  <VideoPlayer
                    videoId={item.videoId}
                    title={`${item.tag} demo`}
                    className="h-full w-full rounded-2xl shadow-none"
                  />
                </div>

                {/* Text */}
                <div className={item.videoLeft ? 'lg:order-2' : 'lg:order-1'}>
                  <FadeUp delay={0.1}>
                    <span
                      className="mb-8 inline-block rounded-full border px-3 py-1.5 text-sm font-bold tracking-[0.24em] uppercase"
                      style={{
                        color: MUTED,
                        borderColor: DIM,
                        fontFamily: 'var(--font-dm-sans)',
                      }}
                    >
                      {item.tag}
                    </span>
                  </FadeUp>
                  <div className="mb-6">
                    {item.heading.map((line, li) => (
                      <RevealText key={li} delay={0.05 * li} className="mb-1">
                        <h2
                          className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.9] font-black tracking-[-0.03em]"
                          style={{
                            color:
                              li === item.headingGreen ? 'rgba(4 104 37 / 0.86)' : TEXT,
                            fontFamily: 'var(--font-dm-sans)',
                          }}
                        >
                          {line}
                        </h2>
                      </RevealText>
                    ))}
                  </div>
                  <FadeUp delay={0.2} className="mb-8">
                    <p
                      className="max-w-lg text-base leading-[1.85]"
                      style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {item.body}
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.28}>
                    <div className="flex flex-col gap-3">
                      {item.bullets.map((b) => (
                        <div key={b} className="flex items-center gap-3">
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: GREEN }}
                          />
                          <span
                            className="text-base font-medium"
                            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                          >
                            {b}
                          </span>
                        </div>
                      ))}
                    </div>
                  </FadeUp>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4 — Capabilities ──────────────────────────────────

const FEATURES = [
  {
    icon: Cloud,
    title: 'Cloud-Based Platform',
    body: 'Access your fleet control centre from anywhere with secure cloud infrastructure. No VPN or on-prem setup required.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Remote Teleoperation',
    body: 'Take direct control of any robot in your fleet with low-latency video feeds and real-time control links.',
  },
  {
    icon: Network,
    title: 'Dynamic Resource Allocation',
    body: 'Automatically distribute tasks across your fleet based on robot availability, battery level, and proximity to targets.',
  },
  {
    icon: Users,
    title: 'Multi-User Access',
    body: 'Role-based access control for operators, managers, and admins, with a full audit trail of every action taken.',
  },
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    body: 'Continuous health checks and status reporting for every hardware and software component in your fleet.',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    body: 'Encryption & secure authentication to protect your operational data at all times.',
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
        <SectionRule label="Software Capabilities" />
        <div className="grid items-end gap-16 lg:grid-cols-[1fr_420px]">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.65rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Built for fleets of
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
                any size.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <p
              className="text-base leading-relaxed"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              Our software stack gives operations teams the tools they need to run
              large-scale autonomous deployments without adding headcount.
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
    title: 'Connect Your Fleet',
    body: 'Onboard any Flo robot in minutes. Our cloud platform auto-discovers and pairs with your fleet across all sites. No manual IP configuration or VPN tunnels required.',
  },
  {
    number: '02',
    title: 'Assign Missions & Routes',
    body: 'Define tasks, assign route profiles, and schedule automated missions from a single unified dashboard. Role-based access ensures the right people see the right controls.',
  },
  {
    number: '03',
    title: 'Monitor, Scale & Optimise',
    body: 'Add more robots as your operation grows. Real-time telemetry, predictive diagnostics, and automated alerts give you complete visibility, without growing your ops team.',
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
              Up and running
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
              in
            </h2>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              className="text-[clamp(2.6rem,5vw,5.75rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              minutes.
            </h2>
          </RevealText>
          <FadeUp delay={0.3} className="mt-8">
            <p
              className="text-base leading-[1.85]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              From first login to first autonomous mission. Our onboarding process is
              designed to be instant, intuitive, and zero-friction.
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
    label: 'Construction & Infrastructure',
    description:
      'Coordinate multiple AMRs across active construction sites. Track payload loads, battery levels, and route deviations in real-time from a single command centre.',
    icon: Truck,
    stat: '100+',
    statLabel: 'Sites deployed',
    gradient: 'linear-gradient(135deg, #d4f5b8 0%, #a8e87c 100%)',
  },
  {
    label: 'Warehouse & Logistics',
    description:
      'Manage pick-and-place robots across multiple warehouse zones simultaneously. Dynamic resource allocation ensures zero idle time and maximum throughput.',
    icon: Boxes,
    stat: '24/7',
    statLabel: 'Continuous operation',
    gradient: 'linear-gradient(135deg, #c8f0a4 0%, #8fd65a 100%)',
  },
  {
    label: 'Multi-Site Fleet Management',
    description:
      'Oversee mixed fleets of autonomous robots across geographically distributed sites, including lawn mowers, material movers, and more, from one unified platform.',
    icon: Globe,
    stat: 'Unlimited',
    statLabel: 'Fleet scale',
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
      <div className="relative h-64 overflow-hidden">
        <motion.div
          className="absolute inset-0 flex scale-110 items-center justify-center"
          style={{ y: imgY, background: uc.gradient }}
        >
          <uc.icon className="h-28 w-28 opacity-20" style={{ color: '#fff' }} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
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
                autonomous
              </h2>
            </RevealText>
            <RevealText delay={0.12}>
              <h2
                className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                operation.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.3} className="pb-2">
            <div className="mb-8 h-10 w-px" style={{ background: GREEN }} />
            <p
              className="text-base leading-[1.85]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              Flo Fleet Control has been deployed across the most demanding autonomous
              operations in construction, logistics, and infrastructure.
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

// ─── Section 6 — Platform Specifications ──────────────────────

const SPECS = [
  { label: 'Cloud Infrastructure', value: 'AWS Multi-region' },
  { label: 'Response Latency', value: '< 100 ms' },
  { label: 'Uptime', value: '99.9%' },
  { label: 'Data Encryption', value: 'AES-256' },
  { label: 'Access Levels', value: '3' },
  { label: 'Video Feed Quality', value: 'Real-time HD' },
  { label: 'Fleet Scale', value: 'Unlimited robots' },
];

function SpecsSection() {
  return (
    <section
      id="specs"
      className="w-full border-t"
      style={{ background: BG2, borderColor: DIM }}
    >
      <div className="w-full px-6 py-20 md:px-16 md:py-40 lg:px-24 xl:px-32">
        <SectionRule label="Platform Specifications" />
        <div className="grid items-start gap-24 lg:grid-cols-2">
          {/* Left — specs */}
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.35rem,5vw,5.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Enterprise-grade.
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
                Cloud-native.
              </h2>
            </RevealText>

            <FadeUp delay={0.15} className="mb-10">
              <p
                className="max-w-md text-base leading-[1.85]"
                style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
              >
                Designed for mission-critical operations that can't afford downtime,
                latency, or security gaps at any scale.
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

          {/* Right — dashboard mockup */}
          <FadeUp delay={0.2} className="lg:pt-24">
            <DashboardMockup />
            <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: DIM }}>
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
              <span style={{ fontFamily: 'var(--font-dm-sans)' }}>
                Flo Fleet Control. Live command centre view
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
            Now available worldwide
          </p>
        </FadeUp>
        <RevealText className="mb-1">
          <h2
            className="text-[clamp(3.5rem,8vw,9.5rem)] leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            Experience
          </h2>
        </RevealText>
        <RevealText delay={0.05} className="mb-1">
          <h2
            className="text-[clamp(3.5rem,8vw,9.5rem)] leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: 'rgba(4 104 37 / 0.86)', fontFamily: 'var(--font-dm-sans)' }}
          >
            the future of
          </h2>
        </RevealText>
        <RevealText delay={0.1} className="mb-15">
          <h2
            className="mb-5 text-[clamp(3.5rem,8vw,9.5rem)] leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            fleet management.
          </h2>
        </RevealText>

        <FadeUp delay={0.3}>
          <p
            className="mx-auto mb-12 max-w-xl text-lg leading-relaxed"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            Request a personalised demo to see how Flo Fleet Control can transform your
            autonomous operations, within 48 hours.
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
            Request a Demo <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/offerings/material-movement"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-12 py-5 text-base font-bold transition-all duration-300 hover:bg-white"
            style={{ borderColor: DIM, color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            Explore Robots
          </Link>
        </FadeUp>

        <FadeUp
          delay={0.5}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {['99.9% Uptime', '< 100 ms Latency', 'Unlimited Scale', 'SOC 2 Compliant'].map(
            (t) => (
              <div
                key={t}
                className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] uppercase"
                style={{ color: DIM }}
              >
                <span className="h-1 w-1 rounded-full" style={{ background: GREEN }} />
                {t}
              </div>
            ),
          )}
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function FleetControlPage() {
  return (
    <div className="w-full" style={{ color: TEXT, background: BG2 }}>
      <HeroSection />
      <ProofBar />
      <ShowcaseSection />
      <CapabilitiesSection />
      <SpecsSection />
      {/* <UseCasesSection /> */}
      {/* <ProcessSection /> */}
      <CTASection />
    </div>
  );
}
