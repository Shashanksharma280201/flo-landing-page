'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CUSTOMERS } from '@/lib/constants';

// 15 customers → set1: first 12, set2: last 12 (wraps around), giving 2-row 6-col grids
const LOGO_SETS = [
  CUSTOMERS.slice(0, 12),
  [...CUSTOMERS.slice(3), ...CUSTOMERS.slice(0, 3)].slice(0, 12),
];

// Mobile auto-scrolling strip
function MobileScrollStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const duplicated = [...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS, ...CUSTOMERS];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf: number;

    const scroll = () => {
      if (!isPaused.current && el) {
        el.scrollLeft += 0.6;
        const cardWidth = el.children[0]?.getBoundingClientRect().width ?? 0;
        const gap = parseFloat(window.getComputedStyle(el).gap) || 0;
        const singleSetWidth = CUSTOMERS.length * (cardWidth + gap);
        if (el.scrollLeft >= singleSetWidth) el.scrollLeft -= singleSetWidth;
      }
      raf = requestAnimationFrame(scroll);
    };

    raf = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative w-full">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-10 bg-gradient-to-l from-white to-transparent" />
      <div
        ref={scrollRef}
        className="no-scrollbar flex touch-pan-x gap-3 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onTouchStart={() => {
          isPaused.current = true;
        }}
        onTouchEnd={() => {
          isPaused.current = false;
        }}
      >
        {duplicated.map((customer, i) => (
          <div key={`${customer.name}-${i}`} className="flex-shrink-0">
            <div className="relative h-14 w-24 overflow-hidden rounded-xl border border-gray-200/80 bg-white p-2.5 shadow-sm">
              <Image
                src={customer.logo}
                alt={`${customer.name} logo`}
                fill
                quality={90}
                className="object-contain"
                sizes="96px"
              />
            </div>
          </div>
        ))}
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}

export function CustomersSection() {
  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % LOGO_SETS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-20 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7ccd54]/5 blur-[120px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 space-y-3 text-center lg:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-[0.2em] text-[#7ccd54] uppercase sm:text-base"
          >
            Trusted By Industry Leaders
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl leading-[1.15] font-bold text-balance break-words text-gray-900 sm:text-4xl lg:text-5xl xl:text-6xl"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Powering Operations Across{' '}
            <span className="inline bg-gradient-to-r from-[#7ccd54] via-[#9be06d] to-[#7ccd54] [box-decoration-break:clone] bg-clip-text text-transparent [-webkit-box-decoration-break:clone]">
              India's Largest Projects
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg"
          >
            From construction giants to innovative tech companies, our autonomous robots
            are transforming workflows
          </motion.p>
        </div>

        {/* Mobile: auto-scrolling strip */}
        <div className="block sm:hidden">
          <MobileScrollStrip />
        </div>

        {/* Desktop: animated grid */}
        <div className="mx-auto hidden max-w-7xl sm:block">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentSet}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 md:gap-3"
            >
              {LOGO_SETS[currentSet].map((customer, index) => (
                <motion.div
                  key={`${customer.name}-${currentSet}`}
                  custom={index}
                  variants={{
                    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
                    visible: (i: number) => ({
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 0.5,
                        delay: i * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }),
                    exit: {
                      opacity: 0,
                      y: -30,
                      filter: 'blur(8px)',
                      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="group relative flex items-center justify-center"
                >
                  <div className="relative flex h-20 w-full items-center justify-center overflow-hidden rounded-xl border border-gray-200/80 bg-white p-2 shadow-sm transition-all duration-300 hover:scale-105 hover:border-[#7ccd54]/50 hover:shadow-md md:h-24 lg:h-24">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#7ccd54]/0 to-[#7ccd54]/0 transition-all duration-300 group-hover:from-[#7ccd54]/5 group-hover:to-[#7ccd54]/5" />
                    <div className="relative h-[75%] w-[85%]">
                      <Image
                        src={customer.logo}
                        alt={`${customer.name} logo`}
                        fill
                        quality={85}
                        className="object-contain"
                        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 14vw"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {LOGO_SETS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSet(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSet === index
                    ? 'w-6 bg-[#7ccd54]'
                    : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Show logo set ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
