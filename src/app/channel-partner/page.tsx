'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  DollarSign,
  Wrench,
  BarChart3,
  Award,
  BookOpen,
  Megaphone,
  Headphones,
  Share2,
  Lightbulb,
} from 'lucide-react';
import { trackLead } from '@/lib/analytics';

// ─── Design tokens ────────────────────────────────────────────────────────────
// prettier-ignore
const BG      = "#ffffff";
const BG2 = '#f5f5f5';
const GREEN = '#7ccd54';
const TEXT = '#191c1a';
const MUTED = 'rgba(25,28,26,0.55)';
const DIM = 'rgba(25,28,26,0.15)';
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Animation primitives ─────────────────────────────────────────────────────

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

const PARTNER_TYPES = [
  {
    icon: DollarSign,
    tag: 'Earn Commission',
    title: 'Referral Partner',
    description:
      'Refer clients from your existing network to Flo Mobility. For every successful deployment, you earn a competitive referral commission, with zero operational overhead.',
    perks: ['Up to 8% referral fee', 'Simple referral portal', 'Monthly payouts'],
  },
  {
    icon: Wrench,
    tag: 'Build Together',
    title: 'System Integrator',
    description:
      'Embed our autonomous robots into your own engineering or construction solutions. Access our full API suite, technical docs, and dedicated integration support.',
    perks: ['API + SDK access', 'Co-development support', 'Joint go-to-market'],
  },
  {
    icon: BarChart3,
    tag: 'Scale Revenue',
    title: 'Reseller Partner',
    description:
      "Become an authorised reseller of Flo's robot fleet in your region. Deploy, manage, and sell subscriptions to your clients with our full backing.",
    perks: [
      'Exclusive territory rights',
      'Volume pricing tiers',
      'Dedicated success manager',
    ],
  },
];

// prettier-ignore
const BENEFITS = [
  { icon: Award,       title: "Revenue Share",       description: "Competitive, transparent commissions on every deal you close or refer." },
  { icon: BookOpen,    title: "Technical Training",   description: "Full certification program covering robot deployment, operations, and maintenance." },
  { icon: Megaphone,   title: "Co-Marketing",         description: "Co-branded campaigns, case studies, and event sponsorships to amplify your reach." },
  { icon: Headphones,  title: "Dedicated Support",    description: "A named partner success manager and priority access to our engineering team." },
  { icon: Share2,      title: "Lead Sharing",         description: "Inbound leads in your geography are routed directly to you first." },
  { icon: Lightbulb,   title: "Early Access",         description: "Be first to demo new products and shape our roadmap through partner feedback." },
];

// prettier-ignore
const STEPS = [
  { number: "01", title: "Apply",          body: "Fill out the partner application below. Our team reviews every submission within 3 business days." },
  { number: "02", title: "Get Onboarded",  body: "Complete a short onboarding: product training, portal access, and your partner agreement, and you're live." },
  { number: "03", title: "Start Earning",  body: "Refer, deploy, or resell. Track everything in your partner dashboard and receive your payouts monthly." },
];

// ─── Submit button ────────────────────────────────────────────────────────────

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="h-12 w-full rounded-full text-sm font-black tracking-wide uppercase transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:opacity-60"
      style={{ background: GREEN, color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
    >
      {isSubmitting ? 'Submitting…' : 'Submit Application'}
    </button>
  );
}

