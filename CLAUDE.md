# CLAUDE.md — Relentless Project Workspace

This file is read automatically by Claude Code on every session. It contains full project context, architecture decisions, security requirements, and build status. Do not re-ask questions answered here.

---

## Project Overview

**RELENTLESS** — growth-mindset athletic brand, e-commerce, and community platform.
- Primary domain: `relentlessperforma.com`
- `nothingsfinished.com` is parked — not in use.
- Clients: Stephen and Chelsea (founders). Existing business: Edges & Dreams (DBA parent).
- Legal: Relentless operates as a DBA under Edges & Dreams LLC. Separate brand, shared tax entity.
- Lead developer: Cloud security architect, full-stack dev, AI builder. Security-first, no compliance shortcuts.
- Target launch: Mid-April to early May 2026.

---

## Four Pillars (Site Navigation)

1. **You Are Still Becoming** — Mindset / Blog / Growth / Athlete Stories / Performance Psychology
2. **We Are Still Building** — Community / Impact / Volunteering / Mentorship / Programs
3. **Nothing Is Finished** — Brand Philosophy / Manifesto / Origin Story / Mission / Vision
4. **Be Relentless** — Shop / Apparel / Exclusive Drops / Gear / Ambassadors

---

## Tech Stack (All Decisions Confirmed — Do Not Re-Litigate)

| Service | Role | Cost |
|---------|------|------|
| Shopify Basic | Store, blog, pages, SSL, CDN, checkout, PCI compliance. Custom Liquid theme. | $39/mo |
| Klaviyo | Email marketing, behavioral triggers, drop notifications. Native Shopify integration. | Free to 250 contacts |
| Square | In-store payments at Edges & Dreams ONLY. Completely separate from Relentless. | Existing |
| Airtable | Moderation queue dashboard. | Free tier |
| OpenAI Moderation API | AI content screening Gate 1. | ~$1-5/mo |
| YouTube | Video hosting, embedded into Shopify pages. | Free |
| Directnic | Domain registrar. DNS A record + CNAME to Shopify. | ~$12/yr |
| Countdown Timer Bar | Shopify app for timed drops. | Free |

**No local server. No self-managed database. Everything cloud-hosted.**

---

## Commands

```bash
# Shopify CLI (theme development)
shopify theme dev --store=relentlessperforma    # Local dev preview
shopify theme push --store=relentlessperforma   # Push theme to Shopify
shopify theme pull --store=relentlessperforma   # Pull latest from Shopify

# Linting
npm run lint                                     # ESLint on JS/Liquid
npx prettier --check .                           # Format check

# Security checks
npm audit                                        # Dependency audit
npx trufflehog filesystem . --no-update          # Secret scanning

# DNS verification
python3 scripts/dns_verify.py                    # Check DNS propagation

# Moderation screener (local test)
python3 moderation/ai_screener/screener.py       # Test AI Gate 1
```

---

## Architecture

### User Tiers
1. **Public/Guest** — view all content, browse shop, guest checkout. No login required.
2. **Logged-In Member** — comment, share, save orders, personalized experience.
3. **Content Submitter** — submit articles for review queue. MFA required.
4. **Reviewer/Admin** — moderation queue, audit log, full site config. MFA required.

### Content Moderation (Two-Gate System)
- **Gate 1 (AI):** Every submission hits OpenAI Moderation API. Hard fails auto-rejected. Clean passes queued. Ambiguous ~10% flagged for human review.
- **Gate 2 (Human):** Stephen/Chelsea/staff see only the flagged bucket. Approve / Request Edits / Reject with feedback.
- Full audit log: submitter, reviewer, timestamp, decision.
- Airtable dashboard for the review queue.
- Classifier improves over time from human review decisions.

### Exclusive Drops & Auctions
- **Phase 1:** Shopify native timed drop. Qty=1, scheduled publish, Countdown Timer Bar. First to checkout wins.
- **Phase 1 alt:** Shopify Draft Orders (free, manual). Stephen DMs checkout link to winner.
- **Phase 2:** CommentSold for Instagram Live auctions (3-5% of sales, zero fixed cost).
- **Phase 2 alt:** Bold Auction app ($20/mo) for on-site ascending-bid auctions.

### Ambassador & Spotlight System
- **User Spotlights:** community-submitted content elevated to featured slots. Rotating monthly. Reviewer-controlled.
- **Ambassadors:** personally invited by Stephen/Chelsea. Dedicated profile page, early drop access, personal discount code via Smile.io.
- **Flywheel:** submit -> approved -> spotlighted -> invited as ambassador -> ambassador drives new submissions -> repeat.

### Edges & Dreams / Relentless Separation
- Separate Shopify stores under same DBA tax entity
- Same Shopify Payments account, deposits to same bank
- Separate customer lists — no cross-contamination
- Square sales at physical store do NOT appear in Relentless Shopify

---

## Security Rules (Non-Negotiable)

These rules apply to ALL code written in this repo. Never bypass or weaken them.

- **Zero-touch payments.** Card data NEVER on Relentless servers. Shopify handles all PCI scope. SAQ-A target.
- **TLS 1.3** in transit. Column-level encryption at rest. Bcrypt/Argon2 passwords only.
- **RBAC** across all four user tiers. JWT/session auth with refresh token rotation. Rate limiting on all endpoints.
- **MFA** optional for standard members. MANDATORY for submitters, reviewers, admins.
- **All input sanitized.** SQL injection, XSS, CSRF protections on all forms. CSP headers sitewide.
- **Full audit log:** moderation actions, admin changes, content decisions (who, what, when, outcome).
- **Nothing user-generated auto-publishes.** Everything goes through moderation queue.
- **No secrets in code.** Use `.env` files (gitignored) and Shopify environment variables.
- **No self-hosted email.** Always use Klaviyo via API.
- **Double opt-in** on all newsletter signups.

