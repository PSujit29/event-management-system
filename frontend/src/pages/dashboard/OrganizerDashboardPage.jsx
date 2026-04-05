import { Suspense, lazy, useEffect, useState } from 'react';
import { getEvents } from '../../services/event.service';
import { toast } from 'sonner';
import { parseApiError } from '../../utils/error.utils';

const DashboardContent = lazy(() => import('../../components/dashboard/DashboardContent'));

function DashboardContentLoader() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-4 w-32 animate-pulse rounded-full bg-gray-200" />
        <div className="h-8 w-56 animate-pulse rounded-2xl bg-gray-200" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="h-28 animate-pulse rounded-xl bg-white shadow-sm" />
        <div className="h-28 animate-pulse rounded-xl bg-white shadow-sm" />
        <div className="h-28 animate-pulse rounded-xl bg-white shadow-sm" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="h-80 animate-pulse rounded-xl bg-white shadow-sm lg:col-span-2" />
        <div className="h-80 animate-pulse rounded-xl bg-white shadow-sm" />
      </div>
    </div>
  );
}

export default function OrganizerDashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    async function initDashboard() {
      setLoading(true);
      setError(null);
      try {
        // Fetches normalized data (using mock or real API based on your toggle)
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        const message = parseApiError(err, 'Dashboard load failed');
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    }
    initDashboard();
  }, [reloadKey]);

  if (loading) return <div className="p-8 animate-pulse text-gray-500">Loading Command Center...</div>;

  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="font-medium">Failed to load dashboard</p>
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

  // Extract all sub-events from the event objects for the Spotlight section
  const allSubEvents = events.flatMap(e => e.subEvents || []);

  return (
    <Suspense fallback={<DashboardContentLoader />}>
      <DashboardContent events={events} subEvents={allSubEvents} />
    </Suspense>
  );
}
