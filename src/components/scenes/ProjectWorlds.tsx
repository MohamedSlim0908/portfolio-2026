"use client";

import TerminalWorld from "../projects/TerminalWorld";
import DashboardWorld from "../projects/DashboardWorld";
import AILabWorld from "../projects/AILabWorld";
import NeonTunnel from "../digital/NeonTunnel";

export default function ProjectWorlds() {
  return (
    <group>
      {/* Tunnel from digital workspace to terminal world */}
      <NeonTunnel position={[0, 1, -15]} length={6} color="#39ff14" />

      <TerminalWorld />

      {/* Tunnel from terminal to dashboard */}
      <NeonTunnel position={[0, 1, -28]} length={6} color="#00d4ff" />

      <DashboardWorld />

      {/* Tunnel from dashboard to AI lab */}
      <NeonTunnel position={[0, 1, -43]} length={6} color="#ff006e" />

      <AILabWorld />
    </group>
  );
}
