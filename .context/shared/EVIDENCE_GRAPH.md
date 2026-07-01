# Evidence Graph

> The formal reasoning substrate for AEGIS security cognition. Not a generic knowledge graph. A bounded, typed, auditable graph of security evidence relationships.

## 1. What Is the Evidence Graph

The evidence graph models how security evidence nodes -- findings, scanners, repos, services, dispositions, mitigations -- relate to each other through typed, directional relationships. It is the structure AEGIS reasons over when correlating findings, inheriting dispositions, calculating blast radius, and explaining audit trails.

This is NOT a generic knowledge graph. It does not attempt to connect "everything to everything." It is a bounded ontology with explicit node types, explicit edge types, and explicit domain boundaries. Every relationship is typed, directional, and carries provenance (who created it, when, from what evidence).

The graph enforces the 3-object separation that governs all AEGIS reasoning:

```
Signal (immutable event) → OrchestrationDecision (what AEGIS concluded) → WorkflowAction (what system did/queued)
```

Signals are never mutated. Decisions reference signals but are separate objects. Actions reference decisions but are separate objects. The graph encodes these separations as distinct node types with directional edges.

## 2. Node Types

### Finding

Normalized scanner output. The atomic unit of security evidence.

| Field | Type | Purpose |
|-------|------|---------|
| `finding_id` | string (globally unique) | Canonical identifier across all providers |
| `cwe_id` | string (nullable) | CWE classification -- 60% of GHAS/AGHAS have none |
| `rule_id` | string | Scanner-native rule identifier |
| `file_path` | string | Source file where issue was detected |
| `line_number` | int (nullable) | Line number in source file |
| `severity` | enum | critical / high / medium / low / info |
| `scanner` | string | Provider that produced this finding |
| `repo_key` | string | Repository where finding was detected |
| `service_id` | string (nullable) | Canonical service entity (when resolved) |
| `identity_source` | enum | repo_native / registry_derived / unresolved |
| `source_url` | string (nullable) | Deep link to provider-native finding |
| `first_seen_at` | ISO 8601 | When AEGIS first ingested this finding |
| `last_seen_at` | ISO 8601 | Most recent provider observation |

### Scanner

Provider identity with coverage scope.

| Field | Type | Purpose |
|-------|------|---------|
| `scanner_id` | string | Provider identifier (ghas, aghas, veracode, semgrep) |
| `coverage_scope` | list[string] | Orgs, projects, or repo sets this scanner covers |
| `last_scan_at` | ISO 8601 | Most recent successful scan completion |
| `endpoint_url` | string | API endpoint used (critical for AGHAS: `advsec.dev.azure.com`) |

### Repository

Code repository with organizational context.

| Field | Type | Purpose |
|-------|------|---------|
| `repo_key` | string | Unique identifier (org/repo or project/repo) |
| `org` | string | GitHub org or AzDO project |
| `provider` | enum | github / azdo |
| `is_monorepo` | bool | Whether repo contains multiple services |
| `repo_display` | string | Human-readable name (replaces a74-* identifiers) |

### Service

Canonical service entity. The identity anchor everything else hangs on.

| Field | Type | Purpose |
|-------|------|---------|
| `service_id` | string | Canonical service identifier |
| `service_name` | string | Human-readable name |
| `owner` | string | Owning team or individual |
| `repo_mappings` | list[ServiceRepoMapping] | Repos that constitute this service |
| `scanner_mappings` | list[ServiceScannerMapping] | Scanners configured for this service |
| `identity_source` | enum | direct_repo / direct_scanner / registry_inferred / unresolved |

### MonorepoLineage

Parent/child repo relationships and path mappings. Critical for cases like `prism_prime` containing `prism_services_aks` as a subdirectory -- without this, 87 matches were invisible.

| Field | Type | Purpose |
|-------|------|---------|
| `parent_repo` | string | Top-level monorepo key |
| `child_path` | string | Subdirectory path within parent |
| `child_service_id` | string | Service entity mapped to this path |
| `detection_method` | enum | declared / inferred_from_scan / manual |

### Disposition

Finding-level status. What has been decided about a specific finding.

| Field | Type | Purpose |
|-------|------|---------|
| `disposition_id` | string | Unique identifier |
| `finding_id` | string | Finding this disposition applies to |
| `status` | enum | open / mitigated / false_positive / accepted_risk / resolved / verified_closed |
| `set_by` | string | Who/what set this disposition |
| `set_at` | ISO 8601 | When disposition was set |
| `rationale_id` | string (nullable) | Link to MitigationRationale |

