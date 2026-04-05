import { useMemo } from "react";
import { HiCalendarDays, HiCheckCircle, HiClock } from "react-icons/hi2";
import { formatDate } from "../../utils/date.utils";

export default function StudentDashboardContent({ registrations = [], allEvents = [] }) {
  const processed = useMemo(() => {
    // Merge registration data with full event details
    const myFullEvents = registrations
      .map((reg) => {
        const details = allEvents.find((e) => String(e.eventId) === String(reg.eventId));
        return { ...reg, ...details };
      })
      .filter((e) => e.name); // Ensure we have event details

    const now = new Date();

    // Nearest Upcoming Registered Event
    const upcoming = myFullEvents.filter((e) => new Date(e.startDate) > now).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    return {
      total: registrations.length,
      upcomingCount: upcoming.length,
      nearestEvent: upcoming[0] || null,
      history: myFullEvents.slice(0, 5),
    };
  }, [registrations, allEvents]);

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Student Dashboard</h2>
        <p className="text-gray-500">Manage your event registrations and attendance.</p>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-amber-500 rounded-2xl text-white shadow-lg shadow-blue-100">
          <div className="flex items-center gap-3 opacity-80 mb-2">
            <HiCalendarDays className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Upcoming Registrations</span>
          </div>
          <p className="text-4xl font-black">{processed.upcomingCount}</p>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 text-gray-400 mb-2">
            <HiCheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Total Registrations</span>
          </div>
          <p className="text-4xl font-black text-gray-900">{processed.total}</p>
        </div>
      </div>

      {/* Nearest Event Spotlight */}
      {processed.nearestEvent && (
        <div className="p-6 bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl text-white">
          <div className="flex items-center gap-2 text-amber-400 mb-4">
            <HiClock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">Up Next</span>
          </div>
          <h3 className="text-xl font-bold mb-1">{processed.nearestEvent.name}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-1">{processed.nearestEvent.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <HiCalendarDays className="w-4 h-4" />
              {formatDate(processed.nearestEvent.startDate)}
            </span>
          </div>
        </div>
      )}

      {/* My-Events Summary Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="font-bold text-gray-900">Recent Registrations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase">
              <tr>
                <th className="px-6 py-3">Event</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {processed.history.map((reg) => (
                <tr key={reg.registrationId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{reg.name}</td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(reg.startDate)}</td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${
                        reg.attendanceStatus === "Present"
                          ? "bg-green-50 text-green-700 border-green-100"
                          : "bg-gray-50 text-gray-500 border-gray-100"
                      }`}
                    >
                      {reg.attendanceStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
