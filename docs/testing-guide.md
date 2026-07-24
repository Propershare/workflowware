# Workflowware Testing Guide

> Readable HTML (same content): [testing.html](testing.html)

Use this guide to test the first public Workflowware™ package: **Home Services Missed Lead Recovery**.

## Fastest safe test

Use fake or anonymized sample data first. Do not send passwords, API keys, browser cookies, payment data, live inbox access, or full customer lists.

## Device guidance

| Device/path | Good for | Not good for |
|---|---|---|
| Phone | Reading, intake, sample-data submission, approval, feedback | Unzipping/editing package files |
| Computer | Downloading ZIPs, editing files, DIY testing | Not required for guided pilot |
| AI agent | Inspecting files, summarizing, checking approval rules | Acting without human approval |
| Guided pilot | Nontechnical testers | Unattended production automation |

## What to test

Submit 1–3 missed lead examples like:

```text
Business type: HVAC
Lead message: Need AC repair asap. Are you available today?
Received: yesterday afternoon
Problem: nobody replied
Goal: draft a safe follow-up for human approval
```

Expected output:

- triage notes;
- safe follow-up draft;
- approval questions;
- next action recommendation;
- uncertainty notes.

## Instructions for AI agents

1. Read the package `README.md` first.
2. Read `approval-rules.md` before suggesting any action.
3. Use sample data before live data.
4. Do not request secrets or credentials.
5. Draft first; do not send messages.
6. Ask the human before purchases, account connections, customer contact, or live system changes.
7. Return a plain-language summary for a nontechnical human.

## Feedback questions

After testing, answer:

- Was the package understandable?
- Could a phone user understand what to do?
- Could an AI agent inspect it safely?
- What confused you?
- Would the output help recover a missed lead?
- Would you consider a scoped setup/blueprint?
