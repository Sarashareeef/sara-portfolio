"use client";

import { useEffect, useId, useRef } from "react";

/** How long a stretch of line stays visible before it has fully faded (ms). */
const LIFE = 900;
/** Most points kept at once, which bounds the trail's length. */
const MAX = 44;
/** Minimum distance between recorded points (px). */
const STEP = 4;
/** How quickly the pencil catches up with the pointer each frame (0–1). */
const EASE = 0.3;
/** Clearance kept around the headline text and links (px). */
const PAD = 10;

const NS = "http://www.w3.org/2000/svg";

type Point = { x: number; y: number; t: number };

/**
 * A fine pencil line that follows the mouse inside its parent (the contact
 * section) and fades shortly after the pointer stops. It eases behind the
 * pointer so turns become soft curves and loops, and a soft mask lifts the
 * pencil wherever the line would cross the headline text or a link.
 *
 * Mouse and trackpad only (checked per pointer, so a tablet with a trackpad
 * gets it and a finger never does); reduced motion gets no trail.
 * Purely decorative: aria-hidden, no pointer events, passive listeners.
 */
export default function PencilTrail({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const id = `trail${useId().replace(/[^\w-]/g, "")}`;

  useEffect(() => {
    const svg = svgRef.current;
    const area = svg?.parentElement;
    // No hover at all (touch-only devices) or reduced motion: no trail.
    if (
      !svg ||
      !area ||
      !window.matchMedia("(any-hover: hover)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lines = svg.querySelector<SVGGElement>("[data-lines]")!;
    const holes = svg.querySelector<SVGGElement>("[data-holes]")!;
    // Created on the first mouse movement, so touch use never pays for them.
    let segments: SVGPathElement[] = [];

    let points: Point[] = [];
    let pen: { x: number; y: number } | null = null;
    let target: { x: number; y: number } | null = null;
    let raf = 0;

    const toLocal = (e: PointerEvent) => {
      const r = area.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    // Areas the pencil lifts over: each line of the headline text, and each link.
    const measureHoles = () => {
      const r = area.getBoundingClientRect();
      const boxes: DOMRect[] = [];
      area.querySelector("h2")?.childNodes.forEach((node) => {
        if (node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim()) return;
        const range = document.createRange();
        range.selectNodeContents(node);
        boxes.push(...range.getClientRects());
      });
      area.querySelectorAll("a").forEach((a) => boxes.push(a.getBoundingClientRect()));
      holes.replaceChildren(
        ...boxes.map((b) => {
          const rect = document.createElementNS(NS, "rect");
          rect.setAttribute("x", String(b.left - r.left - PAD));
          rect.setAttribute("y", String(b.top - r.top - PAD));
          rect.setAttribute("width", String(b.width + PAD * 2));
          rect.setAttribute("height", String(b.height + PAD * 2));
          rect.setAttribute("rx", "8");
          return rect;
        }),
      );
    };

    const draw = (now: number) => {
      segments.forEach((path, i) => {
        const a = points[i];
        const b = points[i + 1];
        if (!a || !b) {
          path.removeAttribute("d");
          return;
        }
        // Catmull-Rom through neighbouring points, as one cubic per segment.
        const p = points[i - 1] ?? a;
        const n = points[i + 2] ?? b;
        const f = (v: number) => v.toFixed(1);
        path.setAttribute(
          "d",
          `M${f(a.x)} ${f(a.y)}C${f(a.x + (b.x - p.x) / 6)} ${f(a.y + (b.y - p.y) / 6)} ${f(b.x - (n.x - a.x) / 6)} ${f(b.y - (n.y - a.y) / 6)} ${f(b.x)} ${f(b.y)}`,
        );
        const fresh = Math.max(0, 1 - (now - a.t) / LIFE);
        path.setAttribute("stroke-opacity", (0.65 * fresh * fresh).toFixed(3));
        path.setAttribute("stroke-width", (0.55 + 0.75 * fresh).toFixed(2));
      });
    };

    const tick = (now: number) => {
      raf = 0;
      if (pen && target) {
        pen.x += (target.x - pen.x) * EASE;
        pen.y += (target.y - pen.y) * EASE;
        const last = points[points.length - 1];
        if (!last || Math.hypot(pen.x - last.x, pen.y - last.y) >= STEP) {
          // A faint tremor across the direction of travel keeps it hand-drawn.
          const dx = last ? pen.x - last.x : 0;
          const dy = last ? pen.y - last.y : 0;
          const len = Math.hypot(dx, dy) || 1;
          const wobble = Math.sin(now / 70) * 0.5;
          points.push({ x: pen.x - (dy / len) * wobble, y: pen.y + (dx / len) * wobble, t: now });
          if (points.length > MAX) points = points.slice(-MAX);
        }
      }
      points = points.filter((pt) => now - pt.t < LIFE);
      draw(now);
      const catchingUp = pen && target && Math.hypot(target.x - pen.x, target.y - pen.y) > 0.5;
      if (points.length || catchingUp) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!segments.length) {
        segments = Array.from({ length: MAX - 1 }, () => lines.appendChild(document.createElementNS(NS, "path")));
      }
      measureHoles();
      pen = null;
      target = toLocal(e);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!segments.length) onEnter(e); // pointer was already inside on load
      target = toLocal(e);
      if (!pen) pen = { ...target };
      wake();
    };
    // Stop drawing; what's there fades out on its own.
    const onLeave = () => {
      pen = null;
      target = null;
      wake();
    };

    area.addEventListener("pointerenter", onEnter, { passive: true });
    area.addEventListener("pointermove", onMove, { passive: true });
    area.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      area.removeEventListener("pointerenter", onEnter);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      segments.forEach((path) => path.remove());
      holes.replaceChildren();
    };
  }, []);

  return (
    <svg ref={svgRef} className={className} aria-hidden="true" focusable="false">
      <defs>
        <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
          <rect width="100%" height="100%" fill="white" />
          <g data-holes="" fill="black" filter={`url(#${id}-soft)`} />
        </mask>
      </defs>
      <g data-lines="" mask={`url(#${id}-mask)`} fill="none" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}
