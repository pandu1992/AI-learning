"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import ImmersiveHero from "@/components/immersive/ImmersiveHero";
import { getTheme } from "@/lib/immersiveThemes";
import { conceptCheck } from "@/lib/conceptCheck";
import { demoList } from "@/lib/demos";

// Daily Challenge: a deterministic question-of-the-day drawn from the existing
// concept-check bank (everyone gets the same one on a given date). Answer once
// per day; a localStorage streak rewards consecutive days. Reuses content, so
// nothing new to maintain.

const KEY = "cognia_daily_v1";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
// stable hash of the date string -> index, so the question is fixed per day
function dayIndex(dateStr, n) {
  let h = 0;
  for (let i = 0; i < dateStr.length; i++) h = (h * 31 + dateStr.charCodeAt(i)) >>> 0;
  return h % n;
}

function load() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch { return null; }
}

export default function DailyPage() {
  const { lang } = useLang();
  const [state, setState] = useState(null); // { lastDay, streak, best, answeredDay, lastCorrect }
  const [picked, setPicked] = useState(null);

  // the global pool of concept questions (slug + data), stable order
  const pool = useMemo(() => Object.entries(conceptCheck).map(([slug, data]) => ({ slug, data })), []);
  const today = todayStr();
  const idx = dayIndex(today, pool.length);
  const entry = pool[idx];
  const q = entry?.data?.[lang];
  const demo = demoList.find((d) => d.slug === entry?.slug);

  useEffect(() => {
    const s = load() || { lastDay: null, streak: 0, best: 0, answeredDay: null, lastCorrect: null };
    setState(s);
    if (s.answeredDay === today) setPicked(s.lastPick ?? -1);
  }, [today]);

  const answeredToday = state?.answeredDay === today;

  const answer = (oi) => {
    if (answeredToday) return;
    setPicked(oi);
    const correct = oi === q.answer;
    setState((s) => {
      const prev = s || { streak: 0, best: 0 };
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newStreak = prev.lastDay === yesterday ? (prev.streak || 0) + 1 : 1;
      const next = {
        lastDay: today,
        answeredDay: today,
        streak: newStreak,
        best: Math.max(prev.best || 0, newStreak),
        lastCorrect: correct,
        lastPick: oi,
      };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const L = {
    id: {
      title: "Tantangan Harian", sub: "Satu soal konsep baru tiap hari. Jawab untuk menjaga runtun harianmu!",
      streak: "Runtun", best: "Terbaik", from: "Dari demo", today: "Soal hari ini",
      correct: "Benar! 🎉", wrong: "Belum tepat.", already: "Kamu sudah menjawab hari ini. Kembali besok untuk soal baru!",
      explore: "Pelajari di demo →", comeback: "Soal berikutnya tersedia besok.",
    },
    en: {
      title: "Daily Challenge", sub: "One fresh concept question each day. Answer to keep your streak!",
      streak: "Streak", best: "Best", from: "From demo", today: "Today's question",
      correct: "Correct! 🎉", wrong: "Not quite.", already: "You've answered today. Come back tomorrow for a new one!",
      explore: "Study it in the demo →", comeback: "The next question unlocks tomorrow.",
    },
  }[lang];

  const theme = getTheme("demos");
  if (!q) return null;
  const isRight = picked === q.answer;

  return (
    <div>
      <ImmersiveHero theme={theme} icon="🎯" title={L.title} subtitle={L.sub} eyebrow={theme.eyebrow[lang]} />
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* streak cards */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <div className="text-2xl">🔥</div>
            <div className="mt-1 text-2xl font-extrabold text-slate-900">{state?.streak ?? 0}</div>
            <div className="text-xs font-semibold text-slate-500">{L.streak}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <div className="text-2xl">🏆</div>
            <div className="mt-1 text-2xl font-extrabold text-slate-900">{state?.best ?? 0}</div>
            <div className="text-xs font-semibold text-slate-500">{L.best}</div>
          </div>
        </div>

        {/* question */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">{L.today} · {today}</span>
            {demo && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">{demo[lang].title}</span>}
          </div>
          <p className="text-lg font-semibold text-slate-900">{q.q}</p>

          <div className="mt-4 space-y-2">
            {q.options.map((opt, oi) => {
              const isAnswer = oi === q.answer;
              let cls = "border-slate-200 bg-white hover:border-brand-300 text-slate-700";
              if (picked !== null) {
                if (isAnswer) cls = "border-green-400 bg-green-50 text-green-800";
                else if (oi === picked) cls = "border-red-400 bg-red-50 text-red-800";
                else cls = "border-slate-200 bg-white text-slate-400";
              }
              return (
                <button key={oi} onClick={() => answer(oi)} disabled={picked !== null}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition ${cls}`}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold">{String.fromCharCode(65 + oi)}</span>
                  <span>{opt}</span>
                  {picked !== null && isAnswer && <span className="ml-auto">✓</span>}
                  {picked !== null && oi === picked && !isAnswer && <span className="ml-auto">✗</span>}
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <div className={`mt-4 rounded-lg p-3 text-sm ${isRight ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-900"}`}>
              <p className="font-bold">{isRight ? `✅ ${L.correct}` : `💡 ${L.wrong}`}</p>
              <p className="mt-1">{q.explain}</p>
              {demo && <Link href={`/demos/${entry.slug}`} className="mt-2 inline-block text-xs font-semibold text-brand-600 hover:underline">{L.explore}</Link>}
              <p className="mt-2 text-xs text-slate-500">⏳ {L.comeback}</p>
            </div>
          )}

          {answeredToday && picked === null && <p className="mt-4 text-sm text-slate-500">{L.already}</p>}
        </div>
      </div>
    </div>
  );
}
