export default function TemplateListPageHeader({ count }) {
  return (
    <div className="flex items-end justify-between border-b border-slate-200 pb-5">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Event Templates</h1>
        <p className="mt-1 text-sm text-slate-600">Select a pre-defined structure to start your event.</p>
      </div>
      <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 transition-transform duration-200 hover:scale-95">
        {count} Available
      </span>
    </div>
  );
}
