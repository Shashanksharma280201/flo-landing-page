'use client';

import React, { useRef, useState, useCallback } from 'react';
import FleetBlueprint from '@/components/sections/fleet-blueprint';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { HeroWithScroll } from '@/components/hero-with-scroll';
import { BELIEVERS, CUSTOMERS } from '@/lib/constants';
import { TrackedYouTubeIframe } from '@/components/shared/tracked-youtube-iframe';
import {
  ArrowRight,
  CheckCircle2,
  ArrowUpRight,
  Play,
  Cpu,
  Eye,
  Navigation2,
  LayoutDashboard,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ─── Design tokens — FLO brand light theme ───────────────────────────────────
const BG = '#ffffff';
const BG2 = '#f5f5f5';
const BG_WARM = '#f0f0f0';
const GREEN = '#7ccd54'; // FLO primary green — buttons/CTAs only
const GREEN_D = '#286c00'; // darker green — buttons/links only
const TEXT = '#191c1a'; // near-black — all headings & accent lines
const MUTED = 'rgba(25,28,26,0.55)';
const DIM = 'rgba(25,28,26,0.15)';
const BG_DARK = '#0e1210'; // near-black with slight green tint — dark sections
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
        className="text-base font-bold tracking-[0.26em] whitespace-nowrap uppercase"
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

// ─── MagneticButton — pulls toward cursor within proximity radius ─────────────
function MagneticButton({
  children,
  className = '',
  style = {},
  href,
  onClick,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  onClick?: () => void;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x as unknown as number, {
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  });
  const springY = useSpring(y as unknown as number, {
    stiffness: 300,
    damping: 25,
    mass: 0.5,
  });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    },
    [x, y, strength],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: 'inline-flex' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      <div style={style} className="h-full w-full" onClick={onClick}>
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <motion.div
        ref={ref}
        style={{ x: springX, y: springY, display: 'inline-flex' }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <Link href={href} className={className} style={style}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return content;
}

// ─── Image Showcase Section ───────────────────────────────────────────────────

const FLEET = [
  {
    index: '01',
    src: '/mmr-images/autonomous-mmr.avif',
    label: 'Autonomous Material Movement Robot',
  },
  {
    index: '02',
    src: '/mmr-images/material-movement.avif',
    label: 'Material Movement Robot',
  },
  { index: '03', src: '/mmr-images/mmr-robot-new.avif', label: '1 Ton Pushcart' },
  { index: '04', src: '/mmr-images/tugger.avif', label: 'Tugger' },
];

function FleetCard({ item }: { item: (typeof FLEET)[0] }) {
  return (
    <div className="fcard group">
      {/* Index + hairline */}
      <div className="fcard-top">
        <span className="fcard-idx" style={{ fontFamily: 'var(--font-dm-sans)' }}>
          {item.index}
        </span>
        <div className="fcard-rule" />
      </div>

      {/* Product image — fills remaining height */}
      <div className="fcard-img">
        <Image
          src={item.src}
          alt={item.label}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-[1.07]"
          style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 44vw"
          quality={90}
        />
      </div>

      {/* Footer: name + arrow */}
      <div className="fcard-foot">
        <p className="fcard-lbl" style={{ fontFamily: 'var(--font-dm-sans)' }}>
          {item.label}
        </p>
        <div className="fcard-arrow">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.5 12.5L12.5 3.5M12.5 3.5H6.5M12.5 3.5V9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ImageShowcaseSection() {
  return (
    <>
      {/* ── "Our Fleet" eyebrow header — clean, no overflow restrictions ── */}
      <section className="w-full" style={{ background: BG2 }}>
        <div className="px-5 pt-14 pb-4 sm:px-8 md:px-10 md:pt-18 md:pb-6 lg:px-14 lg:pt-20 xl:px-20">
          <div className="flex items-center gap-6">
            <span
              className="text-base font-medium tracking-[0.35em] whitespace-nowrap uppercase"
              style={{ color: DIM, fontFamily: 'var(--font-dm-sans)' }}
            >
              Our Fleet
            </span>
            <div className="h-px flex-1" style={{ background: DIM }} />
          </div>
        </div>
      </section>

      {/* ── Fleet Blueprint: MUST be outside any overflow:hidden parent ── */}
      <section className="w-full" style={{ overflow: 'visible', background: '#0a0f0a' }}>
        <FleetBlueprint />
      </section>
    </>
  );
}

// ─── Section 1 — Proof ticker ─────────────────────────────────────────────────

const METRICS = [
  { value: '50+', label: 'Robots Deployed' },
  { value: '50,000+ kms', label: 'Distance Travelled' },
  { value: '32', label: 'Projects Expedited ' },
  { value: '2.5 Lakh Tonnes', label: 'Material Moved' },
  { value: '500 kg', label: 'Payload Capacity' },
  { value: '30%', label: 'Accidents Reduced' },
  { value: '24/7', label: 'Operation' },
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
              className="text-base font-semibold tracking-[0.2em] whitespace-nowrap uppercase"
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
          animation: proof-ticker 16s linear infinite;
        }
      `}</style>
    </section>
  );
}

// ─── Section 2 — Mission ──────────────────────────────────────────────────────

function MissionSection() {
  return (
    <section
      className="hero-skip-target w-full px-6 py-20 md:px-16 md:py-40 lg:px-24 xl:px-32"
      style={{ background: BG }}
    >
      <SectionRule label="Mission" />
      <div className="grid items-end gap-20 lg:grid-cols-[1fr_400px]">
        <div>
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(3.5rem,8vw,9.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              Autonomous
            </h2>
          </RevealText>
          <RevealText delay={0.06} className="mb-1">
            <h2
              className="text-[clamp(3.5rem,8vw,9.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{
                color: 'rgba(4 104 37 / 0.86)',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              construction
            </h2>
          </RevealText>
          <RevealText delay={0.12}>
            <h2
              className="text-[clamp(3.5rem,8vw,9.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              at scale.
            </h2>
          </RevealText>
        </div>

        <FadeUp delay={0.3} className="pb-4">
          <div className="mb-8 h-14 w-px" style={{ background: GREEN }} />
          <p
            className="mb-8 text-lg leading-[1.85] md:text-xl"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            Autonomous robots deployed on-site as a service. Haul materials, maintain
            grounds, control your fleet. No capital cost, no infrastructure changes.
          </p>
          <MagneticButton
            href="/contact"
            className="group inline-flex items-center gap-2 text-base font-bold tracking-wide uppercase"
            style={{ color: GREEN_D }}
          >
            See how it works
            <motion.span
              className="inline-flex"
              animate={{ x: 0, y: 0 }}
              whileHover={{ x: 2, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.span>
          </MagneticButton>
        </FadeUp>
      </div>

      {/* Stat strip */}
      {/* <div className="mt-14 md:mt-24 grid grid-cols-2 md:grid-cols-4 border-t" style={{ borderColor: DIM }}>
          {[
            { value: "50+", label: "Robots deployed" },
            { value: "10K+", label: "Hours saved" },
            { value: "4,000 km", label: "Autonomous distance" },
            { value: "50+", label: "Projects completed" },
          ].map((s, i) => (
            <FadeUp key={s.label} delay={0.08 + i * 0.07}>
              <div
                className={`py-7 md:py-10 px-5 md:px-8 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}
                style={{ borderColor: DIM }}
              >
                <div
                  className="text-[clamp(2.2rem,4vw,4.5rem)] font-black tracking-[-0.03em] leading-none mb-2"
                  style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                >
                  {s.value}
                </div>
                <div className="text-base font-semibold uppercase tracking-[0.18em]" style={{ color: DIM }}>
                  {s.label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div> */}
    </section>
  );
}

