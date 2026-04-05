import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventAttendees, updateAttendeeAttendanceStatus } from "../../services/registration.service";
import { getEventById } from "../../services/event.service";
import { formatDate } from "../../utils/date.utils";
import AttendeesMobileList from "../../components/events/attendees/AttendeesMobileList";
import AttendeesDesktopTable from "../../components/events/attendees/AttendeesDesktopTable";

const AttendeesPage = () => {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventStatus, setEventStatus] = useState("Upcoming");
  const [actionStudentId, setActionStudentId] = useState(null);
  const [error, setError] = useState(null);

  const handleAttendanceAction = async (studentId, nextStatus) => {
    if (eventStatus !== "Ongoing") return;

    try {
      setActionStudentId(studentId);
      const updatedAttendee = await updateAttendeeAttendanceStatus(eventId, studentId, nextStatus);

      setAttendees((prev) =>
        prev.map((person) =>
          String(person.studentId) === String(studentId) ? { ...person, attendanceStatus: updatedAttendee.attendanceStatus } : person,
        ),
      );
    } catch (err) {
      console.error("Failed to update attendance status:", err);
    } finally {
      setActionStudentId(null);
    }
  };

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const [attendeeData, eventData] = await Promise.all([getEventAttendees(eventId), getEventById(eventId)]);

        setAttendees(attendeeData);
        setEventStatus(eventData?.status ?? "Upcoming");
        setError(null);
      } catch (error) {
        console.error("Failed to fetch attendees:", error);
        setError("Failed to load attendees");
      } finally {
        setLoading(false);
      }
    };
    fetchAttendees();
  }, [eventId]);

  if (loading) return <div className="p-8 text-center">Loading attendees...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Event Attendees</h1>

      {attendees.length === 0 ? (
        <div className="bg-gray-100 p-10 text-center rounded-lg border-2 border-dashed">
          <p className="text-gray-500">No attendees have registered for this event yet.</p>
        </div>
      ) : (
        <>
          <AttendeesMobileList
            attendees={attendees}
            eventStatus={eventStatus}
            actionStudentId={actionStudentId}
            onMarkAttendance={handleAttendanceAction}
            formatDate={formatDate}
          />

          <AttendeesDesktopTable
            attendees={attendees}
            eventStatus={eventStatus}
            actionStudentId={actionStudentId}
            onMarkAttendance={handleAttendanceAction}
            formatDate={formatDate}
          />
        </>
      )}
    </div>
  );
};

export default AttendeesPage;
