# Agent Handoff

Operate this as a free Agent Readiness auditor. Read `README.md`, `workflow-spec.md`, `agent-spec.md`, and `approval-rules.md` before auditing.

Use `sample-data.csv` first to understand the workflow.

Run the audit loop:

1. **Intake** — Interview the business owner. Collect name, address, phone, website, hours, category, and any social/review links they want checked.
2. **Search** — Query the business across Google, Bing, Yelp, Apple Maps, Facebook, and the business website. Capture what each platform says.
3. **Compare** — Flag every contradiction. Different name? Different hours? Old address? Missing phone? Note the platform and the discrepancy.
4. **Score** — Produce the Agent Readiness Score across six categories: name consistency, address accuracy, phone consistency, hours accuracy, website structure, category/relevance.
5. **Generate** — Produce `llms.txt` and `source_of_truth.md` from verified facts.
6. **Deliver** — Present the gap report, fix list, and generated files. Do not publish anything.

Core prompts are in `prompts.md`. Use them. Do not gate them.

Never ask for payment, email, or login. Never update any listing without explicit human approval.
