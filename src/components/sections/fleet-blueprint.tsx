'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const GREEN = '#7ccd54';
const DARK_GREEN = '#1a3a1f';
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SVG_W = 1000;
const SVG_H = 600;
const CARD_TOP_PCT = 0.68;
const CARD_ANCHOR = { x: 500, y: CARD_TOP_PCT * SVG_H };

// xFactor = robot centre as a fraction of the image's rendered width
// yFactor = robot tyre base as a fraction of the image's rendered height
const FLEET_DATA = [
  { id: 'auto-cart', unit: '01', title: 'Autonomous Cart', xFactor: 0.15, yFactor: 0.85 },
  { id: 'hauler', unit: '02', title: '1-Ton Hauler', xFactor: 0.5, yFactor: 0.8 },
  {
    id: 'semi-auto',
    unit: '03',
    title: 'Semi-Autonomous Cart',
    xFactor: 0.84,
    yFactor: 0.82,
  },
];

// perpOffset shifts the line perpendicular to its direction in SVG space,
// producing true parallel road edges from the same tyre point.
function buildStraightPath(fromX: number, fromY: number, perpOffset = 0): string {
  if (perpOffset === 0) {
    return `M ${fromX} ${fromY} L ${CARD_ANCHOR.x} ${CARD_ANCHOR.y}`;
  }
  const dx = CARD_ANCHOR.x - fromX;
  const dy = CARD_ANCHOR.y - fromY;
  const len = Math.sqrt(dx * dx + dy * dy);
  const px = (-dy / len) * perpOffset;
  const py = (dx / len) * perpOffset;
  return `M ${fromX + px} ${fromY + py} L ${CARD_ANCHOR.x + px} ${CARD_ANCHOR.y + py}`;
}

function CornerBrackets() {
  const size = 12;
  const border = `1.5px solid ${GREEN}99`;
  const base: CSSProperties = { position: 'absolute', width: size, height: size };
  return (
    <>
      <span
        style={{ ...base, top: 10, left: 10, borderTop: border, borderLeft: border }}
      />
      <span
        style={{ ...base, top: 10, right: 10, borderTop: border, borderRight: border }}
      />
      <span
        style={{
          ...base,
          bottom: 10,
          left: 10,
          borderBottom: border,
          borderLeft: border,
        }}
      />
      <span
        style={{
          ...base,
          bottom: 10,
          right: 10,
          borderBottom: border,
          borderRight: border,
        }}
      />
    </>
  );
}

