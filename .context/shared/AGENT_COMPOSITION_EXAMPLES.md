# Agent Composition Examples

> Product agents route. Role agents perform. Ops agents move code safely.
> Agents do NOT act as giant do-everything blobs.

## Composition Pattern

```
Product Agent (knows the domain)
  └── calls Role Agent (knows how to perform the task)
        └── may invoke Ops Agent (knows how to ship safely)
```

## Real Examples

### "Should we implement provider orchestration now?"
```
AEGIS/AMME Agent
  └── Phase Alignment Coach
        → Checks active lane
        → Classifies: Active Lane (L3 — directly on critical path)
        → Output: "Yes, this is the active lane. Proceed with Implementer."
```

### "Implement provider orchestration Step 2"
```
AEGIS/AMME Agent
  └── Implementer
        → Reads plan (magical-sleeping-dewdrop.md)
        → Reads LANDMINES.md (LM-039: Cosmos 2MB, LM-037: timeout)
        → Writes provider_orchestration.py
        → Hands off to Validation Reviewer
  └── Validation Reviewer
        → Runs checklist (provider-orchestration-validation.md)
        → Verifies build, imports, invariants
```

### "Deploy the provider orchestration changes"
```
AEGIS/AMME Agent
  └── Release Steward
        → Creates PR
        → Monitors CI checks + Trivy scan
        → Verifies deploy pipeline
        → Confirms health check (GET /health → 200)
        → Runs smoke test (GET /aggregate → data)
        → Produces deployment handoff
```

### "Write a briefing about the Veracode correlation findings for Rob"
```
AEGIS/AMME Agent
  └── Team Briefing Builder
        → Reads correlation reports + decision brief
        → Applies Truth Labeling Standard
        → Produces executive-appropriate summary
        → Runs team-briefing-readiness checklist
```

### "Is Hermes Agent ready for the team?"
```
Internal Tools LZ Agent
  └── Internal Tools Promotion Agent
        → Checks current stage (experimental)
        → Evaluates against incubating → pilot criteria
        → Output: "Not ready. Missing: architecture review, CI/CD pipeline, cost estimate."
```

### "Make this ADR Atrium-compatible"
```
Atrium Agent
  └── ADR Conformance Reviewer
        → Checks 5-section MADR format
        → Validates framework mappings
        → Confirms no contradiction with existing ADRs
```

### "Summarize this session for next time"
```
AEGIS/AMME Agent
  └── Continuation Builder
        → Produces handoff packet
        → Updates current-state.md, active-lane.md, continuation.md
        → Adds any new decisions to DECISION_LEDGER.md
        → Adds any new landmines to docs/LANDMINES.md
```

### "I found a weird AGHAS behavior — where does this go?"
```
AEGIS/AMME Agent
  └── Phase Alignment Coach
        → Classifies: Landmine (L2 — register, not blocking current work)
        → But checks escalation: "Does this affect active lane?"
        → If yes (e.g., touches provider adapter): escalate to L4
        → Output: "Add to docs/LANDMINES.md. Also add to provider-orchestration-validation checklist."
```

## Anti-Pattern: The Do-Everything Blob

```
# WRONG — agent tries to do everything
AEGIS/AMME Agent
  → Plans the architecture
  → Writes the code
  → Reviews its own code
  → Deploys it
  → Declares success
```

This is a raccoon inspecting its own trash can. Split the roles.
