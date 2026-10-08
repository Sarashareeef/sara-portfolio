import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import styles from "./collage.module.css";

type PieceProps = {
  /** Centre of the element in design px (relative to the collage canvas). */
  cx: number;
  cy: number;
  /** Unrotated size in design px. */
  w: number;
  h: number;
  rot?: number;
  flipY?: boolean;
  opacity?: number;
  src?: string;
  alt?: string;
  /** Image crop inside the piece, in design px (for clipped layers). */
  crop?: { x: number; y: number; w: number; h: number };
  sizes?: string;
  eager?: boolean;
  className?: string;
  children?: ReactNode;
};

/**
 * A positioned, optionally rotated layer inside a collage canvas.
 * All values are design px and scale with the canvas through `--u`.
 */
export default function Piece({
  cx,
  cy,
  w,
  h,
  rot = 0,
  flipY,
  opacity,
  src,
  alt = "",
  crop,
  sizes = "25vw",
  eager,
  className,
  children,
}: PieceProps) {
  const style = {
    "--x": cx - w / 2,
    "--y": cy - h / 2,
    "--w": w,
    "--h": h,
    transform: `rotate(${rot}deg)${flipY ? " scaleY(-1)" : ""}`,
    opacity,
  } as CSSProperties;

  return (
    <div className={`${styles.piece} ${className ?? ""}`} style={style}>
      {src && !crop && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={styles.cover}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
        />
      )}
      {src && crop && (
        <div
          className={styles.crop}
          style={
            {
              "--kx": crop.x,
              "--ky": crop.y,
              "--kw": crop.w,
              "--kh": crop.h,
            } as CSSProperties
          }
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={styles.cover}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
          />
        </div>
      )}
      {children}
    </div>
  );
}
