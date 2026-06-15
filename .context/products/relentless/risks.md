# Relentless — Risk Register

> Active risks. Retired risks move to archived section with resolution date.

---

## Active Risks

### RISK-001 — Store password blocks all public access
**Severity:** Critical
**Owner:** Chelsea (store owner)
**Status:** Open (as of 2026-05-14)
**Impact:** Site is completely invisible to the public. 403 on all pages. May 1 event has passed — every day this is on, the launch window erodes.
**Mitigation:** Send Chelsea exact steps: Shopify Admin → Online Store → Preferences → uncheck "Enable password" → Save. Requires store address to be filled first.
**Do not close until:** Site is publicly accessible and verified.

### RISK-002 — CI/CD token type mismatch
**Severity:** High
**Owner:** @deedeerich + Chelsea
**Status:** Open (as of 2026-05-14)
**Impact:** GitHub Actions cannot push theme to Shopify. `shpss_` (Partner Staff Secret) tokens return 401. Need `shpat_` (Custom App) or Theme Access password.
**Mitigation:** Chelsea creates a Custom App in Shopify Admin (Settings → Apps and sales channels → Develop apps) or installs Theme Access app. Workaround: interactive `shopify theme push` via browser auth.
**Do not close until:** CI/CD pipeline successfully pushes theme via automated token.

### RISK-003 — Ambassador names overdue
**Severity:** Medium
**Owner:** Stephen
**Status:** Open (as of 2026-05-14)
**Impact:** Ambassador section on site shows "coming soon." Was due April 12. Does not block launch but delays community section completion.
**Mitigation:** Follow up with Stephen.

### RISK-004 — No products in Shopify
**Severity:** Medium
**Owner:** Stephen/Chelsea
**Status:** Open (as of 2026-05-14)
**Impact:** Shop section is waitlist-only. No revenue until products are published. First drop date TBD.
**Mitigation:** Shop links point to `#shop` (waitlist) instead of empty collections. Countdown Timer Bar app planned for timed drops.

### RISK-005 — Logo digital files not received
**Severity:** Low
**Owner:** Stephen/Chelsea
**Status:** Open (as of 2026-05-14)
**Impact:** Theme uses text-based logo fallback ("RELENTLESS / PERFORMA"). Works but not ideal.
**Mitigation:** Text fallback in header.liquid and footer.liquid. Image renders when `settings.logo` is set.

## Archived Risks

| ID | Risk | Resolution | Date |
|----|------|-----------|------|
| — | (none yet) | — | — |
