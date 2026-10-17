"use client";

import { useEffect } from "react";
import cs from "../case.module.css";
import s from "./mello.module.css";

/**
 * Mello-only motion. Marks the elements to reveal with `data-reveal` at runtime,
 * so the shared case-study components stay untouched; ScrollReveal (rendered
 * right after this) then observes them. Calmer settings than the landing page:
 * 14px rise, 600ms. Large screenshots get the clip variant.
 *
 * "What we achieved", the balance grid and user needs have their own sequences in
 * mello.module.css (cell contents, icon pop, drawn dividers). Left alone on
 * purpose: "What didn't work out" (#didnt-work) and the closing strip.
 */
export default function MelloMotion() {
  useEffect(() => {
    const hero = document.getElementById("intro");
    const page = hero?.closest("article");
    if (!hero || !page) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    page.style.setProperty("--reveal-shift", "14px");
    page.style.setProperty("--reveal-dur", "0.6s");
    page.style.setProperty("--word-shift", "0.15em");
    page.style.setProperty("--word-dur", "0.9s");

    const excluded = `#didnt-work, .${s.caseStrip}`;
    type Opts = { rise?: boolean; mask?: "up" | "down"; soft?: boolean; delay?: number; seq?: boolean };
    /**
     * rise: mockup rise-and-settle. mask: screenshot / diagram uncovering.
     * soft: supporting text that comes into focus. delay (ms): offset after
     * whatever arrives with it (copy follows its heading, screens follow copy).
     * seq: the delay is the element's place in a sequence, not added to a batch.
     */
    const mark = (el: HTMLElement, opts: Opts) => {
      if (el.closest(excluded)) return;
      // One level of motion only: skip anything inside an element already marked.
      if (el.dataset.reveal !== undefined || el.parentElement?.closest("[data-reveal]")) return;
      // Blocks that already reveal word by word (headings via Words) keep only that motion.
      if (el.querySelector("[data-reveal]")) return;
      el.dataset.reveal = "";
      if (opts.rise) el.dataset.revealRise = "";
      if (opts.mask) el.dataset.revealMask = opts.mask;
      if (opts.soft) el.dataset.revealSoft = "";
      if (opts.delay) el.dataset.revealDelay = String(opts.delay);
      if (opts.seq) el.dataset.revealSeq = "";
    };
    const tag = (selector: string, opts: Opts = {}) => {
      page.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        mark(el, opts);
      });
    };

    const TEXT = { soft: true, delay: 220 };

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
    tag(`.${s.challengeImg}`, { mask: "down", delay: 160 });
    // - the landing / login mockups rise and settle; side by side they follow
    //   each other 130ms apart, stacked each arrives as it scrolls in;
    page.querySelectorAll<HTMLElement>(`.${s.pair}`).forEach((pair) => {
      const sideBySide = getComputedStyle(pair).gridTemplateColumns.trim().split(/\s+/).length > 1;
      pair.querySelectorAll<HTMLElement>(`:scope > .${cs.figure}`).forEach((fig, i) =>
        mark(fig, sideBySide ? { rise: true, seq: true, delay: 160 + i * 130 } : { rise: true, delay: 160 }),
      );
    });
    // - the wide interface screenshots (assessment, chatbot, breathe) are
    //   uncovered from the bottom up; the single mood-logging mockup rises.
    page.querySelectorAll<HTMLElement>(`.${s.expImg}`).forEach((fig) => {
      const src = decodeURIComponent(fig.querySelector("img")?.getAttribute("src") ?? "");
      mark(fig, src.includes("exp4") ? { rise: true, delay: 160 } : { mask: "up", delay: 160 });
    });

    tag(`.${cs.next}`);

    return () => {
      page.style.removeProperty("--reveal-shift");
      page.style.removeProperty("--reveal-dur");
      page.style.removeProperty("--word-shift");
      page.style.removeProperty("--word-dur");
    };
  }, []);

  return null;
}
