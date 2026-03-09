"use client";

import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { scenes } from "@/config/scenes";

export default function NavigationDots() {
  const currentScene = usePortfolioStore((s) => s.currentScene);
  const isLoaded = usePortfolioStore((s) => s.isLoaded);

  if (!isLoaded) return null;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      {scenes.map((scene, i) => (
        <div
          key={scene.id}
          className="group relative flex items-center justify-end"
        >
          {/* Label on hover */}
          <span
            className="absolute right-5 text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            style={{
              color: "#8888aa",
              fontFamily: "monospace",
            }}
          >
            {scene.name}
          </span>

          {/* Dot */}
          <div
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background:
                i === currentScene ? "#00d4ff" : "#8888aa33",
              boxShadow:
                i === currentScene
                  ? "0 0 8px #00d4ff, 0 0 16px #00d4ff44"
                  : "none",
              transform: i === currentScene ? "scale(1.3)" : "scale(1)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
