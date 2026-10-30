"use client";

import { useLang } from "@/components/LanguageProvider";
import FormulaWithNotation from "@/components/FormulaWithNotation";
import { METRICS, GROUPS } from "@/lib/metricsData";

// A printable, all-on-one-page evaluation-metrics cheat sheet. Shows every
// group (regression, classification, clustering, dim-reduction) at once with
// formulas + which algorithms use them. A print button triggers window.print();
// print CSS (globals) hides the site chrome so only the sheet prints.

export default function CheatSheetPage() {
  const { lang } = useLang();

  const L = {
    id: {
      title: "Cheat Sheet Metrik Evaluasi",
      sub: "Ringkasan satu halaman: metrik evaluasi mana untuk tugas & algoritma apa. Cocok dicetak atau disimpan sebagai PDF.",
      print: "🖨️ Cetak / Simpan PDF",
      algos: "Algoritma umum",
      metrics: "Metrik yang cocok",
      footer: "Cognia — Platform Belajar AI interaktif",
    },
    en: {
      title: "Evaluation Metrics Cheat Sheet",
      sub: "A one-page summary: which evaluation metric for which task & algorithm. Great to print or save as PDF.",
      print: "🖨️ Print / Save PDF",
      algos: "Common algorithms",
      metrics: "Suitable metrics",
      footer: "Cognia — Interactive AI Learning Platform",
    },
  }[lang];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* header (hidden on print) */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">📋 {L.title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">{L.sub}</p>
        </div>
        <button
          onClick={() => window.print()}
          className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          {L.print}
        </button>
      </div>

      {/* print-only title */}
      <div className="hidden print:mb-4 print:block">
        <h1 className="text-xl font-bold text-black">{L.title}</h1>
      </div>

      {/* the sheet */}
      <div id="cheat-sheet" className="space-y-5">
        {GROUPS.map((g) => {
          const meta = g[lang];
          return (
            <section
              key={g.key}
              className="break-inside-avoid rounded-2xl border border-slate-200 bg-white p-5 shadow-sm print:border-slate-400 print:shadow-none"
            >
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="text-xl">{meta.icon}</span>
                {meta.group}
              </h2>
              <p className="mt-1 text-sm text-slate-500 print:text-slate-700">{meta.note}</p>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-bold text-slate-700">🧩 {L.algos}</p>
                  <div className="flex flex-wrap gap-2">
                    {g.algos[lang].map((a, i) => (
                      <span key={i} className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">{a}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-bold text-slate-700">📐 {L.metrics}</p>
                  <div className="space-y-2">
                    {g.metrics.map((mk) => {
                      const m = METRICS[mk];
                      return (
                        <div key={mk} className="rounded-lg border border-slate-200 bg-white p-3">
                          <span className="text-sm font-bold text-brand-700">{m.name}</span>
                          <div className="mt-1 overflow-x-auto">
                            <FormulaWithNotation tex={m.tex} display={false} compact />
                          </div>
                          <p className="mt-1 text-xs text-slate-500 print:text-slate-700">{m[lang]}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <p className="pt-2 text-center text-xs text-slate-400">{L.footer}</p>
      </div>
    </div>
  );
}
