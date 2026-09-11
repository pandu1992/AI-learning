"use client";

import { useLang } from "@/components/LanguageProvider";
import PageHero from "@/components/PageHero";
import TopicCard from "@/components/TopicCard";
import { demos } from "@/lib/content";

export default function DemosPage() {
  const { lang } = useLang();
  const labels = {
    id: {
      title: "Demo Interaktif",
      sub: "Pahami cara kerja algoritma dengan mencobanya langsung di browser.",
    },
    en: {
      title: "Interactive Demos",
      sub: "Understand how algorithms work by trying them right in your browser.",
    },
  }[lang];

  return (
    <div>
      <PageHero icon="🧪" title={labels.title} subtitle={labels.sub} />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2">
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
    </div>
  );
}