### MitigationRationale

The WHY behind a disposition. Without this, "closed" is audit poison.

| Field | Type | Purpose |
|-------|------|---------|
| `rationale_id` | string | Unique identifier |
| `reasoning` | string | Human-readable explanation |
| `evidence_refs` | list[string] | Links to supporting evidence |
| `policy_basis` | string (nullable) | Policy or control that justifies this disposition |
| `inherited_from` | string (nullable) | Parent rationale ID (for lineage chains) |
| `confidence` | enum | high / medium / low |

### GovernancePosture

Derived security posture from control mappings. Computed, not declared.

| Field | Type | Purpose |
|-------|------|---------|
| `service_id` | string | Service this posture describes |
| `posture_score` | float | Composite posture score |
| `control_coverage` | dict | Per-control coverage state |
| `computed_at` | ISO 8601 | When posture was last computed |
| `data_sources` | list[string] | What data fed this computation |

### ReviewDecision

Human or governed review output. The ValidationRecord that enforces the lifecycle rule: `executed -> proposed_disposition -> validation_pending -> validated -> finalized`.

| Field | Type | Purpose |
|-------|------|---------|
| `decision_id` | string | Unique identifier |
| `reviewer` | string | Who reviewed (human UPN or system identity) |
| `decision` | enum | approved / denied / info_requested |
| `scope` | list[string] | IDs of items this decision covers |
| `governed_link_ids` | list[string] | Items linked by governance cascade |
| `decided_at` | ISO 8601 | When decision was made |
| `rationale` | string | Why this decision was made |

### WorkflowAction

What the system did or queued in response to a decision. The terminal node in the 3-object chain.

| Field | Type | Purpose |
|-------|------|---------|
| `action_id` | string | Unique identifier |
| `action_type` | enum | create_ticket / close_finding / escalate / notify / archive |
| `status` | enum | queued / in_progress / completed / failed |
| `target_id` | string | What this action operates on |
| `triggered_by` | string | Decision or orchestration that triggered this |
| `executed_at` | ISO 8601 (nullable) | When action completed |

### OrchestrationDecision

What AEGIS concluded. The reasoning layer between immutable signals and executable actions.

| Field | Type | Purpose |
|-------|------|---------|
| `orchestration_id` | string | Unique identifier |
| `input_signals` | list[string] | Finding IDs and signal IDs that were analyzed |
| `conclusion` | string | What AEGIS determined |
| `confidence` | enum | high / medium / low |
| `rule_basis` | string | Which orchestration rule produced this |
| `produced_actions` | list[string] | WorkflowAction IDs this decision generated |
| `decided_at` | ISO 8601 | When orchestration ran |

### IssueCluster

Grouped findings representing one logical vulnerability. The primary operational reasoning unit, anchored to a Service or Application.

| Field | Type | Purpose |
|-------|------|---------|
| `cluster_id` | string | Unique identifier |
| `service_id` | string | Service this cluster belongs to |
| `findings` | list[string] | Finding IDs grouped into this cluster |
| `match_basis` | string | Why these findings were grouped (composite key description) |
| `cluster_severity` | enum | Derived from highest-severity member |
| `status` | enum | open / under_review / resolved |

## 3. Edge Types (Relationships)

Every edge is typed, directional, and carries a `created_at` timestamp for freshness tracking.

```
Finding ──DETECTED_BY──────→ Scanner
Finding ──FOUND_IN─────────→ Repository
Finding ──BELONGS_TO───────→ Service
Finding ──GROUPED_INTO─────→ IssueCluster
Finding ──HAS_DISPOSITION──→ Disposition
Finding ──ANALYZED_BY──────→ OrchestrationDecision

Disposition ──JUSTIFIED_BY──→ MitigationRationale

MitigationRationale ──INHERITS_FROM──→ MitigationRationale   (lineage chain!)

Repository ──PART_OF──→ MonorepoLineage
Repository ──HOSTS────→ Service

Service ──HAS_POSTURE──→ GovernancePosture

IssueCluster ──REVIEWED_BY──→ ReviewDecision

ReviewDecision ──TRIGGERED──→ WorkflowAction

OrchestrationDecision ──PRODUCED──→ WorkflowAction
```

### Edge Semantics

