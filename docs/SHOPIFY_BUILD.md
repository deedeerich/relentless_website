# RELENTLESS — Shopify Theme Build Instructions
# Feed this file to Claude Code to kick off the Shopify build.
# Claude Code should read this alongside CLAUDE.md and the design files.

## YOUR MISSION

Translate the design prototype at `design/relentless_homepage.html` into a
fully functional Shopify Liquid theme. The HTML file is the exact visual spec.
Replicate it faithfully. Do not redesign anything.

The secondary pages (`design/philosophy.html`, `design/still_building.html`)
are also reference specs for their respective Shopify pages.

Hard deadline: **April 24, 2026 operational.**

---

## TASK 1 — Theme Foundation (Start Here)

### 1a. Create `shopify/theme/assets/relentless.css`
Extract ALL CSS from `design/relentless_homepage.html` into this file.
- Use CSS custom properties (variables) for all brand colors
- Organize into clearly labeled sections:
  - Reset & base
  - CSS variables / design tokens
  - Typography
  - Navigation
  - Hero & cosmos
  - Bloom cards
  - Pillar sections
  - Community section
  - Shop teaser
  - Footer
  - Animations & keyframes
  - Responsive / media queries

### 1b. Create `shopify/theme/assets/relentless.js`
Extract ALL JavaScript from `design/relentless_homepage.html` into this file.
- Cosmos starfield engine (full drawCosmos function with bokeh, nebula, shooting stars, light arc)
- Bloom card system (hover expand, mobile tap-to-expand)
- Rotating mantra system (all 41 mantras, 9s interval)
- Nav scroll handler
- Scroll reveal IntersectionObserver
- Waitlist form handler
- Keep all functions named and documented

### 1c. Update `shopify/theme/layout/theme.liquid`
Already scaffolded — verify it correctly references:
- `{{ 'relentless.css' | asset_url | stylesheet_tag }}`
- `{{ 'relentless.js' | asset_url | script_tag }}`
- Klaviyo script tag using `{{ settings.klaviyo_company_id }}`
- Cookie consent snippet render
- Skip-to-content accessibility link

---

## TASK 2 — Homepage Sections

Create each section as a separate Liquid file in `shopify/theme/sections/`.

### 2a. `sections/hero-cosmos.liquid`
The full hero section from the design prototype.
- Canvas element with id="starfield" (cosmos JS targets this)
- Constellation SVG overlay (exact points from design file)
- Hero lockup: NOTHING is FINISHED title block, gold rules, RELENTLESS
- Four bloom cards (see design file for exact HTML structure)
- Rotating mantra `<p id="heroMantra">`
- Static tagline: "The work is not finished. Neither are you."
- Enter the Movement CTA button
- Scroll hint arrow

Schema settings to expose in Shopify customizer:
```json
{
  "name": "Hero Cosmos",
  "settings": [
    { "type": "text", "id": "cta_text", "label": "CTA button text", "default": "Enter the Movement" },
    { "type": "url", "id": "cta_url", "label": "CTA button URL" },
    { "type": "text", "id": "tagline", "label": "Static tagline", "default": "The work is not finished. Neither are you." },
    { "type": "checkbox", "id": "show_scroll_hint", "label": "Show scroll hint", "default": true }
  ],
  "presets": [{ "name": "Hero Cosmos" }]
}
```

### 2b. `sections/philosophy-strip.liquid`
The philosophy teaser section (brief manifesto excerpt with link to full page).

Schema:
```json
{
  "name": "Philosophy Strip",
  "settings": [
    { "type": "richtext", "id": "content", "label": "Philosophy text" },
    { "type": "text", "id": "cta_text", "label": "Link text", "default": "Read the Full Story →" },
    { "type": "url", "id": "cta_url", "label": "Link URL" }
  ],
  "presets": [{ "name": "Philosophy Strip" }]
}
```

### 2c. `sections/community-section.liquid`
The Give Time / Give Resources / Give Energy section with cause cards.
- Three give cards with SVG icons
- Four cause cards linking to still-building page categories

