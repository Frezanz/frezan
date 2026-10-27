import React, { useMemo, useState } from "react";

const sections = [
  { id: "modelArchitecture", number: "01", title: "Model Architecture", group: "SYSTEMS", category: "Systems", icon: "◇", summary: "Explore the proposed Formula-Network Intelligence Architecture, its components, and their relationships.", meta: "13 NODES · INTERACTIVE 3D MAP", existing: true },
  { id: "relationalFramework", number: "02", title: "Relational Framework", group: "SYSTEMS", category: "Systems", icon: "⌘", summary: "Examine how entities, properties, relations, constraints, and transformations describe a system.", meta: "STRUCTURES · RULES · DEPENDENCIES" },
  { id: "cognitiveSystems", number: "03", title: "Cognitive Systems & Memory", group: "SYSTEMS", category: "Systems", icon: "◉", summary: "Explore perception, attention, memory, reasoning, planning, and feedback as computational mechanisms.", meta: "COGNITION · MEMORY · CONTROL" },
  { id: "researchHypotheses", number: "04", title: "Research & Hypotheses", group: "RESEARCH", category: "Research", icon: "⌁", summary: "Organize open questions, hypotheses, evidence, counterarguments, and possible experiments.", meta: "QUESTIONS · EVIDENCE · TESTS" },
  { id: "knowledgeArchive", number: "06", title: "Knowledge Archive", group: "RESEARCH", category: "Research", icon: "▤", summary: "A curated index for concepts, notes, references, definitions, and decisions worth preserving.", meta: "CONCEPTS · NOTES · REFERENCES" },
  { id: "projectsExperiments", number: "05", title: "Projects & Experiments", group: "WORKBENCH", category: "Workbench", icon: "⌘", summary: "Track project intent, implementation evidence, limitations, experiments, and next milestones.", meta: "PROTOTYPES · RESULTS · NEXT STEPS" },
];

