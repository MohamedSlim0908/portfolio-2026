"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GridFloor from "../digital/GridFloor";
import DataParticles from "../digital/DataParticles";
import ProjectCard3D from "./ProjectCard3D";
import { projects } from "@/config/projects";

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  const { nodes, connections } = useMemo(() => {
    const n: [number, number, number][] = [];
    const c: [number, number][] = [];

    // Generate nodes in layers
    for (let layer = 0; layer < 4; layer++) {
      const nodesInLayer = layer === 0 || layer === 3 ? 4 : 6;
      for (let i = 0; i < nodesInLayer; i++) {
        const angle = (i / nodesInLayer) * Math.PI * 2;
        const radius = 0.8 + layer * 0.3;
        n.push([
          Math.sin(angle) * radius,
          Math.cos(angle) * radius,
          (layer - 1.5) * 0.8,
        ]);
      }
    }

    // Create connections between adjacent layers
    let offset = 0;
    const layerSizes = [4, 6, 6, 4];
    for (let l = 0; l < 3; l++) {
      const nextOffset = offset + layerSizes[l];
      for (let i = 0; i < layerSizes[l]; i++) {
        // Connect to 2-3 nodes in next layer
        for (let j = 0; j < Math.min(3, layerSizes[l + 1]); j++) {
          const target = nextOffset + ((i + j) % layerSizes[l + 1]);
          c.push([offset + i, target]);
        }
      }
      offset = nextOffset;
    }

    return { nodes: n, connections: c };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 2, -3]}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={`node-${i}`} position={pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial
            color="#ff006e"
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* Connections as lines */}
      {connections.map(([from, to], i) => {
        const start = new THREE.Vector3(...nodes[from]);
        const end = new THREE.Vector3(...nodes[to]);
        const mid = start.clone().lerp(end, 0.5);
        const dir = end.clone().sub(start);
        const len = dir.length();

        return (
          <mesh
            key={`conn-${i}`}
            position={[mid.x, mid.y, mid.z]}
            rotation={[
              Math.atan2(dir.y, Math.sqrt(dir.x * dir.x + dir.z * dir.z)),
              Math.atan2(dir.x, dir.z),
              0,
            ]}
          >
            <cylinderGeometry args={[0.005, 0.005, len, 4]} />
            <meshBasicMaterial
              color="#ff006e"
              transparent
              opacity={0.3}
            />
          </mesh>
        );
      })}

      {/* Outer wireframe sphere */}
      <mesh>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial
          color="#ff006e"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

export default function AILabWorld() {
  return (
    <group position={[0, 0, -50]}>
      <GridFloor color="#660033" position={[0, -1, 0]} size={40} />

      <NeuralNetwork />

      <ProjectCard3D
        project={projects[2]}
        position={[0, 2.2, -1]}
      />

      <DataParticles
        count={80}
        color="#ff006e"
        spread={12}
        position={[0, 0, 0]}
      />

      <ambientLight intensity={0.03} color="#200010" />
      <pointLight position={[0, 3, -2]} color="#ff006e" intensity={1} distance={10} />
    </group>
  );
}
