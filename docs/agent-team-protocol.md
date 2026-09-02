# Workflowware Agent Team Protocol v0.1

**Status: proposed v0.1.** This protocol becomes authoritative only after it is merged and its companion validator is part of the registry gate. Packages using the proposed protocol must produce a conforming `agent-team.json` before claiming protocol conformance beyond `BUILD`. This protocol does not change
`SPEC.md`'s package file shape, `MANIFEST.schema.json`, or any protected site
file (`index.html`, `library.html`, `pilot.html`, `spec.html`, `docs.html`,
`assets/site.css`) — it adds a governance layer on top of the existing
package spec.

## Why this exists

[`docs/workflowware-registry-vision.md`](workflowware-registry-vision.md)
names the gap directly: the registry's event model already has `created`,
`published`, `executed`, and `failed` working today, but

> **Certified** needs a certifying authority distinct from the package
> author — someone (or something) that runs the conformance suite against a
> package and signs the result. Nothing today plays that role for
> Workflowware packages specifically.

This protocol is that missing role definition. It does not implement the
hashing/signing pipeline the vision doc also flags as open — it defines who
is allowed to say a package is trustworthy, and makes self-certification machine-checkable through the JSON Schema plus `scripts/validate-agent-team.py`. The schema declares the required data; the companion validator enforces cross-field identity rules that JSON Schema cannot express.

## The constitutional rule

> **The same agent or identity that builds a package cannot independently
> certify that package.**

This rule is absolute. It is not weighed against convenience, deadline
pressure, a thin team, or a specific platform's limitations — the same
posture `runtime-integrations.md` takes toward `no-go-rules.md`: *the spec
is the law; prompts are not.* No role definition below, no escalation path,
and no lifecycle shortcut may override it. A package with only one available
identity to do the work is a package that is not ready for `INDEPENDENT
REVIEW` — it is ready for `INTAKE` on a second identity.

"Independently certify" means, at minimum, the `independent_reviewer` role.
In practice the same discipline applies to `policy_guardian`, `evidence_auditor`,
and `registry_publisher` relative to `package_builder` — see each role's
**Conflicts of interest** below.

## Roles

Each role's fields below are the required keys in that role's entry in
`agent-team.json` (see [`schemas/agent-team.schema.json`](../schemas/agent-team.schema.json)).
"Identity" is not listed per role here since it is instance data (who,
specifically, held the role for a given package) rather than protocol
definition — it is still a required field in the schema.

### Workflow Architect

- **Purpose:** Turn a business need or customer intake into `workflow-spec.md`
  — trigger, context, old workflow, new workflow, finish line, edge cases,
  and success metrics, per `SPEC.md`.
- **Required inputs:** Customer/business intake notes, prior package
  precedent (if any), `SPEC.md`.
- **Permitted actions:** Draft and revise `workflow-spec.md`; define success
  metrics; enumerate edge cases; request clarification from whoever supplied
  the intake.
- **Prohibited actions:** Writing implementation files (`agent-spec.md`,
  scripts, adapters); approving their own design as final; accessing live
  customer data; setting `approval-rules.md`.
- **Required outputs:** `workflow-spec.md` (draft, then approved), an
  edge-case list, named success metrics.
- **Evidence produced:** Versioned draft with a rationale note explaining
  why the finish line and edge cases were chosen — reviewable by someone who
  was not in the original intake conversation.
- **Escalation conditions:** The business requirement is ambiguous or
  self-contradictory; no safe finish line exists without a capability the
  team doesn't have; success metrics can't be stated without live data
  access.
- **Handoff recipient:** Package Builder.
- **Conflicts of interest:** May not also serve as Independent Reviewer or
  Evidence Auditor for the same package version — a design's own author is
  poorly positioned to certify that the design was sound.

### Package Builder

- **Purpose:** Implement the package file set defined in `SPEC.md` (minimum
  or full) from the approved `workflow-spec.md`.
- **Required inputs:** Approved `workflow-spec.md`, `SPEC.md`,
  `MANIFEST.schema.json`, this repository's `AGENTS.md` constraints.
