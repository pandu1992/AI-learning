"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "../LanguageProvider";

// Profile & welcome page for the course instructor.
// Photo lives at public/pandu.png. On GitHub Pages the app is served from a
// basePath (/AI-learning), so asset URLs must be prefixed. If the image is
// missing (not committed yet), we fall back to the instructor's initials so
// the page never looks broken.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
const PHOTO = `${BASE}/pandu.png`;

export default function ProfileView() {
  const { lang } = useLang();
  const [imgOk, setImgOk] = useState(true);

  const L = {
    id: {
      role: "Dosen & Peneliti",
      dept: "Computer Science Department, BINUS University",
      welcomeTitle: "Sambutan",
      welcome: [
        "Selamat datang di Cognia. Perkenalkan, saya Pandu Dwi Luhur Pambudi, dosen dan peneliti di Computer Science Department, BINUS University.",
        "Platform pembelajaran ini saya rancang untuk mendukung mata kuliah yang saya ampu — Foundations of AI, Artificial Intelligence, dan Natural Language Processing (NLP). Tujuannya sederhana: membuat konsep kecerdasan buatan lebih mudah dipahami melalui demo interaktif, ilustrasi, dan latihan terpandu, bukan sekadar teori.",
        "Saya berharap Cognia membantu Anda belajar dengan rasa ingin tahu, berpikir kritis, dan bertanggung jawab dalam membangun serta menggunakan AI. Selamat belajar, dan jangan ragu untuk terus bereksplorasi!",
      ],
      coursesTitle: "Mata Kuliah yang Diampu",
      courses: ["Foundations of AI", "Artificial Intelligence", "Natural Language Processing (NLP)"],
      focusTitle: "Fokus",
      focus: "Merancang pengalaman belajar AI yang interaktif, bilingual (Indonesia/Inggris), dan berbasis praktik.",
      start: "Mulai Belajar dari Pengantar AI →",
      startHint: "Ikuti alur runtut: Pengantar AI → Machine Learning → Deep Learning → Reinforcement Learning → LLM → Etika AI.",
      browse: "Lihat seluruh kurikulum",
      signature: "Salam hangat,",
    },
    en: {
      role: "Lecturer & Researcher",
      dept: "Computer Science Department, BINUS University",
      welcomeTitle: "A Word of Welcome",
      welcome: [
        "Welcome to Cognia. I'm Pandu Dwi Luhur Pambudi, a lecturer and researcher at the Computer Science Department, BINUS University.",
        "I designed this learning platform to support the courses I teach — Foundations of AI, Artificial Intelligence, and Natural Language Processing (NLP). The goal is simple: make artificial-intelligence concepts easier to grasp through interactive demos, illustrations, and guided practice, rather than theory alone.",
        "I hope Cognia helps you learn with curiosity, think critically, and build and use AI responsibly. Happy learning — and never stop exploring!",
      ],
      coursesTitle: "Courses Taught",
      courses: ["Foundations of AI", "Artificial Intelligence", "Natural Language Processing (NLP)"],
      focusTitle: "Focus",
      focus: "Designing AI learning experiences that are interactive, bilingual (Indonesian/English), and practice-based.",
      start: "Start Learning from AI Overview →",
      startHint: "Follow the ordered path: AI Overview → Machine Learning → Deep Learning → Reinforcement Learning → LLM → AI Ethics.",
      browse: "Browse the full curriculum",
      signature: "Warm regards,",
    },
  }[lang];

  const name = "Pandu Dwi Luhur Pambudi";
  const initials = "PP";

  return (
    <div>
      {/* Header banner with photo */}
      <div className="border-b border-slate-200 bg-gradient-to-br from-brand-50 to-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-12 text-center sm:flex-row sm:text-left">
          {/* photo / fallback — portrait 3:4 frame so the full photo shows without awkward cropping */}
          <div className="shrink-0">
            {imgOk ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={PHOTO}
                alt={name}
                onError={() => setImgOk(false)}
                className="aspect-[3/4] w-40 rounded-2xl object-cover object-top shadow-lg ring-4 ring-white sm:w-48"
              />
            ) : (
              <div className="flex aspect-[3/4] w-40 items-center justify-center rounded-2xl bg-brand-600 text-5xl font-extrabold text-white shadow-lg ring-4 ring-white sm:w-48">
                {initials}
              </div>
            )}
          </div>

          {/* name + role */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">{L.role}</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{name}</h1>
            <p className="mt-2 text-slate-600">{L.dept}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              {L.courses.map((c) => (
                <span key={c} className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* welcome */}
        <section>
          <h2 className="text-xl font-bold text-slate-900">💬 {L.welcomeTitle}</h2>
          <div className="mt-4 space-y-4 text-slate-700">
            {L.welcome.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-5 text-slate-700">
            <p>{L.signature}</p>
            <p className="mt-1 font-semibold text-slate-900">{name}</p>
          </div>
        </section>

        {/* info cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">🎓 {L.coursesTitle}</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
              {L.courses.map((c) => (
                <li key={c} className="flex items-center gap-2"><span className="text-brand-500">▸</span> {c}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-900">🎯 {L.focusTitle}</h3>
            <p className="mt-3 text-sm text-slate-600">{L.focus}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/topics/ai-overview"
              className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-brand-700"
            >
              {L.start}
            </Link>
            <Link href="/" className="text-sm font-semibold text-brand-600 hover:underline">
              {L.browse}
            </Link>
          </div>
          <p className="mt-3 text-xs text-slate-500">🧭 {L.startHint}</p>
        </div>
      </div>
    </div>
  );
}
