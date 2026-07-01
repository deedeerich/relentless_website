# Contradiction Detection

> Contradictions are first-class operational events, not bugs to hide.

## Why This Exists

Multiple systems (Atrium, AEGIS, USR, Internal Tools LZ), multiple agents, and multiple humans will inevitably produce contradictory state. When governance posture says one thing, operational reality says another, and a continuation file says a third — that is not a data quality issue. That is a **contradiction** that requires explicit detection, classification, and resolution.

Ignoring contradictions is how "the system says it's compliant" becomes "the auditor disagrees."

## Contradiction Categories

### Category 1: Cross-System Contradictions
State divergence between systems that should agree.

| Contradiction | Example | Severity |
|--------------|---------|----------|
| Atrium policy vs AEGIS operational state | Atrium says "review required," AEGIS auto-routed without review | High |
| USR review output vs AEGIS disposition | USR says "insufficient evidence," AEGIS shows "mitigated" | High |
| Governance posture vs deployment reality | Tagged "experimental" in LZ, deployed as production workload | Critical |
| Scanner state vs AEGIS normalized state | GHAS shows "open," AEGIS shows "resolved" (stale snapshot) | Medium |
| Ticket system vs AEGIS lifecycle | AzDO ticket closed, AEGIS still shows "in remediation" | Medium |

### Category 2: Temporal Contradictions
State that was true but is no longer, yet the system still treats it as current.

| Contradiction | Example | Severity |
|--------------|---------|----------|
| Stale continuation vs current state | Continuation says "deploying v2," but v2 was abandoned | Medium |
| Historical count presented as current | "564 GHAS findings" from 2 weeks ago displayed without date | Medium |
| Expired temporary mitigation still active | "Temporary accept-risk" from 90 days ago never reviewed | High |
| Superseded decision still enforced | Old decision ledger entry contradicts newer decision | Medium |
| Stale service mapping | Service mapping says repo X belongs to Service A, but repo moved | Medium |

### Category 3: Identity Contradictions
Disagreement about what something IS.

| Contradiction | Example | Severity |
|--------------|---------|----------|
| Registry identity vs scanner identity | a74-* key says repo is "ProjectX," scanner says "project-x-api" | Medium |
| Service boundary disagreement | Finding assigned to Service A, but file path is in Service B's directory | High |
| Monorepo lineage conflict | Two services claim the same file path in a monorepo | High |
| Duplicate entity | Same repo appears under two different names in two providers | Medium |
| Orphaned identity | Service entity exists but maps to no repos or findings | Low |

### Category 4: Authority Contradictions
Disagreement about WHO decided or CAN decide.

| Contradiction | Example | Severity |
|--------------|---------|----------|
| Agent acted beyond authority | Agent merged PR without human approval (authority model violation) | Critical |
| Multiple humans approved contradictory dispositions | AppSec says "false positive," compliance says "must remediate" | High |
| Inherited disposition conflicts with local decision | Parent service says "mitigated," child service review says "open" | High |
| Execution mode mismatch | Agent in autonomous_draft mode submitted (should be draft only) | Critical |
| Governance override without documentation | Someone changed posture without recording in decision ledger | High |

### Category 5: Logical Contradictions
State that is internally inconsistent.

| Contradiction | Example | Severity |
|--------------|---------|----------|
| Finding closed without rationale | Disposition = "mitigated" but MitigationRationale is empty | Medium |
| Lifecycle violation | Finding moved from "executed" directly to "final" (skipped validation) | High |
| Coverage claim without evidence | "100% SAST coverage" but 3 repos have no scanner configured | High |
| Confidence without basis | Correlation confidence = "high" but only CWE matched (no composite) | Medium |
| Non-goals violated | AEGIS originating governance truth (NON_GOALS.md violation) | Critical |

## Detection Methods

### Automated Detection (AEGIS can check)
- Snapshot freshness vs presentation freshness (temporal contradictions)
- Lifecycle state machine violations (logical contradictions)
- Disposition without rationale (logical contradictions)
- Service mapping orphans (identity contradictions)
- Cross-provider state divergence on same finding (cross-system)
- Authority model violations in action logs (authority contradictions)
- Trust tier violations (T5 data used for autonomous action)

### Agent-Assisted Detection (Lessons Canonicalizer)
- Continuation state vs actual current state
- Decision ledger contradictions (newer vs older)
- Landmine entries that contradict operating rules
- Recurring patterns that suggest systemic contradiction

### Human-Required Detection
- Policy vs operational reality (requires judgment)
- Competing stakeholder dispositions (requires authority resolution)
- Architecture boundary violations (requires domain expertise)
- Governance posture interpretation (requires policy knowledge)

## Contradiction Response Protocol

### Step 1: Detect and Classify
- Identify the contradiction category
- Assess severity (Critical / High / Medium / Low)
- Determine trust tiers of the conflicting sources

### Step 2: Escalate Appropriately
| Severity | Escalation Level | Action |
|----------|-----------------|--------|
| Critical | L5 — Stop the line | Halt affected workflows. Human resolution required. |
| High | L4 — Interrupt | Pause current work. Resolve before proceeding. |
| Medium | L3 — Surface in planning | Note and route. May continue with caveat. |
| Low | L2 — Register | Record for future review. Continue normally. |

### Step 3: Resolve
- **Higher trust wins** — T1 source overrides T4 inference
- **Newer authoritative wins** — Fresh T1 overrides stale T1
- **Human authority wins** — Human decision overrides agent inference
- **Policy authority wins** — Atrium governance overrides AEGIS operational state
- **If equal trust** — Escalate to human. Do not auto-resolve.

### Step 4: Record
Every contradiction resolution becomes:
- A decision ledger entry (if policy-affecting)
- A landmine entry (if it could recur)
- An evidence graph edge (if it affects correlation)
- A failure mode catalog entry (if it reveals a new failure pattern)

## Integration with Other Standards

- **Trust Tiers**: Higher trust tier wins contradiction resolution
- **Authority Model**: Authority contradictions are always Critical severity
- **Escalation Model**: Contradictions use the override conditions path when Critical
- **Evidence Graph**: Contradictions create explicit "CONTRADICTS" edge type between nodes
- **Lessons Canonicalizer**: Recurring contradictions should elevate to operating rules or checklists
- **Context Expiration**: Many temporal contradictions are prevented by proper expiration

## The Meta-Agent Warning

The most dangerous contradiction is an invisible one:

> A system that believes it has resolved all contradictions has merely stopped detecting them.

As the control plane grows, the temptation is to create a single "meta-orchestrator" that resolves all contradictions automatically. This is the precise moment systems become dangerous. Distributed cognition with explicit contradiction surfaces is safer than centralized resolution with implicit authority.

Protect distributed detection aggressively.
