import { HiPlus } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import EventCard from "./EventCard";
import { useState, useMemo } from "react";

export default function EventsSection({
  events = [],
  onCreateEvent,
  onRefresh,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const role = (user?.role || "").toLowerCase();
  const canCreateEvent = role === "admin" || role === "teacher";
  const [statusFilter, setStatusFilter] = useState("all");
  const handleCreate = () => {
    if (typeof onCreateEvent === "function") {
      onCreateEvent();
    }
    navigate("/user/events/create");
  };
  const handleRefresh = () => {
    if (typeof onRefresh === "function") {
      onRefresh();
      return;
    }
    window.location.reload();
  };
  const STATUS_ORDER = { Ongoing: 0, Upcoming: 1, Completed: 2 };

  const filteredEvents = useMemo(() => {
    const filtered =
      statusFilter === "all"
        ? events
        : events.filter(
            (event) => (event.status ?? "").toLowerCase() === statusFilter,
          );

    return [...filtered].sort(
      (a, b) => (STATUS_ORDER[a.status] ?? 3) - (STATUS_ORDER[b.status] ?? 3),
    );
  }, [events, statusFilter]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between sm:justify-start sm:gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Events</h2>
          {/* Update count to show filtered vs total if desired */}
          <span className="text-sm text-gray-500">
            {filteredEvents.length}{" "}
            {statusFilter !== "all" ? `of ${events.length}` : "total"}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:ml-auto">
          {/* 2. Controlled Select Input */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>

          {canCreateEvent && (
            <Link
              to="/user/events/create"
              onClick={handleCreate}
              className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:scale-[98%] hover:bg-gray-50"
            >
              <HiPlus className="h-4 w-4" />
              <span className="hidden xs:inline">Create New Event</span>
              <span className="xs:hidden">Create</span>
            </Link>
          )}
        </div>
      </div>

      {/* 3. Pass the filtered list to the card component */}
      <EventCard
        events={filteredEvents}
        userRole={role}
        onRefresh={handleRefresh}
        onCreate={handleCreate}
      />
    </section>
  );
}
