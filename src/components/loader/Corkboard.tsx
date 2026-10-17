import { memo } from "react";
import styles from "./Loader.module.css";

/*
 * The loader's illustration: a small hand-drawn corkboard with three pinned
 * papers (a wireframe sheet, a lightbulb sticky note, a checklist) and a
 * metallic pushpin that flies in along a dashed curve. Inline SVG in layers, so
 * every part animates on its own and stays crisp at any size. Fine black line
 * work, pencil hatching for shade, and a faint displacement filter so the
 * lines read as drawn by hand; colour only in the cork and its frame.
 *
 * Coordinates: viewBox 560 × 480 from y = −30 (room for the pin's start). The
 * pin is drawn with its tip at (0, 0);
 * its CSS transform places it (user units = px in the viewBox).
 */

const INK = "#1b1b1b";

/* The pin's flight (its tip follows the same curve in the CSS keyframes):
   out to the right from above the board's left edge, then down into the
   top of the wireframe sheet. */
const TRAIL = "M150 56C212 38 264 92 251 166";

/* Pencil hatching under the board's left and bottom edges. */
const HATCH_BOTTOM = Array.from({ length: 56 }, (_, i) => {
  const x = 112 + i * 7;
  return `M${x} ${425 - i * 0.12}l-7 9`;
}).join("");
const HATCH_LEFT = Array.from({ length: 40 }, (_, i) => {
  const y = 142 + i * 7;
  return `M${99 - i * 0.08} ${y}l-8 8`;
}).join("");

function Pin() {
  return (
    <g transform="scale(2)">
      {/* Needle (it goes into the board on landing), base flange, neck and domed head, lit from the top left. */}
      <path className={styles.needle} d="M0 0L-1.3 -16H1.3Z" fill="#a8a8a8" stroke={INK} strokeWidth="0.7" strokeLinejoin="round" />
      <ellipse cx="0" cy="-17" rx="9" ry="3.2" fill="url(#cb-metal)" stroke={INK} strokeWidth="1" />
      <path d="M-4.6 -18C-4 -23.5 -5 -27.5 -6.4 -30H6.4C5 -27.5 4 -23.5 4.6 -18Z" fill="url(#cb-metal)" stroke={INK} strokeWidth="1" strokeLinejoin="round" />
      <ellipse cx="0" cy="-32" rx="12" ry="5.4" fill="url(#cb-metal)" stroke={INK} strokeWidth="1.1" />
      <ellipse cx="-0.6" cy="-33.4" rx="9" ry="3.3" fill="#f4f4f4" opacity="0.85" />
      <path d="M-7 -33.6C-5 -35.4 -1 -35.9 2.5 -35.5" fill="none" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M-3.4 -25.5V-20" stroke="#fff" strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />
    </g>
  );
}

