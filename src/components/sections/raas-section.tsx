"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function RaasSection() {
  const { ref: product1Ref, isIntersecting: product1Visible } =
    useIntersectionObserver({
      threshold: 0.2,
      triggerOnce: true,
    });

  const { ref: product2Ref, isIntersecting: product2Visible } =
    useIntersectionObserver({
      threshold: 0.2,
      triggerOnce: true,
    });

  return (
    <section id="raas" className="relative overflow-hidden bg-white">
      <div className="relative bg-white py-20 lg:py-28">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#7ccd54]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#1a3a1f]/8 blur-3xl" />
        <div className="relative z-10 text-center px-8 sm:px-12 lg:px-16">
          <h2
            className="mb-6 font-bold leading-[1.15] tracking-tight text-gray-900"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(1.75rem, 4vw + 1rem, 3rem)",
            }}
          >
            <span className="whitespace-nowrap">
              Robot-as-a-<span className="text-primary">Service</span>
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-[clamp(1.125rem,0.6vw+1rem,1.5rem)] leading-relaxed text-gray-600">
            Cutting-edge robots on a flexible subscription basis, automating
            material handling and wall finishing with seamless integration.
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
            animate={
              product1Visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
            }
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
              animate={
                product1Visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
              }
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
            >
              <h3
                className="mb-5 font-bold leading-[1.2] tracking-tight text-gray-900"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "clamp(1.75rem, 4vw + 1rem, 3rem)",
                }}
              >
                <span className="whitespace-nowrap">
                  Material <span className="text-primary">Movement</span>
                </span>
              </h3>

              <p className="mb-8 max-w-xl text-[clamp(0.95rem,0.3vw+0.9rem,1.1rem)] leading-relaxed text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, nunc vel tincidunt lacinia, nisl nunc aliquam nunc,
                vitae aliquam nisl nunc vel nisl. Integer feugiat, arcu non
                suscipit aliquam, est massa posuere sapien, at luctus sem justo
                nec lorem. Vivamus id magna ut ante congue gravida. Curabitur
                luctus, nisl sed facilisis interdum, augue augue gravida mi, ut
                tristique neque velit id libero. Suspendisse potenti. Donec
                aliquet, velit et bibendum volutpat, mauris sapien hendrerit
                nisi, nec posuere lorem urna vel justo. Praesent dictum erat ac
                tortor vulputate, nec ultrices eros tristique. Nam laoreet
                pulvinar eros, a cursus ipsum consequat sed. Quisque sit amet
                lectus id velit laoreet placerat. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis
                egestas. Morbi posuere, turpis in facilisis tristique, dolor
                urna tristique lorem, ut aliquet lorem tellus nec risus. Nulla
                facilisi. Aliquam erat volutpat. Vestibulum ante ipsum primis in
                faucibus orci luctus et ultrices posuere cubilia curae; Integer
                porttitor tincidunt urna, vitae convallis justo mattis vel.
                Donec at purus id augue tempor aliquam. Sed a arcu non lorem
                malesuada efficitur. Integer in justo quis sapien gravida
                facilisis. Duis euismod, velit id varius faucibus, augue nulla
                tempus nibh, sed tincidunt risus risus non sem. Nulla facilisi.
                Cras nec justo vitae magna gravida dictum. Curabitur sed urna
                sem. Aenean feugiat volutpat massa, a suscipit velit tincidunt
                in. Morbi nec sapien at odio tincidunt tincidunt. Proin sed
                volutpat mauris.
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
      <div ref={product2Ref} className="relative w-full bg-white">
        <div className="grid lg:grid-cols-2 min-h-[600px] lg:min-h-[800px]">
          {/* Left - Content */}
          <div className="relative flex items-center order-2 lg:order-1">
            <motion.div
              className="w-full px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20"
              initial={{ opacity: 0, x: -100 }}
              animate={
                product2Visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
              }
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
            >
              <h3
                className="mb-5 font-bold leading-[1.2] tracking-tight text-gray-900"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "clamp(1.75rem, 4vw + 1rem, 3rem)",
                }}
              >
                <span className="whitespace-nowrap">
                  Lawn <span className="text-primary">Mower</span>
                </span>
              </h3>

              <p className="mb-8 max-w-xl text-[clamp(0.95rem,0.3vw+0.9rem,1.1rem)] leading-relaxed text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                posuere, nunc at scelerisque fermentum, lectus sem fermentum
                nibh, sed cursus turpis sapien nec libero. Integer lacinia
                turpis non massa interdum, at fermentum ipsum luctus. Mauris
                vehicula, arcu vitae luctus tincidunt, risus velit iaculis
                ipsum, id gravida lorem purus vitae arcu. Sed dignissim, sapien
                eget ultrices gravida, lacus sem interdum mauris, ac vulputate
                odio purus vitae velit. Vivamus sagittis eros nec nisi porta,
                vel efficitur lectus viverra. Integer non arcu vitae odio
                tincidunt hendrerit. Suspendisse potenti. Donec vel sem in augue
                tincidunt dictum. Praesent auctor, justo non malesuada
                tincidunt, lorem mi facilisis lorem, ut porta neque risus id
                nisl. Nam non magna sed justo tristique aliquet. Integer
                ultricies, sem in convallis gravida, sapien libero posuere
                lorem, sit amet ultrices purus odio eu nisl. Cras eu lectus
                posuere, feugiat nibh sed, cursus mauris. Vestibulum ante ipsum
                primis in faucibus orci luctus et ultrices posuere cubilia
                curae; Sed vitae lorem sed sapien posuere blandit. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac
                turpis egestas. Donec accumsan eros eu sem feugiat, sed
                ullamcorper sem placerat. In hac habitasse platea dictumst.
                Curabitur faucibus, nibh et suscipit maximus, nunc nisi feugiat
                erat, sed feugiat augue orci sed nisl. Integer quis ante sit
                amet sapien iaculis convallis.
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
            animate={
              product2Visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
            }
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/mmr-images/mmr-images-2.jpg"
              alt="Lawn Mower robot"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-white/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
