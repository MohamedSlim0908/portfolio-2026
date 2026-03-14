"use client";

import GridFloor from "../digital/GridFloor";
import FloatingPanel from "../digital/FloatingPanel";
import DataParticles from "../digital/DataParticles";
import HolographicText from "../digital/HolographicText";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

const skillCategories = [
  {
    label: "Languages",
    items: ["Python", "JavaScript", "C++", "HTML", "CSS"],
    color: "#00d4ff",
  },
  {
    label: "Frameworks",
    items: ["Vue.js", "React", "Node.js", "Express", "FastAPI", "Bootstrap", "RESTful APIs"],
    color: "#aa88ff",
  },
  {
    label: "Databases & Tools",
    items: ["PostgreSQL", "SQLite", "Docker", "Git", "Swagger/OpenAPI", "Jupyter", "Pandas", "scikit-learn"],
    color: "#00ffaa",
  },
  {
    label: "Concepts",
    items: ["OOP", "Algorithms", "Data Structures", "JWT Auth", "WebSockets", "Agile/Scrum"],
    color: "#ffaa44",
  },
];

const SkillsContent = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    {skillCategories.map((cat) => (
      <div key={cat.label}>
        <div
          style={{
            color: cat.color,
            fontSize: "13px",
            fontWeight: 700,
            marginBottom: "4px",
            letterSpacing: "0.5px",
          }}
        >
          {cat.label}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {cat.items.map((item) => (
            <span
              key={item}
              style={{
                color: "#d0d0e8",
                fontSize: "11px",
                background: `${cat.color}15`,
                border: `1px solid ${cat.color}30`,
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const AboutContent = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    <div style={{ color: "#e0e0f5", fontSize: "14px", lineHeight: "1.7" }}>
      Computer Science student at{" "}
      <span style={{ color: "#aa88ff", fontWeight: 700 }}>Universit&eacute; Laval</span>,
      Qu&eacute;bec. Building full-stack applications and exploring the intersection
      of design, code, and user experience.
    </div>
    <div style={{ color: "#b0b0d0", fontSize: "13px", lineHeight: "1.7" }}>
      Currently building{" "}
      <span style={{ color: "#39ff14", fontWeight: 700 }}>Makteb</span>
      <span
        style={{
          display: "inline-block",
          fontSize: "9px",
          fontWeight: 700,
          color: "#0a0a0a",
          background: "linear-gradient(90deg, #39ff14, #20cc10)",
          padding: "1px 7px",
          borderRadius: "3px",
          marginLeft: "6px",
          letterSpacing: "1px",
          verticalAlign: "middle",
          textTransform: "uppercase",
        }}
      >
        Startup in Dev
      </span>{" "}
      &mdash; a community-driven learning platform for Tunisia &amp; North Africa.
      Passionate about crafting impactful products from idea to deployment.
    </div>
    <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
      {[
        { label: "GitHub", href: "https://github.com/MohamedSlim0908" },
        { label: "LinkedIn", href: "https://linkedin.com/in/mohamed-slim-026023293" },
      ].map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "12px",
            color: "#00d4ff",
            border: "1px solid #00d4ff55",
            padding: "4px 14px",
            borderRadius: "5px",
            textDecoration: "none",
            pointerEvents: "auto",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {link.label} &rarr;
        </a>
      ))}
    </div>
  </div>
);

const ExperienceContent = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "3px",
        }}
      >
        <span style={{ color: "#ff88aa", fontSize: "14px", fontWeight: 700 }}>
          Web Developer Intern
        </span>
        <span style={{ color: "#8888aa", fontSize: "11px" }}>Summer 2023</span>
      </div>
      <div style={{ color: "#b0b0d0", fontSize: "12px", marginBottom: "4px" }}>
        CHC Navigation (GPS &amp; Topography) &middot; Tunis, Tunisia
      </div>
      <ul style={{ color: "#9090b0", fontSize: "11px", lineHeight: "1.6", margin: 0, paddingLeft: "14px" }}>
        <li>Built a responsive product showcase for GNSS/GPS equipment (HTML, CSS, JS) &mdash; shipped to production</li>
        <li>Structured product pages with specs and intuitive navigation alongside senior developers</li>
        <li>Validated cross-device compatibility across desktop, tablet, and mobile</li>
      </ul>
    </div>

    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "3px",
        }}
      >
        <span style={{ color: "#ff88aa", fontSize: "14px", fontWeight: 700 }}>
          Administrative Technician
        </span>
        <span style={{ color: "#8888aa", fontSize: "11px" }}>Jan 2024 &ndash; Present</span>
      </div>
      <div style={{ color: "#b0b0d0", fontSize: "12px", marginBottom: "4px" }}>
        Retraite Qu&eacute;bec &middot; Qu&eacute;bec City, QC
      </div>
      <ul style={{ color: "#9090b0", fontSize: "11px", lineHeight: "1.6", margin: 0, paddingLeft: "14px" }}>
        <li>Processed and tracked client files for RRQ mandates in a regulated compliance environment</li>
      </ul>
    </div>

    <div style={{ borderTop: "1px solid #ffffff20", paddingTop: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "3px",
        }}
      >
        <span style={{ color: "#aa88ff", fontSize: "14px", fontWeight: 700 }}>
          BSc Computer Science
        </span>
        <span style={{ color: "#8888aa", fontSize: "11px" }}>Sept 2023 &ndash; Present</span>
      </div>
      <div style={{ color: "#b0b0d0", fontSize: "12px", marginBottom: "4px" }}>
        Universit&eacute; Laval &middot; Qu&eacute;bec City, QC
      </div>
      <div style={{ color: "#9090b0", fontSize: "10px", lineHeight: "1.5" }}>
        Data Structures &amp; Algorithms, Web Dev, OS, OOP, ML, Databases, Software Engineering
      </div>
    </div>
  </div>
);

