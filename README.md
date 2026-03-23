# RELENTLESS — Nothing Is Finished

Growth-mindset athletic brand, e-commerce platform, and community hub.

**Domain:** [relentlessperforma.com](https://relentlessperforma.com)

## What Is This

Relentless is built around four pillars:
1. **You Are Still Becoming** — Mindset, blog, athlete stories, performance psychology
2. **We Are Still Building** — Community, impact, volunteering, mentorship
3. **Nothing Is Finished** — Brand philosophy, manifesto, origin story
4. **Be Relentless** — Shop, apparel, exclusive drops, ambassadors

## Tech Stack

- **Shopify Basic** — store, blog, pages, SSL, CDN, checkout, PCI compliance
- **Klaviyo** — email marketing with native Shopify integration
- **Custom Liquid Theme** — built from scratch, WCAG 2.1 AA accessible
- **OpenAI Moderation API** — AI content screening (Gate 1)
- **Airtable** — moderation review queue
- **YouTube** — video hosting (embedded)

## Quick Start

```bash
# Theme development
shopify theme dev --store=relentlessperforma

# Push theme changes
shopify theme push --store=relentlessperforma

# Run security checks
npm audit && npx trufflehog filesystem . --no-update
```

## Repository Structure

```
CLAUDE.md              # Claude Code workspace context (auto-read)
design/                # Homepage mockup and brand logos
docs/                  # Project sync and planning documents
shopify/theme/         # Shopify Liquid theme (the actual site)
moderation/            # AI content screening system
klaviyo/               # Email flow architecture
scripts/               # Utility scripts (DNS verify, etc.)
.github/               # CI/CD workflows, CODEOWNERS, security setup
```

## Security

See [SECURITY.md](SECURITY.md) for vulnerability disclosure policy.
See [.github/SECURITY_SETUP.md](.github/SECURITY_SETUP.md) for GitHub repository security settings checklist.

## Branch Strategy

- `main` — production (protected, requires PR review)
- `develop` — staging/integration
- Feature branches: `feature/<name>`, `fix/<name>`, `docs/<name>`

## License

Proprietary. All rights reserved. Copyright Edges & Dreams LLC.

---

*Every day. Every step. Every moment. — Move Forward. Nothing is finished. Keep building.*
