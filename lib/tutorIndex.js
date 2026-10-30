// Mini "RAG" retrieval index for the AI Tutor — built entirely from the site's
// OWN content (no external API, no model). We assemble a corpus of short passages
// from the glossary, demo summaries, math intuitions, and practical tips, then
// answer a question by scoring passages against the query with simple token
// overlap (TF-ish). It's intentionally the very technique the site teaches:
// retrieve relevant documents, then present them grounded with a source link.

import { glossary } from "./glossary";
import { demoList } from "./demos";
import { demoMath } from "./demoMath";
import { practicalTips } from "./practicalTips";

const STOP = new Set(
  ("a an the of to in on for and or is are be as with that this it its what which how why when where who "
  + "apa yang bagaimana mengapa kapan di ke dari dan atau adalah untuk itu ini pada dengan sebuah para "
  + "do does can could would should i you we they them their").split(/\s+/)
);

function tokenize(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u00c0-\u024f\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w));
}

// Build the passage corpus for a given language. Each passage:
//   { title, text, href, kind, tokens:Set }
export function buildCorpus(lang) {
  const passages = [];
  const add = (title, text, href, kind) => {
    if (!text) return;
    passages.push({ title, text, href, kind, tokens: tokenize(`${title} ${text}`) });
  };

  // glossary terms
  for (const e of glossary) {
    add(e.term, e[lang]?.def, "/glossary", "glossary");
  }
  // demo summaries
  for (const d of demoList) {
    const meta = d[lang];
    if (meta) add(meta.title, meta.summary, `/demos/${d.slug}`, "demo");
  }
  // math intuitions
  for (const [slug, m] of Object.entries(demoMath)) {
    const intu = m[lang]?.intuition;
    const demo = demoList.find((d) => d.slug === slug);
    if (intu && demo) add(`${demo[lang].title} — ${lang === "id" ? "intuisi" : "intuition"}`, intu, `/demos/${slug}`, "math");
  }
  // practical tips (mistakes)
  for (const [slug, t] of Object.entries(practicalTips)) {
    const demo = demoList.find((d) => d.slug === slug);
    const tips = t[lang];
    if (demo && tips?.mistakes?.length) {
      const text = tips.mistakes.map((mm) => `${mm.bad} ${mm.fix}`).join(" ");
      add(`${demo[lang].title} — ${lang === "id" ? "tips praktis" : "practical tips"}`, text, `/demos/${slug}`, "tip");
    }
  }
  return passages;
}

// Score passages against the query by weighted token overlap, return top matches.
export function retrieve(query, lang, k = 3) {
  const corpus = buildCorpus(lang);
  const qTokens = tokenize(query);
  if (!qTokens.length) return [];
  const qSet = new Set(qTokens);

  // document frequency for a light IDF weighting (rare words count more)
  const df = {};
  for (const p of corpus) for (const w of new Set(p.tokens)) df[w] = (df[w] || 0) + 1;
  const N = corpus.length;
  const idf = (w) => Math.log((N + 1) / ((df[w] || 0) + 1)) + 1;

  const scored = corpus.map((p) => {
    const pSet = new Set(p.tokens);
    let score = 0;
    for (const w of qSet) if (pSet.has(w)) score += idf(w);
    // small boost for title matches
    const titleTokens = new Set(tokenize(p.title));
    for (const w of qSet) if (titleTokens.has(w)) score += 0.5 * idf(w);
    return { ...p, score };
  });

  return scored
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
