"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "../LanguageProvider";
import PageHero from "../PageHero";
import { certQuestions, CERT_TOTAL } from "@/lib/certQuestions";
import { generateCertificate, scoreTier } from "@/lib/certificate";

const EXAM_SECONDS = 90 * 60; // 1 hour 30 minutes

// phases: "intro" (name gate) -> "exam" (timed) -> "result"
export default function CertificationExam() {
  const { lang } = useLang();
  const [phase, setPhase] = useState("intro");
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState({}); // { [index]: selectedOption }
  const [current, setCurrent] = useState(0);
  const [remaining, setRemaining] = useState(EXAM_SECONDS);
  const [result, setResult] = useState(null); // { score, tier }
  const [downloading, setDownloading] = useState(false);
  const timerRef = useRef(null);

  const L = {
    id: {
      title: "Ujian Sertifikasi Cognia",
      subtitle: "Uji pemahamanmu atas seluruh materi Cognia dan dapatkan sertifikat ber-tanda tangan pengajar.",
      rulesTitle: "Ketentuan ujian",
      rules: [
        "100 soal pilihan ganda merangkum seluruh materi Cognia.",
        "Waktu pengerjaan 1 jam 30 menit (hitung mundur). Jika waktu habis, jawaban otomatis dikumpulkan.",
        "Semua peserta menerima sertifikat.",
        "Skor 81–100 → sertifikat DISTINCTION; 70–80 → LULUS (Passed); di bawah 70 → sertifikat PESERTA (Completion).",
        "Masukkan nama lengkapmu — nama ini akan tercetak di sertifikat.",
      ],
      nameLabel: "Nama lengkap",
      namePlaceholder: "mis. Budi Santoso",
      start: "Mulai Ujian →",
      nameRequired: "Mohon isi nama lengkap terlebih dahulu.",
      timeLeft: "Sisa waktu",
      question: "Soal",
      of: "dari",
      prev: "← Sebelumnya",
      next: "Berikutnya →",
      answered: "terjawab",
      finish: "Selesai & Kumpulkan",
      confirmFinish: "Kumpulkan sekarang? Jawaban tidak bisa diubah setelah dikumpulkan.",
      timeUp: "Waktu habis — jawaban otomatis dikumpulkan.",
      resultTitle: "Hasil Ujian",
      yourScore: "Skormu",
      correct: "jawaban benar",
      download: "⬇ Unduh Sertifikat (PDF)",
      downloading: "Menyiapkan PDF…",
      retake: "Ulangi Ujian",
      home: "← Kembali ke beranda",
      tierTitle: { distinction: "🏅 DISTINCTION", passed: "✅ LULUS (Passed)", completion: "📜 Peserta (Completion)" },
      tierMsg: {
        distinction: "Luar biasa! Kamu menguasai materi dengan sangat baik.",
        passed: "Selamat, kamu lulus ujian sertifikasi!",
        completion: "Terima kasih telah mengikuti. Kamu tetap mendapat sertifikat keikutsertaan — pelajari lagi materinya dan coba lagi!",
      },
      unansweredWarn: "soal belum terjawab",
    },
    en: {
      title: "Cognia Certification Exam",
      subtitle: "Test your understanding of all Cognia material and earn a certificate signed by the instructor.",
      rulesTitle: "Exam rules",
      rules: [
        "100 multiple-choice questions covering all Cognia material.",
        "Time limit 1 hour 30 minutes (countdown). When time runs out, answers are auto-submitted.",
        "Every participant receives a certificate.",
        "Score 81–100 → DISTINCTION certificate; 70–80 → PASSED; below 70 → COMPLETION (participation) certificate.",
        "Enter your full name — it will be printed on the certificate.",
      ],
      nameLabel: "Full name",
      namePlaceholder: "e.g. Budi Santoso",
      start: "Start Exam →",
      nameRequired: "Please enter your full name first.",
      timeLeft: "Time left",
      question: "Question",
      of: "of",
      prev: "← Previous",
      next: "Next →",
      answered: "answered",
      finish: "Finish & Submit",
      confirmFinish: "Submit now? Answers can't be changed after submitting.",
      timeUp: "Time's up — answers were auto-submitted.",
      resultTitle: "Exam Result",
      yourScore: "Your score",
      correct: "correct answers",
      download: "⬇ Download Certificate (PDF)",
      downloading: "Preparing PDF…",
      retake: "Retake Exam",
      home: "← Back to home",
      tierTitle: { distinction: "🏅 DISTINCTION", passed: "✅ PASSED", completion: "📜 Completion" },
      tierMsg: {
        distinction: "Outstanding! You've mastered the material.",
        passed: "Congratulations, you passed the certification exam!",
        completion: "Thanks for taking part. You still get a participation certificate — review the material and try again!",
      },
      unansweredWarn: "unanswered",
    },
  }[lang];

  const answeredCount = Object.keys(answers).length;

  const computeScore = useCallback(() => {
    let s = 0;
    certQuestions.forEach((q, i) => {
      if (answers[i] === q.answer) s++;
    });
    return s;
  }, [answers]);

  const submit = useCallback(
    (auto = false) => {
      if (timerRef.current) clearInterval(timerRef.current);
      const score = computeScore();
      setResult({ score, tier: scoreTier(score, CERT_TOTAL), auto });
      setPhase("result");
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [computeScore]
  );

  // countdown
  useEffect(() => {
    if (phase !== "exam") return;
    timerRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  // auto-submit when time hits 0
  useEffect(() => {
    if (phase === "exam" && remaining === 0) submit(true);
  }, [remaining, phase, submit]);

  const start = () => {
    if (!name.trim()) return;
    setAnswers({});
    setCurrent(0);
    setRemaining(EXAM_SECONDS);
    setResult(null);
    setPhase("exam");
  };

  const retake = () => {
    setPhase("intro");
    setAnswers({});
    setCurrent(0);
    setRemaining(EXAM_SECONDS);
    setResult(null);
  };

  const mmss = useMemo(() => {
    const h = Math.floor(remaining / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;
    const p = (n) => String(n).padStart(2, "0");
    return `${p(h)}:${p(m)}:${p(s)}`;
  }, [remaining]);

  const download = async () => {
    if (!result) return;
    setDownloading(true);
    try {
      await generateCertificate({ name: name.trim(), score: result.score, total: CERT_TOTAL, lang });
    } finally {
      setDownloading(false);
    }
  };

  // ---------- INTRO ----------
  if (phase === "intro") {
    return (
      <div>
        <PageHero icon="🎓" title={L.title} subtitle={L.subtitle} />
        <div className="mx-auto max-w-2xl px-4 py-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">📋 {L.rulesTitle}</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {L.rules.map((r, i) => (
                <li key={i} className="flex gap-2"><span className="text-brand-500">▸</span> {r}</li>
              ))}
            </ul>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-700">{L.nameLabel}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={L.namePlaceholder}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                onKeyDown={(e) => e.key === "Enter" && start()}
              />
              {!name.trim() && <p className="mt-1 text-xs text-slate-400">{L.nameRequired}</p>}
            </div>

            <button
              onClick={start}
              disabled={!name.trim()}
              className="mt-5 w-full rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white shadow transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {L.start}
            </button>
          </div>
          <div className="mt-6">
            <Link href="/" className="text-sm font-semibold text-brand-600 hover:underline">{L.home}</Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------- RESULT ----------
  if (phase === "result" && result) {
    const tier = result.tier;
    const tierColor = tier === "distinction" ? "#0093D0" : tier === "passed" ? "#16a34a" : "#64748b";
    const pct = Math.round((result.score / CERT_TOTAL) * 100);
    return (
      <div>
        <PageHero icon="🏆" title={L.resultTitle} subtitle={name.trim()} />
        <div className="mx-auto max-w-2xl px-4 py-12">
          {result.auto && (
            <p className="mb-4 rounded-lg bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800">⏰ {L.timeUp}</p>
          )}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="text-2xl font-extrabold" style={{ color: tierColor }}>{L.tierTitle[tier]}</div>
            <p className="mt-3 text-sm text-slate-600">{L.tierMsg[tier]}</p>

            <div className="mx-auto mt-6 max-w-xs">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-extrabold" style={{ color: tierColor }}>{result.score}</span>
                <span className="text-xl font-semibold text-slate-400">/ {CERT_TOTAL}</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{pct}% — {result.score} {L.correct}</p>
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: tierColor }} />
              </div>
            </div>

            <button
              onClick={download}
              disabled={downloading}
              className="mt-8 w-full rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white shadow transition hover:bg-brand-700 disabled:opacity-60"
            >
              {downloading ? L.downloading : L.download}
            </button>
            <button
              onClick={retake}
              className="mt-3 w-full rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              {L.retake}
            </button>
          </div>
          <div className="mt-6">
            <Link href="/" className="text-sm font-semibold text-brand-600 hover:underline">{L.home}</Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------- EXAM ----------
  const q = certQuestions[current];
  const qc = q[lang];
  const lowTime = remaining <= 5 * 60; // last 5 minutes

  return (
    <div>
      {/* sticky timer + progress bar */}
      <div className="sticky top-[57px] z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2.5">
          <span className="text-sm font-semibold text-slate-600">
            {L.question} {current + 1} / {CERT_TOTAL}
            <span className="ml-2 text-xs font-normal text-slate-400">({answeredCount} {L.answered})</span>
          </span>
          <span className={`rounded-full px-3 py-1 font-mono text-sm font-bold ${lowTime ? "bg-red-100 text-red-700" : "bg-brand-50 text-brand-700"}`}>
            ⏱ {L.timeLeft}: {mmss}
          </span>
        </div>
        <div className="h-1 w-full bg-slate-100">
          <div className="h-full bg-brand-500 transition-all" style={{ width: `${(answeredCount / CERT_TOTAL) * 100}%` }} />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* question card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">{q.topic}</span>
          <h2 className="mt-2 text-lg font-bold text-slate-900">{qc.q}</h2>
          <div className="mt-4 space-y-2">
            {qc.options.map((opt, oi) => {
              const chosen = answers[current] === oi;
              return (
                <button
                  key={oi}
                  onClick={() => setAnswers((a) => ({ ...a, [current]: oi }))}
                  className={`flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm transition ${
                    chosen ? "border-brand-500 bg-brand-50 text-brand-800" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${chosen ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300 text-slate-400"}`}>
                    {String.fromCharCode(65 + oi)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* nav controls */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
          >
            {L.prev}
          </button>

          {current < CERT_TOTAL - 1 ? (
            <button
              onClick={() => setCurrent((c) => Math.min(CERT_TOTAL - 1, c + 1))}
              className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              {L.next}
            </button>
          ) : (
            <button
              onClick={() => { if (window.confirm(L.confirmFinish)) submit(false); }}
              className="rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              {L.finish}
            </button>
          )}
        </div>

        {/* question navigator grid */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="grid grid-cols-10 gap-1.5">
            {certQuestions.map((_, i) => {
              const done = answers[i] !== undefined;
              const active = i === current;
              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`aspect-square rounded text-[11px] font-semibold transition ${
                    active ? "bg-brand-600 text-white" : done ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              {CERT_TOTAL - answeredCount} {L.unansweredWarn}
            </p>
            <button
              onClick={() => { if (window.confirm(L.confirmFinish)) submit(false); }}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              {L.finish}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
