"use client";

import { useMemo, useState } from "react";
import { useLang } from "../LanguageProvider";

// Interactive "When is it OK / when is it NOT OK" ethics judgment game.
// The learner reads a real-world AI use case and picks a verdict:
//   allowed | safeguards | forbidden
// then gets feedback with the intended risk tier + reasoning + a running score.
// Verdicts are original teaching judgments loosely inspired by risk-based
// frameworks (e.g. risk tiers common in AI governance) — simplified for learning.

// verdict keys: "allowed" | "safeguards" | "forbidden"
const SCENARIOS = [
  {
    key: "spam",
    verdict: "allowed",
    id: {
      title: "Filter spam email",
      text: "Sebuah layanan email memakai AI untuk menandai email spam ke folder terpisah. Pengguna bisa mengembalikan email yang salah tandai.",
      why: "Risiko rendah, dampak kesalahan kecil & bisa dibatalkan pengguna. Ini penggunaan AI yang lazim dan bermanfaat.",
    },
    en: {
      title: "Email spam filter",
      text: "An email service uses AI to move spam to a separate folder. Users can restore anything misflagged.",
      why: "Low risk, small and reversible errors. A common, beneficial use of AI.",
    },
  },
  {
    key: "hiring",
    verdict: "safeguards",
    id: {
      title: "Menyaring lamaran kerja",
      text: "Sebuah perusahaan memakai AI untuk memeringkat pelamar kerja secara otomatis dan menolak yang skornya rendah tanpa ditinjau manusia.",
      why: "Boleh MEMBANTU menyaring, tetapi keputusan menolak tak boleh sepenuhnya otomatis: berisiko bias (gender/ras/usia). Wajib ada tinjauan manusia, audit bias, dan transparansi.",
    },
    en: {
      title: "Screening job applications",
      text: "A company uses AI to auto-rank job applicants and reject low scores with no human review.",
      why: "AI may ASSIST screening, but rejection shouldn't be fully automated: high bias risk (gender/race/age). Requires human review, bias audits, and transparency.",
    },
  },
  {
    key: "socialscore",
    verdict: "forbidden",
    id: {
      title: "Skor sosial warga",
      text: "Sebuah pihak ingin memberi setiap warga 'skor sosial' dari perilaku sehari-hari, lalu membatasi akses layanan publik bagi yang skornya rendah.",
      why: "Penilaian sosial massal seperti ini dianggap merugikan hak asasi dan sangat rawan disalahgunakan. Umumnya dilarang dalam kerangka etika/hukum AI.",
    },
    en: {
      title: "Citizen social scoring",
      text: "A party wants to give every citizen a 'social score' from everyday behavior, then restrict public services for low scores.",
      why: "Mass social scoring is considered harmful to human rights and highly prone to abuse. Generally prohibited under AI ethics/legal frameworks.",
    },
  },
  {
    key: "medical",
    verdict: "safeguards",
    id: {
      title: "Bantu diagnosis medis",
      text: "AI menganalisis citra rontgen dan menyarankan kemungkinan diagnosis kepada dokter.",
      why: "Sangat bermanfaat, tetapi taruhannya nyawa. Harus sebagai ALAT BANTU: dokter tetap membuat keputusan akhir, dengan validasi klinis dan pemantauan.",
    },
    en: {
      title: "Assisting medical diagnosis",
      text: "An AI analyzes X-ray images and suggests possible diagnoses to a doctor.",
      why: "Very beneficial, but life-critical. Must be a DECISION-SUPPORT tool: the doctor makes the final call, with clinical validation and monitoring.",
    },
  },
  {
    key: "deepfake",
    verdict: "forbidden",
    id: {
      title: "Deepfake tanpa izin",
      text: "Membuat video wajah seseorang mengatakan hal yang tak pernah ia ucapkan, lalu menyebarkannya tanpa persetujuannya.",
      why: "Memalsukan identitas tanpa izin menipu publik dan merugikan korban. Ini penyalahgunaan yang jelas melanggar etika (dan sering melanggar hukum).",
    },
    en: {
      title: "Non-consensual deepfake",
      text: "Creating a video of someone's face saying things they never said, then spreading it without consent.",
      why: "Impersonating someone without consent deceives the public and harms the victim. A clear ethical (and often legal) violation.",
    },
  },
  {
    key: "recommend",
    verdict: "allowed",
    id: {
      title: "Rekomendasi produk",
      text: "Toko online menyarankan produk berdasarkan riwayat belanja, dengan opsi mematikan personalisasi.",
      why: "Risiko rendah, memberi nilai bagi pengguna, dan ada kontrol (opt-out) serta privasi yang dihormati.",
    },
    en: {
      title: "Product recommendations",
      text: "An online store suggests products from shopping history, with an option to turn off personalization.",
      why: "Low risk, adds user value, provides control (opt-out), and respects privacy.",
    },
  },
  {
    key: "surveillance",
    verdict: "forbidden",
    id: {
      title: "Pengawasan wajah massal diam-diam",
      text: "Memasang pengenalan wajah untuk melacak dan mengidentifikasi setiap orang di ruang publik secara diam-diam, tanpa dasar hukum maupun persetujuan.",
      why: "Pengawasan biometrik massal tanpa persetujuan melanggar privasi secara serius dan berpotensi menekan kebebasan. Termasuk kategori yang dilarang.",
    },
    en: {
      title: "Covert mass face surveillance",
      text: "Deploying face recognition to covertly track and identify everyone in public spaces, with no legal basis or consent.",
      why: "Mass biometric surveillance without consent is a serious privacy violation and can chill freedoms. A prohibited category.",
    },
  },
  {
    key: "tutor",
    verdict: "safeguards",
    id: {
      title: "Tutor AI untuk anak",
      text: "Aplikasi belajar memakai AI untuk menjawab pertanyaan anak-anak secara bebas.",
      why: "Bermanfaat, tetapi menyangkut anak: butuh penyaringan konten, pengawasan orang tua/guru, perlindungan data anak, dan penanganan jawaban keliru.",
    },
    en: {
      title: "AI tutor for children",
      text: "A learning app uses AI to freely answer children's questions.",
      why: "Beneficial, but involves children: needs content filtering, parent/teacher oversight, child-data protection, and handling of wrong answers.",
    },
  },
];

