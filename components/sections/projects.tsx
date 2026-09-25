import { projects, moreProjects } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComparisonBarChart } from "@/components/charts/comparison-bar-chart";
import { FlowDiagram } from "@/components/charts/flow-diagram";
import { RadialStat } from "@/components/charts/radial-stat";
import { ProjectExpander } from "@/components/sections/project-expander";
import type { Project, ProjectVisual } from "@/lib/content";

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

/**
 * Every project states where its code is, including the ones where the answer
 * is "not public".
 *
 * A card with no link at all reads as an omission, and a reader cannot tell the
 * difference between code that does not exist and code that is deliberately
 * closed. A dead or invented GitHub URL would be worse than both, so an absent
 * `repoUrl` renders the reason instead of a link.
 */
function RepoLink({ project }: { project: Project }) {
  if (project.repoUrl) {
    return (
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2.5 inline-flex items-center gap-1.5 font-label text-[0.8rem] font-medium text-rust hover:underline"
      >
        <GitHubMark />
        View code
      </a>
    );
  }
  return (
    <span className="mt-2.5 inline-flex items-center gap-1.5 font-label text-[0.8rem] text-brown/55">
      <GitHubMark />
      {project.repoNote ?? "Code not public"}
    </span>
  );
}

function GitHubMark() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className="h-[0.95em] w-[0.95em] fill-current">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

/**
 * The card is deliberately a summary now, not the work itself.
 *
 * `what` and `outcome` are two or three sentences each and used to render in
 * full on every card, which is most of why the page ran to twenty thousand
 * pixels. They are clamped here and shown in full inside the case study, so a
 * reader skimming six projects sees six headlines rather than six essays.
 * Clamping is CSS only, so the full text is still in the HTML for search and
 * for Laudbot's corpus.
 */
export function Projects() {
  return (
    <section id="projects" className="py-14">
      <div className="mb-7">
        <span className="font-label text-sm uppercase tracking-wider text-rust">{"// Projects"}</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-brown-deep md:text-4xl">
          Work that ends in a decision, not just a metric
        </h2>
        <p className="mt-2 max-w-2xl text-[0.92rem] text-brown">
          The headline on each card. Open any one to expand the data, the findings and the
          plain-English version, or ask Laudbot about it.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="border-brown-deep/10 bg-cream transition-shadow hover:shadow-[0_20px_40px_-20px_rgba(58,42,29,0.25)]"
          >
            <CardContent className="p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-[168px_1fr] md:items-center">
                {project.visual && (
                  <div className="flex h-full max-h-[108px] items-center justify-center overflow-hidden rounded-lg bg-paper p-2">
                    <ProjectVisualPanel visual={project.visual} />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <Badge
                      variant="outline"
                      className="border-rust/40 font-label text-[0.64rem] text-rust"
                    >
                      {project.tag}
                    </Badge>
                    <span className="font-mono text-[0.64rem] text-brown/60">{project.role}</span>
                  </div>
                  <h3 className="mb-1 font-display text-[1.05rem] font-semibold leading-snug text-brown-deep">
                    {project.title}
                  </h3>
                  <p className="line-clamp-2 text-[0.82rem] leading-relaxed text-brown">
                    {project.outcome}
                  </p>
                  <RepoLink project={project} />
                </div>
              </div>
              {project.detail && (
                <ProjectExpander detail={project.detail} title={project.title} />
              )}
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
