"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "../LanguageProvider";

// Grid layout: 5x5. S=start, G=goal(+reward), P=pit(-reward), #=wall
const ROWS = 5;
const COLS = 5;
const CELL = 68;
const W = COLS * CELL;
const H = ROWS * CELL;

// r,c
const START = [4, 0];
const GOAL = [0, 4];
const PITS = [
  [1, 1],
  [2, 3],
  [3, 1],
];
const WALLS = [[1, 3]];

const ACTIONS = [
  [-1, 0], // up
  [1, 0], // down
  [0, -1], // left
  [0, 1], // right
];
const ARROWS = ["↑", "↓", "←", "→"];

const isPit = (r, c) => PITS.some(([pr, pc]) => pr === r && pc === c);
const isWall = (r, c) => WALLS.some(([wr, wc]) => wr === r && wc === c);
const isGoal = (r, c) => GOAL[0] === r && GOAL[1] === c;
const isTerminal = (r, c) => isGoal(r, c) || isPit(r, c);

function newQ() {
  // Q[r][c][a]
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => [0, 0, 0, 0])
  );
}

function stepEnv(r, c, a) {
  const [dr, dc] = ACTIONS[a];
  let nr = r + dr;
  let nc = c + dc;
  // stay if out of bounds or wall
  if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || isWall(nr, nc)) {
    nr = r;
    nc = c;
  }
  let reward = -0.04; // small step cost
  let done = false;
  if (isGoal(nr, nc)) {
    reward = 1;
    done = true;
  } else if (isPit(nr, nc)) {
    reward = -1;
    done = true;
  }
  return { nr, nc, reward, done };
}

