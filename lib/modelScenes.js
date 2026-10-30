// Per-algorithm "how it works" animations for ModelViz. Each scene exports:
//   { period?: ms, staticT?: 0..1, caption?: {id,en}, draw(ctx, t, W, H, lang) }
// `t` is a looping 0..1 progress. Pure canvas 2D — original, lightweight, no
// assets. Dark background (set by the ModelViz container) so we draw in bright
// colors. All helpers are deterministic (seeded) so frames are stable.

const BLUE = "#38bdf8";
const RED = "#f87171";
const GREEN = "#34d399";
const GOLD = "#fbbf24";
const VIOLET = "#c4b5fd";
const INK = "#0b1220";

// deterministic pseudo-random (so point clouds are stable across frames)
function rng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const lerp = (a, b, t) => a + (b - a) * t;
// triangle wave 0→1→0 for back-and-forth loops
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

// ----- simple isometric 3D projection for "3D cloud" scenes -----
function project(x, y, z, cx, cy, angle, scale = 1) {
  // rotate around vertical axis
  const rx = x * Math.cos(angle) - z * Math.sin(angle);
  const rz = x * Math.sin(angle) + z * Math.cos(angle);
  const iso = 0.5; // vertical tilt
  return {
    sx: cx + rx * scale,
    sy: cy + (y * scale) * 0.82 - rz * iso * scale * 0.5,
    depth: rz,
  };
}

