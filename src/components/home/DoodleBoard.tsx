"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import styles from "./Sketchbook.module.css";

type Tool = "pencil" | "eraser";
/** A stroke in board space: flat [x0, y0, x1, y1, …], in its own colour. */
type Stroke = { tool: Tool; width: number; color: string; points: number[] };
type Action = { kind: "stroke"; stroke: Stroke } | { kind: "clear" };
type Api = { undo: () => void; clear: () => void; download: () => void };

const INK = "#27231f";
const PAPER = "#fbf9f5";
/** Pencil colours, around the wheel: the original ink, warm, pastel and cool shades. */
const COLORS = [
  { name: "Ink", value: INK },
  { name: "Terracotta", value: "#c4573a" },
  { name: "Marigold", value: "#e09a2b" },
  { name: "Butter", value: "#eccb5f" },
  { name: "Sage", value: "#8db894" },
  { name: "Forest", value: "#2f7a4f" },
  { name: "Sky", value: "#79b6df" },
  { name: "Cobalt", value: "#2f5fd0" },
  { name: "Lavender", value: "#a991d6" },
  { name: "Plum", value: "#6d3b8c" },
  { name: "Rose", value: "#e0708f" },
  { name: "Blush", value: "#efa9bb" },
] as const;
const WIDTHS: Record<Tool, number> = { pencil: 2.4, eraser: 22 };
const FILENAME = "my-doodle.png";

/** Strokes currently on the page: everything after the last "clear". */
const visibleStrokes = (history: Action[]) => {
  const from = history.findLastIndex((a) => a.kind === "clear") + 1;
  return history.slice(from).flatMap((a) => (a.kind === "stroke" ? [a.stroke] : []));
};

