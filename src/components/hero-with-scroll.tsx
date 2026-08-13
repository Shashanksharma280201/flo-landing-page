'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { ExperienceLoader } from '@/components/loading/loader';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
} from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 234;
const FRAME_PATH = '/frames7/frame_';
const FRAME_EXT = '.avif';
const FRAME_NUMBER_OFFSET = 1;
const INITIAL_PLAYABLE_FRAMES = 24;
const LOOKAHEAD_FRAMES = 18;
const LOOKBEHIND_FRAMES = 6;
const MAX_CONCURRENT_LOADS = 6;
const MAX_LOAD_RETRIES = 1;

// Total scroll space
const TOTAL_HEIGHT = 5900;
// Canvas panel expands from right-half to fullscreen over this many px
const EXPAND_END = 800;
// Hero text fades over this range (desktop)
const TEXT_FADE_START = 300;
const TEXT_FADE_END = 700;
// Hero text fades immediately on mobile (0 → 200 px)
const MOBILE_FADE_END = 200;

// ─── Hero inner content (shared; rendered in both mobile & desktop wrappers) ──
function HeroInner({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const isMobile = variant === 'mobile';

  return (
    <div
      className={
        isMobile
          ? 'mt-0 w-full px-4 pt-[calc(6.5rem+env(safe-area-inset-top))]'
          : 'mt-[12vh]'
      }
    >
      {/* Vertical accent line */}
      {!isMobile && (
        <motion.div
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[15%] bottom-[15%] left-0 w-[3px] rounded-full"
          style={{
            background:
              'linear-gradient(to bottom, transparent, #7ccd54 25%, #7ccd54 75%, transparent)',
          }}
        />
      )}

      <div
        className={
          isMobile
            ? 'relative z-10 w-full px-[clamp(0.9rem,4vw,1.25rem)]'
            : 'relative z-10 w-full px-6 pt-32 sm:px-14 sm:pt-36 md:max-w-[52vw] md:pt-44 lg:px-20 lg:pt-0 xl:px-24'
        }
      >
        {/* Headline — decorative animated lines. The semantic <h1> lives in the
            always-rendered root (HeroWithScroll) so it is present in the static
            HTML; these visible lines are aria-hidden to avoid a duplicate heading. */}
        <div
          aria-hidden="true"
          className={isMobile ? 'mb-[clamp(0.9rem,3.8vw,1.35rem)]' : 'mb-8'}
        >
          {(
            [
              { text: 'Autonomous', cls: 'hero-heading-dark' },
              { text: 'construction robots', cls: 'hero-heading-green' },
              { text: 'at scale.', cls: 'hero-heading-dark' },
            ] as const
          ).map(({ text, cls }, i) => (
            <div
              key={text}
              style={{
                clipPath: 'inset(-0.18em -0.08em -0.34em -0.08em)',
                overflow: 'visible',
                paddingBlock: '0.18em 0.34em',
                marginBlock: '-0.18em -0.34em',
              }}
            >
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 1.0,
                  delay: 0.08 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${cls} block leading-[0.98] font-black tracking-normal text-balance md:tracking-[-0.035em]`}
                style={{
                  fontSize: isMobile
                    ? 'clamp(2.25rem, 10.5vw, 3.4rem)'
                    : 'clamp(2.75rem, 6vw, 7rem)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                {text}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
          className={isMobile ? 'mb-[clamp(0.9rem,3.6vw,1.25rem)] h-px' : 'mb-7 h-px'}
          style={{
            background: isMobile ? 'rgba(255,255,255,0.18)' : 'rgba(25,28,26,0.12)',
          }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className={
            isMobile
              ? 'hero-body-text mb-[clamp(1rem,4vw,1.4rem)] max-w-[34ch] text-[clamp(0.92rem,3.8vw,1.08rem)] leading-[1.6] text-pretty [text-shadow:0px_0px_10px_rgba(0,0,0,0.1)]'
              : 'hero-body-text mb-7 text-[clamp(1rem,0.78rem_+_0.95vw,1.75rem)] leading-[1.85]'
          }
          style={{
            fontFamily: 'var(--font-dm-sans)',
            maxWidth: isMobile ? undefined : '600px',
          }}
        >
          Enabling contractors and Developers to build{' '}
          <b className="text-[#046825DB]">FASTER</b>, reduce{' '}
          <b className="text-[#046825DB]">LABOUR DEPENDENCY</b> and enhance{' '}
          <b className="text-[#046825DB]">PRODUCTIVITY</b>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className={
            isMobile
              ? 'pointer-events-auto mb-0 flex flex-wrap items-center gap-2.5'
              : 'pointer-events-auto mb-10 flex flex-wrap items-center gap-3'
          }
        >
          <a
            href="/contact"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-[clamp(1rem,4.2vw,1.5rem)] py-[clamp(0.65rem,2.8vw,0.85rem)] text-[clamp(0.78rem,3.2vw,0.92rem)] font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-md"
            style={{ background: '#7ccd54', fontFamily: 'var(--font-dm-sans)' }}
          >
            Request a Demo
            <svg
              className="h-[clamp(0.875rem,1vw,1rem)] w-[clamp(0.875rem,1vw,1rem)]"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M1.5 6h9M7 2.5l3.5 3.5L7 9.5"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="/offerings/material-movement"
            className="hero-btn-secondary inline-flex min-h-11 items-center gap-1.5 rounded-full border px-[clamp(1rem,4.2vw,1.5rem)] py-[clamp(0.65rem,2.8vw,0.85rem)] text-[clamp(0.78rem,3.2vw,0.92rem)] font-semibold transition-all duration-300"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Explore Solutions
            <svg
              className="h-[clamp(0.875rem,1vw,1rem)] w-[clamp(0.875rem,1vw,1rem)]"
              viewBox="0 0 11 11"
              fill="none"
            >
              <path
                d="M2 9L9 2M9 2H4M9 2v5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>

        {/* Stats strip */}
        {/* <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
          className="hero-border grid grid-cols-2 sm:flex items-stretch border-t border-b"
        >
          {[
            { val: "500kg", label: "Payload"   },
            { val: "24/7",  label: "Operation" },
            { val: "50+",   label: "Robots"    },
            { val: "0",     label: "Emissions" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`hero-border py-3 px-4 sm:py-4 ${i === 0 ? "sm:pr-6 sm:pl-0" : "sm:px-6"} ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b sm:border-b-0" : ""}`}
            >
              <div className="hero-stat-value text-base sm:text-lg font-black leading-none mb-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {s.val}
              </div>
              <div className="hero-stat-label text-[9px] font-semibold uppercase tracking-[0.2em]">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div> */}
      </div>
    </div>
  );
}

// ─── Scroll indicator ──────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      animate={{ y: [0, 5, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      className="flex items-center gap-2.5"
    >
      <div className="hero-scroll-icon flex h-7 w-7 items-center justify-center rounded-full border">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M5 1.5v7M2.5 6l2.5 2.5L7.5 6"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span
        className="hero-scroll-text text-[10px] font-semibold tracking-[0.18em] uppercase"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        Scroll to explore
      </span>
    </motion.div>
  );
}

// ─── ScrollContent ────────────────────────────────────────────────────────────
function ScrollContent({
  imagesRef,
  requestFrames,
  subscribeToFrameLoads,
  onFirstFrameRendered,
}: {
  imagesRef: React.MutableRefObject<(HTMLImageElement | null)[]>;
  requestFrames: (indices: number[], priority?: 'high' | 'low') => void;
  subscribeToFrameLoads: (listener: (index: number) => void) => () => void;
  onFirstFrameRendered: () => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef<number | null>(null);
  const firstFrameRenderedRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Canvas panel: starts right-half (52%) on desktop, expands to fullscreen over EXPAND_END px
  const panelLeft = useTransform(
    scrollYProgress,
    [0, EXPAND_END / TOTAL_HEIGHT],
    [52, 0],
    { clamp: true },
  );
  const panelLeftPct = useMotionTemplate`${panelLeft}%`;
  const heroClipRightDesktop = useTransform(panelLeft, (left) => 100 - left);
  const heroClipPathDesktop = useMotionTemplate`inset(0 ${heroClipRightDesktop}% 0 0)`;
  const heroRevealOpacityDesktop = useTransform(panelLeft, [0, 52], [0, 1], {
    clamp: true,
  });

  // Desktop: text remains selectable, then clips away in sync with the expanding canvas.
  const heroOpacityDesktop = useTransform(
    scrollYProgress,
    [TEXT_FADE_START / TOTAL_HEIGHT, TEXT_FADE_END / TOTAL_HEIGHT],
    [1, 0],
    { clamp: true },
  );
  const heroXDesktop = useTransform(
    scrollYProgress,
    [TEXT_FADE_START / TOTAL_HEIGHT, TEXT_FADE_END / TOTAL_HEIGHT],
    [0, -50],
    { clamp: true },
  );
  // Mobile: hero text + gradient fade immediately (0→200 px) so frames fill the screen cleanly
  const heroOpacityMobile = useTransform(
    scrollYProgress,
    [0, MOBILE_FADE_END / TOTAL_HEIGHT],
    [1, 0],
    { clamp: true },
  );
  const heroXMobile = useTransform(
    scrollYProgress,
    [0, MOBILE_FADE_END / TOTAL_HEIGHT],
    [0, -20],
    { clamp: true },
  );
  const heroClipRightMobile = useTransform(
    scrollYProgress,
    [0, MOBILE_FADE_END / TOTAL_HEIGHT],
    [0, 100],
    { clamp: true },
  );
  const heroClipPathMobile = useMotionTemplate`inset(0 ${heroClipRightMobile}% 0 0)`;

  // ── Canvas rendering — driven directly by scrollYProgress (no spring lag) ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let rafId = 0;
    let dimW = 0,
      dimH = 0;

    const draw = () => {
      const v = scrollYProgress.get();
      const idx = Math.min(Math.floor(v * TOTAL_FRAMES), TOTAL_FRAMES - 1);
      currentFrameRef.current = idx;
      let drawnFrameIndex = idx;

      // Prefer the exact frame, then the last drawn frame, then only a very tight local fallback.
      let img = imagesRef.current[idx];
      if (!img?.complete || !img.naturalWidth) {
        const lastDrawnIndex = lastDrawnFrameRef.current;
        const lastDrawnImage =
          lastDrawnIndex === null ? null : imagesRef.current[lastDrawnIndex];

        if (
          lastDrawnIndex !== null &&
          lastDrawnImage?.complete &&
          lastDrawnImage.naturalWidth
        ) {
          img = lastDrawnImage;
          drawnFrameIndex = lastDrawnIndex;
        } else {
          for (let delta = 1; delta <= 2 && !img; delta++) {
            const nextIndex = idx + delta;
            const previousIndex = idx - delta;

            const nextFrame =
              nextIndex < TOTAL_FRAMES ? imagesRef.current[nextIndex] : null;
            if (nextFrame?.complete && nextFrame.naturalWidth) {
              img = nextFrame;
              drawnFrameIndex = nextIndex;
              break;
            }

            const previousFrame =
              previousIndex >= 0 ? imagesRef.current[previousIndex] : null;
            if (previousFrame?.complete && previousFrame.naturalWidth) {
              img = previousFrame;
              drawnFrameIndex = previousIndex;
              break;
            }
          }
        }
      }
      if (!img) return;

      const parent = canvas.parentElement;
      if (!parent) return;
      const { width: W, height: H } = parent.getBoundingClientRect();
      if (W === 0 || H === 0) return;
      if (dimW !== W || dimH !== H) {
        canvas.width = W;
        canvas.height = H;
        dimW = W;
        dimH = H;
      }

      const iA = img.naturalWidth / img.naturalHeight;
      const cA = W / H;
      let dw: number, dh: number, ox: number, oy: number;
      if (cA > iA) {
        dw = W;
        dh = W / iA;
        ox = 0;
        oy = (H - dh) / 2;
      } else {
        dh = H;
        dw = H * iA;
        ox = (W - dw) / 2;
        oy = 0;
      }

      ctx.fillStyle = '#0d0d0d';
      ctx.fillRect(0, 0, W, H);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, ox, oy, dw, dh);

      lastDrawnFrameRef.current = drawnFrameIndex;

      if (!firstFrameRenderedRef.current) {
        firstFrameRenderedRef.current = true;
        onFirstFrameRendered();
      }
    };

    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(draw);
    };

    const unsubscribeProgress = scrollYProgress.on('change', (v) => {
      schedule();

      // Prioritize frames in the direction of travel and keep a smaller tail behind.
      const cur = Math.min(Math.floor(v * TOTAL_FRAMES), TOTAL_FRAMES - 1);
      const previous = currentFrameRef.current;
      const movingForward = cur >= previous;
      const highPriorityIndices: number[] = [];
      const lowPriorityIndices: number[] = [];

      highPriorityIndices.push(cur);

      for (let step = 1; step <= LOOKAHEAD_FRAMES; step++) {
        const next = movingForward ? cur + step : cur - step;
        if (next >= 0 && next < TOTAL_FRAMES) {
          highPriorityIndices.push(next);
        }
      }

      for (let step = 1; step <= LOOKBEHIND_FRAMES; step++) {
        const trailing = movingForward ? cur - step : cur + step;
        if (trailing >= 0 && trailing < TOTAL_FRAMES) {
          lowPriorityIndices.push(trailing);
        }
      }

      requestFrames(highPriorityIndices, 'high');
      requestFrames(lowPriorityIndices, 'low');
    });

    const unsubscribeFrameLoads = subscribeToFrameLoads((loadedIndex) => {
      const currentIndex = currentFrameRef.current;
      const lastDrawnIndex = lastDrawnFrameRef.current;

      if (
        loadedIndex === currentIndex ||
        loadedIndex === lastDrawnIndex ||
        Math.abs(loadedIndex - currentIndex) <= 2
      ) {
        schedule();
      }
    });

    window.addEventListener('resize', schedule);
    schedule(); // draw initial frame

    return () => {
      unsubscribeProgress();
      unsubscribeFrameLoads();
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFirstFrameRendered, requestFrames, scrollYProgress, subscribeToFrameLoads]);

  // ── Background batch loading ───────────────────────────────────────────────
  useEffect(() => {
    let batch = 0;
    const SIZE = 20;
    const id = setInterval(() => {
      const start = batch * SIZE;
      if (start >= TOTAL_FRAMES) {
        clearInterval(id);
        return;
      }
      const indices: number[] = [];
      for (let i = start; i < Math.min(start + SIZE, TOTAL_FRAMES); i++) {
        indices.push(i);
      }
      requestFrames(indices, 'low');
      batch++;
    }, 160);
    return () => clearInterval(id);
  }, [requestFrames]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: `calc(${TOTAL_HEIGHT}px + 100vh)` }}
      className="relative w-full bg-[#f5f5f5]"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: '#f5f5f5' }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `radial-gradient(circle, #191c1a18 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Canvas panel — on desktop starts at right half and expands; on mobile always full-width */}
        <style>{`
          @media (max-width: 767px) { .hero-canvas-panel { left: 0 !important; } }
          .hero-heading-dark { color: #191c1a; }
          .hero-heading-green { color: rgba(4,104,37,0.86); }
          .hero-muted-text { color: rgba(25,28,26,0.45); }
          .hero-body-text { color: rgba(25,28,26,0.50); }
          .hero-border { border-color: rgba(25,28,26,0.08); }
          .hero-stat-value { color: #191c1a; }
          .hero-stat-label { color: rgba(25,28,26,0.35); }
          .hero-btn-secondary { color: #191c1a; border-color: rgba(25,28,26,0.18); }
          .hero-scroll-icon { border-color: rgba(25,28,26,0.15); }
          .hero-scroll-text { color: rgba(25,28,26,0.30); }
          @media (max-width: 767px) {
            .hero-heading-dark { color: #191c1a; }
            .hero-heading-green { color: #046825; }
            .hero-muted-text { color: rgba(25,28,26,0.62); }
            .hero-body-text { color: rgba(25,28,26,0.68); }
            .hero-border { border-color: rgba(25,28,26,0.16); }
            .hero-stat-value { color: #191c1a; }
            .hero-stat-label { color: rgba(25,28,26,0.50); }
            .hero-btn-secondary { color: #191c1a; border-color: rgba(25,28,26,0.18); background: rgba(255,255,255,0.34); }
            .hero-scroll-icon { border-color: rgba(25,28,26,0.22); }
            .hero-scroll-text { color: rgba(25,28,26,0.45); }
            .hero-canvas-panel canvas {
              filter: brightness(1.02) contrast(1.04) saturate(1.02);
            }
          }
        `}</style>
        <motion.div
          className="hero-canvas-panel pointer-events-none absolute top-0 right-0 bottom-0 z-10"
          style={{ left: panelLeftPct, willChange: 'left' }}
        >
          <canvas ref={canvasRef} className="h-full w-full" />
        </motion.div>

        {/* ── Desktop hero text: left column, fades 300→700 px ── */}
        <motion.div
          style={{
            opacity: heroOpacityDesktop,
            x: heroXDesktop,
            clipPath: heroClipPathDesktop,
          }}
          className="absolute inset-0 z-20 hidden flex-col justify-center md:flex"
        >
          <HeroInner />
        </motion.div>

        {/* ── Mobile hero text: full-width overlay, fades 0→200 px immediately ── */}
        <motion.div
          style={{
            opacity: heroOpacityMobile,
            x: heroXMobile,
            clipPath: heroClipPathMobile,
          }}
          className="absolute inset-0 z-20 flex flex-col justify-start md:hidden"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_32%_38%,rgba(255,255,255,0.52),transparent_40%),linear-gradient(180deg,rgba(245,245,245,0.74),rgba(245,245,245,0.52))] backdrop-blur-[2px]" />
          <HeroInner variant="mobile" />
        </motion.div>

        {/* ── Scroll indicator — desktop ── */}
        <motion.div
          style={{ opacity: heroRevealOpacityDesktop, clipPath: heroClipPathDesktop }}
          className="pointer-events-none absolute bottom-8 left-14 z-30 hidden md:block lg:left-20 xl:left-24"
        >
          <ScrollIndicator />
        </motion.div>

        {/* ── Scroll indicator — mobile ── */}
        <motion.div
          style={{ opacity: heroOpacityMobile }}
          className="pointer-events-none absolute bottom-7 left-7 z-30 hidden md:hidden"
        >
          <ScrollIndicator />
        </motion.div>

        {/* ── Skip animation button ── */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderColor: 'rgba(40,108,0,0.3)',
            color: '#286c00',
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(8px)',
            fontFamily: 'var(--font-dm-sans)',
          }}
          onClick={() => {
            trackEvent('select_content', {
              content_type: 'home_hero_animation_control',
              item_id: 'skip_animation_desktop',
            });
            const target = document.querySelector<HTMLElement>('.hero-skip-target');
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({
                top: TOTAL_HEIGHT + window.innerHeight,
                behavior: 'smooth',
              });
            }
          }}
          className="absolute right-14 bottom-8 z-40 hidden items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:scale-105 md:flex lg:right-20 xl:right-24"
        >
          Skip animation
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 1.5v7M2.5 6l2.5 2.5L7.5 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        {/* ── Skip animation button — mobile ── */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => {
            trackEvent('select_content', {
              content_type: 'home_hero_animation_control',
              item_id: 'skip_animation_mobile',
            });
            const target = document.querySelector<HTMLElement>('.hero-skip-target');
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({
                top: TOTAL_HEIGHT + window.innerHeight,
                behavior: 'smooth',
              });
            }
          }}
          className="absolute right-8 bottom-8 z-40 flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase md:hidden"
          style={{
            borderColor: 'rgba(40,108,0,0.5)',
            color: '#286c00',
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(8px)',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          Skip
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 1.5v7M2.5 6l2.5 2.5L7.5 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────
export function HeroWithScroll() {
  // Images stored in a REF — no React re-renders when frames load
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const loadedRef = useRef(new Set<number>());
  const queueRef = useRef(new Set<number>());
  const failedRef = useRef(new Set<number>());
  const retriesRef = useRef(new Map<number, number>());
  const highQueueRef = useRef<number[]>([]);
  const lowQueueRef = useRef<number[]>([]);
  const inFlightRef = useRef(0);
  const frameListenersRef = useRef(new Set<(index: number) => void>());

  const [openingReady, setOpeningReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [contentMounted, setContentMounted] = useState(false);

  const emitFrameLoaded = useCallback((index: number) => {
    frameListenersRef.current.forEach((listener) => listener(index));
  }, []);

  const updateOpeningProgress = useCallback(() => {
    let loadedCount = 0;

    for (let index = 0; index < INITIAL_PLAYABLE_FRAMES; index++) {
      const image = imagesRef.current[index];
      if (image?.complete && image.naturalWidth) {
        loadedCount++;
      }
    }

    const nextProgress = Math.round((loadedCount / INITIAL_PLAYABLE_FRAMES) * 100);
    setLoadingProgress(nextProgress);

    if (loadedCount === INITIAL_PLAYABLE_FRAMES) {
      setOpeningReady(true);
      setContentMounted(true);
    }
  }, []);

  const startLoad = useCallback(
    (index: number) => {
      queueRef.current.add(index);
      inFlightRef.current += 1;

      const img = new Image();
      img.decoding = 'async';
      const frameNumber = index + FRAME_NUMBER_OFFSET;
      img.src = `${FRAME_PATH}${String(frameNumber).padStart(6, '0')}${FRAME_EXT}`;

      img.onload = () => {
        loadedRef.current.add(index);
        failedRef.current.delete(index);
        queueRef.current.delete(index);
        imagesRef.current[index] = img;
        inFlightRef.current -= 1;

        updateOpeningProgress();
        emitFrameLoaded(index);
        pumpQueue();
      };

      img.onerror = () => {
        queueRef.current.delete(index);
        inFlightRef.current -= 1;

        const attempts = retriesRef.current.get(index) ?? 0;
        if (attempts < MAX_LOAD_RETRIES) {
          retriesRef.current.set(index, attempts + 1);
          highQueueRef.current.unshift(index);
        } else {
          failedRef.current.add(index);
          updateOpeningProgress();
        }

        pumpQueue();
      };
    },
    [emitFrameLoaded, updateOpeningProgress],
  );

  const pumpQueue = useCallback(() => {
    while (inFlightRef.current < MAX_CONCURRENT_LOADS) {
      const nextIndex = highQueueRef.current.shift() ?? lowQueueRef.current.shift();

      if (nextIndex === undefined) return;
      if (
        loadedRef.current.has(nextIndex) ||
        queueRef.current.has(nextIndex) ||
        failedRef.current.has(nextIndex)
      ) {
        continue;
      }

      startLoad(nextIndex);
    }
  }, [startLoad]);

  const requestFrames = useCallback(
    (indices: number[], priority: 'high' | 'low' = 'low') => {
      const targetQueue =
        priority === 'high' ? highQueueRef.current : lowQueueRef.current;

      indices.forEach((index) => {
        if (index < 0 || index >= TOTAL_FRAMES) return;
        if (
          loadedRef.current.has(index) ||
          queueRef.current.has(index) ||
          failedRef.current.has(index)
        ) {
          return;
        }

        if (highQueueRef.current.includes(index) || lowQueueRef.current.includes(index)) {
          return;
        }

        targetQueue.push(index);
      });

      pumpQueue();
    },
    [pumpQueue],
  );

  const subscribeToFrameLoads = useCallback((listener: (index: number) => void) => {
    frameListenersRef.current.add(listener);

    return () => {
      frameListenersRef.current.delete(listener);
    };
  }, []);

  useEffect(() => {
    const openingFrames = Array.from(
      { length: INITIAL_PLAYABLE_FRAMES },
      (_, index) => index,
    );
    requestFrames(openingFrames, 'high');
  }, [requestFrames]);

  const handleFirstFrameRendered = useCallback(() => {
    if (!openingReady) return;
    setShowLoader(false);
  }, [openingReady]);

  useEffect(() => {
    if (contentMounted) {
      requestFrames(
        Array.from(
          { length: INITIAL_PLAYABLE_FRAMES + LOOKAHEAD_FRAMES },
          (_, index) => index,
        ),
        'high',
      );
    }
  }, [contentMounted, requestFrames]);

  return (
    <>
      {/* Semantic H1 rendered unconditionally so it is present in the static
          export HTML. The visible animated headline (inside ScrollContent) is
          decorative/aria-hidden and only mounts client-side after the loader. */}
      <h1 className="sr-only">Autonomous construction robots at scale.</h1>

      <AnimatePresence mode="wait">
        {showLoader && (
          <ExperienceLoader
            key="loading"
            progress={loadingProgress}
            detail={
              openingReady ? 'Rendering first frame...' : 'Preparing opening sequence...'
            }
          />
        )}
      </AnimatePresence>

      {contentMounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScrollContent
            imagesRef={imagesRef}
            requestFrames={requestFrames}
            subscribeToFrameLoads={subscribeToFrameLoads}
            onFirstFrameRendered={handleFirstFrameRendered}
          />
        </motion.div>
      )}
    </>
  );
}
