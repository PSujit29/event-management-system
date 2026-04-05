function deriveEventStatus(startDate, startTime = "00:00", duration = 0) {
  if (!startDate) return "Upcoming";

  const normalizedStartTime = startTime || "00:00";

  // ✅ Extract date-only part before combining with time
  const datePart = new Date(startDate).toISOString().slice(0, 10);
  const s = new Date(`${datePart}T${normalizedStartTime}:00`);

  if (Number.isNaN(s.getTime())) return "Upcoming";

  const e = new Date(s.getTime() + Number(duration || 0) * 3600000);
  const now = new Date();

  if (now < s) return "Upcoming";
  if (now < e) return "Ongoing";
  return "Completed";
}

export default deriveEventStatus;
