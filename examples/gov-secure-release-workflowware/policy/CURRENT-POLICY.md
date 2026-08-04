# Current Policy Snapshot — US Federal Software Assurance

**Package snapshot date:** 2026-08-04  
**Stale after:** 2026-11-02 (90 days)  
**Refresh owners:** humans maintaining this package; agents must re-verify before high-stakes advice.

This document is a **working brief**, not legal advice and not an official government publication.

## 1. OMB M-26-05 (primary 2026 shift)

- **Issued:** 2026-01-23  
- **Title:** Adopting a Risk-based Approach to Software and Hardware Security  
- **Effect:** Rescinds **M-22-18** and **M-23-16** as government-wide mandates for collecting the standardized secure software development attestation before use.  
- **New posture:** Each agency head is responsible for software **and hardware** assurance via risk assessment tailored to mission needs.  
- **Still available (discretionary):** CISA Secure Software Development Attestation Form resources; NIST SSDF; contractual SBOM requests (for cloud, prefer **runtime production** SBOM when agencies adopt SBOM terms).

**Agent language:** Prefer “agency may require X under its risk policy” over “OMB requires attestation from all vendors.”

## 2. Secure development practice reference

- **NIST SP 800-218** Secure Software Development Framework (SSDF) remains the common practice vocabulary.  
- Map practices to evidence; do not claim “SSDF certified” (there is no such federal stamp in this package).

## 3. SBOM

- Agencies may contractually require a current SBOM.  
- Prefer CycloneDX or SPDX with component name, version, supplier, and unique identifiers.  
- Track CISA / NTIA minimum-elements guidance; verify latest CISA SBOM minimum elements document at refresh time (draft updates have appeared in 2025–2026 cycles).

## 4. FedRAMP (cloud authorization track — separate job)

- FedRAMP **Notice 0009** (published **2026-03-25**): initial outcome of RFC-0024 on Rev5 machine-readable packages; binding detail expected via **Consolidated Rules for 2026 (CR26)**.  
- Comprehensive machine-readable authorization data emphasized for Rev5 **Class D (High)**; Classes A/B/C move toward semi-structured text (DOCX/XLSX retirement direction).  
- **Deadlines:** treat third-party summaries as unverified; always confirm on [fedramp.gov notices](https://www.fedramp.gov/notices/) and CR26 before customer commitments.  
- This Workflowware pack is **not** a FedRAMP authorization package.

## 5. CMMC (DoD / CUI — separate job)

- Cybersecurity Maturity Model Certification remains relevant for DoD contractors handling CUI.  
- Do not collapse CMMC levels into “gov secure release complete.”

## 6. Provenance / integrity

- Prefer verifiable build provenance (e.g., SLSA-aligned attestations, signed digests) when buyers ask “how was this built?”  
- Never invent SLSA levels.

## 7. VEX / vulnerability disclosure

- Pair SBOM with vulnerability status (CSAF/VEX or equivalent) when claiming “not affected.”  
- Unknown ≠ fixed.

## Correction table (common date errors)

| Wrong claim | Correct (as of 2026-08-04) |
|-------------|----------------------------|
| “M-22-18 still requires attestation for all federal software” | Rescinded by M-26-05 (2026-01-23); agency discretion |
| “SBOM = FedRAMP authorized” | False; different regimes |
| “This pack certifies CMMC Level 2” | False; out of scope |
| Using 2023–2024 OMB attestation timelines as current law | Superseded for the government-wide mandate |
