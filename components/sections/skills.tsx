import { skillGroups, stackChoices, stackGaps } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

/**
 * Toolkit, then the reasoning, then the gaps.
 *
 * The badge grid on its own was the weakest section on the site: a list of
 * names anyone can type. It stays because it is genuinely useful for a reader
 * skimming for a keyword, but it is now the short preamble to the part that
 * carries the actual signal, which is why each thing was picked over the
 * obvious alternative and what has deliberately not been picked at all.
 */
export function Skills() {
  return (
    <section id="stack" className="py-20">
      <div className="mb-8">
        <span className="font-label text-sm uppercase tracking-wider text-rust">{"// Stack"}</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-brown-deep md:text-4xl">
          What I reach for, and what I don&apos;t
        </h2>
        <p className="mt-2 max-w-2xl text-brown">
          A list of tools proves very little. What follows each one is the alternative
          I turned down and the reason, plus an honest list of the things I have not
          used at all.
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
      <h3 className="mt-12 font-label text-[0.7rem] uppercase tracking-[0.16em] text-rust">
        Why this and not that
      </h3>
      <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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

      {/* The part most portfolios leave out. */}
      <h3 className="mt-12 font-label text-[0.7rem] uppercase tracking-[0.16em] text-rust">
        Not used yet, and why
      </h3>
      <ul className="mt-4 divide-y divide-brown-deep/10 rounded-xl border border-brown-deep/10 bg-paper">
        {stackGaps.map((g) => (
          <li key={g.tool} className="grid grid-cols-1 gap-1 p-4 md:grid-cols-[180px_1fr] md:gap-5">
            <span className="font-mono text-[0.82rem] font-medium text-brown-deep">{g.tool}</span>
            <span className="text-[0.86rem] leading-relaxed text-brown">{g.reason}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