- **Permitted actions:** Write `agent-spec.md`, `install-guide.md`,
  `agent-handoff.md`, `artifact-manifest.json`, scripts, and templates;
  propose a first draft of `approval-rules.md`; write `eval-template.csv`
  skeleton rows.
- **Prohibited actions:** Marking their own build policy-approved,
  evaluated, audited, published, or certified; modifying any protected site
  file; inventing capabilities the workflow spec didn't ask for.
- **Required outputs:** Complete package file set per `SPEC.md`,
  `artifact-manifest.json`, a source ledger of what was written and from
  what inputs.
- **Evidence produced:** Commit/diff reference for every file written; a
  build log naming which spec sections drove which files.
- **Escalation conditions:** The spec requires a capability with no safe
  approval gate; a required file would have to violate a protected-file
  constraint; the spec and `MANIFEST.schema.json` conflict.
- **Handoff recipient:** Policy Guardian.
- **Conflicts of interest:** **This is the identity the constitutional rule
  is written about.** May not also serve as Policy Guardian, Evidence
  Auditor, Registry Publisher, or Independent Reviewer for the same package
  version, under any circumstance.

### Policy Guardian

- **Purpose:** Verify `approval-rules.md` and no-go coverage are complete
  and enforceable before the package is allowed to touch a real platform.
- **Required inputs:** Built package, `docs/ai-agent-buyer-guide.md`'s
  "Do not do these things" list, `SPEC.md`'s governance section.
- **Permitted actions:** Require changes to `approval-rules.md`; add
  no-go rules; block advancement to Platform Adaptation until fixed.
- **Prohibited actions:** Rewriting non-policy package files; approving
  their own added rules without a second look from someone else; treating a
  missing no-go rule as acceptable because "the model probably won't do
  that."
- **Required outputs:** Policy review report; finalized
  `approval-rules.md`; a no-go rule set covering at minimum:
  `request_credentials`, `invent_price`, `invent_availability`,
  `promise_guarantee` (the categories the buyer guide already names).
- **Evidence produced:** A checklist mapping each buyer-guide "never" item
  to a specific rule that enforces it, with reviewer identity and timestamp.
- **Escalation conditions:** The package wants an autonomous action (send,
  purchase, delete, connect a live account) with no approval gate; a no-go
  category has no corresponding rule; the workflow can't function within the
  buyer guide's constraints at all.
- **Handoff recipient:** Platform Adapter.
- **Conflicts of interest:** May not also serve as Package Builder or
  Registry Publisher for the same package version.

### Platform Adapter

- **Purpose:** Adapt the policy-approved package to a specific runtime
  (ChatGPT/Claude project, Hermes Desktop, n8n, MAAT Runtime, prime-agent,
  etc.) against the six-point runtime contract in
  [`runtime-integrations.md`](runtime-integrations.md).
- **Required inputs:** Policy-approved package, target platform's tool and
  approval semantics, the runtime contract's six requirements.
- **Permitted actions:** Write platform-specific adapter config or
  instructions; set a `platform_adapters[]` entry's status
  (`documented` / `planned` / `tested`).
- **Prohibited actions:** Weakening `approval-rules.md` or no-go rules to
  fit a platform's limitations — a platform that cannot enforce rule #3
  (honor no-go rules even against a later prompt) must be escalated, not
  silently marked compatible.
- **Required outputs:** One `platform_adapters[]` entry per target
  platform with an honest status; adapter config or instructions for each.
- **Evidence produced:** A per-platform checklist against the runtime
  contract's six points, with pass/fail per point.
- **Escalation conditions:** A platform fails contract point #3
  (no-go enforcement) or point #4 (receipt writing) — it must not be listed
  as `tested` regardless of business pressure to support it.
- **Handoff recipient:** Evaluation Agent.
- **Conflicts of interest:** May not also serve as Runtime Operator or
  Evaluation Agent for a platform they personally adapted, without an
  independent Evaluation Agent gate between adaptation and execution.

### Evaluation Agent

- **Purpose:** Run the eval suite (`eval-template.csv` / `example-cases.csv`)
  against the adapted package and report pass/fail per row, per runtime
  contract point #5.
- **Required inputs:** Adapted package, eval suite, sample (never live)
  data.
