"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

// Interactive Agent–Environment loop.
// Visualizes the classic cycle: the ENVIRONMENT is sensed by SENSORS
// (perception) -> the AGENT PROGRAM decides -> ACTUATORS perform an ACTION ->
// the environment changes -> repeat. A concrete vacuum-cleaner agent makes the
// loop tangible: a 2-cell world (A, B) that can be dirty/clean; the agent
// senses its cell, cleans if dirty, else moves. Original teaching implementation.

// The five stages of one loop iteration.
const STAGES = [
  { key: "perceive", icon: "👁️", color: "#0093D0",
    id: { name: "Persepsi", sub: "Sensor membaca lingkungan", detail: "Agen mengamati lingkungan lewat SENSOR. Hasil pengamatan disebut persepsi (percept)." },
    en: { name: "Perception", sub: "Sensors read the environment", detail: "The agent observes the environment via SENSORS. What it reads is called a percept." } },
  { key: "think", icon: "🧠", color: "#7c3aed",
    id: { name: "Program Agen", sub: "Memetakan persepsi → aksi", detail: "Program agen (fungsi agen) memutuskan aksi terbaik berdasarkan persepsi (dan mungkin ingatan/tujuan)." },
    en: { name: "Agent Program", sub: "Maps percept → action", detail: "The agent program (agent function) decides the best action from the percept (and maybe memory/goals)." } },
  { key: "act", icon: "🦾", color: "#F5A200",
    id: { name: "Aksi", sub: "Aktuator menjalankan", detail: "AKTUATOR menjalankan aksi yang dipilih — mis. bergerak, membersihkan, menampilkan sesuatu." },
    en: { name: "Action", sub: "Actuators carry it out", detail: "ACTUATORS perform the chosen action — e.g. move, clean, display something." } },
  { key: "affect", icon: "🌍", color: "#16a34a",
    id: { name: "Lingkungan Berubah", sub: "Aksi mengubah dunia", detail: "Aksi mengubah keadaan lingkungan. Keadaan baru inilah yang akan dipersepsi pada putaran berikutnya." },
    en: { name: "Environment Changes", sub: "Action changes the world", detail: "The action changes the environment's state. That new state is what gets perceived next round." } },
];

// vacuum world: two cells; agent at posn 0/1; each cell dirty=true/false
function initialWorld() {
  return { pos: 0, dirty: [true, true] };
}

