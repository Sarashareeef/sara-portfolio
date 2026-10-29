import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>SARA SUHA © 2026</p>
        {/* Same target as the header's CONTACT: Lenis scrolls there on the homepage
            (offset for the sticky header); other pages open the homepage at it. */}
        <Link href="/#contact" className={styles.talk}>
          LET&apos;S TALK
        </Link>
      </div>
    </footer>
  );
}
