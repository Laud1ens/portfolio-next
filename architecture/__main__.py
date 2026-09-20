"""Print the architecture map and check the content against it.

    python -m architecture            the map, then the checks
    python -m architecture --checks   checks only, for a pre-commit hook
    python -m architecture --map      map only

Exit code is 1 if any check reports an error, so this is usable as a gate.
Warnings do not fail the run: they are things a human has to look at, not
things that are definitely wrong, and a gate that cries wolf gets bypassed.
"""

from __future__ import annotations

import sys
from pathlib import Path

# Windows consoles default to cp1252, and this content contains an envelope
# glyph, a superscript two and en dashes. Without this the tool dies on its own
# output, which is a poor first impression for something whose job is checking.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

from architecture import checks, sitemap  # noqa: E402
from architecture.tsdata import ContentSyntaxError, load_content  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parent.parent


def rule(title: str) -> None:
    print(f"\n{title}\n{'=' * len(title)}")


def print_map() -> int:
    rule("Architecture")
    for layer in sitemap.LAYERS:
        print(f"\n{layer.title}")
        print(f"  {layer.summary}")
        print()
        for node in layer.nodes:
            print(f"  {node.name}  ({node.path})")
            print(f"      {node.role}")
            for note in node.notes:
                wrapped = _wrap(note, 68)
                print(f"      - {wrapped[0]}")
                for line in wrapped[1:]:
                    print(f"        {line}")
            print()

    missing = sitemap.verify_paths(REPO_ROOT)
    if missing:
        print("  PATHS IN THIS MAP THAT NO LONGER EXIST:")
        for m in missing:
            print(f"    {m}")
        return 1
    print("  All paths in this map exist.")
    return 0


def print_checks() -> int:
    rule("Content checks")
    try:
        content = load_content(REPO_ROOT)
    except (ContentSyntaxError, FileNotFoundError) as exc:
        print(f"\nCould not read content.ts.\n\n  {exc}\n")
        return 1

    report = checks.run_all(content)

    if not report.findings:
        print(f"\n  {len(checks.ALL_CHECKS)} checks, nothing to report.")
        return 0

    for severity in ("error", "warning"):
        group = [f for f in report.findings if f.severity == severity]
        if not group:
            continue
        print(f"\n  {severity.upper()}S ({len(group)})")
        for f in group:
            print(f"\n    [{f.check}] {f.where}")
            for line in _wrap(f.message, 66):
                print(f"      {line}")

    print(
        f"\n  {len(report.errors)} error(s), {len(report.warnings)} warning(s) "
        f"across {len(checks.ALL_CHECKS)} checks."
    )
    return 1 if report.errors else 0


def _wrap(text: str, width: int) -> list[str]:
    words, lines, current = text.split(), [], ""
    for word in words:
        if len(current) + len(word) + 1 > width and current:
            lines.append(current)
            current = word
        else:
            current = f"{current} {word}".strip()
    if current:
        lines.append(current)
    return lines or [""]


def main(argv: list[str]) -> int:
    want_map = "--checks" not in argv
    want_checks = "--map" not in argv

    status = 0
    if want_map:
        status |= print_map()
    if want_checks:
        status |= print_checks()
    print()
    return status


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
