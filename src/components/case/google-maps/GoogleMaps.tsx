import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Cormorant_Garamond, Cutive_Mono } from "next/font/google";
import ScrollReveal, { RevealScript } from "@/components/ScrollReveal";
import Words from "@/components/home/Words";
import CaseLayout from "../CaseLayout";
import { HEADING_STEP } from "../caseMotion";
import { CaseHero, H2, Kicker, NextProject, P, Section } from "../ui";
import GoogleMapsMotion from "./GoogleMapsMotion";
import s from "./google-maps.module.css";

/* Fonts only this case study uses (badges, table pills, sticky notes). */
const cutive = Cutive_Mono({ variable: "--font-cutive", subsets: ["latin"], weight: "400", display: "swap" });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: "600", display: "swap" });

const web = (n: string) => `/images/google-maps/web/${n}.webp`;
const svg = (n: string) => `/images/google-maps/${n}.svg`;

const toc = [
  { id: "intro", label: "Introduction" },
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "challenge", label: "The Challenge" },
  { id: "needs", label: "User Needs" },
  { id: "system", label: "The System" },
  { id: "process", label: "Design Process" },
  { id: "didnt-work", label: "What Didn't Work" },
  { id: "trust", label: "Trust & Feasibility" },
  { id: "reflection", label: "Reflection" },
];

/** Text that differs between the desktop frame and the tablet/phone frames. */
const Swap = ({ d, m }: { d: ReactNode; m: ReactNode }) => (
  <>
    <span className={s.dOnly}>{d}</span>
    <span className={s.mOnly}>{m}</span>
  </>
);

/* ---------- Data ---------- */

const contextSteps = [
  { n: "01", t: "DISCOVER", d: "See safety-related information around the map." },
  { n: "02", t: "UNDERSTAND", d: "Understand what contributes to a route's safety context.", tint: true },
  { n: "03", t: "COMPARE", d: "Consider safety alongside time and distance." },
  { n: "04", t: "CHOOSE", d: "Select the route that fits the user's priorities.", tint: true },
];

const principles = [
  { n: "01", t: "CLARITY", icon: "card-icon-eye-full", lines: ["Safety information", "should be understandable", "at a glance."] },
  { n: "02", t: "CONTEXT", icon: "card-icon-map-pin-full", lines: ["Relevant information", "should appear where", "route decisions happen."] },
  { n: "03", t: "CONTROL", icon: "card-icon-control", lines: ["The interface should", "inform the decision,", "not make it for the user."], narrow: true },
];

/* Text-box widths of each card's description in Figma (context, need), 3:2072–3:2109. */
const needWidths = [
  [469, 470],
  [481, 478.3],
  [444, 485.6],
  [468, 402.6],
];

const needs = [
  ["Walking alone after dark", "Travelling on foot at night and looking for a route that feels safer and more reassuring.", "Visibility", "Routes with adequate street lighting and clear sightlines"],
  ["Unfamiliar neighbourhood", "Navigating an area you don't know during evening or late-night hours.", "Reassurance", "Confidence that their chosen route is monitored and safe"],
  ["Returning home late", "Travelling home after work when visibility and perceived safety become more important.", "Safe Routing", "Automatic prioritization of safer alternatives to fastest routes"],
  ["Unfamiliar city", "Navigating a new city at night without knowing which routes feel safer.", "Live Information", "Real-time updates on police presence and safety conditions"],
];

const system = [
  ["01 — SAFE MODE", "A dedicated mode that shifts the navigation experience toward safety-aware route information."],
  ["02 — SAFETY LAYER", "A map layer that surfaces contextual safety indicators around the user's route."],
  ["03 — SAFE ROUTE PREVIEW", "A route preview that brings safety context into the route-selection moment."],
  ["04 — LIVE SAFETY UPDATES", "Contextual updates such as police presence and CCTV information."],
  ["05 — SAFETY SUMMARY", "A consolidated view of the factors contributing to a route's safety context."],
  ["05 — AVOID AREA MARKERS", "Visual warnings that help users identify areas they may want to reconsider."],
];

/* Each step links to its part of the Design Process section below. */
const steps = [
  ["Research", "Understanding the problem", "User needs + competitive review", "process-research"],
  ["Ideation", "Exploring solutions", "Concept exploration + safety indicators system thinking", "process-ideation"],
  ["Wireframes", "Testing the structure", "Low-fidelity flows", "process-wireframes"],
  ["UI Design", "Bringing it together", "High-fidelity screens", "process-ui-design"],
];

