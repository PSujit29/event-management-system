import { useState, useEffect, useCallback } from "react";
import EventsSection from "../../components/events/EventSection";
import { getEvents } from "../../services/event.service";

export default function EventListPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      setError("Failed to load events. Please try again." + (err?.message ? ` (${err.message})` : ""));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl p-10 bg-gray-50 rounded-2xl space-y-8">
        {/* Title Skeleton */}
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>

        {/* Event Card Skeletons */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-6 p-4 bg-white rounded-xl shadow-sm animate-pulse">
            {/* Mock Date/Image Square */}
            <div className="w-24 h-24 bg-gray-200 rounded-lg shrink-0"></div>

            {/* Mock Content Lines */}
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl p-10 bg-red-50 rounded-2xl text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={fetchEvents} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-10 px-10 bg-gray-50 rounded-2xl">
      <EventsSection events={events} onRefresh={fetchEvents} />
    </div>
  );
}