| Edge | Cardinality | Meaning |
|------|-------------|---------|
| `DETECTED_BY` | Finding:Scanner = N:1 | Which scanner produced this finding |
| `FOUND_IN` | Finding:Repository = N:1 | Which repo contains the vulnerable code |
| `BELONGS_TO` | Finding:Service = N:1 | Which service owns this finding (identity anchor) |
| `GROUPED_INTO` | Finding:IssueCluster = N:1 | Logical grouping for operational triage |
| `HAS_DISPOSITION` | Finding:Disposition = 1:N | Disposition history (latest is current) |
| `JUSTIFIED_BY` | Disposition:MitigationRationale = N:1 | Why this disposition was set |
| `INHERITS_FROM` | MitigationRationale:MitigationRationale = N:1 | Lineage chain for inherited reasoning |
| `PART_OF` | Repository:MonorepoLineage = N:1 | Monorepo membership |
| `HOSTS` | Repository:Service = N:M | Repos that constitute a service |
| `HAS_POSTURE` | Service:GovernancePosture = 1:1 | Computed security posture |
| `REVIEWED_BY` | IssueCluster:ReviewDecision = 1:N | Review history |
| `TRIGGERED` | ReviewDecision:WorkflowAction = 1:N | Actions spawned by review |
| `ANALYZED_BY` | Finding:OrchestrationDecision = N:1 | AEGIS reasoning output |
| `PRODUCED` | OrchestrationDecision:WorkflowAction = 1:N | Actions spawned by orchestration |

## 4. Bounded Ontology Domains

The evidence graph does NOT own everything. Ontology collapse -- where one graph tries to model all domains -- produces impossible audits and meaningless relationships. Domain boundaries are explicit.

| Domain | System | Owns | Evidence Graph Role |
|--------|--------|------|-------------------|
| Governance ontology | Atrium (ADR Builder) | Controls, frameworks, capabilities, intents, signal mappings | **Consumer** -- reads posture, does NOT define it |
| Operational security ontology | AEGIS | Findings, correlation, disposition, orchestration, workflow | **Owner** -- this IS the evidence graph |
| Agent/task ontology | AMME | Reasoning, memory, orchestration tasks, autonomous actions | **Consumer** -- uses graph for reasoning inputs |
| Lifecycle/maturity ontology | Internal Tools LZ | Maturity models, lifecycle stages, readiness assessments | **Not connected** |
| Review/control ontology | USR | Methodology, evidence evaluation, review provenance | **Peer** -- review decisions feed into graph |

### Cross-Domain Relationship Rules

1. Cross-domain edges are **explicit and typed** -- never implicit.
2. Cross-domain edges are **minimal** -- only what is needed for operational reasoning.
3. Cross-domain edges carry **source_system** and **contract_version** metadata.
4. AEGIS never writes INTO another domain's graph. It reads and references.
5. Other systems never write directly into the evidence graph. They publish signals that AEGIS ingests.

## 5. Identity Resolution Chain

The critical insight: stable identity enables inherited reasoning. Without resolved identity, lineage breaks, inheritance breaks, blast-radius analysis breaks, and coverage calculations are meaningless.

### Resolution Precedence

```
1. Service entity          (canonical, from Atrium or manual mapping)
   ↓ fallback
2. Repository              (directly observed from scanner output)
   ↓ fallback
3. Monorepo path           (when repo contains multiple services)
   ↓ fallback
4. Scanner-native ID       (Veracode app GUID, GHAS repo slug)
   ↓ fallback
5. Registry-derived alias  (a74-* keys -- transitional, NOT durable)
```

### Identity Source Tracking

Every finding carries `identity_source` to make resolution transparency explicit:

| Source | Meaning | Durability |
|--------|---------|------------|
| `repo_native` | Identity resolved from scanner-reported repo | Durable |
| `direct_repo` | Service mapped directly from repo key | Durable |
| `direct_scanner` | Service mapped from scanner configuration | Durable |
| `registry_inferred` | Service inferred from registry lookup | Semi-durable |
| `alias_translated` | Identity resolved via a74-* alias translation | Transitional |
| `unresolved` | No identity resolution succeeded | Must be resolved |

### Why a74-* Is Not Durable

