# Handoff Packet Template

> Mandatory after every significant session. No handoff = next agent starts from scratch.

```markdown
# Handoff Packet — {YYYY-MM-DD} — {session description}

## What Changed
- <concrete change 1>
- <concrete change 2>
- <concrete change 3>

## Current State
- **Active lane:** <one sentence>
- **Build status:** Pass / Fail / Not tested
- **Deploy status:** <what's live, what revision>
- **Data freshness:** <when providers were last pulled>

## Validation Performed
- [ ] Frontend build: `npm run build` → Pass/Fail
- [ ] Backend imports: `python3 -c "..."` → Pass/Fail
- [ ] Live endpoint: GET /health → 200 / Error / Not checked
- [ ] Provider data: verified / not checked
- [ ] Invariants: 3-object separation, Inv 16, boundaries → Pass/Fail

## Files Touched
| File | Change |
|------|--------|
| `path/to/file` | what changed |
| `path/to/file` | what changed |

## Decisions Made
- <decision 1> → also added to DECISION_LEDGER.md? Yes/No
- <decision 2>

## Risks / Landmines Discovered
- <risk or landmine> → also added to docs/LANDMINES.md? Yes/No
- <risk or landmine>

## Next Action
<specific, concrete next step — not vague>

## Do-Not-Do List
- <thing the next session should NOT do>
- <thing that seems tempting but is out of scope>

## Parking Lot Additions
- <shiny object 1> → also added to PARKING_LOT.md? Yes/No
- <shiny object 2>
```

## Anti-Patterns

| Bad Handoff | Why It's Bad |
|-------------|-------------|
| "Continued working on the project" | WHAT specifically? |
| "Made progress on several fronts" | WHICH fronts? WHERE? |
| "Some issues remain" | WHICH issues? WHERE? |
| No file paths listed | Next agent can't find anything |
| No validation status | Next agent doesn't know if code is broken |
| "Everything looks good" | According to WHAT evidence? |
| Numbers without dates | Fossil bed of lies (see freshness rule) |

## Freshness Rule
Any live count in a handoff (finding counts, provider stats, coverage numbers) MUST include source and capture date. Example:
- "564 GHAS findings (3 of 10 orgs, pulled 2026-05-11)"
- NOT "564 GHAS findings"

Counts older than 7 days: label as `(historical, as of YYYY-MM-DD)`.
