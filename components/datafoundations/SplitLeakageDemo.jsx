"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LanguageProvider";

// Interactive Train / Validation / Test Split + Data Leakage demo — two tabs:
//  1) Split: adjust train/val/test proportions with sliders; a 100-block strip
//     visualizes how the dataset is partitioned, with each set's role.
//  2) Leakage: toggle the ORDER of scaling vs splitting to show how doing it
//     wrong lets test info "leak" into training and inflates the reported score.
// All original toy illustration — for teaching.

// ---------- Split ----------
function Split({ lang }) {
  const [train, setTrain] = useState(70);
  const [val, setVal] = useState(15);
  const test = Math.max(0, 100 - train - val);

  // keep train+val <= 100
  const onTrain = (v) => {
    const t = Math.min(100, v);
    setTrain(t);
    if (t + val > 100) setVal(100 - t);
  };
  const onVal = (v) => {
    const vv = Math.min(100 - train, Math.max(0, v));
    setVal(vv);
  };

  const L = {
    id: {
      hint: "Data dibagi agar kita bisa mengukur kemampuan model pada data yang BELUM pernah dilihat. Geser proporsi & lihat pembagiannya.",
      train: "Latih (Train)", val: "Validasi (Val)", test: "Uji (Test)",
      trainRole: "Untuk melatih model — di sinilah model belajar pola.",
      valRole: "Untuk menyetel hyperparameter & memilih model terbaik tanpa menyentuh data uji.",
      testRole: "Dikunci sampai akhir. Dipakai SEKALI untuk estimasi performa yang jujur.",
      total: "Total",
      tip: "Aturan umum: 70/15/15 atau 80/10/10. Data uji harus mewakili distribusi nyata dan tidak pernah dipakai saat pengembangan.",
      warnSmallTest: "⚠️ Data uji terlalu kecil — estimasi performa jadi tidak stabil.",
    },
    en: {
      hint: "We split data so we can measure how the model does on data it has NEVER seen. Adjust the proportions & watch the partition.",
      train: "Train", val: "Validation", test: "Test",
      trainRole: "Used to train the model — this is where it learns patterns.",
      valRole: "Used to tune hyperparameters & pick the best model without touching the test set.",
      testRole: "Locked until the end. Used ONCE for an honest performance estimate.",
      total: "Total",
      tip: "Common rules: 70/15/15 or 80/10/10. The test set should reflect the real distribution and never be used during development.",
      warnSmallTest: "⚠️ Test set is too small — the performance estimate becomes unstable.",
    },
  }[lang];

  const parts = [
    { key: "train", label: L.train, pct: train, color: "#0093D0", role: L.trainRole },
    { key: "val", label: L.val, pct: val, color: "#F5A200", role: L.valRole },
    { key: "test", label: L.test, pct: test, color: "#16a34a", role: L.testRole },
  ];

  return (
    <div>
      <p className="mb-3 text-sm text-slate-600">{L.hint}</p>

      {/* visual strip */}
      <div className="flex h-9 w-full overflow-hidden rounded-lg ring-1 ring-slate-200">
        {parts.map((p) => (
          <div key={p.key} className="flex items-center justify-center text-xs font-semibold text-white transition-all duration-300" style={{ width: `${p.pct}%`, backgroundColor: p.color }}>
            {p.pct >= 10 ? `${p.pct}%` : ""}
          </div>
        ))}
      </div>

      {/* sliders */}
      <div className="mt-4 space-y-3">
        <label className="block text-sm">
          <span className="font-semibold" style={{ color: "#0093D0" }}>{L.train}: {train}%</span>
          <input type="range" min="0" max="100" value={train} onChange={(e) => onTrain(+e.target.value)} className="mt-1 w-full accent-brand-600" />
        </label>
        <label className="block text-sm">
          <span className="font-semibold" style={{ color: "#F5A200" }}>{L.val}: {val}%</span>
          <input type="range" min="0" max={100 - train} value={val} onChange={(e) => onVal(+e.target.value)} className="mt-1 w-full" style={{ accentColor: "#F5A200" }} />
        </label>
        <p className="text-sm">
          <span className="font-semibold" style={{ color: "#16a34a" }}>{L.test}: {test}%</span>
          <span className="ml-2 text-xs text-slate-400">({L.total}: {train + val + test}%)</span>
        </p>
      </div>

      {/* roles */}
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {parts.map((p) => (
          <div key={p.key} className="rounded-lg border border-slate-200 p-3">
            <p className="text-sm font-bold" style={{ color: p.color }}>{p.label}</p>
            <p className="mt-1 text-xs text-slate-600">{p.role}</p>
          </div>
        ))}
      </div>

      {test > 0 && test < 8 && <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">{L.warnSmallTest}</p>}
      <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.tip}</p>
    </div>
  );
}

