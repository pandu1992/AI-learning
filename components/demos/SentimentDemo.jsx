"use client";

import { useState, useMemo } from "react";
import { useLang } from "../LanguageProvider";

// Traditional NLP: bag-of-words + Naive Bayes sentiment classifier.
// Tiny built-in training set (bilingual word lists) so it runs entirely client-side.
const LEXICON = {
  positive: ["bagus", "hebat", "suka", "senang", "puas", "mantap", "keren", "baik", "cepat", "ramah",
    "good", "great", "love", "happy", "excellent", "amazing", "nice", "best", "fast", "friendly", "recommend"],
  negative: ["buruk", "jelek", "benci", "kecewa", "lambat", "mahal", "rusak", "parah", "gagal", "kasar",
    "bad", "terrible", "hate", "disappointed", "slow", "expensive", "broken", "worst", "awful", "poor", "rude"],
};

function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z\u00C0-\u024F\s]/g, " ").split(/\s+/).filter(Boolean);
}

// Naive Bayes with Laplace smoothing over the two classes.
function classify(text) {
  const tokens = tokenize(text);
  const vocab = new Set([...LEXICON.positive, ...LEXICON.negative]);
  const V = vocab.size;
  const countIn = (list, w) => (list.includes(w) ? 1 : 0);
  let logPos = Math.log(0.5), logNeg = Math.log(0.5);
  const posTotal = LEXICON.positive.length, negTotal = LEXICON.negative.length;
  const contributions = [];
  for (const w of tokens) {
    if (!vocab.has(w)) continue;
    const pPos = (countIn(LEXICON.positive, w) + 1) / (posTotal + V);
    const pNeg = (countIn(LEXICON.negative, w) + 1) / (negTotal + V);
    logPos += Math.log(pPos);
    logNeg += Math.log(pNeg);
    contributions.push({ w, sentiment: LEXICON.positive.includes(w) ? "pos" : LEXICON.negative.includes(w) ? "neg" : "neu" });
  }
  const expPos = Math.exp(logPos), expNeg = Math.exp(logNeg);
  const probPos = expPos / (expPos + expNeg);
  return { probPos, contributions, matched: contributions.length };
}

export default function SentimentDemo() {
  const { lang } = useLang();
  const [text, setText] = useState(lang === "id" ? "Pelayanannya ramah dan cepat, saya sangat puas!" : "The service was friendly and fast, I love it!");
  const result = useMemo(() => classify(text), [text]);
  const label = result.probPos >= 0.5;

  const L = {
    id: { title: "Masukkan ulasan", pos: "Positif", neg: "Negatif", conf: "Keyakinan", matched: "Kata bermuatan ditemukan", none: "Tidak ada kata sentimen yang dikenali — coba kata seperti 'bagus' atau 'buruk'.",
      hint: "Ini analisis sentimen gaya NLP tradisional: teks dipecah jadi kata (bag-of-words), lalu Naive Bayes menghitung peluang positif/negatif dari daftar kata yang 'dipelajari'. Tanpa deep learning — cepat & mudah dijelaskan. Ketik ulasan dan lihat kata mana yang berpengaruh." },
    en: { title: "Enter a review", pos: "Positive", neg: "Negative", conf: "Confidence", matched: "Sentiment words found", none: "No known sentiment words — try words like 'good' or 'bad'.",
      hint: "This is traditional-NLP sentiment analysis: text is split into words (bag-of-words), then Naive Bayes computes positive/negative probabilities from 'learned' word lists. No deep learning — fast & easy to explain. Type a review and see which words matter." },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>
      <label className="block text-sm font-semibold text-slate-700">{L.title}</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="mt-1 w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-brand-500 focus:outline-none"
      />

      <div className="mt-4 flex items-center gap-4">
        <div className={`rounded-xl px-5 py-3 text-center ${label ? "bg-green-100" : "bg-red-100"}`}>
          <div className="text-3xl">{label ? "😊" : "☹️"}</div>
          <div className={`mt-1 font-bold ${label ? "text-green-700" : "text-red-700"}`}>{label ? L.pos : L.neg}</div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-xs text-slate-500">
            <span>{L.neg}</span><span>{L.conf}: {Math.round(Math.max(result.probPos, 1 - result.probPos) * 100)}%</span><span>{L.pos}</span>
          </div>
          <div className="mt-1 h-4 w-full rounded-full bg-gradient-to-r from-red-300 via-slate-200 to-green-300">
            <div className="relative h-4">
              <div className="absolute top-[-2px] h-5 w-1.5 rounded bg-slate-800" style={{ left: `${result.probPos * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold text-slate-500">{L.matched}: {result.matched}</p>
        {result.matched === 0 ? (
          <p className="mt-1 text-xs text-slate-400">{L.none}</p>
        ) : (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {result.contributions.map((c, i) => (
              <span key={i} className={`rounded px-2 py-0.5 text-xs font-medium ${c.sentiment === "pos" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {c.w}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