export const modelScenes = {
  // ===================== k-NN =====================
  "supervised-knn": {
    period: 6000,
    caption: {
      id: "Titik baru (kuning) mencari k=3 tetangga terdekat, lalu ikut suara terbanyak.",
      en: "A new point (gold) finds its k=3 nearest neighbors, then follows the majority vote.",
    },
    draw(ctx, t, W, H) {
      const r = rng(7);
      const pts = Array.from({ length: 16 }, () => ({
        x: 60 + r() * (W - 120),
        y: 50 + r() * (H - 90),
        c: r() > 0.5 ? 0 : 1,
      }));
      // query point travels along a path
      const qx = lerp(120, W - 120, easeInOut(ping(t)));
      const qy = H / 2 + Math.sin(t * Math.PI * 2) * 40;
      // find 3 nearest
      const near = [...pts].sort((a, b) => ((a.x - qx) ** 2 + (a.y - qy) ** 2) - ((b.x - qx) ** 2 + (b.y - qy) ** 2)).slice(0, 3);
      // links to the 3 nearest (fade in)
      const reveal = Math.min(1, t * 2.2);
      near.forEach((n, i) => {
        if (reveal < (i + 1) / 3) return;
        ctx.strokeStyle = "rgba(251,191,36,0.8)";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(qx, qy); ctx.lineTo(n.x, n.y); ctx.stroke();
        ctx.setLineDash([]);
      });
      // all points
      for (const p of pts) dot(ctx, p.x, p.y, 6, p.c === 0 ? BLUE : RED);
      // majority vote result
      const votes = near.reduce((s, n) => s + (n.c === 1 ? 1 : -1), 0);
      dot(ctx, qx, qy, 9, GOLD, "#1e293b");
      label(ctx, votes > 0 ? "→ ●" : "→ ●", qx + 14, qy - 10, votes > 0 ? RED : BLUE, 16);
    },
  },

  // ===================== k-Means =====================
  "unsupervised-kmeans": {
    period: 7000,
    caption: {
      id: "Ulangi: tiap titik ikut centroid terdekat, lalu centroid pindah ke rata-rata anggotanya.",
      en: "Repeat: each point joins its nearest centroid, then centroids move to their members' mean.",
    },
    draw(ctx, t, W, H) {
      const r = rng(21);
      // 3 true blobs
      const blobs = [[140, 90], [330, 110], [230, 230]];
      const pts = [];
      for (const [bx, by] of blobs) for (let i = 0; i < 12; i++) pts.push({ x: bx + (r() - 0.5) * 90, y: by + (r() - 0.5) * 90 });
      // centroids animate from a bad start toward the blob centers over the loop
      const colors = [BLUE, RED, GREEN];
      const start = [[90, 220], [380, 70], [260, 90]];
      const cs = blobs.map((b, i) => ({
        x: lerp(start[i][0], b[0], easeInOut(Math.min(1, t * 1.3))),
        y: lerp(start[i][1], b[1], easeInOut(Math.min(1, t * 1.3))),
        c: colors[i],
      }));
      // assign each point to nearest centroid
      for (const p of pts) {
        let best = 0, bd = Infinity;
        cs.forEach((c, i) => { const d = (c.x - p.x) ** 2 + (c.y - p.y) ** 2; if (d < bd) { bd = d; best = i; } });
        dot(ctx, p.x, p.y, 5, cs[best].c);
      }
      // centroids
      cs.forEach((c) => {
        ctx.beginPath(); ctx.arc(c.x, c.y, 11, 0, Math.PI * 2);
        ctx.fillStyle = c.c; ctx.globalAlpha = 0.9; ctx.fill(); ctx.globalAlpha = 1;
        ctx.lineWidth = 3; ctx.strokeStyle = "#fff"; ctx.stroke();
        label(ctx, "✦", c.x, c.y + 5, "#0b1220", 14, "center");
      });
    },
  },

  // ===================== Gradient Descent =====================
  "gradient-descent": {
    period: 5000,
    caption: {
      id: "Bola menuruni 'lembah loss' mengikuti gradien sampai mencapai dasar (error minimum).",
      en: "A ball rolls down the 'loss valley' along the gradient until it reaches the bottom (minimum error).",
    },
    draw(ctx, t, W, H) {
      const cx = W / 2, baseY = H - 40, A = 120;
      const loss = (x) => baseY - A * Math.exp(-((x - cx) ** 2) / (2 * 90 ** 2)) * 0 + A * (((x - cx) / 170) ** 2); // parabola
      // draw loss curve
      ctx.strokeStyle = VIOLET; ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 40; x <= W - 40; x += 3) {
        const y = baseY - A + A * (((x - cx) / 170) ** 2);
        if (x === 40) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      // ball descends: start far right, converge to center over the loop
      const prog = easeInOut(Math.min(1, t * 1.2));
      const startX = cx + 150;
      const bx = lerp(startX, cx, prog);
      const by = baseY - A + A * (((bx - cx) / 170) ** 2);
      // trail of previous steps (gradient steps get smaller near the min)
      ctx.fillStyle = "rgba(56,189,248,0.5)";
      for (let k = 0; k < 6; k++) {
        const pp = Math.max(0, prog - k * 0.09);
        const px = lerp(startX, cx, pp);
        const py = baseY - A + A * (((px - cx) / 170) ** 2);
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
      }
      dot(ctx, bx, by, 10, GOLD, "#1e293b");
      label(ctx, "min", cx, baseY - A - 10, GREEN, 12, "center");
    },
  },

  // ===================== PCA =====================
  pca: {
    period: 8000,
    caption: {
      id: "Awan data 3D berputar; PCA menemukan sumbu varians terbesar lalu memproyeksikan ke sana.",
      en: "A 3D data cloud rotates; PCA finds the max-variance axis, then projects onto it.",
    },
    draw(ctx, t, W, H) {
      const r = rng(5);
      const cx = W / 2, cy = H / 2;
      const angle = t * Math.PI * 2; // full rotation each loop
      // elongated cloud along x
      const pts = Array.from({ length: 40 }, () => ({
        x: (r() - 0.5) * 220, y: (r() - 0.5) * 50, z: (r() - 0.5) * 60,
      }));
      // PC1 axis (the long direction)
      const a1 = project(-120, 0, 0, cx, cy, angle);
      const a2 = project(120, 0, 0, cx, cy, angle);
      ctx.strokeStyle = GOLD; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(a1.sx, a1.sy); ctx.lineTo(a2.sx, a2.sy); ctx.stroke();
      label(ctx, "PC1", a2.sx + 6, a2.sy, GOLD, 12);
      // points (depth-sorted)
      const proj = pts.map((p) => project(p.x, p.y, p.z, cx, cy, angle)).sort((p, q) => p.depth - q.depth);
      for (const p of proj) {
        const d = (p.depth + 120) / 240;
        dot(ctx, p.sx, p.sy, 3 + d * 2, `rgba(56,189,248,${0.4 + d * 0.6})`);
      }
    },
  },

  // ===================== SVM =====================
  svm: {
    period: 5500,
    caption: {
      id: "Margin melebar sampai maksimum; titik yang menyentuhnya adalah support vector.",
      en: "The margin widens to its maximum; the points touching it are the support vectors.",
    },
    draw(ctx, t, W, H) {
      const cx = W / 2, cy = H / 2;
      const left = [[100, 90], [120, 150], [95, 210], [150, 120], [140, 190]];
      const right = [[360, 100], [340, 160], [365, 215], [310, 130], [320, 200]];
      // margin grows over the loop
      const m = lerp(8, 46, easeInOut(Math.min(1, t * 1.3)));
      // margin band
      ctx.fillStyle = "rgba(251,191,36,0.14)";
      ctx.fillRect(cx - m, 20, m * 2, H - 40);
      // decision line + margins
      ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, H - 20); ctx.stroke();
      ctx.strokeStyle = GOLD; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(cx - m, 20); ctx.lineTo(cx - m, H - 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + m, 20); ctx.lineTo(cx + m, H - 20); ctx.stroke();
      ctx.setLineDash([]);
      // points; nearest to the line = support vectors (circled)
      const near = m > 40;
      for (const [x, y] of left) dot(ctx, x, y, near && x > cx - m - 14 ? 7 : 5, BLUE, near && x > cx - m - 14 ? GOLD : "#0b1220");
      for (const [x, y] of right) dot(ctx, x, y, near && x < cx + m + 14 ? 7 : 5, RED, near && x < cx + m + 14 ? GOLD : "#0b1220");
    },
  },

  // ===================== Decision Tree =====================
  "decision-tree": {
    period: 6500,
    caption: {
      id: "Pohon memecah ruang dengan garis lurus satu per satu (pertanyaan ya/tidak).",
      en: "The tree splits the space with straight cuts one at a time (yes/no questions).",
    },
    draw(ctx, t, W, H) {
      const r = rng(11);
      const pts = Array.from({ length: 24 }, () => {
        const x = 40 + r() * (W - 80), y = 30 + r() * (H - 60);
        const c = x < W / 2 ? (y < H / 2 ? 0 : 1) : (y < H / 2 ? 1 : 0); // XOR-ish
        return { x, y, c };
      });
      // reveal splits progressively: vertical first, then two horizontals
      const p = t; // 0..1
      // regions tint after splits appear
      if (p > 0.25) { ctx.fillStyle = "rgba(56,189,248,0.07)"; ctx.fillRect(40, 30, W / 2 - 40, H - 60); }
      if (p > 0.25) { ctx.fillStyle = "rgba(248,113,113,0.07)"; ctx.fillRect(W / 2, 30, W / 2 - 40, H - 60); }
      ctx.strokeStyle = GOLD; ctx.lineWidth = 2.5;
      if (p > 0.2) { ctx.beginPath(); ctx.moveTo(W / 2, 30); ctx.lineTo(W / 2, H - 30); ctx.stroke(); }
      if (p > 0.5) { ctx.beginPath(); ctx.moveTo(40, H / 2); ctx.lineTo(W / 2, H / 2); ctx.stroke(); }
      if (p > 0.75) { ctx.beginPath(); ctx.moveTo(W / 2, H / 2); ctx.lineTo(W - 40, H / 2); ctx.stroke(); }
      for (const pt of pts) dot(ctx, pt.x, pt.y, 5, pt.c === 0 ? BLUE : RED);
    },
  },
};

