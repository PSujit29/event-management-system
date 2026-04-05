import { FaArrowLeftLong } from "react-icons/fa6";

export default function TemplateBackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-slate-600 transition-all hover:scale-95 hover:text-slate-900"
    >
      <FaArrowLeftLong className="h-4 w-4" />
      Back
    </button>
  );
}