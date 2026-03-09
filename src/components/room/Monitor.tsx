"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createCodeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d")!;

  // Background
  ctx.fillStyle = "#0a0a1a";
  ctx.fillRect(0, 0, 512, 320);

  const lines = [
    { text: "import React from 'react';", color: "#c792ea" },
    { text: "import * as THREE from 'three';", color: "#c792ea" },
    { text: "", color: "" },
    { text: "const Portfolio = () => {", color: "#82aaff" },
    { text: "  const [loaded, setLoaded] = useState(false);", color: "#f78c6c" },
    { text: "  const canvasRef = useRef<HTMLCanvasElement>(null);", color: "#f78c6c" },
    { text: "", color: "" },
    { text: "  useEffect(() => {", color: "#82aaff" },
    { text: "    const scene = new THREE.Scene();", color: "#c3e88d" },
    { text: "    const camera = new THREE.PerspectiveCamera(", color: "#c3e88d" },
    { text: "      75, window.innerWidth / window.innerHeight", color: "#f78c6c" },
    { text: "    );", color: "#c3e88d" },
    { text: "    // Build something amazing...", color: "#546e7a" },
    { text: "    setLoaded(true);", color: "#f78c6c" },
    { text: "  }, []);", color: "#82aaff" },
    { text: "", color: "" },
    { text: "  return <canvas ref={canvasRef} />;", color: "#89ddff" },
    { text: "};", color: "#82aaff" },
  ];

  ctx.font = "13px monospace";
  lines.forEach((line, i) => {
    if (line.text) {
      ctx.fillStyle = line.color;
      ctx.fillText(line.text, 12, 22 + i * 17);
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function Monitor() {
  const screenRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    return createCodeTexture();
  }, []);

  useFrame((state) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshBasicMaterial;
      // Subtle pulse
      mat.opacity = 0.95 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group position={[0, 1.6, -1.45]}>
      {/* Monitor frame */}
      <mesh>
        <boxGeometry args={[1.3, 0.8, 0.05]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.026]}>
        <planeGeometry args={[1.2, 0.7]} />
        {texture ? (
          <meshBasicMaterial
            map={texture}
            toneMapped={false}
          />
        ) : (
          <meshBasicMaterial color="#6644ff" />
        )}
      </mesh>

      {/* Monitor stand */}
      <mesh position={[0, -0.5, 0.1]}>
        <boxGeometry args={[0.08, 0.2, 0.08]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Stand base */}
      <mesh position={[0, -0.6, 0.15]}>
        <boxGeometry args={[0.4, 0.02, 0.25]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}