export default function FleetBlueprint() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [robotXArr, setRobotXArr] = useState<number[]>([190, 500, 810]);
  const [robotYArr, setRobotYArr] = useState<number[]>([270, 270, 270]);
  const [dotRx, setDotRx] = useState(2.5);
  const [dotRy, setDotRy] = useState(2.5);

  useEffect(() => {
    let rafId: number;

    const measure = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;

      setDotRx((5 / W) * SVG_W);
      setDotRy((5 / H) * SVG_H);

      if (imgRef.current && stickyRef.current) {
        const imgRect = imgRef.current.getBoundingClientRect();
        if (imgRect.height > 0) {
          const stickyRect = stickyRef.current.getBoundingClientRect();
          const relTop = imgRect.top - stickyRect.top;
          const relLeft = imgRect.left - stickyRect.left;
          setRobotYArr(
            FLEET_DATA.map((robot) => {
              const py = relTop + imgRect.height * robot.yFactor;
              return (py / H) * SVG_H;
            }),
          );
          setRobotXArr(
            FLEET_DATA.map((robot) => {
              const px = relLeft + imgRect.width * robot.xFactor;
              return (px / W) * SVG_W;
            }),
          );
        } else {
          rafId = requestAnimationFrame(measure);
        }
      }
    };

    rafId = requestAnimationFrame(measure);

    const img = imgRef.current;
    img?.addEventListener('load', measure);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(rafId);
      img?.removeEventListener('load', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setActiveIndex(
      Math.min(Math.floor(latest * FLEET_DATA.length), FLEET_DATA.length - 1),
    );
  });

  const active = FLEET_DATA[activeIndex];
  const activeRobotX = robotXArr[activeIndex];
  const activeRobotY = robotYArr[activeIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${(FLEET_DATA.length + 1) * 50}vh` }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Grey background */}
        <div className="absolute inset-0" style={{ background: '#f5f5f5' }} />

        {/* Green grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(${GREEN} 1px, transparent 1px),
              linear-gradient(90deg, ${GREEN} 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Scan-line overlay */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
          <motion.div
            className="absolute inset-x-0 h-[200%]"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(124,205,84,0.15) 2px, rgba(124,205,84,0.15) 4px)',
            }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Robot image */}
        <div
          className="absolute top-0 right-0 left-0 flex items-center justify-center"
          style={{ bottom: '50%' }}
        >
          <div className="w-full max-w-7xl px-4 md:px-12">
            <img
              ref={imgRef}
              src="/mmr-images/all-robots.avif"
              alt="Flo Mobility Fleet Lineup"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        {/* SVG: dots + double-trace line */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="none"
          style={{ zIndex: 10 }}
        >
          {/* Robot anchor dots */}
          {FLEET_DATA.map((robot, idx) => (
            <motion.ellipse
              key={robot.id}
              cx={robotXArr[idx]}
              cy={robotYArr[idx]}
              rx={dotRx}
              ry={dotRy}
              fill={GREEN}
              initial={false}
              animate={{ opacity: idx === activeIndex ? 1 : 0.2 }}
              transition={{ duration: 0.4 }}
            />
          ))}

          {/* Single straight line from tyre to card */}
          <motion.path
            key={`line-${activeIndex}`}
            d={buildStraightPath(activeRobotX, activeRobotY)}
            stroke={GREEN}
            strokeWidth={1}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: EASE }}
          />

          {/* Terminal dot at card top */}
          <motion.ellipse
            key={`dot-${activeIndex}`}
            cx={CARD_ANCHOR.x}
            cy={CARD_ANCHOR.y}
            rx={dotRx}
            ry={dotRy}
            fill={GREEN}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5, ease: EASE }}
          />
        </svg>

        {/* Info card — unit + name, centered */}
        <div
          className="absolute right-4 left-4 z-20 md:right-auto md:left-1/2 md:w-[480px] md:-translate-x-1/2"
          style={{ top: `${CARD_TOP_PCT * 100}%`, bottom: 72 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.38, ease: EASE }}
              className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border p-6 md:p-8"
              style={{
                backgroundColor: 'rgba(124, 205, 84, 0.10)',
                borderColor: `${GREEN}50`,
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Blueprint corner brackets */}
              <CornerBrackets />

              {/* Top-edge inner highlight */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${GREEN}60, transparent)`,
                }}
              />

              <span
                className="relative mb-3 text-xs font-bold tracking-[0.3em] uppercase"
                style={{ color: '#000000', fontFamily: 'var(--font-dm-sans)' }}
              >
                Unit {active.unit}
              </span>
              <h3
                className="relative text-center text-2xl font-black tracking-tight md:text-3xl lg:text-4xl"
                style={{ color: DARK_GREEN, fontFamily: 'var(--font-dm-sans)' }}
              >
                {active.title}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom HUD bar */}
        <div
          className="absolute right-0 bottom-0 left-0 z-20 flex items-center justify-between px-6 py-5 md:px-12"
          style={{
            background:
              'linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 100%)',
          }}
        >
          <div className="flex items-center gap-3">
            {FLEET_DATA.map((robot, idx) => (
              <div key={robot.id} className="flex items-center gap-2">
                <motion.div
                  className="h-1 rounded-full"
                  style={{ width: 20 }}
                  animate={{
                    width: idx === activeIndex ? 40 : 20,
                    background: idx === activeIndex ? GREEN : `${GREEN}25`,
                  }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
                <span
                  className="hidden text-[10px] font-bold tracking-[0.15em] uppercase md:inline"
                  style={{
                    color: idx === activeIndex ? GREEN : 'rgba(0,0,0,0.25)',
                    fontFamily: 'var(--font-dm-sans)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {robot.title.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>

          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span
              className="text-[10px] font-semibold tracking-[0.25em] uppercase"
              style={{ color: 'rgba(0,0,0,0.35)', fontFamily: 'var(--font-dm-sans)' }}
            >
              Scroll to explore
            </span>
            <motion.svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path
                d="M6 2L6 10M6 10L3 7M6 10L9 7"
                stroke="rgba(0,0,0,0.35)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
