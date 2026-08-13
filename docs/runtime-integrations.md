# Runtime Integrations

Workflowware™ is **stack-neutral**. A package is a portable set of specs, rules, evals, approvals, and handoff material. Any runtime that can read those files, respect the approval rules, and write a conforming receipt can execute a Workflowware package.

This page lists runtimes the lab has actually wired up and tested against the public package shape, plus a neutral contract a runtime must satisfy to be considered a valid executor.

## TL;DR

| Runtime | Surface | Lab relationship | Public docs? |
|---|---|---|---|
| ChatGPT / Claude project | Web UI, no install | Reference manual path | yes |
| Hermes Desktop | Operator cockpit, local | BlackLabRats operator tool | yes |
| n8n + workflow agent nodes | Self-hosted automation | Common customer stack | yes |
| **MAAT Runtime** | Governed memory + artifact registry | BlackLabRats private/pro foundation | reference only |
| **prime-agent** | Governed single-node agent runtime, ed25519 identity, audit trail | BlackLabRats lab runtime (staydangerous) | reference only |

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

### MAAT Runtime (BlackLabRats private/pro)

- **What it is:** the BlackLabRats private/pro governance and memory foundation. Governed memory, artifact registry, approval log, eval tracking, and a recurring improvement loop.
- **Best for:** professional installs that need durable audit trails, multi-tenant memory, and recurring package improvement.
- **Customer skill:** low (BlackLabRats runs it; customer approves outputs).
- **Public stance:** referenced on this page, never install-instructed on the public site. Internal endpoints are not exposed publicly.

### prime-agent (BlackLabRats lab runtime)

- **What it is:** the BlackLabRats single-node governed agent runtime. Per-machine ed25519 identity, agent-protocol auto-reporting (`memory_start_session` / `memory_log_event` / `memory_log_audit`), constitutional compliance hooks, and a portable artifact bank.
- **Best for:** lab work, internal pilots, and any package execution that needs a tamper-evident audit trail and per-agent memory isolation without the full MAAT multi-tenant memory stack.
- **Customer skill:** high (operator-tier; not a customer-facing install).
- **Relationship to MAAT Runtime:** prime-agent is the **single-node lab runtime**; MAAT Runtime is the **multi-tenant professional foundation**. They are siblings, not replacements. prime-agent writes receipts that MAAT Runtime can ingest when a customer is upgraded to a pro install.
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
