"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
  AnimatePresence,
} from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 1516;
const FRAME_PATH = "/frames/frame_";
const FRAME_EXT = ".webp";
const INITIAL_LOAD_COUNT = 10;
const PRELOAD_BUFFER = 150; // larger buffer = fewer gaps during fast scroll

// Total scroll space — frames play across the whole range
const TOTAL_HEIGHT = 5900;
// Canvas panel expands from right-half to fullscreen over this many px
const EXPAND_END = 800;
// Text fades out over this range
const TEXT_FADE_START = 300;
const TEXT_FADE_END   = 700;

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

// ─── ScrollContent: all scroll-driven animation lives here ───────────────────
function ScrollContent({
  images,
  loadFrame,
}: {
  images: (HTMLImageElement | null)[];
  loadFrame: (i: number) => void;
}) {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const imagesRef   = useRef(images);
  const scheduleRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    imagesRef.current = images;
    scheduleRef.current?.();
  }, [images]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // ── Frame progress: advances from 0→1 across the FULL scroll range ────────
  // Spring adds inertia so fast flicks don't jump frames
  const rawFrameProgress = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });
  const frameProgress = useSpring(rawFrameProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.0001,
  });

  // ── Canvas panel: starts at right-half, expands to fullscreen ─────────────
  // Left edge: 52% → 0% over first EXPAND_END px
  const panelLeft = useTransform(
    scrollYProgress,
    [0, EXPAND_END / TOTAL_HEIGHT],
    [52, 0],
    { clamp: true }
  );
  // We use a CSS left% value to position the canvas panel
  const panelLeftPct = useMotionTemplate`${panelLeft}%`;

  // ── Hero text: fades + slides left between TEXT_FADE_START and TEXT_FADE_END ─
  const heroOpacity = useTransform(
    scrollYProgress,
    [TEXT_FADE_START / TOTAL_HEIGHT, TEXT_FADE_END / TOTAL_HEIGHT],
    [1, 0],
    { clamp: true }
  );
  const heroX = useTransform(
    scrollYProgress,
    [TEXT_FADE_START / TOTAL_HEIGHT, TEXT_FADE_END / TOTAL_HEIGHT],
    [0, -50],
    { clamp: true }
  );

  // ── Background batch loading — sequential, faster interval ──────────────
  useEffect(() => {
    let batch = 0;
    const SIZE = 30;   // larger batches
    const id = setInterval(() => {
      const start = batch * SIZE;
      if (start >= TOTAL_FRAMES) { clearInterval(id); return; }
      for (let i = start; i < Math.min(start + SIZE, TOTAL_FRAMES); i++) loadFrame(i);
      batch++;
    }, 50); // faster: 50ms instead of 80ms
    return () => clearInterval(id);
  }, [loadFrame]);

  // ── Scroll-driven preloading ───────────────────────────────────────────────
  useEffect(() => {
    return frameProgress.on("change", (v) => {
      const cur = Math.min(Math.floor(v * TOTAL_FRAMES), TOTAL_FRAMES - 1);
      for (let i = Math.max(0, cur - PRELOAD_BUFFER); i <= Math.min(TOTAL_FRAMES - 1, cur + PRELOAD_BUFFER); i++) {
        loadFrame(i);
      }
    });
  }, [frameProgress, loadFrame]);

  // ── Canvas rendering (stale-closure-safe via imagesRef) ───────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let rafId = 0, dimW = 0, dimH = 0;

    const draw = () => {
      const v   = frameProgress.get();
      const idx = Math.min(Math.floor(v * TOTAL_FRAMES), TOTAL_FRAMES - 1);

      // Nearest-frame fallback: if target frame isn't loaded yet,
      // search outward (±1, ±2 …) for the closest loaded frame.
      // This prevents blank flashes during fast scroll.
      let img = imagesRef.current[idx];
      if (!img?.complete || !img.naturalWidth) {
        let found = false;
        for (let delta = 1; delta < 30 && !found; delta++) {
          for (const d of [delta, -delta]) {
            const ni = idx + d;
            if (ni < 0 || ni >= TOTAL_FRAMES) continue;
            const candidate = imagesRef.current[ni];
            if (candidate?.complete && candidate.naturalWidth) {
              img = candidate;
              found = true;
              break;
            }
          }
        }
        if (!found || !img) return; // nothing nearby loaded yet
      }
      if (!img) return;

      const parent = canvas.parentElement;
      if (!parent) return;
      const { width: W, height: H } = parent.getBoundingClientRect();
      if (W === 0 || H === 0) return;
      if (dimW !== W || dimH !== H) { canvas.width = W; canvas.height = H; dimW = W; dimH = H; }
      // Cover: fill the canvas, cropping equally on both sides if needed
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
    scheduleRef.current = schedule;
    const u1 = frameProgress.on("change", schedule);
    const u2 = scrollYProgress.on("change", schedule);
    window.addEventListener("resize", schedule);
    schedule();
    return () => { u1(); u2(); cancelAnimationFrame(rafId); window.removeEventListener("resize", schedule); scheduleRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameProgress, scrollYProgress]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: `calc(${TOTAL_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: "#f5f5f5" }}>

        {/* ── Dot grid background (always visible until canvas covers it) ── */}
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `radial-gradient(circle, #191c1a18 1px, transparent 1px)`,
          backgroundSize: "32px 32px"
        }} />

        {/* ── Canvas panel: starts right-half, sweeps to fullscreen on scroll ── */}
        <motion.div
          className="absolute top-0 bottom-0 z-10"
          style={{ left: panelLeftPct, right: "0%", willChange: "left" }}
        >
          <canvas ref={canvasRef} className="w-full h-full" style={{ willChange: "contents" }} />
        </motion.div>

        {/* ── Hero text: left column, fades as canvas sweeps over ── */}
        <motion.div
          style={{ opacity: heroOpacity, x: heroX }}
          className="absolute inset-0 z-0 flex flex-col justify-center pointer-events-none px-8 sm:px-14 lg:px-20 xl:px-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5 sm:gap-6 max-w-lg"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-8 bg-[#7ccd54]" />
              <span className="text-[11px] sm:text-xs font-bold text-[#7ccd54] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Autonomous Construction Robotics
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-black leading-[1.0] tracking-[-0.03em] text-[#191c1a]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Building<br />
              the Future<br />
              <span style={{ WebkitTextStroke: "2px #286c00", WebkitTextFillColor: "transparent", color: "transparent" }}>
                with Machines
              </span>
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-[#191c1a]/15 origin-left"
              style={{ width: "80%" }}
            />

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15px] sm:text-base text-[#191c1a]/55 leading-relaxed max-w-sm"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              FLO Mobility transforms construction sites with autonomous robots — 24/7 operation, 500kg payload, zero emissions.
            </motion.p>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-2.5"
            >
              {[["24/7", "Operation"], ["500kg", "Payload"], ["0", "Emissions"]].map(([val, label]) => (
                <div key={label} className="flex items-baseline gap-1.5 px-3.5 py-2 rounded-lg bg-white/70 backdrop-blur-sm border border-[#191c1a]/08 shadow-sm">
                  <span className="text-base sm:text-lg font-black text-[#286c00]" style={{ fontFamily: "var(--font-dm-sans)" }}>{val}</span>
                  <span className="text-[11px] text-[#191c1a]/50 uppercase tracking-wide font-medium">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-8 sm:left-14 lg:left-20 xl:left-24 z-0 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full border border-[#191c1a]/20 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M3 7l3 3 3-3" stroke="#191c1a" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[11px] font-medium text-[#191c1a]/35 uppercase tracking-[0.15em]" style={{ fontFamily: "var(--font-dm-sans)" }}>Scroll</span>
          </motion.div>
        </motion.div>

      </div>{/* /sticky */}
    </div>
  );
}

// ─── Root component: owns image state, shows loader then ScrollContent ────────
export function HeroWithScroll() {
  const [images, setImages] = useState<(HTMLImageElement | null)[]>(() => Array(TOTAL_FRAMES).fill(null));
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const loadedRef = useRef(new Set<number>());
  const queueRef  = useRef(new Set<number>());

  const loadFrame = (index: number) => {
    if (index < 0 || index >= TOTAL_FRAMES) return;
    if (loadedRef.current.has(index) || queueRef.current.has(index)) return;
    queueRef.current.add(index);
    const img = document.createElement("img") as HTMLImageElement;
    img.src = `${FRAME_PATH}${String(index).padStart(6, "0")}${FRAME_EXT}`;
    img.onload = () => {
      loadedRef.current.add(index);
      queueRef.current.delete(index);
      setImages((prev) => { const n = [...prev]; n[index] = img; return n; });
    };
    img.onerror = () => queueRef.current.delete(index);
  };

  // Load 10 evenly-spaced initial frames
  useEffect(() => {
    let done = 0;
    for (let i = 0; i < INITIAL_LOAD_COUNT; i++) {
      const idx = Math.floor((i / INITIAL_LOAD_COUNT) * TOTAL_FRAMES);
      if (loadedRef.current.has(idx)) { done++; if (done === INITIAL_LOAD_COUNT) setInitialLoaded(true); continue; }
      queueRef.current.add(idx);
      const img = document.createElement("img") as HTMLImageElement;
      img.src = `${FRAME_PATH}${String(idx).padStart(6, "0")}${FRAME_EXT}`;
      img.onload = () => {
        loadedRef.current.add(idx);
        queueRef.current.delete(idx);
        setImages((prev) => { const n = [...prev]; n[idx] = img; return n; });
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
          <ScrollContent images={images} loadFrame={loadFrame} />
        </motion.div>
      )}
    </>
  );
}
