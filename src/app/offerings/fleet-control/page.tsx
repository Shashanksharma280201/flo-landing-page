"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
} from "lucide-react";

// ─── Design tokens ────────────────────────────────────────────
const BG      = "#ffffff";
const BG2     = "#f5f5f5";
const GREEN   = "#7ccd54";
const TEXT    = "#191c1a";
const MUTED   = "rgba(25,28,26,0.55)";
const DIM     = "rgba(25,28,26,0.15)";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Shared animation primitives ──────────────────────────────

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
      <span className="text-sm font-bold tracking-[0.26em] uppercase whitespace-nowrap" style={{ color: DIM }}>
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

// ─── Dashboard mockup ──────────────────────────────────────────

function DashboardMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden border shadow-xl ${className}`} style={{ borderColor: DIM }}>
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ background: BG2, borderColor: DIM }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: DIM }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: DIM }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: GREEN }} />
        </div>
        <div
          className="flex-1 rounded px-3 py-1 text-[10px] ml-2 font-mono"
          style={{ background: BG, color: MUTED }}
        >
          fleet.flomobility.com
        </div>
      </div>
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
  );
}

// ─── Section 1 — Hero ─────────────────────────────────────────

const HERO_STATS = [
  { value: "24/7",   label: "Support" },
  { value: "99.9%",  label: "Uptime SLA" },
  { value: "100+",   label: "Fleets managed" },
  { value: "<100",   label: "ms latency" },
];

function HeroSection() {
  return (
    <section className="w-full px-6 md:px-16 lg:px-24 xl:px-32 pt-24 md:pt-28 pb-0" style={{ background: BG2 }}>
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center pb-0">
        {/* Left — text */}
        <div>
          <FadeUp className="mb-8">
            <div className="inline-flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: GREEN }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: GREEN }} />
              </span>
              <span className="text-sm font-bold tracking-[0.26em] uppercase" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
                Fleet Management Platform
              </span>
            </div>
          </FadeUp>

          <div className="mb-8">
            <RevealText>
              <h1
                className="text-[clamp(3rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              >
                Manage your
              </h1>
            </RevealText>
            <RevealText delay={0.06}>
              <h1
                className="text-[clamp(3rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
              >
                entire fleet from
              </h1>
            </RevealText>
            <RevealText delay={0.12}>
              <h1
                className="text-[clamp(3rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              >
                one dashboard.
              </h1>
            </RevealText>
          </div>

          <FadeUp delay={0.2}>
            <div className="w-16 h-px mb-8" style={{ background: DIM }} />
          </FadeUp>

          <FadeUp delay={0.25} className="mb-10">
            <p className="text-lg leading-[1.85] max-w-lg" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              A centralised interface for seamless coordination, real-time monitoring,
              and management of your entire autonomous robot fleet — from any device,
              anywhere in the world.
            </p>
          </FadeUp>

          <FadeUp delay={0.35} className="flex flex-wrap gap-4 mb-14">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105"
              style={{ background: GREEN, color: "#fff", fontFamily: "var(--font-dm-sans)" }}
            >
              Request a Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold border transition-all duration-300 hover:bg-white"
              style={{ borderColor: DIM, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              Explore Features <ChevronDown className="w-4 h-4" />
            </a>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-b" style={{ borderColor: DIM }}>
              {HERO_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`py-6 px-4 text-center ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b sm:border-b-0" : ""}`}
                  style={{ borderColor: DIM }}
                >
                  <div
                    className="text-[clamp(1.4rem,2.5vw,2.4rem)] font-black leading-none mb-1 tracking-[-0.02em]"
                    style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] mt-1" style={{ color: MUTED }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Right — dashboard */}
        <FadeUp delay={0.15} className="flex flex-col gap-6">
          <DashboardMockup />
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Real-Time Telemetry", value: "Live", sub: "Per-robot status feeds" },
              { label: "Cloud Uptime", value: "99.9%", sub: "Multi-region resilience" },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-xl border p-6 flex flex-col justify-between"
                style={{ borderColor: DIM, background: BG, minHeight: 120 }}
              >
                <div
                  className="text-3xl font-black mb-2"
                  style={{ color: GREEN, fontFamily: "var(--font-dm-sans)" }}
                >
                  {c.value}
                </div>
                <div>
                  <div className="text-base font-black" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>{c.label}</div>
                  <div className="text-sm mt-0.5" style={{ color: MUTED }}>{c.sub}</div>
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
  { value: "24/7",      label: "Support" },
  { value: "99.9%",     label: "Uptime SLA" },
  { value: "100+",      label: "Fleets Managed" },
  { value: "<100 ms",   label: "Response Latency" },
  { value: "SOC 2",     label: "Compliance" },
  { value: "Unlimited", label: "Robot Scale" },
  { value: "AES-256",   label: "Encryption" },
  { value: "3",         label: "Access Tiers" },
];

