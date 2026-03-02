"use client";

import Image from "next/image";
import { BELIEVERS } from "@/lib/constants";
import { useEffect, useRef } from "react";

interface LogoSectionProps {
  title: string;
  subtitle?: string;
  logos: { name: string; logo: string }[];
  bgColor?: string;
  speed?: number;
  direction?: "left" | "right";
}

function LogoScrollingSection({ title, subtitle, logos, bgColor, speed = 0.5, direction = "left" }: LogoSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  // Quadruple logos for seamless infinite loop and enough buffer
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;

    const scroll = () => {
      if (scrollContainer) {
        // Calculate single set width precisely
        const cardWidth = scrollContainer.children[0]
          ? scrollContainer.children[0].getBoundingClientRect().width
          : 0;
        const gap = parseFloat(window.getComputedStyle(scrollContainer).gap) || 0;
        const singleSetWidth = logos.length * (cardWidth + gap);

        // Auto-scroll if not paused
        if (!isPaused.current) {
          if (direction === "left") {
            scrollContainer.scrollLeft += speed;
          } else {
            scrollContainer.scrollLeft -= speed;
          }
        }

        // Seamless looping logic
        if (scrollContainer.scrollLeft >= singleSetWidth) {
          scrollContainer.scrollLeft -= singleSetWidth;
        } else if (scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft += singleSetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [logos, speed, direction]);

  return (
    <section className={`${bgColor || "bg-transparent"} py-12 sm:py-16 lg:py-20 relative overflow-hidden`}>
      <div className="w-full">
        <div className="mb-10 sm:mb-12 text-center px-4">
          <h2
            className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl mb-3"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Scrolling Container — edge fade masks */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-[#fdfcf0] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-[#fdfcf0] to-transparent" />
          <style>
            {`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-5 sm:gap-8 lg:gap-10 pb-4 no-scrollbar touch-pan-y"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onMouseEnter={() => { isPaused.current = true; }}
            onMouseLeave={() => { isPaused.current = false; }}
            onTouchStart={() => { isPaused.current = true; }}
            onTouchEnd={() => { isPaused.current = false; }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="relative w-40 h-24 sm:w-56 sm:h-36 lg:w-72 lg:h-44 flex items-center justify-center overflow-hidden rounded-xl lg:rounded-2xl hover:scale-105 transition-all duration-300">
                  <Image
                    src={logo.logo}
                    alt={`${logo.name} logo`}
                    fill
                    className="object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LogoShowcase() {
  return (
    <div>
      <LogoScrollingSection
        title="Our Believers"
        subtitle="Backed by visionaries who believe in the future of autonomous robotics"
        logos={BELIEVERS}
        bgColor="bg-transparent"
        direction="right"
        speed={1.5}
      />
    </div>
  );
}
