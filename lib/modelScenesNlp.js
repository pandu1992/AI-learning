// "How it works" animations for NLP/LLM demos (+ a couple of extras).
// Same scene contract as lib/modelScenes.js. Original canvas 2D, no assets.

const BLUE = "#38bdf8";
const RED = "#f87171";
const GREEN = "#34d399";
const GOLD = "#fbbf24";
const VIOLET = "#c4b5fd";
const PINK = "#f0abfc";
const SLATE = "#94a3b8";

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (x) => Math.max(0, Math.min(1, x));
function rng(seed) { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

function dot(ctx, x, y, r, fill, stroke = "#0b1220") {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = stroke; ctx.stroke();
}
function label(ctx, text, x, y, color = "#e2e8f0", size = 12, align = "left") {
  ctx.fillStyle = color; ctx.font = `600 ${size}px ui-sans-serif, system-ui, sans-serif`;
  ctx.textAlign = align; ctx.fillText(text, x, y); ctx.textAlign = "left";
}
function chip(ctx, text, x, y, w, h, fill, textColor = "#0b1220") {
  ctx.fillStyle = fill;
  ctx.beginPath();
  const r = 7;
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); ctx.fill();
  label(ctx, text, x + w / 2, y + h / 2 + 4, textColor, 12, "center");
}

