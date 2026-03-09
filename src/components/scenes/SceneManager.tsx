"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import RoomScene from "./RoomScene";
import PortalTransition from "./PortalTransition";
import DigitalWorkspace from "./DigitalWorkspace";
import ProjectWorlds from "./ProjectWorlds";
import TerminalScene from "./TerminalScene";

export default function SceneManager() {
  const roomRef = useRef<THREE.Group>(null);
  const digitalRef = useRef<THREE.Group>(null);
  const projectsRef = useRef<THREE.Group>(null);
  const terminalRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const scene = usePortfolioStore.getState().currentScene;

    if (roomRef.current) roomRef.current.visible = scene <= 3;
    if (digitalRef.current) digitalRef.current.visible = scene >= 4 && scene <= 5;
    if (projectsRef.current) projectsRef.current.visible = scene >= 5 && scene <= 8;
    if (terminalRef.current) terminalRef.current.visible = scene >= 8;
  });

  return (
    <>
      {/* Room at origin */}
      <group ref={roomRef}>
        <RoomScene />
        <PortalTransition />
      </group>

      {/* Digital workspace - hidden initially */}
      <group ref={digitalRef} position={[0, 0, -5]} visible={false}>
        <DigitalWorkspace />
      </group>

      {/* Project worlds along Z - hidden initially */}
      <group ref={projectsRef} visible={false}>
        <ProjectWorlds />
      </group>

      {/* Final terminal - hidden initially */}
      <group ref={terminalRef} position={[0, 0, -65]} visible={false}>
        <TerminalScene />
      </group>
    </>
  );
}
