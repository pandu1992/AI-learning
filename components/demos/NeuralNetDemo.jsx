"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "../LanguageProvider";

const W = 360;
const H = 360;
const GRID = 6;

const sigmoid = (z) => 1 / (1 + Math.exp(-z));

// ---- Datasets (points in [-1,1] x [-1,1]) ----
function makeDataset(kind) {
  const pts = [];
  const n = 120;
  for (let i = 0; i < n; i++) {
    let x, y, label;
    if (kind === "circle") {
      const r = Math.random();
      const a = Math.random() * Math.PI * 2;
      const rad = r * 1.1;
      x = Math.cos(a) * rad;
      y = Math.sin(a) * rad;
      label = rad < 0.6 ? 1 : 0;
    } else if (kind === "xor") {
      x = (Math.random() * 2 - 1) * 0.95;
      y = (Math.random() * 2 - 1) * 0.95;
      label = x * y > 0 ? 1 : 0;
    } else {
      // linear
      x = (Math.random() * 2 - 1) * 0.95;
      y = (Math.random() * 2 - 1) * 0.95;
      label = x + y > 0 ? 1 : 0;
    }
    // add slight noise on the boundary
    pts.push({ x, y, label });
  }
  return pts;
}

// ---- Tiny 2 -> Hn -> 1 neural net with backprop ----
function initNet(hidden) {
  const rnd = () => Math.random() * 2 - 1;
  return {
    hidden,
    // W1: hidden x 2, b1: hidden
    W1: Array.from({ length: hidden }, () => [rnd(), rnd()]),
    b1: Array.from({ length: hidden }, () => rnd()),
    // W2: hidden, b2: scalar
    W2: Array.from({ length: hidden }, () => rnd()),
    b2: rnd(),
  };
}

function forward(net, x, y) {
  const h = new Array(net.hidden);
  const hRaw = new Array(net.hidden);
  for (let i = 0; i < net.hidden; i++) {
    const z = net.W1[i][0] * x + net.W1[i][1] * y + net.b1[i];
    hRaw[i] = z;
    h[i] = Math.tanh(z);
  }
  let out = net.b2;
  for (let i = 0; i < net.hidden; i++) out += net.W2[i] * h[i];
  const p = sigmoid(out);
  return { h, hRaw, p };
}

function trainStep(net, data, lr) {
  // one epoch of SGD
  for (const pt of data) {
    const { h, p } = forward(net, pt.x, pt.y);
    const dOut = p - pt.label; // dL/dz2 for sigmoid + cross-entropy
    // output layer grads
    const gW2 = new Array(net.hidden);
    for (let i = 0; i < net.hidden; i++) gW2[i] = dOut * h[i];
    const gb2 = dOut;
    // hidden layer grads
    const gW1 = Array.from({ length: net.hidden }, () => [0, 0]);
    const gb1 = new Array(net.hidden);
    for (let i = 0; i < net.hidden; i++) {
      const dH = dOut * net.W2[i] * (1 - h[i] * h[i]); // tanh'
      gW1[i][0] = dH * pt.x;
      gW1[i][1] = dH * pt.y;
      gb1[i] = dH;
    }
    // apply
    for (let i = 0; i < net.hidden; i++) {
      net.W2[i] -= lr * gW2[i];
      net.W1[i][0] -= lr * gW1[i][0];
      net.W1[i][1] -= lr * gW1[i][1];
      net.b1[i] -= lr * gb1[i];
    }
    net.b2 -= lr * gb2;
  }
}

function computeLoss(net, data) {
  let loss = 0;
  let correct = 0;
  for (const pt of data) {
    const { p } = forward(net, pt.x, pt.y);
    const eps = 1e-7;
    loss += -(pt.label * Math.log(p + eps) + (1 - pt.label) * Math.log(1 - p + eps));
    if ((p >= 0.5 ? 1 : 0) === pt.label) correct++;
  }
  return { loss: loss / data.length, acc: correct / data.length };
}

