export default function ProfileAccountStatusCard({ userId }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Account Status</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">User ID</span>
          <span className="font-mono text-sm font-bold text-slate-900">{userId}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Verification</span>
          <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </div>
      </div>
    </div>
  );
}