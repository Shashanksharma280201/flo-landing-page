"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * LenisProvider
 *
 * Initialises Lenis smooth scroll once on mount and hooks it into
 * Framer Motion's frame loop so `useScroll` / `useTransform` stay
 * perfectly in sync with the smoothed scroll position.
 *
 * Drop this anywhere in the React tree above the content you want
 * smooth-scrolled (ideally in layout.tsx via a thin client wrapper).
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Integrate with requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
