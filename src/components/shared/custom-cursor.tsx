'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor
 *
 * Inner dot  — 8px, follows cursor exactly (no spring)
 * Outer ring — 44px, lagged via useSpring for the "chasing" feel
 * mix-blend-mode: difference on the ring gives the invert effect over images
 *
 * Visibility: hidden on touch devices + respects prefers-reduced-motion
 */
export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const springConfig = { stiffness: 180, damping: 22, mass: 0.5 };
  const ringX = useSpring(rawX, springConfig);
  const ringY = useSpring(rawY, springConfig);

  useEffect(() => {
    // Don't render on touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    // Detect interactive elements for enlarged ring
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest(
          "a, button, [role='button'], input, textarea, select, label, [data-cursor-grow]",
        ) !== null;
      setHovering(isInteractive);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);

    // Hide the native cursor globally
    document.documentElement.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.style.cursor = '';
    };
  }, [rawX, rawY, visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer ring — lagged, mix-blend-mode: difference */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'absolute',
          top: 0,
          left: 0,
          borderColor: '#ffffff',
          mixBlendMode: 'difference' as const,
        }}
        animate={{
          width: clicking ? 32 : hovering ? 64 : 44,
          height: clicking ? 32 : hovering ? 64 : 44,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          width: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.15 },
        }}
        className="rounded-full border"
      />

      {/* Inner dot — exact position, no lag */}
      <motion.div
        style={{
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: '#7ccd54',
        }}
        animate={{
          width: clicking ? 4 : 8,
          height: clicking ? 4 : 8,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          width: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
        }}
        className="rounded-full"
      />
    </div>
  );
}
