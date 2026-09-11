"use client";

import { useLang } from "@/components/LanguageProvider";
import PageHero from "@/components/PageHero";
import TopicCard from "@/components/TopicCard";
import { demosByTopic } from "@/lib/demos";
import { topics } from "@/lib/content";

export default function DemosPage() {
  const { lang } = useLang();
  const labels = {
    id: {
      title: "Demo Interaktif",
      sub: "Lebih dari 20 demo, dikelompokkan per topik. Pahami tiap algoritma dengan mencobanya langsung di browser.",
    },
    en: {
      title: "Interactive Demos",
      sub: "20+ demos, grouped by topic. Understand each algorithm by trying it right in the browser.",
    },
  }[lang];

  // Only topics that actually have demos, in curriculum order.
  const topicOrder = topics.filter((t) => demosByTopic[t.slug]?.length);

  return (
    <div>
      <PageHero icon="🧪" title={labels.title} subtitle={labels.sub} />
      <div className="mx-auto max-w-5xl px-4 py-12">
        {topicOrder.map((topic) => (
          <section key={topic.slug} className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">{topic.icon}</span>
              <h2 className="text-xl font-bold text-slate-900">{topic[lang].title}</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                {demosByTopic[topic.slug].length} demo
              </span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {demosByTopic[topic.slug].map((demo) => (
                <TopicCard
                  key={demo.slug}
                  href={`/demos/${demo.slug}`}
                  icon={demo.icon}
                  title={demo[lang].title}
                  summary={demo[lang].summary}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
