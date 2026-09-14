"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LanguageProvider";
import Formula from "../Formula";

// Interactive Feature Scaling & Encoding demo — two tabs:
//  1) Scaling: Min-Max vs Standardization (Z-score) on a small numeric feature,
//     shown on a before/after number line, with KaTeX formulas.
//  2) Encoding: Label vs One-Hot on a categorical feature, shown as a table
//     transform, with a note on why one-hot avoids fake ordering.
// All original toy data — for teaching.

// ---------- Scaling ----------
function Scaling({ lang }) {
  const [method, setMethod] = useState("minmax"); // minmax | zscore
  // toy "monthly income (juta Rp)" feature with a wide range
  const raw = [3, 5, 6, 8, 12, 25];

  const stats = useMemo(() => {
    const n = raw.length;
    const min = Math.min(...raw), max = Math.max(...raw);
    const mean = raw.reduce((s, v) => s + v, 0) / n;
    const std = Math.sqrt(raw.reduce((s, v) => s + (v - mean) ** 2, 0) / n);
    return { min, max, mean, std };
  }, []);

  const scaled = useMemo(() => {
    if (method === "minmax") {
      const { min, max } = stats;
      return raw.map((v) => (v - min) / (max - min || 1));
    }
    const { mean, std } = stats;
    return raw.map((v) => (v - mean) / (std || 1));
  }, [method, stats]);

  const L = {
    id: {
      hint: "Fitur berskala besar bisa mendominasi fitur lain (mis. penghasilan vs usia). Penskalaan menyetarakan rentang. Klik metode & lihat sebaran nilai berubah.",
      minmax: "Min-Max (Normalisasi)", zscore: "Standardisasi (Z-score)",
      minmaxDesc: "Meregangkan nilai ke rentang [0, 1]. Cocok saat butuh batas tetap (mis. input jaringan saraf).",
      zscoreDesc: "Pusatkan ke rata-rata 0 & standar deviasi 1. Tahan terhadap perbedaan satuan; umum untuk banyak algoritma.",
      before: "Sebelum (mentah)", after: "Sesudah (terskala)",
      feature: "Contoh fitur: Penghasilan (juta Rp)",
      note: "⚠️ Parameter penskalaan (min/max atau mean/std) HARUS dihitung dari data latih saja, lalu diterapkan ke data uji — mencegah kebocoran data.",
    },
    en: {
      hint: "Large-scale features can dominate others (e.g. income vs age). Scaling puts them on a comparable range. Pick a method & watch the values move.",
      minmax: "Min-Max (Normalization)", zscore: "Standardization (Z-score)",
      minmaxDesc: "Stretches values into [0, 1]. Good when you need fixed bounds (e.g. neural-net inputs).",
      zscoreDesc: "Centers to mean 0 & std 1. Robust to unit differences; common for many algorithms.",
      before: "Before (raw)", after: "After (scaled)",
      feature: "Example feature: Income (million Rp)",
      note: "⚠️ Scaling parameters (min/max or mean/std) MUST be computed on the training set only, then applied to test data — this prevents data leakage.",
    },
  }[lang];

  // number-line renderer
  const NumberLine = ({ values, domain, fmt }) => {
    const [lo, hi] = domain;
    const span = hi - lo || 1;
    return (
      <div className="relative mt-6 h-10">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-slate-300" />
        <span className="absolute -bottom-1 left-0 text-[10px] text-slate-400">{fmt(lo)}</span>
        <span className="absolute -bottom-1 right-0 text-[10px] text-slate-400">{fmt(hi)}</span>
        {values.map((v, i) => {
          const pct = ((v - lo) / span) * 100;
          return (
            <span key={i} className="absolute top-1.5" style={{ left: `calc(${Math.max(0, Math.min(100, pct))}% - 7px)` }}>
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-600 ring-2 ring-white" />
              <span className="mt-0.5 block -translate-x-1/2 text-[9px] text-slate-500">{fmt(v)}</span>
            </span>
          );
        })}
      </div>
    );
  };

  const rawDomain = [0, Math.max(...raw)];
  const scaledDomain = method === "minmax" ? [0, 1] : [Math.min(...scaled) - 0.2, Math.max(...scaled) + 0.2];

  return (
    <div>
      <p className="mb-3 text-sm text-slate-600">{L.hint}</p>
      <div className="mb-4 inline-flex flex-wrap rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
        {[["minmax", L.minmax], ["zscore", L.zscore]].map(([k, label]) => (
          <button key={k} onClick={() => setMethod(k)} className={`rounded-md px-3 py-1.5 transition ${method === k ? "bg-brand-600 text-white" : "text-slate-600"}`}>{label}</button>
        ))}
      </div>

      <p className="text-xs text-slate-500">{method === "minmax" ? L.minmaxDesc : L.zscoreDesc}</p>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold text-slate-600">{L.feature}</p>
        <p className="mt-3 text-xs font-medium text-slate-500">{L.before}</p>
        <NumberLine values={raw} domain={rawDomain} fmt={(v) => v.toFixed(0)} />
        <p className="mt-5 text-xs font-medium text-slate-500">{L.after}</p>
        <NumberLine values={scaled} domain={scaledDomain} fmt={(v) => v.toFixed(2)} />
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg bg-white p-3 text-sm text-slate-600 ring-1 ring-slate-200">
        {method === "minmax"
          ? <Formula tex={"x' = \\frac{x - x_{min}}{x_{max} - x_{min}}"} display={false} />
          : <Formula tex={"x' = \\frac{x - \\mu}{\\sigma}"} display={false} />}
      </div>

      <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">{L.note}</p>
    </div>
  );
}

