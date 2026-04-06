"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Linkedin, Twitter, Instagram, Youtube } from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";

const FOOTER_LINKS = {
  col1: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "News", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ],
  col2: [
    { name: "Material Movement", href: "/offerings/material-movement" },
    { name: "Lawn Maintenance", href: "/offerings/lawn-maintenance" },
    { name: "Fleet Control", href: "/offerings/fleet-control" },
  ],
  col3: [
    { name: "Careers", href: "/careers" },
    { name: "Open Roles", href: "/careers" },
  ],
};

const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "YouTube", href: "https://youtube.com", icon: Youtube },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect - robot background moves slower than text (increased effect)
  const robotY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <footer ref={footerRef} className="relative w-full overflow-hidden bg-black">
      {/* Robot Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: robotY }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/robot-footer-bg.png"
            alt="Flo Mobility Robot Background"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Black gradient below image to blend with footer background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        </div>
      </motion.div>

      {/* Main Content with Parallax */}
      <motion.div
        className="relative z-10 w-full"
        style={{ y: textY }}
      >

        {/* Top Section - Professional Layout */}
        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24">

          {/* Grid Container - 40/60 Split */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 sm:gap-14 lg:gap-20 xl:gap-28">

              {/* Left Column - Branding & Info (40%) */}
              <div className="lg:col-span-4">
                {/* Dramatic Wireframe Text */}
                <div className="mb-8 sm:mb-10 lg:mb-16 overflow-hidden">
                  <h2
                    className="text-[18vw] sm:text-[14vw] lg:text-[7vw] xl:text-[5.5vw] 2xl:text-[5vw] font-black leading-[0.85] tracking-[-0.02em] uppercase"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      WebkitTextStroke: "1.5px rgba(255,255,255,0.35)",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                      textShadow: "0 0 40px rgba(124,205,84,0.15)",
                    }}
                  >
                    FLO<br />MOBILITY
                  </h2>
                </div>

                {/* Company Info */}
                <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
                  <p className="text-sm text-gray-400 leading-relaxed tracking-wide">
                    © {new Date().getFullYear()} Flo Mobility<br />
                    Manufactured in India 🇮🇳
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    HSR Layout, Bengaluru<br />
                    Karnataka, India
                  </p>
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Link
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full border border-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-[#7ccd54] hover:border-[#7ccd54] hover:shadow-lg hover:shadow-[#7ccd54]/20 transition-all duration-300 group"
                        aria-label={social.name}
                      >
                        <Icon className="w-[18px] h-[18px] text-gray-400 group-hover:text-black transition-colors duration-300" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Right Column - Navigation Links (60%) */}
              <div className="lg:col-span-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 sm:gap-x-10 lg:gap-x-16 xl:gap-x-20 gap-y-10 sm:gap-y-12">

                  {/* Column 1 */}
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-[0.15em] mb-4 sm:mb-6 lg:mb-8">
                      Navigation
                    </h3>
                    <nav className="flex flex-col space-y-3 sm:space-y-4">
                      {FOOTER_LINKS.col1.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="text-[15px] sm:text-[17px] lg:text-[19px] font-normal text-white/90 hover:text-[#7ccd54] transition-all duration-200 hover:translate-x-1"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Column 2 */}
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-[0.15em] mb-4 sm:mb-6 lg:mb-8">
                      Offerings
                    </h3>
                    <nav className="flex flex-col space-y-3 sm:space-y-4">
                      {FOOTER_LINKS.col2.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="text-[15px] sm:text-[17px] lg:text-[19px] font-normal text-white/90 hover:text-[#7ccd54] transition-all duration-200 hover:translate-x-1"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Column 3 */}
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-[0.15em] mb-4 sm:mb-6 lg:mb-8">
                      Join Us
                    </h3>
                    <nav className="flex flex-col space-y-3 sm:space-y-4">
                      {FOOTER_LINKS.col3.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="text-[15px] sm:text-[17px] lg:text-[19px] font-normal text-white/90 hover:text-[#7ccd54] transition-all duration-200 hover:translate-x-1"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </nav>
                  </div>

                </div>
              </div>

            </div>

        </div>

        {/* Divider Line */}
        <div className="border-t border-white/8" />

        {/* Next Page Section */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-10 sm:py-14 lg:py-20">
          <Link href="/offerings/material-movement" className="group block">
              <div className="flex items-center justify-between">
                {/* Left - Next page label + Title */}
                <div className="flex-1">
                  <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-600 uppercase tracking-[0.2em] mb-3 sm:mb-4 lg:mb-5 font-semibold">
                    NEXT PAGE
                  </p>
                  <h3
                    className="text-[clamp(2.5rem,12vw,7rem)] font-bold text-[#7ccd54] group-hover:text-[#a9fe7e] transition-all duration-300 leading-none tracking-tight"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      textShadow: "0 0 60px rgba(124,205,84,0.2)"
                    }}
                  >
                    MMR
                  </h3>
                </div>

                {/* Right - Large Arrow Circle */}
                <div className="flex-shrink-0 ml-4 sm:ml-6 lg:ml-16">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full bg-transparent border-2 border-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#7ccd54] group-hover:border-[#7ccd54] group-hover:shadow-2xl group-hover:shadow-[#7ccd54]/30 transition-all duration-500 group-hover:scale-105">
                    <ArrowRight className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-14 lg:h-14 xl:w-16 xl:h-16 text-gray-400 group-hover:text-black transition-all duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </Link>
        </div>

      </motion.div>
    </footer>
  );
}
