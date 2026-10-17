"use client";

import { useEffect } from "react";
import cs from "../case.module.css";
import { IMAGE_DELAY, startCaseMotion, TEXT } from "../caseMotion";
import s from "./voyaige.module.css";

/** Columns a grid currently lays out side by side. */
const columns = (el: Element | null) => (el ? getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length : 0);

/**
 * Metrics count up from 0 to their exact value as their cell is revealed (eased,
 * 1s). Screen readers get the final value only; reduced motion never gets here.
 * Returns a cleanup that stops any count and restores the final text.
 */
function countUp(cells: HTMLElement[], numClass: string) {
  const stops: (() => void)[] = [];
  cells.forEach((cell) => {
    const num = cell.querySelector<HTMLElement>(`.${numClass}`);
    const final = num?.textContent ?? "";
    const m = final.match(/^(\d+)(.*)$/);
    if (!num || !m) return;
    const target = Number(m[1]);
    const suffix = m[2];
    let raf = 0;
    const run = () => {
      const delay = parseFloat(cell.style.getPropertyValue("--reveal-delay")) || 0;
      const start = performance.now() + delay;
      const sr = document.createElement("span");
      sr.className = "sr-only";
      sr.textContent = final;
      num.after(sr);
      num.setAttribute("aria-hidden", "true");
      num.textContent = `0${suffix}`;
      const tick = (t: number) => {
        const p = Math.min(1, Math.max(0, (t - start) / 1000));
        const eased = 1 - Math.pow(1 - p, 3);
        num.textContent = p < 1 ? `${Math.round(target * eased)}${suffix}` : final;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const watch = new MutationObserver(() => {
      if (cell.dataset.reveal !== "shown") return;
      watch.disconnect();
      run();
    });
    watch.observe(cell, { attributes: true, attributeFilter: ["data-reveal"] });
    stops.push(() => {
      watch.disconnect();
      cancelAnimationFrame(raf);
      num.textContent = final;
    });
  });
  return () => stops.forEach((stop) => stop());
}

/**
 * VoyAIge motion, on the same shared case-study motion as Mello and Google Maps
 * (caseMotion.ts), plus this page's own sequences (CSS in voyaige.module.css):
 * insight cards, metrics, the process row, the user-flow journey and the
 * floating high-fidelity screens. Left alone, as elsewhere: the closing strip.
 */
export default function VoyaigeMotion() {
  useEffect(() => {
    const motion = startCaseMotion(`.${s.caseStrip}`);
    if (!motion) return;
    const { page, mark, tag, cleanup } = motion;

    // Hero: eyebrow, title, lead, meta, then the product mockup and link.
    tag(`#intro > .${cs.browser}`, { rise: true });
    tag("#intro > *");

    // Section openers and copy. Headings (h2 / h3) reveal word by word in Voyaige.tsx.
    tag(`.${cs.label}, .${s.kicker}, .${s.questionLabel}`);
    tag(
      [
        `.${s.lightText}`,
        `.${s.body}`,
        `.${s.questionText}`,
        `.${s.opportunity}`,
        `.${s.researchIntro}`,
        `.${s.statQuote}`,
        `.${s.pill}`,
        `.${s.processLead}`,
      ].join(", "),
      TEXT,
    );

    // Grouped content: each item rises in turn.
    tag(`.${s.glance} > li`);
    tag(`.${s.cards} > li`); // insight cards: their dot pops in after the card
    tag(`.${s.principles} > li`);
    tag(`.${s.learnList} > li`);
    tag(`.${s.stats} > li`); // metric cells: contents only, the number counts up
    tag(`.${s.pillars} > div`);
    tag(`.${s.didntList} > div`);
    tag(`.${s.reflectList} > li`);

    // Process: across one row of six the stages play in order (each one's
    // contents, then the arrow to the next); in the 3- and 2-column grids each
    // arrives as it scrolls in.
    const processRow = columns(page.querySelector(`.${s.processGrid}`)) >= 6;
    page
      .querySelectorAll<HTMLElement>(`.${s.processGrid} > li`)
      .forEach((li, i) => mark(li, processRow ? { seq: true, delay: i * 140 } : {}));

    // User flow, as a journey: step → its arrow draws → next step … through the
    // five stages, then the dashed links run down to the four feature cards.
    // (The steps' list items are display: contents, so the step cards and arrows
    // themselves are revealed.) Fully visible, it plays as one sequence; on
    // phones, where it scrolls sideways in its own box, each part arrives as it
    // comes into view.
    const flowBox = page.querySelector<HTMLElement>(`.${s.flowScroll}`);
    const whole = !!flowBox && flowBox.scrollWidth <= flowBox.clientWidth + 1;
    let t = 0;
    page.querySelectorAll<HTMLElement>(`.${s.flowSteps} .${s.flowStep}, .${s.flowSteps} .${s.flowArrow}`).forEach((el) => {
      const isArrow = el.classList.contains(s.flowArrow);
      mark(el, whole ? { seq: true, delay: t } : {});
      t += isArrow ? 260 : 320;
    });
    const links = page.querySelector<HTMLElement>(`.${s.flowLinks}`);
    if (links) mark(links, whole ? { seq: true, delay: t } : {});
    t += 1050;
    page
      .querySelectorAll<HTMLElement>(`.${s.flowGroups} > li`)
      .forEach((li, i) => mark(li, whole ? { seq: true, delay: t + i * 130 } : {}));

    // Images, by role:
    // - the research infographics (methods; patterns) are uncovered downwards,
    //   like the diagrams on the other case studies;
    tag(`.${s.methods}, .${s.patterns}`, { mask: "down", delay: IMAGE_DELAY });
    // - the high-fidelity screens float up into place (no mask): screens sharing a
    //   row follow each other 130ms apart (100ms on phones), each row as it scrolls in;
    //   doodle arrows and captions only fade.
    const step = window.innerWidth < 600 ? 100 : 130;
    const screens = Array.from(page.querySelectorAll<HTMLElement>(`.${s.board} > .${s.boardItem}:not([aria-hidden="true"])`));
    const rows: { y: number; items: HTMLElement[] }[] = [];
    screens
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .sort((a, b) => a.r.top - b.r.top || a.r.left - b.r.left)
      .forEach(({ el, r }) => {
        const mid = r.top + r.height / 2;
        const row = rows.find((rw) => Math.abs(rw.y - mid) < r.height * 0.35);
        if (row) row.items.push(el);
        else rows.push({ y: mid, items: [el] });
      });
    rows.forEach((row) =>
      row.items
        .sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left)
        .forEach((el, i) => mark(el, { seq: true, delay: IMAGE_DELAY + i * step })),
    );
    tag(`.${s.board} > .${s.boardItem}[aria-hidden="true"]`, { delay: IMAGE_DELAY + 260 });
    tag(`.${s.board} > .${s.caption}`, { delay: IMAGE_DELAY + 200 });

    tag(`.${cs.next}`);

    const stopCount = countUp(Array.from(page.querySelectorAll<HTMLElement>(`.${s.stats} > li`)), s.statNum);

    return () => {
      stopCount();
      cleanup();
    };
  }, []);

  return null;
}
