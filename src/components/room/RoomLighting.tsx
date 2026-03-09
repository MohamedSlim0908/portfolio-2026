"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { remap } from "@/utils/math";

export default function RoomLighting() {
  const monitorLightRef = useRef<THREE.PointLight>(null);
  const deskLampRef = useRef<THREE.PointLight>(null);
  const windowLightRef = useRef<THREE.PointLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    const { scrollProgress } = usePortfolioStore.getState();

    const dimFactor = remap(scrollProgress, 0.18, 0.35, 1, 0);

    if (deskLampRef.current) {
      deskLampRef.current.intensity = 6 * dimFactor;
    }
    if (windowLightRef.current) {
      windowLightRef.current.intensity = 4 * dimFactor;
    }
    if (ambientRef.current) {
      ambientRef.current.intensity = 0.7 * dimFactor + 0.15;
    }
    if (monitorLightRef.current) {
      const monitorBright = remap(scrollProgress, 0.0, 0.35, 7, 10);
      monitorLightRef.current.intensity = monitorBright;
    }
  });

  return (
    <>
      {/* Monitor glow */}
      <pointLight
        ref={monitorLightRef}
        position={[0, 1.8, -1.2]}
        color="#7755ff"
        intensity={7}
        distance={12}
        decay={2}
      />

      {/* Desk lamp */}
      <pointLight
        ref={deskLampRef}
        position={[0.8, 2.0, -0.5]}
        color="#ffbb44"
        intensity={6}
        distance={10}
        decay={2}
      />

      {/* Window ambient */}
      <pointLight
        ref={windowLightRef}
        position={[-2, 2, -1]}
        color="#5577bb"
        intensity={4}
        distance={14}
        decay={2}
      />

      {/* Ambient fill */}
      <ambientLight ref={ambientRef} color="#3a2a5e" intensity={0.7} />

      {/* Extra fill from above */}
      <pointLight
        position={[0, 2.8, 0]}
        color="#2a1a4e"
        intensity={2.5}
        distance={10}
        decay={2}
      />

      {/* Extra fill from front */}
      <pointLight
        position={[0, 1.5, 2]}
        color="#221144"
        intensity={1.5}
        distance={8}
        decay={2}
      />
    </>
  );
}
