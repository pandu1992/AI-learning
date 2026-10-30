// Parametrized ModelViz scenes: like modelScenes.js, but draw() reads a `params`
// object (controlled by sliders in the ModelViz "Parameter Sandbox"). This lets
// students FEEL how a hyperparameter changes model behavior — e.g. a larger k in
// k-NN smooths the vote, a deeper tree carves more regions, a bigger learning
// rate overshoots. Pure canvas 2D, original, deterministic (seeded).
//
// Scene shape: { period?, staticT?, caption?:{id,en}, draw(ctx,t,W,H,lang,params) }
// The matching slider definitions live in lib/vizParams.js (keyed by the same slug).

const BLUE = "#38bdf8";
const RED = "#f87171";
const GREEN = "#34d399";
const GOLD = "#fbbf24";
const VIOLET = "#c4b5fd";

function rng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const lerp = (a, b, t) => a + (b - a) * t;
const ping = (t) => 1 - Math.abs(1 - 2 * t);

function dot(ctx, x, y, r, fill, stroke = "#0b1220") {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = stroke;
  ctx.stroke();
}
function label(ctx, text, x, y, color = "#e2e8f0", size = 12, align = "left") {
  ctx.fillStyle = color;
  ctx.font = `600 ${size}px ui-sans-serif, system-ui, sans-serif`;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
  ctx.textAlign = "left";
}

