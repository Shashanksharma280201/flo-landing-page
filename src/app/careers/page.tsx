"use client";

import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { JOBS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Zap, Users, Cpu, TrendingUp, BookOpen, MapPin } from "lucide-react";
import { submitFormAction } from "@/app/actions/form-actions";
import { MagicDotPattern } from "@/components/ui/magicui-dot-pattern";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const WHY_JOIN = [
  {
    icon: Zap,
    title: "Mission-Driven Work",
    description:
      "Build real autonomous robots deployed on active construction and logistics sites across India — not prototypes.",
  },
  {
    icon: Users,
    title: "Fast-Moving Team",
    description:
      "A small, senior team where you own your work and ship things that matter — without red tape.",
  },
  {
    icon: Cpu,
    title: "Hands-on Robotics",
    description:
      "Work directly with hardware, embedded systems, and AI on products already operating in the field.",
  },
  {
    icon: TrendingUp,
    title: "Competitive Compensation",
    description:
      "Market-rate salaries with ESOP potential for early-stage hires who grow with the company.",
  },
  {
    icon: BookOpen,
    title: "Learning & Growth",
    description:
      "Direct mentorship from founders and access to cutting-edge robotics R&D from day one.",
  },
  {
    icon: MapPin,
    title: "Bengaluru HQ",
    description:
      "Based in HSR Layout — one of India's most vibrant startup neighbourhoods.",
  },
];

