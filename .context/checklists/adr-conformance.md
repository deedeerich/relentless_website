# ADR Conformance Checklist

> Verify ADRs follow MADR format and Atrium standards.

## Format (Atrium MADR 5-Section Structure)
- [ ] Uses Atrium MADR template with all 5 required sections:
  1. **Context** — problem statement and forces
  2. **Decision Drivers** — criteria that influenced the choice
  3. **Chosen Option** — the concrete choice made
  4. **Rationale** — why this option over alternatives
  5. **Consequences** — positive, negative, AND neutral impacts
- [ ] Sequential numbering (ADR-NNN)
- [ ] Status is one of: Proposed, Accepted, Deprecated, Superseded
- [ ] If superseded: references superseding ADR

## Content
- [ ] Context explains the problem and forces clearly
- [ ] Decision Drivers list the specific criteria (not vague priorities)
- [ ] Chosen Option is stated as a concrete choice, not a wish
- [ ] Rationale explains why alternatives were rejected
- [ ] Consequences include positive, negative, AND neutral impacts
- [ ] No contradiction with existing accepted ADRs
- [ ] Cross-references to related ADRs are valid (ADR numbers exist)

## Framework Mappings (if applicable)
- [ ] Control IDs are correct (verified against framework source)
- [ ] Standard references are accurate
- [ ] Mapping type specified (direct, equivalent, partial, related)

## Integration
- [ ] Lightweight decisions go to DECISION_LEDGER.md, not ADRs
- [ ] ADR scope is appropriate (cross-product or hard-to-reverse)