function Corkboard() {
  return (
    <svg viewBox="0 -30 560 480" className={styles.art} role="presentation" focusable="false">
      <defs>
        {/* A faint wobble, so ruled lines read as drawn by hand. */}
        <filter id="cb-rough" x="-4%" y="-4%" width="108%" height="108%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* Cork: dark granules and light flecks from two noise layers, clipped to the board. */}
        <filter id="cb-cork-dark" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="3" />
          <feColorMatrix values="0 0 0 0 0.33  0 0 0 0 0.19  0 0 0 0 0.08  0 0 0 -3.2 1.75" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="cb-cork-light" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="11" />
          <feColorMatrix values="0 0 0 0 0.9  0 0 0 0 0.72  0 0 0 0 0.52  0 0 0 3 -1.62" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="cb-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <linearGradient id="cb-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#77777a" />
          <stop offset="0.34" stopColor="#f2f2f3" />
          <stop offset="0.62" stopColor="#bdbdc0" />
          <stop offset="1" stopColor="#6f6f72" />
        </linearGradient>
        <linearGradient id="cb-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d3a172" />
          <stop offset="1" stopColor="#bf8a57" />
        </linearGradient>
        {/* Reveals the dashed trajectory from the pin outwards. */}
        <mask id="cb-trail-mask" maskUnits="userSpaceOnUse" x="0" y="-30" width="560" height="480">
          <path className={styles.trailDraw} d={TRAIL} pathLength="1" fill="none" stroke="#fff" strokeWidth="8" />
        </mask>
      </defs>

      {/* ---- Board and papers: fade in, then the board takes the pin's knock. ---- */}
      <g className={styles.board} data-part="board">
        <g className={styles.nudge}>
          {/* Soft shadow and pencil hatching under the left and bottom edges. */}
          <polygon points="94,140 499,130 504,424 98,432" fill="#000" opacity="0.12" filter="url(#cb-soft)" />
          <path d={HATCH_BOTTOM + HATCH_LEFT} stroke="#8a8a8a" strokeWidth="0.7" strokeLinecap="round" opacity="0.65" />

          {/* Frame (thin wood) and cork. */}
          <polygon points="100,130 505,120 510,414 104,422" fill="url(#cb-wood)" />
          <polygon points="110,139 496,130 500,405 113,412" fill="#b77a44" />
          <polygon points="110,139 496,130 500,405 113,412" fill="#b77a44" filter="url(#cb-cork-dark)" />
          <polygon points="110,139 496,130 500,405 113,412" fill="#b77a44" filter="url(#cb-cork-light)" />
          <polygon points="110,139 496,130 500,405 113,412" fill="none" stroke="#5c3414" strokeOpacity="0.32" strokeWidth="4" />

          <g filter="url(#cb-rough)" fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round">
            {/* Wood grain on the frame strips. */}
            <path d="M118 134.5L488 125.5M120 417.5L494 410.5M105 150L108 404M504 136L507.5 398" stroke="#7a4a22" strokeOpacity="0.45" strokeWidth="0.8" />
            <polygon points="100,130 505,120 510,414 104,422" strokeWidth="1.8" />
            <polygon points="110,139 496,130 500,405 113,412" strokeWidth="1.1" />

            {/* Main sheet: a wireframe (image, two text lines, controls). */}
            <g transform="rotate(-2 246 271)">
              <rect x="150" y="166" width="200" height="222" fill="#000" stroke="none" opacity="0.14" filter="url(#cb-soft)" />
              <rect x="146" y="160" width="200" height="222" fill="#fcfbf8" strokeWidth="1.5" />
              <path d="M146 174L160 160M332 160L346 174M146 368L160 382M332 382L346 368" strokeWidth="1.1" />
              <path d="M146 174L146 160L160 160ZM346 174L346 160L332 160ZM146 368L146 382L160 382ZM346 368L346 382L332 382Z" fill="#e7e5df" strokeWidth="0.9" />
              <rect x="168" y="186" width="156" height="72" strokeWidth="1.3" />
              <rect x="173" y="191" width="146" height="62" strokeWidth="0.8" />
              <path d="M173 191L319 253M319 191L173 253" strokeWidth="1" />
              <path d="M170 284H326M170 300H312" strokeWidth="1.3" />
              <circle cx="176" cy="338" r="4.2" strokeWidth="1.2" />
              <circle cx="191" cy="338" r="4.2" strokeWidth="1.2" />
              <circle cx="206" cy="338" r="4.2" strokeWidth="1.2" />
            </g>

            {/* Sticky note with a lightbulb, held by a strip of tape. */}
            <g transform="rotate(1.5 417 213)">
              <rect x="374" y="174" width="94" height="90" fill="#000" stroke="none" opacity="0.12" filter="url(#cb-soft)" />
              <rect x="370" y="168" width="94" height="90" fill="#fcfbf8" strokeWidth="1.4" />
              <path d="M370 250L378 258M464 250L456 258" strokeWidth="0.9" />
              <rect x="402" y="160" width="30" height="15" fill="#efefef" stroke="#8a8a8a" strokeWidth="0.8" transform="rotate(-4 417 167)" />
              <path d="M411.5 214.5A9 9 0 1 1 422.5 214.5L421.5 221H412.5Z" strokeWidth="1.2" />
              <path d="M413 224H421M414 227H420M414.5 211.5L417 214.5L419.5 211.5" strokeWidth="1.1" />
              <path d="M417 191.5V186M405.5 196L401.5 192.5M428.5 196L432.5 192.5M402 207.5H396.5M432 207.5H437.5" strokeWidth="1.1" />
            </g>

            {/* Checklist torn from a spiral notebook, overlapping the board's edge. */}
            <g transform="rotate(4 455 355)">
              <rect x="376" y="288" width="163" height="146" fill="#000" stroke="none" opacity="0.14" filter="url(#cb-soft)" />
              <rect x="372" y="282" width="163" height="146" fill="#fcfbf8" strokeWidth="1.4" />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <circle key={i} cx="380.5" cy={297 + i * 23} r="3.4" fill="#fff" strokeWidth="1" />
              ))}
              {[0, 1, 2].map((i) => (
                <g key={i}>
                  <rect x="394" y={302 + i * 36} width="12.5" height="12.5" rx="1.5" strokeWidth="1.3" />
                  <path d={`M414 ${309 + i * 36}H514`} strokeWidth="1.2" />
                </g>
              ))}
            </g>
          </g>
        </g>
      </g>

      {/* ---- The pin's flight: motion arcs, the dashed path, the pin, the knock. ---- */}
      <g data-part="pin">
        <g className={styles.trail}>
          <path d={TRAIL} fill="none" stroke={INK} strokeWidth="1.3" strokeDasharray="4 5" strokeLinecap="round" mask="url(#cb-trail-mask)" />
          <path d="M66 6C60 14 60 24 66 32M53 -1C45 11 45 27 53 39" fill="none" stroke={INK} strokeWidth="1.3" strokeLinecap="round" />
        </g>
        <g className={styles.ticks} fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round">
          <path d="M492 98L496 84M506 102L516 80M518 110L532 102" />
          <path d="M80 400H94M86 420L96 410" />
        </g>
        <g className={styles.pin}>
          <Pin />
        </g>
      </g>
    </svg>
  );
}

/** Static markup: rendered once, never re-rendered as the progress updates. */
export default memo(Corkboard);