### 2d. `sections/content-channel.liquid`
YouTube channel embed section + submission CTA.
- YouTube embed placeholder (uses `settings.youtube_channel_id`)
- Stephen's exact submission copy: "Nothing is !nished. Show us your pursuit..."
- Instagram link: https://www.instagram.com/relentlessperforma

### 2e. `sections/shop-teaser.liquid`
Coming soon / waitlist section.
- Drop badge with pulse animation
- "WEAR THE MINDSET." heading
- Klaviyo waitlist email capture form
- Uses `settings.klaviyo_waitlist_list_id`

### 2f. `sections/outreach-banner.liquid`
Relentless Outreach closing CTA section.

### 2g. `sections/announcement-bar.liquid`
Top announcement bar (hidden by default, enable via settings).

### 2h. `sections/header.liquid`
Site navigation.
- Logo (uses `settings.logo` image picker)
- Nav links to four pillar pages
- @relentlessperforma Instagram link
- "Shop The Movement" CTA
- Mobile hamburger menu
- Scrolled state (adds background on scroll)

### 2i. `sections/footer.liquid`
Site footer.
- Logo (uses `settings.logo_light`, inverted)
- Four column layout: brand description, Explore, Community, Connect
- Legal links: Privacy Policy, Terms of Service, Community Guidelines, Accessibility
- Copyright: "© {{ 'now' | date: '%Y' }} Relentless — A DBA of Edges & Dreams. All rights reserved."

---

## TASK 3 — Page Templates

### 3a. `templates/page.philosophy.json`
Shopify JSON template for the philosophy page.
Maps to a section: `sections/page-philosophy.liquid`

### 3b. `sections/page-philosophy.liquid`
Full philosophy page content in Liquid.
Translate `design/philosophy.html` into Liquid.
- Minimal starfield (quieter version — fewer stars, lower opacity)
- Page hero with "Nothing Is Finished." title
- Full manifesto blocks with scroll reveal
- Pull quotes
- Faith easter egg woven into copy as in the HTML file
- Closing CTA back to homepage

### 3c. `templates/page.still-building.json`
JSON template for the We Are Still Building page.

### 3d. `sections/page-still-building.liquid`
Translate `design/still_building.html` into Liquid.
- Elevated hero
- Meta statement: "Nothing is finished. This page isn't either..."
- Four category cards
- Action pages (overlay panels) for each category
- Symbolic checkbox tracker
- Real organization links

### 3e. `templates/page.still-becoming.json`
JSON template for You Are Still Becoming page.

### 3f. `sections/page-still-becoming.liquid`
Mindset feed page — scrollable card feed layout.
At launch this is a scaffold. Content populates via Shopify blog posts
tagged with collection "mindset-feed".
- Feed header with page title and description
- Blog post cards (title, excerpt, date, author)
- Submission CTA at bottom

---

## TASK 4 — Snippets

### 4a. `snippets/cookie-consent.liquid`
GDPR cookie consent banner.
- Appears on first visit
- "Accept" and "Learn More" (links to privacy policy)
- Dismissed state stored in cookie
- Required for GDPR compliance

### 4b. `snippets/cart-drawer.liquid`
Slide-out cart panel.
- Triggered by cart icon in header
- Line items, subtotal, checkout button
- Empty state message

### 4c. `snippets/klaviyo-form.liquid`
Reusable Klaviyo email capture snippet.
Parameters: list_id, placeholder_text, button_text, success_message
Used by shop-teaser and any other email capture forms.

---

## TASK 5 — Locales

### 5a. `locales/en.default.json`
Default English strings for the theme.
Include keys for all user-facing strings:
- navigation labels
- form placeholders and buttons
- error messages
- accessibility labels (aria-label values)
- cookie consent text

---

## TASK 6 — Security & Compliance Checks

Before any section is considered complete, verify:

