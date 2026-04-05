import {
  FaRegClone,
  FaRegClock,
  FaLayerGroup,
  FaArrowRightLong,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { formatDate, formatDurationHours } from "../../utils/date.utils";

function isSameCalendarDate(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildEventTimes(event) {
  if (!event?.startDate) return { startAt: null, endAt: null };

  const datePart = new Date(event.startDate).toISOString().slice(0, 10);
  const normalizedStartTime = event.startTime || "00:00";
  const startAt = new Date(`${datePart}T${normalizedStartTime}:00`);

  if (Number.isNaN(startAt.getTime())) return { startAt: null, endAt: null };

  const durationHours = Number(event.duration || 0);
  const endAt = new Date(startAt.getTime() + durationHours * 3600000);

  return { startAt, endAt };
}

function formatAmPmTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getEventScheduleDisplay(event, eventStatus) {
  const now = new Date();
  const { startAt, endAt } = buildEventTimes(event);

  if (eventStatus === "Upcoming") {
    if (!startAt) {
      return {
        label: "Starts:",
        value: event.startDate ? formatDate(event.startDate) : "TBD",
      };
    }

    if (isSameCalendarDate(startAt, now)) {
      return {
        label: "Starts:",
        value: formatAmPmTime(startAt),
      };
    }

    return {
      label: "Starts:",
      value: formatDate(event.startDate),
    };
  }

  if (eventStatus === "Ongoing") {
    if (!startAt) {
      return {
        label: "Started:",
        value: "just now",
      };
    }

    const elapsedMs = Math.max(0, now.getTime() - startAt.getTime());
    const elapsedMinutes = Math.floor(elapsedMs / 60000);

    if (elapsedMinutes < 1) {
      return {
        label: "Started:",
        value: "just now",
      };
    }

    if (elapsedMinutes < 60) {
      const minuteUnit = elapsedMinutes === 1 ? "minute" : "minutes";
      return {
        label: "Started:",
        value: `${elapsedMinutes} ${minuteUnit} earlier`,
      };
    }

    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const hourUnit = elapsedHours === 1 ? "hour" : "hours";

    return {
      label: "Started:",
      value: `${elapsedHours} ${hourUnit} earlier`,
    };
  }

  if (!endAt) {
    return {
      label: "Ended:",
      value: "TBD",
    };
  }

  if (isSameCalendarDate(endAt, now)) {
    return {
      label: "Ended:",
      value: formatAmPmTime(endAt),
    };
  }

  return {
    label: "Ended:",
    value: formatDate(endAt.toISOString()),
  };
}

export default function EventCard({ events, userRole, onRefresh, onCreate }) {
  // role-based check: e.g., 'admin' or 'teacher'
  const canCreate = userRole === "admin" || userRole === "teacher";
  const statusStyles = {
    Upcoming: "bg-blue-100 text-blue-700",
    Ongoing: "bg-emerald-100 text-emerald-700",
    Completed: "bg-slate-100 text-slate-600",
  };
  const scheduleStyles = {
    Upcoming: {
      row: "border-blue-100 bg-blue-50/70",
      label: "text-blue-500",
      value: "text-blue-700",
    },
    Ongoing: {
      row: "border-emerald-100 bg-emerald-50/70",
      label: "text-emerald-600",
      value: "text-emerald-700",
    },
    Completed: {
      row: "border-slate-200 bg-slate-50",
      label: "text-slate-500",
      value: "text-slate-700",
    },
  };
  return (
    <>
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white py-16 px-6 text-center shadow-sm">
          <div className="rounded-full bg-slate-50 p-4">
            <FaRegClone className="h-10 w-10 text-slate-400" />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            No events found
          </h3>
          <p className="mt-2 max-w-xs text-sm text-slate-500">
            {canCreate
              ? "Get started by creating your first event for the students."
              : "There are no events scheduled. Check back later or try refreshing."}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {canCreate && (
              <button
                onClick={onCreate}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-900 transition-all hover:bg-amber-600 active:scale-95"
              >
                Create Event
              </button>
            )}

            <button
              onClick={onRefresh}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-95"
            >
              <FaRegClock className="h-4 w-4" />
              Refresh Page
            </button>
          </div>
        </div>
      ) : (
        /* The Card Grid */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 cursor-pointer">
          {events.map((event) =>
            (() => {
              const eventStatus = event.status;
              const scheduleDisplay = getEventScheduleDisplay(
                event,
                eventStatus,
              );
              const scheduleStyle = scheduleStyles[eventStatus] || {
                row: "border-slate-200 bg-slate-50",
                label: "text-slate-500",
                value: "text-slate-700",
              };

              return (
                <div
                  key={event.eventId}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-amber-300 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-slate-950">
                        {event.name}
                      </h3>
                      {/* Status Badge */}

                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          statusStyles[eventStatus] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {eventStatus}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                      {event.description ||
                        "No description provided for this event."}
                    </p>

                    {/* Aligned Info Section */}
                    <div className="mt-4 border-t border-slate-100 pt-4">
                      <div className="grid grid-cols-2 gap-y-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <FaRegClock className="h-4 w-4 text-slate-400" />
                          <span>{formatDurationHours(event.duration)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <FaLayerGroup className="h-4 w-4 text-amber-600" />
                          <span>{event.subEvents?.length || 0} Sessions</span>
                        </div>
                        <div
                          className={`col-span-2 flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium ${scheduleStyle.row}`}
                        >
                          {eventStatus === "Ongoing" && (
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          )}
                          <span className={scheduleStyle.label}>
                            {scheduleDisplay.label}
                          </span>
                          <span
                            className={`font-semibold ${scheduleStyle.value}`}
                          >
                            {scheduleDisplay.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/user/events/${event.eventId}/`}
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-amber-500 hover:text-slate-950 active:scale-95"
                  >
                    View Details
                    <FaArrowRightLong className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })(),
          )}
        </div>
      )}
    </>
  );
}
