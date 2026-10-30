"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { useProgress } from "@/components/ProgressProvider";
import ImmersiveHero from "@/components/immersive/ImmersiveHero";
import { getTheme } from "@/lib/immersiveThemes";
import { learningPath } from "@/lib/learningPath";

// Maps a step href to a progress key so we can show completed demos.
function doneKeyFor(step) {
  if (step.kind === "demo") {
    const slug = step.href.split("/").pop();
    return `demo:${slug}`;
  }
  return null;
}

const KIND_STYLE = {
  topic: "bg-brand-50 text-brand-700",
  foundations: "bg-indigo-50 text-indigo-700",
  demo: "bg-emerald-50 text-emerald-700",
  quiz: "bg-amber-50 text-amber-700",
};

export default function LearningPathPage() {
  const { lang } = useLang();
  const { isDone, hydrated } = useProgress();

  const labels = {
    id: {
      title: "Jalur Belajar",
      sub: "Urutan belajar yang disarankan dari dasar hingga mahir. Ikuti tahap demi tahap — tiap demo yang selesai akan ditandai otomatis.",
      goal: "Tujuan",
      kinds: { topic: "Topik", foundations: "Fondasi", demo: "Demo", quiz: "Sertifikasi" },
    },
    en: {
      title: "Learning Path",
      sub: "A recommended learning sequence from basics to advanced. Follow it stage by stage — each completed demo is marked automatically.",
      goal: "Goal",
      kinds: { topic: "Topic", foundations: "Foundations", demo: "Demo", quiz: "Certification" },
    },
  }[lang];

  const theme = getTheme("demos");

  return (
    <div>
      <ImmersiveHero
        theme={theme}
        icon="🗺️"
        title={labels.title}
        subtitle={labels.sub}
        eyebrow={theme.eyebrow[lang]}
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <ol className="relative border-l-2 border-slate-200 pl-6">
          {learningPath.map((stage, si) => {
            const L = lang === "id" ? stage.idL : stage.enL;
            return (
              <li key={stage.id} className="mb-10 last:mb-0">
                {/* node marker */}
                <span className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white ring-4 ring-white">
                  {si + 1}
                </span>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                    <span className="text-2xl">{stage.icon}</span>
                    {L.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    <span className="font-semibold">{labels.goal}: </span>
                    {L.goal}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {stage.steps.map((step) => {
                      const sl = lang === "id" ? step.idL : step.enL;
                      const key = doneKeyFor(step);
                      const done = hydrated && key && isDone(key);
                      return (
                        <li key={step.href}>
                          <Link
                            href={step.href}
                            className="group flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 transition hover:border-brand-300 hover:bg-brand-50/50"
                          >
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                                done ? "border-green-500 bg-green-500 text-white" : "border-slate-300 text-transparent"
                              }`}
                            >
                              ✓
                            </span>
                            <span className={`text-sm ${done ? "text-slate-500 line-through" : "text-slate-700"} group-hover:text-brand-700`}>
                              {sl.label}
                            </span>
                            <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${KIND_STYLE[step.kind] || "bg-slate-100 text-slate-600"}`}>
                              {labels.kinds[step.kind]}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
