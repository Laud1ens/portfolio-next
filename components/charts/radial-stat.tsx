"use client";

import { motion } from "framer-motion";
import { useInView } from "./use-in-view";
import { AnimatedStat } from "@/components/animated-stat";

export interface RadialStatProps {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

export function RadialStat({ value, suffix = "%", decimals = 1, label }: RadialStatProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const fraction = Math.min(value / 100, 1);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <svg width="110" height="110" viewBox="0 0 110 110" className="-rotate-90">
        <circle cx="55" cy="55" r={radius} fill="none" stroke="#DFCBAF" strokeWidth="8" />
        <motion.circle
          cx="55"
          cy="55"
          r={radius}
          fill="none"
          stroke="#A9673F"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: inView ? circumference * (1 - fraction) : circumference }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <AnimatedStat value={value} suffix={suffix} decimals={decimals} label={label} />
    </div>
  );
}
