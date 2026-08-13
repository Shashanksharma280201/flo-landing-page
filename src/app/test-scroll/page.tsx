'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { HeroWithScroll } from '@/components/hero-with-scroll';
import { CUSTOMERS } from '@/lib/constants';
import { ArrowRight, CheckCircle2, ArrowUpRight } from 'lucide-react';

// ─── Design tokens — FLO brand light theme ───────────────────────────────────
const BG = '#ffffff';
const BG2 = '#f5f5f5';
const BG_WARM = '#f0f0f0';
const GREEN = '#7ccd54'; // FLO primary green — buttons/CTAs only
const GREEN_D = '#286c00'; // darker green — buttons/links only
const TEXT = '#191c1a'; // near-black — all headings & accent lines
const MUTED = 'rgba(25,28,26,0.55)';
const DIM = 'rgba(25,28,26,0.15)';
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Primitive animation components ──────────────────────────────────────────

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
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '110%', opacity: 0 }}
        animate={inView ? { y: '0%', opacity: 1 } : {}}
        transition={{ duration: 1.0, delay, ease: EASE }}
      >
        {children}
      </motion.div>
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

// ─── Section 1 — Proof ticker ─────────────────────────────────────────────────

const METRICS = [
  { value: '50+', label: 'Robots Deployed' },
  { value: '10,000+', label: 'Hours Saved' },
  { value: '4,000 km', label: 'Autonomous Distance' },
  { value: '50+', label: 'Projects Completed' },
  { value: '500 kg', label: 'Payload Capacity' },
  { value: '30%', label: 'Fewer Accidents' },
  { value: '24/7', label: 'Operation' },
  { value: '<1 day', label: 'Deployment' },
];

