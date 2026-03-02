"use client"

import React, { useEffect, useId, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface MagicDotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  x?: number
  y?: number
  cx?: number
  cy?: number
  cr?: number
  className?: string
  /** When true each dot slowly pulses in opacity — CSS-driven, no JS overhead */
  glow?: boolean
}

export function MagicDotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}: MagicDotPatternProps) {
  const id = useId()
  const containerRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const cols = Math.ceil(dimensions.width / width)
  const rows = Math.ceil(dimensions.height / height)

  // Memoised so random delay/duration values survive re-renders (only reset on resize)
  const dots = useMemo(
    () =>
      Array.from({ length: cols * rows }, (_, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        return {
          x: col * width + cx,
          y: row * height + cy,
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 2,
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cols, rows, width, height, cx, cy],
  )

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
      {...props}
    >
      <defs>
        <radialGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>

        {/* Single keyframe shared by all glow dots — one CSS animation, zero JS RAF */}
        {glow && (
          <style>{`
            @keyframes magic-dot-pulse-${id.replace(/:/g, "")} {
              0%, 100% { opacity: 0.35; }
              50%       { opacity: 1;    }
            }
          `}</style>
        )}
      </defs>

      {dots.map((dot, index) =>
        glow ? (
          <circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r={cr}
            fill={`url(#${id}-gradient)`}
            style={{
              animation: `magic-dot-pulse-${id.replace(/:/g, "")} ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
            }}
          />
        ) : (
          <circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r={cr}
            fill="currentColor"
          />
        ),
      )}
    </svg>
  )
}
