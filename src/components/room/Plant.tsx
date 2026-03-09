"use client";

import { useMemo } from "react";

interface PlantProps {
  position?: [number, number, number];
  scale?: number;
}

export default function Plant({ position = [0, 0, 0], scale = 1 }: PlantProps) {
  const leaves = useMemo(() => {
    const items = [];
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2 + Math.random() * 0.3;
      const tilt = 0.3 + Math.random() * 0.4;
      const height = 0.06 + Math.random() * 0.04;
      items.push({ angle, tilt, height, scale: 0.8 + Math.random() * 0.4 });
    }
    return items;
  }, []);

  return (
    <group position={position} scale={scale}>
      {/* Pot */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.04, 0.035, 0.06, 12]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.038, 12]} />
        <meshStandardMaterial color="#3a2210" roughness={0.9} />
      </mesh>

      {/* Leaves */}
      {leaves.map((leaf, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(leaf.angle) * 0.02,
            0.06 + leaf.height,
            Math.cos(leaf.angle) * 0.02,
          ]}
          rotation={[leaf.tilt, leaf.angle, 0]}
          scale={leaf.scale}
        >
          <coneGeometry args={[0.02, 0.07, 4]} />
          <meshStandardMaterial
            color="#1a6b2a"
            emissive="#0a3a12"
            emissiveIntensity={0.2}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}