function ProofBar() {
  return (
    <section
      className="relative w-full overflow-hidden border-b"
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
      <div className="animate-proof-ticker flex items-center">
        {[...METRICS, ...METRICS, ...METRICS].map((m, i) => (
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
              className="text-[11px] font-semibold tracking-[0.2em] whitespace-nowrap uppercase"
              style={{ color: MUTED }}
            >
              {m.label}
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes proof-ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
        .animate-proof-ticker {
          animation: proof-ticker 38s linear infinite;
        }
      `}</style>
    </section>
  );
}

// ─── Section 2 — Mission ──────────────────────────────────────────────────────

function MissionSection() {
  return (
    <section
      className="w-full px-8 py-40 md:px-16 lg:px-24 xl:px-32"
      style={{ background: BG }}
    >
      <SectionRule label="Mission" />
      <div className="grid items-end gap-20 lg:grid-cols-[1fr_400px]">
        <div>
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(3.5rem,8vw,9.5rem)] leading-[0.86] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              Autonomous
            </h2>
          </RevealText>
          <RevealText delay={0.06} className="mb-1">
            <h2
              className="text-[clamp(3.5rem,8vw,9.5rem)] leading-[0.86] font-black tracking-[-0.04em]"
              style={{ color: 'rgba(25,28,26,0.10)', fontFamily: 'var(--font-dm-sans)' }}
            >
              construction
            </h2>
          </RevealText>
          <RevealText delay={0.12}>
            <h2
              className="text-[clamp(3.5rem,8vw,9.5rem)] leading-[0.86] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              at scale.
            </h2>
          </RevealText>
        </div>

        <FadeUp delay={0.3} className="pb-4">
          <div className="mb-8 h-14 w-px" style={{ background: GREEN }} />
          <p
            className="mb-8 text-lg leading-[1.85]"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            FLO Mobility builds autonomous robots that work alongside your crew — hauling
            materials, maintaining grounds, and running 24/7 without breaks.
            Robot-as-a-Service for India's most demanding construction sites.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-wide uppercase transition-all duration-300 hover:gap-4"
            style={{ color: GREEN_D }}
          >
            See how it works <ArrowUpRight className="h-4 w-4" />
          </Link>
        </FadeUp>
      </div>

      {/* Stat strip */}
      <div
        className="mt-24 grid grid-cols-2 border-t md:grid-cols-4"
        style={{ borderColor: DIM }}
      >
        {[
          { value: '50+', label: 'Robots deployed' },
          { value: '10K+', label: 'Hours saved' },
          { value: '4,000 km', label: 'Autonomous distance' },
          { value: '50+', label: 'Projects completed' },
        ].map((s, i) => (
          <FadeUp key={s.label} delay={0.08 + i * 0.07}>
            <div
              className={`px-8 py-10 ${i < 3 ? 'border-r' : ''}`}
              style={{ borderColor: DIM }}
            >
              <div
                className="mb-2 text-[clamp(2.2rem,4vw,4.5rem)] leading-none font-black tracking-[-0.03em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                {s.value}
              </div>
              <div
                className="text-xs font-semibold tracking-[0.18em] uppercase"
                style={{ color: DIM }}
              >
                {s.label}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ─── Section 3 — Products (RaaS) with Parallax ───────────────────────────────

const PRODUCTS = [
  {
    number: '01',
    tag: 'Material Movement',
    title: '500–700 kg. Zero driver. Full speed.',
    body: 'With advanced sensors and autonomous navigation, this adaptable robot streamlines last-mile logistics on construction sites with speed and reliability.',
    stats: [
      { value: '500–700 kg', label: 'Payload' },
      { value: '24/7', label: 'Operation' },
      { value: '<1 day', label: 'Deploy Time' },
    ],
    points: [
      'Real-time route tracking and fleet visibility',
      'GPS-independent indoor + outdoor navigation',
      'Compatible with existing site workflows',
    ],
    image: '/mmr-images/mmr-images-1.avif',
    href: '/offerings/material-movement',
    cta: 'Explore Material Movement',
    flip: false,
  },
  {
    number: '02',
    tag: 'Lawn Maintenance',
    title: 'Precision grounds. Zero labour cost.',
    body: 'Our lawn mowing robot delivers consistent, safe, and cost-effective grounds maintenance. Runs autonomously across any terrain — day or night.',
    stats: [
      { value: 'GPS', label: 'Boundary Mapping' },
      { value: '360°', label: 'Sensor Coverage' },
      { value: '0', label: 'Emissions' },
    ],
    points: [
      'AI-guided precision mowing with GPS boundaries',
      'Automatic obstacle detection and avoidance',
      'Runs continuously with minimal supervision',
    ],
    image: '/mmr-images/mmr-images-2.avif',
    href: '/offerings/lawn-maintenance',
    cta: 'Explore Lawn Maintenance',
    flip: true,
  },
  {
    number: '03',
    tag: 'Wall Finishing',
    title: 'Uniform quality. Every surface. Every time.',
    body: 'Our wall finishing robot automates sanding and putty application with precision movement. Consistent quality at a fraction of traditional labour cost.',
    stats: [
      { value: '100%', label: 'Uniform Finish' },
      { value: '40%', label: 'Cost Reduction' },
      { value: '0', label: 'Rework Rate' },
    ],
    points: [
      'Precision putty application and sanding',
      'Reduces material waste by eliminating over-application',
      'Consistent quality across every wall surface',
    ],
    image: '/mmr-images/mmr-images-3.avif',
    href: '/offerings/material-movement',
    cta: 'Explore Wall Finishing',
    flip: false,
  },
];

function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const isFlip = product.flip;

  return (
    <div
      ref={ref}
      className="grid min-h-[680px] w-full overflow-hidden border-b lg:min-h-[800px] lg:grid-cols-2"
      style={{ borderColor: DIM }}
    >
      {/* Image — parallax */}
      <div
        className={`relative order-1 ${isFlip ? 'lg:order-2' : 'lg:order-1'} min-h-[360px] overflow-hidden`}
      >
        <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
          <Image
            src={product.image}
            alt={product.tag}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
        {/* Subtle gradient overlay */}
        <div
          className={`absolute inset-0 ${isFlip ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} z-10 from-black/30 via-black/10 to-transparent`}
        />
      </div>

      {/* Content */}
      <motion.div
        className={`relative order-2 flex items-center ${isFlip ? 'lg:order-1' : 'lg:order-2'}`}
        style={{ background: BG }}
        initial={{ opacity: 0, x: isFlip ? -48 : 48 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      >
        <div className="w-full px-10 py-16 sm:px-14 lg:px-16 lg:py-24 xl:px-20">
          {/* Stats */}
          <motion.div
            className="mb-12 flex overflow-hidden rounded-2xl border"
            style={{ borderColor: DIM, background: BG2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            {product.stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex-1 px-6 py-5 text-center ${i < product.stats.length - 1 ? 'border-r' : ''}`}
                style={{ borderColor: DIM }}
              >
                <div
                  className="mb-1.5 text-2xl leading-none font-black"
                  style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                >
                  {s.value}
                </div>
                <div
                  className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: DIM }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.h3
            className="mb-5 text-[clamp(1.8rem,3.2vw,3rem)] leading-[1.05] font-black tracking-[-0.025em]"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          >
            {product.title}
          </motion.h3>

          <motion.p
            className="mb-8 max-w-lg text-base leading-[1.85]"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {product.body}
          </motion.p>

          <motion.ul
            className="mb-10 space-y-3.5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {product.points.map((pt) => (
              <li key={pt} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-[18px] w-[18px] shrink-0"
                  style={{ color: GREEN }}
                />
                <span
                  className="text-sm leading-snug"
                  style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                >
                  {pt}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          >
            <Link
              href={product.href}
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold tracking-wide uppercase transition-all duration-400 hover:scale-105"
              style={{
                background: GREEN,
                color: '#ffffff',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              {product.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function ProductsSection() {
  return (
    <section className="w-full" style={{ background: BG2 }}>
      <div
        className="w-full border-t px-8 pt-28 pb-16 md:px-16 lg:px-24 xl:px-32"
        style={{ borderColor: DIM }}
      >
        <SectionRule label="Solutions" />
        <div className="grid items-end gap-16 lg:grid-cols-[1fr_380px]">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.8rem,6vw,7.5rem)] leading-[0.86] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Robot as a Service
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2
                className="text-[clamp(2.8rem,6vw,7.5rem)] leading-[0.86] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(25,28,26,0.10)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                three solutions.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <p
              className="text-base leading-relaxed"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              Cutting-edge robots on a flexible subscription — automating material
              handling, grounds maintenance, and wall finishing.
            </p>
          </FadeUp>
        </div>
      </div>
      <div className="w-full">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.number} product={p} />
        ))}
      </div>
    </section>
  );
}

