"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProjectDetail } from "@/lib/content";

/**
 * Long-form project expansion that reveals on scroll and collapses again once
 * the reader has moved past it.
 *
 * The collapse is deliberately asymmetric. Expanding uses a generous negative
 * root margin so the panel is already open by the time it reaches reading
 * height, while collapsing only fires once the card is well clear of the
 * viewport. Collapsing an element that is still on screen would yank the text
 * out from under the reader, and collapsing one just above the fold would
 * shift everything below it mid-scroll.
 */
export function ProjectDetailPanel({ detail }: { detail: ProjectDetail }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  // Observe the surrounding card, not this wrapper. When collapsed the wrapper
  // has zero height, so observing it would mean the panel could never open
  // itself: it would only intersect at a single exact scroll offset.
  useEffect(() => {
    const target = ref.current?.closest("[data-project-card]") ?? ref.current;
    if (!target) return;

    let fired = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        fired = true;
        setInView(entry.isIntersecting);
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0 },
    );
    io.observe(target);

    // Failsafe. If the observer never reports (a non-painting or throttled
    // tab will silently never fire it), open the panel anyway. This content
    // is the substance of the project, so the acceptable failure is "shown
    // without animation", never "silently missing".
    const failsafe = window.setTimeout(() => {
      if (!fired) setInView(true);
    }, 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  // Reduced motion: render it open and static. No height animation, no fade.
  const open = reduceMotion ? true : inView;

  return (
    <div ref={ref}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: reduceMotion ? 0 : 0.35, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <div className="mt-6 border-t border-brown-deep/10 pt-6">
              <Reveal delay={0} reduceMotion={reduceMotion}>
                <span className="font-label text-xs uppercase tracking-[0.18em] text-rust">
                  {detail.kicker}
                </span>
                <h4 className="mt-2 max-w-3xl font-display text-2xl font-semibold leading-snug text-brown-deep md:text-[1.75rem]">
                  {detail.headline}
                </h4>
              </Reveal>

              <div className="mt-7 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">
                {detail.sections.map((section, i) => (
                  <Reveal key={section.heading} delay={0.08 + i * 0.07} reduceMotion={reduceMotion}>
                    <section>
                      <h5 className="font-display text-base font-semibold text-brown-deep">
                        {section.heading}
                      </h5>
                      <p className="mt-2 text-sm leading-relaxed text-brown">{section.body}</p>
                      {section.stat && (
                        <div className="mt-3 border-l-2 border-rust/60 pl-3">
                          <div className="font-mono text-2xl font-semibold leading-none text-brown-deep">
                            {section.stat.value}
                          </div>
                          <div className="mt-1 font-label text-xs uppercase tracking-wide text-brown/70">
                            {section.stat.label}
                          </div>
                        </div>
                      )}
                    </section>
                  </Reveal>
                ))}
              </div>

              {detail.figures && detail.figures.length > 0 && (
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {detail.figures.map((fig, i) => (
                    <Reveal
                      key={fig.src}
                      delay={0.12 + (detail.sections.length + i) * 0.06}
                      reduceMotion={reduceMotion}
                    >
                      <figure>
                        <div className="overflow-hidden rounded-lg border border-brown-deep/10 bg-white">
                          <Image
                            src={fig.src}
                            alt={fig.alt}
                            width={1400}
                            height={800}
                            className="h-auto w-full"
                          />
                        </div>
                        <figcaption className="mt-2 text-xs leading-relaxed text-brown/70">
                          {fig.caption}
                        </figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Fades a block up into place. Children stagger via an explicit delay. */
function Reveal({
  children,
  delay,
  reduceMotion,
}: {
  children: React.ReactNode;
  delay: number;
  reduceMotion: boolean | null;
}) {
  if (reduceMotion) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
