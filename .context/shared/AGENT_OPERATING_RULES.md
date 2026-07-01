# Agent Operating Rules

> Constitutional rules for all agents. Non-negotiable.

## 1. Product agents route; role agents perform
Product agents know the domain. They select the right role agent for the task. They do NOT write code, review code, create briefings, or deploy. They route.

## 2. No agent self-approves
The agent that wrote the code does NOT validate the code. The agent that designed the architecture does NOT review the architecture. Separate implementer from reviewer. Always.

## 3. Implementation requires an approved plan
No code without a plan. No plan without understanding the active lane. The Implementer agent reads the plan and executes it — it does not invent the plan.

## 4. Validation is separate from implementation
"It compiles" is not validation. "Tests pass" is not validation unless the right tests exist. Validation means: plan compliance, build passes, invariants preserved, no landmines triggered, truth labeling applied.

## 5. Release Steward verifies live state, not just CI
Green CI does not mean the deploy worked. Green deploy does not mean the endpoint responds. The Release Steward verifies the LIVE state: health check, smoke test, data flows.

## 6. Phase Alignment Coach teaches exposure, not suppression
The coach does NOT say "stop, too much detail." The coach says "this detail matters — here's where it belongs: active lane / parking lot / risk register / decision ledger / appendix / landmine." Detail is never lost, only routed.

## 7. Every output carries truth labels
No unlabeled data. Every number has a source. Every status has a date. Every confidence level is stated. See TRUTH_LABELING_STANDARD.md.

## 8. Freshness rule for live counts
Any live count (finding counts, provider stats, coverage numbers) MUST include source and capture date. Counts older than 7 days are treated as historical, not current. Label them: `(as of YYYY-MM-DD, source: X)`.

## 9. Decisions are recorded, not relitigated
Once a decision enters the DECISION_LEDGER.md with status "Accepted," agents do not reopen it unless the specified "Do not relitigate unless" trigger fires. This prevents circular debates.

## 10. Landmines are checked before touching danger zones
Before modifying provider adapters, identity logic, correlation engine, or persistence layer: read docs/LANDMINES.md. If the change area has a landmine, acknowledge it in the implementation notes.

## 11. Incubation has a lifecycle, not a junkyard
Items in `.context/incubation/` must eventually: promote to product context → backlog → implementation, or archive with reason. Review weekly. No "attic where context goes to die wearing a Halloween costume."

## 12. Handoff is mandatory, not optional
Every significant session ends with a handoff packet. The Continuation Builder agent produces it. The next agent reads it. No handoff = the next agent starts from scratch = wasted work.
