# Session Start Template

> Every new agent session begins with this structure. Copy and fill.

```
Product context: <AEGIS/AMME | Internal Tools LZ | Atrium | USR>
Role: <Architect | Implementer | Reviewer | Phase Alignment | Team Briefing | Continuation | Release Steward>
Active lane: <one sentence — what is the current execution focus>

Read:
- .context/products/<product>/current-state.md
- .context/products/<product>/active-lane.md
- .context/products/<product>/decisions.md
- .context/products/<product>/risks.md
- .context/shared/LANDMINES.md
- .context/shared/DECISION_LEDGER.md
- docs/LANDMINES.md (full technical landmines)

Task:
<specific task description>

Done means:
- tests/build pass
- relevant docs updated
- validation sequence executed
- no drift from active lane
- handoff summary written
- AEGIS-specific: live dev validation, not just local compile

Do not:
<anti-goals — things this session should NOT do>
```

## Product-Specific "Done Means"

### AEGIS/AMME
- `cd frontend && npm run build` passes clean
- `python3 -c "from app.appsec import ..."` validates imports
- Live dev endpoint responds (if deployed)
- Provider data freshness verified (if touching adapters)
- No 3-object separation violations (Signal ≠ Decision ≠ Action)
- Handoff summary written to `docs/handoff/`

### Internal Tools LZ
- Terraform validate passes
- No security policy violations (Checkov, TFLint)
- Pre-commit hooks pass
- Cost impact documented if new resources

### Atrium
- ADR format compliant (MADR template)
- Cross-references validated
- Framework mappings correct

## Post-Session Checklist

Every session must update before ending:
- [ ] `current-state.md` — what changed
- [ ] `active-lane.md` — still accurate?
- [ ] `decisions.md` — any new decisions made?
- [ ] `LANDMINES.md` — any new traps discovered?
- [ ] `continuation.md` — handoff for next session
