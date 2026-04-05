import { Router } from "express";
import { getMe, getUserById, addUser } from "../controllers/user.controller.js";
import { getMyRegisteredEvents } from "../controllers/event.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

// POST /users/add 
router.post("/add", addUser);

// All routes below require authentication
router.use(protect);

// GET /users/me
router.get("/me", getMe);

// GET /users/me/events  — Student's registered events
router.get("/me/events", authorize("Student"), getMyRegisteredEvents);

// GET /users/:userId
router.get("/:userId", getUserById);

export default router;