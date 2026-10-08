import type { CSSProperties } from "react";
import Piece from "@/components/collage/Piece";
import Draggable from "@/components/collage/Draggable";
import c from "@/components/collage/collage.module.css";
import styles from "./Hero.module.css";

const img = (name: string) => `/images/landing/${name}.webp`;

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="intro">
      <div className={styles.boardWrap}>
        <div className={c.canvas} style={{ "--cw": 1296, "--ch": 729 } as CSSProperties}>
          <div className={c.stage} data-stage>
            <Piece cx={648} cy={364.5} w={1296} h={729} src={img("hero-board")} sizes="(max-width: 1440px) 90vw, 1296px" eager />

            {/* Inner board area — everything pinned to the cork is clipped to it. */}
            <Piece cx={647.5} cy={364} w={1239} h={674} className={c.clip}>
              <Draggable designWidth={1296}>
                <Piece cx={1106} cy={142.51} w={143} h={195} rot={14.77} className={c.clip} src={img("hero-stamp")} crop={{ x: -47, y: -23, w: 240, h: 231 }} sizes="20vw" eager />
              </Draggable>
              <Draggable designWidth={1296}>
                <Piece cx={597.04} cy={568.61} w={174} h={159} rot={-8.39} src={img("hero-frame")} sizes="15vw" />
              </Draggable>
              <Draggable designWidth={1296}>
                <Piece cx={642} cy={284.5} w={740} h={383} className={c.clip}>
                  <Piece cx={290.5} cy={201.5} w={581} h={387} src={img("hero-paper")} sizes="45vw" eager />
                  <div className={styles.note}>
                    <h1 id="intro" className={styles.noteTitle}>
                      <span>HI, I&apos;M SARA SUHA</span>
                      <span>UI/UX &amp; PRODUCT DESIGNER</span>
                    </h1>
                    <p className={styles.noteLead}>
                      Product Designer turning complex problems into clear, intuitive digital experiences.
                    </p>
                    <p className={styles.noteTags}>UI/UX · PRODUCT · INTERACTION · RESEARCH</p>
                  </div>
                  <Piece cx={589.84} cy={199.6} w={211} h={335} rot={-10.34} src={img("hero-polaroid")} sizes="18vw" eager />
                  <Piece cx={482.49} cy={70} w={117} h={88} className={c.clip}>
                    <Piece cx={42.85} cy={45.59} w={108} h={72} rot={169.06} flipY src={img("hero-small")} sizes="10vw" />
                  </Piece>
                </Piece>
              </Draggable>
              <Draggable designWidth={1296}>
                <Piece cx={655.5} cy={62.5} w={491} h={93} opacity={0.9} className={c.clip} src={img("hero-concert")} crop={{ x: 0, y: -42.5, w: 491, h: 164 }} sizes="40vw" eager />
              </Draggable>
              <Draggable designWidth={1296}>
                <Piece cx={1108.72} cy={508.26} w={300} h={275} rot={13.87} opacity={0.9} src={img("hero-camera")} sizes="25vw" />
              </Draggable>
              <Draggable designWidth={1296}>
                <Piece cx={155} cy={100.5} w={310} h={149} opacity={0.9} className={c.clip} src={img("hero-topleft")} crop={{ x: 13.99, y: 0, w: 286, h: 143 }} sizes="25vw" eager />
              </Draggable>
              <Draggable designWidth={1296}>
                <Piece cx={849} cy={559.99} w={332} h={208} src={img("hero-bottomcenter")} sizes="25vw" />
              </Draggable>
              <Draggable designWidth={1296}>
                <Piece cx={258.62} cy={569.28} w={483} h={203} src={img("hero-map")} sizes="40vw" />
              </Draggable>
              <Draggable designWidth={1296}>
                <Piece cx={153.5} cy={317.24} w={211} h={316} src={img("hero-left")} sizes="18vw" />
              </Draggable>
              <Draggable designWidth={1296}>
                <Piece cx={1112.59} cy={285.27} w={225} h={150} rot={-7.51} opacity={0.85} src={img("hero-right")} crop={{ x: -0.02, y: 5.89, w: 225, h: 150 }} sizes="20vw" />
              </Draggable>
            </Piece>
          </div>
        </div>
      </div>

      {/* Small screens: the note on the board is too small to read, so repeat it below. */}
      <div className={styles.mobileIntro} aria-hidden="true">
        <p className={styles.mobileTitle}>
          HI, I&apos;M SARA SUHA
          <br />
          UI/UX &amp; PRODUCT DESIGNER
        </p>
        <p className={styles.mobileLead}>
          Product Designer turning complex problems into clear, intuitive digital experiences.
        </p>
        <p className={styles.mobileTags}>UI/UX · PRODUCT · INTERACTION · RESEARCH</p>
      </div>
    </section>
  );
}
