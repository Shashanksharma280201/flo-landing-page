'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue, useSpring } from 'framer-motion';

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scaleDimensions = () => {
    if (typeof window === 'undefined') return [0.7, 1];
    return window.innerWidth >= 768 ? [0.7, 1] : [0.9, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  // Add spring physics for smoother motion
  const rotateSpring = useSpring(rotate, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scaleSpring = useSpring(scale, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const translateSpring = useSpring(translate, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="relative flex h-[50rem] items-center justify-center p-2 md:h-[60rem] md:p-10"
      ref={containerRef}
    >
      <div
        className="relative w-full py-6 md:py-20"
        style={{
          perspective: '1500px',
        }}
      >
        <Header translate={translateSpring} titleComponent={titleComponent} />
        <Card rotate={rotateSpring} scale={scaleSpring}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="mx-auto -mt-12 h-[28rem] w-full max-w-5xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl md:h-[36rem] md:p-4"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 md:rounded-2xl md:p-4 dark:bg-zinc-900">
        {children}
      </div>
    </motion.div>
  );
};
