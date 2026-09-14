"use client";

import { useState, useEffect, useRef } from "react";
import { useLang } from "../LanguageProvider";

// Interactive data pipeline: the stages a dataset goes through before & after
// modeling. Click a stage or press "Run the flow" to step through with details.
const STAGES = [
  {
    icon: "📥",
    id: { name: "Pengumpulan Data", detail: "Mengumpulkan data dari sumber: survei, sensor, log aplikasi, basis data, web scraping, atau API. Kualitas hasil AI dibatasi oleh kualitas data mentah ini." },
    en: { name: "Data Collection", detail: "Gather data from sources: surveys, sensors, app logs, databases, web scraping, or APIs. AI quality is capped by the quality of this raw data." },
  },
  {
    icon: "🧹",
    id: { name: "Pembersihan & Praproses", detail: "Menangani nilai hilang (missing values), duplikat, outlier, format tak konsisten, dan normalisasi. Sering menyita porsi waktu terbesar dalam proyek nyata." },
    en: { name: "Cleaning & Preprocessing", detail: "Handle missing values, duplicates, outliers, inconsistent formats, and normalization. Often the biggest time sink in real projects." },
  },
  {
    icon: "🔍",
    id: { name: "Analisis Data Eksploratif (EDA)", detail: "Memahami data lewat statistik & visualisasi: distribusi, korelasi antar-fitur, pola, dan anomali — sebelum membangun model." },
    en: { name: "Exploratory Data Analysis (EDA)", detail: "Understand the data via statistics & visuals: distributions, feature correlations, patterns, and anomalies — before building a model." },
  },
  {
    icon: "🧬",
    id: { name: "Feature Engineering", detail: "Mengubah data mentah menjadi fitur yang informatif: encoding kategori, penskalaan, menggabungkan variabel, atau membuat fitur baru." },
    en: { name: "Feature Engineering", detail: "Turn raw data into informative features: encoding categories, scaling, combining variables, or creating new features." },
  },
  {
    icon: "🧠",
    id: { name: "Pembangunan Model", detail: "Memilih algoritma & melatih model pada data latih. Data dibagi menjadi latih/validasi/uji agar bisa dinilai secara jujur." },
    en: { name: "Model Building", detail: "Choose an algorithm & train the model on training data. Data is split into train/validation/test for a fair assessment." },
  },
  {
    icon: "📏",
    id: { name: "Evaluasi", detail: "Mengukur performa pada data yang belum dilihat memakai metrik yang tepat (akurasi, F1, MSE, silhouette, dll). Menentukan apakah model cukup baik." },
    en: { name: "Evaluation", detail: "Measure performance on unseen data with the right metrics (accuracy, F1, MSE, silhouette, etc). Decides if the model is good enough." },
  },
  {
    icon: "📊",
    id: { name: "Analisis & Visualisasi", detail: "Menerjemahkan hasil model menjadi insight yang dapat dipahami & ditindaklanjuti oleh pemangku kepentingan." },
    en: { name: "Analysis & Visualization", detail: "Translate model results into insights that stakeholders can understand and act on." },
  },
  {
    icon: "🚀",
    id: { name: "Deployment & Pemantauan", detail: "Menerapkan model ke produksi dan memantau performanya. Bila menurun (data drift), model dilatih ulang — siklus berulang." },
    en: { name: "Deployment & Monitoring", detail: "Deploy the model to production and monitor its performance. If it degrades (data drift), retrain — the cycle repeats." },
  },
];

export default function DataPipelineFlow() {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setActive((a) => {
        if (a >= STAGES.length - 1) { setPlaying(false); return a; }
        return a + 1;
      });
    }, 1400);
    return () => clearInterval(timer.current);
  }, [playing]);

  const L = {
    id: { play: "▶ Jalankan alur", replay: "↻ Ulangi", step: "Tahap", loop: "🔁 Siklus berulang: pemantauan bisa memicu pengumpulan data & pelatihan ulang." },
    en: { play: "▶ Run the flow", replay: "↻ Replay", step: "Stage", loop: "🔁 It's a loop: monitoring can trigger new data collection & retraining." },
  }[lang];

  const play = () => { if (active >= STAGES.length - 1) setActive(0); setPlaying(true); };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* horizontal stage chips */}
      <div className="flex items-stretch gap-1 overflow-x-auto pb-2">
        {STAGES.map((s, i) => (
          <div key={i} className="flex items-center">
            <button
              onClick={() => { setPlaying(false); setActive(i); }}
              className={`flex min-w-[104px] flex-col items-center rounded-xl border-2 px-2 py-3 text-center transition ${
                i === active ? "border-brand-500 bg-brand-50 shadow" : i < active ? "border-brand-200 bg-white" : "border-slate-200 bg-white opacity-70"
              }`}
            >
              <span className="text-2xl">{s.icon}</span>
              <span className={`mt-1 text-[11px] font-semibold leading-tight ${i === active ? "text-brand-700" : "text-slate-600"}`}>
                {s[lang].name}
              </span>
            </button>
            {i < STAGES.length - 1 && (
              <span className={`px-0.5 text-lg ${i < active ? "text-brand-500" : "text-slate-300"}`}>→</span>
            )}
          </div>
        ))}
      </div>

      {/* active stage detail */}
      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {L.step} {active + 1}/{STAGES.length}
        </p>
        <h4 className="mt-1 flex items-center gap-2 font-bold text-slate-900">
          <span>{STAGES[active].icon}</span> {STAGES[active][lang].name}
        </h4>
        <p className="mt-1 text-sm text-slate-600">{STAGES[active][lang].detail}</p>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-400">{L.loop}</p>
        <button onClick={play} className="shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          {active >= STAGES.length - 1 ? L.replay : L.play}
        </button>
      </div>
    </div>
  );
}
