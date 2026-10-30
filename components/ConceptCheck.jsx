"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { getConceptCheck } from "@/lib/conceptCheck";

// A single quick "concept check" question for a demo — tests the WHY/intuition,
// distinct from CodePractice (which tests the library API). Click an option to
// reveal whether it's right plus a short explanation. Data per demo lives in
// lib/conceptCheck.js. Shape (per lang): { q, options[], answer, explain }.
export default function ConceptCheck({ slug }) {
  const { lang } = useLang();
  const data = getConceptCheck(slug);
  const [picked, setPicked] = useState(null);

  if (!data) return null;
  const d = data[lang];
  if (!d) return null;

  const L = {
    id: { title: "Cek Pemahaman", correct: "Tepat!", wrong: "Belum tepat", retry: "Coba lagi" },
    en: { title: "Concept Check", correct: "Correct!", wrong: "Not quite", retry: "Try again" },
  }[lang];

  const answered = picked !== null;
  const isRight = picked === d.answer;

  return (
    <section className="mt-10">
      <h2 className="mb-3 text-xl font-bold text-slate-900">❓ {L.title}</h2>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="font-semibold text-slate-800">{d.q}</p>

        <div className="mt-3 space-y-2">
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
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition ${cls}`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold">
                  {String.fromCharCode(65 + oi)}
                </span>
                <span>{opt}</span>
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
