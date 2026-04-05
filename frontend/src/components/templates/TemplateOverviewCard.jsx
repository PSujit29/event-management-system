import { Link } from "react-router-dom";
import { FaRegClock, FaArrowRightLong } from "react-icons/fa6";
import { HiTemplate } from "react-icons/hi";
import { MdEventNote } from "react-icons/md";
import { formatDurationHours } from "../../utils/date.utils";

export default function TemplateOverviewCard({ template, templateId, isAdmin }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            <HiTemplate className="h-3.5 w-3.5" />
            Template Overview
          </div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{template.name}</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">{template.description || "No description"}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-700">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 font-semibold">
              <FaRegClock className="h-4 w-4 text-slate-500" />
              Total Duration: {formatDurationHours(template.totalDuration)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 font-semibold text-amber-700">
              <MdEventNote className="h-4 w-4" />
              {template.subEvents?.length || 0} Sessions
            </span>
          </div>
        </div>
        {isAdmin && (
          <Link
            to={`/user/templates/${templateId}/clone`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-95 hover:bg-amber-500 hover:text-slate-950 active:scale-95"
          >
            Clone Template
            <FaArrowRightLong className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}