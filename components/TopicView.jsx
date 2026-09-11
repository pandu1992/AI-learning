"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import PageHero from "./PageHero";
import YouTubeEmbed from "./YouTubeEmbed";
import Callout from "./Callout";

export default function TopicView({ body }) {
  const { lang } = useLang();
  const data = body[lang];

  const labels = {
    id: { video: "Video Pembelajaran", back: "← Kembali ke beranda" },
    en: { video: "Learning Video", back: "← Back to home" },
  }[lang];

  return (
    <div>
      <PageHero icon={body.icon} title={data.title} subtitle={data.subtitle} />
      <article className="mx-auto max-w-3xl px-4 py-12">
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

        <Callout emoji="🧪" title={lang === "id" ? "Praktik" : "Practice"}>
          <Link href="/demos" className="font-semibold text-brand-700 underline">
            {lang === "id"
              ? "Coba demo interaktif untuk topik ini →"
              : "Try the interactive demos for this topic →"}
          </Link>
        </Callout>

        <div className="mt-8">
          <Link href="/" className="text-sm font-semibold text-brand-600 hover:underline">
            {labels.back}
          </Link>
        </div>
      </article>
    </div>
  );
}
