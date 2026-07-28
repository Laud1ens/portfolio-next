import { skillGroups } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="mb-10">
        <span className="font-label text-sm uppercase tracking-wider text-rust">{"// Toolkit"}</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-brown-deep md:text-4xl">
          Skills &amp; tools
        </h2>
      </div>
      <div className="space-y-8">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h4 className="mb-3 font-label text-sm font-semibold uppercase tracking-wide text-brown-deep">
              {group.title}
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="border border-brown-deep/10 bg-cream font-label text-brown"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
