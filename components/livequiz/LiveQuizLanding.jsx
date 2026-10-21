"use client";

// Landing for /live-quiz: choose Host (teacher) or Join (student).
// The actual game is multi-device and Firebase-backed.

import Link from "next/link";
import { useLang } from "../LanguageProvider";
import AuroraBackground from "../immersive/AuroraBackground";

export default function LiveQuizLanding() {
  const { lang } = useLang();
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const L = {
    id: {
      title: "Kuis Live NLP", subtitle: "Review kelas interaktif bergaya Kahoot — multi-perangkat",
      hostTitle: "Dosen / Host", hostDesc: "Buat sesi, tampilkan PIN & QR di proyektor, dan pantau papan skor langsung.",
      hostBtn: "🎬 Jadi Host", joinTitle: "Mahasiswa", joinDesc: "Gabung dari HP/laptop dengan PIN, lalu jawab secepat mungkin untuk poin lebih besar.",
      joinBtn: "🙋 Gabung Kuis",
      how: "Cara kerja", step1: "Dosen klik \"Jadi Host\" → muncul PIN & QR.",
      step2: "Mahasiswa buka \"Gabung Kuis\" / pindai QR → masukkan NIM & nama.",
      step3: "Tiap soal, mahasiswa menjawab di perangkat masing-masing.",
      step4: "Sistem menghitung skor otomatis: benar + kecepatan. Makin cepat, makin besar poin.",
      step5: "Papan skor live + ranking akhir (nama, NIM) bisa diunduh CSV.",
    },
    en: {
      title: "NLP Live Quiz", subtitle: "Interactive Kahoot-style class review — multi-device",
      hostTitle: "Teacher / Host", hostDesc: "Create a session, show the PIN & QR on the projector, and watch the live scoreboard.",
      hostBtn: "🎬 Be the Host", joinTitle: "Student", joinDesc: "Join from your phone/laptop with the PIN, then answer as fast as you can for more points.",
      joinBtn: "🙋 Join the Quiz",
      how: "How it works", step1: "Teacher clicks \"Be the Host\" → a PIN & QR appear.",
      step2: "Students open \"Join the Quiz\" / scan the QR → enter Student ID & name.",
      step3: "For each question, students answer on their own devices.",
      step4: "The system scores automatically: correctness + speed. Faster = more points.",
      step5: "Live scoreboard + final ranking (name, ID) downloadable as CSV.",
    },
  }[lang];

  return (
    <div className="min-h-[70vh]">
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <AuroraBackground />
        <div className="relative mx-auto max-w-5xl px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">🎮 {L.title}</h1>
          <p className="mt-2 text-brand-100">{L.subtitle}</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <Link href="/live-quiz/host" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="text-4xl">🎬</div>
            <h2 className="mt-3 text-xl font-bold text-slate-900">{L.hostTitle}</h2>
            <p className="mt-1 text-sm text-slate-500">{L.hostDesc}</p>
            <span className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white group-hover:bg-brand-700">{L.hostBtn}</span>
          </Link>
          <Link href="/live-quiz/join" className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="text-4xl">🙋</div>
            <h2 className="mt-3 text-xl font-bold text-slate-900">{L.joinTitle}</h2>
            <p className="mt-1 text-sm text-slate-500">{L.joinDesc}</p>
            <span className="mt-4 inline-block rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 group-hover:bg-amber-300">{L.joinBtn}</span>
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">💡 {L.how}</h3>
          <ol className="mt-3 space-y-2 text-sm text-slate-600">
            {[L.step1, L.step2, L.step3, L.step4, L.step5].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
