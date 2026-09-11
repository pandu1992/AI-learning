"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";

export default function Quiz({ questions }) {
  const { lang } = useLang();
  const [answers, setAnswers] = useState({}); // index -> selected option
  const [submitted, setSubmitted] = useState(false);

  const L = {
    id: {
      title: "Kuis Singkat",
      sub: "Cek pemahamanmu. Pilih satu jawaban tiap soal.",
      check: "Periksa Jawaban",
      retry: "Ulangi",
      score: "Skor",
      correct: "Benar",
      yourAns: "Jawabanmu",
      pickAll: "Jawab semua soal dulu ya.",
    },
    en: {
      title: "Quick Quiz",
      sub: "Check your understanding. Pick one answer per question.",
      check: "Check Answers",
      retry: "Retry",
      score: "Score",
      correct: "Correct",
      yourAns: "Your answer",
      pickAll: "Please answer all questions first.",
    },
  }[lang];

  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce(
    (s, q, i) => s + (answers[i] === q.answer ? 1 : 0),
    0
  );

  const select = (qi, oi) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qi]: oi }));
  };

  return (
    <div className="rounded-2xl border border-brand-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">📝 {L.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{L.sub}</p>

      {submitted && (
        <div
          className={`mt-4 rounded-lg p-3 text-center font-semibold ${
            score === total ? "bg-green-100 text-green-700" : "bg-brand-50 text-brand-700"
          }`}
        >
          {L.score}: {score} / {total} {score === total ? "🎉" : ""}
        </div>
      )}

      <div className="mt-4 space-y-6">
        {questions.map((q, qi) => {
          const selected = answers[qi];
          return (
            <div key={qi}>
              <p className="font-medium text-slate-800">
                {qi + 1}. {q.q}
              </p>
              <div className="mt-2 space-y-2">
                {q.options.map((opt, oi) => {
                  const isSelected = selected === oi;
                  const isAnswer = q.answer === oi;
                  let cls =
                    "border-slate-200 bg-white hover:border-brand-300 text-slate-700";
                  if (submitted) {
                    if (isAnswer) cls = "border-green-400 bg-green-50 text-green-800";
                    else if (isSelected && !isAnswer)
                      cls = "border-red-400 bg-red-50 text-red-800";
                    else cls = "border-slate-200 bg-white text-slate-500";
                  } else if (isSelected) {
                    cls = "border-brand-500 bg-brand-50 text-brand-800";
                  }
                  return (
                    <button
                      key={oi}
                      onClick={() => select(qi, oi)}
                      disabled={submitted}
                      className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${cls}`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold">
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span>{opt}</span>
                      {submitted && isAnswer && <span className="ml-auto">✓</span>}
                      {submitted && isSelected && !isAnswer && (
                        <span className="ml-auto">✗</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {submitted && q.explain && (
                <p className="mt-2 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-600">
                  💡 {q.explain}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-3">
        {!submitted ? (
          <button
            onClick={() => answeredCount === total && setSubmitted(true)}
            disabled={answeredCount < total}
            className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {L.check}
          </button>
        ) : (
          <button
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
            }}
            className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {L.retry}
          </button>
        )}
        {!submitted && answeredCount < total && (
          <span className="text-xs text-slate-400">{L.pickAll}</span>
        )}
      </div>
    </div>
  );
}
