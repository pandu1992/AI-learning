"use client";

import { useLang } from "@/components/LanguageProvider";
import ImmersiveHero from "@/components/immersive/ImmersiveHero";
import TopicCard from "@/components/TopicCard";
import { demosByTopic } from "@/lib/demos";
import { topics } from "@/lib/content";
import { getTheme } from "@/lib/immersiveThemes";

// Ordered learning-type sub-groups (used for topics whose demos carry a `group`,
// e.g. Machine Learning) so supervised vs unsupervised etc. are clearly split.
const GROUP_ORDER = ["supervised", "unsupervised", "dimreduction", "training"];
const GROUP_LABELS = {
  id: {
    supervised: { name: "Supervised Learning", icon: "🎯", desc: "Belajar dari data berlabel (ada jawaban)." },
    unsupervised: { name: "Unsupervised Learning", icon: "🔗", desc: "Menemukan pola tanpa label." },
    dimreduction: { name: "Reduksi Dimensi", icon: "🧭", desc: "Memadatkan fitur (supervised & unsupervised)." },
    training: { name: "Pelatihan & Evaluasi", icon: "📈", desc: "Cara model belajar & diukur." },
  },
  en: {
    supervised: { name: "Supervised Learning", icon: "🎯", desc: "Learn from labeled data (with answers)." },
    unsupervised: { name: "Unsupervised Learning", icon: "🔗", desc: "Find patterns without labels." },
    dimreduction: { name: "Dimensionality Reduction", icon: "🧭", desc: "Compress features (supervised & unsupervised)." },
    training: { name: "Training & Evaluation", icon: "📈", desc: "How models learn & are measured." },
  },
};

export default function DemosPage() {
  const { lang } = useLang();
  const labels = {
    id: {
      title: "Demo Interaktif",
      sub: "Lebih dari 20 demo, dikelompokkan per topik — dan Machine Learning dibagi lagi per jenis pembelajaran agar mudah dipahami.",
    },
    en: {
      title: "Interactive Demos",
      sub: "20+ demos, grouped by topic — and Machine Learning is further split by learning type so it's easy to follow.",
    },
  }[lang];

  // Only topics that actually have demos, in curriculum order.
  const topicOrder = topics.filter((t) => demosByTopic[t.slug]?.length);
  const theme = getTheme("demos");

  const renderCards = (list) => (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((demo) => (
        <TopicCard
          key={demo.slug}
          href={`/demos/${demo.slug}`}
          icon={demo.icon}
          title={demo[lang].title}
          summary={demo[lang].summary}
        />
      ))}
    </div>
  );

  return (
    <div>
      <ImmersiveHero
        theme={theme}
        icon="🧪"
        title={labels.title}
        subtitle={labels.sub}
        eyebrow={theme.eyebrow[lang]}
      />
      <div className="mx-auto max-w-5xl px-4 py-12">
        {topicOrder.map((topic) => {
          const demos = demosByTopic[topic.slug];
          const grouped = demos.some((d) => d.group);

          return (
            <section key={topic.slug} className="mb-14">
              <div className="mb-5 flex items-center gap-2">
                <span className="text-2xl">{topic.icon}</span>
                <h2 className="text-xl font-bold text-slate-900">{topic[lang].title}</h2>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                  {demos.length} demo
                </span>
              </div>

              {grouped ? (
                // Split into labeled learning-type sub-groups.
                GROUP_ORDER.filter((g) => demos.some((d) => d.group === g)).map((g) => {
                  const gl = GROUP_LABELS[lang][g];
                  const list = demos.filter((d) => d.group === g);
                  return (
                    <div key={g} className="mb-8 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-lg">{gl.icon}</span>
                        <h3 className="text-base font-bold text-brand-700">{gl.name}</h3>
                        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                          {list.length}
                        </span>
                      </div>
                      <p className="mb-4 text-sm text-slate-500">{gl.desc}</p>
                      {renderCards(list)}
                    </div>
                  );
                })
              ) : (
                renderCards(demos)
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
