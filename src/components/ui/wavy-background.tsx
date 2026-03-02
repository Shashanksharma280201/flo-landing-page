"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
}) => {
  const noise = useMemo(() => createNoise3D(), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Performance optimization: Render at a lower resolution and scale up
  // Since we use blur, the user won't notice the lower resolution.
  const scale = 0.5; 

  const getSpeed = () => {
    switch (speed) {
      case "slow": return 0.001;
      case "fast": return 0.002;
      default: return 0.001;
    }
  };

  const waveColors = colors ?? [
    "#7ccd54",
    "#A5E089",
    "#C8F2B7",
    "#D9F9CC",
    "#E6FBE0",
  ];

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimization: disable alpha if possible
    if (!ctx) return;

    let w: number, h: number, nt = 0;
    let animationId: number;

    const resize = () => {
      w = canvas.width = window.innerWidth * scale;
      h = canvas.height = window.innerHeight * scale;
      ctx.filter = `blur(${blur * scale}px)`;
    };

    const drawWave = (n: number) => {
      nt += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = (waveWidth || 50) * scale;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += 5 * scale) {
          const y = noise(x / (800 * scale), 0.3 * i, nt) * (100 * scale);
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      ctx.fillStyle = backgroundFill || "#FEFDFB";
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
      animationId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [blur, speed, waveOpacity, waveWidth, backgroundFill, noise, waveColors]);

  return (
    <div className={cn("relative flex flex-col items-center justify-center", containerClassName)}>
      <canvas
        className="absolute inset-0 z-0 w-full h-full"
        ref={canvasRef}
        style={{
          imageRendering: "auto",
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
