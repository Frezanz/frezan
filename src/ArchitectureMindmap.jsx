import React, { useMemo, useState } from "react";

const LAYERS = [
  { id: "environment", n: "01", name: "Universal Computational Environment", short: "ENVIRONMENT", group: "FOUNDATION", purpose: "The shared space where structures can be represented, constructed, transformed, executed, and observed.", inputs: "Primitives, construction requests, data, and state changes.", outputs: "Typed structures, transformed objects, and updated state.", nodes: [
    { id: "primitives", name: "Primitive types", desc: "Characters, values, numbers, units, symbols, types, shapes, time, and multimodal data.", input: "Raw values and type definitions", output: "Typed, composable primitives" },
    { id: "representations", name: "Representations", desc: "Objects, graphs, geometry, symbolic structures, and dynamic states.", input: "Primitives and constructors", output: "Structured, manipulable representations" },
    { id: "constructors", name: "Constructors", desc: "Rules for creating new structures without limiting the environment to a closed symbol inventory.", input: "Types, arguments, and constraints", output: "New valid structures" },
    { id: "transformations", name: "Transformations", desc: "Operations that change a representation while preserving declared constraints and semantics.", input: "Structures and transformation rules", output: "Transformed structures and change records" },
    { id: "simulation", name: "Geometry & simulation space", desc: "Spatial, temporal, graph, and dynamic environments for representing or testing a system.", input: "Models, parameters, and initial state", output: "Simulated states and observations" },
  ], relations: [["primitives","representations","typed values form structures","foundation"],["constructors","representations","constructs","data"],["representations","transformations","transforms","execution"],["transformations","simulation","updates model state","data"],["simulation","representations","returns observed state","feedback"]] },
  { id: "formulae", n: "02", name: "Formulae Layer", short: "FORMULAE", group: "EXECUTION", purpose: "Reusable executable units with explicit contracts, dependencies, activation rules, and known failure behavior.", inputs: "Structured inputs, execution requests, state, and dependency metadata.", outputs: "Computed results, transformations, events, and further activations.", nodes: [
    { id: "registry", name: "Formula registry", desc: "Discoverable catalogue of formula identities, versions, metadata, and permissions.", input: "Formula definitions and revisions", output: "Candidate formula definitions" },
    { id: "contracts", name: "Formula contracts", desc: "Input/output schemas, types, units, preconditions, postconditions, and resource needs.", input: "Formula specification", output: "Validation and execution contract" },
    { id: "activation", name: "Activation & routing", desc: "Selects relevant formulae from a request, context, and dependency requirements.", input: "Task, context, registry, constraints", output: "Selected execution plan" },
    { id: "composition", name: "Composition graph", desc: "Connects formulae into sequential, branching, parallel, or conditional paths.", input: "Formula contracts and dependencies", output: "Executable dependency graph" },
    { id: "results", name: "Results & error handling", desc: "Captures outputs, failures, provenance, and conditions for retries or recovery.", input: "Execution results and exceptions", output: "Typed result or traceable failure" },
  ], relations: [["registry","contracts","loads definition metadata","dependency"],["contracts","activation","validates candidates","control"],["activation","composition","routes selected formulae","control"],["composition","results","produces outputs","execution"],["results","activation","retry or follow-up trigger","feedback"]] },
  { id: "intelligence", n: "03", name: "Intelligence Layer", short: "INTELLIGENCE", group: "REASONING", purpose: "Reasoning, inference, hypothesis generation, planning, comparison, and revision without requiring one fixed sequence.", inputs: "Goals, context, knowledge, representations, and execution results.", outputs: "Hypotheses, plans, explanations, comparisons, and candidate solutions.", nodes: [
    { id: "goal-interpretation", name: "Goal interpretation", desc: "Clarifies the task, constraints, success criteria, and missing information.", input: "Request and surrounding context", output: "Goal representation and constraints" },
    { id: "context-retrieval", name: "Context retrieval", desc: "Requests relevant knowledge and working context with source and confidence information.", input: "Goal, entities, and query", output: "Relevant context and known gaps" },
    { id: "inference", name: "Inference & hypotheses", desc: "Builds candidate explanations, deductions, and alternative hypotheses.", input: "Premises, evidence, and context", output: "Candidate claims and rationale" },
    { id: "planning", name: "Planning & counterfactuals", desc: "Compares possible paths and estimates consequences under constraints.", input: "Goal, alternatives, constraints", output: "Candidate plans and predicted outcomes" },
    { id: "evaluation", name: "Evaluation & revision", desc: "Checks consistency and evidence, compares results to criteria, and revises unsuccessful approaches.", input: "Claims, plans, outcomes, and criteria", output: "Ranked candidates or revised reasoning" },
  ], relations: [["goal-interpretation","context-retrieval","requests relevant context","control"],["context-retrieval","inference","supplies evidence","data"],["inference","planning","provides candidate explanations","information"],["planning","evaluation","compares predicted outcomes","control"],["evaluation","inference","revises hypotheses","feedback"]] },
  { id: "knowledge", n: "04", name: "Knowledge Layer", short: "KNOWLEDGE", group: "KNOWLEDGE", purpose: "Persistent, structured information that distinguishes established facts, observations, hypotheses, unknowns, and conflicting claims.", inputs: "Observations, source material, derived results, and existing records.", outputs: "Retrievable context, evidence, uncertainty, and traceable knowledge updates.", nodes: [
    { id: "acquisition", name: "Acquisition & observations", desc: "Ingests new information while preserving when and where it was observed.", input: "External data, user input, and results", output: "Candidate records with source context" },
    { id: "entities", name: "Entities & relations", desc: "Represents concepts, entities, attributes, rules, events, and typed relationships.", input: "Candidate records and schemas", output: "Connected knowledge structures" },
    { id: "provenance", name: "Provenance & confidence", desc: "Tracks sources, timestamps, uncertainty, status, and competing claims.", input: "Claims and source metadata", output: "Qualified, traceable records" },
    { id: "retrieval", name: "Retrieval & context", desc: "Finds relevant records for reasoning, planning, and response generation.", input: "Queries, entities, and context", output: "Relevant records with provenance" },
    { id: "revision", name: "Revision & conflict handling", desc: "Qualifies, supersedes, reconciles, or invalidates records without silently erasing history.", input: "New evidence and conflicting claims", output: "Updated status and revision history" },
  ], relations: [["acquisition","entities","structures candidate records","data"],["entities","provenance","attaches source and status","information"],["provenance","retrieval","supports qualified retrieval","knowledge"],["retrieval","revision","surfaces conflicts and gaps","feedback"],["revision","entities","updates connected records","data"]] },
  { id: "creativity", n: "05", name: "Creativity & Emotion Layer", short: "CREATIVITY & EMOTION", group: "EXPLORATION", purpose: "Generates alternatives and influences exploration using functional motivation-inspired signals, without implying subjective human feelings.", inputs: "Goals, context, outcomes, uncertainty, and unresolved questions.", outputs: "Creative candidates, exploration priorities, and modulated behavior.", nodes: [
    { id: "novelty", name: "Curiosity & novelty", desc: "Scores unresolved questions, unfamiliar patterns, and opportunities for useful exploration.", input: "Knowledge gaps and novelty signals", output: "Exploration candidates" },
    { id: "analogy", name: "Analogy & recombination", desc: "Combines patterns or representations from different contexts to generate candidate ideas.", input: "Concepts, structures, and prior examples", output: "Analogies and novel combinations" },
    { id: "exploration-policy", name: "Exploration policy", desc: "Balances familiar approaches against alternatives according to goals and risk constraints.", input: "Candidates, priorities, and constraints", output: "Selected exploration path" },
    { id: "motivation-signals", name: "Motivation-inspired signals", desc: "Functional variables such as urgency, caution, persistence, engagement, or frustration-like feedback.", input: "Outcomes, risk, progress, and context", output: "Adjusted priority and persistence" },
    { id: "refinement", name: "Candidate refinement", desc: "Evaluates generated ideas and sends promising candidates for reasoning or testing.", input: "Creative candidates and evaluation criteria", output: "Refined candidates and feedback" },
  ], relations: [["novelty","analogy","selects patterns to explore","control"],["analogy","exploration-policy","proposes combinations","information"],["motivation-signals","exploration-policy","modulates priorities","control"],["exploration-policy","refinement","selects candidates","execution"],["refinement","novelty","updates exploration from outcomes","feedback"]] },
  { id: "maintenance", n: "06", name: "Concentration & Self-Maintenance", short: "SELF-MAINTENANCE", group: "SUPERVISION", purpose: "Inspects execution and proposes bounded, tested improvements with provenance and recovery paths.", inputs: "Execution traces, repeated failures, metrics, and resource profiles.", outputs: "Diagnostics, improvement proposals, and validated maintenance decisions.", nodes: [
    { id: "trace-collection", name: "Trace collection", desc: "Records execution events, formula paths, state transitions, and resource use.", input: "Runtime events and metrics", output: "Queryable execution traces" },
    { id: "anomaly-detection", name: "Anomaly & failure detection", desc: "Identifies repeated errors, regressions, redundancy, and resource anomalies.", input: "Traces, expected behavior, and thresholds", output: "Potential issues for diagnosis" },
    { id: "diagnosis", name: "Diagnosis & proposal", desc: "Finds likely causes and proposes a limited change with a clear expected benefit.", input: "Issue evidence and system context", output: "Testable improvement proposal" },
    { id: "benchmarking", name: "Tests & benchmarks", desc: "Compares proposed behavior with baseline examples and explicit acceptance criteria.", input: "Change candidate, baseline, and tests", output: "Measured comparison and decision" },
    { id: "rollback", name: "Versioning & rollback", desc: "Preserves approved revisions, provenance, and a way to restore earlier behavior.", input: "Validated changes and decision history", output: "Versioned state and recovery point" },
  ], relations: [["trace-collection","anomaly-detection","provides observations","observation"],["anomaly-detection","diagnosis","raises an issue","control"],["diagnosis","benchmarking","submits a proposed change","execution"],["benchmarking","rollback","records acceptance or rejection","control"],["rollback","trace-collection","monitors later behavior","feedback"]] },
  { id: "output", n: "07", name: "Output & Interaction", short: "OUTPUT & INTERACTION", group: "INTERFACE", purpose: "Makes system state, results, uncertainty, and supported actions observable and interactive.", inputs: "Results, representations, state changes, events, and user actions.", outputs: "Explanations, visualizations, interaction commands, and captured feedback.", nodes: [
    { id: "state-visualization", name: "State & structure visualization", desc: "Displays selected structures, relationships, process state, and execution evidence.", input: "Representations and trace events", output: "Inspectable views and maps" },
    { id: "response-generation", name: "Response generation", desc: "Formats explanations, results, caveats, and uncertainty for the user.", input: "Validated results and context", output: "Readable responses and summaries" },
    { id: "interaction-input", name: "Interaction input", desc: "Captures selections, edits, requests, and navigation actions.", input: "User gestures and commands", output: "Structured interaction events" },
    { id: "action-dispatch", name: "Action dispatch", desc: "Routes supported user actions to the appropriate system component.", input: "Validated commands and permissions", output: "Requests to runtime or tools" },
    { id: "feedback-capture", name: "Feedback capture", desc: "Records corrections and outcomes that may be evaluated for later improvement.", input: "User feedback and observed outcomes", output: "Reviewable feedback records" },
  ], relations: [["interaction-input","action-dispatch","routes user intent","control"],["action-dispatch","feedback-capture","captures action outcome","observation"],["feedback-capture","response-generation","informs subsequent response","feedback"],["response-generation","state-visualization","pairs explanation with view","information"],["state-visualization","interaction-input","enables direct inspection","interaction"]] },
];

