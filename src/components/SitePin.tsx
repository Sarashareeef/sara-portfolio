"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { PRODUCTION_HOST } from "@/data/site";
import styles from "./SitePin.module.css";

const LABEL = "Sara Suha · Design Portfolio";

/** True only on the live site's own address (not deployment URLs, localhost or the preview route). */
const onLiveSite = () => window.location.hostname === PRODUCTION_HOST && !window.location.pathname.startsWith("/preloader-preview");
const subscribe = () => () => {};

/**
 * A small corkboard pushpin badge at the bottom-left, with a hover label.
 * Rendered only on production deployments (the layout checks VERCEL_ENV) and,
 * in the browser, only on PRODUCTION_HOST. It fades away while the footer is
 * on screen, so it never covers the footer's own name.
 */
export default function SitePin() {
  const live = useSyncExternalStore(subscribe, onLiveSite, () => false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const footer = document.querySelector("body > footer");
    if (!el || !footer || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => el.toggleAttribute("data-away", entry.isIntersecting));
    io.observe(footer);
    return () => io.disconnect();
  }, [live]);

  if (!live) return null;

  return (
    <div ref={ref} className={styles.pin} role="img" aria-label={LABEL}>
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="sp-head" cx="0.36" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#f36a5c" />
            <stop offset="0.5" stopColor="#cf3326" />
            <stop offset="1" stopColor="#821710" />
          </radialGradient>
          <linearGradient id="sp-neck" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#9c1d14" />
            <stop offset="0.38" stopColor="#d9473a" />
            <stop offset="1" stopColor="#7a140e" />
          </linearGradient>
          <linearGradient id="sp-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#a2241a" />
            <stop offset="0.45" stopColor="#d5463a" />
            <stop offset="1" stopColor="#861810" />
          </linearGradient>
          <linearGradient id="sp-metal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8d8d90" />
            <stop offset="0.45" stopColor="#f1f1f2" />
            <stop offset="1" stopColor="#77777a" />
          </linearGradient>
          <filter id="sp-blur" x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur stdDeviation="1.1" />
          </filter>
        </defs>

        {/* Cast shadow on the disc, light from the top left. */}
        <ellipse className={styles.shadow} cx="19.6" cy="27.4" rx="6.2" ry="1.7" fill="#000" filter="url(#sp-blur)" />

        {/* The pin, tilted into the disc around its tip: a wide cap, a flared
            grip, a small flange and a steel needle. */}
        <g className={styles.body} transform="rotate(20 16 28)">
          <path d="M16 28 L15.3 20.4 H16.7 Z" fill="url(#sp-metal)" />
          <ellipse cx="16" cy="20.5" rx="3.6" ry="1.15" fill="url(#sp-rim)" />
          <path d="M13.7 20.3 C14 17.6 13.3 14.7 12.4 12.7 H19.6 C18.7 14.7 18 17.6 18.3 20.3 Z" fill="url(#sp-neck)" />
          <path d="M8.3 10.6 V12.1 C8.3 14.2 23.7 14.2 23.7 12.1 V10.6 Z" fill="url(#sp-rim)" />
          <ellipse cx="16" cy="10.6" rx="7.7" ry="2.7" fill="url(#sp-head)" />
          <ellipse cx="13" cy="9.8" rx="3" ry="0.9" fill="#fff" opacity="0.65" />
        </g>
      </svg>
      <span className={styles.tip} aria-hidden="true">
        {LABEL}
      </span>
    </div>
  );
}
