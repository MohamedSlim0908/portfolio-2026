"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import CameraRig from "./CameraRig";
import SceneManager from "./scenes/SceneManager";
import PostProcessing from "./PostProcessing";
import ScrollRig from "./ScrollRig";
import LoadingScreen from "./LoadingScreen";
import ScrollIndicator from "./ui/ScrollIndicator";
import NavigationDots from "./ui/NavigationDots";
import { useMobileDetect } from "@/hooks/useMobileDetect";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

export default function Experience() {
  useMobileDetect();

  useEffect(() => {
    const timer = setTimeout(() => {
      usePortfolioStore.getState().setIsLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Fixed 3D Canvas */}
      <div className="fixed inset-0" style={{ zIndex: 2, pointerEvents: "none" }}>
        <Canvas
          camera={{ position: [5, 3, 5], fov: 50, near: 0.1, far: 200 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.5]}
          style={{ background: "#000005", pointerEvents: "none" }}
        >
          <fog attach="fog" args={["#0a0818", 15, 80]} />
          <color attach="background" args={["#000005"]} />
          <Suspense fallback={null}>
            <CameraRig />
            <SceneManager />
            <PostProcessing />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* Scroll track - this is what the user actually scrolls */}
      <ScrollRig />

      {/* UI Overlays */}
      <LoadingScreen />
      <ScrollIndicator />
      <NavigationDots />
    </>
  );
}
