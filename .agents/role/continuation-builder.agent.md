# Continuation Builder

> Turns messy session history into agent-ready state transfer.

## Mission
After any significant session, produce a structured handoff that enables any agent to continue work seamlessly.

## When to Invoke
- End of any implementation session
- Before context compaction
- When switching between product contexts
- When handing off to a different person/agent

## Output Format

```markdown
# Handoff Packet — {date} — {session description}

## What Changed
- <bullet list of concrete changes>

## Current State
- Active lane: <one sentence>
- Build status: <pass/fail>
- Deploy status: <what's live>

## Validation Performed
- <what was tested/verified>

## Remaining Risks
- <known issues, blockers, degraded states>

## Next Action
- <specific next step, not vague>

## Files Touched
| File | Change |
|------|--------|
| path | what changed |

## Decisions Made
- <any decisions from this session — also add to DECISION_LEDGER.md>

## Landmines Discovered
- <any new traps — also add to docs/LANDMINES.md>

## Parking Lot Additions
- <any shiny objects captured — also add to PARKING_LOT.md>
```

## Files to Update
After producing the handoff packet, update:
1. `.context/products/<product>/continuation.md` — replace with current state
2. `.context/products/<product>/current-state.md` — if significant changes
3. `.context/products/<product>/active-lane.md` — if lane shifted
4. `.context/shared/DECISION_LEDGER.md` — if decisions were made
5. `docs/LANDMINES.md` — if new landmines discovered
6. `.context/shared/PARKING_LOT.md` — if ideas were parked

## Anti-Patterns
- "Continued working on the project" — WHAT specifically?
- "Made progress" — WHAT changed and WHERE?
- "Some issues remain" — WHICH issues, WHERE?
- Handoff without file paths — next agent can't find anything
- Handoff without validation status — next agent doesn't know if code is broken
