export default function ProfilePersonalInfoCard({ displayName, email, roleSpecificField }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Personal Information</h3>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-500">Full Name</label>
          <p className="mt-1 font-semibold text-slate-900">{displayName}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500">Email Address</label>
          <p className="mt-1 font-semibold text-slate-900">{email ?? "N/A"}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500">{roleSpecificField.label}</label>
          <p className="mt-1 font-semibold text-slate-900">{roleSpecificField.value}</p>
        </div>
      </div>
    </div>
  );
}