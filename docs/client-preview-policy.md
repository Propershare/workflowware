# Client Preview Policy

**Rule:** No named client's content — brand, business name, logo, sample data,
or preview page — merges to `main` of a public repo without a recorded
consent line in the pull request description.

## Why this exists

A real client's name ("Salim Jewelry") was merged into this public repo's
history as a client preview page, then removed by forward commits, but no
record was ever made of whether the client had agreed to a public preview.
The content is gone from `HEAD`, but the fact of it having been public, and
the absence of a consent trail, remains in git history. See
[`MAAT_AUDIT.md`](../MAAT_AUDIT.md) for the full finding.

Removing content after the fact is not the same as never having exposed it
without consent. This policy exists to make the second failure mode
structurally harder.

## The rule, concretely

Before opening a PR that adds any of the following to a **public** repo:

- a named client's brand, logo, or business name
- a client's real (non-anonymized) sample data
- a "client preview" page, case study, or testimonial attributed to a real
  business

the PR description must include a line in this exact shape:

```text
Consent: <client name> approved public preview on <date>, confirmed by <who on our side>.
```

If that line cannot be written truthfully, the content does not merge to
`main`. Use a private branch, a private repo, or anonymized/fictional sample
data instead — README.md's own pilot instructions already say to "use fake
or anonymized sample data first."

## Scope

Applies to `Propershare/workflowware` and any other public-facing
Workflowware repo. Does not apply to anonymized or fictional examples
(e.g. `examples/` package skeletons that use made-up business names) —
those carry no consent requirement because no real party is named.
