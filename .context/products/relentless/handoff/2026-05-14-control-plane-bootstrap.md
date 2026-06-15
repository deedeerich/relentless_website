# Handoff Packet — 2026-05-14 — Control Plane Bootstrap + Theme Deploy Status

## What Changed

- Bootstrapped Agentic Work Control Plane for Relentless repo (`.context/shared/`, `.context/products/relentless/`, `.agents/`)
- Synced 17 shared governance docs, 5 checklists, 8 role agent templates, 2 ops agent templates from `agentic-control-plane`
- Created Relentless product agent template (`.agents/product/relentless.agent.md`)
- Created product context files: current-state.md, active-lane.md, decisions.md, risks.md
- Fixed typo in content-channel.liquid: `!nished` → `Finished` (line 46)
- Previous sessions: built entire Shopify Liquid theme, deployed to store, configured DNS, provisioned SSL

## Current State

- **Active lane:** Get site publicly visible — blocked on Chelsea disabling store password
- **Build status:** Pass (theme deployed, all sections built)
- **Deploy status:** Theme live on `40hj3b-xx.myshopify.com` (theme ID 141421346914), password-protected
- **Domain status:** relentlessperforma.com → Shopify (23.227.38.65), SSL active. nothingsfinished.com → redirects to relentlessperforma.com, TLS provisioning (as of 2026-05-14)

## Validation Performed

- [x] Theme pushed to Shopify (interactive browser auth, not CI)
- [x] DNS A records verified: `23.227.38.65` (Shopify)
- [x] SSL/TLS verified: certificate valid for relentlessperforma.com
- [x] Domain redirect verified: relentlessperforma.com → www.relentlessperforma.com → /password (store password active)
- [x] nothingsfinished.com → 301 to relentlessperforma.com (TLS provisioning)
- [ ] Public site visual verification — BLOCKED by store password
- [ ] WCAG 2.1 AA audit — not yet run
- [ ] Shopify theme check — warnings addressed, no blockers

## Files Touched (This Session)

| File | Change |
|------|--------|
| `shopify/theme/sections/content-channel.liquid:46` | Fixed typo: `!nished` → `Finished` |
| `.context/shared/*` (17 files) | NEW — synced governance docs from agentic-control-plane |
| `.context/checklists/*` (5 files) | NEW — synced shared checklists |
| `.agents/role/*` (8 files) | NEW — role agent templates |
| `.agents/ops/*` (2 files) | NEW — ops agent templates |
| `.agents/product/relentless.agent.md` | NEW — Relentless product agent |
| `.context/products/relentless/current-state.md` | NEW — product current state |
| `.context/products/relentless/active-lane.md` | NEW — active execution focus |
| `.context/products/relentless/decisions.md` | NEW — 9 product decisions recorded |
| `.context/products/relentless/risks.md` | NEW — 5 active risks registered |

## Files Touched (Previous Sessions — Key Changes)

| File | Change |
|------|--------|
| `shopify/theme/layout/password.liquid` | NEW — branded password page with cosmos canvas |
| `shopify/theme/sections/main-password.liquid` | Rewritten to schema-only |
| `shopify/theme/templates/password.json` | Added `"layout": "password"` |
| `shopify/theme/config/settings_data.json` | NEW — brand defaults (colors, social, nav labels) |
| `shopify/theme/config/settings_schema.json` | Fixed url defaults, support URL |
| `shopify/theme/locales/en.default.json` | Added accessibility.cart key |
| `shopify/theme/assets/relentless.css` | Password page CSS (Section 26) |
| `shopify/theme/sections/header.liquid` | Fixed shop links to #shop |
| `shopify/theme/sections/footer.liquid` | Fixed Be Relentless link to #shop |
| `shopify/theme/sections/hero-cosmos.liquid` | Fixed bloom shop link to #shop |
| `scripts/dns_verify.py` | SSL check fallback to curl for macOS |
| `.env.example` | Updated store URL |
| `.github/SECURITY_SETUP.md` | Updated store URL |
| `.gitignore` | Unignored settings_data.json |

## Decisions Made

- RDEC-001 through RDEC-009 recorded in `.context/products/relentless/decisions.md` → Yes
- Domain primary set to relentlessperforma.com (RDEC-008) → Yes
- Shop links to #shop until products exist (RDEC-007) → Yes
- Collaborator access model documented (RDEC-009) → Yes

## Risks / Landmines Discovered

- Store password is owner-only — collaborators cannot disable it → RISK-001, Yes
- `shpss_` tokens don't work for CI/CD theme push → RISK-002, Yes
- Shopify `url` type settings cannot have `default` values → documented in decisions
- macOS Python lacks system certs for SSL verification → fixed with curl fallback
- CNAME records conflict with existing A records on same hostname → resolved with dual A records

## Next Action

1. **Chelsea disables store password** (CRITICAL BLOCKER)
2. Push typo fix to Shopify: `shopify theme push --store=40hj3b-xx.myshopify.com --path shopify/theme --theme 141421346914`
3. Assign custom page templates in Shopify Admin
4. Visual verification on desktop + mobile
5. Create Klaviyo account and wire up waitlist/newsletter forms

## Do-Not-Do List

- Do NOT add products to the shop (Stephen's decision, not ours)
- Do NOT install apps beyond the approved list in CLAUDE.md
- Do NOT build Instagram integration (Phase 2)
- Do NOT wire AI moderation to production (Phase 2 — screener.py is built but not connected)
- Do NOT merge develop to main until site is publicly verified

## Parking Lot Additions

- AI moderation Airtable wiring (Phase 2) → Not yet in parking lot (active backlog)
- CommentSold for Instagram Live auctions (Phase 2+) → documented in CLAUDE.md
- Ambassador profile pages (waiting on names from Stephen) → documented in risks
- Content submission form + moderation queue (Phase 2) → documented in CLAUDE.md
