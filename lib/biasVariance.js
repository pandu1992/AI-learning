// Tiny from-scratch polynomial regression used by the Bias–Variance page.
// Fits y = w0 + w1 x + ... + wd x^d by least squares (normal equations with
// Gaussian elimination). Deterministic data so the visualization is stable.
// All pure JS — no libraries.

function rng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// True underlying function the models try to learn (a smooth non-linear curve).
export function trueFn(x) {
  return Math.sin(x * Math.PI * 1.1) * 0.6 + 0.1 * x;
}

// Generate train & test splits from the true function plus noise, x in [-1,1].
export function makeData(seed = 7, n = 22, noise = 0.18) {
  const r = rng(seed);
  const all = [];
  for (let i = 0; i < n; i++) {
    const x = -1 + (2 * i) / (n - 1) + (r() - 0.5) * 0.04;
    const y = trueFn(x) + (r() - 0.5) * 2 * noise;
    all.push({ x, y });
  }
  // interleave into train/test so both cover the range
  const train = all.filter((_, i) => i % 2 === 0);
  const test = all.filter((_, i) => i % 2 === 1);
  return { train, test };
}

// Vandermonde-based polynomial least squares. Returns coefficient array (len d+1).
export function polyfit(points, degree) {
  const d = degree;
  const X = points.map((p) => Array.from({ length: d + 1 }, (_, k) => p.x ** k));
  const y = points.map((p) => p.y);
  // Normal equations: (XᵀX) w = Xᵀy
  const XtX = Array.from({ length: d + 1 }, () => new Array(d + 1).fill(0));
  const Xty = new Array(d + 1).fill(0);
  for (let i = 0; i < X.length; i++) {
    for (let a = 0; a <= d; a++) {
      Xty[a] += X[i][a] * y[i];
      for (let b = 0; b <= d; b++) XtX[a][b] += X[i][a] * X[i][b];
    }
  }
  // tiny ridge term for numerical stability at high degree
  for (let a = 0; a <= d; a++) XtX[a][a] += 1e-6;
  return solve(XtX, Xty);
}

export function polyval(coef, x) {
  return coef.reduce((acc, c, k) => acc + c * x ** k, 0);
}

export function mse(coef, points) {
  if (!points.length) return 0;
  return points.reduce((a, p) => a + (polyval(coef, p.x) - p.y) ** 2, 0) / points.length;
}

// Gaussian elimination with partial pivoting.
function solve(A, b) {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col++) {
    let piv = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(M[r][col]) > Math.abs(M[piv][col])) piv = r;
    [M[col], M[piv]] = [M[piv], M[col]];
    const d = M[col][col] || 1e-9;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = M[r][col] / d;
      for (let c = col; c <= n; c++) M[r][c] -= f * M[col][c];
    }
  }
  return M.map((row, i) => row[n] / (M[i][i] || 1e-9));
}
