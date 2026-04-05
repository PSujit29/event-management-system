import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function EventBackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-slate-600 transition-all hover:scale-95 hover:text-slate-900"
    >
      <FaArrowLeftLong className="h-4 w-4" />
      Back
    </button>
  );
}