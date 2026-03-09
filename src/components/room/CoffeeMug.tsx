"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STEAM_COUNT = 15;

export default function CoffeeMug() {
  const steamRef = useRef<THREE.Points>(null);

  const steamGeometry = useMemo(() => {
    const positions = new Float32Array(STEAM_COUNT * 3);
    const offsets = new Float32Array(STEAM_COUNT);
    for (let i = 0; i < STEAM_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.03;
      positions[i * 3 + 1] = Math.random() * 0.12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.03;
      offsets[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 1));
    return geo;
  }, []);

  useFrame((state) => {
    if (!steamRef.current) return;
    const positions = steamRef.current.geometry.attributes.position;
    const offsets = steamRef.current.geometry.attributes.aOffset;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < STEAM_COUNT; i++) {
      const offset = (offsets as THREE.BufferAttribute).getX(i);
      let y = ((time * 0.3 + offset) % 1) * 0.15;
      const x = Math.sin(time * 2 + offset * 10) * 0.01;
      positions.setXYZ(
        i,
        x,
        y,
        Math.cos(time * 1.5 + offset * 8) * 0.01
      );
    }
    positions.needsUpdate = true;
  });

  return (
    <group position={[0.85, 0.82, -0.6]}>
      {/* Mug body */}
      <mesh>
        <cylinderGeometry args={[0.035, 0.03, 0.07, 16]} />
        <meshStandardMaterial color="#e8e0d0" roughness={0.6} />
      </mesh>

      {/* Handle */}
      <mesh position={[0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.02, 0.005, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#e8e0d0" roughness={0.6} />
      </mesh>

      {/* Coffee surface */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.032, 16]} />
        <meshStandardMaterial color="#3a1f0a" roughness={0.3} />
      </mesh>

      {/* Steam */}
      <points ref={steamRef} geometry={steamGeometry} position={[0, 0.04, 0]}>
        <pointsMaterial
          color="#aaaacc"
          size={0.008}
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
