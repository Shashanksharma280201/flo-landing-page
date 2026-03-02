import { cn } from "@/lib/utils";

interface ConstructionGridProps {
  className?: string;
  opacity?: number;
}

export function ConstructionGrid({ className, opacity = 0.035 }: ConstructionGridProps) {
  return (
    <div className={cn("absolute inset-0 -z-10 pointer-events-none", className)}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="construction-grid"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Main grid */}
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke={`rgba(124, 205, 84, ${opacity})`}
              strokeWidth="1"
            />

            {/* Diagonal support lines */}
            <line
              x1="0"
              y1="0"
              x2="80"
              y2="80"
              stroke={`rgba(124, 205, 84, ${opacity * 0.5})`}
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />

            {/* Corner markers */}
            <circle cx="0" cy="0" r="1.5" fill={`rgba(124, 205, 84, ${opacity * 2})`} />
            <circle cx="80" cy="0" r="1.5" fill={`rgba(124, 205, 84, ${opacity * 2})`} />
            <circle cx="0" cy="80" r="1.5" fill={`rgba(124, 205, 84, ${opacity * 2})`} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#construction-grid)" />
      </svg>
    </div>
  );
}
