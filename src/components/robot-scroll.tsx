"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const TOTAL_FRAMES = 419;
const FRAME_PATH = "/frames/frame_";

// Loading component
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50 overflow-hidden">
      {/* Scrolling Wireframe Text */}
      <div className="w-full overflow-hidden mb-8 sm:mb-12 md:mb-16">
        <div className="animate-scroll-text whitespace-nowrap">
          <span
            className="inline-block text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-bold tracking-wider"
            style={{
              fontFamily: "var(--font-dm-sans)",
              WebkitTextStroke: "2px #7ccd54",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            FLO MOBILITY • FLO MOBILITY • FLO MOBILITY • FLO MOBILITY •
          </span>
        </div>
      </div>

      {/* Loading Animation */}
      <div className="text-center px-4">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto mb-4 sm:mb-6">
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
              stroke="#7ccd54"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="#7ccd54"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-900 tracking-tight mb-2">
          Loading Experience
        </p>
        <p className="text-sm sm:text-base md:text-lg text-primary font-bold">{progress}%</p>
      </div>

      <style jsx>{`
        @keyframes scroll-text {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-text {
          animation: scroll-text 20s linear infinite;
        }
      `}</style>
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

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(6, "0");
      img.src = `${FRAME_PATH}${frameNumber}.png`;

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

      const containerWidth = canvas.parentElement?.clientWidth || window.innerWidth;
      const containerHeight = canvas.parentElement?.clientHeight || window.innerHeight;

      // Set canvas to match container dimensions
      canvas.width = containerWidth;
      canvas.height = containerHeight;

      // Calculate dimensions to maintain aspect ratio with "cover" behavior
      const imgAspect = img.width / img.height;
      const canvasAspect = containerWidth / containerHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > imgAspect) {
        // Canvas is wider than image - fit to width
        drawWidth = containerWidth;
        drawHeight = containerWidth / imgAspect;
        offsetX = 0;
        offsetY = (containerHeight - drawHeight) / 2;
      } else {
        // Canvas is taller than image - fit to height
        drawHeight = containerHeight;
        drawWidth = containerHeight * imgAspect;
        offsetX = (containerWidth - drawWidth) / 2;
        offsetY = 0;
      }

      // Clear and draw with proper aspect ratio
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const unsubscribe = scrollYProgress.on("change", render);
    render(); // Initial render

    return () => unsubscribe();
  }, [scrollYProgress, images]);

  return (
    <div ref={containerRef} className="relative h-[400vh] sm:h-[500vh] lg:h-[600vh] bg-white max-w-full">
      {/* Sticky Canvas Container - Full Width */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-white">
        <canvas
          ref={canvasRef}
          className="w-full h-full max-w-full"
          style={{ willChange: "contents" }}
        />
      </div>
    </div>
  );
}
