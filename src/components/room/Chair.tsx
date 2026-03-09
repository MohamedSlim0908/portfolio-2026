"use client";

export default function Chair() {
  return (
    <group position={[0, 0.55, -0.25]}>
      {/* Seat */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.5]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 0.35, 0.22]}>
        <boxGeometry args={[0.48, 0.6, 0.05]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} />
      </mesh>

      {/* Armrests */}
      <mesh position={[-0.24, 0.15, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.35]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} />
      </mesh>
      <mesh position={[0.24, 0.15, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.35]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} />
      </mesh>

      {/* Armrest supports */}
      <mesh position={[-0.24, 0.07, 0.1]}>
        <boxGeometry args={[0.04, 0.12, 0.04]} />
        <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.24, 0.07, 0.1]}>
        <boxGeometry args={[0.04, 0.12, 0.04]} />
        <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Center pole */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Base star (5 legs) */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.sin(angle) * 0.25,
              -0.5,
              Math.cos(angle) * 0.25,
            ]}
            rotation={[0, angle, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.015, 0.015, 0.25, 6]} />
            <meshStandardMaterial
              color="#333333"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        );
      })}

      {/* Wheels */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={`wheel-${i}`}
            position={[
              Math.sin(angle) * 0.32,
              -0.53,
              Math.cos(angle) * 0.32,
            ]}
          >
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color="#222222" roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}
