# RELENTLESS — Claude Code Context
# This file is read automatically by Claude Code on every session.
# Keep it current. It is the single source of truth for the coding agent.

## What This Project Is

Relentless is a growth-mindset athletic brand and e-commerce platform built
on Shopify. It serves an athletic community (figure skaters, hockey players,
expanding to all athletes) founded by Stephen and Chelsea, operated as a DBA
under Edges & Dreams LLC.

**Live domain:** relentlessperforma.com  
**Lead developer:** @deedeerich (cloud security architect, full-stack dev, AI builder)  
**You (Claude Code) are the primary builder for this project.**

---

## Your Primary Responsibilities

1. Build and maintain the Shopify Liquid theme (`shopify/theme/`)
2. Build and maintain the AI moderation pipeline (`moderation/`)
3. Build and maintain Klaviyo integration hooks (`klaviyo/`)
4. Write and run utility scripts (`scripts/`)
5. Keep all security controls active and never weaken them

---

## Non-Negotiable Rules

These apply to every file, every function, every line of code you write:

### Security
- **NEVER hardcode API keys, tokens, secrets, or credentials.** Ever.
  Always use `os.environ.get('KEY_NAME')` or Shopify's settings schema.
- **NEVER commit .env files.** They are in .gitignore. Verify before every commit.
- **All user input must be sanitized** before touching any database or API.
- **SQL injection, XSS, CSRF protections** are required on all forms.
- **CSP headers, X-Frame-Options, HSTS, Referrer-Policy** must be set.
- **Rate limiting** on all endpoints — especially login and submission.
- **MFA is mandatory** for Content Submitter, Reviewer, and Admin roles.
- **Passwords** use Bcrypt or Argon2 only. Never MD5, SHA1, plain text.
- **Encryption in transit:** TLS 1.3. HTTP auto-redirects to HTTPS.
- **Encryption at rest:** PII fields encrypted at column level.

### Payments
- **Zero-touch payment architecture.** Card data never touches this codebase.
  Shopify Payments handles all card scope. We only ever receive order IDs
  and customer tokens. Do not build anything that touches raw card data.
- This keeps us at **PCI-DSS SAQ-A** — the lightest compliance level.

### Compliance
- **GDPR:** Privacy policy, cookie consent, right-to-deletion, data retention.
- **CCPA:** Do Not Sell mechanism in privacy policy.
- **CAN-SPAM / CASL:** Double opt-in, unsubscribe on every Klaviyo email.
- **WCAG 2.1 AA:** Full accessibility required. Alt text, keyboard nav,
  color contrast ratios, skip-to-content links. Test before every deploy.
- **COPPA:** NOT in scope — no under-13 users confirmed.
- **HIPAA:** NOT in scope — no health data collected.

### Code Quality
- Write clean, documented code. Comment security-sensitive sections.
- No dead code, no commented-out blocks left in commits.
- Test before committing. Break the build consciously, not carelessly.
- Run `shopify theme check` before any theme deploy.

---

## Tech Stack

| Layer | Service | Notes |
|-------|---------|-------|
| Platform | Shopify Basic | Liquid theme, custom sections, native blog |
| Domain | directnic.com → Shopify | DNS A + CNAME pointed to Shopify |
| Email | Klaviyo | Native Shopify sync, behavioral triggers, drops |
| Video | YouTube (embed only) | Never host video files directly |
| Moderation queue | Airtable | Free tier, AI-screened submissions only |
| AI screening | OpenAI Moderation API | Gate 1 — auto-rejects hard violations |
| In-store | Square (E&D only) | Completely separate, never integrated here |

---

## Environment Variables

All secrets live in `.env` (local) or GitHub Secrets (CI/CD).
See `.env.example` for the complete list. Never ask for or print secret values.

Required for moderation system:
```
OPENAI_API_KEY
AIRTABLE_API_KEY
AIRTABLE_BASE_ID
```

Required for Shopify CLI deploys:
```
SHOPIFY_STORE_URL
SHOPIFY_ACCESS_TOKEN
SHOPIFY_THEME_ID
```

Required for Klaviyo:
```
KLAVIYO_API_KEY
KLAVIYO_WAITLIST_LIST_ID
KLAVIYO_NEWSLETTER_LIST_ID
```

---

## Repo Structure

