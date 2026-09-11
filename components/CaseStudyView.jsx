"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import PageHero from "./PageHero";

export default function CaseStudyView({ study }) {
  const { lang } = useLang();
  const data = study[lang];

  const labels = {
    id: { tech: "Teknik", back: "← Semua studi kasus" },
    en: { tech: "Technique", back: "← All case studies" },
  }[lang];

  return (
    <div>
      <PageHero icon={study.icon} title={data.title} subtitle={data.subtitle} />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-lg text-slate-700">{data.intro}</p>

        <div className="mt-8 space-y-4">
          {data.cases.map((c, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-900">{c.title}</h3>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {labels.tech}: {c.tech}
                </span>
              </div>
              <p className="mt-2 text-slate-600">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/case-studies"
            className="text-sm font-semibold text-brand-600 hover:underline"
          >
            {labels.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
