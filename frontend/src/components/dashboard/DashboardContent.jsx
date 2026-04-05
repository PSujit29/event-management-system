import { HiCalendarDays, HiClock } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { formatDateTime } from "../../utils/date.utils";

function calcSubEventStartTime(parentEvent, subEvents, targetIndex) {
  if (!parentEvent?.startDate) return null;

  const datePart = new Date(parentEvent.startDate).toISOString().slice(0, 10);
  const timePart = parentEvent.startTime || "00:00";
  const parentStart = new Date(`${datePart}T${timePart}:00`);

  if (isNaN(parentStart.getTime())) return null;

  // Sum durations of all sub-events before this one
  const offsetHours = subEvents
    .slice(0, targetIndex)
    .reduce((sum, sub) => sum + Number(sub.duration || 0), 0);

  return new Date(parentStart.getTime() + offsetHours * 3600000);
}

export default function DashboardContent({ events = [], subEvents = [] }) {
  // 1. Process events with the updated 'Completed' status logic
  const eventsWithStatus = events.map((event) => ({
    ...event,
    status: event.status, // backend la sent garako status lai directly use garne
  }));

  // 2. Compute Stats for Cards
  const totalEvents = eventsWithStatus.length;
  const activeNow = eventsWithStatus.filter(
    (e) => e.status === "Ongoing",
  ).length;
  const upcomingCount = eventsWithStatus.filter(
    (e) => e.status === "Upcoming",
  ).length;

  // 3. Filter for Upcoming Table (Excluding 'Completed')
  const upcomingEvents = [...eventsWithStatus]
    .filter((e) => e.status !== "Completed")
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 5);

  // 4. Spotlight only the top-most event from the same sorted list
  const spotlightEvent = upcomingEvents[0] ?? null;
  const spotlightSubEvents = subEvents
    .filter(
      (sub) =>
        String(sub?.eventId ?? "") === String(spotlightEvent?.eventId ?? ""),
    )
    .slice(0, 4);

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm uppercase tracking-widest text-gray-400">
          Command Center
        </p>
        <h2 className="text-2xl font-semibold text-gray-900">
          Dashboard Overview
        </h2>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          icon={<HiCalendarDays />}
          label="Total Events"
          value={totalEvents}
        />
        <StatCard icon={<HiClock />} label="Active Now" value={activeNow} />
        <StatCard
          icon={<HiCalendarDays />}
          label="Upcoming"
          value={upcomingCount}
        />
      </div>

      {/* Main Grid: Upcoming Table + Spotlight */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Upcoming Events Table */}
        <div className="lg:col-span-2 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">
            Upcoming Events
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-400 border-b border-gray-100">
                <tr>
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Start Date</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {upcomingEvents.length === 0 ? (
                  <tr>
                    <td className="py-4 text-gray-500" colSpan="3">
                      No upcoming events.
                    </td>
                  </tr>
                ) : (
                  upcomingEvents.map((event) => (
                    <tr key={event.eventId}>
                      <td className="py-3">
                        <Link
                          to={`/user/events/${event.eventId}`}
                          className="cursor-pointer ml-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 transition-colors"
                        >
                          {event.name}
                        </Link>
                      </td>
                      <td className="py-3 text-gray-600">
                        {formatDateTime(event.startDate, event.startTime)}
                      </td>
                      <td className="py-3">
                        <span className="rounded-full border border-gray-200 px-2 py-1 text-xs text-gray-600">
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sub-Event Spotlight */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-gray-900">
            <h3 className="text-lg font-semibold">Sub-Event Spotlight</h3>
          </div>
          <p className="mt-1 text-sm text-gray-500 italic">
            {spotlightEvent
              ? `Focused Event: ${spotlightEvent.name}`
              : "No upcoming events"}
          </p>
          <div className="mt-4 space-y-3">
            {!spotlightEvent ? (
              <p className="text-sm text-gray-500">
                No event available for spotlight.
              </p>
            ) : spotlightSubEvents.length === 0 ? (
              <p className="text-sm text-gray-500">
                No sub-events found for this event.
              </p>
            ) : (
              spotlightSubEvents.map((sub, index) => {
                const subStart = calcSubEventStartTime(
                  spotlightEvent,
                  spotlightSubEvents,
                  index,
                );
                return (
                  <div
                    key={sub.subEventId}
                    className="rounded-lg border border-gray-100 p-3 hover:bg-gray-50 transition-colors"
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {sub.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {subStart
                        ? subStart.toLocaleString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "TBD"}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3 text-gray-500">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}
