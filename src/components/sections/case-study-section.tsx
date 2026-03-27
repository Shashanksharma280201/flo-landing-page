import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import { MagicDotPattern } from "@/components/ui/magicui-dot-pattern";

interface CaseStudyStat {
  value: string;
  label: string;
}

interface FeaturedCaseStudy {
  eyebrow: string;
  title: string;
  summary: string;
  image: string;
  href: string;
  hrefLabel: string;
  stats: CaseStudyStat[];
  proofPoints: string[];
}

interface SupportingCaseStudy {
  eyebrow: string;
  title: string;
  summary: string;
  image: string;
  href: string;
  hrefLabel: string;
  stats: CaseStudyStat[];
  icon: typeof TrendingUp;
}

const PROOF_PILLS = [
  { value: "50%", label: "lower cost & time" },
  { value: "30%", label: "fewer accidents" },
  { value: "6x", label: "efficiency gain" },
];

const FEATURED_CUSTOMERS = [
  { name: "L&T", logo: "/customers/LT.png" },
  { name: "PSP Projects", logo: "/customers/PSP-Projects.png" },
  { name: "Total Environment", logo: "/customers/Total-environment-2.png" },
];

const FEATURED_CASE_STUDY: FeaturedCaseStudy = {
  eyebrow: "Material Movement",
  title: "50% lower cost and time on last-mile material movement",
  summary:
    "Across active construction deployments, Flo's autonomous hauler replaces repetitive site transport with predictable, trackable movement that scales without fresh capex. Flo's public materials point to usage across large construction contractors including L&T, PSP Projects, Sobha, Capacite Infra, and Total Environment, where the system is positioned to reduce movement cost and time by up to 50% while improving site safety. With 500-700 kg payload handling, route-level fleet visibility, and commissioning that can begin in under a day, the product is built for real site logistics rather than controlled pilot environments.",
  image: "/mmr-images/mmr-images-1.jpg",
  href: "/offerings/material-movement",
  hrefLabel: "Explore Material Movement",
  stats: [
    { value: "50%", label: "cost reduction" },
    { value: "50%", label: "time saved" },
    { value: "30%", label: "fewer accidents" },
  ],
  proofPoints: [
    "500-700 kg payload capacity for dense site runs",
    "Commissioning can start in under a day",
    "Fleet visibility and route tracking built in",
  ],
};

const SUPPORTING_CASE_STUDIES: SupportingCaseStudy[] = [
  {
    eyebrow: "Project Progress AI",
    title: "Daily progress visibility without manual dumper counting",
    summary:
      "Flo's camera-based detection work turns movement on site into structured reporting, with automated counts, timestamps, and operational alerts.",
    image: "/blog/yolov8-cover.png",
    href: "https://flomobility.com/transforming-construction-site-efficiency-with-ai-a-detailed-look-at-a-yolov8-based-object-detection-and-tracking-model/",
    hrefLabel: "Read Case Study",
    stats: [
      { value: "1080p", label: "camera feed" },
      { value: "23 fps", label: "processing stream" },
      { value: "Daily", label: "summary reports" },
    ],
    icon: TrendingUp,
  },
  {
    eyebrow: "Safety Monitoring",
    title: "Timestamped PPE alerts for faster site intervention",
    summary:
      "The safety system detects missing helmets, vests, and masks in real time, records breach evidence, and surfaces trends before incidents compound.",
    image: "/blog/safety-ai-cover.jpg",
    href: "https://flomobility.com/ensuring-safety-and-efficiency-on-construction-sites-with-ai/",
    hrefLabel: "Read Case Study",
    stats: [
      { value: "GPS", label: "location tagging" },
      { value: "Live", label: "manager alerts" },
      { value: "Trend", label: "violation analysis" },
    ],
    icon: ShieldCheck,
  },
];

