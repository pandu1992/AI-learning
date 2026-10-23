"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import TopicCard from "@/components/TopicCard";
import JourneyPanel from "@/components/JourneyPanel";
import AuroraBackground from "@/components/immersive/AuroraBackground";
import NeuralCanvas from "@/components/immersive/NeuralCanvas";
import Spotlight from "@/components/immersive/Spotlight";
import Parallax from "@/components/immersive/Parallax";
import TiltCard from "@/components/immersive/TiltCard";
import Reveal from "@/components/immersive/Reveal";
import RobotGreeter from "@/components/immersive/RobotGreeter";
import CountryBackdrop from "@/components/immersive/CountryBackdrop";
import { CodeOrbit, NeuralCluster } from "@/components/immersive/TechOrbits";
import { site, topics, fields } from "@/lib/content";
import { demoList, demosByTopic } from "@/lib/demos";

// The curriculum home / landing page (topics, demos, fields), rendered at "/".
// The instructor's profile & welcome lives separately at "/profile".
export default function HomeContent() {
  const { lang } = useLang();
  // which country backdrop shows behind the hero robot (follows its greeting)
  const [heroCountry, setHeroCountry] = useState("id");
  const handleLangChange = useCallback((code) => setHeroCountry(code), []);

  const labels = {
    id: {
      start: "Mulai Belajar",
      demosBtn: "Coba Demo Interaktif",
      profileBtn: "Tentang Pengajar",
      certBtn: "🎓 Ujian Sertifikasi",
      curriculum: "Kurikulum",
      curriculumSub: "Alur belajar runtut dari dasar hingga model modern — mulai dari Pengantar AI.",
      demosTitle: "Demo Interaktif",
      demosSub: "Pahami cara kerja algoritma sambil bermain langsung di browser.",
      fieldsTitle: "Penerapan di Berbagai Bidang",
      fieldsSub: "Lihat bagaimana AI dipakai di dunia nyata.",
      order: "Urutan belajar yang disarankan",
      interactHint: "Gerakkan kursor & klik di area ini — jaringan saraf akan bereaksi ✨",
    },
    en: {
      start: "Start Learning",
      demosBtn: "Try Interactive Demos",
      profileBtn: "About the Instructor",
      certBtn: "🎓 Certification Exam",
      curriculum: "Curriculum",
      curriculumSub: "A step-by-step path from basics to modern models — start with AI Overview.",
      demosTitle: "Interactive Demos",
      demosSub: "Understand how algorithms work by playing right in your browser.",
      fieldsTitle: "Applications Across Fields",
      fieldsSub: "See how AI is used in the real world.",
      order: "Suggested learning order",
      interactHint: "Move your cursor & click in this area — the neural network reacts ✨",
    },
  }[lang];

  return (
    <div>
      {/* Hero — immersive: interactive neural-net canvas + cursor spotlight + parallax */}
      <Spotlight className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <AuroraBackground />
        <CountryBackdrop code={heroCountry} />
        <NeuralCanvas className="opacity-80" />
        {/* CS/AI motifs flanking the robot (hidden on small screens).
            Anchored near the top (the visible hero band) so they sit beside the
            robot, not far below the fold of this very tall hero section. */}
        <CodeOrbit className="absolute left-[5%] top-[240px] z-[1] hidden h-44 w-44 opacity-80 lg:block xl:left-[9%] xl:h-52 xl:w-52" />
        <NeuralCluster className="absolute right-[5%] top-[240px] z-[1] hidden h-44 w-44 opacity-80 lg:block xl:right-[9%] xl:h-52 xl:w-52" />
        <Parallax speed={0.14} className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
          {/* Home-only showpiece: a GIANT AI robot whose head & eyes follow the
              cursor, reacts when you hover near / click, and greets in 5
              languages (ID/ZH/JA/EN/AR). The hero backdrop shows each country's
              iconic landmark as the robot greets in that language. */}
          <RobotGreeter onLangChange={handleLangChange} />
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-brand-100">
            BINUS Online · Computer Science
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight drop-shadow-sm sm:text-6xl">
            {site[lang].name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-50 sm:text-xl">
            {site[lang].tagline}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-brand-100/90">{site[lang].intro}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/topics/ai-overview"
              className="btn-shine rounded-full bg-white px-6 py-3 font-semibold text-brand-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-50"
            >
              {labels.start}
            </Link>
            <Link
              href="/demos"
              className="btn-shine rounded-full border border-white/60 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              {labels.demosBtn}
            </Link>
            <Link
              href="/profile"
              className="btn-shine rounded-full border border-white/60 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              {labels.profileBtn}
            </Link>
            <Link
              href="/certification"
              className="btn-shine rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-300"
            >
              {labels.certBtn}
            </Link>
          </div>
          {/* interactive hint */}
          <p className="mt-10 text-sm font-medium text-brand-100/80">{labels.interactHint}</p>
          {/* scroll cue */}
          <div className="mt-6 flex justify-center" aria-hidden="true">
            <div className="scroll-cue flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-1">
              <span className="h-2 w-1 rounded-full bg-white/80" />
            </div>
          </div>
        </Parallax>
      </Spotlight>

      {/* Curriculum — numbered to make the order explicit */}
      <section className="relative mx-auto max-w-6xl px-4 py-16">
        <div className="grid-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <JourneyPanel />
        <h2 className="text-2xl font-bold text-slate-900">{labels.curriculum}</h2>
        <p className="mt-1 text-slate-600">{labels.curriculumSub}</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-600">🧭 {labels.order}</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, i) => (
            <Reveal key={topic.slug} delay={i * 70} className="relative">
              <span className="absolute -left-2 -top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow">
                {i + 1}
              </span>
              <TiltCard className="h-full rounded-2xl">
                <TopicCard
                  href={`/topics/${topic.slug}`}
                  icon={topic.icon}
                  title={topic[lang].title}
                  summary={topic[lang].summary}
                  doneKey={`topic:${topic.slug}`}
                />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Demos */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{labels.demosTitle}</h2>
              <p className="mt-1 text-slate-600">{labels.demosSub}</p>
            </div>
            <span className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-bold text-brand-700">
              {demoList.length}+ {lang === "id" ? "demo" : "demos"}
            </span>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topics
              .filter((t) => demosByTopic[t.slug]?.length)
              .map((topic, i) => (
                <Reveal key={topic.slug} delay={i * 60} variant="zoom" className="h-full">
                  <TiltCard max={6} className="h-full rounded-2xl">
                    <Link
                      href={`/topics/${topic.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-brand-400"
                    >
                      <div className="text-3xl">{topic.icon}</div>
                      <h3 className="mt-3 font-bold text-slate-900 group-hover:text-brand-700">
                        {topic[lang].title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-brand-600">
                        {demosByTopic[topic.slug].length} {lang === "id" ? "demo interaktif" : "interactive demos"} →
                      </p>
                    </Link>
                  </TiltCard>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* Fields */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900">{labels.fieldsTitle}</h2>
        <p className="mt-1 text-slate-600">{labels.fieldsSub}</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fields.map((field, i) => (
            <Reveal key={field.slug} delay={i * 60} variant="zoom" className="h-full">
              <TiltCard max={6} className="h-full rounded-2xl">
                <TopicCard
                  href={`/case-studies/${field.slug}`}
                  icon={field.icon}
                  title={field[lang].title}
                  summary={field[lang].summary}
                />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
