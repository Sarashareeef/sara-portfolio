"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Same query as the sticky stack in Experience.module.css. */
const STACK = "(min-width: 1100px) and (min-height: 720px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Experience list whose rows stack (sticky, in CSS) on large screens. While the
 * next row slides up over a stuck row, that row gets --stack-p from 0 to 1, which
 * the CSS uses to settle it back (slight scale, dimmed content). One passive
 * scroll listener, throttled to animation frames; all reads happen before writes.
 */
export default function StackList({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const items = Array.from(list.children) as HTMLElement[];
    const mq = window.matchMedia(STACK);
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!mq.matches) {
        items.forEach((el) => el.style.removeProperty("--stack-p"));
        return;
      }
      const tops = items.map((el) => el.getBoundingClientRect().top);
      const sticky = items.map((el) => parseFloat(getComputedStyle(el).top) || 0);
      const heights = items.map((el) => el.offsetHeight);
      const progress = items.slice(0, -1).map((_, i) => {
        const start = sticky[i] + heights[i]; // next row just below this one
        const end = sticky[i + 1]; // next row settled in its own slot
        return Math.min(1, Math.max(0, (start - tops[i + 1]) / (start - end)));
      });
      progress.forEach((p, i) => items[i].style.setProperty("--stack-p", p.toFixed(3)));
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mq.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mq.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <ol ref={ref} className={className}>
      {children}
    </ol>
  );
}
