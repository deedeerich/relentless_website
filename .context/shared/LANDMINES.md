# Shared Landmines Reference

> The full technical landmine registry lives at `docs/LANDMINES.md` (57 items).
> This file exists so agents reading `.context/shared/` know where to find it.

**Read:** `../../docs/LANDMINES.md`

## Quick Reference — Top 10 Most Dangerous

1. **LM-013:** AGHAS uses `advsec.dev.azure.com`, NOT `dev.azure.com`
2. **LM-022:** CWE-only correlation produces false matches — composite key required
3. **LM-001:** Same file scanned by 14 Veracode apps — mitigation doesn't propagate
4. **LM-024:** AGHAS dependency alerts ≠ SAST code findings — alertType matters
5. **LM-035:** Aggregate snapshots go stale silently — no freshness indicator
6. **LM-037:** `/aggregate` is a live-provider timeout grenade
7. **LM-030:** a74-* repo keys are a different identity space from service entities
8. **LM-039:** Cosmos 2 MB document limit — large snapshots need chunking
9. **LM-047:** `accepted_risk` is NOT `fixed` — code is still vulnerable
10. **LM-014:** AGHAS pagination loops when >500 alerts — must query per-alertType
