import { Router } from "express";
import {
  getTemplates,
  getTemplateById,
  createTemplate,
  deleteTemplate,
  cloneTemplateToEvent,
} from "../controllers/template.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

// All template routes require auth + Admin or Teacher
router.use(protect, authorize("Admin", "Teacher"));

router.get("/", getTemplates);
router.get("/:templateId", getTemplateById);
router.post("/", authorize("Admin"), createTemplate);
router.delete("/:templateId", authorize("Admin"), deleteTemplate);
router.post(
  "/:templateId/create-event",
  authorize("Admin"),
  cloneTemplateToEvent,
);

export default router;
