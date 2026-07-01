# Routing Table

> Which agent/context do I use? Consult this BEFORE starting work.

## Request → Agent Routing

| Request Pattern | Product Context | Role Agent | Ops Agent |
|----------------|----------------|------------|-----------|
| "Should we do this now?" | relevant product | Phase Alignment Coach | — |
| "Should this be surfaced now, parked, escalated, or converted into a decision/risk?" | relevant product | Phase Alignment Coach | — |
| "Write this for Mike/Erin/Rob" | relevant product | Team Briefing Builder | — |
| "Make this ADR Atrium-compatible" | Atrium | ADR Conformance Reviewer | — |
| "Implement this plan" | relevant product | Implementer | — |
| "What will this break?" | relevant product | Architect Reviewer | — |
| "Review this code" | relevant product | Validation Reviewer | — |
| "Summarize this session" | relevant product | Continuation Builder | — |
| "Deploy / push / PR this" | relevant product | — | Release Steward |
| "Is this tool ready for production?" | Internal Tools LZ | — | Internal Tools Promotion Agent |
| "Where does this detail belong?" | relevant product | Phase Alignment Coach | — |
| "Correlate these findings" | AEGIS/AMME | Validation Reviewer | — |
| "Design this API / schema" | relevant product | Architect Reviewer | — |

## Routing Decision Flow

```
1. Identify product context (AEGIS/AMME, Internal Tools LZ, Atrium, USR)
2. Read product context files: current-state.md, active-lane.md, decisions.md, risks.md
3. Read shared files: LANDMINES.md, DECISION_LEDGER.md
4. Select role agent based on task type
5. If deployment/release involved → also invoke Release Steward
6. If maturity/promotion involved → also invoke Internal Tools Promotion Agent
```

## Ambiguous Request Resolution

| If unclear... | Default to... |
|--------------|---------------|
| Which product? | Ask. Do not guess. |
| Plan or implement? | Phase Alignment Coach first, then Implementer |
| Review or build? | Architect Reviewer for design, Validation Reviewer for code |
| Ship or wait? | Release Steward (it decides readiness, not the implementer) |

## Cognitive Load Routing

Route work by cognitive complexity, not just task type.

| Work Type | Cognitive Profile | Route To | Why |
|-----------|------------------|----------|-----|
| Ambiguous architecture decision | High ambiguity, many valid approaches | Architect Reviewer | Needs design exploration before commitment |
| Repetitive code transforms | Low ambiguity, mechanical execution | Implementer | Don't waste reasoning cycles |
| Stakeholder communication | Medium ambiguity, audience-sensitive | Team Briefing Builder | Requires audience modeling |
| Incomplete or contradictory decisions | High ambiguity, needs clarification | Phase Alignment Coach → Parking Lot or Decision Ledger | Don't force premature decisions |
| Unstable or evolving requirements | High ambiguity, moving target | Phase Alignment Coach | Needs exposure routing, not implementation |
| Operational verification | Low ambiguity, checklist-driven | Validation Reviewer | Mechanical but important |
| Cross-system correlation | High complexity, requires domain knowledge | Product Agent (self) | Product-specific knowledge required |
| New capability assessment | Medium ambiguity, needs research | Architect Reviewer → Phase Alignment Coach | Design before build |
| Emergency production issue | High urgency, low ambiguity once diagnosed | L4/L5 escalation → Human | Speed over process |
| Lessons learned synthesis | Medium complexity, pattern detection | Lessons Canonicalizer | Institutional learning |

### Routing Anti-Pattern

Agents waste cycles when they're in the wrong mode:
- Implementer stuck on ambiguous requirements → should be Phase Alignment
- Architect Reviewer doing mechanical code changes → should be Implementer
- Team Briefing Builder doing technical investigation → should be Architect Reviewer
- Anyone doing everything → split the roles
