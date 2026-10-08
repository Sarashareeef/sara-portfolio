import CaseLayout from "../CaseLayout";
import {
  BrowserFrame,
  Bullets,
  CaseHero,
  Figure,
  H2,
  H3,
  Icon,
  Kicker,
  NextProject,
  P,
  Quote,
  Rule,
  Section,
  TextLinks,
} from "../ui";
import s from "./mello.module.css";

const img = (n: string) => `/images/mello/${n}.webp`;
const icon = (n: string) => `/icons/${n}.svg`;

const toc = [
  { id: "intro", label: "Introduction" },
  { id: "overview", label: "Overview" },
  { id: "impact", label: "Impact" },
  { id: "challenge", label: "The Challenge" },
  { id: "needs", label: "User Needs" },
  { id: "experience", label: "The Experience" },
  { id: "didnt-work", label: "What Didn't Work" },
  { id: "reflection", label: "Reflection" },
];

const glance = [
  { n: "01", t: "ASSESS", d: "PHQ-8 + PCL-C questionnaires" },
  { n: "02", t: "UNDERSTAND", d: "Conversational text + questionnaire data", tint: true },
  { n: "03", t: "CLASSIFY", d: "XGBoost multimodal classification" },
  { n: "04", t: "CONVERSE", d: "AI-powered support via Gemini", tint: true },
];

type Sub = { icon: string; w: number; h: number; bg: string; title: string; desc: string };

