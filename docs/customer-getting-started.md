# Customer Getting Started Guide

> Readable HTML (same content): [getting-started.html](getting-started.html)

Workflowware™ is meant to be usable even if you know nothing about AI agents.

You do **not** need to understand MAAT Runtime, agent frameworks, model providers, prompts, or code to test a Workflowware package.

## What am I buying or downloading?

You are getting a **workflow package**: a folder of instructions, examples, rules, and test cases that explain how a specific job should be performed by humans and AI agents together.

Example package:

```text
missed-lead-recovery-workflowware/
  README.md
  workflow-spec.md
  agent-spec.md
  approval-rules.md
  eval-template.csv
  agent-handoff.md
  artifact-manifest.json
```

A package is not the same thing as an app from an app store. It is closer to a complete operating manual plus test kit for one job.

## Where do I download it?

Early public downloads may be offered from:

- the Workflowware website;
- the `propershare/workflowware` GitHub repository;
- a GitHub Release ZIP file;
- a direct link sent during a pilot test.

If you are not technical, choose the **guided pilot** option instead of trying to install files yourself.

## Can I use this on a phone?

Yes, for review and guided testing.

On a phone you can usually:

- read the package page;
- fill out an intake form;
- submit sample data;
- review draft outputs;
- approve or reject a proposed message;
- give feedback.

A phone is usually **not** the best place to unpack ZIP files, edit package files, run scripts, or connect business tools.

Best device by task:

| Task | Phone | Computer | BlackLabRats-guided pilot |
|---|---:|---:|---:|
| Read the website | Yes | Yes | Yes |
| Fill out intake | Yes | Yes | Yes |
| Submit 3–5 sample leads | Yes | Yes | Yes |
| Review outputs | Yes | Yes | Yes |
| Download ZIP package | Maybe | Yes | Not required |
| Edit package files | No | Yes | Not required |
| Run with local tools | No | Yes | Not required |
| Connect business systems | Not recommended | Maybe | Best |

## What if I know zero about agents?

Use the guided pilot path.

You only need to answer plain business questions:

- What job do you want help with?
- What does a good result look like?
- What should require human approval?
- What should never happen automatically?
- Can you provide fake or sample examples?

BlackLabRats/Hermes can operate the package for you and return the results.

## What if my AI agent is doing the work for me?

That is expected.

If you send an AI agent to inspect or download a Workflowware package, tell it:

```text
Open the package README first.
Do not request secrets or passwords.
Read approval-rules.md before taking action.
Use sample data first.
Do not connect live business systems unless I explicitly approve it.
Return a summary of what the package does, what files it includes, and what action needs my decision.
```

## What should I never submit during an early pilot?

Do not send:

- passwords;
- API keys;
- browser cookies;
- payment card data;
- private customer lists;
- live inbox credentials;
- anything you are not allowed to share.

Use fake or anonymized examples first.

## First test recommendation

For the first test, use **sample data**.

Example:

```text
Business type: HVAC
Lead message: Need AC repair asap. Are you available today?
Received: yesterday afternoon
Problem: nobody replied
Goal: draft a safe follow-up message for human approval
```

The package should return:

- triage notes;
- a draft follow-up;
- approval questions;
- next action recommendation;
- notes on what the workflow could not know.

## What happens after I test?

You may receive:

- package output;
- a summary of what happened;
- a feedback form;
- an option for a guided install;
- an option for a managed/pro system.

Professional installs may use a private governed runtime behind the scenes. You do not need to install that runtime unless the project scope specifically requires it.
