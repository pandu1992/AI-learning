"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import ImmersiveHero from "@/components/immersive/ImmersiveHero";
import ComparePanel from "@/components/compare/ComparePanel";
import { getTheme } from "@/lib/immersiveThemes";
import { CLASSIFIERS, DATASETS, makeDataset } from "@/lib/compareModels";

// Side-by-side decision-boundary comparison: pick a dataset + two algorithms and
// see how each carves up the SAME data. Answers the classic "so what's the
// difference?" question that a single demo can't.

export default function ComparePage() {
  const { lang } = useLang();
  const [dataset, setDataset] = useState("moons");
  const [left, setLeft] = useState("linear");
  const [right, setRight] = useState("knn");
  const [seed, setSeed] = useState(42);

  const labels = {
    id: {
      title: "Bandingkan Algoritma",
      sub: "Pilih dataset & dua algoritma, lalu lihat bagaimana masing-masing membentuk batas keputusan pada data yang sama.",
      dataset: "Dataset",
      pickA: "Algoritma kiri",
      pickB: "Algoritma kanan",
      reshuffle: "🎲 Acak ulang data",
      tip: "Tip: coba dataset 'dua bulan sabit' dengan Linear di kiri dan k-NN di kanan untuk melihat kelemahan model linear pada pola non-linear.",
    },
    en: {
      title: "Compare Algorithms",
      sub: "Pick a dataset & two algorithms, then see how each forms its decision boundary on the same data.",
      dataset: "Dataset",
      pickA: "Left algorithm",
      pickB: "Right algorithm",
      reshuffle: "🎲 Reshuffle data",
      tip: "Tip: try the 'two moons' dataset with Linear on the left and k-NN on the right to see the linear model's weakness on non-linear patterns.",
    },
  }[lang];

  const theme = getTheme("demos");
  const points = useMemo(() => makeDataset(dataset, 80, seed), [dataset, seed]);

  const clfOptions = Object.values(CLASSIFIERS);

  return (
    <div>
      <ImmersiveHero
        theme={theme}
        icon="⚖️"
        title={labels.title}
        subtitle={labels.sub}
        eyebrow={theme.eyebrow[lang]}
      />
      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* controls */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Field label={labels.dataset}>
            <select value={dataset} onChange={(e) => setDataset(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              {Object.entries(DATASETS).map(([k, v]) => (
                <option key={k} value={k}>{(v[lang] || v.en).name}</option>
              ))}
            </select>
          </Field>
          <Field label={labels.pickA}>
            <select value={left} onChange={(e) => setLeft(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              {clfOptions.map((c) => <option key={c.key} value={c.key}>{(c[lang] || c.en).name}</option>)}
            </select>
          </Field>
          <Field label={labels.pickB}>
            <select value={right} onChange={(e) => setRight(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              {clfOptions.map((c) => <option key={c.key} value={c.key}>{(c[lang] || c.en).name}</option>)}
            </select>
          </Field>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {labels.reshuffle}
          </button>
        </div>

        {/* panels */}
        <div className="grid gap-5 md:grid-cols-2">
          <ComparePanel clf={CLASSIFIERS[left]} points={points} />
          <ComparePanel clf={CLASSIFIERS[right]} points={points} />
        </div>

        <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
          💡 {labels.tip}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-500">{label}</span>
      {children}
    </label>
  );
}
