"use client";

import { usePortfolioStore } from "@/stores/usePortfolioStore";

export default function ScrollIndicator() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const isLoaded = usePortfolioStore((s) => s.isLoaded);

  if (!isLoaded || scrollProgress > 0.05) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 animate-pulse">
      <span
        className="text-xs tracking-[0.2em] uppercase"
        style={{ color: "#8888aa", fontFamily: "monospace" }}
      >
        Scroll to explore
      </span>
      <div className="w-5 h-8 border border-[#8888aa44] rounded-full flex justify-center pt-1">
        <div
          className="w-1 h-2 rounded-full"
          style={{
            background: "#00d4ff",
            animation: "scrollBounce 2s ease-in-out infinite",
          }}
        />
      </div>
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
