import DoodleBoard from "./DoodleBoard";
import Doodles from "./Doodles";
import SectionHead from "./SectionHead";
import styles from "./Sketchbook.module.css";

/** The homepage's last section: a small sketchbook to doodle in and take home. */
export default function Sketchbook() {
  return (
    <section className={`container ${styles.sketchbook}`} aria-labelledby="sketchbook-title">
      <SectionHead label="SKETCHBOOK" aside="STAYS IN YOUR BROWSER" />
      <div className={styles.layout}>
        <div className={styles.intro} data-reveal="">
          <h2 id="sketchbook-title" className={styles.title}>
            Leave a little something behind.
          </h2>
          <p className={styles.sub}>A tiny corner of the internet, just for sketches.</p>
          <p className={styles.note}>Nothing is saved or sent anywhere. Download it to keep it.</p>
          <Doodles />
        </div>
        <div data-reveal="">
          <DoodleBoard />
        </div>
      </div>
    </section>
  );
}
