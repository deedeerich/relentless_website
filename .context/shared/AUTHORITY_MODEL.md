# Human Authority Model

> Formal authority boundaries for the Agentic Work Control Plane. What agents may do autonomously vs what requires human approval.

This document governs all agent types in the Lighthouse Global control plane: product agents (AEGIS, Atrium, Polaris, Governance, USR), role agents (Implementer, Reviewer, Coach, Steward), and ops agents (Release Steward, Internal Tools Promotion). Authority is explicit, never implied, never inherited by repetition.

---

## 1. Authority Principles

1. **Agents create, recommend, draft, orchestrate. Humans approve, close, promote, govern.** No exceptions. An agent may prepare the decision; a human makes it.
2. **Authority is explicit, never implied.** If an action is not listed in the Authority Matrix below with "Agent May: Yes," the agent does not have that authority.
3. **No agent self-approves.** The agent that produced an artifact does not validate, approve, or promote that artifact. Separate implementer from reviewer. Separate drafter from approver.
4. **Emergency authority requires human escalation (L5).** When an L5 stop-the-line condition is triggered, all agent actions pause. Only a human can resume operations. See Section 4.
5. **Override authority is logged and traceable.** Every override of this model must produce a record: who authorized it, when, why, and what scope. "Who approved this?" must always have a traceable answer.
6. **Repeated approval does not create implied autonomy.** If a human approves the same agent-drafted action 50 times, the 51st still requires human approval. Patterns do not promote themselves.

---

## 2. Authority Matrix

| Action | Agent May | Human Required | Who (Role) | Execution Mode | Notes |
|--------|-----------|----------------|------------|----------------|-------|
| **Architecture Decisions** | | | | | |
| Create ADR draft | Yes | No | -- | `autonomous_draft` | Agent drafts; human reviews before acceptance |
| Approve/accept ADR | No | Yes | Architect | -- | Final architectural authority is always human |
| Supersede existing ADR | No | Yes | Architect | -- | Must reference predecessor and rationale |
| **Source Control** | | | | | |
| Create branch | Yes | No | -- | `autonomous_action` | Naming must follow conventions |
| Create PR | Yes | No | -- | `autonomous_action` | PR body must include invariant checklist |
| Merge to main | Conditional | Yes | Repo Owner | `guided` | Only if CI green, no security findings, and human approved PR |
| Force push | No | Yes | Repo Owner | -- | Destructive; always requires explicit human instruction |
| **Findings and Vulnerability Management** | | | | | |
| Ingest external signals | Yes | No | -- | `autonomous_action` | Provider refresh, SARIF import, webhook receipt |
| Run provider refresh | Yes | No | -- | `autonomous_action` | Bounded to configured providers and orgs |
| Assign finding to owner | Yes | No | -- | `autonomous_action` | Based on ownership rules; human can override |
| Create remediation ticket | Yes | No | -- | `autonomous_action` | Ticket created in draft/open state |
| Mark false positive | Recommend only | Yes | AppSec Lead | `autonomous_recommendation` | Agent queues recommendation with evidence; human validates |
| Accept risk on finding | No | Yes | Security Lead or Architect | -- | Risk acceptance is a governance decision |
| Close/resolve ticket | No | Yes | Ticket Owner | -- | Closure authority belongs to the responsible human |
| Bulk-close findings | Draft only | Yes | AppSec Lead | `autonomous_draft` | Agent prepares bulk list with rationale; human executes |
| Override finding severity | No | Yes | AppSec Lead | -- | Severity is provider-native or human-adjudicated |
| Override escalation level | No | Yes | Product Owner | -- | Escalation levels carry operational consequences |
| **Correlation and Reconciliation** | | | | | |
| Run correlation analysis | Yes | No | -- | `autonomous_action` | Deterministic composite-key matching |
| Recommend disposition | Recommend only | Yes | AppSec Lead | `autonomous_recommendation` | Rendered visually distinct from validated states (Inv 16) |
| Validate disposition | No | Yes | AppSec Lead | -- | Transitions `validation_pending` to `validated` |
| Modify correlation rules | Draft only | Yes | AppSec Lead + Architect | `autonomous_draft` | Rule changes affect all future matching |
| **Lifecycle and Governance** | | | | | |
| Promote workload lifecycle stage | Recommend only | Yes | Platform Governance | `autonomous_recommendation` | Agent recommends; governance approves promotion |
| Change governance posture | No | Yes | Security Lead | -- | Posture changes affect tenant-wide policy |
| Create/modify security policy | Draft only | Yes | Security Lead | `autonomous_draft` | Policy drafts require security review before activation |
| Change scanner configuration | No | Yes | AppSec Lead | -- | Scanner config changes affect detection coverage |
| Approve compliance review | No | Yes | GRC Lead or Security Lead | -- | Compliance decisions carry audit weight |
| **Deployment** | | | | | |
| Deploy to dev environment | Yes (CI green) | No | -- | `autonomous_action` | Automated deploy on green CI in dev only |
| Deploy to staging | No | Yes | Release Steward | `guided` | Staging is pre-production; human gate required |
| Deploy to production | No | Yes | Release Steward + Repo Owner | `guided` | Dual approval required for production |
| Rollback production | No | Yes | Release Steward | `guided` | Rollback is a production-impacting action |
| **Infrastructure** | | | | | |
| Modify infrastructure (Terraform) | Plan only | Yes | Platform Engineer | `autonomous_draft` | Agent runs `terraform plan`; human reviews and applies |
| Apply Terraform | No | Yes | Platform Engineer | `guided` | Apply is a state-mutating operation |
| Modify network ACLs/firewall rules | No | Yes | Platform Engineer + Security Lead | -- | Network changes require dual review |
| Create/modify managed identity | No | Yes | Platform Engineer | -- | Identity is a security-critical resource |
| **Reports and Context** | | | | | |
| Generate reports | Yes | No | -- | `autonomous_action` | Reports are read-only artifacts with truth labels |
| Generate team briefings | Yes | No | -- | `autonomous_action` | Must carry freshness and source labels |
| Archive/delete context files | Recommend | Yes | Any authorized human | `autonomous_recommendation` | Agent recommends; human confirms deletion |
| Update `.context/` files | Yes | No | -- | `autonomous_action` | Operational context; does not affect governance state |
| Update MEMORY.md or handoff docs | Yes | No | -- | `autonomous_action` | Session continuity artifacts |
| **Agent Configuration** | | | | | |
| Modify authority model (this doc) | No | Yes | Product Owner + Security Lead | -- | Self-modification of authority boundaries is prohibited |
| Add new agent capability | No | Yes | Architect + Product Owner | -- | Must update this document before activation |
| Change execution mode for session | No | Yes | Human operator | -- | Mode is set by the human, not negotiated by the agent |

