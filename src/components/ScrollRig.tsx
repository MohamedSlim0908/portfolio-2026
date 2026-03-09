"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { scenes, SCROLL_PAGES } from "@/config/scenes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollRig() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const store = usePortfolioStore.getState();
        store.setScrollProgress(progress);

        let sceneIndex = scenes.findIndex(
          (s) => progress >= s.scrollStart && progress < s.scrollEnd
        );
        if (sceneIndex === -1) sceneIndex = scenes.length - 1;

        const scene = scenes[sceneIndex];
        const localProgress =
          (progress - scene.scrollStart) /
          (scene.scrollEnd - scene.scrollStart);

        store.setCurrentScene(sceneIndex);
        store.setSceneBlend(Math.max(0, Math.min(1, localProgress)));

        if (sceneIndex === 3) {
          store.setPortalProgress(Math.max(0, Math.min(1, localProgress)));
        } else if (sceneIndex < 3) {
          store.setPortalProgress(0);
        } else {
          store.setPortalProgress(1);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: `${SCROLL_PAGES * 100}vh`,
        position: "relative",
        zIndex: 1,
      }}
    />
  );
}
