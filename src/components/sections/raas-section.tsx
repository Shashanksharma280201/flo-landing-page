"use client";

import { useState, useRef, useEffect } from "react";
import { RAAS_CONTENT } from "@/lib/constants";
import { VideoPlayer } from "@/components/shared/video-player";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface ProductSectionProps {
  product: (typeof RAAS_CONTENT.products)[0];
  index: number;
  setActiveIndex: (index: number) => void;
}

function ProductSection({
  product,
  index,
  setActiveIndex,
}: ProductSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-40% 0px -40% 0px", // Trigger when in middle of screen
  });

  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  // Benefit-driven headlines mapping
  const premiumHeadlines: Record<string, string> = {
    "material-movement": "Logistics that move with your business.",
    "lawn-mower": "The most reliable hand on your lawn.",
    "wall-finishing": "Perfect finishes, every single time.",
  };

  return (
    <div
      ref={ref}
      className="min-h-[60vh] lg:min-h-screen flex flex-col justify-center py-20 lg:py-0"
    >
      <div className="max-w-xl space-y-6">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fdfcf0] border border-gray-200 text-gray-600 font-medium text-sm shadow-sm"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-[#7ccd54] uppercase tracking-wider">
            {product.title}
          </span>
        </div>

        <h3
          className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {premiumHeadlines[product.id] || product.title}
        </h3>

        <p className="text-lg leading-relaxed text-gray-600">
          {product.description}
        </p>

        {/* Mobile Video - Only visible on small screens */}
        <div className="lg:hidden mt-8">
          <div className="relative rounded-xl overflow-hidden border border-gray-100 shadow-2xl bg-white">
            <VideoPlayer videoId={product.videoId} title={product.title} />
          </div>
        </div>

        <div className="pt-4">
          <a
            href={`/offerings/${product.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-[#7ccd54] transition-all duration-300 group shadow-lg hover:shadow-xl"
          >
            Learn more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function RaasSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative bg-[#fdfcf0] overflow-clip">
      {/* ── Professional CSS blob system — compositor-only, zero JS ── */}
      <style>{`
        /* Shape morphing + drift — border-radius shift gives organic breathing feel */
        @keyframes raas-blob-a {
          0%,100% {
            transform: translate(0px, 0px) scale(1);
            border-radius: 62% 38% 68% 32% / 52% 64% 36% 48%;
          }
          30% {
            transform: translate(55px, -70px) scale(1.07);
            border-radius: 38% 62% 44% 56% / 66% 34% 58% 42%;
          }
          65% {
            transform: translate(-40px, 50px) scale(0.95);
            border-radius: 72% 28% 52% 48% / 38% 72% 28% 62%;
          }
        }
        @keyframes raas-blob-b {
          0%,100% {
            transform: translate(0px, 0px) scale(1);
            border-radius: 42% 58% 32% 68% / 64% 36% 56% 44%;
          }
          35% {
            transform: translate(-60px, 55px) scale(1.06);
            border-radius: 66% 34% 60% 40% / 42% 68% 32% 58%;
          }
          70% {
            transform: translate(45px, -35px) scale(0.94);
            border-radius: 36% 64% 50% 50% / 58% 42% 66% 34%;
          }
        }
        @keyframes raas-blob-c {
          0%,100% {
            transform: translate(0px, 0px) scale(1);
            border-radius: 54% 46% 40% 60% / 44% 56% 44% 56%;
          }
          40% {
            transform: translate(50px, 65px) scale(0.92);
            border-radius: 40% 60% 66% 34% / 60% 40% 54% 46%;
          }
          75% {
            transform: translate(-45px, -45px) scale(1.09);
            border-radius: 68% 32% 44% 56% / 36% 64% 40% 60%;
          }
        }
        /* Subtle pulse on the accent glow — opacity only, lightest touch */
        @keyframes raas-blob-accent {
          0%,100% { opacity: 0.12; }
          50%     { opacity: 0.22; }
        }
      `}</style>

      {/*
        Blob A — PRIMARY  (dark forest green, top-left, most defined)
        Less blur = more "present", anchors the section visually
      */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "700px", height: "520px",
          top: "-4%", left: "-8%",
          background: "radial-gradient(ellipse at 45% 45%, rgba(26,58,31,0.45) 0%, rgba(26,58,31,0.22) 40%, transparent 72%)",
          filter: "blur(55px)",
          animation: "raas-blob-a 20s ease-in-out infinite",
          willChange: "transform",
          borderRadius: "62% 38% 68% 32% / 52% 64% 36% 48%",
        }}
      />

      {/*
        Blob B — SECONDARY  (slightly brighter mid-green, center-right)
        More blur = recedes into background, creates depth layer
      */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "620px", height: "460px",
          top: "35%", right: "-6%",
          background: "radial-gradient(ellipse at 55% 40%, rgba(45,90,45,0.38) 0%, rgba(45,90,45,0.16) 45%, transparent 72%)",
          filter: "blur(75px)",
          animation: "raas-blob-b 26s ease-in-out infinite",
          willChange: "transform",
          borderRadius: "42% 58% 32% 68% / 64% 36% 56% 44%",
        }}
      />

      {/*
        Blob C — DEPTH  (darkest, bottom-left, heavily blurred)
        Creates the shadowed "floor" of the composition
      */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "560px", height: "400px",
          bottom: "5%", left: "15%",
          background: "radial-gradient(ellipse at 50% 55%, rgba(20,48,24,0.32) 0%, rgba(20,48,24,0.14) 45%, transparent 72%)",
          filter: "blur(90px)",
          animation: "raas-blob-c 32s ease-in-out infinite",
          willChange: "transform",
          borderRadius: "54% 46% 40% 60% / 44% 56% 44% 56%",
        }}
      />

      {/*
        Accent glow — brand lime green, center, extremely diffuse
        Adds a faint warm highlight without competing with content
      */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "500px", height: "300px",
          top: "18%", left: "30%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(124,205,84,0.18) 0%, transparent 65%)",
          filter: "blur(60px)",
          animation: "raas-blob-accent 8s ease-in-out infinite",
          willChange: "opacity",
        }}
      />

      <section id="raas" className="relative z-10">
        <div className="container mx-auto px-4 pt-24 lg:pt-32">
          {/* Section Header */}
          <FadeIn>
            <div className="mb-12 lg:mb-24 text-center max-w-4xl mx-auto">
              <div className="inline-block rounded-full bg-[#fdfcf0] px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-6 border border-gray-200 uppercase shadow-sm">
                Our Solutions
              </div>
              <h2
                className="mb-6 text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl lg:text-6xl text-balance"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {RAAS_CONTENT.title}
              </h2>
              <p className="mx-auto max-w-3xl text-lg sm:text-xl text-gray-600 text-pretty leading-relaxed">
                {RAAS_CONTENT.subtitle}
              </p>
            </div>
          </FadeIn>

          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left Column: Text Content (Scrolls) */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-0">
                {RAAS_CONTENT.products.map((product, index) => (
                  <ProductSection
                    key={product.id}
                    product={product}
                    index={index}
                    setActiveIndex={setActiveIndex}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Sticky Video Content */}
            <div className="hidden lg:block w-1/2 sticky top-0 h-screen">
              <div className="h-full flex flex-col justify-center">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 group transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <VideoPlayer
                        videoId={RAAS_CONTENT.products[activeIndex].videoId}
                        title={RAAS_CONTENT.products[activeIndex].title}
                        className="h-full w-full rounded-none shadow-none"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Active Demo badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 text-[10px] font-bold tracking-widest uppercase text-gray-500 shadow-sm">
                      Active Demo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
