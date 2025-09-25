"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      const anyLenis = lenis as unknown as { destroy?: () => void };
      if (typeof anyLenis.destroy === "function") {
        anyLenis.destroy();
      }
    };
  }, []);

  return null;
}
