import { projects, moreProjects } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComparisonBarChart } from "@/components/charts/comparison-bar-chart";
import { FlowDiagram } from "@/components/charts/flow-diagram";
import { RadialStat } from "@/components/charts/radial-stat";
import { ProjectExpander } from "@/components/sections/project-expander";
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
    <section id="projects" className="py-20">
      <div className="mb-10">
        <span className="font-label text-sm uppercase tracking-wider text-rust">{"// Projects"}</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-brown-deep md:text-4xl">
          Work that ends in a decision, not just a metric
        </h2>
        <p className="mt-2 text-brown">
          The headline on each card. Open any one for the data, the findings and the
          plain-English version, or ask Laudbot about it.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="border-brown-deep/10 bg-cream transition-shadow hover:shadow-[0_20px_40px_-20px_rgba(58,42,29,0.25)]"
          >
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-center">
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
                  <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-brown">
                    <strong>What happened: </strong>
                    {project.outcome}
                  </p>
                  <div className="line-clamp-2 rounded-lg bg-paper p-3 text-sm leading-relaxed text-brown">
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
