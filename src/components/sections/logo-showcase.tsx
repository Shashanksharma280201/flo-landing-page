'use client';

import Image from 'next/image';
import { BELIEVERS } from '@/lib/constants';
import { useEffect, useRef } from 'react';

interface LogoSectionProps {
  title: string;
  subtitle?: string;
  logos: { name: string; logo: string }[];
  bgColor?: string;
  speed?: number;
  direction?: 'left' | 'right';
}

function LogoScrollingSection({
  title,
  subtitle,
  logos,
  bgColor,
  speed = 0.5,
  direction = 'left',
}: LogoSectionProps) {
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
          if (direction === 'left') {
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
    <section
      className={`${bgColor || 'bg-transparent'} relative overflow-hidden py-12 sm:py-16 lg:py-20`}
    >
      <div className="w-full">
        <div className="mb-10 px-4 text-center sm:mb-12">
          <h2
            className="mb-3 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>

        {/* Scrolling Container — edge fade masks */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />
          <style>
            {`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <div
            ref={scrollRef}
            className="no-scrollbar flex touch-pan-y gap-3 overflow-x-auto pb-4 sm:gap-5 lg:gap-6"
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
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="group flex-shrink-0 cursor-pointer"
              >
                <div className="relative flex h-14 w-24 items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 sm:h-20 sm:w-32 lg:h-24 lg:w-40 lg:rounded-xl">
                  <Image
                    src={logo.logo}
                    alt={`${logo.name} logo`}
                    fill
                    className="object-contain opacity-70 grayscale filter transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                    sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
                    quality={85}
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
