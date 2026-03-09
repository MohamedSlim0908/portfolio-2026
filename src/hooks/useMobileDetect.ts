"use client";

import { useEffect } from "react";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

export function useMobileDetect() {
  useEffect(() => {
    const check = () => {
      usePortfolioStore.getState().setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
}
