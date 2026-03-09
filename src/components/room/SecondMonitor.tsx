"use client";

import * as THREE from "three";

export default function SecondMonitor() {
  return (
    <group position={[-0.75, 1.5, -1.45]} rotation={[0, 0.2, 0]}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[0.7, 0.45, 0.03]} />
        <meshStandardMaterial color="#0a0a15" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[0.62, 0.38]} />
        <meshBasicMaterial color="#0e0824" />
      </mesh>

      {/* Screen glow lines */}
      {[-0.1, 0, 0.05, 0.1].map((y, i) => (
        <mesh key={i} position={[-0.05 + i * 0.04, y, 0.017]}>
          <planeGeometry args={[0.35 + Math.random() * 0.15, 0.008]} />
          <meshBasicMaterial
            color="#6644aa"
            transparent
            opacity={0.3 + Math.random() * 0.2}
          />
        </mesh>
      ))}

      {/* Stand neck */}
      <mesh position={[0, -0.28, -0.01]}>
        <boxGeometry args={[0.04, 0.1, 0.04]} />
        <meshStandardMaterial color="#0a0a15" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Stand base */}
      <mesh position={[0, -0.33, 0.02]}>
        <boxGeometry args={[0.2, 0.015, 0.12]} />
        <meshStandardMaterial color="#0a0a15" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}
