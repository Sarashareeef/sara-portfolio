import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="container"
      style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}
    >
      <p style={{ fontSize: 14, letterSpacing: 1.5, color: "var(--grey)" }}>FILE NOT FOUND</p>
      <h1
        style={{
          fontFamily: "var(--font-serif-stack)",
          fontWeight: 400,
          fontSize: "clamp(48px, 7vw, 96px)",
          lineHeight: 1,
          letterSpacing: "-0.035em",
        }}
      >
        This case study is still being written.
      </h1>
      <Link href="/#work" style={{ fontSize: 15, letterSpacing: 1.2, textDecoration: "underline", textUnderlineOffset: 3 }}>
        ← BACK TO WORK
      </Link>
    </section>
  );
}
