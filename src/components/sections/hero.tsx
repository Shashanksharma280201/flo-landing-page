'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useScroll, useTransform, motion, type Variants } from 'framer-motion';
import { MagicDotPattern } from '@/components/ui/magicui-dot-pattern';
import { HERO_CONTENT } from '@/lib/constants';

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
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Hero({
  badge,
  title = HERO_CONTENT.title,
  subtitle = HERO_CONTENT.subtitle,
  videoSrc = '/hero-video.mp4',
  ctaText = HERO_CONTENT.cta.primary.text,
  ctaHref = HERO_CONTENT.cta.primary.href,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={sectionRef}
      className="10goverflow-hidden relative z-20 min-h-screen bg-black"
    >
      {/* Background Video - Clear and visible */}
      <motion.div className="absolute inset-0" style={{ y: mediaY }}>
        <video autoPlay loop muted playsInline className="h-full w-full object-cover">
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </motion.div>

      {/* Content Container - Bottom positioned */}
      <div className="relative z-10 flex min-h-screen w-full items-end justify-center px-6 pb-20 sm:px-8 lg:px-16 lg:pb-24 xl:px-24">
        <motion.div
          className="w-full max-w-7xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-5xl leading-[1.15] font-medium tracking-tight text-balance break-words text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {title.split(/(construction)/i).map((part, i) => {
              const isHighlight = part.toLowerCase() === 'construction';
              return isHighlight ? (
                <span
                  key={i}
                  className="inline [box-decoration-break:clone] text-[#7ccd54] [-webkit-box-decoration-break:clone]"
                >
                  {part}
                </span>
              ) : (
                part
              );
            })}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-4xl text-xl leading-relaxed text-white sm:text-2xl lg:text-3xl"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-[#7ccd54] px-10 py-5 text-base font-semibold text-gray-900 shadow-lg transition-colors duration-200 hover:bg-[#5ba83d] lg:text-lg"
            >
              Request a Demo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href={ctaHref}
              className="rounded-full border border-white/30 px-10 py-5 text-base font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10 lg:text-lg"
            >
              {ctaText}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
