# Workflowware Library Roadmap

This roadmap turns Workflowware™ from a single pilot into a reusable library of governed workflow packages.

The library should produce revenue by packaging clear business outcomes first, not by selling vague AI automation.

## Operating principle

Each library package must be understandable by:

1. a customer who knows zero about agents;
2. an AI agent browsing, downloading, purchasing, or operating on behalf of a human;
3. a human operator installing or fulfilling a guided pilot;
4. a backend/runtime agent using MAAT or another private governed runtime.

## Public/private split

Public repo/site may contain:

- package descriptions;
- sample-data examples;
- approval rules;
- tester ZIPs;
- documentation;
- non-sensitive templates.

Private runtime/workspace should contain:

- real tester/client data;
- outputs;
- audit logs;
- client-specific package profiles;
- MAAT memory/artifact pointers;
- credentials, only when explicitly scoped and approved.

Do not expose MAAT Runtime directly through public website JavaScript.

---

## Revenue-first package backlog

### 1. Missed Lead Recovery Workflowware

**Status:** live pilot.

**Target buyer:** home-service business, local operator, consultant serving local businesses.

**Pain:** missed calls/forms/messages turn into lost jobs.

**Outcome:** triage notes, safe follow-up draft, approval questions, and next action recommendation.

**Revenue path:** sample-data pilot → Workflowware Blueprint → installed package → managed improvement loop.

---

### 2. Review Response and Reputation Recovery Workflowware

**Target buyer:** local businesses with Google/Yelp/Facebook reviews.

**Pain:** bad or unanswered reviews hurt trust; owners do not know what to say.

**Outcome:** classify review, draft professional response, flag legal/sensitive cases, suggest internal follow-up.

**Safe first test:** fake or copied/anonymized review examples.

**Approval boundary:** never post publicly without human approval.

**Revenue path:** review-response blueprint → response library → managed reputation workflow.

---

### 3. Estimate Follow-Up Workflowware

**Target buyer:** contractors, consultants, agencies, service providers.

**Pain:** quotes/estimates go cold because nobody follows up consistently.

**Outcome:** classify estimate status, draft follow-up, identify objections, suggest next touch.

**Safe first test:** anonymized estimate examples with no prices or customer identifiers unless approved.

**Approval boundary:** no discount, guarantee, or scheduling promise without approval.

**Revenue path:** follow-up blueprint → follow-up sequence package → CRM/assistant install.

---

### 4. Inbox Triage Workflowware

**Target buyer:** solo business owners, consultants, operations teams.

**Pain:** important messages get buried.

**Outcome:** classify messages, identify urgent items, draft replies, create human review queue.

**Safe first test:** pasted sample emails/messages, anonymized.

**Approval boundary:** no live inbox connection in first pilot.

**Revenue path:** inbox audit → triage package → governed mailbox pilot.

---

### 5. Customer Intake Cleanup Workflowware

**Target buyer:** service providers, clinics, agencies, coaching/consulting businesses.

**Pain:** intake forms are incomplete, inconsistent, and hard to act on.

**Outcome:** normalize intake, ask missing-info questions, create summary, route to next step.

**Safe first test:** fake/anonymized intake submissions.

**Approval boundary:** no medical/legal/financial advice as final professional decision.

**Revenue path:** intake teardown → improved intake workflow → installed assistant package.

---

### 6. Content Repurposing Workflowware

**Target buyer:** creators, local businesses, educators, agencies.

**Pain:** one good idea does not become enough posts/scripts/emails.

**Outcome:** turn one source into platform-specific drafts with approval checklist.

**Safe first test:** public article, transcript, or user-provided draft.

**Approval boundary:** no publishing without human approval.

**Revenue path:** content workflow audit → repurposing kit → managed content calendar.

---

## Library package acceptance criteria

Every package should include:

- `README.md` — plain-language start here;
- `workflow-spec.md` — trigger, inputs, finish line, non-goals;
- `agent-spec.md` — role, allowed actions, prohibited actions, output format;
- `approval-rules.md` — human approval boundaries;
- `agent-handoff.md` — instructions for AI agents/operators;
- `eval-template.csv` — test cases and expected behavior;
- `sample-data.csv` or sample-data folder;
- `feedback.md` — tester feedback questions;
- `artifact-manifest.json` — package metadata;
- optional `install-guide.md` for guided/technical setup.

## Research loop for each package

Before making a package public:

1. collect pain-language from real business discussions, support forums, reviews, or social posts;
2. define the buyer and the first safe test;
3. define what a phone user can do;
4. define what a computer user can do;
5. define what an AI agent may inspect or operate;
6. define what must require human approval;
7. create 5–10 starter eval cases;
8. create one guided-pilot CTA;
9. test package with sample data;
10. record feedback and update the library.

## Next package recommendation

Build **Review Response and Reputation Recovery Workflowware** next.

Reason: it is easy to understand, widely needed, safe to test with public/anonymized review examples, and has a clear human-approval boundary: draft responses but do not post.
