"use client";

import { useEffect } from "react";

/**
 * Touch devices have no hover, so each project file's page slides out with the
 * scroll instead (CSS: FolderCard.module.css, [data-scroll] and --open 0–1).
 *
 * The page stays tucked in while a card is in reading position, so its title
 * and description can be read first. As the reader scrolls on and the card
 * moves up from START (a quarter of the way down the screen) to just under the
 * header, the page follows the scroll out of the folder; scrolling back tucks
 * it in again. Mouse/trackpad devices keep the hover and this does nothing.
 */
const START = 0.25;

export default function FolderPlayer() {
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-folder]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64;
      const start = window.innerHeight * START;
      const end = header + 12;
      for (const card of cards) {
        const top = card.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, (start - top) / (start - end)));
        // Eased, so the page starts and settles gently.
        card.style.setProperty("--open", (p * p * (3 - 2 * p)).toFixed(3));
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    cards.forEach((card) => (card.dataset.scroll = ""));
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cards.forEach((card) => {
        delete card.dataset.scroll;
        card.style.removeProperty("--open");
      });
    };
  }, []);

  return null;
}
