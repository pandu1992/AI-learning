"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLang } from "../LanguageProvider";
import { loadScript, loadScriptsSequential } from "@/lib/scriptLoader";

// On-device webcam Computer Vision demo with five modes:
//   1) Object detection    -> TensorFlow.js COCO-SSD (80 object classes)
//   2) Expression detection -> face-api.js (face + emotion)
//   3) Face skeleton        -> MediaPipe FaceLandmarker (468-point face mesh)
//   4) Hand skeleton        -> MediaPipe HandLandmarker (21 landmarks/hand) + raised-finger count
//   5) Body pose skeleton   -> MediaPipe PoseLandmarker (33 full-body landmarks)
// All inference runs in the browser on the user's device; no image/video is
// ever uploaded. Model libraries + weights load from public CDNs on demand.

const TFJS = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js";
const COCO_SSD = "https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js";
const FACE_API = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js";
const FACE_MODELS = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.13/model";

// MediaPipe Tasks Vision (ESM) + model + wasm
const MP_VISION_ESM = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";
const MP_WASM = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const FACE_LANDMARKER_MODEL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
const HAND_LANDMARKER_MODEL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
const POSE_LANDMARKER_MODEL =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";

// Expression emoji + bilingual labels
const EXPR = {
  neutral: { emoji: "😐", id: "Netral", en: "Neutral" },
  happy: { emoji: "😊", id: "Senang", en: "Happy" },
  sad: { emoji: "😢", id: "Sedih", en: "Sad" },
  angry: { emoji: "😠", id: "Marah", en: "Angry" },
  surprised: { emoji: "😲", id: "Terkejut", en: "Surprised" },
  fearful: { emoji: "😨", id: "Takut", en: "Fearful" },
  disgusted: { emoji: "🤢", id: "Jijik", en: "Disgusted" },
};

// Hand skeleton connections (MediaPipe 21-landmark topology)
const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], // thumb
  [0, 5], [5, 6], [6, 7], [7, 8], // index
  [5, 9], [9, 10], [10, 11], [11, 12], // middle
  [9, 13], [13, 14], [14, 15], [15, 16], // ring
  [13, 17], [17, 18], [18, 19], [19, 20], // pinky
  [0, 17], // palm base
];

// Analyze a hand's 21 landmarks (normalized x,y) -> which fingers are up.
// Returns { fingers: [thumb,index,middle,ring,pinky] booleans, count }.
// Four fingers: tip is "up" if its y is above the PIP joint (smaller y = higher).
// Thumb: compared horizontally against its IP joint, direction depends on handedness.
function analyzeHand(lm, handedness) {
  const four = [[8, 6], [12, 10], [16, 14], [20, 18]]; // index, middle, ring, pinky
  const up = four.map(([tip, pip]) => lm[tip].y < lm[pip].y - 0.02);
  const isRight = handedness === "Right";
  const thumbUp = isRight ? lm[4].x < lm[3].x : lm[4].x > lm[3].x;
  const fingers = [thumbUp, ...up]; // [thumb, index, middle, ring, pinky]
  return { fingers, count: fingers.filter(Boolean).length };
}

function countRaisedFingers(lm, handedness) {
  return analyzeHand(lm, handedness).count;
}

// Classify a hand gesture from the up/down pattern (+ thumb orientation).
// Returns { emoji, id, en } or null. Uses finger booleans [thumb,i,m,r,p].
function classifyGesture(lm, handedness) {
  const { fingers } = analyzeHand(lm, handedness);
  const [thumb, index, middle, ring, pinky] = fingers;
  const key = fingers.map((b) => (b ? 1 : 0)).join("");

  // open palm
  if (key === "11111") return { emoji: "✋", id: "Telapak terbuka", en: "Open palm" };
  // fist (all down) — distinguish thumbs up/down by thumb tip vs wrist y
  if (key === "00000" || key === "10000") {
    if (thumb) {
      // thumb extended + all curled: up or down based on thumb tip (4) vs index MCP (5)
      const thumbsDown = lm[4].y > lm[5].y + 0.04;
      if (thumbsDown) return { emoji: "👎", id: "Jempol ke bawah", en: "Thumbs down" };
      return { emoji: "👍", id: "Jempol ke atas", en: "Thumbs up" };
    }
    return { emoji: "✊", id: "Kepalan", en: "Fist" };
  }
  // victory / peace: index + middle up, others down
  if (index && middle && !ring && !pinky) return { emoji: "✌️", id: "Damai / V", en: "Peace / V" };
  // pointing: only index
  if (index && !middle && !ring && !pinky && !thumb) return { emoji: "☝️", id: "Menunjuk", en: "Pointing" };
  // rock / love: thumb + index + pinky
  if (thumb && index && !middle && !ring && pinky) return { emoji: "🤟", id: "Love / Rock", en: "Love / Rock" };
  // call me: thumb + pinky
  if (thumb && !index && !middle && !ring && pinky) return { emoji: "🤙", id: "Call me", en: "Call me" };
  // three
  if (!thumb && index && middle && ring && !pinky) return { emoji: "3️⃣", id: "Tiga", en: "Three" };
  return null;
}

