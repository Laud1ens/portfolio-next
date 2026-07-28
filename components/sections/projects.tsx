import { projects, moreProjects } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="mb-10">
        <span className="font-label text-sm uppercase tracking-wider text-rust">// Projects</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-brown-deep md:text-4xl">
          Work that ends in a decision, not just a metric
        </h2>
        <p className="mt-2 text-brown">
          What I did, what actually happened, and who it&apos;s useful to and why.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.title} className="border-brown-deep/10 bg-cream">
            <CardContent className="p-6">
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
            </CardContent>
          </Card>
        ))}
        <a
          href={moreProjects.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-xl border border-dashed border-brown-deep/25 p-6 text-center transition-colors hover:border-rust/50 hover:bg-cream"
        >
          <span className="font-label text-sm font-medium text-brown">
            {moreProjects.label} ↗
          </span>
        </a>
      </div>
    </section>
  );
}
