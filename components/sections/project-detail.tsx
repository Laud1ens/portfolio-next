import Image from "next/image";
import type { ProjectDetail } from "@/lib/content";

/**
 * The case-study expansion, as pure presentation.
 *
 * Four fixed questions rather than a report: what I set out to build, how I
 * thought about it, what I used, what it found. Each is its own glass panel
 * so the reader can scan a 2x2 grid instead of wading through a long scroll.
 * components/sections/project-expander.tsx owns when this is visible and
 * measures its height; this file owns only what it looks like.
 */
export function ProjectDetailBody({ detail }: { detail: ProjectDetail }) {
  return (
    <div className="relative overflow-hidden p-6 md:p-9">
      {/* Ambient colour the glass panels refract against. Without something
          behind them, a translucent panel on a near-white page just reads as
          a faint grey box rather than glass. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-rust/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-sage/25 blur-3xl"
      />

      <div className="relative">
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

        {/* Four fixed questions, each its own glass card */}
        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
          <GlassCard label="What I set out to build">
            <p className="text-[0.95rem] leading-relaxed text-brown">{detail.built}</p>
          </GlassCard>

          <GlassCard label="How I thought about it">
            <p className="text-[0.95rem] leading-relaxed text-brown">{detail.process}</p>
          </GlassCard>

          <GlassCard label="Tools">
            <div className="flex flex-wrap gap-2">
              {detail.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-brown-deep/10 bg-white/50 px-3 py-1 font-label text-[0.72rem] uppercase tracking-wide text-brown-deep"
                >
                  {t}
                </span>
              ))}
            </div>
          </GlassCard>

          <GlassCard label="What it found">
            <p className="text-[0.95rem] leading-relaxed text-brown">{detail.impact}</p>
            {detail.stat && (
              <div className="mt-3 border-l-2 border-rust/60 pl-3">
                <div className="font-mono text-2xl font-semibold leading-none text-brown-deep">
                  {detail.stat.value}
                </div>
                <div className="mt-1 font-label text-[0.68rem] uppercase tracking-wide text-brown/65">
                  {detail.stat.label}
                </div>
              </div>
            )}
          </GlassCard>
        </div>

        {detail.figure && (
          <figure className="mt-6">
            <div className="overflow-hidden rounded-xl border border-brown-deep/10 bg-white/60 backdrop-blur-sm">
              <Image
                src={detail.figure.src}
                alt={detail.figure.alt}
                width={1900}
                height={1000}
                sizes="(max-width: 768px) 100vw, 900px"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-2 max-w-3xl text-[0.8rem] leading-relaxed text-brown/70">
              {detail.figure.caption}
            </figcaption>
          </figure>
        )}
      </div>
    </div>
  );
}

function GlassCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/45 p-5 shadow-[0_4px_24px_-8px_rgba(58,42,29,0.15)] backdrop-blur-md">
      <span className="font-label text-[0.7rem] uppercase tracking-[0.16em] text-rust">
        {label}
      </span>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}
