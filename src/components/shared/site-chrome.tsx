"use client";

import { LenisProvider } from "./lenis-provider";

/**
 * SiteChrome
 *
 * A single client component that wires up all layout-level chrome:
 *  - Lenis smooth scroll
 *
 * Used in layout.tsx so it renders on every page.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      {children}
    </LenisProvider>
  );
}
