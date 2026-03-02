"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitFormAction } from "@/app/actions/form-actions";
import { MagicDotPattern } from "@/components/ui/magicui-dot-pattern";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PARTNER_TYPES = [
  {
    tag: "Earn Commission",
    title: "Referral Partner",
    description:
      "Refer clients from your existing network to Flo Mobility. For every successful deployment, you earn a competitive referral commission — with zero operational overhead.",
    perks: ["Up to 8% referral fee", "Simple referral portal", "Monthly payouts"],
  },
  {
    tag: "Build Together",
    title: "System Integrator",
    description:
      "Embed our autonomous robots into your own engineering or construction solutions. Access our full API suite, technical docs, and dedicated integration support.",
    perks: ["API + SDK access", "Co-development support", "Joint go-to-market"],
  },
  {
    tag: "Scale Revenue",
    title: "Reseller Partner",
    description:
      "Become an authorised reseller of Flo's robot fleet in your region. Deploy, manage, and sell subscriptions to your clients with our full backing.",
    perks: ["Exclusive territory rights", "Volume pricing tiers", "Dedicated success manager"],
  },
];

const BENEFITS = [
  {
    title: "Revenue Share",
    description: "Competitive, transparent commissions on every deal you close or refer.",
  },
  {
    title: "Technical Training",
    description: "Full certification program covering robot deployment, operations, and maintenance.",
  },
  {
    title: "Co-Marketing",
    description: "Co-branded campaigns, case studies, and event sponsorships to amplify your reach.",
  },
  {
    title: "Dedicated Support",
    description: "A named partner success manager and priority access to our engineering team.",
  },
  {
    title: "Lead Sharing",
    description: "Inbound leads in your geography are routed directly to you first.",
  },
  {
    title: "Early Access",
    description: "Be first to demo new products and shape our roadmap through partner feedback.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Apply",
    description:
      "Fill out the partner application below. Our team reviews every submission within 3 business days.",
  },
  {
    step: "02",
    title: "Get Onboarded",
    description:
      "Complete a short onboarding — product training, portal access, and your partner agreement — and you're live.",
  },
  {
    step: "03",
    title: "Start Earning",
    description:
      "Refer, deploy, or resell. Track everything in your partner dashboard and receive your payouts monthly.",
  },
];

