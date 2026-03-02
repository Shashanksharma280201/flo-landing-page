import { cn } from "@/lib/utils";

interface CirclePatternProps {
  className?: string;
  circleSize?: number;
  circleColor?: string;
  gap?: number;
}

export function CirclePattern({
  className,
  circleSize = 2,
  circleColor = "rgba(0, 0, 0, 0.1)",
  gap = 20,
}: CirclePatternProps) {
  return (
    <div
      className={cn("absolute inset-0 -z-10", className)}
      style={{
        backgroundImage: `radial-gradient(circle, ${circleColor} ${circleSize}px, transparent ${circleSize}px)`,
        backgroundSize: `${gap}px ${gap}px`,
      }}
    />
  );
}
