# Trust Tiers

> Not all inputs deserve equal operational trust. Treat them accordingly.

## Why This Exists

The system increasingly reasons across live data, historical state, inferred relationships, inherited rationale, and AI-generated synthesis. Without trust tiering, everything starts looking equally authoritative. That becomes dangerous once automation deepens.

## Trust Tier Definitions

| Tier | Name | Meaning | Operational Treatment |
|------|------|---------|----------------------|
| **T1** | Authoritative | Direct from source of record, fresh, verified | Act on it. Cite it. Use for governance decisions. |
| **T2** | High | From source, slightly stale or minor enrichment gap | Act on it with freshness label. Note age. |
| **T3** | Medium | Human-entered, manually curated, or moderately stale | Use with verification. Cross-reference if possible. |
| **T4** | Conditional | Inferred, inherited, or derived from other data | Use only with explicit confidence and caveats. Never auto-act. |
| **T5** | Low | AI-derived, unvalidated, speculative, or very stale | Treat as hypothesis. Requires human validation before operational use. |
| **T6** | Exploratory | Parking lot ideas, brainstorms, unassigned decisions | Not operational. Do not reason over as if true. |

## Source-to-Tier Mapping

| Source | Trust Tier | Notes |
|--------|-----------|-------|
| Direct provider API (GHAS, AGHAS, Veracode) live pull | T1 | Authoritative within provider's scope |
| Cosmos-backed provider snapshot < 30 min | T1 | Fresh snapshot, equivalent to live |
| Cosmos-backed provider snapshot < 2 hours | T2 | Stale but usable |
| Cosmos-backed provider snapshot > 2 hours | T3 | Degraded — label prominently |
| Human-entered service mappings | T3 | Manual curation — correct but may drift |
| Human-entered finding dispositions | T1 | Human authority is authoritative for decisions |
| Registry-derived repo mappings (a74-*) | T4 | Transitional — may not match reality |
| Inferred monorepo lineage | T4 | Conditional — verify path relationships |
| Cross-scanner correlation match (T1 composite) | T2 | High confidence but derived |
| Cross-scanner correlation match (T2 CWE+codebase) | T4 | Conditional — review with inherited rationale |
| Cross-scanner correlation match (T3 no match) | T5 | Low — independent review required |
| AI-generated classification or summary | T5 | Hypothesis until validated |
| AI-generated remediation recommendation | T5 | Recommendation only — never auto-execute |
| Inherited disposition (same file + lineage) | T4 | Conditional — verify service boundary |
| Inherited disposition (different service) | T5 | Low — requires independent review |
| Continuation state (current session) | T2 | High but session-scoped |
| Continuation state (previous session) | T3 | Medium — may be outdated |
| Continuation state (>2 sessions old) | T5 | Low — likely stale |
| Parking lot items | T6 | Exploratory — not operational |
| Incubation ideas | T6 | Exploratory — not operational |
| Decision ledger (accepted) | T1 | Authoritative — do not relitigate |
| Decision ledger (proposed/draft) | T4 | Conditional — not yet settled |
| Landmine entries | T1 | Operational truth — respect them |
| Atrium governance posture | T1 | Authoritative — AEGIS consumes, doesn't define |
| USR review output | T1 | Authoritative for review methodology |
| DfD posture assessment | T3 | Posture enrichment, not findings authority |
| Veracode findings (active scan) | T2 | Migration-era evidence, not SoR (DEC-2026-04-01-001) |
| Veracode findings (historical) | T4 | Supporting evidence only |

## Trust Decay

Trust degrades over time. A T1 source becomes T2 after its freshness TTL, T3 after stale threshold, and eventually T5 if never refreshed.

```
T1 (fresh) → T2 (past TTL) → T3 (past stale threshold) → T5 (expired)
```

Exception: Decision ledger entries and landmines do NOT decay — they are either current or superseded. There is no "stale decision."

## Operational Rules

### Rule 1: Never auto-act on T4 or below
Conditional and low-trust data may inform recommendations but must not trigger autonomous actions. Human review required.

### Rule 2: Always label the tier
When presenting data to humans or other agents, include the trust tier. "564 GHAS findings (T1, live pull, 2026-05-14)" vs "564 GHAS findings (T3, cached, 2026-05-07)".

### Rule 3: Inheritance drops tier
When data is derived from other data, the derived data's trust tier is at most one tier below its highest-trust input. T1 source + inference = T2 at best. T3 source + inference = T4.

### Rule 4: AI output starts at T5
All AI-generated content starts at T5 regardless of input quality. AI synthesis is hypothesis, not truth. Human validation promotes to T3 (confirmed) or T1 (authoritative decision).

### Rule 5: Cross-domain trust is the minimum
When combining data from multiple domains (e.g., Atrium governance + AEGIS findings), the combined trust is the minimum of the inputs. T1 governance + T4 inferred identity = T4 combined.

## Integration with Other Standards

- **Truth Labeling Standard**: Trust tier maps to `confidence` field. T1=authoritative, T2=high, T3-T4=degraded, T5=low, T6=unknown.
- **Authority Model**: T4+ data cannot satisfy the "preconditions met" requirement for conditional authority.
- **Evidence Graph**: Edge confidence derives from source trust tiers. T1 sources create high-confidence edges; T5 sources create exploratory edges only.
- **Context Expiration**: Trust tier interacts with freshness. Expired T1 data drops to T3 minimum, not T1 forever.

## Anti-Patterns

| Anti-Pattern | Why It's Dangerous |
|-------------|-------------------|
| "The dashboard says 100% coverage" | Coverage from what tier? T1 live scan or T4 inferred? |
| "The AI said it's a false positive" | T5 — hypothesis, not verdict. Requires human validation. |
| "We inherited the disposition from the parent repo" | T4 at best. Verify service boundary. |
| "The continuation file says X" | From when? Current session = T2. Three sessions ago = T5. |
| Treating all scanner output as equal | Veracode (T2, migration era) != GHAS (T1, current SoR) |
| "The registry says this repo exists" | T4 — Active74 registry has phantom entries |
