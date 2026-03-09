"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Window() {
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
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      // Base glass tint
      vec3 glassColor = vec3(0.1, 0.15, 0.25);

      // Rain droplets running down
      vec2 uv = vUv;
      uv.y += uTime * 0.08;

      vec2 grid = floor(uv * vec2(20.0, 30.0));
      vec2 f = fract(uv * vec2(20.0, 30.0));

      float droplet = 0.0;
      float h = hash(grid);

      if (h > 0.7) {
        float speed = 0.3 + h * 0.5;
        vec2 center = vec2(0.5, fract(h * 13.0 - uTime * speed * 0.3));
        float d = length((f - center) * vec2(1.0, 2.0));
        droplet = smoothstep(0.15, 0.05, d);
      }

      // Slight refraction glow from city behind
      vec3 cityGlow = vec3(0.2, 0.15, 0.35) * (0.3 + 0.2 * sin(uTime * 0.2));

      vec3 color = mix(glassColor + cityGlow, vec3(0.5, 0.7, 1.0), droplet * 0.4);
      float alpha = 0.3 + droplet * 0.3;

      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group position={[-1.8, 1.8, -1.5]} rotation={[0, Math.PI / 2, 0]}>
      {/* Window frame */}
      <mesh>
        <boxGeometry args={[1.8, 1.5, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Glass panes */}
      <mesh position={[-0.01, 0, 0.03]}>
        <planeGeometry args={[1.6, 1.3]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
          }}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Window divider */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[0.02, 1.3, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[1.6, 0.02, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.5} />
      </mesh>
    </group>
  );
}
