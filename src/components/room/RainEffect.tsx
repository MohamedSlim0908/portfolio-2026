"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import rainVert from "@/shaders/rain.vert";
import rainFrag from "@/shaders/rain.frag";

const RAIN_COUNT = 400;

export default function RainEffect() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(RAIN_COUNT * 3);
    const offsets = new Float32Array(RAIN_COUNT);
    const scales = new Float32Array(RAIN_COUNT);

    for (let i = 0; i < RAIN_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = Math.random() * 8 - 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      offsets[i] = Math.random();
      scales[i] = 0.5 + Math.random() * 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 1));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    return geo;
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points geometry={geometry} position={[-3, 2, -1.5]} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={rainVert}
        fragmentShader={rainFrag}
        uniforms={{
          uTime: { value: 0 },
          uSpeed: { value: 3.0 },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
