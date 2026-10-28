"use client";

import { useEffect } from "react";

/** Minimum time between two scenes starting, so cards entering together take turns. */
const GAP = 700;

/**
 * Touch devices have no hover, so each capability card's scene plays once, by
 * itself, the first time the card is mostly in view: the card's `data-scene`
 * becomes "play", which the CSS treats like hover (CapabilityScene.module.css).
 * Mouse/trackpad devices keep the hover-only behaviour and this does nothing.
 */
export default function CapabilityScenePlayer() {
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const queue: HTMLElement[] = [];
    let nextAt = 0;
    let timer = 0;

    // Wait while the tab is hidden or the first-visit loader covers the page.
    const pump = () => {
      window.clearTimeout(timer);
      if (!queue.length) return;
      const wait = document.hidden || root.classList.contains("loader-on") ? 300 : nextAt - performance.now();
      if (wait > 0) {
        timer = window.setTimeout(pump, wait);
        return;
      }
      queue.shift()!.dataset.scene = "play";
      nextAt = performance.now() + GAP;
      pump();
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
          .forEach((el) => {
            io.unobserve(el);
            queue.push(el);
          });
        pump();
      },
      { threshold: 0.6 },
    );

    document.querySelectorAll<HTMLElement>("[data-scene]").forEach((el) => {
      if (el.dataset.scene !== "play") io.observe(el);
    });
    document.addEventListener("visibilitychange", pump);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", pump);
    };
  }, []);

  return null;
}
