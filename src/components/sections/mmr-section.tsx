"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const MMR_IMAGES = [
  {
    src: "/mmr-images/mmr-images-1.jpg",
    alt: "MMR Image 1",
    text: "Autonomous Material Movement Bot designed for factory floors and warehouses.",
  },
  {
    src: "/mmr-images/mmr-images-2.jpg",
    alt: "MMR Image 2",
    text: "Precision navigation in dynamic environments with zero infrastructure changes.",
  },
  {
    src: "/mmr-images/mmr-images-3.jpg",
    alt: "MMR Image 3",
    text: "Robust payload capacity and all-day operation with smart charging.",
  },
  {
    src: "/mmr-images/mmr-images-1.jpg",
    alt: "MMR Image 4",
    text: "Fleet-ready architecture that scales from one robot to hundreds across sites.",
  },
];

const TOTAL = MMR_IMAGES.length;

// Per-card scale when 0, 1, 2, 3 cards are stacked above it
const SCALE_STEPS = [1, 0.95, 0.91, 0.87] as const;
// Y offset (px) for each depth level — shifts buried cards up to show the stack
const Y_STEPS = [0, -20, -38, -54] as const;
// Dark overlay opacity at each depth level
const OVERLAY_STEPS = [0, 0.18, 0.34, 0.48] as const;

// ─── Shared card visual ────────────────────────────────────────────────────────

function CardInner({
  item,
  overlayOpacity,
  priority,
}: {
  item: (typeof MMR_IMAGES)[0];
  overlayOpacity?: MotionValue<number>;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-100 shadow-2xl">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover"
        priority={priority}
      />

      {/* Dim overlay — desktop only (not present in mobile static list) */}
      {overlayOpacity && (
        <motion.div
          className="absolute inset-0 bg-[#0f1f0f] pointer-events-none z-5"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Bottom text strip — white fade, no blur */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-16 sm:px-7 sm:pb-7 sm:pt-20 bg-gradient-to-t from-white via-white/80 to-transparent">
        <p
          className="text-[#5ba83d] font-semibold leading-relaxed text-sm sm:text-base"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {item.text}
        </p>
      </div>
    </div>
  );
}

// ─── Desktop: animated stack card ─────────────────────────────────────────────

function StackCard({
  item,
  index,
  progress,
}: {
  item: (typeof MMR_IMAGES)[0];
  index: number;
  progress: MotionValue<number>;
}) {
  const enterAt = index / TOTAL;

  const slideY = useTransform(
    progress,
    index === 0
      ? [0, 1]
      : [Math.max(0, enterAt - 0.1), enterAt],
    index === 0 ? [0, 0] : [900, 0],
  );

  const scaleInputs: number[] = [];
  const scaleOutputs: number[] = [];
  for (let j = index; j < TOTAL; j++) {
    scaleInputs.push(j === 0 ? 0 : j / TOTAL);
    scaleOutputs.push(SCALE_STEPS[j - index] ?? SCALE_STEPS[SCALE_STEPS.length - 1]);
  }
  scaleInputs.push(1);
  scaleOutputs.push(scaleOutputs[scaleOutputs.length - 1]);

  const scale = useTransform(progress, scaleInputs, scaleOutputs);

  const yOffsets: number[] = scaleInputs.map((_, k) =>
    Y_STEPS[Math.min(k, Y_STEPS.length - 1)] as number,
  );
  const yDepth = useTransform(progress, scaleInputs, yOffsets);

  const y = useTransform(
    [slideY, yDepth] as MotionValue<number>[],
    (values: number[]) => values[0] + values[1],
  );

  const overlayOutputs: number[] = scaleInputs.map((_, k) =>
    OVERLAY_STEPS[Math.min(k, OVERLAY_STEPS.length - 1)] as number,
  );
  const overlayOpacity = useTransform(progress, scaleInputs, overlayOutputs);

  return (
    <motion.div
      className="absolute left-0 right-0 flex justify-center px-6 lg:px-10"
      style={{
        top: "10vh",
        zIndex: index + 1,
        y,
        scale,
        transformOrigin: "top center",
      }}
    >
      <div className="w-full max-w-[70vw]">
        <CardInner
          item={item}
          overlayOpacity={overlayOpacity}
          priority={index === 0}
        />
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function MmrSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      {/* ── Mobile: plain vertical list, no animation ── */}
      <section className="lg:hidden bg-white py-16 px-4 sm:px-6">
        <div className="flex flex-col gap-6">
          {MMR_IMAGES.map((item, index) => (
            <div key={index} className="w-full">
              <CardInner item={item} priority={index === 0} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Desktop: sticky scroll-driven card stack ── */}
      <section
        ref={sectionRef}
        className="relative bg-white hidden lg:block"
        style={{ height: "500vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {MMR_IMAGES.map((item, index) => (
            <StackCard
              key={index}
              item={item}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </section>
    </>
  );
}
