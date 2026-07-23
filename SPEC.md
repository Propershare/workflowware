# Workflowware Package Spec v0.1

## Definition

**Workflowware** is software packaged as an agent-operable workflow.

A package should be readable by both humans and agents. It should explain the job, define the workflow, describe the agent behavior, state safety boundaries, include evaluation examples, and provide handoff metadata.

## Minimum viable package

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

## Recommended full package

```text
workflowware-package/
  README.md
  index.html
  workflow-spec.md
  agent-spec.md
  install-guide.md
  approval-rules.md
  escalation-rules.md
  evals/
    eval-template.csv
    example-cases.csv
  prompts/
  templates/
  scripts/
  source-ledger.csv
  runtime-connectors.md
  memory-registration.json
  agent-handoff.md
  artifact-manifest.json
```

## Required concepts

### Human trust surface

A page or document that lets a human understand what the package does, why it exists, how it is controlled, and what proof exists.

### Workflow spec

Defines trigger, context, old workflow, new workflow, finish line, edge cases, and success metrics.

### Agent spec

Defines role, inputs, tools, allowed actions, prohibited actions, output schema, and escalation behavior.

### Governance

Defines approval rules, safety boundaries, audit trail, human review, and non-autonomous zones.

### Evals

Includes example inputs and expected behavior so the workflow can be tested and improved.

### Handoff

Includes instructions for future agents and humans to customize, deploy, extend, or audit the package.

### Manifest

A machine-readable file describing title, type, status, files, URI, related packages, memory IDs, and public URLs.

## Manifest fields v0.1

```json
{
  "title": "string",
  "artifact_type": "workflowware_package | public_category_site | research_dossier",
  "status": "draft | prototype | active | published",
  "primary_artifact": "file:///... or https://...",
  "local_path": "path",
  "public_url": "https://...",
  "summary": "string",
  "files": [],
  "related_artifacts": [],
  "agent_handoff": "path",
  "registered_in_maat_memory": "uuid or pending"
}
```
