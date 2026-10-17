"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import Corkboard from "./Corkboard";
import styles from "./Loader.module.css";

/**
 * First-visit loader: a hand-drawn corkboard, a pushpin flying in along a
 * dashed curve, "Putting things together..." and a progress bar that follows
 * the page's real loading.
 *
 * Shown once per browser tab session, on the first full page load only (client
 * navigation never re-renders the root layout, so it can't replay). The inline
 * script below decides before first paint: it adds `html.loader-on` (plus
 * `loader-static` with reduced motion: the same screen, nothing moving), or
 * nothing on a repeat visit. Without that class the overlay is never displayed,
 * so with no JS nothing can get stuck. While `loader-on` is set the page's own
 * entrance animations wait (globals.css), so they play as it leaves.
 * Preview: `?preloader` on any URL plays it regardless. Never on /dev/ pages
 * (the development-only preview at /dev/preloader shows it on its own).
 */
export const loaderBootstrap = `(function(){try{var d=document.documentElement,k="ss-loader-seen";if(location.pathname.indexOf("/dev/")===0)return;if(!/[?&]preloader(=|&|$)/.test(location.search)&&sessionStorage.getItem(k))return;sessionStorage.setItem(k,"1");d.classList.add("loader-on");if(matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("loader-static");setTimeout(function(){d.classList.remove("loader-on","loader-static")},8000)}catch(e){}})();`;

/** Inline script; plain text on the client so React doesn't warn about rendering a script. */
export function LoaderScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: loaderBootstrap }}
    />
  );
}

/** Never longer than this after hydration, even if the page is still loading (ms). */
const MAX_MS = 6000;
/** Fade-out into the page (matches the CSS). */
export const EXIT_MS = 650;
/** Its easing (matches the CSS transition on .loader-out .overlay). */
export const EXIT_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
/** A short beat with everything at rest before the fade (ms). */
export const REST_MS = 250;
/** The bar never fills faster than this, end to end (ms), so it reads as progress. */
const MIN_FILL_MS = 700;

/**
 * The loader's contents: the corkboard illustration and the line of type with
 * its progress bar (progress 0–1). Rendered by Loader below, and by the
 * dev-only preview (/dev/preloader), which drives these same animations.
 */
export function LoaderScene({ progress }: { progress: number }) {
  const pct = Math.round(progress * 100);
  return (
    <div className={styles.stage}>
      <Corkboard />
      <div className={styles.copy}>
        <p className={styles.text} data-part="text">
          Putting things together...
        </p>
        <div className={styles.barRow} data-part="bar">
          <span className={styles.bar} style={{ "--p": progress } as CSSProperties}>
            <span className={styles.fill} />
          </span>
          <span className={styles.pct}>{pct}%</span>
        </div>
      </div>
    </div>
  );
}

/**
 * How much of the page has really loaded (0–1): its eager images, its fonts
 * and the window load event. Short of 1 until all of it is in.
 */
function realProgress(images: HTMLImageElement[], fontsDone: boolean) {
  if (document.readyState === "complete" && fontsDone) return 1;
  const done = images.filter((img) => img.complete).length + (fontsDone ? 1 : 0) + (document.readyState !== "loading" ? 1 : 0);
  return Math.min(0.96, done / (images.length + 2));
}

export default function Loader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = overlay.current;
    // Not shown this time (repeat visit): it stays display: none.
    if (!el || !root.classList.contains("loader-on")) return;
    let finished = false;
    let raf = 0;
    const timers: number[] = [];
    const exit = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      // The page's entrance animations resume as the white sheet fades away.
      root.classList.add("loader-out");
      root.classList.remove("loader-on");
      timers.push(
        window.setTimeout(() => {
          root.classList.remove("loader-out", "loader-static");
          setDone(true);
        }, EXIT_MS),
      );
    };

    // What the bar reports: the page's own images (not lazy ones, which wait to
    // be scrolled to), its fonts, and the load event.
    const images = Array.from(document.images).filter((img) => !el.contains(img) && img.loading !== "lazy");
    let fontsDone = !document.fonts;
    document.fonts?.ready.then(() => {
      fontsDone = true;
    });

    // The illustration's sequence (pin landed, text and bar shown).
    const sequence = el.getAnimations({ subtree: true }).filter((a) => Number.isFinite(Number(a.effect?.getComputedTiming().endTime)));
    let sequenceDone = sequence.length === 0;
    Promise.all(sequence.map((a) => a.finished.catch(() => undefined))).then(() => {
      sequenceDone = true;
    });
    // The bar starts reporting once it has appeared.
    const barIn = el.querySelector(`.${styles.barRow}`)?.getAnimations()[0];
    const barShown = () => !barIn || barIn.playState === "finished" || Number(barIn.currentTime) >= Number(barIn.effect?.getTiming().delay ?? 0);

    let shown = 0;
    let resting = false;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(100, now - last);
      last = now;
      if (barShown()) {
        const target = realProgress(images, fontsDone);
        // Ease towards the real figure, never past it, never faster than MIN_FILL_MS end to end.
        let next = Math.min(target, shown + (target - shown) * (1 - Math.exp(-dt / 90)), shown + dt / MIN_FILL_MS);
        if (target === 1 && 1 - next < 0.01) next = 1;
        if (next !== shown) {
          shown = next;
          setProgress(next);
        }
      }
      if (shown === 1 && sequenceDone && !resting) {
        resting = true;
        timers.push(window.setTimeout(exit, REST_MS));
      }
      if (!finished) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Never longer than MAX_MS, whatever is still loading.
    timers.push(window.setTimeout(exit, MAX_MS));

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // The dev-only preview (/dev/preloader) renders its own copy; a second, hidden
  // one would claim the SVG filter and gradient ids.
  const devPage = usePathname()?.startsWith("/dev/");

  if (done || devPage) return null;

  return (
    <div ref={overlay} className={styles.overlay} aria-hidden="true">
      <LoaderScene progress={progress} />
    </div>
  );
}
