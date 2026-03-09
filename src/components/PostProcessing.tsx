"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { remap } from "@/utils/math";

export default function PostProcessing() {
  const bloomRef = useRef<any>(null);
  const vignetteRef = useRef<any>(null);

  useFrame(() => {
    const { scrollProgress } = usePortfolioStore.getState();

    if (bloomRef.current) {
      let intensity = 0.3;
      if (scrollProgress > 0.18 && scrollProgress < 0.42) {
        intensity = remap(scrollProgress, 0.18, 0.42, 0.3, 1.5);
      } else if (scrollProgress >= 0.42) {
        intensity = 0.6;
      }
      bloomRef.current.intensity = intensity;
    }

    if (vignetteRef.current) {
      let darkness = 0.3;
      if (scrollProgress > 0.3 && scrollProgress < 0.45) {
        darkness = remap(scrollProgress, 0.3, 0.42, 0.3, 0.7);
      } else if (scrollProgress >= 0.45) {
        darkness = 0.3;
      }
      vignetteRef.current.darkness = darkness;
    }
  });

  return (
    <EffectComposer>
      <Bloom
        ref={bloomRef}
        intensity={0.3}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette
        ref={vignetteRef}
        offset={0.3}
        darkness={0.3}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
