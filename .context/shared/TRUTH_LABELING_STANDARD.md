# Truth Labeling Standard

> No unlabeled truth. Ever. That's how dashboards become fiction with charts.

## The Rule

Every system output — reports, dashboards, briefings, agent summaries, API responses — MUST identify:

1. **data_source** — where the data came from
2. **freshness** — how old the data is
3. **confidence** — how much to trust it
4. **caveats** — what's missing or degraded

## Standard Fields

```json
{
  "data_source": "provider_snapshots | live_api | cosmos_cache | file_cache | synthetic | manual",
  "freshness": "fresh | stale | error | never_fetched | unknown",
  "freshness_age_seconds": 120,
  "last_success_at": "2026-05-13T10:00:00Z",
  "confidence": "authoritative | high | degraded | low | unknown",
  "fallback_reason": null,
  "caveats": []
}
```

## Confidence Levels

| Level | Meaning | Example |
|-------|---------|---------|
| `authoritative` | Direct from source of record, fresh, no degradation | Live GHAS API pull, < 15 min old |
| `high` | From source, slightly stale or minor enrichment gap | Cosmos snapshot, < 2 hours old |
| `degraded` | Partial data, known gaps, or fallback source | Veracode from disk cache after pod restart |
| `low` | Significant gaps, cross-scanner correlation missing, or very stale | Aggregate > 24 hours old, 7 orgs invisible |
| `unknown` | Cannot determine provenance | Legacy data without capture timestamp |

## Freshness States

| State | Meaning | Action |
|-------|---------|--------|
| `fresh` | Within provider TTL | Use normally |
| `stale` | Past TTL but within tolerance | Use with warning label |
| `error` | Last fetch failed, data may be outdated | Show error state prominently |
| `never_fetched` | No successful pull ever | Show "no data" not "clean" |
| `unknown` | No timestamp available | Treat as stale |

## Application by Surface

### AEGIS Reports
- Every report header must include: data capture date, provider states, known gaps
- Finding counts must note: "N findings from M providers as of {date}"
- Coverage gaps must distinguish: "not scanned" vs "scanned and clean" vs "unmapped"

### Provider Status (Trust Strip)
- Per-provider: freshness state + last success + finding count
- Color code: green=fresh, yellow=stale, red=error, gray=never_fetched

### Team Briefings
- Every briefing must state: "Based on data from {date}. Known gaps: {list}."
- Numbers must carry source: "564 GHAS findings (3 of 10 orgs accessible)"

### Agent Summaries
- Every agent output must state what data it used and how old it is
- "I checked the May 11 aggregate (2 days old). Flaws 21214/21215 may postdate this snapshot."

### Correlation Reports
- Per-portfolio: which scanners covered which repos
- Tier confidence: T1 (composite match) > T2 (CWE+codebase) > T3 (no match)
- Coverage gap percentage prominently displayed

## Anti-Patterns

- "74 repos have findings" — WHERE DID 74 COME FROM? Label: "74 repos from Active74 registry (deprecated)"
- "No findings" — DOES NOT MEAN CLEAN. Could mean: not scanned, scanner error, wrong endpoint, auth blocked
- "100% coverage" — OF WHAT? Specify denominator: repos, services, apps, orgs
- Dashboard without date — WHEN was this data captured?
- Green status without source — GREEN ACCORDING TO WHOM?
