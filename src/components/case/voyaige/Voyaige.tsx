import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";
import CaseLayout from "../CaseLayout";
import { BrowserFrame, CaseHero, H2, Icon, NextProject, Section } from "../ui";
import s from "./voyaige.module.css";

/* Only the challenge cards use JetBrains Mono (Figma 3:1095–3:1136). */
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const web = (n: string) => `/images/voyaige/web/${n}.webp`;
const icon = (n: string) => `/images/voyaige/icons/${n}.svg`;
const decor = (n: string) => `/images/voyaige/decor/${n}.svg`;

const toc = [
  { id: "intro", label: "Introduction" },
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "The Challenge" },
  { id: "learned", label: "What We Learned" },
  { id: "research", label: "Research" },
  { id: "process", label: "Process" },
  { id: "ux-flow", label: "UX Flow" },
  { id: "final", label: "Final Experience" },
  { id: "didnt-work", label: "What Didn't Work" },
  { id: "reflection", label: "Reflection" },
];

/** Shown on desktop + phone, swapped for the tablet frame's own wording. */
const TabletSwap = ({ base, tablet }: { base: ReactNode; tablet: ReactNode }) => (
  <>
    <span className={s.notT}>{base}</span>
    <span className={s.tOnly}>{tablet}</span>
  </>
);

/* ---------- Data ---------- */

const glance = [
  { n: "01", t: "DISCOVER", d: "Find places and experiences worth exploring." },
  { n: "02", t: "ORGANIZE", d: "Collect and organize things you want to experience.", tint: true },
  { n: "03", t: "PLAN", d: "Build a day-by-day itinerary." },
  { n: "04", t: "EXPERIENCE", d: "Use the itinerary and navigation tools while travelling.", tint: true },
];

const challenges = [
  {
    tone: "rose",
    icon: "icon-alert-circle",
    title: "Information Overload",
    body: "Travelers spend an average of 23+ hours researching a single trip across 38+ websites, leading to decision fatigue and abandoned planning.",
    tag: "RESEARCH INSIGHT",
  },
  {
    tone: "amber",
    icon: "icon-sparkles",
    title: "Generic Recommendations",
    body: "Current travel apps use basic filters but fail to understand individual travel styles, resulting in mismatched experiences and disappointment.",
    tag: "USER FEEDBACK",
  },
  {
    tone: "blue",
    icon: "icon-shield-alert",
    title: "Solo Travel Anxiety",
    body: "67% of potential solo travellers cite safety concerns and loneliness as barriers, yet lack trusted ways to connect with compatible travel companions.",
    tag: "SURVEY DATA",
  },
];

const principles = [
  ["01", "Structure", "Give users enough organization to understand their trip."],
  ["02", "Flexibility", "Allow plans to change without forcing users to start over."],
  ["03", "Discovery", "Make finding new places part of the experience."],
  ["04", "Context", "Surface the right information at the right moment."],
];

const learned = [
  ["INSPIRATION IS SCATTERED", "Travel ideas come from multiple sources, making it difficult to turn inspiration into an organized plan."],
  ["SAVED DOESN'T MEAN PLANNED", "Collecting places is easy; deciding where and when they fit into a trip is harder."],
  ["PLANS ARE FLEXIBLE", "Travel rarely follows a perfect itinerary. The experience needs to adapt as plans change."],
  ["CONTEXT MATTERS", "The information users need while planning is very different from what they need when they are already on the move."],
];

const stats = [
  ["73%", "FELT OVERWHELMED", "by the number of choices involved in planning a trip."],
  ["86%", "WANTED PERSONALIZATION", "based on their travel style and preferences."],
  ["61%", "WOULD TRAVEL MORE", "if planning felt easier and less timeconsuming."],
];

const pillars = [
  { tone: "violet", t: "TRUST", sub: "Explain recommendations", d: "Users wanted to understand why something was recommended." },
  { tone: "rose", t: "PERSONALIZATION", sub: "Make suggestions feel relevant", d: "People trusted recommendations from travellers with similar styles and interests." },
  { tone: "orange", t: "FLEXIBILITY", sub: "Support an evolving plan", d: "Planning wasn't linear. Users moved between dreaming, researching, comparing, and booking." },
];

