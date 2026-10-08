import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import styles from "./case.module.css";

/* ---------- Layout ---------- */

export function Section({
  id,
  num,
  label,
  children,
  className,
  style,
}: {
  id?: string;
  num?: string;
  label?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <section id={id} className={`${styles.section} ${className ?? ""}`} style={style}>
      {num && label && (
        <div className={styles.label}>
          <span className={styles.labelNum}>{num} —</span>
          <span className={styles.labelLine} />
          <span className={styles.labelText}>{label}</span>
        </div>
      )}
      {children}
    </section>
  );
}

export const Rule = () => <hr className={styles.rule} />;

/* ---------- Type ---------- */

export function H2({ children, size = 44, className }: { children: ReactNode; size?: number; className?: string }) {
  return (
    <h2 className={`${styles.h2} ${className ?? ""}`} style={{ "--size": size } as CSSProperties}>
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className={styles.h3}>{children}</h3>;
}

export function P({ children, light, className }: { children: ReactNode; light?: boolean; className?: string }) {
  return <p className={`${light ? styles.pLight : styles.p} ${className ?? ""}`}>{children}</p>;
}

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={`${styles.kicker} ${className ?? ""}`}>{children}</p>;
}

export function Quote({ children }: { children: ReactNode }) {
  return <blockquote className={styles.quote}>{children}</blockquote>;
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className={styles.bullets}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

/* ---------- Media ---------- */

export function Figure({
  src,
  w,
  h,
  alt = "",
  className,
  sizes = "(max-width: 1100px) 92vw, 1112px",
  priority,
}: {
  src: string;
  w: number;
  h: number;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`${styles.figure} ${className ?? ""}`} style={{ aspectRatio: `${w} / ${h}` }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={styles.cover}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </div>
  );
}

/** A screenshot shown inside a minimal browser window. */
export function BrowserFrame({
  src,
  url,
  bar,
  w,
  h,
  alt = "",
}: {
  src: string;
  url: string;
  bar: string;
  w: number;
  h: number;
  alt?: string;
}) {
  return (
    <div className={styles.browser}>
      <div className={styles.browserBar} style={{ background: bar }}>
        <i />
        <i />
        <i />
        <b />
        <span>{url}</span>
      </div>
      <Figure src={src} w={w} h={h} alt={alt} priority />
    </div>
  );
}

export function Icon({ src, w, h }: { src: string; w: number; h: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" width={w} height={h} className={styles.icon} />;
}

/* ---------- Hero ---------- */

export function CaseHero({
  name,
  tag,
  title,
  lead,
  meta,
  children,
}: {
  name: string;
  tag: string;
  title: ReactNode;
  lead: ReactNode;
  meta: { label: string; value: string }[];
  children?: ReactNode;
}) {
  return (
    <Section id="intro" className={styles.hero}>
      <div className={styles.eyebrow}>
        <span className={styles.eyebrowName}>{name}</span>
        <span className={styles.eyebrowLine} />
        <span className={styles.eyebrowTag}>{tag}</span>
      </div>
      <h1 className={styles.heroTitle}>{title}</h1>
      <p className={styles.heroLead}>{lead}</p>
      <dl className={styles.meta}>
        {meta.map((m) => (
          <div key={m.label}>
            <dt>{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
      </dl>
      {children}
    </Section>
  );
}

export function TextLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className={styles.textLinks}>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
          {l.label}
        </a>
      ))}
    </div>
  );
}

/* ---------- Next project ---------- */

export function NextProject({ href, title, blurb }: { href: string; title: string; blurb: string }) {
  return (
    <div className={styles.next}>
      <div>
        <p className={styles.nextEyebrow}>
          NEXT PROJECT <Icon src="/icons/arrow.svg" w={13} h={13} />
        </p>
        <p className={styles.nextTitle}>{title}</p>
        <p className={styles.nextBlurb}>{blurb}</p>
      </div>
      <Link href={href} className={styles.nextLink}>
        VIEW CASE STUDY <Icon src="/icons/arrow.svg" w={13} h={13} />
      </Link>
    </div>
  );
}
