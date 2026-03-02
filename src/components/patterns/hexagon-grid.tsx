import { cn } from "@/lib/utils";

interface HexagonGridProps {
  className?: string;
  opacity?: number;
}

export function HexagonGrid({ className, opacity = 0.03 }: HexagonGridProps) {
  return (
    <div className={cn("absolute inset-0 -z-10 pointer-events-none", className)}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hexagons"
            x="0"
            y="0"
            width="56"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1.5)"
          >
            <polygon
              points="24,0 48,14 48,42 24,56 0,42 0,14"
              fill="none"
              stroke={`rgba(124, 205, 84, ${opacity})`}
              strokeWidth="1"
            />
            <polygon
              points="80,28 104,42 104,70 80,84 56,70 56,42"
              fill="none"
              stroke={`rgba(124, 205, 84, ${opacity})`}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
}
