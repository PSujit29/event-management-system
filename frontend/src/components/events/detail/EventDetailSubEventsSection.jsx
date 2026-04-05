import EventFlow from "../EventFlow";

export default function EventDetailSubEventsSection({ subEventError, subEvents }) {
  if (subEventError) {
    return <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">Error loading sessions: {subEventError}</div>;
  }

  return <EventFlow subEvents={subEvents} />;
}