"use client";

import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { scenes, SCROLL_PAGES } from "@/config/scenes";

const navSections = [
  { label: "Skills", sceneIndex: 4 },
  { label: "Projects", sceneIndex: 5 },
  { label: "Contact", sceneIndex: 8 },
];

export default function TopBar() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const isLoaded = usePortfolioStore((s) => s.isLoaded);

  if (!isLoaded) return null;

  const visible = scrollProgress > 0.12;

  const scrollToScene = (sceneIndex: number) => {
    const scene = scenes[sceneIndex];
    if (!scene) return;
    const scrollTarget = scene.scrollStart * SCROLL_PAGES * window.innerHeight;
    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        pointerEvents: visible ? "auto" : "none",
        background: "linear-gradient(180deg, rgba(0,0,5,0.85) 0%, rgba(0,0,5,0) 100%)",
        backdropFilter: "blur(8px)",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "var(--font-geist-mono), monospace",
      }}
    >
      {/* Left: Name */}
      <button
        onClick={scrollToTop}
        style={{
          background: "none",
          border: "none",
          color: "#e8e8f0",
          fontSize: "14px",
          fontWeight: 700,
          fontFamily: "inherit",
          cursor: "pointer",
          padding: "4px 0",
          letterSpacing: "0.5px",
        }}
      >
        Mohamed Slim
      </button>

      {/* Right: Nav links + Resume */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {navSections.map((section) => (
          <button
            key={section.label}
            onClick={() => scrollToScene(section.sceneIndex)}
            style={{
              background: "none",
              border: "none",
              color: "#8888aa",
              fontSize: "12px",
              fontFamily: "inherit",
              cursor: "pointer",
              padding: "4px 0",
              transition: "color 0.2s",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8888aa")}
          >
            {section.label}
          </button>
        ))}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "11px",
            color: "#00d4ff",
            border: "1px solid #00d4ff44",
            padding: "5px 14px",
            borderRadius: "4px",
            textDecoration: "none",
            fontFamily: "inherit",
            letterSpacing: "1px",
            textTransform: "uppercase",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#00d4ff22";
            e.currentTarget.style.borderColor = "#00d4ff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "#00d4ff44";
          }}
        >
          Resume
        </a>
      </div>
    </div>
  );
}
