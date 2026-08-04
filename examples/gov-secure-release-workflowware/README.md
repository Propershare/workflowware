# Gov Secure Release Workflowware

Governed release assurance for teams selling software (or SaaS) into US public-sector and regulated buyers.

**Status:** draft package (`v0.1`) — readable and evaluable; not a live self-serve pilot.  
**Snapshot date:** 2026-08-04  
**Audience:** product/security leads, contractors, consultants, AI agents assembling release evidence.

## What it returns

- release inventory (components + versions);
- SBOM checklist + gap notes;
- vulnerability / VEX status notes (no invented CVE dispositions);
- provenance / build-integrity checklist;
- SSDF practice coverage map (NIST SP 800-218);
- human approval questions;
- a **release receipt** draft (unsigned until a human signs);
- policy currency banner (`policy_snapshot_date`, stale risk).

## What it does not return

- FedRAMP authorization;
- CMMC certification;
- agency Authority to Operate (ATO);
- legal advice;
- automatic signing or deployment.

## Why this exists (2026 posture)

OMB **M-26-05** (2026-01-23) moved federal software/hardware assurance to an **agency risk-based** model and **rescinded** M-22-18 / M-23-16 as government-wide attestation mandates. Buyers still ask for evidence: SBOM, secure development practices, provenance, vulnerability handling. This package packages that evidence workflow for humans and agents.

## Device note

Phone: review outputs and approve/reject. Computer: inspect files, run evals, attach real SBOM/provenance artifacts.

## AI agent instructions

1. Read `AGENTS.md` and `approval-rules.md` first.  
2. Use `evals/` and `templates/sample-release/` before live product data.  
3. Never fabricate digests, signatures, or CVE status.  
4. Always show policy snapshot date; if >90 days old, say so.  
5. Draft only; humans sign and ship.

## Package map

| File | Role |
|------|------|
| `AGENTS.md` | Agent operating law |
| `llms.txt` | Compact machine brief |
| `workflow-spec.md` | Job definition |
| `agent-spec.md` | Role + I/O |
| `approval-rules.md` | Human gates / NO_GOs |
| `install-guide.md` | How to run |
| `agent-handoff.md` | Next agent brief |
| `policy/CURRENT-POLICY.md` | Dated federal posture |
| `policy/SOURCE-LEDGER.md` | Sources + retrieved dates |
| `artifact-manifest.json` | Machine catalog |
| `evals/` | Boundary cases |
| `templates/` | Receipt + checklists |
