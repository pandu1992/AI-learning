"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { useProgress, levelFromXp } from "./ProgressProvider";
import { topics } from "@/lib/content";

// A "learning journey" dashboard shown on the home page: level + XP bar,
// day streak, curriculum completion %, and a Continue-learning button.
// Renders a lightweight placeholder until progress is hydrated (SSR-safe).
export default function JourneyPanel() {
  const { lang } = useLang();
  const { hydrated, xp, streak, last, isDone, doneCount } = useProgress();

  const L = {
    id: {
      title: "Perjalanan Belajarmu", level: "Level", xp: "XP",
      streak: "Hari beruntun", curriculum: "Kurikulum selesai",
      resume: "Lanjutkan belajar", start: "Mulai dari Pengantar AI",
      toNext: "menuju level berikutnya", items: "aktivitas selesai",
      empty: "Mulai jelajahi — progresmu akan muncul di sini.",
    },
    en: {
      title: "Your Learning Journey", level: "Level", xp: "XP",
      streak: "Day streak", curriculum: "Curriculum complete",
      resume: "Continue learning", start: "Start from AI Overview",
      toNext: "to next level", items: "activities done",
      empty: "Start exploring — your progress will show up here.",
    },
  }[lang];

  const topicPct = Math.round((topics.filter((t) => isDone(`topic:${t.slug}`)).length / topics.length) * 100);
  const lv = levelFromXp(xp);

  // Avoid SSR/hydration flashes: show a neutral skeleton until hydrated.
  if (!hydrated) {
    return <div className="mb-8 h-28 animate-pulse rounded-2xl border border-slate-200 bg-slate-100/60" />;
  }

  return (
    <div className="mb-10 overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-amber-50 p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-brand-800">🚀 {L.title}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white">{L.level} {lv.level}</span>
            <span className="text-xs text-slate-500">{xp} {L.xp}</span>
            {streak?.count > 1 && (
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">🔥 {streak.count} {L.streak}</span>
            )}
          </div>
        </div>

        {last ? (
          <Link href={last.href} className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-brand-700">
            ↳ {L.resume}: {last.label}
          </Link>
        ) : (
          <Link href="/topics/ai-overview" className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-brand-700">
            {L.start} →
          </Link>
        )}
      </div>

      {/* XP progress to next level */}
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-[11px] text-slate-500">
          <span>{L.level} {lv.level}</span>
          <span>{lv.into}/100 {L.xp} · {L.toNext}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/70 ring-1 ring-brand-100">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 transition-all duration-700" style={{ width: `${lv.pct}%` }} />
        </div>
      </div>

      {/* curriculum completion */}
      <div className="mt-3">
        <div className="mb-1 flex justify-between text-[11px] text-slate-500">
          <span>{L.curriculum}</span>
          <span>{topicPct}% · {doneCount} {L.items}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/70 ring-1 ring-green-100">
          <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-700" style={{ width: `${topicPct}%` }} />
        </div>
      </div>
    </div>
  );
}
