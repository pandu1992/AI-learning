// Loads external scripts (e.g. TensorFlow.js model libraries) on demand from a
// CDN. Used by the webcam vision demo so the heavy ML libraries are only
// fetched when the user actually opens that demo — keeping the rest of the
// static site lightweight. Each URL is loaded at most once (cached by src).

const loaded = new Map(); // src -> Promise<void>

export function loadScript(src) {
  if (typeof window === "undefined") return Promise.resolve();
  if (loaded.has(src)) return loaded.get(src);

  const p = new Promise((resolve, reject) => {
    // If a script tag with this src already exists, reuse it.
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)));
      return;
    }
    const el = document.createElement("script");
    el.src = src;
    el.async = true;
    el.crossOrigin = "anonymous";
    el.addEventListener("load", () => {
      el.dataset.loaded = "true";
      resolve();
    });
    el.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)));
    document.head.appendChild(el);
  });

  loaded.set(src, p);
  return p;
}

// Load a list of scripts sequentially (order matters for TF.js + model libs).
export async function loadScriptsSequential(srcs) {
  for (const s of srcs) {
    // eslint-disable-next-line no-await-in-loop
    await loadScript(s);
  }
}
