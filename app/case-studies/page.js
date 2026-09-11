"use client";

import { useLang } from "@/components/LanguageProvider";
import PageHero from "@/components/PageHero";
import TopicCard from "@/components/TopicCard";
import { fields } from "@/lib/content";

export default function CaseStudiesPage() {
  const { lang } = useLang();
  const labels = {
    id: {
      title: "Studi Kasus AI",
      sub: "Bagaimana AI diterapkan di berbagai bidang di dunia nyata.",
    },
    en: {
      title: "AI Case Studies",
      sub: "How AI is applied across fields in the real world.",
    },
  }[lang];

  return (
    <div>
      <PageHero icon="🌍" title={labels.title} subtitle={labels.sub} />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2">
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
      </div>
    </div>
  );
}
