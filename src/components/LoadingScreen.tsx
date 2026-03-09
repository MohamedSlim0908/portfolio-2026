"use client";

import { useEffect, useState } from "react";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

export default function LoadingScreen() {
  const isLoaded = usePortfolioStore((s) => s.isLoaded);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoaded && progress >= 100) {
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, progress]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: "#000005",
        transition: "opacity 0.5s",
        opacity: isLoaded && progress >= 100 ? 0 : 1,
        pointerEvents: isLoaded && progress >= 100 ? "none" : "auto",
      }}
    >
      <div
        style={{
          fontFamily: "monospace",
          color: "#00d4ff",
          fontSize: "14px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: "24px",
        }}
      >
        Loading
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "200px",
          height: "2px",
          background: "#ffffff10",
          borderRadius: "1px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#00d4ff",
            transition: "width 0.1s",
            boxShadow: "0 0 10px #00d4ff",
          }}
        />
      </div>

      <div
        style={{
          fontFamily: "monospace",
          color: "#8888aa",
          fontSize: "11px",
          marginTop: "12px",
        }}
      >
        {progress}%
      </div>
    </div>
  );
}