export default function DigitalWorkspace() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);

  // Digital workspace scene: 0.28 - 0.48
  // Show panels sequentially - no overlap to prevent stacking
  const showSkills = scrollProgress >= 0.27 && scrollProgress < 0.35;
  const showAbout = scrollProgress >= 0.35 && scrollProgress < 0.42;
  const showExperience = scrollProgress >= 0.42 && scrollProgress <= 0.49;

  return (
    <group>
      <GridFloor color="#00ffff" position={[0, -1, -5]} size={80} />

      <HolographicText
        text="FULL-STACK DEVELOPER"
        position={[0, 5.5, -1.5]}
        color="#00d4ff"
        size={0.6}
      />

      {showSkills && (
        <FloatingPanel
          position={[-2.5, 2, -2]}
          title="Skills"
          content={<SkillsContent />}
          color="#00d4ff"
          width={320}
        />
      )}

      {showAbout && (
        <FloatingPanel
          position={[1.5, 2, -7]}
          title="About Me"
          content={<AboutContent />}
          color="#aa44ff"
          width={300}
        />
      )}

      {showExperience && (
        <FloatingPanel
          position={[0, 2, -12]}
          title="Experience"
          content={<ExperienceContent />}
          color="#ff006e"
          width={350}
        />
      )}

      <DataParticles
        count={120}
        color="#aa44ff"
        spread={15}
        position={[0, 0, -5]}
      />

      {/* Ambient geometric decorations */}
      <mesh position={[-5, 3, -4]} rotation={[0.5, 0.3, 0]}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshBasicMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh position={[5, 2, -7]} rotation={[0.2, 0.8, 0.3]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial
          color="#ff006e"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh position={[-4, 1, -9]} rotation={[0.7, 0.1, 0.5]}>
        <dodecahedronGeometry args={[0.25, 0]} />
        <meshBasicMaterial
          color="#aa44ff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Vertical light beams */}
      {[-4, -1, 2, 5].map((x, i) => (
        <mesh key={i} position={[x, 2, -6 - i * 1.5]}>
          <boxGeometry args={[0.02, 6, 0.02]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#00d4ff" : "#aa44ff"}
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}

      <ambientLight intensity={0.05} color="#050530" />
    </group>
  );
}
