"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CUSTOMERS } from "@/lib/constants";

// Split customers into sets of 8 for rotation
const LOGO_SETS = [
  CUSTOMERS.slice(0, 8),
  CUSTOMERS.slice(8, 15).concat(CUSTOMERS.slice(0, 1)), // 7 + 1 to make 8
];

export function CustomersSection() {
  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % LOGO_SETS.length);
    }, 3000); // Swap every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-20 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7ccd54]/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 lg:mb-16 text-center space-y-3">
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

        {/* Logo Grid with Swap Animation */}
        <div className="mx-auto max-w-7xl">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentSet}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            >
              {LOGO_SETS[currentSet].map((customer, index) => (
                <motion.div
                  key={`${customer.name}-${currentSet}`}
                  custom={index}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 40,
                      filter: "blur(10px)",
                    },
                    visible: (i: number) => ({
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }),
                    exit: {
                      opacity: 0,
                      y: -40,
                      filter: "blur(10px)",
                      transition: {
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="group relative flex items-center justify-center"
                >
                  <div className="relative h-28 w-full sm:h-32 md:h-36 lg:h-40 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-[#7ccd54]/50 overflow-hidden">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7ccd54]/0 via-[#9be06d]/0 to-[#7ccd54]/0 group-hover:from-[#7ccd54]/5 group-hover:via-[#9be06d]/5 group-hover:to-[#7ccd54]/5 transition-all duration-300 rounded-2xl" />

                    {/* Logo */}
                    <div className="relative h-full w-full">
                      <Image
                        src={customer.logo}
                        alt={`${customer.name} logo`}
                        fill
                        quality={100}
                        className="object-contain"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="mt-10 lg:mt-12 flex items-center justify-center gap-2">
            {LOGO_SETS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSet(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSet === index
                    ? "w-8 bg-[#7ccd54]"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
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
