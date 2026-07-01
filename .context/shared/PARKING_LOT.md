# Parking Lot

> Shiny objects that matter but aren't on the critical path. Everything here has a lifecycle.
> Items must eventually: promote to product context → backlog → implementation, or archive.

| # | Idea | Product | Why Interesting | Why Not Now | Revisit Trigger |
|---|------|---------|----------------|-------------|-----------------|
| PL-001 | SurrealDB replacing Neo4j for graph | AEGIS/AMME | Palantir Ontology patterns, better than JSON graph | Current identity model must stabilize first | When canonical service entity + repo aliases are complete |
| PL-002 | Threat modeling capability in AEGIS | AEGIS | User-requested (2026-04-03). Application-focused. | Provider orchestration and correlation are higher priority | After provider orchestration v1 ships |
| PL-003 | SBOM ingestion | AEGIS | Requires Service entity as prerequisite | Service identity model incomplete | After identity translation layer is canonical |
| PL-004 | Hermes Agent for architecture diagrams | Internal Tools LZ | Ashton uses it. NousResearch, 70+ tools, MCP support, persistent memory. Model-agnostic. | Not blocking current work. Tool scouting, not execution. | When VS Code/Copilot migration reaches diagram tooling |
| PL-005 | MCP server for AEGIS | AEGIS | Would let external agents query AEGIS state | Core APIs must stabilize first | After provider orchestration + correlation engine hardened |
| PL-006 | Obsidian knowledge base integration | All | Knowledge graph + note-taking + agent memory | Context engineering via .context/ files is simpler for now | If .context/ approach proves insufficient for multi-agent state |
| PL-007 | OpenCRE framework graph | Atrium / AEGIS | Highest priority framework addition per ChatGPT guidance | ADR Builder integration contract not yet wired | When ADR Builder ↔ AEGIS bridge is active |
| PL-008 | PIM integration via Vlad's pim_cli | AEGIS | Privileged access management for autonomous actions | AEGIS execution modes not yet enforced at runtime | When Stage 6 autonomous operations begins |
| PL-009 | Real-time SSE event streaming | AEGIS | Live review sessions, Pentest/RedTeam style | OperationalSession contract ready but frontend not wired | After core UX stabilizes |
| PL-010 | Aggregate snapshot persistence in Cosmos | AEGIS | Instant `/aggregate` reads without pipeline re-run | Provider snapshots (raw) must land first | After Provider Orchestration v1 proven in production soak |
| PL-011 | Background daemon for provider refresh | AEGIS | Automatic refresh on schedule instead of on-request | Need `AEGIS_PROVIDER_REFRESH_ENABLED` env var + testing | After Provider Orchestration v1 manual refresh proven |
| PL-012 | NIST AI RMF framework support | Atrium | AI governance gap in current framework set | Not blocking any current security work | When AI features are deployed to production |

| PL-013 | Canonical Entity Registry (service, repo, portfolio, scanner, workload, environment, alias, identity lineage) | AEGIS/AMME | Identity consistency IS security reasoning. Currently implied across markdown. Future: graph/ontology/registry/policy substrate. Becomes AMME memory layer. | Identity model must stabilize first. Provider Orchestration must land. | When a74-* alias layer is replaced with canonical identity model |
| PL-014 | Agent Telemetry / Reflection Logs (why agent chose escalation, why detail parked, why promotion denied, confidence drift, freshness degradation) | All | Prevents "why did the system decide this?" becoming archaeology | Control plane must stabilize first. No telemetry infra yet. | When agent composition is exercised across 3+ real sessions |
| PL-015 | Skill Registry (reusable skills portable across Claude/Copilot/Hermes/ChatGPT: team brief synthesis, ADR normalization, disposition inheritance, correlation triage, escalation assessment, freshness audit, truth labeling enforcement) | All | Makes skills portable across agent runtimes instead of locked to one tool | Need to prove composition model works first | When migrating to VS Code Insiders + Copilot as cockpit |
| PL-016 | Cross-Agent Invocation Contracts (allowed calls, forbidden calls, escalation rules, authority boundaries between agents) | All | Prevents recursive goblins summoning each other forever | Composition model needs real exercise first | When more than 2 agents are active in same session |
| PL-017 | "Why Now?" Metadata on active lanes (why active now, what's blocked, what's intentionally deferred, what would cause reprioritization) | All | Prevents historical context collapse during long-running programs | Active lane files exist but lack this metadata | Next active lane update |

## Archived (promoted or cancelled)

| # | Idea | Outcome | Date |
|---|------|---------|------|
| — | (none yet) | — | — |
