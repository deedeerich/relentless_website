# Escalation Model

> How to decide when something parked needs to be surfaced early.

## Escalation Levels

| Level | Name | Meaning | Action |
|-------|------|---------|--------|
| **L0** | Capture only | Noted for reference. No change to current work. | Write to incubation or memory |
| **L1** | Park | Tracked in Parking Lot or future phase. Revisit later. | Add to PARKING_LOT.md with revisit trigger |
| **L2** | Register | Important enough for risk register or decision ledger. Visible but not blocking. | Add to risks.md or DECISION_LEDGER.md |
| **L3** | Surface in planning | Affects sequencing or priorities. Current plan may need adjustment. | Bring to active lane review, update active-lane.md |
| **L4** | Interrupt active work | Must address before continuing current implementation. | Stop current task, handle this first, then resume |
| **L5** | Stop-the-line | Immediate review required. Production risk, data integrity, or security issue. | Full stop. Escalate to human. Do not proceed. |

## Escalation Signal Matrix

| Signal | Normal Placement | Escalate To | Level |
|--------|-----------------|-------------|-------|
| Security risk affects current deploy | Parking Lot | Active Lane + Risk Register | L4 |
| Decision blocks implementation | Decision Ledger | Active Lane | L3-L4 |
| Compliance implication discovered | Appendix | Team Briefing + Risk Register | L3 |
| Stakeholder concern already raised | Parking Lot | Stakeholder Briefing | L2-L3 |
| Rework cost increases if delayed | Future Roadmap | Active Lane Review | L3 |
| Data integrity/truth issue found | Landmine | Active Lane + Validation Checklist | L4 |
| Production blast radius discovered | Risk Register | Immediate Stop/Review | L5 |
| Dependency becomes prerequisite | Roadmap | Current Phase Prereq | L3-L4 |
| Repeated confusion across agents | Notes | Context Standard / Landmine | L2 |
| External deadline appears | Backlog | Active Planning | L3 |
| Cosmos write failure (2 MB limit) | Landmine | Active implementation blocker | L4 |
| Wrong API endpoint used | Landmine | Active Lane + Provider Checklist | L4 |
| Scanner shows "no findings" | Normal | Check: not scanned vs scanned-clean vs auth-blocked | L2-L4 |

## Phase Exposure Review Format

When the Phase Alignment Coach classifies a detail:

```markdown
## Phase Exposure Review
### Detail
<what came up>
### Default Placement
Parking Lot / Risk Register / Decision Ledger / Appendix / Active Lane
### Escalation Signal
<what signal, if any, was triggered>
### Recommended Exposure Level
L0-L5
### Why
<short explanation>
### Action
<where to put it and whether current work changes>
```

## Real Examples

| Detail | Default | Escalation Signal | Final Level |
|--------|---------|-------------------|-------------|
| Hermes Agent for diagrams | Parking Lot (L1) | None currently | L1 |
| AGHAS uses advsec.dev.azure.com | Landmine (L2) | Directly affects provider truth | L4 |
| SurrealDB migration | Roadmap (L1) | Only if current design creates throwaway | L1 (currently) |
| Cosmos 2 MB limit | Landmine (L2) | Veracode snapshots literally fail | L4 |
| CWE-only correlation is weak | Landmine (L2) | Affects active correlation work | L3 |
| 14 Veracode apps scan same file | Landmine (L2) | Mitigation just submitted — need bulk | L3 |

## Escalation Override Conditions

> Sometimes phase discipline must yield to immediate action. These conditions ALWAYS escalate regardless of current phase or active lane.

| Condition | Minimum Level | Override Action |
|-----------|--------------|----------------|
| Active exploitation detected | L5 | Stop the line. Notify security lead immediately. |
| Regulatory/compliance deadline within 48 hours | L4 | Interrupt current work. Prioritize compliance path. |
| Architecture contradiction discovered | L3-L4 | Surface in planning. May require decision ledger entry. |
| Trust boundary violation in production | L5 | Stop the line. No agent may proceed. |
| Production blast radius > 1000 users | L5 | Stop the line. Human-only resolution. |
| Irreversible deployment in progress | L4 | Interrupt. Verify before point of no return. |
| Data classification conflict | L4 | Interrupt. Cannot proceed with ambiguous data handling. |
| Scanner shows "no findings" for previously-findings-rich repo | L3 | Investigate: not scanned vs scanned-clean vs auth-blocked vs endpoint mismatch |
| Cross-system identity mismatch | L3 | Register. May affect correlation and inheritance. |
| Stale data being used for governance decision | L4 | Interrupt. Refresh data before proceeding. |

### Override vs Normal Escalation
Normal escalation follows the signal matrix (check signal → classify → route).
Override conditions SKIP classification — they go directly to the specified level.

"Phase discipline" means "work in the right order." It does NOT mean "ignore fires because it's not in the current sprint."
