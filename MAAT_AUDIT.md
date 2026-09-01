# Maat Audit — Workflowware (public repo) — 2026-09-01

Scope: `Propershare/workflowware` (spec/UI/site) + `Propershare/workflowware-runtime`
(enforcement planes). Scored against the six commitments in the Maat
constitution: truth, balance, order, justice, reciprocity, self-reflection.

## Verdicts

| Principle | Verdict | Evidence |
|---|---|---|
| Truth | PASS | README states "what we claim / what we do not claim" explicitly. `docs/runtime-integrations.md` labels lab-internal runtimes reference-only, never oversold as public. |
| Balance | PASS | `workflowware-runtime/BOUNDARY.md` operationalizes restraint before high-blast-radius action (NO_GO hard stops, require-human policy tier). Verified: 22/22 unit tests pass, `conformance/prove_runtime_boundary.py --plane product` green as of this audit. |
| Order | WARN | Clean structure and branch-per-task PR discipline. Draft PR #1 (merged 2026-09-01) and three dead/merged branches closed out as part of this audit. PR #6 remains open — see "New finding" below, it is not a simple merge. |
| Justice | **FAIL** | `client-preview/salim-jewelry` — a real client's name — was merged to public `main` via PR #7, then removed by forward commits. Content is gone from HEAD but remained in git log and on the live PR #7 diff with no recorded consent trail. Third-party consent bypass is exactly what this principle prohibits. |
| Reciprocity | PASS | MIT-licensed, spec genuinely free/open. `workflowware-runtime` is stdlib-only, zero unsolicited processes on the host (`runtime/README.md`). |
| Self-reflection | WARN | `workflowware-runtime/MAAT_AUDIT.md` records real design decisions with reasoning. `workflowware` (public repo, where the Justice incident happened) had no equivalent record until this file. |

## Remediation taken (2026-09-01)

- Deleted stale branches that never should have lived past the experiment:
  `feature/workflowware-afrofuturist-ui`, `homepage-finish/head-dev-takeover`
  (both targeted the ivory/gold "Afrofuturist dashboard" redesign forbidden
  by `AGENTS.md`'s locked-homepage law), and `client-preview/salim-jewelry`
  (merged/reverted client preview branch, now dead weight).
- `main`'s commit history was **left intact** — rewriting merged public
  history was assessed as disproportionate (breaks any existing clone/fork,
  doesn't fully purge GitHub's own caches without a support request) relative
  to the actual exposure (a business name, not credentials or personal data).
- PR #7 ("Add Salim Jewelry client preview") locked to prevent further
  comment/interaction; diff remains visible on GitHub as the historical
  record of what happened and was reverted.
- `workflowware/homepage-finish/manifest.yaml` + `tasks.json` still exist on
  `main` and are still scoped to the forbidden Afrofuturist palette. They are
  now orphaned (the branch that would have executed them is deleted) but the
  task files themselves were not removed in this pass — flagged for a
  follow-up decision: archive them explicitly (e.g. move under
  `docs/archive/`) or delete outright, so a future agent reading `tasks.json`
  doesn't treat a dead, constitution-violating plan as live work.

## Follow-up remediation (2026-09-01, second pass)

- Merged PR #1 (trivial, verified `AGENTS.md` addition; needed a rebase —
  its base predated a later rewrite of `AGENTS.md`'s design-rules section,
  resolved by keeping current `main`'s locked-down text and appending only
  the genuinely new content, not resurrecting the superseded ivory/gold
  design-rules block it had originally conflicted against).
- Archived `workflowware/homepage-finish/{manifest.yaml,tasks.json,refs/}`
  to `docs/archive/homepage-finish-2026-08/` with a README explaining why —
  resolves open item 1 below.
- Added [`docs/client-preview-policy.md`](docs/client-preview-policy.md) —
  resolves open item 3 below.

### New finding: PR #6's description doesn't match its diff

PR #6 ("docs: reframe to three-plane architecture") states in its own body:
"No protected files touched (index.html, library.html, pilot.html,
spec.html, docs.html, assets/site.css all unchanged)." **That claim is
false.** The actual diff rewrites `spec.html` from v0.1 to v0.2: a new
lifecycle model (`READY -> RUNNING -> VERIFYING -> ...`), a restructured MVP
file set (drops `index.html`/`install-guide.md`, adds
`checks.md`/`repair.md`/`audit.md`), and swaps the homepage's featured pilot
from "Missed Lead Recovery" (README/roadmap still call this the live pilot)
to a new, previously-undisclosed "Kmt Mathematics" example package. This is
exactly the kind of unreviewed protected-file change `AGENTS.md` exists to
catch — the PR title and body describe unrelated runtime-naming work, and
would not have prompted a careful reviewer to check `spec.html` at all. Not
merged. Left for the repo owner to review directly rather than merged on the
strength of a PR description that doesn't match its own diff.

## Open items (not fixed here, need a decision)

1. ~~Whether to archive or delete `workflowware/homepage-finish/` outright.~~
   Resolved — archived, see above.
2. Two other divergent branches were found and intentionally **not** touched
   — they don't match the afro/salim experiment and contain substantial
   unrelated work: `platform/restore-classic-and-toolkit` (governed-access /
   pricing-tier rework, 72 files) and
   `feature/futuristic-community-event-site-workflowware` (a candidate
   example package, 1 commit). Needs the repo owner to decide keep/merge/drop
   for each on their own merits.
3. ~~No written policy yet for what "public preview" content requires before
   merge.~~ Resolved — see `docs/client-preview-policy.md`.
4. **PR #6** — needs the repo owner to review the `spec.html` v0.2 rewrite
   and the new Kmt Mathematics pilot swap directly and decide: split the PR
   (merge the runtime-naming docs, hold the spec.html/pilot-swap piece for
   separate review), or review and approve the whole thing as intentional
   work that just had a stale description.
