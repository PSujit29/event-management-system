import Template from "../models/Template.js";
import Event from "../models/Event.js";

function deriveStatus(startDate) {
  const now = new Date();
  const start = new Date(startDate);
  if (now < start) return "Upcoming";
  return "Ongoing";
}

function formatTemplate(doc) {
  const t = doc.toObject ? doc.toObject() : doc;
  return {
    templateId: t._id,
    name: t.name,
    description: t.description,
    totalDuration: t.totalDuration,
    subEvents: (t.subEvents || []).map((s) => ({
      subEventId: s._id,
      name: s.name,
      description: s.description,
      duration: s.duration,
    })),
    createdAt: t.createdAt,
  };
}

// GET /templates
export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 });
    res.json(templates.map(formatTemplate));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /templates/:templateId
export const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.templateId);
    if (!template)
      return res.status(404).json({ message: "Template not found." });
    res.json(formatTemplate(template));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /templates  (Admin only)
export const createTemplate = async (req, res) => {
  try {
    const { name, description, totalDuration, subEvents } = req.body;
    if (!name) return res.status(400).json({ message: "name is required." });

    const template = await Template.create({
      name,
      description,
      totalDuration,
      subEvents: subEvents || [],
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Template created successfully",
      template: formatTemplate(template),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /templates/:templateId  (Admin only)
export const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.templateId);
    if (!template)
      return res.status(404).json({ message: "Template not found." });
    res.json({ message: "Template deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /templates/:templateId/create-event
export const cloneTemplateToEvent = async (req, res) => {
  try {
    const template = await Template.findById(req.params.templateId);
    if (!template)
      return res.status(404).json({ message: "Template not found." });

    const { name, description, startDate, startTime } = req.body;
    if (!name || !startDate) {
      return res
        .status(400)
        .json({ message: "name and startDate are required." });
    }

    // Auto-generate eventUrl from name + timestamp to ensure uniqueness
    const eventUrl =
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-") +
      "-" +
      Date.now();

    const existing = await Event.findOne({ eventUrl });
    if (existing)
      return res.status(409).json({ message: "eventUrl is already taken." });

    const baseDate = new Date(startDate);

    // Build sub-events from template, each 1 day apart
    const generatedSubEvents = template.subEvents.map((sub, index) => {
      const subDate = new Date(baseDate);
      subDate.setDate(subDate.getDate() + index);
      return {
        name: sub.name,
        description: sub.description,
        startDate: subDate,
        duration: sub.duration,
      };
    });

    const computedDuration =
      template.totalDuration ||
      template.subEvents.reduce((sum, s) => sum + (s.duration || 0), 0) ||
      1;

    const event = await Event.create({
      name,
      description: description || template.description,
      eventUrl,
      startDate,
      startTime: startTime || "00:00",
      duration: computedDuration,
      status: deriveStatus(startDate),
      subEvents: generatedSubEvents,
      clonedFrom: String(template._id),
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Event created from template successfully",
      event: {
        eventId: event._id,
        name: event.name,
        description: event.description,
        eventUrl: event.eventUrl,
        startDate: event.startDate,
        startTime: event.startTime,
        duration: event.duration,
        status: event.status,
        subEvents: event.subEvents,
        clonedFrom: event.clonedFrom,
        createdAt: event.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
