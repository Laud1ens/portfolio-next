"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectDetail } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Long-form project expansion, revealed on scroll and collapsed once the
 * reader is clear of it.
 *
 * The observer uses a *positive* root margin so the panel opens shortly
 * before the card reaches the viewport and closes well after it leaves.
 * That matters for direction symmetry: with a negative margin the panel
 * only opened once the card was already on screen, so scrolling downward
 * grew the card underneath the reader and pushed the rest of the page away
 * as they travelled toward it. Expanding ahead of arrival keeps the layout
 * settled in both directions.
 */
export function ProjectDetailPanel({ detail }: { detail: ProjectDetail }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Observe the card. This wrapper is empty while collapsed, so it has zero
    // height and would only ever intersect at one exact scroll offset.
    const target = ref.current?.closest("[data-project-card]") ?? ref.current;
    if (!target) return;

    let fired = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        fired = true;
        if (!entry.isIntersecting) return;
        // Reveal once, then stop watching. Re-collapsing looks tidy in theory
        // and is unusable in practice: these panels are 1,400-2,900px tall, so
        // every close rips thousands of pixels out from under the reader.
        // Measured on production, collapse-on-exit passed 6/6 scrolling down
        // and only 3/6 scrolling up, because travelling upward collapsed the
        // card below and threw the viewport past the target. Opening once and
        // staying open keeps the reveal effect and makes both directions
        // stable, since the growth always happens ahead of the reader.
        setInView(true);
        io.unobserve(target);
      },
      { rootMargin: "300px 0px 300px 0px", threshold: 0 },
    );
    io.observe(target);

    // Failsafe: a non-painting or throttled tab silently never fires the
    // observer. This content is the substance of the project, so the
    // acceptable failure is "shown without animation", never "missing".
    const failsafe = window.setTimeout(() => {
      if (!fired) setInView(true);
    }, 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const open = reduceMotion ? true : inView;
  let step = 0;
  const next = () => (step += 1) * 0.06;

  return (
    <div ref={ref}>
      {/* Always mounted, never unmounted. Keeping the markup in the document
          means the detail ships in the server HTML and is indexable; only its
          height and opacity are animated. Unmounting it on scroll would hide
          the substance of every project from search entirely. */}
      <motion.div
        initial={false}
        animate={
          reduceMotion
            ? { height: "auto", opacity: 1 }
            : { height: open ? "auto" : 0, opacity: open ? 1 : 0 }
        }
        transition={{
          height: { duration: reduceMotion ? 0 : 0.55, ease: EASE },
          opacity: { duration: reduceMotion ? 0 : 0.3, ease: "easeOut" },
        }}
        aria-hidden={!open && !reduceMotion}
        className="overflow-hidden"
      >
            <div className="mt-6 rounded-xl bg-white p-6 shadow-[0_1px_0_rgba(58,42,29,0.06)] ring-1 ring-brown-deep/10 md:p-9">
              {/* Masthead */}
              <Reveal d={next()} r={reduceMotion} o={open}>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-rust/50" />
                  <span className="font-label text-xs uppercase tracking-[0.2em] text-rust">
                    {detail.kicker}
                  </span>
                </div>
                <h4 className="mt-3 max-w-4xl font-display text-[1.6rem] font-semibold leading-[1.25] text-brown-deep md:text-[2.1rem]">
                  {detail.headline}
                </h4>
              </Reveal>

              {/* Introduction */}
              <Reveal d={next()} r={reduceMotion} o={open}>
                <p className="mt-5 max-w-3xl text-[1.02rem] leading-[1.75] text-brown md:text-[1.08rem]">
                  {detail.intro}
                </p>
              </Reveal>

              {/* The data */}
              <Reveal d={next()} r={reduceMotion} o={open}>
                <div className="mt-9 border-t border-brown-deep/10 pt-7">
                  <SectionLabel>The data</SectionLabel>
                  <h5 className="mt-2 font-display text-lg font-semibold text-brown-deep">
                    {detail.dataset.name}
                  </h5>
                  <p className="mt-1 font-mono text-xs text-brown/60">{detail.dataset.source}</p>
                  <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-brown">
                    {detail.dataset.body}
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                    {detail.dataset.facts.map((f, i) => (
                      <motion.div
                        key={f.label}
                        initial={false}
                        animate={
                          reduceMotion || open ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                        }
                        transition={{ duration: 0.4, delay: open ? 0.28 + i * 0.05 : 0, ease: EASE }}
                        className="rounded-lg bg-paper px-4 py-3"
                      >
                        <div className="font-mono text-lg font-semibold leading-none text-brown-deep">
                          {f.value}
                        </div>
                        <div className="mt-1.5 font-label text-[0.68rem] uppercase tracking-wide text-brown/65">
                          {f.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Key findings */}
              <div className="mt-9 border-t border-brown-deep/10 pt-7">
                <Reveal d={next()} r={reduceMotion} o={open}>
                  <SectionLabel>Key findings</SectionLabel>
                </Reveal>
                <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">
                  {detail.sections.map((s) => (
                    <Reveal key={s.heading} d={next()} r={reduceMotion} o={open}>
                      <section>
                        <h5 className="font-display text-base font-semibold text-brown-deep">
                          {s.heading}
                        </h5>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-brown">{s.body}</p>
                        {s.stat && (
                          <div className="mt-3 border-l-2 border-rust/60 pl-3">
                            <div className="font-mono text-2xl font-semibold leading-none text-brown-deep">
                              {s.stat.value}
                            </div>
                            <div className="mt-1 font-label text-[0.68rem] uppercase tracking-wide text-brown/65">
                              {s.stat.label}
                            </div>
                          </div>
                        )}
                      </section>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Figures, full width so they are actually readable */}
              {detail.figures && detail.figures.length > 0 && (
                <div className="mt-9 border-t border-brown-deep/10 pt-7">
                  <Reveal d={next()} r={reduceMotion} o={open}>
                    <SectionLabel>What it looks like</SectionLabel>
                  </Reveal>
                  <div className="mt-4 space-y-8">
                    {detail.figures.map((fig) => (
                      <Reveal key={fig.src} d={next()} r={reduceMotion} o={open}>
                        <figure>
                          <div className="overflow-hidden rounded-lg border border-brown-deep/10 bg-white">
                            <Image
                              src={fig.src}
                              alt={fig.alt}
                              width={1900}
                              height={1000}
                              sizes="(max-width: 768px) 100vw, 900px"
                              className="h-auto w-full"
                            />
                          </div>
                          <figcaption className="mt-2.5 max-w-3xl text-[0.82rem] leading-relaxed text-brown/70">
                            {fig.caption}
                          </figcaption>
                        </figure>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}

              {/* Plain English */}
              <Reveal d={next()} r={reduceMotion} o={open}>
                <div className="mt-9 rounded-lg border-l-[3px] border-rust bg-paper p-5 md:p-6">
                  <SectionLabel>What this means, without the jargon</SectionLabel>
                  <p className="mt-2.5 max-w-3xl text-[0.98rem] leading-[1.75] text-brown">
                    {detail.plainEnglish}
                  </p>
                </div>
              </Reveal>
            </div>
      </motion.div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-label text-[0.7rem] uppercase tracking-[0.16em] text-rust">
      {children}
    </span>
  );
}

/** Fades a block up into place on a staggered delay, driven by the panel's
 *  open state rather than by mount, since the panel is never unmounted. */
function Reveal({
  children,
  d,
  r,
  o,
}: {
  children: React.ReactNode;
  d: number;
  r: boolean | null;
  o: boolean;
}) {
  if (r) return <>{children}</>;
  return (
    <motion.div
      initial={false}
      animate={o ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: o ? d : 0, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
