"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { nav } from "@/data/site";
import styles from "./Header.module.css";

/**
 * Phone navigation: the hamburger from the phone frames, opening the same links.
 * The panel stays mounted so it can animate both ways (Header.module.css): the
 * bars morph into a cross, the panel unfolds, the links settle in one by one.
 * While closed it is inert, so it's out of the tab order and hidden from
 * assistive tech.
 */
export default function HeaderMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={styles.menu}>
      <button
        type="button"
        className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="phone-nav"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav id="phone-nav" aria-label="Primary" className={styles.panel} data-open={open || undefined} inert={!open}>
        <div className={styles.panelInner}>
          <ul>
            {nav.map((item, i) => (
              <li key={item.label} style={{ "--i": i } as CSSProperties}>
                {item.external ? (
                  <a href={item.href} className={styles.link} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className={styles.link} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
