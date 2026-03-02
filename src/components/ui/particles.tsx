"use client";

import { useEffect, useRef } from "react";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  ease?: number;
  color?: string;
  refresh?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export function Particles({
  className = "",
  quantity = 30,
  ease = 50,
  color = "#7ccd54",
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const updateDimensions = () => {
      if (canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(dpr, dpr);

        // Reinitialize particles on resize
        initParticles(rect.width, rect.height);
      }
    };

    const initParticles = (width: number, height: number) => {
      particlesRef.current = [];
      for (let i = 0; i < quantity; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * ease * 0.01,
          vy: (Math.random() - 0.5) * ease * 0.01,
          radius: Math.random() * 1.5 + 1,
          alpha: Math.random() * 0.6 + 0.3,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    let animationFrameId: number;

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      ctx.clearRect(0, 0, rect.width, rect.height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > rect.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(rect.width, particle.x));
        }
        if (particle.y < 0 || particle.y > rect.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(rect.height, particle.y));
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(color, particle.alpha);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateDimensions);
    };
  }, [quantity, ease, color, refresh]);

  const hexToRgba = (hex: string, alpha: number): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
      : `rgba(124, 205, 84, ${alpha})`;
  };

  return (
    <div className={className} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
