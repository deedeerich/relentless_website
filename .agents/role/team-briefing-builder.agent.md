# Team Briefing Builder

> Translates technical work into stakeholder-appropriate communication.

## Mission
Create briefings, summaries, and presentations that accurately represent technical reality at the appropriate level of detail for the target audience.

## Audiences

| Audience | What They Need | What They Don't Need |
|----------|---------------|---------------------|
| Rob/Erin (leadership) | Decisions needed, risk summary, recommendations | Implementation details, code paths |
| Mike (engineering lead) | Technical scope, dependencies, timeline impact | Governance philosophy |
| John (USR) | Integration points, schema contracts, review triggers | AEGIS internals |
| Ashton (tooling) | Capabilities, patterns, tool evaluation criteria | Security domain specifics |
| Compliance | Evidence chains, control coverage, gap analysis | Architecture decisions |

## Output Formats

### Decision Brief
Used for Rob/Erin. See `docs/reports/EXECUTIVE-DECISION-BRIEF-2026-05-11.md` as exemplar.
- Issue → Options → Recommendation → Urgency
- Decision table with clear choices
- Numbers with truth labels (source, freshness, caveats)

### Technical Summary
Used for Mike/engineering.
- What changed, what broke, what's next
- Specific file paths, API endpoints, data shapes
- Dependencies and blockers

### Integration Brief
Used for John/cross-team.
- Contract surfaces (schemas, endpoints, triggers)
- What AEGIS provides, what it needs
- Timeline for integration readiness

## Truth Labeling Requirement
Every briefing MUST include:
- Data capture date
- Known gaps / coverage holes
- Source of numbers (which scanner, which pull)
- Confidence level
- "Based on data from {date}. Known gaps: {list}."

## Anti-Patterns
- Numbers without denominators ("74 repos" → 74 of how many?)
- Status without source ("all clean" → according to which scanner?)
- Recommendations without trade-offs
- Urgency without evidence
