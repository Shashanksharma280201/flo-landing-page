"use client";

import Image from "next/image";
import { HexagonGrid } from "@/components/patterns/hexagon-grid";
import { CUSTOMERS } from "@/lib/constants";
import { useEffect, useRef } from "react";

export function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  // Quadruple logos for seamless infinite loop and enough buffer
  const duplicatedLogos = [...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS];

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
        const singleSetWidth = CUSTOMERS.length * (cardWidth + gap);

        // Auto-scroll if not paused
        if (!isPaused.current) {
          scrollContainer.scrollLeft += 1.5;
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
  }, []);

  return (
    <section className="relative bg-transparent py-16 sm:py-24 lg:py-32 overflow-hidden">
      <HexagonGrid opacity={0.02} />
      <div className="w-full relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 lg:mb-16 text-center px-4">
          <div className="inline-block rounded-full bg-[#fdfcf0] px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 mb-4 border border-gray-200 uppercase shadow-sm">
            Trusted By
          </div>
          <h2 className="text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl lg:text-4xl" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Our Customers
          </h2>
        </div>

        {/* Scrolling Container — edge fade masks for depth */}
        <div className="relative w-full">
          {/* Left/right fade masks */}
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
            {duplicatedLogos.map((customer, index) => (
              <div
                key={`${customer.name}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="relative w-40 h-24 sm:w-56 sm:h-36 lg:w-72 lg:h-44 flex items-center justify-center overflow-hidden rounded-xl lg:rounded-2xl hover:scale-105 transition-all duration-300">
                  <Image
                    src={customer.logo}
                    alt={`${customer.name} logo`}
                    fill
                    className="object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
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
