import { currentlyWorkingOn, type WipStage } from "@/lib/content";
import { Disclosure } from "@/components/ui/disclosure";

/** Stage colours carry meaning, so they are not decorative.
 *
 *  "Next up" is deliberately the quietest of the three. Those entries are gaps
 *  rather than achievements, and styling them like the others would make the
 *  section read as six things in progress when it is really four in progress
 *  and two admissions.
 *
 *  Exported because the Stack section marks its learning list with the same
 *  three stages. Two copies would drift, and the moment "Next up" looks like
 *  "Building" in one place and not the other, the labels stop being read as
 *  meaning anything. */
export const STAGE_STYLES: Record<WipStage, string> = {
  Building: "border-rust/50 bg-rust/10 text-rust",
  Scoping: "border-taupe/60 bg-taupe/15 text-brown",
  "Next up": "border-brown-deep/20 bg-transparent text-brown/70",
};

export function CurrentlyWorkingOn() {
  return (
    <section id="now" className="py-14">
      <div className="mb-6">
        <span className="font-label text-sm uppercase tracking-wider text-rust">
          {"// Currently working on"}
        </span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-brown-deep md:text-4xl">
          What I&apos;m building now, and what I haven&apos;t started yet
        </h2>
        <p className="mt-2 max-w-2xl text-[0.92rem] text-brown">
          Open any one for why it matters, what would count as done, and where it
          honestly stands. Anything marked <em>Next up</em> has not been started, and is
          listed rather than left off on purpose.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
        {currentlyWorkingOn.map((item) => (
          <li key={item.title} className="border-t border-brown-deep/10">
            <Disclosure
              summary={
                <span className="flex flex-wrap items-center gap-2">
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 font-label text-[0.6rem] uppercase tracking-wider ${STAGE_STYLES[item.stage]}`}
                  >
                    {item.stage}
                  </span>
                  <span className="font-display text-[0.95rem] font-semibold leading-snug text-brown-deep">
                    {item.title}
                  </span>
                </span>
              }
            >
              <p className="text-[0.88rem] leading-relaxed text-brown">{item.what}</p>

              <div className="mt-3">
                <Label>Why it matters</Label>
                <p className="mt-1 text-[0.85rem] leading-relaxed text-brown/90">
                  {item.whyItMatters}
                </p>
              </div>

              <div className="mt-3">
                <Label>What I&apos;m aiming for</Label>
                <p className="mt-1 text-[0.85rem] leading-relaxed text-brown/90">{item.aiming}</p>
              </div>

              <div className="mt-3">
                <Label>Where it stands</Label>
                <p className="mt-1 text-[0.85rem] leading-relaxed text-brown/90">{item.status}</p>
              </div>

              {item.tools && item.tools.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.tools.map((t) => (
                    <li
                      key={t}
                      className="rounded bg-paper px-2 py-1 font-mono text-[0.68rem] text-brown/75"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </Disclosure>
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
