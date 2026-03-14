import { SceneConfig } from "@/types";

export const SCROLL_PAGES = 6;

export const scenes: SceneConfig[] = [
  {
    id: "room-opening",
    name: "Home",
    scrollStart: 0.0,
    scrollEnd: 0.05,
    cameraKeyframes: [
      { progress: 0, position: [6, 4, 6], lookAt: [0, 1.5, 0], fov: 70 },
      { progress: 1, position: [4, 3, 4], lookAt: [0, 1.5, -1], fov: 65 },
    ],
  },
  {
    id: "camera-intro",
    name: "Room",
    scrollStart: 0.05,
    scrollEnd: 0.12,
    cameraKeyframes: [
      { progress: 0, position: [4, 3, 4], lookAt: [0, 1.5, -1], fov: 65 },
      {
        progress: 1,
        position: [1, 2.2, 1.8],
        lookAt: [0, 1.6, -1.5],
        fov: 60,
      },
    ],
  },
  {
    id: "scroll-zoom",
    name: "Monitor",
    scrollStart: 0.12,
    scrollEnd: 0.20,
    cameraKeyframes: [
      {
        progress: 0,
        position: [1, 2.2, 1.8],
        lookAt: [0, 1.6, -1.5],
        fov: 60,
      },
      {
        progress: 1,
        position: [0, 1.8, 0.2],
        lookAt: [0, 1.6, -1.5],
        fov: 55,
      },
    ],
  },
  {
    id: "portal-transition",
    name: "Portal",
    scrollStart: 0.20,
    scrollEnd: 0.28,
    cameraKeyframes: [
      {
        progress: 0,
        position: [0, 1.8, 0.2],
        lookAt: [0, 1.6, -1.5],
        fov: 55,
      },
      {
        progress: 1,
        position: [0, 1.6, -2.5],
        lookAt: [0, 1.6, -5],
        fov: 75,
      },
    ],
  },
  {
    id: "digital-workspace",
    name: "Skills",
    scrollStart: 0.28,
    scrollEnd: 0.48,
    cameraKeyframes: [
      { progress: 0, position: [0, 3, 2], lookAt: [0, 2, -7], fov: 75 },
      { progress: 0.25, position: [-0.3, 3, -2], lookAt: [-2.5, 2, -7], fov: 72 },
      { progress: 0.5, position: [0.3, 3, -7], lookAt: [1.5, 2, -12], fov: 72 },
      { progress: 0.75, position: [0, 3, -11], lookAt: [0, 2, -17], fov: 72 },
      { progress: 1, position: [0, 2.5, -15], lookAt: [0, 1, -20], fov: 70 },
    ],
  },
  {
    id: "project-terminal",
    name: "Makteb",
    scrollStart: 0.48,
    scrollEnd: 0.62,
    cameraKeyframes: [
      { progress: 0, position: [0, 2.5, -15], lookAt: [0, 1, -20], fov: 75 },
      { progress: 1, position: [0, 2.5, -22], lookAt: [0, 1, -28], fov: 75 },
    ],
  },
  {
    id: "project-dashboard",
    name: "UFood",
    scrollStart: 0.62,
    scrollEnd: 0.76,
    cameraKeyframes: [
      { progress: 0, position: [0, 2.5, -28], lookAt: [0, 1, -35], fov: 75 },
      { progress: 1, position: [0, 2.5, -38], lookAt: [0, 1, -45], fov: 75 },
    ],
  },
  {
    id: "project-ailab",
    name: "UTask",
    scrollStart: 0.76,
    scrollEnd: 0.88,
    cameraKeyframes: [
      { progress: 0, position: [0, 2.5, -45], lookAt: [0, 1, -52], fov: 75 },
      { progress: 1, position: [0, 2.5, -55], lookAt: [0, 1, -62], fov: 75 },
    ],
  },
  {
    id: "terminal-cta",
    name: "Contact",
    scrollStart: 0.88,
    scrollEnd: 1.0,
    cameraKeyframes: [
      { progress: 0, position: [0, 2.5, -62], lookAt: [0, 1.5, -68], fov: 70 },
      {
        progress: 1,
        position: [0, 2, -64],
        lookAt: [0, 1.5, -68],
        fov: 65,
      },
    ],
  },
];

export function getCameraStateAtProgress(globalProgress: number) {
  const clamped = Math.max(0, Math.min(1, globalProgress));

  let sceneIndex = scenes.findIndex(
    (s) => clamped >= s.scrollStart && clamped < s.scrollEnd
  );
  if (sceneIndex === -1) sceneIndex = scenes.length - 1;

  const scene = scenes[sceneIndex];
  const localProgress =
    (clamped - scene.scrollStart) / (scene.scrollEnd - scene.scrollStart);
  const clampedLocal = Math.max(0, Math.min(1, localProgress));

  const kfs = scene.cameraKeyframes;
  let kfA = kfs[0];
  let kfB = kfs[kfs.length - 1];

  for (let i = 0; i < kfs.length - 1; i++) {
    if (clampedLocal >= kfs[i].progress && clampedLocal <= kfs[i + 1].progress) {
      kfA = kfs[i];
      kfB = kfs[i + 1];
      break;
    }
  }

  const kfRange = kfB.progress - kfA.progress;
  const t = kfRange > 0 ? (clampedLocal - kfA.progress) / kfRange : 0;
  const st = t * t * (3 - 2 * t); // smoothstep

  return {
    position: kfA.position.map((a, i) => a + (kfB.position[i] - a) * st) as [
      number,
      number,
      number,
    ],
    lookAt: kfA.lookAt.map((a, i) => a + (kfB.lookAt[i] - a) * st) as [
      number,
      number,
      number,
    ],
    fov: kfA.fov + (kfB.fov - kfA.fov) * st,
    sceneIndex,
    localProgress: clampedLocal,
  };
}
