import Image from "next/image";
import type { ReactNode } from "react";
import CaseLayout from "../CaseLayout";
import { CaseHero, H2, Icon, NextProject, Section } from "../ui";
import s from "./musemap.module.css";

const web = (n: string) => `/images/musemap/web/${n}.webp`;
const icon = (n: string) => `/images/musemap/icons/${n}.svg`;
const pic = (n: string) => `/images/musemap/problem/${n}`;

const toc = [
  { id: "intro", label: "Introduction" },
  { id: "problem", label: "problem" },
  { id: "research", label: "research" },
  { id: "opportunity", label: "design opportunity" },
  { id: "decisions", label: "KEY DESIGN DECISIONS" },
  { id: "ux-flow", label: "UX FLOW" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "evolution", label: "DESIGN EVOLUTION" },
  { id: "ecosystem", label: "The ecosystem around discovery" },
  { id: "reflection", label: "reflection" },
];

/** Copy that the desktop frame words differently from the tablet and phone frames. */
const Swap = ({ d, m }: { d: ReactNode; m: ReactNode }) => (
  <>
    <span className={s.dOnly}>{d}</span>
    <span className={s.mOnly}>{m}</span>
  </>
);

/* ---------- Data ---------- */

const methods: [title: string, body: string, large?: boolean][] = [
  [
    "informal conversations",
    "Spoke with people who regularly visit exhibitions and creative spaces to understand how they discover and evaluate places to visit.",
  ],
  ["COMPETITOR ANALYSIS", "Compared how existing art and event platforms support discovery and decision-making.", true],
  [
    "PLATFORM ANALYSIS",
    "Looked at how people use Instagram, Google and gallery websites to discover and evaluate places to visit.",
    true,
  ],
];

const findings = [
  ["01 — Discovery is scattered", "People rely on multiple platforms to find exhibitions, galleries and events, making the process fragmented."],
  [
    "02 — Context influences the decision",
    "Users need more than the name of an exhibition. Location, timing, artist and what to expect help them decide whether it's worth visiting.",
  ],
  [
    "03 — Discovery isn't always intentional",
    "People don't always start with a specific exhibition in mind. Sometimes they simply want to discover what's happening around them.",
  ],
];

const steps = [
  { tone: "lilac", icon: "opportunity-map-pin", t: "Explore", d: "See what’s happening around you." },
  { tone: "pink", icon: "opportunity-grid", t: "Discover", d: "Find exhibitions, galleries and creative spaces." },
  { tone: "blue", icon: "opportunity-book", t: "Learn", d: "Understand what you’re about to experience." },
  { tone: "green", icon: "opportunity-bookmark", t: "Save", d: "Keep places worth coming back to." },
];

const decisions: { t: string; d: ReactNode }[] = [
  {
    t: "Make discovery visual",
    d: (
      <Swap
        d="Research showed that discovery often begins through visual platforms like Instagram, so I moved away from a conventional list-based experience and used imagery as the primary discovery mechanism."
        m="Art is inherently visual, so I moved away from a conventional list-based experience and used imagery to make exploration more engaging."
      />
    ),
  },
  {
    t: "Make location part of discovery",
    d: "The map isn't only for finding directions. It helps users discover galleries and exhibitions they might not have searched for.",
  },
  {
    t: "Give context before the visit",
    d: (
      <Swap
        d="Users need more than the name of an exhibition to decide whether it's worth visiting. The exhibition page brings together the artist, exhibition, location and timing so users can evaluate it before they go."
        m="An exhibition page brings together the details users need — artist, exhibition, location and timing — so they can decide whether they want to explore it."
      />
    ),
  },
];

