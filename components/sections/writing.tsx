import { writing, LINKEDIN_URL } from "@/lib/content";

/**
 * The non-technical entrance to the work.
 *
 * This used to be a "Writing" section of four full cards, which read as a blog
 * roll and cost 856px. It is the same four LinkedIn posts, but the framing is
 * the point: somebody who does not read confusion matrices still has to decide
 * whether to interview me, and telling them plainly where to start is more
 * useful than hoping they scroll.
 *
 * Tinted band rather than the paper background, so it reads as a doorway out of
 * the page rather than another section of it.
 */
export function Writing() {
  return (
    <section id="writing" className="py-14">
      <div className="rounded-2xl border border-rust/20 bg-gradient-to-br from-cream to-rust/5 p-8 md:p-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <span className="font-label text-sm uppercase tracking-wider text-rust">
              {"// No jargon required"}
            </span>
            <h2 className="mt-2 font-display text-2xl font-semibold leading-snug text-brown-deep md:text-3xl">
              Not a technical reader? Start here instead.
            </h2>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-brown">
              Everything below this point has model names and metrics in it. These four posts
              are the same work told in plain English, no maths, on LinkedIn. One of them is
              about a model I caught cheating.
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-md bg-brown-deep px-5 py-2.5 font-label text-sm font-medium text-paper transition-colors hover:bg-brown"
            >
              Read my work on LinkedIn ↗
            </a>
          </div>
          <ol className="divide-y divide-brown-deep/10 border-t border-brown-deep/10">
            {writing.map((post) => (
              <li key={post.url}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-rust"
                >
                  <span className="text-[0.9rem] font-medium leading-snug text-brown-deep group-hover:text-rust">
                    {post.title}
                  </span>
                  <span className="shrink-0 font-mono text-[0.68rem] text-brown/60">
                    {post.impressions.toLocaleString()} reads
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
