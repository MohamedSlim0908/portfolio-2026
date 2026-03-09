import { SceneConfig } from "@/types";

export const SCROLL_PAGES = 8;

export const scenes: SceneConfig[] = [
  {
    id: "room-opening",
    name: "Opening",
    scrollStart: 0.0,
    scrollEnd: 0.08,
    cameraKeyframes: [
      { progress: 0, position: [5, 3, 5], lookAt: [0, 1.5, 0], fov: 50 },
      { progress: 1, position: [3, 2.5, 3], lookAt: [0, 1.5, -1], fov: 45 },
    ],
  },
  {
    id: "camera-intro",
    name: "Camera Intro",
    scrollStart: 0.08,
    scrollEnd: 0.18,
    cameraKeyframes: [
      { progress: 0, position: [3, 2.5, 3], lookAt: [0, 1.5, -1], fov: 45 },
      {
        progress: 1,
        position: [0.5, 1.8, 1.2],
        lookAt: [0, 1.6, -1.5],
        fov: 40,
      },
    ],
  },
  {
    id: "scroll-zoom",
    name: "Scroll to Monitor",
    scrollStart: 0.18,
    scrollEnd: 0.32,
    cameraKeyframes: [
      {
        progress: 0,
        position: [0.5, 1.8, 1.2],
        lookAt: [0, 1.6, -1.5],
        fov: 40,
      },
      {
        progress: 1,
        position: [0, 1.6, -0.3],
        lookAt: [0, 1.6, -1.5],
        fov: 35,
      },
    ],
  },
  {
    id: "portal-transition",
    name: "Into the Screen",
    scrollStart: 0.32,
    scrollEnd: 0.42,
    cameraKeyframes: [
      {
        progress: 0,
        position: [0, 1.6, -0.3],
        lookAt: [0, 1.6, -1.5],
        fov: 35,
      },
      {
        progress: 1,
        position: [0, 1.6, -2.5],
        lookAt: [0, 1.6, -5],
        fov: 60,
      },
    ],
  },
  {
    id: "digital-workspace",
    name: "Digital Workspace",
    scrollStart: 0.42,
    scrollEnd: 0.55,
    cameraKeyframes: [
      { progress: 0, position: [0, 2, 0], lookAt: [0, 1, -5], fov: 60 },
      { progress: 1, position: [0, 2, -8], lookAt: [0, 1, -15], fov: 60 },
    ],
  },
  {
    id: "project-terminal",
    name: "Terminal World",
    scrollStart: 0.55,
    scrollEnd: 0.7,
    cameraKeyframes: [
      { progress: 0, position: [0, 2, -15], lookAt: [0, 1, -20], fov: 60 },
      { progress: 1, position: [0, 2, -22], lookAt: [0, 1, -28], fov: 55 },
    ],
  },
  {
    id: "project-dashboard",
    name: "Dashboard World",
    scrollStart: 0.7,
    scrollEnd: 0.82,
    cameraKeyframes: [
      { progress: 0, position: [0, 2, -28], lookAt: [0, 1, -35], fov: 55 },
      { progress: 1, position: [0, 2, -38], lookAt: [0, 1, -45], fov: 55 },
    ],
  },
  {
    id: "project-ailab",
    name: "AI Lab World",
    scrollStart: 0.82,
    scrollEnd: 0.9,
    cameraKeyframes: [
      { progress: 0, position: [0, 2, -45], lookAt: [0, 1, -52], fov: 55 },
      { progress: 1, position: [0, 2, -55], lookAt: [0, 1, -62], fov: 55 },
    ],
  },
  {
    id: "terminal-cta",
    name: "Final Terminal",
    scrollStart: 0.9,
    scrollEnd: 1.0,
    cameraKeyframes: [
      { progress: 0, position: [0, 2, -62], lookAt: [0, 1.5, -68], fov: 50 },
      {
        progress: 1,
        position: [0, 1.8, -64],
        lookAt: [0, 1.5, -68],
        fov: 45,
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
