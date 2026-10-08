"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

let lenis: Lenis | null = null;

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      anchors: { offset: -72 },
      autoRaf: true,
      stopInertiaOnNavigate: true,
    });
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { lenis?: Lenis }).lenis = lenis;
    }

    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Route changes: start new pages at the top (or at the hash target).
  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    if (hash) {
      lenis.scrollTo(hash, { offset: -72, immediate: true });
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
