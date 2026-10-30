// Additional "how it works" animations for the remaining demos (Deep Learning,
// Computer Vision, Reinforcement Learning, NLP/LLM, and a couple of ML extras).
// Same contract as lib/modelScenes.js: each scene is
//   { period?, staticT?, caption:{id,en}, draw(ctx, t, W, H, lang) }
// Pure original canvas 2D — no assets. Self-contained local helpers so this
// file doesn't depend on the (module-scoped) helpers in modelScenes.js.

const BLUE = "#38bdf8";
const RED = "#f87171";
const GREEN = "#34d399";
const GOLD = "#fbbf24";
const VIOLET = "#c4b5fd";
const PINK = "#f0abfc";
const SLATE = "#94a3b8";

function rng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const lerp = (a, b, t) => a + (b - a) * t;
const ping = (t) => 1 - Math.abs(1 - 2 * t);
const clamp01 = (x) => Math.max(0, Math.min(1, x));

function dot(ctx, x, y, r, fill, stroke = "#0b1220") {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill; ctx.fill();
  ctx.lineWidth = 1.5; ctx.strokeStyle = stroke; ctx.stroke();
}
function label(ctx, text, x, y, color = "#e2e8f0", size = 12, align = "left") {
  ctx.fillStyle = color; ctx.font = `600 ${size}px ui-sans-serif, system-ui, sans-serif`;
  ctx.textAlign = align; ctx.fillText(text, x, y); ctx.textAlign = "left";
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export const extraScenes = {
  // ========================================================================
  // DEEP LEARNING
  // ========================================================================

  // Neural network: signal flows left→right through layers, boundary "learns".
  "neural-network": {
    period: 6000,
    caption: {
      id: "Sinyal mengalir maju lewat lapisan neuron; bobot disetel sampai jaringan belajar polanya.",
      en: "Signal flows forward through neuron layers; weights are tuned until the network learns the pattern.",
    },
    draw(ctx, t, W, H) {
      const layers = [3, 5, 5, 2];
      const xs = layers.map((_, i) => 60 + (i * (W - 120)) / (layers.length - 1));
      const pos = layers.map((n, li) => Array.from({ length: n }, (_, j) => ({
        x: xs[li], y: (H / (n + 1)) * (j + 1),
      })));
      // edges (pulse of activation sweeps left→right)
      const sweep = t * (layers.length - 1);
      for (let li = 0; li < layers.length - 1; li++) {
        for (const a of pos[li]) for (const b of pos[li + 1]) {
          const active = sweep > li && sweep < li + 1.4;
          ctx.strokeStyle = active ? "rgba(251,191,36,0.55)" : "rgba(148,163,184,0.22)";
          ctx.lineWidth = active ? 2 : 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      // nodes
      pos.forEach((layer, li) => layer.forEach((n) => {
        const lit = Math.abs(sweep - li) < 0.7;
        dot(ctx, n.x, n.y, 9, lit ? GOLD : (li === 0 ? BLUE : li === layers.length - 1 ? GREEN : VIOLET));
      }));
      label(ctx, "input", xs[0], H - 12, SLATE, 11, "center");
      label(ctx, "hidden", (xs[1] + xs[2]) / 2, H - 12, SLATE, 11, "center");
      label(ctx, "output", xs[3], H - 12, SLATE, 11, "center");
    },
  },

  // Convolution filters: a kernel window slides over a grid producing a feature map.
  "cnn-filters": {
    period: 6500,
    caption: {
      id: "Kernel kecil menggeser di atas gambar (konvolusi) dan menghasilkan peta fitur.",
      en: "A small kernel slides over the image (convolution), producing a feature map.",
    },
    draw(ctx, t, W, H) {
      const gx = 40, gy = 50, cell = 26, n = 6;
      const r = rng(2);
      // input grid
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const v = r();
        ctx.fillStyle = `rgba(56,189,248,${0.15 + v * 0.6})`;
        ctx.fillRect(gx + j * cell, gy + i * cell, cell - 2, cell - 2);
      }
      // sliding 3x3 kernel window
      const steps = (n - 2) * (n - 2);
      const idx = Math.floor(t * steps) % steps;
      const kr = Math.floor(idx / (n - 2)), kc = idx % (n - 2);
      ctx.strokeStyle = GOLD; ctx.lineWidth = 3;
      ctx.strokeRect(gx + kc * cell - 1, gy + kr * cell - 1, cell * 3, cell * 3);
      // output feature map
      const ox = gx + n * cell + 50, oy = gy + 14;
      label(ctx, "→", ox - 28, oy + 40, GOLD, 22);
      for (let i = 0; i < n - 2; i++) for (let j = 0; j < n - 2; j++) {
        const done = i * (n - 2) + j <= idx;
        ctx.fillStyle = done ? `rgba(52,211,153,${0.3 + ((i + j) % 3) * 0.2})` : "rgba(148,163,184,0.12)";
        ctx.fillRect(ox + j * cell, oy + i * cell, cell - 2, cell - 2);
      }
      label(ctx, "feature map", ox + ((n - 2) * cell) / 2, oy + (n - 2) * cell + 18, GREEN, 11, "center");
    },
  },

  // Edge detection: brightness gradient highlights an edge as a scan line passes.
  "edge-detection": {
    period: 5000,
    caption: {
      id: "Operator Sobel mengukur perubahan terang↔gelap; tepi objek menyala di lokasi gradien tajam.",
      en: "The Sobel operator measures bright↔dark change; object edges light up where the gradient is sharp.",
    },
    draw(ctx, t, W, H) {
      const half = W / 2;
      // left: a soft disk (the 'image'); right: its edges
      const cx = half / 2, cy = H / 2, R = 70;
      const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, R);
      g.addColorStop(0, "#cbd5e1"); g.addColorStop(1, "#1e293b");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      // edge ring on the right
      const ex = half + half / 2;
      ctx.strokeStyle = GOLD; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(ex, cy, R, 0, Math.PI * 2); ctx.stroke();
      // scan line sweeping across both
      const sx = lerp(20, W - 20, t);
      ctx.strokeStyle = "rgba(251,191,36,0.7)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(sx, 20); ctx.lineTo(sx, H - 20); ctx.stroke();
      label(ctx, "image", cx, H - 14, SLATE, 11, "center");
      label(ctx, "edges", ex, H - 14, GOLD, 11, "center");
    },
  },

  // Pixel/digit classifier: a drawn digit's strokes map to class bars.
  "pixel-classifier": {
    period: 6000,
    caption: {
      id: "Piksel gambar digit masuk ke jaringan; keluaran berupa peluang tiap angka (0–9).",
      en: "A digit's pixels feed the network; the output is a probability for each digit (0–9).",
    },
    draw(ctx, t, W, H) {
      // left: pixel grid forming a "7"
      const gx = 40, gy = 60, cell = 18, n = 7;
      const seven = new Set(["0,1", "0,2", "0,3", "0,4", "1,4", "2,3", "3,3", "4,2", "5,2", "6,2"]);
      const appear = Math.floor(t * 14);
      let k = 0;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const on = seven.has(`${i},${j}`);
        ctx.fillStyle = on && k++ < appear ? BLUE : "rgba(148,163,184,0.12)";
        ctx.fillRect(gx + j * cell, gy + i * cell, cell - 2, cell - 2);
      }
      // right: output bars, the "7" bar grows tallest
      const ox = gx + n * cell + 60, oy = 40, bw = 16, gap = 6;
      const probs = [0.03, 0.02, 0.05, 0.04, 0.02, 0.03, 0.02, 0.62, 0.04, 0.03];
      const reveal = clamp01((t - 0.4) * 2);
      probs.forEach((p, d) => {
        const h = p * 150 * reveal;
        ctx.fillStyle = d === 7 ? GREEN : SLATE;
        ctx.fillRect(ox + d * (bw + gap), oy + 160 - h, bw, h);
        label(ctx, String(d), ox + d * (bw + gap) + bw / 2, oy + 176, SLATE, 9, "center");
      });
      label(ctx, "P(digit)", ox + 4, oy - 6, GREEN, 11);
    },
  },

  // Activation functions: the three curves (ReLU/sigmoid/tanh) draw in.
  "activation-functions": {
    period: 5000,
    caption: {
      id: "Fungsi aktivasi menambah non-linearitas: ReLU, sigmoid, dan tanh membentuk sinyal neuron.",
      en: "Activation functions add non-linearity: ReLU, sigmoid, and tanh shape the neuron's signal.",
    },
    draw(ctx, t, W, H) {
      const cx = W / 2, cy = H / 2, sx = (W - 80) / 8, sy = 50;
      // axes
      ctx.strokeStyle = "rgba(148,163,184,0.4)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(40, cy); ctx.lineTo(W - 40, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, 30); ctx.lineTo(cx, H - 30); ctx.stroke();
      const prog = clamp01(t * 1.3);
      const plot = (fn, color) => {
        ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.beginPath();
        let started = false;
        for (let px = -4; px <= 4 * prog; px += 0.1) {
          const x = cx + px * sx, y = cy - fn(px) * sy;
          if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };
      plot((x) => Math.max(0, x) * 0.5, GREEN);           // ReLU
      plot((x) => (2 / (1 + Math.exp(-x)) - 1), BLUE);    // sigmoid-ish (scaled)
      plot((x) => Math.tanh(x), GOLD);                    // tanh
      label(ctx, "ReLU", W - 80, cy - 60, GREEN, 11);
      label(ctx, "sigmoid", W - 80, cy - 20, BLUE, 11);
      label(ctx, "tanh", W - 80, cy + 20, GOLD, 11);
    },
  },

  // Latent space: a point drifts through latent space → output morphs.
  "latent-space": {
    period: 7000,
    caption: {
      id: "Menggeser vektor laten z secara mulus membuat output (mis. wajah) berubah bertahap.",
      en: "Smoothly moving the latent vector z makes the output (e.g. a face) morph gradually.",
    },
    draw(ctx, t, W, H) {
      // left: 2D latent plane with a moving point
      const px = 40, py = 50, size = 150;
      ctx.strokeStyle = "rgba(148,163,184,0.4)"; ctx.lineWidth = 1;
      ctx.strokeRect(px, py, size, size);
      label(ctx, "latent z", px, py - 8, VIOLET, 11);
      const zx = px + size * (0.5 + 0.4 * Math.cos(t * Math.PI * 2));
      const zy = py + size * (0.5 + 0.4 * Math.sin(t * Math.PI * 2));
      dot(ctx, zx, zy, 7, GOLD, "#1e293b");
      // right: output "face" that morphs with z
      const ox = px + size + 90, oy = H / 2;
      const w = 46 + 10 * Math.cos(t * Math.PI * 2);   // width morph
      const eye = 6 + 3 * Math.sin(t * Math.PI * 2);   // eye size morph
      ctx.fillStyle = "rgba(196,181,253,0.25)"; ctx.strokeStyle = VIOLET; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(ox, oy, w, 56, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      dot(ctx, ox - 16, oy - 10, eye, "#e2e8f0"); dot(ctx, ox + 16, oy - 10, eye, "#e2e8f0");
      ctx.strokeStyle = PINK; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(ox, oy + 14, 14, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
      label(ctx, "→ output", ox - 30, py - 8, PINK, 11);
    },
  },

  // Speech → spectrogram: waveform scrolls, building a spectrogram.
  "speech-spectrogram": {
    period: 4500,
    caption: {
      id: "Gelombang suara diubah menjadi spektrogram (frekuensi vs waktu) yang 'dibaca' model.",
      en: "A sound wave is turned into a spectrogram (frequency vs time) that the model 'reads'.",
    },
    draw(ctx, t, W, H) {
      // top: waveform
      ctx.strokeStyle = BLUE; ctx.lineWidth = 2; ctx.beginPath();
      for (let x = 20; x <= W - 20; x += 3) {
        const ph = (x / 30) + t * 10;
        const amp = 22 * Math.sin(ph) * Math.sin(ph * 0.33 + 1);
        const y = 55 + amp;
        if (x === 20) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      label(ctx, "waveform", 20, 24, BLUE, 11);
      // bottom: scrolling spectrogram columns
      const r = rng(13);
      const sy = 110, rows = 8, colW = 10, cols = Math.floor((W - 40) / colW);
      const shift = Math.floor(t * cols);
      label(ctx, "spectrogram", 20, sy - 6, GREEN, 11);
      for (let c = 0; c < cols; c++) for (let ri = 0; ri < rows; ri++) {
        const energy = Math.abs(Math.sin((c + shift) * 0.4 + ri) * Math.cos((c + shift) * 0.2 - ri * 0.5));
        ctx.fillStyle = `rgba(52,211,153,${0.1 + energy * 0.7})`;
        ctx.fillRect(20 + c * colW, sy + ri * 14, colW - 1, 13);
      }
    },
  },

  // CNN filter on your image: generic photo → filtered output (edge/sharpen).
  "cnn-filter-image": {
    period: 6000,
    caption: {
      id: "Kernel konvolusi diterapkan ke gambar: lapisan CNN 'melihat' tepi, tekstur, lalu bentuk.",
      en: "A convolution kernel is applied to an image: CNN layers 'see' edges, textures, then shapes.",
    },
    draw(ctx, t, W, H) {
      const half = W / 2;
      // left: simple 'scene' (sun + hill)
      const lx = half / 2;
      ctx.fillStyle = "rgba(56,189,248,0.18)"; ctx.fillRect(30, 40, half - 60, H - 80);
      ctx.fillStyle = GOLD; ctx.beginPath(); ctx.arc(lx - 20, 90, 18, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(52,211,153,0.4)"; ctx.beginPath();
      ctx.moveTo(30, H - 40); ctx.quadraticCurveTo(lx, H - 110, half - 30, H - 40); ctx.fill();
      label(ctx, "image", lx, H - 16, SLATE, 11, "center");
      // right: edge-filtered version (outlines), reveal with t
      const rx = half + half / 2;
      const reveal = clamp01(t * 1.3);
      ctx.save();
      ctx.beginPath(); ctx.rect(half + 30, 40, half - 60, H - 80); ctx.clip();
      ctx.strokeStyle = `rgba(251,191,36,${reveal})`; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(rx - 20, 90, 18, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(half + 30, H - 40); ctx.quadraticCurveTo(rx, H - 110, W - 30, H - 40); ctx.stroke();
      ctx.restore();
      label(ctx, "edges (filtered)", rx, H - 16, GOLD, 11, "center");
    },
  },

  // Webcam vision: a face box + landmarks track a moving target.
  "webcam-vision": {
    period: 5000,
    caption: {
      id: "Model mendeteksi wajah/tangan secara real-time: kotak & titik-titik mengikuti objek.",
      en: "The model detects the face/hand in real time: a box & landmarks track the object.",
    },
    draw(ctx, t, W, H) {
      ctx.fillStyle = "rgba(15,23,42,0.6)"; ctx.fillRect(20, 20, W - 40, H - 40);
      const cx = W / 2 + 70 * Math.cos(t * Math.PI * 2);
      const cy = H / 2 + 30 * Math.sin(t * Math.PI * 2 * 1.3);
      // face oval
      ctx.strokeStyle = GREEN; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(cx, cy, 34, 44, 0, 0, Math.PI * 2); ctx.stroke();
      // bounding box
      ctx.strokeStyle = GOLD; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
      ctx.strokeRect(cx - 44, cy - 54, 88, 108); ctx.setLineDash([]);
      // landmarks
      const lm = [[-14, -12], [14, -12], [0, 4], [-10, 22], [10, 22]];
      for (const [dx, dy] of lm) dot(ctx, cx + dx, cy + dy, 3, "#e2e8f0");
      label(ctx, "face 0.98", cx - 44, cy - 60, GOLD, 11);
    },
  },

  // ========================================================================
  // REINFORCEMENT LEARNING
  // ========================================================================

  // Grid-world: an agent walks a grid toward the goal, value heat fills in.
  "rl-gridworld": {
    period: 6500,
    caption: {
      id: "Agen menjelajah grid; nilai (value) menyebar dari tujuan, memandu jalur reward tertinggi.",
      en: "The agent explores the grid; value spreads from the goal, guiding the highest-reward path.",
    },
    draw(ctx, t, W, H) {
      const n = 5, cell = 46, gx = (W - n * cell) / 2, gy = (H - n * cell) / 2;
      const goal = [4, 4];
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const d = Math.abs(i - goal[0]) + Math.abs(j - goal[1]);
        const v = Math.max(0, 1 - d / 8) * clamp01(t * 1.5);
        ctx.fillStyle = `rgba(52,211,153,${0.08 + v * 0.6})`;
        ctx.fillRect(gx + j * cell, gy + i * cell, cell - 2, cell - 2);
      }
      // goal
      ctx.fillStyle = GOLD; ctx.fillRect(gx + goal[1] * cell + 10, gy + goal[0] * cell + 10, cell - 22, cell - 22);
      label(ctx, "★", gx + goal[1] * cell + cell / 2, gy + goal[0] * cell + cell / 2 + 6, "#0b1220", 18, "center");
      // agent path toward goal
      const path = [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [2, 3], [3, 3], [3, 4], [4, 4]];
      const step = Math.min(path.length - 1, Math.floor(t * path.length));
      const [ar, ac] = path[step];
      dot(ctx, gx + ac * cell + cell / 2, gy + ar * cell + cell / 2, 12, BLUE, "#fff");
    },
  },

  // Q-learning training: reward-per-episode curve climbs over training.
  "qlearning-train": {
    period: 6000,
    caption: {
      id: "Selama latihan, reward per episode naik: agen makin pandai lewat coba-coba.",
      en: "Over training, reward per episode rises: the agent gets smarter through trial and error.",
    },
    draw(ctx, t, W, H) {
      const x0 = 50, y0 = H - 40, x1 = W - 30, y1 = 40;
      ctx.strokeStyle = "rgba(148,163,184,0.4)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, y1); ctx.lineTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
      label(ctx, "reward", x0 - 6, y1 - 6, GREEN, 11);
      label(ctx, "episodes", x1, y0 + 18, SLATE, 11, "right");
      const r = rng(8);
      ctx.strokeStyle = GOLD; ctx.lineWidth = 2.5; ctx.beginPath();
      const upto = clamp01(t * 1.15);
      for (let p = 0; p <= upto; p += 0.01) {
        const x = lerp(x0, x1, p);
        const base = (1 - Math.exp(-p * 3)); // learning curve
        const noise = (r() - 0.5) * 0.12 * (1 - p);
        const y = lerp(y0, y1, clamp01(base + noise));
        if (p === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    },
  },

  // Multi-armed bandit: pulling arms, one slot pays out more over time.
  "multi-armed-bandit": {
    period: 5500,
    caption: {
      id: "Mencoba beberapa 'mesin slot'; agen belajar mana yang paling sering memberi reward.",
      en: "Trying several 'slot machines'; the agent learns which one pays out most often.",
    },
    draw(ctx, t, W, H) {
      const arms = 4, trueRate = [0.3, 0.75, 0.45, 0.55];
      const bw = 70, gap = 26, startX = (W - (arms * bw + (arms - 1) * gap)) / 2;
      const pull = Math.floor(t * 16) % arms === 1 ? 1 : Math.floor(t * 16) % arms; // favors best over time
      const best = trueRate.indexOf(Math.max(...trueRate));
      for (let a = 0; a < arms; a++) {
        const x = startX + a * (bw + gap);
        ctx.fillStyle = a === best && t > 0.5 ? "rgba(251,191,36,0.25)" : "rgba(148,163,184,0.12)";
        roundRect(ctx, x, 50, bw, H - 100, 10); ctx.fill();
        ctx.strokeStyle = a === best && t > 0.5 ? GOLD : SLATE; ctx.lineWidth = 2;
        roundRect(ctx, x, 50, bw, H - 100, 10); ctx.stroke();
        // estimated value bar
        const est = trueRate[a] * clamp01(t * 1.4);
        ctx.fillStyle = a === best ? GREEN : BLUE;
        ctx.fillRect(x + 14, 50 + (H - 100) - est * (H - 120), bw - 28, est * (H - 120));
        label(ctx, `#${a + 1}`, x + bw / 2, H - 36, SLATE, 11, "center");
      }
      // lever that pulls the current arm
      const px = startX + pull * (bw + gap) + bw / 2;
      dot(ctx, px, 40, 7, GOLD);
      if (t > 0.5) label(ctx, "best ✓", startX + best * (bw + gap) + bw / 2, 36, GOLD, 11, "center");
    },
  },

  // Maze value iteration: values ripple out from the exit.
  "rl-maze": {
    period: 6500,
    caption: {
      id: "Value iteration: nilai menyebar dari pintu keluar ke seluruh sel, membentuk peta jalan.",
      en: "Value iteration: values ripple out from the exit across all cells, forming a road map.",
    },
    draw(ctx, t, W, H) {
      const n = 6, cell = 38, gx = (W - n * cell) / 2, gy = (H - n * cell) / 2;
      const walls = new Set(["1,1", "1,2", "1,3", "3,2", "3,3", "3,4", "2,4"]);
      const exit = [0, 5];
      const wave = t * (n + 6);
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const key = `${i},${j}`;
        if (walls.has(key)) { ctx.fillStyle = "#334155"; ctx.fillRect(gx + j * cell, gy + i * cell, cell - 2, cell - 2); continue; }
        const d = Math.abs(i - exit[0]) + Math.abs(j - exit[1]);
        const v = d < wave ? Math.max(0, 1 - d / 10) : 0;
        ctx.fillStyle = `rgba(56,189,248,${0.08 + v * 0.65})`;
        ctx.fillRect(gx + j * cell, gy + i * cell, cell - 2, cell - 2);
      }
      ctx.fillStyle = GOLD; ctx.fillRect(gx + exit[1] * cell + 8, gy + exit[0] * cell + 8, cell - 18, cell - 18);
      label(ctx, "exit", gx + exit[1] * cell + cell / 2, gy + exit[0] * cell + cell / 2 + 4, "#0b1220", 9, "center");
    },
  },

  // CartPole: a pole balances on a moving cart, correcting itself.
  cartpole: {
    period: 4000,
    caption: {
      id: "Agen menyeimbangkan tiang: menggeser kereta kiri/kanan untuk mencegah tiang jatuh.",
      en: "The agent balances a pole: nudging the cart left/right to keep the pole from falling.",
    },
    draw(ctx, t, W, H) {
      const trackY = H - 60;
      ctx.strokeStyle = "rgba(148,163,184,0.5)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(40, trackY); ctx.lineTo(W - 40, trackY); ctx.stroke();
      // cart oscillates to correct the pole
      const cx = W / 2 + 80 * Math.sin(t * Math.PI * 2);
      const cartW = 70, cartH = 26;
      ctx.fillStyle = BLUE; roundRect(ctx, cx - cartW / 2, trackY - cartH, cartW, cartH, 6); ctx.fill();
      dot(ctx, cx - 20, trackY - 4, 8, "#1e293b", SLATE);
      dot(ctx, cx + 20, trackY - 4, 8, "#1e293b", SLATE);
      // pole tilts slightly, always corrected (small angle)
      const angle = 0.12 * Math.sin(t * Math.PI * 2 + 0.6);
      const px = cx + Math.sin(angle) * 90, py = trackY - cartH - Math.cos(angle) * 90;
      ctx.strokeStyle = GOLD; ctx.lineWidth = 6; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(cx, trackY - cartH); ctx.lineTo(px, py); ctx.stroke(); ctx.lineCap = "butt";
      dot(ctx, px, py, 9, RED);
      label(ctx, "balance ✓", cx, 30, GREEN, 12, "center");
    },
  },

  // Explore vs exploit: agent sometimes tries random, sometimes picks best.
  "explore-exploit": {
    period: 5000,
    caption: {
      id: "Dilema eksplorasi vs eksploitasi: kadang coba pilihan baru (ε), kadang ambil yang terbaik.",
      en: "Explore vs exploit: sometimes try a new option (ε), sometimes take the known best.",
    },
    draw(ctx, t, W, H) {
      const options = 5, bw = 44, gap = 20;
      const sx = (W - (options * bw + (options - 1) * gap)) / 2;
      const values = [0.4, 0.55, 0.9, 0.5, 0.35];
      const best = values.indexOf(Math.max(...values));
      // alternate exploring (random) and exploiting (best)
      const phase = t * 6;
      const exploring = Math.floor(phase) % 3 === 0;
      const r = rng(Math.floor(phase) + 1);
      const chosen = exploring ? Math.floor(r() * options) : best;
      for (let i = 0; i < options; i++) {
        const x = sx + i * (bw + gap);
        ctx.fillStyle = BLUE; ctx.globalAlpha = 0.5;
        ctx.fillRect(x, H - 50 - values[i] * 120, bw, values[i] * 120); ctx.globalAlpha = 1;
        if (i === chosen) {
          ctx.strokeStyle = exploring ? VIOLET : GOLD; ctx.lineWidth = 3;
          ctx.strokeRect(x - 3, H - 50 - values[i] * 120 - 3, bw + 6, values[i] * 120 + 6);
        }
      }
      label(ctx, exploring ? "🎲 EXPLORE (random)" : "🏆 EXPLOIT (best)", W / 2, 34, exploring ? VIOLET : GOLD, 13, "center");
    },
  },

  // Dynamic pricing: price adjusts with demand to maximize reward.
  "dynamic-pricing": {
    period: 6000,
    caption: {
      id: "Agen menyesuaikan harga mengikuti permintaan untuk memaksimalkan pendapatan (reward).",
      en: "The agent adjusts price with demand to maximize revenue (reward).",
    },
    draw(ctx, t, W, H) {
      const x0 = 50, y0 = H - 40, x1 = W - 30, y1 = 40;
      ctx.strokeStyle = "rgba(148,163,184,0.4)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, y1); ctx.lineTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
      // demand curve (sinusoidal) + price tracking it
      ctx.strokeStyle = BLUE; ctx.lineWidth = 2; ctx.beginPath();
      for (let p = 0; p <= 1; p += 0.02) {
        const x = lerp(x0, x1, p);
        const y = lerp(y0, y1, 0.5 + 0.3 * Math.sin(p * Math.PI * 3));
        if (p === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      label(ctx, "demand", x0 + 6, y1 + 6, BLUE, 11);
      // price adapts, drawn up to t
      ctx.strokeStyle = GOLD; ctx.lineWidth = 2.5; ctx.setLineDash([5, 4]); ctx.beginPath();
      const upto = clamp01(t * 1.1);
      for (let p = 0; p <= upto; p += 0.02) {
        const x = lerp(x0, x1, p);
        const y = lerp(y0, y1, 0.5 + 0.26 * Math.sin(p * Math.PI * 3 - 0.3));
        if (p === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.setLineDash([]);
      label(ctx, "price", x1, y1 + 6, GOLD, 11, "right");
    },
  },
};
