"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import ImmersiveHero from "@/components/immersive/ImmersiveHero";
import { getTheme } from "@/lib/immersiveThemes";

// Interactive Confusion Matrix explorer. Students adjust TP/FP/FN/TN and watch
// accuracy, precision, recall, F1, and specificity recompute live — building
// intuition for WHY accuracy misleads on imbalanced data. Pure client-side.

export default function ConfusionMatrixPage() {
  const { lang } = useLang();
  const [tp, setTp] = useState(70);
  const [fp, setFp] = useState(10);
  const [fn, setFn] = useState(20);
  const [tn, setTn] = useState(900);

  const L = {
    id: {
      title: "Confusion Matrix Explorer",
      sub: "Geser nilai TP, FP, FN, TN dan lihat metrik dihitung ulang langsung. Pahami kenapa akurasi bisa menyesatkan.",
      actualPos: "Aktual Positif", actualNeg: "Aktual Negatif",
      predPos: "Prediksi Positif", predNeg: "Prediksi Negatif",
      tp: "True Positive (TP)", fp: "False Positive (FP)", fn: "False Negative (FN)", tn: "True Negative (TN)",
      preset: "Contoh kasus", presetBalanced: "Seimbang", presetImbalanced: "Timpang (deteksi penyakit langka)", presetSpam: "Filter spam",
      metrics: "Metrik", insight: "Wawasan",
      insightImbalanced: "Perhatikan: akurasi tinggi (≥90%) tapi recall rendah — model melewatkan banyak kasus positif. Inilah jebakan data timpang!",
      insightOk: "Metrik seimbang. Untuk kasus nyata, tentukan metrik prioritas sesuai biaya kesalahan (FP vs FN).",
      defs: {
        accuracy: "Proporsi semua prediksi yang benar.",
        precision: "Dari yang diprediksi positif, berapa yang benar.",
        recall: "Dari semua positif nyata, berapa yang tertangkap.",
        f1: "Rata-rata harmonik precision & recall.",
        specificity: "Dari semua negatif nyata, berapa yang benar ditolak.",
      },
    },
    en: {
      title: "Confusion Matrix Explorer",
      sub: "Adjust TP, FP, FN, TN and watch the metrics recompute live. Understand why accuracy can mislead.",
      actualPos: "Actual Positive", actualNeg: "Actual Negative",
      predPos: "Predicted Positive", predNeg: "Predicted Negative",
      tp: "True Positive (TP)", fp: "False Positive (FP)", fn: "False Negative (FN)", tn: "True Negative (TN)",
      preset: "Example case", presetBalanced: "Balanced", presetImbalanced: "Imbalanced (rare disease)", presetSpam: "Spam filter",
      metrics: "Metrics", insight: "Insight",
      insightImbalanced: "Notice: high accuracy (≥90%) but low recall — the model misses many positives. That's the imbalanced-data trap!",
      insightOk: "Metrics are balanced. For a real case, pick the priority metric based on the cost of errors (FP vs FN).",
      defs: {
        accuracy: "Fraction of all predictions that are correct.",
        precision: "Of those predicted positive, how many are right.",
        recall: "Of all true positives, how many were caught.",
        f1: "Harmonic mean of precision & recall.",
        specificity: "Of all true negatives, how many correctly rejected.",
      },
    },
  }[lang];

  const theme = getTheme("demos");
  const total = tp + fp + fn + tn || 1;
  const accuracy = (tp + tn) / total;
  const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
  const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
  const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;
  const specificity = tn + fp > 0 ? tn / (tn + fp) : 0;

  const pct = (v) => `${(v * 100).toFixed(1)}%`;
  const imbalanced = accuracy >= 0.9 && recall < 0.6;

  const presets = {
    balanced: { tp: 80, fp: 20, fn: 20, tn: 80 },
    imbalanced: { tp: 15, fp: 5, fn: 30, tn: 950 },
    spam: { tp: 180, fp: 8, fn: 25, tn: 787 },
  };
  const applyPreset = (p) => { const v = presets[p]; setTp(v.tp); setFp(v.fp); setFn(v.fn); setTn(v.tn); };

  const metrics = [
    { key: "accuracy", name: "Accuracy", value: accuracy, color: "bg-slate-500" },
    { key: "precision", name: "Precision", value: precision, color: "bg-sky-500" },
    { key: "recall", name: "Recall", value: recall, color: "bg-emerald-500" },
    { key: "f1", name: "F1 Score", value: f1, color: "bg-violet-500" },
    { key: "specificity", name: "Specificity", value: specificity, color: "bg-amber-500" },
  ];

  const Cell = ({ label, value, setValue, tone }) => (
    <div className={`rounded-xl border p-4 ${tone}`}>
      <p className="text-xs font-bold uppercase tracking-wide opacity-70">{label}</p>
      <p className="mt-1 text-3xl font-extrabold tabular-nums">{value}</p>
      <input type="range" min={0} max={1000} value={value} onChange={(e) => setValue(Number(e.target.value))} className="mt-2 w-full accent-current" />
    </div>
  );

  return (
    <div>
      <ImmersiveHero theme={theme} icon="🧮" title={L.title} subtitle={L.sub} eyebrow={theme.eyebrow[lang]} />
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* presets */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-slate-500">{L.preset}:</span>
          <button onClick={() => applyPreset("balanced")} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200">{L.presetBalanced}</button>
          <button onClick={() => applyPreset("imbalanced")} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200">{L.presetImbalanced}</button>
          <button onClick={() => applyPreset("spam")} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200">{L.presetSpam}</button>
        </div>

        {/* matrix */}
        <div className="grid grid-cols-[auto_1fr_1fr] gap-2 text-center">
          <div />
          <div className="flex items-end justify-center pb-1 text-xs font-bold text-slate-500">{L.predPos}</div>
          <div className="flex items-end justify-center pb-1 text-xs font-bold text-slate-500">{L.predNeg}</div>

          <div className="flex items-center justify-end pr-1 text-xs font-bold text-slate-500 [writing-mode:vertical-rl] rotate-180">{L.actualPos}</div>
          <Cell label={L.tp} value={tp} setValue={setTp} tone="border-emerald-200 bg-emerald-50 text-emerald-800" />
          <Cell label={L.fn} value={fn} setValue={setFn} tone="border-red-200 bg-red-50 text-red-800" />

          <div className="flex items-center justify-end pr-1 text-xs font-bold text-slate-500 [writing-mode:vertical-rl] rotate-180">{L.actualNeg}</div>
          <Cell label={L.fp} value={fp} setValue={setFp} tone="border-amber-200 bg-amber-50 text-amber-800" />
          <Cell label={L.tn} value={tn} setValue={setTn} tone="border-sky-200 bg-sky-50 text-sky-800" />
        </div>

        {/* metrics */}
        <h2 className="mb-4 mt-10 text-xl font-bold text-slate-900">📐 {L.metrics}</h2>
        <div className="space-y-3">
          {metrics.map((m) => (
            <div key={m.key} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="font-bold text-slate-800">{m.name}</span>
                <span className="font-mono text-lg font-bold text-slate-900">{pct(m.value)}</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full transition-all ${m.color}`} style={{ width: pct(m.value) }} />
              </div>
              <p className="mt-1.5 text-xs text-slate-500">{L.defs[m.key]}</p>
            </div>
          ))}
        </div>

        {/* insight */}
        <div className={`mt-6 rounded-xl border p-4 text-sm ${imbalanced ? "border-amber-300 bg-amber-50 text-amber-900" : "border-brand-200 bg-brand-50 text-brand-800"}`}>
          <p className="font-bold">💡 {L.insight}</p>
          <p className="mt-1">{imbalanced ? L.insightImbalanced : L.insightOk}</p>
        </div>
      </div>
    </div>
  );
}
