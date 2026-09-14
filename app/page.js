import ProfileView from "@/components/profile/ProfileView";

export const metadata = {
  title: "Cognia — Pandu Dwi Luhur Pambudi (BINUS University)",
  description:
    "Selamat datang di Cognia. Profil dan sambutan Pandu Dwi Luhur Pambudi, Dosen & Peneliti di Computer Science Department, BINUS University.",
};

// The landing page is the instructor's profile & welcome. From here, learners
// head into the curriculum (starting with AI Overview). The curriculum home
// now lives at /home.
export default function LandingPage() {
  return <ProfileView />;
}
