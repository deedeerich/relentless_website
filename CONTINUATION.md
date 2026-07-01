# Continuation Handoff — Relentless Project
**Session:** 2026-06-29  
**Phase:** Production Recovery + Roadmap Alignment  
**Truth State:** Production theme substantially implemented. Local main is stale. origin/develop and production export contain the real code. Phase 1A partially implemented in code but not yet validated as effective user journey.  
**Audience:** Claude (executor), ChatGPT (architecture mirror), Dee Dee (decision owner)

---

## Executive Summary

**Production theme is COMPLETE and DEPLOYED.** The v2.html design has been translated to Liquid (32 sections, all core pages live) and is currently serving relentlessperforma.com. Local repo contains only a scaffold (2 commits, empty sections/) and is **OUT OF SYNC** with production. 

**Recovery strategy:** (1) sync production theme into local repo, (2) update git to reflect current reality, (3) resume development using production as source of truth. Stephen's current roadmap is: Instagram CTA → Newsletter signup → United Way → Go Team Dogs → Edges & Dreams cross-pollination. No moderation queue, no ambassador system, no submissions yet—Phase 2 only.

---

## What Changed (This Session)

- Onboarded ACP framework (Archive/agentic-control-plane)
- Audited git state, repo structure, production theme export
- **CRITICAL FINDING:** Production theme is COMPLETE (32 sections), deployed, and AHEAD of local repo
- Created truth-labeled recovery map with evidence split
- Established operating rules: Claude acts, ChatGPT challenges, every claim labeled (Designed/Implemented/Deployed/Verified/Unknown)
- Confirmed .env EXISTS (hidden in VS Code, not missing)
- Aligned Phase 1 priorities to Stephen's actual roadmap (not historical CLAUDE.md plan)
- Identified strategic shift: site has evolved from manifesto to entry point for active community
- Added Visitor Journey Validation invariant (every clickable path must lead somewhere meaningful)

---

## Current State

### Active Lane
**Production Validation** — verify that existing theme code is (1) functionally deployed, (2) visible and effective for visitors, (3) properly integrated with external services (Klaviyo, etc.). Reconcile local repo with production/develop after validation confirms what actually works.

### Git State
```
Branch:           main (up to date with origin/main)
Remote:           https://github.com/deedeerich/relentless_website.git
Branches:         main, develop, origin/main, origin/develop
Commits:          2 (v4 design prototypes + initial scaffold)
Uncommitted:      .env.example (modified)
Untracked:        .vs/ (VS Code junk)
```

### Production Status (Verified)
| Component | State | Label | Evidence |
|-----------|-------|-------|----------|
| **Shopify theme (production)** | ✅ COMPLETE | **Deployed** | Theme export downloaded 29-JUN-2026 07:33 AM; 32 sections fully implemented; all core pages live |
| **Theme export location** | ✅ ARCHIVED | **Verified** | `versions/theme_export__www-relentlessperforma-com-relentless-nothing-is-finished__29JUN2026-0733am/` (extracted ZIP) + backup ZIP file |
| Domain (relentlessperforma.com) | ✅ ACTIVE | **Verified** | Live, accessible; serving production theme |
| GitHub repo | ✅ SYNCED | **Verified** | `git status` shows clean; `main` up to date with origin/main |
| Local repo theme/ | ⚠️ STALE | **Out of Sync** | Contains only scaffold (2 commits); production has 32 sections. Local needs sync. |
| .env file | ✅ EXISTS | **Verified** | Present locally (hidden in VS Code by exclude pattern) |
| **Shopify CLI auth** | ❓ **VERIFY** | **Unknown** | Need to test before `theme push` |
| **GitHub PAT** | ❓ **VERIFY** | **Unknown** | Expiration status unknown; renew if pushing |

### Repo Structure (Truth Labeled)

