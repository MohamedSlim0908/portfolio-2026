"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

const BUILDING_COUNT = 25;

export default function CitySkyline() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { matrices, colors } = useMemo(() => {
    const dummy = new THREE.Object3D();
    const mats: THREE.Matrix4[] = [];
    const cols: number[] = [];

    for (let i = 0; i < BUILDING_COUNT; i++) {
      const width = 0.15 + Math.random() * 0.3;
      const height = 0.3 + Math.random() * 2.0;
      const depth = 0.15 + Math.random() * 0.3;

      const x = (i - BUILDING_COUNT / 2) * 0.25 + (Math.random() - 0.5) * 0.15;
      const z = -0.5 - Math.random() * 3;

      dummy.position.set(x, height / 2 - 0.5, z);
      dummy.scale.set(width, height, depth);
      dummy.updateMatrix();
      mats.push(dummy.matrix.clone());
      cols.push(i / BUILDING_COUNT);
    }

    return { matrices: mats, colors: cols };
  }, []);

  // Set instance matrices once after mount
  useEffect(() => {
    if (!meshRef.current) return;
    matrices.forEach((mat, i) => {
      meshRef.current!.setMatrixAt(i, mat);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    // Hide city during and after portal transition
    if (groupRef.current) {
      const scene = usePortfolioStore.getState().currentScene;
      groupRef.current.visible = scene <= 2;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying float vBuildingId;

    void main() {
      vUv = uv;
      // Use instance index approximation via position
      vBuildingId = position.x * 7.0 + position.z * 13.0;
      gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vBuildingId;

    float hash(float n) {
      return fract(sin(n) * 43758.5453);
    }

    void main() {
      vec2 grid = floor(vUv * vec2(4.0, 8.0));
      float windowId = grid.x + grid.y * 4.0 + vBuildingId * 32.0;
      float lit = step(0.4, hash(windowId));
      float flicker = step(0.97, hash(windowId * 0.1 + uTime * 0.1));
      float brightness = lit * (1.0 - flicker) * 0.7;

      vec3 warmWindow = vec3(1.0, 0.8, 0.4);
      vec3 coolWindow = vec3(0.4, 0.6, 1.0);
      vec3 windowColor = mix(warmWindow, coolWindow, hash(windowId * 0.37));

      vec3 buildingColor = vec3(0.02, 0.02, 0.05);
      vec3 color = mix(buildingColor, windowColor, brightness);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <group ref={groupRef} position={[-3, 1.5, -5]}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, BUILDING_COUNT]}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
          }}
        />
      </instancedMesh>
    </group>
  );
}
