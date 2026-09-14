"use client";

import { useState } from "react";
import { useLang } from "../LanguageProvider";

// Interactive explorer of task-environment PROPERTIES. Pick an example
// environment and see how it's classified across the six standard dimensions,
// with a short reason for each. Classifications follow the common AI textbook
// treatment; descriptions are original teaching text.

// Each property dimension has two poles (a = "harder/left", we label per lang).
const DIMENSIONS = [
  { key: "observable", id: { a: "Terobservasi penuh", b: "Terobservasi sebagian" }, en: { a: "Fully observable", b: "Partially observable" } },
  { key: "agents", id: { a: "Agen tunggal", b: "Multi-agen" }, en: { a: "Single-agent", b: "Multi-agent" } },
  { key: "deterministic", id: { a: "Deterministik", b: "Stokastik" }, en: { a: "Deterministic", b: "Stochastic" } },
  { key: "episodic", id: { a: "Episodik", b: "Sekuensial" }, en: { a: "Episodic", b: "Sequential" } },
  { key: "static", id: { a: "Statis", b: "Dinamis" }, en: { a: "Static", b: "Dynamic" } },
  { key: "discrete", id: { a: "Diskret", b: "Kontinu" }, en: { a: "Discrete", b: "Continuous" } },
];

// value true = pole "a", false = pole "b"; each has a bilingual reason
const ENVIRONMENTS = [
  {
    key: "vacuum", icon: "🧹",
    id: { name: "Penyedot debu" }, en: { name: "Vacuum cleaner" },
    props: {
      observable: { v: false, id: "Hanya tahu sel saat ini, bukan seluruh ruangan.", en: "Only knows its current cell, not the whole room." },
      agents: { v: true, id: "Bekerja sendiri.", en: "Works alone." },
      deterministic: { v: true, id: "Mengisap → sel pasti bersih.", en: "Suck → the cell is surely clean." },
      episodic: { v: false, id: "Aksi sekarang memengaruhi keadaan berikutnya.", en: "Current actions affect later states." },
      static: { v: true, id: "Kotoran tak bertambah saat agen berpikir.", en: "Dirt doesn't appear while the agent thinks." },
      discrete: { v: true, id: "Sel & aksi terbatas dan terhitung.", en: "Cells & actions are finite and countable." },
    },
  },
  {
    key: "chess", icon: "♟️",
    id: { name: "Catur (dengan jam)" }, en: { name: "Chess (with clock)" },
    props: {
      observable: { v: true, id: "Seluruh papan terlihat kedua pemain.", en: "The whole board is visible to both players." },
      agents: { v: false, id: "Ada lawan — kompetitif.", en: "There's an opponent — competitive." },
      deterministic: { v: true, id: "Langkah menghasilkan posisi yang pasti.", en: "A move yields a definite position." },
      episodic: { v: false, id: "Langkah kini memengaruhi seluruh sisa permainan.", en: "A move now affects the rest of the game." },
      static: { v: false, id: "Ada jam waktu → keadaan berubah seiring waktu.", en: "A clock runs → state changes over time." },
      discrete: { v: true, id: "Jumlah posisi & langkah terbatas.", en: "Positions & moves are finite." },
    },
  },
  {
    key: "taxi", icon: "🚕",
    id: { name: "Taksi otonom" }, en: { name: "Self-driving taxi" },
    props: {
      observable: { v: false, id: "Tak bisa melihat semua kendaraan/niat pengemudi lain.", en: "Can't see all vehicles/other drivers' intentions." },
      agents: { v: false, id: "Banyak kendaraan & pejalan kaki lain.", en: "Many other vehicles & pedestrians." },
      deterministic: { v: false, id: "Lalu lintas & cuaca tak dapat diprediksi pasti.", en: "Traffic & weather aren't perfectly predictable." },
      episodic: { v: false, id: "Keputusan menyetir saling terkait sepanjang perjalanan.", en: "Driving decisions are linked across the trip." },
      static: { v: false, id: "Dunia terus berubah saat mobil memutuskan.", en: "The world keeps changing as the car decides." },
      discrete: { v: false, id: "Kecepatan, sudut setir, posisi bernilai kontinu.", en: "Speed, steering angle, position are continuous." },
    },
  },
  {
    key: "poker", icon: "🃏",
    id: { name: "Poker" }, en: { name: "Poker" },
    props: {
      observable: { v: false, id: "Kartu lawan tersembunyi.", en: "Opponents' cards are hidden." },
      agents: { v: false, id: "Beberapa pemain bersaing.", en: "Several players compete." },
      deterministic: { v: false, id: "Pembagian kartu acak.", en: "Card dealing is random." },
      episodic: { v: false, id: "Taruhan kini memengaruhi ronde berikut & reputasi.", en: "Betting now affects later rounds & reputation." },
      static: { v: true, id: "Giliran bergantian; menunggu tak mengubah kartu.", en: "Turn-based; waiting doesn't change your cards." },
      discrete: { v: true, id: "Kartu & aksi taruhan terbatas.", en: "Cards & betting actions are finite." },
    },
  },
];

export default function EnvironmentProperties() {
  const { lang } = useLang();
  const [sel, setSel] = useState("vacuum");
  const env = ENVIRONMENTS.find((e) => e.key === sel) || ENVIRONMENTS[0];

  const L = {
    id: {
      hint: "Sifat LINGKUNGAN menentukan seberapa sulit tugas & jenis agen yang dibutuhkan. Pilih sebuah lingkungan, lalu lihat klasifikasinya di enam dimensi.",
      pick: "Pilih lingkungan", reason: "Alasan",
      harder: "Sisi kanan (oranye) umumnya lebih menantang bagi agen.",
    },
    en: {
      hint: "An ENVIRONMENT's properties decide how hard the task is & what kind of agent you need. Pick an environment, then see its classification across six dimensions.",
      pick: "Pick an environment", reason: "Reason",
      harder: "The right side (orange) is generally more challenging for an agent.",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      {/* environment picker */}
      <div className="flex flex-wrap gap-2">
        {ENVIRONMENTS.map((e) => (
          <button
            key={e.key}
            onClick={() => setSel(e.key)}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${sel === e.key ? "border-transparent bg-brand-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`}
          >
            {e.icon} {e[lang].name}
          </button>
        ))}
      </div>

      {/* dimension rows */}
      <div className="mt-4 space-y-2">
        {DIMENSIONS.map((d) => {
          const p = env.props[d.key];
          const isA = p.v; // true -> pole a (blue/easier), false -> pole b (orange/harder)
          return (
            <div key={d.key} className="rounded-xl border border-slate-200 p-3">
              <div className="flex items-center gap-2">
                {/* two-pole pill */}
                <div className="flex overflow-hidden rounded-lg text-xs font-semibold ring-1 ring-slate-200">
                  <span className={`px-2.5 py-1 transition ${isA ? "bg-brand-600 text-white" : "bg-white text-slate-400"}`}>{d[lang].a}</span>
                  <span className={`px-2.5 py-1 transition ${!isA ? "text-white" : "bg-white text-slate-400"}`} style={!isA ? { backgroundColor: "#F5A200" } : {}}>{d[lang].b}</span>
                </div>
              </div>
              <p className="mt-1.5 text-xs text-slate-500"><span className="font-semibold text-slate-600">{L.reason}:</span> {lang === "id" ? p.id : p.en}</p>
            </div>
          );
        })}
      </div>

      <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.harder}</p>
    </div>
  );
}
