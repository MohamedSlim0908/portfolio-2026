"use client";

import { Html } from "@react-three/drei";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { remap } from "@/utils/math";

export default function TerminalUI() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const currentScene = usePortfolioStore((s) => s.currentScene);

  if (currentScene < 8) return null;

  // Text reveals as we scroll through the final scene (0.9 - 1.0)
  const typeProgress = remap(scrollProgress, 0.92, 0.98, 0, 1);

  const fullText = "Let's build something together.";
  const visibleChars = Math.floor(typeProgress * fullText.length);
  const displayText = fullText.slice(0, visibleChars);

  const showLinks = typeProgress > 0.9;

  return (
    <Html
      transform
      occlude={false}
      distanceFactor={6}
      position={[0, 0, 0.05]}
      style={{ pointerEvents: showLinks ? "auto" : "none" }}
    >
      <div
        style={{
          width: "500px",
          padding: "32px",
          fontFamily: "monospace",
          userSelect: "none",
        }}
      >
        {/* Terminal header */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#ff5f56",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#ffbd2e",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#27c93f",
              display: "inline-block",
            }}
          />
        </div>

        {/* Prompt */}
        <div style={{ color: "#39ff14", fontSize: "12px", marginBottom: "8px" }}>
          guest@portfolio:~$
        </div>

        {/* Main message */}
        <div
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#00d4ff",
            marginBottom: "24px",
            minHeight: "30px",
          }}
        >
          {displayText}
          <span
            style={{
              display: "inline-block",
              width: "12px",
              height: "22px",
              background: "#00d4ff",
              marginLeft: "2px",
              animation: "blink 1s step-end infinite",
            }}
          />
        </div>

        {/* Links */}
        {showLinks && (
          <div
            style={{
              display: "flex",
              gap: "16px",
              opacity: showLinks ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          >
            {[
              { label: "[ GitHub ]", href: "https://github.com/MohamedSlim0908" },
              { label: "[ LinkedIn ]", href: "https://linkedin.com/in/mohamed-slim-026023293" },
              { label: "[ Contact ]", href: "mailto:mohamed.slim.2@ulaval.ca" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  color: "#00d4ff",
                  textDecoration: "none",
                  fontSize: "14px",
                  padding: "8px 16px",
                  border: "1px solid #00d4ff33",
                  borderRadius: "4px",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = "#00d4ff22";
                  (e.target as HTMLElement).style.borderColor = "#00d4ff";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = "transparent";
                  (e.target as HTMLElement).style.borderColor = "#00d4ff33";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <style>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
      </div>
    </Html>
  );
}
