# Decision Ledger

> Lightweight decision records. Separate from ADRs (those live in Atrium).
> Do not relitigate settled decisions. Add new ones as they emerge.

---

## DEC-2026-05-05-001 — Use Cosmos for AEGIS operational persistence
**Status:** Accepted
**Applies to:** AEGIS
**Decision:** All mutable operational state (work items, decisions, lifecycle, snapshots, test pipeline) persists to Azure Cosmos DB via DualWriteStore, with file-based fallback.
**Rationale:** Pod restarts on Container Apps lose all in-memory and ephemeral disk state. Cosmos provides durable, queryable persistence without managing a separate database server.
**Consequences:** 2 MB document size limit applies. Provider snapshots with large finding arrays need chunking strategy. Store protocol + factory pattern enables future backend swap.
**Do not relitigate unless:** Cosmos costs exceed $50/month or latency exceeds 200ms p95 for reads.
**Links:** Phase 0 completion notes, `backend/app/store/`

## DEC-2026-04-01-001 — Veracode is migration-era evidence, not SoR
**Status:** Accepted
**Applies to:** AEGIS
**Decision:** Source of Record precedence: GHAS (present) > AGHAS > Veracode (supporting evidence only). Closures must originate from SoR. Veracode closures inform reconciliation but do not constitute durable closure authority.
**Rationale:** Veracode is being phased out. Treating it as authoritative creates false closure chains that break when Veracode is decommissioned.
**Consequences:** If Veracode says closed but GHAS/AGHAS says open → reconciliation case, not reopen. Historical Veracode data preserved for correlation but not for governance.
**Do not relitigate unless:** Veracode decommission is cancelled or reversed.
**Links:** lifecycle-contracts.md (Contract #2)

## DEC-2026-04-01-002 — a74-* repo keys are transitional, not durable identity
**Status:** Accepted
**Applies to:** AEGIS
**Decision:** a74-* hashed repo keys from Active74 registry are correlation crutches. Service entity is the real identity anchor. a74-* must not be persisted as canonical identity.
**Rationale:** a74-* keys don't match any human-readable identifier. They create a parallel identity space that breaks when the registry changes. Service entity with structured aliases is the target model.
**Consequences:** Interim alias translation in reports.py bridges the gap. Cannot remove until canonical identity model (service entity + repo aliases) is stable.
**Do not relitigate unless:** Active74 registry is retired or replaced with canonical service registry.
**Links:** identity-translation.md, PR #55

## DEC-2026-04-08-001 — Registry killed from matrix; findings drive coverage
**Status:** Accepted
**Applies to:** AEGIS
**Decision:** Matrix rows built from observed repos (findings), NOT Active74 registry. Registry is enrichment only. Coverage gaps report partial coverage only.
**Rationale:** Registry had phantom entries (non-existent projects, Veracode-derived names). Building the matrix from actual findings ensures truth. "74" removed from all user-facing surfaces.
**Consequences:** Coverage reporting is honest but incomplete — only shows repos that have at least one finding from any scanner. "Never scanned" repos are invisible unless explicitly surfaced via coverage gap analysis.
**Do not relitigate unless:** A canonical service registry replaces Active74.

## DEC-2026-03-19-001 — 3-object separation is inviolable
**Status:** Accepted (Constitutional)
**Applies to:** AEGIS
**Decision:** Signal (immutable event) → OrchestrationDecision (what AEGIS concluded) → WorkflowAction (what system did/queued). These three must NEVER be collapsed into one object.
**Rationale:** Collapsing signal+decision+action makes audit impossible, breaks replay, and conflates "what happened" with "what we think" with "what we did."
**Consequences:** Every code change must be checked against this. UI must render all three separately. Backend must store all three with independent lifecycles.
**Do not relitigate unless:** Never.
**Links:** CLAUDE.md (Architecture Rules), lifecycle-contracts.md

## DEC-2026-04-17-001 — AEGIS/AMME repo ownership model
**Status:** Accepted
**Applies to:** AEGIS, AMME
**Decision:** aegis-ui = UI + BFF + reports. aegis-agent = AMME brain + orchestration + lifecycle + adapters + background jobs. aegis-infra = RGs + identity + data plane + networking. aegis-devkit = CI/CD + SBOM + test harness. NO new repos (aegis-worker goes inside aegis-agent).
**Rationale:** ChatGPT + audit confirmed this split. AMME is mature (~68K LOC) — harden+connect, NOT redesign.
**Consequences:** Worker service must be deployed as part of aegis-agent. Provider orchestration background jobs live in agent, not UI.
**Do not relitigate unless:** Agent service count exceeds container scaling limits.
**Links:** MODERNIZATION-REVIEW-2026-04-17.md

## DEC-2026-05-13-001 — Phase Alignment Coach is a sequencing tutor, not a blocker
**Status:** Accepted
**Applies to:** All agents
**Decision:** The Phase Alignment Coach teaches phase-aware exposure: what belongs in active lane, risk register, decision ledger, parking lot, appendix, roadmap, or stakeholder briefing. It does NOT suppress detail or block work.
**Rationale:** Blocking detail loses context. Routing detail to the right surface preserves it while keeping execution focused.
**Consequences:** Coach must output a Phase Exposure Review with default placement, escalation signal, recommended level (L0-L5), and action.
**Do not relitigate unless:** Never.

## DEC-2026-05-13-002 — Control plane named "Agentic Work Control Plane"
**Status:** Accepted
**Applies to:** All
**Decision:** The agent workflow control plane is titled "Agentic Work Control Plane." Not a product, not a framework pitch — a working architecture that evolved from operational pain (context collapse, compaction loss, cross-agent drift, stale assumptions, implementation outrunning governance).
**Rationale:** Broad enough to include humans, AI agents, workflows, and governance. Avoids sounding like a startup pitch deck from NebulaForgeAIOpsX. Accurately describes what it is: a control plane for agentic work.
**Consequences:** All documentation, briefings, and external discussions use this name. MS AI discussion framed as "working architecture" not "polished framework product."
**Do not relitigate unless:** Never.

## DEC-2026-05-13-003 — "Promotion" reserved for platform maturity, not CI/CD
**Status:** Accepted
**Applies to:** All agents
**Decision:** "Promotion Agent" = Internal Tools LZ lifecycle (experimental → incubating → governed pilot → supported → permanent). CI/CD branch/deploy = "Release Steward." Do not conflate.
**Rationale:** Semantic precision prevents agent confusion. Promoting a tool to production status is fundamentally different from promoting code to a branch.
**Do not relitigate unless:** Never.

## DEC-2026-05-14-001 — No Meta-Agent / Super Orchestrator
**Status:** Accepted (Constitutional)
**Applies to:** All systems, all agents
**Decision:** There will be NO single "meta-agent" or "super orchestrator" that routes all agents, reasons over all contexts, understands all products, governs all workflows, and resolves all contradictions. Cognition remains distributed. Authority remains bounded. Domains remain explicit. Truth remains scoped.
**Rationale:** The moment everything routes through one super orchestrator, entropy wins. Distributed cognition with explicit contradiction surfaces is safer than centralized resolution with implicit authority. This is the precise boundary between "bounded operational cognition platform" and "dangerous mega-agent."
**Consequences:** Product agents route within their domain. Cross-domain work requires explicit handoff, not universal routing. Contradictions are surfaced, not auto-resolved by a central brain. No single agent may read all product contexts simultaneously for decision-making.
**Do not relitigate unless:** Never.

## DEC-2026-05-14-002 — Trust tiers are operational, not decorative
**Status:** Accepted
**Applies to:** AEGIS, all agents
**Decision:** All data inputs carry a trust tier (T1-T6). Agents must not auto-act on T4 (Conditional) or below. AI-generated content always starts at T5. Inheritance drops trust by at least one tier. Cross-domain trust is the minimum of inputs.
**Rationale:** The system increasingly reasons across live data, cached snapshots, inferred relationships, inherited rationale, and AI synthesis. Without trust tiering, everything looks equally authoritative. That produces governance hallucination.
**Consequences:** Truth labeling now includes trust tier. Authority model preconditions reference trust tiers. Evidence graph edge confidence derives from source trust tiers.
**Do not relitigate unless:** Trust tier overhead demonstrably exceeds operational benefit (unlikely).

## DEC-2026-05-14-003 — Agentic Work Control Plane gets its own repo
**Status:** Accepted
**Applies to:** All
**Decision:** The Agentic Work Control Plane governance primitives, agent templates, distribution packages, and sync tooling live in a dedicated repo (`agentic-control-plane`), not scattered across consuming repos. Consuming repos receive synced copies via `scripts/sync-to-repos.sh`.
**Rationale:** Governance docs were evolving inside aegis-ui's `.context/shared/` and getting copied manually. A canonical source prevents drift, enables version-tagged releases, and makes the control plane portable across all 12+ consuming repos.
**Consequences:** All governance doc edits happen in `agentic-control-plane` first. Consuming repos pin versions. Product-specific context (`.context/products/`) stays local to each repo. Sync script handles distribution.
**Do not relitigate unless:** The control plane is abandoned or merged into a broader platform repo.

## DEC-2026-05-14-004 — USR split into governance-core and platform repos
**Status:** Accepted
**Applies to:** USR, AEGIS, all consuming agents
**Decision:** `unified-security-review` is split into two repos: `usr-governance-core` (immutable rulebook — controls, schemas, invariants, resolver) and `usr-platform` (John's workspace — database, API, UI, IaC, orchestration). Original repo archived. Both repos live in `lighthouse-infosec` org.
**Rationale:** Governance rules must be immutable and boring. Platform code changes frequently. Mixing them in one repo creates merge conflicts, accidental governance drift, and AI assistants that "helpfully" rewrite controls. The split enforces the boundary structurally.
**Consequences:** Sync script targets both repos. USR placeholder agent updated. Governance-core has 39 machine-readable invariants (invariants.yaml) including AI-007 which prohibits AI from altering governance artifacts. Platform code must consume governance-core schemas, never redefine them.
**Do not relitigate unless:** The repos are merged back together (unlikely — the split exists to prevent exactly the problems merging would reintroduce).
