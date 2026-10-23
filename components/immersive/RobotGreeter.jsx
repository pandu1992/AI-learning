"use client";

// A friendly AI robot for the HOME hero only. Its eyes follow the cursor, it
// blinks, and it cycles a multilingual greeting (ID → ZH → JA → EN → AR) with a
// typewriter effect. Optionally speaks each greeting via the Web Speech API
// (off by default; toggled by a button — speech needs a user gesture and voices
// vary by device). Everything is hand-rolled SVG/CSS — no 3D library.
//
// Respects prefers-reduced-motion: eyes stop tracking and the greeting simply
// shows (no typing), so it stays readable without motion.

import { useEffect, useRef, useState } from "react";

const GREETINGS = [
  { code: "id", flag: "🇮🇩", label: "Indonesia", text: "Halo, apa kabar?", lang: "id-ID", rtl: false },
  { code: "zh", flag: "🇨🇳", label: "中文", text: "你好，你好吗？", lang: "zh-CN", rtl: false },
  { code: "ja", flag: "🇯🇵", label: "日本語", text: "こんにちは、お元気ですか？", lang: "ja-JP", rtl: false },
  { code: "en", flag: "🇬🇧", label: "English", text: "Hello, how are you?", lang: "en-US", rtl: false },
  { code: "ar", flag: "🇸🇦", label: "العربية", text: "مرحبا، كيف حالك؟", lang: "ar-SA", rtl: true },
];