function ProofBar() {
  return (
    <section className="relative w-full overflow-hidden border-b border-t mt-0" style={{ background: BG2, borderColor: DIM }}>
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute left-0 top-0 bottom-0 w-24" style={{ background: `linear-gradient(to right, ${BG2} 60%, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-24" style={{ background: `linear-gradient(to left, ${BG2} 60%, transparent)` }} />
      </div>
      <div className="flex animate-fc-ticker items-center">
        {[...TICKER, ...TICKER, ...TICKER].map((m, i) => (
          <div key={i} className="flex items-center gap-6 shrink-0 px-10 py-6 border-r" style={{ borderColor: DIM }}>
            <span className="text-3xl font-black tracking-tight tabular-nums" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
              {m.value}
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: MUTED }}>
              {m.label}
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes fc-ticker { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        .animate-fc-ticker { animation: fc-ticker 36s linear infinite; }
      `}</style>
    </section>
  );
}

// ─── Section 3 — Showcase (video alternating) ──────────────────

const SHOWCASE = [
  {
    tag: "Coordination",
    heading: ["Multi-robot coordination,", "simplified."],
    headingGreen: 1,
    body: "Streamline control across multiple robots from a single platform. Assign tasks, monitor progress, and manage entire fleets with unparalleled ease.",
    bullets: ["Centralised task assignment", "Real-time fleet status overview", "Automated mission planning"],
    videoSrc: "https://flomobility.com/wp-content/uploads/2025/06/Flo-Nav.mp4",
    videoLeft: false,
  },
  {
    tag: "Visualisation",
    heading: ["Real-time data,", "at a glance."],
    headingGreen: 1,
    body: "Enhanced situational awareness through comprehensive data collection and management. Visualise sensor feeds, telemetry, and environmental maps in real time.",
    bullets: ["Live sensor data streaming", "3D environment mapping", "Performance analytics & reporting"],
    videoSrc: "https://flomobility.com/wp-content/uploads/2025/06/data-visualisation-realtime-1.mp4",
    videoLeft: true,
  },
];

function ShowcaseSection() {
  return (
    <section className="w-full border-t" style={{ background: BG, borderColor: DIM }}>
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 pt-16 md:pt-32 pb-12 md:pb-24">
        <SectionRule label="Platform in Action" />
        <div className="flex flex-col gap-32">
          {SHOWCASE.map((item) => (
            <FadeUp key={item.tag} delay={0.05}>
              <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${item.videoLeft ? "" : ""}`}>
                {/* Video */}
                <div className={`relative aspect-video overflow-hidden rounded-2xl border ${item.videoLeft ? "lg:order-1" : "lg:order-2"}`} style={{ borderColor: DIM }}>
                  <video
                    src={item.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Text */}
                <div className={item.videoLeft ? "lg:order-2" : "lg:order-1"}>
                  <FadeUp delay={0.1}>
                    <span className="inline-block text-sm font-bold tracking-[0.24em] uppercase px-3 py-1.5 rounded-full mb-8 border" style={{ color: MUTED, borderColor: DIM, fontFamily: "var(--font-dm-sans)" }}>
                      {item.tag}
                    </span>
                  </FadeUp>
                  <div className="mb-6">
                    {item.heading.map((line, li) => (
                      <RevealText key={li} delay={0.05 * li} className="mb-1">
                        <h2
                          className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-[0.9] tracking-[-0.03em]"
                          style={{
                            color: li === item.headingGreen ? "rgba(4 104 37 / 0.86)" : TEXT,
                            fontFamily: "var(--font-dm-sans)",
                          }}
                        >
                          {line}
                        </h2>
                      </RevealText>
                    ))}
                  </div>
                  <FadeUp delay={0.2} className="mb-8">
                    <p className="text-base leading-[1.85] max-w-lg" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
                      {item.body}
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.28}>
                    <div className="flex flex-col gap-3">
                      {item.bullets.map((b) => (
                        <div key={b} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GREEN }} />
                          <span className="text-base font-medium" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>{b}</span>
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
    title: "Cloud-Based Platform",
    body: "Access your fleet control centre from anywhere with secure cloud infrastructure — no VPN or on-prem setup required.",
  },
  {
    icon: MonitorSmartphone,
    title: "Remote Teleoperation",
    body: "Take direct control of any robot in your fleet with low-latency video feeds and real-time control links.",
  },
  {
    icon: Network,
    title: "Dynamic Resource Allocation",
    body: "Automatically distribute tasks across your fleet based on robot availability, battery level, and proximity to targets.",
  },
  {
    icon: Users,
    title: "Multi-User Access",
    body: "Role-based access control for operators, managers, and admins — with a full audit trail of every action taken.",
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    body: "Continuous health checks and status reporting for every hardware and software component in your fleet.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    body: "End-to-end encryption, secure authentication, and SOC 2 compliance to protect your operational data at all times.",
  },
];

function FeatureCell({ feature, index }: { feature: (typeof FEATURES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !glowRef.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    glowRef.current.style.background = `radial-gradient(ellipse 160% 130% at ${x}% ${y}%, ${GREEN}60 0%, ${GREEN}25 40%, rgba(255,255,255,0.06) 70%, transparent 85%)`;
    glowRef.current.style.opacity = "1";
  };
  const onLeave = () => { if (glowRef.current) glowRef.current.style.opacity = "0"; };

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col p-6 border-r border-b overflow-hidden cursor-default group"
      style={{ borderColor: DIM }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05 * index, ease: EASE }}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0, transition: "opacity 0.35s ease" }} />
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" style={{ background: `linear-gradient(90deg, ${GREEN}, ${GREEN}60)` }} />
      {/* Icon + Number row */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105" style={{ background: `${GREEN}18` }}>
          <feature.icon className="w-5 h-5" style={{ color: GREEN }} />
        </div>
        <span className="text-sm font-bold tracking-[0.24em] uppercase" style={{ color: DIM }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      {/* Title */}
      <h3 className="text-lg font-black mb-2 leading-snug tracking-[-0.02em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
        {feature.title}
      </h3>
      {/* Body */}
      <p className="text-base leading-[1.75]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
        {feature.body}
      </p>
    </motion.div>
  );
}

