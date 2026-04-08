import { useEffect, RefObject } from "react";

/**
 * useRevealOnLoad
 *
 * When `ready` flips to true, stagger-reveals all `.reveal-word` elements
 * found inside the given ref element by adding the `.revealed` class.
 *
 * Pair with the global CSS in globals.css:
 *   .reveal-word span     → starts at translateY(100%) opacity 0
 *   .reveal-word.revealed span → animates to translateY(0) opacity 1
 *
 * Also handles .fade-up elements for subtitles / CTAs.
 */
export function useRevealOnLoad(
  ref: RefObject<HTMLElement | null>,
  ready: boolean,
  staggerMs = 90
): void {
  useEffect(() => {
    if (!ready || !ref.current) return;

    const el = ref.current;

    // Stagger reveal-word spans (hero headline)
    const words = el.querySelectorAll<HTMLElement>(".reveal-word");
    words.forEach((word, i) => {
      const tid = setTimeout(() => {
        word.classList.add("revealed");
      }, i * staggerMs);
      // No need to clean up — the timeouts are tiny and one-shot
      return () => clearTimeout(tid);
    });

    // Fade-up elements (subtitle, CTA, etc.) — slightly delayed after words
    const fadeEls = el.querySelectorAll<HTMLElement>(".fade-up");
    fadeEls.forEach((el, i) => {
      const tid = setTimeout(
        () => el.classList.add("revealed"),
        words.length * staggerMs + i * 120 + 100
      );
      return () => clearTimeout(tid);
    });
  }, [ready, ref, staggerMs]);
}
