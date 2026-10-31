import React, { useMemo, useState } from "react";

const candidates = [
  { id: "A", label: "Subjective-truth acceptance", text: "Acceptance of something as true from another person's perspective, without requiring that it be objectively or universally true.", note: "A concerns accepting a perspective as true from that person's standpoint." },
  { id: "B", label: "Perspective recognition", text: "Accepting another person's perspective or interpretation as theirs, without automatically agreeing with it or imposing one's own interpretation.", note: "B concerns recognizing a perspective without necessarily agreeing with it." },
  { id: "C", label: "Personal meaning recognition", text: "Recognizing that a person can give something a meaning that is valid within their own experience, even when that meaning is not universal.", note: "C concerns personally assigned meaning." }
];

export default function FrezanzCollection({ onBack }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const visible = useMemo(() => candidates.filter(item => (item.label + " " + item.text + " " + item.note).toLowerCase().includes(query.toLowerCase()) && (filter === "all" || filter === "review")), [query, filter]);
  return <section className="frezanzCollection">
    <div className="panelHeader"><span>MORE / IDENTITY</span><b>FREZANZ</b></div>
    <button className="moreBack" type="button" onClick={onBack}>← <span>BACK</span></button>
    <header className="frezanzCollectionIntro">
      <h2>FREZANZ</h2>
      <p>A name can gather different kinds of things through the connections they share. An interpretation might be a quality, an idea, a principle, a phenomenon, an object, or something else entirely. The connection matters more than fitting everything into one category.</p>
    </header>
    <div className="frezanzCollectionStats">
      <div><span>UNIQUE CONFIRMED</span><strong>000 / 1000</strong></div>
      <div><span>UNDER REVIEW</span><strong>003</strong></div>
      <div><span>COUNTING RULE</span><strong>UNIQUE IDEAS</strong></div>
    </div>
    <div className="frezanzCollectionTools">
      <input value={query} onChange={event => setQuery(event.target.value)} placeholder="SEARCH THE COLLECTION" aria-label="Search collection" />
      <button type="button" className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>ALL</button>
      <button type="button" className={filter === "review" ? "active" : ""} onClick={() => setFilter("review")}>UNDER REVIEW</button>
    </div>
    <div className="frezanzCandidateList">
      {visible.map(item => <article className="frezanzCandidate" key={item.id}>
        <div className="frezanzCandidateTop"><span>CANDIDATE {item.id} · {item.label.toUpperCase()}</span><b>NOT CONFIRMED</b></div>
        <p>{item.text}</p>
        <small>{item.note} This candidate overlaps with the other two and needs your review before it can count.</small>
      </article>)}
      {!visible.length && <div className="frezanzEmpty">NO MATCHING ENTRIES</div>}
    </div>
    <div className="frezanzCollectionNote">Only distinct ideas you propose and explicitly confirm will be counted. Rewordings do not increase the total; related ideas need a clear distinction before they become separate entries.</div>
  </section>;
}
