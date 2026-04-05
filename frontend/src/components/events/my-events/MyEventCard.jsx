import { HiCalendarDays, HiChevronRight, HiClock } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../../utils/date.utils";
import MyEventStatusBadge from "./MyEventStatusBadge";

export default function MyEventCard({ reg }) {
  return (
    <div className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">ID: #{reg.eventId}</span>
          <MyEventStatusBadge type="registration" value={reg.attendanceStatus} />
          <MyEventStatusBadge type="event" value={reg.eventStatus} />
        </div>

        <h3 className="text-lg font-semibold text-gray-900">{reg.eventName}</h3>

        <p className="max-w-2xl text-sm text-gray-600">{reg.eventDescription}</p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <HiCalendarDays size={16} />
            Registered: {reg.registrationDate ? formatDate(reg.registrationDate) : "N/A"}
          </div>
          <div className="flex items-center gap-1">
            <HiClock size={16} />
            {reg.registrationDate ? formatTime(reg.registrationDate) : "N/A"}
          </div>
          {reg.eventStartDate && (
            <div className="flex items-center gap-1">
              <HiCalendarDays size={16} />
              Starts: {formatDate(reg.eventStartDate)}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center sm:mt-0">
        <Link to={`/user/events/${reg.eventId}`} className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800">
          View Details
          <HiChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}