const processSteps = [
  { tone: "blue", deco: "01-blue", t: "RESEARCH", d: "Understand user behaviours, pain points and opportunities.", tags: ["INTERVIEWS", "SURVEYS", "COMPETITOR ANALYSIS"] },
  { tone: "rose", deco: "02-rose", t: "INSIGHTS", d: "Identify key patterns and translate them into design principles.", tags: ["USER NEEDS", "KEY INSIGHTS", "DESIGN PRINCIPLES"] },
  { tone: "orange", deco: "03-orange", t: "INFORMATION ARCHITECTURE", d: "Organize core features and content around the traveller's journey.", tags: ["SITEMAP", "FEATURE STRUCTURE", "NAVIGATION DESIGN"] },
  { tone: "green", deco: "04-green", t: "USER FLOWS", d: "Map key journeys from discovery to planning and navigating.", tags: ["PRIMARY FLOWS", "EDGE CASES", "TRANSITIONS"] },
  { tone: "indigo", deco: "05-blue", t: "WIREFRAMES", d: "Test the structure, hierarchy and key interactions.", tags: ["LOW-FIDELITY SCREENS", "ITERATIONS", "USABILITY FEEDBACK"] },
  { tone: "violet", deco: "06-violet", t: "HIGH-FIDELITY", d: "Refine the experience with visual design, interactions and details.", tags: ["VISUAL DESIGN", "COMPONENTS", "FINAL SCREENS"] },
];

const flowSteps = [
  { tone: "s1", icon: "flow-compass", t: "Explore Voyaige", items: ["Browse destinations", "Discover experiences", "View recommendations"] },
  { tone: "s2", icon: "flow-user", t: "Login / Sign Up", items: ["Create account", "Social login", "Onboarding preferences"] },
  { tone: "s3", icon: "flow-ticket", t: "Enter Trip Details", items: ["Destination", "Dates", "Budget", "Travel style / Interests"] },
  { tone: "s4", icon: "flow-sparkles", t: "Generate Smart Itinerary", items: ["Personalized places", "Daily plan", "Map view", "AI suggestions"] },
  { tone: "s5", icon: "flow-calendar", t: "Home - Timeline View", items: ["View full itinerary", "Switch days", "Reorder / edit", "Add activities"] },
];

const flowGroups: { tone: string; icon: string; t: string; items: [icon: string, label: string, sub?: string][] }[] = [
  {
    tone: "c1",
    icon: "flow-user-round",
    t: "Profile",
    items: [["flow-trophy", "Achievements"], ["flow-settings", "Account Settings"], ["flow-clock", "Past Trips"]],
  },
  {
    tone: "c2",
    icon: "flow-bar-chart-header",
    t: "Budget",
    items: [["flow-bar-chart", "Expense Overview"], ["flow-users", "Friends / Payment", "Who paid, who owes"]],
  },
  {
    tone: "c3",
    icon: "flow-chart-network",
    t: "Group",
    items: [
      ["flow-list-check", "Polls - Create & Vote"],
      ["flow-wand-sparkles", "Activities -Suggestions", "Add or Replace"],
      ["flow-message-circle", "Chat - Group Chat", "Share Ideas"],
    ],
  },
  {
    tone: "c4",
    icon: "flow-shield-check",
    t: "Safety",
    items: [["flow-alarm-clock-plus", "Emergency Access"], ["flow-map-pin", "Safe Route Mode", "Day & Night"]],
  },
];

const didntWork = [
  {
    t: "01 — Too much information, too soon",
    problem: "Trying to surface destinations, recommendations, itinerary details, budgets, and navigation at once made the experience feel overwhelming.",
    change: "I prioritized the information users needed at each stage and progressively revealed secondary details.",
  },
  {
    t: "02 — A rigid itinerary",
    problem: "An itinerary that behaved like a fixed schedule didn't reflect how real trips change.",
    change: "I introduced flexibility — allowing users to reorder, edit, replace, and add activities as plans evolve.",
  },
  {
    t: "03 — Features competing for attention",
    problem: "Adding useful features like budgeting, groups, recommendations, and safety created the risk of making the core travel experience feel fragmented.",
    change: "I organized these features around the main trip journey rather than treating each one as a separate destination.",
  },
];

