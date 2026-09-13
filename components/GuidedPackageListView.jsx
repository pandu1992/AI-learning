"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import PageHero from "./PageHero";

// Lists all guided quiz packages within a topic as cards.
export default function GuidedPackageListView({ topic, topicMeta, packages }) {
  const { lang } = useLang();
  const L = {
    id: {
      title: "Latihan Terpandu",
      sub: "Tiap paket: pahami teori & rumus, lihat studi kasus, lalu uji dirimu dengan kuis.",
      steps: "Pengetahuan → Studi Kasus → Kuis",
      back: "← Kembali ke topik",
    },
    en: {
      title: "Guided Practice",
      sub: "Each package: learn the theory & formulas, see a case study, then test yourself with a quiz.",
      steps: "Knowledge → Case Study → Quiz",
      back: "← Back to topic",
    },
  }[lang];

  return (
    <div>
      <PageHero icon="🎒" title={`${topicMeta[lang].title} — ${L.title}`} subtitle={L.sub} />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2">
          {packages.map((p) => (
            <Link
              key={p.slug}
              href={`/topics/${topic}/quiz/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-400 hover:shadow-md"
            >
              <div className="text-3xl">{p.icon}</div>
              <h3 className="mt-3 font-bold text-slate-900 group-hover:text-brand-700">{p[lang].title}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{p[lang].subtitle}</p>
              <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600">{L.steps}</span>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link href={`/topics/${topic}`} className="text-sm font-semibold text-brand-600 hover:underline">
            {L.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
