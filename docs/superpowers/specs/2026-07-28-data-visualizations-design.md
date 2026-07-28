# Data Visualizations + Copy Cleanup — Design Spec

Date: 2026-07-28
Owner: Laud Asante

## Goal

The rebuilt portfolio (Tasks 1-13, branch `implement-portfolio-rebuild`) dropped the
original site's inline SVG chart visuals from project cards in favor of plain
text/badge cards, making the page feel flat. Restore and upgrade these as real,
animated data visualizations using an actual charting library, grounded only in
numbers already established in `lib/content.ts` — no fabricated data. Also clean up
em-dash usage across the site's copy.

## Context: why the palette constrains this

Ran `scripts/validate_palette.js` (dataviz skill) against combinations of the site's
existing color tokens. Result: only `rust` (#A9673F) has enough chroma and correct
lightness to serve as a categorical/sequential chart mark color. `sage`, `brown`, and
`brown-deep` all fail the chroma-floor or lightness-band checks as chart marks (they're
tuned for text/ink use, not data marks), and `sage` vs `rust` fails the CVD/normal-vision
separation check when paired.

**Decision:** every chart uses a single accent hue (`rust`) for the emphasized/primary
value, and `taupe`/`beige` as de-emphasized neutral fill for comparison/"other" values —
an emphasis pattern, not a multi-hue categorical legend. This matches what the original
site's own SVGs already did (bright bar for the winning model, muted taupe bar for the
loser) — this is a revival of that pattern with real animation, not a new design language.

## Stack addition

- `recharts` — for the two real numeric comparison charts (bar-style).
- `framer-motion` — for the two process-flow diagrams (path-draw-in animation) and for
  driving chart entrance animation in sync with the existing scroll-reveal pattern.

## Per-project visualization plan (real numbers only)

1. **Dissertation** (`components/sections/projects.tsx`'s dissertation card):
   - A small animated bar chart: XGBoost R²=0.593 vs GAT-LSTM R²=−0.007 — this is the
     original site's real historical benchmark pairing, kept and animated, explicitly
     labeled "Earlier benchmark" so it isn't confused with the current headline number.
   - A separate animated big-number stat: SARIMA R²=0.745 (the CV's current figure,
     already used as a hero stat) — labeled "Current leader".
   - No 3-way single chart mixing snapshots — that would misrepresent the data as one
     consistent measurement when it isn't.

2. **NexaHeat FX**: keep as a flow diagram (Market Data → Multi-LLM Signal Engine →
   Live Commentary), rebuilt with Framer Motion path-draw-in on scroll, replacing the
   dropped inline SVG.

3. **Sarcasm Detection**: an animated 2-bar comparison — MiniLM in-domain accuracy 92%
   (0.974 AUC-ROC) vs out-of-domain accuracy 50% (chance level) — direct value labels,
   rust for in-domain, muted taupe for the collapsed out-of-domain bar. This is a real,
   complete, single-source data pair from the CV — the strongest, most honest "collapse"
   story available.

4. **Road Safety**: flow diagram (STATS19 Road Accident Records + SNAP Facebook
   Ego-Networks → Geographic + Social Pattern Insights), same Framer Motion treatment
   as NexaHeat FX.

5. **Manufacturing Analytics (Predictive Maintenance)**: a single animated radial/
   count-up stat for 98.5% accuracy. No fabricated baseline/comparison — the CV gives
   only this one figure, so a comparison chart would require an invented second value.

## Animation & interaction

- Charts and flow diagrams animate in when scrolled into view — reuse the existing
  `ScrollReveal`/IntersectionObserver pattern already in the codebase for triggering,
  and use Recharts' built-in `isAnimationActive`/duration props and Framer Motion's
  `whileInView` for the actual draw-in/count-up motion.
- Recharts bar charts get a hover tooltip (Recharts' built-in `<Tooltip />`, restyled
  to match the site's cream/brown-deep palette) — per the dataviz skill's interaction
  requirement, a chart is interactive by default.
- All values are direct-labeled on the chart (not hover-only), since each chart only
  has 1-2 data points — no legend needed for a single accent hue.

## Copy cleanup

`lib/content.ts` currently has 8 em-dash (—) instances across project/writing copy.
Rewrite each using standard punctuation (period, comma, colon, or "and") so the copy
reads more naturally. Two instances are literal LinkedIn post titles transcribed with
an em-dash where the source actually used a plain hyphen — correct those to match the
source exactly (a transcription fix, not a rewrite).

## Verification

- `npm run build` and `npm run lint` clean (established project convention).
- Visual verification via a **production build** (`npm run build && npm run start`),
  not a long-running dev server — a stale/hot-reloaded dev server was found during this
  work to produce corrupted animated-stat values (negative numbers) that don't occur in
  a clean build; this was a tooling artifact, not a real bug, but it means future visual
  checks in this project should prefer a fresh production server or a freshly-started
  dev server, not a dev server that's been running across many file changes.
- Confirm charts render correctly at mobile width (charts must not overflow/clip on
  narrow viewports — Recharts' `ResponsiveContainer` handles this).
- Confirm zero em-dash characters remain in `lib/content.ts` (`grep` check).

## Out of scope

- Railway deployment — separate, explicitly-confirmed follow-up; requires the user's
  own Railway account access.
- Any new brand colors beyond the existing token set — the palette constraint above is
  deliberate, not a placeholder for "add real chart colors later."
