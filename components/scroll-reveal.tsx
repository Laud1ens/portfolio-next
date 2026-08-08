"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // threshold must stay 0. It is a ratio of the *target's* area, so for any
    // section taller than roughly 1/t viewports the ratio can never reach t and
    // the section would stay invisible forever. The Projects section is now
    // several screens tall, which put the old 0.15 permanently out of reach.
    // A negative rootMargin gives the "slightly into view" trigger instead.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
