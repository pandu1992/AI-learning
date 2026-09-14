"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LanguageProvider";

// Interactive Data Cleaning & Preprocessing demo.
// A small, deliberately-messy synthetic "customer" dataset is shown as a table.
// Students toggle cleaning steps (drop duplicates, fill missing, fix types,
// handle outliers) and watch the table transform + a data-quality score rise.
// All original toy data — for teaching.

// Raw messy dataset. Issues are intentional:
//  - row 3 duplicates row 2
//  - age has a missing value (null) and an impossible outlier (200)
//  - income has a missing value (null)
//  - city has inconsistent casing / whitespace
//  - spend stored as string with currency text ("Rp 120rb")
const RAW = [
  { id: 1, name: "Andi", age: 24, city: "Jakarta", income: 6.5, spend: "120" },
  { id: 2, name: "Budi", age: null, city: "bandung ", income: 4.2, spend: "80" },
  { id: 3, name: "Budi", age: null, city: "bandung ", income: 4.2, spend: "80" }, // duplicate of #2
  { id: 4, name: "Citra", age: 31, city: "JAKARTA", income: null, spend: "150" },
  { id: 5, name: "Dewi", age: 200, city: "Surabaya", income: 9.0, spend: "abc" }, // age outlier + bad spend
  { id: 6, name: "Eka", age: 28, city: "surabaya", income: 5.1, spend: "95" },
];

const COLS = [
  { key: "name", id: "Nama", en: "Name" },
  { key: "age", id: "Usia", en: "Age" },
  { key: "city", id: "Kota", en: "City" },
  { key: "income", id: "Penghasilan", en: "Income" },
  { key: "spend", id: "Belanja", en: "Spend" },
];

