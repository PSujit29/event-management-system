import { FaSync } from "react-icons/fa";

export default function ProfileHeaderCard({ user, displayName, roleLabel, initials, isRefreshing, onRefresh }) {
  return (
    <div className="relative overflow-hidden border border-slate-200 bg-white shadow-sm rounded-2xl">
      <div className="p-6 md:px-8">
        <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-end ">
          <div className="flex items-center rounded-full justify-center overflow-hidden border-white bg-slate-100 shadow-md">
            {user?.image ? (
              <img src={user.image} alt={displayName} className="w-full rounded-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-slate-400">{initials}</span>
            )}
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="group flex items-center gap-2 cursor-pointer rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-70"
          >
            <FaSync name="refresh" className={`h-4 w-4 transition-transform ${isRefreshing ? "animate-spin" : "group-hover:rotate-180"}`} />
            {isRefreshing ? "Updating..." : "Refresh Profile"}
          </button>
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-slate-900">{displayName}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-orange-600 ring-1 ring-inset ring-orange-200">
              {roleLabel}
            </span>
            <span className="text-sm font-medium text-slate-500">{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}