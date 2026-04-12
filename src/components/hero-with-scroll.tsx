"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 674;
const FRAME_PATH = "/frames/frame_";
const FRAME_EXT = ".webp";
const INITIAL_LOAD_COUNT = 10;
const PRELOAD_BUFFER = 80;  // frames to preload ahead/behind current position

// Total scroll space
const TOTAL_HEIGHT = 5900;
// Canvas panel expands from right-half to fullscreen over this many px
const EXPAND_END = 800;
// Hero text fades over this range (desktop)
const TEXT_FADE_START = 300;
const TEXT_FADE_END   = 700;
// Hero text fades immediately on mobile (0 → 200 px)
const MOBILE_FADE_END = 200;

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen({ progress }: { progress: number }) {
  const [msg, setMsg] = useState("Initializing Systems...");
  useEffect(() => {
    const msgs = [
      "Initializing Systems...",
      "Loading Neural Pathfinding...",
      "Calibrating Sensors...",
      "Synchronizing Fleet Data...",
      "Preparing Autonomous Controls...",
    ];
    const t = setInterval(() => setMsg(msgs[Math.floor(Math.random() * msgs.length)]), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#f5f5f5] z-50 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(#191c1a 1px, transparent 1px), linear-gradient(90deg, #191c1a 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
      <div className="relative mb-12 w-full px-4 sm:px-8 md:px-12">
        <svg viewBox="0 0 1000 150" className="w-full" preserveAspectRatio="xMidYMid meet" style={{ height: "auto", maxHeight: "30vh" }}>
          <defs>
            <linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#286c00" /><stop offset="100%" stopColor="#7ccd54" />
            </linearGradient>
          </defs>
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="var(--font-dm-sans)" fontSize="100" fontWeight="700" letterSpacing="0.05em" fill="none" stroke="url(#tg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-draw-text">FLO MOBILITY</text>
        </svg>
      </div>
      <div className="relative mb-8">
        <svg className="w-36 h-36 sm:w-44 sm:h-44" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="none" stroke="#e1e3df" strokeWidth="4" />
          <circle cx="100" cy="100" r="85" fill="none" stroke="url(#pg)" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${(progress / 100) * 534} 534`} transform="rotate(-90 100 100)" className="transition-all duration-300 ease-out" />
          <defs><linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#286c00" /><stop offset="100%" stopColor="#7ccd54" /></linearGradient></defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-5xl font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "#7ccd54" }}>{progress}%</p>
        </div>
      </div>
      <div className="text-center px-4">
        <p className="text-xl font-medium mb-2" style={{ fontFamily: "var(--font-inter)", color: "#191c1a" }}>Loading Experience</p>
        <p className="text-sm font-medium uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-mono)", color: "#717a68" }}>{msg}</p>
      </div>
      <style jsx>{`
        @keyframes draw-text { 0% { stroke-dasharray: 0 2000; } 100% { stroke-dasharray: 2000 0; } }
        .animate-draw-text { animation: draw-text 3s cubic-bezier(0.2, 0.8, 0.2, 1) infinite; }
      `}</style>
    </motion.div>
  );
}

// ─── Hero inner content (shared; rendered in both mobile & desktop wrappers) ──
function HeroInner() {
  return (
    <>
      {/* Vertical accent line */}
      <motion.div
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-[15%] bottom-[15%] w-[3px] rounded-full"
        style={{ background: "linear-gradient(to bottom, transparent, #7ccd54 25%, #7ccd54 75%, transparent)" }}
      />

      <div className="px-6 sm:px-14 lg:px-20 xl:px-24 relative z-10 w-full md:max-w-[52vw]">

        {/* Live status badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 mb-7"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#7ccd54" }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#7ccd54" }} />
          </span>
          <span className="text-[15px] font-bold tracking-[0.26em] uppercase hero-muted-text" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Live across 10+ construction sites
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-8">
          {([
            { text: "Robots for",    cls: "hero-heading-dark"  },
            { text: "Construction",  cls: "hero-heading-green" },
            { text: "Sites.",        cls: "hero-heading-dark"  },
          ] as const).map(({ text, cls }, i) => (
            <div key={text} style={{ overflow: "hidden", paddingBottom: "0.35em", marginBottom: "-0.35em" }}>
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.0, delay: 0.08 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className={`${cls} font-black leading-[0.86] tracking-[-0.04em]`}
                style={{ fontSize: "clamp(3rem, 6.5vw, 8rem)", fontFamily: "var(--font-dm-sans)" }}
              >
                {text}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
          className="h-px mb-7"
          style={{ background: "rgba(25,28,26,0.12)" }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="hero-body-text text-[20px] leading-[1.85] mb-7"
          style={{ fontFamily: "var(--font-dm-sans)", maxWidth: "400px" }}
        >
          Enabling contractors to build smarter, faster and safer — with autonomous robots deployed across India&apos;s most demanding construction sites.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3 mb-10 pointer-events-auto"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[18px] font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-md"
            style={{ background: "#7ccd54", fontFamily: "var(--font-dm-sans)" }}
          >
            Request a Demo
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1.5 6h9M7 2.5l3.5 3.5L7 9.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="/offerings/material-movement"
            className="hero-btn-secondary inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[18px] font-semibold border transition-all duration-300"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Explore Solutions
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2 9L9 2M9 2H4M9 2v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
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
    </>
  );
}

// ─── Scroll indicator ──────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      animate={{ y: [0, 5, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      className="flex items-center gap-2.5"
    >
      <div className="hero-scroll-icon w-7 h-7 rounded-full flex items-center justify-center border">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 1.5v7M2.5 6l2.5 2.5L7.5 6" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="hero-scroll-text text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ fontFamily: "var(--font-dm-sans)" }}>
        Scroll to explore
      </span>
    </motion.div>
  );
}

// ─── ScrollContent ────────────────────────────────────────────────────────────
function ScrollContent({
  imagesRef,
  loadFrame,
}: {
  imagesRef: React.MutableRefObject<(HTMLImageElement | null)[]>;
  loadFrame: (i: number) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Canvas panel: starts right-half (52%) on desktop, expands to fullscreen over EXPAND_END px
  const panelLeft    = useTransform(scrollYProgress, [0, EXPAND_END / TOTAL_HEIGHT], [52, 0], { clamp: true });
  const panelLeftPct = useMotionTemplate`${panelLeft}%`;

  // Desktop: hero text fades 300→700 px (stays visible while canvas expands from right half)
  const heroOpacityDesktop = useTransform(scrollYProgress, [TEXT_FADE_START / TOTAL_HEIGHT, TEXT_FADE_END / TOTAL_HEIGHT], [1, 0], { clamp: true });
  const heroXDesktop       = useTransform(scrollYProgress, [TEXT_FADE_START / TOTAL_HEIGHT, TEXT_FADE_END / TOTAL_HEIGHT], [0, -50], { clamp: true });
  // Mobile: hero text + gradient fade immediately (0→200 px) so frames fill the screen cleanly
  const heroOpacityMobile  = useTransform(scrollYProgress, [0, MOBILE_FADE_END / TOTAL_HEIGHT], [1, 0], { clamp: true });
  const heroXMobile        = useTransform(scrollYProgress, [0, MOBILE_FADE_END / TOTAL_HEIGHT], [0, -20], { clamp: true });

  // ── Canvas rendering — driven directly by scrollYProgress (no spring lag) ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let rafId = 0;
    let dimW = 0, dimH = 0;

    const draw = () => {
      const v   = scrollYProgress.get();
      const idx = Math.min(Math.floor(v * TOTAL_FRAMES), TOTAL_FRAMES - 1);

      // Nearest-frame fallback — prevents blank flashes
      let img = imagesRef.current[idx];
      if (!img?.complete || !img.naturalWidth) {
        let found = false;
        for (let delta = 1; delta < 60 && !found; delta++) {
          for (const d of [delta, -delta]) {
            const ni = idx + d;
            if (ni < 0 || ni >= TOTAL_FRAMES) continue;
            const candidate = imagesRef.current[ni];
            if (candidate?.complete && candidate.naturalWidth) {
              img = candidate; found = true; break;
            }
          }
        }
        if (!found || !img) return;
      }
      if (!img) return;

      const parent = canvas.parentElement;
      if (!parent) return;
      const { width: W, height: H } = parent.getBoundingClientRect();
      if (W === 0 || H === 0) return;
      if (dimW !== W || dimH !== H) { canvas.width = W; canvas.height = H; dimW = W; dimH = H; }

      const iA = img.naturalWidth / img.naturalHeight;
      const cA = W / H;
      let dw: number, dh: number, ox: number, oy: number;
      if (cA > iA) { dw = W; dh = W / iA; ox = 0; oy = (H - dh) / 2; }
      else         { dh = H; dw = H * iA; ox = (W - dw) / 2; oy = 0; }

      ctx.fillStyle = "#0d0d0d";
      ctx.fillRect(0, 0, W, H);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, ox, oy, dw, dh);
    };

    const schedule = () => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(draw); };

    const unsub = scrollYProgress.on("change", (v) => {
      schedule();
      // Preload frames around current position
      const cur = Math.min(Math.floor(v * TOTAL_FRAMES), TOTAL_FRAMES - 1);
      for (let i = Math.max(0, cur - PRELOAD_BUFFER); i <= Math.min(TOTAL_FRAMES - 1, cur + PRELOAD_BUFFER); i++) {
        loadFrame(i);
      }
    });

    window.addEventListener("resize", schedule);
    schedule(); // draw initial frame

    return () => {
      unsub();
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", schedule);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollYProgress]);

  // ── Background batch loading ───────────────────────────────────────────────
  useEffect(() => {
    let batch = 0;
    const SIZE = 20;
    const id = setInterval(() => {
      const start = batch * SIZE;
      if (start >= TOTAL_FRAMES) { clearInterval(id); return; }
      for (let i = start; i < Math.min(start + SIZE, TOTAL_FRAMES); i++) loadFrame(i);
      batch++;
    }, 80);
    return () => clearInterval(id);
  }, [loadFrame]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: `calc(${TOTAL_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: "#f5f5f5" }}>

        {/* Dot grid */}
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `radial-gradient(circle, #191c1a18 1px, transparent 1px)`,
          backgroundSize: "32px 32px"
        }} />

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
            .hero-heading-dark { color: #ffffff; }
            .hero-heading-green { color: #7ccd54; }
            .hero-muted-text { color: rgba(255,255,255,0.65); }
            .hero-body-text { color: rgba(255,255,255,0.80); }
            .hero-border { border-color: rgba(255,255,255,0.20); }
            .hero-stat-value { color: #ffffff; }
            .hero-stat-label { color: rgba(255,255,255,0.55); }
            .hero-btn-secondary { color: rgba(255,255,255,0.85); border-color: rgba(255,255,255,0.30); }
            .hero-scroll-icon { border-color: rgba(255,255,255,0.30); }
            .hero-scroll-text { color: rgba(255,255,255,0.45); }
          }
        `}</style>
        <motion.div
          className="hero-canvas-panel absolute top-0 bottom-0 right-0 z-10"
          style={{ left: panelLeftPct, willChange: "left" }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>

        {/* ── Desktop hero text: left column, fades 300→700 px ── */}
        <motion.div
          style={{ opacity: heroOpacityDesktop, x: heroXDesktop }}
          className="hidden md:flex absolute inset-0 z-0 flex-col justify-center pointer-events-none"
        >
          <HeroInner />
        </motion.div>

        {/* ── Mobile hero text: full-width overlay, fades 0→200 px immediately ── */}
        <motion.div
          style={{ opacity: heroOpacityMobile, x: heroXMobile }}
          className="flex md:hidden absolute inset-0 z-20 flex-col justify-center pointer-events-none"
        >
          {/* Dark gradient so text is readable over canvas */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/20 pointer-events-none" />
          <HeroInner />
        </motion.div>

        {/* ── Scroll indicator — desktop ── */}
        <motion.div
          style={{ opacity: heroOpacityDesktop }}
          className="hidden md:block absolute bottom-8 left-14 lg:left-20 xl:left-24 z-30 pointer-events-none"
        >
          <ScrollIndicator />
        </motion.div>

        {/* ── Scroll indicator — mobile ── */}
        <motion.div
          style={{ opacity: heroOpacityMobile }}
          className="flex md:hidden absolute bottom-8 left-8 z-30 pointer-events-none"
        >
          <ScrollIndicator />
        </motion.div>

      </div>
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────
export function HeroWithScroll() {
  // Images stored in a REF — no React re-renders when frames load
  const imagesRef    = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const loadedRef    = useRef(new Set<number>());
  const queueRef     = useRef(new Set<number>());

  const [initialLoaded, setInitialLoaded]   = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent]       = useState(false);

  const loadFrame = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL_FRAMES) return;
    if (loadedRef.current.has(index) || queueRef.current.has(index)) return;
    queueRef.current.add(index);
    const img = new Image();
    img.src = `${FRAME_PATH}${String(index).padStart(6, "0")}${FRAME_EXT}`;
    img.onload = () => {
      loadedRef.current.add(index);
      queueRef.current.delete(index);
      imagesRef.current[index] = img; // write to ref — no re-render
    };
    img.onerror = () => queueRef.current.delete(index);
  }, []);

  // Load initial frames evenly distributed across the sequence
  useEffect(() => {
    let done = 0;
    for (let i = 0; i < INITIAL_LOAD_COUNT; i++) {
      const idx = Math.floor((i / INITIAL_LOAD_COUNT) * TOTAL_FRAMES);
      queueRef.current.add(idx);
      const img = new Image();
      img.src = `${FRAME_PATH}${String(idx).padStart(6, "0")}${FRAME_EXT}`;
      img.onload = () => {
        loadedRef.current.add(idx);
        queueRef.current.delete(idx);
        imagesRef.current[idx] = img;
        done++;
        setLoadingProgress(Math.round((done / INITIAL_LOAD_COUNT) * 100));
        if (done === INITIAL_LOAD_COUNT) setInitialLoaded(true);
      };
      img.onerror = () => {
        queueRef.current.delete(idx);
        done++;
        if (done === INITIAL_LOAD_COUNT) setInitialLoaded(true);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialLoaded) {
      const t = window.setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(t);
    }
  }, [initialLoaded]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!initialLoaded && <LoadingScreen key="loading" progress={loadingProgress} />}
      </AnimatePresence>

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScrollContent imagesRef={imagesRef} loadFrame={loadFrame} />
        </motion.div>
      )}
    </>
  );
}
