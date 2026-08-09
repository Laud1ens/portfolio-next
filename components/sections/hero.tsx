"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/content";
import { AnimatedStat } from "@/components/animated-stat";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

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
        <div className="mb-10 flex flex-wrap items-center gap-3">
          {hero.ctas.map((cta) => (
            <span key={cta.href} className="inline-flex items-center gap-2">
              <Button
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
              {cta.status === "in-progress" && (
                <Badge
                  variant="secondary"
                  className="border border-taupe/40 bg-cream font-label text-[11px] font-medium uppercase tracking-wide text-brown"
                >
                  Updating
                </Badge>
              )}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 border-t border-brown-deep/10 pt-6">
          {hero.stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
      {/* Bounce with weight: a big hop, a smaller secondary hop, and a squash
          on each landing. The ground shadow tightens as it rises and spreads
          as it lands, which is what stops it reading as a sticker sliding up
          and down. A short pause between cycles keeps it from nagging. */}
      <div className="relative mx-auto w-full max-w-sm">
        <motion.div
          className="relative aspect-square w-full"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -30, 0, -10, 0],
                  scaleX: [1, 0.985, 1.035, 0.995, 1],
                  scaleY: [1, 1.02, 0.965, 1.008, 1],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 3.4,
                  times: [0, 0.32, 0.6, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 0.7,
                  ease: "easeInOut",
                }
          }
          style={{ transformOrigin: "50% 100%" }}
        >
          <Image
            src="/headshot.png"
            alt="Laud Asante"
            fill
            className="rounded-full object-cover shadow-[0_25px_45px_-10px_rgba(58,42,29,0.3)]"
            priority
          />
        </motion.div>
        <motion.div
          aria-hidden
          className="mx-auto mt-3 h-3 rounded-[50%] bg-brown-deep/20 blur-[6px]"
          animate={
            prefersReducedMotion
              ? { width: "60%", opacity: 0.35 }
              : {
                  width: ["62%", "42%", "68%", "52%", "62%"],
                  opacity: [0.32, 0.16, 0.36, 0.24, 0.32],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 3.4,
                  times: [0, 0.32, 0.6, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 0.7,
                  ease: "easeInOut",
                }
          }
        />
      </div>
    </section>
  );
}
