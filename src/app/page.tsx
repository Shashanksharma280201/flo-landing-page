"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { HeroWithScroll } from "@/components/hero-with-scroll";
import { ArrowRight, CheckCircle2, ArrowUpRight, Play, Cpu, Eye, Navigation2, LayoutDashboard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Design tokens — FLO brand light theme ───────────────────────────────────
const BG       = "#ffffff";
const BG2      = "#f5f5f5";
const BG_WARM  = "#f0f0f0";
const GREEN    = "#7ccd54";       // FLO primary green — buttons/CTAs only
const GREEN_D  = "#286c00";       // darker green — buttons/links only
const TEXT     = "#191c1a";       // near-black — all headings & accent lines
const MUTED    = "rgba(25,28,26,0.55)";
const DIM      = "rgba(25,28,26,0.15)";
const BG_DARK = "#0e1210";       // near-black with slight green tint — dark sections
const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1];

// ─── Primitive animation components ──────────────────────────────────────────

function RevealText({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <div ref={ref} className={className}>
      <div style={{ overflow: "hidden", paddingBottom: "0.35em", marginBottom: "-0.35em" }}>
        <motion.div
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
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
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
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
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-5 mb-16"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <span
        className="text-base font-bold tracking-[0.26em] uppercase whitespace-nowrap"
        style={{ color: DIM }}
      >
        {label}
      </span>
      <motion.div
        className="flex-1 h-px"
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
  className = "",
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
  const springX = useSpring(x, { stiffness: 300, damping: 25, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 25, mass: 0.5 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }, [x, y, strength]);

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: "inline-flex" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      <div style={style} className="w-full h-full" onClick={onClick}>
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <motion.div
        ref={ref}
        style={{ x: springX, y: springY, display: "inline-flex" }}
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

const SHOWCASE_IMAGES = [
  { src: "/mmr-images/mmr-images-1.jpg",   label: "Material Movement Bot" },
  { src: "/mmr-images/mmr-images-2.jpg",   label: "Autonomous Navigation" },
  { src: "/mmr-images/mmr-images-3.jpg",   label: "Site Operations" },
  { src: "/mmr-images/mmr-robot.png",      label: "MMR Robot" },
  { src: "/mmr-images/mmr-robot-new.png",  label: "Next-Gen MMR" },
];

function ImageShowcaseSection() {
  return (
    <section className="w-full py-16 md:py-24 overflow-hidden" style={{ background: BG2 }}>
      <div className="flex gap-3 md:gap-4 px-4 md:px-8">
        {SHOWCASE_IMAGES.map((img, i) => (
          <FadeUp key={img.label} delay={i * 0.08} className="flex-1 min-w-0">
            <div className="group relative flex flex-col">
              {/* Image */}
              <div className="relative w-full overflow-hidden rounded-xl md:rounded-2xl" style={{ aspectRatio: "3/4" }}>
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 20vw"
                  quality={90}
                />
                {/* Subtle bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-xl md:rounded-2xl" />
              </div>
              {/* Label */}
              <p
                className="mt-3 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-center"
                style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}
              >
                {img.label}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ─── Section 1 — Proof ticker ─────────────────────────────────────────────────

const METRICS = [
  { value: "50+",      label: "Robots Deployed" },
  { value: "10,000+",  label: "Hours Saved" },
  { value: "4,000 km", label: "Autonomous Distance" },
  { value: "200+",     label: "Projects Completed" },
  { value: "500 kg",   label: "Payload Capacity" },
  { value: "30%",      label: "Fewer Accidents" },
  { value: "24/7",     label: "Operation" },
  { value: "<1 day",   label: "Deployment" },
];

function ProofBar() {
  return (
    <section className="relative w-full overflow-hidden border-b" style={{ background: BG2, borderColor: DIM }}>
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute left-0 top-0 bottom-0 w-24" style={{ background: `linear-gradient(to right, ${BG2} 60%, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-24" style={{ background: `linear-gradient(to left, ${BG2} 60%, transparent)` }} />
      </div>
      <div className="flex animate-proof-ticker items-center">
        {[...METRICS, ...METRICS, ...METRICS].map((m, i) => (
          <div key={i} className="flex items-center gap-6 shrink-0 px-10 py-6 border-r" style={{ borderColor: DIM }}>
            <span
              className="text-3xl font-black tracking-tight tabular-nums"
              style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              {m.value}
            </span>
            <span className="text-base font-semibold uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: MUTED }}>
              {m.label}
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes proof-ticker { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        .animate-proof-ticker { animation: proof-ticker 38s linear infinite; }
      `}</style>
    </section>
  );
}

// ─── Section 2 — Mission ──────────────────────────────────────────────────────

function MissionSection() {
  return (
    <section className="hero-skip-target w-full px-6 md:px-16 lg:px-24 xl:px-32 py-20 md:py-40" style={{ background: BG }}>
      <SectionRule label="Mission" />
      <div className="grid lg:grid-cols-[1fr_400px] gap-20 items-end">
        <div>
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(3.5rem,8vw,9.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              Autonomous
            </h2>
          </RevealText>
          <RevealText delay={0.06} className="mb-1">
            <h2
              className="text-[clamp(3.5rem,8vw,9.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
              style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
            >
              construction
            </h2>
          </RevealText>
          <RevealText delay={0.12}>
            <h2
              className="text-[clamp(3.5rem,8vw,9.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              at scale.
            </h2>
          </RevealText>
        </div>

        <FadeUp delay={0.3} className="pb-4">
          <div className="w-px h-14 mb-8" style={{ background: GREEN }} />
          <p
            className="text-lg md:text-xl leading-[1.85] mb-8"
            style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}
          >
            FLO Mobility builds autonomous robots that work alongside your crew
            — hauling materials, maintaining grounds, and managing entire fleets
            at scale. Robot-as-a-Service for India's most demanding job sites.
          </p>
          <MagneticButton
            href="/contact"
            className="inline-flex items-center gap-2 text-base font-bold uppercase tracking-wide group"
            style={{ color: GREEN_D }}
          >
            See how it works
            <motion.span
              className="inline-flex"
              animate={{ x: 0, y: 0 }}
              whileHover={{ x: 2, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="w-4 h-4" />
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
            { value: "200+", label: "Projects completed" },
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
  | { type: "image"; src: string }
  | { type: "video"; videoId: string }
  | { type: "dashboard" };

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
    number: "01",
    tag: "Material Movement",
    title: "500 kg. Zero driver. Full speed.",
    body: "With advanced sensors and autonomous navigation, this efficient and adaptable robot streamlines logistics operations with speed and reliability. Experience optimized efficiency, reduced manual labor, and increased productivity with the Material Movement Bot.",
    stats: [
      { value: "500 kg", label: "Payload" },
      { value: "24/7", label: "Operation" },
      { value: "<1 day", label: "Commissioning" },
    ],
    points: [
      "Driverless Operation — eliminates human error and optimizes performance",
      "Electric Power Train — efficient and sustainable with instant torque",
      "Swappable batteries — minimize downtime by seamlessly swapping batteries",
    ],
    media: { type: "image", src: "/mmr-images/mmr-images-1.jpg" },
    href: "/offerings/material-movement",
    cta: "Explore Material Movement",
    flip: false,
  },
  {
    number: "02",
    tag: "Wall Finishing",
    title: "Uniform finish. Zero rework. Every wall.",
    body: "Our wall finishing robot automates sanding and putty application with precision movement — bringing uniformity and consistency to every surface, reducing material wastage, and delivering a superior quality finish at lower cost.",
    stats: [
      { value: "±1 mm", label: "Precision" },
      { value: "3×", label: "Faster than manual" },
      { value: "30%", label: "Material savings" },
    ],
    points: [
      "Automated putty application and sanding — no manual rework",
      "Precision movement ensures uniform thickness on every wall",
      "Reduces material waste and project costs significantly",
    ],
    media: { type: "video", videoId: "ic9SQMPXoDE" },
    href: "/offerings/wall-finishing",
    cta: "Explore Wall Finishing",
    flip: true,
  },
  {
    number: "03",
    tag: "Fleet Management",
    title: "Full fleet visibility. One dashboard.",
    body: "FLO Fleet Control gives you real-time oversight of every robot across every site — from battery levels and mission status to route analytics and alerts. Scale from one unit to an entire fleet without adding headcount.",
    stats: [
      { value: "24/7",  label: "Monitoring" },
      { value: "99.9%", label: "Uptime SLA" },
      { value: "<100",  label: "ms Latency" },
    ],
    points: [
      "Real-time LiDAR mapping and obstacle detection",
      "Multi-robot coordination across multiple sites",
      "Remote monitoring and instant alert dashboard",
    ],
    media: { type: "dashboard" },
    href: "/offerings/fleet-control",
    cta: "Explore Fleet Control",
    flip: false,
  },
];

function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const isFlip = product.flip;
  const [playing, setPlaying] = useState(false);

  // 3D tilt on content panel
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 200, damping: 28 });
  const rotateY = useSpring(tiltY, { stiffness: 200, damping: 28 });

  const onTiltMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;   // -0.5 to 0.5
    const ny = (e.clientY - r.top)  / r.height - 0.5;
    tiltX.set(-ny * 6);   // max ±6deg
    tiltY.set(nx * 6);
  }, [tiltX, tiltY]);

  const onTiltLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  // ── Media panel ──────────────────────────────────────────────────────────────
  const media = product.media;

  // Dashboard: browser chrome + hud-dashboard.png — no clip-path, FadeUp style
  if (media.type === "dashboard") {
    return (
      <div
        ref={ref}
        className="grid lg:grid-cols-2 w-full overflow-hidden border-b"
        style={{ borderColor: DIM }}
      >
        {/* Dashboard mockup panel */}
        <motion.div
          className={`relative order-1 ${isFlip ? "lg:order-2" : "lg:order-1"} min-h-[280px] lg:min-h-[360px] flex items-center justify-center p-6 lg:p-12`}
          style={{ background: BG2 }}
          initial={{ opacity: 0, x: isFlip ? 48 : -48 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.05, ease: EASE }}
        >
          {/* Browser chrome mockup */}
          <div
            className="w-full rounded-2xl overflow-hidden border shadow-xl"
            style={{ borderColor: DIM }}
          >
            {/* Chrome header */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ background: BG, borderColor: DIM }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: DIM }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: DIM }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: GREEN }} />
              </div>
              <div
                className="flex-1 rounded px-3 py-1 text-[10px] ml-2 font-mono"
                style={{ background: BG2, color: MUTED }}
              >
                fleet.flomobility.com
              </div>
            </div>
            {/* Dashboard image */}
            <div className="relative aspect-video" style={{ background: "#0a140a" }}>
              <Image
                src="/hud-dashboard.png"
                alt="Fleet Control Dashboard — Real-time Robot Management"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product number overlay */}
          <div
            className="absolute bottom-8 left-8 text-[7rem] font-black leading-none select-none tabular-nums pointer-events-none"
            style={{ color: "rgba(25,28,26,0.06)", fontFamily: "var(--font-dm-sans)" }}
            aria-hidden="true"
          >
            {product.number}
          </div>
        </motion.div>

        {/* Content panel — 3D tilt */}
        <motion.div
          ref={cardRef}
          className={`relative flex items-center order-2 ${isFlip ? "lg:order-1" : "lg:order-2"}`}
          style={{ background: BG, rotateX, rotateY, transformPerspective: 1200 }}
          initial={{ opacity: 0, x: isFlip ? -48 : 48 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          onMouseMove={onTiltMove}
          onMouseLeave={onTiltLeave}
        >
          <div className="px-7 sm:px-14 lg:px-16 xl:px-20 py-10 lg:py-24 w-full">
            {/* Tag */}
            <motion.div
              className="flex items-center gap-2.5 mb-8"
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: GREEN }} />
              <span className="text-base font-bold uppercase tracking-[0.22em]" style={{ color: MUTED }}>{product.tag}</span>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex mb-8 md:mb-12 rounded-2xl overflow-hidden border"
              style={{ borderColor: DIM, background: BG2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              {product.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex-1 px-3 sm:px-6 py-4 sm:py-5 text-center ${i < product.stats.length - 1 ? "border-r" : ""}`}
                  style={{ borderColor: DIM }}
                >
                  <div className="text-lg sm:text-2xl font-black leading-none mb-1 sm:mb-1.5" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>{s.value}</div>
                  <div className="text-sm sm:text-base font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em]" style={{ color: DIM }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.h3
              className="text-[clamp(1.8rem,3.2vw,3rem)] font-black leading-[1.05] tracking-[-0.025em] mb-5"
              style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            >
              {product.title}
            </motion.h3>

            <motion.p
              className="text-lg md:text-xl leading-[1.85] mb-8 max-w-lg"
              style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {product.body}
            </motion.p>

            <motion.ul
              className="space-y-3.5 mb-10"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {product.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3">
                  <CheckCircle2 className="w-[18px] h-[18px] mt-0.5 shrink-0" style={{ color: GREEN }} />
                  <span className="text-base md:text-lg leading-snug" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>{pt}</span>
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
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide"
                style={{ background: GREEN, color: "#ffffff", fontFamily: "var(--font-dm-sans)" }}
              >
                {product.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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
      className="grid lg:grid-cols-2 w-full overflow-hidden border-b"
      style={{ borderColor: DIM }}
    >
      {/* Media panel — image or YouTube embed */}
      <motion.div
        className={`relative order-1 ${isFlip ? "lg:order-2" : "lg:order-1"} min-h-[280px] lg:min-h-[360px] overflow-hidden`}
        initial={{ clipPath: isFlip ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0%)" } : {}}
        transition={{ duration: 1.2, delay: 0.05, ease: EASE }}
      >
        {media.type === "image" ? (
          <>
            <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
              <Image src={media.src} alt={product.tag} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </motion.div>
            {/* Gradient overlay */}
            <div className={`absolute inset-0 ${isFlip ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-black/30 via-black/10 to-transparent z-10`} />
          </>
        ) : (
          /* YouTube embed with visible thumbnail */
          <div className="absolute inset-0">
            {playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${media.videoId}?autoplay=1&rel=0`}
                title={product.tag}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                {/* YouTube hqdefault thumbnail (always available) */}
                <Image
                  src={`https://i.ytimg.com/vi/${media.videoId}/hqdefault.jpg`}
                  alt={product.tag}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-black/30 z-10" />
                {/* Play button */}
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center z-20"
                  aria-label="Play video"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: GREEN }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <Play className="w-8 h-8 fill-white text-white ml-1" />
                  </motion.div>
                </button>
                {/* Caption badge */}
                <div
                  className="absolute bottom-8 left-8 z-20 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.16em]"
                  style={{ background: "rgba(25,28,26,0.6)", color: "#fff" }}
                >
                  Watch the robot in action
                </div>
              </>
            )}
          </div>
        )}
        {/* Product number — editorial overlay (image only, stays visible) */}
        {media.type === "image" && (
          <div
            className="absolute bottom-8 left-8 z-20 text-[7rem] font-black leading-none select-none tabular-nums"
            style={{ color: "rgba(255,255,255,0.12)", fontFamily: "var(--font-dm-sans)" }}
            aria-hidden="true"
          >
            {product.number}
          </div>
        )}
      </motion.div>

      {/* Content — 3D tilt */}
      <motion.div
        ref={cardRef}
        className={`relative flex items-center order-2 ${isFlip ? "lg:order-1" : "lg:order-2"}`}
        style={{ background: BG, rotateX, rotateY, transformPerspective: 1200 }}
        initial={{ opacity: 0, x: isFlip ? -48 : 48 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        onMouseMove={onTiltMove}
        onMouseLeave={onTiltLeave}
      >
        <div className="px-7 sm:px-14 lg:px-16 xl:px-20 py-10 lg:py-24 w-full">
          {/* Tag */}
          <motion.div
            className="flex items-center gap-2.5 mb-8"
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: GREEN }} />
            <span className="text-base font-bold uppercase tracking-[0.22em]" style={{ color: MUTED }}>{product.tag}</span>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex mb-8 md:mb-12 rounded-2xl overflow-hidden border"
            style={{ borderColor: DIM, background: BG2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            {product.stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex-1 px-3 sm:px-6 py-4 sm:py-5 text-center ${i < product.stats.length - 1 ? "border-r" : ""}`}
                style={{ borderColor: DIM }}
              >
                <div
                  className="text-lg sm:text-2xl font-black leading-none mb-1 sm:mb-1.5"
                  style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                >
                  {s.value}
                </div>
                <div className="text-sm sm:text-base font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em]" style={{ color: DIM }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.h3
            className="text-[clamp(1.8rem,3.2vw,3rem)] font-black leading-[1.05] tracking-[-0.025em] mb-5"
            style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          >
            {product.title}
          </motion.h3>

          <motion.p
            className="text-lg md:text-xl leading-[1.85] mb-8 max-w-lg"
            style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {product.body}
          </motion.p>

          <motion.ul
            className="space-y-3.5 mb-10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {product.points.map((pt) => (
              <li key={pt} className="flex items-start gap-3">
                <CheckCircle2 className="w-[18px] h-[18px] mt-0.5 shrink-0" style={{ color: GREEN }} />
                <span className="text-base md:text-lg leading-snug" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
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
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide"
              style={{ background: GREEN, color: "#ffffff", fontFamily: "var(--font-dm-sans)" }}
            >
              {product.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 pt-16 md:pt-28 pb-8 md:pb-16 border-t" style={{ borderColor: DIM }}>
        <SectionRule label="Solutions" />
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-end">
          <div>
            <RevealText>
              <h2
                className="text-[clamp(2.8rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <span style={{ color: "rgba(4 104 37 / 0.86)" }}>Robot</span>
                <span style={{ color: TEXT }}>-as-a-Service</span>
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              We offer autonomous robots on a flexible subscription basis — from
              material movement and wall finishing to complete fleet management —
              seamlessly integrating with your existing operations.
            </p>
          </FadeUp>
        </div>
      </div>
      <div className="w-full">
        {PRODUCTS.map((p) => (<ProductCard key={p.number} product={p} />))}
      </div>
    </section>
  );
}

// ─── Section 4 — Proof / Case Study ──────────────────────────────────────────

function CaseStudySection() {
  return (
    <section className="w-full py-20 md:py-36 px-6 md:px-16 lg:px-24 xl:px-32 border-t" style={{ background: BG, borderColor: DIM }}>
      <SectionRule label="Proof of Work" />
      <div className="grid lg:grid-cols-[1fr_520px] gap-20 items-start">
        <div>
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              50% lower cost
            </h2>
          </RevealText>
          <RevealText delay={0.06} className="mb-1">
            <h2
              className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]"
              style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
            >
              and time on
            </h2>
          </RevealText>
          <RevealText delay={0.12}>
            <h2
              className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              last-mile movement.
            </h2>
          </RevealText>

          <FadeUp delay={0.3} className="mt-12">
            <p className="text-lg md:text-xl leading-[1.85] max-w-xl" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              Across active construction deployments, Flo's autonomous hauler replaces
              repetitive site transport with predictable, trackable movement. Deployed
              at L&T, PSP Projects, Sobha, Capacite Infra, and Total Environment.
            </p>
          </FadeUp>

          <FadeUp delay={0.4} className="mt-10">
            <motion.button
              onClick={() => document.getElementById("customers")?.scrollIntoView({ behavior: "smooth" })}
              className="group w-full text-left flex items-center justify-between p-6 rounded-2xl border cursor-pointer"
              style={{ borderColor: DIM, background: BG2 }}
              whileHover={{ borderColor: TEXT }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <p
                  className="text-sm font-bold uppercase tracking-[0.22em] mb-2.5"
                  style={{ color: DIM }}
                >
                  Trusted by
                </p>
                <p
                  className="text-xl font-black leading-snug"
                  style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                >
                  10+ leading construction<br />companies across India
                </p>
                <motion.p
                  className="text-sm font-semibold uppercase tracking-[0.18em] mt-3 flex items-center gap-1.5"
                  style={{ color: DIM }}
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  Meet our customers
                </motion.p>
              </div>
              <motion.div
                className="shrink-0 w-12 h-12 rounded-full border flex items-center justify-center"
                style={{ borderColor: DIM }}
                whileHover={{ backgroundColor: TEXT, borderColor: TEXT, scale: 1.08 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  whileHover={{ x: 2, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight className="w-5 h-5" style={{ color: TEXT }} />
                </motion.div>
              </motion.div>
            </motion.button>
          </FadeUp>
        </div>

        <div className="space-y-3">
          {[
            { value: "50%", label: "Cost reduction on material movement" },
            { value: "50%", label: "Time saved on last-mile transport" },
            { value: "30%", label: "Reduction in on-site accidents" },
            { value: "6x",  label: "Efficiency gain vs manual methods" },
          ].map((stat, i) => (
            <FadeUp key={stat.label} delay={0.18 + i * 0.08}>
              <div
                className="flex items-center gap-6 p-7 rounded-2xl border transition-colors duration-300"
                style={{ background: BG2, borderColor: DIM }}
              >
                <div
                  className="text-5xl font-black w-28 shrink-0 leading-none tabular-nums"
                  style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                >
                  {stat.value}
                </div>
                <div className="text-base md:text-lg leading-snug" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
                  {stat.label}
                </div>
              </div>
            </FadeUp>
          ))}
          <FadeUp delay={0.6}>
            <Link
              href="/offerings/material-movement"
              className="mt-2 inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105"
              style={{ background: GREEN, color: "#ffffff", fontFamily: "var(--font-dm-sans)" }}
            >
              Explore Material Movement <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Section 5 — Process ──────────────────────────────────────────────────────

const STEPS = [
  { number: "01", title: "Request a Demo", body: "Contact our team and we'll schedule a site visit. We assess your needs, map movement routes, and identify the highest-value automation opportunity." },
  { number: "02", title: "Deploy in Under a Day", body: "Our team commissions the robot on your site in hours, not weeks. No infrastructure changes, no long setup cycles. It plugs straight into your workflows." },
  { number: "03", title: "Scale Your Fleet", body: "Once the first unit proves ROI, adding more robots is seamless. Our Fleet Control platform gives you full visibility across all units from one dashboard." },
];

function ProcessStep({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="flex gap-5 sm:gap-8 py-8 sm:py-12 border-b group cursor-default relative"
      style={{ borderColor: DIM }}
      initial={{ opacity: 0, x: 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.08 * index, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Progress dot on the line */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+32px)] w-3 h-3 rounded-full hidden lg:block"
        style={{ background: hovered ? GREEN : DIM }}
        animate={{ scale: hovered ? 1.4 : 1, background: hovered ? GREEN : DIM }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="text-[3rem] sm:text-[5rem] font-black leading-none w-16 sm:w-24 shrink-0 pt-1 tabular-nums"
        style={{ fontFamily: "var(--font-dm-sans)" }}
        animate={{ color: hovered ? GREEN : "rgba(4 104 37 / 0.86)" }}
        transition={{ duration: 0.3 }}
      >
        {step.number}
      </motion.div>
      <div className="flex-1 pt-3">
        <h3
          className="text-2xl font-black mb-4"
          style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
        >
          {step.title}
        </h3>
        <p className="text-lg md:text-xl leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
          {step.body}
        </p>
      </div>
      <motion.div
        className="flex items-start pt-5 shrink-0"
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
        transition={{ duration: 0.25 }}
      >
        <ArrowUpRight className="w-5 h-5" style={{ color: GREEN }} />
      </motion.div>
    </motion.div>
  );
}

function ProcessSection() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ["start 80%", "end 30%"],
  });
  const lineHeight = useTransform(stepsProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="w-full px-6 md:px-16 lg:px-24 xl:px-32 py-20 md:py-40 border-t" style={{ background: BG2, borderColor: DIM }}>
      <SectionRule label="Process" />
      <div className="grid lg:grid-cols-[520px_1fr] gap-24 items-start">
        <div className="lg:sticky lg:top-32">
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(2.8rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              From demo
            </h2>
          </RevealText>
          <RevealText delay={0.05} className="mb-1">
            <h2
              className="text-[clamp(2.8rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]"
              style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
            >
              to deployed
            </h2>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              className="text-[clamp(2.8rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              in days.
            </h2>
          </RevealText>
          <FadeUp delay={0.3} className="mt-8">
            <p className="text-lg md:text-xl leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              Our deployment process is built for real construction sites — not controlled
              labs. Most customers see measurable ROI within the first month of operation.
            </p>
          </FadeUp>
        </div>

        {/* Steps with animated progress line */}
        <div ref={stepsRef} className="relative">
          {/* Vertical progress line */}
          <div
            className="absolute left-[-32px] top-0 bottom-0 w-px hidden lg:block"
            style={{ background: DIM }}
          >
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top"
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

const BELIEVERS = [
  { name: "Blume Ventures",   logo: "/believers/Blume.png" },
  { name: "DevX",             logo: "/believers/DevX.png" },
  { name: "Venture Garage",   logo: "/believers/Venture-Garage.png" },
  { name: "IISc",             logo: "/believers/IISC.png" },
  { name: "LetsVenture",      logo: "/believers/Lets-Venture.png" },
  { name: "JITO Angel Network",logo: "/believers/JITO.png" },
];

// Investor cell — same cursor-tracking glow as LogoCell, taller + richer
function InvestorCell({ believer, index }: { believer: (typeof BELIEVERS)[0]; index: number }) {
  const cellRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(cellRef, { once: true, margin: "-10% 0px" });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cellRef.current || !glowRef.current) return;
    const r = cellRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width)  * 100;
    const y = ((e.clientY - r.top)  / r.height) * 100;
    glowRef.current.style.background =
      `radial-gradient(ellipse 90% 90% at ${x}% ${y}%, ${GREEN}38 0%, transparent 68%)`;
    glowRef.current.style.opacity = "1";
  };

  const onLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      ref={cellRef}
      className="relative flex flex-col items-center justify-center px-5 py-8 sm:py-10 md:py-12 border-r border-b cursor-default overflow-hidden group"
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
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0, transition: "opacity 0.3s ease" }}
      />

      {/* logo */}
      <div className="relative h-16 sm:h-20 md:h-24 w-full max-w-[200px] z-10 transition-transform duration-500 group-hover:scale-105">
        <Image
          src={believer.logo}
          alt={believer.name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          quality={100}
        />
      </div>

      {/* name */}
      <p
        className="relative z-10 mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-center"
        style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}
      >
        {believer.name}
      </p>
    </motion.div>
  );
}

function BelieversSection() {
  return (
    <section id="investors" className="w-full border-t" style={{ background: BG, borderColor: DIM }}>

      {/* ── Header — same structure as CustomersSection ── */}
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 pt-16 md:pt-32 pb-10 md:pb-20">
        <SectionRule label="Investors" />
        <div className="grid lg:grid-cols-[1fr_440px] gap-16 items-end">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              >
                Fuelling our
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-1">
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
              >
                growth
              </h2>
            </RevealText>
            <RevealText delay={0.12}>
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              >
                and innovation.
              </h2>
            </RevealText>
          </div>

          <FadeUp delay={0.3} className="pb-3">
            <div className="w-px h-10 mb-8" style={{ background: GREEN }} />
            <p className="text-lg md:text-xl leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              Backed by India's leading venture funds, accelerators,
              and research institutions — fuelling FLO's mission to
              automate construction at scale.
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
      <div className="w-full border-t px-6 md:px-16 lg:px-24 xl:px-32 py-8 md:py-10" style={{ borderColor: DIM }}>
        <FadeUp>
          <p className="text-base md:text-lg text-center" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
            Supported by India's leading venture funds, accelerators, and research institutions
          </p>
        </FadeUp>
      </div>

    </section>
  );
}

// ─── Section 7 — Customers ────────────────────────────────────────────────────

const ALL_CUSTOMERS = [
  { name: "L&T",              logo: "/customers/LT.png" },
  { name: "PSP Projects",     logo: "/customers/PSP-Projects.png" },
  { name: "Sobha",            logo: "/customers/Sobha.png" },
  { name: "Nissan",           logo: "/customers/nissan.png" },
  { name: "Capacite",         logo: "/customers/Capacite.png" },
  { name: "Total Environment",logo: "/customers/Total-environment-2.png" },
  { name: "Kolte Patil",      logo: "/customers/Kolte-Patil.png" },
  { name: "Hitech",           logo: "/customers/Hitech.png" },
  { name: "K2K",              logo: "/customers/K2K-infrastructure.png" },
  { name: "Everest Carbon",   logo: "/customers/Everest-carbon.png" },
  { name: "Emboss",           logo: "/customers/Emboss.png" },
  { name: "Ati Motors",       logo: "/customers/Ati-motors.png" },
  { name: "ICAR IIHR",        logo: "/customers/Icar-iihr.png" },
  { name: "Hitech Group",     logo: "/customers/Hitech-1.png" },
  { name: "Group 30",         logo: "/customers/Group-30.png" },
];

// Logo cell with cursor-following green gradient (DOM refs — zero re-render cost)
function LogoCell({ customer, index }: { customer: (typeof ALL_CUSTOMERS)[0]; index: number }) {
  const cellRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(cellRef, { once: true, margin: "-10% 0px" });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cellRef.current || !glowRef.current) return;
    const r = cellRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width)  * 100;
    const y = ((e.clientY - r.top)  / r.height) * 100;
    glowRef.current.style.background =
      `radial-gradient(ellipse 85% 85% at ${x}% ${y}%, ${GREEN}40 0%, transparent 65%)`;
    glowRef.current.style.opacity = "1";
  };

  const onLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      ref={cellRef}
      className="relative flex flex-col items-center justify-center px-4 py-8 sm:py-10 md:py-12 border-r border-b cursor-default overflow-hidden"
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
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0, transition: "opacity 0.35s ease" }}
      />

      {/* Logo — always full opacity, no fade */}
      <div className="relative h-16 sm:h-20 md:h-24 w-full max-w-[200px] z-10">
        <Image
          src={customer.logo}
          alt={customer.name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 16vw"
          quality={100}
        />
      </div>

      {/* Company name */}
      <p
        className="relative z-10 text-xs font-semibold uppercase tracking-[0.15em] text-center mt-3"
        style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}
      >
        {customer.name}
      </p>
    </motion.div>
  );
}

function CustomersSection() {
  return (
    <section id="customers" className="w-full border-t" style={{ background: BG, borderColor: DIM }}>
      {/* Section header */}
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 pt-16 md:pt-32 pb-10 md:pb-20">
        <SectionRule label="Customers" />
        <div className="grid lg:grid-cols-[1fr_440px] gap-16 items-end">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              >
                Powering India's
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-1">
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
              >
                largest
              </h2>
            </RevealText>
            <RevealText delay={0.12}>
              <h2
                className="text-[clamp(3rem,7vw,8.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              >
                projects.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.3} className="pb-3">
            <div className="w-px h-10 mb-8" style={{ background: GREEN }} />
            <p className="text-lg md:text-xl leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              From construction giants to innovative infrastructure companies,
              our autonomous robots are transforming workflows across India's
              most active construction sites.
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
      <div className="w-full border-t px-6 md:px-16 lg:px-24 xl:px-32 py-8 md:py-10" style={{ borderColor: DIM }}>
        <FadeUp>
          <p className="text-base md:text-lg text-center" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
            Trusted by industry leaders worldwide
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 7 — Testimonials ─────────────────────────────────────────────────

const TESTIMONIALS = [
  { quote: "Flo Mobility's autonomous robots have transformed our construction site operations. We've seen a 40% increase in productivity and significantly improved safety standards.", name: "Rajesh Kumar", role: "Project Manager", company: "L&T Construction" },
  { quote: "The fleet control system is incredibly intuitive. Managing multiple robots across different sites has never been easier. This technology is a game-changer.", name: "Sarah Thompson", role: "Operations Director", company: "Shapoorji Pallonji" },
  { quote: "We've reduced our material movement costs by 35% since implementing Flo's autonomous solutions. The ROI was evident within the first quarter itself.", name: "Amit Patel", role: "CEO", company: "Buildtech Solutions" },
  { quote: "Their wall finishing robot has eliminated rework entirely on our sites. The precision and consistency are outstanding — every wall comes out perfect.", name: "Maria Garcia", role: "Facilities Manager", company: "Embassy Group" },
  { quote: "The customer support and ongoing innovation from Flo Mobility keeps us ahead of the competition. They're not just a vendor — they're a true partner.", name: "David Chen", role: "VP Operations", company: "Prestige Group" },
  { quote: "From deployment to daily operations, the entire experience has been seamless. The autonomous robots integrate perfectly with our existing workflows.", name: "Priya Sharma", role: "Site Supervisor", company: "Tata Projects" },
];

// Full editorial testimonial card (featured)
function TestiCard({ t, index }: { t: (typeof TESTIMONIALS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.article
      ref={ref}
      className="flex flex-col rounded-2xl overflow-hidden border"
      style={{ background: BG, borderColor: DIM }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.08 * index, ease: EASE }}
    >
      {/* Green left accent bar — horizontal on card top */}
      <div className="h-[3px] w-full shrink-0" style={{ background: `linear-gradient(to right, ${GREEN}, transparent 70%)` }} />

      <div className="flex flex-col flex-1 p-8 sm:p-10">
        {/* Large pull-quote mark */}
        <div
          className="text-[96px] font-black select-none leading-none mb-4"
          style={{ color: `${GREEN}30`, fontFamily: "var(--font-dm-sans)", lineHeight: "0.7" }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* Quote body — large, high contrast */}
        <p
          className="text-[17px] sm:text-[18px] lg:text-[19px] leading-[1.85] flex-1 mb-10 font-medium"
          style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
        >
          {t.quote}
        </p>

        {/* Author row */}
        <div className="flex items-center gap-4 pt-7 border-t" style={{ borderColor: DIM }}>
          {/* Initials avatar */}
          <div
            className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-[13px] font-black"
            style={{ background: `${GREEN}1a`, color: GREEN_D, border: `1.5px solid ${GREEN}40`, fontFamily: "var(--font-dm-sans)" }}
          >
            {t.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-[15px] font-bold leading-tight"
              style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              {t.name}
            </p>
            <p
              className="text-[13px] mt-1 leading-tight"
              style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}
            >
              {t.role}
              <span className="mx-1.5" style={{ color: DIM }}>·</span>
              {t.company}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function TestimonialsSection() {
  const featured = TESTIMONIALS.slice(0, 3);     // left col: 2 stacked, right col: 1 tall
  const tickerItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="w-full border-t overflow-hidden" style={{ background: BG2, borderColor: DIM }}>

      {/* ── Top zone: editorial two-column layout ── */}
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 pt-16 md:pt-32 pb-12 md:pb-24">
        <SectionRule label="Testimonials" />

        <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr] gap-20 xl:gap-28 items-start">

          {/* ── LEFT: sticky heading block ── */}
          <div className="lg:sticky lg:top-32">
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(3rem,5.5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              >
                What our
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-1">
              <h2
                className="text-[clamp(3rem,5.5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
              >
                customers
              </h2>
            </RevealText>
            <RevealText delay={0.12}>
              <h2
                className="text-[clamp(3rem,5.5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              >
                say.
              </h2>
            </RevealText>

            <FadeUp delay={0.3} className="mt-10">
              <div className="w-px h-10 mb-7" style={{ background: GREEN }} />
              <p
                className="text-xl leading-[1.85]"
                style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}
              >
                From India's largest construction companies to growing infrastructure teams — real results from real deployments.
              </p>
            </FadeUp>

            {/* Social proof metric */}
            <FadeUp delay={0.42} className="mt-10">
              <div
                className="inline-flex items-center gap-5 px-7 py-5 rounded-2xl border"
                style={{ background: BG, borderColor: DIM }}
              >
                <div>
                  <div
                    className="text-[2.8rem] font-black leading-none tabular-nums"
                    style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                  >
                    40%
                  </div>
                  <div
                    className="text-sm font-semibold uppercase tracking-[0.2em] mt-1.5"
                    style={{ color: MUTED }}
                  >
                    Avg. productivity gain
                  </div>
                </div>
                <div className="w-px self-stretch" style={{ background: DIM }} />
                <div>
                  <div
                    className="text-[2.8rem] font-black leading-none tabular-nums"
                    style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                  >
                    35%
                  </div>
                  <div
                    className="text-sm font-semibold uppercase tracking-[0.2em] mt-1.5"
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
      <div className="w-full border-t pb-20 pt-14 overflow-hidden" style={{ borderColor: DIM }}>
        {/* Row 1 → */}
        <div className="relative mb-5">
          <div className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${BG2} 40%, transparent)` }} />
          <div className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${BG2} 40%, transparent)` }} />
          <div className="flex gap-4 whitespace-nowrap animate-testi-1">
            {tickerItems.map((t, i) => (
              <div
                key={i}
                className="shrink-0 w-[380px] sm:w-[440px] whitespace-normal flex flex-col gap-4 px-7 py-6 rounded-2xl border"
                style={{ background: BG, borderColor: DIM }}
              >
                <p
                  className="text-base sm:text-[17px] leading-[1.75] font-medium"
                  style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: DIM }}>
                  <div
                    className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-[11px] font-black"
                    style={{ background: `${GREEN}1a`, color: GREEN_D, fontFamily: "var(--font-dm-sans)" }}
                  >
                    {t.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[15px] font-bold" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>{t.name}</span>
                    <span className="mx-1.5 text-[13px]" style={{ color: DIM }}>·</span>
                    <span className="text-sm" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>{t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 ← reverse */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${BG2} 40%, transparent)` }} />
          <div className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${BG2} 40%, transparent)` }} />
          <div className="flex gap-4 whitespace-nowrap animate-testi-2">
            {[...tickerItems].reverse().map((t, i) => (
              <div
                key={i}
                className="shrink-0 w-[380px] sm:w-[440px] whitespace-normal flex flex-col gap-4 px-7 py-6 rounded-2xl border"
                style={{ background: BG, borderColor: DIM }}
              >
                <p
                  className="text-base sm:text-[17px] leading-[1.75] font-medium"
                  style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: DIM }}>
                  <div
                    className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-[11px] font-black"
                    style={{ background: `${GREEN}1a`, color: GREEN_D, fontFamily: "var(--font-dm-sans)" }}
                  >
                    {t.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[15px] font-bold" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>{t.name}</span>
                    <span className="mx-1.5 text-[13px]" style={{ color: DIM }}>·</span>
                    <span className="text-sm" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>{t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes testi-1 { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @keyframes testi-2 { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
        .animate-testi-1 { animation: testi-1 52s linear infinite; }
        .animate-testi-2 { animation: testi-2 44s linear infinite; }
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
    number: "01",
    tag: "Hardware",
    tagline: "The robot itself.",
    Icon: Cpu,
    specs: [
      { value: "500 kg", label: "Payload" },
      { value: "IP65",       label: "Dust Sealed" },
      { value: "<1 day",     label: "Deploy Time" },
    ],
  },
  {
    number: "02",
    tag: "Perception",
    tagline: "How it sees the world.",
    Icon: Eye,
    specs: [
      { value: "32-beam", label: "LiDAR" },
      { value: "200 m",   label: "Range" },
      { value: "360°",    label: "Coverage" },
    ],
  },
  {
    number: "03",
    tag: "Autonomy",
    tagline: "How it navigates.",
    Icon: Navigation2,
    specs: [
      { value: "GPS-free", label: "SLAM Nav" },
      { value: "<100 ms",  label: "Reaction" },
      { value: "Edge AI",  label: "On-board" },
    ],
  },
  {
    number: "04",
    tag: "Fleet Platform",
    tagline: "How you control it all.",
    Icon: LayoutDashboard,
    specs: [
      { value: "99.9%",      label: "Uptime SLA" },
      { value: "Multi-site", label: "Dashboard" },
      { value: "OTA",        label: "Updates" },
    ],
  },
];

function TechCard({ card, index }: { card: (typeof TECH_CARDS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const Icon = card.Icon;

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col rounded-3xl border overflow-hidden"
      style={{ background: BG, borderColor: DIM }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1 * index, ease: EASE }}
    >
      {/* Ghost number — background watermark */}
      <span
        className="absolute top-3 right-5 text-[5.5rem] font-black leading-none tabular-nums select-none pointer-events-none"
        style={{ color: "rgba(25,28,26,0.04)", fontFamily: "var(--font-dm-sans)" }}
        aria-hidden="true"
      >
        {card.number}
      </span>

      <div className="flex flex-col flex-1 p-7 lg:p-8">

        {/* Tag label */}
        <span
          className="text-sm font-bold uppercase tracking-[0.22em] mb-7"
          style={{ color: DIM, fontFamily: "var(--font-dm-sans)" }}
        >
          {card.tag}
        </span>

        {/* Icon — large, centrepiece */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-7 shrink-0"
          style={{ background: `${GREEN}18` }}
        >
          <Icon className="w-8 h-8" style={{ color: GREEN }} />
        </div>

        {/* Short tagline */}
        <h3
          className="text-2xl font-black leading-[1.1] tracking-[-0.02em] mb-8"
          style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
        >
          {card.tagline}
        </h3>

        {/* 3 key specs — pushed to bottom of card */}
        <div
          className="mt-auto pt-6 border-t grid grid-cols-3 gap-3"
          style={{ borderColor: DIM }}
        >
          {card.specs.map((spec) => (
            <div key={spec.label}>
              <div
                className="text-base font-black leading-none mb-1 tabular-nums"
                style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              >
                {spec.value}
              </div>
              <div
                className="text-[11px] font-semibold uppercase tracking-[0.12em] leading-snug"
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
      className="w-full px-6 md:px-16 lg:px-24 xl:px-32 py-20 md:py-40 border-t"
      style={{ background: BG2, borderColor: DIM }}
    >
      <SectionRule label="Technology" />

      {/* Header */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-end mb-16 md:mb-20">
        <div>
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(2.8rem,5.5vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              Built end-to-end,
            </h2>
          </RevealText>
          <RevealText delay={0.06}>
            <h2
              className="text-[clamp(2.8rem,5.5vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]"
              style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
            >
              in-house.
            </h2>
          </RevealText>
        </div>
        <FadeUp delay={0.2} className="pb-2">
          <div className="w-px h-10 mb-7" style={{ background: GREEN }} />
          <p
            className="text-lg md:text-xl leading-[1.85]"
            style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}
          >
            FLO owns every layer of the stack — from the robot chassis to the
            fleet control software — giving full control over performance,
            safety, and cost.
          </p>
        </FadeUp>
      </div>

      {/* 4-card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {TECH_CARDS.map((card, i) => (
          <TechCard key={card.number} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Section 9 — CTA (dark atmospheric) ──────────────────────────────────────

function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Atmospheric orb drifts upward as you scroll through
  const orbY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden py-24 md:py-48 px-6 md:px-16 lg:px-24 xl:px-32"
      style={{ background: BG_DARK }}
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(${GREEN} 1px, transparent 1px), linear-gradient(90deg, ${GREEN} 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Floating green orb */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[160px]"
          style={{ background: `${GREEN}14`, y: orbY }}
        />
        {/* Edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 70% at 50% 50%, transparent 40%, ${BG_DARK}cc 100%)`,
          }}
        />
      </div>

      <div className="relative text-center">
        <FadeUp>
          <p className="text-base font-black tracking-[0.32em] uppercase mb-12" style={{ color: `${GREEN}80` }}>
            Get started today
          </p>
        </FadeUp>
        <RevealText className="mb-1">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]"
            style={{ color: "#ffffff", fontFamily: "var(--font-dm-sans)" }}
          >
            Ready to
          </h2>
        </RevealText>
        <RevealText delay={0.05} className="mb-1">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]"
            style={{ color: GREEN, fontFamily: "var(--font-dm-sans)", textShadow: `0 0 80px ${GREEN}60` }}
          >
            automate your
          </h2>
        </RevealText>
        <RevealText delay={0.1} className="mb-20">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]"
            style={{ color: "#ffffff", fontFamily: "var(--font-dm-sans)" }}
          >
            site?
          </h2>
        </RevealText>

        <FadeUp delay={0.3} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <MagneticButton
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 px-12 py-5 rounded-full text-base font-black shadow-[0_0_40px_rgba(124,205,84,0.35)] hover:shadow-[0_0_60px_rgba(124,205,84,0.55)] transition-shadow duration-400"
            style={{ background: GREEN, color: "#0e1210", fontFamily: "var(--font-dm-sans)" }}
          >
            Talk to our team <ArrowRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton
            href="/offerings/material-movement"
            className="inline-flex items-center justify-center gap-2 px-12 py-5 rounded-full text-base font-bold border transition-colors duration-300 hover:border-white/40"
            style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-dm-sans)" }}
          >
            View all solutions
          </MagneticButton>
        </FadeUp>

        <FadeUp delay={0.5} className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {["ISO Certified", "500+ Projects", "24/7 Support", "< 1 Day Deploy"].map((t) => (
            <div key={t} className="flex items-center gap-2 text-base font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.25)" }}>
              <span className="w-1 h-1 rounded-full" style={{ background: `${GREEN}80` }} />
              {t}
            </div>
          ))}
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
      <ProductsSection />
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
