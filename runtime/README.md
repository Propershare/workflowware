# runtime/

This directory is a **template**, not a running process in this repository.

## What is in here

- `intake/INTAKE_TEMPLATE.md` — copy-paste intake form for the Agent Readiness Audit
  pilot. Customers or operators fill it in and drop a timestamped copy at
  `intake/intake-YYYYMMDD-HHMMSS.md`.

## What is NOT in here

- No cron job, no systemd timer, no background process scans this directory
  on this host. The line in `INTAKE_TEMPLATE.md` that says "the runtime
  checks every 15 minutes" describes a **deployable** runtime the operator
  installs in their own environment — it is not running in this public repo.
- No receipt writer, no eval runner, no agent process lives here.

## Why this lives in the public repo

The intake template is part of the public Pilot CTA (`pilot.html` →
Missed Lead Recovery). Customers need to be able to download or browse it
without a BlackLabRats account. Keeping it as a plain markdown template in
the repo means the GitHub-rendered preview is the same as the file the
customer copies.

## If you are an agent reading this

1. Do not try to schedule a cron against this directory on this host.
2. Do not try to invoke the runtime by writing to `intake/` and waiting.
   Nothing here is wired to react.
3. If you are implementing the runtime for a customer, copy this directory
   to a host that will run the agent, add the cron / timer there, and point
   the agent at the new `intake/` path.
4. If you need to test the runtime loop end-to-end on this host, see
   `docs/runtime-integrations.md` for the executor contract and the lab's
   private runtime options.
