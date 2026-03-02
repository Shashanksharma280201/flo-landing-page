import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MagicDotPattern } from "@/components/ui/magicui-dot-pattern";

export const metadata = {
  title: "About Us | Flo Mobility",
  description:
    "Redefining mobility through meaningful human–machine collaboration.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const MISSION_VALUES = [
  {
    title: "Autonomous by design",
    description:
      "Every product we build works without human supervision from day one — real autonomy, not remote control.",
  },
  {
    title: "Safety at every layer",
    description:
      "Human safety is the hardest constraint on every design decision we make, not an afterthought.",
  },
  {
    title: "Partnerships over transactions",
    description:
      "We build long-term relationships with clients and partners — success is measured in deployments, not demos.",
  },
];

const STATS = [
  { value: "200+", label: "Sites deployed" },
  { value: "15+", label: "Enterprise clients" },
  { value: "3", label: "Industry verticals" },
  { value: "2020", label: "Year founded" },
];

const CORE_TEAM = [
  {
    name: "Manesh Jain",
    title: "Founder & CEO",
    description: "MDI Gurgaon – Gold Medalist. Ex-IBM | 18+ years | 3× Founder",
    image: "/about/manesh-jain.png",
    linkedin: null,
  },
  {
    name: "Pratik Patel",
    title: "Co-Founder & COO",
    description: "Ex-Byju's, Accenture. Business & Product Leader",
    image: "/about/pratik-patel.jpg",
    linkedin: "https://www.linkedin.com/in/pratikpatel0929/",
  },
];

const CHANNEL_PARTNERS = [
  {
    name: "Bhavik Shah",
    title: "Partner – Jainam Enterprises",
    description:
      "Founder – Arinco Solutions Pvt Ltd. 10+ years experience in mining & construction manufacturing.",
    image: "/about/bhavik-shah.jpg",
    linkedin: null,
  },
  {
    name: "Sudarshan Narayan",
    title: "Founder – Coboticca Automation",
    description:
      "Founder – Amplifi (B2B SaaS). Angel Investor & Startup Mentor.",
    image: "/about/sudarshan-narayan.jpg",
    linkedin: null,
  },
];

// ─── Shared person card ────────────────────────────────────────────────────────

function PersonCard({
  name,
  title,
  description,
  image,
  linkedin,
}: {
  name: string;
  title: string;
  description: string;
  image: string;
  linkedin?: string | null;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-md hover:border-[#7ccd54]/30 transition-all duration-200">
      {/* Portrait photo */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
        />
        {/* Subtle bottom gradient so text reads on overlay if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f0f]/40 via-transparent to-transparent" />
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3
              className="text-base font-semibold text-gray-900"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {name}
            </h3>
            <p className="text-xs font-semibold text-[#7ccd54] mt-0.5 uppercase tracking-wider">
              {title}
            </p>
          </div>
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-gray-400 hover:text-[#7ccd54] transition-colors mt-0.5"
              aria-label={`${name} on LinkedIn`}
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          )}
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="flex flex-col">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#1a3a1f] overflow-hidden py-28 lg:py-40">
        <MagicDotPattern
          glow
          width={32}
          height={32}
          cr={1}
          className="text-[#7ccd54]/[0.10] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_40%,transparent_100%)]"
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#7ccd54]/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <div className="inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#7ccd54] mb-8 border border-[#7ccd54]/20 uppercase">
            Our Story
          </div>
          <h1
            className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl text-balance leading-[1.15] mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Redefining mobility through{" "}
            <span className="text-[#7ccd54]">human–machine collaboration.</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10">
            At Flo Mobility, autonomy means more than self-driving robots. It
            means leveraging sensors, computer vision, edge computing, and
            intelligent actuators to optimise how humans and machines work
            together — delivering speed, safety, and control at scale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#7ccd54] text-gray-900 font-semibold hover:bg-[#5ba83d] transition-colors duration-200"
            >
              Join the Team
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/channel-partner"
              className="px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors duration-200"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. MISSION + PHOTOS ─────────────────────────────────────────────── */}
      <section className="bg-[#fdfcf0] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Left — mission text + values */}
            <div className="py-20 lg:py-28 lg:pr-16 xl:pr-20">
              <div className="mb-12">
                <div className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
                  Mission
                </div>
                <h2
                  className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl mb-3"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Built on principles that don't bend.
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We believe the best autonomous systems are the ones that earn
                  trust — from operators on the ground to executives in the
                  boardroom.
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                {MISSION_VALUES.map((v, i) => (
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
                        {v.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — photo grid */}
            <div className="grid grid-rows-2 min-h-[480px] lg:min-h-0 gap-1">
              <div className="relative overflow-hidden">
                <Image
                  src="/about/showcase.jpg"
                  alt="Flo Mobility robotics showcase"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f0f]/30 to-transparent" />
              </div>
              <div className="relative overflow-hidden">
                <Image
                  src="/about/g20.jpg"
                  alt="Flo Mobility at G20 Summit, Gandhinagar 2023"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-[#0f1f0f]/30 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
                    G20 Summit — Gandhinagar, 2023
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. BY THE NUMBERS ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white px-8 py-10 text-center"
              >
                <div
                  className="text-4xl font-semibold text-gray-900 mb-1 sm:text-5xl"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CORE TEAM ────────────────────────────────────────────────────── */}
      <section className="bg-[#fdfcf0] py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
              Leadership
            </div>
            <h2
              className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              The team driving the mission.
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Serial founders, operators, and engineers who've built and scaled
              technology businesses across India and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {CORE_TEAM.map((member) => (
              <PersonCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CHANNEL PARTNERS ─────────────────────────────────────────────── */}
      <section className="bg-white py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-block rounded-full bg-[#fdfcf0] px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
              Partners
            </div>
            <h2
              className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Trusted partners driving regional growth.
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our channel partners bring deep industry expertise and local market
              presence — expanding Flo's reach one deployment at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {CHANNEL_PARTNERS.map((partner) => (
              <PersonCard key={partner.name} {...partner} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/channel-partner"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-sm font-semibold text-gray-700 hover:border-[#7ccd54]/50 hover:text-[#5ba83d] transition-colors duration-200"
            >
              Become a channel partner
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#1a3a1f] py-20 lg:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(124,205,84,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-[#7ccd54]/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <div className="inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#7ccd54] mb-8 border border-[#7ccd54]/20 uppercase">
            Join Us
          </div>
          <h2
            className="text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl text-balance mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Help us build the future of autonomous work.
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you're an engineer, an operator, or a business leader —
            there's a place for you in the Flo ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#7ccd54] text-gray-900 font-semibold hover:bg-[#5ba83d] transition-colors duration-200"
            >
              View Open Roles
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
