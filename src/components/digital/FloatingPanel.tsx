"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

interface FloatingPanelProps {
  position: [number, number, number];
  title: string;
  content: React.ReactNode;
  color?: string;
  width?: number;
  visibleInScenes?: number[];
}

export default function FloatingPanel({
  position,
  title,
  content,
  color = "#00d4ff",
  width = 280,
  visibleInScenes = [4, 5],
}: FloatingPanelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const initialY = useRef(position[1]);
  const currentScene = usePortfolioStore((s) => s.currentScene);

  const isVisible = visibleInScenes.includes(currentScene);

  useFrame((state) => {
    if (groupRef.current && isVisible) {
      groupRef.current.position.y =
        initialY.current + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.15;
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3 + position[2]) * 0.05;
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={position}>
      {/* HTML Content */}
      <Html
        transform
        distanceFactor={7}
        position={[0, 0, 0.01]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            width: `${width}px`,
            padding: "22px",
            fontFamily:
              "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            color: "#e8e8f0",
            userSelect: "none",
          }}
        >
          <h3
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: color,
              marginBottom: "14px",
              textTransform: "uppercase",
              letterSpacing: "3px",
            }}
          >
            {title}
          </h3>
          <div
            style={{
              fontSize: "13px",
              lineHeight: "1.7",
              color: "#c0c0dd",
            }}
          >
            {content}
          </div>
        </div>
      </Html>
    </group>
  );
}