const experience: {
  t: string;
  key: string;
  phones: [src: string, alt: string][];
  copy: [title: string, lead: string, body: string][];
}[] = [
  {
    t: "01 — The Journey Begins",
    key: "journey",
    phones: [
      ["journey-01-first-impression", "MuseMap splash screen with a collage of curated artwork"],
      ["journey-02-sign-in", "MuseMap sign-in screen"],
      ["journey-03-home", "MuseMap home screen with quick actions"],
    ],
    copy: [
      ["01 — FIRST IMPRESSION", "An identity rooted in art", "Curated artwork establishes MuseMap’s visual identity and sets the tone for the experience."],
      ["02 — GET STARTED", "A simple path into the experience", "A straightforward sign-in flow gets users into the app with minimal friction."],
      ["03 — EXPLORE", "Start with what's around you", "The home screen brings nearby galleries, exhibitions and discovery options together in one place."],
    ],
  },
  {
    t: "02 — Discover Your Next Stop",
    key: "discover",
    phones: [
      ["discover-01-browse", "Gallery listings with search and filters"],
      ["discover-02-gallery-detail", "Gallery detail page with exhibitions and visit information"],
      ["discover-03-map", "Map view of nearby galleries"],
    ],
    copy: [
      ["01 — BROWSE", "Find galleries that match your interests", "Users can search and scan gallery listings with key information at a glance."],
      ["02 — EXPLORE", "Go beyond the listing", "A gallery detail page brings together exhibitions, timings, pricing and essential visit information."],
      ["03 — LOCATE", "See what's around you", "The map view turns location into a discovery tool, helping users find galleries nearby."],
    ],
  },
  {
    t: "03 — Make It Worth the Visit",
    key: "visit",
    phones: [
      ["visit-01-profile", "Profile with visit history, reviews and achievements"],
      ["visit-02-booking", "Ticket booking with date, time and ticket type"],
      ["visit-03-offers", "Special offers and discounts"],
    ],
    copy: [
      ["01 — PLAN", "Turn interest into a visit", "Users can choose a date, time and ticket type before heading to the gallery."],
      ["02 — SAVE", "Make every visit count", "The profile keeps track of galleries visited, reviews, tickets and progress."],
      ["03 — DISCOVER MORE", "Find more ways to explore", "Offers and discounts give users another reason to discover and revisit galleries."],
    ],
  },
];

const evolution: { t: string; problem: ReactNode; change: ReactNode }[] = [
  {
    t: "01 — From a gallery directory to a discovery experience",
    problem: "A list could help users find galleries, but it limited discovery to whatever appeared in the results.",
    change:
      "I introduced a map-based view alongside the list, allowing users to explore galleries spatially and discover places they may not have actively searched for.",
  },
  {
    t: "02 — From gallery information to visit planning",
    problem: "Finding a gallery was only the first step. Users still needed to look elsewhere for practical details.",
    change:
      "I brought exhibitions, opening hours, ticket prices, visitor information, accessibility and parking into the gallery experience, giving users the context they need before visiting.",
  },
  {
    t: "03 — From a single visit to an ongoing journey",
    problem: (
      <Swap
        d="The core experience could end once a user discovered and visited a gallery. I explored ways to make MuseMap useful beyond a single visit."
        m="The experience could easily end once a user found and visited a gallery."
      />
    ),
    change: (
      <Swap
        d="Personal profiles, reviews, visit history, achievements and offers as potential ways to extend the experience beyond discovery and planning."
        m="I extended MuseMap with a personal profile, reviews, visit history and achievements, giving users a way to keep track of their art journey beyond a single visit."
      />
    ),
  },
];

const ecosystem = [
  ["For visitors", "Makes exhibitions easier to discover, understand and plan for by bringing location, timing, artist and visit information together."],
  [
    "For galleries & organisers",
    "Creates another channel to surface exhibitions, attract relevant visitors and provide the practical information people need before deciding to visit.",
  ],
  [
    "For MuseMap",
    "The platform could eventually support promoted exhibitions, ticketing or partnerships with cultural spaces, while keeping discovery at the centre of the experience.",
  ],
];

const reflection = [
  ["Designing for discovery is different from designing for search.", "Users don't always know what they're looking for."],
  ["Context can be as important as content.", "Location, timing and practical information influence the decision to visit."],
  [
    "A product can extend beyond its core task.",
    "MuseMap isn't just about finding galleries — the profile and visit features create continuity.",
  ],
];

/* ---------- Problem diagram ----------
   One illustration (Figma 3:2690, 1069.8 × 573): four discovery sources feeding
   into the MuseMap phone. The tablet and phone frames draw the same composition
   at their column width, so it is laid out in design pixels (--u) and scales
   with its container. */

