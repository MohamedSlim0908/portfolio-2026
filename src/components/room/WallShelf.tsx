"use client";

interface WallShelfProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

function SmallFigure({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <group position={position}>
      {/* Body */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[0.04, 0.08, 0.04]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
    </group>
  );
}

function SmallPlant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Tiny pot */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.025, 0.02, 0.04, 8]} />
        <meshStandardMaterial color="#4a3020" roughness={0.8} />
      </mesh>
      {/* Leaves */}
      {[0, 1.2, 2.4, 3.6, 5].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(angle) * 0.015,
            0.06 + i * 0.005,
            Math.cos(angle) * 0.015,
          ]}
          rotation={[Math.sin(angle) * 0.4, 0, Math.cos(angle) * 0.4]}
        >
          <coneGeometry args={[0.015, 0.04, 4]} />
          <meshStandardMaterial color="#2d6b2d" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function SmallFrame({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[0.1, 0.08, 0.01]} />
        <meshStandardMaterial color="#1a1225" roughness={0.6} />
      </mesh>
      {/* Picture */}
      <mesh position={[0, 0, 0.006]}>
        <planeGeometry args={[0.08, 0.06]} />
        <meshStandardMaterial color="#3a2855" roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function WallShelf({ position, rotation }: WallShelfProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Shelf board */}
      <mesh>
        <boxGeometry args={[0.6, 0.02, 0.12]} />
        <meshStandardMaterial color="#1e1530" roughness={0.7} />
      </mesh>

      {/* Bracket left */}
      <mesh position={[-0.25, -0.04, 0.05]}>
        <boxGeometry args={[0.02, 0.06, 0.02]} />
        <meshStandardMaterial color="#151020" roughness={0.7} />
      </mesh>

      {/* Bracket right */}
      <mesh position={[0.25, -0.04, 0.05]}>
        <boxGeometry args={[0.02, 0.06, 0.02]} />
        <meshStandardMaterial color="#151020" roughness={0.7} />
      </mesh>

      {/* Items on shelf */}
      <SmallFigure position={[-0.18, 0.01, 0]} color="#ff5577" />
      <SmallPlant position={[0.05, 0.01, 0]} />
      <SmallFrame position={[0.2, 0.05, -0.04]} />
    </group>
  );
}
