"use client";

import { Fragment, useMemo } from "react";
import GlossaryTerm from "./GlossaryTerm";
import { glossaryTermsByLength } from "@/lib/glossary";

// Takes a plain string and auto-wraps any glossary terms it contains with a
// GlossaryTerm tooltip. Greedy longest-match, case-insensitive, whole-word, and
// each distinct term is linked only once (the first occurrence) to avoid a wall
// of tooltips. Everything else is rendered as plain text.
export default function AutoGlossary({ text }) {
  const nodes = useMemo(() => buildNodes(text), [text]);
  return (
    <>
      {nodes.map((n, i) =>
        n.term ? <GlossaryTerm key={i} term={n.term}>{n.text}</GlossaryTerm> : <Fragment key={i}>{n.text}</Fragment>
      )}
    </>
  );
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildNodes(text) {
  if (!text) return [{ text: "" }];
  // one alternation of all terms, longest first so multi-word terms win
  const pattern = new RegExp(`\\b(${glossaryTermsByLength.map(escapeRe).join("|")})\\b`, "gi");
  const out = [];
  const used = new Set();
  let last = 0;
  let m;
  while ((m = pattern.exec(text)) !== null) {
    const matched = m[0];
    const canonical = matched.toLowerCase();
    // link only the first occurrence of each distinct term
    if (used.has(canonical)) continue;
    used.add(canonical);
    if (m.index > last) out.push({ text: text.slice(last, m.index) });
    out.push({ text: matched, term: matched });
    last = m.index + matched.length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out.length ? out : [{ text }];
}
