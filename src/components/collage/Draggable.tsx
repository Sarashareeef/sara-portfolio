"use client";

import { useRef, useState, type ReactNode, type PointerEvent } from "react";
import styles from "./collage.module.css";

let topZ = 10;

/**
 * Makes a collage layer draggable. Offsets are stored in design px so a moved
 * sticker stays in place relative to the board when the viewport resizes.
 * Double-click puts it back where it was.
 */
export default function Draggable({ designWidth, children }: { designWidth: number; children: ReactNode }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [z, setZ] = useState<number | undefined>();
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ px: number; py: number; ox: number; oy: number; u: number } | null>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const stage = e.currentTarget.closest("[data-stage]") as HTMLElement | null;
    const u = (stage?.clientWidth ?? designWidth) / designWidth;
    start.current = { px: e.clientX, py: e.clientY, ox: offset.x, oy: offset.y, u };
    (e.target as Element).setPointerCapture(e.pointerId);
    setZ(++topZ);
    setDragging(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const s = start.current;
    if (!s) return;
    setOffset({ x: s.ox + (e.clientX - s.px) / s.u, y: s.oy + (e.clientY - s.py) / s.u });
  };

  const end = () => {
    start.current = null;
    setDragging(false);
  };

  return (
    <div
      className={`${styles.drag} ${dragging ? styles.dragging : ""}`}
      style={{
        transform: `translate(calc(${offset.x} * var(--u)), calc(${offset.y} * var(--u)))`,
        zIndex: z,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      onDoubleClick={() => setOffset({ x: 0, y: 0 })}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}
