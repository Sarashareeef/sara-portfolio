import styles from "./home.module.css";

export default function SectionHead({ label, aside }: { label: string; aside?: string }) {
  return (
    <div className={styles.sectionHead}>
      <p className={styles.sectionLabel}>{label}</p>
      {aside && <p className={styles.sectionAside}>{aside}</p>}
    </div>
  );
}
