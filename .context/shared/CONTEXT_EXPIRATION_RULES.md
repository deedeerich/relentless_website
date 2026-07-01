# Context Expiration Rules

> Defines when context expires, decays, or must be archived. Prevents context inflation — where everything becomes context and signal-to-noise collapses.

## Expiration Rules Table

| Context Type | Fresh | Stale | Expired/Archive | Action on Expiry |
|-------------|-------|-------|-----------------|-----------------|
| Operational counts (finding counts, provider stats) | < 7 days | 7-14 days | > 14 days | Re-label as historical with date |
| Provider freshness states | < TTL (per provider) | Past TTL | > 2x TTL | Mark as error state |
| Escalation states | While active | After resolution | After next session | Archive to handoff |
| Continuation docs | Current session | Next session start | After next handoff completes | Archive previous, keep current |
| Incubation ideas | < 30 days | 30-60 days | > 60 days | Promote or archive with reason |
| Parking lot items | < 30 days | 30-60 days | > 60 days | Review: promote, defer with date, or archive |
| Temporary mitigations | While active | After permanent fix available | After permanent fix deployed | Remove mitigation, update disposition |
| Decision ledger entries | Permanent (accepted) | — | Only if superseded | Mark superseded, link to replacement |
| Risk register entries | While risk exists | After mitigation deployed | After risk retired | Archive with resolution date |
| Handoff packets | Current + previous | Older than 2 sessions | Older than 5 sessions | Archive to docs/handoff/ |
| Session-specific context | Current session only | — | End of session | Do not persist beyond handoff |
| Tool scouting notes | < 60 days | 60-90 days | > 90 days | Re-evaluate or archive |

## Freshness Label Requirements

All live counts must include source and capture date:

```
(as of YYYY-MM-DD, source: X)
```

Counts older than 7 days must be labeled as:

```
(historical, as of YYYY-MM-DD)
```

Any count without a date is assumed stale. Any count without a source is assumed unverifiable.

## Context Hygiene Checklist (periodic)

- [ ] All operational counts have dates
- [ ] No incubation items > 30 days without review
- [ ] No parking lot items > 30 days without review
- [ ] Continuation.md reflects current session, not stale state
- [ ] Decision ledger has no open/unresolved entries older than 30 days
- [ ] Risk register risks are still active (not resolved without update)
- [ ] Expired temporary mitigations are cleaned up

## Anti-Patterns

- **"We've always had 564 GHAS findings"** — WHEN? That number is probably stale.
- **Parking lot as permanent graveyard** — review or archive.
- **Continuation doc from 3 sessions ago still current** — rewrite.
- **Incubation ideas that are really just notes from one conversation** — archive or promote.
- **Risk register with "risks" that were fixed months ago** — clean up.

## Entropy Warning

Context inflation is the #1 killer of knowledge management systems. Every second-brain system eventually fights this. The Phase Alignment Coach helps with routing, but expiration is the other half — things must leave the system, not just enter it.
