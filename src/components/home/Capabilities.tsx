import { site } from "@/data/site";
import styles from "./Capabilities.module.css";

const capabilities = [
  {
    n: "01",
    title: "PRODUCT DESIGN",
    body: "I frame ambiguous problems, identify opportunities, and design end-to-end digital experiences from concept to final interface.",
    tone: "lilac",
  },
  {
    n: "02",
    title: "INTERACTION",
    body: "I design intuitive flows, states, transitions, and responsive experiences that make complex interactions feel simple.",
    tone: "rose",
  },
  {
    n: "03",
    title: "RESEARCH",
    body: "Use user insights, interviews, and usability testing to uncover needs, challenge assumptions, and validate design decisions.",
    tone: "sky",
  },
  {
    n: "04",
    title: "SYSTEMS & BUILD",
    body: "Create scalable design systems and prototypes, and work closely with technical constraints through HTML/CSS, JavaScript, Python, and developer handoff.",
    tone: "sand",
  },
];

const experience = [
  {
    n: "01",
    company: "AARAMBHA INVEST",
    role: "Product Design Intern · 2025 — Present",
    tags: "Fintech · Product Design · Interaction Design",
    link: site.aarambhaWork,
  },
  {
    n: "02",
    company: "GREYSIDE",
    role: "UI/UX Design Intern · 2025",
    tags: "UI/UX · Digital Products",
  },
  {
    n: "03",
    company: "REHMAN ENTERPRISES",
    role: "Marketing Designer · 2024 — 2025",
    tags: "Visual Design · Marketing",
  },
];

export default function Capabilities() {
  return (
    <section className={`container ${styles.wrap}`}>
      <div className={styles.inner}>
        <p className={styles.label}>CAPABILITIES</p>

        <div className={styles.block}>
          <h2 className={styles.h2}>What I Do</h2>
          <p className={styles.sub}>
            Turning complex problems into thoughtful, usable product experiences.
          </p>
        </div>

        <ul className={styles.cards}>
          {capabilities.map((cap) => (
            <li key={cap.n} className={`${styles.card} ${styles[cap.tone]}`}>
              <span className={styles.badge}>{cap.n}</span>
              <h3 className={styles.cardTitle}>{cap.title}</h3>
              <p className={styles.cardBody}>{cap.body}</p>
            </li>
          ))}
        </ul>

        <div className={`${styles.block} ${styles.experienceHead}`}>
          <h2 className={styles.h2}>Experience</h2>
          <p className={styles.sub}>
            Designing across fintech, digital products, and visual communication.
          </p>
        </div>

        <ol className={styles.jobs}>
          {experience.map((job) => (
            <li key={job.n} className={styles.job}>
              <p className={styles.company}>
                {job.n} — {job.company}
              </p>
              <div>
                <p className={styles.role}>{job.role}</p>
                <p className={styles.tags}>{job.tags}</p>
                {job.link && (
                  <a href={job.link} className={styles.jobLink}>
                    View my work ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
