"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Users, Target, Zap, Globe } from "lucide-react";

// ─── Design tokens — matches offering pages exactly ───────────────────────────
const BG      = "#ffffff";
const BG2     = "#f5f5f5";
const GREEN   = "#7ccd54";
const TEXT    = "#191c1a";
const MUTED   = "rgba(25,28,26,0.55)";
const DIM     = "rgba(25,28,26,0.15)";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Shared animation primitives ─────────────────────────────────────────────

function RevealText({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
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
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
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
      <span className="text-[10px] font-bold tracking-[0.26em] uppercase whitespace-nowrap" style={{ color: DIM }}>
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const CORE_TEAM = [
  {
    name: "Manesh Jain",
    title: "Founder & CEO",
    description: "MDI Gurgaon – Gold Medalist. Ex-IBM | 18+ years | 3× Founder",
    image: "/about/manesh-jain.png",
    photoPosition: "center 30%",
    linkedin: null,
  },
  {
    name: "Pratik Patel",
    title: "Co-Founder & COO",
    description: "Ex-Byju's, Accenture. Business & Product Leader",
    image: "/about/pratik-patel.jpg",
    photoPosition: "center 65%",
    linkedin: "https://www.linkedin.com/in/pratikpatel0929/",
  },
];

const CHANNEL_PARTNERS = [
  {
    name: "Bhavik Shah",
    title: "Partner – Jainam Enterprises",
    description: "Founder – Arinco Solutions Pvt Ltd. 10+ years experience in mining & construction manufacturing.",
    image: "/about/bhavik-shah.jpg",
    photoPosition: "center 25%",
    linkedin: null,
  },
  {
    name: "Sudarshan Narayan",
    title: "Founder – Coboticca Automation",
    description: "Founder – Amplifi (B2B SaaS). Angel Investor & Startup Mentor.",
    image: "/about/sudarshan-narayan.jpg",
    photoPosition: "center 20%",
    linkedin: null,
  },
];

const VALUES = [
  { icon: Target,  title: "Mission-First",    body: "Every decision is filtered through one question: does this accelerate autonomous work for the real world?" },
  { icon: Zap,     title: "Speed of Trust",   body: "We move fast, deploy fast, and build long-term relationships on the back of results — not promises." },
  { icon: Users,   title: "Human + Machine",  body: "Autonomy amplifies humans. We build systems that make workers safer and sites more productive, not obsolete." },
  { icon: Globe,   title: "India-Built, Global-Ready", body: "Engineered for the toughest Indian job sites — robust enough to deploy anywhere in the world." },
];

const MILESTONES = [
  { year: "2020", title: "Company Founded",           body: "Flo Mobility established with a vision to revolutionize autonomous robotics for industrial applications." },
  { year: "2021", title: "Seed Funding & First Prototype", body: "Secured seed funding. First autonomous prototype cleared field testing across construction sites." },
  { year: "2022", title: "First Commercial Deployment", body: "First robot went live on a major construction site. Lawn maintenance solution launched for golf courses and large estates." },
  { year: "2023", title: "G20 Summit Showcase",       body: "Demonstrated technology at G20 in Gandhinagar. Crossed 100+ robot deployments across three industry verticals." },
  { year: "2024", title: "Fleet Control Platform",    body: "Released cloud fleet management. Channel partner network established. Expanded into mining with AI navigation upgrades." },
  { year: "2025", title: "200+ Sites Deployed",       body: "200+ active deployment sites. Next-generation autonomous systems in development with enhanced AI and connectivity." },
];

const STATS = [
  { value: "200+", label: "Sites Deployed" },
  { value: "5 yrs", label: "In Operation" },
  { value: "3",    label: "Product Lines" },
  { value: "24/7", label: "Remote Support" },
];

// ─── Section 1 — Hero ────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="w-full px-8 md:px-16 lg:px-24 xl:px-32 pt-28 pb-0" style={{ background: BG2 }}>
      {/* Breadcrumb */}
      <FadeUp className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: DIM }}>
          <Link href="/" className="hover:underline" style={{ color: DIM }}>Home</Link>
          <span>/</span>
          <span style={{ color: TEXT }}>About</span>
        </div>
      </FadeUp>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center pb-0">
        {/* Left — text */}
        <div>
          <FadeUp className="mb-8">
            <div className="inline-flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: GREEN }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: GREEN }} />
              </span>
              <span className="text-[10px] font-bold tracking-[0.26em] uppercase" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
                Our Story
              </span>
            </div>
          </FadeUp>

          <div className="mb-8">
            <RevealText>
              <h1 className="text-[clamp(3rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                Redefining
              </h1>
            </RevealText>
            <RevealText delay={0.06}>
              <h1 className="text-[clamp(3rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
                how machines
              </h1>
            </RevealText>
            <RevealText delay={0.12}>
              <h1 className="text-[clamp(3rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                work.
              </h1>
            </RevealText>
          </div>

          <FadeUp delay={0.2}>
            <div className="w-16 h-px mb-8" style={{ background: DIM }} />
          </FadeUp>

          <FadeUp delay={0.25} className="mb-10">
            <p className="text-lg leading-[1.85] max-w-lg" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              At Flo Mobility, autonomy means more than self-driving robots. It means leveraging sensors, computer vision, edge computing, and intelligent actuators to optimise how humans and machines work together — delivering speed, safety, and control at scale.
            </p>
          </FadeUp>

          <FadeUp delay={0.35} className="flex flex-wrap gap-4 mb-14">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105"
              style={{ background: GREEN, color: "#fff", fontFamily: "var(--font-dm-sans)" }}
            >
              Join the Team <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/channel-partner"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold border transition-all duration-300 hover:bg-white"
              style={{ borderColor: DIM, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              Become a Partner <ArrowUpRight className="w-4 h-4" />
            </Link>
          </FadeUp>

          {/* Stats strip */}
          <FadeUp delay={0.4}>
            <div className="grid grid-cols-4 border-t border-b" style={{ borderColor: DIM }}>
              {STATS.map((s, i) => (
                <div key={s.label} className={`py-6 pr-4 ${i < 3 ? "border-r" : ""}`} style={{ borderColor: DIM }}>
                  <div className="text-[clamp(1.4rem,2.5vw,2.4rem)] font-black leading-none mb-1 tracking-[-0.02em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                    {s.value}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] mt-1" style={{ color: MUTED }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Right — showcase image */}
        <FadeUp delay={0.15} className="flex flex-col gap-4">
          {/* Main image — landscape to fit the wide robot shot */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border" style={{ borderColor: DIM }}>
            <Image
              src="/about/showcase.jpg"
              alt="Flo Mobility robot in the field"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.65)" }}>
                Founded 2020 · Bengaluru, India
              </div>
            </div>
          </div>
          {/* Bottom row — G20 photo + stat tile */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border" style={{ borderColor: DIM }}>
              <Image
                src="/about/g20.jpg"
                alt="Flo at G20 Summit 2023"
                fill
                className="object-cover object-top"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.7)" }}>G20 · 2023</div>
              </div>
            </div>
            <div
              className="aspect-[4/3] rounded-xl border flex flex-col items-center justify-center gap-1"
              style={{ borderColor: DIM, background: `${GREEN}10` }}
            >
              <div className="text-4xl font-black tracking-[-0.03em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>200+</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-center px-4" style={{ color: MUTED }}>Active Deployments</div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 2 — Values ───────────────────────────────────────────────────────

function ValueCell({ value, index }: { value: typeof VALUES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !glowRef.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    glowRef.current.style.background = `radial-gradient(ellipse 80% 80% at ${x}% ${y}%, ${GREEN}28 0%, transparent 65%)`;
    glowRef.current.style.opacity = "1";
  };
  const onLeave = () => { if (glowRef.current) glowRef.current.style.opacity = "0"; };

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col p-10 border-r border-b overflow-hidden cursor-default"
      style={{ borderColor: DIM }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05 * index, ease: EASE }}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0, transition: "opacity 0.3s ease" }} />
      <span className="text-[10px] font-bold tracking-[0.24em] uppercase mb-6 block" style={{ color: DIM }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: `${GREEN}18` }}>
        <value.icon className="w-5 h-5" style={{ color: GREEN }} />
      </div>
      <h3 className="text-lg font-black mb-3 leading-snug tracking-[-0.02em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
        {value.title}
      </h3>
      <p className="text-sm leading-[1.85] flex-1" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
        {value.body}
      </p>
    </motion.div>
  );
}