- **Permitted actions:** Execute evals in sandbox/sample-data mode; record
  pass/fail per row; request additional eval cases from the Package Builder
  or Workflow Architect.
- **Prohibited actions:** Editing package files to force a pass; using live
  customer data; silently dropping a failing row from the report.
- **Required outputs:** Eval run report (per-row pass/fail); a
  proceed/block recommendation.
- **Evidence produced:** An eval-run receipt per `runtime-integrations.md`'s
  receipt fields (`step_id`, `actor`, `timestamp`, `inputs_hash`,
  `outputs_hash`).
- **Escalation conditions:** The eval suite has no case covering a
  declared no-go rule; a passing run still exhibits a policy violation the
  suite didn't anticipate.
- **Handoff recipient:** Runtime Operator.
- **Conflicts of interest:** May not also serve as Package Builder or
  Platform Adapter for the package/platform combination under evaluation.

### Runtime Operator

- **Purpose:** Execute the evaluated package for a real or supervised pilot
  run, operator-present, per the Hermes Desktop / prime-agent operator-led
  pattern in `runtime-integrations.md`.
- **Required inputs:** Evaluated package (passed), live-or-sample data per
  `approval-rules.md`, an active human approval channel.
- **Permitted actions:** Execute workflow steps; enforce approval gates in
  real time; halt immediately on any no-go trigger.
- **Prohibited actions:** Bypassing any action listed
  `requires_approval: true`; using data the approval rules didn't clear;
  writing their own evidence audit.
- **Required outputs:** Execution log; one receipt per step
  (`step_id`, `actor`, `timestamp`, `inputs_hash`, `outputs_hash`,
  `approval_ref` if any, `evidence_uri` if any) — the exact receipt shape
  `runtime-integrations.md` requires of any compliant runtime.
- **Evidence produced:** The receipt chain itself, written so it can be
  hash-verified by someone who did not write it (matching the
  `EvidenceLedger` pattern referenced in `workflowware-registry-vision.md`).
- **Escalation conditions:** A no-go rule is nearly triggered; a required
  approval doesn't arrive in the allowed window; a data-handling risk
  appears that the workflow spec didn't anticipate.
- **Handoff recipient:** Evidence Auditor.
- **Conflicts of interest:** May not also serve as Evidence Auditor for
  their own execution run.

### Evidence Auditor

- **Purpose:** Independently verify the receipt chain's integrity and
  completeness before the package is allowed into `PUBLICATION`.
- **Required inputs:** Execution receipts, the package's `evidence.*`
  registry fields.
- **Permitted actions:** Recompute and verify the hash chain; flag missing
  or inconsistent evidence; block publication until resolved.
- **Prohibited actions:** Generating or editing receipts themselves;
  executing the workflow; auditing a chain they personally produced.
- **Required outputs:** Audit report stating a chain-verification result
  (pass/fail, equivalent to `EvidenceLedger.verify()`) and an evidence
  completeness checklist.
- **Evidence produced:** The audit report itself, with auditor identity
  and timestamp, independently reproducible by a future auditor from the
  same receipts.
- **Escalation conditions:** Chain verification fails (tamper or gap
  detected); required evidence fields remain `pending` past what the
  package's stated maturity should allow.
- **Handoff recipient:** Registry Publisher.
- **Conflicts of interest:** May not also serve as Runtime Operator or
  Package Builder for the same package version.

### Registry Publisher

- **Purpose:** Write or update the package's registry record
  (`registry/packages/.../vX.json` and `registry/index.json`) to reflect
  audited status.
- **Required inputs:** Passed audit report, evaluation report, policy
  review, platform adapter statuses.
- **Permitted actions:** Publish or update the registry JSON record; set
  `lifecycle_status`; set `certification_status` up to and including
  `not_independently_verified` — never higher.
- **Prohibited actions:** Setting `certification_status` to any verified
  state without a signed Independent Reviewer determination; altering
  evidence fields after the audit; publishing without both Policy Guardian
  and Evidence Auditor sign-off recorded.
- **Required outputs:** Updated `registry/packages/.../vX.json`; a
  corresponding `registry/index.json` entry.
- **Evidence produced:** A publish receipt — what changed, when, from
  which prior state, by which identity.
