"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface HolographicTextProps {
  text: string;
  position?: [number, number, number];
  color?: string;
  size?: number;
}

export default function HolographicText({
  text,
  position = [0, 0, 0],
  color = "#00d4ff",
  size = 0.5,
}: HolographicTextProps) {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      const mat = textRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.9 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
      material-transparent
      material-opacity={0.8}
      material-toneMapped={false}
    >
      {text}
    </Text>
  );
}
