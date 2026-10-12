"use client";

import { useMemo, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

// Q-learning "train from scratch" — watch an RL agent learn over episodes.
// A grid-world: start at top-left, reach the goal (bottom-right) for +10, avoid
// traps (-10). The agent learns a Q-table via Q-learning; a reward-per-episode
// chart shows the learning curve rising from random to near-optimal. Controls
// for alpha (learning rate), gamma (discount), epsilon (exploration). Original.

const ROWS = 4, COLS = 4;
const GOAL = { r: 3, c: 3 };
const TRAPS = [{ r: 1, c: 1 }, { r: 2, c: 3 }, { r: 0, c: 2 }];
const START = { r: 0, c: 0 };
const ACTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right
const ARROWS = ["↑", "↓", "←", "→"];

const key = (r, c) => `${r},${c}`;
const isTrap = (r, c) => TRAPS.some((t) => t.r === r && t.c === c);
const isGoal = (r, c) => r === GOAL.r && c === GOAL.c;

function freshQ() {
  const q = {};
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) q[key(r, c)] = [0, 0, 0, 0];
  return q;
}

// run one episode; returns {reward, Q (mutated)}
function runEpisode(Q, { alpha, gamma, epsilon }) {
  let r = START.r, c = START.c;
  let total = 0;
  for (let step = 0; step < 50; step++) {
    const s = key(r, c);
    // epsilon-greedy
    let a;
    if (Math.random() < epsilon) a = Math.floor(Math.random() * 4);
    else { const qs = Q[s]; a = qs.indexOf(Math.max(...qs)); }
    let nr = r + ACTIONS[a][0], nc = c + ACTIONS[a][1];
    if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) { nr = r; nc = c; } // wall
    let reward = -0.1; // step cost
    let done = false;
    if (isGoal(nr, nc)) { reward = 10; done = true; }
    else if (isTrap(nr, nc)) { reward = -10; done = true; }
    const ns = key(nr, nc);
    const maxNext = Math.max(...Q[ns]);
    Q[s][a] += alpha * (reward + gamma * maxNext - Q[s][a]);
    total += reward;
    r = nr; c = nc;
    if (done) break;
  }
  return total;
}

