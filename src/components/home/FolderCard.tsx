import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";
import styles from "./FolderCard.module.css";

const pos = (x: number, y: number) => ({ "--x": x, "--y": y }) as CSSProperties;

export default function FolderCard({ project }: { project: Project }) {
  const { card, preview } = project;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={styles.card}
      style={{ "--ch": card.height } as CSSProperties}
      aria-label={`${project.title} — view case study`}
    >
      <div className={styles.stage}>
        <Image
          src={card.folder}
          alt=""
          fill
          sizes="(max-width: 899px) 92vw, 640px"
          className={styles.folder}
        />

        <p
          className={styles.tagline}
          style={{ ...pos(card.tagline.x, card.tagline.y), "--size": card.tagline.size } as CSSProperties}
        >
          {project.tagline}
        </p>

        <div className={styles.labels} style={pos(card.labels.x, card.labels.y)}>
          <span>PROJECT / {project.number}</span>
          <span>{project.year}</span>
        </div>

        <div
          className={styles.column}
          style={
            {
              ...pos(card.column.x, card.column.y),
              "--lead": card.titleLeading,
              "--rule": card.ruleGap,
            } as CSSProperties
          }
        >
          <h3 className={styles.title}>{project.title}</h3>
          <div className={styles.desc}>
            <p className={styles.primary}>{project.primary}</p>
            {project.secondary && <p className={styles.secondary}>{project.secondary}</p>}
          </div>
          <p className={styles.tags}>{project.tags}</p>
        </div>

        {project.footnote && (
          <span className={styles.footnote} style={pos(card.labels.x + 6, card.open.y + 1)}>
            {project.footnote}
          </span>
        )}
        <span className={styles.open} style={pos(card.open.x, card.open.y)}>
          OPEN FILE ↗
        </span>

        {/* Hover: a page slides out of the folder. */}
        <div className={styles.paper} style={pos(card.paper.x, card.paper.y)} aria-hidden="true">
          <p className={styles.paperLabel}>IN THE FILE</p>
          <p className={styles.paperTitle}>{preview.title}</p>
          <div
            className={styles.browser}
            style={
              {
                "--fx": preview.frame.x,
                "--fy": preview.frame.y,
                "--fw": preview.frame.w,
                "--fh": preview.frame.h,
              } as CSSProperties
            }
          >
            <div className={styles.bar} style={{ background: preview.bar }}>
              <i />
              <i />
              <i />
              <b />
              <span>{preview.url}</span>
            </div>
            <div className={styles.shot}>
              <Image src={preview.image} alt="" fill sizes="220px" className={styles.shotImg} />
            </div>
          </div>
          <p className={styles.paperCta}>VIEW CASE STUDY →</p>
        </div>
      </div>
    </Link>
  );
}
