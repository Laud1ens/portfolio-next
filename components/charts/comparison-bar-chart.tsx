"use client";

import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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
    <div
      ref={ref}
      className="w-full"
      role="img"
      aria-label={`${primary.label} ${primary.value}, ${secondary.label} ${secondary.value}`}
    >
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
            <BarChart data={data} layout="vertical" margin={{ top: 4, right: 46, bottom: 4, left: 4 }}>
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
                <LabelList
                  dataKey="value"
                  content={(props) => {
                    const { x, y, width, height, value } = props as {
                      x?: number;
                      y?: number;
                      width?: number;
                      height?: number;
                      value?: number | string;
                    };
                    if (x == null || y == null || width == null || height == null) return null;
                    // Always anchor to the right edge of the bar's rect (x + width is the
                    // rightmost point regardless of whether the value is positive or negative),
                    // so the label never lands on top of the y-axis category labels for
                    // near-zero/negative bars.
                    const labelX = x + width + 6;
                    const labelY = y + height / 2;
                    return (
                      <text
                        x={labelX}
                        y={labelY}
                        dy={4}
                        textAnchor="start"
                        style={{ fontFamily: "var(--font-jbmono), monospace", fontSize: 11, fill: "#5B4130" }}
                      >
                        {Number(value).toFixed(valueDecimals)}
                      </text>
                    );
                  }}
                />
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