// ─── Section 1 — Hero ────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="mt-[40px] w-full px-8 pt-28 pb-0 md:px-16 lg:px-24 xl:px-32"
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
          <span style={{ color: TEXT }}>Channel Partner</span>
        </div>
      </FadeUp>

      <div className="grid items-center gap-16 pb-0 lg:grid-cols-2 lg:gap-24">
        {/* Left — text */}
        <div>
          <div className="mb-8">
            <RevealText>
              <h1
                className="text-[clamp(2.75rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Grow together
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
                with Flo.
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
              Join our partner ecosystem and bring autonomous robotics to your clients,
              while building a new, recurring revenue stream for your business.
            </p>
          </FadeUp>

          <FadeUp delay={0.35} className="mb-14 flex flex-wrap gap-4">
            <a
              href="#apply"
              className="inline-flex items-center gap-2.5 rounded-full px-[clamp(1.125rem,1.5vw,2rem)] py-[clamp(0.7rem,0.8vw,1rem)] text-[clamp(0.75rem,0.68rem_+_0.32vw,0.9375rem)] font-bold tracking-wide uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: GREEN,
                color: '#fff',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              Become a Partner{' '}
              <ArrowRight className="h-[clamp(0.875rem,1vw,1rem)] w-[clamp(0.875rem,1vw,1rem)]" />
            </a>
            <a
              href="#benefits"
              className="inline-flex items-center gap-2 rounded-full border px-[clamp(1.125rem,1.5vw,2rem)] py-[clamp(0.7rem,0.8vw,1rem)] text-[clamp(0.75rem,0.68rem_+_0.32vw,0.9375rem)] font-bold transition-all duration-300 hover:bg-white"
              style={{ borderColor: DIM, color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              Explore Benefits{' '}
              <ArrowUpRight className="h-[clamp(0.875rem,1vw,1rem)] w-[clamp(0.875rem,1vw,1rem)]" />
            </a>
          </FadeUp>

          {/* Stats strip */}
          <FadeUp delay={0.4}>
            <div
              className="grid grid-cols-3 border-t border-b"
              style={{ borderColor: DIM }}
            >
              {[
                { value: '8%', label: 'Referral Fee' },
                { value: '3', label: 'Partner Tracks' },
                { value: '< 3', label: 'Days Onboarding' },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`py-6 pr-4 ${i < 2 ? 'border-r' : ''}`}
                  style={{ borderColor: DIM }}
                >
                  <div
                    className="mb-1 text-[clamp(1.4rem,2.5vw,2.4rem)] leading-none font-black tracking-[-0.02em]"
                    style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="mt-1 text-[10px] font-semibold tracking-[0.18em] uppercase"
                    style={{ color: MUTED }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Right — image */}
        <FadeUp delay={0.15} className="flex flex-col gap-6">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-2xl border"
            style={{ borderColor: DIM }}
          >
            <Image
              src="/about/showcase.avif"
              alt="Flo Mobility autonomous robot"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div
                className="text-3xl font-black tracking-[-0.03em] text-white"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                200+
              </div>
              <div
                className="mt-1 text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
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

function PartnerTypeCell({
  type,
  index,
}: {
  type: (typeof PARTNER_TYPES)[0];
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
        className="mb-2 block text-[10px] font-bold tracking-[0.24em] uppercase"
        style={{ color: GREEN }}
      >
        {type.tag}
      </span>
      <div
        className="mt-4 mb-6 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: `${GREEN}18` }}
      >
        <type.icon className="h-5 w-5" style={{ color: GREEN }} />
      </div>
      <h3
        className="mb-3 text-xl leading-snug font-black tracking-[-0.02em]"
        style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
      >
        {type.title}
      </h3>
      <p
        className="mb-8 flex-1 text-sm leading-[1.85]"
        style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
      >
        {type.description}
      </p>
      <ul className="space-y-2.5">
        {type.perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-3 text-sm font-semibold"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: GREEN }}
            />
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
      <div className="w-full px-8 pt-32 pb-16 md:px-16 lg:px-24 xl:px-32">
        <SectionRule label="Partnership Models" />
        <div className="grid items-end gap-16 lg:grid-cols-[1fr_420px]">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.65rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Find your
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
                partnership track.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <p
              className="text-base leading-relaxed"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              Three flexible models designed for different business types. Pick the one
              that fits how you work.
            </p>
          </FadeUp>
        </div>
      </div>
      <div className="w-full border-t border-l" style={{ borderColor: DIM }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNER_TYPES.map((t, i) => (
            <PartnerTypeCell key={t.title} type={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3 — Benefits ────────────────────────────────────────────────────

function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="w-full border-t"
      style={{ background: BG2, borderColor: DIM }}
    >
      <div className="w-full border-b" style={{ borderColor: DIM }}>
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          {/* Left — image */}
          <div
            className="relative min-h-[420px] border-r lg:min-h-[640px]"
            style={{ borderColor: DIM }}
          >
            <Image
              src="/about/showcase.avif"
              alt="Flo Mobility autonomous robot in action"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute right-10 bottom-10 left-10">
              <div
                className="mb-1 text-4xl font-black text-white"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                200+
              </div>
              <p className="text-sm font-medium text-white/70">
                Projects completed across construction, manufacturing &amp; logistics
              </p>
            </div>
          </div>

          {/* Right — benefits list */}
          <div className="px-10 py-20 lg:px-16 xl:px-20" style={{ background: BG }}>
            <SectionRule label="What You Get" />
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.2rem,4vw,5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Built for
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-12">
              <h2
                className="text-[clamp(2.2rem,4vw,5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                mutual growth.
              </h2>
            </RevealText>

            <div className="divide-y" style={{ borderColor: DIM }}>
              {BENEFITS.map((benefit, i) => (
                <FadeUp key={benefit.title} delay={0.05 * i}>
                  <div className="flex items-start gap-5 py-6">
                    <div
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${GREEN}14` }}
                    >
                      <benefit.icon className="h-4 w-4" style={{ color: GREEN }} />
                    </div>
                    <div>
                      <h3
                        className="mb-1.5 text-sm font-black"
                        style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                      >
                        {benefit.title}
                      </h3>
                      <p
                        className="text-sm leading-[1.85]"
                        style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                      >
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

function StepRow({ step, i }: { step: (typeof STEPS)[0]; i: number }) {
  const [hovered, setHovered] = React.useState(false);
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
      className="w-full border-t px-8 py-40 md:px-16 lg:px-24 xl:px-32"
      style={{ background: BG, borderColor: DIM }}
    >
      <SectionRule label="How It Works" />
      <div className="grid items-start gap-24 lg:grid-cols-[520px_1fr]">
        <div className="lg:sticky lg:top-32">
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(2.6rem,5vw,5.75rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              Earning in
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
              two weeks
            </h2>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              className="text-[clamp(2.6rem,5vw,5.75rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              flat.
            </h2>
          </RevealText>
          <FadeUp delay={0.3} className="mt-8">
            <p
              className="text-base leading-[1.85]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              From application to first payout in as little as two weeks. No complex
              procurement, no long onboarding cycles.
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

// ─── Section 5 — Application Form ────────────────────────────────────────────

function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const apiBase = (process.env.NEXT_PUBLIC_MISSION_CONTROL_API_URL ?? '').replace(
    /\/$/,
    '',
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      formType: 'partner',
      firstName: String(formData.get('firstName') ?? ''),
      lastName: String(formData.get('lastName') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      company: String(formData.get('company') ?? ''),
      partnerType: String(formData.get('partnerType') ?? ''),
      message: String(formData.get('message') ?? ''),
    };

    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`${apiBase || ''}/api/public/forms/partner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: { success?: boolean; message?: string } = await response
        .json()
        .catch(() => ({}));
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      form.reset();
      trackLead('partner');
      setSuccessMessage(
        data.message ||
          'Thank you. Our partnerships team will review your application and be in touch within 3 business days.',
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="apply"
      className="w-full border-t"
      style={{ background: BG2, borderColor: DIM }}
    >
      <div className="w-full px-8 py-32 md:px-16 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-5">
          {/* Left info — 2/5 */}
          <div
            className="border-b pr-0 pb-16 lg:col-span-2 lg:border-r lg:border-b-0 lg:pr-16 lg:pb-0"
            style={{ borderColor: DIM }}
          >
            <SectionRule label="Apply Now" />
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.35rem,5vw,5.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Ready to
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-10">
              <h2
                className="text-[clamp(2.35rem,5vw,5.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                partner up?
              </h2>
            </RevealText>

            <FadeUp className="mb-12">
              <p
                className="text-base leading-[1.85]"
                style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
              >
                Fill out the form and our partnerships team will be in touch within 3
                business days.
              </p>
            </FadeUp>

            <FadeUp>
              <p
                className="mb-6 text-[10px] font-bold tracking-[0.26em] uppercase"
                style={{ color: DIM }}
              >
                Prefer to talk first?
              </p>
              <div className="space-y-0 divide-y" style={{ borderColor: DIM }}>
                {[
                  {
                    label: 'Call or WhatsApp',
                    links: [
                      { value: '+91 6393569079', href: 'https://wa.me/916393569079' },
                    ],
                  },
                  {
                    label: 'Partner Enquiries',
                    links: [
                      {
                        value: 'contact@flomobility.com',
                        href: 'mailto:contact@flomobility.com',
                      },
                    ],
                  },
                  {
                    label: 'Headquarters',
                    links: [
                      {
                        value: 'HSR Layout, Bengaluru, India',
                        href: 'https://maps.google.com/?q=HSR+Layout,+Bengaluru,+India',
                      },
                    ],
                  },
                ].map((item) => (
                  <div key={item.label} className="block py-5">
                    <p
                      className="mb-1.5 text-[10px] font-bold tracking-[0.2em] uppercase"
                      style={{ color: DIM }}
                    >
                      {item.label}
                    </p>
                    <div className="flex flex-col gap-1">
                      {item.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold underline-offset-2 transition-colors duration-200 hover:underline"
                          style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                        >
                          {link.value}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right form — 3/5 */}
          <div className="pt-16 lg:col-span-3 lg:pt-0 lg:pl-16">
            {successMessage ? (
              <FadeUp>
                <div
                  className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl p-12 text-center"
                  style={{
                    background: 'rgba(4 104 37 / 0.06)',
                    border: `1px solid ${DIM}`,
                  }}
                >
                  <div className="mb-6 h-0.5 w-10" style={{ background: GREEN }} />
                  <h3
                    className="mb-3 text-2xl font-black"
                    style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    Application Received
                  </h3>
                  <p
                    className="mx-auto mb-8 max-w-sm text-sm leading-[1.85]"
                    style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {successMessage}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-sm font-bold underline underline-offset-4 transition-colors"
                    style={{ color: GREEN, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    Submit another application
                  </button>
                </div>
              </FadeUp>
            ) : (
              <FadeUp>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="formType" value="partner" />

                  {/* Name */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {[
                      {
                        id: 'firstName',
                        name: 'firstName',
                        label: 'First Name',
                        placeholder: 'John',
                        required: true,
                        type: 'text',
                      },
                      {
                        id: 'lastName',
                        name: 'lastName',
                        label: 'Last Name',
                        placeholder: 'Doe',
                        required: true,
                        type: 'text',
                      },
                    ].map((field) => (
                      <div key={field.id} className="space-y-2">
                        <label
                          htmlFor={field.id}
                          className="block text-[10px] font-bold tracking-[0.2em] uppercase"
                          style={{ color: DIM }}
                        >
                          {field.label}{' '}
                          {field.required && <span style={{ color: GREEN }}>*</span>}
                        </label>
                        <input
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          required={field.required}
                          className="h-12 w-full rounded-xl border px-4 text-sm transition-colors outline-none"
                          style={{
                            borderColor: DIM,
                            background: BG,
                            color: TEXT,
                            fontFamily: 'var(--font-dm-sans)',
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = GREEN;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = DIM;
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label
                      htmlFor="company"
                      className="block text-[10px] font-bold tracking-[0.2em] uppercase"
                      style={{ color: DIM }}
                    >
                      Company Name <span style={{ color: GREEN }}>*</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      placeholder="Your company"
                      required
                      className="h-12 w-full rounded-xl border px-4 text-sm transition-colors outline-none"
                      style={{
                        borderColor: DIM,
                        background: BG,
                        color: TEXT,
                        fontFamily: 'var(--font-dm-sans)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = GREEN;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = DIM;
                      }}
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-[10px] font-bold tracking-[0.2em] uppercase"
                        style={{ color: DIM }}
                      >
                        Work Email <span style={{ color: GREEN }}>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        className="h-12 w-full rounded-xl border px-4 text-sm transition-colors outline-none"
                        style={{
                          borderColor: DIM,
                          background: BG,
                          color: TEXT,
                          fontFamily: 'var(--font-dm-sans)',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = GREEN;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = DIM;
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-[10px] font-bold tracking-[0.2em] uppercase"
                        style={{ color: DIM }}
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 00000 00000"
                        className="h-12 w-full rounded-xl border px-4 text-sm transition-colors outline-none"
                        style={{
                          borderColor: DIM,
                          background: BG,
                          color: TEXT,
                          fontFamily: 'var(--font-dm-sans)',
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = GREEN;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = DIM;
                        }}
                      />
                    </div>
                  </div>

                  {/* Partnership type */}
                  <div className="space-y-2">
                    <label
                      htmlFor="partnerType"
                      className="block text-[10px] font-bold tracking-[0.2em] uppercase"
                      style={{ color: DIM }}
                    >
                      Partnership Type <span style={{ color: GREEN }}>*</span>
                    </label>
                    <select
                      id="partnerType"
                      name="partnerType"
                      required
                      className="h-12 w-full appearance-none rounded-xl border px-4 text-sm transition-colors outline-none"
                      style={{
                        borderColor: DIM,
                        background: BG,
                        color: TEXT,
                        fontFamily: 'var(--font-dm-sans)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = GREEN;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = DIM;
                      }}
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
                    <label
                      htmlFor="message"
                      className="block text-[10px] font-bold tracking-[0.2em] uppercase"
                      style={{ color: DIM }}
                    >
                      Tell Us About Your Business <span style={{ color: GREEN }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Briefly describe your business, your clients, and why you'd like to partner with Flo Mobility…"
                      className="min-h-[130px] w-full resize-none rounded-xl border px-4 py-3 text-sm transition-colors outline-none"
                      style={{
                        borderColor: DIM,
                        background: BG,
                        color: TEXT,
                        fontFamily: 'var(--font-dm-sans)',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = GREEN;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = DIM;
                      }}
                    />
                  </div>

                  {errorMessage && (
                    <p
                      className="rounded-xl px-4 py-3 text-sm"
                      style={{
                        color: '#ef4444',
                        background: 'rgba(239,68,68,0.06)',
                        border: '1px solid rgba(239,68,68,0.2)',
                      }}
                    >
                      {errorMessage}
                    </p>
                  )}

                  <SubmitButton isSubmitting={isSubmitting} />

                  <p
                    className="text-center text-xs"
                    style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    By submitting, you agree to our{' '}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-2"
                      style={{ color: TEXT }}
                    >
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
    <section
      className="relative w-full overflow-hidden border-t px-8 py-48 md:px-16 lg:px-24 xl:px-32"
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
          style={{ background: `${GREEN}18` }}
        />
      </div>

      <div className="relative text-center">
        <FadeUp>
          <p
            className="mb-12 text-[11px] font-black tracking-[0.32em] uppercase"
            style={{ color: MUTED }}
          >
            Start earning today
          </p>
        </FadeUp>
        <RevealText className="mb-1">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            Your network,
          </h2>
        </RevealText>
        <RevealText delay={0.05} className="mb-1">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: 'rgba(4 104 37 / 0.86)', fontFamily: 'var(--font-dm-sans)' }}
          >
            our technology,
          </h2>
        </RevealText>
        <RevealText delay={0.1} className="mb-20">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            shared revenue.
          </h2>
        </RevealText>

        <FadeUp delay={0.3}>
          <p
            className="mx-auto mb-12 max-w-xl text-lg leading-relaxed"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            Join the Flo partner network and build a new recurring revenue stream for your
            business, with full support from day one.
          </p>
        </FadeUp>

        <FadeUp delay={0.4} className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#apply"
            className="inline-flex items-center justify-center gap-2.5 rounded-full px-12 py-5 text-sm font-black shadow-lg transition-all duration-300 hover:scale-105"
            style={{
              background: GREEN,
              color: '#ffffff',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            Apply Now <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-12 py-5 text-sm font-bold transition-all duration-300 hover:bg-[#f5f5f5]"
            style={{ borderColor: DIM, color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            Talk to Our Team
          </Link>
        </FadeUp>

        <FadeUp
          delay={0.5}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            'Up to 8% Commission',
            '3 Partnership Tracks',
            '< 3 Days Onboarding',
            'Monthly Payouts',
          ].map((t) => (
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
