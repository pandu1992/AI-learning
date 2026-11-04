"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import ImmersiveHero from "@/components/immersive/ImmersiveHero";
import CodeBlock from "@/components/CodeBlock";
import BatikVisionLab from "@/components/batik/BatikVisionLab";
import BatikPrototypes from "@/components/batik/BatikPrototypes";
import ProgressTracker from "@/components/ProgressTracker";
import { getTheme } from "@/lib/immersiveThemes";
import {
  batikIntro, batikTasks, batikEval, batikReferences,
  BATIK_DATASETS, DATASET_BASE_URL,
} from "@/lib/batikCaseStudy";

export default function BatikCaseStudyPage() {
  const { lang } = useLang();
  const intro = batikIntro[lang];
  const theme = getTheme("deep-learning");
  const [open, setOpen] = useState(1); // which task is expanded

  const L = {
    id: { demoTitle: "Lab Visi Batik (Demo Langsung)", demoSub: "Pilih motif & citra, lalu terapkan operasi computer vision NYATA pada piksel citra — konvolusi tepi, grayscale, pemisahan kanal, dan 'yang dilihat MLP' saat diperkecil ke 32×32.", protoTitle: "Prototipe Kelas (Rata-rata Motif)", tasks: "Tahapan Pengerjaan (5 Soal)", weight: "Bobot", datasets: "Dataset Motif Batik", dl: "Unduh", code: "Kode", why: "Penjelasan", expected: "Output yang diharapkan", eval: "Evaluasi & Visualisasi", refs: "Referensi", report: "Yang Dikumpulkan", reportItems: ["Source code Python (.py / .ipynb)", "Dataset citra atau tautan sumber", "Hasil pelatihan model (loss/akurasi)", "Visualisasi: confusion matrix, PCA, t-SNE", "Laporan analisis hasil eksperimen", "Kumpulkan semua dalam satu file ZIP"], reportLead: "Kumpulkan dalam satu file ZIP:", toggle: "Lihat detail" },
    en: { demoTitle: "Batik Vision Lab (Live Demo)", demoSub: "Pick a motif & image, then apply REAL computer-vision operations to the image pixels — edge convolution, grayscale, channel split, and 'what the MLP sees' when shrunk to 32×32.", protoTitle: "Class Prototypes (Average Motif)", tasks: "Work Stages (5 Tasks)", weight: "Weight", datasets: "Batik Motif Datasets", dl: "Download", code: "Code", why: "Explanation", expected: "Expected output", eval: "Evaluation & Visualization", refs: "References", report: "Deliverables", reportItems: ["Python source code (.py / .ipynb)", "Image dataset or source link", "Training results (loss/accuracy)", "Visualizations: confusion matrix, PCA, t-SNE", "Experiment analysis report", "Submit everything in one ZIP file"], reportLead: "Submit in a single ZIP file:", toggle: "Show details" },
  }[lang];

  return (
    <div>
      <ProgressTracker visitHref="/batik-case-study" visitLabel={intro.title} completeKey="module:batik" completeType="module" />
      <ImmersiveHero theme={theme} icon="🪔" title={intro.title} subtitle={intro.subtitle} eyebrow="Case Study · Week 2" />

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Background */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">📜 {intro.bgTitle}</h2>
          {intro.bg.map((p, i) => <p key={i} className="mt-2 text-sm leading-relaxed text-slate-600">{p}</p>)}
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">ℹ️ {intro.note}</div>
        </section>

        {/* Objectives */}
        <section className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-bold text-brand-800">🎯 {intro.objectivesTitle}</h2>
          <ul className="mt-2 space-y-1.5">
            {intro.objectives.map((o, i) => (
              <li key={i} className="flex gap-2 text-sm text-brand-900"><span className="text-brand-500">✓</span>{o}</li>
            ))}
          </ul>
        </section>

        {/* Live Vision Demo */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">🔬 {L.demoTitle}</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">{L.demoSub}</p>
          <BatikVisionLab />
          <h3 className="mb-3 mt-8 text-lg font-bold text-slate-900">🧬 {L.protoTitle}</h3>
          <BatikPrototypes />
        </section>

        {/* Datasets */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">🗂️ {L.datasets}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {BATIK_DATASETS.map((ds) => (
              <div key={ds.name} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div>
                  <p className="font-bold text-slate-800">{ds.name}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{ds[lang]}</p>
                </div>
                <a href={`${DATASET_BASE_URL}/${ds.file}`} target="_blank" rel="noopener noreferrer"
                  className="shrink-0 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-700">
                  ⬇️ {L.dl}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Tasks */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">🧭 {L.tasks}</h2>
          <div className="mt-4 space-y-3">
            {batikTasks.map((task) => {
              const t = task[lang];
              const isOpen = open === task.n;
              return (
                <div key={task.n} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <button onClick={() => setOpen(isOpen ? null : task.n)} className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-slate-50">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-black text-white">{task.n}</span>
                    <span className="flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{task.icon}</span>
                        <span className="font-bold text-slate-900">{t.title}</span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{L.weight} {task.weight}</span>
                      </span>
                      <span className="mt-0.5 block text-sm text-slate-500">{t.brief}</span>
                    </span>
                    <span className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 p-4">
                      <ul className="mb-4 space-y-1.5">
                        {t.points.map((p, i) => <li key={i} className="flex gap-2 text-sm text-slate-700"><span className="text-brand-500">•</span>{p}</li>)}
                      </ul>
                      <CodeBlock code={task.code} lang={task.codeLang} />
                      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                        <span className="font-semibold text-slate-800">💡 {L.why}: </span>{t.explain}
                      </div>
                      <p className="mt-2 text-xs text-slate-500"><span className="font-semibold">▶ {L.expected}: </span>{task.expected[lang]}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Evaluation code */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">📊 {batikEval[lang].title}</h2>
          <p className="mb-3 mt-1 text-sm text-slate-600">{batikEval[lang].note}</p>
          <CodeBlock code={batikEval.code} lang={batikEval.codeLang} />
        </section>

        {/* Deliverables */}
        <section className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-lg font-bold text-green-800">📦 {L.report}</h2>
          <p className="mt-1 text-sm text-green-900">{L.reportLead}</p>
          <ul className="mt-2 space-y-1.5">
            {L.reportItems.map((it, i) => <li key={i} className="flex gap-2 text-sm text-green-900"><span>✅</span>{it}</li>)}
          </ul>
        </section>

        {/* References */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">🔗 {L.refs}</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {batikReferences.map((r) => (
              <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-50">
                {r.label} ↗
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
