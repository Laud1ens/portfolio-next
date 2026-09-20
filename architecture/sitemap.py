"""The architecture, described as data so it can be printed and diffed.

A diagram in a README goes stale the first time somebody moves a file and does
not notice. This is the same map written as Python, with the paths in it
checked against the filesystem on every run, so a lie about where something
lives is a failed check rather than a confusing afternoon.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class Node:
    name: str
    path: str
    role: str
    notes: list[str] = field(default_factory=list)


@dataclass
class Layer:
    title: str
    summary: str
    nodes: list[Node]


LAYERS: list[Layer] = [
    Layer(
        title="Content",
        summary=(
            "One file is the source of truth for the whole site, and for what "
            "the chatbot knows. There is no CMS and no database."
        ),
        nodes=[
            Node(
                name="content.ts",
                path="lib/content.ts",
                role="Every word on the page, as typed data.",
                notes=[
                    "Editing this updates the page AND the chatbot. There is no "
                    "reindex step, because the corpus is generated from it at "
                    "request time rather than stored.",
                    "The `visual` field is a union of exactly three shapes and "
                    "is easy to get wrong. Run npx tsc --noEmit after editing.",
                ],
            )
        ],
    ),
    Layer(
        title="Page",
        summary=(
            "Server components all the way down, except three islands. The case "
            "studies stay in the server HTML even when collapsed, because they "
            "are the substance worth indexing."
        ),
        nodes=[
            Node(
                name="page.tsx",
                path="app/page.tsx",
                role="Section order. Nothing else.",
            ),
            Node(
                name="projects.tsx",
                path="components/sections/projects.tsx",
                role="Compact cards. Server rendered.",
            ),
            Node(
                name="project-expander.tsx",
                path="components/sections/project-expander.tsx",
                role="Client island. Owns open and close for one case study.",
                notes=[
                    "The panel is height-collapsed with a 0fr/1fr grid, never "
                    "unmounted, so the text stays in the server HTML.",
                    "Capped at 75vh. That cap is what makes close-on-leave safe: "
                    "it bounds how far the page can move when a panel collapses.",
                    "Closing while the card is above the viewport uses an "
                    "absolute scrollTo, not scrollBy. The browser's own scroll "
                    "anchoring already compensates, and a relative nudge stacks "
                    "on top of it. Measured once as a 272px collapse moving the "
                    "page 544px.",
                ],
            ),
            Node(
                name="currently-working-on.tsx",
                path="components/sections/currently-working-on.tsx",
                role="Work in flight. Owns the shared STAGE_STYLES map.",
                notes=[
                    "skills.tsx imports STAGE_STYLES from here. Two copies would "
                    "drift, and the labels stop meaning anything the moment "
                    "'Next up' looks different in one section."
                ],
            ),
            Node(
                name="opengraph-image.tsx",
                path="app/opengraph-image.tsx",
                role="Generates the 1200x630 link preview at build time.",
                notes=[
                    "Nothing imports it. Next.js picks it up by file name, so "
                    "do not delete it as unused.",
                    "twitter-image.tsx re-exports it so the two cannot drift.",
                ],
            ),
        ],
    ),
    Layer(
        title="Laudbot",
        summary=(
            "A chat endpoint with no vector search. The whole corpus goes into "
            "every prompt, because it fits with room to spare and a relevance "
            "floor could only ever lose a correct answer."
        ),
        nodes=[
            Node(
                name="chat/route.ts",
                path="app/api/laudbot/chat/route.ts",
                role="The only path a visitor question travels.",
                notes=[
                    "Order matters: parse, validate, rate limit, classify as "
                    "sensitive, and only then call the model.",
                    "The sensitive check runs BEFORE any model call. That is why "
                    "it cannot be jailbroken: there is no model in the loop to "
                    "argue with.",
                ],
            ),
            Node(
                name="sensitive.ts",
                path="lib/laudbot/sensitive.ts",
                role="Regex classifier over seven categories.",
                notes=[
                    "Regex and not a model, deliberately. A model can be talked "
                    "out of its own classification, and this is the one rule on "
                    "the site that must not be negotiable.",
                    "It over-triggers on purpose. A wrongly routed question costs "
                    "an email; a wrongly answered one costs a salary figure.",
                ],
            ),
            Node(
                name="corpus.ts",
                path="lib/laudbot/corpus.ts",
                role="Builds one document from content.ts.",
                notes=[
                    "Uses blunter wording than the page for the same data. The "
                    "page shows a stage label beside each tool; a model reading "
                    "a flat list does not get that cue.",
                ],
            ),
            Node(
                name="prompt.ts",
                path="lib/laudbot/prompt.ts",
                role="System prompt. Fences the corpus as reference, not instructions.",
            ),
            Node(
                name="notify.ts",
                path="lib/laudbot/notify.ts",
                role="Emails a flagged question, and reports honestly when it cannot.",
                notes=[
                    "Logs first, then attempts delivery, then returns whether it "
                    "actually worked. With no mail provider configured the UI "
                    "shows a compose-link fallback rather than claiming success.",
                ],
            ),
            Node(
                name="rate-limit.ts",
                path="lib/laudbot/rate-limit.ts",
                role="Per-IP sliding window, in process memory.",
                notes=[
                    "Known limitation, written down rather than hidden: it resets "
                    "on deploy and does not coordinate across instances. The "
                    "portal solved the same problem with a Postgres table; this "
                    "site has no database and one instance.",
                ],
            ),
        ],
    ),
    Layer(
        title="Runtime",
        summary="Two ways to run it, and only one of them is live.",
        nodes=[
            Node(
                name="Railway",
                path="package.json",
                role="Live. Builder runs npm start, which runs next start.",
                notes=[
                    "railway up uploads the working directory. git push does NOT "
                    "deploy this service, so deployed and pushed are independent.",
                ],
            ),
            Node(
                name="Dockerfile",
                path="Dockerfile",
                role="Not live. A runtime defined by hand rather than inferred.",
                notes=[
                    "Needs DOCKER_BUILD=1, which switches next.config.ts to "
                    "standalone output. next start refuses to run against a "
                    "standalone build, so turning it on unconditionally would "
                    "break the Railway deploy above.",
                    "Never built on this machine: 7.7GB RAM against Docker "
                    "Desktop's 8GB minimum. The route is Docker Engine in WSL2.",
                ],
            ),
        ],
    ),
]


def verify_paths(repo_root: Path) -> list[str]:
    """Every path named above has to exist. This is what keeps the map honest."""
    missing = []
    for layer in LAYERS:
        for node in layer.nodes:
            if not (repo_root / node.path).exists():
                missing.append(f"{layer.title}/{node.name}: {node.path}")
    return missing