function CapabilitiesSection() {
  return (
    <section id="features" className="w-full border-t" style={{ background: BG, borderColor: DIM }}>
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 pt-16 md:pt-32 pb-8 md:pb-16">
        <SectionRule label="Software Capabilities" />
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-end">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.8rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              >
                Built for fleets of
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2
                className="text-[clamp(2.8rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
              >
                any size.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <p className="text-base leading-relaxed" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
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
    number: "01",
    title: "Connect Your Fleet",
    body: "Onboard any Flo robot in minutes. Our cloud platform auto-discovers and pairs with your fleet across all sites — no manual IP configuration or VPN tunnels required.",
  },
  {
    number: "02",
    title: "Assign Missions & Routes",
    body: "Define tasks, assign route profiles, and schedule automated missions from a single unified dashboard. Role-based access ensures the right people see the right controls.",
  },
  {
    number: "03",
    title: "Monitor, Scale & Optimise",
    body: "Add more robots as your operation grows. Real-time telemetry, predictive diagnostics, and automated alerts give you complete visibility — without growing your ops team.",
  },
];

function StepRow({ step, i }: { step: (typeof STEPS)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeUp delay={0.1 + i * 0.1}>
      <div
        className="flex gap-8 py-12 border-b group cursor-default"
        style={{ borderColor: DIM }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="text-[5rem] font-black leading-none w-24 shrink-0 pt-1 tabular-nums transition-colors duration-500"
          style={{ color: hovered ? GREEN : "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
        >
          {step.number}
        </div>
        <div className="flex-1 pt-3">
          <h3 className="text-2xl font-black mb-4" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
            {step.title}
          </h3>
          <p className="text-base leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
            {step.body}
          </p>
        </div>
        <div className="flex items-start pt-5 shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
          <ArrowUpRight className="w-5 h-5" style={{ color: GREEN }} />
        </div>
      </div>
    </FadeUp>
  );
}

function ProcessSection() {
  return (
    <section className="w-full px-6 md:px-16 lg:px-24 xl:px-32 py-20 md:py-40 border-t" style={{ background: BG2, borderColor: DIM }}>
      <SectionRule label="How It Works" />
      <div className="grid lg:grid-cols-[520px_1fr] gap-24 items-start">
        <div className="lg:sticky lg:top-32">
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(2.8rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              Up and running
            </h2>
          </RevealText>
          <RevealText delay={0.05} className="mb-1">
            <h2
              className="text-[clamp(2.8rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]"
              style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
            >
              in
            </h2>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              className="text-[clamp(2.8rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              minutes.
            </h2>
          </RevealText>
          <FadeUp delay={0.3} className="mt-8">
            <p className="text-base leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              From first login to first autonomous mission — our onboarding process
              is designed to be instant, intuitive, and zero-friction.
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
    label: "Construction & Infrastructure",
    description:
      "Coordinate multiple AMRs across active construction sites. Track payload loads, battery levels, and route deviations in real-time from a single command centre.",
    icon: Truck,
    stat: "100+",
    statLabel: "Sites deployed",
    gradient: "linear-gradient(135deg, #d4f5b8 0%, #a8e87c 100%)",
  },
  {
    label: "Warehouse & Logistics",
    description:
      "Manage pick-and-place robots across multiple warehouse zones simultaneously. Dynamic resource allocation ensures zero idle time and maximum throughput.",
    icon: Boxes,
    stat: "24/7",
    statLabel: "Continuous operation",
    gradient: "linear-gradient(135deg, #c8f0a4 0%, #8fd65a 100%)",
  },
  {
    label: "Multi-Site Fleet Management",
    description:
      "Oversee mixed fleets of autonomous robots across geographically distributed sites — lawn mowers, material movers, and more — from one unified platform.",
    icon: Globe,
    stat: "Unlimited",
    statLabel: "Fleet scale",
    gradient: "linear-gradient(135deg, #b8e890 0%, #7ccd54 100%)",
  },
];

function UseCaseCard({ uc, index }: { uc: (typeof USE_CASES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

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
          className="absolute inset-0 scale-110 flex items-center justify-center"
          style={{ y: imgY, background: uc.gradient }}
        >
          <uc.icon className="w-28 h-28 opacity-20" style={{ color: "#fff" }} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <div className="text-4xl font-black leading-none text-white" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {uc.stat}
          </div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70 mt-1">
            {uc.statLabel}
          </div>
        </div>
      </div>
      <div className="p-8" style={{ background: BG }}>
        <div className="text-sm font-bold tracking-[0.22em] uppercase mb-3" style={{ color: DIM }}>
          {String(index + 1).padStart(2, "0")}
        </div>
        <h3 className="text-xl font-black mb-3 tracking-[-0.02em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
          {uc.label}
        </h3>
        <p className="text-base leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
          {uc.description}
        </p>
      </div>
    </motion.div>
  );
}

function UseCasesSection() {
  return (
    <section className="w-full border-t" style={{ background: BG, borderColor: DIM }}>
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 pt-16 md:pt-32 pb-12 md:pb-24">
        <SectionRule label="Where We Deploy" />
        <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-end mb-20">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              >
                Built for every
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-1">
              <h2
                className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
              >
                autonomous
              </h2>
            </RevealText>
            <RevealText delay={0.12}>
              <h2
                className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              >
                operation.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.3} className="pb-2">
            <div className="w-px h-10 mb-8" style={{ background: GREEN }} />
            <p className="text-base leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              Flo Fleet Control has been deployed across the most demanding
              autonomous operations in construction, logistics, and infrastructure.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
  { label: "Cloud Infrastructure",  value: "AWS Multi-region" },
  { label: "Response Latency",      value: "< 100 ms" },
  { label: "Uptime SLA",            value: "99.9%" },
  { label: "Data Encryption",       value: "AES-256 end-to-end" },
  { label: "Access Levels",         value: "3 (Operator / Manager / Admin)" },
  { label: "Video Feed Quality",    value: "Real-time HD" },
  { label: "Fleet Scale",           value: "Unlimited robots" },
  { label: "Compliance",            value: "SOC 2 Type II" },
];

function SpecsSection() {
  return (
    <section id="specs" className="w-full border-t" style={{ background: BG2, borderColor: DIM }}>
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 py-20 md:py-40">
        <SectionRule label="Platform Specifications" />
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Left — specs */}
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.5rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              >
                Enterprise-grade.
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-12">
              <h2
                className="text-[clamp(2.5rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]"
                style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
              >
                Cloud-native.
              </h2>
            </RevealText>

            <FadeUp delay={0.15} className="mb-10">
              <p className="text-base leading-[1.85] max-w-md" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
                Designed for mission-critical operations that can't afford downtime,
                latency, or security gaps at any scale.
              </p>
            </FadeUp>

            <div className="border-t" style={{ borderColor: DIM }}>
              {SPECS.map((spec, i) => (
                <FadeUp key={spec.label} delay={0.1 + i * 0.06}>
                  <div
                    className="flex items-center justify-between py-5 border-b"
                    style={{ borderColor: DIM }}
                  >
                    <div className="flex items-center gap-5">
                      <span className="text-sm font-bold w-6 shrink-0" style={{ color: DIM }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base font-medium" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
                        {spec.label}
                      </span>
                    </div>
                    <span className="text-base font-black tracking-[-0.01em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
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
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: GREEN }} />
              <span style={{ fontFamily: "var(--font-dm-sans)" }}>Flo Fleet Control — Live command centre view</span>
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
    <section className="w-full relative overflow-hidden py-24 md:py-48 px-6 md:px-16 lg:px-24 xl:px-32 border-t" style={{ background: BG, borderColor: DIM }}>
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
          style={{ background: `${GREEN}22` }}
        />
      </div>

      <div className="relative text-center">
        <FadeUp>
          <p className="text-sm font-black tracking-[0.32em] uppercase mb-12" style={{ color: MUTED }}>
            Now available worldwide
          </p>
        </FadeUp>
        <RevealText className="mb-1">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]"
            style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
          >
            Experience
          </h2>
        </RevealText>
        <RevealText delay={0.05} className="mb-1">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]"
            style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}
          >
            the future of
          </h2>
        </RevealText>
        <RevealText delay={0.1} className="mb-20">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]"
            style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
          >
            fleet management.
          </h2>
        </RevealText>

        <FadeUp delay={0.3}>
          <p className="text-lg leading-relaxed mb-12 max-w-xl mx-auto" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
            Request a personalised demo to see how Flo Fleet Control can transform
            your autonomous operations — within 48 hours.
          </p>
        </FadeUp>

        <FadeUp delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 px-12 py-5 rounded-full text-base font-black transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ background: GREEN, color: "#ffffff", fontFamily: "var(--font-dm-sans)" }}
          >
            Request a Demo <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/offerings/material-movement"
            className="inline-flex items-center justify-center gap-2 px-12 py-5 rounded-full text-base font-bold border transition-all duration-300 hover:bg-white"
            style={{ borderColor: DIM, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
          >
            Explore Robots
          </Link>
        </FadeUp>

        <FadeUp delay={0.5} className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {["99.9% Uptime", "< 100 ms Latency", "Unlimited Scale", "SOC 2 Compliant"].map((t) => (
            <div key={t} className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: DIM }}>
              <span className="w-1 h-1 rounded-full" style={{ background: GREEN }} />
              {t}
            </div>
          ))}
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
      <ProcessSection />
      <UseCasesSection />
      <SpecsSection />
      <CTASection />
    </div>
  );
}
