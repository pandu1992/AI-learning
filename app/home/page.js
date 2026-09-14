"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// The curriculum now lives at the landing page ("/"). This route is kept only
// to gracefully redirect any old /home links to "/".
export default function HomeRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-center text-sm text-slate-500">
      Redirecting to home…
    </div>
  );
}
