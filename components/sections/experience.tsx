import { experience } from "@/lib/content";
import { Disclosure } from "@/components/ui/disclosure";

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
    <section id="experience" className="py-14">
      <div className="mb-5">
        <span className="font-label text-sm uppercase tracking-wider text-rust">{"// Experience"}</span>
        <h2 className="mt-2 max-w-3xl font-display text-3xl font-semibold text-brown-deep md:text-4xl">
          Six years reading patterns under pressure, before I had the statistics to name them
        </h2>
      </div>
      <ol className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
        {experience.map((entry) => (
          <li key={`${entry.company}-${entry.period}`} className="border-t border-brown-deep/10">
            <Disclosure
              summary={
                <span className="block">
                  <span className="block font-display text-[0.95rem] font-semibold leading-snug text-brown-deep">
                    {entry.role}
                  </span>
                  <span className="mt-0.5 block font-label text-[0.66rem] uppercase tracking-wide text-brown/60">
                    {entry.company} · {entry.period}
                  </span>
                </span>
              }
            >
              <p className="text-[0.86rem] leading-relaxed text-brown">{entry.description}</p>
              <p className="mt-1.5 font-mono text-[0.66rem] text-brown/55">{entry.location}</p>
            </Disclosure>
          </li>
        ))}
      </ol>
    </section>
  );
}