// Body pose skeleton connections (MediaPipe Pose 33-landmark topology — torso + limbs).
const POSE_CONNECTIONS = [
  [11, 12], [11, 23], [12, 24], [23, 24], // torso
  [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], // left arm + hand
  [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], // right arm + hand
  [23, 25], [25, 27], [27, 29], [27, 31], [29, 31], // left leg + foot
  [24, 26], [26, 28], [28, 30], [28, 32], [30, 32], // right leg + foot
];

export default function WebcamVisionDemo() {
  const { lang } = useLang();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);
  const modelRef = useRef(null); // coco-ssd model instance
  const faceLandmarkerRef = useRef(null); // MediaPipe FaceLandmarker
  const handLandmarkerRef = useRef(null); // MediaPipe HandLandmarker
  const poseLandmarkerRef = useRef(null); // MediaPipe PoseLandmarker
  const drawUtilsRef = useRef(null); // MediaPipe DrawingUtils + connectors
  const runningRef = useRef(false);

  const [mode, setMode] = useState("object"); // object | expression | facemesh | hand | pose
  const [status, setStatus] = useState("idle"); // idle | loading | ready | running | error | denied
  const [errorMsg, setErrorMsg] = useState("");
  const [topExpr, setTopExpr] = useState(null); // {key, prob}
  const [objectCount, setObjectCount] = useState(0);
  const [faceDetected, setFaceDetected] = useState(false);
  const [handCount, setHandCount] = useState(0);
  const [fingerCount, setFingerCount] = useState(0); // total raised fingers across hands
  const [gesture, setGesture] = useState(null); // {emoji,id,en} for first hand
  const [poseDetected, setPoseDetected] = useState(false);
  const [exercise, setExercise] = useState("handsup"); // handsup | squat
  const [reps, setReps] = useState(0);
  const repPhaseRef = useRef("down"); // state machine: "down" | "up"
  const exerciseRef = useRef("handsup"); // mirror of `exercise` for the RAF loop

  const L = {
    id: {
      object: "Deteksi Objek", expression: "Deteksi Ekspresi", facemesh: "Kerangka Wajah", hand: "Kerangka Tangan", pose: "Pose Tubuh",
      enable: "Aktifkan Kamera", stop: "Matikan Kamera",
      loading: "Memuat model AI…", ready: "Siap — mengarahkan…",
      allow: "Klik 'Aktifkan Kamera' lalu izinkan akses. Semua pemrosesan terjadi di perangkat Anda.",
      denied: "Akses kamera ditolak atau tidak tersedia. Periksa izin browser lalu coba lagi.",
      privacy: "🔒 Privasi: video diproses sepenuhnya di perangkat Anda (browser). Tidak ada gambar/video yang diunggah ke server mana pun.",
      objectsFound: "Objek terdeteksi", detected: "Ekspresi terdeteksi",
      needInternet: "Model dimuat dari internet saat pertama kali dijalankan.",
      switchHint: "Ganti mode akan memuat ulang model yang sesuai.",
      noFace: "Arahkan wajah ke kamera…",
      faceStatus: "Status wajah", faceOn: "Wajah terdeteksi — 468 titik", faceOff: "Arahkan wajah ke kamera…",
      handStatus: "Tangan terdeteksi", handHint: "Angkat 1–2 tangan ke kamera. 21 titik per tangan.",
      fingersRaised: "Jari terangkat", gestureLbl: "Gestur", noGesture: "Coba 👍 ✌️ ✊ ✋ ☝️ 🤟",
      poseStatus: "Status pose", poseOn: "Pose terdeteksi — 33 titik", poseOff: "Mundur agar seluruh tubuh terlihat kamera…",
      exercise: "Latihan", handsup: "Angkat Tangan", squat: "Squat",
      repsLbl: "Repetisi", resetReps: "Reset hitungan",
      handsupHint: "Angkat kedua tangan di atas kepala lalu turunkan — tiap siklus dihitung 1 repetisi.",
      squatHint: "Jongkok lalu berdiri — tiap siklus dihitung 1 repetisi. Pastikan pinggul & lutut terlihat kamera.",
      meshNote: "Face mesh: 468 titik landmark membentuk kerangka wajah (dipakai untuk filter AR, estimasi arah pandang, dll).",
      handNote: "Hand landmarks: 21 titik per tangan membentuk kerangka jari + hitung jari terangkat (dipakai untuk bahasa isyarat, gestur, kontrol tanpa sentuh).",
      poseNote: "Pose landmarks: 33 titik kerangka tubuh penuh (dipakai untuk analisis olahraga/fitness, deteksi gerakan, dan animasi).",
    },
    en: {
      object: "Object Detection", expression: "Expression Detection", facemesh: "Face Skeleton", hand: "Hand Skeleton", pose: "Body Pose",
      enable: "Enable Camera", stop: "Stop Camera",
      loading: "Loading AI model…", ready: "Ready — point the camera…",
      allow: "Click 'Enable Camera' and allow access. All processing happens on your device.",
      denied: "Camera access was denied or unavailable. Check browser permissions and try again.",
      privacy: "🔒 Privacy: video is processed entirely on your device (browser). No image/video is uploaded to any server.",
      objectsFound: "Objects detected", detected: "Detected expression",
      needInternet: "The model loads from the internet on first run.",
      switchHint: "Switching modes reloads the appropriate model.",
      noFace: "Point your face at the camera…",
      faceStatus: "Face status", faceOn: "Face detected — 468 points", faceOff: "Point your face at the camera…",
      handStatus: "Hands detected", handHint: "Raise 1–2 hands to the camera. 21 points per hand.",
      fingersRaised: "Fingers raised", gestureLbl: "Gesture", noGesture: "Try 👍 ✌️ ✊ ✋ ☝️ 🤟",
      poseStatus: "Pose status", poseOn: "Pose detected — 33 points", poseOff: "Step back so your whole body is visible…",
      exercise: "Exercise", handsup: "Hands Up", squat: "Squat",
      repsLbl: "Reps", resetReps: "Reset count",
      handsupHint: "Raise both hands above your head then lower them — each cycle counts as 1 rep.",
      squatHint: "Squat down then stand up — each cycle counts as 1 rep. Keep hips & knees in view.",
      meshNote: "Face mesh: 468 landmark points form a face skeleton (used for AR filters, gaze estimation, etc).",
      handNote: "Hand landmarks: 21 points per hand form a finger skeleton + raised-finger count (used for sign language, gestures, touch-free control).",
      poseNote: "Pose landmarks: 33 full-body skeleton points (used for sports/fitness analysis, motion detection, and animation).",
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
    setFaceDetected(false);
    setHandCount(0);
    setFingerCount(0);
    setGesture(null);
    setPoseDetected(false);
    setReps(0);
    repPhaseRef.current = "down";
  }, []);

  useEffect(() => () => stopEverything(), [stopEverything]);

  // keep the exercise ref in sync for the RAF loop; reset the counter on change
  useEffect(() => {
    exerciseRef.current = exercise;
    setReps(0);
    repPhaseRef.current = "down";
  }, [exercise]);

  // ---- model loading ----
  const ensureModels = useCallback(async (m) => {
    if (m === "object") {
      await loadScriptsSequential([TFJS, COCO_SSD]);
      if (!modelRef.current) {
        // eslint-disable-next-line no-undef
        modelRef.current = await cocoSsd.load();
      }
    } else if (m === "expression") {
      await loadScript(FACE_API);
      // eslint-disable-next-line no-undef
      const faceapi = window.faceapi;
      if (!faceapi.nets.tinyFaceDetector.params) {
        await faceapi.nets.tinyFaceDetector.loadFromUri(FACE_MODELS);
        await faceapi.nets.faceExpressionNet.loadFromUri(FACE_MODELS);
      }
    } else if (m === "facemesh" || m === "hand" || m === "pose") {
      // MediaPipe Tasks Vision — ESM dynamic import (runs fully in-browser)
      const vision = await import(/* webpackIgnore: true */ MP_VISION_ESM);
      const { FaceLandmarker, HandLandmarker, PoseLandmarker, FilesetResolver, DrawingUtils } = vision;
      const fileset = await FilesetResolver.forVisionTasks(MP_WASM);
      drawUtilsRef.current = { DrawingUtils, FaceLandmarker, HandLandmarker, PoseLandmarker };
      if (m === "facemesh" && !faceLandmarkerRef.current) {
        faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: FACE_LANDMARKER_MODEL, delegate: "GPU" },
          runningMode: "VIDEO",
          numFaces: 1,
        });
      }
      if (m === "hand" && !handLandmarkerRef.current) {
        handLandmarkerRef.current = await HandLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: HAND_LANDMARKER_MODEL, delegate: "GPU" },
          runningMode: "VIDEO",
          numHands: 2,
        });
      }
      if (m === "pose" && !poseLandmarkerRef.current) {
        poseLandmarkerRef.current = await PoseLandmarker.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: POSE_LANDMARKER_MODEL, delegate: "GPU" },
          runningMode: "VIDEO",
          numPoses: 1,
        });
      }
    }
  }, []);

  // ---- object loop ----
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

  // ---- expression loop ----
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
        const result = await faceapi.detectSingleFace(video, options).withFaceExpressions();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (result) {
          const { x, y, width, height } = result.detection.box;
          ctx.strokeStyle = "#F5A200";
          ctx.lineWidth = 3;
          ctx.strokeRect(x, y, width, height);
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

  // ---- face mesh (skeleton) loop ----
  const runFaceMeshLoop = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    const { DrawingUtils, FaceLandmarker } = drawUtilsRef.current;
    const drawer = new DrawingUtils(ctx);

    const step = () => {
      if (!runningRef.current) return;
      try {
        const res = faceLandmarkerRef.current.detectForVideo(video, performance.now());
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const found = res.faceLandmarks && res.faceLandmarks.length > 0;
        setFaceDetected(found);
        if (found) {
          for (const landmarks of res.faceLandmarks) {
            // mesh tesselation + key feature outlines
            drawer.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, { color: "rgba(0,147,208,0.4)", lineWidth: 0.6 });
            drawer.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, { color: "#0093D0", lineWidth: 2 });
            drawer.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, { color: "#F5A200", lineWidth: 1.5 });
            drawer.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, { color: "#F5A200", lineWidth: 1.5 });
            drawer.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, { color: "#16a34a", lineWidth: 1.5 });
          }
        }
      } catch {
        /* frame skipped */
      }
      rafRef.current = requestAnimationFrame(step);
    };
    step();
  }, []);

  // ---- hand (skeleton) loop ----
  const runHandLoop = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;

    const step = () => {
      if (!runningRef.current) return;
      try {
        const res = handLandmarkerRef.current.detectForVideo(video, performance.now());
        ctx.clearRect(0, 0, W, H);
        const hands = res.landmarks || [];
        setHandCount(hands.length);
        let totalFingers = 0;
        let firstGesture = null;
        hands.forEach((landmarks, hi) => {
          // connections (bones)
          ctx.strokeStyle = "#0093D0";
          ctx.lineWidth = 3;
          HAND_CONNECTIONS.forEach(([a, b]) => {
            const pa = landmarks[a], pb = landmarks[b];
            ctx.beginPath();
            ctx.moveTo(pa.x * W, pa.y * H);
            ctx.lineTo(pb.x * W, pb.y * H);
            ctx.stroke();
          });
          // joints (landmarks)
          landmarks.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x * W, p.y * H, 4, 0, Math.PI * 2);
            ctx.fillStyle = "#F5A200";
            ctx.fill();
          });
          // raised-finger count + gesture for this hand
          const handed = res.handedness?.[hi]?.[0]?.categoryName || "Right";
          const raised = countRaisedFingers(landmarks, handed);
          totalFingers += raised;
          if (hi === 0) firstGesture = classifyGesture(landmarks, handed);
          // label the count near the wrist (landmark 0). Canvas is mirrored, so
          // counter-mirror the text so digits read correctly.
          const wx = landmarks[0].x * W, wy = landmarks[0].y * H;
          ctx.save();
          ctx.translate(wx, wy + 28);
          ctx.scale(-1, 1); // undo the parent scaleX(-1)
          ctx.font = "bold 20px sans-serif";
          ctx.fillStyle = "#0093D0";
          ctx.textAlign = "center";
          ctx.fillText(String(raised), 0, 0);
          ctx.restore();
        });
        setFingerCount(totalFingers);
        setGesture(hands.length ? firstGesture : null);
      } catch {
        /* frame skipped */
      }
      rafRef.current = requestAnimationFrame(step);
    };
    step();
  }, []);

  // ---- body pose (skeleton) loop ----
  const runPoseLoop = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;

    const step = () => {
      if (!runningRef.current) return;
      try {
        const res = poseLandmarkerRef.current.detectForVideo(video, performance.now());
        ctx.clearRect(0, 0, W, H);
        const poses = res.landmarks || [];
        setPoseDetected(poses.length > 0);
        // ---- rep counting (state machine on the first pose) ----
        if (poses.length) {
          const lm = poses[0];
          const ex = exerciseRef.current;
          if (ex === "handsup") {
            // both wrists (15,16) above both shoulders (11,12) = "up" phase
            const wristsUp = lm[15].y < lm[11].y && lm[16].y < lm[12].y;
            const wristsDown = lm[15].y > lm[11].y + 0.08 && lm[16].y > lm[12].y + 0.08;
            if (wristsUp && repPhaseRef.current === "down") repPhaseRef.current = "up";
            else if (wristsDown && repPhaseRef.current === "up") {
              repPhaseRef.current = "down";
              setReps((r) => r + 1);
            }
          } else {
            // squat: hips (23,24) drop toward knees (25,26). Use vertical gap.
            const hipY = (lm[23].y + lm[24].y) / 2;
            const kneeY = (lm[25].y + lm[26].y) / 2;
            const gap = kneeY - hipY; // smaller gap = squatting (hips closer to knees)
            if (gap < 0.12 && repPhaseRef.current === "down") repPhaseRef.current = "up"; // down = squatting
            else if (gap > 0.22 && repPhaseRef.current === "up") {
              repPhaseRef.current = "down"; // standing
              setReps((r) => r + 1);
            }
          }
        }
        poses.forEach((landmarks) => {
          // bones
          ctx.strokeStyle = "#0093D0";
          ctx.lineWidth = 3;
          POSE_CONNECTIONS.forEach(([a, b]) => {
            const pa = landmarks[a], pb = landmarks[b];
            if (!pa || !pb) return;
            ctx.beginPath();
            ctx.moveTo(pa.x * W, pa.y * H);
            ctx.lineTo(pb.x * W, pb.y * H);
            ctx.stroke();
          });
          // joints
          landmarks.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x * W, p.y * H, 4, 0, Math.PI * 2);
            ctx.fillStyle = "#F5A200";
            ctx.fill();
          });
        });
      } catch {
        /* frame skipped */
      }
      rafRef.current = requestAnimationFrame(step);
    };
    step();
  }, []);

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
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 480;
      canvas.height = video.videoHeight || 360;
      setStatus("running");
      runningRef.current = true;
      if (mode === "object") runObjectLoop();
      else if (mode === "expression") runExpressionLoop();
      else if (mode === "facemesh") runFaceMeshLoop();
      else if (mode === "hand") runHandLoop();
      else if (mode === "pose") runPoseLoop();
    } catch (e) {
      setStatus("denied");
    }
  }, [mode, ensureModels, runObjectLoop, runExpressionLoop, runFaceMeshLoop, runHandLoop, runPoseLoop, L.needInternet]);

  // switching mode while running: stop then require re-enable
  const switchMode = (m) => {
    if (m === mode) return;
    stopEverything();
    setMode(m);
  };

  const isRunning = status === "running";

  const modeBtns = [
    ["object", `🎯 ${L.object}`],
    ["expression", `😊 ${L.expression}`],
    ["facemesh", `🫥 ${L.facemesh}`],
    ["hand", `✋ ${L.hand}`],
    ["pose", `🧍 ${L.pose}`],
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* mode toggle */}
      <div className="mb-4 inline-flex flex-wrap rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
        {modeBtns.map(([key, label]) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            className={`rounded-md px-4 py-1.5 transition ${mode === key ? "bg-brand-600 text-white" : "text-slate-600"}`}
          >
            {label}
          </button>
        ))}
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

          {mode === "facemesh" && isRunning && (
            <div className="rounded-lg bg-slate-50 p-4 text-center">
              <div className="text-sm text-slate-500">{L.faceStatus}</div>
              <div className="mt-1 text-2xl">{faceDetected ? "🫥" : "🔍"}</div>
              <div className={`mt-1 text-sm font-semibold ${faceDetected ? "text-brand-700" : "text-slate-400"}`}>
                {faceDetected ? L.faceOn : L.faceOff}
              </div>
            </div>
          )}

          {mode === "hand" && isRunning && (
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-slate-50 p-4 text-center">
                <div className="text-sm text-slate-500">{L.handStatus}</div>
                <div className="text-3xl font-black text-brand-600">{handCount}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-4 text-center">
                <div className="text-sm text-slate-500">☝️ {L.fingersRaised}</div>
                <div className="text-3xl font-black" style={{ color: "#F5A200" }}>{fingerCount}</div>
              </div>
              <div className="col-span-2 rounded-lg bg-slate-50 p-4 text-center">
                <div className="text-sm text-slate-500">{L.gestureLbl}</div>
                {gesture ? (
                  <div className="mt-1">
                    <span className="text-4xl">{gesture.emoji}</span>
                    <div className="mt-1 font-bold text-brand-700">{gesture[lang]}</div>
                  </div>
                ) : (
                  <div className="mt-1 text-sm text-slate-400">{L.noGesture}</div>
                )}
              </div>
              <div className="col-span-2 text-center text-xs text-slate-400">{L.handHint}</div>
            </div>
          )}

          {mode === "pose" && isRunning && (
            <div className="space-y-3">
              <div className="rounded-lg bg-slate-50 p-3 text-center">
                <div className="text-sm text-slate-500">{L.poseStatus}</div>
                <div className={`mt-1 text-sm font-semibold ${poseDetected ? "text-brand-700" : "text-slate-400"}`}>
                  {poseDetected ? `🧍 ${L.poseOn}` : `🔍 ${L.poseOff}`}
                </div>
              </div>

              {/* exercise selector */}
              <div>
                <div className="mb-1 text-xs font-semibold text-slate-600">{L.exercise}</div>
                <div className="inline-flex rounded-lg border border-slate-300 p-0.5 text-sm font-semibold">
                  {[["handsup", `🙌 ${L.handsup}`], ["squat", `🏋️ ${L.squat}`]].map(([k, label]) => (
                    <button
                      key={k}
                      onClick={() => setExercise(k)}
                      className={`rounded-md px-3 py-1 transition ${exercise === k ? "bg-brand-600 text-white" : "text-slate-600"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* rep counter */}
              <div className="rounded-lg bg-slate-50 p-4 text-center">
                <div className="text-sm text-slate-500">🔁 {L.repsLbl}</div>
                <div className="text-5xl font-black text-brand-600">{reps}</div>
                <button
                  onClick={() => { setReps(0); repPhaseRef.current = "down"; }}
                  className="mt-2 text-xs font-semibold text-brand-600 hover:underline"
                >
                  {L.resetReps}
                </button>
              </div>
              <p className="text-xs text-slate-400">{exercise === "handsup" ? L.handsupHint : L.squatHint}</p>
            </div>
          )}

          {mode === "facemesh" && <p className="text-xs text-slate-400">{L.meshNote}</p>}
          {mode === "hand" && <p className="text-xs text-slate-400">{L.handNote}</p>}
          {mode === "pose" && <p className="text-xs text-slate-400">{L.poseNote}</p>}
          <p className="text-xs text-slate-400">{L.switchHint}</p>
        </div>
      </div>
    </div>
  );
}
