"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "../LanguageProvider";

const W = 420;
const H = 360;

// Two classes of points in 2D. The tree makes axis-aligned splits.
function seed() {
  const pts = [];
  // class 0 bottom-left cluster + top-right cluster (needs 2 splits)
  const blobs = [
    [90, 260, 0],
    [330, 90, 0],
    [110, 90, 1],
    [320, 270, 1],
  ];
  for (const [cx, cy, c] of blobs) {
    for (let i = 0; i < 10; i++) {
      pts.push({
        x: cx + (Math.random() - 0.5) * 90,
        y: cy + (Math.random() - 0.5) * 90,
        c,
      });
    }
  }
  return pts;
}

// Build a simple decision tree using Gini impurity, limited by maxDepth.
function gini(points) {
  if (points.length === 0) return 0;
  const p1 = points.filter((p) => p.c === 1).length / points.length;
  const p0 = 1 - p1;
  return 1 - p1 * p1 - p0 * p0;
}

function bestSplit(points) {
  let best = null;
  const axes = ["x", "y"];
  for (const axis of axes) {
    const vals = [...new Set(points.map((p) => p[axis]))].sort((a, b) => a - b);
    for (let i = 0; i < vals.length - 1; i++) {
      const thr = (vals[i] + vals[i + 1]) / 2;
      const left = points.filter((p) => p[axis] <= thr);
      const right = points.filter((p) => p[axis] > thr);
      if (left.length === 0 || right.length === 0) continue;
      const wGini =
        (left.length * gini(left) + right.length * gini(right)) / points.length;
      if (!best || wGini < best.gini) {
        best = { axis, thr, gini: wGini, left, right };
      }
    }
  }
  return best;
}

function buildTree(points, depth, maxDepth) {
  const majority =
    points.filter((p) => p.c === 1).length >= points.length / 2 ? 1 : 0;
  if (depth >= maxDepth || gini(points) === 0 || points.length < 2) {
    return { leaf: true, c: majority };
  }
  const split = bestSplit(points);
  if (!split) return { leaf: true, c: majority };
  return {
    leaf: false,
    axis: split.axis,
    thr: split.thr,
    left: buildTree(split.left, depth + 1, maxDepth),
    right: buildTree(split.right, depth + 1, maxDepth),
  };
}

function predict(tree, x, y) {
  let node = tree;
  while (!node.leaf) {
    const v = node.axis === "x" ? x : y;
    node = v <= node.thr ? node.left : node.right;
  }
  return node.c;
}

function countLeaves(tree) {
  if (tree.leaf) return 1;
  return countLeaves(tree.left) + countLeaves(tree.right);
}

export default function DecisionTreeDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const [points] = useState(seed);
  const [maxDepth, setMaxDepth] = useState(2);
  const [tree, setTree] = useState(null);

  useEffect(() => {
    setTree(buildTree(points, 0, maxDepth));
  }, [points, maxDepth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !tree) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);

    // decision regions
    const step = 6;
    for (let gx = 0; gx < W; gx += step) {
      for (let gy = 0; gy < H; gy += step) {
        const c = predict(tree, gx + step / 2, gy + step / 2);
        ctx.fillStyle = c === 1 ? "rgba(220,38,38,0.12)" : "rgba(37,99,235,0.12)";
        ctx.fillRect(gx, gy, step, step);
      }
    }
    // points
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = p.c === 1 ? "#dc2626" : "#2563eb";
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    }
  }, [tree, points]);

  const acc = tree
    ? points.filter((p) => predict(tree, p.x, p.y) === p.c).length / points.length
    : 0;

  const L = {
    id: {
      depth: "Kedalaman maksimum pohon",
      leaves: "Jumlah daun",
      acc: "Akurasi latih",
      hint: "Decision tree memecah ruang dengan garis lurus (sumbu x/y) berdasarkan pertanyaan ya/tidak. Naikkan kedalaman: batas makin rumit dan akurasi naik — tapi terlalu dalam berisiko overfitting.",
    },
    en: {
      depth: "Max tree depth",
      leaves: "Number of leaves",
      acc: "Training accuracy",
      hint: "A decision tree splits the space with straight (x/y-axis) lines based on yes/no questions. Increase depth: the boundary grows more complex and accuracy rises — but too deep risks overfitting.",
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
          className="w-full max-w-md rounded-xl border border-slate-300 bg-slate-50"
          style={{ aspectRatio: `${W}/${H}` }}
        />
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              {L.depth}: <span className="text-brand-600">{maxDepth}</span>
            </label>
            <input
              type="range"
              min="1"
              max="6"
              value={maxDepth}
              onChange={(e) => setMaxDepth(Number(e.target.value))}
              className="mt-1 w-full accent-brand-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-3 text-center text-sm">
            <div>
              <div className="text-slate-500">{L.leaves}</div>
              <div className="font-bold text-slate-800">{tree ? countLeaves(tree) : 0}</div>
            </div>
            <div>
              <div className="text-slate-500">{L.acc}</div>
              <div className={`font-bold ${acc >= 0.95 ? "text-green-600" : "text-slate-800"}`}>
                {Math.round(acc * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
