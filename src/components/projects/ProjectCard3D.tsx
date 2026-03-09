"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { ProjectData } from "@/types";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

interface ProjectCard3DProps {
  project: ProjectData;
  position: [number, number, number];
  visibleInScenes?: number[];
}

export default function ProjectCard3D({
  project,
  position,
  visibleInScenes = [5, 6, 7],
}: ProjectCard3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const initialY = useRef(position[1]);
  const currentScene = usePortfolioStore((s) => s.currentScene);

  const isVisible = visibleInScenes.includes(currentScene);

  useFrame((state) => {
    if (groupRef.current && isVisible) {
      groupRef.current.position.y =
        initialY.current +
        Math.sin(state.clock.elapsedTime * 0.6 + position[0] * 2) * 0.1;
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={position}>
      {/* Card background */}
      <mesh>
        <planeGeometry args={[4, 2.8]} />
        <meshBasicMaterial
          color="#080818"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Border glow */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.06, 2.86]} />
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* HTML overlay */}
      <Html
        transform
        distanceFactor={5}
        position={[0, 0, 0.02]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            width: "420px",
            fontFamily: "monospace",
            color: "#e8e8f0",
            userSelect: "none",
            overflow: "hidden",
            borderRadius: "6px",
          }}
        >
          {/* Image area */}
          {project.image && (
            <div
              style={{
                width: "100%",
                height: "155px",
                overflow: "hidden",
                borderBottom: `2px solid ${project.color}`,
                borderRadius: "6px 6px 0 0",
                background: "#080818",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          )}

          {/* Content area */}
          <div style={{ padding: "14px 18px 16px" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: project.color,
                marginBottom: "6px",
                margin: 0,
              }}
            >
              {project.title}
            </h2>
            <p
              style={{
                fontSize: "10.5px",
                lineHeight: "1.5",
                color: "#8888aa",
                marginTop: "6px",
                marginBottom: "10px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.description}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
                marginBottom: "10px",
              }}
            >
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "9px",
                    padding: "2px 7px",
                    border: `1px solid ${project.color}44`,
                    borderRadius: "4px",
                    color: project.color,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                pointerEvents: "auto",
                fontSize: "10px",
                color: project.color,
                textDecoration: "none",
                border: `1px solid ${project.color}66`,
                padding: "4px 12px",
                borderRadius: "4px",
                display: "inline-block",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = `${project.color}22`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              View on GitHub →
            </a>
          </div>
        </div>
      </Html>
    </group>
  );
}
