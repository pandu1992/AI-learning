"use client";

import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import ImmersiveHero from "@/components/immersive/ImmersiveHero";
import { getTheme } from "@/lib/immersiveThemes";
import { TECHNIQUES, TASKS, SAMPLES } from "@/lib/promptLab";

// Prompt Engineering Playground: pick a task + a prompting technique and see how
// the "LLM response" changes. Responses are pre-written (no API) to illustrate
// the technique's effect — e.g. chain-of-thought surfaces reasoning. Teaches the
// idea the LLM topic covers: how you ASK changes what you get.

export default function PromptLabPage() {
  const { lang } = useLang();
  const [taskKey, setTaskKey] = useState("math");
  const [techKey, setTechKey] = useState("zero");

  const L = {
    id: {
      title: "Lab Prompt Engineering",
      sub: "Pilih tugas & teknik prompting, lalu lihat bagaimana cara bertanya mengubah jawaban model.",
      task: "Tugas", technique: "Teknik", theQuestion: "Pertanyaan", theirPrompt: "Tambahan prompt", response: "Respons model (simulasi)", why: "Kenapa begini",
      quality: "Kualitas", qLabels: ["", "Dasar", "Baik", "Sangat baik"],
      note: "Respons di sini bersifat ilustratif (bukan model sungguhan) untuk menunjukkan efek tiap teknik.",
    },
    en: {
      title: "Prompt Engineering Lab",
      sub: "Pick a task & a prompting technique, then see how the way you ask changes the model's answer.",
      task: "Task", technique: "Technique", theQuestion: "Question", theirPrompt: "Prompt add-on", response: "Model response (simulated)", why: "Why this happens",
      quality: "Quality", qLabels: ["", "Basic", "Good", "Very good"],
      note: "Responses here are illustrative (not a real model) to demonstrate each technique's effect.",
    },
  }[lang];

  const theme = getTheme("llm") || getTheme("demos");
  const tasks = TASKS[lang];
  const techniques = TECHNIQUES[lang];
  const task = tasks.find((t) => t.key === taskKey);
  const sample = SAMPLES[lang][taskKey][techKey];
  const quality = sample?.quality || 1;

  return (
    <div>
      <ImmersiveHero theme={theme} icon="🧬" title={L.title} subtitle={L.sub} eyebrow={theme.eyebrow[lang]} />
      <div className="mx-auto max-w-3xl px-4 py-12">
        {/* task picker */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{L.task}</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {tasks.map((t) => (
            <button key={t.key} onClick={() => setTaskKey(t.key)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${taskKey === t.key ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* technique picker */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{L.technique}</p>
        <div className="mb-6 grid gap-2 sm:grid-cols-2">
          {techniques.map((t) => (
            <button key={t.key} onClick={() => setTechKey(t.key)}
              className={`rounded-xl border p-3 text-left transition ${techKey === t.key ? "border-brand-500 bg-brand-50" : "border-slate-200 hover:border-brand-300"}`}>
              <p className={`text-sm font-bold ${techKey === t.key ? "text-brand-700" : "text-slate-800"}`}>{t.name}</p>
              <p className="mt-0.5 text-xs text-slate-500">{t.desc}</p>
            </button>
          ))}
        </div>

        {/* conversation view */}
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">{L.theQuestion}</p>
            <p className="mt-1 text-sm text-slate-800">{task?.question}</p>
            {sample?.prompt && (
              <>
                <p className="mt-3 text-xs font-semibold text-slate-400">{L.theirPrompt}</p>
                <p className="mt-1 rounded-lg bg-slate-50 p-2 font-mono text-xs text-slate-600">{sample.prompt}</p>
              </>
            )}
          </div>

          <div className="rounded-xl border border-brand-200 bg-brand-50 p-4">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs font-semibold text-brand-500">🤖 {L.response}</p>
              <span className="flex items-center gap-1 text-xs font-semibold text-brand-700">
                {L.quality}: {"★".repeat(quality)}{"☆".repeat(3 - quality)} <span className="ml-1">{L.qLabels[quality]}</span>
              </span>
            </div>
            <p className="whitespace-pre-line text-sm text-slate-800">{sample?.response}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <span className="font-semibold text-slate-800">💡 {L.why}: </span>{sample?.note}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">{L.note}</p>
      </div>
    </div>
  );
}
