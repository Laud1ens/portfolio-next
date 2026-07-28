# Portfolio Rebuild — Design Spec

Date: 2026-07-28
Owner: Laud Asante

## Goal

Rebuild the existing single-file HTML portfolio (`C:\Users\ewurama\Downloads\pt.html`) as a
Next.js app using 21st.dev / shadcn components, keeping the existing content and visual
identity, and enriching it with material pulled from GitHub, LinkedIn, and the CV
(`Laud_Asante_CV.docx`) that isn't currently on the page.

## Sources consulted

- `C:\Users\ewurama\Downloads\pt.html` — current live content (single static HTML file).
- `C:\Users\ewurama\Downloads\Laud_Asante_CV.docx` — CV, extracted via docx XML.
- GitHub API (`api.github.com/users/Laud1ens`, `.../repos`) — 4 public repos, no bio set.
- LinkedIn (`linkedin.com/in/laud-asante-938382103`), fetched via authenticated browser
  session (user is logged in as profile owner) — About text, full Experience history,
  Education, Skills (42), and recent posts/articles.

## Resolved discrepancies

- Area Sales Manager employer: CV says "Sweet Nutrition Limited", LinkedIn says "Bayswater
  Industry Limited" for the same role/dates. **Decision: use "Sweet Nutrition Limited"
  (per CV, user's explicit choice).**
- MSc start date: CV says Sept 2024 (dissertation expected Nov 2026), LinkedIn Education
  entry says Sep 2025 – Aug 2026. **Decision: use Sep 2025 – Aug 2026 (per LinkedIn, user's
  explicit choice).**
- Dissertation project stats: site shows XGBoost R²=0.593 vs GAT-LSTM R²=−0.007; CV shows a
  newer in-progress snapshot (SARIMA leading, R²=0.745, 3,219 US counties benchmarked).
  **Decision: use the CV's newer figures.**
- Sarcasm Detection project: site describes a 4-model comparison; CV/GitHub repo describe a
  richer 5-6 model comparison (incl. fine-tuned MiniLM, 28,503 headlines, out-of-domain
  stress test). **Decision: use the fuller CV/repo version.**

## Approach

Single-page Next.js site (chosen over a multi-page rebuild or a minimal re-skin) that keeps
the current one-scroll narrative and warm editorial visual identity, rebuilt with real
components, and expanded with two new sections (Experience, Writing) that surface content
the user already has (real work history, real LinkedIn writing) but which isn't on the page
today.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS, with the current site's design tokens (colors, fonts) ported in as the
  Tailwind theme, so pulled-in components inherit the site's identity rather than default
  shadcn styling.
- shadcn/ui as the component foundation; components sourced/adapted from 21st.dev on top of
  it.
- `next/font` for Bodoni Moda (display serif), Jost (labels/nav), Inter (body), JetBrains
  Mono (stats/tags) — same type system as the current page.

## Project structure

```
portfolio-next/
  app/
    page.tsx            — composes all sections
    layout.tsx
  components/
    sections/
      hero.tsx
      about.tsx
      experience.tsx     (new)
      projects.tsx
      writing.tsx        (new)
      skills.tsx
      contact.tsx
  lib/
    content.ts           — typed content data (projects, experience, writing, skills)
  public/
    headshot.png          — extracted from the old file's inline base64 image
```

No CMS or database — content lives as typed objects in `lib/content.ts`, consumed by
section components. Editing content later means editing that file, not markup.

## Content plan by section

- **Hero** — kept close to current copy (headline, lede, CTA row: Download CV, GitHub,
  LinkedIn, Hugging Face; stat row).
- **About** — replaced with the LinkedIn About text ("I tell stories with data...").
- **Experience** *(new)* — timeline from LinkedIn, most recent first: Generation Ghana
  (freelance mentoring, Aug 2025–present), Area Sales Manager (Sweet Nutrition Limited, Jun
  2022–Oct 2025), Branch Sales Manager (Classfam Pharmaceuticals, May 2021–May 2022),
  Territory Sales Supervisor → Territory Sales Manager (Sunda Invest, Mar 2018–Apr 2021),
  Business Development & Training Coordinator (The HuD Group, Mar 2017–Feb 2018).
- **Projects** — 5 cards:
  1. MSc Dissertation (US County-Level Forecasting) — updated with CV's newer figures.
  2. NexaHeat FX: Forex Intelligence Platform — unchanged.
  3. Sarcasm Detection — updated to the fuller CV/repo version (5-6 models, 28,503
     headlines, out-of-domain stress test, MiniLM 92%→50% OOD collapse, McNemar's p<0.001),
     linked to the real repo.
  4. UK Road Safety & Social Network Analysis — unchanged.
  5. *(new)* Manufacturing Analytics — Predictive Maintenance (AI4I2020) — the 98.5%-accuracy
     classifier already referenced in the About text but with no project card today; linked
     to the real GitHub repo.
- **Writing** *(new)* — 3-4 cards pulling from real LinkedIn posts: "Gradient Descent finally
  clicked for me," the Sarcasm Detection story, "My algorithm found the most dangerous road
  in West Yorkshire," and the scaling-bug debugging story (35%→84% accuracy). Each links out
  to the LinkedIn post.
- **Skills** — current grouping kept, with Tableau and IBM SPSS folded in (from LinkedIn's
  top skills, not currently listed anywhere).
- **Contact** — unchanged (email, UK phone, Ghana WhatsApp, location, footer links).

## Assets

- Headshot: extract from the old file's inline base64 `<img>` into `public/headshot.png`.
- CV PDF: not currently available (only a `.docx` exists in Downloads). Download-CV link
  will be left as a flagged placeholder until a PDF is supplied or the docx is converted.
- Project repo links: Sarcasm Detection and Predictive Maintenance cards link to their real
  GitHub repos under `github.com/Laud1ens`.

## Verification

- `npm run build` passes (type-check + lint clean).
- Dev server renders all sections correctly; checked in-browser at mobile/tablet/desktop
  widths.
- No test framework needed — this is a static content site, not application logic.

## Out of scope

- Deployment/hosting (Vercel, DNS, etc.) — left deploy-ready but not deployed.
- CV docx→PDF conversion — flagged, not performed unless requested.
