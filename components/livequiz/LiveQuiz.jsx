"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";
import AuroraBackground from "../immersive/AuroraBackground";
import Confetti from "../immersive/Confetti";
import { liveQuizQuestions, LIVE_QUIZ_TOTAL } from "@/lib/liveQuizQuestions";

// Kahoot-style LIVE quiz for in-class NLP review (single-screen / projector).
// No backend: the teacher drives one screen. Phases:
//   lobby -> (per question) question -> reveal -> leaderboard -> ... -> final
// Participants register with NIM + name. Scoring = base + speed bonus.
// Final: full ranking table (rank, name, NIM, score) + CSV download.

const QUESTION_SECONDS = 25;
const BASE_POINTS = 1000;

// Kahoot-like answer colors/shapes
const OPT = [
  { bg: "#e4002b", shape: "▲" },
  { bg: "#0093D0", shape: "◆" },
  { bg: "#F5A200", shape: "●" },
  { bg: "#16a34a", shape: "■" },
];

export default function LiveQuiz() {
  const { lang } = useLang();
  const [phase, setPhase] = useState("lobby"); // lobby | question | reveal | leaderboard | final
  const [participants, setParticipants] = useState([]); // {id, nim, name, score, lastGain, answeredQ}
  const [nim, setNim] = useState("");
  const [name, setName] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);
  const timerRef = useRef(null);

  const q = liveQuizQuestions[qIndex];
  const qc = q ? q[lang] : null;

  const L = {
    id: {
      title: "Kuis Live NLP", subtitle: "Review kelas interaktif bergaya Kahoot",
      lobby: "Pendaftaran Peserta", nim: "NIM", name: "Nama lengkap", add: "+ Tambah peserta",
      participants: "Peserta", none: "Belum ada peserta. Tambahkan NIM & nama untuk mulai.",
      start: "🚀 Mulai Kuis", needPlayers: "Tambahkan minimal 1 peserta.",
      question: "Soal", of: "dari", time: "Waktu",
      whoAnswered: "Siapa menjawab benar? (klik peserta yang benar)",
      tapCorrect: "Mode kelas: klik peserta yang menjawab BENAR sebelum waktu habis. Makin cepat, makin besar poin.",
      reveal: "Jawaban benar", nextQ: "Soal berikutnya →", showBoard: "Lihat papan skor →",
      leaderboard: "Papan Skor", rank: "Peringkat", score: "Skor", continue: "Lanjut →",
      final: "🏆 Hasil Akhir", podium: "Podium", fullRank: "Peringkat Lengkap",
      download: "⬇ Unduh hasil (CSV)", restart: "↻ Mulai ulang", explain: "Penjelasan",
      correctNow: "Benar (+poin)", remove: "hapus",
      confirmRestart: "Mulai ulang kuis? Semua skor akan direset.",
    },
    en: {
      title: "NLP Live Quiz", subtitle: "Interactive Kahoot-style class review",
      lobby: "Participant Registration", nim: "Student ID", name: "Full name", add: "+ Add participant",
      participants: "Participants", none: "No participants yet. Add a Student ID & name to start.",
      start: "🚀 Start Quiz", needPlayers: "Add at least 1 participant.",
      question: "Question", of: "of", time: "Time",
      whoAnswered: "Who answered correctly? (click the participants who got it right)",
      tapCorrect: "Classroom mode: click the participants who answered CORRECTLY before time runs out. Faster = more points.",
      reveal: "Correct answer", nextQ: "Next question →", showBoard: "Show scoreboard →",
      leaderboard: "Scoreboard", rank: "Rank", score: "Score", continue: "Continue →",
      final: "🏆 Final Results", podium: "Podium", fullRank: "Full Ranking",
      download: "⬇ Download results (CSV)", restart: "↻ Restart", explain: "Explanation",
      correctNow: "Correct (+pts)", remove: "remove",
      confirmRestart: "Restart the quiz? All scores will be reset.",
    },
  }[lang];

  // ---- lobby ----
  const addParticipant = () => {
    const n = name.trim(), id = nim.trim();
    if (!n || !id) return;
    if (participants.some((p) => p.nim.toLowerCase() === id.toLowerCase())) return; // no dup NIM
    setParticipants((ps) => [...ps, { id: `${id}-${Date.now()}`, nim: id, name: n, score: 0, lastGain: 0, answeredQ: -1 }]);
    setNim(""); setName("");
  };
  const removeParticipant = (id) => setParticipants((ps) => ps.filter((p) => p.id !== id));

  // ---- quiz flow ----
  const startQuiz = () => {
    if (!participants.length) return;
    setParticipants((ps) => ps.map((p) => ({ ...p, score: 0, lastGain: 0, answeredQ: -1 })));
    setQIndex(0);
    goQuestion(0);
  };

  const goQuestion = (idx) => {
    setQIndex(idx);
    setParticipants((ps) => ps.map((p) => ({ ...p, lastGain: 0, answeredQ: -1 })));
    setTimeLeft(QUESTION_SECONDS);
    setPhase("question");
  };

  // countdown during question phase
  useEffect(() => {
    if (phase !== "question") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); setPhase("reveal"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, qIndex]);

  // mark a participant correct during the question (awards points by speed)
  const markCorrect = (pid) => {
    if (phase !== "question") return;
    setParticipants((ps) =>
      ps.map((p) => {
        if (p.id !== pid || p.answeredQ === qIndex) return p;
        const speedBonus = Math.round((timeLeft / QUESTION_SECONDS) * BASE_POINTS);
        const gain = Math.round(BASE_POINTS * 0.5) + speedBonus; // 50% base + up to 100% speed
        return { ...p, score: p.score + gain, lastGain: gain, answeredQ: qIndex };
      })
    );
  };

  const endQuestionEarly = () => { clearInterval(timerRef.current); setPhase("reveal"); };

  const afterReveal = () => setPhase("leaderboard");
  const afterLeaderboard = () => {
    if (qIndex + 1 >= LIVE_QUIZ_TOTAL) setPhase("final");
    else goQuestion(qIndex + 1);
  };

  const restart = () => {
    if (!window.confirm(L.confirmRestart)) return;
    setPhase("lobby");
    setParticipants((ps) => ps.map((p) => ({ ...p, score: 0, lastGain: 0, answeredQ: -1 })));
    setQIndex(0);
  };

  const ranked = useMemo(() => [...participants].sort((a, b) => b.score - a.score), [participants]);

  const downloadCsv = () => {
    const rows = [["Rank", "Name", "NIM", "Score"], ...ranked.map((p, i) => [i + 1, p.name, p.nim, p.score])];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "NLP_LiveQuiz_Results.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  // ---------- RENDER ----------
  return (
    <div className="min-h-[70vh]">
      {/* hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <AuroraBackground />
        <div className="relative mx-auto max-w-5xl px-4 py-10 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">🎮 {L.title}</h1>
          <p className="mt-2 text-brand-100">{L.subtitle}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* ===== LOBBY ===== */}
        {phase === "lobby" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">📝 {L.lobby}</h2>
              <div className="mt-4 space-y-2">
                <input value={nim} onChange={(e) => setNim(e.target.value)} placeholder={L.nim}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-brand-500 focus:outline-none" />
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder={L.name}
                  onKeyDown={(e) => e.key === "Enter" && addParticipant()}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-brand-500 focus:outline-none" />
                <button onClick={addParticipant} className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">{L.add}</button>
              </div>
              <button
                onClick={startQuiz}
                disabled={!participants.length}
                className="mt-4 w-full rounded-lg bg-amber-400 px-4 py-3 font-bold text-slate-900 shadow transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {L.start}
              </button>
              {!participants.length && <p className="mt-2 text-center text-xs text-slate-400">{L.needPlayers}</p>}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">👥 {L.participants} ({participants.length})</h2>
              {participants.length === 0 ? (
                <p className="mt-4 text-sm text-slate-400">{L.none}</p>
              ) : (
                <div className="mt-4 flex flex-wrap gap-2">
                  {participants.map((p) => (
                    <span key={p.id} className="group flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700 ring-1 ring-brand-100">
                      {p.name} <span className="text-xs font-normal text-slate-400">{p.nim}</span>
                      <button onClick={() => removeParticipant(p.id)} className="ml-1 text-slate-300 hover:text-red-500" title={L.remove}>✕</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== QUESTION ===== */}
        {phase === "question" && qc && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">{L.question} {qIndex + 1} / {LIVE_QUIZ_TOTAL}</span>
              <span className={`rounded-full px-4 py-1.5 font-mono text-lg font-bold ${timeLeft <= 5 ? "bg-red-100 text-red-700" : "bg-brand-50 text-brand-700"}`}>⏱ {timeLeft}s</span>
            </div>
            {/* time bar */}
            <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full bg-gradient-to-r from-brand-500 to-amber-400 transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / QUESTION_SECONDS) * 100}%` }} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{qc.q}</h2>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {qc.options.map((opt, oi) => (
                <div key={oi} className="flex items-center gap-3 rounded-xl p-4 text-white shadow" style={{ backgroundColor: OPT[oi].bg }}>
                  <span className="text-2xl">{OPT[oi].shape}</span>
                  <span className="text-lg font-semibold">{opt}</span>
                </div>
              ))}
            </div>

            {/* classroom: click who answered correctly */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-1 text-sm font-semibold text-slate-700">✅ {L.whoAnswered}</p>
              <p className="mb-3 text-xs text-slate-400">{L.tapCorrect}</p>
              <div className="flex flex-wrap gap-2">
                {participants.map((p) => {
                  const done = p.answeredQ === qIndex;
                  return (
                    <button
                      key={p.id}
                      onClick={() => markCorrect(p.id)}
                      disabled={done}
                      className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${done ? "bg-green-500 text-white" : "bg-slate-100 text-slate-700 hover:bg-green-100"}`}
                    >
                      {p.name} {done && `+${p.lastGain}`}
                    </button>
                  );
                })}
              </div>
              <button onClick={endQuestionEarly} className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">{L.showBoard}</button>
            </div>
          </div>
        )}

        {/* ===== REVEAL ===== */}
        {phase === "reveal" && qc && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">{L.reveal}</p>
            <div className="mx-auto mt-3 inline-flex items-center gap-3 rounded-xl px-5 py-3 text-white" style={{ backgroundColor: OPT[q.answer].bg }}>
              <span className="text-2xl">{OPT[q.answer].shape}</span>
              <span className="text-lg font-bold">{qc.options[q.answer]}</span>
            </div>
            <p className="mx-auto mt-4 max-w-xl rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">💡 {L.explain}: {q.explain[lang]}</p>
            <button onClick={afterReveal} className="mt-5 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">{L.showBoard}</button>
          </div>
        )}

        {/* ===== LEADERBOARD ===== */}
        {phase === "leaderboard" && (
          <div>
            <h2 className="mb-4 text-center text-2xl font-extrabold text-slate-900">📊 {L.leaderboard}</h2>
            <div className="mx-auto max-w-xl space-y-2">
              {ranked.map((p, i) => (
                <div key={p.id} className={`flex items-center gap-3 rounded-xl border p-3 transition ${i === 0 ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white"}`}>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${i < 3 ? "bg-amber-400 text-white" : "bg-slate-200 text-slate-600"}`}>{i + 1}</span>
                  <span className="flex-1 font-semibold text-slate-800">{p.name} <span className="text-xs font-normal text-slate-400">{p.nim}</span></span>
                  {p.lastGain > 0 && <span className="text-xs font-bold text-green-600">+{p.lastGain}</span>}
                  <span className="w-20 text-right font-black text-brand-600">{p.score}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button onClick={afterLeaderboard} className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700">
                {qIndex + 1 >= LIVE_QUIZ_TOTAL ? `🏁 ${L.final}` : L.continue}
              </button>
            </div>
          </div>
        )}

        {/* ===== FINAL ===== */}
        {phase === "final" && (
          <div>
            <Confetti fire={1} />
            <h2 className="mb-6 text-center text-3xl font-extrabold text-slate-900">{L.final}</h2>

            {/* podium */}
            <div className="mx-auto mb-8 flex max-w-lg items-end justify-center gap-3">
              {[1, 0, 2].map((pos) => {
                const p = ranked[pos];
                if (!p) return <div key={pos} className="flex-1" />;
                const h = pos === 0 ? "h-28" : pos === 1 ? "h-20" : "h-16";
                const medal = pos === 0 ? "🥇" : pos === 1 ? "🥈" : "🥉";
                return (
                  <div key={pos} className="flex flex-1 flex-col items-center">
                    <div className="text-3xl">{medal}</div>
                    <div className="mt-1 text-center text-sm font-bold text-slate-800">{p.name}</div>
                    <div className="text-xs text-slate-400">{p.nim}</div>
                    <div className={`mt-1 flex ${h} w-full items-start justify-center rounded-t-lg bg-gradient-to-b from-brand-500 to-brand-700 pt-2 font-black text-white`}>{p.score}</div>
                  </div>
                );
              })}
            </div>

            {/* full ranking table */}
            <div className="mx-auto max-w-2xl overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-2">{L.rank}</th><th className="px-4 py-2">{L.name}</th><th className="px-4 py-2">{L.nim}</th><th className="px-4 py-2 text-right">{L.score}</th>
                  </tr>
                </thead>
                <tbody>
                  {ranked.map((p, i) => (
                    <tr key={p.id} className="border-b border-slate-100">
                      <td className="px-4 py-2 font-bold text-slate-700">{i + 1}</td>
                      <td className="px-4 py-2 text-slate-800">{p.name}</td>
                      <td className="px-4 py-2 text-slate-500">{p.nim}</td>
                      <td className="px-4 py-2 text-right font-black text-brand-600">{p.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={downloadCsv} className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">{L.download}</button>
              <button onClick={restart} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">{L.restart}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
