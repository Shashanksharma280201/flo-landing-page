'use client';

import React from 'react';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

export function ScrollDemoSection() {
  return (
    <div className="flex flex-col overflow-hidden bg-transparent">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-black">
              Experience the Future of <br />
              <span
                className="mt-1 text-4xl leading-none font-bold md:text-[6rem]"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Autonomous Robotics
              </span>
            </h1>
          </>
        }
      >
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#7ccd54]/20 via-white to-[#7ccd54]/10">
          <div className="p-8 text-center">
            <p className="mb-4 text-6xl">🤖</p>
            <p className="text-sm text-gray-400">Replace with your platform screenshot</p>
            <p className="mt-2 text-xs text-gray-300">/public/linear.webp</p>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
