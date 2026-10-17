import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";

/** Plain text of a JSX tree (strings plus <strong> etc.), for screen readers. */
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node)) return textOf((node as ReactElement<{ children?: ReactNode }>).props.children);
  return "";
}

/** Wraps each word in a span carrying its index; whitespace stays as plain text so wrapping is unchanged. */
function split(node: ReactNode, counter: { n: number }, from: number): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, k) =>
      part === "" || /^\s+$/.test(part) ? (
        part
      ) : (
        <span key={k} className="word" style={{ "--wi": from + counter.n++ } as CSSProperties}>
          {part}
        </span>
      ),
    );
  }
  if (Array.isArray(node)) return Children.map(node, (child) => split(child, counter, from));
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    return cloneElement(el, undefined, split(el.props.children, counter, from));
  }
  return node;
}

/** Number of words in a JSX tree, so a following paragraph can continue the sequence. */
export const wordCount = (node: ReactNode) => textOf(node).trim().split(/\s+/).length;

/**
 * Word-by-word reveal for the About bio. The visible copy is split into word
 * spans (hidden from assistive tech) and the full text is given once, visually
 * hidden, so screen readers read it as one passage. Revealed through the shared
 * data-reveal observer; nothing reflows. `step` (ms) sets the pace per word.
 */
export default function Words({ children, from = 0, step }: { children: ReactNode; from?: number; step?: number }) {
  return (
    <span data-reveal="" data-words="" style={step ? ({ "--word-step": `${step}ms` } as CSSProperties) : undefined}>
      <span className="sr-only">{textOf(children)}</span>
      <span aria-hidden="true">{split(children, { n: 0 }, from)}</span>
    </span>
  );
}
