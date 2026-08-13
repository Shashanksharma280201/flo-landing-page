import { cn } from '@/lib/utils';

interface DotPatternProps {
  className?: string;
  dotSize?: number;
  dotColor?: string;
  gap?: number;
}

export function DotPattern({
  className,
  dotSize = 10,
  dotColor = 'rgba(0, 0, 0, 0.1)',
  gap = 20,
}: DotPatternProps) {
  return (
    <div
      className={cn('absolute inset-0', className)}
      style={{
        backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
        backgroundSize: `${gap}px ${gap}px`,
        zIndex: 0,
      }}
    />
  );
}
