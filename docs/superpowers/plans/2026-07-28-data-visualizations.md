# Data Visualizations + Copy Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore and upgrade the portfolio's dropped project visualizations as real, animated charts (Recharts + Framer Motion), grounded only in numbers already in `lib/content.ts`, and remove em-dash usage from the site's copy.

**Architecture:** Three reusable chart components (`ComparisonBarChart`, `FlowDiagram`, `RadialStat`) in `components/charts/`, each gated by a shared `useInView` hook so animation triggers on scroll rather than on mount. `lib/content.ts` gains a typed `visual` field per project; `projects.tsx` renders the right component per project via a two-column card layout (visual + body), restoring the original site's layout.

**Tech Stack:** `recharts` (bar charts), `framer-motion` (flow-diagram + radial-stat animation), reusing the existing `AnimatedStat` component for count-up numbers.

## Global Constraints

- Chart colors: `rust` (#A9673F) is the ONLY validated data-mark color in this design system — use it for the emphasized/primary value in every chart. Use `taupe` (#B79772) or `beige` (#DFCBAF) for de-emphasized/secondary values. Do NOT introduce new hues — this was validated with `scripts/validate_palette.js` in the design spec; other tokens (sage, brown, brown-deep) fail as chart-mark colors.
- No fabricated data. Every chart value must trace to a number already present in `lib/content.ts` before this plan's Task 2, or explicitly given in this plan's task text. Do not invent a comparison baseline where the source only gives one number (Manufacturing Analytics gets a single radial stat, not a fabricated comparison).
- Dissertation card gets TWO real numbers from two different time snapshots (XGBoost 0.593/GAT-LSTM −0.007 = the original site's benchmark; SARIMA 0.745 = the CV's current figure) — these must be visually distinguished (labeled "Earlier benchmark" vs "Current leader"), never merged into one 3-bar chart implying they're the same measurement.
- All charts animate in on scroll into view (not on page load), via the shared `useInView` hook — reuse the existing `IntersectionObserver`-based pattern already established in `components/scroll-reveal.tsx` and `components/animated-stat.tsx`.
- Recharts bar charts get a hover tooltip (Recharts' built-in `<Tooltip />`) styled to the site's palette (`#FBF9F5` background, `rgba(58,42,29,0.15)` border).
- Verification method: `npm run build` + `npm run lint` clean, PLUS visual checks must use a **fresh production server** (`npm run build && npm run start`) or a freshly-started dev server — NOT a dev server that has been running across many file changes. A stale/hot-reloaded dev server was found during prior work to produce corrupted `AnimatedStat` values (negative numbers) that don't occur in a clean build; this is a tooling artifact of long-lived HMR sessions in this Next.js version, not a real bug, but it means every task in this plan must verify against a clean server start.
- Zero em-dash (—, U+2014) characters may remain in `lib/content.ts` after Task 2.

---

### Task 1: Install chart libraries

**Files:**
- Modify: `package.json`, `package-lock.json` (generated)

**Interfaces:**
- Produces: `recharts` and `framer-motion` importable as npm packages for all later tasks.

- [ ] **Step 1: Install**

Run: `npm install recharts framer-motion`

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds (no code uses the new packages yet, this just confirms install didn't break anything).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "Add recharts and framer-motion dependencies"
```

---

### Task 2: Add chart data model and clean up em-dashes in lib/content.ts

**Files:**
- Modify: `lib/content.ts`

**Interfaces:**
- Produces: `ProjectVisual` type (exported), and a `visual?: ProjectVisual` field added to the `Project` interface and populated on all 5 entries in the `projects` array. Consumed by Task 6 (`projects.tsx`) and by the `visual.type` discriminant which Tasks 3-5's components key off (`"comparisonBar"`, `"flow"`, `"radialStat"`).

- [ ] **Step 1: Add the `ProjectVisual` type**

In `lib/content.ts`, add this type definition directly above the existing `Project` interface:

```typescript
export type ProjectVisual =
  | {
      type: "comparisonBar";
      headlineStat?: { value: number; decimals?: number; suffix?: string; label: string };
      primary: { label: string; value: number };
      secondary: { label: string; value: number };
      primaryCaption: string;
      valueDecimals?: number;
    }
  | { type: "flow"; nodes: [string, string, string]; captions?: [string?, string?, string?] }
  | { type: "radialStat"; value: number; suffix?: string; decimals?: number; label: string };
```

- [ ] **Step 2: Add `visual?: ProjectVisual;` to the `Project` interface**

Find the existing `Project` interface (it has fields `tag`, `title`, `role`, `what`, `outcome`, `impact`, `repoUrl?`). Add one new optional field:

```typescript
  visual?: ProjectVisual;
```

- [ ] **Step 3: Populate `visual` on each of the 5 entries in the `projects` array**

In order, add a `visual` field to each project object (find each by its `title`):

To the **"US County-Level Forecasting..."** (Dissertation) project, add:
```typescript
    visual: {
      type: "comparisonBar",
      headlineStat: { value: 0.745, decimals: 3, label: "SARIMA R², current leader" },
      primary: { label: "XGBoost", value: 0.593 },
      secondary: { label: "GAT-LSTM", value: -0.007 },
      primaryCaption: "Earlier benchmark (R²)",
    },
```

To the **"NexaHeat FX..."** project, add:
```typescript
    visual: {
      type: "flow",
      nodes: ["Market Data", "Multi-LLM Signal Engine", "Live Commentary"],
      captions: ["Twelve Data", "Claude · Groq · Gemini", "& Signals"],
    },
```

To the **"Sarcasm Detection..."** project, add:
```typescript
    visual: {
      type: "comparisonBar",
      primary: { label: "In-domain", value: 92 },
      secondary: { label: "Out-of-domain", value: 50 },
      primaryCaption: "MiniLM accuracy (%)",
      valueDecimals: 0,
    },
```

To the **"UK Road Safety..."** project, add:
```typescript
    visual: {
      type: "flow",
      nodes: ["STATS19 Road Records", "SNAP Facebook Networks", "Geo + Social Insights"],
    },
```

To the **"Manufacturing Analytics..."** project, add:
```typescript
    visual: {
      type: "radialStat",
      value: 98.5,
      suffix: "%",
      decimals: 1,
      label: "Predictive maintenance accuracy",
    },
```

- [ ] **Step 4: Remove all em-dash (—) characters from `lib/content.ts`**

Search the file for the `—` character (U+2014 em-dash) and replace each occurrence exactly as follows (these are the 8 known instances; if a `grep` for `—` finds any not listed here, apply the same principle — replace with a comma, period, colon, parenthetical, or "and" so the sentence still reads naturally, never delete the surrounding words):

1. In the `LinkCta` interface's JSDoc comment (`/** Set when the destination itself (profile/page) is still being polished — ... */`): reword to remove the em-dash while keeping the same meaning, e.g. end the clause with a period and start a new sentence, or use a comma.

2. Dissertation project `outcome` field: `"...so far — an evidence-based case in progress..."` → `"...so far, an evidence-based case in progress for choosing the simpler model that actually generalises."`

3. Sarcasm Detection project `what` field: `"Compared six approaches — Naive Bayes, Logistic Regression, LSTM, GRU, and a fine-tuned/frozen MiniLM Transformer — for detecting sarcasm across 28,503 headlines..."` → `"Compared six approaches (Naive Bayes, Logistic Regression, LSTM, GRU, and a fine-tuned/frozen MiniLM Transformer) for detecting sarcasm across 28,503 headlines, then stress-tested every model on 24 out-of-domain sentences."`

4. Sarcasm Detection project `outcome` field: `"...out-of-domain — identical to the weaker LSTM baseline, confirmed via McNemar's test (p<0.001)."` → `"...out-of-domain, identical to the weaker LSTM baseline and confirmed via McNemar's test (p<0.001)."`

5. Sarcasm Detection project `impact` field: `"...prove a model actually won — and the honesty to show where it breaks — the check a Data Science Manager looks for..."` → `"...prove a model actually won, and the honesty to show where it breaks: the check a Data Science Manager looks for before trusting a model claim in production."`

6. Writing post title `"Gradient Descent finally clicked for me — and here is what changed."` → `"Gradient Descent finally clicked for me - and here is what changed."` (the actual LinkedIn post title uses a plain hyphen, not an em-dash — this is a transcription correction to match the real source, not a rewrite).

7. Writing post teaser (Gradient Descent entry): `"...actually was — and more importantly, where it fit in the bigger picture of AI."` → `"...actually was, and more importantly, where it fit in the bigger picture of AI."`

8. Writing post title `"Sarcasm Detection Using 5 AI Models — Non-Technical Read"` → `"Sarcasm Detection Using 5 AI Models - Non-Technical Read"` (matches the real LinkedIn source title's plain-hyphen style).

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` — expect zero errors.
Run: `grep -c $'\xe2\x80\x94' lib/content.ts` (or search for the literal `—` character) — expect zero matches (grep exits 1 with no output when there are no matches, which is the expected/passing result here).

- [ ] **Step 6: Commit**

```bash
git add lib/content.ts
git commit -m "Add chart data model to projects, remove em-dashes from copy"
```

---

### Task 3: Shared useInView hook

**Files:**
- Create: `components/charts/use-in-view.ts`

**Interfaces:**
- Produces: `useInView<T extends HTMLElement>(threshold?: number): { ref: RefObject<T | null>; inView: boolean }` — consumed by Tasks 4, 5, 6 (all three chart components).

- [ ] **Step 1: Write the hook**

Create `components/charts/use-in-view.ts`:

```typescript
"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expect zero errors (this file has no consumers yet, just confirm it compiles standalone).

- [ ] **Step 3: Commit**

```bash
git add components/charts/use-in-view.ts
git commit -m "Add shared useInView hook for scroll-triggered chart animation"
```

---

### Task 4: ComparisonBarChart component

**Files:**
- Create: `components/charts/comparison-bar-chart.tsx`

**Interfaces:**
- Consumes: `useInView` from `./use-in-view` (Task 3), `AnimatedStat` from `@/components/animated-stat` (existing, Task 6 of the original plan).
- Produces: `ComparisonBarChart` component, consumed by Task 6 (`projects.tsx`) for the `"comparisonBar"` visual type.

- [ ] **Step 1: Write the component**

Create `components/charts/comparison-bar-chart.tsx`:

```tsx
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
              <XAxis type="number" hide domain={["dataMin", "dataMax"]} />
              <YAxis
                type="category"
                dataKey="name"
                width={90}
                tick={{ fontSize: 11, fill: "#5B4130" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => value.toFixed(valueDecimals)}
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
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expect zero errors. This component has no page consumer yet (Task 6 wires it in), so verification here is type-check only plus a quick isolated render check: temporarily render `<ComparisonBarChart primary={{label:"A",value:1}} secondary={{label:"B",value:0.5}} primaryCaption="Test" />` in `app/page.tsx`, confirm it renders a horizontal bar chart with a tooltip on hover when scrolled into view, then revert `app/page.tsx` back to its prior state (Task 6 will do the real wiring).

- [ ] **Step 3: Commit**

```bash
git add components/charts/comparison-bar-chart.tsx
git commit -m "Add ComparisonBarChart component"
```

---

### Task 5: FlowDiagram and RadialStat components

**Files:**
- Create: `components/charts/flow-diagram.tsx`, `components/charts/radial-stat.tsx`

**Interfaces:**
- Consumes: `useInView` from `./use-in-view` (Task 3), `AnimatedStat` from `@/components/animated-stat`, `motion` from `framer-motion`.
- Produces: `FlowDiagram` and `RadialStat` components, consumed by Task 6 for the `"flow"` and `"radialStat"` visual types respectively.

- [ ] **Step 1: Write FlowDiagram**

Create `components/charts/flow-diagram.tsx`:

```tsx
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
```

- [ ] **Step 2: Write RadialStat**

Create `components/charts/radial-stat.tsx`:

```tsx
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
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — expect zero errors. As with Task 4, temporarily render both components in `app/page.tsx` with sample props, confirm in a fresh dev server that FlowDiagram's 3 nodes fade in sequentially with connecting arrows when scrolled into view, and RadialStat's ring draws in with the percentage counting up. Revert `app/page.tsx` afterward (Task 6 does the real wiring).

- [ ] **Step 4: Commit**

```bash
git add components/charts/flow-diagram.tsx components/charts/radial-stat.tsx
git commit -m "Add FlowDiagram and RadialStat components"
```

---

### Task 6: Wire visuals into the Projects section

**Files:**
- Modify: `components/sections/projects.tsx`

**Interfaces:**
- Consumes: `projects`, `moreProjects` from `@/lib/content` (each project now has `visual?: ProjectVisual`, Task 2); `ComparisonBarChart` (Task 4), `FlowDiagram`, `RadialStat` (Task 5).

- [ ] **Step 1: Rewrite the section to a two-column card layout with the visual slot**

Replace the full contents of `components/sections/projects.tsx`:

```tsx
import { projects, moreProjects } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComparisonBarChart } from "@/components/charts/comparison-bar-chart";
import { FlowDiagram } from "@/components/charts/flow-diagram";
import { RadialStat } from "@/components/charts/radial-stat";
import type { ProjectVisual } from "@/lib/content";

function ProjectVisualPanel({ visual }: { visual: ProjectVisual }) {
  if (visual.type === "comparisonBar") {
    return (
      <ComparisonBarChart
        headlineStat={visual.headlineStat}
        primary={visual.primary}
        secondary={visual.secondary}
        primaryCaption={visual.primaryCaption}
        valueDecimals={visual.valueDecimals}
      />
    );
  }
  if (visual.type === "flow") {
    return <FlowDiagram nodes={visual.nodes} captions={visual.captions} />;
  }
  return (
    <RadialStat
      value={visual.value}
      suffix={visual.suffix}
      decimals={visual.decimals}
      label={visual.label}
    />
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="mb-10">
        <span className="font-label text-sm uppercase tracking-wider text-rust">{"// Projects"}</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-brown-deep md:text-4xl">
          Work that ends in a decision, not just a metric
        </h2>
        <p className="mt-2 text-brown">
          What I did, what actually happened, and who it&apos;s useful to and why.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <Card key={project.title} className="border-brown-deep/10 bg-cream">
            <CardContent className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[0.85fr_1.15fr] md:items-center">
              {project.visual && (
                <div className="flex items-center justify-center rounded-lg bg-paper p-5">
                  <ProjectVisualPanel visual={project.visual} />
                </div>
              )}
              <div>
                <Badge variant="outline" className="mb-3 border-rust/40 font-label text-rust">
                  {project.tag}
                </Badge>
                <h3 className="mb-1 font-display text-xl font-semibold text-brown-deep">
                  {project.title}
                </h3>
                <div className="mb-3 font-mono text-xs text-brown/70">{project.role}</div>
                <p className="mb-2 text-sm leading-relaxed text-brown">
                  <strong>What I did: </strong>
                  {project.what}
                </p>
                <p className="mb-3 text-sm leading-relaxed text-brown">
                  <strong>What happened: </strong>
                  {project.outcome}
                </p>
                <div className="rounded-lg bg-paper p-3 text-sm leading-relaxed text-brown">
                  <strong>Impact: </strong>
                  {project.impact}
                </div>
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block font-label text-sm font-medium text-rust hover:underline"
                  >
                    View repo ↗
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        <a
          href={moreProjects.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-xl border border-dashed border-brown-deep/25 p-6 text-center transition-colors hover:border-rust/50 hover:bg-cream"
        >
          <span className="font-label text-sm font-medium text-brown">{moreProjects.label} ↗</span>
        </a>
      </div>
    </section>
  );
}
```

Note this changes the grid from 2-column cards to full-width cards (each card is now internally two-column: visual | body), since a chart needs more horizontal room than the old compact 2-up card grid allowed. This is an intentional layout change to accommodate real charts.

- [ ] **Step 2: Verify**

Run `npm run build` — clean. Then start a **fresh** dev server (`npm run dev`, not a reused/long-running one — see Global Constraints) and visually confirm, scrolling through Projects:
- Dissertation card: headline stat "0.745" counts up, then below it a 2-bar chart (XGBoost longer/rust bar, GAT-LSTM near-zero/beige bar), tooltip on hover shows exact values.
- NexaHeat FX card: 3-node flow diagram fades in left-to-right with connecting arrows.
- Sarcasm Detection card: 2-bar chart, "In-domain" 92 (rust) vs "Out-of-domain" 50 (beige), tooltip on hover.
- Road Safety card: 3-node flow diagram.
- Manufacturing Analytics card: radial ring draws in to ~98.5%, with the count-up percentage below it.
- All 5 cards still show tag/title/role/what/outcome/impact/repo-link text correctly.
- At mobile width (~375px), each card's visual and body stack vertically (grid-cols-1), chart doesn't overflow horizontally.
- The 6th "more projects" dashed tile still renders after the 5 cards.

- [ ] **Step 3: Commit**

```bash
git add components/sections/projects.tsx
git commit -m "Wire animated visuals into Projects section, restore two-column card layout"
```

---

### Task 7: Final verification

**Files:** None (verification only).

**Interfaces:** None — this task validates the whole feature end-to-end.

- [ ] **Step 1: Full clean build + lint**

Run: `npm run build` — expect clean (no errors/warnings).
Run: `npm run lint` — expect zero errors/warnings.

- [ ] **Step 2: Production-server visual pass (not a stale dev server)**

Kill any existing dev/prod server on ports you'll use. Run: `npm run build && npm run start -- --port 4400`, wait for ready, then in the browser:
- Confirm `AnimatedStat` values across the page (Hero stats, Dissertation headline stat, Manufacturing radial stat) show POSITIVE values counting up correctly — this is the specific regression a stale dev server previously masked as a false negative.
- Re-confirm all 5 project visuals from Task 6, Step 2's checklist.
- Confirm zero console errors.
- Stop the server when done.

- [ ] **Step 3: Em-dash check**

Run: `grep -c $'\xe2\x80\x94' lib/content.ts components/**/*.tsx 2>/dev/null` (or equivalent) — expect no matches anywhere in `lib/` or `components/`.

- [ ] **Step 4: Commit** (only if Steps 1-3 required any fixes; otherwise this task produces no diff and can be skipped as a no-op)

If fixes were needed, commit them with a descriptive message. If everything was already clean, note that in your report — no empty commit.

---

## Self-Review Notes

- **Spec coverage:** Chart library install (Task 1), chart data model + em-dash cleanup (Task 2), all three reusable chart components (Tasks 3-5), wiring into Projects with restored two-column layout (Task 6), full production-build verification specifically targeting the stale-dev-server false-negative risk (Task 7). All 5 projects' visualizations from the spec are covered with real, sourced numbers only.
- **Placeholder scan:** No TBD/TODO; every step has complete code or exact commands with expected output; all 8 em-dash replacements are given verbatim.
- **Type consistency:** `ProjectVisual`'s three variants (`comparisonBar`, `flow`, `radialStat`) are defined once in Task 2 and consumed with matching field names by `ComparisonBarChart` (Task 4), `FlowDiagram`/`RadialStat` (Task 5), and the discriminating `ProjectVisualPanel` switch in `projects.tsx` (Task 6) — verified field names match exactly (`headlineStat`, `primary`, `secondary`, `primaryCaption`, `valueDecimals`, `nodes`, `captions`, `value`, `suffix`, `decimals`, `label`).
