"use client";

import Image from "next/image";
import Link from "next/link";
import { RAAS_CONTENT } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function RaasSection() {
  const { ref: product1Ref, isIntersecting: product1Visible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: product2Ref, isIntersecting: product2Visible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: product3Ref, isIntersecting: product3Visible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="raas" className="relative overflow-hidden bg-white">
      {/* Header Section - Full Width */}
      <div className="relative bg-[#fdfcf0] py-20 lg:py-28">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#7ccd54]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#1a3a1f]/8 blur-3xl" />

        <div className="relative z-10 text-center px-8 sm:px-12 lg:px-16">
          <div className="inline-block mb-8">
            <div className="h-1 w-16 bg-primary mb-4 mx-auto"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
              Our Solutions
            </span>
          </div>

          <h2
            className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mb-6 leading-[1.15]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Robots as a
            <br />
            <span className="text-primary">Service</span>
          </h2>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl lg:text-2xl">
            Cutting-edge robots on a flexible subscription basis, automating material handling and wall finishing with seamless integration.
          </p>
        </div>
      </div>

      {/* Product 1 - Material Movement with Video - Full Width Split */}
      <div ref={product1Ref} className="relative w-full bg-white">
        <div className="grid lg:grid-cols-2 min-h-[600px] lg:min-h-[800px]">
          {/* Left - Video */}
          <motion.div
            className="relative bg-black order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            animate={product1Visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          </motion.div>

          {/* Right - Content */}
          <div className="relative bg-white flex items-center order-1 lg:order-2">
            <motion.div
              className="w-full px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20"
              initial={{ opacity: 0, x: 100 }}
              animate={product1Visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <h3
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-5 leading-[1.2]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Material
                <br />
                <span className="text-primary">Movement</span>
              </h3>

              <p className="text-lg sm:text-xl leading-relaxed text-gray-600 mb-8 max-w-xl">
                Advanced sensors and autonomous navigation streamline logistics operations with speed and reliability. Optimized efficiency, reduced manual labor, increased productivity.
              </p>

              <Link
                href="/offerings/material-movement"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-white uppercase tracking-wide transition-all duration-300 hover:bg-primary/90 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Solution
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Product 2 - Lawn Mower - Full Width Split Reversed */}
      <div ref={product2Ref} className="relative w-full bg-[#fdfcf0]">
        <div className="grid lg:grid-cols-2 min-h-[600px] lg:min-h-[800px]">
          {/* Left - Content */}
          <div className="relative flex items-center order-2 lg:order-1">
            <motion.div
              className="w-full px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20"
              initial={{ opacity: 0, x: -100 }}
              animate={product2Visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <h3
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-5 leading-[1.2]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Lawn
                <br />
                <span className="text-primary">Mower</span>
              </h3>

              <p className="text-lg sm:text-xl leading-relaxed text-gray-600 mb-8 max-w-xl">
                Autonomous lawn care that lets you relax. Equipped with advanced sensors for safe, efficient operation. More cost-effective than traditional services.
              </p>

              <Link
                href="/offerings/lawn-mower"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-white uppercase tracking-wide transition-all duration-300 hover:bg-primary/90 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Solution
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>

          {/* Right - Image */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            animate={product2Visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/mmr-images/mmr-images-2.jpg"
              alt="Lawn Mower robot"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#fdfcf0]/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Product 3 - Wall Finishing - Full Width Split */}
      <div ref={product3Ref} className="relative w-full bg-white">
        <div className="grid lg:grid-cols-2 min-h-[600px] lg:min-h-[800px]">
          {/* Left - Image */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            animate={product3Visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/mmr-images/mmr-images-3.jpg"
              alt="Wall Finishing robot"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent" />
          </motion.div>

          {/* Right - Content */}
          <div className="relative flex items-center order-1 lg:order-2">
            <motion.div
              className="w-full px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20"
              initial={{ opacity: 0, x: 100 }}
              animate={product3Visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <h3
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-5 leading-[1.2]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Wall
                <br />
                <span className="text-primary">Finishing</span>
              </h3>

              <p className="text-lg sm:text-xl leading-relaxed text-gray-600 mb-8 max-w-xl">
                Automated sanding and putty application with precision movement. Delivers uniformity, consistency, and reduces material waste for superior quality finishes.
              </p>

              <Link
                href="/offerings/wall-finishing"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-white uppercase tracking-wide transition-all duration-300 hover:bg-primary/90 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Solution
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
