"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScroll, useTransform, motion, type Variants } from "framer-motion";
import { HERO_CONTENT } from "@/lib/constants";

// ─── Types ──────────────────────────────────────────────────────────────────

interface HeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  videoSrc?: string;
  ctaText?: string;
  ctaHref?: string;
}

// ─── Motion variants ──────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Hero({
  badge,
  title = HERO_CONTENT.title,
  subtitle = HERO_CONTENT.subtitle,
  videoSrc = "/hero-video.mp4",
  ctaText = HERO_CONTENT.cta.primary.text,
  ctaHref = HERO_CONTENT.cta.primary.href,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const mediaScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.04]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-[95dvh] overflow-hidden bg-white"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: mediaY, scale: mediaScale }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Left to right gradient - white fading to transparent to show video on right */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/70 via-35% to-transparent" />
      </motion.div>

      <div className="relative z-10 flex min-h-[90dvh] w-full items-end pb-20 pt-28 px-8 sm:px-12 lg:px-20 xl:px-24 sm:items-center sm:pb-0">
        <motion.div
          className="relative z-20 w-full max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1
            className="mb-6 leading-[1.15] tracking-tight text-gray-900 font-bold"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(1.75rem, 4vw + 1rem, 3rem)",
            }}
            aria-label={title}
          >
            {title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                aria-hidden="true"
                className={
                  word.toLowerCase() === "autonomous" ||
                  word.toLowerCase() === "possible"
                    ? "inline-block text-primary"
                    : "inline-block"
                }
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </h1>

          {subtitle && (
            <motion.p
              variants={itemVariants}
              className="mb-10 max-w-2xl text-[clamp(1.125rem,0.6vw+1rem,1.5rem)] leading-relaxed text-gray-700 font-light"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-2xl hover:scale-105 uppercase tracking-wide"
            >
              {ctaText}
            </Link>
            <span className="text-base text-gray-700 max-w-xs leading-relaxed font-medium">
              Built for high-throughput construction and industrial
              environments.
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
