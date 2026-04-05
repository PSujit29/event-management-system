import { useState, useEffect } from "react";
import { getTemplates } from "../../services/template.service";
import TemplateListPageHeader from "../../components/templates/list/TemplateListPageHeader";
import TemplateEmptyState from "../../components/templates/list/TemplateEmptyState";
import TemplateCard from "../../components/templates/list/TemplateCard";

export default function TemplateListPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const data = await getTemplates();
        setTemplates(Array.isArray(data) ? data : data?.templates || []);
        setError(null);
      } catch (err) {
        console.error("Template fetch error:", err);
        const errorMsg = err.response?.data?.message || err.message || "Failed to load templates";
        setError(errorMsg);
        setTemplates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 rounded-2xl bg-slate-100 p-5 md:p-6">
        <h1 className="text-2xl font-bold text-slate-900">Templates</h1>
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">Loading templates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 rounded-2xl bg-slate-100 p-5 md:p-6">
        <h1 className="text-2xl font-bold text-slate-900">Templates</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 rounded-2xl bg-slate-100 p-5 md:p-6">
      <TemplateListPageHeader count={templates.length} />
      {templates.length === 0 ? (
        <TemplateEmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard key={template.templateId} template={template} />
          ))}
        </div>
      )}
    </div>
  );
}