export default function QLearningTrainDemo() {
  const { lang } = useLang();
  const [Q, setQ] = useState(freshQ);
  const [rewards, setRewards] = useState([]); // reward per episode
  const [episodes, setEpisodes] = useState(0);
  const [params] = useState({ alpha: 0.5, gamma: 0.9 });
  const [epsilon, setEpsilon] = useState(0.3);
  const chartRef = useRef(null);

  const train = (n) => {
    const q = JSON.parse(JSON.stringify(Q));
    const newRewards = [...rewards];
    for (let i = 0; i < n; i++) {
      newRewards.push(runEpisode(q, { ...params, epsilon }));
    }
    setQ(q);
    setRewards(newRewards.slice(-400));
    setEpisodes((e) => e + n);
    drawChart(newRewards.slice(-400));
  };

  const reset = () => {
    setQ(freshQ());
    setRewards([]);
    setEpisodes(0);
    const c = chartRef.current;
    if (c) c.getContext("2d").clearRect(0, 0, c.width, c.height);
  };

  const drawChart = (data) => {
    const c = chartRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height, PAD = 24;
    ctx.clearRect(0, 0, W, H);
    if (!data.length) return;
    const lo = Math.min(...data, -11), hi = Math.max(...data, 11);
    const X = (i) => PAD + (i / (data.length - 1 || 1)) * (W - 2 * PAD);
    const Y = (v) => H - PAD - ((v - lo) / (hi - lo || 1)) * (H - 2 * PAD);
    // zero line
    ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(PAD, Y(0)); ctx.lineTo(W - PAD, Y(0)); ctx.stroke();
    // raw reward (faint)
    ctx.strokeStyle = "rgba(148,163,184,0.5)"; ctx.lineWidth = 1;
    ctx.beginPath(); data.forEach((v, i) => (i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v)))); ctx.stroke();
    // moving average (trend)
    const win = 10;
    const ma = data.map((_, i) => {
      const s = Math.max(0, i - win + 1);
      const seg = data.slice(s, i + 1);
      return seg.reduce((a, b) => a + b, 0) / seg.length;
    });
    ctx.strokeStyle = "#0093D0"; ctx.lineWidth = 2.5;
    ctx.beginPath(); ma.forEach((v, i) => (i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v)))); ctx.stroke();
  };

  // greedy policy + max-Q (value) per cell
  const policy = useMemo(() => {
    const p = {};
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const qs = Q[key(r, c)];
      p[key(r, c)] = { a: qs.indexOf(Math.max(...qs)), v: Math.max(...qs) };
    }
    return p;
  }, [Q]);

  const avgRecent = rewards.length ? (rewards.slice(-20).reduce((a, b) => a + b, 0) / Math.min(20, rewards.length)) : 0;

  const L = {
    id: {
      hint: "Reinforcement Learning belajar dari NOL lewat coba-coba. Agen (🤖) harus mencapai tujuan (🎯 +10) sambil menghindari jebakan (💥 −10). Latih beberapa episode & lihat grafik reward NAIK saat agen makin pandai.",
      train10: "Latih 10 episode", train100: "Latih 100 episode", reset: "↻ Reset (lupakan semua)",
      episodes: "Episode", avg: "Reward rata-rata (20 terakhir)",
      chart: "Reward per episode (biru = tren rata-rata)",
      policy: "Kebijakan yang dipelajari (panah = aksi terbaik)",
      epsilon: "Eksplorasi (ε)",
      epsLow: "ε kecil = ikuti yang dipelajari", epsHigh: "ε besar = banyak coba acak",
      note: "Awalnya agen bergerak acak (reward rendah/negatif). Lewat update Q-learning, nilai menyebar mundur dari tujuan, dan reward meningkat sampai agen menemukan jalur optimal. Inilah 'belajar dari pengalaman'.",
      start: "Mulai", goal: "Tujuan", trap: "Jebakan",
    },
    en: {
      hint: "Reinforcement Learning learns from SCRATCH by trial and error. The agent (🤖) must reach the goal (🎯 +10) while avoiding traps (💥 −10). Train some episodes & watch the reward chart RISE as the agent gets smarter.",
      train10: "Train 10 episodes", train100: "Train 100 episodes", reset: "↻ Reset (forget all)",
      episodes: "Episodes", avg: "Avg reward (last 20)",
      chart: "Reward per episode (blue = trend average)",
      policy: "Learned policy (arrows = best action)",
      epsilon: "Exploration (ε)",
      epsLow: "small ε = follow what's learned", epsHigh: "large ε = try randomly a lot",
      note: "At first the agent moves randomly (low/negative reward). Through Q-learning updates, value propagates backward from the goal, and reward climbs until the agent finds the optimal path. This is 'learning from experience'.",
      start: "Start", goal: "Goal", trap: "Trap",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      <div className="flex flex-col gap-5 lg:flex-row">
        {/* grid + policy */}
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{L.policy}</p>
          <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${COLS}, 48px)` }}>
            {Array.from({ length: ROWS }).map((_, r) =>
              Array.from({ length: COLS }).map((__, c) => {
                const goal = isGoal(r, c), trap = isTrap(r, c), start = r === START.r && c === START.c;
                const pol = policy[key(r, c)];
                // tint by learned value
                const v = pol.v;
                const bg = goal ? "#dcfce7" : trap ? "#fee2e2" : v > 0.1 ? `rgba(0,147,208,${Math.min(0.5, v / 20)})` : "#f8fafc";
                return (
                  <div key={key(r, c)} className="flex h-12 w-12 items-center justify-center rounded border border-slate-200 text-lg" style={{ backgroundColor: bg }}>
                    {goal ? "🎯" : trap ? "💥" : start ? "🤖" : <span className="text-slate-400">{episodes > 0 ? ARROWS[pol.a] : "·"}</span>}
                  </div>
                );
              })
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-slate-500">
            <span>🤖 {L.start}</span><span>🎯 {L.goal} (+10)</span><span>💥 {L.trap} (−10)</span>
          </div>
        </div>

        {/* chart + stats */}
        <div className="flex-1">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{L.chart}</p>
          <canvas ref={chartRef} width={360} height={160} className="w-full rounded-lg border border-slate-300 bg-white" style={{ aspectRatio: "360/160" }} />
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-slate-50 p-2 text-center">
              <div className="text-[11px] text-slate-500">{L.episodes}</div>
              <div className="text-lg font-black text-slate-800">{episodes}</div>
            </div>
            <div className="rounded-lg bg-slate-50 p-2 text-center">
              <div className="text-[11px] text-slate-500">{L.avg}</div>
              <div className="text-lg font-black" style={{ color: avgRecent >= 0 ? "#16a34a" : "#dc2626" }}>{avgRecent.toFixed(1)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* epsilon */}
      <div className="mt-4">
        <div className="text-sm font-semibold text-slate-700">{L.epsilon}: <span className="text-brand-600">{epsilon.toFixed(2)}</span></div>
        <input type="range" min="0" max="1" step="0.05" value={epsilon} onChange={(e) => setEpsilon(+e.target.value)} className="mt-1 w-full accent-brand-600" />
        <div className="flex justify-between text-[10px] text-slate-400"><span>{L.epsLow}</span><span>{L.epsHigh}</span></div>
      </div>

      {/* controls */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => train(10)} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">{L.train10}</button>
        <button onClick={() => train(100)} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">{L.train100}</button>
        <button onClick={reset} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">{L.reset}</button>
      </div>

      <p className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
    </div>
  );
}
