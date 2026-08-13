'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Users, Target, Zap, Globe } from 'lucide-react';

// ─── Design tokens — matches offering pages exactly ───────────────────────────
const BG = '#ffffff';
const BG2 = '#f5f5f5';
const GREEN = '#7ccd54';
const TEXT = '#191c1a';
const MUTED = 'rgba(25,28,26,0.55)';
const DIM = 'rgba(25,28,26,0.15)';
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Shared animation primitives ─────────────────────────────────────────────

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
        className="text-[10px] font-bold tracking-[0.26em] whitespace-nowrap uppercase"
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const CORE_TEAM = [
  {
    name: 'Manesh Jain',
    title: 'Founder & CEO',
    description: 'MDI Gurgaon, Gold Medalist. Ex-IBM | 22+ years | 3X Founder',
    image: '/about/manesh-jain.avif',
    photoPosition: 'center 30%',
    linkedin: 'https://www.linkedin.com/in/maneshjain/',
  },
  {
    name: 'Pratik Patel',
    title: 'Co-Founder & COO',
    description:
      "Ex-Byju's, Accenture | Business & Product Leader | 10+ years | 2X Founder",
    image: '/about/pratik-patel.avif',
    photoPosition: 'center 65%',
    linkedin: 'https://www.linkedin.com/in/pratikpatel0929/',
  },
];

const VALUES = [
  {
    icon: Target,
    title: 'Mission First',
    body: 'Every decision is filtered through one question: does this accelerate autonomous work for the real world?',
  },
  {
    icon: Zap,
    title: 'Speed of Trust',
    body: 'We move fast, deploy fast, and build long-term relationships on the back of results. Not promises.',
  },
  {
    icon: Users,
    title: 'Human + Machine',
    body: 'Autonomy amplifies humans. We build systems that make workers safer and sites more productive, not obsolete.',
  },
  {
    icon: Globe,
    title: 'India Built, Global Ready',
    body: 'Engineered for the toughest Indian job sites, robust enough to deploy anywhere in the world.',
  },
];

const MILESTONES = [
  {
    year: '2020',
    title: 'Company Founded',
    body: 'Flo Mobility established with a vision to revolutionize autonomous robotics for industrial applications.',
  },
  {
    year: '2021',
    title: 'Seed Funding & First Prototype',
    body: 'Secured seed funding. First autonomous prototype cleared field testing across construction sites.',
  },
  {
    year: '2022',
    title: 'First Commercial Deployment',
    body: 'First robot went live on a major construction site. Lawn maintenance solution launched for golf courses and large estates.',
  },
  {
    year: '2023',
    title: 'G20 Summit Showcase',
    body: 'Demonstrated technology at G20 in Gandhinagar. Crossed 100+ robot deployments across three industry verticals.',
  },
  {
    year: '2024',
    title: 'Fleet Control Platform',
    body: 'Released cloud fleet management. Channel partner network established. Expanded into mining with AI navigation upgrades.',
  },
  {
    year: '2025',
    title: '200+ Sites Deployed',
    body: '200+ active deployment sites. Next-generation autonomous systems in development with enhanced AI and connectivity.',
  },
];

const STATS = [
  { value: '5 yrs', label: 'In Operation' },
  { value: '3', label: 'Product Lines' },
  { value: '24/7', label: 'Remote Support' },
];

