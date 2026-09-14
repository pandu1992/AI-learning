import HomeContent from "@/components/HomeContent";

export const metadata = {
  title: "Cognia — Interactive AI Learning (BINUS University)",
  description:
    "Cognia — an interactive, bilingual AI learning platform: curriculum, interactive demos, and guided practice. By Pandu Dwi Luhur Pambudi, BINUS University.",
};

// The landing page is the curriculum home (Beranda). The instructor's profile
// & welcome lives at /profile, reachable from the nav and the hero button.
export default function LandingPage() {
  return <HomeContent />;
}