export function CaseStudySection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-20">
      <MagicDotPattern
        glow
        width={36}
        height={36}
        cr={1}
        className="text-[#7ccd54]/[0.14] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_50%,#000_35%,transparent_100%)]"
      />
      <div className="pointer-events-none absolute left-[-6rem] top-12 h-72 w-72 rounded-full bg-[#7ccd54]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-[-8rem] h-80 w-80 rounded-full bg-[#1a3a1f]/8 blur-[140px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7ccd54]/25 bg-[#7ccd54]/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#5ba83d]">
              <Zap className="h-3.5 w-3.5" />
              Proof of Work
            </div>
            <h2
              className="max-w-3xl text-[clamp(2rem,4vw,3.6rem)] font-bold leading-[1.02] tracking-tight text-gray-900"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Case studies that make the business case before the sales call.
            </h2>
          </div>

          <div className="space-y-4">
            <p className="max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Flo is already being used across construction deployments for
              material movement, progress visibility, and safety monitoring.
              This section turns that work into sharp proof, not generic
              marketing claims.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {PROOF_PILLS.map((pill) => (
                <div
                  key={pill.label}
                  className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                >
                  <div
                    className="text-xl font-bold text-[#9be06d]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {pill.value}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{pill.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.14fr)_minmax(18rem,0.72fr)]">
          <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={FEATURED_CASE_STUDY.image}
                alt={FEATURED_CASE_STUDY.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102012]/90 via-[#102012]/20 to-transparent" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0f1d10]/76 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#9be06d] backdrop-blur-sm">
                <TrendingUp className="h-3.5 w-3.5" />
                {FEATURED_CASE_STUDY.eyebrow}
              </div>
            </div>

            <div className="flex flex-1 flex-col space-y-4 p-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {FEATURED_CUSTOMERS.map((customer) => (
                  <div
                    key={customer.name}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2"
                  >
                    <div className="relative h-5 w-14 shrink-0">
                      <Image
                        src={customer.logo}
                        alt={customer.name}
                        fill
                        className="object-contain"
                        sizes="56px"
                      />
                    </div>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gray-700">
                      {customer.name}
                    </span>
                  </div>
                ))}
              </div>

              <div>
                <h3
                  className="text-[1.65rem] font-bold leading-tight text-gray-900"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {FEATURED_CASE_STUDY.title}
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-gray-600">
                  {FEATURED_CASE_STUDY.summary}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {FEATURED_CASE_STUDY.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-gray-200 bg-[#f8fcf4] px-3 py-3"
                  >
                    <div
                      className="text-lg font-bold text-[#7ccd54]"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {stat.value}
                    </div>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-gray-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <ul className="space-y-2 border-t border-gray-200 pt-4 text-sm text-gray-600">
                {FEATURED_CASE_STUDY.proofPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7ccd54]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-2">
                <Link
                  href={FEATURED_CASE_STUDY.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-[#5ba83d]"
                >
                  {FEATURED_CASE_STUDY.hrefLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>

          <div className="grid gap-4">
            {SUPPORTING_CASE_STUDIES.map((caseStudy) => {
              const Icon = caseStudy.icon;

              return (
                <article
                  key={caseStudy.title}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_18px_48px_rgba(0,0,0,0.08)]"
                >
                  <div className="relative aspect-[16/8] overflow-hidden">
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 34vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102012]/90 via-[#102012]/20 to-transparent" />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#0f1d10]/76 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#9be06d] backdrop-blur-sm">
                      <Icon className="h-3.5 w-3.5" />
                      {caseStudy.eyebrow}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col space-y-4 p-4 sm:p-5">
                    <div>
                      <h3
                        className="text-[1.35rem] font-bold leading-tight text-gray-900"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {caseStudy.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {caseStudy.summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      {caseStudy.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-2xl border border-gray-200 bg-[#f8fcf4] px-3 py-3"
                        >
                          <div
                            className="text-base font-bold text-[#7ccd54]"
                            style={{ fontFamily: "var(--font-space-grotesk)" }}
                          >
                            {stat.value}
                          </div>
                          <p className="mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-gray-500">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-2">
                      <Link
                        href={caseStudy.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-[#5ba83d]"
                      >
                        {caseStudy.hrefLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
