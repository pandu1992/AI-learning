"use client";

// GIANT interactive AI robot for the HOME hero only (inspired by "eyes follow
// mouse" showpieces). A large humanoid whose whole HEAD turns/tilts toward the
// cursor, whose eyes track the pointer, and who REACTS when the cursor comes
// near (eyes widen, eyebrows raise, it smiles, glow intensifies) and when you
// CLICK (it waves + a happy pulse). It also greets in 5 languages
// (ID/ZH/JA/EN/AR) with a typewriter effect and optional speech synthesis.
//
// Hand-rolled SVG + CSS — no 3D library. Respects prefers-reduced-motion:
// head/eyes stop tracking, reactions are muted, greeting shows without typing.

import { useEffect, useRef, useState, useCallback } from "react";

const GREETINGS = [
  { code: "id", flag: "🇮🇩", label: "Indonesia", text: "Halo, apa kabar?", lang: "id-ID", rtl: false },
  { code: "zh", flag: "🇨🇳", label: "中文", text: "你好，你好吗？", lang: "zh-CN", rtl: false },
  { code: "ja", flag: "🇯🇵", label: "日本語", text: "こんにちは、お元気ですか？", lang: "ja-JP", rtl: false },
  { code: "en", flag: "🇬🇧", label: "English", text: "Hello, how are you?", lang: "en-US", rtl: false },
  { code: "ar", flag: "🇸🇦", label: "العربية", text: "مرحبا، كيف حالك؟", lang: "ar-SA", rtl: true },
];

