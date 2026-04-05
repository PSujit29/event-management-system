import { Suspense, lazy, useEffect, useState } from 'react';
import { getMyEvents } from '../../services/registration.service';
import { getEvents } from '../../services/event.service';
import { toast } from 'sonner';
import { parseApiError } from '../../utils/error.utils';

const StudentDashboardContent = lazy(() => import('../../components/dashboard/StudentDashboardContent'));

function StudentDashboardContentLoader() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-8 w-48 animate-pulse rounded-2xl bg-gray-200" />
        <div className="h-4 w-72 animate-pulse rounded-full bg-gray-200" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="h-32 animate-pulse rounded-2xl bg-white shadow-sm" />
        <div className="h-32 animate-pulse rounded-2xl bg-white shadow-sm" />
      </div>
      <div className="h-40 animate-pulse rounded-2xl bg-gray-900" />
      <div className="h-96 animate-pulse rounded-2xl bg-white shadow-sm" />
    </div>
  );
}

export default function StudentDashboardPage() {
  const [data, setData] = useState({ registrations: [], allEvents: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    async function loadStudentData() {
      setLoading(true);
      setError(null);
      try {
        const [myRegs, events] = await Promise.all([getMyEvents(), getEvents()]);
        setData({ registrations: myRegs, allEvents: events });
      } catch (err) {
        const message = parseApiError(err, 'Failed to load student dashboard');
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    }
    loadStudentData();
  }, [reloadKey]);

  if (loading) return <div className="p-10 animate-pulse text-gray-400">Loading your schedule...</div>;

  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="font-medium">Failed to load student dashboard</p>
          <p className="mt-1 text-sm">{error}</p>
          <button
            type="button"
            onClick={() => setReloadKey((prev) => prev + 1)}
            className="mt-3 rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<StudentDashboardContentLoader />}>
      <StudentDashboardContent registrations={data.registrations} allEvents={data.allEvents} />
    </Suspense>
  );
}
