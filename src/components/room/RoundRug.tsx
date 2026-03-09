"use client";

export default function RoundRug() {
  return (
    <mesh position={[0.6, 0.005, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.7, 32]} />
      <meshStandardMaterial color="#2a1e3a" roughness={0.95} />
    </mesh>
  );
}
