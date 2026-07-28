"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/content";

export function AnimatedStat({ value, suffix = "", decimals = 0, label }: Stat) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const duration = 1200;
          function tick(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            setDisplay(value * progress);
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="text-center">
      <div ref={ref} className="font-mono text-3xl font-semibold text-brown-deep">
        {display.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mt-1 font-label text-xs uppercase tracking-wide text-brown">{label}</div>
    </div>
  );
}
