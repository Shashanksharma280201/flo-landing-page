"use client";

import { LenisProvider } from "./lenis-provider";
import { CustomCursor } from "./custom-cursor";

/**
 * SiteChrome
 *
 * A single client component that wires up all layout-level chrome:
 *  - Lenis smooth scroll
 *  - Custom cursor (desktop only, respects prefers-reduced-motion)
 *
 * Used in layout.tsx so it renders on every page.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <CustomCursor />
      {children}
    </LenisProvider>
  );
}
