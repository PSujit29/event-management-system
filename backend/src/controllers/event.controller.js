import mongoose from "mongoose";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import User from "../models/User.js";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function deriveStatus(doc) {
  if (doc.status === "Cancelled") return "Cancelled";

  const now = new Date();

  // ✅ Combine startDate + startTime, same as the frontend does
  const datePart = new Date(doc.startDate).toISOString().slice(0, 10);
  const timePart = doc.startTime || "00:00";
  const start = new Date(`${datePart}T${timePart}:00`);

  if (now < start) return "Upcoming";

  const endMs = doc.duration ? start.getTime() + doc.duration * 3600000 : null;
  if (endMs && now > endMs) return "Completed";

  return "Ongoing";
}

function formatEvent(event, isRegistered = false) {
  const doc = event.toObject ? event.toObject() : event;
  return {
    eventId: doc._id,
    name: doc.name,
    description: doc.description,
    eventUrl: doc.eventUrl,
    startDate: doc.startDate,
    startTime: doc.startTime,
    duration: doc.duration,
    status: deriveStatus(doc), // ✅ always fresh, never stale DB value
    isRegistered,
    subEvents: (doc.subEvents || []).map((sub) => ({
      subEventId: sub._id,
      eventId: doc._id,
      name: sub.name,
      description: sub.description,
      startDate: sub.startDate,
      duration: sub.duration,
    })),
    createdBy: doc.createdBy,
    clonedFrom: doc.clonedFrom,
    createdAt: doc.createdAt,
  };
}

async function isStudentRegistered(eventId, userId) {
  if (!userId) return false;
  const reg = await Registration.findOne({ event: eventId, student: userId });
  return Boolean(reg);
}

// ─── Events ──────────────────────────────────────────────────────────────────

// GET /events
export const getEvents = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) filter.name = { $regex: search, $options: "i" };

    const events = await Event.find(filter).sort({ startDate: 1 });

    const enriched = await Promise.all(
      events.map(async (event) => {
        const registered = await isStudentRegistered(event._id, req.user?._id);
        return formatEvent(event, registered);
      }),
    );

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /events/:eventId
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found." });

    const registered = await isStudentRegistered(event._id, req.user?._id);
    res.json(formatEvent(event, registered));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /events  (Admin, Teacher only)
