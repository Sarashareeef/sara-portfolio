"use client";

import { useEffect } from "react";
import cs from "../case.module.css";
import { IMAGE_DELAY, startCaseMotion, TEXT } from "../caseMotion";
import s from "./google-maps.module.css";

/** Narrower than this, the principle cards are one column and simply reveal in turn. */
const STACK_MIN = 600;

/**
 * Design question: the three principle cards start as a compact fanned stack
 * and separate into their row as the section scrolls up through the viewport
 * (bounded scroll progress, no sticky section, no extra page length). Writes
 * --p (eased 0 → 1) on the section and each card's offset to the stack centre;
 * the CSS turns those into transforms and content opacity. At --p 1 every
 * transform is identity, i.e. the original layout.
 */
function stackPrinciples(section: HTMLElement, row: HTMLElement) {
  const cards = Array.from(row.children) as HTMLElement[];
  if (cards.length !== 3) return () => {};
  let raf = 0;

  const layout = () => {
    // offsetLeft ignores transforms, so this is the untransformed row layout.
    const centres = cards.map((c) => c.offsetLeft + c.offsetWidth / 2);
    // Tablet: a looser stack, so the cards travel less.
    const reach = window.innerWidth >= 1100 ? 1 : 0.6;
    cards.forEach((c, i) => {
      const fan = (i - 1) * 22; // back cards peek out either side of the front one
      c.style.setProperty("--dx", `${((centres[1] - centres[i]) * reach + fan).toFixed(1)}px`);
      c.style.setProperty("--dy", `${i === 1 ? 0 : 10}px`);
      c.style.setProperty("--r", `${(i - 1) * 3}deg`);
    });
  };

  const update = () => {
    raf = 0;
    const vh = window.innerHeight;
    const top = row.getBoundingClientRect().top;
    // Starts as the row enters (top at 95% of the viewport), done by 45%.
    const t = Math.min(1, Math.max(0, (vh * 0.95 - top) / (vh * 0.5)));
    const eased = t * t * (3 - 2 * t);
    section.style.setProperty("--p", eased.toFixed(3));
  };

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  const onResize = () => {
    if (window.innerWidth < STACK_MIN) {
      section.removeAttribute("data-stack");
      return;
    }
    section.setAttribute("data-stack", "");
    layout();
    schedule();
  };

  section.setAttribute("data-stack", "");
  layout();
  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", onResize);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", onResize);
    section.removeAttribute("data-stack");
    section.style.removeProperty("--p");
  };
}

/**
 * Google Maps motion, on the same shared case-study motion as Mello
 * (caseMotion.ts): same timings, text treatments and image treatments, plus
 * three page-specific interactions (CSS in google-maps.module.css):
 * - safety indicators slide in from alternating sides and settle;
 * - sticky notes are placed on the board with a small tilt that settles;
 * - the design-question cards separate from a stack into their row.
 *
 * Left alone, as Mello's table and strip are: the competitive review table and
 * the closing strip.
 */
export default function GoogleMapsMotion() {
  useEffect(() => {
    const motion = startCaseMotion(`.${s.reviewWrap}, .${s.caseStrip}`);
    if (!motion) return;
    const { page, mark, tag, cleanup } = motion;

    const question = page.querySelector<HTMLElement>(`section.${s.question}`);
    const principles = page.querySelector<HTMLElement>(`.${s.principles}`);
    const stacking = !!question && !!principles && window.innerWidth >= STACK_MIN;
    const stopStack = stacking ? stackPrinciples(question!, principles!) : () => {};

    // Hero: eyebrow, title, lead, meta, then the product mockup.
    tag(`#intro > .${s.browser}`, { rise: true });
    tag("#intro > *");

    // Section openers and copy. Headings (h2 / block h3) reveal word by word in GoogleMaps.tsx.
    tag(`.${cs.label}, .${s.softLabel}`);
    tag(`.${s.questionLabel}, .${s.reviewLabel}, .${s.blockLabel}, .${s.wireLabel}`);
    tag(
      [
        // While the cards stack, the design question's closing note follows their progress instead.
        stacking ? `.${cs.p}:not(.${s.questionNote})` : `.${cs.p}`,
        `.${cs.kicker}`,
        `.${s.overviewText}`,
        `.${s.contextText}`,
        `.${s.questionText}`,
        `.${s.insightQuote}`,
        `.${s.blockLead}`,
        `.${s.subhead}`,
        `.${s.reviewNote}`,
        `.${s.ideationLead}`,
        `.${s.looseLead}`,
        `.${s.trustLead}`,
      ].join(", "),
      TEXT,
    );

    // Grouped content: each item rises in turn.
    tag(`.${s.steps} > div`);
    if (!stacking) tag(`.${s.principles} > div`); // phones: one column, in turn
    tag(`.${s.needs} > *`);
    tag(`.${s.points} > li`);
    tag(`.${s.timeline} > li`);
    // User insights: the cards arrive in reading order (left / bottom / right
    // entrances in CSS), each quote revealing word by word just after its card
    // starts to settle, then the accent underline draws in. Shorter gaps below desktop.
    const gap = window.innerWidth >= 1100 ? 80 : 60;
    page.querySelectorAll<HTMLElement>(`.${s.insights} > li`).forEach((card, i) => {
      mark(card, { nested: true, seq: true, delay: i * gap });
      const quote = card.querySelector<HTMLElement>("[data-words]");
      if (quote) {
        quote.dataset.revealSeq = "";
        quote.dataset.revealDelay = String(i * gap + 150);
      }
    });
    tag(`.${s.concepts} > div`);

    // Safety indicators: in a row they arrive as one left-right-left sequence;
    // stacked (phones) each arrives as it scrolls in.
    const indicatorList = page.querySelector<HTMLElement>(`.${s.indicators}`);
    const inRow = !!indicatorList && getComputedStyle(indicatorList).flexDirection !== "column";
    page.querySelectorAll<HTMLElement>(`.${s.indicators} > li`).forEach((li, i) =>
      mark(li, inRow ? { seq: true, delay: i * 120 } : {}),
    );

    // Sticky notes, in reading order; the right-hand note of each pair follows its
    // left-hand partner. Their titles reveal word by word inside the settling note.
    page.querySelectorAll<HTMLElement>(`.${s.noteSlot}`).forEach((slot, i) =>
      mark(slot, { nested: true, delay: (i % 2) * 60 }),
    );

    tag(`.${s.ideas} > div`);
    tag(`.${s.trustItems} > div`);

    // Images, by role:
    // - diagrams and process visuals read top to bottom (traditional → night-time
    //   decision; the wireframe sheet), so they are uncovered downwards;
    tag(`.${s.decision}, .${s.wireframe}`, { mask: "down", delay: IMAGE_DELAY });
    // - the UI board's phone screens rise and settle as they scroll in (several
    //   arriving together follow each other); its doodle arrows only fade, since
    //   they are positioned with translate; the handwritten captions come into focus.
    tag(`.${s.board} > .${s.screen}`, { rise: true, delay: IMAGE_DELAY });
    tag(`.${s.board} > .${s.arrow}`, { delay: IMAGE_DELAY + 200 });
    tag(`.${s.board} > .${s.caption}`, TEXT);

    tag(`.${cs.next}`);

    return () => {
      stopStack();
      cleanup();
    };
  }, []);

  return null;
}
