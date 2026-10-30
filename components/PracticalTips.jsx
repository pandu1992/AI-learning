"use client";

import { useLang } from "./LanguageProvider";
import { getPracticalTips } from "@/lib/practicalTips";

// "Practical tips" section for a demo: when to use the algorithm, when to avoid
// it (and what to reach for instead), and the common mistakes students make.
// Answers the *when* and *what-goes-wrong* questions that math + code don't.
// Data per demo lives in lib/practicalTips.js.
export default function PracticalTips({ slug }) {
  const { lang } = useLang();
  const data = getPracticalTips(slug);
  if (!data) return null;
  const d = data[lang];
  if (!d) return null;

  const L = {
    id: { title: "Tips Praktis", useWhen: "Cocok dipakai saat", avoidWhen: "Hindari / pertimbangkan alternatif saat", mistakes: "Kesalahan umum", fix: "Solusi" },
    en: { title: "Practical Tips", useWhen: "Good fit when", avoidWhen: "Avoid / consider alternatives when", mistakes: "Common mistakes", fix: "Fix" },
  }[lang];

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-bold text-slate-900">🧭 {L.title}</h2>

      {/* When to use / when to avoid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold text-green-800">✅ {L.useWhen}</p>
          <ul className="space-y-1.5">
            {d.useWhen.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-green-900">
                <span className="mt-0.5 shrink-0 text-green-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-800">⚠️ {L.avoidWhen}</p>
          <ul className="space-y-1.5">
            {d.avoidWhen.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-amber-900">
                <span className="mt-0.5 shrink-0 text-amber-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Common mistakes */}
      {d.mistakes?.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold text-slate-700">🚫 {L.mistakes}</p>
          <ul className="space-y-2">
            {d.mistakes.map((m, i) => (
              <li key={i} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-sm font-semibold text-red-700">✗ {m.bad}</p>
                <p className="mt-1 text-sm text-slate-600">
                  <span className="font-semibold text-brand-600">→ {L.fix}: </span>
                  {m.fix}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
