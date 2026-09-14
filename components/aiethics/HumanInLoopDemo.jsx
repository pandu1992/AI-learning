"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LanguageProvider";

// Interactive Human-in-the-Loop / oversight demo.
// The learner picks a use case's RISK level and an AUTONOMY level (how much the
// AI decides alone). The demo derives the appropriate oversight mode and flags
// whether that autonomy is acceptable for the risk — teaching that the higher
// the stakes, the more human control is required. All illustrative.

// autonomy: 0 = human decides (AI only suggests) ... 3 = fully autonomous
const AUTONOMY = [
  { key: 0, id: "AI menyarankan, manusia memutuskan", en: "AI suggests, human decides" },
  { key: 1, id: "AI memutuskan, manusia menyetujui dulu", en: "AI decides, human approves first" },
  { key: 2, id: "AI bertindak, manusia memantau & bisa membatalkan", en: "AI acts, human monitors & can override" },
  { key: 3, id: "AI sepenuhnya otonom (tanpa manusia)", en: "Fully autonomous (no human)" },
];

// max acceptable autonomy per risk level
// minimal risk -> full auto ok; high risk -> at most approve-first; unacceptable risk -> not allowed at all
const RISKS = [
  { key: "minimal", maxAuto: 3, color: "#16a34a", id: { name: "Risiko minimal", ex: "Filter spam, rekomendasi lagu" }, en: { name: "Minimal risk", ex: "Spam filter, song recommendations" } },
  { key: "limited", maxAuto: 2, color: "#0093D0", id: { name: "Risiko terbatas", ex: "Chatbot layanan pelanggan" }, en: { name: "Limited risk", ex: "Customer-service chatbot" } },
  { key: "high", maxAuto: 1, color: "#F5A200", id: { name: "Risiko tinggi", ex: "Seleksi kerja, skoring kredit, diagnosis" }, en: { name: "High risk", ex: "Hiring, credit scoring, diagnosis" } },
  { key: "unacceptable", maxAuto: -1, color: "#dc2626", id: { name: "Risiko tak dapat diterima", ex: "Senjata otonom mematikan, skor sosial" }, en: { name: "Unacceptable risk", ex: "Lethal autonomous weapons, social scoring" } },
];

