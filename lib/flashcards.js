// Flashcard decks built by reusing existing content — the glossary (term ↔
// definition) and the per-demo concept-check questions (question ↔ answer +
// explanation). No new content to maintain; it's a study/exam-prep view over
// what's already on the site. Each card: { front, back, tag }.

import { glossary, glossaryCategories } from "./glossary";
import { conceptCheck } from "./conceptCheck";
import { demoList } from "./demos";

// Build the glossary deck for a language.
function glossaryDeck(lang) {
  return glossary.map((e) => ({
    front: e.term,
    back: e[lang]?.def || "",
    tag: glossaryCategories[lang]?.[e.category] || e.category,
  }));
}

// Build the concept-question deck for a language.
function conceptDeck(lang) {
  const cards = [];
  for (const [slug, data] of Object.entries(conceptCheck)) {
    const d = data[lang];
    if (!d) continue;
    const demo = demoList.find((x) => x.slug === slug);
    const answer = d.options[d.answer];
    cards.push({
      front: d.q,
      back: `✅ ${answer}\n\n${d.explain}`,
      tag: demo ? demo[lang].title : slug,
    });
  }
  return cards;
}

export function getDeck(kind, lang) {
  if (kind === "concepts") return conceptDeck(lang);
  if (kind === "all") return [...glossaryDeck(lang), ...conceptDeck(lang)];
  return glossaryDeck(lang);
}

export const DECKS = {
  id: [
    { key: "glossary", name: "Glosarium (istilah)", icon: "📖" },
    { key: "concepts", name: "Konsep (soal)", icon: "❓" },
    { key: "all", name: "Gabungan", icon: "🎲" },
  ],
  en: [
    { key: "glossary", name: "Glossary (terms)", icon: "📖" },
    { key: "concepts", name: "Concepts (questions)", icon: "❓" },
    { key: "all", name: "Combined", icon: "🎲" },
  ],
};

// Deterministic-ish shuffle (Fisher–Yates with a seed so a session is stable
// until the user explicitly reshuffles).
export function shuffle(arr, seed = Date.now()) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  const rand = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
