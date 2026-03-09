"use client";

import { usePortfolioStore } from "@/stores/usePortfolioStore";

export function useSceneTransition() {
  const currentScene = usePortfolioStore((s) => s.currentScene);
  const sceneBlend = usePortfolioStore((s) => s.sceneBlend);
  return { currentScene, sceneBlend };
}
