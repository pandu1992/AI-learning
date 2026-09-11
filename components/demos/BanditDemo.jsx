"use client";

import { useState, useRef, useCallback } from "react";
import { useLang } from "../LanguageProvider";

// Multi-armed bandit: several slot machines with hidden win probabilities.
// The agent uses epsilon-greedy to balance exploring vs exploiting.
const TRUE_PROBS = [0.25, 0.5, 0.75, 0.4]; // hidden

export default function BanditDemo() {
  const { lang } = useLang();
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [wins, setWins] = useState([0, 0, 0, 0]);
  const [epsilon, setEpsilon] = useState(0.1);
  const [totalReward, setTotalReward] = useState(0);
  const [pulls, setPulls] = useState(0);
  const [lastArm, setLastArm] = useState(null);
  const timer = useRef(null);
  const [running, setRunning] = useState(false);

  const estimates = counts.map((c, i) => (c === 0 ? 0 : wins[i] / c));

  const pull = useCallback(
    (forcedArm = null) => {
      setCounts((prevCounts) => {
        setWins((prevWins) => {
          const est = prevCounts.map((c, i) => (c === 0 ? 0 : prevWins[i] / c));
          let arm = forcedArm;
          if (arm === null) {
            if (Math.random() < epsilon) {
              arm = Math.floor(Math.random() * TRUE_PROBS.length);
            } else {
              arm = est.indexOf(Math.max(...est));
            }
          }
          const reward = Math.random() < TRUE_PROBS[arm] ? 1 : 0;
          setLastArm(arm);
          setTotalReward((r) => r + reward);
          setPulls((p) => p + 1);
          const newWins = [...prevWins];
          newWins[arm] += reward;
          // schedule counts update
          queueMicrotask(() => {
            setCounts((c) => {
              const nc = [...c];
              nc[arm] += 1;
              return nc;
            });
          });
          return newWins;
        });
        return prevCounts;
      });
    },
    [epsilon]
  );

  const auto = () => {
    if (running) {
      clearInterval(timer.current);
      setRunning(false);
    } else {
      setRunning(true);
      timer.current = setInterval(() => pull(), 120);
    }
  };

  const reset = () => {
    clearInterval(timer.current);
    setRunning(false);
    setCounts([0, 0, 0, 0]);
    setWins([0, 0, 0, 0]);
    setTotalReward(0);
    setPulls(0);
    setLastArm(null);
  };

  const L = {
    id: { pull: "Tarik sekali", auto: running ? "Berhenti" : "Otomatis", reset: "Reset", eps: "Eksplorasi (ε)", total: "Total reward", avg: "Rata-rata", est: "Estimasi menang", tries: "ditarik",
      hint: "Ada 4 mesin slot dengan peluang menang tersembunyi. Agen harus menyeimbangkan eksplorasi (coba mesin lain) dan eksploitasi (pakai yang sejauh ini terbaik). Dengan ε lebih besar, agen lebih sering bereksplorasi. Jalankan otomatis dan lihat estimasi menyatu ke mesin terbaik." },
    en: { pull: "Pull once", auto: running ? "Stop" : "Auto", reset: "Reset", eps: "Exploration (ε)", total: "Total reward", avg: "Average", est: "Win estimate", tries: "pulls",
      hint: "There are 4 slot machines with hidden win probabilities. The agent must balance exploration (try other machines) and exploitation (use the best so far). A larger ε explores more. Run auto and watch the estimates converge on the best machine." },
  }[lang];

  const bestEst = Math.max(...estimates);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TRUE_PROBS.map((_, i) => (
          <div key={i} className={`rounded-xl border p-3 text-center transition ${lastArm === i ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-slate-50"}`}>
            <div className="text-3xl">🎰</div>
            <button onClick={() => pull(i)} className="mt-2 w-full rounded bg-brand-600 px-2 py-1 text-xs font-semibold text-white hover:bg-brand-700">
              #{i + 1}
            </button>
            <div className={`mt-2 text-lg font-bold ${estimates[i] === bestEst && counts[i] > 0 ? "text-green-600" : "text-slate-700"}`}>
              {counts[i] === 0 ? "—" : `${Math.round(estimates[i] * 100)}%`}
            </div>
            <div className="text-[11px] text-slate-400">{counts[i]} {L.tries}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-slate-700">{L.eps}: <span className="text-brand-600">{epsilon.toFixed(2)}</span></label>
          <input type="range" min="0" max="1" step="0.05" value={epsilon} onChange={(e) => setEpsilon(Number(e.target.value))} className="mt-1 w-full accent-brand-600" />
        </div>
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-3 text-center text-sm">
          <div><div className="text-slate-500">{L.total}</div><div className="font-bold text-slate-800">{totalReward}</div></div>
          <div><div className="text-slate-500">{L.avg}</div><div className="font-bold text-slate-800">{pulls ? (totalReward / pulls).toFixed(2) : "0.00"}</div></div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => pull()} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">{L.pull}</button>
          <button onClick={auto} className="rounded-lg border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">{L.auto}</button>
          <button onClick={reset} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">{L.reset}</button>
        </div>
      </div>
    </div>
  );
}
