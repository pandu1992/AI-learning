"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import PageHero from "./PageHero";

// Lists all case studies within a field as cards linking to detail pages.
export default function CaseStudyFieldView({ field, meta, cases }) {
  const { lang } = useLang();
  const labels = {
    id: { back: "← Semua bidang", count: "studi kasus" },
    en: { back: "← All fields", count: "case studies" },
  }[lang];

  return (
    <div>
      <PageHero icon={meta.icon} title={meta[lang].title} subtitle={meta[lang].summary} />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="mb-6 text-sm font-semibold text-slate-500">
          {cases.length} {labels.count}
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {cases.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${field}/${cs.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-400 hover:shadow-md"
            >
              <div className="text-3xl">{cs.icon}</div>
              <h3 className="mt-3 font-bold text-slate-900 group-hover:text-brand-700">
                {cs[lang].title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{cs[lang].subtitle}</p>
              <span className="mt-4 text-sm font-semibold text-brand-600">→</span>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/case-studies" className="text-sm font-semibold text-brand-600 hover:underline">
            {labels.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
