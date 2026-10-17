import type { CSSProperties, ReactNode } from "react";
import Piece from "@/components/collage/Piece";
import c from "@/components/collage/collage.module.css";
import SectionHead from "./SectionHead";
import Words, { wordCount } from "./Words";
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
      data-reveal=""
      style={{ "--gx": x, "--gy": y, "--gw": w } as CSSProperties}
    >
      <div className={c.canvas} style={{ "--cw": w, "--ch": h } as CSSProperties}>
        <div className={c.stage}>{children}</div>
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

/** Text in the tablet / phone collages: position, width, size and leading in design px. */
function T({
  x,
  y,
  w,
  fs,
  lh,
  ls,
  className,
  children,
}: {
  x: number;
  y: number;
  w?: number;
  fs: number;
  lh: number;
  ls?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={`${styles.t} ${w ? styles.wrap : ""} ${className ?? ""}`}
      style={{ "--x": x, "--y": y, "--w": w ?? "auto", "--fs": fs, "--lh": lh, "--ls": ls ?? 0 } as CSSProperties}
    >
      {children}
    </p>
  );
}

/** Rotated scribble ("Sublime galleria", "MAP") in the tablet / phone collages. */
function Scribble({ cx, cy, w, fs, lh, rot, children }: { cx: number; cy: number; w: number; fs: number; lh: number; rot: number; children: ReactNode }) {
  return (
    <Piece cx={cx} cy={cy} w={w} h={lh} rot={rot}>
      <span className={styles.scribbleR} style={{ "--fs": fs, "--lh": lh } as CSSProperties}>
        {children}
      </span>
    </Piece>
  );
}

const bioIntro = (
  <>
    I’m Sara, a <strong>UI/UX</strong> and <strong>Product designer</strong> from Bengaluru who loves
    turning complex ideas into simple, thoughtful experiences. With a background in{" "}
    <strong>Computer Science &amp; Design Engineering</strong>, I enjoy working where design,
    technology, and human behaviour meet.
  </>
);

const bioMore =
  "When I’m not designing, you’ll probably find me exploring a new café or a restaurant (yes, I have a list), wandering through museums, collecting little bits of inspiration, or hunting down really good ice cream.";

/* Tablet frame (2:7455): one 695.77-wide composition below the section head. */
function TabletCollage() {
  return (
    <div data-reveal="" className={`${c.canvas} ${styles.tablet}`} style={{ "--cw": 695.77, "--ch": 1433 } as CSSProperties}>
      <div className={c.stage}>
        <T x={0} y={42} fs={76.778} lh={69.1} ls={-2.6872} className={styles.tHeading}>
          a little about me.
        </T>

        <Piece cx={102.75} cy={312.47} w={185.9} h={291.5} rot={-6} className={styles.photo} src={img("about-me1")} alt="Sara" sizes="30vw" />
        <Piece cx={232.95} cy={279.96} w={163.9} h={255.2} rot={3} className={styles.photo} src={img("about-me2")} alt="Sara" sizes="25vw" />
        <T x={225.26} y={419.59} fs={13.2} lh={19.8}>me!</T>
        <T x={343.89} y={166.11} w={352} fs={17} lh={30} className={styles.justify}>
          <Words>{bioIntro}</Words>
        </T>

        <Piece cx={462.61} cy={544.67} w={140.978} h={215.423} rot={-5} fit="contain" className={styles.photo} src={img("about-craft3")} sizes="22vw" />
        <Piece cx={607} cy={543.03} w={142.386} h={206.029} rot={10} fit="contain" className={styles.photo} src={img("about-craft1")} sizes="22vw" />
        <Piece cx={597.99} cy={718.37} w={114} h={179} rot={-4} fit="contain" className={styles.photo} src={img("about-craft2")} sizes="18vw" />
        <Piece cx={471.91} cy={706.6} w={118} h={188} rot={7} fit="contain" className={styles.photo} src={img("about-craft4")} sizes="18vw" />
        <T x={415.89} y={827.11} w={290} fs={12} lh={19.2}>
          <strong>collecting little creative detours</strong>
          <br />
          from painted bowls to pottery and slightly over-decorated cakes.
        </T>

        <Scribble cx={66.59} cy={804.06} w={116} fs={12} lh={19.2} rot={-12}>
          Sublime galleria
        </Scribble>
        <T x={221.78} y={797.22} fs={12} lh={19.2}>Louvre</T>
        <Piece cx={100.15} cy={936.1} w={154} h={241} rot={-12} fit="contain" className={styles.photo} src={img("about-museum1")} sizes="24vw" />
        <Piece cx={246.7} cy={931.76} w={147.092} h={229.297} fit="contain" className={styles.photo} src={img("about-museum2")} sizes="22vw" />
        <Piece cx={135.54} cy={1108.54} w={127} h={197} rot={-3} fit="contain" className={styles.photo} src={img("about-museum3")} sizes="20vw" />
        <T x={209.78} y={1075.22} w={125} fs={12} lh={19.2}>
          <strong>favourite museum detours</strong>
        </T>
        <Scribble cx={147.61} cy={1219.14} w={22} fs={12} lh={19.2} rot={-5}>
          MAP
        </Scribble>

        <Piece cx={492.45} cy={1047.81} w={156.668} h={248.058} rot={-11} fit="contain" className={styles.photo} src={img("about-cafe2")} sizes="24vw" />
        <Piece cx={634.54} cy={1073.5} w={131.743} h={210.077} rot={6} fit="contain" className={styles.photo} src={img("about-cafe1")} sizes="20vw" />
        <Piece cx={487.62} cy={1245.92} w={132.123} h={209.115} fit="contain" className={styles.photo} src={img("about-cafe4")} sizes="20vw" />
        <Piece cx={612.04} cy={1280.09} w={140.052} h={225.507} rot={-4} fit="contain" className={styles.photo} src={img("about-cafe3")} sizes="22vw" />
        <T x={162.89} y={1258.11} w={244} fs={12} lh={19.2}>
          <strong>my very serious café research</strong>
          <br />
          for research purposes,obviously.
        </T>

        <T x={-0.11} y={514.11} w={390} fs={17} lh={30}>
          <Words>{bioMore}</Words>
        </T>
      </div>
    </div>
  );
}

