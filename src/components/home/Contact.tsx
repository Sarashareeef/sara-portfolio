import { site } from "@/data/site";
import styles from "./home.module.css";

export default function Contact() {
  return (
    <section id="contact" className={`container ${styles.contact}`}>
      <h2 className={styles.contactTitle}>
        Have a product problem worth solving? <br />
        Let’s talk.
      </h2>
      <ul className={styles.contactLinks}>
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
    </section>
  );
}
