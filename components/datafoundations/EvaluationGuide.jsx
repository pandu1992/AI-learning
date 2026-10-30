"use client";

import { useState } from "react";
import { useLang } from "../LanguageProvider";
import FormulaWithNotation from "../FormulaWithNotation";
import { METRICS, GROUPS } from "@/lib/metricsData";

// A reference "which algorithm → which evaluation metric" guide, grouped by
// learning type and task. Complements the interactive EvaluationMetrics above:
// that one lets you play with the math; this one answers "for THIS algorithm,
// what should I measure?". Bilingual, with the key metrics' formulas.
// Metric/group data is shared via lib/metricsData.js (also used by /cheat-sheet).

export default function EvaluationGuide() {
  const { lang } = useLang();
  const [open, setOpen] = useState("reg");

  const L = {
    id: {
      intro: "Metrik evaluasi BERBEDA tergantung jenis tugas. Pilih kelompok untuk melihat algoritma mana memakai metrik apa — lengkap dengan rumusnya.",
      algos: "Algoritma umum", metrics: "Metrik yang cocok",
    },
    en: {
      intro: "Evaluation metrics DIFFER by task type. Pick a group to see which algorithms use which metrics — with their formulas.",
      algos: "Common algorithms", metrics: "Suitable metrics",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.intro}</p>

      {/* group selector */}
      <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {GROUPS.map((g) => {
          const meta = g[lang];
          const active = open === g.key;
          return (
            <button
              key={g.key}
              onClick={() => setOpen(g.key)}
              className={`rounded-xl border p-3 text-left transition ${active ? "border-brand-500 bg-brand-50" : "border-slate-200 hover:border-brand-300"}`}
            >
              <div className="text-xl">{meta.icon}</div>
              <div className={`mt-1 text-sm font-bold ${active ? "text-brand-700" : "text-slate-800"}`}>{meta.group}</div>
            </button>
          );
        })}
      </div>

      {/* selected group detail */}
      {GROUPS.filter((g) => g.key === open).map((g) => {
        const meta = g[lang];
        return (
          <div key={g.key} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="text-sm text-slate-600">{meta.note}</p>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {/* algorithms */}
              <div>
                <p className="mb-2 text-sm font-bold text-slate-700">🧩 {L.algos}</p>
                <div className="flex flex-wrap gap-2">
                  {g.algos[lang].map((a, i) => (
                    <span key={i} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">{a}</span>
                  ))}
                </div>
              </div>

              {/* metrics with formulas */}
              <div>
                <p className="mb-2 text-sm font-bold text-slate-700">📐 {L.metrics}</p>
                <div className="space-y-2">
                  {g.metrics.map((mk) => {
                    const m = METRICS[mk];
                    return (
                      <div key={mk} className="rounded-lg border border-slate-200 bg-white p-3">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-bold text-brand-700">{m.name}</span>
                        </div>
                        <div className="mt-1 overflow-x-auto">
                          <FormulaWithNotation tex={m.tex} display={false} compact />
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{m[lang]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
