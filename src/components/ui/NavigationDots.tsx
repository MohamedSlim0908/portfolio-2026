"use client";

import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { scenes, SCROLL_PAGES } from "@/config/scenes";

// Group scenes into logical sections for navigation
const navGroups = [
  { label: "Home", sceneIndices: [0, 1, 2, 3] },
  { label: "Skills", sceneIndices: [4] },
  { label: "Makteb", sceneIndices: [5] },
  { label: "UFood", sceneIndices: [6] },
  { label: "UTask", sceneIndices: [7] },
  { label: "Contact", sceneIndices: [8] },
];

export default function NavigationDots() {
  const currentScene = usePortfolioStore((s) => s.currentScene);
  const isLoaded = usePortfolioStore((s) => s.isLoaded);

  if (!isLoaded) return null;

  const scrollToScene = (sceneIndex: number) => {
    const scene = scenes[sceneIndex];
    if (!scene) return;
    const scrollTarget = scene.scrollStart * SCROLL_PAGES * window.innerHeight;
    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {navGroups.map((group) => {
        const isActive = group.sceneIndices.includes(currentScene);
        const targetScene = group.sceneIndices[0];

        return (
          <button
            key={group.label}
            onClick={() => scrollToScene(targetScene)}
            className="group relative flex items-center justify-end"
            style={{
              background: "none",
              border: "none",
              padding: "2px 0",
              cursor: "pointer",
            }}
          >
            {/* Label */}
            <span
              className="absolute right-6 text-[10px] tracking-wider uppercase whitespace-nowrap transition-opacity duration-200"
              style={{
                color: isActive ? "#00d4ff" : "#8888aa",
                fontFamily: "var(--font-geist-mono), monospace",
                opacity: isActive ? 1 : 0,
                pointerEvents: "none",
              }}
            >
              {group.label}
            </span>

            {/* Dot */}
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: isActive ? "12px" : "8px",
                height: isActive ? "12px" : "8px",
                background: isActive ? "#00d4ff" : "#8888aa33",
                boxShadow: isActive
                  ? "0 0 8px #00d4ff, 0 0 16px #00d4ff44"
                  : "none",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
