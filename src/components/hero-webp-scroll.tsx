'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ExperienceLoader } from '@/components/loading/loader';

const TOTAL_FRAMES = 290;
const FIRST_FRAME_NUMBER = 1;
const FRAME_PAD_LENGTH = 6;
const FRAME_PATH = '/frames8/compressed2/frame_';
const FRAME_EXT = '.webp';
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const TOTAL_SCROLL_DISTANCE = 5900;
const EXPAND_END = 800;
const TEXT_FADE_START = 300;
const TEXT_FADE_END = 700;
const MOBILE_FADE_END = 200;
const LOAD_CONCURRENCY = 8;

interface HeroCopyProps {
  tone?: 'light' | 'dark';
}

function getFrameSrc(index: number) {
  const frameNumber = index + FIRST_FRAME_NUMBER;
  return `${FRAME_PATH}${String(frameNumber).padStart(FRAME_PAD_LENGTH, '0')}${FRAME_EXT}`;
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
        {[
          { text: 'Robots for', className: headingClass },
          { text: 'Construction', className: highlightClass },
          { text: 'Sites.', className: headingClass },
        ].map(({ text, className }) => (
          <div
            key={text}
            style={{
              clipPath: 'inset(-0.18em -0.08em -0.34em -0.08em)',
              overflow: 'visible',
              paddingBlock: '0.18em 0.34em',
              marginBlock: '-0.18em -0.34em',
            }}
          >
            <h1
              className={`text-5xl leading-none font-black md:text-6xl lg:text-7xl xl:text-8xl ${className}`}
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {text}
            </h1>
          </div>
        ))}
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

function ScrollIndicator({ tone = 'dark' }: HeroCopyProps) {
  const isLight = tone === 'light';

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full border ${
          isLight ? 'border-white/30' : 'border-[rgba(25,28,26,0.15)]'
        }`}
      >
        <ChevronDown
          className={`h-4 w-4 ${isLight ? 'text-white/45' : 'text-[rgba(25,28,26,0.35)]'}`}
          aria-hidden="true"
        />
      </div>
      <span
        className={`text-[10px] font-semibold tracking-[0.18em] uppercase ${
          isLight ? 'text-white/45' : 'text-[rgba(25,28,26,0.3)]'
        }`}
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        Scroll to explore
      </span>
    </div>
  );
}

async function loadAndDecodeFrame(index: number, warmupCanvas: HTMLCanvasElement) {
  const image = new Image();
  image.decoding = 'async';
  image.src = getFrameSrc(index);

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error(`Failed to load ${image.src}`));
  });

  if (image.decode) {
    await image.decode();
  }

  const warmupContext = warmupCanvas.getContext('2d', { alpha: false });
  warmupContext?.drawImage(image, 0, 0, 1, 1);

  return image;
}

function drawFrame(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
) {
  const imageAspect = image.naturalWidth / image.naturalHeight;
  const canvasAspect = canvasWidth / canvasHeight;
  let drawWidth = canvasWidth;
  let drawHeight = canvasHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (canvasAspect > imageAspect) {
    drawHeight = canvasWidth / imageAspect;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    drawWidth = canvasHeight * imageAspect;
    offsetX = (canvasWidth - drawWidth) / 2;
  }

  context.fillStyle = '#0d0d0d';
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

export function HeroWebpScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const desktopCopyRef = useRef<HTMLDivElement>(null);
  const mobileCopyRef = useRef<HTMLDivElement>(null);
  const desktopIndicatorRef = useRef<HTMLDivElement>(null);
  const mobileIndicatorRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef(-1);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function preloadFrames() {
      const warmupCanvas = document.createElement('canvas');
      warmupCanvas.width = 1;
      warmupCanvas.height = 1;

      const frames = Array<HTMLImageElement>(TOTAL_FRAMES);
      let loadedCount = 0;
      let nextIndex = 0;

      async function worker() {
        while (!cancelled) {
          const frameIndex = nextIndex;
          nextIndex += 1;

          if (frameIndex >= TOTAL_FRAMES) return;

          frames[frameIndex] = await loadAndDecodeFrame(frameIndex, warmupCanvas);
          loadedCount += 1;

          if (!cancelled) {
            setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          }
        }
      }

      await Promise.all(Array.from({ length: LOAD_CONCURRENCY }, () => worker()));

      if (cancelled) return;

      framesRef.current = frames;
      setReady(true);
    }

    preloadFrames().catch((error: unknown) => {
      console.error(error);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const panel = panelRef.current;
    const desktopCopy = desktopCopyRef.current;
    const mobileCopy = mobileCopyRef.current;
    const desktopIndicator = desktopIndicatorRef.current;
    const mobileIndicator = mobileIndicatorRef.current;

    if (!canvas || !section || !panel || !desktopCopy || !mobileCopy) return;

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    const canvasContext = context;
    const triggerSection = section;
    let cleanup = () => {};
    let cancelled = false;

    async function setupScrollTrigger() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const render = (frame: number) => {
        const frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frame)));

        if (frameIndex === lastFrameRef.current) return;

        const image = framesRef.current[frameIndex];
        if (!image) return;

        drawFrame(canvasContext, image, CANVAS_WIDTH, CANVAS_HEIGHT);
        lastFrameRef.current = frameIndex;
      };

      render(0);

      window.floLenis?.on('scroll', ScrollTrigger.update);

      const gsapContext = gsap.context(() => {
        const playhead = { frame: 0 };
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: triggerSection,
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
            frame: TOTAL_FRAMES - 1,
            snap: { frame: 1 },
            onUpdate: () => render(playhead.frame),
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
          timeline.to(
            desktopIndicator,
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
      }, triggerSection);

      cleanup = () => {
        window.floLenis?.off('scroll', ScrollTrigger.update);
        gsapContext.revert();
      };
    }

    setupScrollTrigger();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#f5f5f5]"
    >
      <AnimatePresence>
        {!ready && (
          <ExperienceLoader
            key="webp-hero-loader"
            progress={progress}
            detail="Preparing scroll sequence..."
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
        className="hero-webp-panel pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-10 md:left-[52%]"
        style={{ willChange: 'left' }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="h-full w-full object-cover"
          aria-label="Flo robot scroll animation"
        />
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
        <ScrollIndicator tone="light" />
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
