import styles from "./Sketchbook.module.css";

/* A few original, hand-drawn line doodles for the sketchbook margin.
   Decorative only: each is aria-hidden and uses currentColor. */
const doodles = [
  {
    name: "flower",
    viewBox: "0 0 64 72",
    d: "M32 30c-5-9-3-17 1-18s7 7 0 18M34 31c9-6 17-4 18 0s-7 8-18 2M33 34c6 8 5 16 1 17s-8-6-2-17M30 33c-9 5-17 3-18-1s7-8 18-1M32 36c1 9-1 18 1 30M32 56c-6-6-12-5-15-2 5 3 11 4 15 2",
  },
  {
    name: "star",
    viewBox: "0 0 64 64",
    d: "M32 8.5c2.4 5.8 4.3 10.6 6.2 15.6 5.5.3 11.2.7 16.6 1.4-4.2 3.6-8.6 7.1-12.8 10.7 1.4 5.4 2.9 10.9 4.1 16.3-4.9-3-9.6-5.9-14.3-8.6-4.8 2.9-9.7 6-14.6 8.9 1.5-5.6 2.9-11.1 4.4-16.6-4.3-3.5-8.6-7-12.9-10.7 5.6-.4 11.3-.7 16.9-1.1C27.7 19 29.8 13.7 32 8.5z",
  },
  {
    name: "smiley",
    viewBox: "0 0 64 64",
    d: "M33 9.5c12.5.4 22 10.6 21.5 23S43.6 55 31.5 54.5 9.6 43.9 10 31.6 20.4 9.1 33 9.5zM25 25.5v4.5M39.5 25v4.5M22.5 38c4.5 7 14.5 7.5 19.5-.5",
  },
  {
    name: "squiggle",
    viewBox: "0 0 96 48",
    d: "M4 30c7 1 11-12 5-13s-4 13 6 13 11-13 5-13-3 13 7 13 11-13 5-13-3 13 7 13 11-13 5-13-3 13 7 13 11-13 5-13-3 13 7 13 6-6 8-9",
  },
  {
    name: "heart",
    viewBox: "0 0 64 64",
    d: "M32 51.5C19 43 10.5 34.5 12 24.5c1.3-8 12-10.6 19.5-1.8 6.8-9 18.6-7.2 20.3.7 2.1 10-6.3 18.6-19.8 28.1z",
  },
];

export default function Doodles() {
  return (
    <ul className={styles.doodles} aria-hidden="true">
      {doodles.map(({ name, viewBox, d }) => (
        <li key={name} className={styles[name]}>
          <svg viewBox={viewBox} focusable="false">
            <path d={d} />
          </svg>
        </li>
      ))}
    </ul>
  );
}
