export default function MyEventStatusBadge({ type, value }) {
  const resolveClassName = () => {
    if (type === "registration") {
      if (value === "Present") return "bg-green-100 text-green-700";
      if (value === "Absent") return "bg-red-100 text-red-700";
      return "bg-yellow-100 text-yellow-700";
    }

    if (type === "event") {
      if (value === "Completed") return "bg-slate-200 text-slate-700";
      if (value === "Ongoing") return "bg-blue-100 text-blue-700";
      return "bg-emerald-100 text-emerald-700";
    }

    return "bg-slate-100 text-slate-700";
  };

  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${resolveClassName()}`}>{value}</span>;
}