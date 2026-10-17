"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EXIT_EASING, EXIT_MS, LoaderScene, REST_MS } from "./Loader";
import loader from "./Loader.module.css";
import s from "./PreloaderPreview.module.css";

/*
 * Development-only preview of the first-visit loader (route: /dev/preloader).
 * It renders the real LoaderScene with its real CSS animations, pauses them and
 * drives their clock itself, so slow motion keeps every easing and the whole
 * sequence. Two parts are reproduced here because production ties them to the
 * live page: the progress fill (it follows real loading there; here the page
 * is already loaded, so the fill is simulated over SIM_FILL_MS from the moment
 * the bar appears), and the exit fade (a CSS transition there), recreated with
 * the same duration, easing and timing after the same short rest.
 */

const SPEEDS = [0.25, 0.5, 1, 2] as const;
/** Pause on the final frame before looping (ms of animation time). */
const HOLD_MS = 700;
/** Simulated load: how long the bar takes to fill once it has appeared (ms). */
const SIM_FILL_MS = 900;

type Part = "board" | "pin" | "text" | "bar";
const PARTS: [Part, string][] = [
  ["board", "Board"],
  ["pin", "Pin"],
  ["text", "Text"],
  ["bar", "Bar"],
];
type Stage = { key: string; label: string; start: number; end: number };

