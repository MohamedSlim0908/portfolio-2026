"use client";

import GridFloor from "../digital/GridFloor";
import FloatingPanel from "../digital/FloatingPanel";
import DataParticles from "../digital/DataParticles";
import HolographicText from "../digital/HolographicText";

const skillCategories = [
  { label: "Languages", items: "C++ · Python · JavaScript · HTML · CSS", color: "#00d4ff" },
  { label: "Frontend", items: "React · Vue.js · Bootstrap · Three.js", color: "#aa88ff" },
  { label: "Backend", items: "Node.js · Express · FastAPI · REST APIs", color: "#00ffaa" },
  { label: "Data & ML", items: "Pandas · scikit-learn · Matplotlib · Jupyter", color: "#ff88aa" },
  { label: "Tools", items: "Docker · Git · PostgreSQL · SQLite · Swagger", color: "#ffaa44" },
];

const SkillsContent = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
    {skillCategories.map((cat) => (
      <div key={cat.label}>
        <span style={{ color: cat.color, fontSize: "11px", fontWeight: "bold" }}>
          {cat.label}
        </span>
        <div style={{ color: "#9999bb", fontSize: "11px", marginTop: "1px" }}>
          {cat.items}
        </div>
      </div>
    ))}
  </div>
);

const AboutContent = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <div style={{ color: "#ccccee", fontSize: "12px", lineHeight: "1.5" }}>
      Full-stack developer and Computer Science student at
      <span style={{ color: "#aa88ff" }}> Université Laval</span>, Québec.
    </div>
    <div style={{ color: "#9999bb", fontSize: "11px", lineHeight: "1.5" }}>
      Passionate about building modern web applications, creative coding,
      and exploring machine learning. Always looking for new challenges.
    </div>
    <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
      {["GitHub", "LinkedIn"].map((label) => (
        <span
          key={label}
          style={{
            fontSize: "10px",
            color: "#00d4ff",
            border: "1px solid #00d4ff44",
            padding: "2px 8px",
            borderRadius: "3px",
          }}
        >
          {label}
        </span>
      ))}
    </div>
  </div>
);

const ExperienceContent = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ color: "#ff88aa", fontSize: "12px", fontWeight: "bold" }}>
          Admin Technician
        </span>
        <span style={{ color: "#666688", fontSize: "9px" }}>2024 – Present</span>
      </div>
      <div style={{ color: "#9999bb", fontSize: "10px" }}>Retraite Québec · Québec, QC</div>
    </div>
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ color: "#ff88aa", fontSize: "12px", fontWeight: "bold" }}>
          Web Developer Intern
        </span>
        <span style={{ color: "#666688", fontSize: "9px" }}>Summer 2023</span>
      </div>
      <div style={{ color: "#9999bb", fontSize: "10px" }}>CHC Navigation · Tunis, Tunisia</div>
    </div>
    <div style={{ borderTop: "1px solid #ffffff15", paddingTop: "6px" }}>
      <div style={{ color: "#aa88ff", fontSize: "11px", fontWeight: "bold" }}>
        BSc Computer Science
      </div>
      <div style={{ color: "#9999bb", fontSize: "10px" }}>Université Laval · Sept 2023 – Present</div>
    </div>
  </div>
);

export default function DigitalWorkspace() {
  return (
    <group>
      <GridFloor color="#00ffff" position={[0, -1, -5]} size={80} />

      <HolographicText
        text="MOHAMED SLIM"
        position={[0, 3, -3]}
        color="#00d4ff"
        size={0.6}
      />

      <FloatingPanel
        position={[-3, 2, -5]}
        title="Skills"
        content={<SkillsContent />}
        color="#00d4ff"
        width={300}
      />

      <FloatingPanel
        position={[3, 2.5, -6]}
        title="About Me"
        content={<AboutContent />}
        color="#aa44ff"
        width={300}
      />

      <FloatingPanel
        position={[0, 1.5, -8]}
        title="Experience"
        content={<ExperienceContent />}
        color="#ff006e"
        width={320}
      />

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
