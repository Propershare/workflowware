# Runtime Integrations

Workflowware™ is **stack-neutral**. A package is a portable set of specs, rules, evals, approvals, and handoff material. Any runtime that can read those files, respect the approval rules, and write a conforming receipt can execute a Workflowware package.

This page lists runtimes the lab has actually wired up and tested against the public package shape, plus a neutral contract a runtime must satisfy to be considered a valid executor.

## TL;DR

| Runtime | Surface | Lab relationship | Public docs? |
|---|---|---|---|
| **Workflowware Runtime** | HTTP `/v1/*` on `127.0.0.1:8140`, blast-radius-separated | BlackLabRats product runtime (`Propershare/workflowware-runtime`). This is the runtime that runs customer packages. | yes |
| ChatGPT / Claude project | Web UI, no install | Reference manual path | yes |
| Hermes Desktop | Operator cockpit, local | BlackLabRats operator tool | yes |
| n8n + workflow agent nodes | Self-hosted automation | Common customer stack | yes |
| **MAAT Runtime** | Governed memory + artifact registry | BlackLabRats private lab governance plane (audits the product runtime; not the product runtime) | reference only |
| **prime-agent** | Governed single-node agent runtime, ed25519 identity, audit trail | BlackLabRats lab runtime; the body that backs the Workflowware Runtime adapter | reference only |

> Reference-only runtimes are private/lab internals. They are listed so AI-agent buyers and operators know the package works against them, **not** as endorsements, install instructions, or public hostnames.

## The runtime contract (what any executor must do)

A runtime is "Workflowware-compatible" when it can do all of these against any package that follows `SPEC.md`:

