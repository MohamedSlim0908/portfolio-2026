"use client";

import * as THREE from "three";

function Poster({
  position,
  size,
  color,
  frameColor,
}: {
  position: [number, number, number];
  size: [number, number];
  color: string;
  frameColor: string;
}) {
  return (
    <group position={position}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[size[0] + 0.03, size[1] + 0.03, 0.015]} />
        <meshStandardMaterial color={frameColor} roughness={0.5} />
      </mesh>
      {/* Art */}
      <mesh position={[0, 0, 0.008]}>
        <planeGeometry args={size} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );
}

function LEDStrip() {
  const points = [];
  for (let i = 0; i < 20; i++) {
    points.push(new THREE.Vector3(-0.9 + i * 0.1, 0, 0));
  }

  return (
    <group position={[0, 2.7, -1.98]}>
      {points.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.012, 6, 6]} />
          <meshBasicMaterial
            color={`hsl(${(i * 18) % 360}, 100%, 60%)`}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
      {/* Glow strip */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[2, 0.02]} />
        <meshBasicMaterial color="#7755ff" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function WallDecor() {
  return (
    <group>
      {/* LED light strip along top of back wall */}
      <LEDStrip />

      {/* Poster above bed area - on back wall */}
      <Poster
        position={[1.8, 2.1, -1.98]}
        size={[0.4, 0.3]}
        color="#1a0830"
        frameColor="#100820"
      />

      {/* Small poster on right side */}
      <Poster
        position={[2.3, 1.8, -1.98]}
        size={[0.25, 0.35]}
        color="#0d1520"
        frameColor="#100820"
      />
    </group>
  );
}
