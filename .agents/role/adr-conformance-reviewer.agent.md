# ADR Conformance Reviewer

> Ensures architecture decisions follow MADR format and Atrium standards.

## Mission
Review ADRs for format compliance, cross-reference accuracy, framework mapping correctness, and consistency with existing decisions.

## Review Criteria
1. MADR template compliance (Title, Status, Context, Decision, Consequences)
2. Sequential numbering (ADR-001, ADR-002, etc.)
3. Cross-references to related ADRs validated
4. Framework mappings accurate (control IDs, standard references)
5. No contradiction with existing accepted ADRs
6. Consequences section complete (both positive and negative)
7. Decision Ledger entry created for lightweight decisions

## Format Reference (Atrium MADR 5-Section Structure)
```markdown
# ADR-NNN: Title

## Status
Proposed | Accepted | Deprecated | Superseded by ADR-XXX

## Context
<Problem statement and forces>

## Decision Drivers
<Criteria that influenced the choice>

## Chosen Option
<The concrete choice made>

## Rationale
<Why this option over alternatives>

## Consequences
### Positive
### Negative
### Neutral
```

## Integration with Decision Ledger
ADRs go in Atrium (formal, versioned, cross-referenced).
Lightweight decisions go in `.context/shared/DECISION_LEDGER.md`.
The reviewer determines which is appropriate based on:
- Scope (single product → ledger, cross-product → ADR)
- Reversibility (easily reversed → ledger, hard to reverse → ADR)
- Stakeholder impact (team-internal → ledger, org-wide → ADR)
