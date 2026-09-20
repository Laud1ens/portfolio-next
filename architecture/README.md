# architecture

A Python map of this site, for reading and for checking.

```
python -m architecture            # the map, then the checks
python -m architecture --checks   # checks only, exit 1 on error
python -m architecture --map      # map only
```

Standard library only. No virtualenv, no install, no dependencies. Python
3.11 or newer.

## What this is for

The site is TypeScript. This is not a second backend and it does not run in
production. Nothing in `app/` or `lib/` imports it, and deleting the whole
folder would change nothing about what gets served.

It exists because the reasoning behind this site lives in comments spread
across thirty files, and six months from now the question will not be "what
does this code do", it will be "why is it like that, and what breaks if I
change it". This answers that in the language I actually think in, and it
answers it from the real files rather than from a diagram somebody forgot to
update.

## The two halves

**`sitemap.py` is the map.** Four layers, each file with its role and the
decisions attached to it. Every path in it is checked against the filesystem
on every run, so a file that moved makes the map fail rather than quietly lie.
That is the only thing separating this from a README that went stale in
March.

**`checks.py` is the part that catches things.** `npx tsc --noEmit` proves
the shape of the content. It cannot catch any of the failures that have
actually happened here, because every one of them was a correctly typed
string that said something untrue.

| Check | The incident behind it |
|---|---|
| `no-em-dash` | Standing rule. Broken three times. Invisible in review, since it looks like a hyphen. |
| `future-claims` | The dissertation read "submitting November 2026" in five places for weeks after it had been submitted and defended. It was valid, correctly typed, and had been true when written. |
| `learning-not-claimed` | The gap list was reframed as "still learning". That is honest only while nothing else on the page promotes the same tool to experience. |
| `wip-fields` | `aiming` is what separates "I am building X" from "I am building X so that Y becomes measurable". An empty one puts the entry back to being a hobby. |
| `stage-vocabulary` | Two sections share one `STAGE_STYLES` map. A fourth stage renders unstyled rather than failing. |
| `plain-english` | Laudbot is told to prefer these over inventing an analogy. A missing one silently sends it back to improvising. |
| `corpus-budget` | The no-vector-search decision was taken against a measurement, so it has an expiry condition. This is the number that detects it. |

Every check was tested by breaking the content and confirming it fired.
Eight failure cases, eight catches. A check nobody has watched fail is a
check that does not work yet.

Errors exit 1. Warnings do not, because they need a human to look rather than
being definitely wrong, and a gate that cries wolf gets bypassed.

## `tsdata.py`, and why it reads TypeScript

The obvious build is a Node script that dumps `content.ts` to JSON for Python
to read. That puts a build step between the source of truth and the thing
checking it, and a check that only runs against a file you remembered to
regenerate is a check that goes stale silently.

So it reads the `.ts` directly. It is not a TypeScript parser. It handles the
subset `content.ts` uses: object and array literals, strings, numbers,
booleans, comments, trailing commas, `as SomeType[]` assertions, and bare
identifiers.

The danger with a hand-written parser is not that it fails. It is that it
succeeds with a plausible wrong answer. Two things guard against that:

- **Unknown syntax raises.** A template literal stops the run with a line
  number instead of being skipped.
- **A literal followed by an operator is downgraded to a reference.**
  `CV_REQUEST_MAILTO` opens with a quoted string and concatenates three more
  terms onto it. Reading the first term alone returns a real-looking URL with
  no subject and no body. That case was caught during development and is the
  reason the rule exists.
- **`load_content` asserts the counts** it expects before returning anything.
  Those numbers go out of date every time a project is added, and that is the
  point: the fix is a one line edit, and in exchange a parser that has started
  dropping entries can never pass quietly.

## Using it as a gate

```
python -m architecture --checks || echo "content checks failed"
```

Worth running alongside `npx tsc --noEmit` before a deploy. It takes well
under a second and needs nothing installed.
