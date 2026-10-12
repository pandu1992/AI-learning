"use client";

import { useMemo, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

// "How GPT guesses the next word" — a tiny next-token language model built in
// the browser from a small seed corpus. It learns word-transition counts
// (trigram backing off to bigram), shows the top-k next-word probabilities, and
// lets students adjust TEMPERATURE to see how it reshapes the distribution and
// pick/auto-generate the next word. Original toy model — for teaching how an LLM
// predicts one token at a time.

// Small bilingual seed corpora (original sentences).
const CORPUS = {
  id: `kecerdasan buatan membantu manusia menyelesaikan masalah .
model bahasa belajar dari banyak teks .
model bahasa memprediksi kata berikutnya .
mesin belajar pola dari data .
mesin belajar dari pengalaman .
data yang baik menghasilkan model yang baik .
agen cerdas menangkap lingkungan lalu bertindak .
jaringan saraf belajar dari contoh .
pembelajaran mesin membutuhkan data yang bersih .
etika penting dalam membangun kecerdasan buatan .
kecerdasan buatan belajar dari data .
model belajar memprediksi kata .
mesin membantu manusia belajar lebih cepat .`,
  en: `artificial intelligence helps people solve problems .
a language model learns from lots of text .
a language model predicts the next word .
a machine learns patterns from data .
a machine learns from experience .
good data makes a good model .
an intelligent agent senses the environment then acts .
a neural network learns from examples .
machine learning needs clean data .
ethics matter when building artificial intelligence .
artificial intelligence learns from data .
a model learns to predict the next word .
a machine helps people learn faster .`,
};

// Build trigram + bigram transition maps from the corpus.
function buildModel(corpus) {
  const tokens = corpus.toLowerCase().split(/\s+/).filter(Boolean);
  const bi = new Map(); // w1 -> Map(next -> count)
  const tri = new Map(); // "w1 w2" -> Map(next -> count)
  for (let i = 0; i < tokens.length - 1; i++) {
    const w1 = tokens[i], w2 = tokens[i + 1];
    if (!bi.has(w1)) bi.set(w1, new Map());
    bi.get(w1).set(w2, (bi.get(w1).get(w2) || 0) + 1);
    if (i < tokens.length - 2) {
      const key = `${w1} ${w2}`, w3 = tokens[i + 2];
      if (!tri.has(key)) tri.set(key, new Map());
      tri.get(key).set(w3, (tri.get(key).get(w3) || 0) + 1);
    }
  }
  const vocab = Array.from(new Set(tokens));
  return { bi, tri, vocab };
}

// Predict next-token distribution given the last up-to-2 words.
// Trigram if available, else back off to bigram, else uniform over a few.
function predict(model, words) {
  const n = words.length;
  let counts = null;
  if (n >= 2) {
    const key = `${words[n - 2]} ${words[n - 1]}`;
    if (model.tri.has(key)) counts = model.tri.get(key);
  }
  if (!counts && n >= 1 && model.bi.has(words[n - 1])) counts = model.bi.get(words[n - 1]);
  if (!counts) {
    // fallback: a few common starters
    counts = new Map();
    model.vocab.slice(0, 6).forEach((w) => counts.set(w, 1));
  }
  return counts;
}

// Apply temperature to counts -> probability distribution, sorted desc.
function distribution(counts, temperature) {
  const entries = Array.from(counts.entries());
  // logits = log(count); scale by 1/T
  const T = Math.max(0.1, temperature);
  const logits = entries.map(([, c]) => Math.log(c) / T);
  const max = Math.max(...logits);
  const exp = logits.map((l) => Math.exp(l - max));
  const sum = exp.reduce((s, v) => s + v, 0);
  return entries
    .map(([w], i) => ({ word: w, p: exp[i] / sum }))
    .sort((a, b) => b.p - a.p);
}

function sampleFrom(dist) {
  const r = Math.random();
  let acc = 0;
  for (const d of dist) {
    acc += d.p;
    if (r <= acc) return d.word;
  }
  return dist[dist.length - 1]?.word;
}

export default function NextTokenDemo() {
  const { lang } = useLang();
  const [text, setText] = useState(lang === "id" ? "model bahasa" : "a language model");
  const [temperature, setTemperature] = useState(0.8);
  const model = useMemo(() => buildModel(CORPUS[lang]), [lang]);

  const words = useMemo(() => text.toLowerCase().split(/\s+/).filter(Boolean), [text]);
  const dist = useMemo(() => {
    const counts = predict(model, words);
    return distribution(counts, temperature).slice(0, 8);
  }, [model, words, temperature]);

  const append = (w) => setText((t) => `${t.trim()} ${w}`.trim());
  const autoStep = () => { const w = sampleFrom(dist); if (w) append(w); };
  const reset = () => setText(lang === "id" ? "model bahasa" : "a language model");

  const L = {
    id: {
      hint: "Beginilah inti kerja LLM seperti GPT: memprediksi KATA (token) berikutnya, satu per satu. Model kecil ini belajar dari korpus contoh. Lihat distribusi probabilitas kata berikutnya, lalu pilih sendiri atau biarkan model memilih.",
      input: "Teks (konteks)",
      nextProb: "Probabilitas kata berikutnya",
      temperature: "Temperature",
      tempLow: "rendah = fokus/aman",
      tempHigh: "tinggi = kreatif/acak",
      pick: "Klik kata untuk menambahkannya:",
      auto: "🎲 Model pilih (sampling)",
      reset: "↻ Reset",
      note: "Temperature mengatur 'keberanian' model: rendah → selalu ambil kata paling mungkin (membosankan tapi aman); tinggi → lebih banyak variasi (kreatif tapi bisa ngawur). Model asli pakai miliaran parameter & konteks jauh lebih panjang, tetapi prinsipnya sama.",
      empty: "Ketik beberapa kata untuk melihat prediksi…",
    },
    en: {
      hint: "This is the core of how an LLM like GPT works: predict the NEXT word (token), one at a time. This tiny model learns from an example corpus. See the next-word probability distribution, then pick one yourself or let the model choose.",
      input: "Text (context)",
      nextProb: "Next-word probabilities",
      temperature: "Temperature",
      tempLow: "low = focused/safe",
      tempHigh: "high = creative/random",
      pick: "Click a word to append it:",
      auto: "🎲 Let the model pick (sampling)",
      reset: "↻ Reset",
      note: "Temperature controls the model's 'boldness': low → always take the most likely word (safe but repetitive); high → more variety (creative but can wander). Real models use billions of parameters & far longer context, but the principle is the same.",
      empty: "Type a few words to see predictions…",
    },
  }[lang];

  const maxP = dist.length ? dist[0].p : 1;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      <label className="block text-sm font-semibold text-slate-700">{L.input}</label>
      <div className="mt-1 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-brand-500 focus:outline-none"
        />
        <button onClick={reset} className="shrink-0 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">{L.reset}</button>
      </div>

      {/* temperature */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700">🌡️ {L.temperature}: <span className="text-brand-600">{temperature.toFixed(1)}</span></span>
        </div>
        <input type="range" min="0.1" max="2" step="0.1" value={temperature} onChange={(e) => setTemperature(+e.target.value)} className="mt-1 w-full accent-brand-600" />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>{L.tempLow}</span><span>{L.tempHigh}</span>
        </div>
      </div>

      {/* distribution */}
      <p className="mt-4 mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{L.nextProb}</p>
      {dist.length === 0 ? (
        <p className="text-sm text-slate-400">{L.empty}</p>
      ) : (
        <div className="space-y-1.5">
          {dist.map((d, i) => (
            <button
              key={d.word}
              onClick={() => append(d.word)}
              className="group flex w-full items-center gap-2 text-left"
              title={L.pick}
            >
              <span className="w-24 shrink-0 truncate text-right text-sm font-medium text-slate-700 group-hover:text-brand-700">{d.word}</span>
              <span className="relative h-6 flex-1 overflow-hidden rounded bg-slate-100">
                <span
                  className="absolute inset-y-0 left-0 rounded transition-all"
                  style={{ width: `${(d.p / maxP) * 100}%`, backgroundColor: i === 0 ? "#0093D0" : "#7dd3fc" }}
                />
                <span className="absolute inset-y-0 left-2 flex items-center text-xs font-semibold text-slate-700">
                  {Math.round(d.p * 100)}%
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400">{L.pick}</span>
        <button onClick={autoStep} className="ml-auto rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">{L.auto}</button>
      </div>

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
