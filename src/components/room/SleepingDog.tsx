"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Realistic sleeping golden retriever curled up in a dog bed
export default function SleepingDog() {
  const breathRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (breathRef.current) {
      const t = state.clock.elapsedTime;
      // Slow, gentle breathing
      breathRef.current.scale.set(
        1 + Math.sin(t * 0.7) * 0.012,
        1 + Math.sin(t * 0.7) * 0.018,
        1 + Math.sin(t * 0.7) * 0.012
      );
    }
  });

  const fur = "#C4913D";
  const furDark = "#A67825";
  const furLight = "#D4A54A";
  const furBelly = "#D9BC82";
  const nose = "#2a1a10";
  const bedColor = "#2a1830";
  const bedRim = "#3d2855";

  return (
    <group position={[-1.3, 0, 0.5]} scale={2.2}>
      {/* === DOG BED === */}
      {/* Base cushion */}
      <mesh position={[0, 0.025, 0]} scale={[1, 0.25, 1]}>
        <cylinderGeometry args={[0.24, 0.26, 0.12, 24]} />
        <meshStandardMaterial color={bedColor} roughness={0.92} />
      </mesh>
      {/* Inner cushion - soft pad */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.21, 24]} />
        <meshStandardMaterial color="#352040" roughness={0.95} />
      </mesh>
      {/* Raised rim all around */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.04, 12, 24]} />
        <meshStandardMaterial color={bedRim} roughness={0.88} />
      </mesh>

      {/* === DOG BODY === */}
      <group ref={breathRef} position={[0, 0.09, 0]} rotation={[0, 0.4, 0]}>

        {/* Main torso - large smooth shape */}
        <mesh position={[0, 0.02, 0]} scale={[1.3, 0.7, 1]}>
          <sphereGeometry args={[0.1, 16, 12]} />
          <meshStandardMaterial color={fur} roughness={0.9} />
        </mesh>

        {/* Upper back / shoulder area */}
        <mesh position={[0.04, 0.04, -0.01]} scale={[1.1, 0.8, 1.05]}>
          <sphereGeometry args={[0.085, 14, 10]} />
          <meshStandardMaterial color={furDark} roughness={0.9} />
        </mesh>

        {/* Lower back / hip */}
        <mesh position={[-0.06, 0.015, 0.01]} scale={[1.2, 0.65, 1.1]}>
          <sphereGeometry args={[0.08, 14, 10]} />
          <meshStandardMaterial color={fur} roughness={0.9} />
        </mesh>

        {/* Belly (lighter fur) */}
        <mesh position={[0.01, -0.02, 0.04]} scale={[1.15, 0.5, 0.8]}>
          <sphereGeometry args={[0.075, 12, 8]} />
          <meshStandardMaterial color={furBelly} roughness={0.92} />
        </mesh>

        {/* Ribcage definition */}
        <mesh position={[0.02, 0.01, -0.03]} scale={[1, 0.6, 0.9]}>
          <sphereGeometry args={[0.07, 12, 8]} />
          <meshStandardMaterial color={furDark} roughness={0.9} />
        </mesh>

        {/* === HEAD === */}
        <group position={[0.12, 0.02, 0.06]} rotation={[0, 0.3, 0.05]}>
          {/* Skull */}
          <mesh scale={[1, 0.82, 0.9]}>
            <sphereGeometry args={[0.055, 14, 12]} />
            <meshStandardMaterial color={fur} roughness={0.88} />
          </mesh>

          {/* Forehead */}
          <mesh position={[0.02, 0.015, 0]} scale={[0.9, 0.7, 0.85]}>
            <sphereGeometry args={[0.04, 12, 10]} />
            <meshStandardMaterial color={furLight} roughness={0.88} />
          </mesh>

          {/* Muzzle / snout */}
          <mesh position={[0.05, -0.012, 0.005]} scale={[1.2, 0.7, 0.85]}>
            <sphereGeometry args={[0.03, 12, 10]} />
            <meshStandardMaterial color={furLight} roughness={0.88} />
          </mesh>

          {/* Nose */}
          <mesh position={[0.07, -0.008, 0.005]}>
            <sphereGeometry args={[0.01, 10, 8]} />
            <meshStandardMaterial color={nose} roughness={0.4} metalness={0.2} />
          </mesh>

          {/* Lower jaw */}
          <mesh position={[0.04, -0.025, 0.005]} scale={[1.1, 0.5, 0.8]}>
            <sphereGeometry args={[0.025, 10, 8]} />
            <meshStandardMaterial color={furLight} roughness={0.9} />
          </mesh>

          {/* Cheek left */}
          <mesh position={[0.02, -0.005, 0.03]} scale={[0.8, 0.7, 0.6]}>
            <sphereGeometry args={[0.025, 10, 8]} />
            <meshStandardMaterial color={fur} roughness={0.9} />
          </mesh>

          {/* Cheek right */}
          <mesh position={[0.02, -0.005, -0.02]} scale={[0.8, 0.7, 0.6]}>
            <sphereGeometry args={[0.025, 10, 8]} />
            <meshStandardMaterial color={fur} roughness={0.9} />
          </mesh>

          {/* Closed eye left - dark slit */}
          <mesh position={[0.03, 0.008, 0.028]} rotation={[0.2, 0.3, 0.1]} scale={[1, 0.3, 0.6]}>
            <sphereGeometry args={[0.008, 8, 6]} />
            <meshStandardMaterial color="#1a1008" roughness={0.6} />
          </mesh>

          {/* Closed eye right */}
          <mesh position={[0.03, 0.008, -0.018]} rotation={[-0.2, 0.3, -0.1]} scale={[1, 0.3, 0.6]}>
            <sphereGeometry args={[0.008, 8, 6]} />
            <meshStandardMaterial color="#1a1008" roughness={0.6} />
          </mesh>

          {/* Eye brow ridge left */}
          <mesh position={[0.025, 0.018, 0.025]} scale={[0.8, 0.4, 0.5]}>
            <sphereGeometry args={[0.01, 8, 6]} />
            <meshStandardMaterial color={furDark} roughness={0.9} />
          </mesh>

          {/* Eye brow ridge right */}
          <mesh position={[0.025, 0.018, -0.015]} scale={[0.8, 0.4, 0.5]}>
            <sphereGeometry args={[0.01, 8, 6]} />
            <meshStandardMaterial color={furDark} roughness={0.9} />
          </mesh>

          {/* Ear left - floppy, laying down */}
          <mesh position={[-0.01, 0.01, 0.045]} rotation={[0.6, 0.2, 0.4]} scale={[0.7, 0.3, 1]}>
            <sphereGeometry args={[0.03, 10, 8]} />
            <meshStandardMaterial color={furDark} roughness={0.9} />
          </mesh>
          <mesh position={[-0.02, 0.0, 0.055]} rotation={[0.7, 0.2, 0.5]} scale={[0.6, 0.2, 0.8]}>
            <sphereGeometry args={[0.025, 10, 8]} />
            <meshStandardMaterial color="#8A6520" roughness={0.92} />
          </mesh>

          {/* Ear right - tucked under head */}
          <mesh position={[-0.01, 0.01, -0.035]} rotation={[-0.4, 0.2, -0.3]} scale={[0.7, 0.3, 1]}>
            <sphereGeometry args={[0.028, 10, 8]} />
            <meshStandardMaterial color={furDark} roughness={0.9} />
          </mesh>
        </group>

        {/* === NECK === */}
        <mesh position={[0.09, 0.02, 0.03]} rotation={[0, 0.2, 0.15]} scale={[1.1, 0.7, 0.9]}>
          <sphereGeometry args={[0.05, 12, 10]} />
          <meshStandardMaterial color={fur} roughness={0.9} />
        </mesh>

        {/* Neck scruff / thicker fur */}
        <mesh position={[0.07, 0.04, 0.02]} scale={[0.9, 0.6, 0.85]}>
          <sphereGeometry args={[0.04, 10, 8]} />
          <meshStandardMaterial color={furLight} roughness={0.92} />
        </mesh>

        {/* === FRONT LEGS === */}
        {/* Front left leg - tucked under */}
        <mesh position={[0.06, -0.03, 0.05]} rotation={[0.3, 0, 0.8]} scale={[0.4, 0.4, 1]}>
          <capsuleGeometry args={[0.018, 0.06, 6, 8]} />
          <meshStandardMaterial color={fur} roughness={0.9} />
        </mesh>
        {/* Front left paw */}
        <mesh position={[0.09, -0.04, 0.06]} scale={[0.7, 0.5, 0.8]}>
          <sphereGeometry args={[0.018, 8, 6]} />
          <meshStandardMaterial color={furLight} roughness={0.88} />
        </mesh>

        {/* Front right leg - extended slightly */}
        <mesh position={[0.05, -0.03, -0.02]} rotation={[-0.2, 0, 0.6]} scale={[0.4, 0.4, 1]}>
          <capsuleGeometry args={[0.016, 0.05, 6, 8]} />
          <meshStandardMaterial color={fur} roughness={0.9} />
        </mesh>
        {/* Front right paw */}
        <mesh position={[0.08, -0.04, -0.025]} scale={[0.65, 0.45, 0.75]}>
          <sphereGeometry args={[0.016, 8, 6]} />
          <meshStandardMaterial color={furLight} roughness={0.88} />
        </mesh>

        {/* === HIND LEGS === */}
        {/* Hind left - curled up against body */}
        <mesh position={[-0.08, -0.01, 0.06]} rotation={[0.5, 0, -0.3]} scale={[0.5, 0.5, 1]}>
          <capsuleGeometry args={[0.022, 0.05, 6, 8]} />
          <meshStandardMaterial color={fur} roughness={0.9} />
        </mesh>
        <mesh position={[-0.06, -0.035, 0.08]} scale={[0.7, 0.5, 0.8]}>
          <sphereGeometry args={[0.02, 8, 6]} />
          <meshStandardMaterial color={furLight} roughness={0.88} />
        </mesh>

        {/* Hind right - tucked */}
        <mesh position={[-0.07, -0.02, -0.03]} rotation={[-0.3, 0, -0.4]} scale={[0.5, 0.5, 1]}>
          <capsuleGeometry args={[0.02, 0.045, 6, 8]} />
          <meshStandardMaterial color={furDark} roughness={0.9} />
        </mesh>

        {/* === TAIL === */}
        {/* Tail base */}
        <mesh position={[-0.13, 0.02, -0.01]} rotation={[0.2, -0.6, 0.3]} scale={[1, 0.8, 0.8]}>
          <capsuleGeometry args={[0.015, 0.04, 6, 8]} />
          <meshStandardMaterial color={furDark} roughness={0.9} />
        </mesh>
        {/* Tail mid - curled around body */}
        <mesh position={[-0.15, 0.015, 0.02]} rotation={[0.5, -0.8, 0.2]} scale={[1, 0.7, 0.7]}>
          <capsuleGeometry args={[0.013, 0.035, 6, 8]} />
          <meshStandardMaterial color={fur} roughness={0.9} />
        </mesh>
        {/* Tail tip - fluffy */}
        <mesh position={[-0.14, 0.01, 0.05]} rotation={[0.8, -0.5, 0]} scale={[0.9, 0.6, 0.7]}>
          <capsuleGeometry args={[0.014, 0.025, 6, 8]} />
          <meshStandardMaterial color={furLight} roughness={0.92} />
        </mesh>
      </group>
    </group>
  );
}
