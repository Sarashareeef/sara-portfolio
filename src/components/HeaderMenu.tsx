"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/data/site";
import styles from "./Header.module.css";

/** Phone navigation: the hamburger from the phone frames, opening the same links. */
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
        className={styles.burger}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="phone-nav"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
      {open && (
        <nav id="phone-nav" aria-label="Primary" className={styles.panel}>
          <ul>
            {nav.map((item) => (
              <li key={item.label}>
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
        </nav>
      )}
    </div>
  );
}