export default function AgentEnvironmentLoop() {
  const { lang } = useLang();
  const [world, setWorld] = useState(initialWorld);
  const [stage, setStage] = useState(0);
  const [percept, setPercept] = useState(null); // {loc, dirty}
  const [decision, setDecision] = useState(null); // "clean" | "move"
  const [playing, setPlaying] = useState(false);
  const [steps, setSteps] = useState(0);
  const timer = useRef(null);

  const L = {
    id: {
      hint: "Agen cerdas hidup dalam sebuah lingkungan. Ia MENANGKAP lingkungan lewat sensor, BERPIKIR, lalu BERTINDAK lewat aktuator — dan aksi itu mengubah lingkungan. Ikuti satu putaran atau jalankan otomatis.",
      envTitle: "Lingkungan (dunia penyedot debu)",
      agentTitle: "Agen",
      cell: "Sel", dirty: "Kotor", clean: "Bersih", here: "🤖 di sini",
      perceptLbl: "Persepsi", decisionLbl: "Keputusan",
      doClean: "Bersihkan", doMove: "Pindah",
      step: "Langkah", next: "Langkah berikutnya →", auto: "▶ Jalankan otomatis", pause: "⏸ Jeda", reset: "↻ Reset dunia",
      allClean: "✅ Semua sel bersih — tujuan tercapai! Agen rasional berhenti (aksi = diam).",
      peas: "PEAS: Performance (kebersihan), Environment (sel A/B), Actuators (gerak, isap), Sensors (posisi, deteksi kotor).",
    },
    en: {
      hint: "An intelligent agent lives inside an environment. It PERCEIVES it via sensors, THINKS, then ACTS via actuators — and that action changes the environment. Step through one loop or run it automatically.",
      envTitle: "Environment (vacuum world)",
      agentTitle: "Agent",
      cell: "Cell", dirty: "Dirty", clean: "Clean", here: "🤖 here",
      perceptLbl: "Percept", decisionLbl: "Decision",
      doClean: "Clean", doMove: "Move",
      step: "Step", next: "Next step →", auto: "▶ Run automatically", pause: "⏸ Pause", reset: "↻ Reset world",
      allClean: "✅ All cells clean — goal reached! A rational agent stops (action = idle).",
      peas: "PEAS: Performance (cleanliness), Environment (cells A/B), Actuators (move, suck), Sensors (location, dirt detection).",
    },
  }[lang];

  const allClean = world.dirty.every((d) => !d);

  // advance exactly one stage of the loop
  const advance = () => {
    setStage((prev) => {
      const s = (prev + 1) % STAGES.length;
      if (s === 0) {
        // starting a fresh loop: nothing yet (percept computed at stage 0->? )
      }
      return s;
    });
  };

  // Perform the semantic effect of each stage when it becomes active.
  useEffect(() => {
    const st = STAGES[stage].key;
    if (st === "perceive") {
      setPercept({ loc: world.pos, dirty: world.dirty[world.pos] });
      setDecision(null);
    } else if (st === "think") {
      const dec = world.dirty[world.pos] ? "clean" : "move";
      setDecision(dec);
    } else if (st === "act") {
      // action is visually acknowledged here; effect applied at "affect"
    } else if (st === "affect") {
      setWorld((w) => {
        const next = { pos: w.pos, dirty: [...w.dirty] };
        if (decision === "clean") next.dirty[w.pos] = false;
        else next.pos = w.pos === 0 ? 1 : 0;
        return next;
      });
      setSteps((n) => n + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // autoplay
  useEffect(() => {
    if (!playing) return;
    if (allClean) { setPlaying(false); return; }
    timer.current = setTimeout(advance, 900);
    return () => clearTimeout(timer.current);
  }, [playing, stage, allClean]);

  const reset = () => {
    setPlaying(false);
    setWorld(initialWorld());
    setStage(0);
    setPercept(null);
    setDecision(null);
    setSteps(0);
  };

  const cur = STAGES[stage];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      {/* the loop ring */}
      <div className="flex flex-wrap items-center justify-center gap-1">
        {STAGES.map((s, i) => (
          <div key={s.key} className="flex items-center">
            <div
              className={`flex w-[92px] flex-col items-center rounded-xl border-2 px-2 py-2 text-center transition ${i === stage ? "shadow" : "opacity-60"}`}
              style={i === stage ? { borderColor: s.color, backgroundColor: s.color + "14" } : { borderColor: "#e2e8f0" }}
            >
              <span className="text-xl">{s.icon}</span>
              <span className="mt-0.5 text-[10px] font-bold leading-tight" style={{ color: i === stage ? s.color : "#64748b" }}>{s[lang].name}</span>
              <span className="text-[9px] leading-tight text-slate-400">{s[lang].sub}</span>
            </div>
            <span className="px-0.5 text-slate-300">{i < STAGES.length - 1 ? "→" : "↺"}</span>
          </div>
        ))}
      </div>

      {/* current stage detail */}
      <div className="mt-3 rounded-xl border p-3" style={{ borderColor: cur.color + "55", backgroundColor: cur.color + "0e" }}>
        <p className="text-sm font-bold" style={{ color: cur.color }}>{cur.icon} {cur[lang].name}</p>
        <p className="mt-0.5 text-sm text-slate-600">{cur[lang].detail}</p>
      </div>

      {/* environment + agent state */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {/* environment */}
        <div className="rounded-xl border border-slate-200 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{L.envTitle}</p>
          <div className="flex gap-2">
            {world.dirty.map((d, i) => (
              <div
                key={i}
                className={`flex flex-1 flex-col items-center rounded-lg border-2 py-3 text-center ${d ? "border-amber-300 bg-amber-50" : "border-green-300 bg-green-50"}`}
              >
                <span className="text-lg font-bold text-slate-700">{L.cell} {i === 0 ? "A" : "B"}</span>
                <span className={`text-xs font-semibold ${d ? "text-amber-700" : "text-green-700"}`}>{d ? `🌫️ ${L.dirty}` : `✨ ${L.clean}`}</span>
                <span className="mt-1 h-4 text-xs">{world.pos === i ? L.here : ""}</span>
              </div>
            ))}
          </div>
        </div>

        {/* agent internals */}
        <div className="rounded-xl border border-slate-200 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{L.agentTitle}</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between rounded-md bg-slate-50 px-2 py-1.5">
              <span className="text-slate-500">👁️ {L.perceptLbl}</span>
              <span className="font-mono text-xs text-slate-700">
                {percept ? `{${percept.loc === 0 ? "A" : "B"}, ${percept.dirty ? L.dirty : L.clean}}` : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-md bg-slate-50 px-2 py-1.5">
              <span className="text-slate-500">🧠 {L.decisionLbl}</span>
              <span className="font-semibold" style={{ color: decision ? "#7c3aed" : "#94a3b8" }}>
                {decision === "clean" ? `🦾 ${L.doClean}` : decision === "move" ? `🦾 ${L.doMove}` : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {allClean && <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">{L.allClean}</p>}

      {/* controls */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-auto text-xs text-slate-400">{L.step}: {steps}</span>
        <button onClick={() => { setPlaying(false); advance(); }} disabled={allClean} className="rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-40">{L.next}</button>
        <button onClick={() => setPlaying((p) => !p)} disabled={allClean} className="rounded-lg border border-slate-300 px-4 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40">{playing ? L.pause : L.auto}</button>
        <button onClick={reset} className="rounded-lg border border-slate-300 px-4 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">{L.reset}</button>
      </div>

      <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.peas}</p>
    </div>
  );
}
