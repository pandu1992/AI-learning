"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LanguageProvider";

// Interactive Bias & Fairness demo.
// Illustrates how skewed HISTORICAL data teaches a model to discriminate, and
// how mitigation shrinks the gap. Two abstract groups (A/B) stand in for any
// protected attribute (race, gender, ...). All synthetic — for teaching.
//
// Model: approval rate learned per group ≈ that group's historical approval
// rate. A "skew" slider sets how unequal history was. Mitigation options:
//  - reweight/rebalance the training data (pull rates toward the fair baseline)
//  - remove the protected attribute + its proxies (reduces, not eliminates, gap)
//  - enforce equal decision threshold (equalize outcomes)

export default function BiasFairnessDemo() {
  const { lang } = useLang();
  const [skew, setSkew] = useState(35); // percentage-point advantage baked into history for group A
  const [mitigation, setMitigation] = useState("none"); // none | reweight | blind | threshold

  const base = 60; // fair baseline approval rate (%)

  const { rateA, rateB, gap, qualifiedNote } = useMemo(() => {
    // historical rates: A advantaged by skew/2, B disadvantaged by skew/2
    let a = base + skew / 2;
    let b = base - skew / 2;

    if (mitigation === "reweight") {
      // rebalance training data toward the fair baseline (strong effect)
      a = base + skew * 0.05;
      b = base - skew * 0.05;
    } else if (mitigation === "blind") {
      // just deleting the label leaves proxy features -> only partial fix
      a = base + skew * 0.28;
      b = base - skew * 0.28;
    } else if (mitigation === "threshold") {
      // enforce equal outcomes explicitly
      a = base;
      b = base;
    }

    a = Math.max(0, Math.min(100, a));
    b = Math.max(0, Math.min(100, b));
    return { rateA: Math.round(a), rateB: Math.round(b), gap: Math.round(Math.abs(a - b)), qualifiedNote: mitigation === "blind" };
  }, [skew, mitigation]);

  const fairnessLevel = gap <= 3 ? "fair" : gap <= 12 ? "some" : "unfair";

  const L = {
    id: {
      hint: "Model belajar dari sejarah. Jika sejarah timpang (mis. satu kelompok lebih sering disetujui), model akan MENIRU dan bahkan memperkuat ketimpangan itu — inilah akar bias, termasuk rasisme algoritmik.",
      scenario: "Skenario: model menyetujui pinjaman (atau lamaran kerja). Kelompok A & B mewakili atribut sensitif — mis. ras, gender, atau suku.",
      skew: "Ketimpangan pada data historis",
      groupA: "Kelompok A", groupB: "Kelompok B",
      approval: "Tingkat persetujuan",
      gapLbl: "Selisih keadilan (fairness gap)",
      mitigation: "Strategi mitigasi",
      m_none: "Tanpa mitigasi", m_none_d: "Model meniru sejarah apa adanya.",
      m_reweight: "Seimbangkan data", m_reweight_d: "Reweighting / rebalancing agar setiap kelompok terwakili adil.",
      m_blind: "Hapus atribut sensitif", m_blind_d: "Menghapus label ras/gender saja TIDAK cukup — fitur proksi (kode pos, nama) masih membocorkannya.",
      m_threshold: "Samakan hasil antar-kelompok", m_threshold_d: "Menyetel ambang agar tingkat persetujuan setara (equalized outcomes).",
      fair: "✅ Relatif adil — selisih kecil.",
      some: "⚠️ Masih ada bias — perlu perbaikan lebih lanjut.",
      unfair: "⛔ Diskriminatif — satu kelompok dirugikan secara sistematis.",
      proxyWarn: "⚠️ Ilusi 'buta warna': gap turun tapi belum hilang karena fitur proksi masih memprediksi atribut sensitif.",
      takeaway: "Intinya: keadilan tidak datang otomatis. Butuh data yang mewakili, audit rutin, definisi keadilan yang eksplisit, dan pengujian dampak per-kelompok.",
    },
    en: {
      hint: "A model learns from history. If history is skewed (e.g. one group approved more often), the model MIMICS and can even amplify that inequality — the root of bias, including algorithmic racism.",
      scenario: "Scenario: a model approves loans (or job applications). Groups A & B stand for a sensitive attribute — e.g. race, gender, or ethnicity.",
      skew: "Skew in the historical data",
      groupA: "Group A", groupB: "Group B",
      approval: "Approval rate",
      gapLbl: "Fairness gap",
      mitigation: "Mitigation strategy",
      m_none: "No mitigation", m_none_d: "The model copies history as-is.",
      m_reweight: "Rebalance the data", m_reweight_d: "Reweighting / rebalancing so each group is represented fairly.",
      m_blind: "Remove sensitive attribute", m_blind_d: "Deleting the race/gender label alone is NOT enough — proxy features (zip code, name) still leak it.",
      m_threshold: "Equalize outcomes across groups", m_threshold_d: "Tune thresholds so approval rates match (equalized outcomes).",
      fair: "✅ Relatively fair — small gap.",
      some: "⚠️ Bias remains — needs further work.",
      unfair: "⛔ Discriminatory — one group is systematically disadvantaged.",
      proxyWarn: "⚠️ 'Color-blind' illusion: the gap drops but doesn't vanish because proxy features still predict the sensitive attribute.",
      takeaway: "Key point: fairness is not automatic. It needs representative data, regular audits, an explicit fairness definition, and per-group impact testing.",
    },
  }[lang];

  const mitigations = [
    { key: "none", label: L.m_none, desc: L.m_none_d },
    { key: "reweight", label: L.m_reweight, desc: L.m_reweight_d },
    { key: "blind", label: L.m_blind, desc: L.m_blind_d },
    { key: "threshold", label: L.m_threshold, desc: L.m_threshold_d },
  ];

  const Bar = ({ label, rate, color }) => (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-700">{label}</span>
        <span className="font-bold" style={{ color }}>{rate}%</span>
      </div>
      <div className="mt-1 h-5 w-full overflow-hidden rounded-md bg-slate-100">
        <div className="h-full rounded-md transition-all duration-500" style={{ width: `${rate}%`, backgroundColor: color }} />
      </div>
    </div>
  );

  const gapColor = fairnessLevel === "fair" ? "#16a34a" : fairnessLevel === "some" ? "#F5A200" : "#dc2626";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-3 text-sm text-slate-600">{L.hint}</p>
      <p className="mb-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">{L.scenario}</p>

      {/* skew slider */}
      <label className="block text-sm font-semibold text-slate-700">
        {L.skew}: <span className="text-brand-600">{skew}</span>
        <input type="range" min="0" max="70" value={skew} onChange={(e) => setSkew(+e.target.value)} className="mt-1 w-full accent-brand-600" />
      </label>

      {/* approval bars */}
      <div className="mt-4 space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{L.approval}</p>
        <Bar label={L.groupA} rate={rateA} color="#0093D0" />
        <Bar label={L.groupB} rate={rateB} color="#7c3aed" />
      </div>

      {/* fairness gap */}
      <div className="mt-4 flex items-center justify-between rounded-lg border p-3" style={{ borderColor: gapColor + "55", backgroundColor: gapColor + "11" }}>
        <span className="text-sm font-semibold text-slate-700">{L.gapLbl}</span>
        <span className="text-lg font-bold" style={{ color: gapColor }}>{gap} pt</span>
      </div>
      <p className="mt-2 text-sm font-medium" style={{ color: gapColor }}>
        {fairnessLevel === "fair" ? L.fair : fairnessLevel === "some" ? L.some : L.unfair}
      </p>
      {qualifiedNote && gap > 3 && <p className="mt-1 text-xs text-amber-700">{L.proxyWarn}</p>}

      {/* mitigation options */}
      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold text-slate-700">{L.mitigation}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {mitigations.map((m) => (
            <button
              key={m.key}
              onClick={() => setMitigation(m.key)}
              className={`rounded-lg border p-3 text-left transition ${mitigation === m.key ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
            >
              <span className="flex items-center gap-2">
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${mitigation === m.key ? "border-brand-600" : "border-slate-300"}`}>
                  {mitigation === m.key && <span className="h-2 w-2 rounded-full bg-brand-600" />}
                </span>
                <span className="text-sm font-semibold text-slate-800">{m.label}</span>
              </span>
              <span className="mt-1 block pl-6 text-xs text-slate-500">{m.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.takeaway}</p>
    </div>
  );
}