// ---------- Leakage ----------
function Leakage({ lang }) {
  const [correct, setCorrect] = useState(true); // true = split first, then fit on train only

  const L = {
    id: {
      hint: "Kebocoran data (data leakage) terjadi saat informasi dari data uji ikut 'bocor' ke pelatihan. Akibatnya skor terlihat bagus saat uji, tapi jeblok di dunia nyata.",
      correctBtn: "Cara Benar", wrongBtn: "Cara Salah (bocor)",
      steps: "Urutan langkah",
      // correct flow
      c1: "1. Bagi data → train / test",
      c2: "2. Hitung parameter (mis. mean/std) HANYA dari train",
      c3: "3. Terapkan ke train & test",
      c4: "4. Latih model, lalu uji sekali",
      // wrong flow
      w1: "1. Hitung parameter (mean/std) dari SELURUH data",
      w2: "2. Baru bagi data → train / test",
      w3: "3. Latih model, lalu uji",
      w4: "⚠️ Info dari test sudah 'bocor' ke penskalaan",
      cvTitle: "Skor validasi (silang)", realTitle: "Performa dunia nyata",
      goodReal: "Konsisten — bisa dipercaya",
      badReal: "Anjlok — estimasi menyesatkan",
      correctNote: "✅ Data uji tetap 'tak terlihat'. Skor uji mencerminkan performa nyata.",
      wrongNote: "❌ Skor uji terlihat lebih tinggi dari seharusnya (optimis palsu) karena test ikut memengaruhi prapemrosesan.",
    },
    en: {
      hint: "Data leakage happens when information from the test set 'leaks' into training. The score looks great at test time, but collapses in the real world.",
      correctBtn: "Correct way", wrongBtn: "Wrong way (leak)",
      steps: "Step order",
      c1: "1. Split data → train / test",
      c2: "2. Compute parameters (e.g. mean/std) from train ONLY",
      c3: "3. Apply them to train & test",
      c4: "4. Train model, then test once",
      w1: "1. Compute parameters (mean/std) from ALL data",
      w2: "2. Only then split → train / test",
      w3: "3. Train model, then test",
      w4: "⚠️ Test info already 'leaked' into scaling",
      cvTitle: "Validation score", realTitle: "Real-world performance",
      goodReal: "Consistent — trustworthy",
      badReal: "Drops — misleading estimate",
      correctNote: "✅ The test set stays 'unseen'. The test score reflects real performance.",
      wrongNote: "❌ The test score looks higher than it should (falsely optimistic) because test data influenced preprocessing.",
    },
  }[lang];

  const steps = correct ? [L.c1, L.c2, L.c3, L.c4] : [L.w1, L.w2, L.w3, L.w4];
  // illustrative numbers
  const reported = correct ? 88 : 96;
  const real = correct ? 87 : 74;

  return (
    <div>
      <p className="mb-3 text-sm text-slate-600">{L.hint}</p>

      <div className="mb-4 inline-flex flex-wrap rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
        <button onClick={() => setCorrect(true)} className={`rounded-md px-3 py-1.5 transition ${correct ? "bg-green-600 text-white" : "text-slate-600"}`}>{L.correctBtn}</button>
        <button onClick={() => setCorrect(false)} className={`rounded-md px-3 py-1.5 transition ${!correct ? "bg-red-600 text-white" : "text-slate-600"}`}>{L.wrongBtn}</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* steps */}
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{L.steps}</p>
          <ol className="space-y-1.5">
            {steps.map((s, i) => (
              <li key={i} className={`rounded px-2 py-1 text-sm ${!correct && i === steps.length - 1 ? "bg-red-50 font-semibold text-red-700" : "text-slate-700"}`}>{s}</li>
            ))}
          </ol>
        </div>

        {/* scores */}
        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-600">{L.cvTitle}</span>
              <span className="text-lg font-bold" style={{ color: correct ? "#16a34a" : "#dc2626" }}>{reported}%</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full" style={{ width: `${reported}%`, backgroundColor: correct ? "#16a34a" : "#dc2626" }} />
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-600">{L.realTitle}</span>
              <span className="text-lg font-bold text-slate-800">{real}%</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-slate-700" style={{ width: `${real}%` }} />
            </div>
            <p className="mt-1 text-xs" style={{ color: correct ? "#16a34a" : "#dc2626" }}>{correct ? L.goodReal : L.badReal}</p>
          </div>
        </div>
      </div>

      <p className={`mt-3 rounded-md px-3 py-2 text-xs ${correct ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
        {correct ? L.correctNote : L.wrongNote}
      </p>
    </div>
  );
}

export default function SplitLeakageDemo() {
  const { lang } = useLang();
  const [tab, setTab] = useState("split");

  const L = {
    id: { split: "Pembagian Data", leakage: "Kebocoran Data" },
    en: { split: "Data Split", leakage: "Data Leakage" },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 inline-flex flex-wrap rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
        {[["split", L.split], ["leakage", L.leakage]].map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-md px-3 py-1.5 transition ${tab === k ? "bg-brand-600 text-white" : "text-slate-600"}`}>{label}</button>
        ))}
      </div>
      {tab === "split" ? <Split lang={lang} /> : <Leakage lang={lang} />}
    </div>
  );
}
