'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ExperienceLoader } from '@/components/loading/loader';

const TOTAL_SCROLL_DISTANCE = 5900;
const EXPAND_END = 800;
const TEXT_FADE_START = 300;
const TEXT_FADE_END = 700;
const MOBILE_FADE_END = 200;
const VIDEO_FPS = 60;
const VIDEO_SRC = 'hero_scroll_v2.webm';

interface HeroCopyProps {
  tone?: 'light' | 'dark';
}

function HeroCopy({ tone = 'dark' }: HeroCopyProps) {
  const isLight = tone === 'light';
  const headingClass = isLight ? 'text-white' : 'text-[#191c1a]';
  const highlightClass = isLight ? 'text-[#7ccd54]' : 'text-[rgba(4,104,37,0.86)]';
  const bodyClass = isLight ? 'text-white/80' : 'text-[rgba(25,28,26,0.5)]';
  const ruleClass = isLight ? 'bg-white/20' : 'bg-[rgba(25,28,26,0.12)]';
  const secondaryClass = isLight
    ? 'border-white/30 text-white hover:border-white/50'
    : 'border-[rgba(25,28,26,0.18)] text-[#191c1a] hover:border-[rgba(25,28,26,0.34)]';

  return (
    <div className="relative z-10 flex h-full flex-col justify-center px-6 pt-24 sm:px-14 md:max-w-[52vw] lg:px-20 xl:px-24">
      <div className="absolute top-[15%] bottom-[15%] left-0 w-[3px] rounded-full bg-[linear-gradient(to_bottom,transparent,#7ccd54_25%,#7ccd54_75%,transparent)]" />

      <div className="mb-8">
        <div className="overflow-visible">
          <h1
            className={`text-5xl leading-none font-black md:text-6xl lg:text-7xl xl:text-8xl ${headingClass}`}
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Robots for
          </h1>
        </div>
        <div className="overflow-visible">
          <h1
            className={`text-5xl leading-none font-black md:text-6xl lg:text-7xl xl:text-8xl ${highlightClass}`}
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Construction
          </h1>
        </div>
        <div className="overflow-visible">
          <h1
            className={`text-5xl leading-none font-black md:text-6xl lg:text-7xl xl:text-8xl ${headingClass}`}
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Sites.
          </h1>
        </div>
      </div>

      <div className={`mb-7 h-px max-w-[400px] ${ruleClass}`} />

      <p
        className={`mb-7 max-w-[800px] text-xl leading-8 ${bodyClass}`}
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        Enabling Contractors & Developers to build{' '}
        <span className={`font-bold ${highlightClass} uppercase`}>FASTER</span>, reduce{' '}
        <span className={`font-bold uppercase ${highlightClass}`}>LABOUR DEPENDENCY</span>{' '}
        and improve{' '}
        <span className={`font-bold ${highlightClass} uppercase`}>PRODUCTIVITY</span>
      </p>

      <div className="pointer-events-auto mb-10 flex flex-wrap items-center gap-3">
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-[#7ccd54] px-[clamp(1.125rem,1.5vw,2rem)] py-[clamp(0.7rem,0.8vw,1rem)] text-[clamp(0.75rem,0.68rem_+_0.32vw,0.9375rem)] font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-md"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          Request a Demo
          <ArrowRight
            className="h-[clamp(0.875rem,1vw,1rem)] w-[clamp(0.875rem,1vw,1rem)]"
            aria-hidden="true"
          />
        </a>
        <a
          href="/offerings/material-movement"
          className={`inline-flex items-center gap-1.5 rounded-full border px-[clamp(1.125rem,1.5vw,2rem)] py-[clamp(0.7rem,0.8vw,1rem)] text-[clamp(0.75rem,0.68rem_+_0.32vw,0.9375rem)] font-semibold transition-all duration-300 ${secondaryClass}`}
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          Explore Solutions
          <ArrowRight
            className="h-[clamp(0.875rem,1vw,1rem)] w-[clamp(0.875rem,1vw,1rem)] -rotate-45"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(25,28,26,0.15)]">
        <ChevronDown className="h-4 w-4 text-[rgba(25,28,26,0.35)]" aria-hidden="true" />
      </div>
      <span
        className="text-[10px] font-semibold tracking-[0.18em] text-[rgba(25,28,26,0.3)] uppercase"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        Scroll to explore
      </span>
    </div>
  );
}

