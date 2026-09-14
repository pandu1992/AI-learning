"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useLang } from "../LanguageProvider";

// RL dynamic-pricing demo for a ride-hailing service (Indonesian context).
// State: demand, traffic, weather. Action: surge multiplier. Reward: revenue.
// Two modes: Manual (drag surge, see revenue curve) and RL Agent (an
// epsilon-greedy bandit over discrete surge levels learns the best price).
// All simulation is an original, explainable toy model — not real data.

const BASE_FARE = 15000; // Rp base fare per ride (illustrative)
const SURGE_MIN = 1.0;
const SURGE_MAX = 3.0;
const SURGE_STEP = 0.1;
// Discrete surge levels the RL agent can choose from
const SURGE_LEVELS = Array.from({ length: 21 }, (_, i) => +(1.0 + i * 0.1).toFixed(1));

// Toy demand model: how many riders accept a ride at a given surge & conditions.
// Base potential riders rises with demand & traffic; rain raises demand too.
// Accepted riders fall as surge rises (price elasticity).
function potentialRiders(demand, traffic, rain) {
  // demand,traffic in 0..1 ; rain in {0,1}
  const base = 60 + demand * 140 + traffic * 60 + (rain ? 50 : 0);
  return base; // riders willing at surge = 1.0
}

function acceptedRiders(surge, demand, traffic, rain) {
  const pot = potentialRiders(demand, traffic, rain);
  // elasticity: higher demand/rain = less price-sensitive (people still need rides)
  const sensitivity = 1.15 - demand * 0.35 - (rain ? 0.15 : 0); // ~0.65..1.15
  // fraction accepting drops as surge rises above 1.0
  const frac = Math.max(0, 1 - sensitivity * (surge - 1));
  return Math.round(pot * frac);
}

function revenue(surge, demand, traffic, rain) {
  return Math.round(acceptedRiders(surge, demand, traffic, rain) * surge * BASE_FARE);
}

function bestSurge(demand, traffic, rain) {
  let best = SURGE_LEVELS[0];
  let bestRev = -1;
  for (const s of SURGE_LEVELS) {
    const r = revenue(s, demand, traffic, rain);
    if (r > bestRev) { bestRev = r; best = s; }
  }
  return { surge: best, rev: bestRev };
}

const fmtRp = (n) => "Rp" + n.toLocaleString("id-ID");

