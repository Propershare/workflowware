# AI Agent Buyer and Operator Guide

This guide is for AI agents that are sent by a human to inspect, compare, download, test, purchase, or operate a Workflowware™ package.

## Primary instruction

Do not assume the human understands agents, repositories, ZIP files, runtime setup, approval gates, or technical terms.

Your job is to translate the package into plain next steps.

## If you are evaluating a package

1. Open `README.md` first.
2. Identify the business outcome.
3. Identify the intended user.
4. List the included files.
5. Check whether `approval-rules.md` exists.
6. Check whether sample data or eval cases exist.
7. Explain whether the human can use it on a phone, computer, or guided pilot.
8. Identify any missing instructions before recommending purchase or install.

Return:

```text
What this package does:
Who it is for:
What you need to use it:
Can it be tested on a phone:
What should be downloaded:
What requires approval:
What I recommend next:
```

## If you are downloading a package

Prefer the simplest safe path for the human:

1. If there is a ZIP release, download the ZIP.
2. If the human is technical, the repo/folder may be enough.
3. If the human is nontechnical, choose the guided pilot/intake form.
4. Do not ask for secrets during download.
5. Do not execute scripts unless the package clearly says to and the human approves.

## If you are helping a nontechnical customer

Use plain language.

Do not say:

```text
Clone the repository and configure the runtime provider.
```

Say:

```text
Use the guided pilot, or download the ZIP on a computer. On a phone, you can read the guide and submit sample data, but editing package files is easier on a computer.
```

## If you are testing with sample data

Use fake or anonymized data first.

Safe sample:

```text
A customer asked for AC repair yesterday. Nobody replied. Draft a friendly follow-up that a human can approve.
```

Unsafe sample:

```text
Here is my live inbox password and all customer messages.
```

Do not request or store unsafe data.

## If you are purchasing or requesting a pilot

Ask the human before submitting any form or purchase.

Summarize:

- what is being requested;
- what information will be sent;
- whether payment is involved;
- whether the request gives access to any live system;
- what result the human should expect.

## If you are operating a package

Before taking action:

1. Read `approval-rules.md`.
2. Read `agent-handoff.md`.
3. Confirm whether the data is sample or live.
4. Draft first; do not send first.
5. Ask for human approval before contacting customers, changing records, posting, purchasing, deleting, or connecting accounts.
6. Keep a clear log of what you did.
7. Report uncertainty instead of guessing.

## Do not do these things

Never:

- request passwords, browser cookies, API keys, or payment card data in chat;
- connect a live account without explicit human approval;
- send messages to customers without approval;
- make purchases without approval;
- claim the package guarantees revenue;
- hide limitations from the human;
- treat Workflowware as requiring Workflowware Runtime unless the package specifies a different executor;
- treat the Workflowware Runtime as the same plane as the private lab's MAAT Runtime — they are separated by blast radius (`BOUNDARY.md`).

## Runtime note (three-plane architecture)

Workflowware is stack-neutral. The public package can be reviewed or tested without installing any runtime.

There are three runtime planes the lab operates:

- **Workflowware Runtime** — the product runtime (this repo + `Propershare/workflowware-runtime`). It runs customer packages.
- **MAAT Runtime** — the private lab governance plane. It governs, audits, and certifies the product runtime. It is *not* the product runtime.
- **prime-agent** — a single-node lab runtime that backs the Workflowware Runtime adapter. Used internally for pilots that need a tamper-evident audit trail.

BlackLabRats may use Workflowware Runtime (the product runtime) for professional installs that require:

- governed memory;
- approval gates;
- audit logs;
- artifact registry;
- eval tracking;
- recurring improvement.

The Workflowware Runtime's blast-radius boundary means the lab's MAAT Runtime never imports the product runtime, and the product runtime never imports the lab. See `Propershare/workflowware-runtime/BOUNDARY.md`.

Do not expose private runtime endpoints or secrets to the public website or to the customer unless the project scope explicitly requires a deployed client runtime.