export const createEvent = async (req, res) => {
  try {
    const { name, description, startDate, startTime, duration, subEvents } =
      req.body;

    if (!name || !startDate) {
      return res
        .status(400)
        .json({ message: "name and startDate are required." });
    }

    // Auto-generate unique eventUrl from name + timestamp
    const eventUrl =
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-") +
      "-" +
      Date.now();

    const event = await Event.create({
      name,
      description,
      eventUrl,
      startDate,
      startTime,
      duration,
      subEvents: subEvents || [],
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Event created successfully",
      event: formatEvent(event),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /events/:eventId  (Admin, Teacher only)
export const updateEvent = async (req, res) => {
  try {
    const {
      name,
      description,
      eventUrl,
      startDate,
      startTime,
      duration,
      status,
    } = req.body;
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found." });

    if (name) event.name = name;
    if (description !== undefined) event.description = description;
    if (eventUrl) event.eventUrl = eventUrl;
    if (startDate) event.startDate = startDate;
    if (startTime) event.startTime = startTime;
    if (duration !== undefined) event.duration = duration;
    if (status) event.status = status;

    await event.save();
    res.json({
      message: "Event updated successfully",
      event: formatEvent(event),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /events/:eventId  (Admin, Teacher only)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found." });

    // Also remove all registrations for this event
    await Registration.deleteMany({ event: req.params.eventId });

    res.json({
      message: "Event deleted successfully",
      eventId: req.params.eventId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Sub-Events ──────────────────────────────────────────────────────────────

// GET /events/:eventId/sub-events
export const getSubEvents = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found." });

    const subEvents = event.subEvents.map((sub) => ({
      subEventId: sub._id,
      eventId: event._id,
      name: sub.name,
      description: sub.description,
      startDate: sub.startDate,
      duration: sub.duration,
    }));

    res.json(subEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /events/:eventId/sub-events  (Admin, Teacher only)
export const createSubEvent = async (req, res) => {
  try {
    const { name, description, startDate, duration } = req.body;
    if (!name) return res.status(400).json({ message: "name is required." });

    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found." });

    event.subEvents.push({ name, description, startDate, duration });
    await event.save();

    const newSub = event.subEvents[event.subEvents.length - 1];
    res.status(201).json({
      message: "Sub-event added successfully",
      subEvent: {
        subEventId: newSub._id,
        eventId: event._id,
        name: newSub.name,
        description: newSub.description,
        startDate: newSub.startDate,
        duration: newSub.duration,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Event Registration ───────────────────────────────────────────────────────

// POST /events/:eventId/register  (Student only)
export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found." });

    const existing = await Registration.findOne({
      event: event._id,
      student: req.user._id,
    });
    if (existing)
      return res
        .status(409)
        .json({ message: "You are already registered for this event." });

    const registration = await Registration.create({
      event: event._id,
      student: req.user._id,
    });

    res.status(201).json({
      message: "Successfully registered for the event",
      registration: {
        registrationId: registration._id,
        eventId: event._id,
        studentId: req.user._id,
        registrationDate: registration.registrationDate,
        attendanceStatus: registration.attendanceStatus,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /events/:eventId/register  (Student only)
export const cancelRegistration = async (req, res) => {
  try {
    const result = await Registration.findOneAndDelete({
      event: req.params.eventId,
      student: req.user._id,
    });
    if (!result)
      return res.status(404).json({ message: "Registration not found." });

    res.json({
      success: true,
      message: "Registration cancelled successfully.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Attendees ───────────────────────────────────────────────────────────────

// GET /events/:eventId/attendees  (Admin, Teacher only)
export const getEventAttendees = async (req, res) => {
  try {
    const registrations = await Registration.find({
      event: req.params.eventId,
    }).populate("student", "firstName lastName email rollNumber");

    const attendees = registrations.map((reg) => ({
      registrationId: reg._id,
      eventId: reg.event,
      studentId: reg.student._id,
      name: `${reg.student.firstName} ${reg.student.lastName}`.trim(),
      email: reg.student.email,
      rollNumber: reg.student.rollNumber,
      registrationDate: reg.registrationDate,
      attendanceStatus: reg.attendanceStatus,
    }));

    res.json(attendees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /events/:eventId/attendees/:studentId  (Admin, Teacher only)
export const updateAttendanceStatus = async (req, res) => {
  try {
    const { attendanceStatus } = req.body;
    const allowed = ["Pending", "Present", "Absent"];
    if (!allowed.includes(attendanceStatus)) {
      return res.status(400).json({
        message: `attendanceStatus must be one of: ${allowed.join(", ")}`,
      });
    }

    const registration = await Registration.findOneAndUpdate(
      { event: req.params.eventId, student: req.params.studentId },
      { attendanceStatus },
      { new: true },
    ).populate("student", "firstName lastName email rollNumber");

    if (!registration)
      return res.status(404).json({ message: "Registration not found." });

    res.json({
      registration: {
        registrationId: registration._id,
        eventId: registration.event,
        studentId: registration.student._id,
        name: `${registration.student.firstName} ${registration.student.lastName}`.trim(),
        email: registration.student.email,
        rollNumber: registration.student.rollNumber,
        attendanceStatus: registration.attendanceStatus,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /users/me/events  (Student only) - handled in user routes but logic here
export const getMyRegisteredEvents = async (req, res) => {
  try {
    const registrations = await Registration.find({ student: req.user._id });

    const result = registrations.map((reg) => ({
      registrationId: reg._id,
      eventId: reg.event,
      studentId: reg.student,
      registrationDate: reg.registrationDate,
      attendanceStatus: reg.attendanceStatus,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