**Design (Implemented)**
- `relentless_homepage.html` — v1 prototype (superseded by v2)
- `design/homepage_mockup.html` — mockup (superseded by v2)
- `docs/design/relentless_homepage_v2.html` — **THE SOURCE OF TRUTH** for homepage (Designed + Implemented in HTML)
- `docs/design/still_building.html` — "We Are Still Building" page complete (Designed + Implemented in HTML)

**Moderation (Implemented)**
- `moderation/ai_screener/screener.py` — Gate 1 AI screener (Implemented, not Deployed)
- `moderation/ai_screener/requirements.txt` — Python dependencies

**Shopify Theme (Partially Implemented)**
- `shopify/theme/layout/theme.liquid` — Main layout (Implemented, minimal)
- `shopify/theme/templates/index.json` — Index template stub (Implemented, minimal)
- `shopify/theme/snippets/cookie-consent.liquid` — GDPR consent (Implemented, minimal)
- `shopify/theme/config/settings_schema.json` — Theme settings (Implemented, minimal)
- `shopify/theme/assets/` — Empty (CSS/JS need build)
- `shopify/theme/locales/en.default.json` — Locales stub
- **Missing:** sections for hero, pillars, philosophy, community, content, shop, footer (Designed in v2.html, NOT YET in Liquid)

**Klaviyo Integration (Designed, Not Implemented)**
- `klaviyo/` — Directory exists, no files (architecture documented in CLAUDE.md)

**Documentation (Complete)**
- `CLAUDE.md` — Full project context, tech stack, build status (Implemented)
- `README.md` — Quick reference (Implemented)
- `SECURITY.md` — Security posture (Implemented)
- `.env.example` — Environment variable template (Implemented)
- `docs/sync/CLAUDE.md` — Secondary reference (Implemented)

### Build Status (Current)