export default function DynamicPricingDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);

  const [mode, setMode] = useState("manual"); // manual | agent
  const [demand, setDemand] = useState(0.6);
  const [traffic, setTraffic] = useState(0.5);
  const [rain, setRain] = useState(false);
  const [surge, setSurge] = useState(1.4);

  // RL agent state
  const qRef = useRef(SURGE_LEVELS.map(() => 0)); // estimated revenue per surge level
  const nRef = useRef(SURGE_LEVELS.map(() => 0)); // pull counts
  const timer = useRef(null);
  const [episodes, setEpisodes] = useState(0);
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentBest, setAgentBest] = useState(null); // {surge, rev}
  const epsilon = 0.15;

  const opt = useMemo(() => bestSurge(demand, traffic, rain), [demand, traffic, rain]);

  const curRiders = acceptedRiders(surge, demand, traffic, rain);
  const curRev = revenue(surge, demand, traffic, rain);
  const fixedRev = revenue(1.0, demand, traffic, rain); // baseline: no surge

  // reset agent when conditions change
  const resetAgent = useCallback(() => {
    clearInterval(timer.current);
    setAgentRunning(false);
    qRef.current = SURGE_LEVELS.map(() => 0);
    nRef.current = SURGE_LEVELS.map(() => 0);
    setEpisodes(0);
    setAgentBest(null);
  }, []);

  useEffect(() => { resetAgent(); }, [demand, traffic, rain, resetAgent]);

  // one bandit step: epsilon-greedy pick a surge level, get noisy revenue, update estimate
  const agentStep = useCallback(() => {
    const q = qRef.current;
    const n = nRef.current;
    let idx;
    if (Math.random() < epsilon) {
      idx = Math.floor(Math.random() * SURGE_LEVELS.length);
    } else {
      idx = q.indexOf(Math.max(...q));
    }
    const s = SURGE_LEVELS[idx];
    // observed revenue with small noise (simulating day-to-day variation)
    const noise = 0.9 + Math.random() * 0.2;
    const observed = revenue(s, demand, traffic, rain) * noise;
    n[idx] += 1;
    q[idx] += (observed - q[idx]) / n[idx];
    // current best estimate
    const bIdx = q.indexOf(Math.max(...q));
    setAgentBest({ surge: SURGE_LEVELS[bIdx], rev: Math.round(q[bIdx]) });
    setEpisodes((e) => e + 1);
  }, [demand, traffic, rain]);

  const toggleAgent = () => {
    if (agentRunning) { clearInterval(timer.current); setAgentRunning(false); }
    else { setAgentRunning(true); timer.current = setInterval(agentStep, 60); }
  };
  useEffect(() => () => clearInterval(timer.current), []);

  // draw revenue-vs-surge curve
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height, PAD = 34;
    ctx.clearRect(0, 0, W, H);

    const maxRev = Math.max(...SURGE_LEVELS.map((s) => revenue(s, demand, traffic, rain))) * 1.1 || 1;
    const xOf = (s) => PAD + ((s - SURGE_MIN) / (SURGE_MAX - SURGE_MIN)) * (W - 2 * PAD);
    const yOf = (r) => H - PAD - (r / maxRev) * (H - 2 * PAD);

    // axes
    ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(PAD, PAD); ctx.lineTo(PAD, H - PAD); ctx.lineTo(W - PAD, H - PAD); ctx.stroke();

    // revenue curve
    ctx.strokeStyle = "#0093D0"; ctx.lineWidth = 3; ctx.beginPath();
    SURGE_LEVELS.forEach((s, i) => {
      const x = xOf(s), y = yOf(revenue(s, demand, traffic, rain));
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // optimal point
    const [ox, oy] = [xOf(opt.surge), yOf(opt.rev)];
    ctx.fillStyle = "#059669"; ctx.beginPath(); ctx.arc(ox, oy, 6, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#059669"; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox, H - PAD); ctx.stroke(); ctx.setLineDash([]);

    // current surge marker (manual) or agent best (agent)
    const markSurge = mode === "agent" && agentBest ? agentBest.surge : surge;
    const mx = xOf(markSurge), my = yOf(revenue(markSurge, demand, traffic, rain));
    ctx.fillStyle = "#F5A200"; ctx.beginPath(); ctx.arc(mx, my, 6, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#F5A200"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(mx, PAD); ctx.lineTo(mx, H - PAD); ctx.stroke();

    // axis labels
    ctx.fillStyle = "#64748b"; ctx.font = "10px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("1.0×", PAD, H - PAD + 14);
    ctx.fillText("3.0×", W - PAD, H - PAD + 14);
  }, [demand, traffic, rain, surge, opt, mode, agentBest]);

  const L = {
    id: {
      manual: "Mode Manual", agent: "Mode Agen RL",
      demand: "Permintaan (jam sibuk)", traffic: "Kepadatan lalu lintas", rain: "Hujan",
      surge: "Pengali harga (surge)", riders: "Order diterima", revenue: "Revenue",
      vsFixed: "vs tanpa surge", optimal: "Surge optimal", curve: "Kurva revenue vs surge",
      train: "Latih Agen", stop: "Berhenti", reset: "Reset", episodes: "Percobaan",
      agentFound: "Surge terbaik ditemukan agen", legendOpt: "Optimal (hijau)", legendCur: "Pilihanmu/agen (oranye)",
      hintManual: "Geser surge & kondisi. Harga naik = margin per order naik, tapi order turun (elastisitas). Cari titik revenue tertinggi.",
      hintAgent: "Agen RL (ε-greedy bandit) mencoba berbagai surge, belajar dari revenue yang diperoleh, lalu menyatu ke surge optimal untuk kondisi saat ini.",
      insight: "Ini inti RL: harga = aksi, revenue = reward. Agen menyeimbangkan harga terlalu tinggi (order kabur) vs terlalu rendah (revenue kecil).",
    },
    en: {
      manual: "Manual Mode", agent: "RL Agent Mode",
      demand: "Demand (rush hour)", traffic: "Traffic congestion", rain: "Rain",
      surge: "Surge multiplier", riders: "Orders accepted", revenue: "Revenue",
      vsFixed: "vs no surge", optimal: "Optimal surge", curve: "Revenue vs surge curve",
      train: "Train Agent", stop: "Stop", reset: "Reset", episodes: "Trials",
      agentFound: "Best surge found by agent", legendOpt: "Optimal (green)", legendCur: "Your/agent choice (orange)",
      hintManual: "Drag surge & conditions. Higher price = higher margin per order, but fewer orders (elasticity). Find the highest-revenue point.",
      hintAgent: "The RL agent (ε-greedy bandit) tries different surges, learns from the revenue it earns, then converges on the optimal surge for the current conditions.",
      insight: "This is the essence of RL: price = action, revenue = reward. The agent balances too-high prices (orders leave) vs too-low prices (small revenue).",
    },
  }[lang];

  const revDeltaPct = fixedRev > 0 ? Math.round(((curRev - fixedRev) / fixedRev) * 100) : 0;
  const agentDeltaPct = agentBest && fixedRev > 0 ? Math.round(((revenue(agentBest.surge, demand, traffic, rain) - fixedRev) / fixedRev) * 100) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* mode toggle */}
      <div className="mb-4 inline-flex rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
        <button onClick={() => setMode("manual")} className={`rounded-md px-4 py-1.5 transition ${mode === "manual" ? "bg-brand-600 text-white" : "text-slate-600"}`}>🎚️ {L.manual}</button>
        <button onClick={() => setMode("agent")} className={`rounded-md px-4 py-1.5 transition ${mode === "agent" ? "bg-brand-600 text-white" : "text-slate-600"}`}>🤖 {L.agent}</button>
      </div>

      <p className="mb-4 text-sm text-slate-600">{mode === "manual" ? L.hintManual : L.hintAgent}</p>

      <div className="flex flex-col gap-5 lg:flex-row">
        {/* left: conditions + revenue curve */}
        <div className="flex-1 space-y-4">
          {/* condition sliders */}
          <div className="space-y-3 rounded-xl bg-slate-50 p-4">
            <div>
              <label className="flex justify-between text-sm font-semibold text-slate-700">
                <span>🚗 {L.demand}</span><span className="text-brand-600">{Math.round(demand * 100)}%</span>
              </label>
              <input type="range" min="0" max="1" step="0.05" value={demand} onChange={(e) => setDemand(+e.target.value)} className="mt-1 w-full accent-brand-600" />
            </div>
            <div>
              <label className="flex justify-between text-sm font-semibold text-slate-700">
                <span>🛣️ {L.traffic}</span><span className="text-brand-600">{Math.round(traffic * 100)}%</span>
              </label>
              <input type="range" min="0" max="1" step="0.05" value={traffic} onChange={(e) => setTraffic(+e.target.value)} className="mt-1 w-full accent-brand-600" />
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input type="checkbox" checked={rain} onChange={(e) => setRain(e.target.checked)} className="accent-brand-600" />
              🌧️ {L.rain}
            </label>
          </div>

          {/* revenue curve */}
          <div>
            <p className="mb-1 text-xs font-semibold text-slate-500">📈 {L.curve}</p>
            <canvas ref={canvasRef} width={360} height={200} className="w-full rounded-xl border border-slate-300 bg-white" style={{ aspectRatio: "360/200" }} />
            <div className="mt-1 flex justify-center gap-4 text-[11px] text-slate-500">
              <span>🟢 {L.legendOpt}</span><span>🟠 {L.legendCur}</span>
            </div>
          </div>
        </div>

        {/* right: action + readout */}
        <div className="flex-1 space-y-4">
          {mode === "manual" ? (
            <>
              <div>
                <label className="flex justify-between text-sm font-semibold text-slate-700">
                  <span>💲 {L.surge}</span><span className="text-brand-600">{surge.toFixed(1)}×</span>
                </label>
                <input type="range" min={SURGE_MIN} max={SURGE_MAX} step={SURGE_STEP} value={surge} onChange={(e) => setSurge(+e.target.value)} className="mt-1 w-full accent-brand-600" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <div className="text-xs text-slate-500">{L.riders}</div>
                  <div className="text-xl font-bold text-slate-800">{curRiders}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <div className="text-xs text-slate-500">{L.revenue}</div>
                  <div className="text-xl font-bold text-brand-700">{fmtRp(curRev)}</div>
                </div>
              </div>
              <div className={`rounded-lg p-3 text-center text-sm ${revDeltaPct >= 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {revDeltaPct >= 0 ? "▲" : "▼"} {Math.abs(revDeltaPct)}% {L.vsFixed}
              </div>
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center text-sm">
                🟢 {L.optimal}: <b>{opt.surge.toFixed(1)}×</b> → {fmtRp(opt.rev)}
              </div>
            </>
          ) : (
            <>
              <div className="rounded-lg bg-slate-50 p-4 text-center">
                <div className="text-xs text-slate-500">{L.agentFound}</div>
                {agentBest ? (
                  <>
                    <div className="text-3xl font-black text-brand-600">{agentBest.surge.toFixed(1)}×</div>
                    <div className="mt-1 text-sm text-slate-600">≈ {fmtRp(revenue(agentBest.surge, demand, traffic, rain))}</div>
                    <div className={`mt-1 text-sm font-semibold ${agentDeltaPct >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {agentDeltaPct >= 0 ? "▲" : "▼"} {Math.abs(agentDeltaPct)}% {L.vsFixed}
                    </div>
                  </>
                ) : (
                  <div className="mt-2 text-sm text-slate-400">—</div>
                )}
              </div>
              <div className="rounded-lg bg-slate-50 p-3 text-center text-sm">
                {L.episodes}: <b className="text-slate-800">{episodes}</b> · 🟢 {L.optimal}: <b>{opt.surge.toFixed(1)}×</b>
              </div>
              <div className="flex gap-2">
                <button onClick={toggleAgent} className="flex-1 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                  {agentRunning ? L.stop : L.train}
                </button>
                <button onClick={resetAgent} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">{L.reset}</button>
              </div>
            </>
          )}

          <p className="rounded-md bg-brand-50 px-3 py-2 text-xs text-brand-800">💡 {L.insight}</p>
        </div>
      </div>
    </div>
  );
}
