"use client";

// STUDENT device screen for the Firebase-backed live NLP quiz.
// Student enters PIN -> NIM + name -> then answers each question on their own
// phone/laptop. The tap is timestamped; the host computes score from
// correctness + speed. Faster correct answers earn more points.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ref, set, get, serverTimestamp } from "firebase/database";
import { db } from "@/lib/firebase";
import { useLang } from "../LanguageProvider";
import AuroraBackground from "../immersive/AuroraBackground";
import { liveQuizQuestions, LIVE_QUIZ_TOTAL } from "@/lib/liveQuizQuestions";
import { OPT, paths, playersToRanked } from "@/lib/liveQuizGame";
import { useDbValue } from "./useGameDb";

function readPinFromUrl() {
  if (typeof window === "undefined") return "";
  const u = new URL(window.location.href);
  return u.searchParams.get("pin") || "";
}

export default function LiveQuizJoin() {
  const { lang } = useLang();
  const [stage, setStage] = useState("enterPin"); // enterPin | register | playing
  const [pin, setPin] = useState("");
  const [nim, setNim] = useState("");
  const [name, setName] = useState("");
  const [playerId, setPlayerId] = useState(null);
  const [error, setError] = useState("");
  const [myChoice, setMyChoice] = useState(null); // index chosen for current q
  const lastQ = useRef(-1);

  // prefill PIN from ?pin= and auto-advance to register
  useEffect(() => {
    const p = readPinFromUrl();
    if (p) { setPin(p); setStage("register"); }
  }, []);

  // live game meta + my player row
  const meta = useDbValue(pin && stage === "playing" ? paths.meta(pin) : null);
  const metaForRegister = useDbValue(pin && stage === "register" ? paths.meta(pin) : null);
  const myPlayer = useDbValue(pin && playerId ? paths.player(pin, playerId) : null);
  const playersObj = useDbValue(pin && stage === "playing" ? paths.players(pin) : null);

  const status = meta?.status || "lobby";
  const currentQ = meta?.currentQ ?? 0;
  const q = liveQuizQuestions[currentQ];
  const qc = q ? q[lang] : null;

  // reset my choice when question changes
  useEffect(() => {
    if (status === "question" && currentQ !== lastQ.current) {
      lastQ.current = currentQ;
      setMyChoice(null);
    }
  }, [status, currentQ]);

  const ranked = useMemo(() => playersToRanked(playersObj), [playersObj]);
  const myRank = useMemo(() => ranked.findIndex((p) => p.id === playerId) + 1, [ranked, playerId]);

  const L = {
    id: {
      title: "Gabung Kuis Live", enterPin: "Masukkan PIN", pinPh: "PIN 6 digit", next: "Lanjut",
      badPin: "Sesi tidak ditemukan. Periksa PIN.", notOpen: "Sesi belum dibuka untuk pendaftaran.",
      register: "Daftar", nim: "NIM", name: "Nama lengkap", join: "🙋 Masuk ke kuis",
      fill: "Isi NIM dan nama.", dupNim: "NIM ini sudah terdaftar.",
      waiting: "Menunggu dosen memulai…", you: "Kamu", rankNow: "Peringkat",
      pickAnswer: "Pilih jawaban secepat mungkin!", answered: "Jawaban terkirim ✓",
      correct: "Benar! 🎉", wrong: "Belum tepat", points: "poin", score: "Skor",
      reveal: "Jawaban benar:", seeBoard: "Lihat papan skor di layar dosen",
      final: "🏆 Kuis selesai!", finalRank: "Peringkat akhir kamu", timeUp: "Waktu habis",
    },
    en: {
      title: "Join Live Quiz", enterPin: "Enter PIN", pinPh: "6-digit PIN", next: "Continue",
      badPin: "Session not found. Check the PIN.", notOpen: "Session is not open for registration.",
      register: "Register", nim: "Student ID", name: "Full name", join: "🙋 Join the quiz",
      fill: "Enter your Student ID and name.", dupNim: "This Student ID is already registered.",
      waiting: "Waiting for the teacher to start…", you: "You", rankNow: "Rank",
      pickAnswer: "Pick your answer as fast as you can!", answered: "Answer submitted ✓",
      correct: "Correct! 🎉", wrong: "Not quite", points: "pts", score: "Score",
      reveal: "Correct answer:", seeBoard: "See the scoreboard on the teacher's screen",
      final: "🏆 Quiz finished!", finalRank: "Your final rank", timeUp: "Time's up",
    },
  }[lang];

  // ---- enter PIN ----
  const submitPin = useCallback(async () => {
    setError("");
    const p = pin.trim();
    if (!p) return;
    const snap = await get(ref(db, paths.meta(p)));
    if (!snap.exists()) { setError(L.badPin); return; }
    setPin(p);
    setStage("register");
  }, [pin, L.badPin]);

  // ---- register ----
  const register = useCallback(async () => {
    setError("");
    const n = name.trim(), id = nim.trim();
    if (!n || !id) { setError(L.fill); return; }
    // dup NIM check
    const playersSnap = await get(ref(db, paths.players(pin)));
    const players = playersSnap.val() || {};
    const dup = Object.values(players).some((p) => (p.nim || "").toLowerCase() === id.toLowerCase());
    if (dup) { setError(L.dupNim); return; }
    const pid = `${id.replace(/[^a-zA-Z0-9]/g, "")}_${Date.now()}`;
    await set(ref(db, paths.player(pin, pid)), {
      nim: id, name: n, score: 0, lastGain: 0, lastCorrect: false, joinedAt: serverTimestamp(),
    });
    setPlayerId(pid);
    setStage("playing");
  }, [name, nim, pin, L.fill, L.dupNim]);

  // ---- answer a question ----
  const answer = useCallback(
    async (choice) => {
      if (myChoice !== null || status !== "question") return;
      setMyChoice(choice);
      await set(ref(db, paths.answer(pin, currentQ, playerId)), {
        choice, answeredAt: serverTimestamp(),
      });
    },
    [myChoice, status, pin, currentQ, playerId]
  );

  // ---------- RENDER ----------
  return (
    <div className="min-h-[80vh]">
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <AuroraBackground />
        <div className="relative mx-auto max-w-md px-4 py-8 text-center">
          <h1 className="text-2xl font-extrabold">🎮 {L.title}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-md px-4 py-8">
        {/* ENTER PIN */}
        {stage === "enterPin" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="text-sm font-semibold text-slate-700">{L.enterPin}</label>
            <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
              inputMode="numeric" placeholder={L.pinPh}
              onKeyDown={(e) => e.key === "Enter" && submitPin()}
              className="mt-2 w-full rounded-lg border border-slate-300 p-3 text-center font-mono text-2xl tracking-[0.3em] focus:border-brand-500 focus:outline-none" />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <button onClick={submitPin} className="mt-4 w-full rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700">{L.next}</button>
          </div>
        )}

        {/* REGISTER */}
        {stage === "register" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">📝 {L.register} <span className="text-sm font-normal text-slate-400">PIN {pin}</span></h2>
            {metaForRegister === null ? (
              <p className="mt-4 text-sm text-slate-400">…</p>
            ) : (
              <div className="mt-4 space-y-2">
                <input value={nim} onChange={(e) => setNim(e.target.value)} placeholder={L.nim}
                  className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-brand-500 focus:outline-none" />
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder={L.name}
                  onKeyDown={(e) => e.key === "Enter" && register()}
                  className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-brand-500 focus:outline-none" />
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button onClick={register} className="w-full rounded-lg bg-amber-400 px-4 py-3 font-bold text-slate-900 hover:bg-amber-300">{L.join}</button>
              </div>
            )}
          </div>
        )}

        {/* PLAYING */}
        {stage === "playing" && (
          <div>
            {/* header: name + live score/rank */}
            <div className="mb-4 flex items-center justify-between rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
              <span className="font-semibold text-slate-800">{name || L.you}</span>
              <span className="text-sm text-slate-500">{L.score}: <span className="font-black text-brand-600">{myPlayer?.score ?? 0}</span>{myRank > 0 && <> · {L.rankNow} #{myRank}</>}</span>
            </div>

            {/* lobby */}
            {status === "lobby" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="text-4xl">⏳</div>
                <p className="mt-3 animate-pulse text-slate-500">{L.waiting}</p>
              </div>
            )}

            {/* question: show 4 big color buttons */}
            {status === "question" && qc && (
              <div>
                <div className="mb-3 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                  <span className="text-xs font-semibold text-slate-400">{currentQ + 1} / {LIVE_QUIZ_TOTAL}</span>
                  <h2 className="mt-1 text-lg font-bold text-slate-900">{qc.q}</h2>
                </div>
                {myChoice !== null ? (
                  <div className="rounded-2xl bg-brand-50 p-8 text-center ring-1 ring-brand-100">
                    <div className="text-3xl">{OPT[myChoice].shape}</div>
                    <p className="mt-2 font-semibold text-brand-700">{L.answered}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {qc.options.map((opt, oi) => (
                      <button key={oi} onClick={() => answer(oi)}
                        className="flex items-center gap-3 rounded-xl p-5 text-left text-white shadow transition active:scale-95"
                        style={{ backgroundColor: OPT[oi].bg }}>
                        <span className="text-2xl">{OPT[oi].shape}</span>
                        <span className="text-base font-semibold">{opt}</span>
                      </button>
                    ))}
                  </div>
                )}
                <p className="mt-3 text-center text-xs text-slate-400">{L.pickAnswer}</p>
              </div>
            )}

            {/* reveal: show if I was right + points gained */}
            {(status === "reveal" || status === "leaderboard") && q && (
              <div className={`rounded-2xl p-8 text-center text-white shadow ${myPlayer?.lastCorrect ? "bg-green-500" : "bg-slate-500"}`}>
                <div className="text-5xl">{myPlayer?.lastCorrect ? "🎉" : "😕"}</div>
                <p className="mt-3 text-xl font-extrabold">{myPlayer?.lastCorrect ? L.correct : L.wrong}</p>
                {myPlayer?.lastCorrect && myPlayer?.lastGain > 0 && (
                  <p className="mt-1 text-lg font-bold">+{myPlayer.lastGain} {L.points}</p>
                )}
                <p className="mt-4 text-sm opacity-90">{L.reveal} <span className="font-bold">{q[lang].options[q.answer]}</span></p>
                <p className="mt-3 text-xs opacity-80">{L.score}: {myPlayer?.score ?? 0}{myRank > 0 && <> · {L.rankNow} #{myRank}</>}</p>
              </div>
            )}

            {/* final */}
            {status === "final" && (
              <div className="rounded-2xl border border-amber-300 bg-amber-50 p-8 text-center shadow-sm">
                <div className="text-5xl">🏆</div>
                <p className="mt-3 text-xl font-extrabold text-slate-900">{L.final}</p>
                <p className="mt-2 text-slate-600">{L.finalRank}: <span className="font-black text-brand-600">#{myRank > 0 ? myRank : "-"}</span></p>
                <p className="mt-1 text-slate-600">{L.score}: <span className="font-black text-brand-600">{myPlayer?.score ?? 0}</span></p>
                <p className="mt-4 text-xs text-slate-400">{L.seeBoard}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
