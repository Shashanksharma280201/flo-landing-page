"use client";

import React, { useRef } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion, useInView } from "framer-motion";
import { Loader2, Zap, Users, Cpu, TrendingUp, BookOpen, MapPin, ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { JOBS } from "@/lib/constants";
import { submitFormAction } from "@/app/actions/form-actions";
import Link from "next/link";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const BG      = "#ffffff";
const BG2     = "#f5f5f5";
const GREEN   = "#7ccd54";
const TEXT    = "#191c1a";
const MUTED   = "rgba(25,28,26,0.55)";
const DIM     = "rgba(25,28,26,0.15)";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Animation primitives ──────────────────────────────────────────────────────

function RevealText({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

// ─── Data ──────────────────────────────────────────────────────────────────────

const WHY_JOIN = [
  { icon: Zap,        title: "Mission-Driven Work",      body: "Build real autonomous robots deployed on active construction and logistics sites across India — not prototypes." },
  { icon: Users,      title: "Fast-Moving Team",         body: "A small, senior team where you own your work and ship things that matter — without red tape." },
  { icon: Cpu,        title: "Hands-on Robotics",        body: "Work directly with hardware, embedded systems, and AI on products already operating in the field." },
  { icon: TrendingUp, title: "Competitive Compensation", body: "Market-rate salaries with ESOP potential for early-stage hires who grow with the company." },
  { icon: BookOpen,   title: "Learning & Growth",        body: "Direct mentorship from founders and access to cutting-edge robotics R&D from day one." },
  { icon: MapPin,     title: "Bengaluru HQ",             body: "Based in HSR Layout — one of India's most vibrant startup neighbourhoods." },
];

// ─── Submit button ─────────────────────────────────────────────────────────────

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-12 rounded-full text-white text-sm font-bold tracking-wide transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 flex items-center justify-center gap-2"
      style={{ background: GREEN, fontFamily: "var(--font-dm-sans)" }}
    >
      {pending ? (
        <><Loader2 className="h-4 w-4 animate-spin" />Submitting…</>
      ) : (
        <>Submit Application <ArrowRight className="w-4 h-4" /></>
      )}
    </button>
  );
}

// ─── Sections ──────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="w-full px-8 md:px-16 lg:px-24 xl:px-32 pt-28 pb-24" style={{ background: BG2 }}>
      {/* Breadcrumb */}
      <FadeUp className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: DIM }}>
          <Link href="/" className="hover:underline" style={{ color: DIM }}>Home</Link>
          <span>/</span>
          <span style={{ color: TEXT }}>Careers</span>
        </div>
      </FadeUp>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-end">
        {/* Left — headline */}
        <div>
          <FadeUp className="mb-8">
            <div className="inline-flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: GREEN }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: GREEN }} />
              </span>
              <span className="text-[10px] font-bold tracking-[0.26em] uppercase" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
                {JOBS.length} Open Roles · Bengaluru, India
              </span>
            </div>
          </FadeUp>

          <RevealText>
            <h1 className="text-[clamp(3rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
              Build the future
            </h1>
          </RevealText>
          <RevealText delay={0.06}>
            <h1 className="text-[clamp(3rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
              of autonomous
            </h1>
          </RevealText>
          <RevealText delay={0.12}>
            <h1 className="text-[clamp(3rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
              robotics.
            </h1>
          </RevealText>
        </div>

        {/* Right — description + CTAs */}
        <FadeUp delay={0.2} className="pb-2">
          <div className="w-16 h-px mb-8" style={{ background: DIM }} />
          <p className="text-lg leading-[1.85] mb-10" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
            Join a small, ambitious team deploying real robots on real job sites — and help shape how India moves, builds, and grows.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#roles"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105"
              style={{ background: GREEN, color: "#fff", fontFamily: "var(--font-dm-sans)" }}
            >
              View Open Roles <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold border transition-all duration-300 hover:bg-white"
              style={{ borderColor: DIM, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              Apply Now <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function RolesSection() {
  return (
    <section id="roles" className="w-full border-t scroll-mt-24" style={{ background: BG, borderColor: DIM }}>
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 pt-32 pb-24">
        <SectionRule label="Open Positions" />
        <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-end mb-20">
          <div>
            <RevealText className="mb-1">
              <h2 className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                Find your
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2 className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
                role.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <div className="w-px h-10 mb-8" style={{ background: GREEN }} />
            <p className="text-base leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              We're growing fast and looking for people who want to do the most meaningful work of their careers.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {JOBS.map((job, i) => (
            <FadeUp key={job.title} delay={0.08 * i}>
              <div
                className="group flex flex-col p-10 rounded-2xl border transition-all duration-300 hover:border-[rgba(4,104,37,0.25)] hover:shadow-sm cursor-default"
                style={{ borderColor: DIM, background: BG }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-2">
                    <span className="text-xs font-semibold rounded-full px-3 py-1" style={{ background: `${GREEN}18`, color: "rgba(4 104 37 / 0.86)" }}>
                      {job.location}
                    </span>
                    <span className="text-xs font-semibold rounded-full px-3 py-1" style={{ background: BG2, color: MUTED }}>
                      {job.type}
                    </span>
                  </div>
                  <a
                    href={job.jdLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    style={{ color: "rgba(4 104 37 / 0.86)" }}
                    aria-label={`Download JD for ${job.title}`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    JD
                  </a>
                </div>
                <h3 className="text-xl font-black mb-3 leading-snug tracking-[-0.02em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                  {job.title}
                </h3>
                <p className="text-sm leading-[1.85] flex-1 mb-8" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
                  {job.description}
                </p>
                <a
                  href="#apply"
                  className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200"
                  style={{ color: "rgba(4 104 37 / 0.86)" }}
                >
                  Apply for this role <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCell({ item, index }: { item: typeof WHY_JOIN[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !glowRef.current) return;
    const r = ref.current.getBoundingClientRect();
    glowRef.current.style.background = `radial-gradient(ellipse 80% 80% at ${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%, ${GREEN}28 0%, transparent 65%)`;
    glowRef.current.style.opacity = "1";
  };
  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col p-10 border-r border-b overflow-hidden cursor-default"
      style={{ borderColor: DIM }}
      onMouseMove={onMove}
      onMouseLeave={() => { if (glowRef.current) glowRef.current.style.opacity = "0"; }}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05 * index, ease: EASE }}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0, transition: "opacity 0.3s ease" }} />
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: `${GREEN}18` }}>
        <item.icon className="w-5 h-5" style={{ color: GREEN }} />
      </div>
      <h3 className="text-lg font-black mb-3 leading-snug tracking-[-0.02em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
        {item.title}
      </h3>
      <p className="text-sm leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
        {item.body}
      </p>
    </motion.div>
  );
}