export function HeroGsapScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const desktopCopyRef = useRef<HTMLDivElement>(null);
  const mobileCopyRef = useRef<HTMLDivElement>(null);
  const desktopIndicatorRef = useRef<HTMLDivElement>(null);
  const mobileIndicatorRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    async function setupScrollVideo() {
      const video = videoRef.current;
      const section = sectionRef.current;
      const panel = panelRef.current;
      const desktopCopy = desktopCopyRef.current;
      const mobileCopy = mobileCopyRef.current;
      const desktopIndicator = desktopIndicatorRef.current;
      const mobileIndicator = mobileIndicatorRef.current;

      if (!video || !section || !panel || !desktopCopy || !mobileCopy) return;

      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      await new Promise<void>((resolve) => {
        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
          resolve();
          return;
        }

        video.addEventListener('loadedmetadata', () => resolve(), { once: true });
      });

      if (cancelled) return;

      video.pause();
      video.currentTime = 0;
      setReady(true);

      const duration = video.duration || 24;
      const playhead = { time: 0 };
      const frameDuration = 1 / VIDEO_FPS;

      // Lenis → ScrollTrigger sync: fire ScrollTrigger.update on every Lenis
      // scroll tick so both read the same position. scrub: true means GSAP
      // adds zero extra smoothing — Lenis already handles all easing.
      window.floLenis?.on('scroll', ScrollTrigger.update);

      const context = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${TOTAL_SCROLL_DISTANCE}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(
          playhead,
          {
            duration: 1,
            time: duration,
            onUpdate: () => {
              const snappedTime = Math.min(
                duration,
                Math.round(playhead.time / frameDuration) * frameDuration,
              );

              if (Math.abs(video.currentTime - snappedTime) >= frameDuration * 0.5) {
                video.currentTime = snappedTime;
              }
            },
          },
          0,
        );

        timeline.to(
          panel,
          {
            duration: EXPAND_END / TOTAL_SCROLL_DISTANCE,
            left: '0%',
          },
          0,
        );

        timeline.to(
          desktopCopy,
          {
            duration: (TEXT_FADE_END - TEXT_FADE_START) / TOTAL_SCROLL_DISTANCE,
            opacity: 0,
            x: -50,
            clipPath: 'inset(0 100% 0 0)',
          },
          TEXT_FADE_START / TOTAL_SCROLL_DISTANCE,
        );

        timeline.to(
          mobileCopy,
          {
            duration: MOBILE_FADE_END / TOTAL_SCROLL_DISTANCE,
            opacity: 0,
            x: -20,
            clipPath: 'inset(0 100% 0 0)',
          },
          0,
        );

        if (desktopIndicator) {
          timeline.fromTo(
            desktopIndicator,
            { opacity: 1 },
            {
              duration: (TEXT_FADE_END - TEXT_FADE_START) / TOTAL_SCROLL_DISTANCE,
              opacity: 0,
            },
            TEXT_FADE_START / TOTAL_SCROLL_DISTANCE,
          );
        }

        if (mobileIndicator) {
          timeline.to(
            mobileIndicator,
            {
              duration: MOBILE_FADE_END / TOTAL_SCROLL_DISTANCE,
              opacity: 0,
            },
            0,
          );
        }

        ScrollTrigger.refresh();
      }, section);

      cleanup = () => {
        window.floLenis?.off('scroll', ScrollTrigger.update);
        context.revert();
      };
    }

    setupScrollVideo();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#f5f5f5]"
    >
      <AnimatePresence>
        {!ready && (
          <ExperienceLoader
            key="gsap-hero-loader"
            progress={70}
            detail="Preparing scroll video..."
          />
        )}
      </AnimatePresence>

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #191c1a18 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div
        ref={panelRef}
        className="hero-video-panel pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-10 md:left-[52%]"
        style={{ willChange: 'transform' }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          aria-label="Flo robot scroll animation"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      <div
        ref={desktopCopyRef}
        className="absolute inset-0 z-20 hidden h-full md:block"
        style={{ clipPath: 'inset(0 48% 0 0)' }}
      >
        <HeroCopy />
      </div>

      <div ref={mobileCopyRef} className="absolute inset-0 z-20 md:hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/20" />
        <HeroCopy tone="light" />
      </div>

      <motion.div
        ref={desktopIndicatorRef}
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-8 left-14 z-30 hidden md:block lg:left-20 xl:left-24"
      >
        <ScrollIndicator />
      </motion.div>

      <motion.div
        ref={mobileIndicatorRef}
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-8 left-8 z-30 flex md:hidden"
      >
        <ScrollIndicator />
      </motion.div>

      <button
        type="button"
        onClick={() => {
          const target = document.querySelector<HTMLElement>('.hero-skip-target');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            return;
          }

          window.scrollTo({
            top: TOTAL_SCROLL_DISTANCE + window.innerHeight,
            behavior: 'smooth',
          });
        }}
        className="absolute right-8 bottom-8 z-40 inline-flex items-center gap-2 rounded-full border border-[rgba(40,108,0,0.35)] bg-white/75 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#286c00] uppercase backdrop-blur-md transition-all duration-300 hover:scale-105 md:right-14 md:text-xs lg:right-20 xl:right-24"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        <span className="hidden md:inline">Skip animation</span>
        <span className="md:hidden">Skip</span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </button>
    </section>
  );
}
