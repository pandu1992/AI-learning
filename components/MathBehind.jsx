"use client";

import { useLang } from "./LanguageProvider";
import Formula from "./Formula";
import { getDemoMath } from "@/lib/demoMath";

// Renders the "Math Behind the Algorithm" section for a demo:
// core formulas (KaTeX), a symbol glossary, and a one-line intuition.
export default function MathBehind({ slug }) {
  const { lang } = useLang();
  const math = getDemoMath(slug);
  if (!math) return null;
  const data = math[lang];
  if (!data) return null;

  const labels = {
    id: { title: "Matematika di Balik Algoritma", symbols: "Keterangan simbol", intuition: "Intuisi" },
    en: { title: "The Math Behind the Algorithm", symbols: "Symbol glossary", intuition: "Intuition" },
  }[lang];

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-bold text-slate-900">📐 {labels.title}</h2>

      {/* Formulas */}
      <div className="space-y-3">
        {data.formulas.map((f, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="overflow-x-auto py-1">
              <Formula tex={f.tex} display />
            </div>
            {f.caption && <p className="mt-2 text-center text-sm text-slate-500">{f.caption}</p>}
          </div>
        ))}
      </div>

      {/* Symbol glossary */}
      {data.symbols?.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold text-slate-700">{labels.symbols}</p>
          <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {data.symbols.map((s, i) => (
              <div key={i} className="flex items-baseline gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <dt className="shrink-0">
                  <Formula tex={s.sym} display={false} />
                </dt>
                <dd className="text-sm text-slate-600">— {s.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Intuition */}
      {data.intuition && (
        <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-4">
          <p className="text-sm text-brand-800">
            <span className="font-semibold">💡 {labels.intuition}: </span>
            {data.intuition}
          </p>
        </div>
      )}
    </section>
  );
}
