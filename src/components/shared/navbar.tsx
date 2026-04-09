"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { NAV_CONFIG } from "@/lib/constants";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

// ─── Design tokens ────────────────────────────────────────────────────────────
const GREEN  = "#7ccd54";
const TEXT   = "#191c1a";
const MUTED  = "rgba(25,28,26,0.55)";
const DIM    = "rgba(25,28,26,0.15)";
const BORDER = "rgba(25,28,26,0.10)";

// ─── Dropdown ─────────────────────────────────────────────────────────────────
function Dropdown({ items }: { items: { title: string; href: string; description: string }[] }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.97 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-full left-0 pt-3 z-50"
      >
        <div
          className="rounded-2xl shadow-xl overflow-hidden"
          style={{
            background: "#ffffff",
            border: `1px solid ${BORDER}`,
            minWidth: "320px",
          }}
        >
          {items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-start gap-4 px-5 py-4 transition-colors duration-200 group"
              style={{ borderBottom: i < items.length - 1 ? `1px solid ${BORDER}` : "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f9f9f8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {/* Index number */}
              <span
                className="text-[11px] font-bold mt-0.5 shrink-0 tabular-nums"
                style={{ color: DIM, fontFamily: "var(--font-dm-sans)" }}
              >
                0{i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div
                  className="text-[13px] font-semibold mb-0.5 group-hover:text-[#7ccd54] transition-colors duration-200"
                  style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
                >
                  {item.title}
                </div>
                <div
                  className="text-xs leading-relaxed"
                  style={{ color: MUTED, fontFamily: "var(--font-dm-sans)" }}
                >
                  {item.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── NavItem with optional dropdown ───────────────────────────────────────────
function NavItem({
  item,
  isActive,
}: {
  item: typeof NAV_CONFIG.mainNav[number];
  isActive: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  if (!("items" in item) || !item.items) {
    const href = "href" in item ? (item as { href: string }).href : "#";
    return (
      <Link
        href={href}
        className="text-sm font-semibold transition-colors duration-200"
        style={{ color: isActive ? GREEN : TEXT, fontFamily: "var(--font-dm-sans)" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GREEN; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isActive ? GREEN : TEXT; }}
      >
        {item.title}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
        style={{ color: isActive ? GREEN : TEXT, fontFamily: "var(--font-dm-sans)" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GREEN; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isActive ? GREEN : TEXT; }}
      >
        {item.title}
        <ChevronDown
          className="transition-transform duration-200"
          style={{ width: 14, height: 14, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && <Dropdown items={item.items} />}
    </div>
  );
}

// ─── Main Navbar ───────────────────────────────────────────────────────────────
export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 48);
  });

  // Prevent body scroll when mobile menu open
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* ── Desktop / tablet header ── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: scrolled ? "rgba(255,255,255,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 20px rgba(25,28,26,0.06)" : "none",
        }}
      >
        <div className="flex h-16 items-center justify-between px-8 md:px-14 lg:px-20 xl:px-28">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.webp"
              alt="FLO Mobility"
              width={130}
              height={56}
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_CONFIG.mainNav.map((item) => {
              const active = "href" in item && item.href
                ? isActive(item.href as string)
                : item.items?.some((s) => isActive(s.href)) ?? false;
              return <NavItem key={item.title} item={item} isActive={active} />;
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href={NAV_CONFIG.actions.fleet}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-semibold transition-colors duration-200"
              style={{ color: TEXT, fontFamily: "var(--font-dm-sans)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GREEN; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = TEXT; }}
            >
              Fleet
              <ArrowUpRight style={{ width: 14, height: 14 }} />
            </Link>
            <Link
              href={NAV_CONFIG.actions.contact}
              className="inline-flex items-center px-5 py-2 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-md"
              style={{ background: GREEN, fontFamily: "var(--font-dm-sans)" }}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
            style={{ color: TEXT }}
            aria-label="Open menu"
          >
            <Menu style={{ width: 20, height: 20 }} />
          </button>

        </div>
      </motion.header>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ background: "rgba(25,28,26,0.35)", backdropFilter: "blur(4px)" }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              className="fixed top-0 right-0 bottom-0 z-50 lg:hidden flex flex-col overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "min(400px, 100vw)", background: "#ffffff", borderLeft: `1px solid ${BORDER}` }}
            >
              {/* Panel header */}
              <div
                className="flex items-center justify-between px-7 py-5 shrink-0"
                style={{ borderBottom: `1px solid ${BORDER}` }}
              >
                <Image
                  src="/logo.webp"
                  alt="FLO Mobility"
                  width={110}
                  height={48}
                  className="h-7 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200"
                  style={{ background: "rgba(25,28,26,0.06)", color: TEXT }}
                  aria-label="Close menu"
                >
                  <X style={{ width: 18, height: 18 }} />
                </button>
              </div>

              {/* Panel nav links */}
              <nav className="flex-1 px-7 py-6 flex flex-col gap-1">
                {NAV_CONFIG.mainNav.map((item) => {
                  const hasChildren = "items" in item && item.items && item.items.length > 0;
                  const expanded = mobileExpanded === item.title;

                  return (
                    <div key={item.title}>
                      {hasChildren ? (
                        <>
                          <button
                            className="w-full flex items-center justify-between py-4 text-xl font-bold transition-colors duration-200"
                            style={{ color: expanded ? GREEN : TEXT, fontFamily: "var(--font-dm-sans)" }}
                            onClick={() => setMobileExpanded(expanded ? null : item.title)}
                          >
                            {item.title}
                            <ChevronDown
                              style={{
                                width: 18, height: 18,
                                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s",
                                color: expanded ? GREEN : MUTED,
                              }}
                            />
                          </button>
                          <AnimatePresence>
                            {expanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <div
                                  className="flex flex-col gap-0 rounded-xl mb-3 overflow-hidden"
                                  style={{ background: "#f7f7f6", border: `1px solid ${BORDER}` }}
                                >
                                  {item.items!.map((sub, i) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex items-center gap-3 px-5 py-4 transition-colors duration-200"
                                      style={{
                                        borderBottom: i < item.items!.length - 1 ? `1px solid ${BORDER}` : "none",
                                        color: isActive(sub.href) ? GREEN : TEXT,
                                        fontFamily: "var(--font-dm-sans)",
                                      }}
                                    >
                                      <span className="text-[11px] font-bold" style={{ color: DIM }}>0{i + 1}</span>
                                      <span className="text-[15px] font-semibold">{sub.title}</span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : "href" in item && item.href ? (
                        <Link
                          href={item.href as string}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center py-4 text-xl font-bold transition-colors duration-200"
                          style={{ color: isActive(item.href as string) ? GREEN : TEXT, fontFamily: "var(--font-dm-sans)" }}
                        >
                          {item.title}
                        </Link>
                      ) : null}
                    </div>
                  );
                })}
              </nav>

              {/* Panel actions */}
              <div className="px-7 pb-8 flex flex-col gap-3 shrink-0" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: "24px" }}>
                <Link
                  href={NAV_CONFIG.actions.fleet}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-full text-[15px] font-semibold border transition-all duration-200"
                  style={{ color: TEXT, borderColor: DIM, fontFamily: "var(--font-dm-sans)" }}
                >
                  Fleet
                  <ArrowUpRight style={{ width: 15, height: 15 }} />
                </Link>
                <Link
                  href={NAV_CONFIG.actions.contact}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center py-3.5 rounded-full text-[15px] font-bold text-white transition-all duration-200"
                  style={{ background: GREEN, fontFamily: "var(--font-dm-sans)" }}
                >
                  Contact Us
                </Link>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
