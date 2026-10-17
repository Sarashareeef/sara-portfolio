import type { ReactNode } from "react";
import { site } from "@/data/site";
import styles from "./Capabilities.module.css";

/** Copy that the desktop frame words differently from the tablet and phone frames. */
const Swap = ({ d, m }: { d: ReactNode; m: ReactNode }) => (
  <>
    <span className={styles.dOnly}>{d}</span>
    <span className={styles.mOnly}>{m}</span>
  </>
);

const capabilities = [
  {
    n: "01",
    title: "PRODUCT DESIGN",
    body: (
      <Swap
        d="I frame ambiguous problems, identify opportunities, and design end-to-end digital experiences from concept to final interface."
        m="Frame ambiguous problems, identify opportunities, and design end-to-end digital experiences from concept to final product."
      />
    ),
    tone: "lilac",
  },
  {
    n: "02",
    title: "INTERACTION",
    body: (
      <Swap
        d="I design intuitive flows, states, transitions, and responsive experiences that make complex interactions feel simple."
        m="Design complex flows, states, transitions, and responsive experiences that make products feel intuitive and easy to use."
      />
    ),
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
    title: <Swap d="SYSTEMS & BUILD" m="SYSTEMS & PROTOTYPING" />,
    body: (
      <Swap
        d="Create scalable design systems and prototypes, and work closely with technical constraints through HTML/CSS, JavaScript, Python, and developer handoff."
        m="Create scalable design systems and high-fidelity prototypes, with technical fluency in HTML/CSS, JavaScript, Python, and developer handoff."
      />
    ),
    tone: "sand",
  },
];

const experience = [
  {
    n: "01",
    sep: "-",
    company: "AARAMBHA INVEST",
    role: "Product Design Intern · 2025 — Present",
    tags: "Fintech · Product Design · Interaction Design",
    link: site.aarambhaWork,
  },
  {
    n: "02",
    sep: "—",
    company: "GREYSIDE",
    role: "UI/UX Design Intern · 2025",
    tags: "UI/UX · Digital Products",
  },
  {
    n: "03",
    sep: "—",
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
            <Swap
              d="Turning complex problems into thoughtful, usable product experiences."
              m="Designing across fintech, digital products, and visual communication."
            />
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
            <Swap
              d="Designing across fintech, digital products, and visual communication."
              m="A little timeline of where I’ve been designing, learning, and growing."
            />
          </p>
        </div>

        <ol className={styles.jobs}>
          {experience.map((job) => (
            <li key={job.n} className={styles.job}>
              <p className={styles.company}>
                {job.n} {job.sep} {job.company}
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
