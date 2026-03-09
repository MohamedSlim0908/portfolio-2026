"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import portalVert from "@/shaders/portal.vert";
import portalFrag from "@/shaders/portal.frag";

export default function PortalTransition() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useFrame((state) => {
    const { portalProgress } = usePortfolioStore.getState();

    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = portalProgress;
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }

    if (meshRef.current) {
      meshRef.current.visible = portalProgress > 0.01 && portalProgress < 0.99;

      // Position the portal plane just in front of the camera
      if (portalProgress > 0.01) {
        const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        meshRef.current.position.copy(camera.position).add(dir.multiplyScalar(1.5));
        meshRef.current.quaternion.copy(camera.quaternion);

        // Scale based on progress
        const scale = 2 + portalProgress * 4;
        meshRef.current.scale.set(scale, scale, 1);
      }
    }
  });

  return (
    <mesh ref={meshRef} visible={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={portalVert}
        fragmentShader={portalFrag}
        uniforms={{
          uProgress: { value: 0 },
          uTime: { value: 0 },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