- **Escalation conditions:** Evidence is incomplete; the audit failed; no
  Independent Reviewer has been assigned yet for a package about to be
  published.
- **Handoff recipient:** Independent Reviewer.
- **Conflicts of interest:** May not also serve as Package Builder,
  Evidence Auditor, or Independent Reviewer for the same package version.

### Independent Reviewer

- **Purpose:** Be the certifying authority `workflowware-registry-vision.md`
  says doesn't exist yet — the identity distinct from every prior role that
  reviews the full package and evidence chain and issues the package's
  final determination.
- **Required inputs:** Published registry record, the full evidence chain,
  the package artifact and its hash (once the hashing pipeline referenced
  in `workflowware-registry-vision.md` exists — until then, the artifact
  itself plus `hash_status: pending_canonical_build`, reviewed as such).
- **Permitted actions:** Independently re-run or spot-check evals; issue
  `VERIFIED` or `REJECTED`; issue `REVOKED` against a previously `VERIFIED`
  package if evidence is later found invalid.
- **Prohibited actions:** Being the same identity as *any* of the other
  eight roles for this package version — this is the one role with full
  separation from the rest of the team, not just from the Package Builder.
  May not modify the package itself.
- **Required outputs:** Independent review report; a signed
  `VERIFIED` / `REJECTED` / `REVOKED` determination with stated reasoning.
- **Evidence produced:** The review report, including the reviewer's own
  recomputed checks and explicit citation of which prior-role evidence it
  relied on versus independently reproduced.
- **Escalation conditions:** The evidence chain does not independently
  reproduce; the reviewer discovers their own identity, or any identity
  overlap, elsewhere in the team roster for this package — review halts
  immediately and the package returns to `REJECTED` pending team
  reassignment, it is not waved through.
- **Handoff recipient:** None — `VERIFIED`/`REJECTED` is terminal for this
  cycle. A `REVOKED` determination hands back to Registry Publisher, to
  record the revocation and update the record a runtime should check before
  executing the package again (the "revocation list" the vision doc names
  as not yet built).
- **Conflicts of interest:** Full separation from all eight other roles
  for this package version. This role *is* the constitutional rule made
  concrete.

## Identity identifiers

Identity values are opaque identifiers issued by the runtime, registry, or accountable organization. They are not inferred from role names. Documentation examples use the reserved `example:identity:*` namespace and must never be treated as proof that a real identity was issued or authenticated.

## Lifecycle

```text
INTAKE
  -> DESIGN
    -> BUILD
      -> POLICY REVIEW ----------------------> REJECTED
        -> PLATFORM ADAPTATION
          -> EVALUATION --> REPAIR REQUIRED --> BUILD / PLATFORM ADAPTATION
                       \-----------------------> REJECTED
            -> EXECUTION --> REPAIR REQUIRED
              -> EVIDENCE AUDIT --> REPAIR REQUIRED
                              \---------------> REJECTED
                -> PUBLICATION
                  -> INDEPENDENT REVIEW ------>  REJECTED
                    -> VERIFIED
                      -> REVOKED   (when necessary, post-publication only)
```

| State | Owning role | Exit condition |
|---|---|---|
| `INTAKE` | Workflow Architect | Business need captured, enough to design against. |
| `DESIGN` | Workflow Architect | `workflow-spec.md` complete and internally consistent. |
| `BUILD` | Package Builder | Full package file set written; `agent-team.json` present and schema-valid. |
| `POLICY_REVIEW` | Policy Guardian | Approval rules and no-go coverage complete, or `REJECTED`. |
| `PLATFORM_ADAPTATION` | Platform Adapter | At least one platform honestly passes the six-point runtime contract. |
| `EVALUATION` | Evaluation Agent | Eval suite passes to `EXECUTION`; repairable failures enter `REPAIR_REQUIRED`; hard failures may be `REJECTED`. |
| `EXECUTION` | Runtime Operator | Workflow run to completion (or safely halted) with a full receipt chain. |
| `EVIDENCE_AUDIT` | Evidence Auditor | Receipt chain verifies to `PUBLICATION`; repairable gaps enter `REPAIR_REQUIRED`; invalid evidence may be `REJECTED`. |
| `PUBLICATION` | Registry Publisher | Registry record and index updated. |
| `INDEPENDENT_REVIEW` | Independent Reviewer | `VERIFIED` or `REJECTED` issued. |
| `VERIFIED` | Independent Reviewer | Terminal, unless later `REVOKED`. |
| `REPAIR_REQUIRED` | Package Builder / Platform Adapter | Nonterminal correction loop returning to `BUILD` or `PLATFORM_ADAPTATION`; all failed evidence remains in history. |
| `REJECTED` | — | Terminal. A rejected package is not repaired in place — see below. |
| `REVOKED` | Independent Reviewer / Registry Publisher | Terminal. |

