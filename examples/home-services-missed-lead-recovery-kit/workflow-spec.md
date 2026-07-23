# Workflow Spec: Missed Lead Recovery for Home Services

## Workflow name

Home Services Missed Lead Recovery

## Business pain

Home-service businesses lose revenue when calls, voicemails, form fills, or texts are not answered quickly. Customers often call the next company if they do not receive a useful response.

## Primary trigger

One of:

- missed inbound call;
- voicemail received;
- web form submitted;
- SMS inquiry;
- after-hours contact;
- unanswered estimate request.

## Required context

- business name and brand voice;
- service categories;
- service area / ZIP codes;
- business hours and after-hours policy;
- emergency definition;
- appointment availability rules;
- booking/calendar process;
- CRM or dispatch system fields;
- pricing boundaries;
- financing scripts if any;
- human escalation contacts.

## Finish lines

A case is complete when one of these happens:

1. qualified appointment/estimate is booked under approved rules;
2. lead is qualified and handed to human with complete summary;
3. lead is disqualified with approved message;
4. emergency/out-of-policy case is escalated immediately;
5. missing information request is sent and follow-up timer is set.

## Old workflow

1. Customer calls while crew/CSR is busy.
2. Call goes to voicemail or rings out.
3. Customer leaves partial message or no message.
4. Business checks voicemail later.
5. CSR manually calls back.
6. Customer may already have booked competitor.
7. CRM/dispatch note may be incomplete.

## Agent-assisted workflow

1. Missed lead event wakes the workflow.
2. Agent reads context: caller/message, service area, hours, service categories.
3. Agent drafts or sends approved follow-up within minutes.
4. Agent asks qualifying questions: location/ZIP, service type, urgency, preferred time, contact confirmation.
5. Agent checks rules: service area, service offered, emergency status, human review requirements.
6. Agent books only if bounded rules allow.
7. Agent updates CRM/summary or prepares handoff.
8. Agent escalates exceptions.

## Common edge cases

- outside service area;
- emergency after-hours;
- warranty/repeat customer;
- price-shopping before diagnosis;
- landlord/tenant coordination;
- commercial vs residential;
- financing questions;
- photos needed before estimate;
- language preference;
- angry customer / complaint;
- duplicate lead across call + web form.

## Success metrics

- response time to missed lead;
- qualified leads recovered;
- appointments booked;
- human escalations;
- booking accuracy;
- bad/blocked actions prevented;
- estimated revenue saved;
- owner/CSR hours saved.
