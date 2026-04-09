"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/sections/contact/contact-form";

// ─── Design tokens ────────────────────────────────────────────────────────────
const BG      = "#ffffff";
const BG2     = "#f5f5f5";
const GREEN   = "#7ccd54";
const TEXT    = "#191c1a";
const MUTED   = "rgba(25,28,26,0.55)";
const DIM     = "rgba(25,28,26,0.15)";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Animation primitives ─────────────────────────────────────────────────────

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

const CONTACT_DETAILS = [
  {
    icon: Phone,
    label: "Call or WhatsApp",
    value: "+91 8446614346",
    href: "https://wa.me/918446614346",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "contact@flomobility.com",
    href: "mailto:contact@flomobility.com",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "HSR Layout, Bengaluru, Karnataka, India",
    href: "https://maps.google.com/?q=HSR+Layout,+Bengaluru,+India",
  },
];

const REASONS = [
  { label: "Request a Demo",       body: "See our autonomous robots perform on a live or recorded site walkthrough." },
  { label: "Partnership Enquiry",  body: "Explore channel, reseller, or system integration opportunities." },
  { label: "Technical Questions",  body: "Talk to our engineering team about specs, integration, or deployment." },
  { label: "General Enquiry",      body: "Anything else — we read and respond to every message personally." },
];

// ─── Section 1 — Hero + Form ──────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="w-full px-8 md:px-16 lg:px-24 xl:px-32 pt-28 pb-0" style={{ background: BG2 }}>
      {/* Breadcrumb */}
      <FadeUp className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: DIM }}>
          <Link href="/" className="hover:underline" style={{ color: DIM }}>Home</Link>
          <span>/</span>
          <span style={{ color: TEXT }}>Contact</span>
        </div>
      </FadeUp>

      {/* Headline */}
      <div className="mb-20">
        <FadeUp className="mb-8">
          <div className="inline-flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: GREEN }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: GREEN }} />
            </span>
            <span className="text-[10px] font-bold tracking-[0.26em] uppercase" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              Get in Touch
            </span>
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-[1fr_480px] gap-16 items-end">
          <div>
            <RevealText>
              <h1 className="text-[clamp(3rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                Let&apos;s talk
              </h1>
            </RevealText>
            <RevealText delay={0.06}>
              <h1 className="text-[clamp(3rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
                autonomous.
              </h1>
            </RevealText>
          </div>
          <FadeUp delay={0.25} className="pb-2">
            <div className="w-16 h-px mb-6" style={{ background: DIM }} />
            <p className="text-base leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              Whether you have questions about our robots, want a live demo, or are ready to explore a partnership — our team responds to every message within one business day.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Contact grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border-t" style={{ borderColor: DIM }}>

        {/* Left — details */}
        <div className="lg:col-span-2 py-16 pr-0 lg:pr-16 border-b lg:border-b-0 lg:border-r" style={{ borderColor: DIM }}>
          <p className="text-[10px] font-bold tracking-[0.26em] uppercase mb-10" style={{ color: DIM }}>
            Reach Us Directly
          </p>

          <div className="space-y-0 divide-y" style={{ borderColor: DIM }}>
            {CONTACT_DETAILS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-5 py-7 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200"
                  style={{ background: `${GREEN}12` }}
                >
                  <item.icon className="w-4 h-4 transition-colors duration-200" style={{ color: GREEN }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5" style={{ color: DIM }}>
                    {item.label}
                  </p>
                  <p
                    className="text-sm font-semibold transition-colors duration-200 group-hover:underline underline-offset-2"
                    style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                  >
                    {item.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Office hours */}
          <div className="mt-10 pt-8 border-t" style={{ borderColor: DIM }}>
            <p className="text-[10px] font-bold tracking-[0.26em] uppercase mb-4" style={{ color: DIM }}>Response Time</p>
            <p className="text-sm leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              We reply to all enquiries within 1 business day. For urgent matters, WhatsApp is fastest.
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-3 py-16 lg:pl-16">
          <p className="text-[10px] font-bold tracking-[0.26em] uppercase mb-10" style={{ color: DIM }}>
            Send a Message
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

// ─── Section 2 — Reasons to contact ──────────────────────────────────────────

function ReasonsSection() {
  return (
    <section className="w-full border-t" style={{ background: BG, borderColor: DIM }}>
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 pt-32 pb-16">
        <SectionRule label="How We Can Help" />
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-end">
          <div>
            <RevealText className="mb-1">
              <h2 className="text-[clamp(2.8rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                Every message
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2 className="text-[clamp(2.8rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
                gets a human reply.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <p className="text-base leading-relaxed" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              No automated responses. No chatbots. Just the right person on our team reading your message and responding with something useful.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="w-full border-t border-l" style={{ borderColor: DIM }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, i) => {
            return (
              <ReasonCell key={reason.label} reason={reason} index={i} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ReasonCell({ reason, index }: { reason: typeof REASONS[0]; index: number }) {
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
      <span className="text-[10px] font-bold tracking-[0.24em] uppercase mb-8 block" style={{ color: DIM }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="text-lg font-black mb-3 leading-snug tracking-[-0.02em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
        {reason.label}
      </h3>
      <p className="text-sm leading-[1.85] flex-1" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
        {reason.body}
      </p>
    </motion.div>
  );
}

// ─── Section 3 — CTA ─────────────────────────────────────────────────────────

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
            Prefer to explore first?
          </p>
        </FadeUp>
        <RevealText className="mb-1">
          <h2 className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
            See what
          </h2>
        </RevealText>
        <RevealText delay={0.05} className="mb-1">
          <h2 className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
            Flo can do
          </h2>
        </RevealText>
        <RevealText delay={0.1} className="mb-20">
          <h2 className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
            for you.
          </h2>
        </RevealText>

        <FadeUp delay={0.3}>
          <p className="text-lg leading-relaxed mb-12 max-w-xl mx-auto" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
            Browse our product offerings and see how autonomous robots are already transforming construction, mining, and logistics across India.
          </p>
        </FadeUp>

        <FadeUp delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/offerings/material-movement"
            className="inline-flex items-center justify-center gap-2.5 px-12 py-5 rounded-full text-sm font-black transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ background: GREEN, color: "#ffffff", fontFamily: "var(--font-dm-sans)" }}
          >
            Explore Offerings <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/channel-partner"
            className="inline-flex items-center justify-center gap-2 px-12 py-5 rounded-full text-sm font-bold border transition-all duration-300 hover:bg-white"
            style={{ borderColor: DIM, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
          >
            Partner With Us
          </Link>
        </FadeUp>

        <FadeUp delay={0.5} className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {["1 Business Day Response", "Real People, Not Bots", "WhatsApp Available", "HSR Layout, Bengaluru"].map((t) => (
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

export default function ContactPage() {
  return (
    <div className="w-full" style={{ color: TEXT, background: BG2 }}>
      <HeroSection />
      <ReasonsSection />
      <CTASection />
    </div>
  );
}
