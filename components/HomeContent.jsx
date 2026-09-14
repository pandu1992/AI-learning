"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import TopicCard from "@/components/TopicCard";
import { LogoMark } from "@/components/Logo";
import { site, topics, fields } from "@/lib/content";
import { demoList, demosByTopic } from "@/lib/demos";

// The curriculum home / landing page (topics, demos, fields), rendered at "/".
// The instructor's profile & welcome lives separately at "/profile".
export default function HomeContent() {
  const { lang } = useLang();

  const labels = {
    id: {
      start: "Mulai Belajar",
      demosBtn: "Coba Demo Interaktif",
      profileBtn: "Tentang Pengajar",
      curriculum: "Kurikulum",
      curriculumSub: "Alur belajar runtut dari dasar hingga model modern — mulai dari Pengantar AI.",
      demosTitle: "Demo Interaktif",
      demosSub: "Pahami cara kerja algoritma sambil bermain langsung di browser.",
      fieldsTitle: "Penerapan di Berbagai Bidang",
      fieldsSub: "Lihat bagaimana AI dipakai di dunia nyata.",
      order: "Urutan belajar yang disarankan",
    },
    en: {
      start: "Start Learning",
      demosBtn: "Try Interactive Demos",
      profileBtn: "About the Instructor",
      curriculum: "Curriculum",
      curriculumSub: "A step-by-step path from basics to modern models — start with AI Overview.",
      demosTitle: "Interactive Demos",
      demosSub: "Understand how algorithms work by playing right in your browser.",
      fieldsTitle: "Applications Across Fields",
      fieldsSub: "See how AI is used in the real world.",
      order: "Suggested learning order",
    },
  }[lang];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-lg">
            <LogoMark size={72} />
          </div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-brand-100">
            BINUS Online · Computer Science
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {site[lang].name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">
            {site[lang].tagline}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-brand-100/90">{site[lang].intro}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/topics/ai-overview"
              className="rounded-full bg-white px-6 py-3 font-semibold text-brand-700 shadow transition hover:bg-brand-50"
            >
              {labels.start}
            </Link>
            <Link
              href="/demos"
              className="rounded-full border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {labels.demosBtn}
            </Link>
            <Link
              href="/profile"
              className="rounded-full border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {labels.profileBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* Curriculum — numbered to make the order explicit */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900">{labels.curriculum}</h2>
        <p className="mt-1 text-slate-600">{labels.curriculumSub}</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-600">🧭 {labels.order}</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, i) => (
            <div key={topic.slug} className="relative">
              <span className="absolute -left-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow">
                {i + 1}
              </span>
              <TopicCard
                href={`/topics/${topic.slug}`}
                icon={topic.icon}
                title={topic[lang].title}
                summary={topic[lang].summary}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Demos */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{labels.demosTitle}</h2>
              <p className="mt-1 text-slate-600">{labels.demosSub}</p>
            </div>
            <span className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-bold text-brand-700">
              {demoList.length}+ {lang === "id" ? "demo" : "demos"}
            </span>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topics
              .filter((t) => demosByTopic[t.slug]?.length)
              .map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-brand-400 hover:shadow-md"
                >
                  <div className="text-3xl">{topic.icon}</div>
                  <h3 className="mt-3 font-bold text-slate-900 group-hover:text-brand-700">
                    {topic[lang].title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-brand-600">
                    {demosByTopic[topic.slug].length} {lang === "id" ? "demo interaktif" : "interactive demos"} →
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Fields */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900">{labels.fieldsTitle}</h2>
        <p className="mt-1 text-slate-600">{labels.fieldsSub}</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fields.map((field) => (
            <TopicCard
              key={field.slug}
              href={`/case-studies/${field.slug}`}
              icon={field.icon}
              title={field[lang].title}
              summary={field[lang].summary}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