// ─── Section 3 — Products (RaaS) with Parallax ───────────────────────────────

type ProductMedia =
  | { type: 'image'; src: string }
  | { type: 'video'; videoId: string }
  | { type: 'dashboard' };

const PRODUCTS: {
  number: string;
  tag: string;
  title: string;
  body: string;
  stats: { value: string; label: string }[];
  points: string[];
  media: ProductMedia;
  href: string;
  cta: string;
  flip: boolean;
}[] = [
  {
    number: '01',
    tag: 'Material Movement',
    title: '500 kg. Zero driver. Full speed.',
    body: 'Moves 500 kg autonomously, 24/7. No driver, no downtime.',
    stats: [
      { value: '500 kg', label: 'Payload' },
      { value: '24/7', label: 'Operation' },
    ],
    points: [
      'Driverless Operation: eliminates human error and optimizes performance',
      'Electric Power Train: efficient and sustainable with instant torque',
      'Swappable batteries: minimize downtime by seamlessly swapping batteries',
    ],
    media: { type: 'image', src: '/mmr-images/mmr-images-1.avif' },
    href: '/offerings/material-movement',
    cta: 'Explore Material Movement',
    flip: false,
  },
  {
    number: '02',
    tag: 'Fleet Management',
    title: 'Full fleet visibility. One dashboard.',
    body: 'One dashboard for every robot on every site. Battery, missions, routes: monitored 24/7. Scale your fleet, not your headcount.',
    stats: [
      { value: '24/7', label: 'Monitoring' },
      { value: '99.9%', label: 'Uptime' },
      { value: '<100', label: 'ms Latency' },
    ],
    points: [
      'Real-time LiDAR mapping and obstacle detection',
      'Multi-robot coordination across multiple sites',
      'Remote monitoring and instant alert dashboard',
    ],
    media: { type: 'dashboard' },
    href: '/offerings/fleet-control',
    cta: 'Explore Fleet Control',
    flip: true,
  },
];

