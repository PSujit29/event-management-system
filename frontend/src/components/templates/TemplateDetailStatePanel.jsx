export default function TemplateDetailStatePanel({ type = "loading", message }) {
  const typeStyles = {
    loading: "border-slate-200 bg-white text-slate-600",
    error: "border-red-200 bg-red-50 text-red-600",
    empty: "border-amber-200 bg-amber-50 text-amber-700",
  };

  return <div className={`rounded-lg border p-4 text-sm ${typeStyles[type] || typeStyles.loading}`}>{message}</div>;
}