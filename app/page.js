"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import TopicCard from "@/components/TopicCard";
import { site, topics, demos, fields } from "@/lib/content";

export default function HomePage() {
  const { lang } = useLang();

  const labels = {
    id: {
      start: "Mulai Belajar",
      demosBtn: "Coba Demo Interaktif",
      curriculum: "Kurikulum",
      curriculumSub: "Alur belajar dari dasar hingga model modern.",
      demosTitle: "Demo Interaktif",
      demosSub: "Pahami cara kerja algoritma sambil bermain langsung di browser.",
      fieldsTitle: "Penerapan di Berbagai Bidang",
      fieldsSub: "Lihat bagaimana AI dipakai di dunia nyata.",
    },
    en: {
      start: "Start Learning",
      demosBtn: "Try Interactive Demos",
      curriculum: "Curriculum",
      curriculumSub: "A learning path from basics to modern models.",
      demosTitle: "Interactive Demos",
      demosSub: "Understand how algorithms work by playing right in your browser.",
      fieldsTitle: "Applications Across Fields",
      fieldsSub: "See how AI is used in the real world.",
    },
  }[lang];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center">
          <div className="text-6xl">🤖</div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
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
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900">{labels.curriculum}</h2>
        <p className="mt-1 text-slate-600">{labels.curriculumSub}</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              icon={topic.icon}
              title={topic[lang].title}
              summary={topic[lang].summary}
            />
          ))}
        </div>
      </section>

      {/* Demos */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold text-slate-900">{labels.demosTitle}</h2>
          <p className="mt-1 text-slate-600">{labels.demosSub}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {demos.map((demo) => (
              <TopicCard
                key={demo.slug}
                href={`/demos/${demo.slug}`}
                icon="🧪"
                title={demo[lang].title}
                summary={demo[lang].summary}
              />
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
