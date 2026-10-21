"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LanguageProvider";

// CNN for Text (1D convolution) — how a convolutional filter scans a sentence.
// A filter of width k slides over k-token windows (n-grams); at each position it
// scores how strongly the window matches a learned pattern. Max-pooling keeps
// the single strongest activation (the phrase the filter "detected"). Here the
// filter pattern is a small sentiment lexicon so the activation is interpretable.
// Transparent toy (not a trained CNN) — for teaching the idea.

// toy "learned" word weights (a 1-D filter looking for strong sentiment phrases)
const WEIGHTS = {
  not: -0.6, never: -0.6, no: -0.5,
  good: 0.9, great: 1.0, love: 1.0, excellent: 1.0, amazing: 1.0, best: 0.9, happy: 0.8, nice: 0.6,
  bad: -0.9, terrible: -1.0, hate: -1.0, worst: -1.0, awful: -1.0, poor: -0.7, sad: -0.7,
  very: 0.3, really: 0.3, so: 0.2,
};

function scoreWindow(tokens) {
  // sum of weights with a simple negation flip inside the window
  let neg = 1, sum = 0;
  for (const t of tokens) {
    const w = WEIGHTS[t.toLowerCase()] || 0;
    if (["not", "never", "no"].includes(t.toLowerCase())) { neg *= -1; continue; }
    sum += w;
  }
  return +(sum * neg).toFixed(2);
}

export default function TextCnnDemo() {
  const { lang } = useLang();
  const SAMPLE = { id: "film ini tidak bagus tapi aktingnya sangat hebat", en: "this movie is not good but the acting is really great" };
  const [text, setText] = useState(SAMPLE[lang]);
  const [k, setK] = useState(2); // filter width (n-gram size)

  const tokens = useMemo(() => text.trim().split(/\s+/).filter(Boolean).slice(0, 14), [text]);
  const windows = useMemo(() => {
    const out = [];
    for (let i = 0; i + k <= tokens.length; i++) {
      const win = tokens.slice(i, i + k);
      out.push({ i, win, score: scoreWindow(win) });
    }
    return out;
  }, [tokens, k]);

  const pooled = useMemo(() => {
    if (!windows.length) return null;
    // max-pooling by absolute activation (strongest signal, +/-)
    return windows.reduce((a, b) => (Math.abs(b.score) > Math.abs(a.score) ? b : a));
  }, [windows]);

  const L = {
    id: {
      hint: "CNN juga dipakai untuk TEKS. Sebuah filter selebar k menggeser ke seluruh kalimat, menilai tiap 'jendela' k kata (n-gram) — menangkap FRASA lokal (mis. 'sangat hebat', 'tidak bagus'). Max-pooling menyimpan aktivasi terkuat sebagai fitur.",
      sentence: "Kalimat", filter: "Lebar filter (k-gram)",
      activations: "Aktivasi per jendela (konvolusi 1D)",
      pooled: "Max-pooling → fitur terkuat",
      sample: "Contoh",
      none: "Ketik kalimat dengan kata bermuatan (bagus, buruk, hebat, tidak…).",
      note: "Filter CNN teks belajar mendeteksi frasa penting di posisi mana pun (invarian posisi). Berbeda dari RNN yang memproses berurutan, CNN menilai banyak n-gram sekaligus — cepat & bagus untuk klasifikasi teks.",
    },
    en: {
      hint: "CNNs also work on TEXT. A filter of width k slides across the sentence, scoring each 'window' of k words (an n-gram) — capturing local PHRASES (e.g. 'really great', 'not good'). Max-pooling keeps the strongest activation as a feature.",
      sentence: "Sentence", filter: "Filter width (k-gram)",
      activations: "Per-window activations (1D convolution)",
      pooled: "Max-pooling → strongest feature",
      sample: "Sample",
      none: "Type a sentence with charged words (good, bad, great, not…).",
      note: "A text-CNN filter learns to detect important phrases wherever they appear (position-invariant). Unlike an RNN that reads sequentially, a CNN scores many n-grams at once — fast & great for text classification.",
    },
  }[lang];

  const barColor = (s) => (s > 0 ? "#16a34a" : s < 0 ? "#dc2626" : "#94a3b8");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">{L.sentence}</label>
        <button onClick={() => setText(SAMPLE[lang])} className="text-xs font-semibold text-brand-600 hover:underline">{L.sample}</button>
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-brand-500 focus:outline-none" />

      <div className="mt-3 flex items-center gap-2 text-sm">
        <span className="font-semibold text-slate-700">{L.filter}:</span>
        {[2, 3].map((v) => (
          <button key={v} onClick={() => setK(v)} className={`rounded-full border px-3 py-1 text-xs font-semibold ${k === v ? "border-transparent bg-brand-600 text-white" : "border-slate-300 text-slate-700"}`}>{v}</button>
        ))}
      </div>

      {/* activations */}
      <p className="mt-4 mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{L.activations}</p>
      {windows.length === 0 ? (
        <p className="text-sm text-slate-400">{L.none}</p>
      ) : (
        <div className="space-y-1.5">
          {windows.map((w) => {
            const isPool = pooled && w.i === pooled.i;
            const mag = Math.min(1, Math.abs(w.score));
            return (
              <div key={w.i} className={`flex items-center gap-2 rounded-lg p-1.5 ${isPool ? "bg-brand-50 ring-1 ring-brand-300" : ""}`}>
                <span className="w-40 shrink-0 truncate font-mono text-xs text-slate-700">[{w.win.join(" ")}]</span>
                <span className="relative h-5 flex-1 overflow-hidden rounded bg-slate-100">
                  <span className="absolute inset-y-0" style={{ left: "50%", width: `${mag * 50}%`, transform: w.score < 0 ? "translateX(-100%)" : "none", backgroundColor: barColor(w.score) }} />
                  <span className="absolute left-1/2 top-0 h-full w-px bg-slate-300" />
                </span>
                <span className="w-12 shrink-0 text-right font-mono text-xs" style={{ color: barColor(w.score) }}>{w.score}</span>
              </div>
            );
          })}
        </div>
      )}

      {pooled && (
        <div className="mt-3 rounded-lg border border-brand-200 bg-brand-50 p-3 text-sm">
          <span className="font-semibold text-brand-700">⬆️ {L.pooled}: </span>
          <span className="font-mono">[{pooled.win.join(" ")}]</span> → <span className="font-bold" style={{ color: barColor(pooled.score) }}>{pooled.score}</span>
        </div>
      )}

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