// ─── Submit button ─────────────────────────────────────────────────────────────

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      className="w-full h-12 text-sm font-semibold tracking-wide rounded-lg"
      disabled={pending}
    >
      {pending ? "Submitting…" : "Submit Application"}
    </Button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ChannelPartnerPage() {
  const [state, formAction] = useActionState(submitFormAction, {
    success: false,
    message: "",
  });

  return (
    <main className="flex flex-col">

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
            Channel Partner Program
          </div>
          <h1
            className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl text-balance leading-[1.15] mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Grow Together with{" "}
            <span className="text-[#7ccd54]">Flo Mobility</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Join our partner ecosystem and bring autonomous robotics to your clients —
            while building a new, recurring revenue stream for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#apply"
              className="px-7 py-3.5 rounded-full bg-[#7ccd54] text-gray-900 font-semibold hover:bg-[#5ba83d] transition-colors duration-200"
            >
              Become a Partner
            </a>
            <a
              href="#benefits"
              className="px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/8 transition-colors duration-200"
            >
              Explore Benefits
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. PARTNER TYPES ── */}
      <section className="relative bg-transparent py-24 lg:py-32 overflow-hidden">
        <MagicDotPattern
          width={28}
          height={28}
          cr={1.3}
          className="text-[#7ccd54]/[0.55] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_60%,transparent_100%)]"
        />
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block rounded-full bg-[#fdfcf0] px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
              Who It's For
            </div>
            <h2
              className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Find Your Partnership Model
            </h2>
            <p className="text-lg text-gray-600">
              Three flexible tracks designed for different business types — pick the one that fits how you work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PARTNER_TYPES.map((type, i) => (
              <div
                key={i}
                className="flex flex-col h-full p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-[#7ccd54]/30 transition-shadow duration-200"
              >
                <span className="text-xs font-semibold tracking-wider uppercase text-[#7ccd54] block mb-3">
                  {type.tag}
                </span>
                <h3
                  className="text-xl font-medium text-gray-900 mb-4"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {type.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-6 flex-1">
                  {type.description}
                </p>
                <ul className="space-y-2.5">
                  {type.perks.map((perk, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#7ccd54] shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. BENEFITS ── */}
      <section id="benefits" className="bg-[#fdfcf0] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Left — image */}
            <div className="relative min-h-[420px] lg:min-h-[700px]">
              <Image
                src="/about/showcase.jpg"
                alt="Flo Mobility autonomous robot in action"
                fill
                className="object-cover"
                priority
              />
              {/* Dark overlay with floating stat */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f0f]/80 via-[#0f1f0f]/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <p
                  className="text-4xl font-semibold text-white mb-1"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  200+
                </p>
                <p className="text-sm text-gray-300 font-medium">
                  Projects completed across construction, manufacturing &amp; logistics
                </p>
              </div>
            </div>

            {/* Right — benefits list */}
            <div className="py-20 lg:py-24 lg:pl-16 xl:pl-20">
              <div className="mb-12">
                <div className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
                  Benefits
                </div>
                <h2
                  className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl mb-3"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Built for Mutual Growth
                </h2>
                <p className="text-gray-600">
                  Everything you need to succeed — from day one.
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                {BENEFITS.map((benefit, i) => (
                  <div key={i} className="py-6 flex gap-5 items-start">
                    <span
                      className="text-xs font-semibold text-[#7ccd54]/60 w-6 shrink-0 mt-0.5"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className="text-sm font-semibold text-gray-900 mb-1"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ── */}
      <section className="relative bg-[#1a3a1f] py-24 lg:py-32 overflow-hidden">
        <MagicDotPattern
          width={36}
          height={36}
          cr={1}
          className="text-[#7ccd54]/[0.08] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_100%)]"
        />
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#7ccd54] mb-6 border border-[#7ccd54]/20 uppercase">
              Process
            </div>
            <h2
              className="text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Simple to Get Started
            </h2>
            <p className="text-lg text-gray-400">
              From application to first payout in as little as two weeks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {STEPS.map((s, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="text-5xl font-semibold text-[#7ccd54]/30 leading-none mb-5 block"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.step}
                </span>
                <h3
                  className="text-xl font-medium text-white mb-3"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. APPLY FORM ── */}
      <section id="apply" className="bg-[#fdfcf0] py-24 lg:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-stretch">

            {/* Left — heading + contact info (2/5 width) — cream bg */}
            <div className="lg:col-span-2 space-y-10">
              {/* Heading block */}
              <div>
                <div className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
                  Apply Now
                </div>
                <h2
                  className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl mb-4 text-balance"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Ready to Partner with Us?
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Fill out the form and our partnerships team will be in touch within 3 business days.
                </p>
              </div>

              {/* Contact info */}
              <div>
                <p
                  className="text-base font-medium text-gray-900 mb-1"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Prefer to talk first?
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Reach our partnerships team directly — we're happy to walk you through the program before you apply.
                </p>

                <div className="divide-y divide-gray-100 border-y border-gray-100">
                  {[
                    { label: "Call or WhatsApp", value: "+91 8446614346", href: "https://wa.me/918446614346" },
                    { label: "Partner Enquiries", value: "contact@flomobility.com", href: "mailto:contact@flomobility.com" },
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

            {/* Right — form (3/5 width) — dark green bg */}
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
                      "Thank you. Our partnerships team will review your application and be in touch within 3 business days."}
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
                    <input type="hidden" name="formType" value="partner" />

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

                    {/* Company */}
                    <div className="space-y-1.5">
                      <Label htmlFor="company" className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                        Company Name <span className="text-[#7ccd54]">*</span>
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Your company"
                        required
                        className="h-11 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-[#7ccd54]/60 focus:ring-0 text-sm"
                      />
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                          Work Email <span className="text-[#7ccd54]">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@company.com"
                          required
                          className="h-11 rounded-lg border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-[#7ccd54]/60 focus:ring-0 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                          Phone Number
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

                    {/* Partnership type */}
                    <div className="space-y-1.5">
                      <Label htmlFor="partnerType" className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                        Partnership Type <span className="text-[#7ccd54]">*</span>
                      </Label>
                      <select
                        id="partnerType"
                        name="partnerType"
                        required
                        className="w-full h-11 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:border-[#7ccd54]/60 transition-colors"
                      >
                        <option value="" className="bg-[#1a3a1f]">Select a partnership type…</option>
                        <option value="Referral Partner" className="bg-[#1a3a1f]">Referral Partner</option>
                        <option value="System Integrator" className="bg-[#1a3a1f]">System Integrator</option>
                        <option value="Reseller Partner" className="bg-[#1a3a1f]">Reseller Partner</option>
                        <option value="Other" className="bg-[#1a3a1f]">Other / Not sure yet</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                        Tell Us About Your Business <span className="text-[#7ccd54]">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Briefly describe your business, your clients, and why you'd like to partner with Flo Mobility…"
                        required
                        className="min-h-[130px] rounded-lg border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-[#7ccd54]/60 focus:ring-0 resize-none text-sm p-3"
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

    </main>
  );
}