function WhySection() {
  return (
    <section className="w-full border-t" style={{ background: BG2, borderColor: DIM }}>
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 pt-32 pb-24">
        <SectionRule label="Why Flo" />
        <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-end mb-20">
          <div>
            <RevealText className="mb-1">
              <h2 className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                Work that
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2 className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
                matters.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <div className="w-px h-10 mb-8" style={{ background: GREEN }} />
            <p className="text-base leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              We're not building software — we're deploying physical robots in the real world. Here's what that means for you.
            </p>
          </FadeUp>
        </div>

        <div className="w-full border-t border-l" style={{ borderColor: DIM }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_JOIN.map((item, i) => <WhyCell key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ApplySection() {
  const [state, formAction] = useActionState(submitFormAction, { success: false, message: "" });

  return (
    <section id="apply" className="w-full border-t scroll-mt-24" style={{ background: BG, borderColor: DIM }}>
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 pt-32 pb-24">
        <SectionRule label="Apply" />

        <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-end mb-20">
          <div>
            <RevealText className="mb-1">
              <h2 className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                Ready to
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2 className="text-[clamp(2.8rem,6vw,7rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
                join the team?
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <div className="w-px h-10 mb-8" style={{ background: GREEN }} />
            <p className="text-base leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              Send us your application and we'll get back to you within 5 business days.
            </p>
          </FadeUp>
        </div>

        {/* Contact grid — matches contact page layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border-t" style={{ borderColor: DIM }}>

          {/* Left — details */}
          <div className="lg:col-span-2 py-16 pr-0 lg:pr-16 border-b lg:border-b-0 lg:border-r" style={{ borderColor: DIM }}>
            <p className="text-[10px] font-bold tracking-[0.26em] uppercase mb-10" style={{ color: DIM }}>
              Get in Touch
            </p>
            <div className="flex flex-col gap-0 divide-y" style={{ borderColor: DIM }}>
              {[
                { label: "Call or WhatsApp", value: "+91 8446614346",           href: "https://wa.me/918446614346" },
                { label: "Careers Email",    value: "contact@flomobility.com",  href: "mailto:contact@flomobility.com" },
                { label: "Headquarters",     value: "HSR Layout, Bengaluru",    href: "https://maps.google.com/?q=HSR+Layout,+Bengaluru,+India" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-5 group"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-1" style={{ color: DIM }}>
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold transition-colors duration-200 group-hover:opacity-70" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                      {item.value}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: GREEN }} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — bare form, no card wrapper */}
          <div className="lg:col-span-3 py-16 lg:pl-16">
            <p className="text-[10px] font-bold tracking-[0.26em] uppercase mb-10" style={{ color: DIM }}>
              Submit Application
            </p>

            {state.success ? (
              <FadeUp>
                <div className="flex flex-col items-start gap-4">
                  <div className="w-10 h-0.5" style={{ background: GREEN }} />
                  <h3 className="text-2xl font-black tracking-[-0.02em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                    Application Received
                  </h3>
                  <p className="text-base leading-[1.85] max-w-sm" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
                    {state.message || "Thank you. We'll review your application and be in touch within 5 business days."}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-sm font-bold underline underline-offset-4 transition-colors duration-200 mt-4"
                    style={{ color: GREEN }}
                  >
                    Submit another application
                  </button>
                </div>
              </FadeUp>
            ) : (
              <form action={formAction} className="space-y-6">
                <input type="hidden" name="formType" value="careers" />

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { id: "firstName", name: "firstName", label: "First Name", placeholder: "John",  required: true },
                    { id: "lastName",  name: "lastName",  label: "Last Name",  placeholder: "Doe",   required: true },
                  ].map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label htmlFor={field.id} className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
                        {field.label} {field.required && <span style={{ color: GREEN }}>*</span>}
                      </label>
                      <input
                        id={field.id} name={field.name} placeholder={field.placeholder} required={field.required}
                        className="w-full h-12 rounded-xl border px-4 text-sm outline-none transition-colors"
                        style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
                        onBlur={(e)  => { e.currentTarget.style.borderColor = DIM; }}
                      />
                    </div>
                  ))}
                </div>

                {/* Email + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
                      Email <span style={{ color: GREEN }}>*</span>
                    </label>
                    <input
                      id="email" name="email" type="email" placeholder="john@example.com" required
                      className="w-full h-12 rounded-xl border px-4 text-sm outline-none transition-colors"
                      style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
                      onBlur={(e)  => { e.currentTarget.style.borderColor = DIM; }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
                      Phone
                    </label>
                    <input
                      id="phone" name="phone" type="tel" placeholder="+91 00000 00000"
                      className="w-full h-12 rounded-xl border px-4 text-sm outline-none transition-colors"
                      style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
                      onBlur={(e)  => { e.currentTarget.style.borderColor = DIM; }}
                    />
                  </div>
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <label htmlFor="role" className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
                    Role Applying For <span style={{ color: GREEN }}>*</span>
                  </label>
                  <input
                    id="role" name="role" placeholder="e.g. Embedded Design Engineer" required
                    className="w-full h-12 rounded-xl border px-4 text-sm outline-none transition-colors"
                    style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = DIM; }}
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
                    Tell Us About Yourself <span style={{ color: GREEN }}>*</span>
                  </label>
                  <textarea
                    id="message" name="message" required
                    placeholder="Briefly describe your background and what excites you about this role…"
                    className="w-full min-h-[140px] rounded-xl border px-4 py-3 text-sm outline-none transition-colors resize-none"
                    style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = DIM; }}
                  />
                </div>

                {/* Resume */}
                <div className="space-y-2">
                  <label htmlFor="resume" className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
                    Resume (PDF) <span style={{ color: GREEN }}>*</span>
                  </label>
                  <input
                    id="resume" name="resume" type="file" accept=".pdf" required
                    className="w-full h-12 rounded-xl border px-4 text-sm outline-none transition-colors cursor-pointer file:text-xs file:font-semibold file:bg-transparent file:border-0 file:mr-4"
                    style={{ borderColor: DIM, background: BG, color: MUTED, fontFamily: "var(--font-dm-sans)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = DIM; }}
                  />
                </div>

                {state.message && !state.success && (
                  <p className="text-sm rounded-xl px-4 py-3" style={{ color: "#ef4444", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    {state.message}
                  </p>
                )}

                <SubmitButton />

                <p className="text-xs text-center" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
                  By submitting, you agree to our{" "}
                  <Link href="/privacy" className="underline underline-offset-2 transition-colors" style={{ color: TEXT }}>
                    privacy policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function CareersPage() {
  return (
    <div className="w-full" style={{ color: TEXT, background: BG2 }}>
      <HeroSection />
      <RolesSection />
      <WhySection />
      <ApplySection />
    </div>
  );
}
