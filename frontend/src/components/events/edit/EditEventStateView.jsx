export default function EditEventStateView({ type = "loading", message, buttonLabel, onButtonClick }) {
  if (type === "loading") {
    return <p className="text-slate-600">{message}</p>;
  }

  const typeStyles = {
    error: "border-red-200 bg-red-50 text-red-600",
    warning: "border-amber-200 bg-amber-50 text-amber-700",
  };

  return (
    <>
      <div className={`rounded-lg border p-4 text-sm mb-4 ${typeStyles[type] || typeStyles.warning}`}>{message}</div>
      <button onClick={onButtonClick} className="px-4 py-2 bg-slate-200 rounded-md hover:bg-slate-300">
        {buttonLabel}
      </button>
    </>
  );
}