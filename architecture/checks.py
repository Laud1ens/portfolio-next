"""Invariants about the content that TypeScript cannot express.

`npx tsc --noEmit` proves the shape of the data. It cannot prove any of the
things that have actually gone wrong on this site, because every one of them
was a correctly typed string saying something untrue or out of date.

Each check below exists because of a specific incident, named in its docstring.
A check with no incident behind it is a check nobody will maintain, so do not
add one speculatively.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Iterator

# Laudbot's corpus is built from content.ts and sent to the model in full, with
# no retrieval step. That decision was taken against a measurement, so it has an
# expiry condition, and this is the number that detects it. See the header of
# lib/laudbot/corpus.ts.
CORPUS_WARN_CHARS = 120_000

# Written as a codepoint, not as the character. The repository-wide sweep for
# em dashes is a plain grep, and a literal one here would make this file its own
# permanent false positive, which is how a sweep stops being trusted.
EM_DASH = "\u2014"


@dataclass
class Finding:
    check: str
    severity: str  # "error" or "warning"
    where: str
    message: str


@dataclass
class Report:
    findings: list[Finding] = field(default_factory=list)

    def add(self, check: str, severity: str, where: str, message: str) -> None:
        self.findings.append(Finding(check, severity, where, message))

    @property
    def errors(self) -> list[Finding]:
        return [f for f in self.findings if f.severity == "error"]

    @property
    def warnings(self) -> list[Finding]:
        return [f for f in self.findings if f.severity == "warning"]

    @property
    def ok(self) -> bool:
        return not self.errors


def walk_strings(node: Any, path: str = "") -> Iterator[tuple[str, str]]:
    """Every string in the content tree, with a readable path to it."""
    if isinstance(node, str):
        yield path, node
    elif isinstance(node, dict):
        for k, v in node.items():
            yield from walk_strings(v, f"{path}.{k}" if path else k)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            yield from walk_strings(v, f"{path}[{i}]")


# --------------------------------------------------------------------------
# Checks
# --------------------------------------------------------------------------


def check_no_em_dash(content: dict[str, Any], report: Report) -> None:
    """Standing rule, and it has been broken more than once.

    An em dash is one of the clearest tells of unedited machine writing, and
    this text is read by people deciding whether to employ a human. It is also
    invisible in review: it looks like a hyphen at a glance.
    """
    for path, text in walk_strings(content):
        if EM_DASH in text:
            report.add(
                "no-em-dash",
                "error",
                path,
                f"contains an em dash: ...{_around(text, EM_DASH)}...",
            )


def check_learning_not_claimed(content: dict[str, Any], report: Report) -> None:
    """A tool listed as still being learned must not be claimed anywhere else.

    The gap list was reframed from "Not used yet" to "Still learning, and how",
    which is an honest reframe only for as long as nothing else on the page
    quietly promotes the same tool to experience. Laudbot reads this content as
    a flat list with no stage labels, so a contradiction here becomes a
    confident wrong answer to a recruiter.

    Docker is the deliberate exception: there is a real Dockerfile in the
    repository, so it appears in a work in progress entry on purpose. The
    exception is narrow and named rather than implied.
    """
    claimed_ok = {"Docker"}
    learning = {t["tool"] for t in content["stackLearning"]}

    chosen = {c["tool"] for c in content["stackChoices"]}
    for tool in sorted(learning & chosen):
        report.add(
            "learning-not-claimed",
            "error",
            "stackChoices",
            f"{tool!r} is listed as still being learned and also as a tool "
            "chosen over an alternative. One of the two is wrong.",
        )

    for project in content["projects"]:
        haystack = " ".join(
            str(project.get(k, "")) for k in ("what", "outcome", "impact", "role")
        )
        for tool in sorted(learning - claimed_ok):
            if re.search(rf"\b{re.escape(tool)}\b", haystack):
                report.add(
                    "learning-not-claimed",
                    "error",
                    f"projects[{project['title'][:40]}]",
                    f"names {tool!r}, which is listed as still being learned.",
                )


def check_wip_fields(content: dict[str, Any], report: Report) -> None:
    """Every in-flight item needs a finish line and a real status.

    `aiming` was added because "I am building X" is a hobby and "I am building X
    so that Y becomes measurable" is an engineering decision. An empty one puts
    the entry back to being a hobby.
    """
    for item in content["currentlyWorkingOn"]:
        where = f"currentlyWorkingOn[{item.get('title', '?')[:40]}]"
        for required in ("what", "whyItMatters", "aiming", "status"):
            if not str(item.get(required, "")).strip():
                report.add("wip-fields", "error", where, f"{required} is empty")


def check_stage_vocabulary(content: dict[str, Any], report: Report) -> None:
    """The work list and the learning list must use the same three stages.

    They are rendered with a shared STAGE_STYLES map, so a fourth value would
    render unstyled rather than failing, and "Next up" meaning one thing in one
    section and nothing in the other is how a label stops being read at all.
    """
    allowed = {"Building", "Scoping", "Next up"}
    for key in ("currentlyWorkingOn", "stackLearning"):
        for item in content[key]:
            stage = item.get("stage")
            if stage not in allowed:
                report.add(
                    "stage-vocabulary",
                    "error",
                    f"{key}[{item.get('title') or item.get('tool')}]",
                    f"stage {stage!r} is not one of {sorted(allowed)}",
                )


def check_plain_english(content: dict[str, Any], report: Report) -> None:
    """Any expandable case study needs its non-technical explanation.

    Laudbot's prompt tells it to prefer these over inventing an analogy. A
    project with a `detail` and no `plainEnglish` silently pushes the bot back
    to improvising, which is the behaviour the field exists to prevent.
    """
    for project in content["projects"]:
        detail = project.get("detail")
        if not isinstance(detail, dict):
            continue
        if not str(detail.get("plainEnglish", "")).strip():
            report.add(
                "plain-english",
                "error",
                f"projects[{project['title'][:40]}].detail",
                "has a case study but no plainEnglish explanation",
            )


def check_unresolved_future_claims(content: dict[str, Any], report: Report) -> None:
    """Catch a claim that has quietly become false with the passage of time.

    The dissertation read "submitting November 2026" in five places for weeks
    after it had been submitted and defended. Nothing could detect that: it was
    a valid string in a correctly typed field, and it had been true when
    written. Any sentence that promises a future event is a sentence with a
    date on which it becomes a lie, so they are surfaced for a human to confirm
    rather than trusted.
    """
    pattern = re.compile(
        r"\b(submitting|will submit|due to submit|expected in|awaiting submission)\b",
        re.IGNORECASE,
    )
    for path, text in walk_strings(content):
        m = pattern.search(text)
        if m:
            report.add(
                "future-claims",
                "warning",
                path,
                f"promises a future event ({m.group(0)!r}). Confirm it is still "
                "true: ..." + _around(text, m.group(0)) + "...",
            )


def check_corpus_budget(content: dict[str, Any], report: Report) -> None:
    """The no-vector-search decision has an expiry condition. Measure it.

    Laudbot has no retrieval step because the whole corpus fits in the prompt
    with two orders of magnitude to spare. That is a measurement, not a
    principle, and content.ts only ever grows. This is the tripwire that says
    when the decision needs revisiting, so it is a number rather than a memory.
    """
    total = sum(len(text) for _, text in walk_strings(content))
    if total > CORPUS_WARN_CHARS:
        report.add(
            "corpus-budget",
            "warning",
            "lib/content.ts",
            f"content is {total:,} characters, past the {CORPUS_WARN_CHARS:,} "
            "mark where sending the whole corpus in every prompt stops being "
            "obviously correct. Revisit the no-retrieval decision in "
            "lib/laudbot/corpus.ts.",
        )


def _around(text: str, needle: str, width: int = 34) -> str:
    i = text.find(needle)
    if i == -1:
        return text[:width]
    return text[max(0, i - width) : i + len(needle) + width].replace("\n", " ")


ALL_CHECKS = (
    check_no_em_dash,
    check_learning_not_claimed,
    check_wip_fields,
    check_stage_vocabulary,
    check_plain_english,
    check_unresolved_future_claims,
    check_corpus_budget,
)


def run_all(content: dict[str, Any]) -> Report:
    report = Report()
    for check in ALL_CHECKS:
        check(content, report)
    return report