function SourcesDiagram() {
  return (
    <div className={s.diagramWrap}>
      <div
        className={s.diagram}
        role="img"
        aria-label="Instagram, Google, gallery websites and recommendations from friends all feed into the MuseMap app"
      >
        {/* Instagram */}
        <div className={`${s.source} ${s.srcInsta}`}>
          <div className={s.srcHead}>
            <span className={s.instaTile}>
              <Icon src={icon("instagram-glyph")} w={19.7} h={19.7} />
            </span>
            <span>Instagram</span>
          </div>
          <p className={s.srcDesc}>See exhibitions through posts and reels.</p>
          <div className={s.posts}>
            <div className={`${s.post} ${s.postFront}`}>
              <div className={s.postChrome}>
                <Icon src={pic("instagram-post-avatar-1.png")} w={10.278} h={10.278} />
                <span>•••</span>
              </div>
              <div className={s.postPhoto}>
                <Image src={web("instagram-post-gallery-hall")} alt="" fill unoptimized sizes="140px" className={s.cover} />
              </div>
              <div className={s.postActions}>
                <Icon src={icon("heart")} w={6.42} h={6.42} />
                <Icon src={icon("message-circle")} w={6.42} h={6.42} />
                <Icon src={icon("send")} w={6.42} h={6.42} />
              </div>
              <i className={s.caption} />
            </div>
            <div className={`${s.post} ${s.postBack}`}>
              <div className={s.postChrome}>
                <Icon src={pic("instagram-post-avatar-2.png")} w={8.993} h={8.993} />
                <span>•••</span>
              </div>
              <div className={s.postPhoto}>
                <Image src={web("instagram-post-gallery-paintings")} alt="" fill unoptimized sizes="120px" className={s.cover} />
              </div>
              <div className={s.postActions}>
                <Icon src={icon("heart-small")} w={5.78} h={5.78} />
                <Icon src={icon("message-circle-small")} w={5.78} h={5.78} />
              </div>
            </div>
          </div>
        </div>

        {/* Google */}
        <div className={`${s.source} ${s.srcGoogle}`}>
          <div className={s.srcHead}>
            <Icon src={icon("google-logo")} w={18.843} h={18.843} />
            <span>Google</span>
          </div>
          <p className={s.srcDesc}>Search for galleries and exhibitions.</p>
          <div className={s.searchBar}>
            <Icon src={icon("search-grey")} w={10.278} h={10.278} />
            <span>art galleries near me</span>
            <b>×</b>
          </div>
          <div className={s.results}>
            {["search-result-museum-facade", "search-result-gallery-interior"].map((r) => (
              <div key={r} className={s.result}>
                <div className={s.resultImg}>
                  <Image src={web(r)} alt="" fill unoptimized sizes="110px" className={s.cover} />
                </div>
                <span className={s.resultLines}>
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery websites */}
        <div className={`${s.source} ${s.srcGallery}`}>
          <div className={s.srcHead}>
            <Icon src={icon("globe")} w={22.27} h={22.27} />
            <span>Gallery websites</span>
          </div>
          <p className={s.srcDesc}>Check individual gallery pages for details.</p>
          <div className={s.miniBrowser}>
            <div className={s.miniBar}>
              <Icon src={icon("window-control-red")} w={5.139} h={5.139} />
              <Icon src={icon("window-control-yellow")} w={5.139} h={5.139} />
              <Icon src={icon("window-control-green")} w={5.139} h={5.139} />
              <span className={s.miniLinks}>
                <span>Exhibitions</span>
                <span>Visit</span>
                <span>About</span>
              </span>
              <Icon src={icon("menu")} w={8.565} h={8.565} />
            </div>
            <div className={s.miniImg}>
              <Image src={web("gallery-site-exhibition")} alt="" fill unoptimized sizes="320px" className={s.cover} />
            </div>
            <div className={s.miniFoot}>
              <span>
                Current
                <br />
                Exhibitions
              </span>
              <b>→</b>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className={`${s.source} ${s.srcRecs}`}>
          <div className={s.srcHead}>
            <Icon src={icon("users")} w={22.27} h={22.27} />
            <span>Recommendations</span>
          </div>
          <p className={s.srcDesc}>Hear about exhibitions from friends and the community.</p>
          <div className={s.messages}>
            {[
              ["woman", "You should check this out!"],
              ["man", "There’s a new exhibition at MAP"],
              ["woman", "This gallery is amazing"],
              ["man", "Let’s go this weekend?"],
            ].map(([who, text], i) => (
              <div key={text} className={s.message}>
                <Icon src={pic(`friend-avatar-${who}.png`)} w={23.126} h={23.126} />
                <span className={s[`bubble${i}`]}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={s.converge} src="/images/musemap/problem/converging-sources.svg" alt="" width={847.081} height={55.67} />

        {/* MuseMap phone */}
        <div className={s.phone}>
          <i className={s.island} />
          <div className={s.screen}>
            <div className={s.status}>
              <b>9:41</b>
              <span>
                <Icon src={icon("ios-signal")} w={9.42} h={9.42} />
                <Icon src={icon("ios-wifi")} w={9.42} h={9.42} />
                <Icon src={icon("ios-battery")} w={13.704} h={9.42} />
              </span>
            </div>
            <div className={s.appBar}>
              <span>
                <span className={s.brand}>MuseMap</span>
                <span className={s.loc}>
                  <Icon src={icon("map-pin-brown")} w={5.996} h={5.996} />
                  MG road, Bengaluru
                </span>
              </span>
              <span className={s.appActions}>
                <Icon src={icon("bell")} w={9.42} h={9.42} />
                <Icon src={icon("settings")} w={9.42} h={9.42} />
              </span>
            </div>
            <div className={s.banner}>
              <Image src={web("welcome-banner-texture")} alt="" fill unoptimized sizes="360px" className={s.cover} />
              <span className={s.bannerTitle}>Welcome to your art journey</span>
              <span className={s.bannerSub}>
                Discover amazing galleries and
                <br />
                exhibitions near you
              </span>
            </div>
            <div className={s.quick}>
              <span className={s.quickTitle}>Quick Actions</span>
              <span className={s.quickCards}>
                {[
                  ["search-white", "Find Galleries", "Search by style and", "location"],
                  ["ticket-percent", "Get Discounts", "View special offers", "and deals"],
                ].map(([ic, t, l1, l2]) => (
                  <span key={t} className={s.quickCard}>
                    <span className={s.quickIcon}>
                      <Icon src={icon(ic)} w={10.278} h={10.278} />
                    </span>
                    <span className={s.quickName}>{t}</span>
                    <span className={s.quickDesc}>
                      {l1}
                      <br />
                      {l2}
                    </span>
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function MuseMap() {
  return (
    <CaseLayout toc={toc} footer="UX CASE STUDY 2025">
      {/* The desktop frame wraps these three contents labels onto two lines
          (3:2572, 3:2578, 3:2602: 94 / 75 / 114 wide). Scoped to this page's links. */}
      <style href="mm-toc-wrap" precedence="default">
        {`nav[aria-label="Case study contents"] a[href="#opportunity"] > span:last-child { white-space: normal; max-width: 94px; line-height: 16px; }
nav[aria-label="Case study contents"] a[href="#decisions"] > span:last-child { white-space: normal; max-width: 75px; line-height: 16px; }
nav[aria-label="Case study contents"] a[href="#ecosystem"] > span:last-child { white-space: normal; max-width: 114px; line-height: 16px; }`}
      </style>
      <div className={s.root}>
        <CaseHero
          className={s.hero}
          name="MUSEMAP"
          tag=""
          title="Discover art beyond the obvious."
          lead="A visual discovery platform for finding galleries, exhibitions, museums and creative spaces around you."
          meta={[
            { label: "ROLE", value: "UI / UX DESIGN" },
            { label: "TOOLS", value: "FIGMA/FIGJAM" },
            { label: "PLATFORM", value: "MOBILE" },
            { label: "TIMELINE", value: "3 WEEKS" },
          ]}
        >
          <div className={s.browser}>
            <div className={s.browserBar}>
              <i />
              <i />
              <i />
              <b />
              <span>musemap.app</span>
            </div>
            <div className={s.browserView}>
              <Image
                src={web("hero-phones-gallery-ribbon")}
                alt="Two MuseMap phones, the home screen and featured galleries, with a ribbon of gallery cards"
                width={1536}
                height={1024}
                unoptimized
                priority
                sizes="(max-width: 1099px) 92vw, 1112px"
                className={s.heroImg}
              />
            </div>
          </div>
          {/* No prototype URL is in the design file; same placeholder as the other case studies. */}
          <a className={s.protoLink} href="#">
            VIEW PROTOTYPE ↗
          </a>
        </CaseHero>

        {/* 01 — The problem */}
        <Section id="problem" num="01" label="THE problem" className={s.problem}>
          <H2 className={s.h2}>Finding art shouldn&apos;t require knowing where to look.</H2>
          <div className={s.problemText}>
            <p>
              Art exhibitions and galleries are often discovered through scattered sources — social media, search engines,
              individual gallery websites and word of mouth.
            </p>
            <p className={s.gapLine}>This makes it difficult to answer a simple question:</p>
            <p className={s.question}>“What&apos;s worth exploring around me?”</p>
            <div className={s.labelled}>
              <p className={s.ink}>ORIGIN</p>
              <p>
                This problem became personal when I tried to find the Malleshwaram ArtWalk and struggled to find clear,
                centralized information about it across existing platforms.
              </p>
            </div>
            <div className={s.labelled}>
              <p className={s.ink}>THE OPPORTUNITY</p>
              <p>How might we make discovering art more accessible, contextual and exploratory?</p>
            </div>
          </div>
          <SourcesDiagram />
        </Section>

        <hr className={s.rule} />

        {/* 02 — Research */}
        <Section id="research" num="02" label="RESEARCH" className={s.research}>
          <H2 className={`${s.h2} ${s.h2Research}`}>Understanding how people discover art</H2>
          <p className={s.researchIntro}>
            <Swap
              d="I explored how people discover galleries, exhibitions and creative spaces, focusing on where they look, what information influences their decisions, and how discovery happens across different platforms."
              m="I explored how people discover galleries, exhibitions and creative spaces, looking at their existing behaviours, platforms and the gaps between them."
            />
          </p>
          <dl className={s.methods}>
            {methods.map(([t, d, large]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd className={large ? s.ddLarge : undefined}>{d}</dd>
              </div>
            ))}
          </dl>
          <div className={s.findings}>
            <p className={s.upper}>What I learned</p>
            {findings.map(([t, d]) => (
              <p key={t} className={s.finding}>
                <span className={s.ink}>{t}</span>
                <br />
                {d}
              </p>
            ))}
            <p className={`${s.upper} ${s.takeaway}`}>Key takeaway</p>
            <p className={s.takeawayText}>
              The opportunity wasn&apos;t to create another place to search for art — it was to create a better way to
              discover it.
            </p>
          </div>
        </Section>

        {/* 03 — Design opportunity (the section draws its own top rule, 3:2916) */}
        <hr className={s.rule} />
        <Section id="opportunity" num="03" label="DESIGN OPPORTUNITY" className={s.opportunity}>
          <H2 className={`${s.h2} ${s.h2Opp}`}>From searching to discovering</H2>
          <div className={s.oppGrid}>
            <p className={s.oppText}>
              People don&apos;t always know what they&apos;re looking for. They want an easier way to discover interesting
              exhibitions, galleries and creative spaces around them.
              <br />
              <b>How might we make discovering art feel more visual, contextual and spontaneous?</b>
            </p>
            <ol className={s.oppSteps}>
              {steps.map((st, i) => (
                <li key={st.t}>
                  <span className={`${s.blob} ${s[st.tone] ?? ""}`}>
                    <Icon src={icon(st.icon)} w={10.82} h={10.82} />
                  </span>
                  <span className={s.stepNum}>0{i + 1}</span>
                  <span className={s.stepTitle}>{st.t}</span>
                  <span className={s.stepDesc}>{st.d}</span>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <hr className={s.rule} />

        {/* 04 — Key design decisions */}
        <Section id="decisions" num="04" label="KEY DESIGN DECISIONS" className={s.decisions}>
          <H2 className={s.h2}>Turning the idea into an experience</H2>
          <p className={s.body}>
            <Swap
              d="Rather than documenting every design step, I’m highlighting the three decisions that shaped MuseMap."
              m="Rather than documenting every design step, I’d show 3 decisions that shaped MuseMap."
            />
          </p>
          <ol className={s.decisionList}>
            {decisions.map((d, i) => (
              <li key={d.t}>
                <span className={s.decisionNum}>0{i + 1} —</span>
                <div>
                  <p className={s.decisionTitle}>{d.t}</p>
                  <p className={s.decisionDesc}>{d.d}</p>
                </div>
              </li>
            ))}
          </ol>
          {/* Desktop and phone frames only; the tablet frame leaves it out. */}
          <div className={s.principle}>
            <p className={s.upper}>DESIGN PRINCIPLE</p>
            <p>
              Every decision was evaluated against the same question: Does this make art easier to discover, understand
              and act on?
            </p>
          </div>
        </Section>

        <hr className={s.rule} />

        {/* 05 — UX flow */}
        <Section id="ux-flow" num="05" label="UX FLOW" className={s.flow}>
          <H2 className={s.h2}>USER FLOW JOURNEY</H2>
          {/* The file zooms the diagram into its 1112 × 581 box (131.64% wide,
              offset −11.02% / −13.47%); same crop here, proportions kept. */}
          <div className={s.flowBox}>
            <Image
              src={web("user-flow-journey")}
              alt="User flow: splash screen, login, home; from home to offers, profile (art journeys, achievements) and explore; map or grid view to gallery details, book now, date and time, tickets, discount code, contact information and booking summary"
              width={1947}
              height={923}
              unoptimized
              sizes="(max-width: 1099px) 120vw, 1464px"
              className={s.flowImg}
            />
          </div>
        </Section>

        <hr className={s.rule} />

        {/* 06 — The experience */}
        <Section id="experience" num="06" label="THE EXPERIENCE" className={s.experience}>
          <H2 className={s.h2}>Designing the experience</H2>
          <div className={s.expIntro}>
            <p className={s.expKicker}>From discovery to visit</p>
            <p>
              MuseMap brings together the different steps of planning an art outing — from discovering what&apos;s nearby
              to understanding a gallery and deciding when to visit.
            </p>
          </div>
          {experience.map((block) => (
            <div key={block.key} className={`${s.expBlock} ${s[`exp_${block.key}`] ?? ""}`}>
              <h3 className={s.h3}>{block.t}</h3>
              <div className={s.phones}>
                {block.phones.map(([src, alt]) => (
                  <div key={src} className={s.phoneShot}>
                    <Image src={web(src)} alt={alt} fill unoptimized sizes="200px" className={s.contain} />
                  </div>
                ))}
              </div>
              <div className={s.expCopy}>
                {block.copy.map(([t, lead, body]) => (
                  <div key={t}>
                    <p className={s.ink}>{t}</p>
                    <p className={s.expLead}>{lead}</p>
                    <p>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Section>

        <hr className={s.rule} />

        {/* 07 — Design evolution */}
        <Section id="evolution" num="07" label="DESIGN EVOLUTION" className={s.evolution}>
          <H2 className={s.h2}>Refining the experience around the visit</H2>
          <p className={s.body}>
            As the product evolved, I focused on making MuseMap useful not only for finding galleries, but also for
            deciding where to go, what to see, and how to plan the visit.
          </p>
          <div className={s.evoList}>
            {evolution.map((e) => (
              <div key={e.t}>
                <h3 className={s.evoTitle}>{e.t}</h3>
                <dl>
                  <div>
                    <dt>The problem</dt>
                    <dd>{e.problem}</dd>
                  </div>
                  <div>
                    <dt>What changed</dt>
                    <dd>{e.change}</dd>
                  </div>
                </dl>
              </div>
            ))}
            <div>
              <h3 className={s.evoTitle}>What I learned</h3>
              <p className={s.evoText}>
                Not every feature strengthened the core discovery problem. I kept the primary experience focused on
                discovering, understanding and planning visits, while treating broader features as future opportunities
                rather than core functionality.
              </p>
            </div>
          </div>
        </Section>

        <hr className={s.rule} />

        {/* 08 — The ecosystem around discovery */}
        <Section id="ecosystem" num="08" label="The ecosystem around discovery" className={s.ecosystem}>
          <H2 className={s.h2}>The ecosystem around discovery</H2>
          <p className={`${s.body} ${s.ecoIntro}`}>MuseMap creates value on both sides of the discovery experience.</p>
          <dl className={s.ecoList}>
            {ecosystem.map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
          <p className={s.ecoClose}>
            <span className={s.ink}>The product opportunity:</span> connect people looking for something to experience with
            cultural spaces looking for the right audience.
          </p>
        </Section>

        <hr className={s.rule} />

        {/* 09 — Reflection (the desktop frame repeats "08"; the sidebar, tablet and phone use 09) */}
        <Section id="reflection" num="09" label="Reflection" className={s.reflection}>
          <H2 className={s.h2}>What I learned?</H2>
          <ol className={s.reflectList}>
            {reflection.map(([t, d], i) => (
              <li key={t}>
                <span className={s.reflectNum}>0{i + 1} —</span>
                <div>
                  <p className={s.ink}>{t}</p>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <div className={s.caseStrip}>
          <p>
            <span className={s.tOnly}>MUSEMAP — UX CASE STUDY — 2025</span>
            <span className={s.pOnly}>MUSEMAP — UX CASE STUDY — 2025/2026</span>
          </p>
          {/* Lenis turns in-page anchors into a smooth scroll (instant with reduced motion). */}
          <a href="#intro">BACK TO TOP ↑</a>
        </div>

        <NextProject href="/work/mello" title="MELLO" blurb="Designing a multimodal mental-health screening experience" />
      </div>
    </CaseLayout>
  );
}
