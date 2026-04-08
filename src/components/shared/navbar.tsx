"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_CONFIG } from "@/lib/constants";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      {/* Navbar Container - Centered and detached from top */}
      <motion.header
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[90%] lg:w-1/2 transition-all duration-300"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`transition-all duration-300 rounded-3xl px-6 sm:px-8 ${
            scrolled
              ? "bg-gray-900/80 backdrop-blur-xl shadow-2xl border border-white/20"
              : "bg-gray-900/60 backdrop-blur-lg border border-white/10"
          }`}
        >
          <div className="flex h-16 sm:h-18 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center relative z-50">
              <Image
                src="/logo.webp"
                alt="flo mobility logo"
                width={160}
                height={70}
                priority
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(78%) sepia(22%) saturate(832%) hue-rotate(47deg) brightness(94%) contrast(87%)'
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_CONFIG.mainNav.map((item) => (
                <div key={item.title} className="relative group">
                  {item.items ? (
                    <>
                      <button className="text-white hover:text-[#7ccd54] transition-colors duration-200 text-sm font-medium flex items-center gap-1">
                        {item.title}
                        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                      </button>
                      {/* Dropdown */}
                      <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 min-w-[280px] border border-white/20">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="block px-4 py-3 rounded-xl hover:bg-white/10 transition-colors duration-200"
                            >
                              <div className="font-semibold text-white text-sm mb-1">
                                {subItem.title}
                              </div>
                              <div className="text-xs text-gray-400 leading-relaxed">
                                {subItem.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : 'href' in item && item.href ? (
                    <Link
                      href={item.href}
                      className="text-white hover:text-[#7ccd54] transition-colors duration-200 text-sm font-medium"
                    >
                      {item.title}
                    </Link>
                  ) : null}
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href={NAV_CONFIG.actions.fleet}
                target="_blank"
                className="text-white hover:text-[#7ccd54] transition-colors duration-200 text-sm font-medium"
              >
                Fleet
              </Link>
              <Link
                href={NAV_CONFIG.actions.contact}
                className="px-5 py-2 rounded-full bg-[#7ccd54] hover:bg-[#5ba83d] text-gray-900 font-semibold text-sm transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2 relative z-50"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-40 lg:hidden ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        initial={false}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <motion.div
          className="absolute top-0 right-0 h-full w-80 bg-[#1a3a1f] shadow-2xl overflow-y-auto"
          initial={{ x: "100%" }}
          animate={{ x: mobileMenuOpen ? 0 : "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div className="p-8 pt-24">
            <nav className="flex flex-col gap-6">
              {NAV_CONFIG.mainNav.map((item) => (
                <div key={item.title}>
                  <div className="text-gray-400 text-xs uppercase tracking-widest mb-3 font-semibold">
                    {item.title}
                  </div>
                  {item.items ? (
                    <div className="flex flex-col gap-2 pl-4 border-l-2 border-[#7ccd54]/30">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-white hover:text-[#7ccd54] transition-colors duration-200 text-base font-medium py-2"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="mt-8 flex flex-col gap-3 pt-6 border-t border-white/10">
              <Link
                href={NAV_CONFIG.actions.fleet}
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full px-6 py-3 rounded-full border border-white/20 text-white text-center font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                Fleet
              </Link>
              <Link
                href={NAV_CONFIG.actions.contact}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full px-6 py-3 rounded-full bg-[#7ccd54] hover:bg-[#5ba83d] text-gray-900 text-center font-semibold transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

