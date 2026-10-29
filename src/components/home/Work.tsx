import { projects } from "@/data/projects";
import FolderCard from "./FolderCard";
import FolderPlayer from "./FolderPlayer";
import SectionHead from "./SectionHead";
import styles from "./home.module.css";

export default function Work() {
  return (
    <section id="work" className={`container ${styles.work}`}>
      <SectionHead label="WORK" aside="01 — 04" />
      <h2 className={styles.display} data-reveal="">case studies</h2>
      <div className={styles.metaRow} data-reveal="">
        <p>SARA&apos;S PROJECT FILES</p>
        <p>SELECTED WORK</p>
      </div>
      <div className={styles.grid}>
        {projects.map((p) => (
          <FolderCard key={p.slug} project={p} />
        ))}
      </div>
      <FolderPlayer />
    </section>
  );
}
