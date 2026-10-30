// Lightweight, from-scratch 2D classifiers used by the /compare page to draw
// decision boundaries side by side on the SAME dataset. Pure JS, deterministic,
// no ML libraries — just enough to visualize how different algorithms carve up
// the feature space differently. Each classifier exposes:
//   fit(points) -> model ; predict(model, x, y) -> 0 | 1
// Points are { x, y, c } with c in {0,1}, coordinates in [0,1].

// ---- deterministic RNG + dataset generators ----
function rng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// Three toy datasets with increasingly non-linear structure.
export const DATASETS = {
  blobs: { id: { name: "Dua gumpalan (linear)" }, en: { name: "Two blobs (linear)" } },
  moons: { id: { name: "Dua bulan sabit (non-linear)" }, en: { name: "Two moons (non-linear)" } },
  circles: { id: { name: "Lingkaran bersarang" }, en: { name: "Nested circles" } },
};

export function makeDataset(kind, n = 80, seed = 42) {
  const r = rng(seed);
  const pts = [];
  if (kind === "blobs") {
    for (let i = 0; i < n; i++) {
      const c = i < n / 2 ? 0 : 1;
      const cx = c === 0 ? 0.33 : 0.67;
      const cy = c === 0 ? 0.4 : 0.6;
      pts.push({ x: clamp(cx + (r() - 0.5) * 0.28), y: clamp(cy + (r() - 0.5) * 0.28), c });
    }
  } else if (kind === "moons") {
    for (let i = 0; i < n; i++) {
      const c = i < n / 2 ? 0 : 1;
      const t = r() * Math.PI;
      if (c === 0) pts.push({ x: clamp(0.35 + 0.3 * Math.cos(t) + (r() - 0.5) * 0.08), y: clamp(0.4 + 0.3 * Math.sin(t) + (r() - 0.5) * 0.08), c });
      else pts.push({ x: clamp(0.65 - 0.3 * Math.cos(t) + (r() - 0.5) * 0.08), y: clamp(0.6 - 0.3 * Math.sin(t) + (r() - 0.5) * 0.08), c });
    }
  } else {
    // circles
    for (let i = 0; i < n; i++) {
      const c = i < n / 2 ? 0 : 1;
      const rad = c === 0 ? 0.12 : 0.34;
      const t = r() * Math.PI * 2;
      pts.push({ x: clamp(0.5 + rad * Math.cos(t) + (r() - 0.5) * 0.06), y: clamp(0.5 + rad * Math.sin(t) + (r() - 0.5) * 0.06), c });
    }
  }
  return pts;
}

const clamp = (v) => Math.max(0.02, Math.min(0.98, v));

// ---- classifiers ----

// k-NN: non-parametric, flexible curvy boundaries.
export const knn = {
  key: "knn",
  id: { name: "k-NN", note: "Batas melengkung mengikuti data; fleksibel tapi bisa berisik." },
  en: { name: "k-NN", note: "Curvy boundary that hugs the data; flexible but can be noisy." },
  fit: (pts) => ({ pts }),
  predict: (m, x, y, k = 5) => {
    const near = [...m.pts].sort((a, b) => ((a.x - x) ** 2 + (a.y - y) ** 2) - ((b.x - x) ** 2 + (b.y - y) ** 2)).slice(0, k);
    const s = near.reduce((acc, p) => acc + (p.c === 1 ? 1 : -1), 0);
    return s >= 0 ? 1 : 0;
  },
};

// Linear classifier (logistic-regression-like): a single straight boundary via
// a simple least-squares separating direction between class means.
export const linear = {
  key: "linear",
  id: { name: "Linear (Logistic/SVM linear)", note: "Satu garis lurus; cepat & stabil, gagal pada pola non-linear." },
  en: { name: "Linear (Logistic/linear SVM)", note: "One straight line; fast & stable, fails on non-linear patterns." },
  fit: (pts) => {
    const m0 = mean(pts.filter((p) => p.c === 0));
    const m1 = mean(pts.filter((p) => p.c === 1));
    const w = { x: m1.x - m0.x, y: m1.y - m0.y };
    const mid = { x: (m0.x + m1.x) / 2, y: (m0.y + m1.y) / 2 };
    const b = -(w.x * mid.x + w.y * mid.y);
    return { w, b };
  },
  predict: (m, x, y) => (m.w.x * x + m.w.y * y + m.b >= 0 ? 1 : 0),
};

