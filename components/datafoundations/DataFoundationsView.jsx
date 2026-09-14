"use client";

import Link from "next/link";
import { useLang } from "../LanguageProvider";
import PageHero from "../PageHero";
import DataPipelineFlow from "./DataPipelineFlow";
import DataTypesExplorer from "./DataTypesExplorer";
import DataSources from "./DataSources";
import EdaExplorer from "./EdaExplorer";
import OverfitUnderfitDemo from "./OverfitUnderfitDemo";
import EvaluationMetrics from "./EvaluationMetrics";

// Phase 1 of "Data Foundations": Data Pipeline + Data Types + Data Sources.
// Later phases (EDA, over/underfitting, evaluation metrics) will extend this page.
export default function DataFoundationsView() {
  const { lang } = useLang();

  const L = {
    id: {
      title: "Fondasi Data",
      subtitle: "Sebelum memahami AI, pahami dulu datanya. Data yang baik adalah fondasi model yang baik.",
      intro: "Model AI belajar dari data. Jadi sebelum masuk ke algoritma, mahasiswa perlu memahami: bagaimana alur pengolahan data, jenis-jenis data, dan dari mana data berasal. Bagian ini memandu Anda melalui fondasi tersebut.",
      s1: "1. Pipeline Data — Perjalanan Data menjadi Insight",
      s1sub: "Alur yang dilalui data dari mentah hingga menghasilkan keputusan.",
      s2: "2. Jenis-Jenis Data",
      s2sub: "Mengenali tipe data menentukan cara memprosesnya dan model yang cocok.",
      s3: "3. Sumber & Bentuk Data",
      s3sub: "Dari mana data berasal, dan bagaimana bentuknya.",
      s4: "4. Analisis Data Eksploratif (EDA)",
      s4sub: "Memahami data lewat visualisasi sebelum membangun model: sebaran, korelasi, dan outlier.",
      s5: "5. Overfitting vs Underfitting",
      s5sub: "Menyeimbangkan kompleksitas model: cukup menangkap pola, tanpa menghafal noise.",
      s6: "6. Metrik Evaluasi",
      s6sub: "Mengukur performa model: klasifikasi & regresi (supervised) serta clustering (unsupervised).",
      more: "🎉 Fondasi Data lengkap",
      moreText: "Kamu telah menelusuri pipeline data, jenis & sumber data, EDA, overfitting/underfitting, dan metrik evaluasi. Sekarang kamu siap masuk ke topik AI dengan pemahaman data yang kuat.",
      back: "← Kembali ke Pengantar AI",
    },
    en: {
      title: "Data Foundations",
      subtitle: "Before understanding AI, understand the data. Good data is the foundation of a good model.",
      intro: "AI models learn from data. So before diving into algorithms, students need to understand: how data flows through processing, the kinds of data, and where data comes from. This section guides you through those foundations.",
      s1: "1. Data Pipeline — Data's Journey to Insight",
      s1sub: "The path data travels from raw to driving a decision.",
      s2: "2. Types of Data",
      s2sub: "Knowing the data type determines how to process it and which model fits.",
      s3: "3. Data Sources & Forms",
      s3sub: "Where data comes from, and what form it takes.",
      s4: "4. Exploratory Data Analysis (EDA)",
      s4sub: "Understand data via visualization before modeling: distribution, correlation, and outliers.",
      s5: "5. Overfitting vs Underfitting",
      s5sub: "Balancing model complexity: capture the pattern without memorizing noise.",
      s6: "6. Evaluation Metrics",
      s6sub: "Measuring model performance: classification & regression (supervised) and clustering (unsupervised).",
      more: "🎉 Data Foundations complete",
      moreText: "You've explored the data pipeline, data types & sources, EDA, overfitting/underfitting, and evaluation metrics. Now you're ready to dive into AI topics with a strong grasp of data.",
      back: "← Back to AI Overview",
    },
  }[lang];

  return (
    <div>
      <PageHero icon="🗃️" title={L.title} subtitle={L.subtitle} />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-slate-700">{L.intro}</p>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">🔄 {L.s1}</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">{L.s1sub}</p>
          <DataPipelineFlow />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">🧮 {L.s2}</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">{L.s2sub}</p>
          <DataTypesExplorer />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">🗺️ {L.s3}</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">{L.s3sub}</p>
          <DataSources />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">🔍 {L.s4}</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">{L.s4sub}</p>
          <EdaExplorer />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">⚖️ {L.s5}</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">{L.s5sub}</p>
          <OverfitUnderfitDemo />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">📏 {L.s6}</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">{L.s6sub}</p>
          <EvaluationMetrics />
        </section>

        <div className="mt-12 rounded-2xl border border-dashed border-brand-300 bg-brand-50 p-5">
          <p className="font-bold text-brand-800">🚧 {L.more}</p>
          <p className="mt-1 text-sm text-brand-700/90">{L.moreText}</p>
        </div>

        <div className="mt-8">
          <Link href="/topics/ai-overview" className="text-sm font-semibold text-brand-600 hover:underline">
            {L.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
