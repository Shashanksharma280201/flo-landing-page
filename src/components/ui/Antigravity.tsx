"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: "capsule" | "sphere" | "box" | "tetrahedron";
  fieldStrength?: number;
  drift?: boolean; // New prop for random drifting
  driftSpeed?: number;
  eventSource?: React.RefObject<HTMLElement | null>;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const generateParticles = (
  count: number,
  width: number,
  height: number,
  minDistance = 2,
) => {
  const temp = [];
  const maxAttempts = 50;

  for (let i = 0; i < count; i++) {
    let x = 0,
      y = 0,
      z = 0;
    let foundPosition = false;
    let attempts = 0;

    while (!foundPosition && attempts < maxAttempts) {
      x = (Math.random() - 0.5) * width;
      y = (Math.random() - 0.5) * height;
      z = (Math.random() - 0.5) * 20;

      foundPosition = true;
      for (let j = 0; j < temp.length; j++) {
        const dx = x - temp[j].mx;
        const dy = y - temp[j].my;
        const dz = z - temp[j].mz;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < minDistance * minDistance) {
          foundPosition = false;
          break;
        }
      }
      attempts++;
    }

    const t = Math.random() * 100;
    const factor = 20 + Math.random() * 100;
    const speed = 0.01 + Math.random() / 200;
    const xFactor = -50 + Math.random() * 100;
    const yFactor = -50 + Math.random() * 100;
    const zFactor = -50 + Math.random() * 100;

    const randomRadiusOffset = (Math.random() - 0.5) * 2;

    temp.push({
      t,
      factor,
      speed,
      xFactor,
      yFactor,
      zFactor,
      mx: x,
      my: y,
      mz: z,
      cx: x,
      cy: y,
      cz: z,
      vx: (Math.random() - 0.5) * 0.05,
      vy: (Math.random() - 0.5) * 0.05,
      vz: (Math.random() - 0.5) * 0.05,
      randomRadiusOffset,
    });
  }
  return temp;
};