function PipeCard({ n, title, subs }: { n: string; title: string; subs: Sub[] }) {
  return (
    <div className={s.card}>
      <p className={s.cardHead}>
        <span>{n}</span> {title}
      </p>
      <div className={s.subs}>
        {subs.map((sub) => (
          <div key={sub.title} className={s.sub}>
            <div className={s.subHead}>
              <span className={s.subIcon} style={{ background: sub.bg }}>
                <Icon src={icon(sub.icon)} w={sub.w} h={sub.h} />
              </span>
              <span>{sub.title}</span>
            </div>
            <p className={s.subDesc}>{sub.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CenterCard({
  n,
  title,
  icon: ic,
  w,
  h,
  bg,
  name,
  desc,
}: {
  n: string;
  title: string;
  icon: string;
  w: number;
  h: number;
  bg: string;
  name: string;
  desc: string;
}) {
  return (
    <div className={`${s.card} ${s.center}`}>
      <p className={s.cardHead}>
        <span>{n}</span> {title}
      </p>
      <span className={s.bigIcon} style={{ background: bg }}>
        <Icon src={icon(ic)} w={w} h={h} />
      </span>
      <p className={s.centerName}>{name}</p>
      <p className={s.centerDesc}>{desc}</p>
    </div>
  );
}

const Chevron = () => (
  <span className={s.chev} aria-hidden="true">
    <Icon src={icon("chevron")} w={4} h={7} />
  </span>
);

const balance = [
  { icon: "stethoscope", w: 21, h: 20, bg: "#fee9ea", n: "01", t: "Clinical Structure", d: "Collect enough structured information for the screening model." },
  { icon: "message", w: 21, h: 21, bg: "#f2ebfd", n: "02", t: "Human Expression", d: "Give users space to describe their feelings and context in their own words." },
  { icon: "lock", w: 19, h: 21, bg: "#fdeee7", n: "03", t: "Trust", d: "Communicate anonymity, responsible AI use and clear boundaries." },
  { icon: "sparkles", w: 21, h: 21, bg: "#f2ebfd", n: "04", t: "Clarity", d: "Turn model output into information that makes sense at the interface level." },
];

const needs = [
  {
    t: "UNDERSTAND WHAT'S HAPPENING",
    o: "Users may not know why they're answering a particular assessment question or what will happen after completing it.",
    i: "Without context and visible progression, the assessment can feel clinical and transactional.",
    d: "The experience needed to explain purpose and progression clearly without exposing the complexity of the underlying AI system.",
  },
  {
    t: "EXPRESS THEMSELVES NATURALLY",
    o: "Structured questionnaires give users predefined responses, leaving limited space to describe experiences in their own words.",
    i: "Standardized responses provide consistency, but they cannot capture every nuance of how someone experiences or describes their situation.",
    d: "The experience needed to combine structured assessment with an open conversational input layer.",
  },
  {
    t: "FEEL SAFE SHARING SENSITIVE INFORMATION",
    o: "Mello handles highly personal mental-health information, making privacy a significant part of the experience.",
    i: "Users need to understand how their information is handled before they feel comfortable sharing it.",
    d: "Privacy needed to be communicated clearly and incorporated into the experience rather than treated as a separate technical concern.",
  },
  {
    t: "MOVE FROM ASSESSMENT TO CONVERSATION NATURALLY",
    o: "The assessment and conversational experience use fundamentally different interaction patterns.",
    i: "Without a clear connection between them, the experience could feel like two separate products.",
    d: "The transition needed to feel like a continuation of the same journey, connecting the assessment, its outcome, and the subsequent conversation.",
  },
  {
    t: "UNDERSTAND THE RESULT",
    o: "The underlying system produces a classification and confidence score, but these technical outputs aren't designed for direct user interpretation.",
    i: "Showing raw model outputs could create confusion or encourage users to overinterpret an AI-generated classification.",
    d: "The product needed to translate the model output into clear, human-readable information while maintaining transparency about the AI-assisted nature of the experience.",
  },
];

const issues = [
  {
    t: ["Incomplete", "or invalid input"],
    w: "Empty responses, missing values, or invalid input could interrupt the flow and prevent the system from producing a result.",
    r: "Validation and error states give clear feedback, helping users stay in the flow instead of failing silently.",
  },
  {
    t: ["Waiting", "for the system"],
    w: "API calls, preprocessing, model inference and conversational AI introduce processing time. The system could not always respond instantly.",
    r: "Loading and processing states communicate that the system is working. Average API response time: 1.2s (handled 5+ simultaneous requests below 1.5s).",
  },
  {
    t: ["Technical output", "≠ user understanding"],
    w: "The system produces classification and confidence scores, but exposing this technical output directly would be difficult for users to understand.",
    r: "The interface translates the technical pipeline into clear, human-readable information, exposing the next meaningful action rather than the system's internal sequence.",
  },
  {
    t: ["Natural language", "has limits"],
    w: "Slang, sarcasm, and regional linguistic variation can be ambiguous and may be interpreted inaccurately by the system.",
    r: "The conversational layer is designed to be context-aware and supportive, rather than making definitive interpretations of a user's mental state.",
  },
  {
    t: ["Keeping the experience", "supportive, not diagnostic"],
    w: "A model classification should not be presented as a definitive diagnosis, as it could be misinterpreted by users.",
    r: "The experience is positioned as AI-assisted support, with clear, human-readable information and next steps.",
  },
];

const learnings = [
  ["AI UX is translation", "Turn complex system processes into clear, meaningful user actions."],
  ["Trust is part of the UX", "Privacy and anonymity need to be communicated through the interface."],
  ["Every state matters", "Loading, validation, errors, and recovery are part of the experience."],
  ["Tone matters", "Sensitive experiences need clear, supportive, and non-diagnostic language."],
  ["Design meets engineering", "Technical constraints shaped decisions and helped bridge design with implementation."],
];

export default function Mello() {
  return (
    <CaseLayout toc={toc}>
      <CaseHero
        name="MELLO"
        tag="AI + MENTAL HEALTH"
        title={
          <>
            Designing a multimodal mental-health
            <br />
            screening experience
          </>
        }
        lead="Mello is an AI-driven mental-health screening and conversational support system that combines structured psychological assessments with natural-language interaction."
        meta={[
          { label: "MY ROLE", value: "UI / UX DESIGN" },
          { label: "TEAM", value: "4 MEMBERS" },
          { label: "PLATFORM", value: "WEB + MOBILE" },
          { label: "TIMELINE", value: "6 MONTHS" },
        ]}
      >
        <BrowserFrame src={img("hero")} url="mello.app" bar="#fcf0f7" w={1110.5} h={560.2} alt="Mello web experience" />
        <TextLinks
          links={[
            { label: "VIEW LIVE PRODUCT ↗", href: "#" },
            { label: "READ IEEE PAPER ↗", href: "#" },
          ]}
        />
      </CaseHero>

      {/* 01 — Overview */}
      <Section id="overview" num="01" label="OVERVIEW" style={{ paddingTop: 33 }}>
        <H2>What is Mello?</H2>
        <P light>
          Mello is an AI-driven mental-health screening and conversational support system designed to combine
          structured psychological assessments with natural-language interaction.
        </P>
        <P light>
          The experience brings together questionnaire-based screening, conversational input, and AI-powered
          classification in one connected flow — allowing users to move from an initial assessment into a more natural
          conversational experience.
        </P>

        <Kicker>MY CONTRIBUTION</Kicker>
        <P light>
          I worked across Mello&apos;s UX and UI, designing assessment and conversational flows, interaction patterns,
          interfaces, and key system states, while contributing to API integration and product implementation.
        </P>

        <Kicker>THE EXPERIENCE AT A GLANCE</Kicker>
        <div className={s.glance}>
          {glance.map((g) => (
            <div key={g.n} className={g.tint ? s.tint : undefined}>
              <span className={s.glanceNum}>{g.n}</span>
              <span className={s.glanceTitle}>{g.t}</span>
              <span className={s.glanceDesc}>{g.d}</span>
            </div>
          ))}
        </div>

        <Kicker>TECHNICAL PIPELINE</Kicker>
        <div className={s.pipeline}>
          <div className={s.userNode}>
            <span className={s.userIcon}>
              <Icon src={icon("user")} w={13.5} h={16.8} />
            </span>
            <p className={s.centerName}>USER</p>
            <p className={s.centerDesc}>Provides questionnaire responses and conversational input</p>
          </div>
          <Chevron />
          <PipeCard
            n="01"
            title="Input Data"
            subs={[
              { icon: "file-text", w: 9.2, h: 11, bg: "#fee9ea", title: "PHQ-8 / PCL-C", desc: "Structured questionnaire responses" },
              { icon: "message-small", w: 11, h: 11, bg: "#f2ebfd", title: "Conversational Input", desc: "Free-form natural language responses" },
            ]}
          />
          <Chevron />
          <PipeCard
            n="02"
            title="Preprocessing"
            subs={[
              { icon: "sparkles-small", w: 11, h: 11, bg: "#f2ebfd", title: "Questionnaire Data", desc: "Normalization (StandardScaler)" },
              { icon: "align-left", w: 10, h: 8, bg: "#f2ebfd", title: "Text Data", desc: "Cleaning, tokenization, preprocessing" },
            ]}
          />
          <Chevron />
          <CenterCard n="03" title="Semantic Embeddings" icon="git-branch" w={18.3} h={18.3} bg="#f2ebfd" name="all-MiniLM-L6-v2" desc="384-dimensional sentence embeddings from conversational text" />
          <Chevron />
          <CenterCard n="04" title="Feature Fusion" icon="layers" w={20.2} h={20.2} bg="#fdeee7" name="Combine features" desc="Concatenate questionnaire features with semantic embeddings" />
          <Chevron />
          <span className={s.break} />
          <CenterCard n="05" title="Classification" icon="cpu" w={20.2} h={20.2} bg="#fee9ea" name="XGBoost" desc="Mental-health classification using optimized parameters (GridSearchCV)" />
          <Chevron />
          <CenterCard n="06" title="Contextual Response" icon="sparkles-violet" w={20.2} h={20.2} bg="#f2ebfd" name="Google Gemini" desc="Generates empathetic, context-aware conversational response using classification output" />
          <Chevron />
          <CenterCard n="07" title="User Interface" icon="smartphone" w={14.2} h={20.2} bg="#fdeee7" name="Mello conversation" desc="Displays classification insights and provides conversational support in a user-friendly interface" />
        </div>

        <Quote>
          As the designer, understanding this pipeline helped me determine what information could be surfaced to users,
          where uncertainty needed to be communicated, and how the AI output should translate into a clear
          conversational experience.
        </Quote>
      </Section>

      <Rule />

      {/* 02 — Impact */}
      <Section id="impact" num="02" label="IMPACT">
        <H2 size={52.6} className={s.impactTitle}>
          What we achieved
        </H2>
        <div className={s.stats}>
          <div className={s.statsRow4}>
            {[
              ["0.90", "F1 SCORE"],
              ["0.9752", "ROC-AUC"],
              ["1.2s", "AVG API RESPONSE"],
              ["90%+", "USABILITY"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className={s.statBig}>{v}</p>
                <p className={s.statLabel}>{l}</p>
              </div>
            ))}
          </div>
          <div className={s.statsRow3}>
            {[
              ["0.85", "PRECISION"],
              ["0.96", "RECALL"],
              ["99.7%", "UPTIME"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className={s.statMid}>{v}</p>
                <p className={s.statLabelSm}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className={s.impactNote}>
          The final multimodal system achieved an F1 score of 0.90 and ROC-AUC of 0.9752. System testing reported an
          average API response time of approximately 1.2 seconds and strong interface usability findings.
        </p>
      </Section>

      <Rule />

      {/* 03 — Challenge */}
      <Section id="challenge" num="03" label="THE CHALLENGE">
        <H2 size={40}>Making a complex AI workflow simple.</H2>
        <div className={s.split}>
          <div>
            <P>
              Mello had to bring together two very different ways of understanding a user&apos;s mental health
              experience. Structured questionnaires provide standardized signals, but can feel formal and clinical.
              Free-form conversation captures context and emotional nuance, but is unstructured and open-ended.
            </P>
            <P>
              The challenge was to make these inputs feel like one coherent experience while keeping the underlying AI
              pipeline invisible to the user.
            </P>
          </div>
          <Figure
            src={img("challenge")}
            w={524.17}
            h={349.45}
            alt="Structured assessment and human expression combine into one Mello experience"
            sizes="(max-width: 900px) 92vw, 530px"
          />
        </div>
      </Section>

      <p className={s.questionLabel}>THE DESIGN QUESTION</p>
      <Rule />

      <Section style={{ paddingTop: 32 }}>
        <p className={s.question}>
          How might we make a multimodal screening workflow understandable and approachable without exposing the user to
          the complexity of the underlying AI system?
        </p>
        <P className={s.questionSub}>
          Users should be able to focus on their own experience — not on forms, model outputs, or the technical pipeline
          behind the system.
        </P>
        <p className={s.balanceTitle}>THE EXPERIENCE HAD TO BALANCE</p>
        <div className={s.balance}>
          {balance.map((b) => (
            <div key={b.n}>
              <span className={s.balanceIcon} style={{ background: b.bg }}>
                <Icon src={icon(b.icon)} w={b.w} h={b.h} />
              </span>
              <div>
                <p className={s.balanceNum}>{b.n}</p>
                <p className={s.balanceName}>{b.t}</p>
                <p className={s.balanceDesc}>{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Rule />

      {/* 04 — User needs */}
      <Section id="needs" num="04" label="USER NEEDS">
        <H2>What did the user need?</H2>
        <P>
          Mello brings together structured assessments, conversational input, and AI-generated results. But users
          shouldn&apos;t have to understand the complexity behind the system to use it.
        </P>
        <P>
          The experience therefore needed to feel clear, natural, private, and trustworthy — especially when asking users
          to share sensitive information.
        </P>
        <ol className={s.needs}>
          {needs.map((n, i) => (
            <li key={n.t}>
              <span className={s.needNum}>{String(i + 1).padStart(2, "0")} —</span>
              <div className={s.needBody}>
                <p className={s.needTitle}>{n.t}</p>
                {[
                  ["OBSERVATION", n.o],
                  ["INSIGHT", n.i],
                  ["DESIGN IMPLICATION", n.d],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className={s.needKey}>{k}</p>
                    <p className={s.needVal}>{v}</p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Rule />

      {/* 05 — Experience */}
      <Section id="experience" num="05" label="THE EXPERIENCE">
        <H2>Designing the experience</H2>
        <P>
          Mello is structured as an end-to-end support experience, taking users from a private, anonymous entry point
          through assessment and into different forms of ongoing support.
        </P>

        <div className={s.experience}>
          <div>
            <H3>01 — A private, low-friction entry</H3>
            <Bullets
              items={[
                "A welcoming landing page introduces Mello as a compassionate support companion.",
                "Anonymous login allows users to access the experience without sharing personal information.",
                "A recovery-code flow gives returning users a way to regain access while maintaining anonymity.",
              ]}
            />
            <div className={s.pair}>
              <Figure src={img("exp1a")} w={544.17} h={362.78} alt="Mello landing page" sizes="(max-width: 767px) 92vw, 545px" />
              <Figure src={img("exp1b")} w={544.18} h={272.09} alt="Anonymous login and recovery code" sizes="(max-width: 767px) 92vw, 545px" />
            </div>
          </div>

          <div>
            <H3>02 — Making assessment feel approachable</H3>
            <Bullets
              items={[
                "Designed the mental health questionnaire and its interaction patterns.",
                "Broke the assessment into manageable questions rather than overwhelming users with a large form.",
                "Designed the answer states, navigation, progression, and feedback to make completing the assessment feel straightforward.",
                "Connected the assessment directly to the next stage of the experience — the chatbot",
              ]}
            />
            <Figure src={img("exp2")} w={1112.34} h={444.82} alt="Assessment question screens" className={s.expImg} />
          </div>

          <div>
            <H3>03 — The chatbot as the central support space</H3>
            <Bullets
              items={[
                "The chatbot acts as the primary space for users to talk about what they're experiencing.",
                "Conversational responses create a more supportive interaction than a traditional form-based experience.",
                "Three focused pathways — Assess, Mood, and Breathe — allow users to choose what they need in the moment.",
              ]}
            />
            <Figure src={img("exp3")} w={1112.34} h={1156.38} alt="Mello chatbot screens" className={s.expImg} />
          </div>

          <div>
            <H3>04 — A simple way to check in with yourself</H3>
            <Bullets
              items={[
                "Mood logging provides a lightweight way to record how the user is feeling.",
                "Users can explore their mood through a visual scale and add an optional note about what's on their mind.",
                "The flow keeps emotional check-ins quick enough to become a recurring part of the experience.",
              ]}
            />
            <Figure src={img("exp4")} w={1112.34} h={741.56} alt="Mood logging screen" className={s.expImg} />
          </div>

          <div>
            <H3>05 — Turning thoughts into a moment to breathe</H3>
            <Bullets
              items={[
                "The Breathe experience begins by giving users space to put their thoughts into words.",
                "From there, the experience transitions into guided breathing exercises.",
                "Minimal UI, soft visuals, and focused interactions help keep attention on the exercise rather than the interface.",
              ]}
            />
            <Figure src={img("exp5")} w={1112.34} h={556.17} alt="Breathe experience" className={s.expImg} />
          </div>
        </div>
      </Section>

      <Rule />

      {/* 06 — What didn't work */}
      <Section id="didnt-work" num="06" label="WHAT DIDN'T WORK OUT">
        <H2>What didn&apos;t work out?</H2>
        <P className={s.narrow}>
          The final experience was shaped not only by what worked, but also by limitations uncovered through
          implementation, testing, and the constraints of the underlying system.
        </P>
        <div className={s.table} role="table">
          <div className={s.thead} role="row">
            <span role="columnheader">ISSUE</span>
            <span role="columnheader">WHAT DIDN&apos;T WORK</span>
            <span role="columnheader">DESIGN RESPONSE</span>
          </div>
          {issues.map((row, i) => (
            <div key={i} className={s.tr} role="row">
              <div className={s.issue} role="cell">
                <span className={s.issueNum}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  {row.t[0]}
                  <br />
                  {row.t[1]}
                </span>
              </div>
              <p className={s.what} role="cell">
                {row.w}
              </p>
              <p className={s.resp} role="cell">
                {row.r}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Rule />

      {/* 07 — Reflection */}
      <Section id="reflection" num="07" label="Reflection" style={{ paddingBottom: 112 }}>
        <H2>What I learned?</H2>
        <ol className={s.learnings}>
          {learnings.map(([t, d], i) => (
            <li key={t}>
              <p className={s.learnTitle}>
                {String(i + 1).padStart(2, "0")} — {t}
              </p>
              <p className={s.learnDesc}>{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <NextProject
        href="/work/google-maps-redesign"
        title="Google Maps Redesign"
        blurb="Rethinking night navigation around personal safety."
      />
    </CaseLayout>
  );
}