function ValuesSection() {
  return (
    <section className="w-full border-t" style={{ background: BG, borderColor: DIM }}>
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 pt-32 pb-16">
        <SectionRule label="What We Stand For" />
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-end">
          <div>
            <RevealText className="mb-1">
              <h2 className="text-[clamp(2.8rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                Built on four
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2 className="text-[clamp(2.8rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
                founding principles.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <p className="text-base leading-relaxed" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              The beliefs that shape every product decision, every hire, and every deployment we make.
            </p>
          </FadeUp>
        </div>
      </div>
      <div className="w-full border-t border-l" style={{ borderColor: DIM }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => <ValueCell key={v.title} value={v} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3 — Journey (Timeline) ──────────────────────────────────────────

function MilestoneRow({ milestone, i }: { milestone: typeof MILESTONES[0]; i: number }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <FadeUp delay={0.08 * i}>
      <div
        className="grid grid-cols-[120px_1fr_24px] gap-8 py-10 border-b group cursor-default items-start"
        style={{ borderColor: DIM }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Year */}
        <div
          className="text-[2.6rem] font-black leading-none tabular-nums transition-colors duration-500 pt-0.5"
          style={{ color: hovered ? GREEN : "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
        >
          {milestone.year}
        </div>
        {/* Content */}
        <div>
          <h3 className="text-xl font-black mb-3 leading-snug" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
            {milestone.title}
          </h3>
          <p className="text-base leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
            {milestone.body}
          </p>
        </div>
        {/* Arrow */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 pt-1">
          <ArrowUpRight className="w-5 h-5" style={{ color: GREEN }} />
        </div>
      </div>
    </FadeUp>
  );
}

function JourneySection() {
  return (
    <section className="w-full px-8 md:px-16 lg:px-24 xl:px-32 py-40 border-t" style={{ background: BG2, borderColor: DIM }}>
      <SectionRule label="Our Journey" />
      <div className="grid lg:grid-cols-[520px_1fr] gap-24 items-start">
        <div className="lg:sticky lg:top-32">
          <RevealText className="mb-1">
            <h2 className="text-[clamp(2.8rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
              Five years of
            </h2>
          </RevealText>
          <RevealText delay={0.05} className="mb-1">
            <h2 className="text-[clamp(2.8rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
              autonomous
            </h2>
          </RevealText>
          <RevealText delay={0.1}>
            <h2 className="text-[clamp(2.8rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
              progress.
            </h2>
          </RevealText>
          <FadeUp delay={0.3} className="mt-8">
            <p className="text-base leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              From a first prototype on a Bengaluru construction site to 200+ active deployments — every milestone pushed the frontier of what autonomous machines can do.
            </p>
          </FadeUp>
        </div>
        <div>
          {MILESTONES.map((m, i) => <MilestoneRow key={m.year + m.title} milestone={m} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4 — Team ────────────────────────────────────────────────────────

function PersonCard({ person, index }: { person: typeof CORE_TEAM[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="group cursor-default"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.12 * index, ease: EASE }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* ── Photo tile ───────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ background: BG2 }}
      >
        {/* Photo */}
        <div className="relative h-[380px] w-full">
          <Image
            src={person.image}
            alt={person.name}
            fill
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{ objectPosition: person.photoPosition ?? "center 20%" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Bottom gradient — always present */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Name + title — always visible over photo */}
        <div className="absolute bottom-0 left-0 right-0 px-7 pb-6 pt-16 z-10">
          <p
            className="text-[1.25rem] font-black leading-tight tracking-[-0.01em] text-white"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {person.name}
          </p>
          <p
            className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: GREEN }}
          >
            {person.title}
          </p>
        </div>

        {/* LinkedIn pill — top-right, fades in on hover */}
        {person.linkedin && (
          <motion.a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${person.name} on LinkedIn`}
            className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm"
            style={{ background: "rgba(25,28,26,0.55)" }}
            initial={{ opacity: 0, y: -4 }}
            animate={isHover ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            LinkedIn
          </motion.a>
        )}
      </div>

      {/* ── Details panel — slides down on hover ─────────────────── */}
      <motion.div
        className="overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: isHover ? "auto" : 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="px-1 pt-4 pb-1"
          initial={{ opacity: 0, y: 6 }}
          animate={isHover ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.25, delay: 0.05, ease: "easeOut" }}
        >
          <p
            className="text-sm leading-[1.85]"
            style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}
          >
            {person.description}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function TeamSection() {
  return (
    <section className="w-full border-t" style={{ background: BG, borderColor: DIM }}>
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 pt-32 pb-24">
        <SectionRule label="Leadership" />
        <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-end mb-20">
          <div>
            <RevealText className="mb-1">
              <h2 className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                The team driving
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2 className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
                the mission.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.3} className="pb-2">
            <div className="w-px h-10 mb-8" style={{ background: GREEN }} />
            <p className="text-base leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              Serial founders, operators, and engineers who've built and scaled technology businesses across India and beyond.
            </p>
          </FadeUp>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
          {CORE_TEAM.map((m, i) => <PersonCard key={m.name} person={m} index={i} />)}
        </div>

        {/* Partners sub-section */}
        <SectionRule label="Channel Partners" />
        <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-end mb-20">
          <div>
            <RevealText className="mb-1">
              <h2 className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                Trusted
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2 className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
                partners.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.3} className="pb-2">
            <div className="w-px h-10 mb-8" style={{ background: GREEN }} />
            <p className="text-base leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              Our channel partners bring deep industry expertise and local market presence — expanding Flo's reach one deployment at a time.
            </p>
          </FadeUp>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {CHANNEL_PARTNERS.map((p, i) => <PersonCard key={p.name} person={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5 — CTA ─────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="w-full relative overflow-hidden py-48 px-8 md:px-16 lg:px-24 xl:px-32 border-t" style={{ background: BG2, borderColor: DIM }}>
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(${GREEN}18 1px, transparent 1px), linear-gradient(90deg, ${GREEN}18 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px]"
          style={{ background: `${GREEN}18` }}
        />
      </div>

      <div className="relative text-center">
        <FadeUp>
          <p className="text-[11px] font-black tracking-[0.32em] uppercase mb-12" style={{ color: MUTED }}>
            Join the mission
          </p>
        </FadeUp>
        <RevealText className="mb-1">
          <h2 className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
            Help us build
          </h2>
        </RevealText>
        <RevealText delay={0.05} className="mb-1">
          <h2 className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
            the future of
          </h2>
        </RevealText>
        <RevealText delay={0.1} className="mb-20">
          <h2 className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
            autonomous work.
          </h2>
        </RevealText>

        <FadeUp delay={0.3}>
          <p className="text-lg leading-relaxed mb-12 max-w-xl mx-auto" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
            Whether you're an engineer, an operator, or a business leader — there's a place for you in the Flo ecosystem.
          </p>
        </FadeUp>

        <FadeUp delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/careers"
            className="inline-flex items-center justify-center gap-2.5 px-12 py-5 rounded-full text-sm font-black transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ background: GREEN, color: "#ffffff", fontFamily: "var(--font-dm-sans)" }}
          >
            View Open Roles <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-12 py-5 rounded-full text-sm font-bold border transition-all duration-300 hover:bg-white"
            style={{ borderColor: DIM, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
          >
            Get in Touch
          </Link>
        </FadeUp>

        <FadeUp delay={0.5} className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {["Founded 2020", "200+ Deployments", "3 Product Lines", "Bengaluru, India"].map((t) => (
            <div key={t} className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: DIM }}>
              <span className="w-1 h-1 rounded-full" style={{ background: GREEN }} />
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
      <JourneySection />
      <TeamSection />
      <CTASection />
    </div>
  );
}
