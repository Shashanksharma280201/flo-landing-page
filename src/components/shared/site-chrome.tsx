"use client";

import { LenisProvider } from "./lenis-provider";
import { CustomCursor } from "./custom-cursor";
import { ScrollProgress } from "./scroll-progress";

/**
 * SiteChrome
 *
 * A single client component that wires up all layout-level chrome:
 *  - Lenis smooth scroll
 *  - Custom cursor (desktop only, respects prefers-reduced-motion)
 *  - Scroll progress bar (2px top strip)
 *
 * Used in layout.tsx so it renders on every page.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <CustomCursor />
      <ScrollProgress />
      {children}
    </LenisProvider>
  );
}
