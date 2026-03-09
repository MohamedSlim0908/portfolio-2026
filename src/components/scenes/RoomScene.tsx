"use client";

import Desk from "../room/Desk";
import Monitor from "../room/Monitor";
import Keyboard from "../room/Keyboard";
import CoffeeMug from "../room/CoffeeMug";
import Chair from "../room/Chair";
import Plant from "../room/Plant";
import DeveloperFigure from "../room/DeveloperFigure";
import DeskGadgets from "../room/DeskGadgets";
import Window from "../room/Window";
import RainEffect from "../room/RainEffect";
import CitySkyline from "../room/CitySkyline";
import RoomLighting from "../room/RoomLighting";

export default function RoomScene() {
  return (
    <group>
      <RoomLighting />

      {/* Room structure */}
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#241838" roughness={0.8} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 1.5, -2]}>
        <planeGeometry args={[6, 3]} />
        <meshStandardMaterial color="#2a1a40" roughness={0.8} />
      </mesh>

      {/* Left wall */}
      <mesh
        position={[-2, 1.5, -0.5]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#261838" roughness={0.8} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#1a1028" roughness={0.85} />
      </mesh>

      {/* Furniture */}
      <Desk />
      <Monitor />
      <Keyboard />
      <CoffeeMug />
      <Chair />
      <DeveloperFigure />
      <DeskGadgets />

      {/* Plants */}
      <Plant position={[-0.9, 0.78, -1.35]} scale={1.2} />
      <Plant position={[1.0, 0.78, -1.3]} scale={0.9} />
      <Plant position={[-1.5, 0, -1.5]} scale={2.0} />

      {/* Window + Outside */}
      <Window />
      <RainEffect />
      <CitySkyline />

    </group>
  );
}
