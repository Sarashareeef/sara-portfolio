import type { CSSProperties, ReactNode } from "react";
import Piece from "@/components/collage/Piece";
import c from "@/components/collage/collage.module.css";
import SectionHead from "./SectionHead";
import styles from "./About.module.css";

const img = (name: string) => `/images/landing/${name}.webp`;

/** Absolutely placed caption inside a collage, in design px. */
function Note({ x, y, w, children }: { x: number; y: number; w?: number; children: ReactNode }) {
  return (
    <p className={styles.note} style={{ "--x": x, "--y": y, "--w": w ?? "auto" } as CSSProperties}>
      {children}
    </p>
  );
}

function Group({
  id,
  x,
  y,
  w,
  h,
  children,
  caption,
}: {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  children: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <figure
      className={`${styles.group} ${styles[id] ?? ""}`}
      style={{ "--gx": x, "--gy": y, "--gw": w } as CSSProperties}
    >
      <div className={c.canvas} style={{ "--cw": w, "--ch": h } as CSSProperties}>
        <div className={c.stage}>{children}</div>
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

export default function About() {
  return (
    <section id="about" className={`container ${styles.about}`}>
      <SectionHead label="ABOUT" aside="THE PERSON BEHIND THE PIXELS" />

      <div className={styles.canvas}>
        <h2 className={styles.heading}>a little about me.</h2>

        <div className={styles.bio}>
          <p>
            I’m Sara, a <strong>UI/UX</strong> and <strong>Product designer</strong> from Bengaluru who
            loves turning complex ideas into simple, thoughtful experiences. With a background in{" "}
            <strong>Computer Science &amp; Design</strong>, I enjoy working where design, technology,
            and human behaviour meet.
          </p>
          <p>
            When I’m not designing, you’ll probably find me exploring a new café or restaurant (yes, I
            have a list), wandering through museums, collecting little bits of inspiration, or hunting
            down really good ice cream.
          </p>
        </div>

        <Group id="me" x={28} y={191} w={362.63} h={357.5}>
          <Piece cx={105.5} cy={192.5} w={211} h={330} rot={-5.83} src={img("about-me1")} alt="Sara" sizes="(max-width: 1023px) 50vw, 220px" />
          <Piece cx={261.32} cy={150.22} w={186} h={290} rot={3.37} src={img("about-me2")} alt="Sara" sizes="(max-width: 1023px) 50vw, 200px" />
          <Note x={247} y={317}>me!</Note>
        </Group>

        <Group id="craft" x={945} y={174} w={337} h={523}>
          <Piece cx={224.64} cy={119.76} w={138} h={217} rot={9.92} src={img("about-craft1")} alt="" sizes="(max-width: 1023px) 40vw, 150px" />
          <Piece cx={231} cy={300} w={134} h={210} rot={-3.73} src={img("about-craft2")} alt="" sizes="(max-width: 1023px) 40vw, 150px" />
          <Note x={11} y={442} w={326}>
            <strong>collecting little creative detours</strong>
            <br />
            from painted bowls to pottery and slightly over-decorated cakes.
          </Note>
          <Piece cx={82.1} cy={119.6} w={146} h={228} rot={-4.71} src={img("about-craft3")} alt="" sizes="(max-width: 1023px) 40vw, 150px" />
          <Piece cx={89.12} cy={299.7} w={137} h={216} rot={6.98} className={c.clip} src={img("about-craft4")} crop={{ x: 0, y: -2.94, w: 137, h: 219 }} alt="" sizes="(max-width: 1023px) 40vw, 150px" />
        </Group>

        <Group id="museum" x={55} y={623} w={400} h={592.6}>
          <Piece cx={159.18} cy={435.1} w={162} h={251} rot={-3.33} src={img("about-museum3")} alt="" sizes="(max-width: 1023px) 40vw, 180px" />
          <Note x={247} y={324.29}>
            <strong>
              favourite museum
              <br />
              detours
            </strong>
          </Note>
          <Piece cx={76.21} cy={30.07} w={144} h={27} rot={-12.51}>
            <span className={styles.scribble}>Sublime galleria</span>
          </Piece>
          <Piece cx={171.65} cy={577.94} w={27} h={27} rot={-5.11}>
            <span className={styles.scribble}>MAP</span>
          </Piece>
          <Piece cx={306.49} cy={13.81} w={54} h={27} rot={-0.68}>
            <span className={styles.scribble}>Louvre</span>
          </Piece>
          <Piece cx={120.04} cy={181.58} w={183} h={286} rot={-12.39} src={img("about-museum1")} alt="" sizes="(max-width: 1023px) 45vw, 200px" />
          <Piece cx={304.7} cy={167.73} w={186} h={290} rot={0.28} src={img("about-museum2")} alt="" sizes="(max-width: 1023px) 45vw, 200px" />
        </Group>

        <Group
          id="cafe"
          x={557}
          y={698}
          w={728}
          h={530.26}
          caption={
            <>
              <strong>my very serious café research</strong>
              <br />
              for research purposes,
              <br />
              obviously.
            </>
          }
        >
          <Piece cx={314.1} cy={149.35} w={172} h={273} rot={5.69} src={img("about-cafe1")} alt="" sizes="(max-width: 1023px) 40vw, 190px" />
          <Piece cx={121.05} cy={164.29} w={188} h={298} rot={-11.11} src={img("about-cafe2")} alt="" sizes="(max-width: 1023px) 40vw, 200px" />
          <Piece cx={404.55} cy={378.63} w={181} h={290} rot={-4.49} src={img("about-cafe3")} alt="" sizes="(max-width: 1023px) 40vw, 200px" />
          <Piece cx={227} cy={385.5} w={174} h={275} src={img("about-cafe4")} alt="" sizes="(max-width: 1023px) 40vw, 190px" />
        </Group>
      </div>
    </section>
  );
}
