# Workflowware Registry: A Trust Operating System for AI Workflows

**Status: north-star vision — not on the near-term roadmap.** See
[`docs/tiers-and-pricing.md`](tiers-and-pricing.md) for what's actually being
sold today (Tier 0–5). This document explains *why* those tiers exist and
where they're headed; it is not a commitment to build the registry next.

## The problem

We can run AI workflows today. We cannot prove they're trustworthy. For any
given run we typically cannot answer, with evidence rather than a claim:

- What exactly ran — which workflow version, which agent, which model?
- Who approved the actions that needed approval?
- Under what policy was each action evaluated?
- What was the result, and does anyone besides the agent's own output say so?
- Was any of this ever security- or conformance-tested before it ran in
  production?

Every "AI agent platform" answers some of these informally, in logs nobody
audits. None of them make the answers structurally unavoidable.

## The vision

Workflowware is not a marketplace. It is not "store and run." The registry
this document describes is:

```text
register  ->  verify  ->  govern  ->  execute  ->  audit
```

A workflow package is registered with a hash and identity before it is
trusted with anything. It is verified against declared checks. It is
governed by policy that can require human approval or hard-refuse. It
executes under that governance. Every run produces audit evidence — not a
log line an agent could have fabricated, but a receipt a third party can
verify without trusting the agent that wrote it.

## Object model

Every workflow, agent, skill, tool, model, policy, receipt, and artifact is
an object: identity, version, hashes, dependencies, lifecycle.

This is not a new invention — most of it already exists, split across two
repos:

| Object class | Where it's defined today |
|---|---|
| Package manifest (title, type, status, files, related artifacts) | [`MANIFEST.schema.json`](../MANIFEST.schema.json), [`artifact-manifest.json`](../artifact-manifest.json) |
| Runtime/agent profile (identity, dependencies, policy hooks) | [`workflowware-runtime/schemas/maat-profile.schema.json`](https://github.com/Propershare/workflowware-runtime/blob/main/schemas/maat-profile.schema.json) |
| Agent/machine/principal identity, with birth receipts | [`workflowware-runtime/ww_runtime/identity.py`](https://github.com/Propershare/workflowware-runtime/blob/main/ww_runtime/identity.py) — `IdentityRegistry` |

**Gap:** none of these currently carry a content hash of the *package
artifact itself* (the zip/tarball a customer downloads). That's the
missing piece for package-level provenance — see "package trust" below.

## Event system

Everything is an event, and events are append-only:

```text
created -> published -> certified -> executed -> failed -> revoked
```

`created`, `published`, `executed`, and `failed` already have a real,
working implementation: [`workflowware-runtime/ww_runtime/evidence.py`](https://github.com/Propershare/workflowware-runtime/blob/main/ww_runtime/evidence.py)'s
`EvidenceLedger` records every action as a hash-chained receipt, and
`.verify()` recomputes the chain and returns `False` if any entry was
altered after the fact — replayable and tamper-evident today, not aspirational.

**`certified` and `revoked` do not exist yet.** This is the actual gap this
document is naming, not a restatement of shipped code:

- **Certified** needs a certifying authority distinct from the package
  author — someone (or something) that runs the conformance suite against a
  package and signs the result. Nothing today plays that role for
  Workflowware packages specifically, though
  [`workflowware-runtime/conformance/prove_runtime_boundary.py`](https://github.com/Propershare/workflowware-runtime/blob/main/conformance/prove_runtime_boundary.py)
  is the closest working precedent — it already certifies a *runtime's*
  boundary compliance, just not a *package's*.
- **Revoked** needs a revocation list a runtime checks before executing a
  package, and a reason code. Nothing today stops a runtime from executing a
  package whose certification has since been pulled.

## Trust layers

Identity trust, package trust, dependency trust, runtime trust, execution
trust.

- **Identity and execution trust**: implemented — `identity.py` +
  [`workflowware-runtime/ww_runtime/policy.py`](https://github.com/Propershare/workflowware-runtime/blob/main/ww_runtime/policy.py)'s
  allow / require-human / deny evaluation, with NO_GO rules taking precedence
  over any later instruction.
- **Runtime trust**: implemented at the boundary level — see Security model
  below.
- **Package and dependency trust**: open. There is no signing or hashing
  pipeline yet for the package artifact itself, and no dependency graph
  between packages (a package that installs another package, or requires a
  specific runtime version, isn't expressible yet).

Certification is not meant to be a gold star. It is a published set of
evidence — the specific checks that were run, against which version, with
which result — that anyone can re-verify independently. A badge with
nothing behind it is worse than no badge.

## Security model

Assume compromise. Design around it. No secrets in the registry — proofs
instead.

This is the same instinct already load-bearing in
[`workflowware-runtime/BOUNDARY.md`](https://github.com/Propershare/workflowware-runtime/blob/main/BOUNDARY.md):
a compromised customer deployment must have no path into the lab's broker
keys, because blast radius — not convenience — is the design constraint. A
registry built on the same instinct would hold hashes, signatures, and
receipts, never credentials; a compromised registry entry should be able to
lie about *nothing* a verifier can independently check.

## Prior art — what exists, what's missing

| System | Solves | Doesn't solve (for us) |
|---|---|---|
| GitHub / Docker Hub | Distribution, versioning, discoverability | No workflow-level governance or execution-trust model |
| Temporal / LangGraph / CrewAI | Workflow orchestration and execution | Not a trust or provenance layer — assumes the workflow is already trusted |
| in-toto | Supply-chain step attestation, exactly the "prove what ran" problem | Built for build pipelines, not long-running governed agent workflows with human-approval gates |
| SLSA | Provenance levels for build artifacts | Same shape as in-toto — no native concept of a human-approval policy tier or a NO_GO hard stop |
| CycloneDX | Dependency graph / SBOM format | Describes what a package depends on, not what it's allowed to do or who approved it running |
| OpenTelemetry | Event/trace format, widely adopted | A trace is not a receipt — nothing about OTel makes a span tamper-evident or policy-aware |

None of these are wrong to reuse. The honest position: package-hash and
dependency-graph formats should probably *be* CycloneDX rather than a new
format; event traces should probably be OTel-compatible where they overlap.
The genuinely novel part is small and specific — a certification/revocation
state machine and a policy-aware, tamper-evident receipt tied to
human-approval gates — not the whole stack.

## The research question

> Can AI workflows become verifiable digital infrastructure through
> standardized provenance, governance, and certification?

That's the north star. The registry is where the trust would live — if and
when it gets built. Today, `workflowware-runtime`'s three planes
(identity/policy/evidence) are the proof-of-concept that the hard parts
work locally, per-runtime. The registry is what it would look like to make
that trust checkable *between* runtimes, not just within one.
