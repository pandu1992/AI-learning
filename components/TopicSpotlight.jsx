"use client";

import { useMemo, useState } from "react";
import { useLang } from "./LanguageProvider";
import { getTopicSpotlight } from "@/lib/topicSpotlights";

// Per-topic "spotlight": a signature interactive mini-feature for each topic.
// Picks the right widget by the spotlight's `type`. Data lives in
// lib/topicSpotlights.js. Rendered by TopicView after the demos grid.
export default function TopicSpotlight({ slug }) {
  const { lang } = useLang();
  const spot = getTopicSpotlight(slug);
  if (!spot) return null;
  const d = spot[lang];
  if (!d) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-900">{spot.icon} {d.title}</h2>
      <p className="mt-1 text-sm text-slate-600">{d.sub}</p>
      <div className="mt-5">
        {spot.type === "isAi" && <IsAi d={d} />}
        {spot.type === "algoPicker" && <AlgoPicker d={d} />}
        {spot.type === "netBuilder" && <NetBuilder d={d} />}
        {spot.type === "rewardDesigner" && <RewardDesigner d={d} />}
        {spot.type === "tokenizer" && <Tokenizer d={d} />}
        {spot.type === "dilemma" && <Dilemma d={d} />}
      </div>
    </section>
  );
}

/* ---------------- AI Overview: Is this AI? ---------------- */
function IsAi({ d }) {
  const [answers, setAnswers] = useState({}); // idx -> boolean guess
  return (
    <div className="space-y-2">
      {d.items.map((item, i) => {
        const guess = answers[i];
        const answered = guess !== undefined;
        const correct = answered && guess === item.ai;
        return (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-800">{item.text}</p>
            <div className="mt-2 flex gap-2">
              {[true, false].map((val) => {
                const picked = guess === val;
                let cls = "border-slate-200 text-slate-600 hover:border-brand-300";
                if (answered) {
                  if (val === item.ai) cls = "border-green-400 bg-green-50 text-green-700";
                  else if (picked) cls = "border-red-400 bg-red-50 text-red-700";
                  else cls = "border-slate-200 text-slate-400";
                }
                return (
                  <button key={String(val)} onClick={() => !answered && setAnswers((a) => ({ ...a, [i]: val }))} disabled={answered}
                    className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${cls}`}>
                    {val ? d.yes : d.no}
                  </button>
                );
              })}
            </div>
            {answered && (
              <p className={`mt-2 text-xs ${correct ? "text-green-700" : "text-amber-700"}`}>
                {correct ? "✅ " : "💡 "}{item.why}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- ML: Which algorithm? ---------------- */
function AlgoPicker({ d }) {
  const [labeled, setLabeled] = useState(null); // true | false | null
  const [choice, setChoice] = useState(null);

  let resultKey = null;
  if (labeled === true && choice === "category") resultKey = "classification";
  else if (labeled === true && choice === "number") resultKey = "regression";
  else if (labeled === false && choice === "group") resultKey = "clustering";
  else if (labeled === false && choice === "reduce") resultKey = "dimred";
  const result = resultKey ? d.results[resultKey] : null;

  const Chip = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${active ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-600 hover:border-brand-300"}`}>{children}</button>
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-2 text-sm font-semibold text-slate-700">{d.q1}</p>
      <div className="flex flex-wrap gap-2">
        <Chip active={labeled === true} onClick={() => { setLabeled(true); setChoice(null); }}>{d.labeled}</Chip>
        <Chip active={labeled === false} onClick={() => { setLabeled(false); setChoice(null); }}>{d.unlabeled}</Chip>
      </div>

      {labeled !== null && (
        <>
          <p className="mb-2 mt-4 text-sm font-semibold text-slate-700">{labeled ? d.q2a : d.q2b}</p>
          <div className="flex flex-wrap gap-2">
            {labeled ? (
              <>
                <Chip active={choice === "category"} onClick={() => setChoice("category")}>{d.category}</Chip>
                <Chip active={choice === "number"} onClick={() => setChoice("number")}>{d.number}</Chip>
              </>
            ) : (
              <>
                <Chip active={choice === "group"} onClick={() => setChoice("group")}>{d.group}</Chip>
                <Chip active={choice === "reduce"} onClick={() => setChoice("reduce")}>{d.reduce}</Chip>
              </>
            )}
          </div>
        </>
      )}

      {result && (
        <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-4">
          <p className="text-xs font-semibold text-brand-500">{d.resultLbl}</p>
          <p className="mt-1 font-bold text-brand-800">{result.name}</p>
          <p className="mt-1 text-sm text-brand-700">{result.why}</p>
          <button onClick={() => { setLabeled(null); setChoice(null); }} className="mt-3 text-xs font-semibold text-slate-500 hover:underline">{d.restart}</button>
        </div>
      )}
    </div>
  );
}

/* ---------------- DL: Build-a-network ---------------- */
function NetBuilder({ d }) {
  const [inputs, setInputs] = useState(4);
  const [layers, setLayers] = useState(2);
  const [width, setWidth] = useState(8);
  const [outputs, setOutputs] = useState(3);

  // total params across input->hidden->...->output fully-connected net
  const params = useMemo(() => {
    const sizes = [inputs, ...Array(layers).fill(width), outputs];
    let total = 0;
    for (let i = 1; i < sizes.length; i++) total += sizes[i - 1] * sizes[i] + sizes[i]; // weights + biases
    return total;
  }, [inputs, layers, width, outputs]);

  const Slider = ({ label, value, set, min, max }) => (
    <label className="block">
      <span className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>{label}</span><span className="rounded bg-brand-50 px-1.5 py-0.5 font-mono text-brand-700">{value}</span>
      </span>
      <input type="range" min={min} max={max} value={value} onChange={(e) => set(Number(e.target.value))} className="w-full accent-brand-500" />
    </label>
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <Slider label={d.inputs} value={inputs} set={setInputs} min={1} max={16} />
        <Slider label={d.layers} value={layers} set={setLayers} min={1} max={6} />
        <Slider label={d.width} value={width} set={setWidth} min={2} max={64} />
        <Slider label={d.outputs} value={outputs} set={setOutputs} min={1} max={10} />
      </div>
      {/* mini layer viz */}
      <div className="mt-4 flex items-end justify-center gap-2">
        {[inputs, ...Array(layers).fill(width), outputs].map((n, i, arr) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            {Array.from({ length: Math.min(n, 10) }).map((_, j) => (
              <span key={j} className="h-2 w-2 rounded-full" style={{ background: i === 0 ? "#38bdf8" : i === arr.length - 1 ? "#34d399" : "#c4b5fd" }} />
            ))}
            {n > 10 && <span className="text-[9px] text-slate-400">+{n - 10}</span>}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50 p-4 text-center">
        <p className="text-xs font-semibold text-brand-500">{d.params}</p>
        <p className="text-3xl font-extrabold text-brand-800 tabular-nums">{params.toLocaleString()}</p>
      </div>
      <p className="mt-3 text-xs text-slate-500">{params > 2000 ? d.big : d.tiny} {d.note}</p>
    </div>
  );
}

/* ---------------- RL: Reward designer ---------------- */
function RewardDesigner({ d }) {
  const [goalR, setGoalR] = useState(10);
  const [stepR, setStepR] = useState(-1);
  const [crashR, setCrashR] = useState(-10);

  // derive the emergent behavior from the reward signs/magnitudes
  let key = "efficient";
  if (stepR > 0) key = "wander";
  else if (stepR < -3) key = "lazy";
  else if (crashR > -2) key = "reckless";
  const behavior = d.behaviors[key];

  const Slider = ({ label, value, set, min, max }) => (
    <label className="block">
      <span className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>{label}</span><span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-700">{value > 0 ? `+${value}` : value}</span>
      </span>
      <input type="range" min={min} max={max} value={value} onChange={(e) => set(Number(e.target.value))} className="w-full accent-brand-500" />
    </label>
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-4">
        <Slider label={d.goalR} value={goalR} set={setGoalR} min={0} max={20} />
        <Slider label={d.stepR} value={stepR} set={setStepR} min={-6} max={3} />
        <Slider label={d.crashR} value={crashR} set={setCrashR} min={-15} max={0} />
      </div>
      <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-4">
        <p className="text-xs font-semibold text-brand-500">{d.behaviorLbl}</p>
        <p className="mt-1 text-sm font-medium text-brand-800">{behavior}</p>
      </div>
      <p className="mt-3 text-xs text-slate-500">💡 {d.tip}</p>
    </div>
  );
}

/* ---------------- LLM: Tokenizer counter ---------------- */
function Tokenizer({ d }) {
  const [text, setText] = useState("");
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const tokens = Math.max(words ? Math.ceil(chars / 4) : 0, 0);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={d.ph} rows={4}
        className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-brand-400" />
      <div className="mt-3 grid grid-cols-3 gap-3 text-center">
        {[[d.chars, chars], [d.words, words], [d.tokens, tokens]].map(([label, val], i) => (
          <div key={i} className={`rounded-xl border p-3 ${i === 2 ? "border-brand-300 bg-brand-50" : "border-slate-200"}`}>
            <p className={`text-2xl font-extrabold tabular-nums ${i === 2 ? "text-brand-700" : "text-slate-900"}`}>{val}</p>
            <p className="text-xs font-semibold text-slate-500">{label}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-500">{text ? d.note : d.empty}</p>
    </div>
  );
}

/* ---------------- Ethics: Dilemma cards ---------------- */
function Dilemma({ d }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const item = d.items[idx];
  const answered = picked !== null;

  const nextCard = () => { setIdx((i) => (i + 1) % d.items.length); setPicked(null); };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-800">{item.scenario}</p>
      <div className="mt-3 space-y-2">
        {item.options.map((opt, oi) => {
          const isAnswer = oi === item.answer;
          let cls = "border-slate-200 text-slate-700 hover:border-brand-300";
          if (answered) {
            if (isAnswer) cls = "border-green-400 bg-green-50 text-green-800";
            else if (oi === picked) cls = "border-amber-400 bg-amber-50 text-amber-800";
            else cls = "border-slate-200 text-slate-400";
          }
          return (
            <button key={oi} onClick={() => !answered && setPicked(oi)} disabled={answered}
              className={`block w-full rounded-lg border px-3 py-2 text-left text-sm font-medium transition ${cls}`}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
          <p><span className="font-semibold">⚖️ {d.consider}: </span>{item.why}</p>
          <button onClick={nextCard} className="mt-3 text-xs font-semibold text-brand-600 hover:underline">{d.next}</button>
        </div>
      )}
    </div>
  );
}
