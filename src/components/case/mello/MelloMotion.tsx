"use client";

import { useEffect } from "react";
import cs from "../case.module.css";
import { IMAGE_DELAY, startCaseMotion, TEXT } from "../caseMotion";
import s from "./mello.module.css";

/**
 * Mello motion, on the shared case-study motion (caseMotion.ts).
 *
 * "What we achieved", the balance grid and user needs have their own sequences in
 * mello.module.css (cell contents, icon pop, drawn dividers). Left alone on
 * purpose: "What didn't work out" (#didnt-work) and the closing strip.
 */
export default function MelloMotion() {
  useEffect(() => {
    const motion = startCaseMotion(`#didnt-work, .${s.caseStrip}`);
    if (!motion) return;
    const { page, mark, tag, sideBySide, cleanup } = motion;

    // Hero: eyebrow, title, lead, meta, then the product mockup and links.
    tag(`#intro > .${cs.browser}`, { rise: true });
    tag("#intro > *");

    // Section openers and copy. Headings (h2/h3) reveal word by word in Mello.tsx.
    tag(`.${cs.label}`);
    tag(`.${s.split} > div:first-child`, TEXT);
    tag(`.${cs.p}, .${cs.pLight}, .${cs.kicker}, .${cs.quote}`, TEXT);
    tag(`.${s.questionLabel}, .${s.balanceTitle}`);
    tag(`.${s.question}`, TEXT);

    // What we achieved: label, then each metric cell (its contents animate).
    tag(`.${s.impactLabel}`);
    tag(`.${s.statsRow4} > div, .${s.statsRow3} > div`);

    // Grouped content: each item rises in turn.
    tag(`.${s.glance} > div`);
    // Technical pipeline: its stages are separate cards in the markup, so they
    // reveal along the flow. Side by side (desktop rows) they play as one
    // sequence; stacked (tablet/phone) each arrives as it scrolls in.
    const pipeGrid = page.querySelector<HTMLElement>(`.${s.pipeGrid}`);
    const pipeRows = pipeGrid ? getComputedStyle(pipeGrid).display === "grid" : false;
    page.querySelectorAll<HTMLElement>(`.${s.pipeRow} > *`).forEach((el, i) =>
      mark(el, pipeRows ? { seq: true, delay: i * 55 } : {}),
    );
    tag(`.${s.balance} > div`);
    tag(`.${s.needs} > li`);
    tag(`.${s.learnings} > li`);

    // The experience walkthrough: heading, points, then the screens.
    tag(`.${s.h3Num}`);
    tag(`.${s.experience} .${cs.bullets}`, TEXT);

    // Images, by role:
    // - the challenge diagram reads top to bottom (inputs → Mello → one
    //   experience), so it is uncovered downwards;
    tag(`.${s.challengeImg}`, { mask: "down", delay: IMAGE_DELAY });
    // - the landing / login mockups rise and settle; side by side they follow
    //   each other 130ms apart, stacked each arrives as it scrolls in;
    page.querySelectorAll<HTMLElement>(`.${s.pair}`).forEach((pair) => {
      const together = sideBySide(pair);
      pair.querySelectorAll<HTMLElement>(`:scope > .${cs.figure}`).forEach((fig, i) =>
        mark(fig, together ? { rise: true, seq: true, delay: IMAGE_DELAY + i * 130 } : { rise: true, delay: IMAGE_DELAY }),
      );
    });
    // - the wide interface screenshots (assessment, chatbot, breathe) are
    //   uncovered from the bottom up; the single mood-logging mockup rises.
    page.querySelectorAll<HTMLElement>(`.${s.expImg}`).forEach((fig) => {
      const src = decodeURIComponent(fig.querySelector("img")?.getAttribute("src") ?? "");
      mark(fig, src.includes("exp4") ? { rise: true, delay: IMAGE_DELAY } : { mask: "up", delay: IMAGE_DELAY });
    });

    tag(`.${cs.next}`);

    return cleanup;
  }, []);

  return null;
}
