import { Router } from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getSubEvents,
  createSubEvent,
  registerForEvent,
  cancelRegistration,
  getEventAttendees,
  updateAttendanceStatus,
} from "../controllers/event.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

// Public routes (but still pass token if present for isRegistered flag)
router.get("/", protect, getEvents);
router.get("/:eventId", protect, getEventById);

// Sub-events
router.get("/:eventId/sub-events", protect, getSubEvents);
router.post(
  "/:eventId/sub-events",
  protect,
  authorize("Admin", "Teacher"),
  createSubEvent,
);

// Event CRUD
router.post("/", protect, authorize("Admin", "Teacher"), createEvent);
router.put("/:eventId", protect, authorize("Admin", "Teacher"), updateEvent);
router.delete("/:eventId", protect, authorize("Admin", "Teacher"), deleteEvent);

// Student registration
router.post(
  "/:eventId/register",
  protect,
  authorize("Student"),
  registerForEvent,
);
router.delete(
  "/:eventId/register",
  protect,
  authorize("Student"),
  cancelRegistration,
);

// Attendees (organiser view)
router.get(
  "/:eventId/attendees",
  protect,
  authorize("Admin", "Teacher"),
  getEventAttendees,
);
router.patch(
  "/:eventId/attendees/:studentId",
  protect,
  authorize("Admin", "Teacher"),
  updateAttendanceStatus,
);

export default router;
