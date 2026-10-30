"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { useProgress, levelFromXp } from "@/components/ProgressProvider";
import ImmersiveHero from "@/components/immersive/ImmersiveHero";
import { getTheme } from "@/lib/immersiveThemes";
import { demoList, demosByTopic } from "@/lib/demos";
import { topics } from "@/lib/content";

// Learning dashboard: visualizes the learner's own progress (from localStorage)
// per topic, plus an export/import "progress code" so a student can share their
// progress with the lecturer without any backend. Great for a BINUS Online class.

export default function DashboardPage() {
  const { lang } = useLang();
  const { hydrated, done, xp, streak, doneCount, exportProgress, importProgress, reset } = useProgress();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState(null);

  const labels = {
    id: {
      title: "Dasbor Belajar",
      sub: "Pantau kemajuanmu per topik. Bagikan kode progres ke dosen untuk disetorkan — tanpa akun, tanpa server.",
      level: "Level", xp: "XP", streak: "Runtun hari", demosDone: "Demo selesai",
      byTopic: "Kemajuan per Topik",
      share: "Bagikan Progres", exportBtn: "📤 Buat kode progres", copy: "Salin", copied: "Tersalin!",
      importBtn: "📥 Muat dari kode", importPh: "Tempel kode progres di sini…",
      imported: "Progres berhasil dimuat!", badCode: "Kode tidak valid.",
      resetBtn: "Reset semua progres", resetConfirm: "Yakin menghapus semua progres?",
      empty: "Belum ada progres. Mulai dari sebuah demo atau topik!",
      forTeacher: "Untuk Dosen",
      teacherNote: "Minta mahasiswa menekan 'Buat kode progres', lalu kirim kode itu (mis. via LMS/email). Tempel di 'Muat dari kode' untuk melihat kemajuan mereka di perangkat ini.",
    },
    en: {
      title: "Learning Dashboard",
      sub: "Track your progress per topic. Share a progress code with your lecturer to submit — no account, no server.",
      level: "Level", xp: "XP", streak: "Day streak", demosDone: "Demos done",
      byTopic: "Progress by Topic",
      share: "Share Progress", exportBtn: "📤 Generate progress code", copy: "Copy", copied: "Copied!",
      importBtn: "📥 Load from code", importPh: "Paste a progress code here…",
      imported: "Progress loaded!", badCode: "Invalid code.",
      resetBtn: "Reset all progress", resetConfirm: "Really delete all progress?",
      empty: "No progress yet. Start from a demo or topic!",
      forTeacher: "For Lecturers",
      teacherNote: "Ask students to click 'Generate progress code' and send it (e.g. via LMS/email). Paste it into 'Load from code' to view their progress on this device.",
    },
  }[lang];

  const theme = getTheme("demos");
  const lv = levelFromXp(xp);

  // per-topic demo completion
  const topicStats = useMemo(() => {
    const coreTopics = topics.filter((t) => demosByTopic[t.slug]?.length);
    return coreTopics.map((t) => {
      const list = demosByTopic[t.slug];
      const d = list.filter((demo) => done[`demo:${demo.slug}`]).length;
      return { slug: t.slug, icon: t.icon, title: t[lang].title, done: d, total: list.length, pct: Math.round((d / list.length) * 100) };
    });
  }, [done, lang]);

  const totalDemos = demoList.length;

  const handleExport = () => {
    setCode(exportProgress());
    setMsg(null);
  };
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(code); setMsg({ type: "ok", text: labels.copied }); } catch {}
  };
  const handleImport = () => {
    const ok = importProgress(code);
    setMsg(ok ? { type: "ok", text: labels.imported } : { type: "err", text: labels.badCode });
  };

  return (
    <div>
      <ImmersiveHero theme={theme} icon="📊" title={labels.title} subtitle={labels.sub} eyebrow={theme.eyebrow[lang]} />
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* stat cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat icon="⭐" value={hydrated ? lv.level : "—"} label={labels.level} />
          <Stat icon="✨" value={hydrated ? xp : "—"} label={labels.xp} />
          <Stat icon="🔥" value={hydrated ? (streak?.count || 0) : "—"} label={labels.streak} />
          <Stat icon="🧪" value={hydrated ? `${doneCount}` : "—"} label={labels.demosDone} />
        </div>

        {/* per-topic progress */}
        <h2 className="mb-4 text-xl font-bold text-slate-900">{labels.byTopic}</h2>
        {hydrated && doneCount === 0 && (
          <p className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">{labels.empty}</p>
        )}
        <div className="mb-10 space-y-3">
          {topicStats.map((t) => (
            <Link key={t.slug} href={`/topics/${t.slug}`} className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-300">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <span className="text-lg">{t.icon}</span>{t.title}
                </span>
                <span className="text-xs font-semibold text-slate-500">{t.done}/{t.total}</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${t.pct}%` }} />
              </div>
            </Link>
          ))}
        </div>

        {/* share progress */}
        <h2 className="mb-4 text-xl font-bold text-slate-900">{labels.share}</h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <button onClick={handleExport} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">{labels.exportBtn}</button>
            <button onClick={handleImport} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">{labels.importBtn}</button>
            {code && <button onClick={handleCopy} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">📋 {labels.copy}</button>}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={labels.importPh}
            rows={3}
            className="mt-3 w-full rounded-lg border border-slate-300 p-3 font-mono text-xs text-slate-700 outline-none focus:border-brand-400"
          />
          {msg && (
            <p className={`mt-2 text-sm font-semibold ${msg.type === "ok" ? "text-green-600" : "text-red-600"}`}>{msg.text}</p>
          )}

          <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-800">
            <p className="font-bold">🎓 {labels.forTeacher}</p>
            <p className="mt-1">{labels.teacherNote}</p>
          </div>

          <button
            onClick={() => { if (window.confirm(labels.resetConfirm)) { reset(); setCode(""); setMsg(null); } }}
            className="mt-4 text-xs font-semibold text-red-500 hover:underline"
          >
            {labels.resetBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
      <div className="text-2xl">{icon}</div>
      <div className="mt-1 text-2xl font-extrabold text-slate-900">{value}</div>
      <div className="text-xs font-semibold text-slate-500">{label}</div>
    </div>
  );
}
