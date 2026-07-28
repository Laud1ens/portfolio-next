import { writing } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";

export function Writing() {
  return (
    <section id="writing" className="py-20">
      <div className="mb-10">
        <span className="font-label text-sm uppercase tracking-wider text-rust">{"// Writing"}</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-brown-deep md:text-4xl">
          Translating the technical for people who don&apos;t need the maths
        </h2>
        <p className="mt-2 text-brown">
          Notes from LinkedIn on models, debugging, and the decisions behind them.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {writing.map((post) => (
          <a key={post.url} href={post.url} target="_blank" rel="noopener noreferrer">
            <Card className="h-full border-brown-deep/10 bg-cream transition-shadow hover:shadow-[0_20px_40px_-20px_rgba(58,42,29,0.25)]">
              <CardContent className="p-6">
                <h3 className="mb-2 font-display text-lg font-semibold text-brown-deep">
                  {post.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-brown">{post.teaser}</p>
                <div className="font-mono text-xs text-brown/80">
                  {post.impressions.toLocaleString()} impressions on LinkedIn
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