const AntigravityInner: React.FC<AntigravityProps> = ({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = "#FF9FFC",
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = "capsule",
  fieldStrength = 10,
  drift = false,
  driftSpeed = 1,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    return generateParticles(
      count,
      viewport.width || 100,
      viewport.height || 100,
      particleSize * 0.8,
    );
  }, [count, viewport.width, viewport.height, particleSize]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (drift) {
      const { width, height } = viewport;
      const repulsionRadius = particleSize * 1.2;
      const repulsionStrength = 0.02 * driftSpeed;

      // Reset accelerations or handle repulsion
      particles.forEach((p1, i) => {
        // Inter-particle repulsion (Simple O(N^2) - 300 particles is manageable)
        // We only check a subset of particles to keep it smooth if count is high
        const checkCount = count > 300 ? 50 : count;
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dx = p1.mx - p2.mx;
          const dy = p1.my - p2.my;
          const dz = p1.mz - p2.mz;
          const distSq = dx * dx + dy * dy + dz * dz;
          const minSafe = repulsionRadius * repulsionRadius;

          if (distSq < minSafe && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const force = (minSafe - distSq) / minSafe * repulsionStrength;
            const nx = dx / dist;
            const ny = dy / dist;
            const nz = dz / dist;

            p1.vx += nx * force;
            p1.vy += ny * force;
            p1.vz += nz * force;
            p2.vx -= nx * force;
            p2.vy -= ny * force;
            p2.vz -= nz * force;
          }
        }

        // Apply velocities with driftSpeed
        p1.mx += p1.vx * driftSpeed;
        p1.my += p1.vy * driftSpeed;
        p1.mz += p1.vz * driftSpeed;

        // Friction to keep things from exploding
        p1.vx *= 0.95;
        p1.vy *= 0.95;
        p1.vz *= 0.95;

        // Boundary bounce
        if (Math.abs(p1.mx) > width / 2) p1.vx *= -1.2; // Bounce back stronger to stay inside
        if (Math.abs(p1.my) > height / 2) p1.vy *= -1.2;
        if (Math.abs(p1.mz) > 15) p1.vz *= -1.2;

        // Update internal time
        p1.t += p1.speed * 0.5;
        const t = p1.t;

        // Organic wiggle drift on top of base movement
        const driftX = Math.sin(t * 0.5 + p1.xFactor / 10) * (waveAmplitude * 2);
        const driftY = Math.cos(t * 0.3 + p1.yFactor / 10) * (waveAmplitude * 2);
        const driftZ = Math.sin(t * 0.4 + p1.zFactor / 10) * (waveAmplitude * 2);

        const tx = p1.mx + driftX;
        const ty = p1.my + driftY;
        const tz = p1.mz + driftZ;

        // Smoothly interpolate current position to target
        p1.cx += (tx - p1.cx) * lerpSpeed;
        p1.cy += (ty - p1.cy) * lerpSpeed;
        p1.cz += (tz - p1.cz) * lerpSpeed;

        dummy.position.set(p1.cx, p1.cy, p1.cz);

        // Slow random rotation
        dummy.rotation.x = t * 0.2 + p1.xFactor / 100;
        dummy.rotation.y = t * 0.2 + p1.yFactor / 100;

        // Gentle pulse
        const s = particleSize * (0.8 + Math.sin(t * 2 + p1.zFactor) * 0.2);
        dummy.scale.set(s, s, s);

        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
      return;
    }

    const { viewport: v, pointer: m } = state;

    const mouseDist = Math.sqrt(
      Math.pow(m.x - lastMousePos.current.x, 2) +
        Math.pow(m.y - lastMousePos.current.y, 2),
    );

    if (mouseDist > 0.001) {
      lastMouseMoveTime.current = Date.now();
      lastMousePos.current = { x: m.x, y: m.y };
    }

    let destX = (m.x * v.width) / 2;
    let destY = (m.y * v.height) / 2;

    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
      const time = state.clock.getElapsedTime();
      destX = Math.sin(time * 0.5) * (v.width / 4);
      destY = Math.cos(time * 0.5 * 2) * (v.height / 4);
    }

    const smoothFactor = 0.05;
    virtualMouse.current.x += (destX - virtualMouse.current.x) * smoothFactor;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * smoothFactor;

    const targetX = virtualMouse.current.x;
    const targetY = virtualMouse.current.y;

    const globalRotation = state.clock.getElapsedTime() * rotationSpeed;

    particles.forEach((particle, i) => {
      const { speed, mx, my, mz, cz, randomRadiusOffset } = particle;

      const t = (particle.t += speed / 2);

      const projectionFactor = 1 - cz / 50;
      const projectedTargetX = targetX * projectionFactor;
      const projectedTargetY = targetY * projectionFactor;

      const dx = mx - projectedTargetX;
      const dy = my - projectedTargetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const targetPos = { x: mx, y: my, z: mz * depthFactor };

      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation;

        const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1));

        const currentRingRadius = ringRadius + wave + deviation;

        targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
        targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
        targetPos.z =
          mz * depthFactor + Math.sin(t) * (1 * waveAmplitude * depthFactor);
      }

      particle.cx += (targetPos.x - particle.cx) * lerpSpeed;
      particle.cy += (targetPos.y - particle.cy) * lerpSpeed;
      particle.cz += (targetPos.z - particle.cz) * lerpSpeed;

      dummy.position.set(particle.cx, particle.cy, particle.cz);

      dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz);
      dummy.rotateX(Math.PI / 2);

      const currentDistToMouse = Math.sqrt(
        Math.pow(particle.cx - projectedTargetX, 2) +
          Math.pow(particle.cy - projectedTargetY, 2),
      );

      const reactionFactor = Math.max(
        0,
        1 - Math.abs(currentDistToMouse - ringRadius) / 10,
      );

      const finalScale =
        (0.6 + reactionFactor * 0.4) *
        (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) *
        particleSize;
      dummy.scale.set(finalScale, finalScale, finalScale);

      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {particleShape === "capsule" && (
        <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
      )}
      {particleShape === "sphere" && <sphereGeometry args={[0.2, 16, 16]} />}
      {particleShape === "box" && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {particleShape === "tetrahedron" && <tetrahedronGeometry args={[0.3]} />}
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
};

export const Antigravity: React.FC<AntigravityProps> = ({
  children,
  className,
  containerClassName,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={cn("relative", containerClassName)}>
      <div className="absolute inset-0 z-0 h-full blur-xl">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Canvas
            camera={{ position: [0, 0, 50], fov: 35 }}
            eventSource={containerRef as React.RefObject<HTMLElement>}
            eventPrefix="client"
          >
            <AntigravityInner {...props} />
          </Canvas>
        </div>
      </div>
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
