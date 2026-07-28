import Image from "next/image";
import { hero } from "@/lib/content";
import { AnimatedStat } from "@/components/animated-stat";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-12 pb-16 pt-44 md:grid-cols-[1.15fr_0.85fr]">
      <div>
        <span className="mb-4 block font-label text-sm font-semibold uppercase tracking-[0.22em] text-rust">
          {hero.kicker}
        </span>
        <h1 className="mb-5 font-display text-4xl font-semibold leading-[1.06] text-brown-deep md:text-6xl">
          {hero.headline}
          <em className="text-rust not-italic md:italic">{hero.headlineEmphasis}</em>.
        </h1>
        <p className="mb-8 max-w-xl text-lg leading-relaxed text-brown">{hero.lede}</p>
        <div className="mb-10 flex flex-wrap gap-3">
          {hero.ctas.map((cta) => (
            <Button
              key={cta.href}
              asChild
              variant={cta.primary ? "default" : "outline"}
              className={
                cta.primary
                  ? "bg-brown-deep text-paper hover:bg-brown"
                  : "border-brown-deep/30 text-brown-deep hover:bg-cream"
              }
            >
              <a href={cta.href} target="_blank" rel="noopener noreferrer">
                {cta.label}
              </a>
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 border-t border-brown-deep/10 pt-6">
          {hero.stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
      <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(58,42,29,0.35)]">
        <Image src="/headshot.png" alt="Laud Asante" fill className="object-cover" priority />
      </div>
    </section>
  );
}
