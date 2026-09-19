import Image from "next/image";
import type { ProjectDetail } from "@/lib/content";

/**
 * The long-form case study, as pure presentation.
 *
 * This used to own its own scroll observer and open/close animation. It does
 * not any more: components/sections/project-expander.tsx owns when this is
 * visible, and this file owns only what it looks like. Splitting them is what
 * made the height cap possible, because the expander can now measure and bound
 * a block it does not have to understand.
 */
export function ProjectDetailBody({ detail }: { detail: ProjectDetail }) {
  return (
    <div className="p-6 md:p-9">
      {/* Masthead */}
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-rust/50" />
        <span className="font-label text-xs uppercase tracking-[0.2em] text-rust">
          {detail.kicker}
        </span>
      </div>
      <h4 className="mt-3 max-w-4xl font-display text-[1.5rem] font-semibold leading-[1.25] text-brown-deep md:text-[1.9rem]">
        {detail.headline}
      </h4>

      <p className="mt-5 max-w-3xl text-[1.02rem] leading-[1.75] text-brown">
        {detail.intro}
      </p>

      {/* The data */}
      <div className="mt-9 border-t border-brown-deep/10 pt-7">
        <SectionLabel>The data</SectionLabel>
        <h5 className="mt-2 font-display text-lg font-semibold text-brown-deep">
          {detail.dataset.name}
        </h5>
        <p className="mt-1 font-mono text-xs text-brown/60">{detail.dataset.source}</p>
        <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-brown">
          {detail.dataset.body}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {detail.dataset.facts.map((f) => (
            <div key={f.label} className="rounded-lg bg-paper px-4 py-3">
              <div className="font-mono text-lg font-semibold leading-none text-brown-deep">
                {f.value}
              </div>
              <div className="mt-1.5 font-label text-[0.68rem] uppercase tracking-wide text-brown/65">
                {f.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key findings */}
      <div className="mt-9 border-t border-brown-deep/10 pt-7">
        <SectionLabel>Key findings</SectionLabel>
        <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">
          {detail.sections.map((s) => (
            <section key={s.heading}>
              <h5 className="font-display text-base font-semibold text-brown-deep">
                {s.heading}
              </h5>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-brown">{s.body}</p>
              {s.stat && (
                <div className="mt-3 border-l-2 border-rust/60 pl-3">
                  <div className="font-mono text-2xl font-semibold leading-none text-brown-deep">
                    {s.stat.value}
                  </div>
                  <div className="mt-1 font-label text-[0.68rem] uppercase tracking-wide text-brown/65">
                    {s.stat.label}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Figures, full width so they are actually readable */}
      {detail.figures && detail.figures.length > 0 && (
        <div className="mt-9 border-t border-brown-deep/10 pt-7">
          <SectionLabel>What it looks like</SectionLabel>
          <div className="mt-4 space-y-8">
            {detail.figures.map((fig) => (
              <figure key={fig.src}>
                <div className="overflow-hidden rounded-lg border border-brown-deep/10 bg-white">
                  <Image
                    src={fig.src}
                    alt={fig.alt}
                    width={1900}
                    height={1000}
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-2.5 max-w-3xl text-[0.82rem] leading-relaxed text-brown/70">
                  {fig.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Plain English */}
      <div className="mt-9 rounded-lg border-l-[3px] border-rust bg-paper p-5 md:p-6">
        <SectionLabel>What this means, without the jargon</SectionLabel>
        <p className="mt-2.5 max-w-3xl text-[0.98rem] leading-[1.75] text-brown">
          {detail.plainEnglish}
        </p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-label text-[0.7rem] uppercase tracking-[0.16em] text-rust">
      {children}
    </span>
  );
}
