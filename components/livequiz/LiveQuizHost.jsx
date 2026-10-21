"use client";

// HOST screen (teacher / projector) for the Firebase-backed live NLP quiz.
// Multi-device: students join from their own phones/laptops at /live-quiz/join.
// The system computes score automatically from correctness + speed — no manual
// clicking of who was right.
//
// Flow: idle -> lobby (PIN + QR, players stream in) -> question (timer,
//   students answer on their devices) -> reveal (scores computed from DB) ->
//   leaderboard -> ... -> final (podium + full ranking + CSV).

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { ref, set, update, get, onValue, serverTimestamp, remove } from "firebase/database";
import { db } from "@/lib/firebase";
import { useLang } from "../LanguageProvider";
import AuroraBackground from "../immersive/AuroraBackground";
import Confetti from "../immersive/Confetti";
import { liveQuizQuestions, LIVE_QUIZ_TOTAL } from "@/lib/liveQuizQuestions";
import {
  QUESTION_SECONDS, BASE_POINTS, OPT, makePin, scoreAnswer, paths, playersToRanked,
} from "@/lib/liveQuizGame";
import { useDbValue } from "./useGameDb";

export default function LiveQuizHost() {
  const { lang } = useLang();
  const [pin, setPin] = useState(null);
  const [phase, setPhase] = useState("idle"); // idle | lobby | question | reveal | leaderboard | final
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);
  const [qrUrl, setQrUrl] = useState("");
  const [joinUrl, setJoinUrl] = useState("");
  const timerRef = useRef(null);

  const q = liveQuizQuestions[qIndex];
  const qc = q ? q[lang] : null;

  // live players from DB
  const playersObj = useDbValue(pin ? paths.players(pin) : null);
  const ranked = useMemo(() => playersToRanked(playersObj), [playersObj]);
  const playerCount = ranked.length;

  // answers for current question (live count during the question)
  const answersObj = useDbValue(pin && phase === "question" ? paths.answers(pin, qIndex) : null);
  const answeredCount = answersObj ? Object.keys(answersObj).length : 0;

  const L = {
    id: {
      title: "Kuis Live NLP — Host", subtitle: "Mahasiswa join dari HP/laptop masing-masing",
      create: "🎬 Buat Sesi Kuis", pin: "PIN Permainan", joinAt: "Buka di HP:",
      scanQr: "Pindai QR untuk bergabung", waiting: "Menunggu peserta bergabung…",
      joined: "peserta bergabung", startQuiz: "🚀 Mulai Kuis", needPlayers: "Minimal 1 peserta untuk memulai.",
      question: "Soal", time: "Waktu", answered: "menjawab",
      endEarly: "Hentikan & tampilkan jawaban →", reveal: "Jawaban benar", explain: "Penjelasan",
      showBoard: "Lihat papan skor →", leaderboard: "Papan Skor", score: "Skor",
      rank: "Peringkat", name: "Nama", nim: "NIM", nextQ: "Soal berikutnya →", toFinal: "🏁 Hasil akhir",
      final: "🏆 Hasil Akhir", podium: "Podium", fullRank: "Peringkat Lengkap",
      download: "⬇ Unduh hasil (CSV)", newGame: "↻ Sesi baru", correct: "benar", of: "dari",
      noAnswer: "Belum ada yang menjawab", closing: "Menutup sesi…",
    },
    en: {
      title: "NLP Live Quiz — Host", subtitle: "Students join from their own phone/laptop",
      create: "🎬 Create Quiz Session", pin: "Game PIN", joinAt: "Open on your phone:",
      scanQr: "Scan the QR to join", waiting: "Waiting for participants to join…",
      joined: "participants joined", startQuiz: "🚀 Start Quiz", needPlayers: "Need at least 1 participant to start.",
      question: "Question", time: "Time", answered: "answered",
      endEarly: "Stop & reveal answer →", reveal: "Correct answer", explain: "Explanation",
      showBoard: "Show scoreboard →", leaderboard: "Scoreboard", score: "Score",
      rank: "Rank", name: "Name", nim: "Student ID", nextQ: "Next question →", toFinal: "🏁 Final results",
      final: "🏆 Final Results", podium: "Podium", fullRank: "Full Ranking",
      download: "⬇ Download results (CSV)", newGame: "↻ New session", correct: "correct", of: "of",
      noAnswer: "No answers yet", closing: "Closing session…",
    },
  }[lang];

  // ---- create a new game session ----
  const createGame = useCallback(async () => {
    const newPin = makePin();
    const base =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname.replace(/\/host\/?$/, "")}/join`
        : "/live-quiz/join";
    const url = `${base}?pin=${newPin}`;
    await set(ref(db, paths.game(newPin)), {
      meta: {
        status: "lobby",
        currentQ: 0,
        questionStartAt: 0,
        total: LIVE_QUIZ_TOTAL,
        createdAt: serverTimestamp(),
      },
    });
    setPin(newPin);
    setPhase("lobby");
    setQIndex(0);
    setJoinUrl(url);
    try {
      const dataUrl = await QRCode.toDataURL(url, { width: 320, margin: 1 });
      setQrUrl(dataUrl);
    } catch {
      setQrUrl("");
    }
  }, []);

  // push meta changes to DB
  const pushMeta = useCallback(
    (patch) => (pin ? update(ref(db, paths.meta(pin)), patch) : Promise.resolve()),
    [pin]
  );

  // ---- start quiz ----
  const startQuiz = useCallback(async () => {
    if (!pin || playerCount === 0) return;
    await goQuestion(0);
  }, [pin, playerCount]);

  const goQuestion = useCallback(
    async (idx) => {
      setQIndex(idx);
      setTimeLeft(QUESTION_SECONDS);
      await pushMeta({ status: "question", currentQ: idx, questionStartAt: serverTimestamp() });
      setPhase("question");
    },
    [pushMeta]
  );

  // countdown
  useEffect(() => {
    if (phase !== "question") return undefined;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          revealAnswer();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, qIndex]);

  // ---- reveal: compute scores from DB answers ----
  const revealAnswer = useCallback(async () => {
    clearInterval(timerRef.current);
    if (!pin) return;
    const qi = qIndex;
    const correctIdx = liveQuizQuestions[qi].answer;

    // read meta (for questionStartAt) + answers + players
    const [metaSnap, ansSnap, playersSnap] = await Promise.all([
      get(ref(db, paths.meta(pin))),
      get(ref(db, paths.answers(pin, qi))),
      get(ref(db, paths.players(pin))),
    ]);
    const meta = metaSnap.val() || {};
    const answers = ansSnap.val() || {};
    const players = playersSnap.val() || {};
    const startAt = meta.questionStartAt || 0;

    const updates = {};
    Object.keys(players).forEach((pid) => {
      const a = answers[pid];
      let gain = 0;
      if (a && typeof a.choice === "number") {
        const elapsedMs = Math.max(0, (a.answeredAt || startAt) - startAt);
        gain = scoreAnswer({ correct: a.choice === correctIdx, elapsedMs });
      }
      const prev = players[pid].score || 0;
      updates[`${pid}/score`] = prev + gain;
      updates[`${pid}/lastGain`] = gain;
      updates[`${pid}/lastCorrect`] = !!(a && a.choice === correctIdx);
    });
    await update(ref(db, paths.players(pin)), updates);
    await pushMeta({ status: "reveal" });
    setPhase("reveal");
  }, [pin, qIndex, pushMeta]);

  const endEarly = useCallback(() => {
    clearInterval(timerRef.current);
    revealAnswer();
  }, [revealAnswer]);

  const toLeaderboard = useCallback(async () => {
    await pushMeta({ status: "leaderboard" });
    setPhase("leaderboard");
  }, [pushMeta]);

  const afterLeaderboard = useCallback(async () => {
    if (qIndex + 1 >= LIVE_QUIZ_TOTAL) {
      await pushMeta({ status: "final" });
      setPhase("final");
    } else {
      await goQuestion(qIndex + 1);
    }
  }, [qIndex, pushMeta, goQuestion]);

  const newGame = useCallback(async () => {
    if (pin) {
      try { await remove(ref(db, paths.game(pin))); } catch { /* ignore */ }
    }
    setPin(null);
    setPhase("idle");
    setQIndex(0);
    setQrUrl("");
    setJoinUrl("");
  }, [pin]);

  const downloadCsv = useCallback(() => {
    const rows = [["Rank", "Name", "NIM", "Score"], ...ranked.map((p, i) => [i + 1, p.name, p.nim, p.score || 0])];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "NLP_LiveQuiz_Results.csv"; a.click();
    URL.revokeObjectURL(url);
  }, [ranked]);

  // ---------- RENDER ----------
  return (
    <div className="min-h-[70vh]">
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <AuroraBackground />
        <div className="relative mx-auto max-w-5xl px-4 py-10 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">🎮 {L.title}</h1>
          <p className="mt-2 text-brand-100">{L.subtitle}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* ===== IDLE ===== */}
        {phase === "idle" && (
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-slate-600">{lang === "id"
              ? "Buat sesi untuk menampilkan PIN & QR. Mahasiswa bergabung dari perangkat masing-masing."
              : "Create a session to show the PIN & QR. Students join from their own devices."}</p>
            <button onClick={createGame} className="mt-5 w-full rounded-lg bg-amber-400 px-4 py-3 font-bold text-slate-900 shadow transition hover:bg-amber-300">{L.create}</button>
          </div>
        )}

        {/* ===== LOBBY ===== */}
        {phase === "lobby" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">{L.pin}</p>
              <p className="my-2 font-mono text-5xl font-black tracking-[0.3em] text-brand-700">{pin}</p>
              {qrUrl && <img src={qrUrl} alt="Join QR" className="mx-auto mt-3 h-44 w-44 rounded-lg border border-slate-200" />}
              <p className="mt-3 text-xs text-slate-400">{L.scanQr}</p>
              <p className="mt-2 break-all text-xs text-slate-500">{L.joinAt} <span className="font-semibold text-brand-600">{joinUrl}</span></p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">👥 {playerCount} {L.joined}</h2>
              {playerCount === 0 ? (
                <p className="mt-4 animate-pulse text-sm text-slate-400">{L.waiting}</p>
              ) : (
                <div className="mt-4 flex max-h-60 flex-wrap gap-2 overflow-y-auto">
                  {ranked.map((p) => (
                    <span key={p.id} className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700 ring-1 ring-brand-100">
                      {p.name} <span className="text-xs font-normal text-slate-400">{p.nim}</span>
                    </span>
                  ))}
                </div>
              )}
              <button onClick={startQuiz} disabled={playerCount === 0}
                className="mt-5 w-full rounded-lg bg-amber-400 px-4 py-3 font-bold text-slate-900 shadow transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50">{L.startQuiz}</button>
              {playerCount === 0 && <p className="mt-2 text-center text-xs text-slate-400">{L.needPlayers}</p>}
            </div>
          </div>
        )}

        {/* ===== QUESTION ===== */}
        {phase === "question" && qc && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">{L.question} {qIndex + 1} / {LIVE_QUIZ_TOTAL}</span>
              <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">{answeredCount} / {playerCount} {L.answered}</span>
              <span className={`rounded-full px-4 py-1.5 font-mono text-lg font-bold ${timeLeft <= 5 ? "bg-red-100 text-red-700" : "bg-brand-50 text-brand-700"}`}>⏱ {timeLeft}s</span>
            </div>
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
            <div className="mt-6 text-center">
              <button onClick={endEarly} className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">{L.endEarly}</button>
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
            <button onClick={toLeaderboard} className="mt-5 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">{L.showBoard}</button>
          </div>
        )}

        {/* ===== LEADERBOARD ===== */}
        {phase === "leaderboard" && (
          <div>
            <h2 className="mb-4 text-center text-2xl font-extrabold text-slate-900">📊 {L.leaderboard}</h2>
            <div className="mx-auto max-w-xl space-y-2">
              {ranked.slice(0, 10).map((p, i) => (
                <div key={p.id} className={`flex items-center gap-3 rounded-xl border p-3 ${i === 0 ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white"}`}>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${i < 3 ? "bg-amber-400 text-white" : "bg-slate-200 text-slate-600"}`}>{i + 1}</span>
                  <span className="flex-1 font-semibold text-slate-800">{p.name} <span className="text-xs font-normal text-slate-400">{p.nim}</span></span>
                  {p.lastGain > 0 && <span className="text-xs font-bold text-green-600">+{p.lastGain}</span>}
                  <span className="w-20 text-right font-black text-brand-600">{p.score || 0}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button onClick={afterLeaderboard} className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700">
                {qIndex + 1 >= LIVE_QUIZ_TOTAL ? L.toFinal : L.nextQ}
              </button>
            </div>
          </div>
        )}

        {/* ===== FINAL ===== */}
        {phase === "final" && (
          <div>
            <Confetti fire={1} />
            <h2 className="mb-6 text-center text-3xl font-extrabold text-slate-900">{L.final}</h2>
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
                    <div className={`mt-1 flex ${h} w-full items-start justify-center rounded-t-lg bg-gradient-to-b from-brand-500 to-brand-700 pt-2 font-black text-white`}>{p.score || 0}</div>
                  </div>
                );
              })}
            </div>
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
                      <td className="px-4 py-2 text-right font-black text-brand-600">{p.score || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={downloadCsv} className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">{L.download}</button>
              <button onClick={newGame} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">{L.newGame}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
