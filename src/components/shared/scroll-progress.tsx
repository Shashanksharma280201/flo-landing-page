"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // useSpring smooths out the raw progress value to match the overall page feel
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gray-200/20">
      <motion.div
        className="h-full bg-[#7ccd54] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
