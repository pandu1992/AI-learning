"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import PageHero from "./PageHero";
import Callout from "./Callout";
import MathBehind from "./MathBehind";
import { getDemo, demoDetails } from "@/lib/demos";
import { demoComponents } from "./demoComponents";
import { topics } from "@/lib/content";

export default function DemoView({ slug }) {
  const { lang } = useLang();
  const demo = getDemo(slug);
  const Demo = demoComponents[slug];
  const details = demoDetails[slug];

  if (!demo || !Demo) return null;

  const meta = demo[lang];
  const topic = topics.find((t) => t.slug === demo.topic);
  const how = details?.[lang]?.how || [];
  const useCase = details?.[lang]?.case;

  const labels = {
    id: { how: "Cara kerja", playground: "Playground", back: "← Semua demo", inTopic: "Bagian dari", moreTopic: "Demo lain di topik ini →" },
    en: { how: "How it works", playground: "Playground", back: "← All demos", inTopic: "Part of", moreTopic: "More demos in this topic →" },
  }[lang];

  return (
    <div>
      <PageHero icon={demo.icon} title={meta.title} subtitle={meta.summary} />
      <div className="mx-auto max-w-4xl px-4 py-12">
        {topic && (
          <p className="mb-6 text-sm text-slate-500">
            {labels.inTopic}{" "}
            <Link href={`/topics/${topic.slug}`} className="font-semibold text-brand-600 hover:underline">
              {topic.icon} {topic[lang].title}
            </Link>
          </p>
        )}

        <h2 className="mb-3 text-xl font-bold text-slate-900">🧪 {labels.playground}</h2>
        <Demo />

        {how.length > 0 && (
          <>
            <h2 className="mb-3 mt-10 text-xl font-bold text-slate-900">⚙️ {labels.how}</h2>
            <ol className="list-decimal space-y-2 pl-6 text-slate-700">
              {how.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </>
        )}

        <MathBehind slug={slug} />

        {useCase && (
          <Callout emoji="🌍" title={lang === "id" ? "Contoh Penerapan" : "Application Example"}>
            {useCase}
          </Callout>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/demos" className="text-sm font-semibold text-brand-600 hover:underline">
            {labels.back}
          </Link>
          {topic && (
            <Link
              href={`/topics/${topic.slug}`}
              className="text-sm font-semibold text-brand-600 hover:underline"
            >
              {labels.moreTopic}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