// ─── Section 4 — Proof / Case Study ──────────────────────────────────────────

function CaseStudySection() {
  return (
    <section
      className="w-full border-t px-8 py-36 md:px-16 lg:px-24 xl:px-32"
      style={{ background: BG, borderColor: DIM }}
    >
      <SectionRule label="Proof of Work" />
      <div className="grid items-start gap-20 lg:grid-cols-[1fr_520px]">
        <div>
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.86] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              50% lower cost
            </h2>
          </RevealText>
          <RevealText delay={0.06} className="mb-1">
            <h2
              className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.86] font-black tracking-[-0.04em]"
              style={{ color: 'rgba(25,28,26,0.10)', fontFamily: 'var(--font-dm-sans)' }}
            >
              and time on
            </h2>
          </RevealText>
          <RevealText delay={0.12}>
            <h2
              className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.86] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              last-mile movement.
            </h2>
          </RevealText>

          <FadeUp delay={0.3} className="mt-12">
            <p
              className="max-w-xl text-base leading-[1.85]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              Across active construction deployments, Flo's autonomous hauler replaces
              repetitive site transport with predictable, trackable movement. Deployed at
              L&T, PSP Projects, Sobha, Capacite Infra, and Total Environment.
            </p>
          </FadeUp>

          <FadeUp delay={0.4} className="mt-10">
            <motion.button
              onClick={() =>
                document
                  .getElementById('customers')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group flex w-full cursor-pointer items-center justify-between rounded-2xl border p-6 text-left"
              style={{ borderColor: DIM, background: BG2 }}
              whileHover={{ borderColor: TEXT }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <p
                  className="mb-2.5 text-[10px] font-bold tracking-[0.22em] uppercase"
                  style={{ color: DIM }}
                >
                  Trusted by
                </p>
                <p
                  className="text-xl leading-snug font-black"
                  style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                >
                  10+ leading construction
                  <br />
                  companies across India
                </p>
                <motion.p
                  className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: DIM }}
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  Meet our customers
                </motion.p>
              </div>
              <motion.div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: DIM }}
                whileHover={{ backgroundColor: TEXT, borderColor: TEXT, scale: 1.08 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div whileHover={{ x: 2, y: -2 }} transition={{ duration: 0.2 }}>
                  <ArrowUpRight className="h-5 w-5" style={{ color: TEXT }} />
                </motion.div>
              </motion.div>
            </motion.button>
          </FadeUp>
        </div>

        <div className="space-y-3">
          {[
            { value: '50%', label: 'Cost reduction on material movement' },
            { value: '50%', label: 'Time saved on last-mile transport' },
            { value: '30%', label: 'Reduction in on-site accidents' },
            { value: '6x', label: 'Efficiency gain vs manual methods' },
          ].map((stat, i) => (
            <FadeUp key={stat.label} delay={0.18 + i * 0.08}>
              <div
                className="flex items-center gap-6 rounded-2xl border p-7 transition-colors duration-300"
                style={{ background: BG2, borderColor: DIM }}
              >
                <div
                  className="w-28 shrink-0 text-5xl leading-none font-black tabular-nums"
                  style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm leading-snug"
                  style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                >
                  {stat.label}
                </div>
              </div>
            </FadeUp>
          ))}
          <FadeUp delay={0.6}>
            <Link
              href="/offerings/material-movement"
              className="mt-2 inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-bold tracking-wide uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: GREEN,
                color: '#ffffff',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              Explore Material Movement <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Section 5 — Process ──────────────────────────────────────────────────────

const STEPS = [
  {
    number: '01',
    title: 'Request a Demo',
    body: "Contact our team and we'll schedule a site visit. We assess your needs, map movement routes, and identify the highest-value automation opportunity.",
  },
  {
    number: '02',
    title: 'Deploy in Under a Day',
    body: 'Our team commissions the robot on your site in hours, not weeks. No infrastructure changes, no long setup cycles. It plugs straight into your workflows.',
  },
  {
    number: '03',
    title: 'Scale Your Fleet',
    body: 'Once the first unit proves ROI, adding more robots is seamless. Our Fleet Control platform gives you full visibility across all units from one dashboard.',
  },
];

function ProcessSection() {
  return (
    <section
      className="w-full border-t px-8 py-40 md:px-16 lg:px-24 xl:px-32"
      style={{ background: BG2, borderColor: DIM }}
    >
      <SectionRule label="Process" />
      <div className="grid items-start gap-24 lg:grid-cols-[520px_1fr]">
        <div className="lg:sticky lg:top-32">
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(2.8rem,5vw,6rem)] leading-[0.86] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              From demo
            </h2>
          </RevealText>
          <RevealText delay={0.05} className="mb-1">
            <h2
              className="text-[clamp(2.8rem,5vw,6rem)] leading-[0.86] font-black tracking-[-0.04em]"
              style={{ color: 'rgba(25,28,26,0.10)', fontFamily: 'var(--font-dm-sans)' }}
            >
              to deployed
            </h2>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              className="text-[clamp(2.8rem,5vw,6rem)] leading-[0.86] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              in days.
            </h2>
          </RevealText>
          <FadeUp delay={0.3} className="mt-8">
            <p
              className="text-base leading-[1.85]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              Our deployment process is built for real construction sites — not controlled
              labs. Most customers see measurable ROI within the first month of operation.
            </p>
          </FadeUp>
        </div>

        <div>
          {STEPS.map((step, i) => (
            <FadeUp key={step.number} delay={0.1 + i * 0.1}>
              <div
                className="group flex cursor-default gap-8 border-b py-12"
                style={{ borderColor: DIM }}
              >
                <div
                  className="w-24 shrink-0 pt-1 text-[5rem] leading-none font-black tabular-nums transition-colors duration-500"
                  style={{
                    color: 'rgba(25,28,26,0.06)',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GREEN)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'rgba(25,28,26,0.06)')
                  }
                >
                  {step.number}
                </div>
                <div className="flex-1 pt-3">
                  <h3
                    className="mb-4 text-2xl font-black transition-colors duration-300"
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
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 6 — Customers ────────────────────────────────────────────────────

const ALL_CUSTOMERS = CUSTOMERS;

// Logo cell with cursor-following green gradient (DOM refs — zero re-render cost)
function LogoCell({
  customer,
  index,
}: {
  customer: (typeof ALL_CUSTOMERS)[0];
  index: number;
}) {
  const cellRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cellRef, { once: true, margin: '-10% 0px' });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cellRef.current || !glowRef.current) return;
    const r = cellRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    glowRef.current.style.background = `radial-gradient(ellipse 85% 85% at ${x}% ${y}%, ${GREEN}40 0%, transparent 65%)`;
    glowRef.current.style.opacity = '1';
  };

  const onLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  };

  return (
    <motion.div
      ref={cellRef}
      className="relative flex cursor-default flex-col items-center justify-center overflow-hidden border-r border-b px-8 py-16 sm:py-20"
      style={{ borderColor: DIM }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.05 * index, ease: EASE }}
    >
      {/* Cursor-following gradient — DOM ref, zero re-renders */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0"
        style={{ opacity: 0, transition: 'opacity 0.35s ease' }}
      />

      {/* Logo — always full opacity, no fade */}
      <div className="relative z-10 h-16 w-full max-w-[200px] sm:h-20">
        <Image
          src={customer.logo}
          alt={customer.name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          quality={100}
        />
      </div>

      {/* Company name */}
      <p
        className="relative z-10 mt-5 text-center text-[10px] font-semibold tracking-[0.2em] uppercase"
        style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
      >
        {customer.name}
      </p>
    </motion.div>
  );
}

function CustomersSection() {
  return (
    <section
      id="customers"
      className="w-full border-t"
      style={{ background: BG, borderColor: DIM }}
    >
      {/* Section header */}
      <div className="w-full px-8 pt-32 pb-20 md:px-16 lg:px-24 xl:px-32">
        <SectionRule label="Customers" />
        <div className="grid items-end gap-16 lg:grid-cols-[1fr_440px]">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] leading-[0.86] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Powering India's
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-1">
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] leading-[0.86] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(25,28,26,0.10)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                largest
              </h2>
            </RevealText>
            <RevealText delay={0.12}>
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] leading-[0.86] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                projects.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.3} className="pb-3">
            <div className="mb-8 h-10 w-px" style={{ background: GREEN }} />
            <p
              className="text-base leading-[1.85]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              From construction giants to innovative infrastructure companies, our
              autonomous robots are transforming workflows across India's most active
              construction sites.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Full-bleed logo grid — Terminal Industries style */}
      {/* container: border-t + border-l; each cell: border-r + border-b = perfect grid */}
      <div className="w-full border-t border-l" style={{ borderColor: DIM }}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {ALL_CUSTOMERS.map((c, i) => (
            <LogoCell key={c.name} customer={c} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom caption — no external link */}
      <div
        className="w-full border-t px-8 py-10 md:px-16 lg:px-24 xl:px-32"
        style={{ borderColor: DIM }}
      >
        <FadeUp>
          <p
            className="text-center text-sm"
            style={{ color: DIM, fontFamily: 'var(--font-dm-sans)' }}
          >
            Trusted by India's top construction and infrastructure companies
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 7 — Testimonials ─────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote:
      "Flo Mobility's autonomous robots have transformed our construction site operations. We've seen a 40% increase in productivity and significantly improved safety standards.",
    name: 'Rajesh Kumar',
    role: 'Project Manager',
    company: 'L&T Construction',
  },
  {
    quote:
      'The fleet control system is incredibly intuitive. Managing multiple robots across different sites has never been easier. This technology is a game-changer.',
    name: 'Sarah Thompson',
    role: 'Operations Director',
    company: 'Shapoorji Pallonji',
  },
  {
    quote:
      "We've reduced our material movement costs by 35% since implementing Flo's autonomous solutions. The ROI was evident within the first quarter itself.",
    name: 'Amit Patel',
    role: 'CEO',
    company: 'Buildtech Solutions',
  },
  {
    quote:
      'Their lawn maintenance robots have freed up our team to focus on more specialised tasks. The precision and reliability are outstanding.',
    name: 'Maria Garcia',
    role: 'Facilities Manager',
    company: 'Embassy Group',
  },
  {
    quote:
      "The customer support and ongoing innovation from Flo Mobility keeps us ahead of the competition. They're not just a vendor — they're a true partner.",
    name: 'David Chen',
    role: 'VP Operations',
    company: 'Prestige Group',
  },
  {
    quote:
      'From deployment to daily operations, the entire experience has been seamless. The autonomous robots integrate perfectly with our existing workflows.',
    name: 'Priya Sharma',
    role: 'Site Supervisor',
    company: 'Tata Projects',
  },
];

