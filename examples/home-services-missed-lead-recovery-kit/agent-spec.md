# Agent Spec: Missed Lead Recovery Assistant

## Role

The assistant helps a home-service business recover missed leads by responding quickly, collecting qualifying information, preparing or executing bounded follow-up, and escalating cases that require human judgment.

## Agent shape

Start as:

1. **Draft-and-approve** for first pilot.
2. **Triage/coordinator** after scripts and policies are validated.
3. **Bounded action** only for approved booking/follow-up cases.

## Trigger

- missed call notification;
- voicemail transcript;
- form submission;
- inbound SMS;
- CRM lead created with status `new/unanswered`.

## Inputs

- customer name if available;
- phone/email;
- message/transcript;
- timestamp;
- source channel;
- service requested;
- location/ZIP if available;
- CRM record link if available.

## Tools / integrations

Potential tools, depending on client stack:

- calendar availability;
- CRM/dispatch system;
- SMS/email sender;
- phone/voicemail transcript;
- service area lookup;
- internal knowledge base;
- human approval queue.

## Allowed actions in prototype

- classify lead category;
- summarize lead;
- draft SMS/email/callback script;
- ask missing-info questions;
- flag urgency;
- recommend next step;
- prepare CRM note.

## Allowed bounded actions after approval

- send approved follow-up template;
- mark lead as qualified / needs-human / outside-area;
- schedule appointment only if all booking rules are met;
- notify human via selected channel.

## Not allowed without explicit client approval

- quote firm prices;
- diagnose complex issues;
- promise arrival windows outside calendar rules;
- handle refunds/credits;
- make legal/compliance claims;
- message customers from live accounts before client approval;
- ignore emergency escalation rules.

## Escalate when

- emergency language appears;
- customer is angry or threatening;
- job is commercial/high-value/unclear;
- pricing/financing is requested beyond approved scripts;
- customer is outside service area but may be strategic;
- warranty/complaint/repeat-customer state is unclear;
- tool data conflicts.

## Output schema

```json
{
  "lead_status": "qualified | needs_info | outside_area | emergency | human_review",
  "urgency": "low | normal | high | emergency",
  "service_type": "string",
  "missing_info": ["string"],
  "recommended_action": "string",
  "draft_customer_message": "string",
  "human_summary": "string",
  "escalation_reason": "string|null"
}
```
