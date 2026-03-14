"use client";

import { usePortfolioStore } from "@/stores/usePortfolioStore";

export default function HeroOverlay() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const isLoaded = usePortfolioStore((s) => s.isLoaded);

  if (!isLoaded) return null;

  // Visible during opening scenes, fade out as we approach the portal
  const opacity = scrollProgress < 0.08
    ? 1
    : scrollProgress < 0.15
      ? 1 - (scrollProgress - 0.08) / 0.07
      : 0;

  if (opacity <= 0) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        bottom: "80px",
        left: "40px",
        opacity,
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          color: "#e8e8f0",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(24px, 4vw, 42px)",
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "-0.5px",
          }}
        >
          Mohamed Slim
        </h1>
        <p
          style={{
            fontSize: "clamp(13px, 1.8vw, 18px)",
            color: "#00d4ff",
            margin: "8px 0 4px",
            fontWeight: 500,
          }}
        >
          Full-Stack Developer
        </p>
        <p
          style={{
            fontSize: "clamp(11px, 1.4vw, 14px)",
            color: "#8888aa",
            margin: 0,
          }}
        >
          CS @ Universit&eacute; Laval &middot; Qu&eacute;bec City
        </p>

        {/* Open to Internships badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "14px",
            padding: "4px 12px",
            border: "1px solid #39ff1444",
            borderRadius: "20px",
            background: "#39ff1410",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#39ff14",
              display: "inline-block",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              color: "#39ff14",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            Open to Internships
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 4px #39ff14; }
          50% { opacity: 0.5; box-shadow: 0 0 8px #39ff14, 0 0 16px #39ff1444; }
        }
      `}</style>
    </div>
  );
}
