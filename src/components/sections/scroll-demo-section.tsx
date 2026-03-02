"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function ScrollDemoSection() {
  return (
    <div className="flex flex-col overflow-hidden bg-transparent">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-black">
              Experience the Future of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Autonomous Robotics
              </span>
            </h1>
          </>
        }
      >
        <div className="h-full w-full bg-gradient-to-br from-[#7ccd54]/20 via-white to-[#7ccd54]/10 flex items-center justify-center rounded-2xl">
          <div className="text-center p-8">
            <p className="text-6xl mb-4">🤖</p>
            <p className="text-gray-400 text-sm">Replace with your platform screenshot</p>
            <p className="text-gray-300 text-xs mt-2">/public/linear.webp</p>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
