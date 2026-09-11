"use client";

import { useState, useMemo } from "react";
import { useLang } from "../LanguageProvider";

const SAMPLE = {
  id: [
    "kucing suka minum susu setiap pagi",
    "anjing suka berlari di taman pagi hari",
    "burung terbang tinggi di langit biru",
  ],
  en: [
    "the cat likes to drink milk every morning",
    "the dog likes to run in the park each morning",
    "the bird flies high in the blue sky",
  ],
};

const tokenize = (t) => t.toLowerCase().replace(/[^a-z\u00C0-\u024F\s]/g, " ").split(/\s+/).filter(Boolean);

function computeTfIdf(docs) {
  const tokenized = docs.map(tokenize);
  const N = docs.length;
  // document frequency
  const df = {};
  tokenized.forEach((doc) => {
    new Set(doc).forEach((w) => (df[w] = (df[w] || 0) + 1));
  });
  return tokenized.map((doc) => {
    const tf = {};
    doc.forEach((w) => (tf[w] = (tf[w] || 0) + 1));
    const scores = Object.entries(tf).map(([w, c]) => {
      const termFreq = c / doc.length;
      const idf = Math.log(N / df[w]) + 1; // smoothed
      return { w, tf: termFreq, idf, tfidf: termFreq * idf };
    });
    scores.sort((a, b) => b.tfidf - a.tfidf);
    return scores;
  });
}

export default function TfidfDemo() {
  const { lang } = useLang();
  const [docs, setDocs] = useState(SAMPLE[lang]);
  const results = useMemo(() => computeTfIdf(docs), [docs]);
  const maxScore = Math.max(0.001, ...results.flat().map((s) => s.tfidf));

  const L = {
    id: { doc: "Dokumen", edit: "Edit dokumen (satu per baris)", reset: "Contoh ulang", top: "Kata paling khas (skor TF-IDF tertinggi)",
      hint: "TF-IDF menilai seberapa 'penting' sebuah kata dalam satu dokumen dibanding koleksi. Kata yang sering muncul di satu dokumen tapi jarang di dokumen lain mendapat skor tinggi — itulah kata yang membedakan. Kata umum (seperti 'di', 'the') justru berskor rendah." },
    en: { doc: "Document", edit: "Edit documents (one per line)", reset: "Reset example", top: "Most distinctive words (highest TF-IDF)",
      hint: "TF-IDF scores how 'important' a word is in one document versus the collection. A word that appears often in one document but rarely in others scores high — it's the distinguishing word. Common words (like 'the', 'in') score low." },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      <label className="block text-sm font-semibold text-slate-700">{L.edit}</label>
      <textarea
        value={docs.join("\n")}
        onChange={(e) => setDocs(e.target.value.split("\n").filter((l) => l.trim()))}
        rows={4}
        className="mt-1 w-full rounded-lg border border-slate-300 p-3 font-mono text-xs focus:border-brand-500 focus:outline-none"
      />
      <button onClick={() => setDocs(SAMPLE[lang])} className="mt-2 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">{L.reset}</button>

      <div className="mt-5 space-y-4">
        {results.map((scores, di) => (
          <div key={di} className="rounded-xl border border-slate-200 p-3">
            <p className="text-xs font-bold text-brand-700">{L.doc} {di + 1}</p>
            <p className="mb-2 text-xs italic text-slate-400">&quot;{docs[di]}&quot;</p>
            <p className="mb-1 text-[11px] font-semibold text-slate-500">{L.top}</p>
            <div className="space-y-1">
              {scores.slice(0, 4).map((s) => (
                <div key={s.w} className="flex items-center gap-2">
                  <span className="w-24 shrink-0 text-xs font-medium text-slate-700">{s.w}</span>
                  <div className="h-3 flex-1 rounded-full bg-slate-100">
                    <div className="h-3 rounded-full bg-brand-500" style={{ width: `${(s.tfidf / maxScore) * 100}%` }} />
                  </div>
                  <span className="w-10 text-right text-[11px] text-slate-400">{s.tfidf.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
