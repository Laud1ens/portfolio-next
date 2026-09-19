import { experience } from "@/lib/content";

/**
 * Two columns and tighter type, rather than a full-width stack.
 *
 * This is supporting evidence for the career change, not the headline. At full
 * width each role ran to four or five lines of prose and the section cost more
 * vertical space than the projects it exists to contextualise. Paired columns
 * let a reader take in the whole arc, FMCG sales through to an MSc, in roughly
 * one screen.
 */
export function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="mb-8">
        <span className="font-label text-sm uppercase tracking-wider text-rust">{"// Experience"}</span>
        <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold text-brown-deep md:text-4xl">
          Six years reading patterns under pressure, before I had the statistics to name them
        </h2>
      </div>
      <ol className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
        {experience.map((entry) => (
          <li
            key={`${entry.company}-${entry.period}`}
            className="border-t border-brown-deep/10 pt-4"
          >
            <div className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:justify-between">
              <h3 className="font-display text-[1.02rem] font-semibold leading-snug text-brown-deep">
                {entry.role}
              </h3>
              <span className="shrink-0 font-mono text-[0.68rem] text-brown/70">
                {entry.period}
              </span>
            </div>
            <div className="mt-0.5 font-label text-[0.68rem] uppercase tracking-wide text-brown/70">
              {entry.company} · {entry.location}
            </div>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-brown">{entry.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
