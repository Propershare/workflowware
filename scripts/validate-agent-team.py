#!/usr/bin/env python3
"""Enforce Workflowware Agent Team Protocol invariants beyond JSON Schema."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

ROLES = (
    "workflow_architect",
    "package_builder",
    "policy_guardian",
    "platform_adapter",
    "evaluation_agent",
    "runtime_operator",
    "evidence_auditor",
    "registry_publisher",
    "independent_reviewer",
)

ALLOWED_TRANSITIONS = {
    "INTAKE": {"DESIGN"},
    "DESIGN": {"BUILD"},
    "BUILD": {"POLICY_REVIEW"},
    "POLICY_REVIEW": {"PLATFORM_ADAPTATION", "REPAIR_REQUIRED", "REJECTED"},
    "PLATFORM_ADAPTATION": {"EVALUATION", "REPAIR_REQUIRED"},
    "EVALUATION": {"EXECUTION", "REPAIR_REQUIRED", "REJECTED"},
    "EXECUTION": {"EVIDENCE_AUDIT", "REPAIR_REQUIRED"},
    "EVIDENCE_AUDIT": {"PUBLICATION", "REPAIR_REQUIRED", "REJECTED"},
    "REPAIR_REQUIRED": {"BUILD", "PLATFORM_ADAPTATION"},
    "PUBLICATION": {"INDEPENDENT_REVIEW"},
    "INDEPENDENT_REVIEW": {"VERIFIED", "REJECTED"},
    "VERIFIED": {"REVOKED"},
    "REJECTED": set(),
    "REVOKED": set(),
}

UNASSIGNED_PREFIX = "unassigned"


def is_assigned(identity: Any) -> bool:
    return (
        isinstance(identity, str)
        and bool(identity.strip())
        and not identity.strip().lower().startswith(UNASSIGNED_PREFIX)
    )


def load_json(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        value = json.load(handle)
    if not isinstance(value, dict):
        raise ValueError(f"{path}: top-level JSON value must be an object")
    return value


def validate_agent_team(document: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    roles = document.get("roles")
    if not isinstance(roles, dict):
        return ["roles must be an object"]

    missing = [role for role in ROLES if role not in roles]
    if missing:
        errors.append("missing required roles: " + ", ".join(missing))

    identities: dict[str, Any] = {
        role: roles.get(role, {}).get("identity")
        for role in ROLES
        if isinstance(roles.get(role), dict)
    }
    separation = document.get("separation_of_duty")
    if not isinstance(separation, dict):
        errors.append("separation_of_duty must be an object")
        separation = {}

    builder = identities.get("package_builder")
    reviewer = identities.get("independent_reviewer")
    if separation.get("builder_identity") != builder:
        errors.append("separation_of_duty.builder_identity must equal roles.package_builder.identity")
    if separation.get("independent_reviewer_identity") != reviewer:
        errors.append(
            "separation_of_duty.independent_reviewer_identity must equal "
            "roles.independent_reviewer.identity"
        )

    if is_assigned(builder) and is_assigned(reviewer) and builder == reviewer:
        errors.append("package_builder and independent_reviewer identities must differ")

    if is_assigned(reviewer):
        overlaps = [
            role
            for role, identity in identities.items()
            if role != "independent_reviewer" and identity == reviewer
        ]
        if overlaps:
            errors.append(
                "independent_reviewer identity overlaps role(s): " + ", ".join(overlaps)
            )

    attested = separation.get("identities_distinct_attestation") is True
    attester = separation.get("attested_by")
    if attested:
        if not is_assigned(reviewer):
            errors.append("distinct-identity attestation requires an assigned reviewer")
        if not is_assigned(attester):
            errors.append("distinct-identity attestation requires an assigned attester")
        if attester in {builder, reviewer}:
            errors.append("attester must differ from builder and independent reviewer")

    lifecycle = document.get("lifecycle")
    if not isinstance(lifecycle, dict):
        return errors + ["lifecycle must be an object"]

    current = lifecycle.get("current_state")
    history = lifecycle.get("history")
    if current not in ALLOWED_TRANSITIONS:
        errors.append(f"unknown lifecycle.current_state: {current!r}")
    if not isinstance(history, list):
        return errors + ["lifecycle.history must be an array"]

    previous_to: Any = None
    for index, transition in enumerate(history):
        if not isinstance(transition, dict):
            errors.append(f"history[{index}] must be an object")
            continue
        source = transition.get("from_state")
        target = transition.get("to_state")
        if source not in ALLOWED_TRANSITIONS:
            errors.append(f"history[{index}] has unknown from_state {source!r}")
        elif target not in ALLOWED_TRANSITIONS[source]:
            errors.append(f"illegal lifecycle transition {source} -> {target}")
        if index == 0 and source != "INTAKE":
            errors.append("lifecycle history must begin at INTAKE")
        if index and source != previous_to:
            errors.append(
                f"history[{index}] starts at {source!r}, expected {previous_to!r}"
            )
        previous_to = target

    expected_current = previous_to if history else "INTAKE"
    if current != expected_current:
        errors.append(
            f"lifecycle.current_state {current!r} does not match history end "
            f"{expected_current!r}"
        )

    if current in {"INDEPENDENT_REVIEW", "VERIFIED"} and not attested:
        errors.append(f"{current} requires a true separation-of-duty attestation")

    return errors


def validate_registry(record: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    publication = record.get("publication_status")
    if record.get("lifecycle_status") == "published" and publication != "published":
        errors.append("published lifecycle_status requires publication_status='published'")

    protocol = record.get("protocol_status")
    if protocol not in ALLOWED_TRANSITIONS:
        errors.append(f"unknown registry protocol_status: {protocol!r}")

    roles = record.get("agent_team_roles")
    if not isinstance(roles, list) or "independent_reviewer" not in roles:
        errors.append("registry agent_team_roles must include independent_reviewer")

    evidence = record.get("evidence")
    if not isinstance(evidence, dict):
        return errors + ["registry evidence must be an object"]

    trust = record.get("trust_status")
    if trust not in {
        "documented",
        "tested",
        "evidence_audited",
        "independently_verified",
        "revoked",
    }:
        errors.append(f"unknown trust_status: {trust!r}")
    if trust in {"tested", "evidence_audited", "independently_verified"}:
        if evidence.get("recorded_eval_run") in {None, "pending", "not_run"}:
            errors.append(f"trust_status {trust!r} requires a recorded eval run")
    if trust in {"evidence_audited", "independently_verified"}:
        if evidence.get("runtime_receipt_chain") in {None, "pending", "not_run"}:
            errors.append(f"trust_status {trust!r} requires a runtime receipt chain")
    if trust == "independently_verified":
        if evidence.get("independent_review") in {None, "pending", "not_performed"}:
            errors.append("independently_verified requires independent-review evidence")
        if record.get("verification_status") != "verified":
            errors.append("independently_verified requires verification_status='verified'")
    if record.get("evaluation_status") == "not_run" and trust != "documented":
        errors.append("evaluation_status='not_run' permits only documented trust")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("agent_team", type=Path)
    parser.add_argument("--registry", type=Path)
    args = parser.parse_args()

    try:
        errors = validate_agent_team(load_json(args.agent_team))
        if args.registry:
            errors.extend(validate_registry(load_json(args.registry)))
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    if errors:
        for error in errors:
            print(f"FAIL: {error}", file=sys.stderr)
        return 1

    print("PASS: agent-team protocol invariants satisfied")
    if args.registry:
        print("PASS: registry trust/evidence invariants satisfied")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
