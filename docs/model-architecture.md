# Formula-Network Intelligence Architecture

**Version:** 0.2  
**Status:** Proposed research architecture; not yet a demonstrated integrated system.

This is the reference source for the Model Architecture screen in the Frezanz website. The screen visualizes the proposed architecture and links explanations to these sections. The map is a conceptual design map, not live telemetry from an implemented model.

## Architectural overview

The architecture has seven functionally distinct but integrated layers. A shared execution runtime coordinates their operation. Layers may interact in different orders; the numbered order is an organizational guide, not a mandatory pipeline.

## Layer 1 — Universal Computational Environment {#layer-1}

The foundational computational space in which representations and structures can exist, be created, composed, transformed, executed and observed. It supports standardized primitives—characters, numbers, units, values, symbols, types, shapes, objects, relations, time and multimodal data—while remaining open to new representations. It supports transformations, geometry, graphs, dynamic interfaces, animation, simulations and domain-specific representations. It is not a closed inventory of predefined symbols.

### Representations {#representations}

Standard and extensible structures used across the architecture: symbols, quantities, objects, graphs, geometry, types, multimodal data and dynamic states. Representations are manipulable structures, not merely descriptions.

## Layer 2 — Formulae Layer {#layer-2}

Reusable executable units that give the environment functional capabilities. Formulae have explicit inputs and outputs, schemas, preconditions, dependencies, activation rules, versions, resource requirements, error behavior and provenance where applicable. They can be composed into sequential, branching or parallel paths. The runtime activates relevant formulae rather than executing the whole library for every task.

### Formula contracts {#formula-contracts}

Each formula has a stable identity and an execution contract covering inputs, outputs, types, units, preconditions, postconditions, dependencies, resource needs, permissions and known failure modes. Contracts enable discovery, routing, validation and controlled reuse.

## Layer 3 — Intelligence Layer {#layer-3}

Reasoning, inference, hypothesis generation, planning, comparison, constraint-based problem solving and revision of unsuccessful approaches. It can construct hypothetical, counterfactual and future situations, simulate possible consequences, compare alternatives, and produce candidate solutions. The reasoning process is not required to follow one fixed sequence.

## Layer 4 — Knowledge Layer {#layer-4}

Persistent, structured knowledge including established facts, partial definitions, unknowns, hypotheses, observations and derived conclusions. Knowledge records should preserve provenance, time, uncertainty, conflicting claims and revision history. Candidate conclusions must not be silently treated as established facts.

### Knowledge lifecycle {#knowledge-lifecycle}

Knowledge can be acquired, represented, connected, retrieved, evaluated, revised, qualified, superseded or invalidated. Missing evidence must not automatically be treated as evidence of absence. Knowledge status and provenance remain explicit.

## Layer 5 — Creativity & Emotion Layer {#layer-5}

Creative generation, recombination, analogy, alternative representations, unconventional exploration and iterative refinement. Emotion-inspired functional mechanisms may include urgency, caution, curiosity, sensitivity, persistence, engagement and frustration-like feedback. These variables can influence attention, exploration and behavior; their existence does not by itself imply subjective human-like feelings.

## Layer 6 — Concentration & Self-Maintenance {#layer-6}

The supervisory maintenance process, historically named the Concentration Engine. It inspects execution traces, repeated failures, redundant computation, context quality, formula reliability and resource use. It can propose changes, test them against explicit criteria, accept or reject them, and preserve provenance and rollback paths. Improvement must be measured rather than assumed.

### Maintenance loop {#maintenance-loop}

Inspect traces and metrics; identify a potential issue; propose a bounded change; test it against benchmarks or relevant cases; compare with prior behavior; accept, reject or revise; preserve history and recovery options.

## Layer 7 — Output & Interaction {#layer-7}

The live, human-observable and interactive manifestation of the running system. It should expose selected actual structures, execution paths, state changes, hypotheses, results, uncertainty and errors. It supports extensible 2D/3D visualizations and direct interaction. User actions that are intended to change computation must be transmitted to the running system. Displayed events should correspond to actual execution records; the interface must distinguish recorded activity from inferred or illustrative views.

## Shared Execution Runtime {#shared-runtime}

Cross-cutting infrastructure for scheduling, typed data flow, dependency and event tracking, persistence, budgets, concurrency, cycle handling, error recovery, trace recording, external tool integration and live event delivery to the interface. It coordinates the layers but is not an additional numbered layer.

## Connection types

- **Foundation:** one component provides the representational space or primitives another component uses.
- **Execution:** executable work is registered, scheduled, or performed.
- **Information:** knowledge, results, or context become available to another component.
- **Control:** one component influences a process, policy, or proposed change.
- **Feedback:** results feed back into evaluation, revision, or subsequent processing.
- **Observation:** actual state or recorded execution is exposed for inspection.
- **Interaction:** user actions and controls connect to the underlying system.
- **External I/O:** information and authorized actions flow between the architecture and external tools or environments.

## Integrated operation

The system is event-driven and persistent. A user action, observation, formula result or internal condition can trigger relevant processes. A result can update representations, knowledge or state, activate dependent formulae, or be shown in Layer 7. Not every task uses every layer. The runtime records relevant events and coordinates execution.

## Important status distinction

The architecture and its connections are proposed design elements. The 3D map is a navigable explanatory visualization, not a claim that a real model brain or its live internal computations already exist in this repository. Live model telemetry would require an implemented runtime and an event/state interface.
