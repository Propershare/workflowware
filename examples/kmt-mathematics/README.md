# Kmt Mathematics Workflowware

The reference implementation. This package proves that the Workflowware runtime
enforces the Kmt work discipline - not merely documents it.

## What it embodies

The TDKA process for making mathematics reliable:

    count -> calculate -> compare -> measure -> apply -> inspect -> correct -> record -> teach -> improve

maps onto the runtime lifecycle:

    start -> draft -> verify -> repair -> audit -> handoff -> COMPLETE

The runtime's constitution (src/lifecycle.py) enforces the invariant
**no silent progression after failed verification**. So this package's
`inspect -> correct -> continue` steps physically cannot run past a failed check.

## The worked example

`57 x 23 = 1311` by Egyptian doubling:

    1  -> 57
    2  -> 114
    4  -> 228
    8  -> 456
    16 -> 912

    23 = 16 + 4 + 2 + 1  =>  912 + 228 + 114 + 57 = 1311

## Files

- `graph.json` - the executable workflow graph (run it through the runtime's
  `run_graph` / `/v1/runs`).
- `workflow-spec.md` - the job, the Kmt process, and the lifecycle mapping.
- `checks.md` - verification rules (what must be checked).
- `repair.md` - the correction procedure for a failed verification.
- `audit.md` - whole-job conformity criteria.

## Run it

The conformance case `isfet_16_kmt_math_lifecycle.py` runs this graph through
the runtime and asserts both paths (clean -> COMPLETE, corrupted -> REPAIR_REQUIRED).
