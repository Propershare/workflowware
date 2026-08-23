# Kmt Mathematics - Workflow Spec

## Job

Multiply two integers by Egyptian doubling, verify by a second method, audit the
procedure, and hand off a record. The canonical worked example is 57 x 23 = 1311.

## The Kmt process (TDKA source rules)

1. **count** - state the quantities exactly.
2. **calculate** - build the doubling table (1, 2, 4, 8, 16, ...).
3. **compare** - select the rows whose doubling factors sum to the multiplier.
4. **measure** - sum the selected rows.
5. **apply** - state the product.
6. **inspect** - verify the product by an independent second method.
7. **correct** - if inspection fails, re-derive and re-select.
8. **record** - write the method, the table, the selection, and the result.
9. **teach** - hand the procedure off so the next worker can repeat it.
10. **improve** - (LEARN stage, post-COMPLETE) turn a verified pattern into a reusable skill.

## Lifecycle mapping

| Kmt step | Lifecycle node | Evidence produced |
|----------|----------------|-------------------|
| count    | start          | -                 |
| calculate (table/select/sum) | draft | doubling_table, selected_rows, result |
| compare / measure / inspect | verify | (check verdict) |
| correct  | repair         | corrected_result  |
| (whole-job) | audit | requires doubling_table, selected_rows, result |
| record / teach | handoff | handoff record |

## Success criteria

- The doubling table is correct and complete.
- The selected rows sum to the multiplier.
- The verification (reverse division) agrees.
- The audit finds all required evidence present.
- The handoff records the method and the result.
