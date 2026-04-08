"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence, useInView } from "framer-motion";

const TOTAL_FRAMES = 1516;
const FRAME_PATH = "/frames/frame_";
const FRAME_EXTENSION = ".webp";
const INITIAL_LOAD_COUNT = 10; // Minimal initial load for fast start (<2 seconds)
const PRELOAD_BUFFER = 100; // Large buffer for aggressive preloading

// Loading component with Stitch-designed wireframe drawing animation
function LoadingScreen({ progress }: { progress: number }) {
  const [statusMessage, setStatusMessage] = useState("Initializing Systems...");

  useEffect(() => {
    const messages = [
      "Initializing Systems...",
      "Loading Neural Pathfinding...",
      "Calibrating Sensors...",
      "Synchronizing Fleet Data...",
      "Preparing Autonomous Controls...",
    ];

    const interval = setInterval(() => {
      setStatusMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#f5f5f5] z-50 overflow-hidden"
    >
      {/* Subtle Technical Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(#191c1a 1px, transparent 1px),
          linear-gradient(90deg, #191c1a 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      {/* Wireframe Logo with Drawing Animation */}
      <div className="relative mb-12 sm:mb-16 md:mb-20 lg:mb-24 w-full px-4 sm:px-8 md:px-12">
        <svg
          viewBox="0 0 1000 150"
          className="w-full"
          preserveAspectRatio="xMidYMid meet"
          style={{ height: 'auto', maxHeight: '30vh' }}
        >
          <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#286c00" />
              <stop offset="100%" stopColor="#7ccd54" />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="var(--font-dm-sans)"
            fontSize="clamp(40, 10vw, 100)"
            fontWeight="700"
            letterSpacing="0.05em"
            fill="none"
            stroke="url(#textGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-draw-text"
          >
            FLO MOBILITY
          </text>
        </svg>
      </div>

      {/* Loading Progress Ring */}
      <div className="relative mb-8 sm:mb-10">
        <svg
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="85" fill="none" stroke="#e1e3df" strokeWidth="4" />
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * 534} 534`}
            transform="rotate(-90 100 100)"
            className="transition-all duration-300 ease-out"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#286c00" />
              <stop offset="100%" stopColor="#7ccd54" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "#7ccd54" }}>
            {progress}%
          </p>
        </div>
      </div>

      {/* Loading Status */}
      <div className="text-center px-4">
        <p className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight mb-2" style={{ fontFamily: "var(--font-inter)", color: "#191c1a" }}>
          Loading Experience
        </p>
        <p className="text-xs sm:text-sm md:text-base font-medium uppercase tracking-[0.1em] transition-all duration-500" style={{ fontFamily: "var(--font-mono)", color: "#717a68" }}>
          {statusMessage}
        </p>
      </div>

      <style jsx>{`
        @keyframes draw-text {
          0% { stroke-dasharray: 0 2000; }
          100% { stroke-dasharray: 2000 0; }
        }
        .animate-draw-text {
          animation: draw-text 3s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }
      `}</style>
    </motion.div>
  );
}

export function RobotScroll() {
  const [images, setImages] = useState<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const loadedFramesRef = useRef(new Set<number>());

  // Load initial frames spread across the sequence for better coverage
  useEffect(() => {
    let loadedCount = 0;
    const imagesToLoad = INITIAL_LOAD_COUNT;

    const loadFrame = (index: number) => {
      if (loadedFramesRef.current.has(index)) return;

      const img = new Image();
      const frameNumber = String(index).padStart(6, "0");
      img.src = `${FRAME_PATH}${frameNumber}${FRAME_EXTENSION}`;

      img.onload = () => {
        loadedCount++;
        loadedFramesRef.current.add(index);
        setImages(prev => {
          const newImages = [...prev];
          newImages[index] = img;
          return newImages;
        });
        setLoadingProgress(Math.round((loadedCount / imagesToLoad) * 100));

        if (loadedCount === imagesToLoad) {
          setInitialLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imagesToLoad) {
          setInitialLoaded(true);
        }
      };
    };

    // Load frames spread across the sequence for better coverage
    for (let i = 0; i < imagesToLoad; i++) {
      const frameIndex = Math.floor((i / imagesToLoad) * TOTAL_FRAMES);
      loadFrame(frameIndex);
    }
  }, []);

  // Trigger content animation after loading completes
  useEffect(() => {
    if (initialLoaded) {
      setTimeout(() => setShowContent(true), 300);
    }
  }, [initialLoaded]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!initialLoaded && <LoadingScreen key="loading" progress={loadingProgress} />}
      </AnimatePresence>
      {initialLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScrollContent images={images} loadedFrames={loadedFramesRef} />
        </motion.div>
      )}
    </>
  );
}

// Scroll content component
function ScrollContent({ images, loadedFrames }: { images: (HTMLImageElement | null)[], loadedFrames: React.MutableRefObject<Set<number>> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [localImages, setLocalImages] = useState(images);
  const loadingQueueRef = useRef(new Set<number>());
  const lastFrameRef = useRef(-1);

  // Reveal animation when section comes into view
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Aggressive lazy loading with background preloading
  useEffect(() => {
    const loadFrame = (index: number) => {
      if (loadedFrames.current.has(index) || loadingQueueRef.current.has(index)) return;
      loadingQueueRef.current.add(index);

      const img = new Image();
      const frameNumber = String(index).padStart(6, "0");
      img.src = `${FRAME_PATH}${frameNumber}${FRAME_EXTENSION}`;

      img.onload = () => {
        loadedFrames.current.add(index);
        loadingQueueRef.current.delete(index);
        setLocalImages(prev => {
          const newImages = [...prev];
          newImages[index] = img;
          return newImages;
        });
      };

      img.onerror = () => {
        loadingQueueRef.current.delete(index);
      };
    };

    // Scroll-based loading
    const unsubscribe = scrollYProgress.on("change", () => {
      const progress = scrollYProgress.get();
      const currentFrame = Math.min(Math.floor(progress * TOTAL_FRAMES), TOTAL_FRAMES - 1);

      if (currentFrame === lastFrameRef.current) return;
      lastFrameRef.current = currentFrame;

      // Load current frame immediately
      loadFrame(currentFrame);

      // Aggressively preload surrounding frames
      const start = Math.max(0, currentFrame - PRELOAD_BUFFER);
      const end = Math.min(TOTAL_FRAMES - 1, currentFrame + PRELOAD_BUFFER);
      for (let i = start; i <= end; i++) {
        loadFrame(i);
      }
    });

    // Background loading: load all remaining frames in batches
    let batchIndex = 0;
    const batchSize = 20;
    const backgroundLoadInterval = setInterval(() => {
      const startIdx = batchIndex * batchSize;
      const endIdx = Math.min(startIdx + batchSize, TOTAL_FRAMES);

      for (let i = startIdx; i < endIdx; i++) {
        loadFrame(i);
      }

      batchIndex++;
      if (startIdx >= TOTAL_FRAMES) {
        clearInterval(backgroundLoadInterval);
      }
    }, 100); // Load batch every 100ms

    return () => {
      unsubscribe();
      clearInterval(backgroundLoadInterval);
    };
  }, [scrollYProgress, loadedFrames]);

  // Optimized canvas rendering with requestAnimationFrame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    let currentFrameIndex = -1;
    let rafId: number;
    let dimensionsCache = { width: 0, height: 0 };

    const render = () => {
      const progress = scrollYProgress.get();
      const frameIndex = Math.min(Math.floor(progress * TOTAL_FRAMES), TOTAL_FRAMES - 1);

      // Skip if same frame
      if (frameIndex === currentFrameIndex) return;
      currentFrameIndex = frameIndex;

      const img = localImages[frameIndex];
      if (!img || !img.complete) return;

      const parent = canvas.parentElement;
      if (!parent) return;

      // Cache dimensions
      const rect = parent.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;

      // Only update canvas size if dimensions changed
      if (dimensionsCache.width !== containerWidth || dimensionsCache.height !== containerHeight) {
        canvas.width = containerWidth;
        canvas.height = containerHeight;
        dimensionsCache = { width: containerWidth, height: containerHeight };
      }

      // Calculate dimensions to cover container (like background-size: cover)
      const imgAspect = img.width / img.height;
      const containerAspect = containerWidth / containerHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (containerAspect > imgAspect) {
        drawWidth = containerWidth;
        drawHeight = containerWidth / imgAspect;
        offsetX = 0;
        offsetY = (containerHeight - drawHeight) / 2;
      } else {
        drawHeight = containerHeight;
        drawWidth = containerHeight * imgAspect;
        offsetX = (containerWidth - drawWidth) / 2;
        offsetY = 0;
      }

      // Fill with background color for seamless blending
      context.fillStyle = '#f5f5f5';
      context.fillRect(0, 0, containerWidth, containerHeight);

      // Use image smoothing for better quality
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Use requestAnimationFrame for smoother updates
    const scheduleRender = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(render);
    };

    const unsubscribe = scrollYProgress.on("change", scheduleRender);

    // Also render on resize
    const handleResize = () => scheduleRender();
    window.addEventListener("resize", handleResize);

    scheduleRender(); // Initial render

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollYProgress, localImages]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative h-[400vh] sm:h-[500vh] lg:h-[600vh] bg-[#f5f5f5] w-full"
    >
      {/* Sticky Canvas Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="sticky top-0 h-screen w-full flex items-center justify-center bg-[#f5f5f5] overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </motion.div>
    </motion.div>
  );
}

