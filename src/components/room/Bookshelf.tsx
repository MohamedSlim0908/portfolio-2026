"use client";

import { useMemo } from "react";

interface BookProps {
  position: [number, number, number];
  width: number;
  height: number;
  color: string;
}

function Book({ position, width, height, color }: BookProps) {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, height, 0.12]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

export default function Bookshelf() {
  const books = useMemo(() => {
    const colors = [
      "#ff3366", "#44aaff", "#ff9922", "#66ff44",
      "#ff44cc", "#ffdd33", "#33ddff", "#ff5544",
      "#aa55ff", "#44ffaa", "#ff7744", "#5599ff",
      "#ee4488", "#33ffcc", "#ff6633", "#7766ff",
    ];

    const shelves: BookProps[][] = [];

    for (let shelf = 0; shelf < 4; shelf++) {
      const row: BookProps[] = [];
      let x = -0.4;
      const bookCount = 4 + Math.floor(Math.random() * 2);

      for (let i = 0; i < bookCount; i++) {
        const w = 0.06 + Math.random() * 0.06;
        const h = 0.14 + Math.random() * 0.08;
        const y = shelf * 0.32 + h / 2;
        row.push({
          position: [x + w / 2, y, 0],
          width: w,
          height: h,
          color: colors[(shelf * 5 + i) % colors.length],
        });
        x += w + 0.01;
      }
      shelves.push(row);
    }

    return shelves;
  }, []);

  return (
    <group position={[0.8, 0.01, -1.9]}>
      {/* Shelf frame - back panel */}
      <mesh position={[0, 0.65, -0.08]}>
        <boxGeometry args={[1.1, 1.35, 0.03]} />
        <meshStandardMaterial color="#15101e" roughness={0.7} />
      </mesh>

      {/* Shelf frame - sides */}
      <mesh position={[-0.53, 0.65, 0]}>
        <boxGeometry args={[0.03, 1.35, 0.18]} />
        <meshStandardMaterial color="#1a1228" roughness={0.7} />
      </mesh>
      <mesh position={[0.53, 0.65, 0]}>
        <boxGeometry args={[0.03, 1.35, 0.18]} />
        <meshStandardMaterial color="#1a1228" roughness={0.7} />
      </mesh>

      {/* Shelf boards */}
      {[0, 0.32, 0.64, 0.96, 1.3].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[1.06, 0.025, 0.17]} />
          <meshStandardMaterial color="#1e1530" roughness={0.7} />
        </mesh>
      ))}

      {/* Books on each shelf */}
      {books.map((shelf, si) =>
        shelf.map((book, bi) => (
          <Book key={`${si}-${bi}`} {...book} />
        ))
      )}
    </group>
  );
}
