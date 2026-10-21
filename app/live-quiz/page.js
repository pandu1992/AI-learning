import LiveQuizLanding from "@/components/livequiz/LiveQuizLanding";

export const metadata = {
  title: "Kuis Live NLP — Cognia",
  description:
    "Kuis live bergaya Kahoot untuk review kelas NLP, multi-perangkat: mahasiswa gabung dari HP/laptop dengan PIN, jawab secepat mungkin, papan skor langsung, dan ranking akhir (NIM & nama).",
};

export default function LiveQuizPage() {
  return <LiveQuizLanding />;
}
