"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A list whose items fade up as they enter the viewport, staggered 100ms in
 * reading order. Items render visible on the server and stay visible without
 * JavaScript or with reduced motion; the CSS for `data-reveal` lives with the list.
 */
export default function RevealList({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(list.children) as HTMLElement[];
    items.forEach((el) => (el.dataset.reveal = "hidden"));

    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => items.indexOf(a.target as HTMLElement) - items.indexOf(b.target as HTMLElement))
          .forEach((e, k) => {
            const el = e.target as HTMLElement;
            el.style.setProperty("--reveal-delay", `${k * 100}ms`);
            el.dataset.reveal = "shown";
            io.unobserve(el);
          });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  );
}
