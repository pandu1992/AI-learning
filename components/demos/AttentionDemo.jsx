"use client";

import { useState, useMemo } from "react";
import { useLang } from "../LanguageProvider";

// Visualize self-attention as a heatmap. Real transformers learn attention from
// data; here we compute a plausible pattern from simple word-similarity heuristics
// so students can see the "which word attends to which" idea concretely.
const SAMPLE = {
  id: "kucing itu mengejar tikus karena ia lapar",
  en: "the cat chased the mouse because it was hungry",
};

// crude relatedness: shared prefix / same word / pronoun links
function relatedness(a, b, ai, bi) {
  if (a === b) return 1;
  let score = 0.1;
  // pronouns attend to nearby nouns
  const pronouns = ["ia", "dia", "it", "he", "she", "they"];
  const nouns = ["kucing", "tikus", "cat", "mouse", "dog", "anjing"];
  if (pronouns.includes(a) && nouns.includes(b)) score += 0.7;
  // adjacency bonus
  score += Math.max(0, 0.4 - Math.abs(ai - bi) * 0.1);
  // shared first 3 letters
  if (a.slice(0, 3) === b.slice(0, 3)) score += 0.3;
  return Math.min(1, score);
}

function softmaxRow(row) {
  const max = Math.max(...row);
  const exp = row.map((v) => Math.exp((v - max) * 2.5));
  const sum = exp.reduce((s, v) => s + v, 0);
  return exp.map((v) => v / sum);
}

export default function AttentionDemo() {
  const { lang } = useLang();
  const [text, setText] = useState(SAMPLE[lang]);
  const [hoverRow, setHoverRow] = useState(null);

  const { words, matrix } = useMemo(() => {
    const words = text.trim().toLowerCase().split(/\s+/).filter(Boolean).slice(0, 10);
    const raw = words.map((a, ai) => words.map((b, bi) => relatedness(a, b, ai, bi)));
    const matrix = raw.map(softmaxRow);
    return { words, matrix };
  }, [text]);

  const L = {
    id: { input: "Kalimat", hintRow: "Baris = kata yang 'memperhatikan'. Semakin gelap sel, semakin besar perhatian ke kata di kolom itu.",
      hint: "Self-attention adalah inti Transformer (dasar BERT & GPT). Setiap kata 'memperhatikan' kata lain untuk memahami konteks. Contoh klasik: kata ganti 'ia'/'it' memperhatikan kata benda yang dirujuknya. Arahkan kursor ke sebuah baris untuk menyorot ke mana kata itu memberi perhatian." },
    en: { input: "Sentence", hintRow: "Row = the word that 'attends'. Darker cell = more attention to the word in that column.",
      hint: "Self-attention is the heart of the Transformer (basis of BERT & GPT). Each word 'attends' to others to understand context. Classic example: the pronoun 'it'/'ia' attends to the noun it refers to. Hover a row to highlight where that word pays attention." },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>
      <label className="block text-sm font-semibold text-slate-700">{L.input}</label>
      <input value={text} onChange={(e) => setText(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-brand-500 focus:outline-none" />

      <p className="mt-4 mb-2 text-xs text-slate-500">{L.hintRow}</p>
      <div className="overflow-x-auto">
        <table className="border-collapse text-xs">
          <thead>
            <tr>
              <th className="p-1"></th>
              {words.map((w, i) => (
                <th key={i} className="max-w-[54px] p-1 text-center align-bottom font-medium text-slate-500">
                  <span className="inline-block" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{w}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, ri) => (
              <tr key={ri} onMouseEnter={() => setHoverRow(ri)} onMouseLeave={() => setHoverRow(null)}
                className={hoverRow === ri ? "ring-2 ring-brand-400" : ""}>
                <td className="whitespace-nowrap p-1 pr-2 text-right font-medium text-slate-700">{words[ri]}</td>
                {row.map((v, ci) => (
                  <td key={ci} className="p-0.5">
                    <div className="flex h-8 w-full min-w-[36px] items-center justify-center rounded"
                      style={{ backgroundColor: `rgba(37,99,235,${v.toFixed(2)})`, color: v > 0.5 ? "#fff" : "#1e293b" }}>
                      {v > 0.15 ? Math.round(v * 100) : ""}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
