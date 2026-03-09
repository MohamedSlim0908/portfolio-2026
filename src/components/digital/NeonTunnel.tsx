"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NeonTunnelProps {
  position: [number, number, number];
  length?: number;
  color?: string;
}

export default function NeonTunnel({
  position,
  length = 5,
  color = "#00d4ff",
}: NeonTunnelProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
      // Ring pattern
      float rings = abs(sin(vUv.x * 30.0 - uTime * 3.0));
      rings = smoothstep(0.8, 1.0, rings);

      // Vertical scan lines
      float scan = abs(sin(vUv.y * 40.0 + uTime));
      scan = smoothstep(0.9, 1.0, scan) * 0.3;

      float alpha = (rings * 0.6 + scan) * 0.5;

      // Fade at edges
      float edgeFade = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
      alpha *= edgeFade;

      gl_FragColor = vec4(uColor, alpha);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[3, 3, length, 24, 1, true]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(color) },
        }}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
