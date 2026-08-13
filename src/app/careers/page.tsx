'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle2,
  Loader2,
  Zap,
  Users,
  Cpu,
  TrendingUp,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ArrowUpRight,
  Download,
} from 'lucide-react';
import { JOBS } from '@/lib/constants';
import Link from 'next/link';
import { trackLead } from '@/lib/analytics';

// ─── Design tokens ─────────────────────────────────────────────────────────────
const BG = '#ffffff';
const BG2 = '#f5f5f5';
const GREEN = '#7ccd54';
const TEXT = '#191c1a';
const MUTED = 'rgba(25,28,26,0.55)';
const DIM = 'rgba(25,28,26,0.15)';
const FORM_DIM = 'rgba(25,28,26,0.55)';
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Animation primitives ──────────────────────────────────────────────────────

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

// ─── Data ──────────────────────────────────────────────────────────────────────

// prettier-ignore
const WHY_JOIN = [
  { icon: Zap,        title: "Mission Driven Work",      body: "Build real autonomous robots deployed on active construction and logistics sites across India. Not prototypes." },
  { icon: Users,      title: "Fast Moving Team",         body: "A small, senior team where you own your work and ship things that matter, without red tape." },
  { icon: Cpu,        title: "Hands-on Robotics",        body: "Work directly with hardware, embedded systems, and AI on products already operating in the field." },
  { icon: TrendingUp, title: "Competitive Compensation", body: "Market-rate salaries with ESOP potential for early-stage hires who grow with the company." },
  { icon: BookOpen,   title: "Learning & Growth",        body: "Direct mentorship from founders and access to cutting-edge robotics R&D from day one." },
  { icon: MapPin,     title: "Bengaluru HQ",             body: "Based in HSR Layout, one of India's most vibrant startup neighbourhoods." },
];

// ─── Submit button ─────────────────────────────────────────────────────────────

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="flex h-14 w-full items-center justify-center gap-2 rounded-full text-base font-black tracking-wide uppercase transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:opacity-60"
      style={{ background: GREEN, color: '#fff', fontFamily: 'var(--font-dm-sans)' }}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Submitting…
        </>
      ) : (
        'Submit Application'
      )}
    </button>
  );
}

// ─── Form style helpers ───────────────────────────────────────────────────────

const inputBase =
  'w-full h-12 rounded-xl border px-4 text-base outline-none transition-colors duration-200';
const inputStyle = {
  borderColor: FORM_DIM,
  background: BG,
  color: TEXT,
  fontFamily: 'var(--font-dm-sans)',
};
const labelBase = 'block text-xs font-bold uppercase tracking-[0.18em] mb-2';
const labelStyle = { color: FORM_DIM };

function focusFormField(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  event.currentTarget.style.borderColor = GREEN;
}

function blurFormField(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  event.currentTarget.style.borderColor = FORM_DIM;
}

