'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ExperienceLoaderProps {
  progress?: number;
  title?: string;
  detail?: string;
}

const DEFAULT_MESSAGES = [
  'Preparing opening sequence...',
  'Warming critical frames...',
  'Stabilizing first motion...',
  'Streaming remaining frames...',
  'Finalizing render pipeline...',
];

export function ExperienceLoader({
  progress,
  title = 'Loading Experience',
  detail,
}: ExperienceLoaderProps) {
  const [message, setMessage] = useState(DEFAULT_MESSAGES[0]);

  useEffect(() => {
    if (detail) return;

    const timer = window.setInterval(() => {
      setMessage((current) => {
        const currentIndex = DEFAULT_MESSAGES.indexOf(current);
        const nextIndex = (currentIndex + 1) % DEFAULT_MESSAGES.length;

        return DEFAULT_MESSAGES[nextIndex];
      });
    }, 1800);

    return () => window.clearInterval(timer);
  }, [detail]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#f5f5f5]"
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(#191c1a 1px, transparent 1px), linear-gradient(90deg, #191c1a 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative mb-12 w-full px-4 sm:px-8 md:px-12">
        <svg
          viewBox="0 0 1000 150"
          className="w-full"
          preserveAspectRatio="xMidYMid meet"
          style={{ height: 'auto', maxHeight: '30vh' }}
        >
          <defs>
            <linearGradient
              id="experience-loader-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#286c00" />
              <stop offset="100%" stopColor="#7ccd54" />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="var(--font-dm-sans)"
            fontSize="100"
            fontWeight="700"
            letterSpacing="0.05em"
            fill="none"
            stroke="url(#experience-loader-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-draw-text"
          >
            FLO MOBILITY
          </text>
        </svg>
      </div>

      <div className="relative mb-8">
        <svg className="h-36 w-36 sm:h-44 sm:w-44" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="none" stroke="#e1e3df" strokeWidth="4" />
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="url(#experience-loader-progress)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${((progress ?? 0) / 100) * 534} 534`}
            transform="rotate(-90 100 100)"
            className="transition-all duration-300 ease-out"
          />
          <defs>
            <linearGradient
              id="experience-loader-progress"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#286c00" />
              <stop offset="100%" stopColor="#7ccd54" />
            </linearGradient>
          </defs>
        </svg>
        {typeof progress === 'number' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="text-5xl font-bold"
              style={{ color: '#7ccd54', fontFamily: 'var(--font-dm-sans)' }}
            >
              {progress}%
            </p>
          </div>
        )}
      </div>

      <div className="px-4 text-center">
        <p
          className="mb-2 text-xl font-medium"
          style={{ color: '#191c1a', fontFamily: 'var(--font-inter)' }}
        >
          {title}
        </p>
        <p
          className="text-sm font-medium tracking-[0.1em] uppercase"
          style={{ color: '#717a68', fontFamily: 'var(--font-mono)' }}
        >
          {detail ?? message}
        </p>
      </div>

      <style jsx>{`
        @keyframes draw-text {
          0% {
            stroke-dasharray: 0 2000;
          }
          100% {
            stroke-dasharray: 2000 0;
          }
        }

        .animate-draw-text {
          animation: draw-text 3s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }
      `}</style>
    </motion.div>
  );
}