function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const isFlip = product.flip;
  const [playing, setPlaying] = useState(false);

  // 3D tilt on content panel
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX as unknown as number, { stiffness: 200, damping: 28 });
  const rotateY = useSpring(tiltY as unknown as number, { stiffness: 200, damping: 28 });

  const onTiltMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5 to 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5;
      tiltX.set(-ny * 6); // max ±6deg
      tiltY.set(nx * 6);
    },
    [tiltX, tiltY],
  );

  const onTiltLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  // ── Media panel ──────────────────────────────────────────────────────────────
  const media = product.media;

  // Dashboard: browser chrome + hud-dashboard.png — no clip-path, FadeUp style
  if (media.type === 'dashboard') {
    return (
      <div
        ref={ref}
        className="grid w-full overflow-hidden border-b lg:grid-cols-2"
        style={{ borderColor: DIM }}
      >
        {/* Dashboard mockup panel */}
        <motion.div
          className={`relative order-1 ${isFlip ? 'lg:order-2' : 'lg:order-1'} flex min-h-[280px] items-center justify-center p-6 lg:min-h-[360px] lg:p-12`}
          style={{ background: BG2 }}
          initial={{ opacity: 0, x: isFlip ? 48 : -48 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.05, ease: EASE }}
        >
          {/* Browser chrome mockup */}
          <div
            className="w-full overflow-hidden rounded-2xl border shadow-xl"
            style={{ borderColor: DIM }}
          >
            {/* Chrome header */}
            <div
              className="flex items-center gap-2 border-b px-4 py-3"
              style={{ background: BG, borderColor: DIM }}
            >
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: DIM }} />
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: DIM }} />
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: GREEN }} />
              </div>
              <div
                className="ml-2 flex-1 rounded px-3 py-1 font-mono text-[10px]"
                style={{ background: BG2, color: MUTED }}
              >
                fleet.flomobility.com
              </div>
            </div>
            {/* Dashboard image */}
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

          {/* Product number overlay */}
          <div
            className="pointer-events-none absolute bottom-8 left-8 text-[7rem] leading-none font-black tabular-nums select-none"
            style={{ color: 'rgba(25,28,26,0.06)', fontFamily: 'var(--font-dm-sans)' }}
            aria-hidden="true"
          >
            {product.number}
          </div>
        </motion.div>

        {/* Content panel — 3D tilt */}
        <motion.div
          ref={cardRef}
          className={`relative order-2 flex items-center ${isFlip ? 'lg:order-1' : 'lg:order-2'}`}
          style={{ background: BG, rotateX, rotateY, transformPerspective: 1200 }}
          initial={{ opacity: 0, x: isFlip ? -48 : 48 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          onMouseMove={onTiltMove}
          onMouseLeave={onTiltLeave}
        >
          <div className="w-full px-7 py-10 sm:px-14 lg:px-16 lg:py-24 xl:px-20">
            {/* Tag */}
            <motion.div
              className="mb-8 flex items-center gap-2.5"
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            >
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
              <span
                className="text-base font-bold tracking-[0.22em] uppercase"
                style={{ color: MUTED }}
              >
                {product.tag}
              </span>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mb-8 flex overflow-hidden rounded-2xl border md:mb-12"
              style={{ borderColor: DIM, background: BG2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              {product.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex-1 px-3 py-4 text-center sm:px-6 sm:py-5 ${i < product.stats.length - 1 ? 'border-r' : ''}`}
                  style={{ borderColor: DIM }}
                >
                  <div
                    className="mb-1 text-lg leading-none font-black sm:mb-1.5 sm:text-2xl"
                    style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-sm font-semibold tracking-[0.14em] uppercase sm:text-base sm:tracking-[0.18em]"
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
              className="mb-8 max-w-lg text-lg leading-[1.85] md:text-xl"
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
                    className="text-base leading-snug md:text-lg"
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
              <MagneticButton
                href={product.href}
                className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-bold tracking-wide uppercase"
                style={{
                  background: GREEN,
                  color: '#ffffff',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                {product.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="grid w-full overflow-hidden border-b lg:grid-cols-2"
      style={{ borderColor: DIM }}
    >
      {/* Media panel — image or YouTube embed */}
      <motion.div
        className={`relative order-1 ${isFlip ? 'lg:order-2' : 'lg:order-1'} min-h-[280px] overflow-hidden lg:min-h-[360px]`}
        initial={{ clipPath: isFlip ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }}
        animate={inView ? { clipPath: 'inset(0 0% 0 0%)' } : {}}
        transition={{ duration: 1.2, delay: 0.05, ease: EASE }}
      >
        {media.type === 'image' ? (
          <>
            <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
              <Image
                src={media.src}
                alt={product.tag}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 ${isFlip ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} z-10 from-black/30 via-black/10 to-transparent`}
            />
          </>
        ) : (
          /* YouTube embed with visible thumbnail */
          <div className="absolute inset-0">
            {playing ? (
              <TrackedYouTubeIframe
                videoId={media.videoId}
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${media.videoId}?autoplay=1&rel=0`}
                title={product.tag}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                {/* YouTube hqdefault thumbnail (always available) */}
                <Image
                  src={`https://i.ytimg.com/vi/${media.videoId}/maxresdefault.jpg`}
                  alt={product.tag}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 z-10 bg-black/30" />
                {/* Play button */}
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 z-20 flex items-center justify-center"
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
                {/* Caption badge */}
                <div
                  className="absolute bottom-8 left-8 z-20 rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase"
                  style={{ background: 'rgba(25,28,26,0.6)', color: '#fff' }}
                >
                  Watch the robot in action
                </div>
              </>
            )}
          </div>
        )}
        {/* Product number — editorial overlay (image only, stays visible) */}
        {media.type === 'image' && (
          <div
            className="absolute bottom-8 left-8 z-20 text-[7rem] leading-none font-black tabular-nums select-none"
            style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'var(--font-dm-sans)' }}
            aria-hidden="true"
          >
            {product.number}
          </div>
        )}
      </motion.div>

      {/* Content — 3D tilt */}
      <motion.div
        ref={cardRef}
        className={`relative order-2 flex items-center ${isFlip ? 'lg:order-1' : 'lg:order-2'}`}
        style={{ background: BG, rotateX, rotateY, transformPerspective: 1200 }}
        initial={{ opacity: 0, x: isFlip ? -48 : 48 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        onMouseMove={onTiltMove}
        onMouseLeave={onTiltLeave}
      >
        <div className="w-full px-7 py-10 sm:px-14 lg:px-16 lg:py-24 xl:px-20">
          {/* Tag */}
          <motion.div
            className="mb-8 flex items-center gap-2.5"
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
            <span
              className="text-base font-bold tracking-[0.22em] uppercase"
              style={{ color: MUTED }}
            >
              {product.tag}
            </span>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mb-8 flex overflow-hidden rounded-2xl border md:mb-12"
            style={{ borderColor: DIM, background: BG2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            {product.stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex-1 px-3 py-4 text-center sm:px-6 sm:py-5 ${i < product.stats.length - 1 ? 'border-r' : ''}`}
                style={{ borderColor: DIM }}
              >
                <div
                  className="mb-1 text-lg leading-none font-black sm:mb-1.5 sm:text-2xl"
                  style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                >
                  {s.value}
                </div>
                <div
                  className="text-sm font-semibold tracking-[0.14em] uppercase sm:text-base sm:tracking-[0.18em]"
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
            className="mb-8 max-w-lg text-lg leading-[1.85] md:text-xl"
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
                  className="text-base leading-snug md:text-lg"
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
            <MagneticButton
              href={product.href}
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-bold tracking-wide uppercase"
              style={{
                background: GREEN,
                color: '#ffffff',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              {product.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
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
        className="w-full border-t px-6 pt-16 pb-8 md:px-16 md:pt-28 md:pb-16 lg:px-24 xl:px-32"
        style={{ borderColor: DIM }}
      >
        <SectionRule label="Solutions" />
        <div className="grid items-end gap-16 lg:grid-cols-[1fr_380px]">
          <div>
            <RevealText>
              <h2
                className="text-[clamp(2.8rem,6vw,7.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                <span style={{ color: 'rgba(4 104 37 / 0.86)' }}>Robot</span>
                <span style={{ color: TEXT }}> as a Service</span>
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <p
              className="text-lg leading-relaxed md:text-xl"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              Flexible subscription. No upfront capital. No infrastructure changes.
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
      className="w-full border-t px-6 py-20 md:px-16 md:py-36 lg:px-24 xl:px-32"
      style={{ background: BG, borderColor: DIM }}
    >
      <SectionRule label="Proof of Work" />
      <div className="grid items-start gap-20 lg:grid-cols-[1fr_520px]">
        <div>
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              50% lower cost
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
              and time on
            </h2>
          </RevealText>
          <RevealText delay={0.12}>
            <h2
              className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              last mile movement.
            </h2>
          </RevealText>

          <FadeUp delay={0.3} className="mt-12">
            <p
              className="max-w-xl text-lg leading-[1.85] md:text-xl"
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
                  className="mb-2.5 text-sm font-bold tracking-[0.22em] uppercase"
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
                  className="mt-3 flex items-center gap-1.5 text-sm font-semibold tracking-[0.18em] uppercase"
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
            { value: '50%', label: 'Time saved on last mile transport' },
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
                  className="text-base leading-snug md:text-lg"
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

function ProcessStep({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="group relative flex cursor-default gap-5 border-b py-8 sm:gap-8 sm:py-12"
      style={{ borderColor: DIM }}
      initial={{ opacity: 0, x: 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.08 * index, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Progress dot on the line */}
      <motion.div
        className="absolute top-1/2 left-0 hidden h-3 w-3 -translate-x-[calc(100%+32px)] -translate-y-1/2 rounded-full lg:block"
        style={{ background: hovered ? GREEN : DIM }}
        animate={{ scale: hovered ? 1.4 : 1, background: hovered ? GREEN : DIM }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="w-16 shrink-0 pt-1 text-[3rem] leading-none font-black tabular-nums sm:w-24 sm:text-[5rem]"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
        animate={{ color: hovered ? GREEN : 'rgba(4 104 37 / 0.86)' }}
        transition={{ duration: 0.3 }}
      >
        {step.number}
      </motion.div>
      <div className="flex-1 pt-3">
        <h3
          className="mb-4 text-2xl font-black"
          style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
        >
          {step.title}
        </h3>
        <p
          className="text-lg leading-[1.85] md:text-xl"
          style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
        >
          {step.body}
        </p>
      </div>
      <motion.div
        className="flex shrink-0 items-start pt-5"
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
        transition={{ duration: 0.25 }}
      >
        <ArrowUpRight className="h-5 w-5" style={{ color: GREEN }} />
      </motion.div>
    </motion.div>
  );
}

function ProcessSection() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ['start 80%', 'end 30%'],
  });
  const lineHeight = useTransform(stepsProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      className="w-full border-t px-6 py-20 md:px-16 md:py-40 lg:px-24 xl:px-32"
      style={{ background: BG2, borderColor: DIM }}
    >
      <SectionRule label="Process" />
      <div className="grid items-start gap-24 lg:grid-cols-[520px_1fr]">
        <div className="lg:sticky lg:top-32">
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(2.8rem,5vw,6rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              From demo
            </h2>
          </RevealText>
          <RevealText delay={0.05} className="mb-1">
            <h2
              className="text-[clamp(2.8rem,5vw,6rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{
                color: 'rgba(4 104 37 / 0.86)',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              to deployed
            </h2>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              className="text-[clamp(2.8rem,5vw,6rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              in days.
            </h2>
          </RevealText>
          <FadeUp delay={0.3} className="mt-8">
            <p
              className="text-lg leading-[1.85] md:text-xl"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              Our deployment process is built for real construction sites, not controlled
              labs. Most customers see measurable ROI within the first month of operation.
            </p>
          </FadeUp>
        </div>

        {/* Steps with animated progress line */}
        <div ref={stepsRef} className="relative">
          {/* Vertical progress line */}
          <div
            className="absolute top-0 bottom-0 left-[-32px] hidden w-px lg:block"
            style={{ background: DIM }}
          >
            <motion.div
              className="absolute top-0 right-0 left-0 origin-top"
              style={{ height: lineHeight, background: GREEN }}
            />
          </div>

          {STEPS.map((step, i) => (
            <ProcessStep key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 6 — Believers ────────────────────────────────────────────────────

// Investor cell — same cursor-tracking glow as LogoCell, taller + richer
function InvestorCell({
  believer,
  index,
}: {
  believer: (typeof BELIEVERS)[0];
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
    glowRef.current.style.background = `radial-gradient(ellipse 90% 90% at ${x}% ${y}%, ${GREEN}38 0%, transparent 68%)`;
    glowRef.current.style.opacity = '1';
  };

  const onLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  };

  return (
    <motion.div
      ref={cellRef}
      className="group relative flex cursor-default flex-col items-center justify-center overflow-hidden border-r border-b px-5 py-8 sm:py-10 md:py-12"
      style={{ borderColor: DIM }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.06 * index, ease: EASE }}
    >
      {/* cursor glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0"
        style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
      />

      {/* logo */}
      <div className="relative z-10 h-16 w-full max-w-[200px] transition-transform duration-500 group-hover:scale-105 sm:h-20 md:h-24">
        <Image
          src={believer.logo}
          alt={believer.name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          quality={85}
        />
      </div>

      {/* name */}
      <p
        className="relative z-10 mt-3 text-center text-xs font-semibold tracking-[0.15em] uppercase"
        style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
      >
        {believer.name}
      </p>
    </motion.div>
  );
}

function BelieversSection() {
  return (
    <section
      id="investors"
      className="w-full border-t"
      style={{ background: BG, borderColor: DIM }}
    >
      {/* ── Header — same structure as CustomersSection ── */}
      <div className="w-full px-6 pt-16 pb-10 md:px-16 md:pt-32 md:pb-20 lg:px-24 xl:px-32">
        <SectionRule label="Investors" />
        <div className="grid items-end gap-16 lg:grid-cols-[1fr_440px]">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Fueling our
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-1">
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                growth
              </h2>
            </RevealText>
            <RevealText delay={0.12}>
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                and innovation.
              </h2>
            </RevealText>
          </div>

          <FadeUp delay={0.3} className="pb-3">
            <div className="mb-8 h-10 w-px" style={{ background: GREEN }} />
            <p
              className="text-lg leading-[1.85] md:text-xl"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              Backed by India's leading venture funds, accelerators, and research
              institutions, fuelling FLO's mission to automate construction at scale.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ── Logo grid — border-grid, same as customers ── */}
      <div className="w-full border-t border-l" style={{ borderColor: DIM }}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {BELIEVERS.map((b, i) => (
            <InvestorCell key={b.name} believer={b} index={i} />
          ))}
        </div>
      </div>

      {/* ── Bottom caption ── */}
      <div
        className="w-full border-t px-6 py-8 md:px-16 md:py-10 lg:px-24 xl:px-32"
        style={{ borderColor: DIM }}
      >
        <FadeUp>
          <p
            className="text-center text-base md:text-lg"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            Supported by India's leading venture funds, accelerators, and research
            institutions
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 7 — Customers ────────────────────────────────────────────────────

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
      className="relative flex cursor-default flex-col items-center justify-center overflow-hidden border-r border-b px-4 py-8 sm:py-10 md:py-12"
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
      <div className="relative z-10 h-16 w-full max-w-[200px] sm:h-20 md:h-24">
        <Image
          src={customer.logo}
          alt={customer.name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 16vw"
          quality={85}
        />
      </div>

      {/* Company name */}
      <p
        className="relative z-10 mt-3 text-center text-xs font-semibold tracking-[0.15em] uppercase"
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
      <div className="w-full px-6 pt-16 pb-10 md:px-16 md:pt-32 md:pb-20 lg:px-24 xl:px-32">
        <SectionRule label="Customers" />
        <div className="grid items-end gap-16 lg:grid-cols-[1fr_440px]">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Powering India's
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-1">
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                largest
              </h2>
            </RevealText>
            <RevealText delay={0.12}>
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                projects.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.3} className="pb-3">
            <div className="mb-8 h-10 w-px" style={{ background: GREEN }} />
            <p
              className="text-lg leading-[1.85] md:text-xl"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              15+ companies. India's largest construction sites. Measurable ROI from day
              one.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Full-bleed logo grid — Terminal Industries style */}
      {/* container: border-t + border-l; each cell: border-r + border-b = perfect grid */}
      <div className="w-full border-t border-l" style={{ borderColor: DIM }}>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6">
          {ALL_CUSTOMERS.map((c, i) => (
            <LogoCell key={c.name} customer={c} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom caption — no external link */}
      <div
        className="w-full border-t px-6 py-8 md:px-16 md:py-10 lg:px-24 xl:px-32"
        style={{ borderColor: DIM }}
      >
        <FadeUp>
          <p
            className="text-center text-base md:text-lg"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            Trusted by industry leaders worldwide
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
      'Their wall finishing robot has eliminated rework entirely on our sites. The precision and consistency are outstanding. Every wall comes out perfect.',
    name: 'Maria Garcia',
    role: 'Facilities Manager',
    company: 'Embassy Group',
  },
  {
    quote:
      "The customer support and ongoing innovation from Flo Mobility keeps us ahead of the competition. They're not just a vendor. They're a true partner.",
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

// Full editorial testimonial card (featured)
function TestiCard({ t, index }: { t: (typeof TESTIMONIALS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <motion.article
      ref={ref}
      className="flex flex-col overflow-hidden rounded-2xl border"
      style={{ background: BG, borderColor: DIM }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.08 * index, ease: EASE }}
    >
      {/* Green left accent bar — horizontal on card top */}
      <div
        className="h-[3px] w-full shrink-0"
        style={{ background: `linear-gradient(to right, ${GREEN}, transparent 70%)` }}
      />

      <div className="flex flex-1 flex-col p-8 sm:p-10">
        {/* Large pull-quote mark */}
        <div
          className="mb-4 text-[96px] leading-none font-black select-none"
          style={{
            color: `${GREEN}30`,
            fontFamily: 'var(--font-dm-sans)',
            lineHeight: '0.7',
          }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* Quote body — large, high contrast */}
        <p
          className="mb-10 flex-1 text-[17px] leading-[1.85] font-medium sm:text-[18px] lg:text-[19px]"
          style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
        >
          {t.quote}
        </p>

        {/* Author row */}
        <div
          className="flex items-center gap-4 border-t pt-7"
          style={{ borderColor: DIM }}
        >
          {/* Initials avatar */}
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[13px] font-black"
            style={{
              background: `${GREEN}1a`,
              color: GREEN_D,
              border: `1.5px solid ${GREEN}40`,
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            {t.name
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .slice(0, 2)}
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="text-[15px] leading-tight font-bold"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              {t.name}
            </p>
            <p
              className="mt-1 text-[13px] leading-tight"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              {t.role}
              <span className="mx-1.5" style={{ color: DIM }}>
                ·
              </span>
              {t.company}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function TestimonialsSection() {
  const featured = TESTIMONIALS.slice(0, 3); // left col: 2 stacked, right col: 1 tall
  const tickerItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      className="w-full overflow-hidden border-t"
      style={{ background: BG2, borderColor: DIM }}
    >
      {/* ── Top zone: editorial two-column layout ── */}
      <div className="w-full px-6 pt-16 pb-12 md:px-16 md:pt-32 md:pb-24 lg:px-24 xl:px-32">
        <SectionRule label="Testimonials" />

        <div className="grid items-start gap-20 lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr] xl:gap-28">
          {/* ── LEFT: sticky heading block ── */}
          <div className="lg:sticky lg:top-32">
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(3rem,5.5vw,6rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                What our
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-1">
              <h2
                className="text-[clamp(3rem,5.5vw,6rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                customers
              </h2>
            </RevealText>
            <RevealText delay={0.12}>
              <h2
                className="text-[clamp(3rem,5.5vw,6rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                say.
              </h2>
            </RevealText>

            <FadeUp delay={0.3} className="mt-10">
              <div className="mb-7 h-10 w-px" style={{ background: GREEN }} />
              <p
                className="text-xl leading-[1.85]"
                style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
              >
                From India's largest construction companies to growing infrastructure
                teams. Real results from real deployments.
              </p>
            </FadeUp>

            {/* Social proof metric */}
            <FadeUp delay={0.42} className="mt-10">
              <div
                className="inline-flex items-center gap-5 rounded-2xl border px-7 py-5"
                style={{ background: BG, borderColor: DIM }}
              >
                <div>
                  <div
                    className="text-[2.8rem] leading-none font-black tabular-nums"
                    style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    40%
                  </div>
                  <div
                    className="mt-1.5 text-sm font-semibold tracking-[0.2em] uppercase"
                    style={{ color: MUTED }}
                  >
                    Avg. productivity gain
                  </div>
                </div>
                <div className="w-px self-stretch" style={{ background: DIM }} />
                <div>
                  <div
                    className="text-[2.8rem] leading-none font-black tabular-nums"
                    style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    35%
                  </div>
                  <div
                    className="mt-1.5 text-sm font-semibold tracking-[0.2em] uppercase"
                    style={{ color: MUTED }}
                  >
                    Cost reduction
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* ── RIGHT: stacked featured testimonial cards — single column, full width ── */}
          <div className="flex flex-col gap-5">
            <TestiCard t={featured[0]} index={0} />
            <TestiCard t={featured[1]} index={1} />
            <TestiCard t={featured[2]} index={2} />
          </div>
        </div>
      </div>

      {/* ── Bottom zone: full-bleed infinite ticker ── */}
      <div
        className="w-full overflow-hidden border-t pt-14 pb-20"
        style={{ borderColor: DIM }}
      >
        {/* Row 1 → */}
        <div className="relative mb-5">
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-40"
            style={{ background: `linear-gradient(to right, ${BG2} 40%, transparent)` }}
          />
          <div
            className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-40"
            style={{ background: `linear-gradient(to left, ${BG2} 40%, transparent)` }}
          />
          <div className="animate-testi-1 flex gap-4 whitespace-nowrap">
            {tickerItems.map((t, i) => (
              <div
                key={i}
                className="flex w-[380px] shrink-0 flex-col gap-4 rounded-2xl border px-7 py-6 whitespace-normal sm:w-[440px]"
                style={{ background: BG, borderColor: DIM }}
              >
                <p
                  className="text-base leading-[1.75] font-medium sm:text-[17px]"
                  style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div
                  className="flex items-center gap-3 border-t pt-4"
                  style={{ borderColor: DIM }}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-black"
                    style={{
                      background: `${GREEN}1a`,
                      color: GREEN_D,
                      fontFamily: 'var(--font-dm-sans)',
                    }}
                  >
                    {t.name
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <span
                      className="text-[15px] font-bold"
                      style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {t.name}
                    </span>
                    <span className="mx-1.5 text-[13px]" style={{ color: DIM }}>
                      ·
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {t.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 ← reverse */}
        <div className="relative">
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-40"
            style={{ background: `linear-gradient(to right, ${BG2} 40%, transparent)` }}
          />
          <div
            className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-40"
            style={{ background: `linear-gradient(to left, ${BG2} 40%, transparent)` }}
          />
          <div className="animate-testi-2 flex gap-4 whitespace-nowrap">
            {[...tickerItems].reverse().map((t, i) => (
              <div
                key={i}
                className="flex w-[380px] shrink-0 flex-col gap-4 rounded-2xl border px-7 py-6 whitespace-normal sm:w-[440px]"
                style={{ background: BG, borderColor: DIM }}
              >
                <p
                  className="text-base leading-[1.75] font-medium sm:text-[17px]"
                  style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div
                  className="flex items-center gap-3 border-t pt-4"
                  style={{ borderColor: DIM }}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-black"
                    style={{
                      background: `${GREEN}1a`,
                      color: GREEN_D,
                      fontFamily: 'var(--font-dm-sans)',
                    }}
                  >
                    {t.name
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <span
                      className="text-[15px] font-bold"
                      style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {t.name}
                    </span>
                    <span className="mx-1.5 text-[13px]" style={{ color: DIM }}>
                      ·
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {t.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
          animation: testi-1 52s linear infinite;
        }
        .animate-testi-2 {
          animation: testi-2 44s linear infinite;
        }
      `}</style>
    </section>
  );
}

// ─── Section 8 — Technology (visual card grid, light) ─────────────────────────

const TECH_CARDS: {
  number: string;
  tag: string;
  tagline: string;
  Icon: LucideIcon;
  specs: { value: string; label: string }[];
}[] = [
  {
    number: '01',
    tag: 'Hardware',
    tagline: 'The robot itself.',
    Icon: Cpu,
    specs: [
      { value: '500 kg', label: 'Payload' },
      { value: 'IP65', label: 'Dust Sealed' },
      { value: 'Electric', label: '4-Wheel Drive' },
    ],
  },
  {
    number: '02',
    tag: 'Perception',
    tagline: 'How it sees the world.',
    Icon: Eye,
    specs: [
      { value: '32-beam', label: 'LiDAR' },
      { value: '200 m', label: 'Range' },
      { value: '360°', label: 'Coverage' },
    ],
  },
  {
    number: '03',
    tag: 'Autonomy',
    tagline: 'How it navigates.',
    Icon: Navigation2,
    specs: [
      { value: 'GPS Enabled', label: 'Nav' },
      { value: '<100 ms', label: 'Reaction' },
      { value: 'Edge AI', label: 'On-board' },
    ],
  },
  {
    number: '04',
    tag: 'Fleet Platform',
    tagline: 'How you control it all.',
    Icon: LayoutDashboard,
    specs: [
      { value: '99.9%', label: 'Uptime' },
      { value: 'Multi-site', label: 'Dashboard' },
      { value: 'OTA', label: 'Updates' },
    ],
  },
];

function TechCard({ card, index }: { card: (typeof TECH_CARDS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const Icon = card.Icon;

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col overflow-hidden rounded-3xl border"
      style={{ background: BG, borderColor: DIM }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1 * index, ease: EASE }}
    >
      {/* Ghost number — background watermark */}
      <span
        className="pointer-events-none absolute top-3 right-5 text-[5.5rem] leading-none font-black tabular-nums select-none"
        style={{ color: 'rgba(25,28,26,0.04)', fontFamily: 'var(--font-dm-sans)' }}
        aria-hidden="true"
      >
        {card.number}
      </span>

      <div className="flex flex-1 flex-col p-7 lg:p-8">
        {/* Tag label */}
        <span
          className="mb-7 text-sm font-bold tracking-[0.22em] uppercase"
          style={{ color: DIM, fontFamily: 'var(--font-dm-sans)' }}
        >
          {card.tag}
        </span>

        {/* Icon — large, centrepiece */}
        <div
          className="mb-7 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
          style={{ background: `${GREEN}18` }}
        >
          <Icon className="h-8 w-8" style={{ color: GREEN }} />
        </div>

        {/* Short tagline */}
        <h3
          className="mb-8 text-2xl leading-[1.1] font-black tracking-[-0.02em]"
          style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
        >
          {card.tagline}
        </h3>

        {/* 3 key specs — pushed to bottom of card */}
        <div
          className="mt-auto grid grid-cols-3 gap-3 border-t pt-6"
          style={{ borderColor: DIM }}
        >
          {card.specs.map((spec) => (
            <div key={spec.label}>
              <div
                className="mb-1 text-base leading-none font-black tabular-nums"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                {spec.value}
              </div>
              <div
                className="text-[11px] leading-snug font-semibold tracking-[0.12em] uppercase"
                style={{ color: MUTED }}
              >
                {spec.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TechSection() {
  return (
    <section
      className="w-full border-t px-6 py-20 md:px-16 md:py-40 lg:px-24 xl:px-32"
      style={{ background: BG2, borderColor: DIM }}
    >
      <SectionRule label="Technology" />

      {/* Header */}
      <div className="mb-16 grid items-end gap-16 md:mb-20 lg:grid-cols-[1fr_400px]">
        <div>
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(2.8rem,5.5vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              Built end to end,
            </h2>
          </RevealText>
          <RevealText delay={0.06}>
            <h2
              className="text-[clamp(2.8rem,5.5vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{
                color: 'rgba(4 104 37 / 0.86)',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              in-house.
            </h2>
          </RevealText>
        </div>
        <FadeUp delay={0.2} className="pb-2">
          <div className="mb-7 h-10 w-px" style={{ background: GREEN }} />
          <p
            className="text-lg leading-[1.85] md:text-xl"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            We own the hardware, software, and autonomy stack, giving full control over
            performance, safety, and cost.
          </p>
        </FadeUp>
      </div>

      {/* 4-card grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {TECH_CARDS.map((card, i) => (
          <TechCard key={card.number} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── CTA — home page only ─────────────────────────────────────────────────────

const DIM_W_CTA = 'rgba(255,255,255,0.08)';
const MUTED_W_CTA = 'rgba(255,255,255,0.38)';
const TEXT_W_CTA = 'rgba(255,255,255,0.90)';

function CTASection() {
  return (
    <section
      className="w-full px-6 pt-20 pb-16 md:px-14 md:pt-28 md:pb-24 lg:px-20 lg:pt-36 xl:px-28"
      style={{ background: BG_DARK }}
    >
      <div className="grid grid-cols-1 items-end gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left — giant headline */}
        <FadeUp>
          <h2
            className="leading-[0.90] font-black tracking-[-0.04em] uppercase"
            style={{
              fontSize: 'clamp(3.4rem, 7vw, 8.5rem)',
              fontFamily: 'var(--font-dm-sans)',
              color: TEXT_W_CTA,
            }}
          >
            Ready to
            <br />
            <span style={{ color: GREEN }}>automate</span>
            <br />
            your site?
          </h2>
        </FadeUp>

        {/* Right — CTA block, aligned to bottom of headline */}
        <FadeUp delay={0.14} className="flex flex-col gap-8 lg:pb-1">
          {/* Top rule */}
          <div className="h-px w-full" style={{ background: DIM_W_CTA }} />

          {/* Descriptor */}
          <p
            className="max-w-xs text-base leading-[1.6] md:text-lg"
            style={{ color: MUTED_W_CTA, fontFamily: 'var(--font-dm-sans)' }}
          >
            Autonomous robots on a flexible subscription — no capital cost, deployed in
            days.
          </p>

          {/* Button + email */}
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:scale-[1.04] hover:brightness-105"
              style={{
                background: GREEN,
                color: BG_DARK,
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              Book a Demo
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="mailto:contact@flomobility.com"
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: MUTED_W_CTA, fontFamily: 'var(--font-dm-sans)' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = GREEN)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = MUTED_W_CTA)
              }
            >
              contact@flomobility.com
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="w-full" style={{ color: TEXT, background: BG }}>
      <HeroWithScroll />
      <ProofBar />
      <MissionSection />
      <ImageShowcaseSection />
      {/* <ProductsSection /> */}
      {/* <CaseStudySection /> */}
      {/* <ProcessSection /> */}
      <CustomersSection />
      <BelieversSection />
      {/* <TestimonialsSection /> */}
      <TechSection />
      <CTASection />
    </div>
  );
}
