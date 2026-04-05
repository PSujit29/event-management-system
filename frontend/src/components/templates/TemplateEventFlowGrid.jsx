export default function TemplateEventFlowGrid({ subEvents }) {
  if (!subEvents || subEvents.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
      <h2 className="mb-1 text-lg font-semibold text-slate-900 md:text-xl">Event Flow</h2>
      <p className="mb-5 text-sm text-slate-600">Structured sequence of sessions included in this template.</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {subEvents.map((subEvent, idx) => (
          <div
            key={idx}
            className="group rounded-xl border border-slate-200 bg-linear-to-b from-white to-slate-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-amber-300 hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white transition-all duration-300 group-hover:bg-amber-500 group-hover:text-slate-950">
                {idx + 1}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Session</span>
            </div>
            <p className="text-sm font-semibold text-slate-900">{subEvent.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{subEvent.description || "No description"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}