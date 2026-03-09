"use client";

import { usePortfolioStore } from "@/stores/usePortfolioStore";

export function useScrollProgress() {
  return usePortfolioStore((s) => s.scrollProgress);
}
