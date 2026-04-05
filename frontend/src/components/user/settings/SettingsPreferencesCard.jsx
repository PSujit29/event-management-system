import { HiCalendarDays, HiCog6Tooth, HiMoon } from "react-icons/hi2";

export default function SettingsPreferencesCard({ saveStatus, dateFormat, onDateFormatChange }) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <HiCog6Tooth className="w-4 h-4" /> General Preferences
        </div>
        {saveStatus === "saved" && <span className="text-xs font-medium text-emerald-600 animate-pulse">Changes saved!</span>}
      </div>

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <HiMoon className="w-4 h-4" /> Dark Mode
            </div>
            <p className="text-xs text-slate-500">Coming soon to this interface.</p>
          </div>
          <button className="h-6 w-11 cursor-pointer rounded-full bg-slate-200 transition-colors" disabled>
            <span className="ml-1 block h-4 w-4 rounded-full bg-white shadow-sm" />
          </button>
        </div>

        <div className="space-y-2">
          <label htmlFor="dateFormat" className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <HiCalendarDays className="w-4 h-4" /> Date Format
          </label>
          <select
            id="dateFormat"
            value={dateFormat}
            onChange={onDateFormatChange}
            className="w-auto cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          >
            <option value="dd-mm-yyyy">DD-MM-YYYY (Default)</option>
            <option value="mm-dd-yyyy">MM-DD-YYYY</option>
            <option value="yyyy-mm-dd">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </section>
  );
}