import { useEffect, useState } from "react";
import { getMyEvents } from "../../services/registration.service";
import { getEventById } from "../../services/event.service";
import MyEventCard from "../../components/events/my-events/MyEventCard";
import MyEventsLoadingState from "../../components/events/my-events/MyEventsLoadingState";
import MyEventsEmptyState from "../../components/events/my-events/MyEventsEmptyState";

const MyEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const registrations = await getMyEvents();

        const eventSummaries = await Promise.all(
          registrations.map(async (registration) => {
            try {
              const event = await getEventById(registration.eventId);
              const eventStatus = event ? event.status : "Upcoming";

              return {
                ...registration,
                eventName: event?.name ?? `Event #${registration.eventId}`,
                eventDescription: event?.description ?? "Event summary unavailable.",
                eventStartDate: event?.startDate ?? null,
                eventStatus,
              };
            } catch {
              return {
                ...registration,
                eventName: `Event #${registration.eventId}`,
                eventDescription: "Event summary unavailable.",
                eventStartDate: null,
                eventStatus: "Upcoming",
              };
            }
          }),
        );

        setEvents(eventSummaries);
        setError(null);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load your registered events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <MyEventsLoadingState />;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="w-full bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Registered Events</h1>
          <p className="mt-2 text-gray-600">Manage your registrations and view upcoming schedules.</p>
        </header>

        {events.length === 0 ? (
          <MyEventsEmptyState />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {events.map((reg) => (
              <MyEventCard key={reg.registrationId} reg={reg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEventsPage;
