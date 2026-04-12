"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CUSTOMERS } from "@/lib/constants";

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
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10 bg-gradient-to-l from-white to-transparent" />
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 pb-2 no-scrollbar touch-pan-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onTouchStart={() => { isPaused.current = true; }}
        onTouchEnd={() => { isPaused.current = false; }}
      >
        {duplicated.map((customer, i) => (
          <div key={`${customer.name}-${i}`} className="flex-shrink-0">
            <div className="relative w-24 h-14 rounded-xl border border-gray-200/80 bg-white p-2.5 shadow-sm overflow-hidden">
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
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7ccd54]/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 lg:mb-14 text-center space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-[#7ccd54]"
          >
            Trusted By Industry Leaders
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Powering Operations Across{" "}
            <span className="bg-gradient-to-r from-[#7ccd54] via-[#9be06d] to-[#7ccd54] bg-clip-text text-transparent">
              India's Largest Projects
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto"
          >
            From construction giants to innovative tech companies, our
            autonomous robots are transforming workflows
          </motion.p>
        </div>

        {/* Mobile: auto-scrolling strip */}
        <div className="block sm:hidden">
          <MobileScrollStrip />
        </div>

        {/* Desktop: animated grid */}
        <div className="hidden sm:block mx-auto max-w-7xl">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentSet}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-3"
            >
              {LOGO_SETS[currentSet].map((customer, index) => (
                <motion.div
                  key={`${customer.name}-${currentSet}`}
                  custom={index}
                  variants={{
                    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                    visible: (i: number) => ({
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.5,
                        delay: i * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }),
                    exit: {
                      opacity: 0,
                      y: -30,
                      filter: "blur(8px)",
                      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="group relative flex items-center justify-center"
                >
                  <div className="relative h-20 w-full md:h-24 lg:h-24 rounded-xl border border-gray-200/80 bg-white p-2 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 hover:border-[#7ccd54]/50 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7ccd54]/0 to-[#7ccd54]/0 group-hover:from-[#7ccd54]/5 group-hover:to-[#7ccd54]/5 transition-all duration-300 rounded-xl" />
                    <div className="relative w-[85%] h-[75%]">
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
                    ? "w-6 bg-[#7ccd54]"
                    : "w-1.5 bg-gray-300 hover:bg-gray-400"
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
