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
      data-reveal=""
      data-folder=""
      style={{ "--ch": card.height } as CSSProperties}
      aria-label={`${project.title} — view case study`}
    >
      <div className={styles.stage}>
        <Image
          src={card.folder}
          alt=""
          fill
          sizes="(max-width: 1023px) 92vw, 640px"
          className={styles.folder}
        />

        {/* Category label: same inset from every folder's own tab. */}
        <p className={styles.tagline} style={{ "--tx": card.tab.x, "--ty": card.tab.y } as CSSProperties}>
          {project.tagline}
        </p>

        {/* Top and bottom label rows share the text column's left edge and width,
            so PROJECT / the type line up with the title and the year / OPEN FILE line up right. */}
        <div className={styles.labels} style={pos(card.column.x, card.labels.y)}>
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
              "--ds": card.desc.size,
              "--dl": card.desc.leading,
              "--dt": card.desc.tracking,
              "--tg": card.tagsGap ?? 31,
            } as CSSProperties
          }
        >
          <h3 className={styles.title}>{project.title}</h3>
          <div className={`${styles.desc} ${card.desc.medium ? styles.medium : ""}`}>
            <p className={styles.primary}>{project.primary}</p>
            {project.secondary && <p className={styles.secondary}>{project.secondary}</p>}
          </div>
          <p className={styles.tags}>{project.tags}</p>
        </div>

        <div className={`${styles.labels} ${styles.footer}`} style={pos(card.column.x, card.open.y)}>
          <span>{project.footnote}</span>
          <span>OPEN FILE →</span>
        </div>

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
                "--bs": preview.barScale,
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
              {preview.img ? (
                <div
                  className={styles.shotBox}
                  style={
                    {
                      "--ix": preview.img.x,
                      "--iy": preview.img.y,
                      "--iw": preview.img.w,
                      "--ih": preview.img.h,
                    } as CSSProperties
                  }
                >
                  <Image src={preview.image} alt="" fill sizes="220px" className={styles.shotImg} />
                </div>
              ) : (
                <Image src={preview.image} alt="" fill sizes="220px" className={styles.shotImg} />
              )}
            </div>
          </div>
          <p className={styles.paperCta}>VIEW CASE STUDY →</p>
        </div>
      </div>
    </Link>
  );
}
