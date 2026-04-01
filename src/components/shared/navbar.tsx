"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
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
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#1a3a1f]/95 backdrop-blur-xl shadow-lg"
            : "bg-black/20 backdrop-blur-md"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center relative z-50">
              <Image
                src="/logo.webp"
                alt="flo mobility logo"
                width={140}
                height={60}
                priority
                className="h-16 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_CONFIG.mainNav.map((item) => (
                <div key={item.title} className="relative group">
                  <button className="text-white hover:text-[#7ccd54] transition-colors duration-200 text-base font-medium">
                    {item.title}
                  </button>
                  {/* Dropdown */}
                  {item.items && (
                    <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-white rounded-xl shadow-2xl p-4 min-w-[280px] border border-gray-100">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          >
                            <div className="font-semibold text-gray-900 text-sm mb-1">
                              {subItem.title}
                            </div>
                            <div className="text-xs text-gray-500 leading-relaxed">
                              {subItem.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href={NAV_CONFIG.actions.fleet}
                target="_blank"
                className="text-white hover:text-[#7ccd54] transition-colors duration-200 text-base font-medium"
              >
                Fleet
              </Link>
              <Link
                href={NAV_CONFIG.actions.contact}
                className="px-6 py-2.5 rounded-full bg-[#7ccd54] hover:bg-[#5ba83d] text-gray-900 font-semibold text-sm transition-all duration-200 hover:scale-105 shadow-lg"
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

