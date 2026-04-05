import apiClient from "../lib/apiClient";

function normalizeAttendanceStatus(value) {
  if (value === "Present" || value === "Absent") return value;
  return "Pending";
}

function normalizeAttendeeData(registration = {}) {
  const student = registration.student ?? {};
  const studentId = registration.studentId ?? student._id ?? student.id ?? null;
  const firstName = student.firstName ?? "";
  const lastName = student.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim();

  return {
    registrationId: registration.registrationId ?? registration._id ?? null,
    eventId: registration.eventId ?? registration.event ?? null,
    studentId,
    name: registration.name ?? (fullName || null),
    email: registration.email ?? student.email ?? null,
    rollNumber: registration.rollNumber ?? student.rollNumber ?? null,
    registrationDate: registration.registrationDate ?? null,
    attendanceStatus: normalizeAttendanceStatus(registration.attendanceStatus),
  };
}

// POST /events/:eventId/register
export async function registerForEvent(eventId) {
  const { data } = await apiClient.post(`events/${eventId}/register`);
  return data;
}

// DELETE /events/:eventId/register
export async function cancelRegistration(eventId) {
  const { data } = await apiClient.delete(`events/${eventId}/register`);
  return data;
}

// GET /events/:eventId/attendees
export async function getEventAttendees(eventId) {
  const { data } = await apiClient.get(`events/${eventId}/attendees`);
  const attendees = Array.isArray(data) ? data : [];
  return attendees.map((entry) => normalizeAttendeeData(entry));
}

// GET /users/me/events
export async function getMyEvents() {
  const { data } = await apiClient.get("users/me/events");
  return Array.isArray(data) ? data : [];
}

// PATCH /events/:eventId/attendees/:studentId
export async function updateAttendeeAttendanceStatus(
  eventId,
  studentId,
  attendanceStatus,
) {
  const normalizedStatus = normalizeAttendanceStatus(attendanceStatus);
  const { data } = await apiClient.patch(
    `events/${eventId}/attendees/${studentId}`,
    { attendanceStatus: normalizedStatus },
  );
  return normalizeAttendeeData(data?.registration ?? data);
}
