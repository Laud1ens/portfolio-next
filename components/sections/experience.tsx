import { experience } from "@/lib/content";
import { Separator } from "@/components/ui/separator";

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="mb-10">
        <span className="font-label text-sm uppercase tracking-wider text-rust">// Experience</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-brown-deep md:text-4xl">
          Six years reading patterns under pressure, before I had the statistics to name them
        </h2>
      </div>
      <div className="space-y-8">
        {experience.map((entry, i) => (
          <div key={`${entry.company}-${entry.period}`}>
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <h3 className="font-display text-lg font-semibold text-brown-deep">
                {entry.role} · {entry.company}
              </h3>
              <span className="font-mono text-xs text-brown/70">{entry.period}</span>
            </div>
            <div className="mb-2 font-label text-xs uppercase tracking-wide text-brown/60">
              {entry.location}
            </div>
            <p className="leading-relaxed text-brown">{entry.description}</p>
            {i < experience.length - 1 && <Separator className="mt-8 bg-brown-deep/10" />}
          </div>
        ))}
      </div>
    </section>
  );
}
