<div align="center">

# Workflowware™

### Software packaged as agent-operable workflows.

<p>
  <a href="https://propershare.github.io/workflowware/"><strong>Live site</strong></a>
  ·
  <a href="SPEC.md"><strong>Spec v0.1</strong></a>
  ·
  <a href="MANIFEST.schema.json"><strong>Manifest schema</strong></a>
  ·
  <a href="examples/"><strong>Examples</strong></a>
</p>

<p>
  <img alt="Status" src="https://img.shields.io/badge/status-public%20draft-b8ff5c?style=for-the-badge&labelColor=101620">
  <img alt="Mark" src="https://img.shields.io/badge/mark-Workflowware%E2%84%A2-5ee7ff?style=for-the-badge&labelColor=101620">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-f7fbff?style=for-the-badge&labelColor=101620">
</p>

</div>

---

## The idea

**Workflowware™** is a portable package for real work: the instructions, specs, evals, approval rules, templates, install path, and agent handoff needed for agents and humans to operate a workflow together.

> **Prompts are ingredients. Agents are workers. Workflowware is the operating package.**

Software used to ship as apps. Agents shift the unit of distribution toward governed workflow packages.

---

## Agentic Workflow Distribution

**Agentic Workflow Distribution** is the practice of packaging business workflows as portable artifacts that include:

| Layer | Purpose |
|---|---|
| Human trust surface | Explain what the package does, why it exists, and how it is controlled. |
| Workflow spec | Define the trigger, context, old workflow, new workflow, finish line, edge cases, and success metrics. |
| Agent spec | Define the role, inputs, tools, allowed actions, prohibited actions, output schema, and escalation behavior. |
| Governance | Define approval rules, safety boundaries, audit trails, and non-autonomous zones. |
| Evals | Provide examples and expected behavior so the workflow can be tested and improved. |
| Manifest + handoff | Give future agents and humans a machine-readable package map. |

---

## Minimum package structure

```text
workflowware-package/
  README.md
  index.html
  workflow-spec.md
  agent-spec.md
  install-guide.md
  approval-rules.md
  eval-template.csv
  agent-handoff.md
  artifact-manifest.json
```

---

## Start here

| Resource | What it is |
|---|---|
| [`SPEC.md`](SPEC.md) | Workflowware package spec v0.1. |
| [`MANIFEST.schema.json`](MANIFEST.schema.json) | Machine-readable manifest schema. |
| [`docs/manifesto.md`](docs/manifesto.md) | Category manifesto and origin language. |
| [`docs/customer-getting-started.md`](docs/customer-getting-started.md) | Plain-language guide for customers who know nothing about agents: what to download, where, phone vs computer, and guided pilot options. |
| [`docs/best-practices.md`](docs/best-practices.md) | Best practices for publishing packages that work for nontechnical customers and AI-agent buyers/operators. |
| [`docs/ai-agent-buyer-guide.md`](docs/ai-agent-buyer-guide.md) | Instructions for AI agents that inspect, download, test, purchase, or operate Workflowware packages for humans. |
| [`docs/tiers-and-pricing.md`](docs/tiers-and-pricing.md) | Free spec / paid implementation tier ladder. |
| [`docs/interim-brand-protection.md`](docs/interim-brand-protection.md) | No-budget `Workflowware™` usage plan until trademark filing is funded. |
| [`examples/`](examples/) | Starter examples and package skeletons. |

---

## Public site

The current public preview is live here:

```text
https://propershare.github.io/workflowware/
```

Target custom domain:

```text
workflowware.org
```

`workflowware.org` still needs GoDaddy DNS pointed to GitHub Pages. After DNS is changed, add a `CNAME` file containing:

```text
workflowware.org
```

---

## Free spec, scoped implementation

| Layer | Public stance | Purpose |
|---|---|---|
| Workflowware Spec | Free/open | Public definition, package structure, templates, manifest examples, and handoff examples. |
| Starter Kit | Planned | Polished templates, intake forms, teardown worksheets, approval rules, evals, and example packages. |
| Workflowware Blueprint | Scoped service | Old-way/new-way map, risk notes, opportunity map, and implementation path for one workflow. |
| AI Workflow Operating Kit | Scoped service | A real package with specs, install guide, evals, approval rules, handoff, and visual artifact. |
| MAAT-backed System | Partner/pro | Governed memory, artifact registry, eval tracking, approval logs, and recurring improvement loop. |
| Installer Program | Partner/training | Training for operators, freelancers, consultants, and agencies. |

Exact service pricing is intentionally not published here. Pricing depends on workflow complexity, risk, integrations, review requirements, and support level.

---

## MAAT Runtime relationship

Workflowware is intended to be stack-neutral.

BlackLabRats uses **MAAT Runtime** as the private/pro foundation for professional Workflowware systems:

```text
workflowware.org              public category/spec surface
propershare/workflowware      public repo/spec/templates
BlackLabRats                  service/training brand
MAAT Runtime                  private/pro governance + memory foundation
Hermes                        operator/agent cockpit
```

Short version:

> **Workflowware.org defines the package. MAAT Runtime powers the professional operating layer.**

---

## Interim trademark position

Until a federal trademark application is funded and filed, use:

```text
Workflowware™
```

Do **not** use:

```text
Workflowware®
```

The goal is to publish a clear public usage trail without overclaiming registration.

---

## What we claim

We are defining and practicing the artifact layer for agentic workflow distribution:

```text
human trust surface
+ workflow spec
+ agent spec
+ evals
+ governance
+ install guide
+ manifest
+ memory / handoff
= Workflowware package
```

## What we do not claim

We do **not** claim to have invented agents, prompts, skills, automation templates, SaaS, or workflow tools.

The claim is narrower:

> The missing layer is the governed, agent-operable workflow artifact that packages the job itself.

---

## Maintainer

Maintained by **BlackLabRats / propershare**.