// ---------- Encoding ----------
function Encoding({ lang }) {
  const [method, setMethod] = useState("onehot"); // label | onehot
  const categories = ["Jakarta", "Bandung", "Surabaya"];
  const rows = [
    { id: 1, city: "Jakarta" },
    { id: 2, city: "Surabaya" },
    { id: 3, city: "Bandung" },
    { id: 4, city: "Jakarta" },
  ];

  const L = {
    id: {
      hint: "Model tidak bisa membaca teks — kategori harus diubah jadi angka. Bandingkan dua cara umum.",
      label: "Label Encoding", onehot: "One-Hot Encoding",
      labelDesc: "Tiap kategori diberi nomor (0,1,2). Ringkas, tapi menyiratkan URUTAN palsu — model bisa mengira Surabaya (2) > Jakarta (0).",
      onehotDesc: "Tiap kategori jadi kolom biner 0/1. Tanpa urutan palsu; ideal untuk data nominal. Konsekuensinya kolom bertambah.",
      original: "Kota (asli)",
      warnLabel: "⚠️ Hati-hati: cocok untuk data ordinal (berurutan), berisiko untuk nominal.",
      okOnehot: "✅ Aman untuk data nominal (tanpa urutan).",
    },
    en: {
      hint: "Models can't read text — categories must become numbers. Compare two common approaches.",
      label: "Label Encoding", onehot: "One-Hot Encoding",
      labelDesc: "Each category gets a number (0,1,2). Compact, but implies a FAKE order — a model may think Surabaya (2) > Jakarta (0).",
      onehotDesc: "Each category becomes a binary 0/1 column. No fake order; ideal for nominal data. Trade-off: more columns.",
      original: "City (original)",
      warnLabel: "⚠️ Caution: fine for ordinal (ordered) data, risky for nominal.",
      okOnehot: "✅ Safe for nominal (unordered) data.",
    },
  }[lang];

  const labelOf = (c) => categories.indexOf(c);

  return (
    <div>
      <p className="mb-3 text-sm text-slate-600">{L.hint}</p>
      <div className="mb-4 inline-flex flex-wrap rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
        {[["label", L.label], ["onehot", L.onehot]].map(([k, label]) => (
          <button key={k} onClick={() => setMethod(k)} className={`rounded-md px-3 py-1.5 transition ${method === k ? "bg-brand-600 text-white" : "text-slate-600"}`}>{label}</button>
        ))}
      </div>

      <p className="text-xs text-slate-500">{method === "label" ? L.labelDesc : L.onehotDesc}</p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[360px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-2 py-2">#</th>
              <th className="px-2 py-2">{L.original}</th>
              {method === "label"
                ? <th className="px-2 py-2 text-brand-700">city_encoded</th>
                : categories.map((c) => (<th key={c} className="px-2 py-2 text-brand-700">is_{c}</th>))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-slate-100">
                <td className="px-2 py-1.5 text-slate-400">{r.id}</td>
                <td className="px-2 py-1.5 font-medium text-slate-700">{r.city}</td>
                {method === "label"
                  ? <td className="px-2 py-1.5 font-mono text-brand-700">{labelOf(r.city)}</td>
                  : categories.map((c) => (
                      <td key={c} className={`px-2 py-1.5 font-mono ${r.city === c ? "bg-brand-50 font-bold text-brand-700" : "text-slate-400"}`}>{r.city === c ? 1 : 0}</td>
                    ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={`mt-3 rounded-md px-3 py-2 text-xs ${method === "label" ? "bg-amber-50 text-amber-800" : "bg-green-50 text-green-700"}`}>
        {method === "label" ? L.warnLabel : L.okOnehot}
      </p>
    </div>
  );
}

export default function ScalingEncodingDemo() {
  const { lang } = useLang();
  const [tab, setTab] = useState("scaling");

  const L = {
    id: { scaling: "Penskalaan (numerik)", encoding: "Encoding (kategorikal)" },
    en: { scaling: "Scaling (numeric)", encoding: "Encoding (categorical)" },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 inline-flex flex-wrap rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
        {[["scaling", L.scaling], ["encoding", L.encoding]].map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-md px-3 py-1.5 transition ${tab === k ? "bg-brand-600 text-white" : "text-slate-600"}`}>{label}</button>
        ))}
      </div>
      {tab === "scaling" ? <Scaling lang={lang} /> : <Encoding lang={lang} />}
    </div>
  );
}