1. **Read the manifest.** Parse `artifact-manifest.json` and resolve the package's `workflow-spec.md`, `agent-spec.md`, `approval-rules.md`, `evals/`, and `install-guide.md` paths.
2. **Enforce approval rules.** Before any action listed in `approval-rules.md` as `requires_approval: true`, the runtime must stop and surface the action to a human approver with a clear plain-language summary.
3. **Honor no-go rules.** Any rule in `no-go-rules.md` or `approval-rules.md` marked `never` must be enforced even if a later prompt tells the agent to override it. The spec is the law; prompts are not.
4. **Write receipts.** After every executed step, append to a receipt store matching `receipt-schema.json` (or the package's `receipt_schema.json`). Receipts must include: `step_id`, `actor`, `timestamp`, `inputs_hash`, `outputs_hash`, `approval_ref` if any, and `evidence_uri` if any.
5. **Pass the eval suite.** The runtime must be able to run `evals/eval-template.csv` (or package-supplied equivalents) and report pass/fail per row without modifying the package files.
6. **Hand off cleanly.** Produce a `handoff.md` (or `agent-handoff.md`) summary that a different runtime or a human can pick up next.

If a runtime can do all six, the package is portable to it. If it can't enforce #3, it is **not** a valid Workflowware runtime regardless of its other features.

## Per-runtime notes

### Workflowware Runtime (BlackLabRats product runtime)

- **What it is:** the product runtime that runs customer Workflowware packages. Lives in `Propershare/workflowware-runtime` and is blast-radius-separated from the lab.
- **Endpoints:** `/health`, `/v1/who`, `/v1/may`, `/v1/entitlements`, `/v1/did`, `/v1/packages`, `/v1/session/operator`, `/v1/session/revoke`. See `Propershare/workflowware-runtime/docs/WHO-MAY-DID.md`.
- **Surfaces:** `lab` · `library` · `pilot` · `marketplace` · `builder`.
- **What it enforces:** the 6-clause runtime contract (above). 11/11 Isfet pressure-test cases pass on the current build.
- **Relationship to the lab:** the Workflowware Runtime is wrapped around prime-agent via the adapter in `conformance/maatbench/adapters/prime.py`. The lab's MAAT Runtime audits the Workflowware Runtime's receipts. The blast-radius boundary is enforced — the Workflowware Runtime does not import the lab.
- **Public stance:** install detail is published; runtime ports are `127.0.0.1`-bound by default; lab keys are never embedded.
- **Audit receipt:** `evidence/conformance/maatbench-latest.json` on the runtime repo (`PASS`, 11/11 against both targets).

### ChatGPT / Claude project (manual reference)

- **What it is:** the public ChatGPT or Claude "project" / "custom GPT" surface.
- **Best for:** reading the spec, asking the assistant to simulate the workflow against sample data, sanity-checking `approval-rules.md` language.
- **Customer skill:** low to medium.
- **Limitations:** no persistent receipts, no enforced no-go rules beyond the model's alignment. Use only for review, not for production execution.

### Hermes Desktop

- **What it is:** BlackLabRats' operator cockpit. Loads a Workflowware package folder, runs the workflow with the operator present, and writes receipts into the local `runtime/output/` directory.
- **Best for:** guided pilots, operator-led runs, customer demos.
- **Customer skill:** medium (operator runs it; customer watches / approves).
- **Public docs:** see `docs/customer-getting-started.md`.

### n8n + workflow agent nodes

- **What it is:** self-hosted automation platform with agent/LLM nodes. A common DIY stack for technical customers.
- **Best for:** technical customers who want to host the package themselves without a BlackLabRats contract.
- **Customer skill:** medium to high.
- **Notes:** the customer must wire approval rules into n8n's "wait for approval" nodes themselves; Workflowware does not assume n8n-native approval semantics.

### MAAT Runtime (BlackLabRats private lab governance plane)

- **What it is:** the BlackLabRats private lab governance plane. It governs, audits, and certifies the product runtime. Governed memory, artifact registry, approval log, eval tracking, and a recurring improvement loop.
- **Role:** the **lab** side of the three-plane architecture. It is **not** the product runtime. The product runtime is the Workflowware Runtime.
- **Relationship to the product runtime:** MAAT Runtime and the Workflowware Runtime are independent enforcement instances of the same constitution. They share contracts and conformance; they never share code, secrets, identity, policy state, or required services. See `Propershare/workflowware-runtime/BOUNDARY.md`.
- **Public stance:** referenced on this page, never install-instructed on the public site. Internal endpoints are not exposed publicly.

### prime-agent (BlackLabRats lab runtime, body of the Workflowware Runtime adapter)

- **What it is:** the single-node agent runtime that backs the Workflowware Runtime via the adapter. Long-running agent features: persistent IPython kernel, recursive subagents, durable harness state, goals, heartbeats, schedules, executable skills, agent-to-agent messaging.
- **Role:** the **body**. The Ma'at wrap is the Workflowware Runtime; prime-agent is what the adapter wraps.
- **Best for:** the lab side of the adapter. The product runtime (Workflowware Runtime) is what customers actually run.
- **Customer skill:** high (operator-tier; not a customer-facing install).
- **Public stance:** referenced on this page, never install-instructed on the public site. Hostnames, ports, and per-machine ed25519 keys are private lab configuration.

## What a prime-agent Workflowware example package would look like (sketch, not yet published)

When the lab is ready to publish a reference example, the structure will mirror the existing `examples/template-workflowware-package/`:

```text
examples/prime-agent-workflowware/
  README.md              # states prime-agent as the executor; references this page
  workflow-spec.md       # same shape as the spec template
  agent-spec.md          # agent role + tool allow-list + escalation behavior
  approval-rules.md      # human-in-the-loop gates
  no-go-rules.md         # hard prohibitions prime-agent must enforce
  install-guide.md       # operator-tier only; references the lab runtime, not customer setup
  evals/
    eval-template.csv    # golden cases the runtime must pass
  receipts/
    receipt-schema.json  # conforms to the Workflowware receipt contract
  runtime/
    prime-agent.yaml     # declarative executor config (queue, model, approval channel)
  artifact-manifest.json # machine-readable package map
```

Until that example lands in `examples/`, treat any third-party "prime-agent Workflowware" claim as unofficial.

## Adding a new runtime to this page

A new runtime belongs on this page when **all** of these are true:

1. The lab has actually executed a public Workflowware package end-to-end on it, with receipts in `runtime/output/`.
2. The lab can name a person responsible for keeping the runtime notes up to date.
3. The runtime either (a) has a public install path a customer can follow, **or** (b) is clearly labeled "reference only / lab internal" with no public hostnames.
4. The runtime's enforceability of `no-go-rules.md` has been tested at least once against the eval suite.

If any of those are missing, the runtime does not get a row yet. Add it to the backlog in `docs/workflowware-library-roadmap.md` instead.
