import Image from "next/image";

/**
 * Looping four-stage clip: crawling infant, walking toddler, augmented boy,
 * then a machine that accelerates out of frame.
 *
 * The artwork is generated illustration; the motion is real frame animation.
 * Each figure is a separate sprite dissolved into the next at the same spot
 * on the ground line, with a gait bob that quickens stage by stage, a contact
 * shadow that spreads and tightens with it, and speed streaks that spawn once
 * the machine appears. An earlier version tracked a camera across a single
 * still, which read as sliding rather than transforming.
 *
 * No client JS: a looping muted video needs none, and adding a hook here
 * would drag the whole section into the client bundle for nothing.
 */
const LABELS = ["Crawling", "Walking", "Augmented", "Accelerating"];

export function Evolution() {
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

        {/* The clip. Hidden outright when the reader has asked for less motion. */}
        <div className="mt-8 overflow-hidden rounded-xl bg-paper motion-reduce:hidden">
          {/* Two sources, in preference order.
              evolution.mp4 is the slot for an AI-generated replacement clip:
              drop that file into /public and the browser picks it with no code
              change, and the hand-animated webm stays underneath as the
              fallback so the section is never broken while that file does not
              exist. Worth shipping both regardless of which is newer, because
              iOS Safari will not decode the VP8 webm at all and needs the
              H.264 MP4. */}
          <video
            className="block h-auto w-full"
            poster="/evolution-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="A figure evolving through four stages: crawling infant, walking toddler, augmented humanoid, and a machine accelerating away"
          >
            <source src="/evolution.mp4" type="video/mp4" />
            <source src="/evolution.webm" type="video/webm" />
          </video>
        </div>

        {/* Reduced-motion, and any browser that will not play VP8: the same
            artwork as one still, showing all four stages at once rather than a
            single frozen frame. */}
        <div className="mt-8 hidden overflow-hidden rounded-xl bg-paper motion-reduce:block">
          <Image
            src="/evolution-poster.jpg"
            alt="Four stages side by side: a crawling infant, a walking toddler, a boy traced with circuitry, and a machine sprinting under speed lines"
            width={1440}
            height={607}
            className="h-auto w-full"
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
      </div>
    </section>
  );
}
