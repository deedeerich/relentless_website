# CLAUDE.md — Relentless Project Workspace

This file is read automatically by Claude Code on every session. It contains full project context, architecture decisions, security requirements, and build status. Do not re-ask questions answered here. **You (Claude Code) are the primary builder for this project.**

---

## Project Overview

**RELENTLESS** — growth-mindset athletic brand, e-commerce, and community platform.
- Primary domain: `relentlessperforma.com`
- `nothingsfinished.com` is parked — not in use.
- Clients: Stephen and Chelsea (founders). Existing business: Edges & Dreams (DBA parent).
- Legal: Relentless operates as a DBA under Edges & Dreams LLC. Separate brand, shared tax entity.
- Lead developer: @deedeerich — cloud security architect, full-stack dev, AI builder. Security-first, no compliance shortcuts.
- **TARGET LAUNCH: April 24, 2026** — operational soft launch. Hard deadline.
- **MAY 1, 2026** — Stephen's ballroom event in Colorado. Full room of athletes. Relentless announced live. People will open it on phones in the room. This is the real launch moment.
- Ambassador names needed by April 12.

---

## Your Primary Responsibilities

1. Build and maintain the Shopify Liquid theme (`shopify/theme/`)
2. Build and maintain the AI moderation pipeline (`moderation/`)
3. Build and maintain Klaviyo integration hooks (`klaviyo/`)
4. Write and run utility scripts (`scripts/`)
5. Keep all security controls active and never weaken them

---

## Four Pillars (Site Navigation)

| Slug | Page Title | What Lives Here |
|------|-----------|-----------------|
| `/` | Homepage | Hero lockup, four pillars with bloom reveal on hover/scroll. Minimal — an invitation, not an explanation. |
| `/pages/still-becoming` | You Are Still Becoming | Blog/mindset, athlete stories, content channel, submission form |
| `/pages/still-building` | We Are Still Building | Community, outreach, give time/resources/energy, cause areas |
| `/pages/philosophy` | Nothing Is Finished | Brand manifesto, origin story, mission, vision. Subtle faith/theology easter egg. |
| `/collections/shop` | Be Relentless | Shop, exclusive drops, coming soon, waitlist |

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

## Non-Negotiable Rules

### Security
- **NEVER hardcode API keys, tokens, secrets, or credentials.** Use `os.environ.get('KEY_NAME')` or Shopify settings schema.
- **NEVER commit .env files.** They are in .gitignore. Verify before every commit.
- **All user input sanitized** before touching any database or API.
- **SQL injection, XSS, CSRF protections** required on all forms.
- **CSP headers, X-Frame-Options, HSTS, Referrer-Policy** must be set.
- **Rate limiting** on all endpoints — especially login and submission.
- **MFA mandatory** for Content Submitter, Reviewer, and Admin roles.
- **Passwords** use Bcrypt or Argon2 only. Never MD5, SHA1, plain text.
- **TLS 1.3** in transit. HTTP auto-redirects to HTTPS.
- **Column-level encryption** on PII fields at rest.
- **Zero-touch payments.** Card data NEVER touches this codebase. Shopify handles all PCI scope (SAQ-A).
- **Full audit log:** moderation actions, admin changes, content decisions (who, what, when, outcome).
- **Nothing user-generated auto-publishes.** Everything goes through moderation queue.
- **Double opt-in** on all newsletter signups.
- **No self-hosted email.** Always use Klaviyo via API.

### Compliance (Active From Day One)

| Regulation | Status | Key Requirements |
|-----------|--------|-----------------|
| PCI-DSS SAQ-A | ACTIVE | Shopify handles all scope. Zero-touch architecture. |
| GDPR | ACTIVE | Privacy policy, cookie consent, right-to-deletion, data retention. |
| CCPA | ACTIVE | Do Not Sell mechanism, privacy rights disclosure in footer. |
| COPPA | NOT IN SCOPE | No under-13 users. Confirmed by Chelsea. |
| CAN-SPAM / CASL | ACTIVE | Opt-in, unsubscribe on every email, sender identification. |
| ADA / WCAG 2.1 AA | ACTIVE | Accessible design from day one. Alt text, keyboard nav, contrast ratios. |
| HIPAA | NOT IN SCOPE | No health data collected. |

---

## Design Reference — CRITICAL

The design has evolved significantly. The reference files are the source of truth:

### Primary Reference Files
- `docs/design/relentless_homepage_v2.html` — **THE definitive homepage design** (latest)
- `docs/design/still_building.html` — "We Are Still Building" pillar page (complete)
- `relentless_homepage.html` — earlier homepage version (keep for reference)
- `design/homepage_mockup.html` — simplified mockup (superseded by v2)

