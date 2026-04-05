import apiClient from "../lib/apiClient";

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function pickEventPayload(data) {
  return data?.event ?? data;
}

function pickSubEventPayload(data) {
  return data?.subEvent ?? data;
}

function normalizeEventData(raw = {}) {
  const normalizedEventId = raw.eventId ?? raw._id ?? raw.id ?? null;
  const normalizedStartDate = raw.startDate ?? null;
  const normalizedDuration =
    raw.duration ??
    raw.totalDuration ??
    (Array.isArray(raw.subEvents)
      ? raw.subEvents.reduce((sum, sub) => sum + Number(sub?.duration || 0), 0)
      : null);

  return {
    eventId: normalizedEventId,
    name: raw.name ?? "",
    description: raw.description ?? "",
    eventUrl: raw.eventUrl ?? "",
    startDate: normalizedStartDate,
    startTime: raw.startTime ?? "00:00",
    duration: normalizedDuration,
    status: raw.status ?? "",
    isRegistered: Boolean(raw.isRegistered),
    subEvents: toArray(raw.subEvents).map((subEvent, index) =>
      normalizeSubEventData(subEvent, {
        eventId: normalizedEventId,
        startDate: normalizedStartDate,
        index,
      }),
    ),
    createdBy: raw.createdBy ?? null,
    clonedFrom: raw.clonedFrom ?? null,
    createdAt: raw.createdAt ?? null,
  };
}

function normalizeSubEventData(raw = {}, parent = {}) {
  return {
    subEventId: raw.subEventId ?? raw._id ?? raw.id ?? null,
    eventId: raw.eventId ?? parent.eventId ?? null,
    name: raw.name ?? "",
    description: raw.description ?? "",
    startDate: raw.startDate ?? raw.date ?? parent.startDate ?? null,
    duration: raw.duration ?? null,
  };
}

// GET /events
export async function getEvents(params = {}) {
  const { data } = await apiClient.get("events", { params });
  return toArray(data).map(normalizeEventData);
}

// GET /events/:eventId
export async function getEventById(eventId) {
  const { data } = await apiClient.get(`events/${eventId}`);
  return normalizeEventData(pickEventPayload(data));
}

// POST /events
export async function createEvent(payload) {
  const { data } = await apiClient.post("events", payload);
  return normalizeEventData(pickEventPayload(data));
}

// PUT /events/:eventId
export async function updateEvent(eventId, payload) {
  const { data } = await apiClient.put(`events/${eventId}`, payload);
  return normalizeEventData(pickEventPayload(data));
}

// DELETE /events/:eventId
export async function deleteEvent(eventId) {
  const { data } = await apiClient.delete(`events/${eventId}`);
  return {
    message: data?.message ?? "Event deleted",
    eventId: data?.eventId ?? eventId,
  };
}

// GET /events/:eventId/sub-events
export async function getSubEvents(eventId) {
  const { data } = await apiClient.get(`events/${eventId}/sub-events`);
  return toArray(data).map(normalizeSubEventData);
}

// POST /events/:eventId/sub-events
export async function createSubEvent(eventId, payload) {
  const { data } = await apiClient.post(
    `events/${eventId}/sub-events`,
    payload,
  );
  return normalizeSubEventData(pickSubEventPayload(data));
}
