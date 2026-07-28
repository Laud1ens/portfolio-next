"use client";

import { motion } from "framer-motion";
import { useInView } from "./use-in-view";

export interface FlowDiagramProps {
  nodes: [string, string, string];
  captions?: [string?, string?, string?];
}

export function FlowDiagram({ nodes, captions = [] }: FlowDiagramProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="flex w-full items-center justify-between gap-2">
      {nodes.map((node, i) => (
        <div key={node} className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.25 }}
            className="rounded-xl border border-brown-deep/15 bg-cream px-3 py-3 text-center"
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
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.25 + 0.3 }}
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
