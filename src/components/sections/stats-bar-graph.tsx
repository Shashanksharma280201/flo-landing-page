"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface StatMetric {
  value: number;
  suffix: string;
  label: string;
}

interface StatsBarGraphProps {
  stats: StatMetric[];
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function AnimatedMetricValue({
  end,
  suffix,
  start,
}: {
  end: number;
  suffix: string;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let animationFrameId = 0;
    let startTime: number | null = null;
    const duration = 1600;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * eased));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, start]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsBarGraph({ stats }: StatsBarGraphProps) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.35,
    rootMargin: "0px 0px -10% 0px",
    triggerOnce: true,
  });

  const scaledValues = stats.map((stat) => Math.log10(stat.value + 1));
  const minValue = Math.min(...scaledValues);
  const maxValue = Math.max(...scaledValues);
  const range = maxValue - minValue || 1;

  return (
    <div
      ref={ref}
      className="rounded-[2rem] border border-[#7ccd54]/15 bg-white/90 p-6 shadow-[0_24px_80px_-40px_rgba(124,205,84,0.45)] sm:p-8 lg:p-10"
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-14 bottom-16 hidden grid-rows-4 sm:grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={index === 3 ? "" : "border-t border-dashed border-[#7ccd54]/15"}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
          {stats.map((stat, index) => {
            const normalizedHeight =
              30 + ((scaledValues[index] - minValue) / range) * 70;

            return (
              <div key={stat.label} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.08 + index * 0.1,
                    ease: EASE,
                  }}
                  className="mb-4 text-center"
                >
                  <div
                    className="text-[clamp(1.5rem,2vw+0.85rem,2.5rem)] font-semibold text-gray-900"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    <AnimatedMetricValue
                      end={stat.value}
                      suffix={stat.suffix}
                      start={isIntersecting}
                    />
                  </div>
                </motion.div>

                <div className="relative flex h-52 w-full max-w-[7rem] items-end overflow-hidden rounded-[1.5rem] border border-[#7ccd54]/12 bg-[#f8fbf3] p-2 sm:h-60 sm:max-w-[8rem]">
                  <div className="pointer-events-none absolute inset-x-2 top-2 h-10 rounded-t-[1rem] bg-gradient-to-b from-white/40 to-transparent" />
                  <motion.div
                    initial={{ height: 0, opacity: 0.7 }}
                    animate={
                      isIntersecting
                        ? { height: `${normalizedHeight}%`, opacity: 1 }
                        : { height: 0, opacity: 0.7 }
                    }
                    transition={{
                      duration: 0.9,
                      delay: 0.12 + index * 0.12,
                      ease: EASE,
                    }}
                    className="w-full rounded-[1rem] bg-linear-to-t from-[#7ccd54] via-[#a8e68f] to-[#e4f6da] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.18 + index * 0.1,
                    ease: EASE,
                  }}
                  className="mt-4 max-w-[9rem] text-center text-sm leading-snug text-gray-600 sm:text-base"
                >
                  {stat.label}
                </motion.p>
              </div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isIntersecting ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.45, delay: 0.45, ease: EASE }}
          className="mt-6 text-center text-[0.7rem] uppercase tracking-[0.18em] text-gray-400 sm:text-xs"
        >
          Bar heights are normalized for mixed units.
        </motion.p>
      </div>
    </div>
  );
}
