"use client";

import * as THREE from "three";
import GridFloor from "../digital/GridFloor";
import DataParticles from "../digital/DataParticles";
import TerminalUI from "../terminal/TerminalUI";

export default function TerminalScene() {
  return (
    <group>
      <GridFloor color="#003344" position={[0, -1, 0]} size={40} />

      {/* Terminal screen */}
      <group position={[0, 1.5, -3]}>
        {/* Background panel */}
        <mesh>
          <planeGeometry args={[5, 3]} />
          <meshBasicMaterial
            color="#050510"
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Border glow */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[5.1, 3.1]} />
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* CRT scanline overlay */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[5, 3]} />
          <meshBasicMaterial
            color="#000000"
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>

        <TerminalUI />
      </group>

      {/* Subtle ambient rain callback */}
      <DataParticles
        count={60}
        color="#00d4ff"
        spread={15}
        position={[0, 2, 0]}
      />

      <ambientLight intensity={0.02} color="#001020" />
      <pointLight position={[0, 3, -2]} color="#00d4ff" intensity={0.8} distance={10} />
    </group>
  );
}
