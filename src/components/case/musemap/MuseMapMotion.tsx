"use client";

import { useEffect } from "react";
import cs from "../case.module.css";
import { IMAGE_DELAY, startCaseMotion, TEXT } from "../caseMotion";
import s from "./musemap.module.css";

/**
 * MuseMap motion, on the same shared case-study motion as Mello, Google Maps and
 * VoyAIge (caseMotion.ts), plus this page's own sequences (CSS in
 * musemap.module.css): the discovery-sources diagram, the opportunity steps and
 * the floating experience screens. Left alone, as elsewhere: the closing strip.
 */
export default function MuseMapMotion() {
  useEffect(() => {
    const motion = startCaseMotion(`.${s.caseStrip}`);
    if (!motion) return;
    const { page, mark, tag, cleanup } = motion;

    // Hero: eyebrow, title, lead, meta, then the product mockup and link.
    tag(`#intro > .${s.browser}`, { rise: true });
    tag("#intro > *");

    // Section openers and labels. Headings (h2 / h3) reveal word by word in MuseMap.tsx.
    tag(`.${cs.label}, .${s.upper}, .${s.expKicker}`);

    // Copy: comes into focus shortly after its heading.
    tag(
      [
        `.${s.problemText} > p`,
        `.${s.labelled}`,
        `.${s.body}`,
        `.${s.researchIntro}`,
        `.${s.takeawayText}`,
        `.${s.oppText}`,
        `.${s.principle} > p:not(.${s.upper})`,
        `.${s.expIntro} > p:not(.${s.expKicker})`,
        `.${s.evoText}`,
        `.${s.ecoClose}`,
      ].join(", "),
      TEXT,
    );

    // Discovery sources (problem diagram): the four sources arrive left to right,
    // the connector lines run down from them, then the MuseMap phone rises in.
    // Every part keeps its drawn position; only opacity / translate animate.
    const sources = Array.from(page.querySelectorAll<HTMLElement>(`.${s.diagram} > .${s.source}`));
    sources.forEach((el, i) => mark(el, { seq: true, delay: IMAGE_DELAY + i * 120 }));
    const afterSources = IMAGE_DELAY + sources.length * 120;
    page.querySelectorAll<HTMLElement>(`.${s.diagram} > .${s.converge}`).forEach((el) => mark(el, { seq: true, delay: afterSources + 80 }));
    page.querySelectorAll<HTMLElement>(`.${s.diagram} > .${s.phone}`).forEach((el) => mark(el, { seq: true, delay: afterSources + 420 }));

    // Grouped content: each item rises in turn, in its existing order.
    tag(`.${s.methods} > div`);
    tag(`.${s.finding}`);
    tag(`.${s.decisionList} > li`);
    tag(`.${s.expCopy} > div`);
    tag(`.${s.evoList} dl > div`);
    tag(`.${s.ecoList} > div`);
    tag(`.${s.reflectList} > li`);

    // Opportunity steps (Explore → Discover → Learn → Save): in a row they play
    // in order, each icon popping in after its step; stacked, each arrives as it
    // scrolls in.
    const stepList = page.querySelector<HTMLElement>(`.${s.oppSteps}`);
    const inRow = !!stepList && getComputedStyle(stepList).flexDirection === "row";
    page
      .querySelectorAll<HTMLElement>(`.${s.oppSteps} > li`)
      .forEach((li, i) => mark(li, inRow ? { seq: true, delay: i * 130 } : {}));

    // UX flow: the journey diagram is uncovered downwards, like the diagrams on
    // the other case studies (the box keeps its size; only the clip animates).
    tag(`.${s.flowBox}`, { mask: "down", delay: IMAGE_DELAY });

    // Experience screens float up into place (no mask): screens sharing a row
    // follow each other 130ms apart (100ms on phones), each row as it scrolls in.
    const step = window.innerWidth < 600 ? 100 : 130;
    page.querySelectorAll<HTMLElement>(`.${s.phones}`).forEach((row) => {
      const shots = Array.from(row.querySelectorAll<HTMLElement>(`:scope > .${s.phoneShot}`));
      const stacked = getComputedStyle(row).flexDirection === "column";
      shots.forEach((el, i) => mark(el, { seq: true, delay: IMAGE_DELAY + (stacked ? 0 : i * step) }));
    });

    tag(`.${cs.next}`);

    return cleanup;
  }, []);

  return null;
}
