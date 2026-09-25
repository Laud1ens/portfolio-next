import type { ReactNode } from "react";

/**
 * A collapsed block that is still fully present in the HTML.
 *
 * The in-flight and stack sections were 4,768px between them, over a third of
 * the page, for work that is by definition unfinished. Deleting the detail was
 * the obvious fix and the wrong one: the detail is the honesty. Every "Next up"
 * entry names what has not been proven, and that text is also what Laudbot
 * reads to avoid claiming experience nobody has.
 *
 * So it collapses instead. A native <details> keeps the content in the server
 * HTML, which means search engines and the corpus builder still see it, and it
 * needs no client component, no state and no JavaScript to open. The rotation
 * on the marker is CSS only for the same reason.
 */
export function Disclosure({
  summary,
  hint,
  children,
  className = "",
}: {
  summary: ReactNode;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <details className={`group ${className}`}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-1 py-2 transition-colors hover:text-rust [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">{summary}</span>
        <span className="flex shrink-0 items-center gap-2">
          {hint && (
            <span className="font-label text-[0.68rem] uppercase tracking-wider text-brown/50 group-open:hidden">
              {hint}
            </span>
          )}
          <svg
            viewBox="0 0 12 12"
            aria-hidden
            className="h-3 w-3 shrink-0 fill-none stroke-rust stroke-[1.75] transition-transform duration-200 group-open:rotate-180"
          >
            <path d="M2.5 4.25 6 7.75l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </summary>
      <div className="pb-1 pt-2">{children}</div>
    </details>
  );
}