export default function HumanInLoopDemo() {
  const { lang } = useLang();
  const [risk, setRisk] = useState("high");
  const [auto, setAuto] = useState(1);

  const riskObj = RISKS.find((r) => r.key === risk);

  const status = useMemo(() => {
    if (riskObj.maxAuto < 0) return "prohibited";
    return auto <= riskObj.maxAuto ? "ok" : "danger";
  }, [risk, auto, riskObj]);

  const L = {
    id: {
      hint: "Semakin tinggi taruhannya, semakin banyak kendali manusia yang wajib ada. Pilih tingkat risiko lalu atur seberapa otonom AI-nya — lihat apakah kombinasinya dapat diterima.",
      riskLbl: "Tingkat risiko penggunaan", example: "Contoh",
      autoLbl: "Tingkat otonomi AI",
      oversight: "Mode pengawasan yang sesuai",
      // oversight mode names by autonomy index
      mode0: "Human-in-the-loop — manusia di dalam setiap keputusan",
      mode1: "Human-in-the-loop — manusia menyetujui sebelum aksi",
      mode2: "Human-on-the-loop — manusia mengawasi & bisa intervensi",
      mode3: "Tanpa manusia — otonomi penuh",
      ok: "✅ Dapat diterima — tingkat pengawasan cocok dengan risiko.",
      danger: "⛔ Terlalu otonom untuk risiko ini — WAJIB tambah pengawasan/kendali manusia.",
      prohibited: "⛔ Dilarang — penggunaan ini tidak boleh diotomatiskan sama sekali (dan sering dilarang total).",
      recommend: "Rekomendasi",
      recOk: "Pertahankan titik henti (checkpoint) manusia, catat keputusan (audit trail), dan sediakan cara banding.",
      recDanger: "Turunkan otonomi hingga manusia menyetujui/bisa membatalkan setiap keputusan penting, plus jelaskan alasan keputusan.",
      recProhibited: "Hentikan. Untuk kelas risiko ini, keputusan tak boleh diserahkan sepenuhnya ke mesin.",
      why: "Mengapa human-in-the-loop? Manusia memberi penilaian kontekstual, tanggung jawab hukum/etika, dan rem darurat ketika model salah atau menghadapi situasi di luar latihannya.",
    },
    en: {
      hint: "The higher the stakes, the more human control is required. Pick a risk level then set how autonomous the AI is — see whether the combination is acceptable.",
      riskLbl: "Risk level of the use case", example: "Example",
      autoLbl: "AI autonomy level",
      oversight: "Appropriate oversight mode",
      mode0: "Human-in-the-loop — a human is inside every decision",
      mode1: "Human-in-the-loop — a human approves before action",
      mode2: "Human-on-the-loop — a human supervises & can intervene",
      mode3: "No human — full autonomy",
      ok: "✅ Acceptable — the oversight level fits the risk.",
      danger: "⛔ Too autonomous for this risk — you MUST add human oversight/control.",
      prohibited: "⛔ Prohibited — this use should not be automated at all (and is often banned outright).",
      recommend: "Recommendation",
      recOk: "Keep the human checkpoint, log decisions (audit trail), and provide an appeal path.",
      recDanger: "Lower autonomy so a human approves/can override each important decision, and explain the reasons behind decisions.",
      recProhibited: "Stop. For this risk class, decisions must not be handed fully to a machine.",
      why: "Why human-in-the-loop? Humans provide contextual judgment, legal/ethical accountability, and an emergency brake when the model is wrong or faces situations outside its training.",
    },
  }[lang];

  const modeName = [L.mode0, L.mode1, L.mode2, L.mode3][auto];
  const statusColor = status === "ok" ? "#16a34a" : "#dc2626";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      {/* risk selector */}
      <p className="mb-2 text-sm font-semibold text-slate-700">{L.riskLbl}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {RISKS.map((r) => (
          <button
            key={r.key}
            onClick={() => setRisk(r.key)}
            className={`rounded-lg border-2 p-3 text-left transition ${risk === r.key ? "" : "border-slate-200 hover:border-slate-300"}`}
            style={risk === r.key ? { borderColor: r.color, backgroundColor: r.color + "11" } : {}}
          >
            <span className="block text-sm font-bold" style={{ color: r.color }}>{r[lang].name}</span>
            <span className="mt-0.5 block text-xs text-slate-500">{L.example}: {r[lang].ex}</span>
          </button>
        ))}
      </div>

      {/* autonomy slider */}
      <div className="mt-5">
        <p className="mb-1 text-sm font-semibold text-slate-700">{L.autoLbl}</p>
        <input type="range" min="0" max="3" value={auto} onChange={(e) => setAuto(+e.target.value)} className="w-full accent-brand-600" />
        <div className="mt-1 flex justify-between text-[10px] text-slate-400">
          <span>0</span><span>1</span><span>2</span><span>3</span>
        </div>
        <p className="mt-1 text-sm text-slate-700">{AUTONOMY[auto][lang]}</p>
      </div>

      {/* oversight mode */}
      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{L.oversight}</p>
        <p className="mt-1 text-sm font-semibold text-slate-800">{modeName}</p>
      </div>

      {/* verdict */}
      <div className="mt-4 rounded-xl p-4 ring-1" style={{ backgroundColor: statusColor + "11", borderColor: statusColor, boxShadow: `inset 0 0 0 1px ${statusColor}33` }}>
        <p className="text-sm font-bold" style={{ color: statusColor }}>
          {status === "ok" ? L.ok : status === "prohibited" ? L.prohibited : L.danger}
        </p>
        <p className="mt-2 text-sm text-slate-700">
          <span className="font-semibold">{L.recommend}:</span>{" "}
          {status === "ok" ? L.recOk : status === "prohibited" ? L.recProhibited : L.recDanger}
        </p>
      </div>

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.why}</p>
    </div>
  );
}
