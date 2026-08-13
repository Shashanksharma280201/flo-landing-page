'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { trackNavSelect } from '@/lib/analytics';

// ── Design tokens ─────────────────────────────────────────────────────────────
const GREEN = '#7ccd54';
const BG_DARK = '#0e1210';
const DIM_W = 'rgba(255,255,255,0.08)';
const MUTED_W = 'rgba(255,255,255,0.38)';
const TEXT_W = 'rgba(255,255,255,0.90)';

// ── Nav data ──────────────────────────────────────────────────────────────────
const NAV_COLS = [
  {
    label: 'Offerings',
    links: [
      { name: 'Material Movement', href: '/offerings/material-movement' },
      // { name: 'Lawn Maintenance', href: '/offerings/lawn-maintenance' },
      { name: 'Fleet Control', href: '/offerings/fleet-control' },
    ],
  },
  {
    label: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blogs' },
      { name: 'Media Coverage', href: '/media-coverage' },
      { name: 'Contact', href: '/contact' },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/flomobility/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@flomobility',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/flomobility/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    href: 'https://twitter.com/flomobility',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

// ── Fade-up helper ────────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Main footer ───────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer
      className="relative flex min-h-[460px] w-full flex-col justify-between overflow-hidden md:min-h-[640px]"
      style={{ backgroundColor: BG_DARK }}
      aria-label="Site footer"
    >
      {/* Background photo — Flo autonomous hauler in the yard */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/footer-image.avif')",
          backgroundPosition: 'right center',
        }}
      />
      {/* Left-weighted scrim — keeps the copy legible on the left while the
          robot stays visible on the right */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,13,11,0.96) 0%, rgba(10,13,11,0.9) 34%, rgba(10,13,11,0.66) 60%, rgba(10,13,11,0.34) 100%)',
        }}
      />
      {/* Vertical grounding — subtle top blend + a darker base for the bottom bar */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,13,11,0.5) 0%, rgba(10,13,11,0) 24%, rgba(10,13,11,0) 66%, rgba(10,13,11,0.72) 100%)',
        }}
      />
      {/* Ambient glow — centred */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 h-[400px] w-[700px] rounded-full blur-[180px]"
        style={{ background: `${GREEN}09` }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          ZONE 1 — Navigation
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-6 pt-14 pb-10 md:px-14 md:pt-20 md:pb-14 lg:px-20 xl:px-28">
        <div className="grid max-w-[880px] grid-cols-1 items-start gap-12 md:grid-cols-[200px_1fr_150px] md:gap-14 xl:gap-20">
          {/* Brand column */}
          <FadeUp className="flex flex-col gap-5">
            <Link
              href="/"
              aria-label="FLO Mobility home"
              className="block w-fit"
              onClick={() => trackNavSelect('home_logo', 'footer_nav')}
            >
              <Image
                src="/logo.webp"
                alt="FLO Mobility"
                width={88}
                height={88}
                className="object-contain"
                quality={85}
              />
            </Link>
            <p
              className="max-w-[210px] text-sm leading-[1.75]"
              style={{ color: MUTED_W, fontFamily: 'var(--font-dm-sans)' }}
            >
              India's largest construction robotics service provider
            </p>
            {/* <div className="flex items-start gap-2" style={{ color: MUTED_W }}> */}
            {/*   <MapPin */}
            {/*     className="mt-0.5 h-3 w-3 shrink-0" */}
            {/*     style={{ color: `${GREEN}70` }} */}
            {/*   /> */}
            {/*   <span */}
            {/*     className="text-[11px] leading-snug" */}
            {/*     style={{ fontFamily: 'var(--font-dm-sans)' }} */}
            {/*   > */}
            {/*     HSR Layout, Bengaluru, India */}
            {/*   </span> */}
            {/* </div> */}
          </FadeUp>

          {/* Nav columns */}
          <FadeUp delay={0.07}>
            <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 xl:gap-x-16">
              {NAV_COLS.map((col) => (
                <div key={col.label}>
                  <p
                    className="mb-4 text-xs font-bold tracking-[0.26em] uppercase"
                    style={{ color: `${GREEN}65`, fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {col.label}
                  </p>
                  <nav className="flex flex-col gap-2.5">
                    {col.links.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => trackNavSelect(link.href, 'footer_nav')}
                        className="w-fit text-[15px] leading-snug font-medium transition-all duration-200"
                        style={{ color: MUTED_W, fontFamily: 'var(--font-dm-sans)' }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color = TEXT_W)
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color = MUTED_W)
                        }
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Social column */}
          <FadeUp delay={0.13} className="flex flex-col gap-4">
            <p
              className="text-xs font-bold tracking-[0.26em] uppercase"
              style={{ color: `${GREEN}65`, fontFamily: 'var(--font-dm-sans)' }}
            >
              Follow
            </p>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  onClick={() => trackNavSelect(s.href, 'footer_social')}
                  className="flex w-fit items-center gap-2.5 text-[14px] font-medium transition-colors duration-200"
                  style={{ color: MUTED_W, fontFamily: 'var(--font-dm-sans)' }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = GREEN)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = MUTED_W)
                  }
                >
                  {s.icon}
                  {s.name}
                </Link>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          ZONE 3 — Bottom bar
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex w-full flex-col items-start justify-between gap-3 px-6 py-5 sm:flex-row sm:items-center md:px-14 lg:px-20 xl:px-28">
        <p
          className="text-[13px] font-medium"
          style={{ color: MUTED_W, fontFamily: 'var(--font-dm-sans)' }}
        >
          © {new Date().getFullYear()} Flo Mobility Pvt. Ltd. All rights reserved.{' '}
          <span style={{ color: `${GREEN}55` }}>Manufactured in India 🇮🇳</span>
        </p>
        <div className="flex items-center gap-5">
          {[
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Use', href: '/terms' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => trackNavSelect(item.label, 'footer_legal')}
              className="text-[13px] font-medium transition-colors duration-200"
              style={{ color: MUTED_W, fontFamily: 'var(--font-dm-sans)' }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = TEXT_W)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = MUTED_W)
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