// ─── Submit button ─────────────────────────────────────────────────────────────

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-12 rounded-lg bg-[#7ccd54] text-gray-900 text-sm font-semibold tracking-wide hover:bg-[#5ba83d] transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Submitting…
        </>
      ) : (
        "Submit Application"
      )}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const [state, formAction] = useActionState(submitFormAction, {
    success: false,
    message: "",
  });

  return (
    <div className="flex flex-col">

      {/* ── 1. HERO ── */}
      <section className="relative bg-[#1a3a1f] py-28 lg:py-40 overflow-hidden">
        <MagicDotPattern
          glow
          width={32}
          height={32}
          cr={1}
          className="text-[#7ccd54]/[0.12] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_40%,transparent_100%)]"
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#7ccd54]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <div className="inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#7ccd54] mb-8 border border-[#7ccd54]/20 uppercase">
            Careers at Flo Mobility
          </div>
          <h1
            className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl text-balance leading-[1.15] mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Build the Future of{" "}
            <span className="text-[#7ccd54]">Autonomous Robotics.</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Join a small, ambitious team deploying real robots on real job sites —
            and help shape how India moves, builds, and grows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#roles"
              className="px-7 py-3.5 rounded-full bg-[#7ccd54] text-gray-900 font-semibold hover:bg-[#5ba83d] transition-colors duration-200"
            >
              View Open Roles
            </a>
            <a
              href="#apply"
              className="px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/8 transition-colors duration-200"
            >
              Apply Now
            </a>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
            {[`${JOBS.length} Open Roles`, "Bengaluru, India", "Full-time"].map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-300"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. OPEN ROLES ── */}
      <section id="roles" className="bg-[#fdfcf0] py-24 lg:py-32 overflow-hidden scroll-mt-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
              Open Positions
            </div>
            <h2
              className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Find Your Role
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We're growing fast and looking for people who want to do the most meaningful work of their careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {JOBS.map((job, i) => (
              <div
                key={job.title}
                className="flex flex-col p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-[#7ccd54]/30 transition-all duration-200"
              >
                <span className="text-xs font-semibold text-[#7ccd54]/60 block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="text-base font-semibold text-gray-900 mb-3"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {job.title}
                </h3>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-[#f0faf0] text-[#5ba83d] rounded-full px-2.5 py-1 font-medium">
                    {job.location}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-1 font-medium">
                    {job.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-6">
                  {job.description}
                </p>
                <a
                  href={job.jdLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5ba83d] hover:text-[#7ccd54] transition-colors"
                >
                  Download JD
                  <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M7 1v8M3 7l4 4 4-4M1 11h12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHY JOIN US ── */}
      <section className="bg-white py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-block rounded-full bg-[#fdfcf0] px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
              Why Flo
            </div>
            <h2
              className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Work That Matters
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We're not building software — we're deploying physical robots in the real world.
              Here's what that means for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_JOIN.map((item, i) => (
              <div
                key={item.title}
                className="flex flex-col p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-[#7ccd54]/30 transition-all duration-200"
              >
                <span className="text-xs font-semibold text-[#7ccd54]/60 block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0faf0] mb-5">
                  <item.icon className="h-5 w-5 text-[#7ccd54]" />
                </div>
                <h3
                  className="text-base font-semibold text-gray-900 mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. APPLY FORM ── */}
      <section id="apply" className="bg-[#fdfcf0] py-24 lg:py-32 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-stretch">

            {/* Left — cream bg */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <div className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
                  Apply
                </div>
                <h2
                  className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl mb-4 text-balance"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Ready to Join the Team?
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Send us your application and we'll get back to you within 5 business days.
                </p>
              </div>

              <div>
                <p
                  className="text-base font-medium text-gray-900 mb-1"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Have a question first?
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Reach out directly — we're happy to share more about the role, the team, or what a typical day looks like.
                </p>

                <div className="divide-y divide-gray-100 border-y border-gray-100">
                  {[
                    { label: "Call or WhatsApp", value: "+91 8446614346", href: "https://wa.me/918446614346" },
                    { label: "Careers Email", value: "contact@flomobility.com", href: "mailto:contact@flomobility.com" },
                    { label: "Headquarters", value: "HSR Layout, Bengaluru, Karnataka, India", href: "https://maps.google.com/?q=HSR+Layout,+Bengaluru,+India" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-5 group"
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-[#5ba83d] transition-colors duration-200">
                        {item.value}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — dark green form */}
            <div className="lg:col-span-3 flex flex-col">
              {state.success ? (
                <div className="bg-[#1a3a1f] border border-[#7ccd54]/20 rounded-2xl p-12 text-center flex-1 flex flex-col items-center justify-center">
                  <div className="w-10 h-0.5 bg-[#7ccd54] mx-auto mb-6" />
                  <h3
                    className="text-2xl font-medium text-white mb-3"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Application Received
                  </h3>
                  <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8">
                    {state.message ||
                      "Thank you. We'll review your application and be in touch within 5 business days."}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-sm font-medium text-[#7ccd54] underline underline-offset-4 hover:text-[#5ba83d] transition-colors"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <div className="bg-[#1a3a1f] rounded-2xl p-8 flex-1">
                  <form action={formAction} className="space-y-5">
                    <input type="hidden" name="formType" value="careers" />

                    {/* Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                          First Name <span className="text-[#7ccd54]">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          required
                          className="h-11 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-[#7ccd54]/60 focus:ring-0 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                          Last Name <span className="text-[#7ccd54]">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          required
                          className="h-11 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-[#7ccd54]/60 focus:ring-0 text-sm"
                        />
                      </div>
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                          Email <span className="text-[#7ccd54]">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          className="h-11 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-[#7ccd54]/60 focus:ring-0 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 00000 00000"
                          className="h-11 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-[#7ccd54]/60 focus:ring-0 text-sm"
                        />
                      </div>
                    </div>

                    {/* Role */}
                    <div className="space-y-1.5">
                      <Label htmlFor="role" className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                        Role Applying For <span className="text-[#7ccd54]">*</span>
                      </Label>
                      <Input
                        id="role"
                        name="role"
                        placeholder="e.g. Embedded Design Engineer"
                        required
                        className="h-11 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-[#7ccd54]/60 focus:ring-0 text-sm"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                        Tell Us About Yourself <span className="text-[#7ccd54]">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Briefly describe your background and what excites you about this role…"
                        required
                        className="min-h-[110px] rounded-lg border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-[#7ccd54]/60 focus:ring-0 resize-none text-sm p-3"
                      />
                    </div>

                    {/* Resume */}
                    <div className="space-y-1.5">
                      <Label htmlFor="resume" className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                        Resume (PDF) <span className="text-[#7ccd54]">*</span>
                      </Label>
                      <Input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf"
                        required
                        className="h-11 rounded-lg border-white/10 bg-white/5 text-white file:text-gray-400 file:bg-transparent file:border-0 file:text-xs file:font-semibold cursor-pointer text-sm"
                      />
                    </div>

                    {state.message && !state.success && (
                      <p className="text-sm text-red-400 border border-red-400/20 bg-red-400/5 rounded-lg px-4 py-3">
                        {state.message}
                      </p>
                    )}

                    <SubmitButton />

                    <p className="text-xs text-center text-gray-500">
                      By submitting, you agree to our{" "}
                      <Link href="/privacy" className="text-[#7ccd54] hover:underline">
                        privacy policy
                      </Link>
                      .
                    </p>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
