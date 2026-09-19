import {
  about,
  contact,
  currentlyWorkingOn,
  experience,
  hero,
  projects,
  skillGroups,
  stackChoices,
  stackGaps,
  writing,
} from "@/lib/content";

/**
 * Everything Laudbot is allowed to know, as one document.
 *
 * WHY THERE IS NO VECTOR SEARCH HERE
 *
 * The obvious build is the one in the staffing portal: chunk, embed, store,
 * retrieve by cosine similarity against a relevance floor. That pipeline
 * exists, it works, and it was the starting point for this.
 *
 * It was the wrong tool at this size. Retrieval exists to solve one problem:
 * a corpus too large to put in front of the model. Measured, this corpus is
 * 39,481 characters, and the whole system prompt that carries it comes to
 * 43,254 characters, roughly 10,800 tokens, against a million-token context
 * window. There is nothing to retrieve *from*, because everything fits with
 * two orders of magnitude to spare.
 *
 * Choosing retrieval anyway would have bought a second network round trip per
 * question, an embedding model to keep in sync, a relevance floor that cannot
 * be tuned without a labelled question set that does not exist yet, and a new
 * and genuinely nasty failure mode: the right answer sitting in the corpus and
 * never reaching the model because it scored 0.54 against a floor of 0.55.
 * Passing the whole document makes that failure impossible by construction.
 *
 * The threshold to revisit this is context, not taste. If the corpus passes
 * roughly 100,000 tokens, or if per-question cost starts to matter more than
 * per-question accuracy, the portal's pipeline is sitting there ready to port.
 * Until then this is a smaller, faster and more accurate system, and saying so
 * is more useful than shipping a vector database to look serious.
 */

function projectBlock(p: (typeof projects)[number]): string {
  const lines = [
    `### ${p.title}`,
    `Category: ${p.tag}`,
    `Role and dates: ${p.role}`,
    `What he did: ${p.what}`,
    `What happened: ${p.outcome}`,
    `Why it matters to an employer: ${p.impact}`,
  ];
  if (p.repoUrl) lines.push(`Repository: ${p.repoUrl}`);

  const d = p.detail;
  if (d) {
    lines.push(
      `Headline: ${d.headline}`,
      `Introduction: ${d.intro}`,
      `Dataset: ${d.dataset.name} (source: ${d.dataset.source}). ${d.dataset.body}`,
      `Key numbers: ${d.dataset.facts.map((f) => `${f.label} = ${f.value}`).join("; ")}`,
    );
    for (const s of d.sections) {
      lines.push(
        `Finding, ${s.heading}: ${s.body}${s.stat ? ` (Headline figure: ${s.stat.value}, ${s.stat.label})` : ""}`,
      );
    }
    // The single most important line per project for this bot's job. When a
    // visitor says "explain it like I'm not technical", this is the answer
    // Laud already wrote, in his own words, rather than one the model invents.
    lines.push(`PLAIN ENGLISH EXPLANATION: ${d.plainEnglish}`);
  }
  return lines.join("\n");
}

export function buildCorpus(): string {
  const parts: string[] = [];

  parts.push(
    [
      "## WHO HE IS",
      hero.lede,
      `Headline stats on the site: ${hero.stats.map((s) => `${s.value}${s.suffix ?? ""} ${s.label}`).join("; ")}`,
      ...about.paragraphs,
      `How he works: ${about.pivotCard.lines.join(" ")}`,
    ].join("\n"),
  );

  parts.push(
    [
      "## EMPLOYMENT HISTORY",
      ...experience.map(
        (e) => `${e.role} at ${e.company} (${e.period}, ${e.location}). ${e.description}`,
      ),
    ].join("\n"),
  );

  parts.push(["## PROJECTS", ...projects.map(projectBlock)].join("\n\n"));

  parts.push(
    [
      "## WHAT HE IS WORKING ON NOW, AND WHAT HE HAS NOT STARTED",
      ...currentlyWorkingOn.map((w) =>
        [
          `### ${w.title} [${w.stage}]`,
          `What: ${w.what}`,
          `Why it matters: ${w.whyItMatters}`,
          `Current status: ${w.status}`,
          w.tools ? `Tools: ${w.tools.join(", ")}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      ),
    ].join("\n\n"),
  );

  parts.push(
    [
      "## TOOLING, AND THE REASONING BEHIND EACH CHOICE",
      ...skillGroups.map((g) => `${g.title}: ${g.skills.join(", ")}`),
      "",
      "Tools chosen over a named alternative:",
      ...stackChoices.map(
        (c) => `${c.tool} over ${c.insteadOf}, used on ${c.usedOn}. Reason: ${c.because}`,
      ),
      "",
      "Tools he has NOT used. Never claim he has used these:",
      ...stackGaps.map((g) => `${g.tool}: ${g.reason}`),
    ].join("\n"),
  );

  parts.push(
    [
      "## THINGS HE HAS WRITTEN",
      ...writing.map((w) => `"${w.title}" (${w.impressions} impressions). ${w.teaser} Link: ${w.url}`),
    ].join("\n"),
  );

  parts.push(
    [
      "## HOW TO REACH HIM",
      contact.blurb,
      ...contact.items.map((i) => `${i.label}: ${i.value}`),
      "He does not publish a generic CV. Requesting one by email gets a version written against the specific role.",
    ].join("\n"),
  );

  return parts.join("\n\n---\n\n");
}

/** Built once per server process. The inputs are static module data, so
 *  rebuilding it per request would burn CPU to produce a byte-identical
 *  string. */
let cached: string | undefined;

export function getCorpus(): string {
  if (cached === undefined) cached = buildCorpus();
  return cached;
}