export default function RobotGreeter() {
  const wrapRef = useRef(null);
  const headRef = useRef(null);
  const leftPupil = useRef(null);
  const rightPupil = useRef(null);
  const armRef = useRef(null);

  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [talking, setTalking] = useState(false);
  const [near, setNear] = useState(false); // cursor close to the robot
  const [waving, setWaving] = useState(false);
  const [speak, setSpeak] = useState(false);
  const speakRef = useRef(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // ---- head + eyes track the cursor; detect proximity ----
  useEffect(() => {
    const move = (e) => {
      if (reducedRef.current) return;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.4;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      // proximity: within ~1.1x the robot's own size feels "near"
      const isNear = dist < Math.max(r.width, r.height) * 0.9;
      setNear((prev) => (prev !== isNear ? isNear : prev));

      // whole-head turn/tilt (clamped)
      const rotY = Math.max(-16, Math.min(16, dx / 22)); // left/right turn
      const rotX = Math.max(-12, Math.min(12, -dy / 26)); // up/down nod
      if (headRef.current) {
        headRef.current.style.transform = `perspective(700px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg)`;
      }

      // pupils (travel a bit further for the giant eyes)
      const ang = Math.atan2(dy, dx);
      const pd = Math.min(7, dist / 55);
      const px = Math.cos(ang) * pd;
      const py = Math.sin(ang) * pd;
      if (leftPupil.current) leftPupil.current.setAttribute("transform", `translate(${px},${py})`);
      if (rightPupil.current) rightPupil.current.setAttribute("transform", `translate(${px},${py})`);
    };
    const leave = () => setNear(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, []);

  // ---- greeting cycle + typewriter ----
  useEffect(() => {
    const g = GREETINGS[idx];
    let i = 0;
    let typer, holdTimer, nextTimer;

    if (reducedRef.current) {
      setTyped(g.text);
      nextTimer = setTimeout(() => setIdx((n) => (n + 1) % GREETINGS.length), 3200);
      return () => clearTimeout(nextTimer);
    }

    setTyped("");
    setTalking(true);
    maybeSpeak(g);
    typer = setInterval(() => {
      i += 1;
      setTyped(g.text.slice(0, i));
      if (i >= g.text.length) {
        clearInterval(typer);
        setTalking(false);
        holdTimer = setTimeout(() => {
          nextTimer = setTimeout(() => setIdx((n) => (n + 1) % GREETINGS.length), 400);
        }, 1700);
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
      const v = synth.getVoices().find((vo) => vo.lang && vo.lang.toLowerCase().startsWith(g.code));
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
    if (next) maybeSpeak(GREETINGS[idx]);
    else if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  // ---- click reaction: wave the arm + happy pulse ----
  const onRobotClick = useCallback(() => {
    if (reducedRef.current) return;
    setWaving(true);
    setTimeout(() => setWaving(false), 1200);
  }, []);

  const g = GREETINGS[idx];
  // Eyes widen & smile when the cursor is near (or while talking).
  const expressive = near || talking;

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto flex w-full max-w-2xl flex-col items-center"
      onPointerDown={onRobotClick}
    >
      {/* speech bubble */}
      <div
        dir={g.rtl ? "rtl" : "ltr"}
        className="robot-bubble relative z-10 mb-2 min-h-[3.4rem] min-w-[15rem] max-w-sm rounded-2xl bg-white/95 px-6 py-3.5 text-center shadow-2xl ring-1 ring-white/40"
      >
        <span className="mr-1 text-lg">{g.flag}</span>
        <span className="text-xl font-extrabold text-brand-800">
          {typed}
          {talking && <span className="robot-caret">▍</span>}
        </span>
        <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white/95" />
      </div>

      {/* GIANT robot */}
      <div className={`robot-float relative select-none ${waving ? "robot-happy" : ""}`}>
        {/* glow behind */}
        <span
          className={`robot-glow pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/4 ${expressive ? "robot-glow-strong" : ""}`}
          aria-hidden="true"
        />
        <svg
          width="360"
          height="440"
          viewBox="0 0 360 440"
          className="h-[360px] w-auto drop-shadow-2xl sm:h-[420px]"
          aria-label="AI robot assistant"
          role="img"
        >
          {/* ===== BODY / TORSO ===== */}
          <g>
            {/* neck */}
            <rect x="160" y="238" width="40" height="28" rx="10" fill="#cbd5e1" />
            {/* shoulders/torso */}
            <path
              d="M96 300 Q96 262 140 258 L220 258 Q264 262 264 300 L264 404 Q264 424 244 424 L116 424 Q96 424 96 404 Z"
              fill="#eef4fb"
              stroke="#0093D0"
              strokeWidth="4"
            />
            {/* chest core */}
            <circle cx="180" cy="336" r="26" fill="#0b2436" />
            <circle cx="180" cy="336" r="15" fill="#33b3e4" className="robot-core" />
            <circle cx="180" cy="336" r="7" fill="#eaf8ff" />
            {/* chest vents */}
            <rect x="120" y="376" width="48" height="7" rx="3.5" fill="#cbd5e1" />
            <rect x="120" y="390" width="48" height="7" rx="3.5" fill="#cbd5e1" />
            <rect x="192" y="376" width="48" height="7" rx="3.5" fill="#cbd5e1" />
            <rect x="192" y="390" width="48" height="7" rx="3.5" fill="#cbd5e1" />

            {/* LEFT arm (static) */}
            <g>
              <rect x="70" y="284" width="26" height="86" rx="13" fill="#eef4fb" stroke="#0093D0" strokeWidth="4" />
              <circle cx="83" cy="378" r="15" fill="#0093D0" />
            </g>
            {/* RIGHT arm (waves on click) */}
            <g ref={armRef} className={`robot-arm ${waving ? "robot-arm-wave" : ""}`} style={{ transformOrigin: "277px 292px" }}>
              <rect x="264" y="284" width="26" height="86" rx="13" fill="#eef4fb" stroke="#0093D0" strokeWidth="4" />
              <circle cx="277" cy="378" r="15" fill="#F5A200" />
            </g>
          </g>

          {/* ===== HEAD (turns toward cursor) ===== */}
          <g ref={headRef} className="robot-head" style={{ transformOrigin: "180px 150px", transition: "transform 0.12s ease-out" }}>
            {/* antenna */}
            <line x1="180" y1="36" x2="180" y2="64" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
            <circle cx="180" cy="30" r="9" fill="#F5A200" className="robot-antenna" />
            {/* head shell */}
            <rect x="96" y="62" width="168" height="150" rx="38" fill="#eef4fb" stroke="#0093D0" strokeWidth="4" />
            {/* ears */}
            <rect x="80" y="112" width="16" height="50" rx="7" fill="#0093D0" />
            <rect x="264" y="112" width="16" height="50" rx="7" fill="#0093D0" />
            {/* face screen */}
            <rect x="116" y="86" width="128" height="104" rx="24" fill="#0b2436" />

            {/* eyebrows (raise when near) */}
            <rect
              x="138" y="108" width="34" height="7" rx="3.5" fill="#33b3e4"
              className="robot-brow" style={{ transform: expressive ? "translateY(-5px)" : "none", transition: "transform 0.2s ease" }}
            />
            <rect
              x="188" y="108" width="34" height="7" rx="3.5" fill="#33b3e4"
              className="robot-brow" style={{ transform: expressive ? "translateY(-5px)" : "none", transition: "transform 0.2s ease" }}
            />

            {/* eyes — scale up when expressive */}
            <g style={{ transformOrigin: "155px 134px", transform: expressive ? "scale(1.12)" : "scale(1)", transition: "transform 0.2s ease" }}>
              <circle cx="155" cy="134" r="18" fill="#0a1a28" stroke="#33b3e4" strokeWidth="2.5" />
              <g ref={leftPupil}>
                <circle cx="155" cy="134" r="9" fill="#66e0ff" className="robot-eye" />
                <circle cx="158.5" cy="130.5" r="3" fill="#ffffff" />
              </g>
            </g>
            <g style={{ transformOrigin: "205px 134px", transform: expressive ? "scale(1.12)" : "scale(1)", transition: "transform 0.2s ease" }}>
              <circle cx="205" cy="134" r="18" fill="#0a1a28" stroke="#33b3e4" strokeWidth="2.5" />
              <g ref={rightPupil}>
                <circle cx="205" cy="134" r="9" fill="#66e0ff" className="robot-eye" />
                <circle cx="208.5" cy="130.5" r="3" fill="#ffffff" />
              </g>
            </g>

            {/* mouth: smile arc when expressive, flat bar otherwise; vibrates while talking */}
            {expressive ? (
              <path d="M150 166 Q180 184 210 166" fill="none" stroke="#33b3e4" strokeWidth="6" strokeLinecap="round" className={talking ? "robot-mouth-talking" : ""} style={{ transformOrigin: "180px 170px" }} />
            ) : (
              <rect x="158" y="166" width="44" height="8" rx="4" fill="#33b3e4" />
            )}
          </g>
        </svg>
      </div>

      {/* language dots + speak toggle */}
      <div className="mt-3 flex items-center gap-3">
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
          onClick={(e) => { e.stopPropagation(); toggleSpeak(); }}
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
