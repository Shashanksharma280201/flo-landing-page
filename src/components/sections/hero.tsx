"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, type Variants } from "framer-motion";
import { HERO_CONTENT } from "@/lib/constants";
import { VideoPlayer } from "@/components/shared/video-player";

// ─── Types ──────────────────────────────────────────────────────────────────

interface HeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  videoId?: string;
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
  badge = "Now Deploying Across India",
  title = HERO_CONTENT.title,
  subtitle = HERO_CONTENT.subtitle,
  videoId = "KMTNnYjulQE",
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Video: Expands as the user scrolls down the first 40% of the section
  const videoScale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);
  const videoBorderRadius = useTransform(scrollYProgress, [0, 0.4], ["20px", "12px"]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-background min-h-[100dvh] flex flex-col items-center pt-32 pb-20 overflow-hidden"
    >
      {/* Ambient Glow & Grid */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(124,205,84,0.22) 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 65% 55% at 50% 10%, #000 60%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 10%, #000 60%, transparent 100%)",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      {/* Text content */}
      <motion.div
        className="relative z-20 w-full text-center px-4 mb-12"
      >
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {badge && (
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary border border-primary/20 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {badge}
              </span>
            </motion.div>
          )}

          <h1
            className="text-3xl font-medium tracking-tight text-gray-900 sm:text-5xl lg:text-6xl text-balance leading-[1.2] mb-5"
            style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 500 }}
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
                    ? "font-semibold text-primary inline-block"
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
              className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </motion.div>

      {/* Video Expansion (Scroll-driven) */}
      <motion.div
        className="relative w-[92%] lg:w-[70vw] will-change-transform"
        style={{
          scale: videoScale,
          borderRadius: videoBorderRadius,
        }}
      >
        {/* Shadow Layer */}
        <div 
          className="absolute inset-0 rounded-[inherit] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.05)] pointer-events-none"
        />
        
        <div className="relative overflow-hidden rounded-[inherit] aspect-video bg-gray-100">
          <VideoPlayer
            videoId={videoId}
            title="Flo Mobility Autonomous Robots"
            className="h-full w-full"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
