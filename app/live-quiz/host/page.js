import LiveQuizHost from "@/components/livequiz/LiveQuizHost";

export const metadata = {
  title: "Kuis Live NLP — Host — Cognia",
  description:
    "Layar host kuis live NLP bergaya Kahoot: tampilkan PIN & QR, pantau peserta bergabung dari perangkat masing-masing, papan skor langsung, dan ranking akhir.",
};

export default function LiveQuizHostPage() {
  return <LiveQuizHost />;
}
