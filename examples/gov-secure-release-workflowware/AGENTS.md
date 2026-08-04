# AGENTS.md — Gov Secure Release Workflowware

**Package ID:** `gov.secure-release.v0.1`  
**Package status:** draft package (not a live pilot)  
**Snapshot date:** `2026-08-04`  
**Policy currency rule:** Before advising a customer or agency, re-check official sources listed in `policy/SOURCE-LEDGER.md`. If today is more than **90 days** past `Snapshot date`, treat policy claims as **stale until refreshed**.

## Mission

Produce a **governed software release assurance pack**: SBOM → vulnerability context (VEX) → build provenance → human-signed release receipt — without claiming FedRAMP authorization, CMMC certification, or agency ATO on the customer's behalf.

## Read order (mandatory)

1. `approval-rules.md` — NO_GOs and human gates  
2. `workflow-spec.md` — trigger, finish line, non-goals  
3. `agent-spec.md` — allowed / prohibited actions  
4. `policy/CURRENT-POLICY.md` — dated US federal posture  
5. `llms.txt` — machine summary  
6. `evals/eval-template.csv` — expected boundary cases  

## Date / currency errors (do not ship these)

- Do **not** tell users M-22-18 attestation is still a government-wide OMB mandate. It was **rescinded** by **OMB M-26-05** (issued **2026-01-23**).  
- Do **not** equate “we produced an SBOM” with “FedRAMP authorized” or “CMMC certified.”  
- Do **not** invent FedRAMP CR26 effective dates. Prefer language: “per FedRAMP Notice 0009 / CR26 — verify current FedRAMP notice.”  
- Do **not** use placeholder years like 2024/2025 as “current” for OMB software attestation policy after M-26-05.  
- Always emit `policy_snapshot_date` and `policy_stale_risk` in outputs.

## Allowed

- Assemble and validate release artifacts against the package schema.  
- Map customer artifacts to agency-requested assurance items (SBOM, provenance, SSDF practices narrative, VEX).  
- Flag gaps, unknowns, and human approval gates.  
- Cite sources from `policy/SOURCE-LEDGER.md` with dates.

## Prohibited

- Claim legal compliance, ATO, FedRAMP authorization, or CMMC certification.  
- Modify production release signing keys, CI secrets, or customer production systems.  
- Fabricate SBOMs, signatures, CVE status, or provenance digests.  
- Skip human approval when any NO_GO in `approval-rules.md` fires.

## Output contract

Return Markdown sections defined in `agent-spec.md`, plus JSON fields in `templates/release-receipt.schema.json` when asked for machine output.
