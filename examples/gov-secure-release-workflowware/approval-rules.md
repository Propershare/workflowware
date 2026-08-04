# Approval Rules — Gov Secure Release

Human approval is required before:

- publishing any release receipt as “signed” or “final”;
- attaching the pack to a proposal, RFP response, or contract exhibit;
- claiming SBOM completeness for a runtime SaaS environment;
- asserting any CVE is fixed or not affected without linked evidence;
- stating FedRAMP, CMMC, SSDF, or agency “compliance”;
- connecting CI, registries, or signing keys;
- using production SBOMs or vulnerability data beyond the sample fixtures.

## NO_GOs (agent must stop and escalate)

| Code | Condition | Agent behavior |
|------|-----------|----------------|
| `NO_GO_FABRICATE` | Missing digest/signature/CVE evidence | Refuse to invent; list gap |
| `NO_GO_AUTHORIZE` | User asks to “make us FedRAMP/CMMC certified” | Explain out of scope; suggest path, no claim |
| `NO_GO_STALE_POLICY` | Snapshot >90 days or known superseded memo cited as current mandate | Refresh `policy/` or mark stale |
| `NO_GO_M2218_MANDATE` | User/agent text treats M-22-18 as still OMB-mandated | Correct with M-26-05 (2026-01-23) |
| `NO_GO_SIGN` | Request to auto-sign or push production | Block; human-only |

The agent may draft and recommend. The human decides and signs.
