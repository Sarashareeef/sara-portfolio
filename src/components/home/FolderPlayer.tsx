"use client";

import { useEffect } from "react";

/**
 * Touch devices have no hover, so each project file opens as it scrolls into
 * view instead: once a card is mostly on screen its page slides out (the same
 * motion as the desktop hover), and it tucks back in once the card has left the
 * screen, so scrolling back plays it again. Mouse/trackpad devices keep the
 * hover and this does nothing. CSS: FolderCard.module.css ([data-open]).
 */
export default function FolderPlayer() {
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const card = e.target as HTMLElement;
          if (e.intersectionRatio >= 0.6) card.dataset.open = "";
          else if (!e.isIntersecting) delete card.dataset.open;
        }
      },
      // Several steps, so a quick scroll that skips past 0.6 is still caught as the card settles.
      { threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] },
    );
    const cards = document.querySelectorAll<HTMLElement>("[data-folder]");
    cards.forEach((card) => io.observe(card));
    return () => {
      io.disconnect();
      cards.forEach((card) => delete card.dataset.open);
    };
  }, []);

  return null;
}
