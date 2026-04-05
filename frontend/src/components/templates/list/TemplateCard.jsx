import { Link } from "react-router-dom";
import { FaRegClock, FaArrowRightLong, FaRegClone, FaLayerGroup } from "react-icons/fa6";
import { formatDurationHours } from "../../../utils/date.utils";

export default function TemplateCard({ template }) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-amber-300 hover:shadow-xl cursor-pointer">
      <div>
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-all duration-300 group-hover:scale-95 group-hover:bg-amber-500 group-hover:text-white">
          <FaRegClone className="h-5 w-5" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-slate-950">
          {template.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {template.description || "No description provided for this template."}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <FaRegClock className="h-4 w-4 text-slate-500" />
            {formatDurationHours(template.totalDuration)}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <FaLayerGroup className="h-4 w-4 text-amber-600" />
            {template.subEvents?.length || 0} Sessions
          </div>
        </div>
      </div>

      <Link
        to={`/user/templates/${template.templateId}`}
        className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-95 hover:bg-amber-500 hover:text-slate-950 active:scale-95"
      >
        Use Template
        <FaArrowRightLong className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
