'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { TrackedYouTubeIframe } from '@/components/shared/tracked-youtube-iframe';

export function RaasSection() {
  const { ref: product1Ref, isIntersecting: product1Visible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: product2Ref, isIntersecting: product2Visible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="raas" className="relative z-10 overflow-hidden bg-white">
      <div className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-[#7ccd54]/10 blur-3xl sm:h-80 sm:w-80 lg:h-96 lg:w-96" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#1a3a1f]/8 blur-3xl sm:h-80 sm:w-80 lg:h-96 lg:w-96" />
        <div className="relative z-10 px-4 text-center sm:px-8 md:px-12 lg:px-16">
          <h2
            className="mb-4 leading-[1.15] font-bold tracking-tight break-words text-gray-900 sm:mb-6"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 'clamp(1.5rem, 6vw, 3rem)',
            }}
          >
            <span>
              Robot as a{' '}
              <span className="text-primary inline [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                Service
              </span>
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-[clamp(0.95rem,0.5vw+0.9rem,1.5rem)] leading-relaxed text-gray-600">
            Cutting-edge robots on a flexible subscription basis, automating material
            handling and wall finishing with seamless integration.
          </p>
        </div>
      </div>

      {/* Product 1 - Material Movement with Video - Full Width Split */}
      <div ref={product1Ref} className="relative w-full max-w-full bg-white">
        <div className="grid min-h-[500px] sm:min-h-[600px] lg:min-h-[800px] lg:grid-cols-2">
          {/* Left - Video */}
          <motion.div
            className="relative order-1 min-h-[300px] bg-black sm:min-h-[400px] lg:order-1 lg:min-h-full"
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
          <div className="relative order-2 flex items-center bg-white lg:order-2">
            <motion.div
              className="w-full px-4 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-20 xl:px-20"
              initial={{ opacity: 0, x: 100 }}
              animate={product1Visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
            >
              <h3
                className="mb-4 leading-[1.2] font-bold tracking-tight break-words text-gray-900 sm:mb-5"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                }}
              >
                <span>
                  Material{' '}
                  <span className="text-primary inline [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                    Movement
                  </span>
                </span>
              </h3>

              <p className="mb-6 max-w-xl text-[clamp(0.875rem,0.4vw+0.85rem,1.1rem)] leading-relaxed text-gray-600 sm:mb-8">
                With advanced sensors and autonomous navigation, this efficient and
                adaptable robot streamlines logistics operations with speed and
                reliability. Experience optimized efficiency, reduced manual labor, and
                increased productivity with the Material Movement Bot.
              </p>

              <Link
                href="/offerings/material-movement"
                className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-wide text-white uppercase shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-8 sm:py-4 sm:text-base"
              >
                Explore Solution
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Product 2 - Lawn Mower - Full Width Split Reversed */}
      <div ref={product2Ref} className="relative w-full max-w-full bg-white">
        <div className="grid min-h-[500px] sm:min-h-[600px] lg:min-h-[800px] lg:grid-cols-2">
          {/* Left - Content */}
          <div className="relative order-2 flex items-center lg:order-1">
            <motion.div
              className="w-full px-4 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-20 xl:px-20"
              initial={{ opacity: 0, x: -100 }}
              animate={product2Visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
            >
              <h3
                className="mb-4 leading-[1.2] font-bold tracking-tight break-words text-gray-900 sm:mb-5"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                }}
              >
                <span>
                  Lawn{' '}
                  <span className="text-primary inline [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                    Mower
                  </span>
                </span>
              </h3>

              <p className="mb-6 max-w-xl text-[clamp(0.875rem,0.4vw+0.85rem,1.1rem)] leading-relaxed text-gray-600 sm:mb-8">
                Our lawn mowing robot will take care of your lawn, so you can relax and
                enjoy your free time. Efficient and safe. The robot is equipped with
                sensors that prevent it from colliding with objects or getting stuck. The
                cost is less expensive than hiring a traditional lawn service.
              </p>

              <Link
                href="/offerings/lawn-mower"
                className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-wide text-white uppercase shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-8 sm:py-4 sm:text-base"
              >
                Explore Solution
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </motion.div>
          </div>

          {/* Right - YouTube Video */}
          <motion.div
            className="relative order-1 min-h-[300px] bg-black sm:min-h-[400px] lg:order-2 lg:min-h-full"
            initial={{ opacity: 0, x: 100 }}
            animate={product2Visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 h-full w-full">
              <TrackedYouTubeIframe
                videoId="NDvQAb3qPzI"
                className="h-full w-full"
                src="https://www.youtube.com/embed/NDvQAb3qPzI?autoplay=1&mute=1&loop=1&playlist=NDvQAb3qPzI&controls=0&modestbranding=1&rel=0"
                title="Lawn Mower Robot"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/20 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
