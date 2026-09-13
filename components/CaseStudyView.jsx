"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import PageHero from "./PageHero";
import CaseViz from "./caseviz/CaseViz";

// Renders a single case study (new shape: { slug, icon, id, en, visualization, analysisViz }).
// `field` is the parent field slug for breadcrumbs.
export default function CaseStudyView({ study, field }) {
  const { lang } = useLang();
  const data = study[lang];
  const c = data.company;

  const labels = {
    id: {
      back: "← Kembali ke daftar",
      snapshot: "Profil Organisasi",
      industry: "Industri", location: "Lokasi", size: "Ukuran",
      impact: "Visualisasi Dampak",
      techniques: "Teknik AI yang Digunakan",
      analysis: "Analisis: Cara Kerja Algoritma",
      results: "Hasil", lessons: "Pelajaran Utama",
      questions: "Pertanyaan Diskusi", questionsSub: "Untuk didiskusikan di kelas.",
      note: "Studi kasus naratif bergaya business case (konteks Indonesia). Nama organisasi bersifat ilustratif untuk tujuan pembelajaran.",
    },
    en: {
      back: "← Back to list",
      snapshot: "Company Snapshot",
      industry: "Industry", location: "Location", size: "Size",
      impact: "Impact Visualization",
      techniques: "AI Techniques Used",
      analysis: "Analysis: How the Algorithm Works",
      results: "Results", lessons: "Key Lessons",
      questions: "Discussion Questions", questionsSub: "For classroom discussion.",
      note: "A narrative, business-case-style study (Indonesian context). Organization names are illustrative for learning purposes.",
    },
  }[lang];

  return (
    <div>
      <PageHero icon={study.icon} title={data.title} subtitle={data.subtitle} />
      <article className="mx-auto max-w-3xl px-4 py-12">
        {/* Company snapshot */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-600">{labels.snapshot}</p>
          <h2 className="mt-1 text-lg font-bold text-slate-900">{c.name}</h2>
          <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
            <div><dt className="text-slate-500">{labels.industry}</dt><dd className="font-medium text-slate-800">{c.industry}</dd></div>
            <div><dt className="text-slate-500">{labels.location}</dt><dd className="font-medium text-slate-800">{c.location}</dd></div>
            <div><dt className="text-slate-500">{labels.size}</dt><dd className="font-medium text-slate-800">{c.size}</dd></div>
          </dl>
        </div>

        {/* Protagonist quote */}
        {data.protagonist && (
          <blockquote className="my-8 border-l-4 border-brand-400 bg-white pl-5">
            <p className="text-lg italic text-slate-700">&ldquo;{data.protagonist.quote}&rdquo;</p>
            <footer className="mt-2 text-sm font-semibold text-slate-500">
              — {data.protagonist.name}, {data.protagonist.role}
            </footer>
          </blockquote>
        )}

        {/* Narrative sections. Story viz after section 2; analysis viz after last section. */}
        <div className="prose-content">
          {data.sections.map((s, i) => (
            <div key={i}>
              <section className="mb-8">
                <h2 className="mb-3 text-xl font-bold text-slate-900">{s.heading}</h2>
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="text-slate-700">{p}</p>
                ))}
              </section>

              {/* Impact visualization right after the 2nd section (challenge) */}
              {i === 1 && study.visualization && (
                <div className="not-prose mb-8">
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-600">📊 {labels.impact}</h3>
                  <CaseViz spec={study.visualization} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Analysis: how the algorithm works */}
        {study.analysisViz && (
          <section className="my-8">
            <h2 className="mb-3 text-xl font-bold text-slate-900">🔬 {labels.analysis}</h2>
            <CaseViz spec={study.analysisViz} />
          </section>
        )}

        {/* Techniques */}
        <section className="my-8">
          <h2 className="mb-3 text-xl font-bold text-slate-900">🧠 {labels.techniques}</h2>
          <div className="space-y-2">
            {data.techniques.map((t, i) => (
              <div key={i} className="flex flex-wrap items-baseline gap-2 rounded-lg border border-slate-200 bg-white p-3">
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{t.name}</span>
                <span className="text-sm text-slate-600">{t.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        <section className="my-8 rounded-2xl border border-green-200 bg-green-50 p-5">
          <h2 className="mb-3 text-lg font-bold text-green-800">📈 {labels.results}</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-700">
            {data.results.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </section>

        {/* Lessons */}
        <section className="my-8">
          <h2 className="mb-3 text-xl font-bold text-slate-900">💡 {labels.lessons}</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-slate-700">
            {data.lessons.map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        </section>

        {/* Discussion questions */}
        <section className="my-8 rounded-2xl border border-brand-200 bg-brand-50 p-5">
          <h2 className="text-lg font-bold text-brand-800">❓ {labels.questions}</h2>
          <p className="mt-1 text-xs text-brand-700/80">{labels.questionsSub}</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            {data.questions.map((q, i) => <li key={i}>{q}</li>)}
          </ol>
        </section>

        <p className="mt-6 text-xs italic text-slate-400">{labels.note}</p>

        <div className="mt-8">
          <Link href={`/case-studies/${field}`} className="text-sm font-semibold text-brand-600 hover:underline">
            {labels.back}
          </Link>
        </div>
      </article>
    </div>
  );
}
