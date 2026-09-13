"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "../LanguageProvider";
import { loadScript, loadScriptsSequential } from "@/lib/scriptLoader";

// On-device webcam Computer Vision demo with two modes:
//   1) Object detection  -> TensorFlow.js COCO-SSD (80 object classes)
//   2) Expression detection -> face-api.js (face + emotion)
// All inference runs in the browser on the user's device; no image/video is
// ever uploaded. Model libraries + weights load from public CDNs on demand.

const TFJS = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js";
const COCO_SSD = "https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js";
const FACE_API = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js";
const FACE_MODELS = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.13/model";

// Expression emoji + bilingual labels
const EXPR = {
  neutral: { emoji: "😐", id: "Netral", en: "Neutral" },
  happy: { emoji: "😊", id: "Senang", en: "Happy" },
  sad: { emoji: "😢", id: "Sedih", en: "Sad" },
  angry: { emoji: "😠", id: "Marah", en: "Angry" },
  surprised: { emoji: "😲", id: "Terkejut", en: "Terkejut" },
  fearful: { emoji: "😨", id: "Takut", en: "Fearful" },
  disgusted: { emoji: "🤢", id: "Jijik", en: "Disgusted" },
};

export default function WebcamVisionDemo() {
  const { lang } = useLang();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);
  const modelRef = useRef(null); // coco-ssd model instance
  const runningRef = useRef(false);

  const [mode, setMode] = useState("object"); // "object" | "expression"
  const [status, setStatus] = useState("idle"); // idle | loading | ready | running | error | denied
  const [errorMsg, setErrorMsg] = useState("");
  const [topExpr, setTopExpr] = useState(null); // {key, prob}
  const [objectCount, setObjectCount] = useState(0);

  const L = {
    id: {
      object: "Deteksi Objek", expression: "Deteksi Ekspresi",
      enable: "Aktifkan Kamera", stop: "Matikan Kamera",
      loading: "Memuat model AI…", ready: "Siap — mengarahkan…",
      allow: "Klik 'Aktifkan Kamera' lalu izinkan akses. Semua pemrosesan terjadi di perangkat Anda.",
      denied: "Akses kamera ditolak atau tidak tersedia. Periksa izin browser lalu coba lagi.",
      privacy: "🔒 Privasi: video diproses sepenuhnya di perangkat Anda (browser). Tidak ada gambar/video yang diunggah ke server mana pun.",
      objectsFound: "Objek terdeteksi", detected: "Ekspresi terdeteksi",
      needInternet: "Model dimuat dari internet saat pertama kali dijalankan.",
      switchHint: "Ganti mode akan memuat ulang model yang sesuai.",
      noFace: "Arahkan wajah ke kamera…",
    },
    en: {
      object: "Object Detection", expression: "Expression Detection",
      enable: "Enable Camera", stop: "Stop Camera",
      loading: "Loading AI model…", ready: "Ready — point the camera…",
      allow: "Click 'Enable Camera' and allow access. All processing happens on your device.",
      denied: "Camera access was denied or unavailable. Check browser permissions and try again.",
      privacy: "🔒 Privacy: video is processed entirely on your device (browser). No image/video is uploaded to any server.",
      objectsFound: "Objects detected", detected: "Detected expression",
      needInternet: "The model loads from the internet on first run.",
      switchHint: "Switching modes reloads the appropriate model.",
      noFace: "Point your face at the camera…",
    },
  }[lang];

  // ---- cleanup ----
  const stopEverything = useCallback(() => {
    runningRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    const c = canvasRef.current;
    if (c) c.getContext("2d").clearRect(0, 0, c.width, c.height);
    setStatus("idle");
    setTopExpr(null);
    setObjectCount(0);
  }, []);

  useEffect(() => () => stopEverything(), [stopEverything]);

  // ---- model loading ----
  const ensureModels = useCallback(async (m) => {
    if (m === "object") {
      await loadScriptsSequential([TFJS, COCO_SSD]);
      if (!modelRef.current) {
        // eslint-disable-next-line no-undef
        modelRef.current = await cocoSsd.load();
      }
    } else {
      await loadScript(FACE_API);
      // eslint-disable-next-line no-undef
      const faceapi = window.faceapi;
      if (!faceapi.nets.tinyFaceDetector.params) {
        await faceapi.nets.tinyFaceDetector.loadFromUri(FACE_MODELS);
        await faceapi.nets.faceExpressionNet.loadFromUri(FACE_MODELS);
      }
    }
  }, []);

  // ---- detection loop ----
  const runObjectLoop = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");

    const step = async () => {
      if (!runningRef.current) return;
      try {
        const predictions = await modelRef.current.detect(video);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setObjectCount(predictions.length);
        predictions.forEach((p) => {
          const [x, y, w, h] = p.bbox;
          ctx.strokeStyle = "#0093D0";
          ctx.lineWidth = 3;
          ctx.strokeRect(x, y, w, h);
          const label = `${p.class} ${Math.round(p.score * 100)}%`;
          ctx.font = "16px sans-serif";
          const tw = ctx.measureText(label).width + 10;
          ctx.fillStyle = "#0093D0";
          ctx.fillRect(x, y - 22, tw, 22);
          ctx.fillStyle = "#fff";
          ctx.fillText(label, x + 5, y - 6);
        });
      } catch {
        /* frame skipped */
      }
      rafRef.current = requestAnimationFrame(step);
    };
    step();
  }, []);

  const runExpressionLoop = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    // eslint-disable-next-line no-undef
    const faceapi = window.faceapi;
    const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.4 });

    const step = async () => {
      if (!runningRef.current) return;
      try {
        const result = await faceapi
          .detectSingleFace(video, options)
          .withFaceExpressions();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (result) {
          const { x, y, width, height } = result.detection.box;
          ctx.strokeStyle = "#F5A200";
          ctx.lineWidth = 3;
          ctx.strokeRect(x, y, width, height);
          // top expression
          const entries = Object.entries(result.expressions);
          entries.sort((a, b) => b[1] - a[1]);
          const [key, prob] = entries[0];
          setTopExpr({ key, prob });
          const info = EXPR[key];
          const label = `${info ? info.emoji : ""} ${info ? info[lang] : key} ${Math.round(prob * 100)}%`;
          ctx.font = "18px sans-serif";
          const tw = ctx.measureText(label).width + 12;
          ctx.fillStyle = "#F5A200";
          ctx.fillRect(x, y - 26, tw, 26);
          ctx.fillStyle = "#fff";
          ctx.fillText(label, x + 6, y - 8);
        } else {
          setTopExpr(null);
        }
      } catch {
        /* frame skipped */
      }
      rafRef.current = requestAnimationFrame(step);
    };
    step();
  }, [lang]);

  // ---- start ----
  const start = useCallback(async () => {
    setErrorMsg("");
    setStatus("loading");
    try {
      await ensureModels(mode);
    } catch (e) {
      setStatus("error");
      setErrorMsg(L.needInternet);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 480, height: 360 },
        audio: false,
      });
      streamRef.current = stream;
      const video = videoRef.current;
      video.srcObject = stream;
      await video.play();
      // match canvas to video size
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 480;
      canvas.height = video.videoHeight || 360;
      setStatus("running");
      runningRef.current = true;
      if (mode === "object") runObjectLoop();
      else runExpressionLoop();
    } catch (e) {
      setStatus("denied");
    }
  }, [mode, ensureModels, runObjectLoop, runExpressionLoop, L.needInternet]);

  // switching mode while running: stop then require re-enable
  const switchMode = (m) => {
    if (m === mode) return;
    stopEverything();
    setMode(m);
  };

  const isRunning = status === "running";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* mode toggle */}
      <div className="mb-4 inline-flex rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
        <button
          onClick={() => switchMode("object")}
          className={`rounded-md px-4 py-1.5 transition ${mode === "object" ? "bg-brand-600 text-white" : "text-slate-600"}`}
        >
          🎯 {L.object}
        </button>
        <button
          onClick={() => switchMode("expression")}
          className={`rounded-md px-4 py-1.5 transition ${mode === "expression" ? "bg-brand-600 text-white" : "text-slate-600"}`}
        >
          😊 {L.expression}
        </button>
      </div>

      <p className="mb-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">{L.privacy}</p>

      <div className="flex flex-col gap-4 lg:flex-row">
        {/* video + overlay */}
        <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-slate-300 bg-slate-900" style={{ aspectRatio: "4/3" }}>
          <video ref={videoRef} playsInline muted className="h-full w-full object-cover" style={{ transform: "scaleX(-1)" }} />
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ transform: "scaleX(-1)" }} />
          {status !== "running" && (
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-sm text-slate-300">
              {status === "loading" ? L.loading
                : status === "denied" ? L.denied
                : status === "error" ? errorMsg
                : L.allow}
            </div>
          )}
        </div>

        {/* controls + readout */}
        <div className="flex-1 space-y-4">
          {!isRunning ? (
            <button
              onClick={start}
              disabled={status === "loading"}
              className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
            >
              📷 {L.enable}
            </button>
          ) : (
            <button
              onClick={stopEverything}
              className="w-full rounded-lg border border-red-400 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              ⏹ {L.stop}
            </button>
          )}

          {mode === "object" && isRunning && (
            <div className="rounded-lg bg-slate-50 p-4 text-center">
              <div className="text-sm text-slate-500">{L.objectsFound}</div>
              <div className="text-3xl font-black text-brand-600">{objectCount}</div>
            </div>
          )}

          {mode === "expression" && isRunning && (
            <div className="rounded-lg bg-slate-50 p-4 text-center">
              <div className="text-sm text-slate-500">{L.detected}</div>
              {topExpr && EXPR[topExpr.key] ? (
                <>
                  <div className="text-5xl">{EXPR[topExpr.key].emoji}</div>
                  <div className="mt-1 font-bold text-brand-700">
                    {EXPR[topExpr.key][lang]} · {Math.round(topExpr.prob * 100)}%
                  </div>
                </>
              ) : (
                <div className="mt-2 text-sm text-slate-400">{L.noFace}</div>
              )}
            </div>
          )}

          <p className="text-xs text-slate-400">{L.switchHint}</p>
        </div>
      </div>
    </div>
  );
}