const destinations = {
  relationalFramework: {
    section: "SYSTEMS / 02", title: "Relational Framework", eyebrow: "A MODEL FOR CONNECTED STRUCTURE",
    intro: "A system becomes easier to reason about when its parts and the relationships between them are explicit. This space defines a working vocabulary for describing those structures without assuming that every relationship is already implemented.",
    status: "Conceptual framework · terminology and rules require validation against the canonical research notes.",
    blocks: [
      { label: "01 / BUILDING BLOCKS", title: "Describe the parts before connecting them.", text: "Entities represent things being discussed. Properties describe their attributes or state. Relations express how entities are connected. Constraints restrict which configurations are valid. Transformations describe how a structure or state changes." , bullets: ["Entity — an identifiable element in a model", "Property — a named value or characteristic", "Relation — a typed connection between elements", "Constraint — a condition a valid state must satisfy"] },
      { label: "02 / RELATION TYPES", title: "A connection should say what it means.", text: "Do not treat every edge as a generic link. A useful relation has a direction where appropriate, a clear meaning, and a reason to exist.", bullets: ["Structural: part-of, contains, instance-of", "Dependency: requires, uses, enables", "Information: supplies, transforms, derives-from", "Control: triggers, constrains, prioritizes", "Temporal or causal claims need stronger evidence than simple association"] },
      { label: "03 / VALIDATION", title: "Make relationships inspectable.", text: "A model should be testable against examples and counterexamples. Record assumptions, cardinality, direction, scope, and what would make a relation invalid.", bullets: ["Can two elements have this relation more than once?", "Is the relation directional or symmetric?", "Does the connection imply causation or only association?", "What evidence or rule justifies the edge?"] },
    ], related: ["modelArchitecture", "cognitiveSystems", "researchHypotheses"]
  },
  cognitiveSystems: {
    section: "SYSTEMS / 03", title: "Cognitive Systems & Memory", eyebrow: "FUNCTIONS, NOT A CLAIM OF BIOLOGICAL REPLICATION",
    intro: "This page studies cognitive functions as engineering problems: how a system receives information, selects what matters, retrieves context, forms a response, and uses outcomes to improve later decisions.",
    status: "Research map · these components are a design vocabulary, not a demonstrated brain-equivalent implementation.",
    blocks: [
      { label: "01 / INPUT & ATTENTION", title: "Not every signal deserves equal processing.", text: "Perception converts incoming signals into usable representations. Attention allocates limited processing to a subset of those representations, guided by goals, relevance, novelty, uncertainty, and urgency.", bullets: ["Input parsing and normalization", "Relevance scoring and prioritization", "Working context for the current task", "Explicit handling of ambiguity and missing information"] },
      { label: "02 / MEMORY SYSTEMS", title: "Different information needs different storage and retrieval rules.", text: "A useful computational design distinguishes what happened, what is known, how to do something, and what must be revisited later. These are functional categories; real systems may implement them with overlapping storage structures.", bullets: ["Episodic: events and experiences with context", "Semantic: concepts, facts, and relationships", "Procedural: reusable methods and action patterns", "Prospective: intentions, pending tasks, and future triggers"] },
      { label: "03 / REASON & ACT", title: "Close the loop between a decision and its outcome.", text: "Reasoning can compare candidate explanations, planning can order actions under constraints, and evaluation can compare actual outcomes against expectations. Feedback should update future behavior only through explicit, reviewable rules.", bullets: ["Retrieve relevant context with provenance", "Generate alternatives and test assumptions", "Plan actions with constraints and checkpoints", "Record outcomes, errors, and revisions"] },
    ], related: ["modelArchitecture", "relationalFramework", "researchHypotheses"]
  },
  researchHypotheses: {
    section: "RESEARCH / 04", title: "Research & Hypotheses", eyebrow: "SEPARATE WHAT IS KNOWN FROM WHAT IS PROPOSED",
    intro: "An idea becomes useful research when it can be stated clearly, compared with existing evidence, and challenged by a possible observation. This section is a framework for recording that process, not a list of unverified discoveries.",
    status: "Research workflow · entries should be added with sources and a concrete next test.",
    blocks: [
      { label: "01 / QUESTION", title: "State the uncertainty precisely.", text: "A good research question identifies the phenomenon, the conditions that matter, and what remains unexplained. Avoid questions so broad that no result could meaningfully answer them.", bullets: ["What exactly is unknown?", "Which terms need operational definitions?", "What would count as a useful answer?", "What is already established by credible sources?"] },
      { label: "02 / HYPOTHESIS", title: "Make a claim that can be challenged.", text: "Record the proposed mechanism, assumptions, expected observations, and plausible alternatives. Confidence should reflect the strength of evidence—not how elegant or exciting an idea feels.", bullets: ["Hypothesis and rationale", "Supporting evidence and source links", "Counterevidence and competing explanations", "Confidence and unresolved assumptions"] },
      { label: "03 / TEST", title: "Choose the smallest informative experiment.", text: "Prefer tests that could distinguish the hypothesis from its alternatives. Record the method before interpreting the result, then preserve negative results and limitations.", bullets: ["Predicted outcome and baseline", "Procedure, variables, and constraints", "Observed result and reproducibility", "Next step: revise, test again, or set aside"] },
    ], related: ["cognitiveSystems", "relationalFramework", "knowledgeArchive"]
  },
  projectsExperiments: {
    section: "WORKBENCH / 05", title: "Projects & Experiments", eyebrow: "INTENT IS NOT THE SAME AS IMPLEMENTATION",
    intro: "A workbench records the distance between an idea and a demonstrated result. Each project should be described through evidence: what exists, what was tested, what failed, and what remains to be done.",
    status: "Project index structure established · repository links and live implementation states should be verified before individual projects are marked complete.",
    blocks: [
      { label: "01 / SYSTEM DESIGNS", title: "From architecture to a testable prototype.", text: "Research architectures such as Formula-Network Intelligence Architecture belong here when there is a concrete implementation task or experiment. The conceptual model itself should remain labelled as proposed until integrated behavior is demonstrated.", bullets: ["Define the smallest end-to-end use case", "Identify components that are actually implemented", "Add tests, sample inputs, and expected outputs", "Record failure modes and missing infrastructure"] },
      { label: "02 / SOFTWARE BUILDS", title: "Make the result reproducible.", text: "For each software project, capture its repository, purpose, setup instructions, current verified behavior, and known limitations. A repository link alone is not evidence that every intended feature works.", bullets: ["Repository and demo, if available", "Build and test instructions", "Verified features versus planned features", "Issues, dependencies, and next milestone"] },
      { label: "03 / EXPERIMENT LOG", title: "Preserve what the attempt taught you.", text: "An experiment record should remain useful even when the result is negative. Keep the hypothesis, method, observed output, interpretation, and follow-up together so conclusions can be revisited.", bullets: ["Question and date", "Method and environment", "Results and evidence", "Conclusion, caveats, and next action"] },
    ], related: ["modelArchitecture", "researchHypotheses", "knowledgeArchive"]
  },
  knowledgeArchive: {
    section: "RESEARCH / 06", title: "Knowledge Archive", eyebrow: "A CURATED, SEARCHABLE MEMORY FOR IDEAS",
    intro: "The archive is intended to preserve useful knowledge with enough context to retrieve and evaluate it later. It should favor traceable, connected notes over a pile of unstructured snippets.",
    status: "Archive structure proposed · only deliberately selected public material should be published here.",
    blocks: [
      { label: "01 / ENTRY TYPES", title: "Give each note a clear role.", text: "Different records answer different questions. Marking the type of an entry helps readers understand how it should be used and how much confidence to place in it.", bullets: ["Concept: a definition or explanatory model", "Source note: a summary tied to a citation", "Decision: a choice and its rationale", "Experiment: a method, result, and interpretation"] },
      { label: "02 / RETRIEVAL", title: "Preserve the path back to the source.", text: "A note should carry tags, related entries, source links, date or version context when relevant, and a short statement of why it matters. Search and links should make it possible to recover the reasoning—not just the conclusion.", bullets: ["Topic tags and concise titles", "Source and provenance", "Related concepts and projects", "Status: verified, provisional, disputed, or open"] },
      { label: "03 / PUBLICATION BOUNDARY", title: "Curate before publishing.", text: "The public archive is not a mirror of private working memory. Review each entry for private information, credentials, internal logs, sensitive personal context, and third-party material before it is published.", bullets: ["Publish only intentionally selected entries", "Remove secrets and private identifiers", "Respect source attribution and licensing", "Review stale claims and broken references"] },
    ], related: ["researchHypotheses", "cognitiveSystems", "projectsExperiments"]
  },
};