```
relentless_website/
├── CLAUDE.md                      ← YOU ARE HERE
├── README.md                      ← Human-readable project brief
├── SECURITY.md                    ← Vulnerability disclosure policy
├── .env.example                   ← All env vars documented (no real values)
├── .gitignore                     ← Security-first, comprehensive
├── design/                        ← Design prototypes and brand assets
│   ├── relentless_homepage.html   ← REFERENCE DESIGN — replicate in Liquid
│   └── assets/logos/              ← 3 logo variants (PNG)
├── docs/                          ← Project documentation
│   ├── master_sync_v3.docx        ← Full project context (paste Sec 1 to sync AI)
│   ├── stack_decisions_v4.docx    ← All platform decisions with rationale
│   └── questions_stephen_chelsea.docx
├── shopify/
│   └── theme/                     ← PRIMARY BUILD TARGET
│       ├── layout/theme.liquid    ← Master layout (scaffolded)
│       ├── templates/             ← Page templates
│       ├── sections/              ← Homepage and pillar sections
│       ├── snippets/              ← Reusable components
│       ├── assets/                ← CSS, JS, images
│       ├── config/settings_schema.json
│       └── locales/
├── moderation/
│   └── ai_screener/
│       ├── screener.py            ← Gate 1 AI screener (implemented)
│       └── requirements.txt
├── klaviyo/
│   └── flows/flows.yml            ← Flow architecture documented
├── scripts/
│   └── dns_verify.py              ← DNS propagation checker
└── .github/
    ├── CODEOWNERS                 ← All sensitive paths require @deedeerich review
    ├── SECURITY_SETUP.md          ← GitHub settings checklist
    └── workflows/
        ├── security.yml           ← Secret scan, dep audit, file guard on every push
        └── deploy.yml             ← Staging auto-deploy, production gated
```

---

## The Four Pillars (Site Navigation)

These drive all template and section names:

| Slug | Page Title | What Lives Here |
|------|-----------|-----------------|
| `/` | Homepage | SCOPED: Hero lockup only at load. Four pillars reveal on scroll/hover — each blossoms to show destination. Minimal. An invitation, not an explanation. |
| `/pages/still-becoming` | You Are Still Becoming | Blog/mindset, athlete stories, content channel, submission form |
| `/pages/still-building` | We Are Still Building | Community, outreach, give time/resources/energy, cause areas |
| `/pages/philosophy` | Nothing Is Finished | Brand manifesto, origin story, mission, vision. SUBTLE faith/theology easter egg — language of calling, purpose, being made for more. Not overt. Take it or leave it. The people who know, know. |
| `/collections/shop` | Be Relentless | Shop, exclusive drops, coming soon, waitlist |

---

## User Tiers & Auth

| Tier | Permissions | Auth Required |
|------|-------------|---------------|
| Public / Guest | View all content, browse shop, guest checkout | None |
| Logged-In Member | Comment, share, save orders | Email + password |
| Content Submitter | Submit articles for review | Login + **MFA mandatory** |
| Reviewer / Admin | Moderation queue, audit log, site config | Login + **MFA mandatory** |

Admin accounts: Stephen, Chelsea, designated staff only.

---

## Content Moderation — Two-Gate System

```
Submission → AI Gate 1 (screener.py) → HARD FAIL: auto-reject
                                      → CLEAN: queue for feed
                                      → AMBIGUOUS: Airtable human review queue
                                                        ↓
                                              Gate 2: Stephen/Chelsea/staff
                                              Approve / Request Edits / Reject
                                                        ↓
                                                  Audit log entry
```

The Gate 1 screener is implemented in `moderation/ai_screener/screener.py`.
On ANY API failure, route to human review — never silently approve.

---

## Design Reference

`design/relentless_homepage.html` is the **reference design** for the homepage.
Replicate it faithfully in Shopify Liquid sections. Key design decisions:

