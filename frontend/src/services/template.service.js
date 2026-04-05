import apiClient from "../lib/apiClient";

function formatTemplate(raw = {}) {
  const t = raw.template ?? raw;
  return {
    templateId: t.templateId ?? t._id ?? t.id ?? null,
    name: t.name ?? "",
    description: t.description ?? "",
    totalDuration: t.totalDuration ?? null,
    subEvents: Array.isArray(t.subEvents)
      ? t.subEvents.map((s) => ({
          subEventId: s.subEventId ?? s._id ?? s.id ?? null,
          name: s.name ?? "",
          description: s.description ?? "",
          duration: s.duration ?? null,
        }))
      : [],
    createdAt: t.createdAt ?? null,
  };
}

// GET /templates
export async function getTemplates() {
  const { data } = await apiClient.get("templates");
  return Array.isArray(data) ? data.map(formatTemplate) : [];
}

// GET /templates/:templateId
export async function getTemplateById(templateId) {
  const { data } = await apiClient.get(`templates/${templateId}`);
  return formatTemplate(data);
}

// POST /templates
export async function createTemplate(payload) {
  const { data } = await apiClient.post("templates", payload);
  return formatTemplate(data);
}

// DELETE /templates/:templateId
export async function deleteTemplate(templateId) {
  const { data } = await apiClient.delete(`templates/${templateId}`);
  return data;
}

// POST /templates/:templateId/create-event
export async function cloneTemplateToEvent(templateId, payload) {
  const { data } = await apiClient.post(
    `templates/${templateId}/create-event`,
    payload,
  );
  return data?.event ?? data;
}