---

## 3. Conditional Authority Rules

"Conditional" in the Authority Matrix means: the agent may execute the action IF AND ONLY IF all listed preconditions are satisfied. If any precondition fails, the action requires explicit human approval.

### Merge to main

Preconditions (ALL must be true):
- CI pipeline is green (all checks pass)
- No open security findings of severity High or Critical on the PR
- A human has approved the PR via GitHub review
- No merge conflicts exist
- Branch is up to date with target branch

### Deploy to dev environment

Preconditions (ALL must be true):
- CI pipeline is green
- Container image passed Trivy scan with no Critical findings
- Target environment is `dev` (never staging, never production)
- Health check endpoint responds after deploy

### Assign finding to owner

Preconditions (ALL must be true):
- Ownership rules are configured for the target repo/service
- The resolved owner is a valid UPN/email in the identity system
- Assignment does not override an existing human-made assignment

### Run correlation analysis

Preconditions (ALL must be true):
- Provider data is fresh (within TTL)
- Correlation rules have not been modified since last human-approved rule set
- Results are written to review queue, not applied directly

### Update `.context/` files

Preconditions (ALL must be true):
- Change is additive or corrective (not deleting governance-relevant content)
- Change does not modify authority boundaries, escalation levels, or decision records
- For DECISION_LEDGER.md: agent may add entries but not modify status of existing entries

---

## 4. Emergency Authority

### L5 Stop-the-Line Protocol

When an L5 escalation is triggered (see ESCALATION_MODEL.md):

1. **All agent actions pause immediately.** No in-flight autonomous_action completes. No queued recommendations execute. No drafts are submitted.
2. **Agent enters `assist` mode only.** The agent may answer questions and provide context to the human investigating the emergency. It may not take any action.
3. **Only a human can resume operations.** The human must explicitly clear the L5 condition and specify which execution mode to resume in.
4. **Emergency override is logged.** Every L5 event produces a record:
   - `triggered_by`: signal or condition that caused L5
   - `triggered_at`: ISO 8601 timestamp
   - `paused_actions`: list of agent actions that were in flight or queued
   - `cleared_by`: human identity (UPN)
   - `cleared_at`: ISO 8601 timestamp
   - `resume_mode`: execution mode authorized for resumption
   - `reason`: why the L5 was cleared