- **Background:** Deep warm dark (#060504) — NOT flat black
- **Accent color:** Gold (#C8922A) — used for borders, highlights, CTAs
- **Display font:** Bebas Neue (headings, hero title)
- **Serif font:** Cormorant Garamond (pillar lines, philosophy copy, italic accents)
- **Body font:** Barlow / Barlow Condensed (nav, labels, body copy)
- **Cosmos effect:** Canvas starfield with bokeh orbs, nebula clouds, shooting stars,
  and bright accent focal points — see the `drawCosmos()` function in the HTML file.
  This MUST be preserved in the Liquid theme. It is core to the brand experience.
- **Constellation SVG:** Overlay on hero section — warm gold lines and dots.

Logo files are in `design/assets/logos/`:
- `relentless_performa_dark.png` — nav logo (dark background)
- `nothing_is_finished_dark.png` — hero logo
- `relentless_light.png` — footer logo (invert for dark bg)

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
- The cosmos starfield canvas JS belongs in `assets/relentless.js`
- Use CSS custom properties (variables) for all brand colors — defined in `:root`

### Accessibility checklist (WCAG 2.1 AA — required before every deploy)
- [ ] All images have descriptive `alt` attributes
- [ ] Skip-to-content link is the first focusable element
- [ ] Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- [ ] All interactive elements are keyboard navigable
- [ ] Focus states are visible
- [ ] Form inputs have associated labels
- [ ] ARIA roles used correctly where needed
- [ ] No content relies on color alone to convey meaning

---

## Drop & Auction System

Phase 1 (current): Native Shopify timed drop.
- Product quantity = 1
- Scheduled publish date/time
- Countdown Timer Bar app (free)
- First completed checkout wins

Phase 2 (when ready): CommentSold for Instagram Live auctions.
- Do not build custom auction logic — use CommentSold app
- Integration point: CommentSold creates Shopify draft orders automatically

---

## Klaviyo Integration Points

Key events to fire from Shopify/theme:
- `Waitlist Signup` → add to Klaviyo Waitlist list
- `Newsletter Signup` → add to Klaviyo Newsletter list (double opt-in)
- `Content Submitted` → fire custom event for submission notification flows
- `Content Approved` → fire custom event via Airtable webhook
- `Content Rejected` → fire custom event via Airtable webhook

All Klaviyo list IDs come from environment variables — never hardcode.

---

## Git Workflow

```
main        ← production (protected, requires PR + CI pass + manual approval)
develop     ← staging (protected, requires PR + CI pass)
feature/*   ← feature branches, PR into develop
hotfix/*    ← emergency fixes, PR into main + develop
```

Commit message format:
```
feat: add hero cosmos section to Shopify theme
fix: correct CSP header to allow Klaviyo embed
security: harden rate limiting on submission endpoint
chore: update Shopify theme check to fail on warnings
```

---

## Current Build Status

- [x] Repo structure initialized
- [x] Security CI/CD pipeline configured
- [x] Design prototype complete (`design/relentless_homepage.html`)
- [x] AI moderation Gate 1 implemented (`moderation/ai_screener/screener.py`)
- [x] Klaviyo flow architecture documented
- [x] Shopify theme scaffolded (layout, config, index template)
- [ ] **NEXT: Shopify store created + DNS pointed from Directnic**
- [ ] Shopify Liquid sections built (replicate design prototype)
- [ ] Klaviyo installed and lists created
- [ ] Content submission form + Airtable moderation queue wired
- [ ] Legal pages published (Privacy Policy, Terms, Community Guidelines, Cookie Consent)
- [ ] WCAG 2.1 AA audit passed
- [ ] Soft launch

---

## Social / Content Phasing (confirmed)

- **Phase 1 (launch):** YouTube channel + Klaviyo newsletter ONLY
- **Phase 2 (~month 2):** Instagram added
- **Phase 3+:** TikTok and others phased in as capacity allows
- Do NOT build social integrations beyond YouTube embed at launch

## "Nothing Is Finished" Philosophy Page — Faith Easter Egg

The philosophy page carries a subtle theological undercurrent.
Relentless Faith / Relentless Higher Purpose — not overt, not pushy.
Language that lands differently depending on who's reading:
words like *called*, *purpose*, *made for more*, *unfinished work*,
*not by accident* weave through the manifesto copy.
The people on a spiritual path will recognize it. Everyone else
reads it as profound growth philosophy. Both are correct. Both are welcome.
This is a "take it or leave it" easter egg — never a statement.

## Homepage UX — Scoped & Blossoming

- Hero loads CLEAN and minimal — logo, four pillar lines, one CTA
- Pillars are NOT front-loaded with content
- On hover/scroll each pillar BLOSSOMS — reveals destination, feeling, copy
- This is dynamic and animated — it unfolds, it does not dump
- CTA options: sign-up link (newsletter/waitlist) OR rotating positive mantra
  Preference: mantra version is more brand-aligned for first impression
  Can pair: mantra displays + small "join the movement" text link beneath
- Stephen has specific copy for the hover reveal — ADD WHEN RECEIVED

## Waiting On (from Stephen & Chelsea)

- Stephen's hover/scroll reveal copy for each pillar (coming)
- Ambassador names for launch
- First drop date and piece
- Budget confirmation for Shopify Basic

---

*Nothing is finished. Keep building.*
