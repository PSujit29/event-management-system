import { HiArrowRightOnRectangle, HiTrash } from "react-icons/hi2";

export default function SettingsSessionActionsCard({ confirmId, onSignOut, onReset }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Session</h2>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={onSignOut}
          className={`flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all border ${
            confirmId === "logout"
              ? "bg-amber-50 border-amber-200 text-amber-700"
              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
          }`}
        >
          <HiArrowRightOnRectangle className={`w-4 h-4 ${confirmId === "logout" ? "text-amber-600" : "text-slate-500"}`} />
          {confirmId === "logout" ? "Confirm Sign Out?" : "Sign Out"}
        </button>

        <button
          onClick={onReset}
          className={`flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all ${
            confirmId === "reset" ? "bg-red-800 text-white shadow-inner" : "bg-red-600 text-white hover:bg-red-700 shadow-sm"
          }`}
        >
          <HiTrash className="w-4 h-4" />
          {confirmId === "reset" ? "Click again to wipe all data" : "Reset Local Data"}
        </button>
      </div>
    </section>
  );
}