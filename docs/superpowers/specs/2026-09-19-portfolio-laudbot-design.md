# Portfolio v2: shorter page, Laudbot, and the work-in-progress story

Date: 2026-09-19
Status: approved for execution by Laud ("create a plan and execute it step by step")

## Why this exists

Three complaints, one root cause. The page is too long, the projects are hard to
skim, and there is nowhere to ask a follow-up question. All three come from the
same decision: every project's full case study renders inline and always open.
That is 1,400 to 2,900 pixels per project, six times over, before a reader has
decided they care about any of them.

The fix is not to delete the detail. The detail is the best thing on the site.
The fix is to stop making every reader scroll past all of it, and to give them
two faster routes into it instead: a drawer they open on the one project they
care about, and a bot they can just ask.

## What is already here

Next.js 16, React 19, Tailwind 4, framer-motion, shadcn-style primitives.
Content is hardcoded in `lib/content.ts` (654 lines). Deployed to Railway,
project `0dcf816e-613d-43f7-8de2-dc104414c76e`, service `laud-asante-web`.

Page order today: Hero, About, Experience, Evolution, Projects, Writing, Skills,
Contact.

Two existing facts that constrain this work:

1. **Collapse-on-exit has already been tried and measured as a failure.**
   `components/sections/project-detail.tsx:38-45` records it: opening and
   closing inline panels "passed 6/6 scrolling down and only 3/6 scrolling up",
   because travelling upward collapses the card below and throws the viewport
   past the target. Re-enabling it as-is would reintroduce a known bug.

2. **`git push` does not deploy this service.** Railway's GitHub integration
   stopped firing. Deployment is `railway up`, which uploads the working
   directory, so pushed and deployed are independent states.

## Decisions

### Detail moves out of document flow

A drawer, not an inline panel. This is what makes close-on-leave safe: nothing
in the normal flow changes height, so there is no layout to rip out from under
the reader, in either scroll direction. It also solves the length complaint
properly, because the long content is no longer in the page at all.

The markup stays mounted and is hidden with CSS rather than unmounted, so the
case studies remain in the server HTML and stay indexable. That was the right
call in the current code and it stays the right call.

Each project card shrinks to: visual, tag, title, role, one-line outcome, impact
chip, and two actions ("Read the case study", "View repo"). Target under 400px.

### Laudbot is a port, not an invention

The agency portal at `C:\Users\ewurama\Downloads\agency-portal` already contains
a working, tested Gemini RAG pipeline in `lib/knowledge/`: chunk, embed,
retrieve, citations, plus `lib/gemini.ts`. Those modules are pure functions with
tests. They get copied, not rewritten.

One thing changes. The portal stores chunks and vectors in Postgres. This site
has no database and should not grow one for six projects' worth of text. So:

- A build-time script embeds the corpus once and writes `lib/laudbot/corpus.json`,
  which is committed.
- At request time only the question is embedded (one call), cosine similarity
  runs in memory against the corpus, and the shortlist goes to the chat model.
- Two Gemini calls per question, no database, no cold-start index build.

Model: `gemini-3.6-flash`, confirmed working against Laud's key on 5 Sep 2026,
overridable with `GEMINI_MODEL`. Embeddings: `gemini-embedding-001` at 768
dimensions, matching the portal so the ported code needs no changes.

### Laudbot must refuse to invent

This bot speaks in Laud's voice about his credentials to people who may be
hiring him. The failure that matters is not an outage, it is a confident wrong
answer about a qualification, a salary, or a result. So:

- Answers are grounded in retrieved chunks only. Retrieval returning nothing is
  a supported outcome, and the bot says it does not know and offers the email
  route.
- A relevance floor makes "nothing" reachable, same as the portal's.
- The system prompt forbids inferring numbers, dates, visa status, grades or
  availability that are not in the retrieved text.

### Sensitive questions route to email, they do not get answered

Classified sensitive: salary and rate expectations, notice period and start
date, visa and sponsorship, references, offer negotiation, and any criticism,
complaint or improvement suggestion.