const reflection = [
  ["SIMPLIFICATION IS A DESIGN DECISION", "Removing information can be just as important as adding it. The interface became clearer when I focused on what users needed in the moment."],
  ["FLEXIBILITY MATTERS MORE THAN A PERFECT PLAN", "Travel rarely follows the original itinerary. Designing for changes, alternatives, and spontaneous decisions made the experience more realistic."],
  ["RESEARCH SHOULD CHANGE THE DESIGN", "The biggest shift in Voyaige came from changing my research approach. Instead of relying only on what users said, observing real planning behaviour gave me stronger signals to design around."],
  ["A CONNECTED EXPERIENCE BEATS A COLLECTION OF FEATURES", "Voyaige has several moving parts, but they only become useful when they work together around the traveller's journey."],
];

/* ---------- Final screens board ----------
   One free-form composition (Figma 3:1646, 1036 × 4185). The tablet and phone
   frames draw the same arrangement at their column width, so every item is
   stored as its centre, unrotated size and rotation in board pixels and placed
   in percentages. */

const BW = 1036;
const BH = 4185;
const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(4)}%`;

type BoardItem = { src: string; alt?: string; c: [number, number]; size: [number, number]; rot?: number; flip?: boolean };

const boardItems: BoardItem[] = [
  { src: "onboarding-01", alt: "Onboarding: Smarter Journeys start here", c: [240.63, 281.92], size: [217.25, 449.094], rot: 5.5 },
  { src: "onboarding-02", alt: "Onboarding: Dream trips, zero tabs", c: [504.09, 290.5], size: [218.172, 451] },
  { src: "onboarding-03", alt: "Onboarding: Let's begin your journey", c: [789.91, 282.42], size: [214.711, 443.845], rot: -7.08 },
  { src: "itinerary-hand", alt: "Plan Your Trip form on a phone held in a hand", c: [93.1, 1155.2], size: [706.2, 656.4] },
  { src: "itinerary-result", alt: "Generated itinerary for Dubai with daily summary", c: [853, 1072.8], size: [262, 541.6] },
  { src: "group-01", alt: "Group trip planning with activity suggestions", c: [224, 1836.8], size: [262, 541.6] },
  { src: "group-02", alt: "Group poll for choosing activities", c: [525, 1836.8], size: [262, 541.6] },
  { src: "group-03", alt: "Group chat for the trip", c: [826, 1836.8], size: [262, 541.6] },
  { src: "night-mode", alt: "Night mode with safe travel information", c: [428.21, 2485.68], size: [314.353, 522.561], rot: 7.09 },
  { src: "safe-routes", alt: "Map showing safe route information", c: [710.19, 2476.18], size: [233.752, 483.207], rot: -8.47 },
  { src: "budget-overview", alt: "Budget overview", c: [224, 3134.8], size: [262, 541.6] },
  { src: "friend-payments", alt: "Updated friend payments", c: [535, 3294.8], size: [262, 541.6] },
  { src: "balances", alt: "Balances between friends", c: [240, 3743.8], size: [262, 541.6] },
  /* Hand-drawn arrows (image 52–56 and image 48–55 in the file). */
  { src: "doodle-arrow-a", c: [280.5, 1509.5], size: [113, 113] },
  { src: "doodle-arrow-a", c: [417, 2907], size: [86, 86] },
  { src: "doodle-arrow-a", c: [716.45, 3316.02], size: [76.086, 76.086], rot: -58.78, flip: true },
  { src: "doodle-arrow-a", c: [412.5, 3788.5], size: [81, 81], flip: true },
  { src: "doodle-arrow-b", c: [282.01, 615.45], size: [268, 167] },
  { src: "doodle-arrow-b", c: [664.59, 1152.94], size: [117.251, 75.486], rot: -3.1 },
  { src: "doodle-arrow-b", c: [460.26, 989.18], size: [101.129, 65.106], rot: 26.59 },
  { src: "doodle-arrow-b", c: [217.04, 2528.56], size: [132.595, 85.364], rot: -94.75, flip: true },
  { src: "doodle-arrow-b", c: [884.35, 2437.14], size: [101.129, 65.106], rot: -80.64 },
];

/* Captions: horizontal centre and top in board pixels (Figma 3:1668–3:1675). */
const captions: { x: number; y: number; big?: boolean; soft?: boolean; content: ReactNode }[] = [
  { x: 514.01, y: 630.14, big: true, content: "The onboarding flow" },
  {
    x: 540.01,
    y: 1040.14,
    content: (
      <>
        itinerary
        <br />
        generation
      </>
    ),
  },
  {
    x: 494.51,
    y: 1365.14,
    soft: true,
    content: (
      <>
        Group
        <span className={s.capList}>
          <span>activity suggestions</span>
          <span>poles</span>
          <span>group chat</span>
        </span>
      </>
    ),
  },
  { x: 181.01, y: 2437.14, soft: true, content: "Night mode (safe travel)" },
  { x: 905.51, y: 2364.14, soft: true, content: "safe routes info" },
  { x: 534.51, y: 2864.14, soft: true, content: "Budget overview" },
  { x: 796.01, y: 3240.58, soft: true, content: "updated friend payments" },
  { x: 518.01, y: 3793.14, soft: true, content: "Balances" },
];

function FinalBoard() {
  return (
    <div className={s.boardWrap}>
      <div className={s.board}>
        {boardItems.map((it, i) => {
          const [cx, cy] = it.c;
          const [w, h] = it.size;
          const style = {
            left: pct(cx - w / 2, BW),
            top: pct(cy - h / 2, BH),
            width: pct(w, BW),
            height: pct(h, BH),
            transform: it.rot || it.flip ? `rotate(${it.rot ?? 0}deg)${it.flip ? " scaleY(-1)" : ""}` : undefined,
          } as CSSProperties;
          return (
            <div key={i} className={s.boardItem} style={style} aria-hidden={it.alt ? undefined : true}>
              <Image src={web(it.src)} alt={it.alt ?? ""} fill unoptimized sizes="720px" className={s.cover} />
            </div>
          );
        })}
        {captions.map((c, i) => (
          <p
            key={i}
            className={`${s.caption} ${c.big ? s.capBig : ""} ${c.soft ? s.capSoft : ""}`}
            style={{ left: pct(c.x, BW), top: pct(c.y, BH) }}
          >
            {c.content}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function Voyaige() {
  return (
    <CaseLayout toc={toc} footer="UX CASE STUDY 2025">
      <div className={`${s.root} ${jetbrains.variable}`}>
        <CaseHero
          className={s.hero}
          name="VOYAIGE"
          tag="TRAVEL PLANNING"
          title="A smarter way to plan, navigate, and experience every trip."
          lead={
            <>
              A smart all in one travel planner that builds realistic, time aware itineraries and simplifies every part
              of the travel experience<span className={s.pOnly}> —</span> planning, safety, navigation and budgeting.
            </>
          }
          meta={[
            { label: "ROLE", value: "UI / UX DESIGN" },
            { label: "PLATFORM", value: "MOBILE" },
            { label: "TEAM", value: "SOLO PROJECT" },
            { label: "TIMELINE", value: "4 WEEKS" },
          ]}
        >
          <BrowserFrame
            unoptimized
            src={web("hero-mobile-experience")}
            url="voyaige.app"
            bar="#eef4fb"
            w={1112}
            h={562}
            alt="Three Voyaige mobile screens: trip details, the welcome screen and a Dubai itinerary"
          />
          {/* No prototype URL is in the design file yet; same placeholder as Mello's hero link. */}
          <a className={s.protoLink} href="#">
            <span className={s.notP}>VIEW PROTOTYPE ↗</span>
            <span className={s.pOnly}>VIEW LIVE PRODUCT ↗</span>
          </a>
        </CaseHero>

        {/* 01 — Overview */}
        <Section id="overview" num="01" label="OVERVIEW" className={s.overview}>
          <H2 className={s.h2}>What is Voyaige?</H2>
          <p className={`${s.lightText} ${s.notTB}`}>
            VoyAIge is a smart,all-in-one travel planner designed to help modern travelers create realistic,
            time-aware itineraries without switching between multiple apps.It generates day-by-day plans based on
            trip duration, interests, commute time, safety levels, and opening hours. VoyAIge combines itinerary
            planning, navigation, budgeting, and group coordination into one seamless experience making travel
            smoother, safer, and more organized.
          </p>
          {/* The tablet frame (2:9903) words the overview differently and puts the
              second paragraph before the kicker. */}
          <p className={`${s.lightText} ${s.tOnlyB}`}>
            Voyaige is a travel-planning experience designed to bring different parts of a trip — from discovering
            places to building an itinerary and navigating during the journey — into one connected experience.
          </p>
          <p className={`${s.lightText} ${s.tOnlyB}`}>
            Instead of making users jump between different tools and apps, Voyaige explores how travel planning can feel
            more organized, visual, and personal.
          </p>
          <p className={s.kicker}>The experience at a glance</p>
          <p className={`${s.lightText} ${s.afterKicker} ${s.notTB}`}>
            Instead of making users jump between different tools and apps, Voyaige explores how travel planning can feel
            more organized, visual, and personal.
          </p>
          <ol className={s.glance}>
            {glance.map((g) => (
              <li key={g.n} className={g.tint ? s.tint : undefined}>
                <span className={s.glanceNum}>{g.n}</span>
                <span className={s.glanceTitle}>{g.t}</span>
                <span className={s.glanceDesc}>{g.d}</span>
              </li>
            ))}
          </ol>
        </Section>

        <hr className={s.rule} />

        {/* 02 — Challenge */}
        <Section id="challenge" num="02" label="THE CHALLENGE" className={s.challenge}>
          <H2 className={s.h2}>Making travel planning feel less fragmented.</H2>
          <p className={s.body}>
            The Current travel apps help users discover places but fail to support them in creating realistic, functional
            itineraries. Travelers are forced to switch between maps, notes, budgeting tools, and group chats resulting in
            confusion, time consuming planning, and fragmented decision making. Without time awareness, budget alignment,
            or safety context, users often end up with unclear schedules, inefficient routes, unexpected expenses, and
            difficulty coordinating with their travel group.
          </p>
          <ul className={s.cards}>
            {challenges.map((c, i) => (
              <li key={c.title} className={`${s.card} ${s[c.tone] ?? ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={s.glow} src={decor(`card-glow-${c.tone}`)} alt="" width={132} height={144} />
                <div className={s.cardHead}>
                  <span>/ 0{i + 1}</span>
                  <i />
                  <b />
                </div>
                <div className={s.cardBody}>
                  <span className={s.cardIcon}>
                    <Icon src={icon(c.icon)} w={14.4} h={14.4} />
                  </span>
                  <p className={s.cardTitle}>{c.title}</p>
                  <p className={s.cardText}>{c.body}</p>
                </div>
                <span className={s.cardTag}>{c.tag}</span>
              </li>
            ))}
          </ul>
          <div className={s.question}>
            <p className={s.questionLabel}>DESIGN QUESTION</p>
            <p className={s.questionText}>
              How might we make travel planning easier to organize while keeping the experience flexible enough for
              spontaneous exploration?
            </p>
          </div>
          <ol className={s.principles}>
            {principles.map(([n, t, d]) => (
              <li key={n}>
                <span className={s.glanceNum}>{n}</span>
                <span className={s.principleTitle}>{t}</span>
                <span className={s.principleDesc}>{d}</span>
              </li>
            ))}
          </ol>
        </Section>

        <hr className={s.rule} />

        {/* 03 — What we learned */}
        <Section id="learned" num="03" label="WHAT WE LEARNED" className={s.learned}>
          <H2 className={`${s.h2} ${s.h2Learned}`}>What did we learn?</H2>
          <p className={s.body}>
            The research and synthesis phase revealed recurring patterns in how people discover, organize, and experience
            travel.
          </p>
          <ol className={s.learnList}>
            {learned.map(([t, d], i) => (
              <li key={t}>
                <span className={s.learnNum}>0{i + 1} —</span>
                <div>
                  <p className={s.learnTitle}>{t}</p>
                  <p className={s.learnDesc}>{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className={s.opportunity}>
            The opportunity was not simply to help users plan a trip, but to connect the fragmented moments between
            discovering something and actually experiencing it.
          </p>
        </Section>

        <hr className={s.rule} />

        {/* 04 — Research */}
        <Section id="research" num="04" label="RESEARCH" className={s.research}>
          <H2 className={s.h2}>Understanding the travel-planning journey</H2>
          <div className={s.researchIntro}>
            <p className={s.researchKicker}>Looking beyond what people say</p>
            <p className={s.body}>
              A mix of qualitative and quantitative research helped uncover how people actually discover, compare, and
              plan travel.
            </p>
          </div>
          <h3 className={s.subhead}>01 — HOW I RESEARCHED</h3>
          <div className={s.methods}>
            <Image
              src={web("research-methods")}
              alt="Research methods: 10 participant interviews, surveys, a competitive analysis of 5 apps and 2-week diary studies"
              fill
              unoptimized
              sizes="(max-width: 1099px) 92vw, 1057px"
              className={s.contain}
            />
          </div>
          <h3 className={s.subhead}>02 — WHAT STOOD OUT</h3>
          <ul className={s.stats}>
            {stats.map(([n, t, d]) => (
              <li key={n}>
                <span className={s.statNum}>{n}</span>
                <span className={s.statLabel}>{t}</span>
                <span className={s.statDesc}>{d}</span>
              </li>
            ))}
          </ul>
          <p className={s.statQuote}>
            The opportunity was clear: reduce the effort of planning without taking away the freedom to explore.
          </p>
          <h3 className={`${s.subhead} ${s.patternsHead}`}>03 — PATTERNS I FOUND</h3>
          {/* The file crops the top of this image (its own "03 — Patterns that emerged"
              heading) out of view; the window keeps the image's proportions. */}
          <div className={s.patterns}>
            <Image
              src={web("research-patterns")}
              alt="Patterns found: trust in algorithms (“Why this?”), social validation (“People like me”) and progressive planning (“What's next?”)"
              width={2092}
              height={752}
              unoptimized
              sizes="(max-width: 1099px) 100vw, 1126px"
              className={s.patternsImg}
            />
          </div>
          <h3 className={s.subhead}>04 — FROM RESEARCH → DESIGN</h3>
          <div className={s.pillars}>
            {pillars.map((p, i) => (
              <div key={p.t} className={`${s.pillar} ${s[p.tone] ?? ""}`}>
                <span className={s.pillarNum}>0{i + 1}</span>
                <span className={s.stem} />
                <div className={s.pillarCard}>
                  <span>
                    <span className={s.pillarTitle}>{p.t}</span>
                    <span className={s.pillarSub}>{p.sub}</span>
                  </span>
                  <Icon src={icon(`chevron-pointer-${p.tone}`)} w={16.004} h={13.86} />
                </div>
                <span className={`${s.stem} ${s.stemLong}`} />
                <p className={s.pillarDesc}>{p.d}</p>
                {/* Desktop-only wavy connector from this card's right edge to the next
                    card's left edge, with a dot at each end (3:1277–3:1316). */}
                {i < pillars.length - 1 && (
                  <span className={s.link} aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={decor(i === 0 ? "waves-ladder-violet" : "waves-ladder-rose")}
                      alt=""
                      width={i === 0 ? 131.04 : 134.4}
                      height={13.44}
                    />
                    <i />
                    <i />
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className={s.pill}>
            <span className={s.pillLead}>The opportunity wasn’t just to help people plan a trip</span>
            {" – "}
            <strong>it was to help them make confident decisions throughout the journey</strong>
            <strong className={s.pillDot}>.</strong>
          </p>
        </Section>

        <hr className={s.rule} />

        {/* 05 — Process */}
        <Section id="process" num="05" label="PROCESS" className={s.process}>
          <H2 className={`${s.h2} ${s.h2Ink}`}>Turning insights into structure</H2>
          <p className={s.processLead}>
            With the key pain points identified, I <b>moved</b> from understanding the problem to defining how Voyaige
            should actually work.
          </p>
          <div className={s.processWrap}>
            <ol className={s.processGrid}>
              {processSteps.map((p, i) => (
                <li key={p.t} className={s[`p_${p.tone}`]}>
                  <div className={s.processCard}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={s.deco} src={decor(`process-decorator-${p.deco}`)} alt="" width={47.36} height={42.24} />
                    <span className={s.processNum}>0{i + 1}</span>
                    <span className={s.processTitle}>{p.t}</span>
                    <span className={s.processDesc}>{p.d}</span>
                    <span className={s.processLine} />
                    <span className={s.processTags}>
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </span>
                  </div>
                  {i < processSteps.length - 1 && (
                    <span className={`${s.processArrow} ${i === 0 ? s.processArrowTilt : ""}`} aria-hidden="true">
                      <Icon src={icon(`arrow-down-right-0${i + 1}`)} w={15.36} h={20.48} />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <hr className={s.rule} />

        {/* 06 — UX flow */}
        <Section id="ux-flow" num="06" label="UX FLOW" className={s.flowSection}>
          <H2 className={s.h2}>VoyAIge user flow</H2>
          <p className={s.body}>
            From discovering a destination to planning with friends, managing expenses, and staying safe — the flow is
            designed to take users from inspiration to an organized, real-world travel experience.
          </p>
          <p className={s.scrollHint} aria-hidden="true">
            SCROLL →
          </p>
          {/* Phone keeps the diagram at its tablet size and scrolls it sideways in its own box. */}
          <div className={s.flowScroll} tabIndex={0} role="region" aria-label="VoyAIge user flow diagram">
            <div className={s.flow}>
              <ol className={s.flowSteps}>
                {flowSteps.map((f, i) => (
                  <li key={f.t} className={s.flowStepItem}>
                    <div className={`${s.flowStep} ${s[f.tone] ?? ""}`}>
                      <div className={s.flowHead}>
                        <span className={s.flowNum}>0{i + 1}</span>
                        <span className={s.flowIcon}>
                          <Icon src={icon(f.icon)} w={12.96} h={12.96} />
                        </span>
                      </div>
                      <p className={s.flowTitle}>{f.t}</p>
                      <ul className={s.flowList}>
                        {f.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </div>
                    {i < flowSteps.length - 1 && (
                      <span className={s.flowArrow} aria-hidden="true">
                        <Icon src={icon(`flow-arrow-right-0${i + 1}`)} w={19.44} h={19.44} />
                      </span>
                    )}
                  </li>
                ))}
              </ol>
              <div className={s.flowLinks} aria-hidden="true">
                <i className={s.flowRise} />
                <i className={s.flowSpan} />
                {flowGroups.map((g) => (
                  <i key={g.t} className={s.flowDrop} />
                ))}
              </div>
              <ol className={s.flowGroups} start={6}>
                {flowGroups.map((g, i) => (
                  <li key={g.t} className={`${s.flowGroup} ${s[g.tone] ?? ""}`}>
                    <div className={s.groupHead}>
                      <span>
                        <span className={s.flowNum}>0{i + 6}</span>
                        <span className={s.groupTitle}>{g.t}</span>
                      </span>
                      <span className={s.groupIcon}>
                        <Icon src={icon(g.icon)} w={14.58} h={14.58} />
                      </span>
                    </div>
                    <ul className={s.groupItems}>
                      {g.items.map(([ic, label, sub]) => (
                        <li key={label}>
                          <span className={s.flowIcon}>
                            <Icon src={icon(ic)} w={12.96} h={12.96} />
                          </span>
                          <span>
                            <span className={s.groupLabel}>{label}</span>
                            {sub && <span className={s.groupSub}>{sub}</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>

        <hr className={s.rule} />

        {/* 07 — Final experience */}
        <Section id="final" num="07" label="FINAL EXPERIENCE" className={s.final}>
          <H2 className={s.h2}>
            <TabletSwap base="High fidelity screens" tablet="The final experience" />
          </H2>
          <p className={s.body}>The final experience translates the research and flows into a cohesive mobile product.</p>
          <FinalBoard />
        </Section>

        <hr className={s.rule} />

        {/* 08 — What didn't work */}
        <Section id="didnt-work" num="08" label="WHAT DIDN'T WORK" className={s.didnt}>
          <H2 className={s.h2}>What didn&apos;t work?</H2>
          <p className={s.body}>
            Not every idea survived the process, some early directions looked promising on paper but created more
            complexity once I considered how travellers would actually use them.
          </p>
          <div className={s.didntList}>
            {didntWork.map((d) => (
              <div key={d.t}>
                <h3 className={s.didntTitle}>{d.t}</h3>
                <dl>
                  <div>
                    <dt>The problem</dt>
                    <dd>{d.problem}</dd>
                  </div>
                  <div>
                    <dt>What changed</dt>
                    <dd>{d.change}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </Section>

        <hr className={s.rule} />

        {/* 09 — Reflection */}
        <Section id="reflection" num="09" label="REFLECTION" className={s.reflection}>
          <H2 className={s.h2}>What I learned</H2>
          <ol className={s.reflectList}>
            {reflection.map(([t, d], i) => (
              <li key={t}>
                <span className={s.reflectNum}>0{i + 1} —</span>
                <div>
                  <p className={s.learnTitle}>{t}</p>
                  <p className={s.learnDesc}>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <div className={s.caseStrip}>
          <p>VOYAIGE — UX CASE STUDY — 2026</p>
          {/* Lenis turns in-page anchors into a smooth scroll (instant with reduced motion). */}
          <a href="#intro">BACK TO TOP ↑</a>
        </div>

        <NextProject
          href="/work/musemap"
          title="MuseMap"
          blurb="A visual discovery platform for finding galleries, exhibitions, museums and creative spaces around you."
        />
      </div>
    </CaseLayout>
  );
}
