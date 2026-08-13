'use client';

import Image from 'next/image';
import { HexagonGrid } from '@/components/patterns/hexagon-grid';
import { CUSTOMERS } from '@/lib/constants';
import { useEffect, useRef } from 'react';

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
    <section className="relative overflow-hidden bg-transparent py-16 sm:py-24 lg:py-32">
      <HexagonGrid opacity={0.02} />
      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div className="mb-10 px-4 text-center sm:mb-14 lg:mb-16">
          <div className="mb-4 inline-block rounded-full border border-gray-200 bg-[#fdfcf0] px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-600 uppercase shadow-sm">
            Trusted By
          </div>
          <h2
            className="text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl lg:text-4xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Our Customers
          </h2>
        </div>

        {/* Scrolling Container — edge fade masks for depth */}
        <div className="relative w-full">
          {/* Left/right fade masks */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fdfcf0] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[#fdfcf0] to-transparent sm:w-24" />
          <style>
            {`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <div
            ref={scrollRef}
            className="no-scrollbar flex touch-pan-y gap-5 overflow-x-auto pb-4 sm:gap-8 lg:gap-10"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onMouseEnter={() => {
              isPaused.current = true;
            }}
            onMouseLeave={() => {
              isPaused.current = false;
            }}
            onTouchStart={() => {
              isPaused.current = true;
            }}
            onTouchEnd={() => {
              isPaused.current = false;
            }}
          >
            {duplicatedLogos.map((customer, index) => (
              <div
                key={`${customer.name}-${index}`}
                className="group flex-shrink-0 cursor-pointer"
              >
                <div className="relative flex h-24 w-40 items-center justify-center overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 sm:h-36 sm:w-56 lg:h-44 lg:w-72 lg:rounded-2xl">
                  <Image
                    src={customer.logo}
                    alt={`${customer.name} logo`}
                    fill
                    className="object-cover opacity-70 grayscale filter transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
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