The `a74-*` keys are Veracode-derived identifiers from the Active74 registry. They exist in a different identity space from service entities and human-readable repo names. The interim alias translation layer (PR #55) recovers 1,743 findings, but 100% are alias-derived. This is a platform-level identity model gap, not a permanent solution.

## 6. Inheritance Rules

When can a disposition on Finding A be inherited by Finding B?

### Disposition Inheritance Tiers

| Tier | Match Criteria | Confidence | Action | Human Review Required |
|------|---------------|------------|--------|-----------------------|
| **T1** | Same CWE + same file + same lineage (monorepo-aware) | High | Candidate auto-close | No (but auditable) |
| **T2** | Same CWE + same code pattern + same service family | Medium | Review with inherited rationale | Yes -- review, not re-investigate |
| **T3** | Same CWE + different repo or service | Low | No inheritance | Yes -- independent review |

### Inheritance Constraints

1. Inheritance **NEVER** crosses service boundaries without explicit human review.
2. Inherited dispositions carry `inherited_from` provenance -- always traceable.
3. A false positive inheritance is limited to the **same lineage chain**. One bad FP call must NOT propagate to 13 sibling applications.
4. `accepted_risk` is NEVER inherited. Risk acceptance is scoped to the specific finding, service, and context where it was evaluated.
5. Inheritance requires that the source disposition has a `MitigationRationale` with confidence >= medium. Dispositions without rationale cannot be inherited.

### Composite Match Key

CWE alone is fundamentally insufficient for correlation -- 60% of GHAS/AGHAS alerts have no CWE. The composite evidence key for matching:

```
CWE + rule_id + file_path + repo + service + code_pattern
```

All available fields are evaluated. A match on CWE alone without corroborating evidence from other fields is classified as T3 (no inheritance).

## 7. Anti-Patterns

### Ontology Collapse
"Everything connects to everything." When a graph has no bounded domains, every query returns noise, every audit is impossible, and every relationship is meaningless. The evidence graph has 12 node types and 14 edge types. That is the boundary.

### CWE-Only Correlation
60% of GHAS/AGHAS alerts have no CWE. CWE-only correlation produces false matches and misses real matches. Always use the composite evidence key.

### Scanner-As-Identity
Scanners see different universes. Veracode dominates CWE-331/73/259; GHAS/AGHAS have zero findings for those CWEs. Using scanner output as the identity anchor means findings from different scanners can never be correlated. Service entity is the identity anchor.

### Disposition Without Rationale
"Closed" without WHY is audit poison. Every disposition must link to a `MitigationRationale` that explains the reasoning, evidence, and policy basis. A disposition without rationale is an incomplete record.

### Inherited False-Positive Contamination
One incorrect false-positive determination propagates through inheritance to 13 sibling applications. Mitigation: inheritance is scoped to lineage chains, never crosses service boundaries without review, and `accepted_risk` is never inherited.

### Stale Graph Edges
Relationships without freshness timestamps become lies over time. Every edge carries `created_at`. Edges older than their TTL (provider-specific) are flagged as stale. Stale edges are never used for inheritance or automated disposition.

### Convergence Bias
The absence of corroboration from a second scanner does NOT mean the absence of risk. Veracode finding CWE-331 with zero GHAS/AGHAS matches does not make the Veracode finding less valid. Scanners cover different vulnerability classes. Lack of overlap is structural, not evidence of false positive.

### No-Findings-Equals-Clean
"No findings" can mean: not scanned, scanner error, wrong endpoint, auth blocked, or actually clean. The evidence graph must distinguish these states. A repository with no findings and no scanner coverage is `unknown`, not `clean`.

## 8. Future State

### Graph Storage
SurrealDB (per ADR decision, replacing Neo4j + JSON graph). The evidence graph will be natively stored as typed documents and relations in SurrealDB, with relational/blob/event stores remaining separate.

### AEGIS Reasoning Capabilities

| Capability | Graph Usage |
|------------|-------------|
| **Correlation** | Traverse Finding -> Service -> Finding to find cross-scanner matches |
| **Inheritance** | Walk MitigationRationale -> INHERITS_FROM chains to propagate dispositions |
| **Blast radius** | From a Service, traverse HOSTS -> FOUND_IN -> Finding to enumerate exposure |
| **Coverage analysis** | From Service, check which Scanners have DETECTED_BY edges to its Findings |
| **Audit explanation** | From any Disposition, walk JUSTIFIED_BY -> INHERITS_FROM to full evidence chain |
| **Review acceleration** | Inherited rationale reduces human review burden -- reviewer sees prior reasoning |
| **Zombie detection** | Findings with stale `last_seen_at` and no recent DETECTED_BY edges are zombie candidates |

### Audit Trail Guarantee

Any disposition in the system can be traced back through the full evidence chain:

```
Disposition
  └─ JUSTIFIED_BY → MitigationRationale
       ├─ reasoning (human-readable)
       ├─ evidence_refs (links to source data)
       ├─ policy_basis (control or policy reference)
       └─ INHERITS_FROM → parent MitigationRationale
            └─ (chain continues to root rationale)
```

This chain is the basis for compliance reporting, audit response, and postmortem analysis.