const insights: [quote: string, accent: string, textWidth: number][] = [
  ["I avoid dark streets even if they are faster.", "#b1ceff", 321],
  ["Maps don't show how safe an area is.", "#89a292", 306],
  ["I wish I knew which streets are well-lit.", "#fbbc04", 335],
  ["Short routes sometimes feel unsafe.", "#febab4", 321],
  ["I take longer routes if they feel safer.", "#b1ceff", 331],
  ["No way to report dangerous areas.", "#89a292", 322],
  ["I check street view before walking at night.", "#fbbc04", 329],
  ["Police presence would help me feel secure.", "#febab4", 332],
  ["I need real-time safety information.", "#b1ceff", 339],
];

/** Quotes reveal word by word, quicker than headings so they read straight away (ms per word). */
const QUOTE_STEP = 35;

const competitors = [
  { name: "Google Maps", letter: "G", color: "#4285f4" },
  { name: "Waze", letter: "W", color: "#34a853" },
  { name: "Namma Yatri", letter: "N", color: "#fbbc04" },
];

const reviewRows = [
  {
    tag: "Strengths",
    tone: "good",
    widths: [330, 265.2, 246],
    cells: [
      "Accurate directions, comprehensive coverage, live traffic data",
      "Real-time alerts, community-driven hazard reporting",
      "Local market focus, driver ratings, safety features",
    ],
  },
  {
    tag: "Gaps",
    tone: "gap",
    widths: [284.4, 189.6, 255.6],
    cells: [
      "No safety context, no lighting info, no pedestrian-specific safety data",
      "Car-focused, limited pedestrian features, cluttered interface",
      "Limited to specific regions, primarily ride-sharing focused",
    ],
  },
];

const concepts = [
  ["CONCEPT A", "Concept A: Safety Icons on Map", "Visual indicators overlaid on routes"],
  ["CONCEPT B", "Concept B: Route Safety Score", "Numerical rating for each route option"],
  ["CONCEPT C", "Concept C: Lighting Heatmap", "Color-coded streets based on lighting levels"],
];

/* Desktop x positions are from the Figma row; the CCTV icon file already
   contains its tinted circle, the others sit on a tinted circle drawn here. */
const indicators = [
  { label: "Street Lighting", icon: "icon-street-lighting", w: 28, h: 28, rgb: "251, 188, 4", x: 0 },
  { label: "Police Presence", icon: "icon-police-presence", w: 24.83, h: 22.5, rgb: "66, 133, 244", x: 229, cy: -3 },
  { label: "High foot presence", icon: "icon-high-foot-presence", w: 25.67, h: 24.5, rgb: "52, 168, 83", x: 458, dy: -3 },
  { label: "CCTV monitoring", icon: "icon-cctv-monitoring", w: 104, h: 104, rgb: "", x: 663 },
  { label: "Avoid areas", icon: "icon-avoid-areas", w: 28, h: 28, rgb: "234, 67, 53", x: 868 },
];

/* x / y: each unrotated note's top-left on the 971-wide board, measured from the
   Figma render (the file reports rotated bounding boxes). */
const notes = [
  {
    tone: "yellow",
    x: 6.5, y: 9,
    rot: -1.8,
    title: "Icon Meanings",
    body: "Each icon represents a specific safety feature visible on the map. Yellow lightbulbs indicate well-lit streets, the police cap mark police presence, purple cameras show CCTV coverage, car icons represent high foot-traffic areas, and red warning triangles highlight zones to avoid.",
  },
  {
    tone: "blue",
    x: 507, y: 7,
    rot: 1.2,
    corner: "blue",
    title: "Color Rationale",
    body: "Colors were chosen based on universal safety conventions and emotional associations. Yellow suggests caution and visibility, blue conveys authority and trust, purple represents technology and surveillance, green indicates safety and go-ahead, while red signals danger and stop.",
  },
  {
    tone: "purple",
    x: 10.8, y: 463,
    rot: 0.8,
    title: "Placement Rules",
    body: "Icons are displayed with adaptive density based on zoom level. At city-wide view, clusters are shown as aggregated indicators. As users zoom in, individual markers appear along streets. Icons automatically scale and adjust opacity to prevent overwhelming the interface while maintaining clarity.",
  },
  {
    tone: "pink",
    x: 505.9, y: 467,
    rot: -1.4,
    corner: "pink",
    title: "Accessibility",
    body: "All icons pass WCAG AA contrast requirements against both light and dark backgrounds. Color-blind safe palettes ensure visibility for users with deuteranopia and protanopia. Shape differentiation allows recognition without relying solely on color, and each icon includes descriptive labels for screen readers.",
  },
];

