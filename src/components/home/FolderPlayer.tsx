"use client";

import { useEffect } from "react";

/**
 * Touch devices have no hover, so each project file's page slides out with the
 * scroll instead (CSS: FolderCard.module.css, [data-scroll]).
 *
 * The page stays tucked in while a card is in reading position, so its title
 * and description can be read first. As the reader scrolls on and the card
 * moves up from START (a quarter of the way down the screen) to just under the
 * header, the page follows the scroll out of the folder; scrolling back tucks
 * it in again. Mouse/trackpad devices keep the hover and this does nothing.
 *
 * Smoothness: scroll events arrive unevenly on phones (momentum, the address
 * bar showing and hiding), so each page eases towards where the scroll says it
 * should be, a little each frame, instead of jumping there. The loop only runs
 * while something is still moving, and it writes opacity and transform straight
 * onto each page (on its own layer), so a frame restyles four small elements
 * rather than every card's contents.
 */
const START = 0.25;
/** Share of the remaining distance covered each frame (higher follows the finger more tightly). */
const FOLLOW = 0.22;

export default function FolderPlayer() {
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-folder]"));
    // Each card's sliding page (the hover preview), and the card's design unit (it's drawn 634.554 wide).
    const papers = cards.map((card) => card.querySelector<HTMLElement>("[data-paper]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shown = cards.map(() => 0);
    const written = cards.map(() => -1);
    let raf = 0;

    /** The hover pose at v = 1; tucked into the folder at v = 0 (reduced motion: fades in place). */
    const pose = (card: HTMLElement, paper: HTMLElement, v: number) => {
      paper.style.opacity = String(v);
      if (reduced) {
        paper.style.transform = "translateY(0) rotate(1.25deg)";
        return;
      }
      const u = card.offsetWidth / 634.554;
      paper.style.transform = `translateY(${((1 - v) * 18 * u).toFixed(2)}px) rotate(${(1.25 + (1 - v) * 3.75).toFixed(3)}deg)`;
    };

    const targetFor = (card: HTMLElement, start: number, end: number) => {
      const top = card.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, (start - top) / (start - end)));
    };

    // Where the page starts and finishes sliding (px from the top of the screen).
    // Read once and on resize only, so frames never force a style recalculation.
    // The layout viewport's height stays steady while the mobile address bar slides.
    let start = 0;
    let end = 0;
    const measure = () => {
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64;
      start = document.documentElement.clientHeight * START;
      end = header + 12;
    };

    const tick = () => {
      raf = 0;
      let moving = false;
      cards.forEach((card, i) => {
        const target = targetFor(card, start, end);
        let p = shown[i] + (target - shown[i]) * FOLLOW;
        if (Math.abs(target - p) < 0.002) p = target;
        else moving = true;
        shown[i] = p;
        // Eased, so the page starts and settles gently; written only when it changes.
        const v = Math.round(p * p * (3 - 2 * p) * 1000) / 1000;
        const paper = papers[i];
        if (paper && v !== written[i]) {
          pose(card, paper, v);
          written[i] = v;
        }
      });
      if (moving) raf = requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    // Start where the page already is (e.g. after a reload part-way down), without easing in.
    measure();
    cards.forEach((card, i) => (shown[i] = targetFor(card, start, end)));
    cards.forEach((card) => (card.dataset.scroll = ""));
    tick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cards.forEach((card) => delete card.dataset.scroll);
      papers.forEach((paper) => {
        paper?.style.removeProperty("opacity");
        paper?.style.removeProperty("transform");
      });
    };
  }, []);

  return null;
}
