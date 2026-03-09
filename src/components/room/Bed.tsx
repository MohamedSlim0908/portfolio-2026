"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Bed() {
  const blanketRef = useRef<THREE.Mesh>(null);

  // Subtle breathing animation on blanket
  useFrame((state) => {
    if (blanketRef.current) {
      blanketRef.current.scale.y =
        1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
    }
  });

  return (
    <group position={[2.35, 0, -0.2]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Bed frame */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.6, 0.15, 0.9]} />
        <meshStandardMaterial color="#1a1225" roughness={0.7} />
      </mesh>

      {/* Bed legs */}
      {[
        [-0.7, 0.06, -0.35],
        [0.7, 0.06, -0.35],
        [-0.7, 0.06, 0.35],
        [0.7, 0.06, 0.35],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.06, 0.12, 0.06]} />
          <meshStandardMaterial color="#0d0a15" roughness={0.6} />
        </mesh>
      ))}

      {/* Headboard */}
      <mesh position={[-0.75, 0.52, 0]}>
        <boxGeometry args={[0.06, 0.55, 0.92]} />
        <meshStandardMaterial color="#1a1225" roughness={0.6} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, 0.33, 0]}>
        <boxGeometry args={[1.5, 0.12, 0.85]} />
        <meshStandardMaterial color="#2a2040" roughness={0.9} />
      </mesh>

      {/* Blanket / Duvet */}
      <mesh ref={blanketRef} position={[0.15, 0.42, 0]}>
        <boxGeometry args={[1.2, 0.08, 0.82]} />
        <meshStandardMaterial color="#352860" roughness={0.85} />
      </mesh>

      {/* Pillow 1 */}
      <mesh position={[-0.55, 0.44, -0.18]}>
        <boxGeometry args={[0.3, 0.08, 0.3]} />
        <meshStandardMaterial color="#3d3055" roughness={0.9} />
      </mesh>

      {/* Pillow 2 */}
      <mesh position={[-0.55, 0.44, 0.18]}>
        <boxGeometry args={[0.3, 0.08, 0.3]} />
        <meshStandardMaterial color="#443660" roughness={0.9} />
      </mesh>
    </group>
  );
}
