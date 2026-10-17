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
              {/* The back.svg arrow, inline so it takes the link's colour on hover/focus. */}
              <svg className={styles.backIcon} width={14} height={14} viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                <path d="M3.0625 6.5625H11.8125C11.9285 6.5625 12.0398 6.60859 12.1219 6.69064C12.2039 6.77269 12.25 6.88397 12.25 7C12.25 7.11603 12.2039 7.22731 12.1219 7.30936C12.0398 7.39141 11.9285 7.4375 11.8125 7.4375H3.0625C2.94647 7.4375 2.83519 7.39141 2.75314 7.30936C2.67109 7.22731 2.625 7.11603 2.625 7C2.625 6.88397 2.67109 6.77269 2.75314 6.69064C2.83519 6.60859 2.94647 6.5625 3.0625 6.5625Z" />
                <path d="M3.24297 7L6.87285 10.6271C6.91361 10.6679 6.94594 10.7163 6.96799 10.7695C6.99005 10.8228 7.0014 10.8799 7.0014 10.9375C7.0014 10.9951 6.99005 11.0522 6.96799 11.1055C6.94594 11.1587 6.91361 11.2071 6.87285 11.2479C6.8321 11.2886 6.78371 11.3209 6.73046 11.343C6.67721 11.3651 6.62014 11.3764 6.5625 11.3764C6.50486 11.3764 6.44779 11.3651 6.39454 11.343C6.34129 11.3209 6.2929 11.2886 6.25215 11.2479L2.31465 7.31035C2.27372 7.26969 2.24125 7.22134 2.21908 7.16807C2.19692 7.11481 2.18551 7.05769 2.18551 7C2.18551 6.94231 2.19692 6.88519 2.21908 6.83193C2.24125 6.77866 2.27372 6.73031 2.31465 6.68965L6.25215 2.75215C6.2929 2.71139 6.34129 2.67906 6.39454 2.65701C6.44779 2.63495 6.50486 2.6236 6.5625 2.6236C6.62014 2.6236 6.67721 2.63495 6.73046 2.65701C6.78371 2.67906 6.8321 2.71139 6.87285 2.75215C6.91361 2.7929 6.94594 2.84129 6.96799 2.89454C6.99005 2.94779 7.0014 3.00486 7.0014 3.0625C7.0014 3.12014 6.99005 3.17721 6.96799 3.23046C6.94594 3.28371 6.91361 3.3321 6.87285 3.37285L3.24297 7Z" />
              </svg>
            </span>
            <span className={styles.tocLabel}>Back to work</span>
          </Link>
        </nav>
        <p className={styles.sidebarFoot}>{footer}</p>
      </div>
    </aside>
  );
}