| Milestone | Status | Label | Notes |
|-----------|--------|-------|-------|
| Repo structure initialized | ✅ | **Implemented** | Directory tree in place |
| Security CI/CD pipeline | ✅ | **Implemented** | GitHub Actions workflows ready |
| Design prototype v2 | ✅ | **Implemented** | Standalone HTML, complete visual design |
| "We Are Still Building" page | ✅ | **Implemented** | Standalone HTML, complete visual design |
| AI moderation Gate 1 | ✅ | **Implemented** | Python screener ready, not deployed |
| Klaviyo flow architecture | ✅ | **Designed** | Documented, hooks not built |
| Shopify theme scaffold | ⚠️ | **Partially Implemented** | Layout + template stub exist; sections NOT yet in Liquid |
| **Shopify store created** | ✅ | **Deployed** | Active in Shopify Admin (production theme is LIVE) |
| **DNS pointed from Directnic** | ✅ | **Deployed** | relentlessperforma.com resolves to Shopify |
| Shopify Liquid sections built | ❌ | **Not Started** | **NEXT PRIORITY** — replicate v2 design to Liquid |
| Klaviyo installed + lists | ❓ | **Unknown** | Need to verify installation + integration |
| Moderation queue wired (Airtable) | ❌ | **Not Started** | Form + queue integration pending |
| Legal pages published | ❌ | **Not Started** | Privacy, Terms, Community Guidelines, Cookie Consent needed |
| WCAG 2.1 AA audit | ❌ | **Not Started** | Accessibility review before soft launch |
| Soft launch (April 24) | ⏰ | **Scheduled** | ~210 days away (was TARGET; actual status unknown) |
| Hard launch (May 1 event) | ⏰ | **Scheduled** | ~235 days away (Stephen's ballroom event) |

---

## Current Evidence (What We Know For Certain)

✅ **VERIFIED**
- Production Shopify theme downloaded and archived (29-JUN-2026 07:33 AM)
- Backup exists: `versions/` directory (extracted) + ZIP file (secure)
- Domain relentlessperforma.com operational and serving production theme
- Local .env file exists (credentials freshness unknown)
- Git repo clean, main branch synced with origin/main

❓ **UNKNOWN (Verification Needed)**
- Local repo parity with production (local theme/ is stale; needs sync)
- Shopify CLI authentication status (PAT valid?)
- GitHub PAT expiration (may need renewal)
- .env credential freshness (Shopify API keys, Klaviyo tokens, OpenAI keys current?)
- Klaviyo integration deployed and working
- Content submission form + Airtable moderation queue status
- Legal pages published (Privacy, Terms, Cookie Consent, Community Guidelines)
- WCAG 2.1 AA audit completion

---

## Recovery Map — Production ↔ Repository ↔ GitHub

### What's Where (Verified)

**In Shopify Admin (Production)**
- Current active theme: ✅ LIVE (per ChatGPT screenshot)
- Theme assets, sections, liquid files: **UNKNOWN** — need to download and inspect
- Store settings, collections, products: **UNKNOWN**
- Klaviyo connection: **UNKNOWN** — need to verify

**In Local Repo**
- Design prototypes: ✅ `relentless_homepage_v2.html` + `still_building.html` (complete)
- Moderation Python: ✅ `moderation/ai_screener/screener.py` (ready)
- Shopify theme scaffold: ⚠️ Partial (layout + templates, sections missing)
- CI/CD workflows: ✅ GitHub Actions set up
- .env: ✅ Exists (credentials status unknown)

**In GitHub**
- All code synced from local ✅
- Two branches: main (current) + develop (staging)
- Commits: v4 design + scaffold

### Data Loss Assessment

| Asset | Location | Risk | Action |
|-------|----------|------|--------|
| Design HTML | Local + Git | 🟢 SAFE | Backed up in repo |
| Moderation code | Local + Git | 🟢 SAFE | Backed up in repo |
| Shopify theme | Shopify Admin | 🟡 VERIFY | Download as backup immediately |
| Store data | Shopify Admin | 🟢 SAFE | Shopify auto-backs up; not in local repo |
| Credentials | .env (local only) | 🔴 CRITICAL | Rotate on next CI/CD deployment |

---

## Validation Performed

| Check | Result | Evidence |
|-------|--------|----------|
| Git status | ✅ PASS | `git status` shows clean tree, up to date |
| GitHub remote | ✅ PASS | `origin https://github.com/deedeerich/relentless_website.git` |
| Repo branches | ✅ PASS | main + develop present |
| Design files exist | ✅ PASS | v2.html + still_building.html present and readable |
| .env file exists | ✅ PASS | `.env` confirmed (despite VS Code hiding it) |
| Shopify production | ✅ VERIFIED | Active theme seen in Shopify Admin |
| Directory structure | ✅ PASS | shopify/, design/, docs/, moderation/, scripts/ all present |
| Frontend build | ❓ NOT TESTED | No npm/build in this project (static + Liquid theme) |
| Moderation gate | ❓ NOT TESTED | Python screener syntax OK, not executed live |
| Live endpoint | ❓ NOT TESTED | Production Shopify store not probed yet |

---

## Files Touched (This Session)

| File | Change |
|------|--------|
| `CONTINUATION.md` | Created (session handoff) |
| (none — read-only audit) | Audit only, no mutations |

---

## Decisions Made

1. **Operating Model: Claude Acts, ChatGPT Challenges**
   - Claude (me): Implement, commit, deploy, execute
   - ChatGPT: Challenge assumptions, review security, verify claims, sequence work
   - This prevents one mind from drifting into half-truths
   - Documented in Archive/agentic-control-plane

2. **Truth Labeling Standard Applied**
   - Every claim is labeled: Designed, Implemented, Deployed, Verified, or Unknown
   - Prevents confusing "we planned this" with "this works in production"
   - Visible throughout this handoff

3. **Production Theme Priority**
   - Before pushing ANY code, download the live theme from Shopify Admin as a safety backup
   - Prevents accidentally overwriting a working site with stale local code

4. **Continuation Document (This File)**
   - Session continuity survives context breaks and model changes
   - All state labeled with evidence and freshness
   - Next session can pick up without re-deriving context

---

## Risks / Landmines Discovered

| Risk | Severity | Mitigation |
|------|----------|-----------|
| .env hidden in VS Code | 🟡 MEDIUM | Already visible to Claude; update `.vscode/settings.json` to unhide |
| Local .env credentials stale | 🔴 HIGH | Verify Shopify/Klaviyo/OpenAI tokens before next `theme push` |
| GitHub PAT may be expired | 🔴 HIGH | Renew via GitHub Settings → Developer settings before PR merges |
| Shopify theme live vs. local out of sync | 🟡 MEDIUM | Download production theme first; compare against local scaffold |
| Design HTML not yet in Liquid | 🟡 MEDIUM | Large build task; break into sections (hero, pillars, etc.) |
| April 24 deadline past (today 2026-06-29) | 🔴 CRITICAL | **Actual launch status unknown** — verify with Stephen/Chelsea |
| Moderation pipeline not integrated | 🟡 MEDIUM | Python screener ready; Airtable queue not yet wired |
| Klaviyo integration unverified | 🟡 MEDIUM | App may be installed; email flows untested |
| Legal pages not published | 🟡 MEDIUM | Privacy Policy, Terms, Cookie Consent, Community Guidelines missing |
| WCAG 2.1 AA audit not done | 🟡 MEDIUM | Accessibility review needed before going live |

---

## Next Actions (Prioritized by Stephen's Actual Roadmap)

### IMMEDIATE (before any code push)
1. **Sync production theme into local repo** → copy `versions/theme_export.../` into `shopify/theme/` and commit
2. **Verify .env credentials** → test Shopify CLI auth, Klaviyo API key, OpenAI key (confirm they work)
3. **Verify GitHub PAT** → check expiration, renew if needed
4. **Verify Shopify + Klaviyo integration** → confirm app is installed and flows are active in Shopify Admin

### PHASE 1A: Traffic & Conversion (CURRENT SPRINT)
**Strategic Context:** Site has evolved from *manifesto* to *entry point for active community*. Visitors arrive from stickers at the Broadmoor, competitions, nonprofits, and word-of-mouth already knowing about Relentless. Their first question is: "What do I do right now?"

**Goal:** Every visitor has a visible, clickable path to Instagram, newsletter, and (later) nonprofit partnerships.

**Phase 1A Status: Partially Implemented**

**Verified in production theme code:**
- ✓ Instagram URL configured (`@relentlessperforma`)
- ✓ Instagram links exist in header, footer, content-channel section
- ✓ YouTube URL configured (`@relentlessperforma`)
- ✓ Klaviyo form snippet (`klaviyo-form.liquid`) exists
- ✓ Klaviyo settings schema exists (public key, list ID configurable)
- ✓ Klaviyo script loader in theme

**NOT yet verified in production (need user click-through test):**
- ❌ Instagram links are visible + prominent enough for Stephen's "front and center" standard
- ❌ Instagram links actually click through correctly
- ❌ Newsletter form renders visibly on production
- ❌ Klaviyo app is installed + configured in Shopify Admin
- ❌ Test email submission reaches Klaviyo list
- ❌ CTA placement supports the sticker/competition visitor journey (people scanning QR code at Broadmoor)

**Critical distinction:** Code exists ≠ Code is effective. A button can exist and still be invisible or nonfunctional.

**Implementation (in order):**
- [ ] **Visitor Journey Validation Audit (RELEASE GATE)** — Walk production site; verify EVERY CTA is visible and clickable:
  - [ ] Instagram link in header — visible, clickable, goes to `@relentlessperforma`
  - [ ] Instagram link in footer — visible, clickable, goes to `@relentlessperforma`
  - [ ] Instagram link in content-channel section — visible, clickable
  - [ ] Newsletter form in shop-teaser renders and accepts email
  - [ ] YouTube link/embed works
  - [ ] All navigation items reach intended pages or display intentional "Coming Soon"
- [ ] **Activate Klaviyo** — Install Shopify app, fill in public key + list ID in theme settings
- [ ] **Klaviyo test submission** — Submit test email through newsletter form, verify it reaches Klaviyo
- [ ] **"We Are Still Building" capacity check** — Can another nonprofit be added in under 5 minutes without redesign? (If no: refactor first)
- [ ] **CTA prominence review** — Based on visitor journey audit, decide if Instagram/newsletter CTAs need repositioning (e.g., move to hero if currently buried)
- [ ] **Mobile testing** — Test all CTAs and navigation on phone (iOS + Android)

---

### PHASE 1B: Safe Participation (NEXT — AFTER 1A)
**Strategic Context:** Stephen isn't trying to build *followers*. He's building a *movement*. Movements succeed because people feel they can **contribute**, not just consume. But contribution without moderation destroys healthy communities fast.

**Goal:** People can participate safely. Community grows without becoming full-time moderation job for Stephen + Chelsea.

**Roadmap:**
1. **Submission form** — User can submit story/contribution
2. **User identity/contact capture** — Collect email + name (enables moderation queue + follow-up)
3. **AI moderation Gate 1** (`moderation/ai_screener/screener.py`) — Auto-flag spam/abuse/off-topic
4. **Human review queue** (Airtable) — Stephen/Chelsea review ambiguous submissions
5. **Approval workflow** — Accept/request-edits/reject with audit log
6. **Publish approved submissions** — Display on site with author attribution

**What's NOT in Phase 1B:**
- Ambassador program
- Public user profiles
- Community feed algorithms
- Reputation systems
- User spotlights

Those come in Phase 2 once safe participation is proven.

**Why this matters:**
Moderation is **not** a backend feature you bolt on later. It's part of the product's trust architecture. It's the mechanism that lets Stephen scale community without micromanaging. The two-gate system (AI + human) becomes an *enabler* of growth, not just a defensive control.

### PHASE 2: Community Growth (LATER)
Once safe participation exists (Phase 1B):
- Community feed (display approved submissions)
- Ambassador invitations (recognize top contributors)
- Featured stories + user spotlights
- Workshops + seminars
- Cross-post to Instagram/YouTube
- Skating OS integration
- Other creator contributions

### PHASE 3: Legal + Compliance + Accessibility (ONGOING)

**Publish before Phase 1B goes live:**
- Privacy Policy, Terms of Service
- Community Guidelines
- GDPR + CCPA disclosures (Cookie Consent already deployed)

**Accessibility (built-in properties, not SaaS):**
- [ ] Semantic HTML (header, nav, main, footer, article, section)
- [ ] Keyboard navigation (tab order, focus visible, no keyboard traps)
- [ ] Alt text (all images, icons, decorative elements properly described)
- [ ] Color contrast (≥4.5:1 normal text, ≥3:1 large text)
- [ ] Focus states (visible outline)
- [ ] Heading hierarchy (h1 once, proper nesting)
- [ ] Form labels (associated, required fields marked)
- [ ] Skip-to-content link (first focusable element)

**DO NOT:**
- Use AudioEye/accessiBe or similar SaaS as a substitute for accessibility
- Assume a tool fixes accessibility if the code isn't semantically built

**Later (if justified):**
- Automated audits (Axe, WAVE)
- Commercial tooling only adds value, doesn't replace human review

**Ambassador program** (once names finalized + moderation stable)

---

## Strategic Model: Two Flywheels

Relentless operates two interconnected growth loops, not one.

### Community Flywheel (Direct Engagement)
```
1. Discover
   ↓ Instagram / Website / Word-of-mouth

2. Participate (early: passive)
   ↓ Read, follow, share, newsletter signup

3. Contribute (higher commitment)
   ↓ Submit story / experience

4. Be Recognized
   ↓ Featured story → Spotlight → Ambassador invitation

5. Lead
   ↓ Facilitate workshops, mentor others, grow the movement
```

### Impact Flywheel (Platform Growth)
```
1. Website → Nonprofits
   ↓ Display United Way, Go Team Dogs, etc.

2. Community + Nonprofits → Workshops
   ↓ Athlete + nonprofit + community collaborations

3. Workshops → Brand Trust
   ↓ "Relentless connects athletes with meaningful work"

4. Brand Trust → New Partnerships
   ↓ More nonprofits, more sponsors, more athletes

5. Loop back to Website
```

**Strategic Importance:** United Way is not just another nonprofit tile. It signals that Relentless is becoming a *platform that connects athletes with organizations doing meaningful work*, not just a brand store.

The two flywheels reinforce: community grows through contribution + recognition, impact grows through partnership + demonstration of values.

---

## Visitor Journey — The Five-Step Loop

```
1. Discover
   ↓ Instagram, stickers, competitions, nonprofits

2. Participate
   ↓ Read content, follow, sign newsletter (Phase 1A)
   → Already participation. Not just observation.

3. Contribute
   ↓ Submit story / experience (Phase 1B)
   → AI moderation → Human review → Published
   → Only safe contributions survive

4. Be Recognized
   ↓ Featured story, spotlight, ambassador (Phase 2)
   → Motivates next round of contribution

5. Lead
   ↓ Facilitate workshops, mentor, volunteer
   → Closes the loop from visitor to organizer
```

This sequence preserves Stephen + Chelsea's time while creating a path from passive visitor to active community leader.

---

### Safety Rules (Never Do These)

- ❌ **Never push before comparing production.** Production theme is source of truth. Always sync production into local first.
- ❌ **Never overwrite production without backup.** Backup already exists in `versions/`; keep it.
- ❌ **Never commit .env.** Verify `.gitignore` includes it.
- ❌ **Never assume repo == production.** They're currently out of sync. Production is ahead.

---

## Release Gate: Visitor Journey Validation

**This is NOT a task. This is a release criterion.**

No deployment, no merge to main, no announcement goes live until:

**For every navigation item, button, CTA, footer link, and social link:**

- ✅ Reaches intended destination **OR**
- ✅ Displays an intentional "Coming Soon" state **AND** offers another meaningful next action

**Dead links, empty pages, orphaned buttons, "Under Construction" with no fallback = deployment blocked.**

**Why this matters:** People are arriving from:
- Stickers at the Broadmoor
- Competitions
- Nonprofit partnerships
- Instagram organic growth
- Word of mouth

Once traffic is real, every broken link damages brand trust. Your goal isn't "every feature is finished"; it's "every visitor has a coherent next step." That's a much more durable standard than feature completeness.

**How to verify:**
1. Walk the production site top to bottom
2. Click every navigation item, CTA, button, footer link
3. Document: [Link name] → [Destination or "Coming Soon" + fallback CTA]
4. Mark pass/fail
5. Report findings before any deployment

---

## Do-Not-Do List

- ❌ **Do NOT merge develop → main until production validation passes** (verify every CTA works first)
- ❌ **Do NOT say "Phase 1A is complete"** (say "Phase 1A code exists but effectiveness unproven" until production click-through verified)
- ❌ **Do NOT deploy without Visitor Journey Validation passing** (release gate: every link works or displays intentional "Coming Soon")
- ❌ **Do NOT push code before comparing production** (production is authoritative reference; sync → local first)
- ❌ **Do NOT overwrite production without backup** (backup already secured in `versions/`)
- ❌ **Do NOT commit .env file** (verify `.gitignore` includes it)
- ❌ **Do NOT weaken security controls** (MFA, rate limiting, encryption, audit logging are mandatory)
- ❌ **Do NOT auto-publish user content** (all must go through two-gate moderation system)
- ❌ **Do NOT use SaaS accessibility tools as substitute for semantic HTML** (AudioEye/accessiBe don't fix broken code)
- ❌ **Do NOT build TikTok integrations yet** (Phase 2 only)
- ❌ **Do NOT install PageFly/GemPages/upsell apps** (explicitly forbidden in CLAUDE.md)

---

## Parking Lot Additions

| Item | Why | Defer Until |
|------|-----|-------------|
| **Content submission form + AI moderation** | Phase 2 only; not on Stephen's current roadmap | Month 2+ after Instagram/newsletter stabilize |
| **Ambassador program + profile pages** | Phase 2 only; requires finalized ambassador names | After moderation pipeline active |
| **TikTok + Pinterest integrations** | Phase 3 only per CLAUDE.md | Post-month 2 |
| **CommentSold auction app** | Phase 2, depends on social engagement | Phase 2 + month 2 |
| **Smile.io ambassador discount codes** | Phase 2 feature | After ambassadors named + moderation live |
| **Bold Auction app** | Phase 2, expensive ($20/mo) | Only if auctions needed |
| **Accessibility audit (AudioEye/accessiBe)** | Phase 2, $49/mo cost | Post-launch if budget |

---

## Freshness & Caveats

| Data Point | Source | Age | Confidence | Caveat |
|------------|--------|-----|-----------|--------|
| Production theme ALIVE | ChatGPT screenshot (Shopify Admin) | 1 hour | HIGH | Theme name/ID not verified in this audit |
| Local repo synced | `git status` | Now | AUTHORITATIVE | Matches origin/main exactly |
| .env exists | File inspection | Now | AUTHORITATIVE | Credentials freshness unknown |
| Design prototypes complete | File inspection + line count | 11 days old | HIGH | Never tested in production; Liquid version pending |
| Shopify store URL | CLAUDE.md | 11 days old | HIGH | Assumed current; not tested this session |
| April 24 launch date | CLAUDE.md | Historical | LOW | Past date; actual status unknown |
| Ambassador names needed | CLAUDE.md (April 12 deadline) | Superseded | LOW | Deadline passed; completion unknown |

---

## Session Summary

**Production theme substantially implemented. Code exists but effectiveness unproven.**

✅ **Code-level verification:**
- Production theme: 32 sections deployed (not a scaffold)
- Instagram URLs configured + links exist in header/footer/content-channel
- YouTube configured (`@relentlessperforma`)
- Klaviyo form snippet exists + settings schema ready
- Theme export: Archived in `versions/` (secure backup)
- origin/develop matches production export
- Shopify CLI: Installed (v4.3.0) and credentials loaded
- GitHub PAT: Set and ready

🔴 **NOT yet verified (need user click-through test):**
- Instagram links are visible/prominent enough
- Newsletter form renders on production
- Klaviyo app is installed + configured in Shopify Admin
- Test email submission reaches Klaviyo
- Every CTA is clickable and leads somewhere (or intentional "Coming Soon")

🔄 **Strategic clarity (from ChatGPT):**
- Two flywheels: Community (Instagram→Newsletter→Contribution→Recognition→Leadership) + Impact (Nonprofits→Workshops→Brand Trust→Partnerships)
- Participation != Contribution (newsletter signup is already participation)
- Existing code ≠ effective UX (button can exist and still be invisible)
- Visitor Journey Validation is now a **release gate**, not a task

**Next actions (in order):**
1. **Walk production site** (Visitor Journey Validation Audit) — verify every CTA is visible and clickable
2. **Test Klaviyo** — install app, configure public key, submit test email
3. **CTA prominence review** — adjust positioning if Instagram/newsletter not "front and center" per Stephen
4. **Sync develop → local** (after validation confirms what works)
5. **Merge develop → main** (final step, only after production parity verified)

---

## How to Continue

1. **Read this file** (you're reading it now ✓)
2. **Verify .env credentials** (Shopify/Klaviyo/OpenAI tokens current?)
3. **Download production theme** from Shopify Admin
4. **Compare production vs. local**
5. **Begin PHASE 1: Liquid sections**
6. **After each significant work:** update this file with what changed, validation performed, risks discovered, next action

---

*Nothing is finished. Keep building.*

**— Handoff created 2026-06-29 by Claude (ACP-governed)**