const whyDirection = [
  ["01 — CLARITY", "Easy to understand at a glance."],
  ["02 — LOW COGNITIVE LOAD", "Add context without overwhelming navigation"],
  ["03 — FAMILIARITY", "Work within patterns users already recognise from Maps."],
  ["04 — ACCESSIBILITY", "Make safety signals distinguishable across the interface."],
];

const ideas = [
  {
    t: "01 — ROUTE SAFETY SCORE",
    rows: [
      ["THE IDEA", "Give each route an overall safety score alongside familiar information such as travel time and distance."],
      ["EVALUATION", "I compared the concept against the project's goals of clarity, contextual information, and user agency."],
      ["WHY IT DIDN'T WORK", "A single score reduced a complex set of conditions into one number. It could make the interface feel as though it was deciding which route was “safe” rather than giving users the context to make their own decision."],
      ["WHAT CHANGED", "I moved from a single score to individual safety indicators that explain the conditions behind a route."],
    ],
  },
  {
    t: "02 — LIGHTING HEATMAP",
    rows: [
      ["THE IDEA", "Use a heatmap to show variations in street-lighting conditions across the map."],
      ["EVALUATION", "I compared the concept against the need to preserve navigation clarity while providing useful safety context."],
      ["WHY IT DIDN'T WORK", "A continuous visual layer made the map harder to scan and competed with the primary navigation information. It also communicated one safety factor without showing the broader context."],
      ["WHAT CHANGED", "I shifted toward discrete, contextual indicators that could surface specific signals without covering the entire map."],
    ],
  },
];

/* Figma text-box widths (3:2481–3:2493); item 01 and 03 run past the 1112 column. */
const learningWidths = [1140, 1112, 1123, 1112];

const learnings = [
  ["01 — SAFETY IS CONTEXT, NOT A SCORE", "Designing this experience made me realise that safety is difficult to communicate through a single label or number. Showing the individual factors behind a route gives people more useful context while leaving the final decision with them."],
  ["02 — MORE INFORMATION DOESN'T ALWAYS MEAN MORE CLARITY", "My early explorations showed how quickly additional information can compete with the primary navigation experience. The challenge wasn't finding more things to show, but deciding what deserved attention and when."],
  ["03 — FAMILIARITY CAN MAKE NEW INFORMATION EASIER TO UNDERSTAND", "Rather than creating an entirely new navigation experience, I worked within familiar Maps patterns. Keeping the core interaction recognisable allowed the new safety layer to feel like an extension of navigation rather than another system users had to learn."],
  ["04 — DESIGNING FOR SAFETY MEANS PRESERVING AGENCY", "The interface should provide information without deciding what is “safe” for someone. The final direction became less about recommending a route and more about helping people understand the conditions around it."],
];

/* ---------- UI design board ----------
   One free-form board with three arrangements, each taken from its Figma frame
   (desktop 967 × 2636.6, tablet 671.8 × 1646.1, phone 345.3 × 846.2).
   Positions are stored in frame pixels and converted to percentages, so every
   arrangement scales with the board's width. */

type Box = [x: number, y: number, w: number];
type Layout = "d" | "t" | "p";
const frames: Record<Layout, [number, number]> = { d: [967, 2636.628], t: [671.771, 1646.12], p: [345.33, 846.198] };

