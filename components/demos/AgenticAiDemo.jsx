"use client";

import { useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

// Agentic AI demo — shows how an LLM "agent" accomplishes a goal by looping:
//   Thought -> Action (call a tool) -> Observation -> ... -> Final answer.
// This is the ReAct / tool-calling pattern behind modern AI agents (booking
// assistants, copilots). Everything here is a transparent, scripted simulation
// (mock tools, no real API/LLM) so students can SEE the reasoning + tool use,
// including a human-in-the-loop approval before the irreversible "book" action.

// ---- mock "tools" the agent can call (deterministic fake data) ----
const FLIGHTS = [
  { id: "GA-412", dep: "07:10", arr: "09:25", price: 1180, seatsLeft: 6 },
  { id: "JT-910", dep: "11:40", arr: "13:55", price: 940, seatsLeft: 2 },
  { id: "ID-688", dep: "17:05", arr: "19:20", price: 1030, seatsLeft: 9 },
];

// A scenario = an ordered list of agent steps. Each step is either a
// thought/action/observation, or a human-approval gate, or the final answer.
function buildScenario(lang, pax) {
  const id = lang === "id";
  const cheapest = [...FLIGHTS].sort((a, b) => a.price - b.price)[0];
  const money = (n) => `Rp ${(n * 1000 * pax).toLocaleString(id ? "id-ID" : "en-US")}`;
  return [
    {
      kind: "thought",
      text: id
        ? "Pengguna ingin memesan penerbangan Jakarta → Bali hari Jumat untuk " + pax + " orang. Saya perlu mencari penerbangan dulu."
        : "The user wants to book a Jakarta → Bali flight on Friday for " + pax + ". First I should search for flights.",
    },
    {
      kind: "action", tool: "search_flights",
      args: { from: "CGK", to: "DPS", date: "Fri", pax },
      observation: id
        ? `Ditemukan 3 penerbangan: ${FLIGHTS.map((f) => `${f.id} (${f.dep}, Rp${f.price}rb, sisa ${f.seatsLeft})`).join("; ")}.`
        : `Found 3 flights: ${FLIGHTS.map((f) => `${f.id} (${f.dep}, Rp${f.price}k, ${f.seatsLeft} left)`).join("; ")}.`,
    },
    {
      kind: "thought",
      text: id
        ? `Saya bandingkan harga & ketersediaan. ${cheapest.id} termurah (Rp${cheapest.price}rb) tetapi sisa kursi hanya ${cheapest.seatsLeft}. Perlu cek apakah cukup untuk ${pax} orang.`
        : `I compare price & availability. ${cheapest.id} is cheapest (Rp${cheapest.price}k) but only ${cheapest.seatsLeft} seats left. I must check it fits ${pax} passengers.`,
    },
    {
      kind: "action", tool: "check_seats",
      args: { flight: cheapest.id, pax },
      observation:
        cheapest.seatsLeft >= pax
          ? (id ? `OK — ${cheapest.seatsLeft} kursi tersedia, cukup untuk ${pax}.` : `OK — ${cheapest.seatsLeft} seats available, enough for ${pax}.`)
          : (id ? `Tidak cukup kursi di ${cheapest.id}.` : `Not enough seats on ${cheapest.id}.`),
    },
    {
      kind: "thought",
      text: id
        ? `Kursi cukup. Total untuk ${pax} orang = ${money(cheapest.price)}. Memesan itu tindakan yang tak bisa dibatalkan, jadi saya minta persetujuan pengguna dulu.`
        : `Seats are enough. Total for ${pax} = ${money(cheapest.price)}. Booking is irreversible, so I ask the user to approve first.`,
    },
    {
      kind: "approval",
      summary: id
        ? `Pesan ${cheapest.id} (CGK→DPS, Jumat ${cheapest.dep}) untuk ${pax} orang — ${money(cheapest.price)}?`
        : `Book ${cheapest.id} (CGK→DPS, Fri ${cheapest.dep}) for ${pax} — ${money(cheapest.price)}?`,
      flight: cheapest, total: money(cheapest.price),
    },
    {
      kind: "action", tool: "book_flight",
      args: { flight: cheapest.id, pax },
      observation: id ? `Pemesanan berhasil. Kode booking: CGN-7X2Q.` : `Booking successful. Confirmation code: CGN-7X2Q.`,
      afterApproval: true,
    },
    {
      kind: "action", tool: "send_confirmation",
      args: { channel: "email" },
      observation: id ? `Email konfirmasi terkirim ke pengguna.` : `Confirmation email sent to the user.`,
      afterApproval: true,
    },
    {
      kind: "final",
      text: id
        ? `Selesai! Saya memesan ${cheapest.id} (CGK→DPS, Jumat ${cheapest.dep}) untuk ${pax} orang seharga ${money(cheapest.price)}. Kode booking CGN-7X2Q & email konfirmasi sudah dikirim.`
        : `Done! I booked ${cheapest.id} (CGK→DPS, Fri ${cheapest.dep}) for ${pax} at ${money(cheapest.price)}. Booking code CGN-7X2Q & a confirmation email were sent.`,
      afterApproval: true,
    },
  ];
}

const TOOL_META = {
  search_flights: { icon: "🔎", color: "#0093D0" },
  check_seats: { icon: "💺", color: "#7c3aed" },
  book_flight: { icon: "✈️", color: "#16a34a" },
  send_confirmation: { icon: "📧", color: "#F5A200" },
};

export default function AgenticAiDemo() {
  const { lang } = useLang();
  const [pax, setPax] = useState(2);
  const [steps, setSteps] = useState([]); // revealed steps
  const [running, setRunning] = useState(false);
  const [awaitingApproval, setAwaitingApproval] = useState(false);
  const [declined, setDeclined] = useState(false);
  const scenarioRef = useRef([]);
  const idxRef = useRef(0);
  const timerRef = useRef(null);

  const L = {
    id: {
      hint: "Agentic AI: sebuah LLM yang diberi TUJUAN lalu menyelesaikannya sendiri dengan memanggil 'tools'. Polanya berulang: Pikir → Aksi (panggil tool) → Amati hasil → ulangi, sampai tujuan tercapai.",
      goalLabel: "Tujuan untuk agen",
      goal: "Pesankan penerbangan Jakarta → Bali hari Jumat",
      pax: "Jumlah penumpang",
      run: "▶ Jalankan Agen", reset: "↻ Reset", running: "Agen sedang bekerja…",
      thought: "Pikiran", action: "Aksi", obs: "Pengamatan", tool: "Tool", final: "Jawaban akhir",
      approvalTitle: "Persetujuan manusia diperlukan (human-in-the-loop)",
      approve: "✓ Setujui & pesan", decline: "✗ Batalkan",
      declined: "Pengguna membatalkan. Agen berhenti tanpa memesan — contoh pentingnya kendali manusia pada aksi berisiko.",
      loop: "Loop agen: Pikir → Aksi → Amati",
      note: "Agen nyata memakai LLM untuk 'berpikir' dan memilih tool, lalu benar-benar memanggil API (pencarian, pembayaran). Kuncinya: beri tool yang tepat, batasi wewenang, dan sisipkan persetujuan manusia untuk aksi tak-terbalikkan.",
    },
    en: {
      hint: "Agentic AI: an LLM given a GOAL that accomplishes it by calling 'tools'. The pattern loops: Think → Act (call a tool) → Observe result → repeat, until the goal is met.",
      goalLabel: "Goal for the agent",
      goal: "Book a Jakarta → Bali flight on Friday",
      pax: "Passengers",
      run: "▶ Run the Agent", reset: "↻ Reset", running: "Agent is working…",
      thought: "Thought", action: "Action", obs: "Observation", tool: "Tool", final: "Final answer",
      approvalTitle: "Human approval required (human-in-the-loop)",
      approve: "✓ Approve & book", decline: "✗ Cancel",
      declined: "The user cancelled. The agent stops without booking — showing why human control matters for risky actions.",
      loop: "Agent loop: Think → Act → Observe",
      note: "Real agents use an LLM to 'think' and choose tools, then actually call APIs (search, payment). The keys: give it the right tools, limit its authority, and insert human approval for irreversible actions.",
    },
  }[lang];

  const stop = () => { if (timerRef.current) clearTimeout(timerRef.current); timerRef.current = null; };

  const pushNext = () => {
    const scenario = scenarioRef.current;
    const i = idxRef.current;
    if (i >= scenario.length) { setRunning(false); return; }
    const step = scenario[i];
    // pause at the approval gate
    if (step.kind === "approval") {
      setSteps((s) => [...s, step]);
      setAwaitingApproval(true);
      setRunning(false);
      idxRef.current = i + 1;
      return;
    }
    setSteps((s) => [...s, step]);
    idxRef.current = i + 1;
    timerRef.current = setTimeout(pushNext, step.kind === "action" ? 1100 : 900);
  };

  const run = () => {
    stop();
    setDeclined(false);
    setAwaitingApproval(false);
    scenarioRef.current = buildScenario(lang, pax);
    idxRef.current = 0;
    setSteps([]);
    setRunning(true);
    timerRef.current = setTimeout(pushNext, 500);
  };

  const reset = () => {
    stop();
    setSteps([]); setRunning(false); setAwaitingApproval(false); setDeclined(false);
    idxRef.current = 0;
  };

  const approve = () => { setAwaitingApproval(false); setRunning(true); timerRef.current = setTimeout(pushNext, 400); };
  const decline = () => { stop(); setAwaitingApproval(false); setRunning(false); setDeclined(true); };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>
      <p className="mb-4 rounded-md bg-brand-50 px-3 py-1.5 text-center text-xs font-semibold text-brand-700">🔁 {L.loop}</p>

      {/* goal */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">🎯 {L.goalLabel}</div>
        <p className="mt-1 text-sm font-medium text-slate-800">{L.goal}</p>
        <label className="mt-2 flex items-center gap-2 text-sm text-slate-600">
          {L.pax}:
          <input type="range" min="1" max="8" value={pax} disabled={running} onChange={(e) => setPax(+e.target.value)} className="accent-brand-600" />
          <span className="font-bold text-brand-600">{pax}</span>
        </label>
      </div>

      {/* controls */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={run} disabled={running} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50">
          {running ? L.running : L.run}
        </button>
        <button onClick={reset} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">{L.reset}</button>
      </div>

      {/* trace */}
      <div className="mt-5 space-y-2">
        {steps.map((step, i) => {
          if (step.kind === "thought") {
            return (
              <div key={i} className="flex gap-2 rounded-lg bg-purple-50 p-3">
                <span className="text-lg">🧠</span>
                <div><div className="text-[11px] font-semibold uppercase tracking-wide text-purple-700">{L.thought}</div><p className="text-sm text-slate-700">{step.text}</p></div>
              </div>
            );
          }
          if (step.kind === "action") {
            const m = TOOL_META[step.tool] || { icon: "🛠️", color: "#64748b" };
            return (
              <div key={i} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{m.icon}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: m.color }}>{L.action} · {L.tool}</span>
                </div>
                <code className="mt-1 block rounded bg-slate-900 px-2 py-1.5 font-mono text-xs text-slate-100">
                  {step.tool}({Object.entries(step.args).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(", ")})
                </code>
                <div className="mt-2 flex gap-2">
                  <span className="text-xs">↳</span>
                  <p className="text-sm text-slate-600"><span className="font-semibold text-slate-500">{L.obs}: </span>{step.observation}</p>
                </div>
              </div>
            );
          }
          if (step.kind === "approval") {
            return (
              <div key={i} className="rounded-lg border-2 border-amber-300 bg-amber-50 p-3">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-700">🙋 {L.approvalTitle}</div>
                <p className="mt-1 text-sm font-medium text-slate-800">{step.summary}</p>
                {awaitingApproval && (
                  <div className="mt-3 flex gap-2">
                    <button onClick={approve} className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700">{L.approve}</button>
                    <button onClick={decline} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">{L.decline}</button>
                  </div>
                )}
              </div>
            );
          }
          if (step.kind === "final") {
            return (
              <div key={i} className="rounded-lg border border-green-300 bg-green-50 p-3">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-green-700">✅ {L.final}</div>
                <p className="mt-1 text-sm text-slate-700">{step.text}</p>
              </div>
            );
          }
          return null;
        })}
        {declined && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">⛔ {L.declined}</p>}
      </div>

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
