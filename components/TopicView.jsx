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
    id: { video: "Video Pembelajaran", back: "← Kembali ke beranda", demos: "Demo Interaktif Topik Ini", demosSub: "Coba langsung tiap algoritma di browser.", guidedTitle: "Latihan Terpandu", guidedSub: "paket mini-pelajaran: teori + rumus → studi kasus → kuis.", guidedCta: "Buka Latihan Terpandu →", dfTitle: "Fondasi Data", dfSub: "Pahami data dulu: pipeline, jenis data, sumber data, EDA, evaluasi.", dfCta: "Pelajari Fondasi Data →", iaTitle: "Agen Cerdas & Lingkungan", iaSub: "Modul interaktif: siklus agen–lingkungan (sensor → program → aktuator), jenis agen, & sifat lingkungan.", iaCta: "Pelajari Agen Cerdas →", rlBaseTitle: "Fondasi: Agen Cerdas & Lingkungan", rlBaseSub: "RL dibangun di atas konsep agen–lingkungan. Kuasai dasarnya lewat modul interaktif ini dulu.", rlBaseCta: "Pelajari fondasi Agen Cerdas →", ethTitle: "Etika dalam Praktik", ethSub: "Modul interaktif: kapan boleh/tidak, bias & rasisme, keselamatan & keamanan, dan pengawasan manusia.", ethCta: "Buka Etika dalam Praktik →" },
    en: { video: "Learning Video", back: "← Back to home", demos: "Interactive Demos for This Topic", demosSub: "Try each algorithm right in your browser.", guidedTitle: "Guided Practice", guidedSub: "mini-lesson packages: theory + formulas → case study → quiz.", guidedCta: "Open Guided Practice →", dfTitle: "Data Foundations", dfSub: "Understand data first: pipeline, data types, sources, EDA, evaluation.", dfCta: "Explore Data Foundations →", iaTitle: "Intelligent Agents & Environments", iaSub: "Interactive module: the agent–environment loop (sensors → program → actuators), agent types, & environment properties.", iaCta: "Explore Intelligent Agents →", rlBaseTitle: "Foundation: Intelligent Agents & Environments", rlBaseSub: "RL is built on the agent–environment concept. Master the basics with this interactive module first.", rlBaseCta: "Learn the Intelligent Agents foundation →", ethTitle: "Ethics in Practice", ethSub: "Interactive module: when it's OK/not, bias & racism, safety & security, and human oversight.", ethCta: "Open Ethics in Practice →" },
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

        {slug === "ai-overview" && (
          <div className="mt-12 rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <h2 className="text-xl font-bold text-brand-800">🗃️ {labels.dfTitle}</h2>
            <p className="mt-1 text-sm text-brand-700/90">{labels.dfSub}</p>
            <Link
              href="/topics/ai-overview/data-foundations"
              className="mt-4 inline-block rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {labels.dfCta}
            </Link>
          </div>
        )}

        {slug === "ai-overview" && (
          <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <h2 className="text-xl font-bold text-brand-800">🤖 {labels.iaTitle}</h2>
            <p className="mt-1 text-sm text-brand-700/90">{labels.iaSub}</p>
            <Link
              href="/topics/ai-overview/intelligent-agents"
              className="mt-4 inline-block rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {labels.iaCta}
            </Link>
          </div>
        )}

        {slug === "ai-ethics" && (
          <div className="mt-12 rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <h2 className="text-xl font-bold text-brand-800">⚖️ {labels.ethTitle}</h2>
            <p className="mt-1 text-sm text-brand-700/90">{labels.ethSub}</p>
            <Link
              href="/topics/ai-ethics/ethics-in-practice"
              className="mt-4 inline-block rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {labels.ethCta}
            </Link>
          </div>
        )}

        {slug === "reinforcement-learning" && (
          <div className="mt-12 rounded-2xl border border-dashed border-brand-300 bg-brand-50/60 p-6">
            <span className="text-xs font-bold uppercase tracking-wide text-brand-500">🧱 Base</span>
            <h2 className="mt-1 text-xl font-bold text-brand-800">🤖 {labels.rlBaseTitle}</h2>
            <p className="mt-1 text-sm text-brand-700/90">{labels.rlBaseSub}</p>
            <Link
              href="/topics/ai-overview/intelligent-agents"
              className="mt-4 inline-block rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {labels.rlBaseCta}
            </Link>
          </div>
        )}

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
