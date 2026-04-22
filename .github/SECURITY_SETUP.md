# GitHub Repository Security Setup — Relentless

Complete these settings in **GitHub > Settings** after pushing the repo. This is the single source of truth for all GHAS and repo security configuration.

---

## 1. Code Security & Analysis (Settings > Code security and analysis)

### GitHub Advanced Security (GHAS)
- [x] **Dependency graph** — Enable
- [x] **Dependabot alerts** — Enable
- [x] **Dependabot security updates** — Enable (auto-creates PRs for vulnerable deps)
- [x] **Grouped security updates** — Enable (batches Dependabot PRs)
- [x] **Secret scanning** — Enable
- [x] **Secret scanning push protection** — Enable (blocks commits containing secrets at push time)
- [x] **Secret scanning validity checks** — Enable (checks if detected secrets are active)
- [x] **CodeQL analysis** — Enable for JavaScript + Python (workflow already in repo)

### Code Scanning
CodeQL and Semgrep are configured via workflows:
- `.github/workflows/codeql.yml` — JavaScript + Python, security-and-quality queries
- `.github/workflows/security.yml` — Semgrep SAST with OWASP Top 10, secrets, JS, Python rulesets
- Both upload SARIF to GitHub Security tab

---

## 2. Branch Protection (Settings > Branches)

### `main` branch (production)
- [x] Require a pull request before merging
- [x] Require approvals: **1**
- [x] Dismiss stale pull request approvals when new commits are pushed
- [x] Require review from Code Owners
- [x] Require status checks to pass before merging
  - Required checks:
    - `Theme Check Gate`
    - `Security Gate`
    - `Accessibility Gate`
    - `CodeQL (javascript)`
    - `CodeQL (python)`
    - `Secret Scanning`
    - `Semgrep SAST`
- [x] Require branches to be up to date before merging
- [x] Do not allow bypassing the above settings
- [x] Restrict who can push to matching branches

### `develop` branch (staging)
- [x] Require status checks to pass before merging
  - Required checks:
    - `Secret Scanning`
    - `Semgrep SAST`
    - `Shopify Theme Check`
- [x] Allow force pushes: **No**

---

## 3. Environments (Settings > Environments)

### `staging`
- No approval required
- Deployment branch restriction: `develop` only

### `production`
- [x] Required reviewers: @deedeerich
- [x] Deployment branch restriction: `main` only
- [x] Wait timer: **5 minutes** (gives time to cancel)

### Environment Secrets (add when Shopify store is created)
| Environment | Secret Name | Description |
|-------------|-------------|-------------|
| staging | `SHOPIFY_STAGING_TOKEN` | Shopify CLI theme access token for staging |
| staging | `SHOPIFY_STAGING_STORE_URL` | e.g. `relentlessperforma.myshopify.com` |
| production | `SHOPIFY_PRODUCTION_TOKEN` | Shopify CLI theme access token for production |
| production | `SHOPIFY_PRODUCTION_STORE_URL` | e.g. `relentlessperforma.myshopify.com` |

### Repository Secrets (Settings > Secrets and variables > Actions)
| Secret Name | Description |
|-------------|-------------|
| `ANTHROPIC_API_KEY` | For Claude PR review workflow |

---

## 4. General Settings

- [x] **Visibility:** Private (until launch, then public if desired)
- [x] **Wikis:** Disabled (docs live in repo)
- [x] **Projects:** Disabled unless using GitHub Projects
- [x] **Merge button:** Allow squash merging only (clean history)
- [x] **Auto-delete head branches:** Enable
- [x] **Allow auto-merge:** Enable (useful with required checks)

---

## 5. Workflow Inventory

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `security.yml` | push/PR/weekly | Secret scan, file guard, pip-audit, Semgrep SAST, theme check, a11y lint, CSP check |
| `codeql.yml` | push/PR/weekly | CodeQL for JavaScript + Python (security-and-quality) |
| `deploy.yml` | push to main/develop | 3-gate deploy: theme check → security → accessibility → Shopify push |
| `pr-review.yml` | PR open/sync/@claude | Claude Code automated PR review |
| `dependency-review.yml` | PR | Dependency vulnerability + license check on PRs |
| `cleanup-branches.yml` | nightly 2am UTC | Auto-delete remote branches merged into main |

---

## 6. After Setup Verification

Run these checks to confirm everything is working:

```bash
# Verify branch protection (should fail — direct push blocked)
git push origin main
# Expected: remote rejected

# Verify secret scanning push protection
echo "SHOPIFY_API_KEY=shpat_fake123456789abcdef" > test_secret.txt
git add test_secret.txt && git commit -m "test" && git push
# Expected: push blocked by secret scanning
# Clean up:
git reset HEAD~1 && rm test_secret.txt

# Verify Dependabot is active
# Go to: GitHub > Security > Dependabot > check for open alerts

# Verify CodeQL is active
# Go to: GitHub > Security > Code scanning > check for CodeQL results

# Verify workflows run
# Push any change to develop → Security Scan + CodeQL + Deploy should trigger
```

---

## 7. CODEOWNERS

Already configured at `.github/CODEOWNERS`. Ensures @deedeerich reviews all changes.

---

*Last updated: 2026-04-22*
