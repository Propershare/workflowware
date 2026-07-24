# Workflowware Library

The Workflowware™ library is a collection of governed workflow packages that can be inspected by humans and AI agents, tested with sample data, and installed through a guided fulfillment process.

The library is organized into shelves so customer-facing packages, internal operator kits, research systems, runtime tooling, and training material do not get mixed together.

## Category shelves

| Shelf | Audience | Purpose |
|---|---|---|
| Customer Pilot Packages | Customers who know zero about agents, AI-agent buyers, human operators | Test concrete business workflows and create revenue opportunities. |
| Research Workflowware | Research agents, Hermes, MAAT runtime, human research operators | Make research disciplined, tagged, evidence-backed, and reusable. |
| Operator Workflowware | BlackLabRats operators, Hermes, MAAT agents | Fulfill pilots, process intake, analyze feedback, and standardize delivery. |
| Runtime / Pro Workflowware | Backend/server agents, private MAAT runtime, advanced operators | Govern memory, artifacts, approvals, evals, and runtime execution. |
| Training / Installer Workflowware | Freelancers, consultants, agent operators, trainees | Teach people and agents how to package, install, sell, and govern Workflowware. |

---

## Customer Pilot Packages

These packages are public/revenue-test packages. They should be understandable by nontechnical customers and safe for AI agents to inspect.

### Missed Lead Recovery Workflowware

- **Status:** live pilot
- **Audience:** home-service businesses, local operators, consultants, AI-agent evaluators
- **Purpose:** triage missed leads and draft safe follow-ups for human approval.
- **Start:** [pilot page](../pilot.html)
- **Download:** [tester ZIP](../downloads/missed-lead-recovery-workflowware-v0.1.zip)
- **Package:** [`examples/missed-lead-recovery-workflowware/`](../examples/missed-lead-recovery-workflowware/)

### Review Response and Reputation Recovery Workflowware

- **Status:** next package candidate
- **Audience:** local businesses with public reviews, local SEO operators, service businesses
- **Purpose:** draft safe review responses, classify risk, and identify escalation boundaries.
- **Safety rule:** draft only; do not post publicly without human approval.

### Additional candidates

1. Estimate Follow-Up Workflowware
2. Inbox Triage Workflowware
3. Customer Intake Cleanup Workflowware
4. Content Repurposing Workflowware

---

## Research Workflowware

Research Workflowware packages help agents and humans produce evidence-backed work instead of loose summaries. They support every other shelf in the library.

### Tehuti Research Kit

- **Status:** internal/pro MAAT artifact
- **MAAT ID:** `9f4e1017-ae33-40d1-86ab-8883605d7113`
- **Artifact type:** `research_kit`
- **Purpose:** best research stack for MAAT/Hermes agents: evidence bank, Art of Research method registry, KA2 methodology, evidence tagger, and MAAT evidence CLI.
- **Audience:** research agents, Hermes, MAAT runtime, human research operators.
- **Public safety:** this public entry is a sanitized catalog record. Private server paths, raw evidence stores, and operational scripts remain in the private MAAT/server environment until explicitly exported.

Core discipline:

```text
find → tag → verify → bank
```

Research rules:

- use Art of Research registry IDs for `methods_used[]`;
- treat KA2 as one method, not the umbrella for all research;
- keep source channels separate from research methods;
- bank evidence with recoverable source and artifact metadata;
- do not store secrets or private client data in public research artifacts.

Related internal/pro research components:

| Component | MAAT ID | Role |
|---|---|---|
| Evidence Bank — Maat-runtime Research Lane | `5685ab29-a4ce-4910-9502-aa7543e85e31` | Central tagged-evidence bank for research agents. |
| UKMT Art of Research — Method Registry | `2c9598c0-2dc2-4863-9821-ee605035e8bf` | Registry of valid research method IDs. |
| KA2 Methodology | `86a66d16-115c-4dff-9e8e-70b94aaea328` | Dialectical research methodology; KA2, not legacy KAZ. |
| Tehuti Lab Spine — Every-Agent Catalog | `820f1a2e-e2cc-4b8e-a92b-271ec79b5885` | Orientation catalog for lab agents. |

### Last30Days Research Radar

- **Status:** installed research capability
- **Purpose:** collect current market/pain-language signals from recent online discussion.
- **Workflowware role:** source-channel gathering, not a substitute for Art of Research method tagging.

---

## Operator Workflowware

Operator packages run the business side of Workflowware delivery.

Planned entries:

- Workflowware Pilot Fulfillment Workspace
- Workflowware Customer Intake Processor
- Workflowware Feedback Analyzer
- Workflowware Package Builder
- Workflowware QA Checklist

Operator packages should include intake templates, status files, audit expectations, sample outputs, and handoff notes for server/runtime agents.

---

## Runtime / Pro Workflowware

Runtime/pro packages are private or partner-level packages that rely on MAAT-style governance, memory, artifacts, and approvals.

Current/planned entries:

- MAAT Workflowware Loader
- MAAT Profile Schema
- Workflowware Control Layer
- Evidence Bank Runtime
- Artifact Registry Connector
- Approval Audit Logger

These packages may reference private runtime capabilities. Public docs should explain the concept without exposing server paths, credentials, memory endpoints, or client data.

---

## Training / Installer Workflowware

Training packages teach humans and agents how to package and install Workflowware safely.

Current docs and planned packages:

- Python Coding Starter Workflowware — beginner-safe 30-day Python starter kit for learners, mentors, and AI tutors.
- [Customer getting started](customer-getting-started.md)
- [AI agent buyer/operator guide](ai-agent-buyer-guide.md)
- [Best practices](best-practices.md)
- Workflowware Installer Program
- Customer Zero-Agent Onboarding
- Workflowware Sales Teardown Kit

### Python Coding Starter Workflowware

- **Status:** draft-ready training kit
- **MAAT ID:** `25027e2e-1c08-454d-99d5-5504118a353d`
- **Audience:** brand-new Python learners, mentors, AI tutors, BlackLabRats training operators
- **Purpose:** a 30-day beginner path with setup guide, first lesson, practice exercises, mini-projects, mentor guide, progress tracker, and agent handoff.
- **Public safety:** educational only; no secrets, no paid API dependency, no offensive security automation. Defensive/security examples use owned or sample files only.

---

## Library planning

- [Library roadmap](workflowware-library-roadmap.md)
- [Best practices](best-practices.md)
- [Customer getting started](customer-getting-started.md)
- [AI agent buyer/operator guide](ai-agent-buyer-guide.md)
- [Testing guide](testing-guide.md)

## Package template

- [`templates/workflowware-package-template/`](../templates/workflowware-package-template/)

Every package must include sample-data-first testing, human approval boundaries, phone/computer guidance, and AI-agent handoff instructions.
