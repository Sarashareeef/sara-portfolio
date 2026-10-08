"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./case.module.css";

export type TocItem = { id: string; label: string };

export default function CaseSidebar({ items, footer }: { items: TocItem[]; footer: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));

    // Active = the last section whose top has passed ~35% of the viewport.
    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = sections[0]?.id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarInner}>
        <nav aria-label="Case study contents">
          <p className={styles.tocTitle}>CONTENTS</p>
          <ol className={styles.toc}>
            {items.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`${styles.tocLink} ${active === item.id ? styles.tocActive : ""}`}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  <span className={styles.tocBar} />
                  <span className={styles.tocNum}>{String(i).padStart(2, "0")}</span>
                  <span className={styles.tocLabel}>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <Link href="/#work" className={`${styles.tocLink} ${styles.back}`}>
            <span className={styles.tocBar} />
            <span className={styles.tocNum}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/back.svg" alt="" width={14} height={14} />
            </span>
            <span className={styles.tocLabel}>Back to work</span>
          </Link>
        </nav>
        <p className={styles.sidebarFoot}>{footer}</p>
      </div>
    </aside>
  );
}