/** One stroke as a smooth path: quadratic curves through the midpoints. */
function paint(ctx: CanvasRenderingContext2D, { tool, width, color, points: p }: Stroke) {
  ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
  ctx.strokeStyle = ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = ctx.lineJoin = "round";
  ctx.beginPath();
  if (p.length <= 2) {
    ctx.arc(p[0], p[1], width / 2, 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  ctx.moveTo(p[0], p[1]);
  for (let i = 2; i < p.length - 2; i += 2) {
    ctx.quadraticCurveTo(p[i], p[i + 1], (p[i] + p[i + 2]) / 2, (p[i + 1] + p[i + 3]) / 2);
  }
  ctx.lineTo(p[p.length - 2], p[p.length - 1]);
  ctx.stroke();
}

/**
 * The sketchbook's drawing board: pencil, eraser, undo, clear and PNG download.
 * Drawings live only in this page's memory: nothing is stored or uploaded.
 *
 * Two stacked canvases: finished strokes go onto the base once; the stroke
 * being drawn is redrawn on the live layer each frame. Strokes are kept as
 * data, so undo, clear and resizing simply repaint at the current pixel ratio.
 */
export default function DoodleBoard() {
  const baseRef = useRef<HTMLCanvasElement>(null);
  const liveRef = useRef<HTMLCanvasElement>(null);
  const toolRef = useRef<Tool>("pencil");
  const colorRef = useRef<string>(INK);
  const apiRef = useRef<Api | null>(null);
  const [tool, setTool] = useState<Tool>("pencil");
  const [color, setColor] = useState<string>(INK);
  const [canUndo, setCanUndo] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const base = baseRef.current!;
    const live = liveRef.current!;
    const bctx = base.getContext("2d")!;
    const lctx = live.getContext("2d")!;

    const history: Action[] = [];
    /** The board size when drawing began; later sizes scale it to fit. */
    let space: { w: number; h: number } | null = null;
    let view = { dpr: 1, s: 1, ox: 0, oy: 0, w: 0, h: 0 };
    let current: Stroke | null = null;
    let active: number | null = null;
    let rect: DOMRect | null = null;
    let frame = 0;

    const sync = () => {
      const strokes = visibleStrokes(history);
      setCanUndo(history.length > 0);
      setEmpty(!strokes.some((s) => s.tool === "pencil"));
    };

    const applyView = (ctx: CanvasRenderingContext2D) => {
      const { dpr, s, ox, oy } = view;
      ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * ox, dpr * oy);
    };

    const repaintBase = () => {
      bctx.setTransform(1, 0, 0, 1, 0, 0);
      bctx.clearRect(0, 0, base.width, base.height);
      applyView(bctx);
      visibleStrokes(history).forEach((stroke) => paint(bctx, stroke));
      bctx.globalCompositeOperation = "source-over";
    };

    const repaintLive = () => {
      frame = 0;
      lctx.setTransform(1, 0, 0, 1, 0, 0);
      lctx.clearRect(0, 0, live.width, live.height);
      if (current?.tool === "pencil") {
        applyView(lctx);
        paint(lctx, current);
      }
    };
    const scheduleLive = () => {
      if (!frame) frame = requestAnimationFrame(repaintLive);
    };

    const resize = () => {
      const { width, height } = live.getBoundingClientRect();
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      for (const c of [base, live]) {
        c.width = Math.round(width * dpr);
        c.height = Math.round(height * dpr);
      }
      const s = space ? Math.min(width / space.w, height / space.h) : 1;
      view = {
        dpr,
        s,
        ox: space ? (width - space.w * s) / 2 : 0,
        oy: space ? (height - space.h * s) / 2 : 0,
        w: width,
        h: height,
      };
      repaintBase();
      repaintLive();
    };

    const toBoard = (e: PointerEvent) => [
      (e.clientX - rect!.left - view.ox) / view.s,
      (e.clientY - rect!.top - view.oy) / view.s,
    ];

    const finish = () => {
      if (active === null || !current) return;
      if (live.hasPointerCapture(active)) live.releasePointerCapture(active);
      if (current.tool === "pencil") {
        applyView(bctx);
        paint(bctx, current);
        bctx.globalCompositeOperation = "source-over";
      }
      history.push({ kind: "stroke", stroke: current });
      current = null;
      active = null;
      repaintLive();
      setStatus("");
      sync();
    };

    const onDown = (e: PointerEvent) => {
      if (active !== null || (e.pointerType === "mouse" && e.button !== 0)) return;
      e.preventDefault();
      live.setPointerCapture(e.pointerId);
      active = e.pointerId;
      rect = live.getBoundingClientRect();
      if (!space) {
        space = { w: view.w, h: view.h };
        view = { ...view, s: 1, ox: 0, oy: 0 };
      }
      const t = toolRef.current;
      current = { tool: t, width: WIDTHS[t], color: colorRef.current, points: toBoard(e) };
      if (t === "eraser") {
        applyView(bctx);
        paint(bctx, current);
        bctx.globalCompositeOperation = "source-over";
      }
      scheduleLive();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== active || !current) return;
      const p = current.points;
      for (const ev of e.getCoalescedEvents?.() ?? [e]) {
        const [x, y] = toBoard(ev);
        const lx = p[p.length - 2];
        const ly = p[p.length - 1];
        if (Math.hypot(x - lx, y - ly) < 0.75) continue;
        p.push(x, y);
        // The eraser works straight on the base, so you see it as you go.
        if (current.tool === "eraser") {
          applyView(bctx);
          paint(bctx, { ...current, points: [lx, ly, x, y] });
          bctx.globalCompositeOperation = "source-over";
        }
      }
      scheduleLive();
    };

    live.addEventListener("pointerdown", onDown);
    live.addEventListener("pointermove", onMove);
    live.addEventListener("pointerup", finish);
    live.addEventListener("pointercancel", finish);
    live.addEventListener("lostpointercapture", finish);

    let resizeFrame = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(resize);
    });
    ro.observe(live);
    // Pixel ratio changes (browser zoom, moving between screens) keep strokes sharp.
    const dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    dprQuery.addEventListener("change", resize);
    resize();

    apiRef.current = {
      undo: () => {
        if (!history.length) return;
        history.pop();
        if (!history.length) space = null;
        resize();
        setStatus("");
        sync();
      },
      clear: () => {
        if (!visibleStrokes(history).length) return;
        history.push({ kind: "clear" });
        repaintBase();
        setStatus("Cleared. Undo brings it back.");
        sync();
      },
      download: () => {
        if (!visibleStrokes(history).some((s) => s.tool === "pencil")) return;
        const out = document.createElement("canvas");
        out.width = base.width;
        out.height = base.height;
        const octx = out.getContext("2d")!;
        octx.fillStyle = PAPER;
        octx.fillRect(0, 0, out.width, out.height);
        octx.drawImage(base, 0, 0);
        out.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = FILENAME;
          a.click();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
          setStatus(`Saved as ${FILENAME}.`);
        }, "image/png");
      },
    };

    return () => {
      apiRef.current = null;
      live.removeEventListener("pointerdown", onDown);
      live.removeEventListener("pointermove", onMove);
      live.removeEventListener("pointerup", finish);
      live.removeEventListener("pointercancel", finish);
      live.removeEventListener("lostpointercapture", finish);
      dprQuery.removeEventListener("change", resize);
      ro.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
    };
  }, []);

  const choose = (t: Tool) => {
    toolRef.current = t;
    setTool(t);
  };

  // Picking a colour picks it up with the pencil (even from the eraser).
  const pickColor = (value: string) => {
    colorRef.current = value;
    setColor(value);
    choose("pencil");
  };

  // Palette is one radio group: arrows move (and select) along it, Home/End jump.
  const onPaletteKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = COLORS.findIndex((c) => c.value === color);
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    const next = step !== undefined ? (i + step + COLORS.length) % COLORS.length : e.key === "Home" ? 0 : e.key === "End" ? COLORS.length - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    pickColor(COLORS[next].value);
    e.currentTarget.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  };

  // Ctrl/Cmd+Z undoes, but only while focus is inside the board.
  const onKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === "z") {
      e.preventDefault();
      apiRef.current?.undo();
    }
  };

  return (
    <div className={styles.board} data-empty={empty || undefined} data-tool={tool} onKeyDown={onKeyDown}>
      <div className={styles.paper}>
        <canvas ref={baseRef} className={styles.canvas} aria-hidden="true" />
        <canvas
          ref={liveRef}
          className={`${styles.canvas} ${styles.surface}`}
          role="img"
          aria-label="Drawing area. Draw with a mouse, trackpad, finger or stylus."
        />
        <p className={styles.hint} aria-hidden="true">
          Draw anything here
        </p>
      </div>

      <div className={styles.palette}>
        <span className={styles.paletteLabel} id="doodle-colour">
          Colour
        </span>
        <div className={styles.swatches} role="radiogroup" aria-labelledby="doodle-colour" onKeyDown={onPaletteKey}>
          {COLORS.map((c) => {
            const on = c.value === color;
            return (
              <button
                key={c.value}
                type="button"
                role="radio"
                aria-checked={on}
                aria-label={c.name}
                title={c.name}
                tabIndex={on ? 0 : -1}
                className={styles.swatch}
                style={{ "--swatch": c.value } as CSSProperties}
                onClick={() => pickColor(c.value)}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.toolbar} role="toolbar" aria-label="Drawing tools">
        <div className={styles.group}>
          <ToolButton label="Pencil" pressed={tool === "pencil"} onClick={() => choose("pencil")} icon={icons.pencil} />
          <ToolButton label="Eraser" pressed={tool === "eraser"} onClick={() => choose("eraser")} icon={icons.eraser} />
          <span className={styles.divider} aria-hidden="true" />
          <ToolButton label="Undo" disabled={!canUndo} onClick={() => apiRef.current?.undo()} icon={icons.undo} />
          <ToolButton label="Clear" disabled={empty} onClick={() => apiRef.current?.clear()} icon={icons.clear} />
        </div>
        <p className={styles.status} role="status">
          {status}
        </p>
        <ToolButton
          label="Download"
          primary
          disabled={empty}
          title={empty ? "Draw something first" : `Download as ${FILENAME}`}
          onClick={() => apiRef.current?.download()}
          icon={icons.download}
        />
      </div>
    </div>
  );
}

function ToolButton({
  label,
  icon,
  onClick,
  pressed,
  disabled,
  primary,
  title,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  pressed?: boolean;
  disabled?: boolean;
  primary?: boolean;
  title?: string;
}) {
  return (
    <button
      type="button"
      className={`${styles.tool} ${primary ? styles.primary : ""}`}
      aria-pressed={pressed}
      disabled={disabled}
      title={title}
      onClick={onClick}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        {icon}
      </svg>
      <span className={styles.toolLabel}>{label}</span>
    </button>
  );
}

const icons = {
  pencil: <path d="M2.5 13.5l.8-3.3 7.6-7.6 2.5 2.5-7.6 7.6zM9.6 3.9l2.5 2.5" />,
  eraser: <path d="M6.2 13.5h7.3M2.6 9.9l6.3-6.3a1.3 1.3 0 011.8 0l2.4 2.4a1.3 1.3 0 010 1.8l-6.1 6.1H5.9zM5.8 6.7l4.2 4.2" />,
  undo: <path d="M5.5 3.5 2.5 6.5l3 3M2.5 6.5h7a4 4 0 010 8h-3" />,
  clear: <path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.4 4.5l.7 9h5.8l.7-9" />,
  download: <path d="M8 2.5v8M4.8 7.3 8 10.5l3.2-3.2M3 13.5h10" />,
};