On a hit, the bot does not attempt an answer. It says a reply will come from
Laud directly by email, offers a short form for the visitor's email and context,
and sends Laud a notification. If the mail provider is not configured the form
falls back to the existing Gmail compose link rather than accepting a submission
and dropping it. Silently swallowing a recruiter's question is the worst
available outcome, so there is no path where the visitor thinks it sent and it
did not.

## Phases

### Phase 1: page restructure
Compact project cards. Detail moves to a drawer with open-on-demand and
close-on-leave. Page target: under 6,000px at desktop width, from roughly
20,000 today.

### Phase 2: Currently Working On
New section and content type. Each item carries what it is, why it matters for
an AI engineer role, current status, and target date. Content comes from real
in-flight work only: the MSc dissertation, the NexaHeat prediction layer, the
Staff Finders portal and its RAG pipeline. Anything Laud has not started is
labelled as planned, not as done.

### Phase 3: Stack and Why
For each tool: which project used it, and why it was picked over the obvious
alternative. Two buckets, both visible: "Used" and "Not reached for yet, and
why". The second bucket is the honest home for Kubernetes and anything else that
has not actually run. **Blocked on Laud confirming which tools belong in which
bucket. Nothing goes in "Used" without his confirmation.**

### Phase 4: Laudbot
Corpus build script, ported retrieval, API route with guards, chat UI, sensitive
routing.

### Phase 5: Evolution video
Regenerate the crawl, walk, augmented, accelerating sequence with a free
generation tool. Attempt a Hugging Face text-to-video Space first, since the
session is authenticated there. Fall back to handing Laud a prompt pack for
Google AI Studio or Kling. The existing `evolution.webm` stays in place until a
replacement is verified to be better, not merely newer.

### Phase 6: deploy and verify
`railway up`, then curl the live URL and grep for a string changed in this work.
Deploy status alone is not evidence.

## Things Laud did not ask for that are going in anyway

Each of these is cheap now and expensive later.

- **Rate limiting per IP.** A public endpoint that spends his Gemini quota is an
  abuse and billing problem on day one. Free tier is roughly 1,000 requests a
  day, and two calls per question means one bored visitor can exhaust it.
- **Prompt injection resistance.** People will try to make the bot say things,
  and it is wearing his name. Retrieved content and user input are fenced, and
  the system prompt does not take instructions from either.
- **Question logging.** What recruiters actually ask Laudbot is the most useful
  output this whole feature produces. Logged with no personal data unless the
  visitor volunteers it.
- **Mobile first for the chat and drawer.** Most recruiters open a portfolio
  link on a phone. A drawer and a chat widget are exactly the two components
  that break there.
- **Keyboard and screen reader support, and reduced motion.** Focus trap in the
  drawer, escape to close, live region for streamed replies.
- **Open Graph image and metadata.** The link gets pasted into LinkedIn and
  email. Right now it previews as nothing.
- **Suggested question chips and occasional proactive prompts.** This is the
  "interactable environment" Laud asked for, made concrete.

## Open questions, blocking their phases only

1. **`GEMINI_API_KEY` for this Railway service.** Laud has to set it himself;
   reading and writing Railway variables is blocked by the safety classifier
   here. Phase 4 builds and ships without it, degrading to a visible "chat is
   warming up" state rather than a broken widget.
2. **Which tools go in "Used".** Docker, Kubernetes, MLflow, Airflow, dbt,
   FastAPI, Terraform. His current skills list names none of them, and his
   portfolio must not claim them on my guess.
3. **Mail provider for sensitive routing.** Resend free tier is the
   recommendation. Needs an API key.
4. **Video tool access.** If the Hugging Face route fails, generation needs to
   happen in his browser session.

## What done looks like

- Desktop page height under 6,000px with all drawers closed.
- Every case study still present in the server HTML.
- Laudbot answers a question about any of the six projects in plain English,
  with the project named as its source.
- Laudbot asked "what salary do you want" does not answer, and Laud receives an
  email.
- Laudbot asked something outside the corpus says it does not know.
- The live URL serves all of the above, confirmed by curl and not by deploy
  status.
