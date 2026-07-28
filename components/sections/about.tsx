import { about } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="mb-10">
        <span className="font-label text-sm uppercase tracking-wider text-rust">// About</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-brown-deep md:text-4xl">
          Signal, not noise
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 leading-relaxed text-brown">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="rounded-2xl border border-brown-deep/10 bg-cream p-6">
          <h3 className="mb-4 font-display text-xl font-semibold text-brown-deep">
            {about.pivotCard.title}
          </h3>
          <div className="space-y-3 font-mono text-sm text-brown">
            {about.pivotCard.lines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
