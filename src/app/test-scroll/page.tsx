"use client";

import { RobotScroll } from "@/components/robot-scroll";

export default function TestScrollPage() {
  return (
    <div className="bg-white">
      <RobotScroll />

      {/* End Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="text-center px-6 py-12">
          <h2 className="text-5xl md:text-6xl font-bold text-black/90 mb-6 tracking-tight">
            Experience Innovation
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto tracking-tight leading-relaxed">
            Scroll-driven storytelling powered by cutting-edge technology.
            <br />
            Built for the future of construction robotics.
          </p>
        </div>
      </div>
    </div>
  );
}
