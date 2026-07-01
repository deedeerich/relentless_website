# Relentless — Current State

> Last updated: 2026-05-14 (source: session history, T2)

## Platform

| Component | Status | Details |
|-----------|--------|---------|
| Shopify Store | Live (password-protected) | `40hj3b-xx.myshopify.com`, theme ID `141421346914` |
| Custom Liquid Theme | Deployed | "Relentless — Nothing Is Finished", all sections built |
| DNS (relentlessperforma.com) | Active | A records → 23.227.38.65 (Shopify), SSL provisioned |
| DNS (nothingsfinished.com) | Active | Connected in Shopify, redirects to relentlessperforma.com, TLS provisioning |
| GitHub Repo | Active | `deedeerich/relentless_website`, branch: develop |
| CI/CD Pipeline | Partial | GitHub Actions configured, but Shopify token type wrong (shpss_ returns 401) |

## Theme Build Status

| Section | Built | Deployed |
|---------|-------|----------|
| hero-cosmos.liquid | Yes | Yes |
| header.liquid | Yes | Yes |
| footer.liquid | Yes | Yes |
| philosophy-strip.liquid | Yes | Yes |
| community-section.liquid | Yes | Yes |
| content-channel.liquid | Yes | Yes (has `!nished` typo fix pending push) |
| shop-teaser.liquid | Yes | Yes |
| outreach-banner.liquid | Yes | Yes |
| announcement-bar.liquid | Yes | Yes |
| page-philosophy.liquid | Yes | Yes |
| page-still-becoming.liquid | Yes | Yes |
| page-still-building.liquid | Yes | Yes |
| cart-drawer.liquid | Yes | Yes |
| cookie-consent.liquid | Yes | Yes |
| password.liquid (layout) | Yes | Yes |

## Shopify Pages Created

- Still Becoming (`/pages/still-becoming`) — created, needs custom template assignment
- Still Building (`/pages/still-building`) — created, needs custom template assignment
- Philosophy (`/pages/philosophy`) — created, needs custom template assignment

## Integrations

| Integration | Status |
|-------------|--------|
| Klaviyo | Not started — account not created |
| AI Moderation (screener.py) | Gate 1 built, not wired to Airtable |
| YouTube embed | Section built, no channel content yet |
| Instagram | Handle TBD, link placeholder only |
| Countdown Timer Bar | Not installed |
| Smile.io | Not installed |

## Git State

- Branch: `develop` (ahead of `main` by multiple commits)
- Latest commit: `db8776e` — fix: point shop links to waitlist section, fix DNS verify SSL fallback
- Uncommitted: typo fix in content-channel.liquid (`!nished` → `Finished`)
- All changes pushed to origin/develop as of last session

## Known Issues

1. **Store password still enabled** — blocks all public access (403). Owner-only setting, requires Chelsea.
2. **CI/CD token wrong type** — `shpss_` (Partner Staff) tokens return 401 on theme push. Need `shpat_` or Theme Access password.
3. **Page templates not assigned** — Pages created but using "Default page" template, need custom template assignment after password disabled.
4. **No products in shop** — "Be Relentless" / shop links point to `#shop` (waitlist section) as placeholder.