export default function RobotGreeter() {
  const wrapRef = useRef(null);
  const leftPupil = useRef(null);
  const rightPupil = useRef(null);
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [speak, setSpeak] = useState(false);
  const [talking, setTalking] = useState(false);
  const speakRef = useRef(false);

  const reducedRef = useRef(false);
  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // ---- eyes follow the cursor ----
  useEffect(() => {
    const move = (e) => {
      if (reducedRef.current) return;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.42; // eye line
      const ang = Math.atan2(e.clientY - cy, e.clientX - cx);
      const dist = Math.min(
        4,
        Math.hypot(e.clientX - cx, e.clientY - cy) / 60
      ); // max pupil travel
      const dx = Math.cos(ang) * dist;
      const dy = Math.sin(ang) * dist;
      if (leftPupil.current)
        leftPupil.current.setAttribute("transform", `translate(${dx},${dy})`);
      if (rightPupil.current)
        rightPupil.current.setAttribute("transform", `translate(${dx},${dy})`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // ---- cycle greetings with a typewriter effect ----
  useEffect(() => {
    const g = GREETINGS[idx];
    let i = 0;
    let typer;
    let holdTimer;
    let nextTimer;

    if (reducedRef.current) {
      // no typing animation under reduced-motion
      setTyped(g.text);
      nextTimer = setTimeout(() => setIdx((n) => (n + 1) % GREETINGS.length), 3200);
      return () => clearTimeout(nextTimer);
    }

    setTyped("");
    setTalking(true);
    // speak this greeting if enabled
    maybeSpeak(g);
    typer = setInterval(() => {
      i += 1;
      setTyped(g.text.slice(0, i));
      if (i >= g.text.length) {
        clearInterval(typer);
        setTalking(false);
        holdTimer = setTimeout(() => {
          nextTimer = setTimeout(() => setIdx((n) => (n + 1) % GREETINGS.length), 400);
        }, 1600);
      }
    }, 70);

    return () => {
      clearInterval(typer);
      clearTimeout(holdTimer);
      clearTimeout(nextTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const maybeSpeak = (g) => {
    if (!speakRef.current) return;
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(g.text);
      u.lang = g.lang;
      u.rate = 0.95;
      u.pitch = 1.1;
      // try to pick a matching voice
      const voices = synth.getVoices();
      const v = voices.find((vo) => vo.lang && vo.lang.toLowerCase().startsWith(g.code));
      if (v) u.voice = v;
      synth.speak(u);
    } catch {
      /* ignore */
    }
  };

  const toggleSpeak = () => {
    const next = !speak;
    setSpeak(next);
    speakRef.current = next;
    if (next) {
      // speak current greeting immediately (counts as the user gesture)
      maybeSpeak(GREETINGS[idx]);
    } else if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const g = GREETINGS[idx];

  return (
    <div ref={wrapRef} className="relative mx-auto flex max-w-md flex-col items-center">
      {/* speech bubble */}
      <div
        dir={g.rtl ? "rtl" : "ltr"}
        className="robot-bubble relative mb-4 min-h-[3.2rem] min-w-[14rem] max-w-xs rounded-2xl bg-white/95 px-5 py-3 text-center shadow-xl ring-1 ring-white/40"
      >
        <span className="mr-1 text-base">{g.flag}</span>
        <span className="text-lg font-bold text-brand-800">
          {typed}
          {talking && <span className="robot-caret">▍</span>}
        </span>
        {/* little tail */}
        <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white/95" />
      </div>

      {/* the robot */}
      <div className="robot-float relative">
        <svg width="190" height="200" viewBox="0 0 190 200" aria-hidden="true" className="drop-shadow-2xl">
          {/* antenna */}
          <line x1="95" y1="20" x2="95" y2="42" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
          <circle cx="95" cy="16" r="7" fill="#F5A200" className="robot-antenna" />

          {/* head */}
          <rect x="34" y="40" width="122" height="104" rx="26" fill="#eef4fb" stroke="#0093D0" strokeWidth="3" />
          {/* side ears */}
          <rect x="22" y="76" width="12" height="34" rx="5" fill="#0093D0" />
          <rect x="156" y="76" width="12" height="34" rx="5" fill="#0093D0" />

          {/* face screen */}
          <rect x="50" y="58" width="90" height="56" rx="16" fill="#0b2436" />

          {/* eyes */}
          <g>
            <circle cx="76" cy="84" r="13" fill="#0a1a28" stroke="#33b3e4" strokeWidth="2" />
            <g ref={leftPupil}>
              <circle cx="76" cy="84" r="6.5" fill="#66e0ff" className="robot-eye" />
              <circle cx="78.5" cy="81.5" r="2" fill="#ffffff" />
            </g>
          </g>
          <g>
            <circle cx="114" cy="84" r="13" fill="#0a1a28" stroke="#33b3e4" strokeWidth="2" />
            <g ref={rightPupil}>
              <circle cx="114" cy="84" r="6.5" fill="#66e0ff" className="robot-eye" />
              <circle cx="116.5" cy="81.5" r="2" fill="#ffffff" />
            </g>
          </g>

          {/* mouth — animates while talking */}
          <rect
            x="78"
            y="124"
            width="34"
            height="8"
            rx="4"
            fill="#33b3e4"
            className={talking ? "robot-mouth-talking" : ""}
          />

          {/* neck + body hint */}
          <rect x="86" y="144" width="18" height="12" fill="#cbd5e1" />
          <rect x="52" y="156" width="86" height="34" rx="14" fill="#eef4fb" stroke="#0093D0" strokeWidth="3" />
          <circle cx="95" cy="173" r="7" fill="#F5A200" className="robot-core" />
        </svg>

        {/* glow ring behind the robot */}
        <span className="robot-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      </div>

      {/* language dots + speak toggle */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex gap-1.5">
          {GREETINGS.map((gg, i) => (
            <span
              key={gg.code}
              className={`h-2 w-2 rounded-full transition ${i === idx ? "bg-white" : "bg-white/40"}`}
              title={gg.label}
            />
          ))}
        </div>
        <button
          onClick={toggleSpeak}
          aria-pressed={speak}
          className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur transition ${
            speak ? "border-amber-300 bg-amber-400 text-slate-900" : "border-white/50 text-white hover:bg-white/10"
          }`}
        >
          {speak ? "🔊 Robot bersuara" : "🔈 Suarakan robot"}
        </button>
      </div>
    </div>
  );
}
