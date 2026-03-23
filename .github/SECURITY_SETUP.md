# GitHub Repository Security Setup Checklist

Complete these settings in **GitHub > Settings** immediately after the first push. Do this before writing any theme code.

## Branch Protection (Settings > Branches)

### `main` branch
- [x] Require a pull request before merging
- [x] Require approvals: 1
- [x] Dismiss stale pull request approvals when new commits are pushed
- [x] Require review from Code Owners
- [x] Require status checks to pass before merging
  - Required checks: `security-scan`, `dependency-audit`
- [x] Require branches to be up to date before merging
- [x] Do not allow bypassing the above settings

### `develop` branch
- [x] Require status checks to pass before merging
  - Required checks: `security-scan`

## Code Security (Settings > Code security and analysis)

- [x] **Dependency graph** — Enable
- [x] **Dependabot alerts** — Enable
- [x] **Dependabot security updates** — Enable
- [x] **Secret scanning** — Enable
- [x] **Secret scanning push protection** — Enable (blocks commits containing secrets)
- [x] **CodeQL analysis** — Enable for JavaScript

## Environments (Settings > Environments)

### `staging`
- No approval required
- Deploys from `develop` branch only

### `production`
- [x] Required reviewers: @deedeerich
- [x] Deployment branch restriction: `main` only
- [x] Wait timer: 5 minutes (gives time to cancel)

## General Settings

- [x] **Visibility:** Private (until launch)
- [x] **Wikis:** Disabled (docs live in repo)
- [x] **Projects:** Disabled unless using GitHub Projects for task tracking
- [x] **Merge button:** Allow squash merging only (clean history)
- [x] **Auto-delete head branches:** Enable

## After Setup Verification

Run these checks to confirm everything is working:

```bash
# Try to push directly to main (should fail)
git push origin main

# Try to commit a fake secret (push protection should block)
echo "SHOPIFY_API_KEY=shpat_fake123" > test_secret.txt
git add test_secret.txt && git commit -m "test" && git push

# Clean up
git reset HEAD~1 && rm test_secret.txt
```
