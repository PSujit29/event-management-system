export default function AttendanceActionCell({ eventStatus, attendanceStatus, isPending, onMarkPresent, onMarkAbsent }) {
  if (eventStatus === "Ongoing") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onMarkPresent}
          disabled={isPending}
          className="rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Mark Present"}
        </button>
        <button
          type="button"
          onClick={onMarkAbsent}
          disabled={isPending}
          className="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Mark Absent"}
        </button>
      </div>
    );
  }

  if (eventStatus === "Completed") {
    return <span className="text-xs font-medium text-slate-500">{attendanceStatus}</span>;
  }

  return <span className="text-xs font-medium text-amber-600">Pending</span>;
}