import styles from "./CapabilityScene.module.css";

export type SceneKind = "product" | "interaction" | "research" | "systems";

const s = styles;
const cx = (...names: string[]) => names.map((n) => s[n]).join(" ");

/** 01: scattered wireframe fragments settle into one finished screen. */
const Product = () => (
  <>
    <span className={cx("p", "pFrame")} />
    <span className={cx("p", "pDots")} />
    <span className={cx("p", "wire", "pHero")} />
    <span className={cx("p", "pH")} />
    <span className={cx("p", "pL1")} />
    <span className={cx("p", "pL2")} />
    <span className={cx("p", "wire", "pBtn")} />
    <span className={cx("p", "wire", "pC1")} />
    <span className={cx("p", "wire", "pC2")} />
  </>
);

/** 02: press, toggle, progress, done, one after another. */
const Interaction = () => (
  <>
    <span className={cx("p", "iPanel")} />
    <span className={cx("p", "iBtn")} />
    <span className={s.iRipple} />
    <span className={cx("p", "iToggle")}>
      <span className={s.iKnob} />
    </span>
    <span className={cx("p", "iLbl")} />
    <span className={cx("p", "iBar")}>
      <span className={s.iFill} />
    </span>
    <span className={cx("p", "iOk")} />
    <span className={cx("p", "iOkLine")} />
  </>
);

/** 03: loose notes cluster into two themes that feed one insight. */
const Research = () => (
  <>
    <svg className={cx("p", "rLinks")} viewBox="0 0 200 96">
      <path pathLength={1} d="M56 24C80 24 80 38 104 38" />
      <path pathLength={1} d="M56 70C80 70 80 58 104 58" />
    </svg>
    {["n1", "n2", "n3", "n4", "n5", "n6"].map((n) => (
      <span key={n} className={cx("p", "note", n)} />
    ))}
    <span className={cx("p", "rCard")}>
      <span className={s.rLabel}>Insight</span>
      <span className={s.rLine} />
      <span className={s.rLine} />
      <span className={s.rChip} />
    </span>
  </>
);

/** 04: loose parts snap to a grid, tokens surface, a small UI assembles. */
const Systems = () => (
  <>
    <span className={cx("p", "sGrid")} />
    <span className={cx("p", "sCard")} />
    <span className={cx("p", "sLabel")}>Tokens</span>
    <span className={cx("p", "sSw", "sSw1")} />
    <span className={cx("p", "sSw", "sSw2")} />
    <span className={cx("p", "sSw", "sSw3")} />
    <span className={cx("p", "sType")}>Aa</span>
    <span className={cx("p", "sSpace")} />
    <span className={cx("p", "sHead")} />
    <span className={cx("p", "sInput")} />
    <span className={cx("p", "sBtn1")} />
    <span className={cx("p", "sBtn2")} />
    <span className={cx("p", "sCode")} />
  </>
);

const scenes = { product: Product, interaction: Interaction, research: Research, systems: Systems };

/**
 * Decorative hover scene for a capability card. Invisible at rest; plays when
 * the parent card is hovered and eases back on leave (CapabilityScene.module.css).
 * Must be a direct child of the card.
 */
export default function CapabilityScene({ kind }: { kind: SceneKind }) {
  const Scene = scenes[kind];
  return (
    <span className={`${s.stage} ${s[kind]}`} aria-hidden="true">
      <Scene />
    </span>
  );
}
