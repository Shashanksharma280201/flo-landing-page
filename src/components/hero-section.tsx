"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const trustBadges = [
    { icon: CheckCircle2, text: "ISO Certified" },
    { icon: CheckCircle2, text: "500+ Projects" },
    { icon: CheckCircle2, text: "24/7 Support" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#f5f5f5] overflow-hidden pt-0"
    >
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#191c1a 1px, transparent 1px),
            linear-gradient(90deg, #191c1a 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7ccd54]/5 via-transparent to-[#286c00]/5" />

      <motion.div
        style={{ opacity }}
        className="relative w-full px-6 sm:px-8 lg:px-12 xl:px-16 pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-20 lg:pb-24"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#7ccd54]/10 to-[#286c00]/10 border border-[#7ccd54]/20"
            >
              <div className="w-2 h-2 rounded-full bg-[#7ccd54] animate-pulse" />
              <span
                className="text-sm sm:text-base font-medium text-[#286c00] tracking-wide"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Autonomous Construction Robotics
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#191c1a] leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Building the Future{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#286c00]">
                  with Intelligent
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-2 left-0 right-0 h-3 bg-[#7ccd54]/20 origin-left"
                  style={{ transformOrigin: "left" }}
                />
              </span>{" "}
              Machines
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-[#191c1a]/70 leading-relaxed max-w-2xl"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              FLO Mobility delivers cutting-edge autonomous robots that transform
              construction sites with <strong className="text-[#286c00] font-semibold">24/7 operation</strong>,{" "}
              <strong className="text-[#286c00] font-semibold">500kg payload capacity</strong>, and{" "}
              <strong className="text-[#286c00] font-semibold">zero emissions</strong>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Primary CTA */}
              <Link
                href="/offerings/material-movement"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#7ccd54] text-white font-semibold rounded-xl shadow-lg shadow-[#7ccd54]/20 hover:shadow-xl hover:shadow-[#7ccd54]/30 transition-all duration-300 hover:-translate-y-1"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <span>Explore Solutions</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#286c00]/0 via-[#286c00]/10 to-[#286c00]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              {/* Secondary CTA */}
              <button
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-[#7ccd54] text-[#286c00] font-semibold rounded-xl hover:bg-[#7ccd54]/5 transition-all duration-300"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <div className="w-10 h-10 rounded-full bg-[#7ccd54]/10 flex items-center justify-center group-hover:bg-[#7ccd54]/20 transition-colors duration-300">
                  <Play className="w-4 h-4 fill-[#7ccd54] text-[#7ccd54]" />
                </div>
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#191c1a]/10"
            >
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.9 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-2"
                >
                  <badge.icon className="w-5 h-5 text-[#7ccd54]" />
                  <span
                    className="text-sm font-medium text-[#191c1a]/60"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    {badge.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Robot Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Image Container with Parallax */}
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="relative"
            >
              {/* Robot Image */}
              <div className="relative z-10">
                <Image
                  src="/next-removebg-preview.png"
                  alt="FLO Mobility Autonomous Construction Robot"
                  width={1200}
                  height={1200}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium text-[#191c1a]/40 uppercase tracking-wider">
            Scroll to Explore
          </span>
          <div className="w-6 h-10 border-2 border-[#191c1a]/20 rounded-full p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-[#7ccd54] rounded-full mx-auto"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
