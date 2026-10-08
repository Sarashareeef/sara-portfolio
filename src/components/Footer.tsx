import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>SARA SUHA © 2026</p>
        <Link href="/#contact" className={styles.talk}>
          LET&apos;S TALK
        </Link>
      </div>
    </footer>
  );
}
