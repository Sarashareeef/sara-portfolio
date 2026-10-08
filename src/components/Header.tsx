import Link from "next/link";
import { nav, site } from "@/data/site";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          {site.name}
        </Link>
        <nav aria-label="Primary">
          <ul className={styles.nav}>
            {nav.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a href={item.href} className={styles.link} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
