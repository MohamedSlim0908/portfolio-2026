import { create } from "zustand";

interface PortfolioState {
  scrollProgress: number;
  currentScene: number;
  sceneBlend: number;
  isLoaded: boolean;
  loadProgress: number;
  isMobile: boolean;
  showUI: boolean;
  portalProgress: number;

  setScrollProgress: (v: number) => void;
  setCurrentScene: (v: number) => void;
  setSceneBlend: (v: number) => void;
  setIsLoaded: (v: boolean) => void;
  setLoadProgress: (v: number) => void;
  setIsMobile: (v: boolean) => void;
  setShowUI: (v: boolean) => void;
  setPortalProgress: (v: number) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  scrollProgress: 0,
  currentScene: 0,
  sceneBlend: 0,
  isLoaded: false,
  loadProgress: 0,
  isMobile: false,
  showUI: true,
  portalProgress: 0,

  setScrollProgress: (v) => set({ scrollProgress: v }),
  setCurrentScene: (v) => set({ currentScene: v }),
  setSceneBlend: (v) => set({ sceneBlend: v }),
  setIsLoaded: (v) => set({ isLoaded: v }),
  setLoadProgress: (v) => set({ loadProgress: v }),
  setIsMobile: (v) => set({ isMobile: v }),
  setShowUI: (v) => set({ showUI: v }),
  setPortalProgress: (v) => set({ portalProgress: v }),
}));
