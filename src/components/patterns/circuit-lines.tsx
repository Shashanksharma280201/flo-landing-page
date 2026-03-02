import { cn } from "@/lib/utils";

interface CircuitLinesProps {
  className?: string;
  opacity?: number;
}

export function CircuitLines({ className, opacity = 0.04 }: CircuitLinesProps) {
  return (
    <div className={cn("absolute inset-0 -z-10 pointer-events-none", className)}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal lines */}
            <line x1="0" y1="20" x2="100" y2="20" stroke={`rgba(124, 205, 84, ${opacity})`} strokeWidth="1" />
            <line x1="0" y1="50" x2="100" y2="50" stroke={`rgba(124, 205, 84, ${opacity})`} strokeWidth="1" />
            <line x1="0" y1="80" x2="100" y2="80" stroke={`rgba(124, 205, 84, ${opacity})`} strokeWidth="1" />

            {/* Vertical lines */}
            <line x1="20" y1="0" x2="20" y2="100" stroke={`rgba(124, 205, 84, ${opacity})`} strokeWidth="1" />
            <line x1="50" y1="0" x2="50" y2="100" stroke={`rgba(124, 205, 84, ${opacity})`} strokeWidth="1" />
            <line x1="80" y1="0" x2="80" y2="100" stroke={`rgba(124, 205, 84, ${opacity})`} strokeWidth="1" />

            {/* Circuit nodes */}
            <circle cx="20" cy="20" r="2" fill={`rgba(124, 205, 84, ${opacity * 2})`} />
            <circle cx="50" cy="50" r="2" fill={`rgba(124, 205, 84, ${opacity * 2})`} />
            <circle cx="80" cy="80" r="2" fill={`rgba(124, 205, 84, ${opacity * 2})`} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
}
