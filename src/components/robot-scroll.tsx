"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const TOTAL_FRAMES = 258;
const FRAME_PATH = "/frames/ezgif-frame-";

// Loading component
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <svg
            className="animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <p className="text-2xl font-medium text-black/80 tracking-tight">
          Loading Experience
        </p>
        <p className="text-lg text-black/40 mt-2">{progress}%</p>
      </div>
    </div>
  );
}

export function RobotScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Preload all images
  useEffect(() => {
    const imageArray: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(3, "0");
      img.src = `${FRAME_PATH}${frameNumber}.jpg`;

      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));

        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };

      imageArray.push(img);
    }

    setImages(imageArray);
  }, []);

  // Show loading screen while images load
  if (!imagesLoaded) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return <ScrollContent images={images} />;
}

// Separate component that uses useScroll - only renders when images are loaded
function ScrollContent({ images }: { images: HTMLImageElement[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Render canvas frames on scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const render = () => {
      const progress = scrollYProgress.get();
      const frameIndex = Math.min(
        Math.floor(progress * TOTAL_FRAMES),
        TOTAL_FRAMES - 1
      );

      const img = images[frameIndex];
      if (!img || !img.complete) return;

      // Set canvas dimensions to match image aspect ratio
      const aspectRatio = img.width / img.height;
      const containerWidth = canvas.parentElement?.clientWidth || window.innerWidth;
      const containerHeight = canvas.parentElement?.clientHeight || window.innerHeight;

      // Calculate dimensions to fit the image within viewport
      let renderWidth = containerWidth;
      let renderHeight = renderWidth / aspectRatio;

      if (renderHeight > containerHeight) {
        renderHeight = containerHeight;
        renderWidth = renderHeight * aspectRatio;
      }

      canvas.width = renderWidth;
      canvas.height = renderHeight;

      // Clear and draw
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const unsubscribe = scrollYProgress.on("change", render);
    render(); // Initial render

    return () => unsubscribe();
  }, [scrollYProgress, images]);

  // Text animation opacity based on scroll progress
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const autonomousOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.55, 0.65],
    [0, 1, 1, 0]
  );
  const payloadOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.65, 0.85, 0.95],
    [0, 1, 1, 0]
  );
  const operationalOpacity = useTransform(
    scrollYProgress,
    [0.85, 0.95, 1],
    [0, 1, 1]
  );

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-white">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-white">
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full object-contain"
          style={{ willChange: "contents" }}
        />

        {/* Text Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Hero Text - 0% scroll */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center px-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter drop-shadow-lg">
                Future Of Construction
                <br />
                Robotics
              </h1>
            </div>
          </motion.div>

          {/* Autonomous - 30% scroll - Left aligned */}
          <motion.div
            style={{ opacity: autonomousOpacity }}
            className="absolute inset-0 flex items-center justify-start px-12 md:px-24"
          >
            <div className="max-w-xl">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
                Fully Autonomous
                <br />
                Robot
              </h2>
              <p className="text-lg sm:text-xl text-white/80 mt-4 tracking-tight drop-shadow-md">
                Advanced AI-powered navigation
              </p>
            </div>
          </motion.div>

          {/* Payload - 60% scroll - Right aligned */}
          <motion.div
            style={{ opacity: payloadOpacity }}
            className="absolute inset-0 flex items-center justify-end px-12 md:px-24"
          >
            <div className="max-w-xl text-right">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
                Payload Capacity
                <br />
                of 500 Kgs
              </h2>
              <p className="text-lg sm:text-xl text-white/80 mt-4 tracking-tight drop-shadow-md">
                Industrial-grade hauling power
              </p>
            </div>
          </motion.div>

          {/* Operational - 90% scroll - Centered */}
          <motion.div
            style={{ opacity: operationalOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center px-6">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
                Operational Time
                <br />
                12 Hours
              </h2>
              <p className="text-lg sm:text-xl text-white/80 mt-4 tracking-tight drop-shadow-md">
                All-day performance without interruption
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