// median of numeric array (ignoring nulls)
function median(nums) {
  const s = nums.filter((v) => v != null && !Number.isNaN(v)).sort((a, b) => a - b);
  if (!s.length) return 0;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

export default function DataCleaningDemo() {
  const { lang } = useLang();
  const [steps, setSteps] = useState({
    dedupe: false,
    fillMissing: false,
    fixTypes: false,
    handleOutliers: false,
  });

  const toggle = (k) => setSteps((s) => ({ ...s, [k]: !s[k] }));

  // Apply the selected cleaning steps in a sensible order.
  const { rows, issues } = useMemo(() => {
    let data = RAW.map((r) => ({ ...r, _flags: {} }));

    // Detect + optionally fix DUPLICATES
    const seen = new Set();
    data.forEach((r) => {
      const sig = `${r.name}|${r.age}|${r.city}|${r.income}|${r.spend}`;
      if (seen.has(sig)) r._flags.dup = true;
      seen.add(sig);
    });
    if (steps.dedupe) data = data.filter((r) => !r._flags.dup);

    // FIX TYPES: normalize city casing/whitespace + parse spend to number
    data = data.map((r) => {
      const out = { ...r };
      if (steps.fixTypes) {
        out.city = String(r.city).trim().toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
        const parsed = parseFloat(String(r.spend).replace(/[^0-9.]/g, ""));
        out.spend = Number.isNaN(parsed) ? null : parsed;
      } else {
        // flag the type problems while unfixed
        if (/[a-zA-Z]/.test(String(r.spend))) out._flags.badSpend = true;
      }
      return out;
    });

    // FILL MISSING: impute age (median) & income (median); also spend if it became null after type-fix
    const ageMed = median(RAW.map((r) => r.age));
    const incMed = median(RAW.map((r) => r.income));
    const spendMed = median(RAW.map((r) => parseFloat(String(r.spend).replace(/[^0-9.]/g, ""))));
    data = data.map((r) => {
      const out = { ...r };
      const missAge = r.age == null;
      const missInc = r.income == null;
      const missSpend = r.spend == null;
      if (missAge) out._flags.missAge = true;
      if (missInc) out._flags.missInc = true;
      if (missSpend) out._flags.missSpend = true;
      if (steps.fillMissing) {
        if (missAge) { out.age = ageMed; out._flags.filledAge = true; out._flags.missAge = false; }
        if (missInc) { out.income = incMed; out._flags.filledInc = true; out._flags.missInc = false; }
        if (missSpend) { out.spend = spendMed; out._flags.filledSpend = true; out._flags.missSpend = false; }
      }
      return out;
    });

    // HANDLE OUTLIERS: cap impossible age (> 120) to the median
    data = data.map((r) => {
      const out = { ...r };
      if (typeof r.age === "number" && r.age > 120) {
        out._flags.outAge = true;
        if (steps.handleOutliers) { out.age = ageMed; out._flags.cappedAge = true; out._flags.outAge = false; }
      }
      return out;
    });

    // Count remaining issues for the quality score
    let remaining = 0;
    data.forEach((r) => {
      const f = r._flags;
      if (f.dup || f.badSpend || f.missAge || f.missInc || f.missSpend || f.outAge) remaining++;
    });

    return { rows: data, issues: remaining };
  }, [steps]);

  // Quality score: start from 6 known-problem rows -> clean = 100%
  const totalProblemRows = 5; // rows 2,3,4,5 + city casing spread across (approx for teaching)
  const quality = Math.round(
    ((totalProblemRows - Math.min(issues, totalProblemRows)) / totalProblemRows) * 100
  );

  const L = {
    id: {
      hint: "Data dunia nyata itu 'kotor'. Aktifkan langkah pembersihan dan lihat tabel berubah serta skor kualitas naik. Sel bermasalah ditandai warna.",
      dedupe: "Hapus duplikat",
      dedupeD: "Baris yang identik dihapus (baris #3 = salinan #2).",
      fillMissing: "Isi nilai kosong",
      fillMissingD: "Nilai kosong diisi median kolomnya (imputasi).",
      fixTypes: "Perbaiki tipe & format",
      fixTypesD: "Rapikan huruf/spasi kota; ubah 'Belanja' jadi angka.",
      handleOutliers: "Tangani outlier",
      handleOutliersD: "Usia mustahil (200) dibatasi ke nilai wajar.",
      quality: "Skor Kualitas Data",
      legend: "Keterangan warna",
      lgMissing: "kosong", lgDup: "duplikat", lgBad: "tipe salah", lgOut: "outlier", lgFixed: "diperbaiki",
      allClean: "✅ Data bersih! Siap untuk tahap berikutnya.",
      note: "Urutan penting: umumnya duplikat & tipe dulu, baru isi kosong & tangani outlier — supaya statistik (median) tidak tercemar nilai buruk.",
      empty: "(kosong)",
    },
    en: {
      hint: "Real-world data is 'dirty'. Turn on cleaning steps and watch the table transform and the quality score rise. Problem cells are color-coded.",
      dedupe: "Drop duplicates",
      dedupeD: "Identical rows removed (row #3 = copy of #2).",
      fillMissing: "Fill missing values",
      fillMissingD: "Empty cells filled with each column's median (imputation).",
      fixTypes: "Fix types & format",
      fixTypesD: "Normalize city case/spacing; parse 'Spend' to a number.",
      handleOutliers: "Handle outliers",
      handleOutliersD: "Impossible age (200) capped to a reasonable value.",
      quality: "Data Quality Score",
      legend: "Color legend",
      lgMissing: "missing", lgDup: "duplicate", lgBad: "wrong type", lgOut: "outlier", lgFixed: "fixed",
      allClean: "✅ Data is clean! Ready for the next stage.",
      note: "Order matters: usually dedupe & fix types first, then fill missing & handle outliers — so statistics (median) aren't polluted by bad values.",
      empty: "(empty)",
    },
  }[lang];

  const stepList = [
    { key: "dedupe", label: L.dedupe, desc: L.dedupeD },
    { key: "fixTypes", label: L.fixTypes, desc: L.fixTypesD },
    { key: "fillMissing", label: L.fillMissing, desc: L.fillMissingD },
    { key: "handleOutliers", label: L.handleOutliers, desc: L.handleOutliersD },
  ];

  // cell styling based on flags
  const cellClass = (r, key) => {
    const f = r._flags;
    if (key === "age" && (f.missAge || f.outAge)) return "bg-amber-100 text-amber-800";
    if (key === "age" && (f.filledAge || f.cappedAge)) return "bg-green-100 text-green-800";
    if (key === "income" && f.missInc) return "bg-amber-100 text-amber-800";
    if (key === "income" && f.filledInc) return "bg-green-100 text-green-800";
    if (key === "spend" && (f.badSpend || f.missSpend)) return "bg-red-100 text-red-700";
    if (key === "spend" && f.filledSpend) return "bg-green-100 text-green-800";
    if (key === "city" && steps.fixTypes) return "bg-green-50 text-slate-700";
    return "";
  };

  const display = (r, key) => {
    const v = r[key];
    if (v == null) return L.empty;
    if (typeof v === "number") return Number.isInteger(v) ? v : v.toFixed(1);
    return v;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      {/* quality score */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700">{L.quality}</span>
          <span className="text-lg font-bold" style={{ color: quality === 100 ? "#16a34a" : "#0093D0" }}>{quality}%</span>
        </div>
        <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${quality}%`, backgroundColor: quality === 100 ? "#16a34a" : "#0093D0" }} />
        </div>
      </div>

      {/* step toggles */}
      <div className="mb-4 grid gap-2 sm:grid-cols-2">
        {stepList.map((s) => (
          <button
            key={s.key}
            onClick={() => toggle(s.key)}
            className={`rounded-lg border p-3 text-left transition ${steps[s.key] ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
          >
            <span className="flex items-center gap-2">
              <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs ${steps[s.key] ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300 text-transparent"}`}>✓</span>
              <span className="text-sm font-semibold text-slate-800">{s.label}</span>
            </span>
            <span className="mt-1 block pl-7 text-xs text-slate-500">{s.desc}</span>
          </button>
        ))}
      </div>

      {/* data table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-2 py-2">#</th>
              {COLS.map((c) => (<th key={c.key} className="px-2 py-2">{c[lang]}</th>))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-slate-100">
                <td className="px-2 py-1.5 text-slate-400">{r.id}</td>
                {COLS.map((c) => (
                  <td key={c.key} className={`px-2 py-1.5 rounded ${cellClass(r, c.key)}`}>{display(r, c.key)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* legend */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <span className="font-semibold text-slate-600">{L.legend}:</span>
        <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-amber-100" /> {L.lgMissing}</span>
        <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-red-100" /> {L.lgBad}</span>
        <span className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-green-100" /> {L.lgFixed}</span>
      </div>

      {quality === 100 && <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">{L.allClean}</p>}
      <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