const SYSTEM_RELATIONS = [
  ["environment","formulae","provides representations","foundation"],
  ["formulae","intelligence","executes selected operations","execution"],
  ["intelligence","knowledge","retrieves and updates context","knowledge"],
  ["knowledge","intelligence","supplies evidence","information"],
  ["creativity","intelligence","proposes alternatives","feedback"],
  ["intelligence","output","produces responses and views","data"],
  ["output","intelligence","passes user input","interaction"],
  ["runtime","formulae","schedules and tracks execution","execution"],
  ["runtime","intelligence","coordinates processing","control"],
  ["runtime","knowledge","coordinates persistence","control"],
  ["runtime","output","delivers events and state","information"],
  ["maintenance","runtime","proposes tested changes","feedback"],
  ["runtime","maintenance","provides traces and metrics","observation"],
  ["external","knowledge","returns external observations","data"],
  ["intelligence","external","requests authorized operations","external"],
];

const CROSS_CUTTING = { id: "runtime", n: "RT", name: "Shared Execution Runtime", short: "SHARED RUNTIME", group: "INFRASTRUCTURE", purpose: "Cross-cutting infrastructure for scheduling, typed data flow, dependencies, events, persistence, budgets, recovery, and observability." };
const EXTERNAL = { id: "external", n: "EXT", name: "External World & Tools", short: "EXTERNAL I/O", group: "INTEGRATION", purpose: "External sources, APIs, software tools, devices, and environments accessed through controlled interfaces." };
const TYPE_COLORS = { foundation: "#64e6f6", execution: "#5ab5ff", dependency: "#9d9cff", data: "#65e0c0", knowledge: "#78d8b8", information: "#7fcaee", control: "#c09bff", feedback: "#ffbd75", observation: "#9ab9c6", interaction: "#ff9fa9", external: "#f5d477" };

