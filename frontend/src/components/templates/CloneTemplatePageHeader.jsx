export default function CloneTemplatePageHeader({ templateName }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-extrabold text-gray-900">Create Event from Template</h1>
      {templateName && (
        <span className="inline-block mt-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full">Template: {templateName}</span>
      )}
      <p className="mt-4 text-sm text-gray-500">
        Fill in the details below. We will use the template structure to automatically generate your event and schedule all required
        sub-sessions.
      </p>
    </div>
  );
}