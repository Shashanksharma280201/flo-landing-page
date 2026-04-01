"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ExternalLink
} from "lucide-react";
import { CUSTOMERS } from "@/lib/constants";

const FOOTER_NAVIGATION = {
  pages: [
    { name: "Home", href: "/" },
    { name: "Material Movement", href: "/offerings/material-movement" },
    { name: "Lawn Maintenance", href: "/offerings/lawn-maintenance" },
    { name: "Fleet Control", href: "/offerings/fleet-control" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
  ],
  social: [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/flomobility/" },
    { name: "Instagram", href: "https://www.instagram.com/flomobility/" },
    { name: "Youtube", href: "https://www.youtube.com/@flomobility" },
    { name: "Facebook", href: "https://www.facebook.com/flomobility" },
  ],
};

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-b from-white to-[#c8ff3d] py-8 sm:py-12 lg:py-20">
      {/* Main Footer Container */}
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="relative rounded-[3rem] bg-[#1a1f1a] overflow-hidden min-h-[750px] lg:min-h-[900px]">

          {/* Main Content */}
          <div className="relative z-10 h-full flex flex-col px-6 sm:px-12 lg:px-16 xl:px-24 pt-10 lg:pt-16 pb-36 lg:pb-44">

            {/* Tagline at Top */}
            <div className="text-center mb-4 lg:mb-6">
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <span className="text-white">ALWAYS </span>
                <span className="text-[#c8ff3d]">MOVING</span>
                <br />
                <span className="text-white">THE </span>
                <span className="text-[#c8ff3d]">FUTURE</span>
                <span className="text-white">.</span>
              </h2>
            </div>

            {/* Three Column Layout with Large Robot */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[240px_1fr_240px] gap-8 lg:gap-12 xl:gap-16 items-start">

              {/* Left Column - Pages */}
              <div className="flex flex-col space-y-4 lg:space-y-6 lg:pt-12 lg:h-full">
                <div className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-gray-500">
                  Pages
                </div>
                <nav className="flex flex-col space-y-2.5 lg:space-y-3.5">
                  {FOOTER_NAVIGATION.pages.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-sm lg:text-base xl:text-lg font-bold uppercase tracking-wide text-white hover:text-[#c8ff3d] transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    className="text-sm lg:text-base xl:text-lg font-bold uppercase tracking-wide text-[#c8ff3d] hover:text-white transition-colors"
                  >
                    Store
                  </Link>
                </nav>
              </div>

              {/* Center Column - Large Robot Image with Flo Mobility Text */}
              <div className="flex items-end justify-center lg:-mt-12">
                <div className="relative w-full">
                  {/* Flo Mobility Text Behind Robot - Layered Design */}
                  <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden">
                    {/* Bottom Layer - Gradient Glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3
                        className="text-5xl sm:text-6xl lg:text-7xl xl:text-9xl font-black uppercase tracking-[-0.02em] select-none whitespace-nowrap"
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          background: "linear-gradient(180deg, rgba(200,255,61,0.12) 0%, rgba(200,255,61,0.03) 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          filter: "blur(2px)"
                        }}
                      >
                        FLO MOBILITY
                      </h3>
                    </div>

                    {/* Middle Layer - Outline */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3
                        className="text-5xl sm:text-6xl lg:text-7xl xl:text-9xl font-black uppercase tracking-[-0.02em] select-none whitespace-nowrap"
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          WebkitTextStroke: "1px rgba(200,255,61,0.1)",
                          WebkitTextFillColor: "transparent"
                        }}
                      >
                        FLO MOBILITY
                      </h3>
                    </div>

                    {/* Top Layer - Solid with Gradient */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3
                        className="text-5xl sm:text-6xl lg:text-7xl xl:text-9xl font-black uppercase tracking-[-0.02em] select-none whitespace-nowrap"
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(200,255,61,0.08) 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text"
                        }}
                      >
                        FLO MOBILITY
                      </h3>
                    </div>
                  </div>

                  {/* Robot Image */}
                  <div className="relative w-full h-[450px] lg:h-[550px] xl:h-[700px] z-10">
                    <Image
                      src="/mmr-images/mmr-robot-new.png"
                      alt="Flo Mobility Autonomous Robot"
                      fill
                      className="object-contain object-bottom drop-shadow-[0_0_120px_rgba(200,255,61,0.7)]"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 60vw"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Social */}
              <div className="flex flex-col space-y-4 lg:space-y-6 lg:text-right lg:pt-12 lg:h-full">
                <div className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-gray-500">
                  Follow On
                </div>
                <nav className="flex flex-col space-y-2.5 lg:space-y-3.5">
                  {FOOTER_NAVIGATION.social.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm lg:text-base xl:text-lg font-bold uppercase tracking-wide text-white hover:text-[#c8ff3d] transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Positioned at bottom of SVG */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 sm:px-12 lg:px-16 xl:px-24 pb-8 lg:pb-12 pt-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8">

              {/* Customer Logos - Left */}
              <div className="flex flex-wrap items-center gap-3 lg:gap-6 justify-center lg:justify-start">
                {CUSTOMERS.slice(0, 6).map((customer) => (
                  <div
                    key={customer.name}
                    className="relative h-5 lg:h-6 w-12 lg:w-14 opacity-40 hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={customer.logo}
                      alt={customer.name}
                      fill
                      className="object-contain brightness-0 invert"
                      sizes="56px"
                    />
                  </div>
                ))}
              </div>

              {/* CTA Button - Center */}
              <div className="flex justify-center">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 rounded-full bg-[#c8ff3d] text-black font-bold uppercase tracking-[0.1em] text-xs lg:text-sm hover:bg-[#b8ef2d] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[0_0_30px_rgba(200,255,61,0.6)]"
                >
                  <span>Business Enquiries</span>
                  <ExternalLink className="h-3.5 lg:h-4 w-3.5 lg:w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Legal Links - Right */}
              <div className="flex items-center gap-4 lg:gap-6 justify-center lg:justify-end">
                <Link
                  href="/privacy"
                  className="text-xs lg:text-sm font-bold uppercase tracking-[0.1em] text-[#c8ff3d] hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-xs lg:text-sm font-bold uppercase tracking-[0.1em] text-[#c8ff3d] hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-4 lg:mt-6 text-center text-[0.6rem] lg:text-[0.65rem] text-gray-500">
              © {new Date().getFullYear()} Flo Mobility. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
