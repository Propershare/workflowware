# Install Guide

## 1. Open the package

Clone or download Workflowware and open:

`examples/gov-secure-release-workflowware/`

## 2. Read gates

Read `AGENTS.md` → `approval-rules.md` → `workflow-spec.md`.

## 3. Dry run with fixtures

Use `templates/sample-release/` and `evals/eval-template.csv`. Do not connect production CI.

## 4. Attach real artifacts (human)

- SBOM (CycloneDX JSON or SPDX)  
- Scanner export or advisory list  
- Provenance attestation or build log pointer  
- Signing key policy (who signs; do not paste private keys)

## 5. Produce draft receipt

Have the agent fill `templates/release-receipt.md` without signing.

## 6. Human gate

Security/release owner answers approval questions, signs outside this package, and archives the pack with the release.

## 7. Policy refresh

If `policy/CURRENT-POLICY.md` snapshot is >90 days old, refresh sources in `SOURCE-LEDGER.md` before customer use.
