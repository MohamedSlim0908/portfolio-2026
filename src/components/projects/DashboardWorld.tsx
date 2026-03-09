"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GridFloor from "../digital/GridFloor";
import DataParticles from "../digital/DataParticles";
import ProjectCard3D from "./ProjectCard3D";
import { projects } from "@/config/projects";

function DashboardArc() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const panels = [
    { angle: -0.4, label: "Analytics" },
    { angle: -0.15, label: "Metrics" },
    { angle: 0.1, label: "Overview" },
    { angle: 0.35, label: "Reports" },
  ];

  return (
    <group ref={groupRef} position={[0, 2, -3]}>
      {panels.map((panel, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(panel.angle) * 4,
            (i - 1.5) * 0.3,
            Math.cos(panel.angle) * 4 - 4,
          ]}
          rotation={[0, -panel.angle, 0]}
        >
          <planeGeometry args={[1.8, 1.2]} />
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.08 + i * 0.03}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingDataPoints() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  const count = 30;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + t * 0.3;
      const radius = 2 + Math.sin(t + i) * 0.5;
      dummy.position.set(
        Math.sin(angle) * radius,
        1.5 + Math.sin(t * 0.5 + i * 0.5) * 0.8,
        Math.cos(angle) * radius - 3
      );
      const scale = 0.03 + Math.sin(t + i * 0.3) * 0.015;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
    </instancedMesh>
  );
}

export default function DashboardWorld() {
  return (
    <group position={[0, 0, -35]}>
      <GridFloor color="#0066aa" position={[0, -1, 0]} size={40} />

      <DashboardArc />
      <FloatingDataPoints />

      <ProjectCard3D
        project={projects[1]}
        position={[0, 2.2, -1]}
      />

      <DataParticles
        count={80}
        color="#00d4ff"
        spread={12}
        position={[0, 0, 0]}
      />

      <ambientLight intensity={0.03} color="#001a30" />
      <pointLight position={[0, 3, -2]} color="#00d4ff" intensity={1} distance={10} />
    </group>
  );
}
