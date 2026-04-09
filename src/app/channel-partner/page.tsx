"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitFormAction } from "@/app/actions/form-actions";
import {
  ArrowRight, ArrowUpRight,
  DollarSign, Wrench, BarChart3,
  Award, BookOpen, Megaphone, Headphones, Share2, Lightbulb,
} from "lucide-react";

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

const PARTNER_TYPES = [
  {
    icon: DollarSign,
    tag: "Earn Commission",
    title: "Referral Partner",
    description: "Refer clients from your existing network to Flo Mobility. For every successful deployment, you earn a competitive referral commission — with zero operational overhead.",
    perks: ["Up to 8% referral fee", "Simple referral portal", "Monthly payouts"],
  },
  {
    icon: Wrench,
    tag: "Build Together",
    title: "System Integrator",
    description: "Embed our autonomous robots into your own engineering or construction solutions. Access our full API suite, technical docs, and dedicated integration support.",
    perks: ["API + SDK access", "Co-development support", "Joint go-to-market"],
  },
  {
    icon: BarChart3,
    tag: "Scale Revenue",
    title: "Reseller Partner",
    description: "Become an authorised reseller of Flo's robot fleet in your region. Deploy, manage, and sell subscriptions to your clients with our full backing.",
    perks: ["Exclusive territory rights", "Volume pricing tiers", "Dedicated success manager"],
  },
];

const BENEFITS = [
  { icon: Award,       title: "Revenue Share",       description: "Competitive, transparent commissions on every deal you close or refer." },
  { icon: BookOpen,    title: "Technical Training",   description: "Full certification program covering robot deployment, operations, and maintenance." },
  { icon: Megaphone,   title: "Co-Marketing",         description: "Co-branded campaigns, case studies, and event sponsorships to amplify your reach." },
  { icon: Headphones,  title: "Dedicated Support",    description: "A named partner success manager and priority access to our engineering team." },
  { icon: Share2,      title: "Lead Sharing",         description: "Inbound leads in your geography are routed directly to you first." },
  { icon: Lightbulb,   title: "Early Access",         description: "Be first to demo new products and shape our roadmap through partner feedback." },
];

const STEPS = [
  { number: "01", title: "Apply",          body: "Fill out the partner application below. Our team reviews every submission within 3 business days." },
  { number: "02", title: "Get Onboarded",  body: "Complete a short onboarding — product training, portal access, and your partner agreement — and you're live." },
  { number: "03", title: "Start Earning",  body: "Refer, deploy, or resell. Track everything in your partner dashboard and receive your payouts monthly." },
];

// ─── Submit button ────────────────────────────────────────────────────────────

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-12 rounded-full text-sm font-black uppercase tracking-wide transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:scale-100"
      style={{ background: GREEN, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
    >
      {pending ? "Submitting…" : "Submit Application"}
    </button>
  );
}

