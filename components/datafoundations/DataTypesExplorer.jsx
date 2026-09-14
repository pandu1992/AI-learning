"use client";

import { useState } from "react";
import { useLang } from "../LanguageProvider";

// Interactive explorer of data types. Click a category to expand its subtypes,
// examples, and a note on how AI typically handles it.
const TYPES = [
  {
    key: "numeric", icon: "🔢", color: "#0093D0",
    id: { name: "Numerik", tagline: "Angka yang bisa dihitung/diukur" },
    en: { name: "Numeric", tagline: "Numbers you can count/measure" },
    sub: [
      { id: { name: "Kontinu", ex: "Tinggi badan (172,5 cm), suhu, harga", note: "Nilai tak terbatas dalam suatu rentang." },
        en: { name: "Continuous", ex: "Height (172.5 cm), temperature, price", note: "Infinitely many values within a range." } },
      { id: { name: "Diskret", ex: "Jumlah anak, jumlah transaksi", note: "Nilai bilangan bulat yang bisa dihitung." },
        en: { name: "Discrete", ex: "Number of children, transaction count", note: "Countable whole-number values." } },
    ],
    id_note: "Sering perlu penskalaan (scaling/normalisasi) sebelum masuk model.",
    en_note: "Often needs scaling/normalization before entering a model.",
  },
  {
    key: "categorical", icon: "🏷️", color: "#F5A200",
    id: { name: "Kategorikal", tagline: "Label atau kelompok" },
    en: { name: "Categorical", tagline: "Labels or groups" },
    sub: [
      { id: { name: "Nominal", ex: "Warna, kota, jenis kelamin", note: "Kategori TANPA urutan." },
        en: { name: "Nominal", ex: "Color, city, gender", note: "Categories with NO order." } },
      { id: { name: "Ordinal", ex: "Rating (buruk<sedang<baik), tingkat pendidikan", note: "Kategori BERURUTAN." },
        en: { name: "Ordinal", ex: "Rating (poor<fair<good), education level", note: "Ordered categories." } },
      { id: { name: "Biner", ex: "Ya/Tidak, Spam/Bukan, Lulus/Gagal", note: "Hanya dua kemungkinan." },
        en: { name: "Binary", ex: "Yes/No, Spam/Not, Pass/Fail", note: "Only two possibilities." } },
    ],
    id_note: "Perlu 'encoding' (mis. one-hot / label encoding) agar bisa diproses model.",
    en_note: "Needs 'encoding' (e.g. one-hot / label encoding) to be model-ready.",
  },
  {
    key: "special", icon: "🧩", color: "#7c3aed",
    id: { name: "Data Terstruktur Khusus", tagline: "Bentuk data dengan pola sendiri" },
    en: { name: "Special-Structure Data", tagline: "Data forms with their own patterns" },
    sub: [
      { id: { name: "Deret Waktu (Time Series)", ex: "Harga saham harian, suhu per jam", note: "Berurutan menurut waktu — urutan penting." },
        en: { name: "Time Series", ex: "Daily stock price, hourly temperature", note: "Ordered by time — sequence matters." } },
      { id: { name: "Teks", ex: "Ulasan, email, dokumen", note: "Perlu NLP: tokenisasi, embedding." },
        en: { name: "Text", ex: "Reviews, emails, documents", note: "Needs NLP: tokenization, embeddings." } },
      { id: { name: "Gambar", ex: "Foto, citra medis, satelit", note: "Perlu computer vision (CNN)." },
        en: { name: "Image", ex: "Photos, medical/satellite imagery", note: "Needs computer vision (CNN)." } },
      { id: { name: "Audio", ex: "Rekaman suara, musik", note: "Sering diubah ke spektrogram lalu diproses seperti gambar." },
        en: { name: "Audio", ex: "Voice recordings, music", note: "Often turned into spectrograms, then processed like images." } },
      { id: { name: "Geospasial", ex: "Koordinat GPS, peta", note: "Punya dimensi lokasi/ruang." },
        en: { name: "Geospatial", ex: "GPS coordinates, maps", note: "Has a location/space dimension." } },
    ],
    id_note: "Tiap bentuk butuh teknik pemrosesan berbeda sebelum masuk model.",
    en_note: "Each form needs a different processing technique before modeling.",
  },
];

export default function DataTypesExplorer() {
  const { lang } = useLang();
  const [openKey, setOpenKey] = useState("numeric");

  const L = {
    id: { example: "Contoh", aiNote: "Catatan untuk AI", tapHint: "Klik kategori untuk melihat sub-jenis & contohnya." },
    en: { example: "Example", aiNote: "AI note", tapHint: "Click a category to see its subtypes & examples." },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-3 text-sm text-slate-500">{L.tapHint}</p>
      <div className="space-y-3">
        {TYPES.map((t) => {
          const open = openKey === t.key;
          return (
            <div key={t.key} className="overflow-hidden rounded-xl border border-slate-200">
              <button
                onClick={() => setOpenKey(open ? "" : t.key)}
                className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50"
                style={open ? { backgroundColor: t.color + "14" } : {}}
              >
                <span className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <span>
                    <span className="block font-bold text-slate-900">{t[lang].name}</span>
                    <span className="block text-xs text-slate-500">{t[lang].tagline}</span>
                  </span>
                </span>
                <span className="text-slate-400">{open ? "▲" : "▼"}</span>
              </button>

              {open && (
                <div className="border-t border-slate-100 bg-white px-4 py-3">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {t.sub.map((s, i) => (
                      <div key={i} className="rounded-lg bg-slate-50 p-3">
                        <p className="text-sm font-bold" style={{ color: t.color }}>{s[lang].name}</p>
                        <p className="mt-0.5 text-xs text-slate-600"><span className="font-semibold">{L.example}:</span> {s[lang].ex}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{s[lang].note}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 rounded-md px-3 py-2 text-xs" style={{ backgroundColor: t.color + "14", color: "#334155" }}>
                    🤖 <span className="font-semibold">{L.aiNote}:</span> {lang === "id" ? t.id_note : t.en_note}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