function TestimonialsSection() {
  const tri = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section
      className="w-full overflow-hidden border-t py-36"
      style={{ background: BG2, borderColor: DIM }}
    >
      <div className="mb-20 w-full px-8 md:px-16 lg:px-24 xl:px-32">
        <SectionRule label="Testimonials" />
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <RevealText>
            <h2
              className="text-[clamp(2.5rem,5vw,6.5rem)] leading-[0.88] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              What our customers say.
            </h2>
          </RevealText>
          <FadeUp delay={0.3}>
            <p
              className="max-w-xs text-sm"
              style={{ color: DIM, fontFamily: 'var(--font-dm-sans)' }}
            >
              From construction giants to growing infrastructure companies.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Row 1 */}
      <div className="relative mb-4">
        <div
          className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24"
          style={{ background: `linear-gradient(to right, ${BG2} 60%, transparent)` }}
        />
        <div
          className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24"
          style={{ background: `linear-gradient(to left, ${BG2} 60%, transparent)` }}
        />
        <div className="animate-testi-1 flex gap-4 whitespace-nowrap">
          {tri.map((t, i) => (
            <article
              key={i}
              className="flex w-80 shrink-0 flex-col gap-5 rounded-2xl border p-7 whitespace-normal sm:w-[420px]"
              style={{ background: BG, borderColor: DIM }}
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-xs" style={{ color: MUTED }}>
                    ★
                  </span>
                ))}
              </div>
              <p
                className="flex-1 text-sm leading-[1.85]"
                style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto border-t pt-4" style={{ borderColor: DIM }}>
                <p
                  className="text-sm font-bold"
                  style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                >
                  {t.name}
                </p>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                >
                  {t.role}, {t.company}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Row 2 — reverse */}
      <div className="relative">
        <div
          className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24"
          style={{ background: `linear-gradient(to right, ${BG2} 60%, transparent)` }}
        />
        <div
          className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24"
          style={{ background: `linear-gradient(to left, ${BG2} 60%, transparent)` }}
        />
        <div className="animate-testi-2 flex gap-4 whitespace-nowrap">
          {[...tri].reverse().map((t, i) => (
            <article
              key={i}
              className="flex w-80 shrink-0 flex-col gap-5 rounded-2xl border p-7 whitespace-normal sm:w-[420px]"
              style={{ background: BG, borderColor: DIM }}
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-xs" style={{ color: MUTED }}>
                    ★
                  </span>
                ))}
              </div>
              <p
                className="flex-1 text-sm leading-[1.85]"
                style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto border-t pt-4" style={{ borderColor: DIM }}>
                <p
                  className="text-sm font-bold"
                  style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                >
                  {t.name}
                </p>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                >
                  {t.role}, {t.company}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes testi-1 {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
        @keyframes testi-2 {
          from {
            transform: translateX(-33.333%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-testi-1 {
          animation: testi-1 46s linear infinite;
        }
        .animate-testi-2 {
          animation: testi-2 40s linear infinite;
        }
      `}</style>
    </section>
  );
}

// ─── Section 8 — Platform ─────────────────────────────────────────────────────

function TechSection() {
  return (
    <section
      className="w-full border-t px-8 py-40 md:px-16 lg:px-24 xl:px-32"
      style={{ background: BG, borderColor: DIM }}
    >
      <SectionRule label="Platform" />
      <div className="grid items-center gap-24 lg:grid-cols-2">
        <div>
          <FadeUp>
            <p
              className="mb-6 text-xs font-black tracking-[0.28em] uppercase"
              style={{ color: MUTED }}
            >
              Fleet Control
            </p>
          </FadeUp>
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(2.5rem,5vw,6.5rem)] leading-[0.86] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              Built for the
            </h2>
          </RevealText>
          <RevealText delay={0.06} className="mb-12">
            <h2
              className="text-[clamp(2.5rem,5vw,6.5rem)] leading-[0.86] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              harshest sites.
            </h2>
          </RevealText>
          <FadeUp delay={0.2}>
            <p
              className="mb-12 text-base leading-[1.75]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              Real-time LiDAR mapping and computer vision navigate dynamic construction
              sites — detecting workers, machinery, and obstacles at 360°. Managed from a
              single fleet control dashboard.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Real-time obstacle detection',
                'GPS-independent navigation',
                'Multi-robot fleet coordination',
                'Remote monitoring dashboard',
              ].map((f) => (
                <div
                  key={f}
                  className="flex items-start gap-3 rounded-2xl border p-5 transition-colors duration-300"
                  style={{ background: BG2, borderColor: DIM }}
                >
                  <div
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: GREEN }}
                  />
                  <span
                    className="text-sm leading-snug"
                    style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Dashboard mock */}
        <FadeUp delay={0.15}>
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border shadow-lg"
            style={{ background: BG_WARM, borderColor: DIM }}
          >
            {/* Grid */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `linear-gradient(${GREEN}20 1px, transparent 1px), linear-gradient(90deg, ${GREEN}20 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
            {/* Header */}
            <div
              className="absolute top-0 right-0 left-0 flex items-center justify-between border-b px-6 py-3.5"
              style={{ borderColor: DIM, background: `${BG}ee` }}
            >
              <span
                className="font-mono text-[10px] tracking-widest uppercase"
                style={{ color: MUTED }}
              >
                FLO FLEET CONTROL
              </span>
              <span
                className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-widest uppercase"
                style={{ color: GREEN }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: GREEN }}
                />
                3 UNITS ONLINE
              </span>
            </div>
            {/* Robot dots */}
            {[
              { x: '28%', y: '45%', label: 'MMR-01', status: 'Hauling' },
              { x: '58%', y: '62%', label: 'MMR-02', status: 'Idle' },
              { x: '72%', y: '38%', label: 'LMR-01', status: 'Mowing' },
            ].map((r) => (
              <div
                key={r.label}
                className="absolute flex flex-col items-center gap-1.5"
                style={{ left: r.x, top: r.y, transform: 'translate(-50%,-50%)' }}
              >
                <div
                  className="h-4 w-4 animate-pulse rounded-full"
                  style={{ background: GREEN, boxShadow: `0 0 12px ${GREEN}99` }}
                />
                <div className="flex flex-col items-center">
                  <span
                    className="font-mono text-[9px] font-bold"
                    style={{ color: MUTED }}
                  >
                    {r.label}
                  </span>
                  <span className="font-mono text-[8px]" style={{ color: GREEN_D }}>
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
            {/* Route lines */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
              viewBox="0 0 400 300"
            >
              <path
                d="M 112 135 Q 180 100 232 186"
                stroke={GREEN}
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 4"
              />
              <path
                d="M 232 186 Q 280 200 288 114"
                stroke={GREEN}
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 4"
              />
            </svg>
            {/* Footer */}
            <div
              className="absolute right-0 bottom-0 left-0 flex justify-between border-t px-6 py-3"
              style={{ borderColor: DIM, background: `${BG}ee` }}
            >
              <span
                className="font-mono text-[9px] tracking-widest uppercase"
                style={{ color: DIM }}
              >
                NAV-SYS v3.1
              </span>
              <span
                className="font-mono text-[9px] tracking-widest uppercase"
                style={{ color: DIM }}
              >
                LIDAR · 32-BEAM · 200m
              </span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 9 — CTA ──────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      className="relative w-full overflow-hidden border-t px-8 py-48 md:px-16 lg:px-24 xl:px-32"
      style={{ background: BG2, borderColor: DIM }}
    >
      {/* Subtle green glow */}
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

      <div className="relative text-center">
        <FadeUp>
          <p
            className="mb-12 text-[11px] font-black tracking-[0.32em] uppercase"
            style={{ color: MUTED }}
          >
            Get started today
          </p>
        </FadeUp>
        <RevealText className="mb-1">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] leading-[0.83] font-black tracking-[-0.04em]"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            Ready to
          </h2>
        </RevealText>
        <RevealText delay={0.05} className="mb-1">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] leading-[0.83] font-black tracking-[-0.04em]"
            style={{ color: 'rgba(25,28,26,0.10)', fontFamily: 'var(--font-dm-sans)' }}
          >
            automate your
          </h2>
        </RevealText>
        <RevealText delay={0.1} className="mb-20">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] leading-[0.83] font-black tracking-[-0.04em]"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            site?
          </h2>
        </RevealText>

        <FadeUp delay={0.3} className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 rounded-full px-12 py-5 text-sm font-black shadow-lg transition-all duration-300 hover:scale-105"
            style={{
              background: GREEN,
              color: '#ffffff',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            Talk to our team <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/offerings/material-movement"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-12 py-5 text-sm font-bold transition-all duration-300 hover:bg-white"
            style={{ borderColor: DIM, color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            View all solutions
          </Link>
        </FadeUp>

        <FadeUp
          delay={0.5}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {['ISO Certified', '50+ Projects', '24/7 Support', '< 1 Day Deploy'].map(
            (t) => (
              <div
                key={t}
                className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase"
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TestScrollPage() {
  return (
    <div className="w-full" style={{ color: TEXT, background: BG }}>
      <HeroWithScroll />
      <ProofBar />
      <MissionSection />
      <ProductsSection />
      <CaseStudySection />
      <ProcessSection />
      <CustomersSection />
      <TestimonialsSection />
      <TechSection />
      <CTASection />
    </div>
  );
}
