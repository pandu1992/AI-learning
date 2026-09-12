"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "../LanguageProvider";

const W = 460;
const H = 260;

// Simple cart-pole physics. A tunable linear controller decides push direction.
// Students adjust the controller "gains" and watch how long the pole balances —
// illustrating how an RL agent's learned policy keeps the pole upright.
function initState() {
  return { x: 0, xDot: 0, theta: (Math.random() - 0.5) * 0.1, thetaDot: 0 };
}

export default function CartPoleDemo() {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const stateRef = useRef(initState());
  const rafRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [autoController, setAutoController] = useState(true);
  const [kAngle, setKAngle] = useState(12);
  const [kVel, setKVel] = useState(2);
  const [steps, setSteps] = useState(0);
  const [best, setBest] = useState(0);
  const manualForce = useRef(0);

  const draw = useCallback((s) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    // track
    const groundY = H - 50;
    ctx.strokeStyle = "#cbd5e1"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(20, groundY); ctx.lineTo(W - 20, groundY); ctx.stroke();

    const cartX = W / 2 + s.x * 100;
    const cartW = 60, cartH = 24;
    // cart
    ctx.fillStyle = "#0093D0";
    ctx.fillRect(cartX - cartW / 2, groundY - cartH, cartW, cartH);
    // pole
    const poleLen = 90;
    const px = cartX;
    const py = groundY - cartH;
    const ex = px + Math.sin(s.theta) * poleLen;
    const ey = py - Math.cos(s.theta) * poleLen;
    ctx.strokeStyle = "#dc2626"; ctx.lineWidth = 6; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.fillStyle = "#dc2626"; ctx.beginPath(); ctx.arc(ex, ey, 8, 0, Math.PI * 2); ctx.fill();
  }, []);

  const physics = useCallback((s, force) => {
    const g = 9.8, mc = 1, mp = 0.1, l = 0.5, dt = 0.02;
    const total = mc + mp;
    const sinT = Math.sin(s.theta), cosT = Math.cos(s.theta);
    const temp = (force + mp * l * s.thetaDot ** 2 * sinT) / total;
    const thetaAcc = (g * sinT - cosT * temp) / (l * (4 / 3 - (mp * cosT ** 2) / total));
    const xAcc = temp - (mp * l * thetaAcc * cosT) / total;
    return {
      x: s.x + dt * s.xDot,
      xDot: s.xDot + dt * xAcc,
      theta: s.theta + dt * s.thetaDot,
      thetaDot: s.thetaDot + dt * thetaAcc,
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    let localSteps = steps;
    const loop = () => {
      let s = stateRef.current;
      let force;
      if (autoController) {
        // linear policy: push in direction that corrects angle & angular velocity
        force = kAngle * s.theta + kVel * s.thetaDot > 0 ? 10 : -10;
      } else {
        force = manualForce.current * 10;
      }
      s = physics(s, force);
      stateRef.current = s;
      localSteps++;
      draw(s);

      // fail if pole falls or cart off screen
      if (Math.abs(s.theta) > 0.7 || Math.abs(s.x) > 2.2) {
        setBest((b) => Math.max(b, localSteps));
        setSteps(localSteps);
        stateRef.current = initState();
        localSteps = 0;
      } else {
        setSteps(localSteps);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, autoController, kAngle, kVel]);

  useEffect(() => { draw(stateRef.current); }, [draw]);

  const L = {
    id: { start: running ? "Jeda" : "Mulai", reset: "Reset", auto: "Kontroler otomatis (policy)", kAngle: "Bobot sudut", kVel: "Bobot kecepatan sudut", steps: "Langkah bertahan", best: "Rekor", manual: "Kontrol manual: klik kiri/kanan",
      hint: "CartPole adalah tugas RL klasik: jaga tiang tetap tegak dengan menggerakkan kereta. Dengan 'kontroler otomatis', sebuah policy linear sederhana mendorong kereta untuk mengoreksi kemiringan. Sesuaikan bobotnya — ini seperti parameter yang dipelajari agen RL agar bertahan lebih lama." },
    en: { start: running ? "Pause" : "Start", reset: "Reset", auto: "Auto controller (policy)", kAngle: "Angle weight", kVel: "Angular velocity weight", steps: "Steps balanced", best: "Best", manual: "Manual control: click left/right",
      hint: "CartPole is a classic RL task: keep the pole upright by moving the cart. With the 'auto controller', a simple linear policy pushes the cart to correct the tilt. Tune its weights — this is like the parameters an RL agent learns to balance longer." },
  }[lang];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm text-slate-600">{L.hint}</p>
      <canvas ref={canvasRef} width={W} height={H} className="w-full rounded-xl border border-slate-300 bg-slate-50" style={{ aspectRatio: `${W}/${H}` }} />

      {!autoController && (
        <div className="mt-3 flex justify-center gap-3">
          <button onMouseDown={() => (manualForce.current = -1)} onMouseUp={() => (manualForce.current = 0)} onMouseLeave={() => (manualForce.current = 0)} className="rounded-lg bg-slate-200 px-6 py-2 font-bold hover:bg-slate-300">←</button>
          <button onMouseDown={() => (manualForce.current = 1)} onMouseUp={() => (manualForce.current = 0)} onMouseLeave={() => (manualForce.current = 0)} className="rounded-lg bg-slate-200 px-6 py-2 font-bold hover:bg-slate-300">→</button>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={autoController} onChange={(e) => setAutoController(e.target.checked)} className="accent-brand-600" />
          {L.auto}
        </label>
        {autoController && (
          <>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-700">{L.kAngle}: {kAngle}</label>
              <input type="range" min="0" max="30" value={kAngle} onChange={(e) => setKAngle(Number(e.target.value))} className="w-full accent-brand-600" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-700">{L.kVel}: {kVel}</label>
              <input type="range" min="0" max="10" value={kVel} onChange={(e) => setKVel(Number(e.target.value))} className="w-full accent-brand-600" />
            </div>
          </>
        )}
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-3 text-center text-sm">
          <div><div className="text-slate-500">{L.steps}</div><div className="font-bold text-slate-800">{steps}</div></div>
          <div><div className="text-slate-500">{L.best}</div><div className="font-bold text-green-600">{best}</div></div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setRunning((r) => !r)} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">{L.start}</button>
          <button onClick={() => { setRunning(false); stateRef.current = initState(); setSteps(0); draw(stateRef.current); }} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">{L.reset}</button>
        </div>
      </div>
    </div>
  );
}
