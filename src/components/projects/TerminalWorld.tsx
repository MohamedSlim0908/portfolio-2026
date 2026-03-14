"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GridFloor from "../digital/GridFloor";
import DataParticles from "../digital/DataParticles";
import ProjectCard3D from "./ProjectCard3D";
import { projects } from "@/config/projects";

// Matrix-style falling code columns
function CodeRain() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 80;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const offsets = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) arr[i] = Math.random() * 10;
    return arr;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const x = ((i % 20) - 10) * 0.8;
      const z = (Math.floor(i / 20) - 2) * 2 - 3;
      const y = ((time * 2 + offsets[i]) % 6) - 1;
      dummy.position.set(x, y, z);
      dummy.scale.set(0.02, 0.15 + Math.random() * 0.1, 0.02);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#39ff14" transparent opacity={0.5} />
    </instancedMesh>
  );
}

export default function TerminalWorld() {
  return (
    <group position={[0, 0, -20]}>
      <GridFloor color="#39ff14" position={[0, -1, 0]} size={40} />

      {/* Terminal central display */}
      <mesh position={[0, 2, -3]}>
        <planeGeometry args={[4, 2.5]} />
        <meshBasicMaterial color="#0a1a0a" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 2, -2.99]}>
        <planeGeometry args={[4.05, 2.55]} />
        <meshBasicMaterial color="#39ff14" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Project card */}
      <ProjectCard3D
        project={projects[0]}
        position={[0, 2.2, -1]}
        visibleInScenes={[5]}
      />

      <CodeRain />

      <DataParticles
        count={80}
        color="#39ff14"
        spread={12}
        position={[0, 0, 0]}
      />

      <ambientLight intensity={0.03} color="#0a200a" />
      <pointLight position={[0, 3, -2]} color="#39ff14" intensity={1} distance={10} />
    </group>
  );
}
