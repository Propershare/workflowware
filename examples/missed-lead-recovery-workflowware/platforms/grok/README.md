# Grok Platform Adapter

This adapter translates Missed Lead Recovery Workflowware v0.1 into a Grok bot configuration.

It does not replace the package's `workflow-spec.md`, `agent-spec.md`, or `approval-rules.md`. Those files remain authoritative. If this adapter conflicts with them, stop and follow the package rules.

## Included files

- `bot-prompt.md` - system instructions to paste into the Grok bot;
- `sample-config.json` - machine-readable adapter configuration;
- `setup-guide.md` - safe installation and sample-test procedure;
- `operator-checklist.md` - checks before and after every run;
- `test-cases.json` - ten normal, boundary, and adversarial cases.

## Status

**Documented, not verified.** The adapter files and test cases exist, but no independent Grok execution report is published. Do not call this adapter tested, certified, or production-ready until recorded results exist.

## Safety boundary

The bot may classify, draft, ask questions, and recommend. It may not send, post, book, quote, connect accounts, change records, or use live customer data without explicit human approval and an appropriately governed runtime.
