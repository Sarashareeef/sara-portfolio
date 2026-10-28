"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Loader.module.css";

declare global {
  interface Window {
    __ssLoader?: { mark: (milestone: Milestone) => void };
  }
}

/**
 * First-visit loader: a Swiss-grid sheet laid over the page. Its frame and
 * registration marks sit exactly where the hero's corkboard will appear, its
 * metadata row where the header will be; when the page is ready the sheet is
 * wiped away from the top, revealing the workspace underneath.
 *
 * Progress is four real milestones, not a percentage (see MILESTONES). The
 * inline script records them on <html> before the app has even started
 * (data-loader-stage, data-loader-count, --loader-progress), so the line, the
 * crosshair and the status label are truthful from the first frame, with no
 * re-rendering. The app adds its own milestone once it is running. The moment
 * all four are in, the sheet leaves: no minimum time, no waiting on animation.
 *
 * Shown once per tab session, on the first full page load only (client
 * navigation never re-renders the root layout). Safety net: the inline script
 * takes it down after 8s whatever happens, so with no JS nothing can get stuck.
 * While `loader-on` is set the page's own entrance animations wait
 * (globals.css), so they play as the sheet lifts.
 * Preview: `?preloader` on any URL plays it for real; /preloader-preview
 * (development only) replays it with simulated timing.
 */

export type Milestone = "dom" | "app" | "fonts" | "load";
export const MILESTONES: Milestone[] = ["dom", "app", "fonts", "load"];
export type Stage = "init" | "interface" | "assets" | "ready";

/** The label shows what is still pending (the inline script mirrors this). */
export function stageFor(done: Partial<Record<Milestone, boolean>>): Stage {
  if (!done.dom) return "init";
  if (!done.app) return "interface";
  if (!(done.fonts && done.load)) return "assets";
  return "ready";
}

const LABELS: [Stage, string][] = [
  ["init", "Initialising experience"],
  ["interface", "Preparing interface"],
  ["assets", "Loading assets"],
  ["ready", "Ready"],
];

/** The sheet's exit (ms): secondary details fade, then the wipe (matches the CSS). */
export const EXIT_MS = 760;
/** With reduced motion: a short fade only. */
export const EXIT_STATIC_MS = 220;

export const loaderBootstrap = `(function(){try{var d=document.documentElement,p=location.pathname,k="ss-loader-seen";if(p.indexOf("/dev/")===0||p.indexOf("/preloader-preview")===0)return;if(!/[?&]preloader(=|&|$)/.test(location.search)&&sessionStorage.getItem(k))return;sessionStorage.setItem(k,"1");d.classList.add("loader-on");var st=matchMedia("(prefers-reduced-motion: reduce)").matches;if(st)d.classList.add("loader-static");var m={},n=0,out=0;function stage(){return !m.dom?"init":!m.app?"interface":!(m.fonts&&m.load)?"assets":"ready"}function sync(){d.setAttribute("data-loader-stage",stage());d.setAttribute("data-loader-count",n);d.style.setProperty("--loader-progress",n/4)}function exit(){if(out)return;out=1;d.classList.add("loader-out");d.classList.remove("loader-on");setTimeout(function(){d.classList.remove("loader-out","loader-static");d.removeAttribute("data-loader-stage");d.removeAttribute("data-loader-count");d.style.removeProperty("--loader-progress");window.dispatchEvent(new Event("ss-loader-done"))},st?${EXIT_STATIC_MS}:${EXIT_MS})}function mark(x){if(m[x]||out)return;m[x]=1;n++;sync();if(n===4)exit()}window.__ssLoader={mark:mark};sync();document.addEventListener("DOMContentLoaded",function(){mark("dom")});if(document.fonts){document.fonts.ready.then(function(){mark("fonts")},function(){mark("fonts")})}else{mark("fonts")}window.addEventListener("load",function(){mark("load")});setTimeout(exit,8000)}catch(e){}})();`;

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

/**
 * The sheet itself. Its state comes from the nearest data-loader-stage /
 * data-loader-count / --loader-progress: <html> on the site, a wrapper in the
 * preview. Static markup, rendered once.
 */
export function LoaderScene() {
  return (
    <div className={styles.sheet}>
      <div className={styles.meta}>
        <span>SS® / Design portfolio</span>
        <span className={styles.metaSoft}>2026</span>
      </div>

      <div className={styles.canvas}>
        <span className={styles.guides} />
        <div className={styles.frame}>
          <span className={`${styles.reg} ${styles.tl}`} />
          <span className={`${styles.reg} ${styles.tr}`} />
          <span className={`${styles.reg} ${styles.bl}`} />
          <span className={`${styles.reg} ${styles.br}`} />
          <div className={styles.identity}>
            <p className={styles.name}>Sara Suha.</p>
            <p className={styles.role}>Product design · Interaction · Systems</p>
          </div>
        </div>

        <div className={styles.progress}>
          <div className={styles.track}>
            <span className={styles.fill} />
            <span className={styles.tick} style={{ left: "25%" }} />
            <span className={styles.tick} style={{ left: "50%" }} />
            <span className={styles.tick} style={{ left: "75%" }} />
            <span className={styles.rail}>
              <span className={styles.crosshair} />
            </span>
          </div>
          <div className={styles.statusRow}>
            <span className={styles.status}>
              {LABELS.map(([stage, text]) => (
                <span key={stage} className={styles.label} data-for={stage}>
                  {text}
                </span>
              ))}
            </span>
            <span className={styles.count}>
              {[0, 1, 2, 3, 4].map((n) => (
                <span key={n} data-for={n}>
                  0{n}
                </span>
              ))}{" "}
              / 04
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Not shown this time (repeat visit): it stays display: none.
    if (!document.documentElement.classList.contains("loader-on")) return;
    const onDone = () => setDone(true);
    window.addEventListener("ss-loader-done", onDone);
    // The app is running: that's a milestone.
    window.__ssLoader?.mark("app");
    return () => window.removeEventListener("ss-loader-done", onDone);
  }, []);

  // Never on the preview pages, which render their own copy.
  const path = usePathname() ?? "";
  if (done || path.startsWith("/dev/") || path.startsWith("/preloader-preview")) return null;

  return (
    <div className={styles.overlay} aria-hidden="true">
      <LoaderScene />
    </div>
  );
}
