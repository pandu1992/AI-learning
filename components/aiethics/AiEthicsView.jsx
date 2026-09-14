"use client";

import Link from "next/link";
import { useLang } from "../LanguageProvider";
import PageHero from "../PageHero";
import EthicsDecisionDemo from "./EthicsDecisionDemo";
import BiasFairnessDemo from "./BiasFairnessDemo";
import SafetySecurityDemo from "./SafetySecurityDemo";
import HumanInLoopDemo from "./HumanInLoopDemo";

// "Ethics in Practice" — the dedicated, hands-on guided module for the AI Ethics
// topic. Mirrors the DataFoundationsView pattern: PageHero + a series of
// sections, each with its own interactive demo, all bilingual (id/en).
export default function AiEthicsView() {
  const { lang } = useLang();

  const L = {
    id: {
      title: "Etika dalam Praktik",
      subtitle: "Belajar etika AI bukan dengan menghafal aturan, tetapi dengan mencoba menilai kasus nyata.",
      intro: "AI yang bertanggung jawab lahir dari keputusan-keputusan kecil yang tepat. Modul ini mengajakmu berlatih langsung: kapan sebuah penggunaan AI boleh, kapan tidak; bagaimana bias muncul dari data; bagaimana menjaga keselamatan & keamanan; dan kapan manusia harus tetap memegang kendali.",
      s1: "1. Kapan Boleh & Kapan Tidak Boleh",
      s1sub: "Nilai skenario nyata: boleh, boleh dengan pengaman, atau tidak boleh — lalu pahami alasannya.",
      s2: "2. Bias, Keadilan & Rasisme",
      s2sub: "Lihat bagaimana data historis yang timpang membuat model mendiskriminasi, dan uji strategi mitigasinya.",
      s3: "3. Keselamatan & Keamanan",
      s3sub: "Kenali risiko keselamatan (keluaran berbahaya, penyalahgunaan) dan serangan keamanan (prompt injection, keracunan data, adversarial), lalu nyalakan pertahanannya.",
      s4: "4. Pengawasan Manusia (Human-in-the-Loop)",
      s4sub: "Semakin tinggi risiko, semakin besar kendali manusia yang wajib. Cocokkan tingkat otonomi dengan risikonya.",
      more: "🎉 Modul Etika dalam Praktik selesai",
      moreText: "Kamu telah berlatih menilai boleh/tidak, mengenali bias & rasisme algoritmik, menyalakan pertahanan keselamatan & keamanan, dan menyeimbangkan otonomi AI dengan pengawasan manusia. Etika adalah tanggung jawab setiap pembangun AI — bukan renungan setelah sistem jadi.",
      back: "← Kembali ke Etika AI",
    },
    en: {
      title: "Ethics in Practice",
      subtitle: "Learn AI ethics not by memorizing rules, but by judging real cases.",
      intro: "Responsible AI is built from many small, correct decisions. This module lets you practice hands-on: when an AI use is OK and when it's not; how bias emerges from data; how to keep systems safe & secure; and when humans must stay in control.",
      s1: "1. When It's OK & When It's Not",
      s1sub: "Judge real scenarios: allowed, allowed with safeguards, or not allowed — then learn the reasoning.",
      s2: "2. Bias, Fairness & Racism",
      s2sub: "See how skewed historical data makes a model discriminate, and test mitigation strategies.",
      s3: "3. Safety & Security",
      s3sub: "Learn safety risks (harmful output, misuse) and security attacks (prompt injection, data poisoning, adversarial), then switch on the defenses.",
      s4: "4. Human Oversight (Human-in-the-Loop)",
      s4sub: "The higher the risk, the more human control is required. Match the autonomy level to the risk.",
      more: "🎉 Ethics in Practice complete",
      moreText: "You've practiced judging allowed/not-allowed, recognizing algorithmic bias & racism, switching on safety & security defenses, and balancing AI autonomy with human oversight. Ethics is every AI builder's responsibility — not an afterthought.",
      back: "← Back to AI Ethics",
    },
  }[lang];

  return (
    <div>
      <PageHero icon="⚖️" title={L.title} subtitle={L.subtitle} />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-slate-700">{L.intro}</p>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">🧭 {L.s1}</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">{L.s1sub}</p>
          <EthicsDecisionDemo />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">⚖️ {L.s2}</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">{L.s2sub}</p>
          <BiasFairnessDemo />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">🛡️ {L.s3}</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">{L.s3sub}</p>
          <SafetySecurityDemo />
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">🧑‍⚖️ {L.s4}</h2>
          <p className="mb-4 mt-1 text-sm text-slate-600">{L.s4sub}</p>
          <HumanInLoopDemo />
        </section>

        <div className="mt-12 rounded-2xl border border-dashed border-brand-300 bg-brand-50 p-5">
          <p className="font-bold text-brand-800">{L.more}</p>
          <p className="mt-1 text-sm text-brand-700/90">{L.moreText}</p>
        </div>

        <div className="mt-8">
          <Link href="/topics/ai-ethics" className="text-sm font-semibold text-brand-600 hover:underline">
            {L.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