---

## Compliance (Active From Day One)

| Regulation | Status | Key Requirements |
|-----------|--------|-----------------|
| PCI-DSS SAQ-A | ACTIVE | Shopify handles all scope. Zero-touch architecture. |
| GDPR | ACTIVE | Privacy policy, cookie consent, right-to-deletion, data retention. |
| CCPA | ACTIVE | Do Not Sell mechanism, privacy rights disclosure in footer. |
| COPPA | NOT IN SCOPE | No under-13 users. Confirmed by Chelsea. |
| CAN-SPAM / CASL | ACTIVE | Opt-in, unsubscribe on every email, sender identification. |
| ADA / WCAG 2.1 AA | ACTIVE | Accessible design from day one. Alt text, keyboard nav, contrast ratios. |

---

## Design Reference

- Three confirmed logos in `design/logos/`:
  1. **RELENTLESS PERFORMA** — primary brand mark, dark background
  2. **NOTHING IS FINISHED / RELENTLESS** — manifesto lockup, dark background, hero use
  3. **RELENTLESS.** with period and underline — utility mark, light background
- Brand is **pure black/white typographically**. Gold is site accent color only.
- Homepage mockup: `design/homepage_mockup.html` — replicate exactly in Shopify Liquid theme.
- Mobile-first responsive design required.

---

## Shopify Theme Structure

```
shopify/theme/
  layout/theme.liquid            # Base HTML wrapper, CSP headers, meta tags
  templates/index.json           # Homepage section schema
  sections/                      # Reusable section components
  snippets/                      # Reusable Liquid partials
  assets/                        # CSS, JS, images
  config/settings_schema.json    # Theme settings (colors, fonts, social links)
  locales/                       # i18n strings
```

All theme code lives in `shopify/theme/`. Use Shopify CLI to push/pull.

---

## Git Workflow

- **`main`** — production. Protected branch. Requires PR review.
- **`develop`** — staging/integration. Auto-deploys to staging.
- Feature branches: `feature/<name>`, `fix/<name>`, `docs/<name>`
- Commit style: conventional commits (`feat:`, `fix:`, `docs:`, `chore:`, `security:`)
- Never commit secrets, .env files, or API keys.
- CODEOWNERS enforced on all sensitive paths.

---

## Shopify App Stack

### Install at Launch
- Klaviyo (free -> paid)
- Countdown Timer Bar (free)
- Shopify Product Reviews (free)
- Smile.io (free -> $49/mo)

### Phase 2 Only
- CommentSold (% of sales)
- SEO Manager ($29/mo)
- accessiBe/AudioEye ($49/mo)
- Bold Auction ($20/mo if needed)

### Never Install
PageFly/GemPages, upsell apps, inventory management apps, subscription apps (until membership tier built), ShipStation, live chat apps.

---

## Community Guidelines (Confirmed by Chelsea — Use Verbatim in TOS)

No hate speech, pornography, harassment, threats, bullying, spam, trolling, illegal activity, graphic content, impersonation, or exploitative behavior. No glamorizing self-harm, eating disorders, addiction, or abuse. No excessively negative, degrading, or divisive content conflicting with growth, resilience, faith, and encouragement. No self-promotion where primary purpose is to advertise, sell, recruit, or drive commercial traffic. Relentless is not a marketing platform. Content must share insight, growth, or meaningful experience.

---

## Build Sequence & Status

### Phase 1 — Foundation (Weeks 1-2)
- [x] Receive logo files and brand hex codes
- [ ] Connect relentlessperforma.com DNS to Shopify
- [ ] Configure Shopify: SSL, HTTPS enforcement, CSP headers, rate limiting
- [ ] Set up auth system, RBAC, JWT/session management, MFA flows
- [ ] Build content moderation queue, AI pre-screening layer, audit log
- [ ] Configure Klaviyo — separate from Edges & Dreams list
- [ ] Draft and publish: Privacy Policy, Terms of Service, Community Guidelines, Cookie Consent

### Phase 2 — Core Build (Weeks 2-4)
- [ ] Homepage design using confirmed brand assets (replicate `design/homepage_mockup.html`)
- [ ] Four pillar pages
- [ ] Coming soon shop page with waitlist email capture
- [ ] User account system, profiles, order history
- [ ] Content submission form and reviewer admin panel
- [ ] Ambassador profile pages (names TBD)
- [ ] Exclusive drop mechanism

### Phase 3 — Pre-Launch (Weeks 4-6)
- [ ] WCAG 2.1 AA accessibility audit
- [ ] Security review — pen test checklist, headers, input validation
- [ ] Newsletter welcome sequence in Klaviyo
- [ ] Soft launch — coming soon live, waitlist collecting
- [ ] Ambassador content loaded
- [ ] First exclusive drop announced
- [ ] Full launch

---

## Recently Confirmed Decisions (2026-03-23)

- **YouTube first, Instagram Phase 2.** Launch social presence on YouTube. Instagram comes later once traffic picks up.
- **First drop is traffic-dependent.** No fixed drop date — triggered by initial site traffic volume.
- **Budget approved as planned.** ~$40-45/mo at launch, scaling to ~$185-275/mo at growth stage.
- **Ambassador names incoming.** Stephen and Chelsea will provide the list shortly.

## Open Items (Waiting on Stephen & Chelsea)

- Ambassador names for launch (coaches and skaters to feature) — expected soon
- Logo digital files for `design/logos/` (confirmed to exist, need the actual files)
