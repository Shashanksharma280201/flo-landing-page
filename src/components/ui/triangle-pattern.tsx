import { cn } from "@/lib/utils";

interface TrianglePatternProps {
  className?: string;
  triangleSize?: number;
  triangleColor?: string;
  gap?: number;
}

export function TrianglePattern({
  className,
  triangleSize = 8,
  triangleColor = "rgba(0, 0, 0, 0.1)",
  gap = 30,
}: TrianglePatternProps) {
  // Create SVG triangle pattern
  const svgTriangle = `
    <svg width="${gap}" height="${gap}" xmlns="http://www.w3.org/2000/svg">
      <polygon points="${gap / 2},${gap / 2 - triangleSize} ${gap / 2 - triangleSize},${gap / 2 + triangleSize} ${gap / 2 + triangleSize},${gap / 2 + triangleSize}" fill="${triangleColor}" />
    </svg>
  `;

  const encodedSvg = encodeURIComponent(svgTriangle.trim());

  return (
    <div
      className={cn("absolute inset-0 -z-10", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodedSvg}")`,
        backgroundSize: `${gap}px ${gap}px`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
