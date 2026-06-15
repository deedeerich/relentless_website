# Relentless — Product Decisions

> Decisions specific to Relentless. Shared governance decisions are in .context/shared/DECISION_LEDGER.md

---

## RDEC-001 — Shopify Basic is the platform (no self-hosted)
**Status:** Accepted
**Decision:** All commerce, pages, blog, and checkout run on Shopify Basic ($39/mo). No self-hosted server, no custom database, no infrastructure management.
**Rationale:** PCI compliance via SAQ-A (zero-touch). CDN, SSL, checkout, inventory all managed. Stephen and Chelsea are non-technical — admin UI is essential.
**Do not relitigate unless:** Shopify pricing exceeds $200/mo or feature gap is blocking revenue.

## RDEC-002 — Custom Liquid theme, no page builders
**Status:** Accepted
**Decision:** Custom-built Liquid theme. No PageFly, GemPages, or third-party page builders.
**Rationale:** Page builders add bloat, break accessibility, create vendor lock-in. The design is specific enough that a page builder would fight it.
**Do not relitigate unless:** Never. The theme is built.

## RDEC-003 — Cosmos starfield canvas is core brand identity
**Status:** Accepted
**Decision:** The animated canvas starfield (600 stars, 22 bokeh orbs, 6 nebula clouds, shooting stars, constellation SVG) is permanent. Not decorative — it IS the brand experience.
**Rationale:** The cosmos effect defines the visual identity. Removing it would fundamentally change what Relentless feels like.
**Do not relitigate unless:** Performance on target devices (phones at May 1 event) is measurably poor.

## RDEC-004 — Four-pillar navigation with bloom expansion
**Status:** Accepted
**Decision:** Homepage nav is four bloom cards that expand on hover/tap to reveal destination, copy, and CTA. Not a traditional nav menu.
**Rationale:** The bloom system IS the brand storytelling. Each line is a philosophy statement. The expansion is the invitation.
**Do not relitigate unless:** User testing shows >50% bounce rate from confusion.

## RDEC-005 — Two-gate content moderation (AI + human)
**Status:** Accepted
**Decision:** All user-submitted content goes through AI Gate 1 (OpenAI moderation API) then human Gate 2 (Stephen/Chelsea via Airtable queue). Nothing auto-publishes.
**Rationale:** Brand voice is deeply personal. Automated publishing risks off-brand content. On API failure, route to human review (fail-closed).
**Do not relitigate unless:** Volume exceeds human review capacity (>100 submissions/day).

## RDEC-006 — Phase 1 social is YouTube + Klaviyo only
**Status:** Accepted
**Decision:** At launch, only YouTube (embedded) and Klaviyo (email/newsletter) are integrated. Instagram added Phase 2, TikTok Phase 3+.
**Rationale:** Focus. Stephen and Chelsea can't manage all platforms simultaneously at launch.
**Do not relitigate unless:** Stephen/Chelsea explicitly request adding a platform.

## RDEC-007 — Shop links point to waitlist section until products exist
**Status:** Accepted
**Decision:** All "Shop The Movement" and "Be Relentless" links point to `#shop` (scroll to waitlist/coming-soon section) instead of `/collections/all`.
**Rationale:** No products exist yet. An empty collection page is a bad experience. The waitlist section captures intent.
**Do not relitigate unless:** Products are published in Shopify.

## RDEC-008 — relentlessperforma.com is primary domain
**Status:** Accepted
**Decision:** `relentlessperforma.com` is the primary Shopify domain. `nothingsfinished.com` redirects to it via 301.
**Rationale:** Brand name is Relentless Performa. nothingsfinished.com is a supporting/parked domain, not the identity.
**Do not relitigate unless:** Brand rename.

## RDEC-009 — Collaborator access model with Chelsea as store owner
**Status:** Accepted
**Decision:** Chelsea owns the Shopify store. @deedeerich is a collaborator with full theme access. Store-level settings (password, address, billing) are owner-only.
**Rationale:** Shopify's permission model. Collaborators cannot change store identity or password protection settings.
**Consequences:** Certain actions (disable password, create Custom App, change store address) require Chelsea.
**Do not relitigate unless:** Ownership is transferred.