### Brand Colors (from v2 design — NOT flat black)
```css
:root {
  --gold: #D4982E;
  --gold-light: #F0C050;
  --gold-dim: #8B6420;
  --gold-glow: rgba(212,152,46,0.35);
  --black: #050403;         /* Deep warm dark, NOT flat black */
  --dark: #0c0a07;
  --dark-2: #111009;
  --dark-3: #18150e;
  --white: #f5f0e8;         /* Warm white, NOT pure white */
  --white-dim: rgba(245,240,232,0.72);
  --white-ghost: rgba(245,240,232,0.18);
}
```

### Typography (3 fonts — all from Google Fonts)
- **Bebas Neue** — hero title ("NOTHING is FINISHED"), section headings, shop teaser
- **Cormorant Garamond** — pillar lines, philosophy copy, italic accents, serif feel
- **Barlow / Barlow Condensed** — nav, labels, body copy, CTAs, all UI text

### Cosmos Starfield Effect (MUST preserve in Liquid theme)
The homepage has a fixed `<canvas>` cosmos background with:
- 600 twinkling stars (warm amber + cool whites)
- 22 bokeh light orbs (60% weighted to left third)
- 6 nebula clouds (soft atmospheric depth)
- Shooting stars (random, 0.3% chance per frame)
- Constellation SVG overlay on hero (gold lines + dots)
- Light arc sweeping diagonal

This is core to the brand experience — see `drawCosmos()` in `relentless_homepage_v2.html`.

### Homepage UX — Bloom System
- Hero loads CLEAN and minimal: logo lockup, four pillar lines, one CTA
- Pillars are NOT front-loaded with content
- On hover/focus, each pillar BLOSSOMS — reveals destination, feeling, copy
- On mobile: tap to expand instead of hover
- "Be relentless" line is gold/italic (special treatment)
- Rotating mantra text beneath pillars
- CTA: "Enter the Movement" + "Join the movement" text link

### Section Layout (homepage scroll order)
1. Hero (cosmos bg + constellation SVG + bloom pillars)
2. Philosophy strip
3. We Are Still Building (give grid + cause cards)
4. Content channel (YouTube + submission CTA)
5. Shop teaser (coming soon + waitlist)
6. Outreach banner
7. Footer (4-column: brand, pillars, community, legal)

### "Nothing Is Finished" Philosophy Page — Faith Easter Egg
Subtle theological undercurrent. Language of *calling*, *purpose*, *made for more*, *unfinished work*, *not by accident*. The people on a spiritual path recognize it. Everyone else reads it as profound growth philosophy. Both are correct. Both are welcome. Never overt — "take it or leave it."

---

## Shopify Theme Build Guide

### Section naming convention
```
sections/hero-cosmos.liquid          ← homepage hero with cosmos background
sections/pillars-nav.liquid          ← four pillar navigation cards
sections/philosophy-strip.liquid     ← brand philosophy section
sections/community-section.liquid    ← give time/resources/energy + causes
sections/content-channel.liquid      ← YouTube channel embed + submission CTA
sections/shop-teaser.liquid          ← coming soon + waitlist capture
sections/outreach-banner.liquid      ← relentless outreach CTA
sections/header.liquid               ← site navigation
sections/footer.liquid               ← site footer with legal links
sections/announcement-bar.liquid     ← top bar for drop announcements
snippets/cookie-consent.liquid       ← GDPR cookie consent banner
snippets/cart-drawer.liquid          ← slide-out cart
```

### CSS/JS
- Primary CSS: `assets/relentless.css`
- Primary JS: `assets/relentless.js`
- Cosmos starfield canvas JS belongs in `assets/relentless.js`
- Use CSS custom properties for all brand colors — defined in `:root`

### Accessibility checklist (WCAG 2.1 AA — required before every deploy)
- [ ] All images have descriptive `alt` attributes
- [ ] Skip-to-content link is the first focusable element
- [ ] Color contrast ratio >= 4.5:1 for normal text, >= 3:1 for large text
- [ ] All interactive elements are keyboard navigable
- [ ] Focus states are visible
- [ ] Form inputs have associated labels
- [ ] ARIA roles used correctly where needed
- [ ] No content relies on color alone to convey meaning

---

## Environment Variables

All secrets live in `.env` (local) or GitHub Secrets (CI/CD).
See `.env.example` for the complete list. Never ask for or print secret values.

---

## Commands

