import Link from "next/link";
import type { ReactNode } from "react";
import CaseSidebar, { type TocItem } from "./CaseSidebar";
import styles from "./case.module.css";

export default function CaseLayout({
  toc,
  footer = "UX CASE STUDY 2025–2026",
  children,
}: {
  toc: TocItem[];
  footer?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.page}>
      <CaseSidebar items={toc} footer={footer} />
      <article className={styles.main}>
        <Link href="/#work" className={styles.mobileBack}>
          ← BACK TO WORK
        </Link>
        {children}
      </article>
    </div>
  );
}