// ===================== Random Forest =====================
modelScenes["random-forest"] = {
  period: 7000,
  caption: {
    id: "Banyak pohon memberi suara (voting); gabungannya menghasilkan batas yang halus & akurat.",
    en: "Many trees vote; their combination yields a smooth, accurate boundary.",
  },
  draw(ctx, t, W, H) {
    const r = rng(33);
    const pts = Array.from({ length: 26 }, () => {
      const x = 40 + r() * (W - 80), y = 30 + r() * (H - 60);
      const c = (x - W / 2) + (y - H / 2) * 0.6 + Math.sin(x / 40) * 30 > 0 ? 1 : 0;
      return { x, y, c };
    });
    // several jagged candidate boundaries fade in (trees), then a smooth average
    const nTrees = Math.min(5, Math.floor(t * 6));
    for (let k = 0; k < nTrees; k++) {
      ctx.strokeStyle = `rgba(148,163,184,${0.35})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 40; x <= W - 40; x += 10) {
        const y = H / 2 + Math.sin((x + k * 40) / 30) * (24 + k * 4) + (k - 2) * 8;
        if (x === 40) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    if (t > 0.7) {
      ctx.strokeStyle = GOLD; ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 40; x <= W - 40; x += 6) {
        const y = H / 2 + Math.sin(x / 36) * 20;
        if (x === 40) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    for (const p of pts) dot(ctx, p.x, p.y, 5, p.c === 0 ? BLUE : RED);
  },
};

// ===================== Naive Bayes =====================
modelScenes["naive-bayes"] = {
  period: 5500,
  caption: {
    id: "Dua 'bukit' probabilitas (per kelas) tumbuh; kelas dengan peluang tertinggi menang.",
    en: "Two probability 'hills' (per class) grow; the class with the highest probability wins.",
  },
  draw(ctx, t, W, H) {
    const baseY = H - 40;
    const grow = easeInOut(Math.min(1, t * 1.3));
    const gauss = (x, mu, s, a) => a * Math.exp(-((x - mu) ** 2) / (2 * s * s));
    const draw1 = (mu, s, a, color) => {
      ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let x = 30; x <= W - 30; x += 3) {
        const y = baseY - gauss(x, mu, s, a) * grow;
        if (x === 30) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = color.replace(")", ",0.12)").replace("rgb", "rgba");
    };
    draw1(W * 0.36, 55, 150, BLUE);
    draw1(W * 0.64, 55, 150, RED);
    // decision point where the two hills cross
    const mid = W / 2;
    ctx.strokeStyle = GOLD; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(mid, 30); ctx.lineTo(mid, baseY); ctx.stroke(); ctx.setLineDash([]);
    label(ctx, "P(class A)", W * 0.30, 40, BLUE, 11, "center");
    label(ctx, "P(class B)", W * 0.70, 40, RED, 11, "center");
  },
};

// ===================== DBSCAN =====================
modelScenes.dbscan = {
  period: 6500,
  caption: {
    id: "Bola radius ε tumbuh dari titik padat; cluster menyebar lewat tetangga, pencilan jadi noise.",
    en: "An ε-radius ball grows from dense points; clusters spread via neighbors, outliers become noise.",
  },
  draw(ctx, t, W, H) {
    const r = rng(44);
    const arc = [];
    for (let i = 0; i < 22; i++) { const a = Math.PI * (i / 22); arc.push({ x: 150 + Math.cos(a) * 80 + (r() - 0.5) * 16, y: 170 - Math.sin(a) * 80 + (r() - 0.5) * 16, cl: 0 }); }
    for (let i = 0; i < 22; i++) { const a = Math.PI * (i / 22); arc.push({ x: 300 - Math.cos(a) * 80 + (r() - 0.5) * 16, y: 150 + Math.sin(a) * 80 + (r() - 0.5) * 16, cl: 1 }); }
    const noise = Array.from({ length: 5 }, () => ({ x: 50 + r() * (W - 100), y: 30 + r() * (H - 60), cl: -1 }));
    const eps = lerp(6, 34, easeInOut(Math.min(1, t * 1.4)));
    // growing ε balls around a couple of core points
    const cores = [arc[4], arc[26]];
    cores.forEach((c) => {
      ctx.fillStyle = "rgba(251,191,36,0.12)";
      ctx.beginPath(); ctx.arc(c.x, c.y, eps, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(251,191,36,0.5)"; ctx.lineWidth = 1.5; ctx.stroke();
    });
    const reached = t > 0.6;
    for (const p of arc) dot(ctx, p.x, p.y, 5, reached ? (p.cl === 0 ? BLUE : RED) : "#94a3b8");
    for (const p of noise) dot(ctx, p.x, p.y, 5, "#64748b", "#475569");
  },
};

// ===================== t-SNE =====================
modelScenes.tsne = {
  period: 7000,
  caption: {
    id: "Kelas yang semula bertumpuk ditarik memisah menjadi kelompok rapi (menjaga tetangga).",
    en: "Overlapping classes are pulled apart into tidy groups (preserving neighborhoods).",
  },
  draw(ctx, t, W, H) {
    const r = rng(9);
    const centers = [[130, 110], [330, 120], [230, 220]];
    const cols = [BLUE, RED, GREEN];
    const sep = easeInOut(Math.min(1, t * 1.2));
    for (let c = 0; c < 3; c++) {
      for (let i = 0; i < 14; i++) {
        const sx = W / 2 + (r() - 0.5) * 110, sy = H / 2 + (r() - 0.5) * 110;
        const tx = centers[c][0] + (r() - 0.5) * 60, ty = centers[c][1] + (r() - 0.5) * 60;
        dot(ctx, lerp(sx, tx, sep), lerp(sy, ty, sep), 4.5, cols[c]);
      }
    }
  },
};

// ===================== LDA =====================
modelScenes.lda = {
  period: 6000,
  caption: {
    id: "LDA memutar sumbu proyeksi memakai label sampai kedua kelas paling terpisah.",
    en: "LDA rotates the projection axis using labels until the two classes are most separated.",
  },
  draw(ctx, t, W, H) {
    const cx = W / 2, cy = H / 2;
    // two classes offset along the 'good' (vertical) direction, spread horizontally
    const r = rng(17);
    const c0 = [], c1 = [];
    for (let i = 0; i < 16; i++) { c0.push([cx + (r() - 0.5) * 220, cy - 34 + (r() - 0.5) * 30]); c1.push([cx + (r() - 0.5) * 220, cy + 34 + (r() - 0.5) * 30]); }
    // axis rotates from the bad (horizontal, PCA-like) toward the good (vertical, LDA)
    const ang = lerp(0, Math.PI / 2, easeInOut(Math.min(1, t * 1.2)));
    const dx = Math.cos(ang), dy = Math.sin(ang);
    ctx.strokeStyle = GOLD; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx - dx * 150, cy - dy * 110); ctx.lineTo(cx + dx * 150, cy + dy * 110); ctx.stroke();
    label(ctx, t > 0.8 ? "LDA axis ✓" : "axis…", cx + dx * 150 + 4, cy + dy * 110, GOLD, 11);
    for (const [x, y] of c0) dot(ctx, x, y, 4.5, BLUE);
    for (const [x, y] of c1) dot(ctx, x, y, 4.5, RED);
  },
};

// ===================== Linear/Logistic Regression =====================
modelScenes.regression = {
  period: 5500,
  caption: {
    id: "Garis menyesuaikan diri menuruni error (jarak ke titik mengecil) hingga pas terbaik.",
    en: "The line adjusts to reduce error (shrinking distances to points) until the best fit.",
  },
  draw(ctx, t, W, H) {
    const r = rng(3);
    const pts = Array.from({ length: 14 }, (_, i) => {
      const x = 50 + (i / 13) * (W - 100);
      const y = H - 60 - ((x - 50) / (W - 100)) * (H - 120) + (r() - 0.5) * 50;
      return { x, y };
    });
    // best-fit line (approx through cloud); animate from a bad slope to the fit
    const x1 = 50, x2 = W - 50;
    const goodY1 = H - 60, goodY2 = 60;
    const badY1 = H - 120, badY2 = H - 160;
    const p = easeInOut(Math.min(1, t * 1.3));
    const y1 = lerp(badY1, goodY1, p), y2 = lerp(badY2, goodY2, p);
    // residual lines
    for (const pt of pts) {
      const ly = y1 + ((pt.x - x1) / (x2 - x1)) * (y2 - y1);
      ctx.strokeStyle = "rgba(248,113,113,0.5)"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(pt.x, pt.y); ctx.lineTo(pt.x, ly); ctx.stroke();
    }
    ctx.strokeStyle = GOLD; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    for (const pt of pts) dot(ctx, pt.x, pt.y, 5, BLUE);
  },
};

export function getScene(slug) {
  return modelScenes[slug] || null;
}
