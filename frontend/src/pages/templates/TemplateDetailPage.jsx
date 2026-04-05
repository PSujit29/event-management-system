import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getTemplateById } from "../../services/template.service";
import { useAuth } from "../../hooks/useAuth";
import TemplateBackButton from "../../components/templates/TemplateBackButton";
import TemplateDetailStatePanel from "../../components/templates/TemplateDetailStatePanel";
import TemplateOverviewCard from "../../components/templates/TemplateOverviewCard";
import TemplateEventFlowGrid from "../../components/templates/TemplateEventFlowGrid";

export default function TemplateDetailPage() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const role = (user?.role || "").toLowerCase();
  const isAdmin = role === "admin";

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setLoading(true);
        const data = await getTemplateById(templateId);
        setTemplate(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load template");
        setTemplate(null);
      } finally {
        setLoading(false);
      }
    };

    if (templateId) {
      fetchTemplate();
    }
  }, [templateId]);

  if (loading) {
    return (
      <div className="space-y-4 rounded-2xl bg-slate-100 p-5 md:p-6">
        <TemplateBackButton onClick={() => navigate(-1)} />
        <TemplateDetailStatePanel type="loading" message="Loading template..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 rounded-2xl bg-slate-100 p-5 md:p-6">
        <TemplateBackButton onClick={() => navigate(-1)} />
        <TemplateDetailStatePanel type="error" message={`Error: ${error}`} />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="space-y-4 rounded-2xl bg-slate-100 p-5 md:p-6">
        <TemplateBackButton onClick={() => navigate(-1)} />
        <TemplateDetailStatePanel type="empty" message="Template not found" />
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl bg-slate-100 p-5 md:p-6">
      <TemplateBackButton onClick={() => navigate(-1)} />

      <TemplateOverviewCard template={template} templateId={templateId} isAdmin={isAdmin} />

      <TemplateEventFlowGrid subEvents={template.subEvents} />
    </div>
  );
}
