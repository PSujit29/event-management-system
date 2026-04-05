import { FaRegClone } from "react-icons/fa6";

export default function TemplateEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white py-20 text-center shadow-sm">
      <FaRegClone className="h-12 w-12 text-slate-400" />
      <p className="mt-4 text-slate-600">No templates available at the moment.</p>
    </div>
  );
}
