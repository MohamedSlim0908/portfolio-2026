"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function BlinkingCursor({
  position = [0, 0, 0] as [number, number, number],
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.visible = Math.sin(state.clock.elapsedTime * 3.8) > 0;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.06, 0.12, 0.01]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.9} />
    </mesh>
  );
}