const groups = [
  { name: "SYSTEMS", note: "How ideas are structured, connected, and processed.", ids: ["modelArchitecture", "relationalFramework", "cognitiveSystems"] },
  { name: "RESEARCH", note: "What is being questioned, documented, and preserved.", ids: ["researchHypotheses", "knowledgeArchive"] },
  { name: "WORKBENCH", note: "Projects, prototypes, experiments, and observable outcomes.", ids: ["projectsExperiments"] },
];

export function MoreIndex({ onOpen }) {
  const [filter, setFilter] = useState("All");
  const visible = useMemo(() => new Set(sections.filter(s => filter === "All" || s.category === filter).map(s => s.id)), [filter]);
  return <section className="moreExperience">
    <div className="panelHeader"><span>MORE / EXPLORATION INDEX</span><b>FREZANZ / KNOWLEDGE SPACE</b></div>
    <header className="moreHero"><div className="moreEyebrow"><i /> SYSTEMS · RESEARCH · WORKBENCH</div><h2>Ideas, models,<br /><span>and experiments.</span></h2><p>A structured map of the systems being explored, the questions behind them, and the work used to investigate them.</p><div className="moreHeroFoot"><span>EXPLORATION INDEX</span><span>06 SPACES / 03 CATEGORIES</span></div></header>
    <div className="moreFilter" role="group" aria-label="Filter exploration spaces">{["All", "Systems", "Research", "Workbench"].map(value => <button type="button" key={value} className={filter === value ? "active" : ""} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}<span>{value === "All" ? "06" : String(sections.filter(s => s.category === value).length).padStart(2, "0")}</span></button>)}</div>
    {groups.map(group => {
      const items = sections.filter(s => group.ids.includes(s.id) && visible.has(s.id));
      if (!items.length) return null;
      return <section className="moreGroup" key={group.name}><div className="moreGroupHead"><div><span>{group.name}</span><p>{group.note}</p></div><small>{String(items.length).padStart(2, "0")} / {String(group.ids.length).padStart(2, "0")}</small></div><div className="moreCards">{items.map(item => <button type="button" className="moreCard" key={item.id} onClick={() => onOpen(item.id)}><span className="moreCardTop"><i>{item.number}</i><b>{item.icon}</b><em>↗</em></span><strong>{item.title}</strong><p>{item.summary}</p><span className="moreCardMeta">{item.meta}</span></button>)}</div></section>;
    })}
    <footer className="morePrinciple"><span>OPERATING PRINCIPLE</span><p>Concepts, hypotheses, prototypes, and verified results are different states. Every space should make that distinction visible.</p></footer>
  </section>;
}

export function MoreDestination({ panel, onOpen, onBack }) {
  const page = destinations[panel];
  if (!page) return null;
  const related = page.related.map(id => sections.find(s => s.id === id)).filter(Boolean);
  return <article className="moreDestination">
    <div className="panelHeader"><span>MORE / {page.section}</span><b>FREZANZ / KNOWLEDGE SPACE</b></div>
    <button className="moreBack" type="button" onClick={onBack}>← <span>BACK TO EXPLORATION INDEX</span></button>
    <header className="destinationHero"><span>{page.eyebrow}</span><h2>{page.title}</h2><p>{page.intro}</p><div className="destinationStatus"><i /> <span>{page.status}</span></div></header>
    <div className="destinationBlocks">{page.blocks.map((block, index) => <section className="destinationBlock" key={block.label}><div className="destinationBlockNo">{block.label}</div><h3>{block.title}</h3><p>{block.text}</p><ul>{block.bullets.map(item => <li key={item}>{item}</li>)}</ul></section>)}</div>
    <section className="moreRelated"><div className="moreGroupHead"><div><span>CONTINUE EXPLORING</span><p>Related spaces that extend this topic.</p></div></div><div className="relatedCards">{related.map(item => <button type="button" key={item.id} onClick={() => onOpen(item.id)}><span>{item.number} / {item.group}</span><strong>{item.title}</strong><em>↗</em></button>)}</div></section>
  </article>;
}