### Security
- [ ] No API keys, tokens, or secrets in any Liquid/JS/CSS file
- [ ] All user input (email forms) validated client-side AND sanitized
- [ ] CSP-compatible — no inline event handlers (use addEventListener)
- [ ] External links use `rel="noopener noreferrer"`
- [ ] Klaviyo form uses Shopify's CSRF token pattern

### Accessibility (WCAG 2.1 AA)
- [ ] All images have descriptive `alt` attributes or `alt=""` if decorative
- [ ] Skip-to-content link is first focusable element on every page
- [ ] Color contrast ratio ≥ 4.5:1 for body text (gold on dark bg ✓, check all combos)
- [ ] All interactive elements keyboard navigable (Tab, Enter, Space, Escape)
- [ ] Focus states visible and styled (not just browser default)
- [ ] Form inputs have associated `<label>` elements
- [ ] Canvas element has `aria-hidden="true"` (decorative)
- [ ] Bloom cards are `<a>` tags with descriptive aria-labels

### Performance
- [ ] CSS and JS loaded as Shopify assets (not inline)
- [ ] Google Fonts loaded with `display=swap`
- [ ] Canvas starfield uses requestAnimationFrame correctly
- [ ] No render-blocking resources

---

## TASK 7 — Shopify CLI Setup

### 7a. `shopify/config/shopify.theme.toml`
```toml
[environments.staging]
store = "your-staging-store.myshopify.com"
theme = "staging-theme-id"
directory = "shopify/theme"
ignore = ["config/settings_data.json"]

[environments.production]
store = "relentlessperforma.myshopify.com"
theme = "live-theme-id"
directory = "shopify/theme"
ignore = ["config/settings_data.json"]
```

### 7b. Verify GitHub Actions deploy workflow
`.github/workflows/deploy.yml` is already configured.
Confirm secrets are set in GitHub:
- `SHOPIFY_STAGING_STORE_URL`
- `SHOPIFY_STAGING_TOKEN`
- `SHOPIFY_STAGING_THEME_ID`
- `SHOPIFY_PRODUCTION_STORE_URL`
- `SHOPIFY_PRODUCTION_TOKEN`
- `SHOPIFY_PRODUCTION_THEME_ID`

---

## BUILD ORDER (follow this sequence)

1. Task 1 — CSS, JS, theme.liquid foundation
2. Task 2a — hero-cosmos section (most complex, unblocks everything)
3. Task 2h, 2i — header and footer (needed for all pages)
4. Task 2b-2g — remaining homepage sections
5. Task 5a — locales (needed for snippets)
6. Task 4a, 4b, 4c — snippets
7. Update templates/index.json (already scaffolded, may need updates)
8. Task 3 — page templates and sections
9. Task 7 — Shopify CLI config
10. Run `shopify theme check` — fix all errors and warnings
11. Deploy to staging — smoke test everything
12. Security and accessibility audit
13. Deploy to production

---

## REFERENCE FILES

Always check these before writing any code:
- `design/relentless_homepage.html` — homepage visual spec (source of truth)
- `design/philosophy.html` — philosophy page spec
- `design/still_building.html` — community page spec
- `design/assets/logos/` — three logo PNG files
- `CLAUDE.md` — full project context, security rules, brand specs
- `shopify/theme/config/settings_schema.json` — already configured
- `shopify/theme/layout/theme.liquid` — already scaffolded

---

## IMPORTANT REMINDERS FROM CLAUDE.MD

- NEVER hardcode API keys or secrets
- Zero-touch payments — Shopify Payments only, no card data in theme code
- MFA mandatory for admin accounts
- WCAG 2.1 AA required before launch
- TLS 1.3, HTTPS only, CSP headers
- Canvas element is decorative — aria-hidden="true"
- Cosmos JS belongs in relentless.js asset, not inline
- Mobile bloom: tap once to expand, tap again to navigate
- April 24 hard deadline — sequence matters, do foundation first

---

*Nothing is finished. Keep building.*