/* Phone frame (30:573): the same arrangement on a 371-wide composition. */
function PhoneCollage() {
  return (
    <div data-reveal="" className={`${c.canvas} ${styles.phone}`} style={{ "--cw": 371, "--ch": 796 } as CSSProperties}>
      <div className={c.stage}>
        <T x={0} y={7} fs={50} lh={60.18} ls={-2.3403} className={styles.tHeading}>
          a little about me.
        </T>

        <Piece cx={43.36} cy={174.49} w={86.108} h={125.18} rot={-6} className={styles.photo} src={img("about-me1")} alt="Sara" sizes="30vw" />
        <Piece cx={117.9} cy={160.34} w={80.727} h={125.142} rot={3} className={styles.photo} src={img("about-me2")} alt="Sara" sizes="30vw" />
        <T x={101} y={230.74} fs={8} lh={7.2}>me!</T>
        <T x={173} y={95.87} w={200} fs={9} lh={19} className={styles.justify}>
          <Words>{bioIntro}</Words>
        </T>
        <T x={6} y={289.87} w={205} fs={9} lh={19}>
          <Words>{bioMore}</Words>
        </T>

        <Piece cx={257.95} cy={326.39} w={80.028} h={124.749} rot={-5} fit="contain" className={styles.photo} src={img("about-craft3")} sizes="25vw" />
        <Piece cx={329.44} cy={323.58} w={75.909} h={119.453} rot={10} fit="contain" className={styles.photo} src={img("about-craft1")} sizes="25vw" />
        <Piece cx={260.05} cy={418.53} w={75.909} h={121.219} rot={7} fit="contain" className={styles.photo} src={img("about-craft4")} sizes="25vw" />
        <Piece cx={332.59} cy={415.67} w={73.555} h={115.334} rot={-4} fit="contain" className={styles.photo} src={img("about-craft2")} sizes="25vw" />
        <T x={222} y={491.87} w={149} fs={7} lh={11}>
          <strong>collecting little creative detours</strong>
          <br />
          from painted bowls to pottery and slightly over-decorated cakes.
        </T>

        <Scribble cx={25.9} cy={450.3} w={48.1} fs={5.009} lh={8.015} rot={-12}>
          Sublime galleria
        </Scribble>
        <T x={123.22} y={452.82} fs={5.009} lh={8.015}>Louvre</T>
        <Piece cx={52.83} cy={512.12} w={80.345} h={120.57} rot={-12} fit="contain" className={styles.photo} src={img("about-museum1")} sizes="25vw" />
        <Piece cx={134.14} cy={525.18} w={80.542} h={125.554} fit="contain" className={styles.photo} src={img("about-museum2")} sizes="25vw" />
        <Piece cx={72.64} cy={607.1} w={69.627} h={107.696} rot={-3} fit="contain" className={styles.photo} src={img("about-museum3")} sizes="22vw" />
        <T x={116} y={597.87} w={68.124} fs={7} lh={8.015}>
          <strong>favourite museum detours</strong>
        </T>
        <Scribble cx={78} cy={667.6} w={9} fs={5.009} lh={8.015} rot={-3.09}>
          MAP
        </Scribble>

        <Piece cx={241.51} cy={614.47} w={75.258} h={119.209} rot={-11} fit="contain" className={styles.photo} src={img("about-cafe2")} sizes="25vw" />
        <Piece cx={312.66} cy={603.77} w={75.88} h={112.293} rot={6} fit="contain" className={styles.photo} src={img("about-cafe1")} sizes="25vw" />
        <Piece cx={252.21} cy={710.14} w={74.656} h={114.393} fit="contain" className={styles.photo} src={img("about-cafe4")} sizes="25vw" />
        <Piece cx={323.25} cy={709.51} w={76.178} h={118.947} rot={-4} fit="contain" className={styles.photo} src={img("about-cafe3")} sizes="25vw" />
        <T x={71} y={692.87} w={135} fs={7} lh={11}>
          <strong>my very serious café research</strong>
          <br />
          for research purposes,obviously.
        </T>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className={`container ${styles.about}`}>
      <SectionHead label="ABOUT" aside="THE PERSON BEHIND THE PIXELS" />

      <div className={styles.canvas}>
        <h2 className={styles.heading} data-reveal="">a little about me.</h2>

        <div className={styles.bio}>
          <p>
            <Words>{bioIntro}</Words>
          </p>
          <p>
            {/* Continues the word sequence from the first paragraph. */}
            <Words from={wordCount(bioIntro)}>
              When I’m not designing, you’ll probably find me exploring a new café or restaurant (yes, I
              have a list), wandering through museums, collecting little bits of inspiration, or hunting
              down really good ice cream.
            </Words>
          </p>
        </div>

        <Group id="me" x={28} y={191} w={362.63} h={357.5}>
          <Piece cx={105.5} cy={192.5} w={211} h={330} rot={-5.83} className={styles.photo} src={img("about-me1")} alt="Sara" sizes="220px" />
          <Piece cx={261.32} cy={150.22} w={186} h={290} rot={3.37} className={styles.photo} src={img("about-me2")} alt="Sara" sizes="200px" />
          <Note x={247} y={317}>me!</Note>
        </Group>

        <Group id="craft" x={945} y={174} w={337} h={523}>
          <Piece cx={224.64} cy={119.76} w={138} h={217} rot={9.92} className={styles.photo} src={img("about-craft1")} alt="" sizes="150px" />
          <Piece cx={231} cy={300} w={134} h={210} rot={-3.73} className={styles.photo} src={img("about-craft2")} alt="" sizes="150px" />
          <Note x={11} y={442} w={326}>
            <strong>collecting little creative detours</strong>
            <br />
            from painted bowls to pottery and slightly over-decorated cakes.
          </Note>
          <Piece cx={82.1} cy={119.6} w={146} h={228} rot={-4.71} className={styles.photo} src={img("about-craft3")} alt="" sizes="150px" />
          <Piece cx={89.12} cy={299.7} w={137} h={216} rot={6.98} className={`${c.clip} ${styles.photo}`} src={img("about-craft4")} crop={{ x: 0, y: -2.94, w: 137, h: 219 }} alt="" sizes="150px" />
        </Group>

        <Group id="museum" x={55} y={623} w={400} h={592.6}>
          <Piece cx={159.18} cy={435.1} w={162} h={251} rot={-3.33} className={styles.photo} src={img("about-museum3")} alt="" sizes="180px" />
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
          <Piece cx={120.04} cy={181.58} w={183} h={286} rot={-12.39} className={styles.photo} src={img("about-museum1")} alt="" sizes="200px" />
          <Piece cx={304.7} cy={167.73} w={186} h={290} rot={0.28} className={styles.photo} src={img("about-museum2")} alt="" sizes="200px" />
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
          <Piece cx={314.1} cy={149.35} w={172} h={273} rot={5.69} className={styles.photo} src={img("about-cafe1")} alt="" sizes="190px" />
          <Piece cx={121.05} cy={164.29} w={188} h={298} rot={-11.11} className={styles.photo} src={img("about-cafe2")} alt="" sizes="200px" />
          <Piece cx={404.55} cy={378.63} w={181} h={290} rot={-4.49} className={styles.photo} src={img("about-cafe3")} alt="" sizes="200px" />
          <Piece cx={227} cy={385.5} w={174} h={275} className={styles.photo} src={img("about-cafe4")} alt="" sizes="190px" />
        </Group>
      </div>

      <TabletCollage />
      <PhoneCollage />
    </section>
  );
}
