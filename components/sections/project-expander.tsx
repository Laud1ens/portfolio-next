"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ProjectDetail } from "@/lib/content";
import { ProjectDetailBody } from "@/components/sections/project-detail";

/**
 * Open and close one project's case study.
 *
 * Three constraints shaped this, and they pull against each other.
 *
 * 1. The page has to be short. Previously every case study rendered inline and
 *    always open, 1,400 to 2,900px each, six of them. That is the whole reason
 *    the page felt endless.
 * 2. The case studies have to stay in the server HTML. They are the substance
 *    of the site and the thing worth indexing, so the panel is height-collapsed
 *    with CSS, never unmounted.
 * 3. A panel that closes while the reader is below it rips the page out from
 *    under them. An earlier version auto-opened and auto-closed inline and was
 *    measured at 6/6 scrolling down but only 3/6 scrolling up, because
 *    travelling upward collapsed the card below and threw the viewport past the
 *    target.
 *
 * The height cap is what reconciles 1 and 3. An open panel is bounded at 75vh
 * and scrolls internally, so opening or closing moves the page by at most three
 * quarters of a screen instead of by three screens. On top of that, a close
 * that happens while the card sits above the viewport is done with the
 * transition switched off and the scroll position corrected by the exact height
 * delta, so the reader does not move at all. That is the case the old version
 * got wrong.
 */

/** Only one case study open at a time, so the page cannot grow without bound
 *  and so "close the other one" never becomes the reader's job. A module-level
 *  registry rather than context, because the Projects section is a server
 *  component and threading a provider through it would drag the whole list into
 *  the client bundle for one boolean. */
const openListeners = new Set<(openedId: string) => void>();

function announceOpen(id: string) {
  for (const listener of openListeners) listener(id);
}

export function ProjectExpander({
  detail,
  title,
}: {
  detail: ProjectDetail;
  title: string;
}) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  /** Collapse without moving the reader.
   *
   *  Called when the card has scrolled out of view, which means the reader
   *  cannot see the animation anyway. If the card is above the viewport, the
   *  collapse removes height from above them, and the browser's own scroll
   *  anchoring does not reliably cover an animated height change. So: kill the
   *  transition, collapse, measure what actually disappeared, and give it back
   *  as scroll. */
  const collapseSilently = useCallback(() => {
    const el = cardRef.current;
    if (!el) {
      setOpen(false);
      return;
    }
    const before = el.getBoundingClientRect();
    const wasAboveViewport = before.bottom <= 0;
    const scrollYBefore = window.scrollY;

    setAnimate(false);
    setOpen(false);

    requestAnimationFrame(() => {
      const after = el.getBoundingClientRect();
      const shrankBy = before.height - after.height;

      // Absolute target, not scrollBy. Most browsers implement scroll
      // anchoring and will have already absorbed some or all of this shrink on
      // their own; a relative nudge stacks on top of whatever they did and
      // double-corrects. Measured: a 272px collapse moved the page 544px.
      // Setting the position outright is idempotent, so the result is the same
      // whether the browser compensated fully, partly, or not at all.
      //
      // Skipped when shrankBy is 0, which means the DOM had not committed yet.
      // Doing nothing there is right: the browser's own anchoring is still the
      // better answer than overwriting it with a stale position.
      if (wasAboveViewport && shrankBy > 0) {
        window.scrollTo({ top: scrollYBefore - shrankBy, behavior: "instant" as ScrollBehavior });
      }
      setAnimate(true);
    });
  }, []);

  // Close when another card opens.
  useEffect(() => {
    const onOtherOpened = (openedId: string) => {
      if (openedId !== panelId) collapseSilently();
    };
    openListeners.add(onOtherOpened);
    return () => {
      openListeners.delete(onOtherOpened);
    };
  }, [panelId, collapseSilently]);

  // Close once the reader has left this card behind. This is the
  // "closes as you leave the window" behaviour, and it is only safe because of
  // the height cap and the scroll correction above.
  useEffect(() => {
    if (!open) return;
    const el = cardRef.current;
    if (!el) return;

    // Close only on a genuine *departure*, never on the first report.
    // IntersectionObserver delivers an entry as soon as it starts observing,
    // describing the current state rather than a change. Acting on that
    // directly closed the panel in the same frame it opened whenever the card
    // was not already within the root margin, which is exactly what happens
    // when a card is opened from a keyboard shortcut, a deep link, or a test
    // that clicks without scrolling. Waiting for an intersecting report first
    // means "it left" can only be true of something that had arrived.
    let hasArrived = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasArrived = true;
          return;
        }
        if (hasArrived) collapseSilently();
      },
      // A generous margin so the panel survives small scroll corrections and
      // only closes once the reader has genuinely moved on.
      { rootMargin: "200px 0px 200px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [open, collapseSilently]);

  // Escape closes, matching what every other dismissible panel on the web does.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    announceOpen(panelId);
  };

  return (
    <div ref={cardRef}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-rust/40 px-4 py-2 font-label text-sm font-medium text-rust transition-colors hover:bg-rust hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
      >
        {open ? "Close case study" : "Read the case study"}
        <span aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ↓
        </span>
      </button>

      {/* The 0fr/1fr grid is what lets this animate to the content's own height
          without hardcoding one. The inner min-h-0 is required: without it a
          grid item refuses to shrink below its content and the panel never
          closes. */}
      <div
        className={`grid ${animate ? "transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none" : ""}`}
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            id={panelId}
            role="region"
            aria-label={`Case study: ${title}`}
            aria-hidden={!open}
            className="mt-5 max-h-[75vh] overflow-y-auto overscroll-contain rounded-xl bg-white ring-1 ring-brown-deep/10"
          >
            <ProjectDetailBody detail={detail} />

            <div className="sticky bottom-0 flex justify-end border-t border-brown-deep/10 bg-white/95 px-6 py-3 backdrop-blur">
              <button
                type="button"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="font-label text-sm font-medium text-rust hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
