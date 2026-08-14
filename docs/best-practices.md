# Best Practices for Workflowware Packages

These best practices are for humans, businesses, and AI agents working with Workflowware™ packages.

## Core rule

A Workflowware package should be understandable by a person who knows nothing about AI agents and safe enough for an AI agent to inspect without guessing.

That means every package needs:

- plain-language purpose;
- what to download;
- where to start;
- what device or runtime is needed;
- what must be approved by a human;
- what must never be automated;
- what sample data to use first;
- what success looks like.

## Customer-facing best practices

### 1. Explain the outcome first

Bad:

```text
This package uses agentic workflow distribution to orchestrate autonomous tasks.
```

Better:

```text
This package helps recover missed customer leads by triaging old messages and drafting safe follow-ups for human approval.
```

### 2. Say whether it can be used on a phone

Each package should include a device note:

```text
Phone: good for intake, review, approval, and feedback.
Computer: best for downloading, editing, or running the package yourself.
Guided pilot: best if you do not know how to use agent tools.
```

### 3. Separate review, test, and install

Customers need to know which stage they are in.

| Stage | What the customer does | Risk |
|---|---|---|
| Review | Reads package docs/downloads ZIP | Low |
| Sample test | Uses fake or anonymized examples | Low |
| Guided pilot | Sends scoped sample data for assisted run | Medium |
| Installed workflow | Connects real tools/systems | Higher; requires approval |
| Managed/pro system | BlackLabRats operates with governance/audit | Highest value; requires scope |

### 4. Do not require agent knowledge

Avoid making customers choose model providers, runtimes, or orchestration frameworks at the beginning.

Use language like:

```text
If you are not technical, choose the guided pilot. We will run the package with sample data and send you the result.
```

### 5. Never ask for secrets in the first interaction

Early testing should not request:

- passwords;
- API keys;
- payment data;
- live account access;
- browser cookies;
- full customer databases.

Use fake, anonymized, or exported sample data first.

## AI-agent-facing best practices

An AI agent may be the buyer, evaluator, installer, or operator. Package docs should include explicit agent instructions.

Add this kind of block to each package:

```text
AI agent instructions:
1. Read README.md first.
2. Summarize the package purpose in plain language.
3. Identify required files and missing files.
4. Read approval-rules.md before suggesting actions.
5. Use sample data before live data.
6. Do not request passwords, tokens, API keys, or browser cookies.
7. Ask the human before connecting tools, sending messages, writing to production, or making purchases.
8. Return a clear next-step checklist for the human.
```

## Download best practices

Every public package should offer at least one clear download path:

- GitHub folder for technical users;
- ZIP release for normal users;
- guided pilot form for nontechnical users;
- feedback form after test.

Avoid saying only:

```text
Clone the repo.
```

Many customers will not know what that means.

Say:

```text
Technical users can clone the repo. Everyone else should download the ZIP or use the guided pilot.
```

## Runtime best practices

A package can be used in several ways:

| Runtime/use path | Best for | Customer skill needed |
|---|---|---|
| Guided pilot | Nontechnical testers | Low |
| ChatGPT/Claude project | Manual assisted test | Low/medium |
| Hermes Desktop | Operator-led local runs | Medium |
| Customer computer | DIY package testing | Medium |
| Customer server/cloud | installed workflow | High |
| BlackLabRats-managed Workflowware Runtime | professional governed delivery | Low for customer |

Do not imply that any specific runtime is required for everyone. Public Workflowware should stay stack-neutral. The lab's MAAT Runtime is a private governance plane and is not the product runtime.

## Approval best practices

Any workflow that may affect a real person, account, customer, payment, appointment, post, email, SMS, file, or business system needs approval rules.

Each package should answer:

- What can the agent draft?
- What can the agent read?
- What can the agent never access?
- What requires human approval?
- What gets logged?
- What happens when the agent is uncertain?

## Packaging checklist

Before publishing a package, verify:

- [ ] README explains the outcome in plain language.
- [ ] Customer can tell whether phone use is enough.
- [ ] Download path is obvious.
- [ ] Guided pilot path is available for nontechnical users.
- [ ] AI agent instructions are included.
- [ ] Approval rules are explicit.
- [ ] Sample data is provided.
- [ ] No secrets are included.
- [ ] Test/eval examples exist.
- [ ] Feedback path exists.
