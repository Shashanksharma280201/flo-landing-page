"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Mail } from "lucide-react";

// ── Design tokens (mirror page.tsx) ──────────────────────────────────────────
const GREEN   = "#7ccd54";
const BG_DARK = "#0e1210";
const DIM_W   = "rgba(255,255,255,0.08)";
const MUTED_W = "rgba(255,255,255,0.38)";
const TEXT_W  = "rgba(255,255,255,0.88)";

// ── Nav data ─────────────────────────────────────────────────────────────────
const NAV_COLS = [
  {
    label: "Offerings",
    links: [
      { name: "Material Movement", href: "/offerings/material-movement" },
      { name: "Lawn Maintenance",  href: "/offerings/lawn-maintenance"  },
      { name: "Fleet Control",     href: "/offerings/fleet-control"     },
    ],
  },
  {
    label: "Company",
    links: [
      { name: "About",   href: "/about"   },
      { name: "Careers", href: "/careers" },
      { name: "Blog",    href: "/blogs"   },
      { name: "Contact", href: "/contact" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/flomobility/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@flomobility",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/flomobility/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://twitter.com/flomobility",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

// ── Pill badge ────────────────────────────────────────────────────────────────
const BADGES = ["ISO Certified", "500+ Projects", "Made in India", "24/7 Support"];

// ── Fade-up helper ────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Main footer ───────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ background: BG_DARK }}
      aria-label="Site footer"
    >
      {/* ── Subtle green ambient glow top-left ── */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-[140px]"
        style={{ background: `${GREEN}14` }}
      />
      {/* ── Subtle glow bottom-right ── */}
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-[360px] h-[360px] rounded-full blur-[120px]"
        style={{ background: `${GREEN}0c` }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          TOP STRIP — thin rule + badges
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="border-b" style={{ borderColor: DIM_W }}>
        <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 py-4 flex items-center gap-6 overflow-x-auto scrollbar-hide">
          {BADGES.map((b, i) => (
            <div key={b} className="flex items-center gap-6 shrink-0">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.22em] whitespace-nowrap"
                style={{ color: MUTED_W }}
              >
                {b}
              </span>
              {i < BADGES.length - 1 && (
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: `${GREEN}60` }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN BODY
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 xl:px-32 pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 xl:gap-32">

          {/* ── LEFT: Brand block ── */}
          <FadeUp className="flex flex-col gap-8 max-w-sm">
            {/* Logo */}
            <Link href="/" className="block w-fit" aria-label="FLO Mobility home">
              <Image
                src="/logo.webp"
                alt="FLO Mobility"
                width={52}
                height={52}
                className="object-contain"
                quality={85}
              />
            </Link>

            {/* Tagline */}
            <div>
              <p
                className="text-[28px] md:text-[32px] font-black leading-[1.1] tracking-[-0.02em] mb-3"
                style={{ color: TEXT_W, fontFamily: "var(--font-dm-sans)" }}
              >
                Robots that work.<br />
                <span style={{ color: GREEN }}>Sites that scale.</span>
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: MUTED_W, fontFamily: "var(--font-dm-sans)" }}
              >
                Autonomous robots on a flexible subscription — built for India's most demanding construction sites.
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@flomobility.com"
                className="inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:opacity-80 w-fit"
                style={{ color: MUTED_W, fontFamily: "var(--font-dm-sans)" }}
              >
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: GREEN }} />
                hello@flomobility.com
              </a>
              <div
                className="inline-flex items-center gap-2 text-sm"
                style={{ color: MUTED_W, fontFamily: "var(--font-dm-sans)" }}
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: GREEN }} />
                HSR Layout, Bengaluru, India
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: DIM_W,
                    color: MUTED_W,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = `${GREEN}22`;
                    (e.currentTarget as HTMLAnchorElement).style.color = GREEN;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = DIM_W;
                    (e.currentTarget as HTMLAnchorElement).style.color = MUTED_W;
                  }}
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </FadeUp>

          {/* ── RIGHT: Nav columns + CTA card ── */}
          <div className="flex flex-col gap-12">
            {/* Nav columns */}
            <FadeUp delay={0.08}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 lg:gap-x-16 xl:gap-x-24 gap-y-10">
                {NAV_COLS.map((col) => (
                  <div key={col.label}>
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.22em] mb-5"
                      style={{ color: `${GREEN}80`, fontFamily: "var(--font-dm-sans)" }}
                    >
                      {col.label}
                    </p>
                    <nav className="flex flex-col gap-3">
                      {col.links.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="text-[15px] font-medium leading-snug transition-all duration-200 hover:translate-x-0.5 w-fit"
                          style={{ color: MUTED_W, fontFamily: "var(--font-dm-sans)" }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = TEXT_W)}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = MUTED_W)}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                ))}

                {/* Inline CTA block as 3rd column */}
                <div className="hidden sm:flex flex-col justify-between">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.22em] mb-5"
                    style={{ color: `${GREEN}80`, fontFamily: "var(--font-dm-sans)" }}
                  >
                    Get Started
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-300 hover:scale-105 w-fit"
                      style={{ background: GREEN, color: "#0e1210", fontFamily: "var(--font-dm-sans)" }}
                    >
                      Book a Demo
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                    <Link
                      href="/offerings/material-movement"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-200 w-fit"
                      style={{
                        border: `1px solid ${DIM_W}`,
                        color: MUTED_W,
                        fontFamily: "var(--font-dm-sans)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = `${GREEN}50`;
                        (e.currentTarget as HTMLAnchorElement).style.color = TEXT_W;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = DIM_W;
                        (e.currentTarget as HTMLAnchorElement).style.color = MUTED_W;
                      }}
                    >
                      See Products
                    </Link>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Mobile CTA (only shown on small screens, hidden on sm+) */}
            <FadeUp delay={0.12} className="flex gap-3 sm:hidden">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-300"
                style={{ background: GREEN, color: "#0e1210", fontFamily: "var(--font-dm-sans)" }}
              >
                Book a Demo
                <ArrowUpRight className="w-3 h-3" />
              </Link>
              <Link
                href="/offerings/material-movement"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-[0.14em]"
                style={{ border: `1px solid ${DIM_W}`, color: MUTED_W, fontFamily: "var(--font-dm-sans)" }}
              >
                See Products
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          BOTTOM BAR
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="border-t" style={{ borderColor: DIM_W }}>
        <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p
            className="text-[11px] font-medium"
            style={{ color: MUTED_W, fontFamily: "var(--font-dm-sans)" }}
          >
            © {new Date().getFullYear()} Flo Mobility Pvt. Ltd. · All rights reserved ·{" "}
            <span style={{ color: `${GREEN}80` }}>Manufactured in India 🇮🇳</span>
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Use"].map((item) => (
              <Link
                key={item}
                href="/contact"
                className="text-[11px] font-medium transition-colors duration-200"
                style={{ color: MUTED_W, fontFamily: "var(--font-dm-sans)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = TEXT_W)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = MUTED_W)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
