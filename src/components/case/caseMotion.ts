/**
 * Shared case-study motion (first used by Mello). A page's motion component
 * marks the elements to reveal with `data-reveal` at runtime, so the shared
 * case-study components stay untouched; ScrollReveal (rendered right after it)
 * observes them. The reveal styles live in globals.css.
 */

/** Headings reveal word by word, slower than body copy (ms per word). */
export const HEADING_STEP = 85;

/** Images follow the copy around them by this much (ms). */
export const IMAGE_DELAY = 160;

/**
 * rise: mockup rise-and-settle. mask: screenshot / diagram uncovering.
 * soft: supporting text that comes into focus. delay (ms): offset after
 * whatever arrives with it (copy follows its heading, screens follow copy).
 * seq: the delay is the element's place in a sequence, not added to a batch.
 * nested: mark even though it contains its own reveal (e.g. a card whose title
 * reveals word by word while the card itself settles); its CSS must handle both.
 */
export type RevealOpts = {
  rise?: boolean;
  mask?: "up" | "down";
  soft?: boolean;
  delay?: number;
  seq?: boolean;
  nested?: boolean;
};

/** Supporting text: comes into focus shortly after its heading. */
export const TEXT: RevealOpts = { soft: true, delay: 220 };

/**
 * Sets up motion for the case study whose hero is #intro: calmer settings than
 * the landing page (14px rise, 600ms; slower heading words). Returns null with
 * reduced motion (nothing is marked, everything shows as is).
 */
export function startCaseMotion(excluded: string) {
  const hero = document.getElementById("intro");
  const page = hero?.closest("article");
  if (!hero || !page) return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  page.style.setProperty("--reveal-shift", "14px");
  page.style.setProperty("--reveal-dur", "0.6s");
  page.style.setProperty("--word-shift", "0.15em");
  page.style.setProperty("--word-dur", "0.9s");

  const mark = (el: HTMLElement, opts: RevealOpts = {}) => {
    if (excluded && el.closest(excluded)) return;
    // One level of motion only: skip anything inside an element already marked.
    if (el.dataset.reveal !== undefined || el.parentElement?.closest("[data-reveal]")) return;
    // Blocks that already reveal word by word (headings via Words) keep only that motion.
    if (!opts.nested && el.querySelector("[data-reveal]")) return;
    el.dataset.reveal = "";
    if (opts.rise) el.dataset.revealRise = "";
    if (opts.mask) el.dataset.revealMask = opts.mask;
    if (opts.soft) el.dataset.revealSoft = "";
    if (opts.delay) el.dataset.revealDelay = String(opts.delay);
    if (opts.seq) el.dataset.revealSeq = "";
  };

  const tag = (selector: string, opts: RevealOpts = {}) => {
    page.querySelectorAll<HTMLElement>(selector).forEach((el) => mark(el, opts));
  };

  /** True when a grid lays its children out side by side. */
  const sideBySide = (el: Element | null) =>
    !!el && getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length > 1;

  const cleanup = () => {
    page.style.removeProperty("--reveal-shift");
    page.style.removeProperty("--reveal-dur");
    page.style.removeProperty("--word-shift");
    page.style.removeProperty("--word-dur");
  };

  return { page, mark, tag, sideBySide, cleanup };
}
