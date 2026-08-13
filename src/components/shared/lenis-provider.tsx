'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    floLenis?: Lenis;
  }
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });
    window.floLenis = lenis;

    // Run Lenis inside GSAP's ticker so both always read the same frame.
    // Import is async to avoid bloating the initial bundle.
    let gsapTickerCleanup: (() => void) | null = null;

    import('gsap').then(({ default: gsap }) => {
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      gsapTickerCleanup = () => gsap.ticker.remove(tick);
    });

    return () => {
      gsapTickerCleanup?.();
      if (window.floLenis === lenis) window.floLenis = undefined;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
