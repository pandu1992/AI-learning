"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import PageHero from "./PageHero";
import YouTubeEmbed from "./YouTubeEmbed";
import TopicCard from "./TopicCard";
import TopicDiagram from "./TopicDiagram";
import Quiz from "./Quiz";
import { quizzes } from "@/lib/quizzes";
import { demosByTopic } from "@/lib/demos";
import { getPackages } from "@/lib/guidedPackages";

export default function TopicView({ body, slug }) {
  const { lang } = useLang();
  const data = body[lang];
  const quiz = slug && quizzes[slug] ? quizzes[slug][lang] : null;
  const topicDemos = (slug && demosByTopic[slug]) || [];
  const packages = (slug && getPackages(slug)) || [];

  const labels = {
    id: { video: "Video Pembelajaran", back: "← Kembali ke beranda", demos: "Demo Interaktif Topik Ini", demosSub: "Coba langsung tiap algoritma di browser.", guidedTitle: "Latihan Terpandu", guidedSub: "paket mini-pelajaran: teori + rumus → studi kasus → kuis.", guidedCta: "Buka Latihan Terpandu →" },
    en: { video: "Learning Video", back: "← Back to home", demos: "Interactive Demos for This Topic", demosSub: "Try each algorithm right in your browser.", guidedTitle: "Guided Practice", guidedSub: "mini-lesson packages: theory + formulas → case study → quiz.", guidedCta: "Open Guided Practice →" },
  }[lang];

  return (
    <div>
      <PageHero icon={body.icon} title={data.title} subtitle={data.subtitle} />
      <article className="mx-auto max-w-4xl px-4 py-12">
        <TopicDiagram slug={slug} />

        <div className="prose-content">
          {data.sections.map((section, i) => (
            <section key={i} className="mb-8">
              <h2 className="mb-3 text-xl font-bold text-slate-900">{section.heading}</h2>
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="text-slate-700">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="text-slate-700">
                  {section.list.map((item, k) => (
                    <li key={k}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="mb-3 text-xl font-bold text-slate-900">🎥 {labels.video}</h2>
          <YouTubeEmbed id={body.videoId} title={data.title} />
        </div>

        {packages.length > 0 && (
          <div className="mt-12 rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <h2 className="text-xl font-bold text-brand-800">🎒 {labels.guidedTitle}</h2>
            <p className="mt-1 text-sm text-brand-700/90">
              {packages.length} {labels.guidedSub}
            </p>
            <Link
              href={`/topics/${slug}/quiz`}
              className="mt-4 inline-block rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {labels.guidedCta}
            </Link>
          </div>
        )}

        {topicDemos.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-slate-900">🧪 {labels.demos}</h2>
            <p className="mt-1 text-sm text-slate-600">{labels.demosSub}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {topicDemos.map((demo) => (
                <TopicCard
                  key={demo.slug}
                  href={`/demos/${demo.slug}`}
                  icon={demo.icon}
                  title={demo[lang].title}
                  summary={demo[lang].summary}
                />
              ))}
            </div>
          </div>
        )}

        {quiz && quiz.length > 0 && (
          <div className="mt-10">
            <Quiz questions={quiz} />
          </div>
        )}

        <div className="mt-8">
          <Link href="/" className="text-sm font-semibold text-brand-600 hover:underline">
            {labels.back}
          </Link>
        </div>
      </article>
    </div>
  );
}
