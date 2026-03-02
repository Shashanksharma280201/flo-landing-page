"use client";

import { cn } from "@/lib/utils";

interface ProgressiveBlurProps {
  children: React.ReactNode;
  className?: string;
}

export function ProgressiveBlur({ children, className }: ProgressiveBlurProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-x-auto [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <div className="flex gap-4 pb-4">
        {children}
      </div>
    </div>
  );
}
