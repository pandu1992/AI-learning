"use client";

import Link from "next/link";
import { useLang } from "../LanguageProvider";
import PageHero from "../PageHero";
import AgentEnvironmentLoop from "./AgentEnvironmentLoop";
import AgentTypes from "./AgentTypes";
import EnvironmentProperties from "./EnvironmentProperties";

// "Intelligent Agents & Environments" — a guided module under AI Overview.
// Mirrors the DataFoundationsView pattern: PageHero + sections, each with an
// interactive demo, all bilingual (id/en).
export default function AgentsView() {
  const { lang } = useLang();

  const L = {
    id: {
      title: "Agen Cerdas & Lingkungan",
      subtitle: "Konsep inti AI: agen yang menangkap lingkungannya, berpikir, lalu bertindak.",
      intro: "Banyak sistem AI paling mudah dipahami sebagai AGEN: sesuatu yang menangkap (persepsi) lingkungannya melalui sensor dan bertindak melalui aktuator. Modul ini menjelaskan hubungan agen–lingkungan, ragam jenis agen, dan bagaimana sifat lingkungan menentukan kesulitannya.",
      def: "Definisi singkat",
      defAgent: "Agen — apa pun yang menangkap lingkungan lewat sensor dan bertindak lewatnya lewat aktuator.",
      defEnv: "Lingkungan — 'dunia' tempat agen beroperasi; keadaan lingkungan berubah akibat aksi agen (dan sebab lain).",
      defSensor: "Sensor — cara agen menerima persepsi (mata, mikrofon, kamera, pembaca data).",
      defActuator: "Aktuator — cara agen melakukan aksi (roda, tangan robot, layar, panggilan API).",
      s1: "1. Siklus Agen–Lingkungan",
      s1sub: "Lingkungan → persepsi (sensor) → program agen → aksi (aktuator) → lingkungan berubah — dan berulang.",
      s2: "2. Jenis-Jenis Agen",
      s2sub: "Dari refleks sederhana hingga agen yang belajar — makin canggih, makin mampu.",
      s3: "3. Sifat Lingkungan",
      s3sub: "Terobservasi penuh/sebagian, deterministik/stokastik, statis/dinamis, dan seterusnya.",
      more: "🎉 Modul Agen Cerdas selesai",
      moreText: "Kamu telah memahami loop agen–lingkungan (sensor → program → aktuator), mengenali lima jenis agen, dan melihat bagaimana sifat lingkungan menentukan kesulitan tugas. Ini fondasi untuk memahami Reinforcement Learning, robotika, dan sistem AI otonom.",
      back: "← Kembali ke Pengantar AI",
    },
    en: {
      title: "Intelligent Agents & Environments",
      subtitle: "A core AI concept: an agent that perceives its environment, thinks, then acts.",
      intro: "Many AI systems are easiest to understand as AGENTS: something that perceives its environment through sensors and acts on it through actuators. This module explains the agent–environment relationship, the kinds of agents, and how an environment's properties set the difficulty.",
      def: "Quick definitions",
      defAgent: "Agent — anything that perceives its environment via sensors and acts on it via actuators.",
      defEnv: "Environment — the 'world' the agent operates in; its state changes due to the agent's actions (and other causes).",
      defSensor: "Sensor — how the agent receives percepts (eyes, microphone, camera, data reader).",
      defActuator: "Actuator — how the agent takes action (wheels, robot arm, screen, API call).",
      s1: "1. The Agent–Environment Cycle",
      s1sub: "Environment → perception (sensors) → agent program → action (actuators) → environment changes — and repeats.",
      s2: "2. Types of Agents",
      s2sub: "From simple reflex to learning agents — the more sophisticated, the more capable.",
      s3: "3. Environment Properties",
      s3sub: "Fully/partially observable, deterministic/stochastic, static/dynamic, and so on.",
      more: "🎉 Intelligent Agents module complete",
      moreText: "You've understood the agent–environment loop (sensors → program → actuators), met the five agent types, and seen how environment properties set task difficulty. This is the foundation for Reinforcement Learning, robotics, and autonomous AI systems.",
      back: "← Back to AI Overview",
    },
  }[lang];

  return (
    <div>
      <PageHero icon="🤖" title={L.title} subtitle={L.subtitle} />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-slate-700">{L.intro}</p>

        {/* quick definitions */}
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {[["👁️", L.defSensor], ["🦾", L.defActuator], ["🤖", L.defAgent], ["🌍", L.defEnv]].map(([icon, text], i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <span className="mr-1">{icon}</span> {text}
            </div>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">🔁 {L.s1}</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">{L.s1sub}</p>
          <AgentEnvironmentLoop />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">🧩 {L.s2}</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">{L.s2sub}</p>
          <AgentTypes />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">🌍 {L.s3}</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">{L.s3sub}</p>
          <EnvironmentProperties />
        </section>

        <div className="mt-12 rounded-2xl border border-dashed border-brand-300 bg-brand-50 p-5">
          <p className="font-bold text-brand-800">{L.more}</p>
          <p className="mt-1 text-sm text-brand-700/90">{L.moreText}</p>
        </div>

        <div className="mt-8">
          <Link href="/topics/ai-overview" className="text-sm font-semibold text-brand-600 hover:underline">
            {L.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
