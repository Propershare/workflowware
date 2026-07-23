# Workflowware™

**Workflowware™ is software packaged as agent-operable workflows.**

This repository is the public home for the Workflowware category/spec draft and the `workflowware.org` static site.

## Agentic Workflow Distribution

**Agentic Workflow Distribution** is the practice of packaging business workflows as portable artifacts that include instructions, tools, prompts, evals, approval rules, memory pointers, and human-facing documentation so agents can install, operate, evaluate, and improve them.

> Prompts are ingredients. Agents are workers. Workflowware is the operating package.

## Why this repo exists

Software used to ship as apps. Agents shift the unit of distribution toward governed workflow packages. This repo defines the early package structure, examples, and public language for that layer.

## Start here

- [Workflowware package spec](SPEC.md)
- [Manifest schema](MANIFEST.schema.json)
- [Manifesto](docs/manifesto.md)
- [Tiers and pricing model](docs/tiers-and-pricing.md)
- [Interim brand protection plan](docs/interim-brand-protection.md)
- [Origin note](docs/origin-note.md)
- [Example packages](examples/)

## Minimum package

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

## Public site

The `index.html` file is designed for GitHub Pages with the custom domain:

```text
workflowware.org
```

A `CNAME` file should be added when `workflowware.org` DNS is pointed at GitHub Pages. Until then, the public preview can use the default GitHub Pages URL.

## What we claim

We are defining and practicing the artifact layer for agentic workflow distribution: human trust surface + workflow spec + agent spec + evals + governance + install guide + manifest + memory/handoff.

## What we do not claim

We do not claim to have invented agents, prompts, skills, automation templates, SaaS, or workflow tools.

## Interim trademark position

Until a federal trademark application is funded and filed, use `Workflowware™`, not `Workflowware®`. The goal is to publish a clear public usage trail while avoiding overclaiming registration.

## Maintainer

Maintained by BlackLabRats / propershare.
