"use client";

// Responsive YouTube embed. Pass a video `id` (the part after v=).
// If no id is provided, shows a friendly placeholder so instructors know
// where to drop their own video link.
export default function YouTubeEmbed({ id, title = "Video", placeholder }) {
  if (!id) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-center text-sm text-slate-500">
        <div className="px-4">
          <div className="text-3xl">▶️</div>
          <p className="mt-2 font-medium">{placeholder || "Slot video YouTube"}</p>
          <p className="mt-1 text-xs">
            Tambahkan <code className="rounded bg-slate-200 px-1">id</code> video di{" "}
            <code className="rounded bg-slate-200 px-1">lib/content.js</code> atau di halaman ini.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl shadow">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
