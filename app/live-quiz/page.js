import LiveQuiz from "@/components/livequiz/LiveQuiz";

export const metadata = {
  title: "Kuis Live NLP — Cognia",
  description:
    "Kuis live bergaya Kahoot untuk review kelas NLP: daftar peserta (NIM & nama), soal bertimer, papan skor langsung, dan ranking akhir.",
};

export default function LiveQuizPage() {
  return <LiveQuiz />;
}
