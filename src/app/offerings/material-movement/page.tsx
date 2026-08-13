'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ShieldCheck,
  Zap,
  Truck,
  Battery,
  Cpu,
  LineChart,
} from 'lucide-react';
import { TrackedYouTubeIframe } from '@/components/shared/tracked-youtube-iframe';

// ─── Design tokens — FLO brand light theme ───────────────────────────────────
const BG = '#ffffff';
const BG2 = '#f5f5f5';
const GREEN = '#7ccd54';
const GREEN_D = '#286c00';
const TEXT = '#191c1a';
const MUTED = 'rgba(25,28,26,0.55)';
const DIM = 'rgba(25,28,26,0.15)';
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Shared animation primitives ─────────────────────────────────────────────

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
        className="text-sm font-bold tracking-[0.26em] whitespace-nowrap uppercase"
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

// ─── YouTube embed with thumbnail play ───────────────────────────────────────

function VideoEmbed({
  videoId,
  title,
  startSeconds = 0,
}: {
  videoId: string;
  title: string;
  startSeconds?: number;
}) {
  const startParam = startSeconds > 0 ? `&start=${Math.floor(startSeconds)}` : '';

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-2xl border"
      style={{ borderColor: DIM }}
    >
      <TrackedYouTubeIframe
        videoId={videoId}
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0${startParam}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

// ─── Section 1 — Hero ────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="mt-[40px] w-full px-6 pt-24 pb-0 md:px-16 md:pt-28 lg:px-24 xl:px-32"
      style={{ background: BG2 }}
    >
      <div className="align-start grid items-center gap-10 pb-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-14">
        {/* Left — text */}
        <div>
          {/* Headline */}
          <div className="mb-8">
            <RevealText>
              <h1
                className="text-[clamp(2.75rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Any Material
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
                All Terrain
              </h1>
            </RevealText>
            <RevealText delay={0.12}>
              <h1
                className="text-[clamp(2.75rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Any Time
              </h1>
            </RevealText>
          </div>

          {/* Separator */}
          <FadeUp delay={0.2}>
            <div className="mb-8 h-px w-16" style={{ background: DIM }} />
          </FadeUp>

          {/* CTAs */}
          <FadeUp delay={0.35} className="mb-14 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full px-[clamp(1.125rem,1.5vw,2rem)] py-[clamp(0.7rem,0.8vw,1rem)] text-[clamp(0.75rem,0.68rem_+_0.32vw,0.9375rem)] font-bold tracking-wide uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: GREEN,
                color: '#fff',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              Request a Demo{' '}
              <ArrowRight className="h-[clamp(0.875rem,1vw,1rem)] w-[clamp(0.875rem,1vw,1rem)]" />
            </Link>
            {/* <a */}
            {/*   href="#features" */}
            {/*   className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-base font-bold transition-all duration-300 hover:bg-white" */}
            {/*   style={{ borderColor: DIM, color: TEXT, fontFamily: 'var(--font-dm-sans)' }} */}
            {/* > */}
            {/*   Explore Features <ChevronDown className="h-4 w-4" /> */}
            {/* </a> */}
          </FadeUp>
        </div>

        {/* Right — video */}
        <FadeUp delay={0.15} className="lg:-mr-4 xl:-mr-8">
          <VideoEmbed
            videoId="tjNgvmXFnTE"
            title="Flo Autonomous Material Mover"
            startSeconds={21}
          />
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Section 2 — Proof ticker ─────────────────────────────────────────────────

const TICKER = [
  { value: '6x', label: 'Efficiency Gain' },
  { value: '500 kg', label: 'Max Payload' },
  { value: '12°', label: 'Gradeability' },
  // { value: '<1 day', label: 'Deploy Time' },
  { value: '12 hours', label: 'Battery Life' },
  { value: '70+', label: 'Robots Deployed' },
  { value: '0', label: 'Emissions' },
  { value: '24/7', label: 'Operation' },
];

function ProofBar() {
  return (
    <section
      className="relative mt-0 w-full overflow-hidden border-t border-b"
      style={{ background: BG2, borderColor: DIM }}
    >
      <div className="pointer-events-none absolute inset-0 z-10">
        <div
          className="absolute top-0 bottom-0 left-0 w-24"
          style={{ background: `linear-gradient(to right, ${BG2} 60%, transparent)` }}
        />
        <div
          className="absolute top-0 right-0 bottom-0 w-24"
          style={{ background: `linear-gradient(to left, ${BG2} 60%, transparent)` }}
        />
      </div>
      <div className="animate-mmr-ticker flex items-center">
        {[...TICKER, ...TICKER, ...TICKER].map((m, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-6 border-r px-10 py-6"
            style={{ borderColor: DIM }}
          >
            <span
              className="text-3xl font-black tracking-tight tabular-nums"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              {m.value}
            </span>
            <span
              className="text-sm font-semibold tracking-[0.2em] whitespace-nowrap uppercase"
              style={{ color: MUTED }}
            >
              {m.label}
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes mmr-ticker {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .animate-mmr-ticker {
          animation: mmr-ticker 24s linear infinite;
          display: flex;
          width: max-content;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}

// ─── Section 3 — Capabilities ─────────────────────────────────────────────────

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Driverless Operation',
    body: 'Eliminates human error and optimises performance through advanced autonomous navigation. Remote Control option also available.',
  },
  {
    icon: Zap,
    title: 'Electric Power Train',
    body: 'Instant torque and uncompromised power for all terrains, with zero tailpipe emissions and precise control.',
  },
  {
    icon: Truck,
    title: 'Rugged Design',
    body: '4-Wheel Drive to handle tough and uneven terrain in any weather across construction sites',
  },
  {
    icon: Battery,
    title: 'Swappable Batteries',
    body: 'Easy to swap battery packs keep the robot running continuously across multiple shifts.',
  },
  {
    icon: Cpu,
    title: 'Sensor Based Intelligence',
    body: 'LiDAR + camera fusion delivers real-time spatial awareness, obstacle avoidance, and precise path following.',
  },
  {
    icon: LineChart,
    title: 'Low OpEx & Maintenance',
    body: 'Fewer moving parts, predictive diagnostics via Fleet Control, and periodic servicing reduce your total cost of ownership.',
  },
];

function FeatureCell({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[0];
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
    glowRef.current.style.background = `radial-gradient(ellipse 160% 130% at ${x}% ${y}%, ${GREEN}60 0%, ${GREEN}25 40%, rgba(255,255,255,0.06) 70%, transparent 85%)`;
    glowRef.current.style.opacity = '1';
  };
  const onLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  };

  return (
    <motion.div
      ref={ref}
      className="group relative flex cursor-default flex-col overflow-hidden border-r border-b p-6"
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
        style={{ opacity: 0, transition: 'opacity 0.35s ease' }}
      />
      {/* Top accent bar */}
      <div
        className="absolute top-0 right-0 left-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, ${GREEN}, ${GREEN}60)` }}
      />
      {/* Icon + Number row */}
      <div className="mb-4 flex items-center justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
          style={{ background: `${GREEN}18` }}
        >
          <feature.icon className="h-5 w-5" style={{ color: GREEN }} />
        </div>
        <span
          className="text-sm font-bold tracking-[0.24em] uppercase"
          style={{ color: DIM }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      {/* Title */}
      <h3
        className="mb-2 text-lg leading-snug font-black tracking-[-0.02em]"
        style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
      >
        {feature.title}
      </h3>
      {/* Body */}
      <p
        className="text-base leading-[1.75]"
        style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
      >
        {feature.body}
      </p>
    </motion.div>
  );
}

function CapabilitiesSection() {
  return (
    <section
      id="features"
      className="w-full border-t"
      style={{ background: BG, borderColor: DIM }}
    >
      <div className="w-full px-6 pt-16 pb-8 md:px-16 md:pt-32 md:pb-16 lg:px-24 xl:px-32">
        <SectionRule label="Capabilities" />
        <div className="grid items-end gap-16 lg:grid-cols-[1fr_420px]">
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.65rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Built for the hardest
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
                environments on earth.
              </h2>
            </RevealText>
          </div>
        </div>
      </div>

      {/* Terminal-style border grid */}
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

// ─── Section 4 — How It Works ─────────────────────────────────────────────────

const STEPS = [
  {
    number: '01',
    title: 'Deploy on Your Site',
    body: "Our team arrives, maps your site with LiDAR, and programmes the robot's routes. Typical commissioning takes less than a day.",
  },
  {
    number: '02',
    title: 'Monitor via Fleet Control',
    body: 'Track every robot in real time: speed, payload, battery level, and route deviations, from a single dashboard on any device.',
  },
  {
    number: '03',
    title: 'Scale as You Grow',
    body: 'Add more robots on demand. Our RaaS subscription means no large capex, just a predictable monthly cost that scales with your operation.',
  },
];

function StepRow({ step, i }: { step: (typeof STEPS)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
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
      className="w-full border-t px-6 py-20 md:px-16 md:py-40 lg:px-24 xl:px-32"
      style={{ background: BG2, borderColor: DIM }}
    >
      <SectionRule label="How It Works" />
      <div className="grid items-start gap-24 lg:grid-cols-[520px_1fr]">
        <div className="lg:sticky lg:top-32">
          <RevealText className="mb-1">
            <h2
              className="text-[clamp(2.6rem,5vw,5.75rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              Up and running
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
              in under
            </h2>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              className="text-[clamp(2.6rem,5vw,5.75rem)] leading-[0.96] font-black tracking-[-0.04em]"
              style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
            >
              a day.
            </h2>
          </RevealText>
          <FadeUp delay={0.3} className="mt-8">
            <p
              className="text-base leading-[1.85]"
              style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            >
              From site survey to first autonomous run. Our deployment process is designed
              to be fast, low-friction, and reversible.
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

// ─── Section 5 — Use Cases ────────────────────────────────────────────────────

const USE_CASES = [
  {
    label: 'Construction Sites',
    description:
      'Move concrete blocks, steel rebar, and aggregate between floors and work zones without manual labour.',
    image: '/mmr-images/mmr-images-1.avif',
    stat: '50%',
    statLabel: 'Labour cost saved',
  },
  {
    label: 'Mining Operations',
    description:
      'Navigate rugged underground terrain carrying ore, equipment, and supplies over steep grades up to 12°.',
    image: '/mmr-images/mmr-images-3.avif',
    stat: '20°',
    statLabel: 'Max grade handled',
  },
  {
    label: 'Warehousing & Logistics',
    description:
      'Automate repetitive internal transport runs, freeing your workforce for higher-value tasks.',
    image: '/mmr-images/mmr-images-2.avif',
    stat: '6x',
    statLabel: 'Efficiency gain',
  },
];

function UseCaseCard({ uc, index }: { uc: (typeof USE_CASES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border"
      style={{ borderColor: DIM }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 * index, ease: EASE }}
    >
      {/* Image with parallax */}
      <div className="relative h-64 overflow-hidden">
        <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
          <Image
            src={uc.image}
            alt={uc.label}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {/* Stat overlay */}
        <div className="absolute bottom-4 left-4">
          <div
            className="text-4xl leading-none font-black text-white"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            {uc.stat}
          </div>
          <div className="mt-1 text-sm font-semibold tracking-[0.2em] text-white/70 uppercase">
            {uc.statLabel}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-8" style={{ background: BG }}>
        <div
          className="mb-3 text-sm font-bold tracking-[0.22em] uppercase"
          style={{ color: DIM }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3
          className="mb-3 text-xl font-black tracking-[-0.02em]"
          style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
        >
          {uc.label}
        </h3>
        <p
          className="text-base leading-[1.85]"
          style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
        >
          {uc.description}
        </p>
      </div>
    </motion.div>
  );
}

// function UseCasesSection() {
//   return (
//     <section className="w-full border-t" style={{ background: BG, borderColor: DIM }}>
//       <div className="w-full px-6 pt-16 pb-12 md:px-16 md:pt-32 md:pb-24 lg:px-24 xl:px-32">
//         <SectionRule label="Where We Deploy" />
//         <div className="mb-20 grid items-end gap-16 lg:grid-cols-[1fr_400px]">
//           <div>
//             <RevealText className="mb-1">
//               <h2
//                 className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
//                 style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
//               >
//                 Built for every
//               </h2>
//             </RevealText>
//             <RevealText delay={0.06} className="mb-1">
//               <h2
//                 className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
//                 style={{
//                   color: 'rgba(4 104 37 / 0.86)',
//                   fontFamily: 'var(--font-dm-sans)',
//                 }}
//               >
//                 industrial
//               </h2>
//             </RevealText>
//             <RevealText delay={0.12}>
//               <h2
//                 className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.96] font-black tracking-[-0.04em]"
//                 style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
//               >
//                 environment.
//               </h2>
//             </RevealText>
//           </div>
//           <FadeUp delay={0.3} className="pb-2">
//             <div className="mb-8 h-10 w-px" style={{ background: GREEN }} />
//             <p
//               className="text-base leading-[1.85]"
//               style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
//             >
//               The Flo AMR has been field-tested across the three most demanding
//               material-handling sectors in India.
//             </p>
//           </FadeUp>
//         </div>
//
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//           {USE_CASES.map((uc, i) => (
//             <UseCaseCard key={uc.label} uc={uc} index={i} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// ─── Section 6 — Technical Specs ─────────────────────────────────────────────

const SPECS = [
  { label: 'Load Capacity', value: '500 - 1000 kgs' },
  { label: 'Dimensions', value: '1560mm x 850mm x 1172mm' },
  { label: 'Ground Clearance', value: '200mm' },
  { label: 'Max Speed', value: '5 km/h' },
  { label: 'Gradeability', value: '12°' },
  { label: 'Operational Runtime', value: '12 hours' },
  { label: 'Drive Train', value: '4-Wheel BLDC' },
  { label: 'Mode of Operations', value: 'Autonomous/Remote Controlled' },
  { label: 'Unloading', value: 'Hydraulic Tipper' },
];

function SpecsSection() {
  return (
    <section
      id="specs"
      className="w-full border-t"
      style={{ background: BG2, borderColor: DIM }}
    >
      <div className="w-full px-6 py-20 md:px-16 md:py-40 lg:px-24 xl:px-32">
        <SectionRule label="Technical Specifications" />
        <div className="grid items-start gap-24 lg:grid-cols-2">
          {/* Left — specs */}
          <div>
            <RevealText className="mb-1">
              <h2
                className="text-[clamp(2.35rem,5vw,5.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
              >
                Built to last.
              </h2>
            </RevealText>
            <RevealText delay={0.06} className="mb-12">
              <h2
                className="text-[clamp(2.35rem,5vw,5.5rem)] leading-[0.96] font-black tracking-[-0.04em]"
                style={{
                  color: 'rgba(4 104 37 / 0.86)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                Engineered to perform.
              </h2>
            </RevealText>

            {/* <FadeUp delay={0.15} className="mb-10"> */}
            {/*   <p */}
            {/*     className="max-w-md text-base leading-[1.85]" */}
            {/*     style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }} */}
            {/*   > */}
            {/*     Industrial-grade components designed for continuous operation across */}
            {/*     construction, mining, and warehouse environments. */}
            {/*   </p> */}
            {/* </FadeUp> */}

            {/* Specs table */}
            <div className="border-t" style={{ borderColor: DIM }}>
              {SPECS.map((spec, i) => (
                <FadeUp key={spec.label} delay={0.1 + i * 0.06}>
                  <div
                    className="flex items-center justify-between border-b py-5"
                    style={{ borderColor: DIM }}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className="w-6 shrink-0 text-sm font-bold"
                        style={{ color: DIM }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="text-base font-medium"
                        style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
                      >
                        {spec.label}
                      </span>
                    </div>
                    <span
                      className="text-base font-black tracking-[-0.01em]"
                      style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {spec.value}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Right — vertical image stack */}
          <FadeUp delay={0.2} className="lg:pt-24">
            <div className="flex flex-col gap-4">
              {['/mmr-images/mmr-images-1.avif', '/mmr-images/mmr-images-2.avif'].map(
                (src, i) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl border"
                    style={{ borderColor: DIM }}
                  >
                    <Image
                      src={src}
                      alt={`Material mover showcase ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                ),
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Section 7 — CTA ──────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      className="relative w-full overflow-hidden border-t px-6 py-24 md:px-16 md:py-48 lg:px-24 xl:px-32"
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
            className="mb-12 text-sm font-black tracking-[0.32em] uppercase"
            style={{ color: MUTED }}
          >
            Get started today
          </p>
        </FadeUp>
        <RevealText className="mb-1">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            Ready to
          </h2>
        </RevealText>
        <RevealText delay={0.05} className="mb-1">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: 'rgba(4 104 37 / 0.86)', fontFamily: 'var(--font-dm-sans)' }}
          >
            automate your
          </h2>
        </RevealText>
        <RevealText delay={0.1} className="mb-20">
          <h2
            className="text-[clamp(3.5rem,10vw,13rem)] leading-[0.94] font-black tracking-[-0.04em]"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            site?
          </h2>
        </RevealText>

        {/* <FadeUp delay={0.3}> */}
        {/*   <p */}
        {/*     className="mx-auto mb-12 max-w-xl text-lg leading-relaxed" */}
        {/*     style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }} */}
        {/*   > */}
        {/*     Talk to our team and get a deployment plan tailored to your worksite within 48 */}
        {/*     hours. No commitment required. */}
        {/*   </p> */}
        {/* </FadeUp> */}

        <FadeUp delay={0.4} className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 rounded-full px-12 py-5 text-base font-black shadow-lg transition-all duration-300 hover:scale-105"
            style={{
              background: GREEN,
              color: '#ffffff',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/offerings/fleet-control"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-12 py-5 text-base font-bold transition-all duration-300 hover:bg-white"
            style={{ borderColor: DIM, color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            Explore Fleet Control
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MaterialMovementPage() {
  return (
    <div className="w-full" style={{ color: TEXT, background: BG2 }}>
      <HeroSection />
      <ProofBar />
      <CapabilitiesSection />
      <SpecsSection />
      {/* <UseCasesSection /> */}
      {/* <ProcessSection /> */}
      <CTASection />
    </div>
  );
}