function Edge({ from, to, label, type, x1, y1, x2, y2, bend = 0 }) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + bend;
  return <g className="mindEdge"><path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none" stroke={TYPE_COLORS[type] || "#4d9bab"} strokeWidth="1.6" strokeOpacity=".78" markerEnd={`url(#arrow-${type || "data"})`} /><text x={mx} y={my - 5} textAnchor="middle" className="mindEdgeLabel">{label}</text></g>;
}

function Markers() { return <defs>{Object.entries(TYPE_COLORS).map(([id,color]) => <marker key={id} id={`arrow-${id}`} markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,3 L0,6 z" fill={color} /></marker>)}</defs>; }

export default function ArchitectureMindmap({ mode, onModeChange }) {
  const [layerId, setLayerId] = useState("intelligence");
  const [selectedNodeId, setSelectedNodeId] = useState("inference");
  const [showRelationLabels, setShowRelationLabels] = useState(true);
  const layer = LAYERS.find(item => item.id === layerId) || LAYERS[0];
  const internalNode = layer.nodes.find(item => item.id === selectedNodeId) || layer.nodes[0];
  const allLayerNodes = useMemo(() => LAYERS.flatMap(l => l.nodes.map(n => ({...n, layerId:l.id, layerName:l.name, group:l.group}))), []);
  const selectedInternal = allLayerNodes.find(n => n.id === selectedNodeId);
  const overviewNodes = [
    { ...LAYERS[0], x: 38, y: 68, w: 265, h: 126 },
    { ...LAYERS[1], x: 345, y: 68, w: 265, h: 126 },
    { ...LAYERS[2], x: 652, y: 68, w: 265, h: 126 },
    { ...LAYERS[3], x: 960, y: 254, w: 202, h: 126 },
    { ...LAYERS[4], x: 652, y: 476, w: 265, h: 126 },
    { ...LAYERS[5], x: 345, y: 476, w: 265, h: 126 },
    { ...LAYERS[6], x: 38, y: 476, w: 265, h: 126 },
  ];
  const systemNodes = [...overviewNodes, { ...CROSS_CUTTING, x: 365, y: 267, w: 250, h: 116 }, { ...EXTERNAL, x: 960, y: 68, w: 202, h: 126 }];
  const systemEdges = SYSTEM_RELATIONS;
  const centers = Object.fromEntries(systemNodes.map(n => [n.id, {x:n.x+n.w/2,y:n.y+n.h/2}]));
  const relationDetail = selectedInternal ? layer.relations.filter(r => r[0] === selectedInternal.id || r[1] === selectedInternal.id) : [];

  return <section className="architectureMindmap" aria-label="Architecture mind map">
    <div className="mindmapHeader"><div><span>ARCHITECTURE / EXPLORER</span><h2>{mode === "layer" ? "Layer-level relationships" : "Whole-system mind map"}</h2><p>{mode === "layer" ? "Select a layer, then inspect its internal nodes and typed relationships." : "Seven principal layers, the shared runtime, and external I/O—shown together."}</p></div><div className="mindmapMode" role="group" aria-label="Mind map display options"><button onClick={() => setShowRelationLabels(v => !v)}>{showRelationLabels ? "HIDE EDGE LABELS" : "SHOW EDGE LABELS"}</button></div></div>
    {mode === "system" ? <>
      <div className="mindmapLegend">{Object.entries(TYPE_COLORS).map(([id,color]) => <span key={id}><i style={{background:color}} />{id.toUpperCase()}</span>)}</div>
      <div className="mindmapCanvas"><svg viewBox="0 0 1200 660" role="img" aria-label="Whole architecture relationship map"><Markers />
        {systemEdges.map(([source,target,label,type,bend],i) => { const a=systemNodes.find(n=>n.id===source),b=systemNodes.find(n=>n.id===target); const ac=centers[source],bc=centers[target]; const dx=bc.x-ac.x,dy=bc.y-ac.y; const ta=Math.min((a.w/2-4)/Math.max(Math.abs(dx),1),(a.h/2-4)/Math.max(Math.abs(dy),1)); const tb=Math.min((b.w/2-4)/Math.max(Math.abs(dx),1),(b.h/2-4)/Math.max(Math.abs(dy),1)); return <Edge key={`${source}-${target}-${i}`} from={source} to={target} label={showRelationLabels?label:""} type={type} x1={ac.x+dx*ta} y1={ac.y+dy*ta} x2={bc.x-dx*tb} y2={bc.y-dy*tb} bend={bend} />; })}
        {systemNodes.map(n => <g key={n.id} className={`mindNode ${n.nodes?"isSystemLayer":"isSystemSupport"} ${layerId===n.id?"selected":""}`} role={n.nodes?"button":"img"} tabIndex={n.nodes?0:-1} aria-label={n.nodes?`Open ${n.name} layer`:n.name} onClick={() => { if (LAYERS.some(l=>l.id===n.id)) {setLayerId(n.id);setSelectedNodeId(LAYERS.find(l=>l.id===n.id).nodes[0].id);onModeChange("layer");} }} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();if(LAYERS.some(l=>l.id===n.id)){setLayerId(n.id);setSelectedNodeId(LAYERS.find(l=>l.id===n.id).nodes[0].id);onModeChange("layer");}}}}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="9" className={`mindNodeBox ${n.id==="runtime"?"runtimeBox":n.id==="external"?"externalBox":""}`} />
          <text x={n.x+15} y={n.y+22} className="mindNodeIndex">{n.n} / {n.group}</text>
          <text x={n.x+15} y={n.y+47} className="mindNodeTitle">{n.short || n.name}</text>
          <text x={n.x+15} y={n.y+69} className="mindNodeSub">{n.id==="runtime"?"CROSS-CUTTING INFRASTRUCTURE":n.id==="external"?"TOOLS · SOURCES · ENVIRONMENTS":`${n.nodes.length} INTERNAL NODES`}</text>
          {(n.nodes || []).slice(0,2).map((node,j)=><text key={node.id} x={n.x+15} y={n.y+91+j*14} className="mindNodeBullet">· {node.name}</text>)}
          {n.nodes && <text x={n.x+n.w-16} y={n.y+n.h-13} textAnchor="end" className="mindNodeOpen">OPEN LAYER ↗</text>}
        </g>)}
      </svg></div>
      <div className="mindmapFoot"><span>07 LAYERS</span><span>01 SHARED RUNTIME</span><span>01 EXTERNAL I/O</span><span>SELECT ANY LAYER TO OPEN ITS INTERNAL MAP</span></div>
    </> : <>
      <div className="layerMapPicker" aria-label="Select architecture layer">{LAYERS.map(l=><button key={l.id} className={layerId===l.id?"active":""} onClick={()=>{setLayerId(l.id);setSelectedNodeId(l.nodes[0].id);}}><span>{l.n}</span><b>{l.short}</b></button>)}</div>
      <div className="layerMapSummary"><span>{layer.n} / {layer.group}</span><h3>{layer.name}</h3><p>{layer.purpose}</p><div><span><b>INPUT</b>{layer.inputs}</span><span><b>OUTPUT</b>{layer.outputs}</span></div></div>
      <div className="layerMindmapCanvas"><svg viewBox="0 0 1000 550" role="img" aria-label={`${layer.name} internal node relationship map`}><Markers />
        {layer.nodes.map((n,i)=>{const pos=i===0?{x:70,y:170}:i===1?{x:580,y:170}:i===2?{x:70,y:320}:i===3?{x:580,y:320}:{x:325,y:435};return <path key={`root-${n.id}`} d={`M 500 110 Q ${(500+pos.x+175)/2} ${(110+pos.y)/2-5} ${pos.x+175} ${pos.y}`} fill="none" stroke="#397b8b" strokeOpacity=".48" strokeWidth="1.2" markerEnd="url(#arrow-foundation)" />;})}
        {layer.relations.map(([source,target,label,type],i)=>{const si=layer.nodes.findIndex(n=>n.id===source),ti=layer.nodes.findIndex(n=>n.id===target);const pos=(idx)=>idx===0?{x:245,y:213}:idx===1?{x:755,y:213}:idx===2?{x:245,y:363}:idx===3?{x:755,y:363}:{x:500,y:478};const a=pos(si),b=pos(ti);const dx=b.x-a.x,dy=b.y-a.y;const ta=Math.min(171/Math.max(Math.abs(dx),1),39/Math.max(Math.abs(dy),1));const tb=Math.min(171/Math.max(Math.abs(dx),1),39/Math.max(Math.abs(dy),1));return <Edge key={`${source}-${target}-${i}`} label={showRelationLabels?label:""} type={type} x1={a.x+dx*ta} y1={a.y+dy*ta} x2={b.x-dx*tb} y2={b.y-dy*tb} bend={(i%2===0?-1:1)*18}/>;})}
        <g><rect x="320" y="18" width="360" height="92" rx="10" className="mindRootBox"/><text x="340" y="42" className="mindNodeIndex">LAYER {layer.n} / {layer.group}</text><text x="340" y="68" className="mindRootTitle">{layer.short}</text><text x="340" y="89" className="mindNodeSub">SELECT A NODE TO INSPECT ITS RELATIONS</text></g>
        {layer.nodes.map((n,i)=>{const pos=i===0?{x:70,y:170}:i===1?{x:580,y:170}:i===2?{x:70,y:320}:i===3?{x:580,y:320}:{x:325,y:435};return <g key={n.id} role="button" tabIndex="0" aria-label={`Inspect ${n.name}`} className={`mindNode ${selectedNodeId===n.id?"selected":""}`} onClick={()=>setSelectedNodeId(n.id)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setSelectedNodeId(n.id);}}}><rect x={pos.x} y={pos.y} width="350" height="86" rx="8" className="mindNodeBox"/><text x={pos.x+13} y={pos.y+20} className="mindNodeIndex">NODE {String(i+1).padStart(2,"0")} / {layer.group}</text><text x={pos.x+13} y={pos.y+43} className="mindLayerNodeTitle">{n.name}</text><text x={pos.x+13} y={pos.y+63} className="mindLayerNodeDesc">{n.desc.length>47?n.desc.slice(0,44)+"…":n.desc}</text></g>;})}
      </svg></div>
      <div className="mindNodeInspector"><div className="mindInspectorTitle"><span>NODE INSPECTOR / {layer.short}</span><h3>{internalNode.name}</h3><p>{internalNode.desc}</p></div><div className="mindInspectorIO"><section><b>INPUT</b><p>{internalNode.input}</p></section><section><b>OUTPUT</b><p>{internalNode.output}</p></section></div><div className="mindInspectorRelations"><b>NODE RELATIONSHIPS</b>{relationDetail.length?relationDetail.map(([from,to,label,type])=><div key={`${from}-${to}`}><span className="mindRelationType" style={{color:TYPE_COLORS[type]}}>{type.toUpperCase()}</span><span>{from===internalNode.id?"OUTGOING →":"← INCOMING"}</span><strong>{layer.nodes.find(n=>n.id===(from===internalNode.id?to:from))?.name}</strong><small>{label}</small></div>):<p>No internal edges are defined for this node yet.</p>}</div></div>
      <div className="mindmapFoot"><span>{layer.nodes.length} INTERNAL NODES</span><span>{layer.relations.length} TYPED RELATIONSHIPS</span><span>CONCEPTUAL DESIGN / NOT LIVE TELEMETRY</span></div>
    </>}
  </section>;
}
