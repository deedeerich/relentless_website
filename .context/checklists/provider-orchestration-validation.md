# Provider Orchestration Validation Checklist

> Run after implementing any step of the Provider Orchestration plan.

## Step 1: DocMappings
- [ ] `PROVIDER_SNAPSHOT` mapping added to `doc_mapping.py`
- [ ] `PROVIDER_STATE` mapping added to `doc_mapping.py`
- [ ] Both use `operational` container (no new containers)
- [ ] `partition_key_for` entries added
- [ ] `id_field_for` entries added
- [ ] Import validates: `python3 -c "from app.store.doc_mapping import PROVIDER_SNAPSHOT, PROVIDER_STATE"`

## Step 2: provider_orchestration.py
- [ ] `refresh_provider()` wraps existing adapters with persistence
- [ ] `get_latest_snapshots()` reads from Cosmos
- [ ] `get_provider_freshness()` returns per-provider state
- [ ] `refresh_all()` uses ThreadPoolExecutor with per-provider timeouts
- [ ] On Cosmos failure: logs warning, returns None (caller falls back)
- [ ] No changes to existing adapters (wraps, doesn't modify)
- [ ] Import validates: `python3 -c "from app.appsec.provider_orchestration import refresh_provider"`

## Step 3: /providers/* endpoints
- [ ] `GET /providers/status` returns freshness for all providers
- [ ] `POST /providers/{id}/refresh` triggers single provider refresh
- [ ] `POST /providers/refresh` triggers all providers
- [ ] Endpoints return meaningful error messages on failure

## Step 4: build_aggregate refactor
- [ ] `provider_snapshots` parameter added (optional)
- [ ] If snapshots provided: uses them instead of live pulls
- [ ] Legacy live-pull path FULLY PRESERVED (no removal)
- [ ] `_status_from_snapshot()` helper builds provider_status from metadata
- [ ] Veracode background thread + disk cache UNTOUCHED

## Step 5: Wire /aggregate
- [ ] `?refresh=false` (default) reads snapshots
- [ ] `?refresh=true` triggers foreground refresh then uses snapshots
- [ ] `?refresh=ghas,veracode` refreshes specific providers
- [ ] No snapshots available → falls back to live-pull (zero breakage)
- [ ] Response includes `snapshot_ages` metadata

## Step 6: Health enrichment
- [ ] `/health` includes per-provider freshness
- [ ] `provider_status` in aggregate gains `freshness_state` and `snapshot_age_seconds`

## Cross-Step Validation
- [ ] GHAS failure does NOT block Veracode/AGHAS
- [ ] Pod restart → `/aggregate` returns data from Cosmos snapshots
- [ ] `GET /providers/status` shows `fresh`, `stale`, `error`, or `never_fetched` accurately
- [ ] No Cosmos document exceeds 2 MB (LM-039 — chunk if needed)
- [ ] Truth labeling: all snapshot-sourced data carries freshness metadata

## Landmines to Watch
- LM-013: AGHAS endpoint (advsec.dev.azure.com)
- LM-014: AGHAS pagination circular bug
- LM-035: Aggregate staleness
- LM-037: Live-provider timeout
- LM-039: Cosmos 2 MB limit
