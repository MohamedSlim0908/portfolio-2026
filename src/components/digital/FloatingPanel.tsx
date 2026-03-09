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
      {/* Glass background */}
      <mesh>
        <planeGeometry args={[2.5, 1.5]} />
        <meshBasicMaterial
          color="#050520"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Border glow */}
      <mesh>
        <planeGeometry args={[2.55, 1.55]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* HTML Content */}
      <Html
        transform
        distanceFactor={5}
        position={[0, 0, 0.01]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            width: `${width}px`,
            padding: "20px",
            fontFamily: "monospace",
            color: "#e8e8f0",
            userSelect: "none",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: color,
              marginBottom: "10px",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            {title}
          </h3>
          <div
            style={{
              fontSize: "12px",
              lineHeight: "1.6",
              color: "#8888aa",
            }}
          >
            {content}
          </div>
        </div>
      </Html>
    </group>
  );
}
