# Source Ledger

Package snapshot: **2026-08-04**. Re-verify URLs before customer-facing commitments.

| ID | Source | Retrieved / noted | Use |
|----|--------|-------------------|-----|
| OMB-M-26-05 | https://www.whitehouse.gov/wp-content/uploads/2026/01/M-26-05-Adopting-a-Risk-based-Approach-to-Software-and-Hardware-Security.pdf | 2026-08-04 (secondary confirm via multiple legal analyses dated 2026-02) | Primary policy shift; rescinds M-22-18 / M-23-16 mandate |
| FR-NTC-0009 | https://www.fedramp.gov/notices/0009/ | 2026-08-04 (via public summaries + notice metadata 2026-03-25) | Rev5 machine-readable package direction; verify CR26 |
| FR-RFC-0024 | https://www.fedramp.gov/rfcs/0024/ | 2026-08-04 | Proposal history; superseded in part by Notice 0009 / CR26 |
| NIST-800-218 | NIST SP 800-218 SSDF | standing reference | Practice map vocabulary |
| CISA-SSDA | CISA Secure Software Development Attestation Form materials | discretionary under M-26-05 | Optional agency tool |
| SLSA | https://slsa.dev/ | standing reference | Provenance vocabulary only |
| CSAF-VEX | OASIS CSAF / VEX docs | standing reference | Vulnerability status |

## Refresh checklist

When refreshing this package:

1. Open M-26-05 PDF; confirm it is still current or note successor.  
2. Open FedRAMP notices + CR26; update deadline language.  
3. Update `snapshot_date` in `AGENTS.md`, `llms.txt`, `artifact-manifest.json`, `CURRENT-POLICY.md`.  
4. Bump package version if normative claims change.  
5. Re-run `evals/eval-template.csv` cases `pol-001` and `pol-002`.
