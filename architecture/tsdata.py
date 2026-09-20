"""Read the exported data literals out of lib/content.ts.

WHY THIS EXISTS RATHER THAN A JSON EXPORT

The obvious build is a Node script that imports content.ts and writes JSON for
Python to read. That was rejected for one reason: it puts a build step between
the source of truth and the thing checking it, and a check that only runs after
you remember to regenerate its input is a check that silently goes stale. This
reads the .ts file directly, so it can never be looking at yesterday's content.

WHAT THIS IS NOT

It is not a TypeScript parser. It understands the subset of syntax that
content.ts actually uses: object and array literals, double and single quoted
strings, numbers, booleans, null, unquoted keys, trailing commas, line and
block comments, `as SomeType[]` assertions, and bare identifiers referring to
other consts in the same file.

THE LIMIT, AND WHY IT IS SAFE

A hand-written parser for a language it does not fully implement fails in one
of two ways: loudly, or silently with a plausible wrong answer. The second is
the dangerous one, so every failure here is made loud. Unknown syntax raises
rather than being skipped, and `load_content` asserts the shape of what it got
before returning it. If somebody adds a template literal or a spread to
content.ts, this stops with a readable error naming the line, which is a
five minute fix. The alternative, a parser that quietly returns six projects
when there are seven, is a check that reports success forever.

Standard library only, on purpose. This has to run on a laptop with 16GB free
and no appetite for a virtualenv.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any


class ContentSyntaxError(RuntimeError):
    """Raised when content.ts uses syntax this reader does not implement."""


@dataclass
class Ref:
    """A bare identifier used as a value, e.g. `href: CV_REQUEST_MAILTO`.

    Kept as a marker rather than resolved. The consts it points at are built by
    string concatenation and `encodeURIComponent` calls, which would mean
    implementing expression evaluation to gain nothing: no check in this package
    cares what that URL is, only that the field is present.
    """

    name: str

    def __repr__(self) -> str:  # pragma: no cover - debugging aid
        return f"<ref {self.name}>"


_WS = " \t\r\n"
_IDENT = re.compile(r"[A-Za-z_$][A-Za-z0-9_$]*")
_NUMBER = re.compile(r"-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?")


class _Reader:
    def __init__(self, text: str) -> None:
        self.s = text
        self.i = 0

    # --- position reporting -------------------------------------------------

    def line_of(self, pos: int) -> int:
        return self.s.count("\n", 0, pos) + 1

    def fail(self, message: str) -> ContentSyntaxError:
        snippet = self.s[self.i : self.i + 40].replace("\n", "\\n")
        return ContentSyntaxError(
            f"{message} at line {self.line_of(self.i)}, near: {snippet!r}"
        )

    # --- lexing -------------------------------------------------------------

    def skip_trivia(self) -> None:
        """Whitespace and comments.

        Comments carry most of the reasoning in content.ts, so there are a lot
        of them and they sit between values, not only above them.
        """
        while self.i < len(self.s):
            c = self.s[self.i]
            if c in _WS:
                self.i += 1
            elif self.s.startswith("//", self.i):
                nl = self.s.find("\n", self.i)
                self.i = len(self.s) if nl == -1 else nl + 1
            elif self.s.startswith("/*", self.i):
                end = self.s.find("*/", self.i + 2)
                if end == -1:
                    raise self.fail("unterminated block comment")
                self.i = end + 2
            else:
                return

    def expect(self, ch: str) -> None:
        self.skip_trivia()
        if self.i >= len(self.s) or self.s[self.i] != ch:
            raise self.fail(f"expected {ch!r}")
        self.i += 1

    def peek(self) -> str:
        self.skip_trivia()
        return self.s[self.i] if self.i < len(self.s) else ""

    def skip_type_assertion(self) -> None:
        """Consume a trailing `as SomeType[]`, which carries no data.

        content.ts uses these to pin a literal to a union it would otherwise
        widen out of, for example `] as LinkCta[]`. The type is what stops the
        `visual` union being got wrong, so it earns its place in the source and
        means nothing here.

        Bracket depth is tracked so a generic or an array suffix cannot end the
        skip early, and the scan stops at a separator rather than at a fixed
        number of tokens, because `as Foo | Bar` is legal and would otherwise
        leave `| Bar` to be parsed as a value.
        """
        self.skip_trivia()
        m = _IDENT.match(self.s, self.i)
        if not m or m.group(0) != "as":
            return
        j = m.end()
        depth = 0
        while j < len(self.s):
            c = self.s[j]
            if c in "<[":
                depth += 1
            elif c in ">]":
                if depth == 0 and c == "]":
                    break
                depth -= 1
            elif depth == 0 and c in ",})\n":
                break
            j += 1
        # j is left on the separator, never past it, so the caller's own
        # comma and brace handling still sees what it expects.
        self.i = j

    # --- values -------------------------------------------------------------

    def read_value(self) -> Any:
        self.skip_trivia()
        if self.i >= len(self.s):
            raise self.fail("unexpected end of file")
        c = self.s[self.i]

        if c == "{":
            return self.read_object()
        if c == "[":
            return self.read_array()
        if c in "\"'":
            return self.read_string()
        if c == "`":
            # Deliberately unimplemented. A template literal can contain
            # arbitrary expressions, and guessing at one is how a reader starts
            # returning plausible nonsense.
            raise self.fail("template literals are not supported")
        if c == "-" or c.isdigit():
            return self.read_number()

        m = _IDENT.match(self.s, self.i)
        if m:
            word = m.group(0)
            self.i = m.end()
            if word == "true":
                return True
            if word == "false":
                return False
            if word in ("null", "undefined"):
                return None
            return Ref(word)

        raise self.fail("unrecognised value")

    def read_string(self) -> str:
        quote = self.s[self.i]
        self.i += 1
        out: list[str] = []
        while True:
            if self.i >= len(self.s):
                raise self.fail("unterminated string")
            c = self.s[self.i]
            if c == "\\":
                nxt = self.s[self.i + 1]
                out.append(
                    {"n": "\n", "t": "\t", "r": "\r", "\\": "\\", "'": "'", '"': '"'}.get(
                        nxt, nxt
                    )
                )
                self.i += 2
                continue
            if c == quote:
                self.i += 1
                return "".join(out)
            out.append(c)
            self.i += 1

    def read_number(self) -> float | int:
        m = _NUMBER.match(self.s, self.i)
        if not m:
            raise self.fail("malformed number")
        self.i = m.end()
        raw = m.group(0)
        return float(raw) if ("." in raw or "e" in raw or "E" in raw) else int(raw)

    def read_array(self) -> list[Any]:
        self.expect("[")
        items: list[Any] = []
        while True:
            if self.peek() == "]":
                self.i += 1
                return items
            items.append(self.read_value())
            self.skip_type_assertion()
            self.skip_trivia()
            if self.peek() == ",":
                self.i += 1
            elif self.peek() == "]":
                self.i += 1
                return items
            else:
                raise self.fail("expected , or ] in array")

    def read_object(self) -> dict[str, Any]:
        self.expect("{")
        out: dict[str, Any] = {}
        while True:
            if self.peek() == "}":
                self.i += 1
                return out
            self.skip_trivia()
            c = self.s[self.i]
            if c in "\"'":
                key = self.read_string()
            else:
                m = _IDENT.match(self.s, self.i)
                if not m:
                    raise self.fail("expected an object key")
                key = m.group(0)
                self.i = m.end()
            self.expect(":")
            out[key] = self.read_value()
            self.skip_type_assertion()
            self.skip_trivia()
            if self.peek() == ",":
                self.i += 1
            elif self.peek() == "}":
                self.i += 1
                return out
            else:
                raise self.fail("expected , or } in object")


_EXPORT = re.compile(r"^export const (\w+)\s*(?::\s*[^=]+?)?\s*=\s*", re.MULTILINE)


def read_exports(path: Path) -> dict[str, Any]:
    """Every `export const` in the file whose value is a literal.

    Consts whose value is an expression (string concatenation, a function call)
    are skipped rather than guessed at. They are recorded in the returned dict
    as a Ref so a caller can see the name exists without being told a value that
    was invented for it.
    """
    text = path.read_text(encoding="utf-8")
    found: dict[str, Any] = {}

    for m in _EXPORT.finditer(text):
        name = m.group(1)
        reader = _Reader(text)
        reader.i = m.end()
        reader.skip_trivia()
        first = text[reader.i] if reader.i < len(text) else ""
        if first not in "{[\"'":
            # An expression, not a literal. Named, not invented.
            found[name] = Ref(name)
            continue

        value = reader.read_value()

        # A literal can still be the *first term* of an expression, and that is
        # the one case where this reader would return something that looks
        # right and is not. `CV_REQUEST_MAILTO` opens with a quoted string and
        # then concatenates three more terms onto it; reading the first term
        # alone gives a real-looking URL missing its subject and body.
        #
        # So anything followed by an operator is downgraded to a Ref. A partial
        # value is worse than no value, because only one of the two gets
        # noticed.
        reader.skip_trivia()
        if reader.s[reader.i : reader.i + 1] in ("+", ".", "(", "?"):
            found[name] = Ref(name)
            continue

        found[name] = value

    return found


# Shapes the rest of the package relies on. Checked at load time so a parser
# that has drifted fails here, loudly, rather than downstream as a wrong count.
_EXPECTED_LISTS = {
    "experience": 6,
    "projects": 7,
    "currentlyWorkingOn": 6,
    "writing": 4,
    "skillGroups": 4,
    "stackChoices": 8,
    "stackLearning": 5,
}


def load_content(repo_root: Path) -> dict[str, Any]:
    """Parse lib/content.ts and refuse to return a result that looks wrong.

    The counts above are not a schema, they are a tripwire. They will go out of
    date every time a project or a tool is added, and that is the point: the
    failure is a one line edit with the real number, and in exchange a parser
    that has started dropping entries can never pass quietly.
    """
    path = repo_root / "lib" / "content.ts"
    if not path.exists():
        raise FileNotFoundError(f"content.ts not found at {path}")

    data = read_exports(path)

    missing = [k for k in _EXPECTED_LISTS if k not in data]
    if missing:
        raise ContentSyntaxError(
            "these exports were not found, so the parser is out of step with "
            f"content.ts: {', '.join(missing)}"
        )

    drifted = []
    for key, expected in _EXPECTED_LISTS.items():
        actual = len(data[key])
        if actual != expected:
            drifted.append(f"{key}: expected {expected}, parsed {actual}")
    if drifted:
        raise ContentSyntaxError(
            "parsed counts do not match the recorded ones. Either content "
            "changed (update _EXPECTED_LISTS in tsdata.py) or the parser is "
            "dropping entries:\n  " + "\n  ".join(drifted)
        )

    return data
