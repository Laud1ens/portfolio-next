import { skillGroups, stackChoices, stackLearning } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { STAGE_STYLES } from "@/components/sections/currently-working-on";
import { Disclosure } from "@/components/ui/disclosure";

/**
 * Toolkit, then the reasoning, then the learning.
 *
 * The badge grid on its own was the weakest section on the site: a list of
 * names anyone can type. It stays because it is genuinely useful for a reader
 * skimming for a keyword, but it is now the short preamble to the part that
 * carries the actual signal, which is why each thing was picked over the
 * obvious alternative.
 *
 * The third layer used to be headed "Not used yet, and why". The reframe to
 * work in progress is not a softening: every entry still names what has not
 * been proven, and each one now also carries the specific thing being built
 * and the outcome that would settle it. A reader can check those. "Familiar
 * with" cannot be checked, which is exactly why it is worth nothing.
 */
export function Skills() {
  return (
    <section id="stack" className="py-14">
      <div className="mb-6">
        <span className="font-label text-sm uppercase tracking-wider text-rust">{"// Stack"}</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-brown-deep md:text-4xl">
          What I reach for, and what I don&apos;t
        </h2>
        <p className="mt-2 max-w-2xl text-[0.92rem] text-brown">
          A list of tools proves very little, so the two lists that do are underneath it:
          the alternative I turned down for each choice, and the tools I am still
          learning with what would count as having learned them.
        </p>
      </div>

      {/* The scannable layer. */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2.5 font-label text-xs font-semibold uppercase tracking-wide text-brown-deep">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="border border-brown-deep/10 bg-cream font-label text-[0.72rem] text-brown"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* The layer that actually says something. */}
      <div className="mt-8 border-t border-brown-deep/10">
        <Disclosure
          hint={`${stackChoices.length} choices`}
          summary={
            <h3 className="font-label text-[0.7rem] uppercase tracking-[0.16em] text-rust">
              Why this and not that
            </h3>
          }
        >
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {stackChoices.map((c) => (
          <li key={c.tool} className="rounded-xl border border-brown-deep/10 bg-cream p-4">
            <p className="font-display text-[0.98rem] font-semibold leading-snug text-brown-deep">
              {c.tool}{" "}
              <span className="font-label text-[0.72rem] font-normal uppercase tracking-wider text-brown/50">
                over
              </span>{" "}
              <span className="text-brown/70">{c.insteadOf}</span>
            </p>
            <p className="mt-1 font-mono text-[0.68rem] text-brown/55">{c.usedOn}</p>
            <p className="mt-2.5 text-[0.86rem] leading-relaxed text-brown">{c.because}</p>
          </li>
        ))}
          </ul>
        </Disclosure>
      </div>

      {/* The part most portfolios leave out. */}
      <div className="border-t border-brown-deep/10">
        <Disclosure
          hint={`${stackLearning.length} tools`}
          summary={
            <h3 className="font-label text-[0.7rem] uppercase tracking-[0.16em] text-rust">
              Still learning, and how
            </h3>
          }
        >
          <ul className="divide-y divide-brown-deep/10 rounded-xl border border-brown-deep/10 bg-paper">
        {stackLearning.map((l) => (
          <li key={l.tool} className="grid grid-cols-1 gap-2 p-4 md:grid-cols-[180px_1fr] md:gap-5">
            <div className="flex items-center gap-2 md:flex-col md:items-start md:gap-1.5">
              <span className="font-mono text-[0.82rem] font-medium text-brown-deep">{l.tool}</span>
              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 font-label text-[0.6rem] uppercase tracking-wider ${STAGE_STYLES[l.stage]}`}
              >
                {l.stage}
              </span>
            </div>
            <div>
              <p className="text-[0.86rem] leading-relaxed text-brown">{l.doing}</p>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-brown/80">
                <span className="font-label text-[0.62rem] uppercase tracking-[0.16em] text-rust">
                  What would prove it
                </span>
                <br />
                {l.proof}
              </p>
            </div>
          </li>
        ))}
          </ul>
        </Disclosure>
      </div>
    </section>
  );
}
