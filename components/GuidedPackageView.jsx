"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "./LanguageProvider";
import PageHero from "./PageHero";
import Formula from "./Formula";
import Quiz from "./Quiz";
import CaseViz from "./caseviz/CaseViz";
import { demoComponents } from "./demoComponents";
import { getDemoMath } from "@/lib/demoMath";
import { topics } from "@/lib/content";

// Stepper mini-lesson: Knowledge -> Case Study -> Quiz.
// `pkg` is a guided package; `topic` is the parent topic slug.
export default function GuidedPackageView({ pkg, topic }) {
  const { lang } = useLang();
  const [step, setStep] = useState(0);
  const data = pkg[lang];

  const topicMeta = topics.find((t) => t.slug === topic);
  const Demo = pkg.demoSlug ? demoComponents[pkg.demoSlug] : null;
  const math = pkg.mathSlug ? getDemoMath(pkg.mathSlug)?.[lang] : null;

  const L = {
    id: {
      steps: ["Pengetahuan", "Studi Kasus", "Kuis"],
      next: "Lanjut", prev: "Kembali",
      keyPoints: "Poin penting", formulas: "Rumus", symbols: "Keterangan simbol",
      tryDemo: "Coba demo interaktif", takeaway: "Inti pelajaran",
      backToList: "← Semua paket", startQuiz: "Mulai kuis",
      intro: "Ikuti tiga langkah: pahami teorinya, lihat penerapannya, lalu uji dirimu.",
    },
    en: {
      steps: ["Knowledge", "Case Study", "Quiz"],
      next: "Next", prev: "Back",
      keyPoints: "Key points", formulas: "Formulas", symbols: "Symbol glossary",
      tryDemo: "Try the interactive demo", takeaway: "Key takeaway",
      backToList: "← All packages", startQuiz: "Start the quiz",
      intro: "Follow three steps: understand the theory, see it applied, then test yourself.",
    },
  }[lang];

  return (
    <div>
      <PageHero icon={pkg.icon} title={data.title} subtitle={data.subtitle} />

      <div className="mx-auto max-w-3xl px-4 py-10">
        {topicMeta && (
          <p className="mb-4 text-sm text-slate-500">
            {lang === "id" ? "Bagian dari" : "Part of"}{" "}
            <Link href={`/topics/${topic}`} className="font-semibold text-brand-600 hover:underline">
              {topicMeta.icon} {topicMeta[lang].title}
            </Link>
          </p>
        )}

        {/* Stepper header */}
        <div className="mb-8 flex items-center">
          {L.steps.map((label, i) => (
            <div key={i} className="flex flex-1 items-center last:flex-none">
              <button
                onClick={() => setStep(i)}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                  i === step ? "bg-brand-600 text-white" : i < step ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-500"
                }`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-xs">
                  {i < step ? "✓" : i + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
              {i < L.steps.length - 1 && (
                <div className={`mx-1 h-0.5 flex-1 ${i < step ? "bg-brand-400" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* STEP 0: Knowledge */}
        {step === 0 && (
          <section className="space-y-6">
            <div className="prose-content">
              {data.knowledge.paragraphs.map((p, i) => (
                <p key={i} className="text-slate-700">{p}</p>
              ))}
            </div>

            {data.knowledge.keyPoints?.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-2 text-sm font-bold text-slate-700">📌 {L.keyPoints}</p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {data.knowledge.keyPoints.map((k, i) => <li key={i}>{k}</li>)}
                </ul>
              </div>
            )}

            {/* Interactive demo (reused) */}
            {Demo && (
              <div>
                <p className="mb-2 text-sm font-bold text-slate-700">🧪 {L.tryDemo}</p>
                <Demo />
              </div>
            )}

            {/* Optional inline viz (reused CaseViz) */}
            {pkg.viz && <CaseViz spec={pkg.viz} />}

            {/* Formulas (reused KaTeX) */}
            {math?.formulas?.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-bold text-slate-700">📐 {L.formulas}</p>
                <div className="space-y-3">
                  {math.formulas.map((f, i) => (
                    <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="overflow-x-auto py-1"><Formula tex={f.tex} display /></div>
                      {f.caption && <p className="mt-2 text-center text-sm text-slate-500">{f.caption}</p>}
                    </div>
                  ))}
                </div>
                {math.symbols?.length > 0 && (
                  <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {math.symbols.map((s, i) => (
                      <div key={i} className="flex items-baseline gap-2 rounded-lg bg-slate-50 px-3 py-2">
                        <dt className="shrink-0"><Formula tex={s.sym} display={false} /></dt>
                        <dd className="text-sm text-slate-600">— {s.meaning}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            )}
          </section>
        )}

        {/* STEP 1: Case study */}
        {step === 1 && (
          <section>
            <h2 className="text-xl font-bold text-slate-900">🌍 {data.caseStudy.title}</h2>
            <div className="prose-content mt-3">
              {data.caseStudy.scenario.map((p, i) => (
                <p key={i} className="text-slate-700">{p}</p>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-4">
              <p className="text-sm text-brand-800">
                <span className="font-semibold">💡 {L.takeaway}: </span>{data.caseStudy.takeaway}
              </p>
            </div>
          </section>
        )}

        {/* STEP 2: Quiz */}
        {step === 2 && (
          <section>
            <Quiz questions={data.questions} />
          </section>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
          >
            {L.prev}
          </button>

          {step < 2 ? (
            <button
              onClick={() => setStep((s) => Math.min(2, s + 1))}
              className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {step === 1 ? L.startQuiz : L.next} →
            </button>
          ) : (
            <Link
              href={`/topics/${topic}/quiz`}
              className="rounded-lg border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              {L.backToList}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
