"use client";

import { useMemo, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

// RNN for Text — reads a sentence ONE TOKEN AT A TIME, carrying a hidden state
// (memory) forward: h_t = tanh(W x_t + U h_{t-1}). We visualize the hidden
// vector updating per step and a running interpretation that accumulates
// context (e.g. an early "not" flips the meaning of a later word). Transparent
// toy recurrence (fixed small weights) — for teaching the sequential idea.

const DIM = 4; // hidden-state size

// toy token -> input vector (interpretable: valence + negation + intensity)
const LEX = {
  good: [0.9, 0, 0.2, 0], great: [1, 0, 0.4, 0], love: [1, 0, 0.5, 0], happy: [0.8, 0, 0.2, 0], nice: [0.6, 0, 0.1, 0],
  bad: [-0.9, 0, 0.2, 0], terrible: [-1, 0, 0.4, 0], hate: [-1, 0, 0.5, 0], sad: [-0.7, 0, 0.2, 0], boring: [-0.6, 0, 0.1, 0],
  not: [0, 1, 0, 0], never: [0, 1, 0, 0], no: [0, 1, 0, 0],
  very: [0, 0, 0.6, 0], really: [0, 0, 0.5, 0], so: [0, 0, 0.4, 0],
};
function inputVec(tok) { return LEX[tok.toLowerCase()] || [0, 0, 0, 0.1]; }

const tanh = (x) => Math.tanh(x);

// one recurrent step: combine previous hidden state with the new input.
// Dim0 = sentiment accumulator (flips if a negation flag is active in state).
function stepRNN(h, x) {
  const [val, neg, inten] = x;
  // negation memory: carried in h[1]; decays each step
  const negMem = h[1] * 0.6 + neg;
  const flip = negMem > 0.5 ? -1 : 1;
  const sentiment = tanh(h[0] * 0.7 + flip * val * (1 + h[2]));
  const intensity = tanh(h[2] * 0.5 + inten);
  return [
    +sentiment.toFixed(2),
    +Math.min(1, negMem).toFixed(2),
    +intensity.toFixed(2),
    +tanh(h[3] * 0.8 + 0.1).toFixed(2),
  ];
}

export default function RnnTextDemo() {
  const { lang } = useLang();
  const SAMPLE = { id: "film ini tidak terlalu bagus", en: "this movie is not very good" };
  const [text, setText] = useState(SAMPLE[lang]);
  const [step, setStep] = useState(0); // how many tokens processed
  const playRef = useRef(null);

  const tokens = useMemo(() => text.trim().split(/\s+/).filter(Boolean).slice(0, 12), [text]);

  // compute the full hidden-state trajectory
  const states = useMemo(() => {
    let h = [0, 0, 0, 0];
    const traj = [h];
    for (const tok of tokens) { h = stepRNN(h, inputVec(tok)); traj.push(h); }
    return traj; // length tokens.length + 1 (index 0 = initial)
  }, [tokens]);

  const curH = states[Math.min(step, states.length - 1)] || [0, 0, 0, 0];
  const sentiment = curH[0];

  const stop = () => { if (playRef.current) clearInterval(playRef.current); playRef.current = null; };
  const play = () => {
    stop();
    setStep(0);
    playRef.current = setInterval(() => {
      setStep((s) => { if (s >= tokens.length) { stop(); return s; } return s + 1; });
    }, 800);
  };
  const reset = () => { stop(); setStep(0); };

  const L = {
    id: {
      hint: "RNN membaca teks BERURUTAN, satu token setiap langkah, sambil membawa 'hidden state' (memori) ke langkah berikutnya: hₜ = tanh(W·xₜ + U·hₜ₋₁). Memori inilah yang membuat kata 'tidak' di awal bisa membalik makna kata setelahnya.",
      sentence: "Kalimat", sample: "Contoh",
      step: "Langkah →", play: "▶ Putar", reset: "↻ Reset",
      hidden: "Hidden state hₜ (memori)", reading: "Sedang membaca", processed: "sudah diproses",
      sentiment: "Interpretasi sentimen berjalan",
      pos: "Positif", neg: "Negatif", neutral: "Netral",
      note: "Karena memproses berurutan, RNN bagus untuk konteks & urutan (terjemahan, deret waktu), tetapi lambat & bisa 'lupa' konteks jauh. Transformer/attention lalu mengatasi kelemahan ini.",
    },
    en: {
      hint: "An RNN reads text SEQUENTIALLY, one token per step, carrying a 'hidden state' (memory) to the next step: hₜ = tanh(W·xₜ + U·hₜ₋₁). This memory is what lets an early 'not' flip the meaning of a later word.",
      sentence: "Sentence", sample: "Sample",
      step: "Step →", play: "▶ Play", reset: "↻ Reset",
      hidden: "Hidden state hₜ (memory)", reading: "Reading", processed: "processed",
      sentiment: "Running sentiment interpretation",
      pos: "Positive", neg: "Negative", neutral: "Neutral",
      note: "Because it processes sequentially, an RNN is great for context & order (translation, time series), but it's slow and can 'forget' far-away context. Transformers/attention later fixed this.",
    },
  }[lang];

  const cellColor = (v) => {
    const a = Math.min(1, Math.abs(v));
    return v >= 0 ? `rgba(0,147,208,${0.15 + a * 0.7})` : `rgba(245,162,0,${0.15 + a * 0.7})`;
  };
  const label = sentiment > 0.25 ? L.pos : sentiment < -0.25 ? L.neg : L.neutral;
  const labelColor = sentiment > 0.25 ? "#16a34a" : sentiment < -0.25 ? "#dc2626" : "#64748b";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">{L.sentence}</label>
        <button onClick={() => { setText(SAMPLE[lang]); reset(); }} className="text-xs font-semibold text-brand-600 hover:underline">{L.sample}</button>
      </div>
      <input value={text} onChange={(e) => { setText(e.target.value); reset(); }} className="mt-1 w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-brand-500 focus:outline-none" />

      {/* token strip */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tokens.map((tok, i) => {
          const processed = i < step;
          const reading = i === step - 1;
          return (
            <span key={i} className={`rounded-md px-2 py-1 text-sm transition ${reading ? "bg-brand-600 text-white" : processed ? "bg-brand-100 text-brand-800" : "bg-slate-100 text-slate-400"}`}>
              {tok}
            </span>
          );
        })}
      </div>

      {/* hidden state cells */}
      <div className="mt-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{L.hidden}</p>
        <div className="flex gap-1.5">
          {curH.map((v, i) => (
            <div key={i} className="flex h-12 w-14 flex-col items-center justify-center rounded-lg border border-slate-200 text-xs font-mono" style={{ backgroundColor: cellColor(v) }}>
              <span className="text-[9px] text-slate-500">h{i}</span>
              <span className="font-bold text-slate-800">{v.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* running sentiment */}
      <div className="mt-4 rounded-lg bg-slate-50 p-3 text-center">
        <div className="text-xs text-slate-500">{L.sentiment} ({step}/{tokens.length} {L.processed})</div>
        <div className="text-2xl font-black" style={{ color: labelColor }}>{label}</div>
        <div className="mx-auto mt-1 h-2 w-40 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full" style={{ marginLeft: `${(sentiment < 0 ? 50 + sentiment * 50 : 50)}%`, width: `${Math.abs(sentiment) * 50}%`, backgroundColor: labelColor }} />
        </div>
      </div>

      {/* controls */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setStep((s) => Math.min(tokens.length, s + 1))} disabled={step >= tokens.length} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40">{L.step}</button>
        <button onClick={play} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">{L.play}</button>
        <button onClick={reset} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">{L.reset}</button>
      </div>

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