const VERDICTS = ["allowed", "safeguards", "forbidden"];

const VERDICT_META = {
  allowed: { color: "#16a34a", bg: "bg-green-50", ring: "ring-green-200", text: "text-green-700", icon: "✅" },
  safeguards: { color: "#F5A200", bg: "bg-amber-50", ring: "ring-amber-200", text: "text-amber-700", icon: "⚠️" },
  forbidden: { color: "#dc2626", bg: "bg-red-50", ring: "ring-red-200", text: "text-red-700", icon: "⛔" },
};

export default function EthicsDecisionDemo() {
  const { lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState({ correct: 0, answered: 0 });

  const sc = SCENARIOS[idx];

  const L = {
    id: {
      hint: "Nilai tiap skenario: apakah penggunaan AI ini boleh, boleh dengan pengaman, atau tidak boleh? Klik pilihanmu, lalu lihat alasannya.",
      allowed: "Boleh", safeguards: "Boleh, dengan pengaman", forbidden: "Tidak boleh",
      correct: "Tepat!", wrong: "Kurang tepat.",
      reason: "Alasan", next: "Skenario berikutnya →", restart: "Ulangi dari awal",
      scoreLbl: "Skor", of: "dari", done: "🎉 Selesai! Kamu menilai semua skenario.",
      progress: "Skenario",
      legend: "Tiga tingkat keputusan",
      lgAllowed: "risiko rendah, dampak kecil/dapat dibatalkan",
      lgSafeguards: "bermanfaat tapi berisiko — butuh tinjauan manusia, audit, transparansi",
      lgForbidden: "merugikan hak/keselamatan — tidak etis (sering ilegal)",
    },
    en: {
      hint: "Judge each scenario: is this AI use allowed, allowed with safeguards, or not allowed? Pick your answer, then see the reasoning.",
      allowed: "Allowed", safeguards: "Allowed, with safeguards", forbidden: "Not allowed",
      correct: "Correct!", wrong: "Not quite.",
      reason: "Reason", next: "Next scenario →", restart: "Start over",
      scoreLbl: "Score", of: "of", done: "🎉 Done! You judged every scenario.",
      progress: "Scenario",
      legend: "Three decision tiers",
      lgAllowed: "low risk, small/reversible impact",
      lgSafeguards: "beneficial but risky — needs human review, audits, transparency",
      lgForbidden: "harms rights/safety — unethical (often illegal)",
    },
  }[lang];

  const verdictLabel = (v) => L[v];

  const choose = (v) => {
    if (picked) return; // already answered this scenario
    setPicked(v);
    setScore((s) => ({ correct: s.correct + (v === sc.verdict ? 1 : 0), answered: s.answered + 1 }));
  };

  const next = () => {
    setPicked(null);
    setIdx((i) => Math.min(i + 1, SCENARIOS.length - 1));
  };

  const restart = () => {
    setPicked(null);
    setIdx(0);
    setScore({ correct: 0, answered: 0 });
  };

  const isLast = idx === SCENARIOS.length - 1;
  const finished = isLast && picked;
  const correctMeta = VERDICT_META[sc.verdict];
  const gotIt = picked === sc.verdict;

  const progressPct = useMemo(() => ((idx + (picked ? 1 : 0)) / SCENARIOS.length) * 100, [idx, picked]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-3 text-sm text-slate-600">{L.hint}</p>

      {/* progress + score */}
      <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
        <span>{L.progress} {idx + 1} / {SCENARIOS.length}</span>
        <span className="font-semibold text-brand-700">{L.scoreLbl}: {score.correct} {L.of} {score.answered}</span>
      </div>
      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-brand-600 transition-all duration-300" style={{ width: `${progressPct}%` }} />
      </div>

      {/* scenario card */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="font-bold text-slate-900">{sc[lang].title}</h3>
        <p className="mt-1 text-sm text-slate-700">{sc[lang].text}</p>
      </div>

      {/* verdict buttons */}
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {VERDICTS.map((v) => {
          const m = VERDICT_META[v];
          const chosen = picked === v;
          const showAsAnswer = picked && v === sc.verdict;
          return (
            <button
              key={v}
              onClick={() => choose(v)}
              disabled={!!picked}
              className={`rounded-lg border-2 p-3 text-sm font-semibold transition ${
                showAsAnswer
                  ? `${m.bg} ${m.text}`
                  : chosen
                  ? `${m.bg} ${m.text} opacity-90`
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
              style={showAsAnswer || chosen ? { borderColor: m.color } : {}}
            >
              <span className="mr-1">{m.icon}</span>{verdictLabel(v)}
            </button>
          );
        })}
      </div>

      {/* feedback */}
      {picked && (
        <div className={`mt-4 rounded-xl p-4 ring-1 ${correctMeta.bg} ${correctMeta.ring}`}>
          <p className={`text-sm font-bold ${gotIt ? "text-green-700" : "text-red-700"}`}>
            {gotIt ? L.correct : L.wrong} <span className={correctMeta.text}>{correctMeta.icon} {verdictLabel(sc.verdict)}</span>
          </p>
          <p className="mt-1 text-sm text-slate-700"><span className="font-semibold">{L.reason}:</span> {sc[lang].why}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {!isLast && (
              <button onClick={next} className="rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">{L.next}</button>
            )}
            <button onClick={restart} className="rounded-lg border border-slate-300 px-4 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">{L.restart}</button>
          </div>
        </div>
      )}

      {finished && <p className="mt-3 text-sm font-semibold text-brand-700">{L.done}</p>}

      {/* legend */}
      <div className="mt-5 space-y-1.5 border-t border-slate-100 pt-4 text-xs text-slate-600">
        <p className="font-semibold text-slate-700">{L.legend}:</p>
        <p><span className="font-semibold text-green-700">✅ {L.allowed}</span> — {L.lgAllowed}</p>
        <p><span className="font-semibold text-amber-600">⚠️ {L.safeguards}</span> — {L.lgSafeguards}</p>
        <p><span className="font-semibold text-red-700">⛔ {L.forbidden}</span> — {L.lgForbidden}</p>
      </div>
    </div>
  );
}
