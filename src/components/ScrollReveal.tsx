"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/**
 * Runs before first paint (see RevealScript): hides `[data-reveal]` content only
 * when motion is allowed and IntersectionObserver exists, and un-hides it again
 * if ScrollReveal hasn't started within 4s, so nothing can stay hidden.
 */
export const revealBootstrap = `(function(){try{var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver" in window))return;d.classList.add("js-reveal");setTimeout(function(){if(!window.__revealReady)d.classList.remove("js-reveal")},4000)}catch(e){}})();`;

/** Inline script; plain-text on the client so React doesn't warn about rendering a script. */
export function RevealScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: revealBootstrap }}
    />
  );
}

/**
 * Reveals every `[data-reveal]` element once, as it enters the viewport.
 * Elements that arrive together are staggered `step` ms apart in document order;
 * `data-reveal-delay` (ms) adds to that. CSS lives in globals.css.
 */
export default function ScrollReveal({ step = 130 }: { step?: number }) {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      root.classList.remove("js-reveal");
      return;
    }
    // Soft navigations don't run the inline script, so make sure the class is set.
    root.classList.add("js-reveal");
    window.__revealReady = true;

    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
          .forEach((el, k) => {
            const extra = Number(el.dataset.revealDelay ?? 0);
            // data-reveal-seq: the element carries its own place in a sequence.
            const batch = el.dataset.revealSeq !== undefined ? 0 : Math.min(k, 5) * step;
            el.style.setProperty("--reveal-delay", `${batch + extra}ms`);
            el.dataset.reveal = "shown";
            io.unobserve(el);
          });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.dataset.reveal !== "shown") io.observe(el);
    });
    return () => io.disconnect();
  }, [step]);

  return null;
}