export const paramScenes = {
  // ===================== k-NN (slider: k) =====================
  "supervised-knn": {
    period: 6000,
    caption: {
      id: "Geser k: titik kuning mengikuti suara terbanyak dari k tetangga terdekat.",
      en: "Drag k: the gold point follows the majority vote of its k nearest neighbors.",
    },
    draw(ctx, t, W, H, lang, params = {}) {
      const k = Math.max(1, Math.round(params.k ?? 3));
      const r = rng(7);
      const pts = Array.from({ length: 18 }, () => ({
        x: 60 + r() * (W - 120),
        y: 50 + r() * (H - 90),
        c: r() > 0.5 ? 0 : 1,
      }));
      const qx = lerp(120, W - 120, easeInOut(ping(t)));
      const qy = H / 2 + Math.sin(t * Math.PI * 2) * 40;
      const near = [...pts]
        .sort((a, b) => ((a.x - qx) ** 2 + (a.y - qy) ** 2) - ((b.x - qx) ** 2 + (b.y - qy) ** 2))
        .slice(0, k);
      // links to the k nearest
      near.forEach((n) => {
        ctx.strokeStyle = "rgba(251,191,36,0.75)";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(qx, qy); ctx.lineTo(n.x, n.y); ctx.stroke();
        ctx.setLineDash([]);
      });
      for (const p of pts) dot(ctx, p.x, p.y, 6, p.c === 0 ? BLUE : RED);
      const votes = near.reduce((s, n) => s + (n.c === 1 ? 1 : -1), 0);
      const winner = votes === 0 ? GOLD : votes > 0 ? RED : BLUE;
      dot(ctx, qx, qy, 9, GOLD, "#1e293b");
      label(ctx, `k = ${k}`, 16, 26, GOLD, 15);
      label(ctx, votes === 0 ? "seri" : "→ ●", qx + 14, qy - 10, winner, 15);
    },
  },

  // ===================== k-Means (slider: k clusters) =====================
  "unsupervised-kmeans": {
    period: 7000,
    caption: {
      id: "Geser k: jumlah centroid berubah; tiap titik ikut centroid terdekat.",
      en: "Drag k: the number of centroids changes; each point joins its nearest.",
    },
    draw(ctx, t, W, H, lang, params = {}) {
      const k = Math.max(1, Math.min(5, Math.round(params.k ?? 3)));
      const r = rng(21);
      // 3 true blobs of data (fixed)
      const blobs = [[140, 90], [330, 110], [230, 230]];
      const pts = [];
      for (const [bx, by] of blobs) for (let i = 0; i < 12; i++) pts.push({ x: bx + (r() - 0.5) * 90, y: by + (r() - 0.5) * 90 });
      const palette = [BLUE, RED, GREEN, GOLD, VIOLET];
      // k centroids spread across the canvas, gently animating toward data mass
      const cs = Array.from({ length: k }, (_, i) => {
        const ang = (i / k) * Math.PI * 2 + t * 0.6;
        return {
          x: W / 2 + Math.cos(ang) * (90 - 20 * easeInOut(Math.min(1, t * 1.2))),
          y: H / 2 + Math.sin(ang) * (70 - 15 * easeInOut(Math.min(1, t * 1.2))),
          c: palette[i % palette.length],
        };
      });
      for (const p of pts) {
        let best = 0, bd = Infinity;
        cs.forEach((c, i) => { const d = (c.x - p.x) ** 2 + (c.y - p.y) ** 2; if (d < bd) { bd = d; best = i; } });
        dot(ctx, p.x, p.y, 5, cs[best].c);
      }
      cs.forEach((c) => {
        ctx.beginPath(); ctx.arc(c.x, c.y, 11, 0, Math.PI * 2);
        ctx.fillStyle = c.c; ctx.globalAlpha = 0.9; ctx.fill(); ctx.globalAlpha = 1;
        ctx.lineWidth = 3; ctx.strokeStyle = "#fff"; ctx.stroke();
        label(ctx, "✦", c.x, c.y + 5, "#0b1220", 14, "center");
      });
      label(ctx, `k = ${k}`, 16, 26, GOLD, 15);
      if (k !== 3) label(ctx, lang === "id" ? "(data sebenarnya 3 blob)" : "(true data has 3 blobs)", 16, H - 14, "#94a3b8", 11);
    },
  },

  // ===================== Gradient Descent (slider: learning rate) =====================
  "gradient-descent": {
    period: 5200,
    caption: {
      id: "Geser learning rate: terlalu besar melompati minimum, terlalu kecil lambat.",
      en: "Drag the learning rate: too big overshoots the minimum, too small is slow.",
    },
    draw(ctx, t, W, H, lang, params = {}) {
      const lr = params.lr ?? 0.3; // 0.02 .. 1.1
      const cx = W / 2, baseY = H - 40, A = 120, scaleX = 170;
      const yOf = (x) => baseY - A + A * (((x - cx) / scaleX) ** 2);
      // loss curve
      ctx.strokeStyle = VIOLET; ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 40; x <= W - 40; x += 3) { const y = yOf(x); if (x === 40) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
      ctx.stroke();

      // simulate gradient-descent iterates in "parameter" space (u = x-cx)
      // loss(u) = u^2 (scaled); gradient = 2u; update u -= lr * 2u  => u *= (1 - 2*lr)
      const u0 = 150;
      const iters = [u0];
      let u = u0;
      for (let i = 0; i < 40; i++) { u = u * (1 - 2 * lr); iters.push(u); }
      const diverges = Math.abs(1 - 2 * lr) > 1;

      // reveal iterates progressively over the loop
      const shown = Math.max(1, Math.floor(easeInOut(Math.min(1, t)) * 18));
      ctx.fillStyle = "rgba(56,189,248,0.55)";
      for (let i = 0; i < Math.min(shown, iters.length); i++) {
        const x = cx + Math.max(-160, Math.min(160, iters[i]));
        const y = yOf(x);
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
      }
      const i = Math.min(shown, iters.length - 1);
      const bx = cx + Math.max(-160, Math.min(160, iters[i]));
      dot(ctx, bx, yOf(bx), 10, diverges ? RED : GOLD, "#1e293b");
      label(ctx, "min", cx, baseY - A - 10, GREEN, 12, "center");
      label(ctx, `lr = ${lr.toFixed(2)}`, 16, 26, GOLD, 15);
      if (diverges) label(ctx, lang === "id" ? "⚠ divergen (lr terlalu besar)" : "⚠ diverging (lr too big)", 16, 46, RED, 12);
      else if (lr < 0.08) label(ctx, lang === "id" ? "konvergen lambat" : "slow convergence", 16, 46, "#94a3b8", 12);
    },
  },

  // ===================== Decision Tree (slider: max depth) =====================
  "decision-tree": {
    period: 6000,
    caption: {
      id: "Geser max_depth: makin dalam, makin banyak kotak keputusan (risiko overfit).",
      en: "Drag max_depth: deeper means more decision boxes (overfitting risk).",
    },
    draw(ctx, t, W, H, lang, params = {}) {
      const depth = Math.max(1, Math.min(4, Math.round(params.maxDepth ?? 2)));
      const r = rng(13);
      const x0 = 50, y0 = 40, x1 = W - 50, y1 = H - 40;
      // scatter: label determined by a smooth-ish non-linear rule (so deeper tree = more boxes)
      const truth = (px, py) => {
        const nx = (px - x0) / (x1 - x0), ny = (py - y0) / (y1 - y0);
        return (Math.sin(nx * 6) + ny * 1.8 > 1.2) ? 1 : 0;
      };
      // recursively split the region, alternating axis, up to `depth`
      const splits = [];
      function split(ax, ay, bx, by, d, axis) {
        if (d === 0) return;
        if (axis === 0) {
          const mx = (ax + bx) / 2;
          splits.push([mx, ay, mx, by]);
          split(ax, ay, mx, by, d - 1, 1);
          split(mx, ay, bx, by, d - 1, 1);
        } else {
          const my = (ay + by) / 2;
          splits.push([ax, my, bx, my]);
          split(ax, ay, bx, my, d - 1, 0);
          split(ax, my, bx, by, d - 1, 0);
        }
      }
      split(x0, y0, x1, y1, depth, 0);
      // animate the reveal of splits
      const reveal = easeInOut(Math.min(1, t * 1.1));
      const showN = Math.ceil(splits.length * reveal);
      // region boundary
      ctx.strokeStyle = "rgba(148,163,184,0.5)"; ctx.lineWidth = 1;
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
      // splits
      ctx.strokeStyle = GOLD; ctx.lineWidth = 2;
      for (let i = 0; i < showN; i++) {
        const [sx, sy, ex, ey] = splits[i];
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
      }
      // data points
      for (let i = 0; i < 40; i++) {
        const px = x0 + r() * (x1 - x0), py = y0 + r() * (y1 - y0);
        dot(ctx, px, py, 5, truth(px, py) ? RED : BLUE);
      }
      label(ctx, `max_depth = ${depth}`, 16, 26, GOLD, 15);
      label(ctx, `${lang === "id" ? "kotak" : "regions"}: ${showN + 1}`, 16, H - 14, "#94a3b8", 11);
    },
  },
};

export const getParamScene = (slug) => paramScenes[slug] || null;
