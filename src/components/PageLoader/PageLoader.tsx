"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./PageLoader.module.css";

interface PageLoaderProps {
  onComplete: () => void;
}

type Phase = "counting" | "holding" | "sliding" | "done";

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("counting");

  // Refs — StrictMode-safe: never store timer IDs in state
  const rafRef = useRef<number | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const skippedRef = useRef(false);
  const phaseRef = useRef<Phase>("counting");

  // Keep phaseRef in sync with state
  phaseRef.current = phase;

  // Register a timeout so we can cancel on unmount
  const addTimer = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  }, []);

  // Skip handler — jump straight to slide-out
  const handleSkip = useCallback(() => {
    if (skippedRef.current) return;
    if (phaseRef.current === "sliding" || phaseRef.current === "done") return;
    skippedRef.current = true;

    // Cancel any pending animation
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    setCount(100);
    setPhase("sliding");

    addTimer(() => {
      setPhase("done");
      onComplete();
    }, 1050);
  }, [addTimer, onComplete]);

  // RAF-based counter: counts 0 → 100 over 2000ms with cubic ease-out
  useEffect(() => {
    // Check sessionStorage — skip on revisit
    if (typeof window !== "undefined") {
      try {
        if (sessionStorage.getItem("flo_loader_seen")) {
          setPhase("done");
          onComplete();
          return;
        }
      } catch {
        // sessionStorage blocked — just run the loader
      }
    }

    const duration = 2000;

    const tick = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const linear = Math.min(elapsed / duration, 1);
      // Cubic ease-out: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - linear, 3);
      const current = Math.round(eased * 100);

      setCount(current);

      if (linear < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Phase 2: hold at 100 for 300ms
        setPhase("holding");
        addTimer(() => {
          // Phase 3: slide up
          setPhase("sliding");
          addTimer(() => {
            // Phase 5: unmount
            setPhase("done");
            try {
              sessionStorage.setItem("flo_loader_seen", "true");
            } catch {
              // ignore
            }
            onComplete();
          }, 1050); // slightly longer than CSS transition so it fully exits
        }, 300);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === "done") return null;

  return (
    // Overlay blocks all interaction — no pointer-events needed on main content
    <div
      className={`${styles.loader} ${phase === "sliding" ? styles.slideOut : ""}`}
      onClick={handleSkip}
      aria-hidden="true"
    >
      {/* Brand wordmark — top left */}
      <div className={styles.brand}>FLO MOBILITY</div>

      {/* Top-right label */}
      <div className={styles.label}>Loading Experience</div>

      {/* Counter */}
      <div className={styles.counter}>{String(count).padStart(3, "0")}</div>

      {/* Progress bar */}
      <div className={styles.bar}>
        <div className={styles.barFill} style={{ width: `${count}%` }} />
      </div>

      {/* Click-to-skip hint */}
      <div className={styles.skipHint}>
        {phase === "counting" || phase === "holding" ? "click anywhere to skip" : ""}
      </div>
    </div>
  );
}