// Decision tree (axis-aligned, greedy, depth-limited): produces stair-step boxes.
export const tree = {
  key: "tree",
  id: { name: "Decision Tree", note: "Kotak bertingkat (sejajar sumbu); mudah dijelaskan, batasnya 'bertangga'." },
  en: { name: "Decision Tree", note: "Stair-step boxes (axis-aligned); easy to explain, 'staircase' boundary." },
  fit: (pts) => ({ root: buildTree(pts, 0, 4) }),
  predict: (m, x, y) => predictTree(m.root, x, y),
};

// Random-forest-ish: average several shallow trees on bootstrap samples -> smoother.
export const forest = {
  key: "forest",
  id: { name: "Random Forest", note: "Rata-rata banyak pohon; batas lebih halus & stabil daripada satu pohon." },
  en: { name: "Random Forest", note: "Average of many trees; smoother & more stable than a single tree." },
  fit: (pts) => {
    const trees = [];
    for (let t = 0; t < 12; t++) {
      const r = rng(100 + t * 7);
      const sample = Array.from({ length: pts.length }, () => pts[Math.floor(r() * pts.length)]);
      trees.push(buildTree(sample, 0, 4));
    }
    return { trees };
  },
  predict: (m, x, y) => {
    const s = m.trees.reduce((acc, t) => acc + predictTree(t, x, y), 0);
    return s >= m.trees.length / 2 ? 1 : 0;
  },
};

export const CLASSIFIERS = { knn, linear, tree, forest };

// ---- helpers ----
function mean(pts) {
  if (!pts.length) return { x: 0.5, y: 0.5 };
  return { x: pts.reduce((a, p) => a + p.x, 0) / pts.length, y: pts.reduce((a, p) => a + p.y, 0) / pts.length };
}

function gini(pts) {
  if (!pts.length) return 0;
  const p1 = pts.filter((p) => p.c === 1).length / pts.length;
  return 1 - p1 * p1 - (1 - p1) * (1 - p1);
}

function majority(pts) {
  const ones = pts.filter((p) => p.c === 1).length;
  return ones >= pts.length - ones ? 1 : 0;
}

function buildTree(pts, depth, maxDepth) {
  if (depth >= maxDepth || pts.length < 4 || gini(pts) < 0.05) return { leaf: majority(pts) };
  let best = null;
  for (const axis of ["x", "y"]) {
    const vals = [...new Set(pts.map((p) => p[axis]))].sort((a, b) => a - b);
    for (let i = 1; i < vals.length; i++) {
      const thr = (vals[i - 1] + vals[i]) / 2;
      const left = pts.filter((p) => p[axis] < thr);
      const right = pts.filter((p) => p[axis] >= thr);
      if (!left.length || !right.length) continue;
      const g = (left.length * gini(left) + right.length * gini(right)) / pts.length;
      if (!best || g < best.g) best = { axis, thr, g, left, right };
    }
  }
  if (!best) return { leaf: majority(pts) };
  return { axis: best.axis, thr: best.thr, left: buildTree(best.left, depth + 1, maxDepth), right: buildTree(best.right, depth + 1, maxDepth) };
}

function predictTree(node, x, y) {
  if (node.leaf !== undefined) return node.leaf;
  const v = node.axis === "x" ? x : y;
  return predictTree(v < node.thr ? node.left : node.right, x, y);
}

// Training accuracy (for the little stat under each panel).
export function accuracy(clf, model, pts) {
  const correct = pts.reduce((a, p) => a + (clf.predict(model, p.x, p.y) === p.c ? 1 : 0), 0);
  return correct / pts.length;
}
