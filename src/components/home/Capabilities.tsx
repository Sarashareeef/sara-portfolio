import type { ReactNode } from "react";
import Experience from "./Experience";
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

export default function Capabilities() {
  return (
    <section className={`container ${styles.wrap}`}>
      <div className={styles.inner}>
        <p className={styles.label} data-reveal="">
          CAPABILITIES
        </p>

        <div className={styles.block} data-reveal="">
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
            <li key={cap.n} className={`${styles.card} ${styles[cap.tone]}`} data-reveal="">
              <span className={styles.badge}>{cap.n}</span>
              <h3 className={styles.cardTitle}>{cap.title}</h3>
              <p className={styles.cardBody}>{cap.body}</p>
            </li>
          ))}
        </ul>

        <Experience />
      </div>
    </section>
  );
}