### L5 Triggers (Non-Exhaustive)

- Production blast radius discovered during deploy
- Data integrity or truth corruption detected
- Security breach or active exploitation signal
- Compliance violation that creates legal exposure
- Provider credential compromise

---

## 5. Authority Drift Prevention

### Quarterly Review

This document is reviewed quarterly by the Product Owner and Security Lead. The review covers:
- Are any "Recommend only" actions being rubber-stamped into de facto autonomous authority?
- Have new agent capabilities been added without updating this matrix?
- Are conditional preconditions still correctly scoped?
- Has any override pattern emerged that should be formalized or blocked?

### New Capability Gate

Any new agent capability (new tool, new action, new integration) MUST update this document BEFORE the capability is activated. The update must specify:
- What the capability does
- Whether it requires human approval
- Which execution mode governs it
- What preconditions apply

### Anti-Drift Rules

1. **No implied promotion.** If `autonomous_draft` actions are approved by a human 100 times, the 101st is still `autonomous_draft`. Repetition does not create authority.
2. **No scope creep via composition.** An agent that can "create PR" and "deploy to dev" does NOT have authority to "merge and deploy" as a combined action. Each step is governed independently.
3. **No authority by omission.** If an action is not in the matrix, the default is: agent may not perform it. The absence of a prohibition is not a permission.
4. **Audit trail is mandatory.** Every action taken under `autonomous_action` or `autonomous_recommendation` must be logged with: action, timestamp, agent identity, execution mode, preconditions evaluated, outcome.

---

## 6. Integration with Execution Modes

Each execution mode defines a ceiling on agent authority. The Authority Matrix entries are bounded by these ceilings.

### `assist`

| Permits | Explicitly Blocks |
|---------|-------------------|
| Answer questions about code, architecture, findings, state | Take any action (no creates, no modifies, no deletes) |
| Explain context, history, rationale | Submit, queue, or recommend anything |
| Read files, search codebases, analyze patterns | Write files, create branches, run commands |
| Summarize session state | Modify any persistent state |

### `guided`

| Permits | Explicitly Blocks |
|---------|-------------------|
| Execute actions with human confirmation at each step | Auto-execute without confirmation |
| Present plan, wait for approval, then execute | Chain multiple actions without intermediate approval |
| Modify files, create PRs, run builds after human says "proceed" | Merge, deploy, close, approve without human in the loop |
| Surface recommendations for human decision | Make the decision on behalf of the human |

### `autonomous_draft`

| Permits | Explicitly Blocks |
|---------|-------------------|
| Generate ADR drafts, policy drafts, Terraform plans | Submit, approve, or finalize any draft |
| Prepare bulk-close lists with rationale | Execute bulk-close |
| Draft correlation rule changes | Apply correlation rule changes |
| Create PR descriptions, commit messages, documentation | Merge PRs, publish documentation as authoritative |
| Write to `.context/incubation/` | Promote incubation items to product context |

### `autonomous_recommendation`

| Permits | Explicitly Blocks |
|---------|-------------------|
| Recommend dispositions (false positive, risk acceptance) | Validate or finalize dispositions |
| Queue review triggers for human review | Execute reviews or close findings |
| Recommend lifecycle stage promotions | Promote lifecycle stages |
| Suggest file archival or context cleanup | Delete or archive without confirmation |
| Recommend escalation level changes | Change escalation levels |

### `autonomous_action`

| Permits | Explicitly Blocks |
|---------|-------------------|
| Create branches, create PRs | Merge to main, force push |
| Create remediation tickets (open/draft state) | Close, resolve, or accept-risk on tickets |
| Assign findings to owners (per ownership rules) | Override human-made assignments |
| Ingest signals, run provider refresh | Modify provider configuration |
| Deploy to dev (CI green, Trivy clean) | Deploy to staging or production |
| Generate reports and briefings | Approve, finalize, or govern |
| Run correlation analysis (results to review queue) | Apply correlation results directly |
| Update operational context files | Modify authority, escalation, or decision records |

---

## Revision History

| Date | Change | Author |
|------|--------|--------|
| 2026-05-14 | Initial authority model created | Control Plane Bootstrap |
