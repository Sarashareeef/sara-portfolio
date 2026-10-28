"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { EXIT_MS, EXIT_STATIC_MS, LoaderScene, MILESTONES, MIN_MS, STEP_MS, stageFor, type Milestone } from "./Loader";
import s from "./PreloaderPreview.module.css";

/*
 * Development-only preview of the first-visit loader (/preloader-preview).
 * It renders the real LoaderScene with its real CSS, and replaces only what
 * production takes from the browser: the four milestones, which land here on a
 * simulated timeline (AT × the chosen load time). Speed slows every animation
 * through --loader-speed. Behind it, the real homepage in a frame, so the exit
 * can be judged against the actual corkboard hero; its entrance is replayed as
 * the sheet lifts, as on the site. Remove with the /preloader-preview route.
 */

/** When each milestone lands in the simulation, as a share of the load time. Preview only. */
const AT: Record<Milestone, number> = { dom: 0.12, app: 0.4, fonts: 0.65, load: 1 };
const SPEEDS = [0.25, 0.5, 1] as const;
const NAMES: Record<Milestone, string> = { dom: "Page parsed", app: "App running", fonts: "Fonts ready", load: "Page loaded" };

type Phase = "waiting" | "loading" | "exiting" | "done";
type Behind = "hero" | "blank";

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export default function PreloaderPreview() {
  const [run, setRun] = useState(0);
  const [speed, setSpeed] = useState<number>(0.5);
  const [loadMs, setLoadMs] = useState(2000);
  const [behind, setBehind] = useState<Behind>("hero");
  const [phase, setPhase] = useState<Phase>("waiting");
  // Milestones in the order they (simulatedly) happened, and those shown so far (paced, as on the site).
  const [order, setOrder] = useState<Milestone[]>([]);
  const [shownList, setShownList] = useState<Milestone[]>([]);
  const startedAt = useRef(0);
  const lastStep = useRef(0);
  const [elapsed, setElapsed] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const [panel, setPanel] = useState(true);
  const frame = useRef<HTMLIFrameElement>(null);

  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const [fullMotion, setFullMotion] = useState(false);
  const still = reduced && !fullMotion;

  const happened = Object.fromEntries(order.map((m) => [m, true])) as Partial<Record<Milestone, boolean>>;
  const count = shownList.length;
  const stage = stageFor(Object.fromEntries(shownList.map((m) => [m, true])));
  // As on the site: the next step shown is the earliest (in MILESTONES order) that has happened.
  const nextToShow = MILESTONES.find((m) => happened[m] && !shownList.includes(m));

  /** Start again from a blank sheet (with the hero behind, once it has loaded). */
  const replay = useCallback(
    (nextBehind: Behind = behind) => {
      setOrder([]);
      setShownList([]);
      setElapsed(0);
      setRun((r) => r + 1);
      setPhase(nextBehind === "hero" && !heroLoaded ? "waiting" : "loading");
    },
    [behind, heroLoaded],
  );

  // The hero page in the frame: note its width (without its scrollbar, as on the site), then start.
  const onHeroLoad = () => {
    const doc = frame.current?.contentDocument;
    if (doc) setWidth(doc.documentElement.clientWidth);
    setHeroLoaded(true);
    setPhase((p) => (p === "waiting" ? "loading" : p));
  };

  // As on the site, the hero's entrance plays as the sheet lifts: restart its reveals.
  const replayHeroEntrance = useCallback(() => {
    const doc = frame.current?.contentDocument;
    doc?.querySelectorAll<HTMLElement>('main > section:first-child [data-reveal="shown"]').forEach((el) => {
      el.dataset.reveal = "";
      void el.offsetWidth;
      el.dataset.reveal = "shown";
    });
  }, []);

  // The simulated load: milestones happen at AT × load time, slowed with everything else.
  useEffect(() => {
    if (phase !== "loading") return;
    const f = 1 / speed;
    const t0 = performance.now();
    startedAt.current = t0;
    lastStep.current = t0;
    const timers = MILESTONES.map((m) =>
      window.setTimeout(() => setOrder((o) => (o.includes(m) ? o : [...o, m])), AT[m] * loadMs * f),
    );
    const clock = window.setInterval(() => setElapsed((performance.now() - t0) * speed), 50);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearInterval(clock);
    };
  }, [phase, run, speed, loadMs]);

  // As on the site: reveal what has happened one step per STEP_MS at most; once all
  // four are shown, leave, but not before MIN_MS on screen.
  useEffect(() => {
    if (phase !== "loading") return;
    const f = 1 / speed;
    if (nextToShow) {
      const t = window.setTimeout(() => {
        lastStep.current = performance.now();
        setShownList((l) => (l.includes(nextToShow) ? l : [...l, nextToShow]));
      }, Math.max(0, lastStep.current + STEP_MS * f - performance.now()));
      return () => window.clearTimeout(t);
    }
    if (shownList.length === MILESTONES.length) {
      const t = window.setTimeout(() => {
        setPhase("exiting");
        if (behind === "hero") replayHeroEntrance();
      }, Math.max(0, startedAt.current + MIN_MS * f - performance.now()));
      return () => window.clearTimeout(t);
    }
  }, [phase, nextToShow, shownList.length, speed, behind, replayHeroEntrance]);

  // The exit runs its course, then the sheet is gone.
  useEffect(() => {
    if (phase !== "exiting") return;
    const t = window.setTimeout(() => setPhase("done"), (still ? EXIT_STATIC_MS : EXIT_MS) / speed);
    return () => window.clearTimeout(t);
  }, [phase, speed, still]);

  // Keyboard: R replay, H hide the panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "r" || e.key === "R") replay();
      else if (e.key === "h" || e.key === "H") setPanel((p) => !p);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [replay]);

  const showing = phase === "loading" || phase === "exiting";

  return (
    <>
      {behind === "hero" && (
        <iframe ref={frame} src="/" className={s.hero} onLoad={onHeroLoad} title="Homepage behind the preview" tabIndex={-1} />
      )}

      <div
        className={`${s.scene} ${phase === "waiting" ? s.cover : ""}`}
        data-loader-stage={stage}
        data-loader-count={count}
        data-loader-exit={phase === "exiting" ? "" : undefined}
        data-loader-static={still ? "" : undefined}
        style={{ "--loader-progress": count / 4, "--loader-speed": 1 / speed, width: behind === "hero" && width ? width : undefined } as CSSProperties}
        aria-hidden="true"
      >
        {showing && <LoaderScene key={run} />}
      </div>

      {panel ? (
        <section className={s.panel} aria-label="Preloader preview controls">
          <p className={s.badge}>Simulated timing · on the site, milestones come from the browser</p>
          {reduced && (
            <p className={s.notice}>
              {still ? "Reduced motion is on: this is what those visitors see (no movement, a short fade). " : "Reduced motion is on, but you're viewing full motion. "}
              <button type="button" onClick={() => setFullMotion((v) => !v)}>
                {still ? "Show full motion" : "Back to reduced"}
              </button>
            </p>
          )}

          <div className={s.row}>
            <button type="button" className={s.primary} onClick={() => replay()}>
              ↺ Replay
            </button>
            <span className={s.group} role="group" aria-label="Animation speed">
              {SPEEDS.map((sp) => (
                <button
                  key={sp}
                  type="button"
                  aria-pressed={speed === sp}
                  onClick={() => {
                    setSpeed(sp);
                    replay();
                  }}
                >
                  {sp}×
                </button>
              ))}
            </span>
            <span className={s.group} role="group" aria-label="Behind the loader">
              {(["hero", "blank"] as Behind[]).map((b) => (
                <button
                  key={b}
                  type="button"
                  aria-pressed={behind === b}
                  onClick={() => {
                    setBehind(b);
                    replay(b);
                  }}
                >
                  {b === "hero" ? "Hero behind" : "Blank"}
                </button>
              ))}
            </span>
            <button type="button" onClick={() => setPanel(false)} title="Hide the controls (H)">
              Hide
            </button>
          </div>

          <label className={s.slider}>
            <span>Simulated load: {(loadMs / 1000).toFixed(1)}s</span>
            <input
              type="range"
              min={300}
              max={6000}
              step={100}
              value={loadMs}
              onChange={(e) => {
                setLoadMs(Number(e.target.value));
                replay();
              }}
            />
          </label>

          <ol className={s.milestones}>
            {MILESTONES.map((m) => (
              <li key={m} data-done={happened[m] || undefined}>
                <span>{happened[m] ? "✓" : "·"}</span> {NAMES[m]} <span className={s.muted}>@ {((AT[m] * loadMs) / 1000).toFixed(2)}s</span>
                {shownList.includes(m) && <span className={s.muted}> · shown</span>}
              </li>
            ))}
          </ol>

          <p className={s.readout}>
            {phase === "waiting" ? "Loading the homepage behind…" : phase === "done" ? "Finished. Replay (R) to watch again." : `${stage.toUpperCase()} · ${count}/4 · ${(elapsed / 1000).toFixed(2)}s`}
            {phase === "loading" && count === 4 && " · holding (minimum time on screen)"}
            {phase === "exiting" && " · exit"}
          </p>
          <p className={s.muted}>
            Speed slows every animation and the simulated timeline together. On the site each step is a real browser
            event; the sheet leaves once the fourth lands, after at least {MIN_MS / 1000}s on screen. R replays · H hides
            this panel.
          </p>
        </section>
      ) : (
        <div className={s.reveal}>
          <button type="button" onClick={() => replay()}>
            ↺ Replay
          </button>
          <button type="button" onClick={() => setPanel(true)}>
            Show controls (H)
          </button>
        </div>
      )}
    </>
  );
}