// ─── Section 1 — Hero ────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="mt-[40px] w-full px-6 pt-24 pb-0 md:px-16 md:pt-28 lg:px-24 xl:px-32"
      style={{ background: BG2 }}
    >
      {/* Breadcrumb */}
      <FadeUp className="mb-12">
        <div
          className="flex items-center gap-2 text-[10px] font-bold tracking-[0.24em] uppercase"
          style={{ color: DIM }}
        >
          <Link href="/" className="hover:underline" style={{ color: DIM }}>
            Home
          </Link>
          <span>/</span>
          <span style={{ color: TEXT }}>About</span>
        </div>
      </FadeUp>

      <div className="grid items-center gap-16 pb-0 lg:grid-cols-2 lg:gap-24">
        {/* Left — text */}
        <div>
          <div className="mb-8 text-[clamp(2.75rem,5vw,6rem)]">
            <RevealText>
              <h1
                className="leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Redefining
              </h1>
            </RevealText>
            <RevealText delay={0.06}>
              <h1
                className="leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                how machines
              </h1>
            </RevealText>
            <RevealText delay={0.12}>
              <h1
                className="leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                work.
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
              At Flo Mobility, autonomy means more than self-driving robots. It means
              leveraging sensors, computer vision, edge computing, and intelligent
              actuators to optimise how humans and machines work together, delivering
              speed, safety, and control at scale.
            </p>
          </FadeUp>

          <FadeUp delay={0.35} className="mb-14 flex flex-wrap gap-4">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2.5 rounded-full px-[clamp(1.125rem,1.5vw,2rem)] py-[clamp(0.7rem,0.8vw,1rem)] text-[clamp(0.75rem,0.68rem_+_0.32vw,0.9375rem)] font-bold tracking-wide uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: GREEN,
                color: '#fff',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              Join the Team{' '}
              <ArrowRight className="h-[clamp(0.875rem,1vw,1rem)] w-[clamp(0.875rem,1vw,1rem)]" />
            </Link>
            <Link
              href="/channel-partner"
              className="inline-flex items-center gap-2 rounded-full border px-[clamp(1.125rem,1.5vw,2rem)] py-[clamp(0.7rem,0.8vw,1rem)] text-[clamp(0.75rem,0.68rem_+_0.32vw,0.9375rem)] font-bold transition-all duration-300 hover:bg-white"
              style={{ borderColor: DIM, color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              Become a Partner{' '}
              <ArrowUpRight className="h-[clamp(0.875rem,1vw,1rem)] w-[clamp(0.875rem,1vw,1rem)]" />
            </Link>
          </FadeUp>
        </div>

        {/* Right — showcase image */}
        <FadeUp delay={0.15} className="flex flex-col gap-4">
          {/* Main image — landscape to fit the wide robot shot */}
          <div
            className="relative aspect-video overflow-hidden rounded-2xl border"
            style={{ borderColor: DIM }}
          >
            <Image
              src="/about/team-1.avif"
              alt="Flo Mobility robot in the field"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-6">
              <div
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                Founded 2020 · Bengaluru, India
              </div>
            </div>
          </div>
          {/* Bottom row — G20 photo + stat tile */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-xl border"
              style={{ borderColor: DIM }}
            >
              <Image
                src="/about/team-2.avif"
                alt="Flo at G20 Summit 2023"
                fill
                className="object-cover object-top"
                sizes="25vw"
              />
            </div>

            <div
              className="relative aspect-[4/3] overflow-hidden rounded-xl border"
              style={{ borderColor: DIM }}
            >
              <Image
                src="/about/team-3.avif"
                alt="Flo at G20 Summit 2023"
                fill
                className="object-cover object-top"
                sizes="25vw"
              />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 2 — Values ───────────────────────────────────────────────────────

function ValueCell({ value, index }: { value: (typeof VALUES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !glowRef.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    glowRef.current.style.background = `radial-gradient(ellipse 80% 80% at ${x}% ${y}%, ${GREEN}28 0%, transparent 65%)`;
    glowRef.current.style.opacity = '1';
  };
  const onLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  };

  return (
    <motion.div
      ref={ref}
      className="relative flex cursor-default flex-col overflow-hidden border-r border-b p-10"
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
        style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
      />
      <span
        className="mb-6 block text-[10px] font-bold tracking-[0.24em] uppercase"
        style={{ color: DIM }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div
        className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: `${GREEN}18` }}
      >
        <value.icon className="h-5 w-5" style={{ color: GREEN }} />
      </div>
      <h3
        className="mb-3 text-lg leading-snug font-black tracking-[-0.02em]"
        style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
      >
        {value.title}
      </h3>
      <p
        className="flex-1 text-sm leading-[1.85]"
        style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
      >
        {value.body}
      </p>
    </motion.div>
  );
}

function ValuesSection() {
  return (
    <section className="w-full border-t" style={{ background: BG, borderColor: DIM }}>
      <div className="w-full px-6 pt-16 pb-8 md:px-16 md:pt-32 md:pb-16 lg:px-24 xl:px-32">
        <SectionRule label="What We Stand For" />
        <div className="grid items-end gap-16 lg:grid-cols-[1fr_420px]">
          <div className="text-[clamp(2.75rem,5vw,6rem)]">
            <RevealText className="mb-1">
              <h2
                className="leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Founding
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2
                className="leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                Principles
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <p
              className="text-base leading-relaxed"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              The beliefs that shape every product decision, every hire, and every
              deployment we make.
            </p>
          </FadeUp>
        </div>
      </div>
      <div className="w-full border-t border-l" style={{ borderColor: DIM }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <ValueCell key={v.title} value={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3 — Journey (Timeline) ──────────────────────────────────────────

function MilestoneRow({
  milestone,
  i,
}: {
  milestone: (typeof MILESTONES)[0];
  i: number;
}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <FadeUp delay={0.08 * i}>
      <div
        className="group grid cursor-default grid-cols-[70px_1fr_16px] items-start gap-4 border-b py-7 sm:grid-cols-[120px_1fr_24px] sm:gap-8 sm:py-10"
        style={{ borderColor: DIM }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Year */}
        <div
          className="pt-0.5 text-[1.8rem] leading-none font-black tabular-nums transition-colors duration-500 sm:text-[2.6rem]"
          style={{
            color: hovered ? GREEN : 'rgba(4 104 37 / 0.86)',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          {milestone.year}
        </div>
        {/* Content */}
        <div>
          <h3
            className="mb-3 text-xl leading-snug font-black"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            {milestone.title}
          </h3>
          <p
            className="text-base leading-[1.85]"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            {milestone.body}
          </p>
        </div>
        {/* Arrow */}
        <div className="pt-1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" style={{ color: GREEN }} />
        </div>
      </div>
    </FadeUp>
  );
}

function JourneySection() {
  return (
    <section
      className="w-full border-t px-6 py-20 md:px-16 md:py-40 lg:px-24 xl:px-32"
      style={{ background: BG2, borderColor: DIM }}
    >
      <SectionRule label="Our Journey" />
      <div className="grid items-start gap-24 lg:grid-cols-[520px_1fr]">
        <div className="lg:sticky lg:top-32">
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(2.6rem,5vw,5.75rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              Five years of
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
              autonomous
            </h2>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              className="text-[clamp(2.6rem,5vw,5.75rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              progress.
            </h2>
          </RevealText>
          <FadeUp delay={0.3} className="mt-8">
            <p
              className="text-base leading-[1.85]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              From a first prototype on a Bengaluru construction site to 200+ active
              deployments. Every milestone pushed the frontier of what autonomous machines
              can do.
            </p>
          </FadeUp>
        </div>
        <div>
          {MILESTONES.map((m, i) => (
            <MilestoneRow key={m.year + m.title} milestone={m} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4 — Leadership ───────────────────────────────────────────────────

// LinkedIn icon SVG
function LinkedInIcon() {
  return (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LeaderCard({ person, index }: { person: (typeof CORE_TEAM)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.14 * index, ease: EASE }}
    >
      {/* ── Dark card shell ── */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{ background: '#0e1210' }}
      >
        {/* ── Photo — contained, no cropping ── */}
        <div
          className="relative flex w-full items-center justify-center bg-[#141a12]"
          style={{ height: 'clamp(240px, 28vw, 340px)' }}
        >
          <Image
            src={person.image}
            alt={person.name}
            fill
            className="object-contain"
            style={{ objectPosition: 'center center' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            quality={90}
          />
          {/* Subtle bottom fade for smooth transition into info panel */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0e1210] to-transparent" />
        </div>

        {/* ── Info panel — always fully visible ── */}
        <div className="relative z-10 px-7 pt-4 pb-8">
          {/* Number badge */}
          <span
            className="mb-4 block text-[10px] font-bold tracking-[0.28em] uppercase"
            style={{ color: `${GREEN}70` }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Name + LinkedIn on same row */}
          <div className="mb-1 flex items-start justify-between gap-3">
            <h3
              className="text-2xl leading-tight font-black tracking-[-0.02em] text-white sm:text-3xl"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {person.name}
            </h3>

            {/* LinkedIn CTA — right-aligned with name */}
            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${person.name} on LinkedIn`}
                className="inline-flex flex-shrink-0 items-center gap-2 rounded-full px-3 py-2 text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-200 hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.75)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = `${GREEN}22`;
                  (e.currentTarget as HTMLAnchorElement).style.color = GREEN;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${GREEN}50`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    'rgba(255,255,255,0.75)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    'rgba(255,255,255,0.12)';
                }}
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            )}
          </div>

          {/* Title pill */}
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-block h-px w-6" style={{ background: GREEN }} />
            <span
              className="text-[11px] font-bold tracking-[0.22em] uppercase"
              style={{ color: GREEN }}
            >
              {person.title}
            </span>
          </div>

          {/* Description — always visible */}
          <p
            className="text-sm leading-[1.8] sm:text-base"
            style={{ color: 'rgba(255,255,255,0.60)', fontFamily: 'var(--font-dm-sans)' }}
          >
            {person.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function TeamSection() {
  return (
    <section className="w-full border-t" style={{ background: BG2, borderColor: DIM }}>
      <div className="w-full px-6 pt-16 pb-16 md:px-16 md:pt-32 md:pb-28 lg:px-24 xl:px-32">
        <SectionRule label="Leadership" />

        {/* Header */}
        <div className="mb-16 grid items-center gap-16 md:mb-20 lg:grid-cols-[1fr_420px]">
          <div className="text-[clamp(2.65rem,6vw,7rem)]">
            <RevealText className="mb-1">
              <h2
                className="leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                The founders driving
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2
                className="leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                the mission.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.25} className="pb-2">
            <p
              className="text-base leading-[1.85] md:text-lg"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              Serial founders, operators, and engineers who've built and scaled technology
              businesses across India and beyond.
            </p>
          </FadeUp>
        </div>

        {/* Leader cards — 2-col on md+, full-width on mobile */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7">
          {CORE_TEAM.map((m, i) => (
            <LeaderCard key={m.name} person={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5 — Team Photo Strip (coverflow infinite scroll) ─────────────────

// prettier-ignore
const TEAM_PHOTOS = [
  { src: "/about/manesh-jain.avif",       alt: "Manesh Jain" },
  { src: "/about/pratik-patel.avif",      alt: "Pratik Patel" },
  { src: "/about/showcase.avif",          alt: "Field Operations" },
  { src: "/about/bhavik-shah.avif",       alt: "Bhavik Shah" },
  { src: "/about/g20.avif",               alt: "G20 Summit 2023" },
  { src: "/about/sudarshan-narayan.avif", alt: "Sudarshan Narayan" },
  { src: "/about/showcase.avif",          alt: "On-Site Deployment" },
  { src: "/about/manesh-jain.avif",       alt: "Leadership" },
  { src: "/about/g20.avif",               alt: "G20 Showcase" },
  { src: "/about/pratik-patel.avif",      alt: "Product & Growth" },
];

// Triple for seamless infinite loop — middle set is the "live" window
const STRIP_PHOTOS = [...TEAM_PHOTOS, ...TEAM_PHOTOS, ...TEAM_PHOTOS];

// Card dimensions & spacing
const CARD_W = 300;
const CARD_H = 420;
const CARD_GAP = 20;
const STRIDE = CARD_W + CARD_GAP;

// Scale curve: distance in number-of-cards from center → scale value
function scaleForDist(dist: number): number {
  // dist 0 = center card (scale 1.0), dist 1 = adjacent (0.75), dist 2+ (0.62)
  // More dramatic drop-off to match reference image
  if (dist < 0.4) return 1.0;
  if (dist < 1.4) return 1.0 - 0.25 * (dist - 0.4);
  return Math.max(0.6, 0.75 - 0.13 * (dist - 1.4));
}

// function TeamPhotoStrip() {
//   const trackRef  = useRef<HTMLDivElement>(null);
//   const outerRef  = useRef<HTMLDivElement>(null);
//   const offsetRef = useRef<number>(0);   // fractional pixel offset (sub-pixel smooth)
//   const isPaused  = useRef(false);
//   const rafRef    = useRef<number>(0);
//
//   // Array of per-card transform strings — driven via direct DOM mutation for 60fps
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
//
//   const applyScales = React.useCallback(() => {
//     const outer = outerRef.current;
//     if (!outer) return;
//     const viewW = outer.clientWidth;
//     const viewCenter = offsetRef.current + viewW / 2;
//
//     STRIP_PHOTOS.forEach((_, i) => {
//       const el = cardRefs.current[i];
//       if (!el) return;
//       const cardCenter = i * STRIDE + CARD_W / 2;
//       const dist = Math.abs(viewCenter - cardCenter) / STRIDE;
//       const s = scaleForDist(dist);
//       // opacity: center full (1.0), sides strongly dimmed (0.35)
//       const op = 0.35 + 0.65 * Math.max(0, 1 - dist * 0.7);
//       el.style.transform = `scale(${s.toFixed(4)})`;
//       el.style.opacity   = op.toFixed(4);
//     });
//   }, []);
//
//   React.useEffect(() => {
//     const outer = outerRef.current;
//     const track = trackRef.current;
//     if (!outer || !track) return;
//
//     const SPEED = 0.7;
//     const singleSetW = TEAM_PHOTOS.length * STRIDE;
//
//     // Start offset so the middle set (second copy) is what we show first
//     offsetRef.current = singleSetW;
//     track.style.transform = `translateY(-50%) translateX(-${offsetRef.current}px)`;
//     applyScales();
//
//     const tick = () => {
//       if (!isPaused.current) {
//         offsetRef.current += SPEED;
//         // Loop: when we've scrolled past the second set, jump back one full set
//         if (offsetRef.current >= singleSetW * 2) {
//           offsetRef.current -= singleSetW;
//         }
//         track.style.transform = `translateY(-50%) translateX(-${offsetRef.current}px)`;
//         applyScales();
//       }
//       rafRef.current = requestAnimationFrame(tick);
//     };
//
//     rafRef.current = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, [applyScales]);
//
//   return (
//     <section
//       className="w-full border-t relative"
//       style={{ background: "#0e1210", borderColor: "rgba(255,255,255,0.07)", overflowX: "hidden", overflowY: "visible" }}
//     >
//       {/* Ambient centre glow */}
//       <div
//         className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[130px]"
//         style={{ background: `${GREEN}0d` }}
//       />
//
//       {/* ── Header ── */}
//       <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 xl:px-32 pt-16 md:pt-20 pb-10 md:pb-12">
//         <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
//           <div>
//             <span className="block text-[10px] font-bold tracking-[0.28em] uppercase mb-4" style={{ color: `${GREEN}80` }}>
//               The People
//             </span>
//             <RevealText>
//               <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.96] tracking-[-0.04em] text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>
//                 Team FLO —
//               </h2>
//             </RevealText>
//             <RevealText delay={0.06}>
//               <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[0.96] tracking-[-0.04em]" style={{ color: GREEN, fontFamily: "var(--font-dm-sans)" }}>
//                 builders by nature.
//               </h2>
//             </RevealText>
//           </div>
//           <FadeUp delay={0.2}>
//             <p className="text-sm sm:text-base leading-[1.85] max-w-xs sm:max-w-sm sm:text-right" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-dm-sans)" }}>
//               Engineers, operators, and innovators united by one goal — making machines work for people.
//             </p>
//           </FadeUp>
//         </div>
//       </div>
//
//       {/* ── Coverflow track ── */}
//       {/*
//         Strategy: outerRef is the clipping viewport (overflow:hidden).
//         trackRef is an absolutely-positioned row of cards, translated via
//         offsetRef. Scale/opacity are applied per-card via direct style mutation
//         (no React re-render) so we get true 60fps.
//       */}
//       <div
//         ref={outerRef}
//         className="relative w-full"
//         style={{ height: CARD_H + 60 }}
//         onMouseEnter={() => { isPaused.current = true; }}
//         onMouseLeave={() => { isPaused.current = false; }}
//         onTouchStart={() => { isPaused.current = true; }}
//         onTouchEnd   ={() => { isPaused.current = false; }}
//       >
//         {/* Left + right edge fades */}
//         <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10" style={{ background: "linear-gradient(to right, #0e1210 15%, transparent)" }} />
//         <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10" style={{ background: "linear-gradient(to left,  #0e1210 15%, transparent)" }} />
//
//         {/* Track — rendered wider than viewport, scrolled via transform */}
//         <div
//           ref={trackRef}
//           className="absolute left-0 flex will-change-transform"
//           style={{
//             top: "50%",
//             transform: "translateY(-50%)",
//             gap: CARD_GAP,
//             // Total width = all cards + gaps
//             width: STRIP_PHOTOS.length * STRIDE,
//           }}
//         >
//           {STRIP_PHOTOS.map((photo, i) => (
//             <div
//               key={i}
//               ref={el => { cardRefs.current[i] = el; }}
//               className="flex-shrink-0 relative overflow-hidden rounded-2xl"
//               style={{
//                 width: CARD_W,
//                 height: CARD_H,
//                 transformOrigin: "center center",
//                 willChange: "transform, opacity",
//                 transition: "transform 0.18s ease, opacity 0.18s ease",
//               }}
//             >
//               <Image
//                 src={photo.src}
//                 alt={photo.alt}
//                 fill
//                 className="object-cover"
//                 sizes={`${CARD_W}px`}
//                 quality={80}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//
//       {/* Bottom breathing room */}
//       <div style={{ height: 32 }} />
//     </section>
//   );
// }

// ─── Section 5 — CTA ─────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      className="relative w-full overflow-hidden border-t px-6 py-24 md:px-16 md:py-48 lg:px-24 xl:px-32"
      style={{ background: BG2, borderColor: DIM }}
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
          style={{ background: `${GREEN}18` }}
        />
      </div>

      <div className="relative text-center text-[clamp(2rem,7vw,8rem)]">
        <FadeUp>
          <p
            className="mb-12 text-[11px] font-black tracking-[0.32em] uppercase"
            style={{ color: MUTED }}
          >
            Join the mission
          </p>
        </FadeUp>
        <RevealText className="mb-1">
          <h2
            className="leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            Join us to build
          </h2>
        </RevealText>
        <RevealText delay={0.05} className="mb-1">
          {' '}
          <h2
            className="leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: 'rgba(4 104 37 / 0.86)', fontFamily: 'var(--font-dm-sans)' }}
          >
            the future of
          </h2>
        </RevealText>
        <RevealText delay={0.1} className="mb-20">
          <h2
            className="leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            automated construction
          </h2>
        </RevealText>

        <FadeUp delay={0.3}>
          <p
            className="mx-auto mb-12 max-w-xl text-lg leading-relaxed"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            Whether you're an engineer, an operator, or a business leader, there's a place
            for you in the Flo ecosystem.
          </p>
        </FadeUp>

        <FadeUp delay={0.4} className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/careers"
            className="inline-flex items-center justify-center gap-2.5 rounded-full px-12 py-5 text-sm font-black shadow-lg transition-all duration-300 hover:scale-105"
            style={{
              background: GREEN,
              color: '#ffffff',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            View Open Roles <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-12 py-5 text-sm font-bold transition-all duration-300 hover:bg-white"
            style={{ borderColor: DIM, color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            Get in Touch
          </Link>
        </FadeUp>

        <FadeUp
          delay={0.5}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {['Founded 2020', '3 Product Lines', 'Bengaluru, India'].map((t) => (
            <div
              key={t}
              className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase"
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="w-full" style={{ color: TEXT, background: BG2 }}>
      <HeroSection />
      <ValuesSection />
      {/* <JourneySection /> */}
      <TeamSection />
      {/* <TeamPhotoStrip /> */}
      <CTASection />
    </div>
  );
}
