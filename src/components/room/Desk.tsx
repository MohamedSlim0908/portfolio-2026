"use client";

export default function Desk() {
  return (
    <group position={[0, 0.75, -1]}>
      {/* Desktop surface */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.2, 0.08, 1]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Legs */}
      {[
        [-1.0, -0.38, -0.4],
        [1.0, -0.38, -0.4],
        [-1.0, -0.38, 0.4],
        [1.0, -0.38, 0.4],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.06, 0.72, 0.06]} />
          <meshStandardMaterial color="#1e1208" roughness={0.7} />
        </mesh>
      ))}

      {/* Shelf under desk */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[1.8, 0.04, 0.8]} />
        <meshStandardMaterial color="#231510" roughness={0.7} />
      </mesh>
    </group>
  );
}