const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(4)}%`;

function boxVars(pos: Record<Layout, Box>): CSSProperties {
  const vars: Record<string, string> = {};
  (Object.keys(pos) as Layout[]).forEach((k) => {
    const [x, y, w] = pos[k];
    const [W, H] = frames[k];
    vars[`--${k}x`] = pct(x, W);
    vars[`--${k}y`] = pct(y, H);
    vars[`--${k}w`] = pct(w, W);
  });
  return vars as CSSProperties;
}

const screens: { src: string; alt: string; ratio: string; pos: Record<Layout, Box> }[] = [
  {
    src: "ui-explore-night-mode-button",
    alt: "Google Maps explore screen with the new night and safety mode button",
    ratio: "1310 / 2708",
    pos: { d: [18.42, 0, 361.934], t: [11.49, 0, 225.964], p: [-5.84, -51, 134.252] },
  },
  {
    src: "ui-hand-holding-phone",
    alt: "Safe Mode on a phone held in a hand",
    ratio: "1412 / 2006",
    pos: { d: [600, 374, 476.132], t: [374.59, 233.5, 297.257], p: [207.16, 102, 152.804] },
  },
  {
    src: "ui-safety-updates-panel",
    alt: "Safety updates panel with indicator legend and live police updates",
    ratio: "1945 / 4096",
    pos: { d: [13.81, 868.46, 377.318], t: [8.62, 542.2, 235.564], p: [4.43, 278.72, 121.094] },
  },
  {
    src: "ui-route-preview",
    alt: "Route preview with Safe Mode activated, 9 minutes and 3 km",
    ratio: "1945 / 4096",
    pos: { d: [600, 1443, 401.457], t: [374.59, 900.9, 250.634], p: [192.56, 463.12, 128.837] },
  },
  {
    src: "ui-safe-route-map",
    alt: "Map showing the safest route with safety indicators",
    ratio: "1945 / 4096",
    pos: { d: [0, 1782.96, 405.365], t: [0, 1113.15, 253.073], p: [0, 572.22, 130.095] },
  },
];

/* Arrows: centre point, drawn width and rotation (the same doodle image every time). */
const arrows: { rot: number; pos: Record<Layout, Box> }[] = [
  { rot: -52.03, pos: { d: [400.8, 238.015, 116.822], t: [305.39, 163.62, 117], p: [165.68, 71.82, 83] } },
  { rot: 100.96, pos: { d: [495.632, 823.874, 176.089], t: [374.8, 568.44, 101.584], p: [182.94, 262.23, 59.983] } },
  { rot: -52.03, pos: { d: [464.651, 1209.455, 116.822], t: [302.39, 774.62, 117], p: [157.58, 432.12, 75.56] } },
  { rot: -3.82, pos: { d: [483.605, 1626.467, 132.015], t: [301.9, 1015.45, 132], p: [148.51, 553.69, 66.111] } },
  { rot: 117.47, pos: { d: [515.966, 2170.551, 132.015], t: [313.94, 1360.64, 132], p: [167.97, 699.23, 53.762] } },
];

const captions: { key: string; pos: Record<Layout, Box>; content: ReactNode }[] = [
  {
    key: "mode",
    pos: { d: [449.42, 192.48, 0], t: [329.99, 63, 0], p: [154.16, 0, 0] },
    content: (
      <>
        Night/safety
        <br />
        <span className={s.capIndent}>mode button</span>
      </>
    ),
  },
  {
    key: "icons",
    pos: { d: [465, 1050, 321], t: [290.31, 655.54, 0], p: [147.16, 319, 120] },
    content: (
      <>
        Icon info and live <br className={s.capBreak} />
        police updates
      </>
    ),
  },
  {
    key: "map",
    pos: { d: [610, 2356, 415.35], t: [380.83, 1470.91, 260], p: [195.16, 754, 157] },
    content: "map showing the safest route with well lit streets , cctv monitoring and live police updates",
  },
];

function UiBoard() {
  return (
    <div className={s.boardWrap}>
      <div className={s.board}>
        {screens.map((sc) => (
          <div
            key={sc.src}
            className={s.screen}
            style={{ ...boxVars(sc.pos), aspectRatio: sc.ratio } as CSSProperties}
          >
            <Image src={web(sc.src)} alt={sc.alt} fill unoptimized sizes="420px" className={s.fit} />
          </div>
        ))}
        {arrows.map((a, i) => (
          <div
            key={i}
            className={s.arrow}
            style={{ ...boxVars(a.pos), "--rot": `${a.rot}deg` } as CSSProperties}
            aria-hidden="true"
          >
            <Image src={web("doodle-arrow")} alt="" fill unoptimized sizes="180px" className={s.fit} />
          </div>
        ))}
        {captions.map((c) => (
          <p key={c.key} className={`${s.caption} ${s[`cap_${c.key}`]}`} style={boxVars(c.pos)}>
            {c.content}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function GoogleMaps() {
  return (
    <CaseLayout toc={toc} footer="GOOGLE MAPS REDESIGN — UX CASE STUDY">
      {/* Before the hero parses, so its entrance starts hidden without a flash. */}
      <RevealScript />
      {/* The desktop frame wraps "TRUST & / FEASIBILITY" in a 104px label box (14.4 line
          height). Scoped to this page's Trust link, so Mello's contents keep one line. */}
      <style href="gm-toc-trust" precedence="default">
        {`nav[aria-label="Case study contents"] a[href="#trust"] > span:last-child { white-space: normal; max-width: 104px; line-height: 14.4px; letter-spacing: 0.96px; }`}
      </style>
      <div className={`${s.root} ${cutive.variable} ${cormorant.variable}`}>
        <CaseHero
          className={s.hero}
          name="GOOGLE MAPS"
          tag="NIGHT MODE SAFETY"
          title={
            <>
              {/* The space stays when the phone layout drops the break (3 lines, 346 wide). */}
              Rethinking night navigation around <br />
              personal safety.
            </>
          }
          lead="Exploring how Google Maps could help people make more informed route decisions at night by surfacing safety-related context alongside familiar navigation information."
          meta={[
            { label: "ROLE", value: "UI / UX DESIGN" },
            {
              label: "TYPE",
              value: (
                <>
                  <span className={s.notTablet}>INDEPENDENT CONCEPT</span>
                  <span className={s.tOnly}>INDEPENDANT CONCEPT</span>
                </>
              ),
            },
            { label: "PLATFORM", value: "MOBILE" },
            { label: "TOOLS", value: <Swap d="FIGMA" m="FIGMA/FIGJAM" /> },
          ]}
        >
          <div className={s.browser}>
            <div className={s.browserBar}>
              <i />
              <i />
              <i />
              <b />
              <span>googlemaps.app</span>
            </div>
            <div className={s.browserView}>
              <Image
                src={web("hero-safer-routes")}
                alt="Safer Routes for Brighter Nights — the Google Maps safety concept on a phone over a city map"
                fill
                unoptimized
                priority
                sizes="1122px"
                className={s.heroImg}
              />
            </div>
          </div>
        </CaseHero>

        {/* 01 — Overview */}
        <Section id="overview" num="01" label="OVERVIEW" className={s.overview}>
          <H2 className={s.h2Tight}><Words step={HEADING_STEP}>A different question for night-time navigation.</Words></H2>
          <div className={s.overviewText}>
            <p>Google Maps is designed to help people get from one place to another.</p>
            <p className={s.blank} aria-hidden="true" />
            <p>This concept explores another layer of the journey:</p>
            <p>What information could help someone make a more informed route choice when travelling at night?</p>
            <p>
              Rather than redesigning Maps as a completely different product, I explored how a safety-aware layer could
              sit within the familiar mapping experience.
            </p>
          </div>
          <Kicker className={s.contextKicker}>THE CONTEXT</Kicker>
          <div className={s.steps}>
            {contextSteps.map((c) => (
              <div key={c.n} className={c.tint ? s.tint : undefined}>
                <span className={s.stepNum}>{c.n}</span>
                <span className={s.stepTitle}>{c.t}</span>
                <span className={s.stepDesc}>{c.d}</span>
              </div>
            ))}
          </div>
        </Section>

        <hr className={s.rule} />

        {/* 02 — Context */}
        <Section id="context" className={s.context}>
          <div className={s.softLabel}>
            <span className={s.softNum}>02 —</span>
            <span className={s.softLine} />
            <span className={s.softText}>CONTEXT</span>
          </div>
          <H2 size={52.6} className={s.h2Big}>
            <Words step={HEADING_STEP}>When the fastest route isn&apos;t always the right one.</Words>
          </H2>
          <div className={`${s.contextText} ${s.notPhone}`}>
            <ul>
              <li>
                Most navigation decisions naturally revolve around time, distance and traffic. But when a journey happens
                at night, the context around a route can become just as important.
              </li>
              <li>
                A shorter route might pass through poorly lit streets. Another might take slightly longer but offer better
                lighting, more activity or nearby support.
              </li>
              <li>This became the starting point for my redesign:</li>
            </ul>
            <p>What if route selection could give people more context about the journey — not just how long it takes?</p>
            <p>
              {/* The desktop frame breaks this line after "without" (3:1994). */}
              From there, I explored how a safety-aware layer could fit into the familiar Google Maps experience without{" "}
              <br className={s.dBreak} />
              making navigation feel more complicate
            </p>
          </div>
          <div className={`${s.contextText} ${s.contextPhone}`}>
            <ul>
              <li>
                Most navigation decisions naturally revolve around time, distance and traffic. But when a journey happens
                at night, the context around a route can become just as important.
              </li>
              <li>
                A shorter route might pass through poorly lit streets. Another might take slightly longer but offer better
                lighting, more activity or nearby support.
              </li>
              <li>
                This became the starting point for my redesign: What if route selection could give people more context
                about the journey — not just how long it takes?
              </li>
              <li>
                From there, I explored how a safety-aware layer could fit into the familiar Google Maps experience without
                making navigation feel more complicate
              </li>
            </ul>
          </div>
          <div className={s.decision}>
            <Image
              src={web("route-decision-comparison")}
              alt="Traditional route decision (time, distance, traffic) compared with a night-time route decision that adds safety context"
              fill
              unoptimized
              sizes="(max-width: 767px) 92vw, 672px"
              className={s.decisionImg}
            />
          </div>
        </Section>

        <hr className={s.rule} />

        {/* 03 — Challenge */}
        <Section id="challenge" num="03" label="THE CHALLENGE" className={s.challenge}>
          <H2 size={40} className={s.h2Challenge}>
            <Words step={HEADING_STEP}>Making safety visible without making navigation overwhelming.</Words>
          </H2>
          <P className={s.challengeText}>
            The challenge was to introduce safety-related context into an experience built around quick, familiar route
            decisions. The interface needed to surface useful information without turning the map into an
            information-heavy dashboard
          </P>
        </Section>

        <p className={s.questionLabel}>THE DESIGN QUESTION</p>
        <hr className={s.rule} />

        <Section className={s.question}>
          <p className={s.questionText}>
            How might I introduce safety context into night-time navigation while keeping route selection simple and
            user-controlled?
          </p>
          <div className={s.principlesWrap}>
            <div className={s.principles}>
              {principles.map((p) => (
                <div key={p.n} className={`${s.principle} ${p.narrow ? s.principleNarrow : ""}`}>
                  <span className={s.principleIndex}>{p.n}</span>
                  <span className={s.principleIcon}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={svg(p.icon)} alt="" width={81.9} height={79.38} />
                  </span>
                  <span className={s.principleTitle}>{p.t}</span>
                  <span className={s.principleDesc}>
                    {p.lines.map((l, i) => (
                      <span key={i}>{l}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <P className={s.questionNote}>
            Together, they shaped how safety information appears, when it surfaces, and how much control remains with the
            user.
          </P>
        </Section>

        <hr className={s.rule} />

        {/* 04 — User needs */}
        <Section id="needs" num="04" label="USER NEEDS" className={s.needsSection}>
          <H2><Words step={HEADING_STEP}>What did the user need?</Words></H2>
          <P className={s.needsIntro}>Different night-time journeys create different information needs.</P>
          <div className={s.needsWrap}>
            <div className={s.needs}>
              <p className={s.needsHead}>Context</p>
              <p className={s.needsHead}>User Needs</p>
              {needs.map(([ct, cd, nt, nd], i) => (
                <div key={ct} className={s.needsRow}>
                  <div className={s.needCard}>
                    <p className={s.needTitle}>{ct}</p>
                    <p className={s.needDesc} style={{ "--dw": needWidths[i][0] } as CSSProperties}>
                      {cd}
                    </p>
                  </div>
                  <div className={`${s.needCard} ${s.needBlue}`}>
                    <p className={s.needTitle}>{nt}</p>
                    <p className={s.needDesc} style={{ "--dw": needWidths[i][1] } as CSSProperties}>
                      {nd}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={s.insightQuote}>
            <p>
              <em>Across these scenarios, the underlying need is consistent: more context before making a route decision</em>.
            </p>
          </div>
        </Section>

        <hr className={s.rule} />

        {/* 05 — The system */}
        <Section id="system" num="05" label="THE SYSTEM" className={s.systemSection}>
          <H2><Words step={HEADING_STEP}>THE SYSTEM</Words></H2>
          <ol className={s.points}>
            {system.map(([t, d]) => (
              <li key={t}>
                <p className={s.pointTitle}>{t}</p>
                <p className={s.pointDesc}>{d}</p>
              </li>
            ))}
          </ol>
        </Section>

        <hr className={s.rule} />

        {/* 06 — Design process */}
        <Section id="process" num="06" label="DESIGN PROCESS" className={s.process}>
          <H2><Words step={HEADING_STEP}>Design Process</Words></H2>

          <ol className={s.timeline}>
            {steps.map(([t, sub, d, target], i) => (
              <li key={t}>
                <div className={s.tlTrack}>
                  <span className={`${s.tlNum} ${i === 0 ? s.tlCurrent : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={s.tlRail}>
                    <span className={s.tlDot} />
                    {i < steps.length - 1 && <span className={s.tlLine} />}
                  </span>
                </div>
                {/* Lenis turns in-page anchors into a smooth scroll (instant with reduced motion). */}
                <a className={s.tlBody} href={`#${target}`}>
                  <p className={s.tlTitle}>{t}</p>
                  <p className={s.tlSub}>{sub}</p>
                  <span className={s.tlDivider} />
                  <p className={s.tlDesc}>{d}</p>
                </a>
              </li>
            ))}
          </ol>

          {/* 01 — Research */}
          <div id="process-research" className={s.block}>
            <h3 className={s.blockTitle}>
              <Words step={HEADING_STEP}>01 - Research</Words>
            </h3>
            <p className={s.blockLead}>
              I looked at the existing navigation experience, the needs of people travelling after dark, and how other
              navigation products communicate route information. The goal was to understand what information could help
              people evaluate a route beyond time and distance.
            </p>
            <div className={s.subhead}>
              <p>USER INSIGHTS</p>
              <p>6 exploratory conversations with people who regularly travel alone after dark.</p>
            </div>
            <div className={s.insightsWrap}>
              <ul className={s.insights}>
                {insights.map(([q, c, tw]) => (
                  <li key={q} style={{ "--accent": c, "--tw": tw } as CSSProperties}>
                    <p>
                      <Words step={QUOTE_STEP}>{`"${q}"`}</Words>
                    </p>
                    <span />
                  </li>
                ))}
              </ul>
            </div>

            <p className={s.reviewLabel}>COMPETITVE REVIEW</p>
            <div className={s.reviewWrap}>
              <p className={s.scrollHint} aria-hidden="true">
                SCROLL →
              </p>
              <div className={s.reviewScroll} role="region" aria-label="Competitive review (scrolls sideways on small screens)" tabIndex={0}>
                <div className={s.reviewSizer}>
                  <div className={s.review} role="table">
                    <div className={s.reviewHead} role="row">
                      <span role="columnheader">Category</span>
                      {competitors.map((c) => (
                        <span key={c.name} role="columnheader">
                          <i style={{ background: c.color }}>{c.letter}</i>
                          {c.name}
                        </span>
                      ))}
                    </div>
                    {reviewRows.map((r) => (
                      <div key={r.tag} className={s.reviewRow} role="row">
                        <span role="cell">
                          <b className={r.tone === "good" ? s.pillGood : s.pillGap}>{r.tag}</b>
                        </span>
                        {r.cells.map((c, i) => (
                          <p
                            key={i}
                            role="cell"
                            className={r.tone === "gap" && i === 2 ? s.reviewBig : undefined}
                            style={{ "--tw": r.widths[i] } as CSSProperties}
                          >
                            <span>{c}</span>
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className={s.reviewNote}>
              Competitive analysis showed that safety information existed in fragmented forms, but no competitor integrated
              contextual safety signals into the moment of route selection without overwhelming the navigation experience.
            </p>
          </div>

          {/* 02 — Ideation */}
          <div id="process-ideation" className={`${s.block} ${s.ideation}`}>
            <h3 className={s.blockTitle}>
              <Words step={HEADING_STEP}>02 - IDEATION</Words>
            </h3>
            <div className={s.ideationLead}>
              <p>Exploring how safety could become part of navigation.</p>
              <p>
                With the core needs defined, I explored different ways safety information could be introduced without
                competing with the primary navigation experience. The concepts ranged from lightweight map indicators to more
                explicit route-level information.
              </p>
            </div>

            <p className={s.blockLabel}>CONCEPT EXPLORATION</p>
            <div className={s.conceptsWrap}>
              <div className={s.concepts}>
                {concepts.map(([tag, t, d]) => (
                  <div key={tag} className={s.concept}>
                    <span className={s.conceptTag}>{tag}</span>
                    <p className={s.conceptTitle}>{t}</p>
                    <p className={s.conceptDesc}>{d}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className={s.blockLabel}>SAFETY INDICATORS</p>
            <div className={s.indicatorsWrap}>
              <ul className={s.indicators}>
                {indicators.map((it) => (
                  <li key={it.label} style={{ "--ix": it.x, "--iy": it.dy ?? 0, "--cy": it.cy ?? 0, "--rgb": it.rgb } as CSSProperties}>
                    <span className={`${s.indicatorIcon} ${it.rgb ? "" : s.indicatorBare}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={svg(it.icon)}
                        alt=""
                        width={it.w}
                        height={it.h}
                        style={{ "--iw": it.w, "--ih": it.h } as CSSProperties}
                      />
                    </span>
                    <span className={s.indicatorLabel}>{it.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.boardNotesWrap}>
              <div className={s.notes}>
                {notes.map((n) => (
                  <div key={n.title} className={s.noteSlot} style={{ "--nx": n.x, "--ny": n.y } as CSSProperties}>
                    <div className={`${s.note} ${s[`note_${n.tone}`]}`} style={{ "--rot": `${n.rot}deg` } as CSSProperties}>
                      {n.corner && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className={s.noteCorner} src={svg(`sticky-note-corner-${n.corner}`)} alt="" width={56} height={56} />
                      )}
                      <p className={s.noteTitle}>
                        <Words step={HEADING_STEP}>{n.title}</Words>
                      </p>
                      <p className={s.noteBody}>{n.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className={s.blockLabel}>WHY THIS DIRECTION?</p>
            <ol className={`${s.points} ${s.whyPoints}`}>
              {whyDirection.map(([t, d]) => (
                <li key={t}>
                  <p className={s.pointTitle}>{t}</p>
                  <p className={s.pointDesc}>{d}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* 03 — Wireframes */}
          <div id="process-wireframes" className={`${s.block} ${s.centered} ${s.wireBlock}`}>
            <h3 className={s.blockTitle}>
              <Words step={HEADING_STEP}>03 - Wireframes</Words>
            </h3>
            <p className={s.wireLabel}>LOW FIDELITY WIREFRAME</p>
            <div className={s.wireframe}>
              <div className={s.wireCrop}>
                <Image
                  src={web("wireframe-sketch")}
                  alt="Hand-drawn low-fidelity wireframes of the night mode, safe mode and safety update screens"
                  fill
                  unoptimized
                  sizes="(max-width: 767px) 92vw, 798px"
                  className={s.wireImg}
                />
              </div>
            </div>
          </div>

          {/* 04 — UI design */}
          <div id="process-ui-design" className={`${s.block} ${s.centered} ${s.uiBlock}`}>
            <h3 className={s.blockTitle}>
              <Words step={HEADING_STEP}>04 - UI Design</Words>
            </h3>
            <UiBoard />
          </div>
        </Section>

        <hr className={s.rule} />

        {/* 07 — What didn't work */}
        <Section id="didnt-work" num="07" label="WHAT DIDN’T WORK" className={s.didnt}>
          <H2><Words step={HEADING_STEP}>The first idea wasn&apos;t the final one.</Words></H2>
          <p className={s.looseLead}>
            Exploring different directions helped me understand that adding more safety information doesn&apos;t
            automatically make navigation more useful. The challenge was finding the right level of information without
            making the map feel overloaded or overly prescriptive.
          </p>
          <div className={s.ideas}>
            {ideas.map((idea) => (
              <div key={idea.t}>
                <p className={s.pointTitle}>{idea.t}</p>
                {idea.rows.map(([k, v]) => (
                  <div key={k} className={s.ideaRow}>
                    <p className={s.ideaKey}>{k}</p>
                    <p className={s.pointDesc}>{v}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Section>

        <hr className={s.rule} />

        {/* 08 — Trust & feasibility */}
        <Section id="trust" num="08" label="TRUST & FEASIBILITY" className={s.trust}>
          <H2><Words step={HEADING_STEP}>TRUST &amp; FEASIBILITY</Words></H2>
          <div className={s.trustLead}>
            <p>Safety information should provide context, not certainty.</p>
            <p>
              The concept relies on signals such as lighting, reported incidents, and foot traffic. In a real product, these
              would require verified sources, appropriate permissions, and regular updates.
            </p>
          </div>
          <div className={s.trustItems}>
            <div>
              <p className={s.pointTitle}>DATA RELIABILITY</p>
              <p className={s.pointDesc}>
                Safety conditions can change quickly. Information should show its source or recency where relevant.
              </p>
            </div>
            <div>
              <p className={s.pointTitle}>MISSING DATA</p>
              <p className={s.trustStrong}>No data ≠ safe.</p>
              <p className={s.pointDesc}>
                If reliable information isn&apos;t available, the interface should communicate “No recent data” rather than
                imply that a route is safe.
              </p>
            </div>
            <div>
              <p className={s.pointTitle}>PRIVACY &amp; ACCESS</p>
              <p className={s.pointDesc}>
                Signals such as police presence or CCTV would require appropriate permissions, partnerships, and privacy
                safeguards.
              </p>
              <p className={s.pointDesc}>
                The goal isn&apos;t to label a route “safe.” It&apos;s to give people enough context to make an informed
                decision.
              </p>
            </div>
          </div>
        </Section>

        <hr className={s.rule} />

        {/* 09 — Reflection */}
        <Section id="reflection" num="09" label="Reflection" className={s.reflection}>
          <H2><Words step={HEADING_STEP}>What I took away from the process.</Words></H2>
          <ol className={`${s.points} ${s.learnings}`}>
            {learnings.map(([t, d], i) => (
              <li key={t} style={{ "--tw": learningWidths[i] } as CSSProperties}>
                <p className={s.pointTitle}>{t}</p>
                <p className={s.pointDesc}>{d}</p>
              </li>
            ))}
          </ol>
        </Section>

        <div className={s.caseStrip}>
          {/* One label at every width; where it can't fit one line it breaks only
              between its two halves. */}
          <p>
            <span>GOOGLE MAPS REDESIGN —</span> <span>UX CASE STUDY</span>
          </p>
          {/* Lenis turns in-page anchors into a smooth scroll (instant with reduced motion). */}
          <a href="#intro">BACK TO TOP ↑</a>
        </div>

        <NextProject href="/work/voyaige" title="VoyAIge" blurb="A smarter way to plan, navigate, and experience every trip." />
      </div>

      {/* Order matters: GoogleMapsMotion marks elements, then ScrollReveal observes them. */}
      <GoogleMapsMotion />
      <ScrollReveal step={90} />
    </CaseLayout>
  );
}
