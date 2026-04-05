export default function CloneTemplateErrorAlert({ error }) {
  if (!error) return null;

  return (
    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
      <p className="text-sm text-red-700 font-medium">{error}</p>
    </div>
  );
}