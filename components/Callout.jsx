export default function Callout({ emoji = "💡", title, children }) {
  return (
    <div className="my-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
      {title && (
        <p className="mb-2 font-semibold text-brand-800">
          {emoji} {title}
        </p>
      )}
      <div className="text-sm text-slate-700">{children}</div>
    </div>
  );
}
