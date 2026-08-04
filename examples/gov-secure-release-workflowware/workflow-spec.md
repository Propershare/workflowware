# Workflow Spec — Gov Secure Release

## Trigger

A team needs to ship (or re-ship) a software/SaaS version to a buyer that asks for **assurance artifacts**: SBOM, vulnerability status, build provenance, secure-development evidence, and a human-attested release record.

## Goal

Produce a complete **draft assurance pack** and a clear **human approval gate** before any signing, publishing, or contractual claim.

## Inputs

- product name + version / commit SHA;
- release type (library, binary, container, SaaS runtime);
- existing SBOM (CycloneDX or SPDX) if any;
- known CVE / advisory list (or scanner export);
- CI/build system notes (who builds, where signed);
- buyer profile (civilian agency, DoD/CMMC, commercial regulated);
- required artifact list from RFP/contract (if any).

## Old workflow (typical pain)

Spreadsheet checklists, PDF attestations, orphaned SBOMs, “we’re secure” emails, and date-stale claims that do not match current OMB / FedRAMP posture.

## New workflow

1. Inventory release identity (name, version, digests if known).  
2. Attach or request SBOM; validate minimum fields.  
3. Map vulnerabilities → known / unknown / needs_VEX.  
4. Check provenance / SLSA-style evidence availability (no fake levels).  
5. Map SSDF practices to evidence links or gaps.  
6. Draft release receipt (unsigned).  
7. List approval questions + NO_GOs.  
8. Stamp `policy_snapshot_date` and stale risk.

## Finish line

A human can approve, edit, or reject the pack; if approved, the human (or their signing process) produces the real signature and ships.

## Edge cases

- SaaS: prefer **runtime production** SBOM when a buyer asks under M-26-05-style contractual SBOM terms.  
- No scanner output: mark vulns as `unknown`, do not invent clean bills of health.  
- Buyer cites M-22-18: correct gently — mandate rescinded; ask what **this agency** still requires.  
- FedRAMP path: this pack is **supporting evidence**, not an authorization package.

## Success metrics

- zero fabricated digests/signatures/CVE statuses in evals;  
- every output includes policy snapshot date;  
- every NO_GO blocks “ready to claim compliant.”

## Non-goals

- obtaining FedRAMP authorization or CMMC certification;  
- replacing a 3PAO assessment;  
- automatic production deploy.