```bash
# Shopify CLI (theme development)
shopify theme dev --store=relentlessperforma    # Local dev preview
shopify theme push --store=relentlessperforma   # Push theme to Shopify
shopify theme pull --store=relentlessperforma   # Pull latest from Shopify
shopify theme check                             # Lint theme before deploy

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
| Tier | Permissions | Auth Required |
|------|-------------|---------------|
| Public / Guest | View all content, browse shop, guest checkout | None |
| Logged-In Member | Comment, share, save orders | Email + password |
| Content Submitter | Submit articles for review | Login + **MFA mandatory** |
| Reviewer / Admin | Moderation queue, audit log, site config | Login + **MFA mandatory** |

### Content Moderation — Two-Gate System
```
Submission -> AI Gate 1 (screener.py) -> HARD FAIL: auto-reject
                                       -> CLEAN: queue for feed
                                       -> AMBIGUOUS: Airtable human review queue
                                                         |
                                               Gate 2: Stephen/Chelsea/staff
                                               Approve / Request Edits / Reject
                                                         |
                                                   Audit log entry
```
On ANY API failure, route to human review — never silently approve.

### Exclusive Drops & Auctions
- **Phase 1:** Shopify native timed drop. Qty=1, scheduled publish, Countdown Timer Bar. First to checkout wins.
- **Phase 1 alt:** Shopify Draft Orders (free, manual). Stephen DMs checkout link to winner.
- **Phase 2:** CommentSold for Instagram Live auctions (3-5% of sales, zero fixed cost).

### Ambassador & Spotlight System
- **Flywheel:** submit -> approved -> spotlighted -> invited as ambassador -> ambassador drives new submissions -> repeat.
- Ambassadors get: dedicated profile page, early drop access, personal discount code via Smile.io.
- At launch: coming soon ambassador section. Names TBD (expected by April 12).

### Social / Content Phasing
- **Phase 1 (launch):** YouTube channel + Klaviyo newsletter ONLY
- **Phase 2 (~month 2):** Instagram added
- **Phase 3+:** TikTok and others phased in
- Do NOT build social integrations beyond YouTube embed at launch

---

## Shopify App Stack

### Install at Launch
- Klaviyo (free -> paid)
- Countdown Timer Bar (free)
- Shopify Product Reviews (free)
- Smile.io (free -> $49/mo)

### Phase 2 Only
- CommentSold (% of sales), SEO Manager ($29/mo), accessiBe/AudioEye ($49/mo), Bold Auction ($20/mo if needed)

### Never Install
PageFly/GemPages, upsell apps, inventory management apps, subscription apps, ShipStation, live chat apps.

---

## Git Workflow

```
main        <- production (protected, requires PR + CI pass + manual approval)
develop     <- staging (protected, requires PR + CI pass)
feature/*   <- feature branches, PR into develop
hotfix/*    <- emergency fixes, PR into main + develop
```

Commit format: `feat:`, `fix:`, `security:`, `chore:`, `docs:`

---

## Community Guidelines (Confirmed by Chelsea — Use Verbatim in TOS)

No hate speech, pornography, harassment, threats, bullying, spam, trolling, illegal activity, graphic content, impersonation, or exploitative behavior. No glamorizing self-harm, eating disorders, addiction, or abuse. No excessively negative, degrading, or divisive content conflicting with growth, resilience, faith, and encouragement. No self-promotion where primary purpose is to advertise, sell, recruit, or drive commercial traffic. Relentless is not a marketing platform. Content must share insight, growth, or meaningful experience.

---

## Build Status

- [x] Repo structure initialized
- [x] Security CI/CD pipeline configured
- [x] Design prototype v2 complete (`docs/design/relentless_homepage_v2.html`)
- [x] "We Are Still Building" page complete (`docs/design/still_building.html`)
- [x] AI moderation Gate 1 implemented (`moderation/ai_screener/screener.py`)
- [x] Klaviyo flow architecture documented
- [x] Shopify theme scaffolded (layout, config, index template)
- [ ] **NEXT: Shopify store created + DNS pointed from Directnic**
- [ ] Shopify Liquid sections built (replicate v2 design prototype)
- [ ] Klaviyo installed and lists created
- [ ] Content submission form + Airtable moderation queue wired
- [ ] Legal pages published (Privacy Policy, Terms, Community Guidelines, Cookie Consent)
- [ ] WCAG 2.1 AA audit passed
- [ ] Soft launch (April 24)
- [ ] Full launch (May 1 event)

---

## Open Items (Waiting on Stephen & Chelsea)

- Ambassador names for launch — needed by April 12
- First drop date and piece — TBC, possibly May 1 event drop
- Stephen's hover/scroll reveal copy for each pillar (coming)
- Instagram handle: TBC
- Logo digital files for `design/logos/` (confirmed to exist, need actual files)

---

*Nothing is finished. Keep building.*
