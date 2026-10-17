import { site } from "@/data/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>SARA SUHA © 2026</p>
        <a href={site.email} className={styles.talk}>
          LET&apos;S TALK
        </a>
      </div>
    </footer>
  );
}
