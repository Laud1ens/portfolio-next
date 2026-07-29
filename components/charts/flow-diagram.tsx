"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "./use-in-view";

export interface FlowDiagramProps {
  nodes: [string, string, string];
  captions?: [string?, string?, string?];
}

export function FlowDiagram({ nodes, captions = [] }: FlowDiagramProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const prefersReducedMotion = useReducedMotion();
  const revealed = inView || prefersReducedMotion;

  return (
    <div
      ref={ref}
      className="flex w-full flex-col items-stretch gap-2 md:flex-row md:items-center md:justify-between"
      role="img"
      aria-label={nodes.join(" to ")}
    >
      {nodes.map((node, i) => (
        <div key={node} className="flex flex-col items-center gap-2 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : i * 0.25 }}
            className="w-full rounded-xl border border-brown-deep/15 bg-cream px-3 py-3 text-center md:w-auto"
          >
            <div className="font-label text-xs font-medium text-brown-deep">{node}</div>
            {captions[i] && (
              <div className="mt-0.5 font-mono text-[10px] text-brown/70">{captions[i]}</div>
            )}
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.svg
              width="28"
              height="12"
              viewBox="0 0 28 12"
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : {}}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : i * 0.25 + 0.3 }}
              className="rotate-90 md:rotate-0"
            >
              <path d="M0 6 H22" stroke="#A9673F" strokeWidth="1.5" fill="none" />
              <path d="M18 2 L24 6 L18 10 Z" fill="#A9673F" />
            </motion.svg>
          )}
        </div>
      ))}
    </div>
  );
}
