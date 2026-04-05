import EventBackButton from "../EventBackButton";
import EventRegistrationActionButton from "../EventRegistrationActionButton";

export default function EventDetailTopBar({ isStudent, eventId, eventStatus, isRegistered }) {
  return (
    <div className="flex justify-between">
      <EventBackButton />
      {isStudent && (
        <EventRegistrationActionButton eventId={eventId} initialIsRegistered={Boolean(isRegistered)} eventStatus={eventStatus} />
      )}
    </div>
  );
}