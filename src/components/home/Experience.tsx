import { site } from "@/data/site";
import styles from "./Experience.module.css";

const roles = [
  {
    n: "01",
    company: "Aarambha Invest",
    role: "Product Design Intern",
    dates: "2025 – Present",
    tags: ["Fintech", "Product Design", "Interaction Design"],
    link: site.aarambhaWork,
  },
  {
    n: "02",
    company: "Greyside",
    role: "UI/UX Design Intern",
    dates: "2025",
    tags: ["UI/UX", "Digital Products"],
  },
  {
    n: "03",
    company: "Rehman Enterprises",
    role: "Marketing Designer",
    dates: "2024 – 2025",
    tags: ["Visual Design", "Marketing"],
  },
];

/** Experience: oversized serif numbers, a hairline divider, then company, role, dates and focus tags. */
export default function Experience() {
  return (
    <div className={styles.experience}>
      <div className={styles.head}>
        <h2 className={styles.h2}>Experience</h2>
        <p className={styles.sub}>Designing across fintech, digital products, and visual communication.</p>
      </div>

      <ol className={styles.list}>
        {roles.map((r) => (
          <li key={r.n} className={styles.row}>
            <span className={styles.num} aria-hidden="true">
              {r.n}
            </span>
            <div className={styles.body}>
              <div className={styles.main}>
                <p className={styles.company}>{r.company}</p>
                <h3 className={styles.role}>{r.role}</h3>
                <ul className={styles.tags} aria-label="Focus">
                  {r.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.aside}>
                <p className={styles.dates}>{r.dates}</p>
                {r.link && (
                  <a href={r.link} className={styles.link}>
                    <span className={styles.linkText}>View my work</span>
                    <span className={styles.arrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
