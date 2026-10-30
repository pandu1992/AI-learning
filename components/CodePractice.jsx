"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { getCodePractice } from "@/lib/codePractice";

// "Implement it in code" exercise for a demo. Shows a short, real-library code
// snippet with ONE key line blanked out (▢▢▢), then multiple-choice options for
// that line. Clicking an option reveals whether it's correct, highlights the
// right one, and shows an explanation. Teaches students the actual API call to
// build/train/use the model. Data per demo lives in lib/codePractice.js.
//
// Shape (per slug, per lang):
//   {
//     lib: "scikit-learn",            // library badge
//     intro: "…",                     // one-line context
//     before: ["line", "line"],       // code lines shown before the blank
//     after:  ["line", "line"],       // code lines shown after the blank
//     options: ["...", "..."],        // candidate lines for the blank
//     answer: 0,                       // index of the correct option
//     explain: "why",                 // shown after answering
//   }
export default function CodePractice({ slug }) {
  const { lang } = useLang();
  const data = getCodePractice(slug);
  const [picked, setPicked] = useState(null);

  if (!data) return null;
  const d = data[lang];
  if (!d) return null;

  const L = {
    id: { title: "Implementasi Kode", pick: "Pilih baris kode yang tepat untuk mengisi bagian ▢:", lib: "Library", correct: "Benar!", wrong: "Belum tepat", retry: "Coba lagi" },
    en: { title: "Code Implementation", pick: "Pick the right line of code to fill the ▢ part:", lib: "Library", correct: "Correct!", wrong: "Not quite", retry: "Try again" },
  }[lang];

  const answered = picked !== null;
  const isRight = picked === d.answer;
  const blankText = answered ? d.options[d.answer] : "▢ ▢ ▢";

  return (
    <section className="mt-10">
      <h2 className="mb-3 text-xl font-bold text-slate-900">💻 {L.title}</h2>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white">{L.lib}: {d.lib}</span>
          <p className="text-sm text-slate-600">{d.intro}</p>
        </div>

        {/* code block */}
        <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-[13px] leading-6 text-slate-100">
          <code>
            {d.before.map((line, i) => (
              <div key={`b${i}`}><span className="text-slate-500 select-none">{String(i + 1).padStart(2, " ")}  </span><span className="whitespace-pre">{line}</span></div>
            ))}
            <div className={`-mx-1 rounded px-1 ${answered ? (isRight ? "bg-green-500/20" : "bg-red-500/20") : "bg-amber-400/15"}`}>
              <span className="text-slate-500 select-none">{String(d.before.length + 1).padStart(2, " ")}  </span>
              <span className={`whitespace-pre font-bold ${answered ? (isRight ? "text-green-300" : "text-red-300") : "text-amber-300"}`}>{blankText}</span>
            </div>
            {d.after.map((line, i) => (
              <div key={`a${i}`}><span className="text-slate-500 select-none">{String(d.before.length + 2 + i).padStart(2, " ")}  </span><span className="whitespace-pre">{line}</span></div>
            ))}
          </code>
        </pre>

        {/* prompt + options */}
        <p className="mt-4 text-sm font-semibold text-slate-700">{L.pick}</p>
        <div className="mt-2 space-y-2">
          {d.options.map((opt, oi) => {
            const isAnswer = oi === d.answer;
            let cls = "border-slate-200 bg-white hover:border-brand-300 text-slate-700";
            if (answered) {
              if (isAnswer) cls = "border-green-400 bg-green-50 text-green-800";
              else if (oi === picked) cls = "border-red-400 bg-red-50 text-red-800";
              else cls = "border-slate-200 bg-white text-slate-400";
            }
            return (
              <button
                key={oi}
                onClick={() => setPicked(picked === null ? oi : picked)}
                disabled={answered}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left font-mono text-[13px] transition ${cls}`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold">
                  {String.fromCharCode(65 + oi)}
                </span>
                <span className="whitespace-pre-wrap">{opt}</span>
                {answered && isAnswer && <span className="ml-auto">✓</span>}
                {answered && oi === picked && !isAnswer && <span className="ml-auto">✗</span>}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`mt-4 rounded-lg p-3 text-sm ${isRight ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-900"}`}>
            <p className="font-bold">{isRight ? `✅ ${L.correct}` : `💡 ${L.wrong}`}</p>
            <p className="mt-1">{d.explain}</p>
            <button
              onClick={() => setPicked(null)}
              className="mt-3 rounded-lg border border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              ↺ {L.retry}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
