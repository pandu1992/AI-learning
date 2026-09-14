"use client";

import Link from "next/link";
import { useLang } from "../LanguageProvider";
import PageHero from "../PageHero";
import DataPipelineFlow from "./DataPipelineFlow";
import DataTypesExplorer from "./DataTypesExplorer";
import DataSources from "./DataSources";

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
      more: "Lebih banyak segera hadir",
      moreText: "Bagian berikutnya: Analisis Data Eksploratif (EDA), Overfitting vs Underfitting, dan Metrik Evaluasi — akan ditambahkan bertahap.",
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
      more: "More coming soon",
      moreText: "Next sections: Exploratory Data Analysis (EDA), Overfitting vs Underfitting, and Evaluation Metrics — added gradually.",
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
