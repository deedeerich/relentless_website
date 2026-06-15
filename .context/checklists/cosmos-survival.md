# Cosmos Survival Validation Checklist

> Verify AEGIS state survives pod restart. Phase 0 must stay proven.

## Data Persistence
- [ ] Decisions survive pod restart (query Cosmos after restart)
- [ ] Lifecycle records survive pod restart
- [ ] Work items survive pod restart
- [ ] Snapshots survive pod restart
- [ ] Test pipeline records survive pod restart

## Store Configuration
- [ ] `AEGIS_STORE_MODE=cosmos` set in environment
- [ ] `AEGIS_STORE_VALIDATE_WRITES=false` (production)
- [ ] `AEGIS_ENABLE_STORE_BACKFILL=false` (backfill complete)
- [ ] Cosmos connection string in Key Vault

## DualWriteStore Behavior
- [ ] Writes go to Cosmos AND file (during dual-write phase)
- [ ] Reads come from Cosmos (primary)
- [ ] File fallback works if Cosmos is unreachable
- [ ] No data loss on store mode switch

## Document Size
- [ ] No single document exceeds 2 MB (Cosmos limit)
- [ ] Provider snapshots chunked if needed
- [ ] Aggregate cache NOT in Cosmos yet (deferred)

## Known Issues
- Veracode cache is still in-memory + ephemeral disk (NOT in Cosmos yet)
- Provider snapshots are NOT yet in Cosmos (Provider Orchestration plan)
- `/aggregate` still does live pulls (not snapshot-based yet)