export default function GridWorldDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const qRef = useRef(newQ());
  const rafRef = useRef(null);
  const agentRef = useRef({ r: START[0], c: START[1] });

  const [running, setRunning] = useState(false);
  const [episode, setEpisode] = useState(0);
  const [epsilon, setEpsilon] = useState(0.3);
  const [alpha] = useState(0.5);
  const [gamma] = useState(0.9);
  const [showPolicy, setShowPolicy] = useState(true);
  const [lastReturn, setLastReturn] = useState(0);
  const [agent, setAgent] = useState({ r: START[0], c: START[1] });

  const bestAction = useCallback((r, c) => {
    const q = qRef.current[r][c];
    let best = 0;
    for (let a = 1; a < 4; a++) if (q[a] > q[best]) best = a;
    return best;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    const q = qRef.current;

    // find max abs value for coloring
    let maxV = 0.1;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        const v = Math.max(...q[r][c]);
        if (Math.abs(v) > maxV) maxV = Math.abs(v);
      }

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = c * CELL;
        const y = r * CELL;

        // base
        let fill = "#f8fafc";
        if (isWall(r, c)) fill = "#334155";
        else if (isGoal(r, c)) fill = "#bbf7d0";
        else if (isPit(r, c)) fill = "#fecaca";
        else {
          const v = Math.max(...q[r][c]);
          if (v > 0) {
            const t = Math.min(1, v / maxV);
            fill = `rgba(34,197,94,${0.12 + t * 0.5})`;
          } else if (v < 0) {
            const t = Math.min(1, Math.abs(v) / maxV);
            fill = `rgba(239,68,68,${0.12 + t * 0.4})`;
          }
        }
        ctx.fillStyle = fill;
        ctx.fillRect(x, y, CELL, CELL);
        ctx.strokeStyle = "#e2e8f0";
        ctx.strokeRect(x, y, CELL, CELL);

        // labels
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (isGoal(r, c)) {
          ctx.font = "26px serif";
          ctx.fillText("🏁", x + CELL / 2, y + CELL / 2);
        } else if (isPit(r, c)) {
          ctx.font = "26px serif";
          ctx.fillText("🕳️", x + CELL / 2, y + CELL / 2);
        } else if (!isWall(r, c) && showPolicy) {
          const a = bestAction(r, c);
          const anyLearned = q[r][c].some((v) => v !== 0);
          if (anyLearned) {
            ctx.fillStyle = "#334155";
            ctx.font = "22px sans-serif";
            ctx.fillText(ARROWS[a], x + CELL / 2, y + CELL / 2);
          }
        }
      }
    }

    // start marker
    ctx.fillStyle = "#64748b";
    ctx.font = "11px sans-serif";
    ctx.fillText("START", START[1] * CELL + CELL / 2, START[0] * CELL + CELL - 10);

    // agent
    const ar = agentRef.current;
    ctx.beginPath();
    ctx.arc(ar.c * CELL + CELL / 2, ar.r * CELL + CELL / 2, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#2563eb";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.font = "16px serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("🤖", ar.c * CELL + CELL / 2, ar.r * CELL + CELL / 2 + 1);
  }, [bestAction, showPolicy]);

  useEffect(() => {
    draw();
  }, [draw, agent]);

  // Run one full episode with Q-learning updates, animating the agent.
  const runEpisode = useCallback(() => {
    let r = START[0];
    let c = START[1];
    let totalR = 0;
    let steps = 0;
    const path = [];

    while (!isTerminal(r, c) && steps < 60) {
      let a;
      if (Math.random() < epsilon) {
        a = Math.floor(Math.random() * 4);
      } else {
        a = bestAction(r, c);
      }
      const { nr, nc, reward, done } = stepEnv(r, c, a);
      // Q-learning update
      const q = qRef.current;
      const maxNext = done ? 0 : Math.max(...q[nr][nc]);
      q[r][c][a] += alpha * (reward + gamma * maxNext - q[r][c][a]);
      totalR += reward;
      path.push([nr, nc]);
      r = nr;
      c = nc;
      steps++;
      if (done) break;
    }
    return { totalR, path };
  }, [epsilon, alpha, gamma, bestAction]);

  // Training loop: run episodes, animate the last path lightly.
  useEffect(() => {
    if (!running) return;
    let ep = episode;

    const loop = () => {
      // run a batch of episodes for speed, animate the final one
      let lastPath = [];
      let lastR = 0;
      for (let i = 0; i < 5; i++) {
        const { totalR, path } = runEpisode();
        lastPath = path;
        lastR = totalR;
        ep++;
      }
      setEpisode(ep);
      setLastReturn(lastR);

      // animate agent along last path
      let idx = 0;
      agentRef.current = { r: START[0], c: START[1] };
      const animate = () => {
        if (idx < lastPath.length) {
          agentRef.current = { r: lastPath[idx][0], c: lastPath[idx][1] };
          setAgent({ ...agentRef.current });
          idx++;
          rafRef.current = requestAnimationFrame(() => setTimeout(animate, 40));
        } else {
          draw();
          if (ep < 400) {
            rafRef.current = requestAnimationFrame(loop);
          } else {
            setRunning(false);
          }
        }
      };
      animate();
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const reset = () => {
    setRunning(false);
    qRef.current = newQ();
    agentRef.current = { r: START[0], c: START[1] };
    setAgent({ r: START[0], c: START[1] });
    setEpisode(0);
    setLastReturn(0);
    draw();
  };

  const L = {
    id: {
      train: "Latih Agen",
      pause: "Jeda",
      reset: "Reset",
      episode: "Episode",
      ret: "Reward terakhir",
      eps: "Eksplorasi (ε)",
      policy: "Tampilkan kebijakan (panah)",
      hint: "Agen 🤖 belajar mencapai 🏁 (reward +1) dan menghindari 🕳️ (reward −1) lewat Q-learning. Warna hijau = nilai tinggi (bagus), merah = buruk. Panah = aksi terbaik yang dipelajari. Kotak abu-abu = tembok.",
    },
    en: {
      train: "Train Agent",
      pause: "Pause",
      reset: "Reset",
      episode: "Episode",
      ret: "Last reward",
      eps: "Exploration (ε)",
      policy: "Show policy (arrows)",
      hint: "The agent 🤖 learns to reach 🏁 (reward +1) and avoid 🕳️ (reward −1) via Q-learning. Green = high value (good), red = bad. Arrows = the best learned action. Gray cell = wall.",
    },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>

      <div className="flex flex-col gap-4 lg:flex-row">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="rounded-xl border border-slate-300 bg-slate-50"
          style={{ width: "100%", maxWidth: W, aspectRatio: `${W}/${H}` }}
        />

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-3 text-center text-sm">
            <div>
              <div className="text-slate-500">{L.episode}</div>
              <div className="font-bold text-slate-800">{episode}</div>
            </div>
            <div>
              <div className="text-slate-500">{L.ret}</div>
              <div className={`font-bold ${lastReturn > 0 ? "text-green-600" : "text-slate-800"}`}>
                {lastReturn.toFixed(2)}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              {L.eps}: <span className="text-brand-600">{epsilon.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={epsilon}
              onChange={(e) => setEpsilon(Number(e.target.value))}
              className="mt-1 w-full accent-brand-600"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={showPolicy}
              onChange={(e) => {
                setShowPolicy(e.target.checked);
              }}
              className="accent-brand-600"
            />
            {L.policy}
          </label>

          <div className="flex gap-2">
            <button
              onClick={() => setRunning((r) => !r)}
              className="flex-1 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {running ? L.pause : L.train}
            </button>
            <button
              onClick={reset}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {L.reset}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
