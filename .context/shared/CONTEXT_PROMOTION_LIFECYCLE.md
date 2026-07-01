# Context Promotion Lifecycle

> Every piece of context has a lifecycle. Nothing lives in incubation forever.

## Lifecycle Stages

```
incubation → product context → decision/backlog → implementation → archived/reference
```

### 1. Incubation
**Location:** `.context/incubation/`
**What lives here:** Raw ideas, tool scouts, unresolved questions, research notes, promotion candidates.
**Entry criteria:** Someone thought it was worth writing down.
**Exit criteria:** Promoted to product context, converted to decision, or archived with reason.
**Review cadence:** Weekly. If an item sits here >30 days without progress, either promote or archive.

### 2. Product Context
**Location:** `.context/products/<product>/`
**What lives here:** Current state, active lane, decisions, risks, continuation notes.
**Entry criteria:** Item is relevant to a specific product and affects planning or execution.
**Exit criteria:** Becomes a decision (→ DECISION_LEDGER.md or ADR), becomes a backlog item, or becomes stale (→ archive).
**Review cadence:** Every session start (read current-state.md and active-lane.md).

### 3. Decision / Backlog
**Location:** `.context/shared/DECISION_LEDGER.md` or Atrium (ADRs) or product backlog.
**What lives here:** Settled decisions, queued implementation work.
**Entry criteria:** Clear decision made with rationale, or actionable work item with acceptance criteria.
**Exit criteria:** Implemented (→ reference) or superseded (→ archived with link to replacement).
**Review cadence:** Check before starting related work. Do not relitigate.

### 4. Implementation
**Location:** Code, infrastructure, configuration.
**What lives here:** The actual work product.
**Entry criteria:** Approved plan exists. Implementer assigned. Validation criteria defined.
**Exit criteria:** Validated, deployed, handoff written.

### 5. Archived / Reference
**Location:** `docs/` or `.context/incubation/` (archived section) or product context (historical notes).
**What lives here:** Completed work, superseded decisions, retired tools, historical context.
**Entry criteria:** No longer active but may be useful for reference.
**Exit criteria:** None (terminal state). May be resurrected if context changes.

## Promotion Decision Criteria

| Question | If Yes → | If No → |
|----------|----------|---------|
| Does it affect a specific product? | Promote to product context | Keep in incubation |
| Is it a decision that should stick? | Promote to Decision Ledger or ADR | Keep as discussion note |
| Is it actionable work? | Promote to backlog | Keep in parking lot |
| Has it been here >30 days with no progress? | Archive or promote | Keep if still relevant |
| Did someone ask about it twice? | Promote — it's clearly needed | — |

## Freshness Rule for Context Files
- Live counts (finding numbers, provider stats, coverage percentages) MUST include source and capture date
- Format: `(as of YYYY-MM-DD, source: X)`
- Counts older than 7 days: treat as **historical**, not current
- Label clearly: `(historical, as of YYYY-MM-DD)`
- Context files without dates on their numbers are fossil beds — pretty, dangerous, wrong

## Anti-Patterns

| Anti-Pattern | Fix |
|-------------|-----|
| Incubation becomes junk drawer | Weekly review, 30-day timeout |
| Context files with undated numbers | Freshness rule: source + date on all counts |
| Decisions scattered across notes | Centralize in DECISION_LEDGER.md |
| "We should do X" without owner or timeline | Convert to unassigned decision or archive |
| Same idea appearing in 3 different files | Single source of truth, link from others |
| Parking lot items never reviewed | Weekly review with promote-or-archive decision |