export default function NeuralNetDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const netRef = useRef(null);
  const rafRef = useRef(null);

  const [dataset, setDataset] = useState("circle");
  const [hidden, setHidden] = useState(4);
  const [lr, setLr] = useState(0.1);
  const [data, setData] = useState(() => makeDataset("circle"));
  const [running, setRunning] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [metrics, setMetrics] = useState({ loss: 0, acc: 0 });

  const rebuild = useCallback(
    (ds = dataset, h = hidden) => {
      const d = makeDataset(ds);
      setData(d);
      netRef.current = initNet(h);
      setEpoch(0);
      setMetrics(computeLoss(netRef.current, d));
    },
    [dataset, hidden]
  );

  // init net once
  useEffect(() => {
    if (!netRef.current) {
      netRef.current = initNet(hidden);
      setMetrics(computeLoss(netRef.current, data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !netRef.current) return;
    const ctx = canvas.getContext("2d");
    const net = netRef.current;

    // decision surface
    for (let gx = 0; gx < W; gx += GRID) {
      for (let gy = 0; gy < H; gy += GRID) {
        const dx = ((gx + GRID / 2) / W) * 2 - 1;
        const dy = 1 - ((gy + GRID / 2) / H) * 2;
        const { p } = forward(net, dx, dy);
        // blue (class1) to orange (class0)
        const r = Math.round(37 + (234 - 37) * (1 - p));
        const g = Math.round(99 + (88 - 99) * (1 - p));
        const b = Math.round(235 + (12 - 235) * (1 - p));
        ctx.fillStyle = `rgba(${r},${g},${b},0.35)`;
        ctx.fillRect(gx, gy, GRID, GRID);
      }
    }

    // points
    for (const pt of data) {
      const px = ((pt.x + 1) / 2) * W;
      const py = ((1 - pt.y) / 2) * H;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = pt.label === 1 ? "#2563eb" : "#ea580c";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    }
  }, [data]);

  useEffect(() => {
    draw();
  }, [draw]);

  // training loop
  useEffect(() => {
    if (!running) return;
    let localEpoch = epoch;
    const loop = () => {
      for (let i = 0; i < 3; i++) {
        trainStep(netRef.current, data, lr);
        localEpoch++;
      }
      const m = computeLoss(netRef.current, data);
      setMetrics(m);
      setEpoch(localEpoch);
      draw();
      if (m.acc >= 0.99 || localEpoch > 3000) {
        setRunning(false);
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const L = {
    id: {
      dataset: "Dataset",
      circle: "Lingkaran",
      xor: "XOR",
      linear: "Linear",
      hidden: "Neuron tersembunyi",
      lr: "Learning rate",
      train: "Latih",
      pause: "Jeda",
      reset: "Reset",
      epoch: "Epoch",
      loss: "Loss",
      acc: "Akurasi",
      hint: "Jaringan saraf kecil (2 → tersembunyi → 1) berlatih langsung di browser. Amati batas keputusan berubah saat model belajar. Coba dataset XOR dengan 1 neuron — sengaja sulit! — lalu naikkan jumlah neuron.",
    },
    en: {
      dataset: "Dataset",
      circle: "Circle",
      xor: "XOR",
      linear: "Linear",
      hidden: "Hidden neurons",
      lr: "Learning rate",
      train: "Train",
      pause: "Pause",
      reset: "Reset",
      epoch: "Epoch",
      loss: "Loss",
      acc: "Accuracy",
      hint: "A tiny neural network (2 → hidden → 1) trains right in your browser. Watch the decision boundary change as it learns. Try the XOR dataset with 1 neuron — intentionally hard! — then increase the neuron count.",
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
          className="w-full max-w-sm rounded-xl border border-slate-300 bg-slate-50"
          style={{ aspectRatio: "1/1" }}
        />

        <div className="flex-1 space-y-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">{L.dataset}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                ["circle", L.circle],
                ["xor", L.xor],
                ["linear", L.linear],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setRunning(false);
                    setDataset(key);
                    rebuild(key, hidden);
                  }}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    dataset === key
                      ? "border-transparent bg-brand-600 text-white"
                      : "border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              {L.hidden}: <span className="text-brand-600">{hidden}</span>
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={hidden}
              onChange={(e) => {
                const h = Number(e.target.value);
                setRunning(false);
                setHidden(h);
                rebuild(dataset, h);
              }}
              className="mt-1 w-full accent-brand-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              {L.lr}: <span className="text-brand-600">{lr.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={lr}
              onChange={(e) => setLr(Number(e.target.value))}
              className="mt-1 w-full accent-brand-600"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-50 p-3 text-center text-sm">
            <div>
              <div className="text-slate-500">{L.epoch}</div>
              <div className="font-bold text-slate-800">{epoch}</div>
            </div>
            <div>
              <div className="text-slate-500">{L.loss}</div>
              <div className="font-bold text-slate-800">{metrics.loss.toFixed(3)}</div>
            </div>
            <div>
              <div className="text-slate-500">{L.acc}</div>
              <div className={`font-bold ${metrics.acc >= 0.9 ? "text-green-600" : "text-slate-800"}`}>
                {Math.round(metrics.acc * 100)}%
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setRunning((r) => !r)}
              className="flex-1 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {running ? L.pause : L.train}
            </button>
            <button
              onClick={() => {
                setRunning(false);
                rebuild(dataset, hidden);
              }}
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
