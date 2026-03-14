"use client";

import { usePortfolioStore } from "@/stores/usePortfolioStore";

export default function ResumeButton() {
  const isLoaded = usePortfolioStore((s) => s.isLoaded);
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);

  if (!isLoaded) return null;

  // Show after scrolling past the room, hide when top bar is visible (top bar has its own resume link)
  const visible = scrollProgress > 0.15 && scrollProgress < 0.85;

  return (
    <a
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50"
      style={{
        bottom: "24px",
        right: "24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        pointerEvents: visible ? "auto" : "none",
        fontSize: "11px",
        color: "#00d4ff",
        border: "1px solid #00d4ff33",
        padding: "8px 16px",
        borderRadius: "6px",
        textDecoration: "none",
        fontFamily: "var(--font-geist-mono), monospace",
        letterSpacing: "1px",
        textTransform: "uppercase",
        background: "rgba(0, 0, 5, 0.8)",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#00d4ff22";
        e.currentTarget.style.borderColor = "#00d4ff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(0, 0, 5, 0.8)";
        e.currentTarget.style.borderColor = "#00d4ff33";
      }}
    >
      Download Resume
    </a>
  );
}
