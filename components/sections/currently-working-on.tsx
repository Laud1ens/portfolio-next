import { currentlyWorkingOn, type WipStage } from "@/lib/content";

/** Stage colours carry meaning, so they are not decorative.
 *
 *  "Next up" is deliberately the quietest of the three. Those entries are gaps
 *  rather than achievements, and styling them like the others would make the
 *  section read as six things in progress when it is really four in progress
 *  and two admissions. */
const STAGE_STYLES: Record<WipStage, string> = {
  Building: "border-rust/50 bg-rust/10 text-rust",
  Scoping: "border-taupe/60 bg-taupe/15 text-brown",
  "Next up": "border-brown-deep/20 bg-transparent text-brown/70",
};

export function CurrentlyWorkingOn() {
  return (
    <section id="now" className="py-20">
      <div className="mb-10">
        <span className="font-label text-sm uppercase tracking-wider text-rust">
          {"// Currently working on"}
        </span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-brown-deep md:text-4xl">
          What I&apos;m building now, and what I haven&apos;t started yet
        </h2>
        <p className="mt-2 max-w-2xl text-brown">
          The finished work is above. This is the in-flight half, including the gaps
          I know about. Anything marked <em>Next up</em> has not been started, and is
          listed rather than left off on purpose.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {currentlyWorkingOn.map((item) => (
          <li
            key={item.title}
            className="flex flex-col rounded-xl border border-brown-deep/10 bg-cream p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold leading-snug text-brown-deep">
                {item.title}
              </h3>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 font-label text-[0.65rem] uppercase tracking-wider ${STAGE_STYLES[item.stage]}`}
              >
                {item.stage}
              </span>
            </div>

            <p className="mt-2.5 text-[0.92rem] leading-relaxed text-brown">{item.what}</p>

            <div className="mt-4 border-t border-brown-deep/10 pt-3">
              <Label>Why it matters</Label>
              <p className="mt-1 text-[0.88rem] leading-relaxed text-brown/90">
                {item.whyItMatters}
              </p>
            </div>

            <div className="mt-3">
              <Label>Where it stands</Label>
              <p className="mt-1 text-[0.88rem] leading-relaxed text-brown/90">{item.status}</p>
            </div>

            {item.tools && item.tools.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-1.5 pt-1">
                {item.tools.map((t) => (
                  <li
                    key={t}
                    className="rounded bg-paper px-2 py-1 font-mono text-[0.7rem] text-brown/75"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-label text-[0.65rem] uppercase tracking-[0.16em] text-rust">
      {children}
    </span>
  );
}
