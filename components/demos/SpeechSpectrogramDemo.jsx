"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "../LanguageProvider";

// Speech & Spectrogram — on-device audio demo.
//  - Web Audio API (AnalyserNode + mic) -> scrolling spectrogram + waveform.
//  - Web Speech API (SpeechRecognition) -> live transcript (where supported).
// All processing is local; no audio is uploaded. Model-free (browser built-ins).

export default function SpeechSpectrogramDemo() {
  const { lang } = useLang();
  const specRef = useRef(null);
  const waveRef = useRef(null);
  const streamRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const rafRef = useRef(null);
  const recognitionRef = useRef(null);
  const runningRef = useRef(false);

  const [status, setStatus] = useState("idle"); // idle | running | denied
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [sttSupported, setSttSupported] = useState(true);
  const [level, setLevel] = useState(0); // 0..1 loudness

  const L = {
    id: {
      hint: "Suara adalah data! Mikrofon menangkap gelombang suara; AI mengubahnya jadi SPEKTROGRAM (gambar frekuensi vs waktu) — lalu diproses mirip gambar oleh model. Coba ucapkan sesuatu dan lihat gelombang, spektrogram, serta transkripnya.",
      enable: "Aktifkan Mikrofon", stop: "Matikan Mikrofon",
      allow: "Klik 'Aktifkan Mikrofon' lalu izinkan akses. Semua diproses di perangkat Anda.",
      denied: "Akses mikrofon ditolak atau tidak tersedia. Periksa izin browser lalu coba lagi.",
      privacy: "🔒 Privasi: audio diproses sepenuhnya di perangkat Anda. Tidak ada suara yang diunggah.",
      waveform: "Gelombang (waveform)", spectrogram: "Spektrogram (frekuensi × waktu)",
      transcript: "Transkrip ucapan", listening: "Mendengarkan…", sttNo: "Pengenalan suara tidak didukung di browser ini (coba Chrome). Spektrogram & gelombang tetap berfungsi.",
      loud: "Tingkat suara",
      specHint: "Sumbu-X = waktu (bergulir ke kiri), sumbu-Y = frekuensi (rendah di bawah), warna = kekuatan. Vokal & konsonan punya pola berbeda.",
      note: "Model suara (mis. Whisper) biasanya mengubah audio jadi spektrogram lalu memakai jaringan saraf — jadi 'mendengar' sebenarnya banyak memakai teknik 'melihat' gambar.",
    },
    en: {
      hint: "Sound is data! A microphone captures sound waves; AI turns them into a SPECTROGRAM (an image of frequency vs time) — then processes it much like an image. Try speaking and watch the waveform, spectrogram, and transcript.",
      enable: "Enable Microphone", stop: "Stop Microphone",
      allow: "Click 'Enable Microphone' and allow access. Everything is processed on your device.",
      denied: "Microphone access was denied or unavailable. Check browser permissions and try again.",
      privacy: "🔒 Privacy: audio is processed entirely on your device. No sound is uploaded.",
      waveform: "Waveform", spectrogram: "Spectrogram (frequency × time)",
      transcript: "Speech transcript", listening: "Listening…", sttNo: "Speech recognition isn't supported in this browser (try Chrome). The spectrogram & waveform still work.",
      loud: "Sound level",
      specHint: "X-axis = time (scrolls left), Y-axis = frequency (low at bottom), color = strength. Vowels & consonants show different patterns.",
      note: "Speech models (e.g. Whisper) typically convert audio into a spectrogram then use neural networks — so 'hearing' actually borrows a lot from 'seeing' images.",
    },
  }[lang];

  const stopEverything = useCallback(() => {
    runningRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
      recognitionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch {}
      audioCtxRef.current = null;
    }
    analyserRef.current = null;
    setStatus("idle");
    setInterim("");
    setLevel(0);
  }, []);

  useEffect(() => () => stopEverything(), [stopEverything]);

  const draw = useCallback(() => {
    const analyser = analyserRef.current;
    const spec = specRef.current;
    const wave = waveRef.current;
    if (!analyser || !spec || !wave) return;
    const specCtx = spec.getContext("2d");
    const waveCtx = wave.getContext("2d");
    const freqBins = analyser.frequencyBinCount;
    const freqData = new Uint8Array(freqBins);
    const timeData = new Uint8Array(analyser.fftSize);

    const step = () => {
      if (!runningRef.current) return;
      analyser.getByteFrequencyData(freqData);
      analyser.getByteTimeDomainData(timeData);

      // ---- spectrogram: scroll left by 2px, draw newest column on the right ----
      const SW = spec.width, SH = spec.height;
      const col = 2;
      const img = specCtx.getImageData(col, 0, SW - col, SH);
      specCtx.putImageData(img, 0, 0);
      // newest column(s)
      const useBins = Math.floor(freqBins * 0.7); // ignore very high empty bins
      for (let y = 0; y < SH; y++) {
        const bin = Math.floor(((SH - 1 - y) / SH) * useBins); // low freq at bottom
        const v = freqData[bin] / 255; // 0..1
        // color map: dark blue -> cyan -> yellow
        const hue = 220 - v * 160; // 220(blue) -> 60(yellow)
        const light = 10 + v * 55;
        specCtx.fillStyle = `hsl(${hue}, 90%, ${light}%)`;
        specCtx.fillRect(SW - col, y, col, 1);
      }

      // ---- waveform ----
      const WW = wave.width, WH = wave.height;
      waveCtx.clearRect(0, 0, WW, WH);
      waveCtx.strokeStyle = "#0093D0";
      waveCtx.lineWidth = 2;
      waveCtx.beginPath();
      let sum = 0;
      for (let i = 0; i < timeData.length; i++) {
        const t = timeData[i] / 128 - 1; // -1..1
        sum += t * t;
        const x = (i / timeData.length) * WW;
        const y = WH / 2 + t * (WH / 2) * 0.9;
        if (i === 0) waveCtx.moveTo(x, y); else waveCtx.lineTo(x, y);
      }
      waveCtx.stroke();
      setLevel(Math.min(1, Math.sqrt(sum / timeData.length) * 3));

      rafRef.current = requestAnimationFrame(step);
    };
    step();
  }, []);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.6;
      source.connect(analyser);
      analyserRef.current = analyser;

      // clear spectrogram canvas
      const spec = specRef.current;
      spec.getContext("2d").clearRect(0, 0, spec.width, spec.height);

      setStatus("running");
      runningRef.current = true;
      draw();

      // ---- speech recognition (optional) ----
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SR) {
        setSttSupported(true);
        const rec = new SR();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = lang === "id" ? "id-ID" : "en-US";
        rec.onresult = (e) => {
          let fin = "", inter = "";
          for (let i = e.resultIndex; i < e.results.length; i++) {
            const txt = e.results[i][0].transcript;
            if (e.results[i].isFinal) fin += txt + " ";
            else inter += txt;
          }
          if (fin) setTranscript((t) => (t + fin).slice(-800));
          setInterim(inter);
        };
        rec.onerror = () => {};
        rec.onend = () => { if (runningRef.current) { try { rec.start(); } catch {} } };
        try { rec.start(); } catch {}
        recognitionRef.current = rec;
      } else {
        setSttSupported(false);
      }
    } catch (e) {
      setStatus("denied");
    }
  }, [draw, lang]);

  const isRunning = status === "running";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-3 text-sm text-slate-600">{L.hint}</p>
      <p className="mb-4 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">{L.privacy}</p>

      <div className="flex flex-col gap-4 lg:flex-row">
        {/* visuals */}
        <div className="w-full max-w-lg space-y-3">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{L.waveform}</p>
            <canvas ref={waveRef} width={480} height={90} className="w-full rounded-lg border border-slate-300 bg-slate-900" style={{ aspectRatio: "480/90" }} />
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{L.spectrogram}</p>
            <canvas ref={specRef} width={480} height={220} className="w-full rounded-lg border border-slate-300 bg-slate-900" style={{ aspectRatio: "480/220" }} />
            <p className="mt-1 text-[11px] text-slate-400">{L.specHint}</p>
          </div>
        </div>

        {/* controls + transcript */}
        <div className="flex-1 space-y-4">
          {!isRunning ? (
            <button onClick={start} className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
              🎤 {L.enable}
            </button>
          ) : (
            <button onClick={stopEverything} className="w-full rounded-lg border border-red-400 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">
              ⏹ {L.stop}
            </button>
          )}

          {status === "denied" && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{L.denied}</p>}
          {status === "idle" && <p className="text-sm text-slate-400">{L.allow}</p>}

          {isRunning && (
            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                <span>🔊 {L.loud}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${Math.round(level * 100)}%` }} />
              </div>
            </div>
          )}

          {isRunning && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{L.transcript}</div>
              {sttSupported ? (
                <p className="min-h-[4rem] text-sm text-slate-700">
                  {transcript}
                  <span className="text-slate-400">{interim}</span>
                  {!transcript && !interim && <span className="text-slate-400">{L.listening}</span>}
                </p>
              ) : (
                <p className="text-xs text-amber-700">{L.sttNo}</p>
              )}
            </div>
          )}

          <p className="rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-500">💡 {L.note}</p>
        </div>
      </div>
    </div>
  );
}
