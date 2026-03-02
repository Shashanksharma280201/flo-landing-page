"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SharedTitleProps {
  title: string;
  slug: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SharedTitle({ title, slug, className, as: Component = "h2" }: SharedTitleProps) {
  return (
    <motion.div
      layoutId={`title-${slug}`}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <Component className={cn(className)}>
        {title}
      </Component>
    </motion.div>
  );
}
