"use client";

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useInView } from "./use-in-view";
import { AnimatedStat } from "@/components/animated-stat";

export interface ComparisonBarChartProps {
  headlineStat?: { value: number; decimals?: number; suffix?: string; label: string };
  primary: { label: string; value: number };
  secondary: { label: string; value: number };
  primaryCaption: string;
  valueDecimals?: number;
}

export function ComparisonBarChart({
  headlineStat,
  primary,
  secondary,
  primaryCaption,
  valueDecimals = 3,
}: ComparisonBarChartProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const data = [
    { name: primary.label, value: primary.value, key: "primary" },
    { name: secondary.label, value: secondary.value, key: "secondary" },
  ];

  return (
    <div ref={ref} className="w-full">
      {headlineStat && (
        <div className="mb-4">
          <AnimatedStat
            value={headlineStat.value}
            decimals={headlineStat.decimals}
            suffix={headlineStat.suffix}
            label={headlineStat.label}
          />
        </div>
      )}
      <div className="mb-1 font-label text-[11px] uppercase tracking-wide text-brown/60">
        {primaryCaption}
      </div>
      <div className="h-28 w-full">
        {inView && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 4 }}>
              <XAxis
                type="number"
                hide
                domain={[(dataMin: number) => Math.min(0, dataMin), (dataMax: number) => Math.max(0, dataMax)]}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={90}
                tick={{ fontSize: 11, fill: "#5B4130" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => Number(value).toFixed(valueDecimals)}
                contentStyle={{
                  background: "#FBF9F5",
                  border: "1px solid rgba(58,42,29,0.15)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive animationDuration={900}>
                {data.map((entry) => (
                  <Cell key={entry.key} fill={entry.key === "primary" ? "#A9673F" : "#DFCBAF"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
