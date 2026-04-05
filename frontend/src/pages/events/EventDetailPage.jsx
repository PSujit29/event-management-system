import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  deleteEvent,
  getEventById,
  getSubEvents,
} from "../../services/event.service";
import { useAuth } from "../../hooks/useAuth";
import { parseApiError } from "../../utils/error.utils";

import EventOverview from "../../components/events/EventOverview";
import EventDetailStatePanel from "../../components/events/detail/EventDetailStatePanel";
import EventDetailTopBar from "../../components/events/detail/EventDetailTopBar";
import EventDetailSubEventsSection from "../../components/events/detail/EventDetailSubEventsSection";

export default function EventDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [subEvents, setSubEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [subEventError, setSubEventError] = useState(null);

  const role = (user?.role || "").toLowerCase();
  const isStudent = role === "student";
  const allowedToManage = role === "admin" || role === "teacher";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const eventData = await getEventById(eventId);
        setEvent(eventData);
        setError(null);
      } catch (err) {
        setError(parseApiError(err, "Failed to load event"));
        setLoading(false);
        return;
      }

      try {
        const subEventData = await getSubEvents(eventId);
        setSubEvents(subEventData);
        setEvent((prev) =>
          prev ? { ...prev, subEvents: subEventData } : prev,
        );
        setSubEventError(null);
      } catch (err) {
        setSubEventError(parseApiError(err, "Failed to load sub-events"));
        setSubEvents([]);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchData();
  }, [eventId]);

  const handleDeleteEvent = async () => {
    if (!eventId || isDeleting) return;

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this event?",
    );
    if (!isConfirmed) return;

    try {
      setIsDeleting(true);
      await deleteEvent(eventId);
      toast.success("Event deleted successfully");
      navigate("/user/events");
    } catch (err) {
      toast.error(parseApiError(err, "Failed to delete event"));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditEvent = () => {
    if (event.status !== "Upcoming") {
      toast.error("Only upcoming events can be edited");
      return;
    }
    navigate("/user/events/edit/" + eventId);
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="space-y-4 rounded-2xl bg-slate-100 p-5 md:p-6">
        <EventDetailTopBar
          isStudent={false}
          eventId={eventId}
          eventStatus="Upcoming"
          isRegistered={false}
        />
        <EventDetailStatePanel type="loading" message="Loading event..." />
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="space-y-4 rounded-2xl bg-slate-100 p-5 md:p-6">
        <EventDetailTopBar
          isStudent={false}
          eventId={eventId}
          eventStatus="Upcoming"
          isRegistered={false}
        />
        <EventDetailStatePanel type="error" message={`Error: ${error}`} />
      </div>
    );
  }

  // 3. Not Found State
  if (!event) {
    return (
      <div className="space-y-4 rounded-2xl bg-slate-100 p-5 md:p-6">
        <EventDetailTopBar
          isStudent={false}
          eventId={eventId}
          eventStatus="Upcoming"
          isRegistered={false}
        />
        <EventDetailStatePanel type="empty" message="Event not found" />
      </div>
    );
  }

  const eventStatus = event.status;

  // 4. Success State
  return (
    <div className="space-y-6 rounded-2xl bg-slate-100 p-5 md:p-6">
      <EventDetailTopBar
        isStudent={isStudent}
        eventId={eventId}
        eventStatus={eventStatus}
        isRegistered={event?.isRegistered}
      />
      <EventOverview
        event={event}
        allowed={allowedToManage}
        canEdit={allowedToManage && eventStatus === "Upcoming"}
        isDeleting={isDeleting}
        onDelete={handleDeleteEvent}
        onEdit={handleEditEvent}
      />

      <EventDetailSubEventsSection
        subEventError={subEventError}
        subEvents={subEvents}
      />
    </div>
  );
}
