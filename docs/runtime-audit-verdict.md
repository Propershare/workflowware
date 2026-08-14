# Runtime audit verdict

> This is the public summary. The canonical receipts (per-org proof, per-case
> MaatBench score, conformance boundary result, git_sha on every receipt)
> live in the private runtime repo at `Propershare/workflowware-runtime`
> on the `feature/public-doc-graft` branch, commit `08f2cd4`. The runtime
> repo is private by design — see `BOUNDARY.md` in that repo for the
> blast-radius boundary contract.

**Public-facing line:**

> Workflowware Runtime runs the product. Ma'at Runtime governs conformance, audit, and proof.

## The audit

The audit asked one question: *is the Workflowware Runtime interchangeable with a Prime Agent-based runtime under the Ma'at constitution?*

The Method:

- 11 Isfet pressure-test cases covering constitution, policy, identity, evidence, skill gating, subagent authority, memory quarantine, autonomous budget/NOGO, storage mount, and receipt-with-git-sha.
- Two targets: the existing Workflowware Runtime (`src.*`) and a Prime Agent adapter (`adapters/prime.py`).
- A conformance runner that emits a combined JSON receipt chain every run.

## The verdict

| Runtime | MaatBench score | Status |
|---|---|---|
| Workflowware Runtime (current) | 11/11 | PASS |
| Prime Agent (via adapter) | 11/11 | PASS |
| Promotion gate | both pass | **PASS** |

## The four-organ table

The Ka organ map shows every organ survives the wrap. (The full per-organ
table is in `Propershare/workflowware-runtime/docs/KA-ORGAN-MAPPING.md`.)

| Organ | Status |
|---|---|
| Soul (constitution) | Adapter enforces BOUNDARY.md on boot |
| Policy (gate) | Adapter's deterministic allowlist |
| Brain (reasoning) | Prime Agent brings it |
| Memory (mediated) | Adapter writes to a gated ledger |
| Hands (tools) | Adapter's policy gate wraps every tool call |
| Blood (receipts) | Adapter writes validated receipts |

## What this means

Prime Agent is **not** the runtime. Prime Agent is the runtime *body*. The Workflowware Runtime is the *wrap*. The wrap preserves the constitution; the body supplies the long-running-agent features (subagents, schedules, heartbeats, IPython kernel, tools).

The promotion is a **wrap**, not a swap. The boundary contract holds.

## Reading the receipts

If you want to verify the audit, the canonical receipts are in the private runtime repo. To read them, you need read access to `Propershare/workflowware-runtime`. That is the lab's intentional posture: the runtime repo holds the engine, the receipts, and the boundary contract; the public repo holds the spec, the package examples, and the public doctrine. Conflating them is the blast-radius failure mode the boundary contract was written to prevent.

If you want to **run** the audit yourself (the recipe travels):

```bash
git clone git@github.com:Propershare/workflowware-runtime.git
cd workflowware-runtime
git checkout feature/public-doc-graft
python3 conformance/maatbench/run_all.py
```

The output is a `maatbench: PASS` line plus a `evidence/conformance/maatbench-latest.json` receipt with `promotion_gate.verdict: PASS`.

## The long line

The body is Prime Agent. The wrap is Workflowware Runtime. The law is Ma'at. The proof is the receipt.