export const nlpScenes = {
  // Sentiment (Naive Bayes on text): words tip a scale to positive/negative.
  "sentiment-naive-bayes": {
    period: 5500,
    caption: { id: "Tiap kata menambah bobot positif/negatif; totalnya menentukan sentimen kalimat.", en: "Each word adds positive/negative weight; the total decides the sentence's sentiment." },
    draw(ctx, t, W, H) {
      const words = [["film", 0], ["ini", 0], ["sangat", 0], ["bagus", 1], ["dan", 0], ["seru", 1]];
      const reveal = Math.floor(t * (words.length + 2));
      let x = 30;
      let score = 0;
      words.forEach((wd, i) => {
        const shown = i < reveal;
        const pos = wd[1] === 1;
        chip(ctx, wd[0], x, 36, 16 + wd[0].length * 9, 28, shown ? (pos ? "rgba(52,211,153,0.8)" : "rgba(148,163,184,0.6)") : "rgba(148,163,184,0.2)", "#0b1220");
        if (shown && pos) score += 1;
        x += 26 + wd[0].length * 9;
      });
      // scale tipping toward positive
      const cx = W / 2, cy = H - 70;
      const tilt = clamp01(score / 2) * 0.35;
      ctx.strokeStyle = GOLD; ctx.lineWidth = 4; ctx.lineCap = "round";
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-tilt);
      ctx.beginPath(); ctx.moveTo(-90, 0); ctx.lineTo(90, 0); ctx.stroke();
      dot(ctx, -90, 0, 10, RED); dot(ctx, 90, 0, 10, GREEN);
      ctx.restore(); ctx.lineCap = "butt";
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + 26); ctx.stroke();
      label(ctx, "negatif", cx - 90, cy + 42, RED, 11, "center");
      label(ctx, "positif", cx + 90, cy + 42, GREEN, 11, "center");
    },
  },

  // TF-IDF: a word's weight = frequency here × rareness across documents.
  tfidf: {
    period: 5500,
    caption: { id: "TF-IDF menilai kata: sering muncul di dokumen ini TAPI langka di dokumen lain = penting.", en: "TF-IDF scores a word: frequent in THIS doc but rare across others = important." },
    draw(ctx, t, W, H) {
      const terms = [["the", 0.1], ["data", 0.9], ["model", 0.7], ["is", 0.08], ["neural", 0.95]];
      const reveal = clamp01(t * 1.3);
      const bx = 60, bw = W - 140, by = 50, rowH = 34;
      terms.forEach((tm, i) => {
        const y = by + i * rowH;
        label(ctx, tm[0], 30, y + 16, "#e2e8f0", 13);
        ctx.fillStyle = "rgba(148,163,184,0.15)"; ctx.fillRect(bx, y + 4, bw, 16);
        ctx.fillStyle = tm[1] > 0.5 ? GOLD : SLATE;
        ctx.fillRect(bx, y + 4, bw * tm[1] * reveal, 16);
      });
      label(ctx, "high TF-IDF = distinctive", bx, by + terms.length * rowH + 16, GOLD, 11);
    },
  },

  // Tokenization: a sentence breaks into token chips.
  tokenization: {
    period: 5000,
    caption: { id: "Kalimat dipecah menjadi token (potongan kata) sebelum diproses model bahasa.", en: "A sentence is split into tokens (word pieces) before a language model processes it." },
    draw(ctx, t, W, H) {
      const toks = ["Belajar", "AI", "itu", "seru", "!"];
      label(ctx, "“Belajar AI itu seru!”", W / 2, 50, SLATE, 14, "center");
      label(ctx, "↓", W / 2, 78, GOLD, 18, "center");
      const reveal = Math.floor(t * (toks.length + 2));
      let x = 40;
      const y = 110;
      toks.forEach((tk, i) => {
        const w = 22 + tk.length * 10;
        if (i < reveal) chip(ctx, tk, x, y, w, 32, "rgba(56,189,248,0.8)");
        x += w + 10;
      });
      const reveal2 = Math.floor((t - 0.4) * (toks.length + 3));
      let x2 = 40;
      toks.forEach((tk, i) => {
        const w = 44;
        if (i < reveal2) { label(ctx, `#${1000 + i * 37}`, x2 + w / 2, y + 70, GREEN, 11, "center"); }
        x2 += (22 + tk.length * 10) + 10;
      });
      if (t > 0.5) label(ctx, "token IDs →", 40, y + 54, GREEN, 11);
    },
  },

  // Word embeddings: words placed in 2D; similar words cluster, with analogy vector.
  "word-embeddings": {
    period: 7000,
    caption: { id: "Kata jadi vektor: yang maknanya mirip berdekatan; arah vektor menangkap analogi.", en: "Words become vectors: similar meanings sit close; vector directions capture analogies." },
    draw(ctx, t, W, H) {
      const words = [["king", 150, 90, GOLD], ["queen", 210, 95, GOLD], ["man", 150, 180, BLUE], ["woman", 210, 185, BLUE], ["apple", 360, 110, GREEN], ["banana", 380, 160, GREEN]];
      for (const [w, x, y, c] of words) { dot(ctx, x, y, 6, c); label(ctx, w, x + 10, y + 4, "#e2e8f0", 11); }
      // analogy arrow king→queen ≈ man→woman, drawn with t
      const r = clamp01(t * 1.3);
      ctx.strokeStyle = PINK; ctx.lineWidth = 2;
      const arrow = (x1, y1, x2, y2) => {
        const ex = lerp(x1, x2, r), ey = lerp(y1, y2, r);
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(ex, ey); ctx.stroke();
        dot(ctx, ex, ey, 3, PINK, PINK);
      };
      arrow(150, 90, 210, 95); arrow(150, 180, 210, 185);
      if (t > 0.6) label(ctx, "king−man+woman ≈ queen", 40, H - 20, PINK, 11);
    },
  },

  // Attention: a query token attends to others with weighted links.
  attention: {
    period: 6000,
    caption: { id: "Attention menimbang kata mana paling relevan bagi kata saat ini (garis makin tebal = makin penting).", en: "Attention weighs which words matter most for the current word (thicker line = more important)." },
    draw(ctx, t, W, H) {
      const toks = ["The", "cat", "sat", "on", "the", "mat"];
      const y = 70, startX = 40, gap = (W - 80) / (toks.length - 1);
      const focus = Math.floor(t * toks.length) % toks.length;
      // weights: current token attends more to related ones
      const weights = toks.map((_, j) => Math.max(0.05, 1 - Math.abs(j - focus) * 0.3));
      toks.forEach((_, j) => {
        if (j === focus) return;
        ctx.strokeStyle = `rgba(251,191,36,${weights[j]})`;
        ctx.lineWidth = 1 + weights[j] * 5;
        ctx.beginPath(); ctx.moveTo(startX + focus * gap, y + 20); ctx.bezierCurveTo(startX + focus * gap, y + 90, startX + j * gap, y + 90, startX + j * gap, y + 20); ctx.stroke();
      });
      toks.forEach((tk, j) => {
        const w = 20 + tk.length * 9;
        chip(ctx, tk, startX + j * gap - w / 2, y - 14, w, 28, j === focus ? "rgba(52,211,153,0.9)" : "rgba(56,189,248,0.7)");
      });
      label(ctx, "query token attends to context", W / 2, H - 20, GOLD, 11, "center");
    },
  },

  // Next-token prediction: a probability distribution over candidate next words.
  "next-token": {
    period: 5500,
    caption: { id: "Model memprediksi kata BERIKUTNYA sebagai distribusi peluang; yang tertinggi dipilih.", en: "The model predicts the NEXT word as a probability distribution; the highest is picked." },
    draw(ctx, t, W, H) {
      label(ctx, "“Saya ingin belajar ___”", W / 2, 44, SLATE, 14, "center");
      const cands = [["AI", 0.46], ["coding", 0.24], ["matematika", 0.16], ["musik", 0.09], ["memasak", 0.05]];
      const reveal = clamp01((t - 0.2) * 1.6);
      const bx = 150, by = 70, rowH = 30;
      cands.forEach((c, i) => {
        const y = by + i * rowH;
        label(ctx, c[0], 40, y + 16, "#e2e8f0", 12);
        ctx.fillStyle = "rgba(148,163,184,0.15)"; ctx.fillRect(bx, y + 5, W - bx - 90, 16);
        ctx.fillStyle = i === 0 ? GREEN : BLUE;
        ctx.fillRect(bx, y + 5, (W - bx - 90) * c[1] * reveal, 16);
        label(ctx, `${Math.round(c[1] * 100)}%`, W - 40, y + 17, i === 0 ? GREEN : SLATE, 11, "right");
      });
    },
  },

  // NER: tokens get entity-type tags as a scan passes.
  ner: {
    period: 6000,
    caption: { id: "Tiap kata diberi label entitas (orang, lokasi, organisasi) berdasarkan konteks.", en: "Each word gets an entity label (person, location, organization) based on context." },
    draw(ctx, t, W, H) {
      const toks = [["Budi", "PER", GREEN], ["bekerja", "O", SLATE], ["di", "O", SLATE], ["BINUS", "ORG", GOLD], ["Jakarta", "LOC", BLUE]];
      const reveal = Math.floor(t * (toks.length + 2));
      let x = 30; const y = H / 2 - 20;
      toks.forEach((tk, i) => {
        const w = 24 + tk[0].length * 10;
        const tagged = i < reveal && tk[1] !== "O";
        chip(ctx, tk[0], x, y, w, 30, "rgba(56,189,248,0.7)");
        if (i < reveal && tk[1] !== "O") {
          ctx.fillStyle = tk[2]; ctx.fillRect(x, y + 36, w, 18);
          label(ctx, tk[1], x + w / 2, y + 49, "#0b1220", 10, "center");
        }
        x += w + 10;
      });
    },
  },

  // RAG: query → retrieve docs → grounded answer.
  "rag-chatbot": {
    period: 6500,
    caption: { id: "RAG: pertanyaan → ambil dokumen relevan → LLM menjawab berdasar dokumen itu.", en: "RAG: question → retrieve relevant documents → the LLM answers grounded in them." },
    draw(ctx, t, W, H) {
      const y = H / 2;
      chip(ctx, "❓ query", 20, y - 16, 90, 32, "rgba(56,189,248,0.8)");
      // docs
      const docs = ["📄", "📄", "📄"];
      const dx = W / 2 - 30;
      docs.forEach((d, i) => { const on = t > 0.25 && i <= t * 4 - 1; label(ctx, d, dx + i * 26, y - 30 + i * 0, on ? GOLD : "#475569", 20, "center"); });
      label(ctx, "retrieve", dx + 20, y - 46, GOLD, 10, "center");
      // arrows
      ctx.strokeStyle = SLATE; ctx.lineWidth = 2;
      if (t > 0.15) { ctx.beginPath(); ctx.moveTo(115, y); ctx.lineTo(dx - 14, y); ctx.stroke(); }
      if (t > 0.5) { ctx.beginPath(); ctx.moveTo(dx + 60, y); ctx.lineTo(W - 120, y); ctx.stroke(); }
      if (t > 0.6) chip(ctx, "✅ answer", W - 120, y - 16, 100, 32, "rgba(52,211,153,0.85)");
    },
  },

  // Agentic AI: ReAct loop Think→Act→Observe cycling.
  "agentic-ai": {
    period: 6000,
    caption: { id: "Agen LLM berputar: Berpikir → Aksi (pakai tool) → Amati hasil → ulangi sampai selesai.", en: "An LLM agent loops: Think → Act (use a tool) → Observe → repeat until done." },
    draw(ctx, t, W, H) {
      const cx = W / 2, cy = H / 2, R = 78;
      const steps = [["🧠 Think", GOLD], ["⚙️ Act", BLUE], ["👁 Observe", GREEN]];
      const active = Math.floor(t * 3) % 3;
      steps.forEach((s, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 3;
        const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
        ctx.fillStyle = i === active ? "rgba(251,191,36,0.2)" : "rgba(148,163,184,0.1)";
        ctx.beginPath(); ctx.arc(x, y, 34, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = i === active ? GOLD : SLATE; ctx.lineWidth = i === active ? 3 : 1.5;
        ctx.beginPath(); ctx.arc(x, y, 34, 0, Math.PI * 2); ctx.stroke();
        label(ctx, s[0], x, y + 4, "#e2e8f0", 11, "center");
      });
      // rotating arrow around the loop
      const aa = -Math.PI / 2 + t * Math.PI * 2;
      ctx.strokeStyle = GOLD; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, R, aa, aa + 1.6); ctx.stroke();
    },
  },

  // Transfer learning + NER: a pretrained base is fine-tuned on a small task.
  "transfer-ner": {
    period: 6000,
    caption: { id: "Transfer learning: model besar pra-latih + sedikit data tugas → fine-tune cepat & akurat.", en: "Transfer learning: a big pretrained model + a little task data → fast, accurate fine-tuning." },
    draw(ctx, t, W, H) {
      // big pretrained block
      ctx.fillStyle = "rgba(196,181,253,0.25)"; ctx.strokeStyle = VIOLET; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.rect(40, 50, 150, H - 100); ctx.fill(); ctx.stroke();
      label(ctx, "pretrained", 115, 42, VIOLET, 11, "center");
      label(ctx, "(huge corpus)", 115, H / 2, SLATE, 11, "center");
      // arrow
      ctx.strokeStyle = SLATE; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(200, H / 2); ctx.lineTo(250, H / 2); ctx.stroke();
      // small fine-tune head that fills in
      const fill = clamp01(t * 1.4);
      ctx.strokeStyle = GOLD; ctx.lineWidth = 2;
      ctx.strokeRect(260, 70, 120, H - 140);
      ctx.fillStyle = "rgba(251,191,36,0.3)"; ctx.fillRect(260, 70 + (H - 140) * (1 - fill), 120, (H - 140) * fill);
      label(ctx, "fine-tune (NER)", 320, 60, GOLD, 11, "center");
      if (t > 0.7) label(ctx, "small labeled data ✓", 320, H - 56, GREEN, 11, "center");
    },
  },

  // Text CNN: 1D convolution window slides over a sentence.
  "text-cnn": {
    period: 5500,
    caption: { id: "CNN 1D menggeser jendela n-gram di atas kalimat untuk menangkap frasa penting.", en: "A 1D CNN slides an n-gram window over the sentence to capture key phrases." },
    draw(ctx, t, W, H) {
      const toks = ["ini", "film", "yang", "sangat", "bagus", "sekali"];
      const y = H / 2 - 16, startX = 30, gap = (W - 60) / toks.length;
      toks.forEach((tk, j) => chip(ctx, tk, startX + j * gap, y, gap - 10, 30, "rgba(56,189,248,0.7)"));
      // sliding window of 3
      const span = toks.length - 2;
      const idx = Math.floor(t * span) % span;
      ctx.strokeStyle = GOLD; ctx.lineWidth = 3;
      ctx.strokeRect(startX + idx * gap - 3, y - 6, gap * 3 - 4, 42);
      label(ctx, "n-gram filter", startX + idx * gap + gap * 1.5 - 3, y - 14, GOLD, 11, "center");
    },
  },

  // RNN for text: hidden state passes left→right carrying memory.
  "rnn-text": {
    period: 6000,
    caption: { id: "RNN memproses kata berurutan; keadaan tersembunyi (memori) diteruskan ke langkah berikutnya.", en: "An RNN processes words in order; a hidden state (memory) is passed to the next step." },
    draw(ctx, t, W, H) {
      const toks = ["Saya", "suka", "belajar", "AI"];
      const y = H / 2, startX = 50, gap = (W - 100) / toks.length;
      const active = Math.min(toks.length - 1, Math.floor(t * toks.length));
      for (let j = 0; j < toks.length; j++) {
        const x = startX + j * gap;
        // hidden-state arrow to next
        if (j < toks.length - 1) {
          ctx.strokeStyle = j < active ? GOLD : "rgba(148,163,184,0.3)"; ctx.lineWidth = j < active ? 3 : 1.5;
          ctx.beginPath(); ctx.moveTo(x + 18, y); ctx.lineTo(x + gap - 18, y); ctx.stroke();
          if (j < active) label(ctx, "h", x + gap / 2, y - 8, GOLD, 11, "center");
        }
        dot(ctx, x, y, 16, j <= active ? BLUE : "rgba(148,163,184,0.3)");
        label(ctx, toks[j], x, y + 36, "#e2e8f0", 11, "center");
      }
      label(ctx, "memory flows →", W / 2, 40, GOLD, 11, "center");
    },
  },

  // Semi-supervised / active learning: model asks for the most useful labels.
  "active-learning": {
    period: 6000,
    caption: { id: "Active learning: model memilih titik paling membingungkan (dekat batas) untuk diberi label.", en: "Active learning: the model picks the most confusing points (near the boundary) to be labeled." },
    draw(ctx, t, W, H) {
      const r = rng(6);
      const cx = W / 2;
      // boundary
      ctx.strokeStyle = "rgba(226,232,240,0.6)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, 30); ctx.lineTo(cx, H - 30); ctx.stroke();
      const pts = Array.from({ length: 22 }, () => { const x = 40 + r() * (W - 80); return { x, y: 40 + r() * (H - 80), c: x < cx ? 0 : 1 }; });
      // the few near the boundary get "queried" (highlighted) as t progresses
      const nearIdx = pts.map((p, i) => ({ i, d: Math.abs(p.x - cx) })).sort((a, b) => a.d - b.d).slice(0, 3).map((o) => o.i);
      const queried = Math.floor(t * 4);
      pts.forEach((p, i) => {
        const isQuery = nearIdx.includes(i) && nearIdx.indexOf(i) < queried;
        if (isQuery) { dot(ctx, p.x, p.y, 8, GOLD, "#1e293b"); label(ctx, "?", p.x, p.y + 4, "#0b1220", 11, "center"); }
        else dot(ctx, p.x, p.y, 5, p.c === 0 ? BLUE : RED);
      });
      label(ctx, "label the most uncertain", W / 2, H - 16, GOLD, 11, "center");
    },
  },

  // NLU vs NLG: understand (text→meaning) then generate (meaning→text).
  "nlu-nlg": {
    period: 6500,
    caption: { id: "NLU memahami teks menjadi makna/niat; NLG membangkitkan teks baru dari makna itu.", en: "NLU turns text into meaning/intent; NLG generates new text from that meaning." },
    draw(ctx, t, W, H) {
      const y = H / 2;
      chip(ctx, "“pesan taksi”", 20, y - 16, 110, 32, "rgba(56,189,248,0.8)");
      if (t > 0.2) { ctx.strokeStyle = GOLD; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(135, y); ctx.lineTo(195, y); ctx.stroke(); label(ctx, "NLU", 165, y - 10, GOLD, 10, "center"); }
      if (t > 0.35) chip(ctx, "intent: BOOK_TAXI", 200, y - 16, 150, 32, "rgba(196,181,253,0.8)");
      if (t > 0.6) { ctx.strokeStyle = GREEN; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(355, y); ctx.lineTo(W - 150, y); ctx.stroke(); label(ctx, "NLG", (355 + W - 150) / 2, y - 10, GREEN, 10, "center"); }
      if (t > 0.75) chip(ctx, "“Taksi dalam 5 mnt”", W - 150, y - 16, 130, 32, "rgba(52,211,153,0.85)");
    },
  },

  // ===== extras =====
  // ROC / threshold: moving the threshold trades precision/recall; the ROC point moves.
  "roc-threshold": {
    period: 6000,
    caption: { id: "Menggeser ambang keputusan menggerakkan titik kerja di kurva ROC (trade-off TPR vs FPR).", en: "Moving the decision threshold slides the operating point along the ROC curve (TPR vs FPR trade-off)." },
    draw(ctx, t, W, H) {
      const x0 = 70, y0 = H - 50, size = Math.min(W - 160, H - 80);
      // axes
      ctx.strokeStyle = "rgba(148,163,184,0.5)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0, y0 - size); ctx.lineTo(x0, y0); ctx.lineTo(x0 + size, y0); ctx.stroke();
      label(ctx, "TPR", x0 - 6, y0 - size - 6, GREEN, 11);
      label(ctx, "FPR", x0 + size, y0 + 18, SLATE, 11, "right");
      // diagonal (random)
      ctx.strokeStyle = "rgba(148,163,184,0.4)"; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + size, y0 - size); ctx.stroke(); ctx.setLineDash([]);
      // ROC curve (concave)
      ctx.strokeStyle = GOLD; ctx.lineWidth = 2.5; ctx.beginPath();
      for (let p = 0; p <= 1; p += 0.02) {
        const fpr = p, tpr = Math.pow(p, 0.35);
        const x = x0 + fpr * size, y = y0 - tpr * size;
        if (p === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      // operating point sweeps with the threshold
      const p = 1 - t; // high threshold → low FPR
      const fpr = p, tpr = Math.pow(p, 0.35);
      dot(ctx, x0 + fpr * size, y0 - tpr * size, 8, GREEN, "#1e293b");
      label(ctx, "threshold →", x0 + size - 10, y0 - size + 10, GOLD, 11, "right");
    },
  },

  // Data dimensions: a cube rotates; features = axes; 4th dim as color.
  dimensions: {
    period: 7000,
    caption: { id: "Tiap fitur = satu sumbu (dimensi). Kubus 3D berputar; dimensi ke-4 ditunjukkan lewat warna.", en: "Each feature = one axis (dimension). A 3D cube rotates; a 4th dimension is shown via color." },
    draw(ctx, t, W, H) {
      const cx = W / 2, cy = H / 2, s = 70, a = t * Math.PI * 2;
      // cube vertices
      const verts = [];
      for (const dx of [-1, 1]) for (const dy of [-1, 1]) for (const dz of [-1, 1]) {
        const x = dx * s, z = dz * s;
        const rx = x * Math.cos(a) - z * Math.sin(a);
        const rz = x * Math.sin(a) + z * Math.cos(a);
        verts.push({ sx: cx + rx, sy: cy + dy * s * 0.9 - rz * 0.35, c4: (dx + dy + dz + 3) / 6 });
      }
      const edges = [[0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [4, 6], [5, 7], [6, 7]];
      ctx.strokeStyle = "rgba(148,163,184,0.6)"; ctx.lineWidth = 1.5;
      for (const [i, j] of edges) { ctx.beginPath(); ctx.moveTo(verts[i].sx, verts[i].sy); ctx.lineTo(verts[j].sx, verts[j].sy); ctx.stroke(); }
      for (const v of verts) dot(ctx, v.sx, v.sy, 6, `hsl(${200 + v.c4 * 140}, 80%, 60%)`);
      label(ctx, "x", cx + s + 12, cy, SLATE, 12); label(ctx, "y", cx, cy - s - 8, SLATE, 12);
      label(ctx, "4th dim = color", cx, H - 16, GOLD, 11, "center");
    },
  },
};
