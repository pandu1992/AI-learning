"use client";

import { useLang } from "../LanguageProvider";

// Two side-by-side comparisons: primary vs secondary source, and structured
// vs unstructured form. Static, illustrative cards (no heavy interaction).
export default function DataSources() {
  const { lang } = useLang();

  const L = {
    id: {
      byOrigin: "Berdasarkan Asal",
      byStructure: "Berdasarkan Struktur",
      primary: "Primer",
      primaryDesc: "Dikumpulkan sendiri, langsung dari sumber untuk tujuan tertentu.",
      primaryEx: "Survei sendiri, sensor IoT, eksperimen, wawancara.",
      secondary: "Sekunder",
      secondaryDesc: "Data yang sudah ada, dikumpulkan pihak lain, lalu kita pakai ulang.",
      secondaryEx: "Data BPS, dataset publik (Kaggle), laporan, API pihak ketiga.",
      structured: "Terstruktur",
      structuredDesc: "Rapi dalam baris & kolom (tabel), mudah dianalisis.",
      structuredEx: "Basis data SQL, spreadsheet, tabel transaksi.",
      unstructured: "Tidak Terstruktur",
      unstructuredDesc: "Tanpa format tabel yang tetap; butuh pemrosesan khusus.",
      unstructuredEx: "Teks, gambar, audio, video, email.",
      example: "Contoh",
    },
    en: {
      byOrigin: "By Origin",
      byStructure: "By Structure",
      primary: "Primary",
      primaryDesc: "Collected yourself, directly from the source for a specific purpose.",
      primaryEx: "Your own survey, IoT sensors, experiments, interviews.",
      secondary: "Secondary",
      secondaryDesc: "Existing data collected by others that you reuse.",
      secondaryEx: "Government stats, public datasets (Kaggle), reports, third-party APIs.",
      structured: "Structured",
      structuredDesc: "Neatly in rows & columns (tables), easy to analyze.",
      structuredEx: "SQL databases, spreadsheets, transaction tables.",
      unstructured: "Unstructured",
      unstructuredDesc: "No fixed table format; needs special processing.",
      unstructuredEx: "Text, images, audio, video, emails.",
      example: "Example",
    },
  }[lang];

  const Card = ({ icon, title, desc, ex, color }) => (
    <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <h4 className="font-bold" style={{ color }}>{title}</h4>
      </div>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
      <p className="mt-2 text-xs text-slate-500"><span className="font-semibold">{L.example}:</span> {ex}</p>
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-sm font-bold text-slate-700">🧭 {L.byOrigin}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Card icon="🧪" title={L.primary} desc={L.primaryDesc} ex={L.primaryEx} color="#0093D0" />
          <Card icon="♻️" title={L.secondary} desc={L.secondaryDesc} ex={L.secondaryEx} color="#F5A200" />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-bold text-slate-700">🗂️ {L.byStructure}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Card icon="📊" title={L.structured} desc={L.structuredDesc} ex={L.structuredEx} color="#059669" />
          <Card icon="🌀" title={L.unstructured} desc={L.unstructuredDesc} ex={L.unstructuredEx} color="#7c3aed" />
        </div>
      </div>
    </div>
  );
}
