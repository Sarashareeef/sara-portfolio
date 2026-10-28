import { site } from "@/data/site";
import PencilTrail from "./PencilTrail";
import styles from "./home.module.css";

export default function Contact() {
  return (
    <section className={`container ${styles.contact}`}>
      {/* Where /#contact lands: part-way into the top padding, so the headline,
          links and teaser all fit on screen below the header. */}
      <span id="contact" className={styles.contactAnchor} />
      {/* Canvas details: decorative only. */}
      <span className={styles.canvasGrid} aria-hidden="true" />
      <PencilTrail className={styles.trail} />
      <h2 className={styles.contactTitle} data-reveal="">
        Have a product problem worth solving? <br />
        Let’s talk.
        {/* Out of flow and hidden from assistive tech; the label is CSS text. */}
        <span className={styles.selection} aria-hidden="true">
          <span className={`${styles.handle} ${styles.tl}`} />
          <span className={`${styles.handle} ${styles.tr}`} />
          <span className={`${styles.handle} ${styles.bl}`} />
          <span className={`${styles.handle} ${styles.br}`} />
        </span>
        <svg className={styles.cursor} viewBox="0 0 16 22" aria-hidden="true" focusable="false">
          <path d="M1.5 1.5v16.2l4.2-4 2.9 6.6 2.6-1.1-2.9-6.5h5.9z" />
        </svg>
      </h2>
      <ul className={styles.contactLinks} data-reveal="">
        <li>
          <a href={site.email}>EMAIL ME</a>
        </li>
        <li>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LINKEDIN
          </a>
        </li>
        <li>
          <a href={site.behance} target="_blank" rel="noreferrer">
            BEHANCE
          </a>
        </li>
      </ul>
      {/* A quiet nudge toward the sketchbook below; out of the row's flow. */}
      <a href="#sketchbook-title" className={styles.teaser} data-reveal="">
        <span>Psst… there’s a little something below.</span>
        <span className={styles.teaserCue}>
          <svg viewBox="0 0 10 14" aria-hidden="true" focusable="false">
            <path d="M5 1v11M1.5 8.5 5 12l3.5-3.5" />
          </svg>
          KEEP SCROLLING
        </span>
      </a>
    </section>
  );
}