// ─── Section 1 — Hero ────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="w-full px-8 md:px-16 lg:px-24 xl:px-32 pt-28 pb-0" style={{ background: BG2 }}>
      {/* Breadcrumb */}
      <FadeUp className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: DIM }}>
          <Link href="/" className="hover:underline" style={{ color: DIM }}>Home</Link>
          <span>/</span>
          <span style={{ color: TEXT }}>Channel Partner</span>
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
                Channel Partner Program
              </span>
            </div>
          </FadeUp>

          <div className="mb-8">
            <RevealText>
              <h1 className="text-[clamp(3rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                Grow together
              </h1>
            </RevealText>
            <RevealText delay={0.06}>
              <h1 className="text-[clamp(3rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
                with Flo.
              </h1>
            </RevealText>
          </div>

          <FadeUp delay={0.2}>
            <div className="w-16 h-px mb-8" style={{ background: DIM }} />
          </FadeUp>

          <FadeUp delay={0.25} className="mb-10">
            <p className="text-lg leading-[1.85] max-w-lg" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              Join our partner ecosystem and bring autonomous robotics to your clients — while building a new, recurring revenue stream for your business.
            </p>
          </FadeUp>

          <FadeUp delay={0.35} className="flex flex-wrap gap-4 mb-14">
            <a
              href="#apply"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105"
              style={{ background: GREEN, color: "#fff", fontFamily: "var(--font-dm-sans)" }}
            >
              Become a Partner <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#benefits"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold border transition-all duration-300 hover:bg-white"
              style={{ borderColor: DIM, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
            >
              Explore Benefits <ArrowUpRight className="w-4 h-4" />
            </a>
          </FadeUp>

          {/* Stats strip */}
          <FadeUp delay={0.4}>
            <div className="grid grid-cols-3 border-t border-b" style={{ borderColor: DIM }}>
              {[
                { value: "8%",    label: "Referral Fee" },
                { value: "3",     label: "Partner Tracks" },
                { value: "< 3",   label: "Days Onboarding" },
              ].map((s, i) => (
                <div key={s.label} className={`py-6 pr-4 ${i < 2 ? "border-r" : ""}`} style={{ borderColor: DIM }}>
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

        {/* Right — image */}
        <FadeUp delay={0.15} className="flex flex-col gap-6">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border" style={{ borderColor: DIM }}>
            <Image
              src="/about/showcase.jpg"
              alt="Flo Mobility autonomous robot"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="text-3xl font-black text-white tracking-[-0.03em]" style={{ fontFamily: "var(--font-dm-sans)" }}>200+</div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                Active Deployments
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 2 — Partner Types ────────────────────────────────────────────────

function PartnerTypeCell({ type, index }: { type: typeof PARTNER_TYPES[0]; index: number }) {
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
      <span className="text-[10px] font-bold tracking-[0.24em] uppercase mb-2 block" style={{ color: GREEN }}>
        {type.tag}
      </span>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 mt-4" style={{ background: `${GREEN}18` }}>
        <type.icon className="w-5 h-5" style={{ color: GREEN }} />
      </div>
      <h3 className="text-xl font-black mb-3 leading-snug tracking-[-0.02em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
        {type.title}
      </h3>
      <p className="text-sm leading-[1.85] mb-8 flex-1" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
        {type.description}
      </p>
      <ul className="space-y-2.5">
        {type.perks.map((perk) => (
          <li key={perk} className="flex items-center gap-3 text-sm font-semibold" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: GREEN }} />
            {perk}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function PartnerTypesSection() {
  return (
    <section className="w-full border-t" style={{ background: BG, borderColor: DIM }}>
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 pt-32 pb-16">
        <SectionRule label="Partnership Models" />
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-end">
          <div>
            <RevealText className="mb-1">
              <h2 className="text-[clamp(2.8rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                Find your
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2 className="text-[clamp(2.8rem,6vw,7.5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
                partnership track.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <p className="text-base leading-relaxed" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              Three flexible models designed for different business types — pick the one that fits how you work.
            </p>
          </FadeUp>
        </div>
      </div>
      <div className="w-full border-t border-l" style={{ borderColor: DIM }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNER_TYPES.map((t, i) => <PartnerTypeCell key={t.title} type={t} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3 — Benefits ────────────────────────────────────────────────────

function BenefitsSection() {
  return (
    <section id="benefits" className="w-full border-t" style={{ background: BG2, borderColor: DIM }}>
      <div className="w-full border-b" style={{ borderColor: DIM }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left — image */}
          <div className="relative min-h-[420px] lg:min-h-[640px] border-r" style={{ borderColor: DIM }}>
            <Image
              src="/about/showcase.jpg"
              alt="Flo Mobility autonomous robot in action"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <div className="text-4xl font-black text-white mb-1" style={{ fontFamily: "var(--font-dm-sans)" }}>200+</div>
              <p className="text-sm text-white/70 font-medium">
                Projects completed across construction, manufacturing &amp; logistics
              </p>
            </div>
          </div>

          {/* Right — benefits list */}
          <div className="py-20 px-10 lg:px-16 xl:px-20" style={{ background: BG }}>
            <SectionRule label="What You Get" />
            <RevealText className="mb-1">
              <h2 className="text-[clamp(2.2rem,4vw,5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                Built for
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-12">
              <h2 className="text-[clamp(2.2rem,4vw,5rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
                mutual growth.
              </h2>
            </RevealText>

            <div className="divide-y" style={{ borderColor: DIM }}>
              {BENEFITS.map((benefit, i) => (
                <FadeUp key={benefit.title} delay={0.05 * i}>
                  <div className="py-6 flex gap-5 items-start">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${GREEN}14` }}>
                      <benefit.icon className="w-4 h-4" style={{ color: GREEN }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black mb-1.5" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                        {benefit.title}
                      </h3>
                      <p className="text-sm leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4 — How It Works ────────────────────────────────────────────────

function StepRow({ step, i }: { step: typeof STEPS[0]; i: number }) {
  const [hovered, setHovered] = React.useState(false);
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
    <section className="w-full px-8 md:px-16 lg:px-24 xl:px-32 py-40 border-t" style={{ background: BG, borderColor: DIM }}>
      <SectionRule label="How It Works" />
      <div className="grid lg:grid-cols-[520px_1fr] gap-24 items-start">
        <div className="lg:sticky lg:top-32">
          <RevealText className="mb-1">
            <h2 className="text-[clamp(2.8rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
              Earning in
            </h2>
          </RevealText>
          <RevealText delay={0.05} className="mb-1">
            <h2 className="text-[clamp(2.8rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
              two weeks
            </h2>
          </RevealText>
          <RevealText delay={0.1}>
            <h2 className="text-[clamp(2.8rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
              flat.
            </h2>
          </RevealText>
          <FadeUp delay={0.3} className="mt-8">
            <p className="text-base leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
              From application to first payout in as little as two weeks. No complex procurement, no long onboarding cycles.
            </p>
          </FadeUp>
        </div>
        <div>
          {STEPS.map((step, i) => <StepRow key={step.number} step={step} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5 — Application Form ────────────────────────────────────────────

function ApplicationForm() {
  const [state, formAction] = useActionState(submitFormAction, {
    success: false,
    message: "",
  });

  return (
    <section id="apply" className="w-full border-t" style={{ background: BG2, borderColor: DIM }}>
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">

          {/* Left info — 2/5 */}
          <div className="lg:col-span-2 pr-0 lg:pr-16 border-b lg:border-b-0 lg:border-r pb-16 lg:pb-0" style={{ borderColor: DIM }}>
            <SectionRule label="Apply Now" />
            <RevealText className="mb-1">
              <h2 className="text-[clamp(2.5rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                Ready to
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-10">
              <h2 className="text-[clamp(2.5rem,5vw,6rem)] font-black leading-[0.86] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
                partner up?
              </h2>
            </RevealText>

            <FadeUp className="mb-12">
              <p className="text-base leading-[1.85]" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
                Fill out the form and our partnerships team will be in touch within 3 business days.
              </p>
            </FadeUp>

            <FadeUp>
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase mb-6" style={{ color: DIM }}>Prefer to talk first?</p>
              <div className="space-y-0 divide-y" style={{ borderColor: DIM }}>
                {[
                  { label: "Call or WhatsApp", value: "+91 8446614346", href: "https://wa.me/918446614346" },
                  { label: "Partner Enquiries", value: "contact@flomobility.com", href: "mailto:contact@flomobility.com" },
                  { label: "Headquarters", value: "HSR Layout, Bengaluru, India", href: "https://maps.google.com/?q=HSR+Layout,+Bengaluru,+India" },
                ].map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="block py-5 group">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5" style={{ color: DIM }}>{item.label}</p>
                    <p className="text-sm font-semibold group-hover:underline underline-offset-2 transition-colors duration-200" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                      {item.value}
                    </p>
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right form — 3/5 */}
          <div className="lg:col-span-3 pt-16 lg:pt-0 lg:pl-16">
            {state.success ? (
              <FadeUp>
                <div
                  className="rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
                  style={{ background: "rgba(4 104 37 / 0.06)", border: `1px solid ${DIM}` }}
                >
                  <div className="w-10 h-0.5 mb-6" style={{ background: GREEN }} />
                  <h3 className="text-2xl font-black mb-3" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
                    Application Received
                  </h3>
                  <p className="text-sm leading-[1.85] max-w-sm mx-auto mb-8" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
                    {state.message || "Thank you. Our partnerships team will review your application and be in touch within 3 business days."}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-sm font-bold underline underline-offset-4 transition-colors"
                    style={{ color: GREEN, fontFamily: "var(--font-dm-sans)" }}
                  >
                    Submit another application
                  </button>
                </div>
              </FadeUp>
            ) : (
              <FadeUp>
                <form action={formAction} className="space-y-6">
                  <input type="hidden" name="formType" value="partner" />

                  {/* Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { id: "firstName", name: "firstName", label: "First Name", placeholder: "John", required: true, type: "text" },
                      { id: "lastName",  name: "lastName",  label: "Last Name",  placeholder: "Doe",  required: true, type: "text" },
                    ].map((field) => (
                      <div key={field.id} className="space-y-2">
                        <label htmlFor={field.id} className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
                          {field.label} {field.required && <span style={{ color: GREEN }}>*</span>}
                        </label>
                        <input
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          required={field.required}
                          className="w-full h-12 rounded-xl border px-4 text-sm outline-none transition-colors"
                          style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = DIM; }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
                      Company Name <span style={{ color: GREEN }}>*</span>
                    </label>
                    <input
                      id="company" name="company" placeholder="Your company" required
                      className="w-full h-12 rounded-xl border px-4 text-sm outline-none transition-colors"
                      style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = DIM; }}
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
                        Work Email <span style={{ color: GREEN }}>*</span>
                      </label>
                      <input
                        id="email" name="email" type="email" placeholder="john@company.com" required
                        className="w-full h-12 rounded-xl border px-4 text-sm outline-none transition-colors"
                        style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = DIM; }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
                        Phone Number
                      </label>
                      <input
                        id="phone" name="phone" type="tel" placeholder="+91 00000 00000"
                        className="w-full h-12 rounded-xl border px-4 text-sm outline-none transition-colors"
                        style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = DIM; }}
                      />
                    </div>
                  </div>

                  {/* Partnership type */}
                  <div className="space-y-2">
                    <label htmlFor="partnerType" className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
                      Partnership Type <span style={{ color: GREEN }}>*</span>
                    </label>
                    <select
                      id="partnerType" name="partnerType" required
                      className="w-full h-12 rounded-xl border px-4 text-sm outline-none transition-colors appearance-none"
                      style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = DIM; }}
                    >
                      <option value="">Select a partnership type…</option>
                      <option value="Referral Partner">Referral Partner</option>
                      <option value="System Integrator">System Integrator</option>
                      <option value="Reseller Partner">Reseller Partner</option>
                      <option value="Other">Other / Not sure yet</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: DIM }}>
                      Tell Us About Your Business <span style={{ color: GREEN }}>*</span>
                    </label>
                    <textarea
                      id="message" name="message" required
                      placeholder="Briefly describe your business, your clients, and why you'd like to partner with Flo Mobility…"
                      className="w-full min-h-[130px] rounded-xl border px-4 py-3 text-sm outline-none transition-colors resize-none"
                      style={{ borderColor: DIM, background: BG, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = GREEN; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = DIM; }}
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
                    <Link href="/privacy" className="underline underline-offset-2" style={{ color: TEXT }}>
                      privacy policy
                    </Link>
                    .
                  </p>
                </form>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 6 — CTA ─────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="w-full relative overflow-hidden py-48 px-8 md:px-16 lg:px-24 xl:px-32 border-t" style={{ background: BG, borderColor: DIM }}>
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
            Start earning today
          </p>
        </FadeUp>
        <RevealText className="mb-1">
          <h2 className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
            Your network,
          </h2>
        </RevealText>
        <RevealText delay={0.05} className="mb-1">
          <h2 className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]" style={{ color: "rgba(4 104 37 / 0.86)", fontFamily: "var(--font-dm-sans)" }}>
            our technology,
          </h2>
        </RevealText>
        <RevealText delay={0.1} className="mb-20">
          <h2 className="text-[clamp(3.5rem,10vw,13rem)] font-black leading-[0.83] tracking-[-0.04em]" style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}>
            shared revenue.
          </h2>
        </RevealText>

        <FadeUp delay={0.3}>
          <p className="text-lg leading-relaxed mb-12 max-w-xl mx-auto" style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}>
            Join the Flo partner network and build a new recurring revenue stream for your business — with full support from day one.
          </p>
        </FadeUp>

        <FadeUp delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#apply"
            className="inline-flex items-center justify-center gap-2.5 px-12 py-5 rounded-full text-sm font-black transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ background: GREEN, color: "#ffffff", fontFamily: "var(--font-dm-sans)" }}
          >
            Apply Now <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-12 py-5 rounded-full text-sm font-bold border transition-all duration-300 hover:bg-[#f5f5f5]"
            style={{ borderColor: DIM, color: TEXT, fontFamily: "var(--font-dm-sans)" }}
          >
            Talk to Our Team
          </Link>
        </FadeUp>

        <FadeUp delay={0.5} className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {["Up to 8% Commission", "3 Partnership Tracks", "< 3 Days Onboarding", "Monthly Payouts"].map((t) => (
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

export default function ChannelPartnerPage() {
  return (
    <div className="w-full" style={{ color: TEXT, background: BG2 }}>
      <HeroSection />
      <PartnerTypesSection />
      <BenefitsSection />
      <ProcessSection />
      <ApplicationForm />
      <CTASection />
    </div>
  );
}