// ─── Sections ──────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="mt-[40px] w-full px-8 pt-28 pb-24 md:px-16 lg:px-24 xl:px-32"
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
          <span style={{ color: TEXT }}>Careers</span>
        </div>
      </FadeUp>

      <div className="grid items-end gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Left — headline */}
        <div>
          <RevealText>
            <h1
              className="text-[clamp(2.75rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              Team that builds
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
              what others imagine
            </h1>
          </RevealText>
          {/* <RevealText delay={0.12}> */}
          {/*   <h1 */}
          {/*     className="text-[clamp(2.75rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]" */}
          {/*     style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }} */}
          {/*   > */}
          {/*     robotics. */}
          {/*   </h1> */}
          {/* </RevealText> */}
        </div>

        {/* Right — description + CTAs */}
        <FadeUp delay={0.2} className="pb-2">
          <div className="mb-8 h-px w-16" style={{ background: DIM }} />
          <p
            className="mb-10 text-lg leading-[1.85]"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            Join our ambitious and passionate team deploying robots on production on real
            job sites and help shape how India moves, builds, and grows.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#roles"
              className="inline-flex items-center gap-2.5 rounded-full px-[clamp(1.125rem,1.5vw,2rem)] py-[clamp(0.7rem,0.8vw,1rem)] text-[clamp(0.75rem,0.68rem_+_0.32vw,0.9375rem)] font-bold tracking-wide uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: GREEN,
                color: '#fff',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              View Open Roles{' '}
              <ArrowRight className="h-[clamp(0.875rem,1vw,1rem)] w-[clamp(0.875rem,1vw,1rem)]" />
            </a>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-full border px-[clamp(1.125rem,1.5vw,2rem)] py-[clamp(0.7rem,0.8vw,1rem)] text-[clamp(0.75rem,0.68rem_+_0.32vw,0.9375rem)] font-bold transition-all duration-300 hover:bg-white"
              style={{ borderColor: DIM, color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              Apply Now{' '}
              <ArrowUpRight className="h-[clamp(0.875rem,1vw,1rem)] w-[clamp(0.875rem,1vw,1rem)]" />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function RolesSection() {
  return (
    <section
      id="roles"
      className="w-full scroll-mt-24 border-t"
      style={{ background: BG, borderColor: DIM }}
    >
      <div className="w-full px-8 pt-32 pb-24 md:px-16 lg:px-24 xl:px-32">
        <SectionRule label="Open Positions" />
        <div className="mb-20 grid items-end gap-16 lg:grid-cols-[1fr_400px]">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Find your
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2
                className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                role.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <div className="mb-8 h-10 w-px" style={{ background: GREEN }} />
            <p
              className="text-base leading-[1.85]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              We're growing fast and looking for people who want to do the most meaningful
              work of their careers.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {JOBS.map((job, i) => (
            <FadeUp key={job.title} delay={0.08 * i}>
              <div
                className="group flex cursor-default flex-col rounded-2xl border p-10 transition-all duration-300 hover:border-[rgba(4,104,37,0.25)] hover:shadow-sm"
                style={{ borderColor: DIM, background: BG }}
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex gap-2">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ background: `${GREEN}18`, color: 'rgba(4 104 37 / 0.86)' }}
                    >
                      {job.location}
                    </span>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ background: BG2, color: MUTED }}
                    >
                      {job.type}
                    </span>
                  </div>
                  <a
                    href={job.jdLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-[0.14em] uppercase transition-colors duration-200 hover:bg-[rgba(124,205,84,0.12)]"
                    style={{
                      color: 'rgba(4 104 37 / 0.86)',
                      borderColor: 'rgba(4,104,37,0.25)',
                      background: `${GREEN}10`,
                    }}
                    aria-label={`Download JD for ${job.title}`}
                  >
                    <Download className="h-3.5 w-3.5" />
                    JD
                  </a>
                </div>
                <h3
                  className="mb-3 text-xl leading-snug font-black tracking-[-0.02em]"
                  style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                >
                  {job.title}
                </h3>
                <p
                  className="mb-8 flex-1 text-sm leading-[1.85]"
                  style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                >
                  {job.description}
                </p>
                <a
                  href="#apply"
                  className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200"
                  style={{ color: 'rgba(4 104 37 / 0.86)' }}
                >
                  Apply for this role{' '}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCell({ item, index }: { item: (typeof WHY_JOIN)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !glowRef.current) return;
    const r = ref.current.getBoundingClientRect();
    glowRef.current.style.background = `radial-gradient(ellipse 80% 80% at ${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%, ${GREEN}28 0%, transparent 65%)`;
    glowRef.current.style.opacity = '1';
  };
  return (
    <motion.div
      ref={ref}
      className="relative flex cursor-default flex-col overflow-hidden border-r border-b p-10"
      style={{ borderColor: DIM }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        if (glowRef.current) glowRef.current.style.opacity = '0';
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05 * index, ease: EASE }}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0"
        style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
      />
      <div
        className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: `${GREEN}18` }}
      >
        <item.icon className="h-5 w-5" style={{ color: GREEN }} />
      </div>
      <h3
        className="mb-3 text-lg leading-snug font-black tracking-[-0.02em]"
        style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
      >
        {item.title}
      </h3>
      <p
        className="text-sm leading-[1.85]"
        style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
      >
        {item.body}
      </p>
    </motion.div>
  );
}

function WhySection() {
  return (
    <section className="w-full border-t" style={{ background: BG2, borderColor: DIM }}>
      <div className="w-full px-8 pt-32 pb-24 md:px-16 lg:px-24 xl:px-32">
        <SectionRule label="Why Flo" />
        <div className="mb-20 grid items-end gap-16 lg:grid-cols-[1fr_400px]">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Work that
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2
                className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                matters.
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <div className="mb-8 h-10 w-px" style={{ background: GREEN }} />
            <p
              className="text-base leading-[1.85]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              We're not building software. We're deploying physical robots in the real
              world. Here's what that means for you.
            </p>
          </FadeUp>
        </div>

        <div className="w-full border-t border-l" style={{ borderColor: DIM }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_JOIN.map((item, i) => (
              <WhyCell key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ApplySection() {
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

    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`${apiBase || ''}/api/public/forms/careers`, {
        method: 'POST',
        body: formData,
      });

      const data: { success?: boolean; message?: string } = await response
        .json()
        .catch(() => ({}));
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      form.reset();
      trackLead('careers');
      setSuccessMessage(
        data.message ||
          "Thank you. We'll review your application and be in touch within 5 business days.",
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
      className="w-full scroll-mt-24 border-t"
      style={{ background: BG, borderColor: DIM }}
    >
      <div className="w-full px-8 pt-32 pb-24 md:px-16 lg:px-24 xl:px-32">
        <SectionRule label="Apply" />

        <div className="mb-20 grid items-end gap-16 lg:grid-cols-[1fr_400px]">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Ready to
              </h2>
            </RevealText>
            <RevealText delay={0.06}>
              <h2
                className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                join the team?
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.2} className="pb-2">
            <div className="mb-8 h-10 w-px" style={{ background: GREEN }} />
            <p
              className="text-base leading-[1.85]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              Send us your application and we'll get back to you soon.
            </p>
          </FadeUp>
        </div>

        {/* Contact grid — matches contact page layout */}
        <div
          className="grid grid-cols-1 gap-0 border-t lg:grid-cols-5"
          style={{ borderColor: FORM_DIM }}
        >
          {/* Left — details */}
          <div
            className="border-b py-16 pr-0 lg:col-span-2 lg:border-r lg:border-b-0 lg:pr-16"
            style={{ borderColor: FORM_DIM }}
          >
            <p
              className="mb-10 text-[10px] font-bold tracking-[0.26em] uppercase"
              style={{ color: FORM_DIM }}
            >
              Reach Us Directly
            </p>

            <div className="space-y-0 divide-y" style={{ borderColor: FORM_DIM }}>
              {[
                {
                  icon: Mail,
                  label: 'Careers Email',
                  links: [
                    {
                      value: 'contact@flomobility.com',
                      href: 'mailto:contact@flomobility.com',
                    },
                  ],
                },
                {
                  icon: MapPin,
                  label: 'Headquarters',
                  links: [
                    {
                      value: 'Bengaluru, Karnataka, India',
                      href: 'https://maps.google.com/?q=HSR+Layout,+Bengaluru,+India',
                    },
                  ],
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-5 py-7">
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200"
                    style={{ background: `${GREEN}12` }}
                  >
                    <item.icon
                      className="h-4 w-4 transition-colors duration-200"
                      style={{ color: GREEN }}
                    />
                  </div>
                  <div>
                    <p
                      className="mb-1.5 text-[10px] font-bold tracking-[0.2em] uppercase"
                      style={{ color: FORM_DIM }}
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
                </div>
              ))}
            </div>

            {/* <div className="mt-10 border-t pt-8" style={{ borderColor: FORM_DIM }}> */}
            {/*   <p */}
            {/*     className="mb-4 text-[10px] font-bold tracking-[0.26em] uppercase" */}
            {/*     style={{ color: FORM_DIM }} */}
            {/*   > */}
            {/*     Response Time */}
            {/*   </p> */}
            {/*   <p */}
            {/*     className="text-sm leading-[1.85]" */}
            {/*     style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }} */}
            {/*   > */}
            {/*     We review all applications within 5 business days. For urgent enquiries, */}
            {/*     WhatsApp is fastest. */}
            {/*   </p> */}
            {/* </div> */}
          </div>

          {/* Right — form */}
          <div className="py-16 lg:col-span-3 lg:pl-16">
            <p
              className="mb-10 text-[10px] font-bold tracking-[0.26em] uppercase"
              style={{ color: FORM_DIM }}
            >
              Submit Application
            </p>

            {successMessage ? (
              <FadeUp>
                <div
                  className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl p-12 text-center"
                  style={{
                    background: 'rgba(124,205,84,0.06)',
                    border: `1px solid ${FORM_DIM}`,
                  }}
                >
                  <CheckCircle2 className="mb-6 h-10 w-10" style={{ color: GREEN }} />
                  <h3
                    className="mb-3 text-2xl font-black tracking-[-0.02em]"
                    style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    Application Received
                  </h3>
                  <p
                    className="mx-auto mb-8 max-w-sm text-base leading-[1.85]"
                    style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {successMessage}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-sm font-bold underline underline-offset-4 transition-colors duration-200"
                    style={{ color: GREEN, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    Submit another application
                  </button>
                </div>
              </FadeUp>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <input type="hidden" name="formType" value="careers" />

                {/* Name row */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {[
                    {
                      id: 'firstName',
                      name: 'firstName',
                      label: 'First Name',
                      placeholder: 'John',
                      required: true,
                    },
                    {
                      id: 'lastName',
                      name: 'lastName',
                      label: 'Last Name',
                      placeholder: 'Doe',
                      required: true,
                    },
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className={labelBase} style={labelStyle}>
                        {field.label}{' '}
                        {field.required && <span style={{ color: GREEN }}>*</span>}
                      </label>
                      <input
                        id={field.id}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        className={inputBase}
                        style={inputStyle}
                        onFocus={focusFormField}
                        onBlur={blurFormField}
                      />
                    </div>
                  ))}
                </div>

                {/* Email + Phone row */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={labelBase} style={labelStyle}>
                      Email <span style={{ color: GREEN }}>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className={inputBase}
                      style={inputStyle}
                      onFocus={focusFormField}
                      onBlur={blurFormField}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelBase} style={labelStyle}>
                      Phone <span style={{ color: GREEN }}>*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 00000 00000"
                      required
                      className={inputBase}
                      style={inputStyle}
                      onFocus={focusFormField}
                      onBlur={blurFormField}
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="role" className={labelBase} style={labelStyle}>
                    Role Applying For <span style={{ color: GREEN }}>*</span>
                  </label>
                  <input
                    id="role"
                    name="role"
                    placeholder="e.g. Embedded Design Engineer"
                    required
                    className={inputBase}
                    style={inputStyle}
                    onFocus={focusFormField}
                    onBlur={blurFormField}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelBase} style={labelStyle}>
                    Tell Us About Yourself <span style={{ color: GREEN }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Briefly describe your background and what excites you about this role…"
                    className="w-full resize-none rounded-xl border px-4 py-3.5 text-base transition-colors duration-200 outline-none"
                    style={{ ...inputStyle, minHeight: '140px' }}
                    onFocus={focusFormField}
                    onBlur={blurFormField}
                  />
                </div>

                {/* Resume */}
                <div>
                  <label htmlFor="resume" className={labelBase} style={labelStyle}>
                    Resume (PDF) <span style={{ color: GREEN }}>*</span>
                  </label>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf"
                    required
                    className={`${inputBase} cursor-pointer file:mr-4 file:border-0 file:bg-transparent file:text-xs file:font-semibold`}
                    style={{ ...inputStyle, color: MUTED }}
                    onFocus={focusFormField}
                    onBlur={blurFormField}
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
                    className="underline underline-offset-2 transition-colors"
                    style={{ color: TEXT }}
                  >
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
