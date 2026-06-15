# Deployment Validation Checklist

> Run after every deploy. No "it's fine, the build passed."

## Pre-Deploy
- [ ] PR approved and merged to main
- [ ] All CI checks green (build, lint, security)
- [ ] No critical/high Trivy findings on image
- [ ] No force-push or hook bypass used
- [ ] Commit message follows convention (`feat:`, `fix:`, `refactor:`, `docs:`)

## Deploy Pipeline
- [ ] `build-push-aegis-ui.yml` triggered automatically
- [ ] Build stage succeeded
- [ ] Trivy scan passed
- [ ] Image pushed to `lhgsharedacr.azurecr.io/aegis-ui/{component}:{sha}`
- [ ] Container App revision created
- [ ] Revision activated (traffic shifted)

## Post-Deploy
- [ ] Health check: `GET /health` returns 200
- [ ] API smoke: `GET /api/v1/appsec/aggregate` returns data (not error, not empty)
- [ ] Frontend loads: homepage renders without console errors
- [ ] Provider status: at least one provider shows non-error state
- [ ] If touching Cosmos: verify reads/writes work (decisions, lifecycle, work items)
- [ ] If touching adapters: verify provider data flows (check trust strip)

## Rollback Criteria
If ANY post-deploy check fails:
1. Identify previous healthy revision in Container Apps
2. Shift traffic back to previous revision
3. Document what failed in continuation.md
4. Do NOT attempt to "fix forward" without understanding the failure

## Known Gotchas
- Pod restart loses Veracode in-memory cache (LM-036) — 2-min "pending" is expected
- KV network ACLs still Allow (LM-044) — not a deploy blocker but track
- Ephemeral disk means no file-based state survives (LM-045)
