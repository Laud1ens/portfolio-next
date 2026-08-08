"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Looping four-stage figure: crawling infant, walking child, humanoid, then a
 * machine that outruns the frame.
 *
 * Built as animated SVG rather than a generated video clip. A video would mean
 * an external file, a CDN fetch, a fixed palette that ignores the site theme,
 * and something that cannot be edited without re-rendering. This is a few
 * kilobytes of markup, inherits the brand colours, stays sharp at any size and
 * respects prefers-reduced-motion, where an autoplaying loop would not.
 */

const CYCLE = 9;
const STAGES = 4;

/** Each stage holds, then hands over. Keyframe times as fractions of the loop. */
function stageTimes(i: number) {
  const slot = 1 / STAGES;
  const start = i * slot;
  return {
    times: [
      0,
      Math.max(0, start - 0.04),
      start + 0.03,
      start + slot - 0.05,
      Math.min(1, start + slot + 0.01),
      1,
    ],
    opacity: [i === 0 ? 1 : 0, 0, 1, 1, 0, i === 0 ? 1 : 0],
  };
}

const LABELS = ["Crawling", "Walking", "Augmented", "Accelerating"];

export function Evolution() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="evolution-heading" className="py-16">
      <div className="rounded-2xl border border-brown-deep/10 bg-white p-7 md:p-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-rust/50" />
          <span className="font-label text-xs uppercase tracking-[0.2em] text-rust">
            Why this work matters to me
          </span>
        </div>
        <h2
          id="evolution-heading"
          className="mt-3 max-w-3xl font-display text-2xl font-semibold leading-snug text-brown-deep md:text-[2rem]"
        >
          We learn to crawl, then to walk, then we build machines that learn faster than we do.
        </h2>
        <p className="mt-4 max-w-2xl text-[1.02rem] leading-[1.75] text-brown">
          Every stage keeps what the last one learned and moves quicker. That is the part
          of this field I find genuinely interesting, and the part worth being careful
          about: the speed is the easy bit, and knowing whether the thing is actually
          right is the hard bit.
        </p>

        {/* The clip. Poster carries the same artwork, so a browser that will
            not play VP8 still shows the full progression rather than a gap. */}
        <div className="mt-8 overflow-hidden rounded-xl bg-paper motion-reduce:hidden">
          <video
            className="block h-auto w-full"
            src="/evolution.webm"
            poster="/evolution-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="A figure evolving through four stages: crawling infant, walking child, augmented humanoid, and a machine accelerating away"
          />
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {LABELS.map((l) => (
            <div
              key={l}
              className="text-center font-label text-[0.66rem] uppercase tracking-wider text-rust/80"
            >
              {l}
            </div>
          ))}
        </div>

        {/* Reduced-motion and no-video fallback: the same four stages as static
            line art, holding still. */}
        <div className="mt-8 hidden overflow-hidden rounded-xl bg-paper motion-reduce:block">
          <svg
            viewBox="0 0 900 260"
            className="h-auto w-full"
            role="img"
            aria-label="A figure evolving through four stages: crawling infant, walking child, augmented humanoid, and a machine accelerating away"
          >
            {/* ground */}
            <line x1="60" y1="212" x2="840" y2="212" stroke="currentColor"
                  className="text-brown-deep/15" strokeWidth="1.5" />

            {/* speed lines, intensifying into the final stage */}
            {!reduce &&
              [0, 1, 2, 3, 4, 5].map((n) => (
                <motion.line
                  key={n}
                  x1={620} y1={104 + n * 17} x2={760} y2={104 + n * 17}
                  stroke="currentColor"
                  className="text-rust"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  initial={{ opacity: 0, pathLength: 0.2 }}
                  animate={{
                    opacity: [0, 0, 0, 0.75, 0],
                    x: [0, 0, 0, 130, 190],
                    pathLength: [0.15, 0.15, 0.2, 1, 0.4],
                  }}
                  transition={{
                    duration: CYCLE,
                    repeat: Infinity,
                    ease: "easeOut",
                    times: [0, 0.72, 0.78, 0.92, 1],
                    delay: n * 0.045,
                  }}
                />
              ))}

            {/* the figure, one group per stage, cross-fading in place */}
            <motion.g
              animate={reduce ? undefined : { x: [0, 90, 250, 430, 620] }}
              transition={{ duration: CYCLE, repeat: Infinity, ease: "easeInOut",
                            times: [0, 0.25, 0.5, 0.75, 1] }}
            >
              {[Crawler, Walker, Humanoid, Machine].map((Stage, i) => {
                const k = stageTimes(i);
                return (
                  <motion.g
                    key={i}
                    initial={{ opacity: i === 0 ? 1 : 0 }}
                    animate={reduce ? { opacity: 1 } : { opacity: k.opacity }}
                    transition={
                      reduce
                        ? undefined
                        : { duration: CYCLE, repeat: Infinity, times: k.times, ease: "easeInOut" }
                    }
                    style={reduce ? { transform: `translateX(${i * 190}px)` } : undefined}
                  >
                    <Stage />
                  </motion.g>
                );
              })}
            </motion.g>
          </svg>

          <div className="grid grid-cols-4 gap-2 px-5 pb-5 pt-1">
            {LABELS.map((l, i) => (
              <motion.div
                key={l}
                className="text-center font-label text-[0.66rem] uppercase tracking-wider"
                initial={{ opacity: 0.3 }}
                animate={
                  reduce
                    ? { opacity: 0.75 }
                    : { opacity: [0.28, 0.28, 1, 1, 0.28, 0.28] }
                }
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: CYCLE,
                        repeat: Infinity,
                        times: stageTimes(i).times,
                        ease: "easeInOut",
                      }
                }
                style={{ color: "var(--rust, #A8642A)" }}
              >
                {l}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- stages. Simple silhouettes: geometric reads better than bad figurative ---- */

const ink = "currentColor";

function Crawler() {
  return (
    <g className="text-brown-deep" transform="translate(70,0)">
      <circle cx="34" cy="176" r="13" fill={ink} />
      <path d="M44 184 q22 -6 40 2" stroke={ink} strokeWidth="11" fill="none" strokeLinecap="round" />
      <path d="M50 194 l-4 18 M78 192 l6 20" stroke={ink} strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

function Walker() {
  return (
    <g className="text-brown-deep" transform="translate(70,0)">
      <circle cx="40" cy="132" r="14" fill={ink} />
      <path d="M40 148 l0 34" stroke={ink} strokeWidth="10" strokeLinecap="round" />
      <path d="M40 182 l-13 30 M40 182 l14 30" stroke={ink} strokeWidth="7" strokeLinecap="round" />
      <path d="M40 158 l-17 16 M40 158 l18 14" stroke={ink} strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

function Humanoid() {
  return (
    <g transform="translate(70,0)">
      <g className="text-brown-deep">
        <rect x="27" y="106" width="30" height="26" rx="7" fill={ink} />
        <path d="M42 132 l0 42" stroke={ink} strokeWidth="11" strokeLinecap="round" />
        <path d="M42 174 l-15 38 M42 174 l16 38" stroke={ink} strokeWidth="8" strokeLinecap="round" />
        <path d="M42 142 l-21 20 M42 142 l22 18" stroke={ink} strokeWidth="7" strokeLinecap="round" />
      </g>
      {/* augmentation */}
      <g className="text-rust">
        <circle cx="36" cy="118" r="3.4" fill={ink} />
        <circle cx="49" cy="118" r="3.4" fill={ink} />
        <path d="M42 148 l0 20" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="42" cy="154" r="4" fill="none" stroke={ink} strokeWidth="2" />
      </g>
    </g>
  );
}

function Machine() {
  return (
    <g transform="translate(70,0)">
      <g className="text-brown-deep">
        <rect x="24" y="100" width="36" height="30" rx="6" fill={ink} />
        <rect x="34" y="130" width="16" height="46" rx="5" fill={ink} />
        <path d="M42 176 l-18 36 M42 176 l19 36" stroke={ink} strokeWidth="9" strokeLinecap="round" />
        <path d="M42 140 l-25 14 M42 140 l26 12" stroke={ink} strokeWidth="8" strokeLinecap="round" />
      </g>
      <g className="text-rust">
        <rect x="31" y="110" width="22" height="6" rx="3" fill={ink} />
        <path d="M42 136 l0 34" stroke={ink} strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="42" cy="146" r="5" fill="none" stroke={ink} strokeWidth="2.2" />
        <circle cx="42" cy="162" r="3" fill={ink} />
      </g>
    </g>
  );
}
