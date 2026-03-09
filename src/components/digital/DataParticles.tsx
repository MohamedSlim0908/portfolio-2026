"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DataParticlesProps {
  count?: number;
  color?: string;
  spread?: number;
  position?: [number, number, number];
}

export default function DataParticles({
  count = 150,
  color = "#aa44ff",
  spread = 20,
  position = [0, 0, 0],
}: DataParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const vels = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = Math.random() * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      sizes[i] = 0.5 + Math.random() * 1.5;
      vels[i * 3] = (Math.random() - 0.5) * 0.01;
      vels[i * 3 + 1] = Math.random() * 0.005 + 0.002;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    return { geometry: geo, velocities: vels };
  }, [count, spread]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      let x = pos.getX(i) + velocities[i * 3];
      let y = pos.getY(i) + velocities[i * 3 + 1];
      let z = pos.getZ(i) + velocities[i * 3 + 2];

      // Wrap around
      if (y > 5) y = 0;
      if (Math.abs(x) > spread / 2) x *= -0.9;
      if (Math.abs(z) > spread / 2) z *= -0.9;

      pos.setXYZ(i, x, y, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry} position={position} frustumCulled={false}>
      <pointsMaterial
        color={color}
        size={0.05}
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
