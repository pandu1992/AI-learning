"use client";

import { useState } from "react";
import { useLang } from "../LanguageProvider";

// Interactive explorer of the five classic intelligent-agent types, ordered by
// increasing sophistication. Click a type to see how it decides, its internal
// pieces, an example, and a limitation. Original teaching descriptions.

const TYPES = [
  {
    key: "reflex", icon: "⚡", color: "#0093D0", level: 1,
    id: {
      name: "Simple Reflex Agent",
      tagline: "Aksi = aturan kondisi→aksi atas persepsi SAAT INI",
      how: "Memetakan persepsi sekarang langsung ke aksi lewat aturan if–then. Tidak punya ingatan.",
      pieces: ["Aturan kondisi–aksi (if–then)"],
      example: "Termostat: JIKA suhu > 25° MAKA nyalakan AC. Penyedot debu yang mengisap bila sel kotor.",
      limit: "Gagal bila lingkungan hanya terobservasi sebagian — tak bisa mengingat yang tak terlihat.",
    },
    en: {
      name: "Simple Reflex Agent",
      tagline: "Action = condition→action rule on the CURRENT percept",
      how: "Maps the current percept directly to an action via if–then rules. Has no memory.",
      pieces: ["Condition–action (if–then) rules"],
      example: "A thermostat: IF temp > 25° THEN turn on AC. A vacuum that sucks when its cell is dirty.",
      limit: "Fails when the environment is only partially observable — it can't remember the unseen.",
    },
  },
  {
    key: "model", icon: "🗺️", color: "#0284c7", level: 2,
    id: {
      name: "Model-Based Reflex Agent",
      tagline: "Menyimpan keadaan internal (model dunia)",
      how: "Memelihara 'state' internal dari sejarah persepsi + model bagaimana dunia berubah, lalu menerapkan aturan.",
      pieces: ["Keadaan internal (memori)", "Model transisi dunia", "Aturan kondisi–aksi"],
      example: "Mobil dengan sensor: mengingat mobil lain yang sempat lewat meski kini tak terlihat.",
      limit: "Tahu keadaan dunia, tetapi belum tahu APA yang ingin dicapai (tanpa tujuan eksplisit).",
    },
    en: {
      name: "Model-Based Reflex Agent",
      tagline: "Keeps internal state (a world model)",
      how: "Maintains internal 'state' from percept history + a model of how the world evolves, then applies rules.",
      pieces: ["Internal state (memory)", "World transition model", "Condition–action rules"],
      example: "A car with sensors: remembers another car that passed even if it's now out of view.",
      limit: "Knows the world's state, but not yet WHAT it wants to achieve (no explicit goal).",
    },
  },
  {
    key: "goal", icon: "🎯", color: "#7c3aed", level: 3,
    id: {
      name: "Goal-Based Agent",
      tagline: "Memilih aksi yang mendekatkan ke TUJUAN",
      how: "Punya tujuan eksplisit. Mempertimbangkan 'jika aku melakukan X, apakah mendekatkan ke tujuan?' — sering lewat pencarian/perencanaan.",
      pieces: ["Model dunia", "Tujuan (goal)", "Pencarian & perencanaan"],
      example: "GPS/navigasi: tujuannya sampai di alamat; ia merencanakan rute untuk mencapainya.",
      limit: "Tujuan hanya 'tercapai/tidak' — belum membedakan solusi yang baik dari yang terbaik.",
    },
    en: {
      name: "Goal-Based Agent",
      tagline: "Chooses actions that move toward a GOAL",
      how: "Has an explicit goal. Considers 'if I do X, does it get me closer to the goal?' — often via search/planning.",
      pieces: ["World model", "Goal", "Search & planning"],
      example: "GPS/navigation: the goal is to reach an address; it plans a route to get there.",
      limit: "A goal is just 'reached/not' — it can't yet tell a good solution from the best one.",
    },
  },
  {
    key: "utility", icon: "⭐", color: "#F5A200", level: 4,
    id: {
      name: "Utility-Based Agent",
      tagline: "Memaksimalkan 'kepuasan' (utility), bukan sekadar mencapai tujuan",
      how: "Punya fungsi utilitas yang menilai SEBERAPA BAIK suatu keadaan. Memilih aksi dengan utilitas harapan tertinggi (menimbang trade-off & ketidakpastian).",
      pieces: ["Model dunia", "Fungsi utilitas", "Maksimasi utilitas harapan"],
      example: "Navigasi yang menimbang cepat vs hemat bensin vs aman — memilih rute 'terbaik', bukan sekadar 'sampai'.",
      limit: "Butuh fungsi utilitas yang dirancang baik; salah desain → perilaku tak diinginkan.",
    },
    en: {
      name: "Utility-Based Agent",
      tagline: "Maximizes 'satisfaction' (utility), not just reaching a goal",
      how: "Has a utility function rating HOW GOOD a state is. Picks the action with highest expected utility (weighing trade-offs & uncertainty).",
      pieces: ["World model", "Utility function", "Expected-utility maximization"],
      example: "Navigation weighing fast vs fuel-saving vs safe — choosing the 'best' route, not just 'arriving'.",
      limit: "Needs a well-designed utility function; a bad one → undesired behavior.",
    },
  },
  {
    key: "learning", icon: "🧠", color: "#16a34a", level: 5,
    id: {
      name: "Learning Agent",
      tagline: "Meningkatkan dirinya dari pengalaman",
      how: "Menambahkan elemen belajar: kritik menilai kinerja, elemen belajar memperbaiki elemen kinerja, generator masalah mendorong eksplorasi.",
      pieces: ["Elemen kinerja", "Kritik (umpan balik)", "Elemen belajar", "Generator masalah"],
      example: "Sistem rekomendasi yang makin akurat seiring waktu; agen game yang makin jago berlatih.",
      limit: "Perlu data/umpan balik & waktu; bisa belajar hal yang salah bila sinyal buruk (lihat modul Etika AI).",
    },
    en: {
      name: "Learning Agent",
      tagline: "Improves itself from experience",
      how: "Adds a learning element: a critic judges performance, the learning element improves the performance element, a problem generator drives exploration.",
      pieces: ["Performance element", "Critic (feedback)", "Learning element", "Problem generator"],
      example: "A recommender that gets more accurate over time; a game agent that gets better with practice.",
      limit: "Needs data/feedback & time; can learn the wrong thing from bad signals (see the AI Ethics module).",
    },
  },
];

