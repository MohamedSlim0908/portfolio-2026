"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

function SpeechBubble() {
  // Create a rounded elliptical speech bubble shape with curved tail
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();

    // Elliptical bubble body
    const w = 0.55;
    const h = 0.28;
    const r = 0.12; // corner radius

    shape.moveTo(-w + r, -h);
    shape.lineTo(w - r, -h);
    shape.quadraticCurveTo(w, -h, w, -h + r);
    shape.lineTo(w, h - r);
    shape.quadraticCurveTo(w, h, w - r, h);
    shape.lineTo(-w + r, h);
    shape.quadraticCurveTo(-w, h, -w, h - r);
    shape.lineTo(-w, -h + r);
    shape.quadraticCurveTo(-w, -h, -w + r, -h);

    // Tail - curved pointer going down-left
    const tailShape = new THREE.Shape();
    tailShape.moveTo(-0.18, -h);
    tailShape.lineTo(-0.3, -h - 0.18);
    tailShape.quadraticCurveTo(-0.25, -h - 0.06, -0.08, -h);

    const geo = new THREE.ShapeGeometry(shape);
    const tailGeo = new THREE.ShapeGeometry(tailShape);

    const merged = new THREE.BufferGeometry();
    // Merge both geometries
    const positions1 = geo.attributes.position.array;
    const positions2 = tailGeo.attributes.position.array;
    const allPositions = new Float32Array(positions1.length + positions2.length);
    allPositions.set(positions1, 0);
    allPositions.set(positions2, positions1.length);

    const indices1 = Array.from(geo.index!.array);
    const indices2 = Array.from(tailGeo.index!.array);
    const offset = positions1.length / 3;
    const allIndices = [...indices1, ...indices2.map(i => i + offset)];

    merged.setAttribute("position", new THREE.BufferAttribute(allPositions, 3));
    merged.setIndex(allIndices);
    merged.computeVertexNormals();

    geo.dispose();
    tailGeo.dispose();

    return merged;
  }, []);

  // Border geometry (slightly larger)
  const borderGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 0.58;
    const h = 0.31;
    const r = 0.13;

    shape.moveTo(-w + r, -h);
    shape.lineTo(w - r, -h);
    shape.quadraticCurveTo(w, -h, w, -h + r);
    shape.lineTo(w, h - r);
    shape.quadraticCurveTo(w, h, w - r, h);
    shape.lineTo(-w + r, h);
    shape.quadraticCurveTo(-w, h, -w, h - r);
    shape.lineTo(-w, -h + r);
    shape.quadraticCurveTo(-w, -h, -w + r, -h);

    const tailShape = new THREE.Shape();
    tailShape.moveTo(-0.2, -h);
    tailShape.lineTo(-0.33, -h - 0.2);
    tailShape.quadraticCurveTo(-0.27, -h - 0.07, -0.06, -h);

    const geo = new THREE.ShapeGeometry(shape);
    const tailGeo = new THREE.ShapeGeometry(tailShape);

    const positions1 = geo.attributes.position.array;
    const positions2 = tailGeo.attributes.position.array;
    const allPositions = new Float32Array(positions1.length + positions2.length);
    allPositions.set(positions1, 0);
    allPositions.set(positions2, positions1.length);

    const indices1 = Array.from(geo.index!.array);
    const indices2 = Array.from(tailGeo.index!.array);
    const offset = positions1.length / 3;
    const allIndices = [...indices1, ...indices2.map(i => i + offset)];

    const merged = new THREE.BufferGeometry();
    merged.setAttribute("position", new THREE.BufferAttribute(allPositions, 3));
    merged.setIndex(allIndices);
    merged.computeVertexNormals();

    geo.dispose();
    tailGeo.dispose();

    return merged;
  }, []);

  return (
    <group position={[0.7, 1.4, 0.1]}>
      {/* Border / outline glow */}
      <mesh geometry={borderGeometry} position={[0, 0, -0.002]}>
        <meshBasicMaterial
          color="#6644ff"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main bubble fill */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#0e0a22"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* HTML content */}
      <Html
        transform
        distanceFactor={2.2}
        position={[0, 0.02, 0.01]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            width: "170px",
            textAlign: "center",
            fontFamily: "monospace",
            userSelect: "none",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              color: "#00d4ff",
              marginBottom: "3px",
            }}
          >
            Hi! I&apos;m Mohamed Slim
          </div>
          <div
            style={{
              fontSize: "9px",
              color: "#bb99ff",
              marginBottom: "2px",
            }}
          >
            CS Student &amp; Full-Stack Developer
          </div>
          <div
            style={{
              fontSize: "8px",
              color: "#7766aa",
            }}
          >
            Universit&eacute; Laval, Qu&eacute;bec
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function DeveloperFigure() {
  const leftHandRef = useRef<THREE.Mesh>(null);
  const rightHandRef = useRef<THREE.Mesh>(null);
  const currentScene = usePortfolioStore((s) => s.currentScene);

  // Subtle typing bounce on hands only
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (leftHandRef.current) {
      leftHandRef.current.position.y = 0.19 + (Math.sin(t * 7) > 0.9 ? 0.008 : 0);
    }
    if (rightHandRef.current) {
      rightHandRef.current.position.y = 0.19 + (Math.sin(t * 7 + 2) > 0.9 ? 0.008 : 0);
    }
  });

  const showBubble = currentScene <= 2;

  // Developer group at [0, 0.58, -0.25], scale 1.15
  // Keyboard at world [0, 0.8, -0.7]
  // In local coords: keyboard is at [0, 0.19, -0.39]
  return (
    <group position={[0, 0.58, -0.25]} scale={1.15}>
      {/* === LOWER BODY (on chair seat) === */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.32, 0.1, 0.28]} />
        <meshStandardMaterial color="#1a1040" roughness={0.8} />
      </mesh>

      {/* Thighs */}
      <mesh position={[-0.09, 0.0, -0.18]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.13, 0.1, 0.25]} />
        <meshStandardMaterial color="#1a1040" roughness={0.8} />
      </mesh>
      <mesh position={[0.09, 0.0, -0.18]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.13, 0.1, 0.25]} />
        <meshStandardMaterial color="#1a1040" roughness={0.8} />
      </mesh>

      {/* Lower legs */}
      <mesh position={[-0.09, -0.22, -0.3]}>
        <boxGeometry args={[0.11, 0.35, 0.11]} />
        <meshStandardMaterial color="#1a1040" roughness={0.8} />
      </mesh>
      <mesh position={[0.09, -0.22, -0.3]}>
        <boxGeometry args={[0.11, 0.35, 0.11]} />
        <meshStandardMaterial color="#1a1040" roughness={0.8} />
      </mesh>

      {/* Shoes */}
      <mesh position={[-0.09, -0.4, -0.34]}>
        <boxGeometry args={[0.12, 0.06, 0.16]} />
        <meshStandardMaterial color="#111118" roughness={0.6} />
      </mesh>
      <mesh position={[0.09, -0.4, -0.34]}>
        <boxGeometry args={[0.12, 0.06, 0.16]} />
        <meshStandardMaterial color="#111118" roughness={0.6} />
      </mesh>

      {/* === TORSO === */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.38, 0.42, 0.24]} />
        <meshStandardMaterial color="#2d1b69" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.18, 0.121]}>
        <boxGeometry args={[0.2, 0.08, 0.005]} />
        <meshStandardMaterial color="#241558" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.54, 0]}>
        <boxGeometry args={[0.3, 0.06, 0.2]} />
        <meshStandardMaterial color="#241558" roughness={0.8} />
      </mesh>

      {/* === NECK === */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.08, 8]} />
        <meshStandardMaterial color="#e8b090" roughness={0.7} />
      </mesh>

      {/* === HEAD === */}
      <mesh position={[0, 0.73, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#e8b090" roughness={0.7} />
      </mesh>

      {/* Ears */}
      <mesh position={[-0.12, 0.72, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#d4a080" roughness={0.7} />
      </mesh>
      <mesh position={[0.12, 0.72, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#d4a080" roughness={0.7} />
      </mesh>

      {/* === HAIR === */}
      <mesh position={[0, 0.78, 0.01]} scale={[1.08, 0.85, 1.1]}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color="#1a1030" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.85, 0]} scale={[1, 0.5, 0.9]}>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial color="#1e1438" roughness={0.65} />
      </mesh>
      <mesh position={[-0.1, 0.74, 0.03]} scale={[0.6, 0.9, 0.8]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#1a1030" roughness={0.7} />
      </mesh>
      <mesh position={[0.1, 0.74, 0.03]} scale={[0.6, 0.9, 0.8]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#1a1030" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.7, 0.06]} scale={[0.9, 0.6, 0.7]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#160e28" roughness={0.7} />
      </mesh>

      {/* Face glow toward monitor */}
      <pointLight position={[0, 0.74, -0.15]} color="#00bbff" intensity={0.08} distance={0.3} />

      {/* === ARMS — fixed pose, hands on keyboard === */}
      {/* Left arm: shoulder at [-0.22, 0.38] → hand at [-0.08, 0.19, -0.39] */}

      {/* Left shoulder */}
      <mesh position={[-0.22, 0.4, 0]}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshStandardMaterial color="#2d1b69" roughness={0.8} />
      </mesh>
      {/* Left upper arm (angled down-forward) */}
      <mesh position={[-0.2, 0.32, -0.12]} rotation={[-0.7, 0, 0.1]}>
        <boxGeometry args={[0.1, 0.22, 0.1]} />
        <meshStandardMaterial color="#2d1b69" roughness={0.8} />
      </mesh>
      {/* Left elbow */}
      <mesh position={[-0.18, 0.23, -0.24]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#2d1b69" roughness={0.8} />
      </mesh>
      {/* Left forearm (angled forward-down to keyboard) */}
      <mesh position={[-0.14, 0.21, -0.32]} rotation={[-0.15, 0, -0.15]}>
        <boxGeometry args={[0.09, 0.08, 0.18]} />
        <meshStandardMaterial color="#2d1b69" roughness={0.8} />
      </mesh>
      {/* Left hand on keyboard */}
      <mesh ref={leftHandRef} position={[-0.1, 0.19, -0.39]}>
        <boxGeometry args={[0.06, 0.025, 0.05]} />
        <meshStandardMaterial color="#e8b090" roughness={0.7} />
      </mesh>

      {/* Right shoulder */}
      <mesh position={[0.22, 0.4, 0]}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshStandardMaterial color="#2d1b69" roughness={0.8} />
      </mesh>
      {/* Right upper arm */}
      <mesh position={[0.2, 0.32, -0.12]} rotation={[-0.7, 0, -0.1]}>
        <boxGeometry args={[0.1, 0.22, 0.1]} />
        <meshStandardMaterial color="#2d1b69" roughness={0.8} />
      </mesh>
      {/* Right elbow */}
      <mesh position={[0.18, 0.23, -0.24]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#2d1b69" roughness={0.8} />
      </mesh>
      {/* Right forearm */}
      <mesh position={[0.14, 0.21, -0.32]} rotation={[-0.15, 0, 0.15]}>
        <boxGeometry args={[0.09, 0.08, 0.18]} />
        <meshStandardMaterial color="#2d1b69" roughness={0.8} />
      </mesh>
      {/* Right hand on keyboard */}
      <mesh ref={rightHandRef} position={[0.1, 0.19, -0.39]}>
        <boxGeometry args={[0.06, 0.025, 0.05]} />
        <meshStandardMaterial color="#e8b090" roughness={0.7} />
      </mesh>

      {/* === SPEECH BUBBLE === */}
      {showBubble && <SpeechBubble />}
    </group>
  );
}