const fmt = (ms: number) => `${(ms / 1000).toFixed(2)}s`;
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export default function PreloaderPreview() {
  const scene = useRef<HTMLDivElement>(null);
  const anims = useRef<Animation[]>([]);
  const time = useRef(0);
  const total = useRef(0);

  const [run, setRun] = useState(0);
  const [now, setNow] = useState(0);
  const [stages, setStages] = useState<Stage[]>([]);
  const [length, setLength] = useState(0);
  const [fillAt, setFillAt] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [rate, setRate] = useState<number>(1);
  const [loop, setLoop] = useState(true);
  const [withExit, setWithExit] = useState(true);
  const [hidden, setHidden] = useState<Record<Part, boolean>>({ board: false, pin: false, text: false, bar: false });
  const [panel, setPanel] = useState(true);

  // Latest settings for the frame loop.
  const live = useRef({ playing, rate, loop });
  useEffect(() => {
    live.current = { playing, rate, loop };
  }, [playing, rate, loop]);

  /** Puts every animation of the scene at time t (ms since the loader appeared). */
  const seek = useCallback((t: number) => {
    time.current = t;
    anims.current.forEach((a) => {
      a.currentTime = t;
    });
    setNow(t);
  }, []);

  // Collect the scene's animations (again after a restart or the exit toggle),
  // hold them, and work out the stages from their own timings.
  useEffect(() => {
    const root = scene.current;
    if (!root) return;
    const list = root.getAnimations({ subtree: true });
    list.forEach((a) => a.pause());

    const span: Record<Part, [number, number]> = { board: [Infinity, 0], pin: [Infinity, 0], text: [Infinity, 0], bar: [Infinity, 0] };
    list.forEach((a) => {
      const effect = a.effect as KeyframeEffect | null;
      const el = effect?.target as Element | null;
      const part = el?.closest("[data-part]")?.getAttribute("data-part") as Part | undefined;
      const end = Number(effect?.getComputedTiming().endTime);
      if (!part || !(part in span) || !Number.isFinite(end)) return;
      const start = Number(effect?.getTiming().delay ?? 0);
      span[part] = [Math.min(span[part][0], start), Math.max(span[part][1], end)];
    });

    // As in production: the bar reports from the moment it appears; the fade
    // waits for the whole sequence and a full bar, then a short rest.
    const fillStart = Number.isFinite(span.bar[0]) ? span.bar[0] : 0;
    const filled = fillStart + SIM_FILL_MS;
    const settled = Math.max(span.board[1], span.pin[1], span.text[1], span.bar[1], filled);
    const fadeAt = settled + REST_MS;
    let fade: Animation | null = null;
    if (withExit) {
      fade = root.animate([{ opacity: 1 }, { opacity: 0 }], { duration: EXIT_MS, delay: fadeAt, easing: EXIT_EASING, fill: "both" });
      fade.pause();
    }
    anims.current = fade ? [...list, fade] : list;
    total.current = withExit ? fadeAt + EXIT_MS : settled;
    setFillAt(fillStart);
    setLength(total.current);
    setStages(
      [
        { key: "board", label: "Board & papers", start: span.board[0], end: span.board[1] },
        { key: "pin", label: "Pin flies, lands", start: span.pin[0], end: span.pin[1] },
        { key: "text", label: "Text", start: span.text[0], end: span.text[1] },
        { key: "bar", label: "Bar fills (sim.)", start: fillStart, end: filled },
        { key: "rest", label: "Rest", start: settled, end: fadeAt },
        ...(withExit ? [{ key: "exit", label: "Fade into page", start: fadeAt, end: fadeAt + EXIT_MS }] : []),
      ].filter((st) => Number.isFinite(st.start)),
    );
    seek(Math.min(time.current, total.current));
    return () => fade?.cancel();
  }, [run, withExit, seek]);

  // The clock: advances at the chosen speed, holds on the last frame, loops.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (ts: number) => {
      const dt = ts - last;
      last = ts;
      const { playing: on, rate: r, loop: again } = live.current;
      if (on) {
        let t = time.current + dt * r;
        if (t >= total.current + HOLD_MS) {
          if (again) t = 0;
          else {
            t = total.current;
            setPlaying(false);
          }
        }
        seek(Math.min(t, total.current + HOLD_MS));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seek]);

  const replay = useCallback(() => {
    seek(0);
    setPlaying(true);
  }, [seek]);

  /** Restart from scratch: remounts the scene, so its animations are created anew. */
  const restart = useCallback(() => {
    time.current = 0;
    setRun((n) => n + 1);
    setPlaying(true);
  }, []);

  // Keyboard: space play / pause, R replay, ←/→ step a frame (shift: 100ms), H hide the panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement && e.target.type !== "range") return;
      if (e.code === "Space") {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.key === "r" || e.key === "R") replay();
      else if (e.key === "h" || e.key === "H") setPanel((p) => !p);
      else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        setPlaying(false);
        const step = (e.shiftKey ? 100 : 1000 / 60) * (e.key === "ArrowLeft" ? -1 : 1);
        seek(Math.max(0, Math.min(total.current, time.current + step)));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [replay, seek]);

  const shown = Math.min(now, length);
  const progress = easeInOut(Math.min(1, Math.max(0, (now - fillAt) / SIM_FILL_MS)));
  const pct = (ms: number) => `${length ? (ms / length) * 100 : 0}%`;
  const hideClass = PARTS.filter(([p]) => hidden[p])
    .map(([p]) => s[`hide-${p}`])
    .join(" ");

  return (
    <>
      {/* The loader's own overlay (white, full screen), always shown here. */}
      <div className={loader.overlay} style={{ display: "flex" }} aria-hidden="true">
        <div key={run} ref={scene} className={`${s.scene} ${hideClass}`}>
          <LoaderScene progress={progress} />
        </div>
      </div>

      {panel ? (
        <section className={s.panel} aria-label="Preloader preview controls">
          <div className={s.row}>
            <button type="button" onClick={() => setPlaying((p) => !p)} className={s.primary}>
              {playing ? "❚❚ Pause" : "▶ Play"}
            </button>
            <button type="button" onClick={replay}>
              ↺ Replay
            </button>
            <button type="button" onClick={restart} title="Remount the scene and play from the start">
              ⟲ Restart
            </button>
            <span className={s.group} role="group" aria-label="Speed">
              {SPEEDS.map((sp) => (
                <button key={sp} type="button" aria-pressed={rate === sp} onClick={() => setRate(sp)}>
                  {sp}×
                </button>
              ))}
            </span>
            <label className={s.check}>
              <input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} /> Loop
            </label>
            <span className={s.time}>
              {fmt(shown)} / {fmt(length)}
            </span>
          </div>

          {/* Timeline: one lane per stage; click a lane to jump to its start. */}
          <div className={s.timeline}>
            {stages.map((st) => (
              <button
                key={st.key}
                type="button"
                className={s.lane}
                onClick={() => seek(st.start)}
                title={`${st.label}: ${fmt(st.start)} → ${fmt(st.end)}`}
              >
                <span className={s.laneLabel}>{st.label}</span>
                <span className={s.track}>
                  <span
                    className={`${s.bar} ${s[`bar-${st.key}`] ?? ""}`}
                    style={{ left: pct(st.start), width: pct(Math.max(st.end - st.start, 16)) }}
                  />
                </span>
                <span className={s.laneTime}>
                  {fmt(st.start)}–{fmt(st.end)}
                </span>
              </button>
            ))}
            <span className={s.playhead} style={{ left: `calc(var(--label-w) + (100% - var(--label-w) - var(--time-w)) * ${length ? shown / length : 0})` }} />
          </div>

          <input
            className={s.scrub}
            type="range"
            min={0}
            max={Math.round(length)}
            step={1}
            value={Math.round(shown)}
            aria-label="Scrub the animation"
            onChange={(e) => {
              setPlaying(false);
              seek(Number(e.target.value));
            }}
          />

          <div className={s.row}>
            <span className={s.muted}>Show:</span>
            {PARTS.map(([p, label]) => (
              <label key={p} className={s.check}>
                <input type="checkbox" checked={!hidden[p]} onChange={(e) => setHidden((h) => ({ ...h, [p]: !e.target.checked }))} /> {label}
              </label>
            ))}
            <label className={s.check}>
              <input type="checkbox" checked={withExit} onChange={(e) => setWithExit(e.target.checked)} /> Fade-out
            </label>
            <span className={s.muted}>Space play/pause · R replay · ←/→ frame (⇧ 100ms) · H hide panel</span>
          </div>
          <p className={s.muted}>
            The bar&apos;s fill is simulated here ({SIM_FILL_MS / 1000}s); on the site it follows the page&apos;s real loading.
          </p>
        </section>
      ) : (
        <button type="button" className={s.reveal} onClick={() => setPanel(true)}>
          Show controls (H)
        </button>
      )}
    </>
  );
}