**Append-only, not editable in place.** Matching
`workflowware-registry-vision.md`'s event model
(`created -> published -> certified -> executed -> failed -> revoked`), a terminally rejected or revoked package is never silently rewritten back to an earlier state. Ordinary correctable failures use `REPAIR_REQUIRED`, preserving the failed transition and repair evidence in history without falsely turning routine iteration into a terminal decision. A team that fixes a terminal rejection resubmits as a new version
(`INTAKE` again, new `package_version`), so the rejection and its reasoning
stay on the record rather than disappearing. This is also why the schema
forbids any `lifecycle.history` transition *from* `REJECTED` or `REVOKED` —
those states have no valid successor.

**Mapping to registry fields.** Publication and protocol trust are separate axes. `publication_status: "published"` records distribution; `protocol_status` records the protocol state; `trust_status` records `documented`, `tested`, `evidence_audited`, `independently_verified`, or `revoked`. The legacy `lifecycle_status: "published"` may remain for compatibility but must not be interpreted as verification. `certification_status` stays
`not_independently_verified` for every state through `PUBLICATION` — it can
only become verified once `INDEPENDENT_REVIEW` issues `VERIFIED`. A package
sitting at `PUBLICATION` with `certification_status:
"not_independently_verified"` is not a bug; it is the honest, expected state
of a package awaiting review (see the worked example in
`templates/workflowware-package-template/agent-team.json`).

## Separation of duty: how it's declared and its known limitation

`agent-team.json`'s `separation_of_duty` block requires, structurally:

- `constitutional_rule_acknowledged: true`
- `builder_identity` and `independent_reviewer_identity`, both required,
  non-empty
- `identities_distinct_attestation`: `false` while the reviewer or attester is unassigned; `true` only after both are assigned and the complete roster has been checked
- `attested_by`: whoever checked the roster for overlaps, or an explicit unassigned marker while the attestation is `false`
- `declared_conflicts`: an explicit list — even an empty roster overlap
  must be stated, not omitted

**Known limitation, stated plainly:** JSON Schema draft 2020-12 (without a non-standard `$data` extension) cannot itself assert that two string fields hold different runtime values. The schema declares the fields and attestation conditions; `scripts/validate-agent-team.py` computes
`builder_identity != independent_reviewer_identity` and fail validation if
that's false. The schema in `schemas/agent-team.schema.json` therefore
detects the *absence* of a separation-of-duty declaration (structurally
required) but relies on `attested_by` being a real check performed by
someone who is not `builder_identity` or `independent_reviewer_identity`
themselves. This gap is worth closing with a small companion validator
script in a follow-up change — see the open question in the PR this
document ships with.

## Relationship to existing artifacts

- **`SPEC.md` / `MANIFEST.schema.json`:** unchanged. This protocol is an
  additive governance layer — `agent-team.json` sits alongside
  `artifact-manifest.json` in a package, it does not replace it.
- **`docs/runtime-integrations.md`:** the receipt shape referenced under
  Runtime Operator and Evidence Auditor above is exactly that document's
  six-point runtime contract, points #2–#4.
- **`docs/ai-agent-buyer-guide.md`:** the Policy Guardian's no-go coverage
  check is built directly from that document's "Do not do these things"
  list.
- **`docs/workflowware-registry-vision.md`:** this protocol implements the
  `certified` role that document names as missing. It does not implement
  the package-artifact hashing/signing pipeline that document also flags as
  open — `agent-team.json` references `hash_status` where relevant but does
  not resolve it.