export default function AgentTypes() {
  const { lang } = useLang();
  const [openKey, setOpenKey] = useState("reflex");

  const L = {
    id: {
      hint: "Tidak semua agen sama pintarnya. Dari yang paling sederhana ke paling canggih — klik untuk melihat cara kerja, komponen, contoh, dan batasannya.",
      how: "Cara memutuskan", pieces: "Komponen internal", example: "Contoh", limit: "Batasan", sophistication: "Kecanggihan",
    },
    en: {
      hint: "Not all agents are equally smart. From simplest to most sophisticated — click to see how it decides, its parts, an example, and its limitation.",
      how: "How it decides", pieces: "Internal parts", example: "Example", limit: "Limitation", sophistication: "Sophistication",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>
      <div className="space-y-2">
        {TYPES.map((t) => {
          const open = openKey === t.key;
          return (
            <div key={t.key} className="overflow-hidden rounded-xl border border-slate-200">
              <button
                onClick={() => setOpenKey(open ? "" : t.key)}
                className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50"
                style={open ? { backgroundColor: t.color + "12" } : {}}
              >
                <span className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <span>
                    <span className="block font-bold text-slate-900">{t[lang].name}</span>
                    <span className="block text-xs text-slate-500">{t[lang].tagline}</span>
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  {/* sophistication meter */}
                  <span className="hidden gap-0.5 sm:flex" title={L.sophistication}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span key={n} className="h-3 w-1.5 rounded-full" style={{ backgroundColor: n <= t.level ? t.color : "#e2e8f0" }} />
                    ))}
                  </span>
                  <span className="text-slate-400">{open ? "▲" : "▼"}</span>
                </span>
              </button>

              {open && (
                <div className="border-t border-slate-100 bg-white px-4 py-3 text-sm">
                  <p className="text-slate-700"><span className="font-semibold" style={{ color: t.color }}>{L.how}:</span> {t[lang].how}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {t[lang].pieces.map((p, i) => (
                      <span key={i} className="rounded-full px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: t.color + "18", color: "#334155" }}>{p}</span>
                    ))}
                  </div>
                  <p className="mt-2 text-slate-600"><span className="font-semibold text-slate-700">{L.example}:</span> {t[lang].example}</p>
                  <p className="mt-1 text-slate-500"><span className="font-semibold text-slate-600">⚠️ {L.limit}:</span> {t[lang].limit}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
