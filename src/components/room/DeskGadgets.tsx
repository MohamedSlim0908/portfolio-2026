"use client";

export default function DeskGadgets() {
  return (
    <group>
      {/* Phone */}
      <group position={[-0.7, 0.82, -0.5]}>
        <mesh>
          <boxGeometry args={[0.06, 0.008, 0.12]} />
          <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Phone screen */}
        <mesh position={[0, 0.005, 0]}>
          <planeGeometry args={[0.05, 0.1]} />
          <meshBasicMaterial color="#0a0a2a" />
        </mesh>
      </group>

      {/* Headphones */}
      <group position={[-0.85, 0.82, -1.1]} rotation={[0, 0.5, 0]}>
        {/* Band */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.07, 0.008, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Left cup */}
        <mesh position={[0, -0.07, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.02, 12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
        {/* Right cup */}
        <mesh position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.02, 12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
      </group>

      {/* Small figurine / collectible */}
      <group position={[0.9, 0.82, -1.2]}>
        <mesh position={[0, 0.025, 0]}>
          <cylinderGeometry args={[0.02, 0.025, 0.05, 8]} />
          <meshStandardMaterial
            color="#6644ff"
            emissive="#6644ff"
            emissiveIntensity={0.3}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshStandardMaterial
            color="#6644ff"
            emissive="#6644ff"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Sticky notes on wall */}
      {[
        { pos: [-0.5, 2.1, -1.95] as [number, number, number], color: "#ff6b9d" },
        { pos: [-0.35, 2.2, -1.95] as [number, number, number], color: "#c084fc" },
        { pos: [-0.2, 2.05, -1.95] as [number, number, number], color: "#67e8f9" },
      ].map((note, i) => (
        <mesh
          key={i}
          position={note.pos}
          rotation={[0, 0, (Math.random() - 0.5) * 0.2]}
        >
          <planeGeometry args={[0.08, 0.08]} />
          <meshStandardMaterial
            color={note.color}
            roughness={0.9}
            side={2}
          />
        </mesh>
      ))}
    </group>
  );
}
