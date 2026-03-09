"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { getCameraStateAtProgress } from "@/config/scenes";

const _targetPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _currentLookAt = new THREE.Vector3();

export default function CameraRig() {
  const { camera } = useThree();
  const lookAtRef = useRef(new THREE.Vector3(0, 1.5, 0));
  const initialized = useRef(false);

  useFrame((_, delta) => {
    const { scrollProgress } = usePortfolioStore.getState();
    const state = getCameraStateAtProgress(scrollProgress);

    _targetPos.set(...state.position);
    _targetLookAt.set(...state.lookAt);

    if (!initialized.current) {
      camera.position.copy(_targetPos);
      lookAtRef.current.copy(_targetLookAt);
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = state.fov;
        camera.updateProjectionMatrix();
      }
      initialized.current = true;
      return;
    }

    const speed = 8;
    const factor = 1 - Math.exp(-speed * delta);

    camera.position.lerp(_targetPos, factor);
    lookAtRef.current.lerp(_targetLookAt, factor);

    _currentLookAt.copy(lookAtRef.current);
    camera.lookAt(_currentLookAt);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, state.fov, factor);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
