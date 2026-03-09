"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ROWS = 5;
const COLS = 14;
const KEY_SIZE = 0.028;
const KEY_GAP = 0.032;

export default function Keyboard() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Simulate typing - random keys bounce
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    let idx = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const bounce =
          Math.sin(time * 8 + idx * 1.7) > 0.92 ? 0.004 : 0;
        dummy.position.set(
          (c - COLS / 2) * KEY_GAP,
          0.01 + bounce,
          (r - ROWS / 2) * KEY_GAP
        );
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={[0, 0.8, -0.7]}>
      {/* Keyboard base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.015, 0.18]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Keys */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, ROWS * COLS]}>
        <boxGeometry args={[KEY_SIZE, 0.01, KEY_SIZE]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.3} />
      </instancedMesh>
    </group>
  );
}
