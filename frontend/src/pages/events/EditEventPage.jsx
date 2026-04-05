import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EditEventForm from "../../components/events/EditEventForm";
import EditEventPageShell from "../../components/events/edit/EditEventPageShell";
import EditEventStateView from "../../components/events/edit/EditEventStateView";
import { getEventById } from "../../services/event.service";
import { parseApiError } from "../../utils/error.utils";

export default function EditEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const event = await getEventById(eventId);
        setEventData(event);
        setError(null);
      } catch (err) {
        const errorMessage = parseApiError(err, "Failed to load event");
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  // Loading State
  if (loading) {
    return (
      <EditEventPageShell>
        <EditEventStateView type="loading" message="Loading event..." />
      </EditEventPageShell>
    );
  }

  // Error State
  if (error) {
    return (
      <EditEventPageShell>
        <EditEventStateView
          type="error"
          message={`Error: ${error}`}
          buttonLabel="Back to Events"
          onButtonClick={() => navigate("/user/events")}
        />
      </EditEventPageShell>
    );
  }

  // Not Found State
  if (!eventData) {
    return (
      <EditEventPageShell>
        <EditEventStateView
          type="warning"
          message="Event not found"
          buttonLabel="Back to Events"
          onButtonClick={() => navigate("/user/events")}
        />
      </EditEventPageShell>
    );
  }

  const eventStatus = eventData.status;

  if (eventStatus !== "Upcoming") {
    return (
      <EditEventPageShell title="Edit Event">
        <EditEventStateView
          type="warning"
          message={`Event cannot be edited because it is currently "${eventStatus}". Only upcoming events can be edited.`}
          buttonLabel="Back to Event"
          onButtonClick={() => navigate(`/user/events/${eventData.eventId}`)}
        />
      </EditEventPageShell>
    );
  }

  // Success State
  return (
    <EditEventPageShell title="Edit Event">
      <EditEventForm eventData={eventData} />
    </EditEventPageShell>
  );
}
