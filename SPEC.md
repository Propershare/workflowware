# Workflowware Package Spec v0.2

> **Workflowware does not merely describe how work should be performed. It encodes
> the discipline by which work is performed, checked, corrected, recorded, and
> transferred.**

## Definition

**Workflowware** is software packaged as an agent-operable workflow.

A package is readable by both humans and agents. It states the job, defines the
procedure, declares the agent's authority, specifies the checks, the repair
path, the audit criteria, the evaluation examples, and the handoff record.

A Workflowware runtime does not treat "the agent returned text" as completion.
It treats a job as complete only when it has been **verified**, **audited**, and
**handed off**.

## The work discipline (lifecycle)

Every governed run moves through a lifecycle state machine:

```text
READY
  -> RUNNING
  -> VERIFYING
      -> VERIFIED            (the step passed its check)
      -> REPAIR_REQUIRED     (the step failed its check)
  -> AUDIT
      -> HANDOFF_READY
      -> COMPLETE
```

Terminal states:

| State | Meaning |
|-------|---------|
| `COMPLETE` | verified AND audited AND handed off |
| `REPAIR_REQUIRED` | a check failed; a repair target is surfaced |
| `AUDIT_FAILED` | steps passed but the whole job is missing required evidence |
| `REVIEW` | a human approval is required |
| `NOGO` | a hard denial; evidence is kept |
| `INCOMPLETE` | the run finished without performing the discipline |

## The universal invariant

**No silent progression after failed verification.**

A critical calculation, retrieval, permission check, jurisdiction check, or
required fact that fails verification must stop, repair, escalate, or request
human approval. It must never be silently passed to the next step.

```text
calculate -> apply -> inspect -> correct -> continue
```

not

```text
calculate -> assume -> keep going
```

## Universal invariants (the constitution)

Every package inherits these. They are enforced, not recommended.

| Invariant | Rule |
|-----------|------|
| traceability | every material output has an origin |
| verification | critical steps require an explicit check |
| repair | failed checks must have a defined response |
| bounded_authority | agents may only perform authorized actions |
| reversibility | destructive actions require stronger controls |
| evidence | claims remain linked to their evidence |
| handoff | state must be understandable by the next human or agent |
| auditability | significant actions must be recorded |
| learning | failures may update the package only through controlled review |

## Verification vs audit

These are distinct and must not be conflated.

- **VERIFY** — "Did this particular step produce the required result?"
  Per-step, immediate, local.
- **AUDIT** — "Did the entire job happen according to its rules, evidence,
  authority, procedure, and required controls?" Whole-run, after the steps,
  global.

A task can succeed step-by-step while the workflow fails. A courier can deliver
a package to the right place (verification passes) while missing the custody
signature and the temperature record (audit fails). Verification checks the
result; the audit checks the record.

## Three audit levels

| Level | Who checks | When |
|-------|------------|------|
| 1 — self-check | the worker/agent re-checks its own work | every critical step |
| 2 — independent check | a different agent, deterministic test, validator, calculator, or source checker | required for claims and calculations |
| 3 — human/authority check | a human or governing authority | required for high-impact or ambiguous decisions |

These are not interchangeable. A model agreeing with itself is not an
independent check.

## Three levels of law

| Level | Scope | Examples |
|-------|-------|----------|
| 1 — Constitution | universal rules of competent work | the invariants above |
| 2 — Domain Law | rules of a field | medicine, law, trucking, education, mathematics |
| 3 — Job Procedure | the exact steps of one package | this package's workflow |

Ma'at sits beneath all three: the constitution is the operational form of
Ma'at's principles — truth (provenance), balance (proportionality), order
(state), justice (authority), correction (repair), memory (records),
accountability (audit).

## Package structure

### Minimum viable package

```text
workflowware-package/
  README.md
  workflow-spec.md
  agent-spec.md
  approval-rules.md
  checks.md
  repair.md
  audit.md
  eval-template.csv
  agent-handoff.md
  artifact-manifest.json
```

### Recommended full package

```text
workflowware-package/
  README.md
  index.html
  workflow-spec.md
  agent-spec.md
  install-guide.md
  approval-rules.md
  escalation-rules.md
  checks.md
  repair.md
  audit.md
  evals/
    eval-template.csv
    example-cases.csv
  prompts/
  templates/
  scripts/
  graph.json
  source-ledger.csv
  runtime-connectors.md
  memory-registration.json
  agent-handoff.md
  artifact-manifest.json
```

## Required concepts

### Human trust surface
A page or document explaining what the package does, why it exists, how it is
controlled, and what proof exists.

### Workflow spec
Defines trigger, context, procedure, finish line, edge cases, and success
metrics. Includes the executable graph (`graph.json`) when the package is
runtime-backed.

### Agent spec
Defines role, inputs, tools, allowed actions, prohibited actions, output
schema, and escalation behavior. A node may declare a `model` hint; the
runtime records it but is model-agnostic.

### Checks
Declares the verification rules: what must be checked, how, and by whom
(which audit level).

### Repair
Declares the correction procedure for a failed check.

### Audit
Declares the whole-job conformity criteria and the evidence the run must
produce.

### Evals
Includes example inputs and expected behavior so the workflow can be tested
and improved.

### Handoff
Includes instructions for future agents and humans to customize, deploy,
extend, or audit the package.

### Manifest
A machine-readable file describing title, type, status, files, URI, related
packages, memory IDs, and public URLs.

## Manifest fields v0.2

```json
{
  "title": "string",
  "artifact_type": "workflowware_package | public_category_site | research_dossier",
  "status": "draft | prototype | active | published",
  "primary_artifact": "file:///... or https://...",
  "local_path": "path",
  "public_url": "https://...",
  "summary": "string",
  "files": [],
  "related_artifacts": [],
  "agent_handoff": "path",
  "lifecycle": {
    "verification": "required",
    "audit": "required",
    "handoff": "required"
  },
  "registered_in_maat_memory": "uuid or pending"
}
```

## Runtime contract

A runtime is Workflowware-compatible when it enforces all of:

1. Reads the manifest and resolves the workflow, agent, approval, checks,
   repair, audit, and handoff files.
2. Enforces approval rules and no-go rules (the spec is law; prompts are not).
3. Enforces the lifecycle — a failed verification stops the run at
   REPAIR_REQUIRED and surfaces a repair target; COMPLETE is reachable only
   after verification, audit, and handoff.
4. Performs the audit against produced evidence, never against a self-declared
   flag.
5. Writes receipts (who/may/did) conforming to the receipt schema.
6. Runs the eval suite and reports pass/fail per row.
7. Produces a handoff record a different runtime or a human can pick up.

## Changelog

- **v0.1 -> v0.2:** added the lifecycle state machine, the universal invariant
  ("no silent progression after failed verification"), the universal
  invariants, the verification/audit distinction, the three audit levels, the
  three levels of law, and the checks/repair/audit package sections.
