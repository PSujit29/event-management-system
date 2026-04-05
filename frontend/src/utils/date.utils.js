function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

export function formatDateTime(dateStr, startTime = null) {
  if (!dateStr) return "—";

  const dateTimeStr = startTime
    ? `${dateStr.toString().slice(0, 10)}T${startTime}:00`
    : dateStr;

  const date = new Date(dateTimeStr);
  if (isNaN(date.getTime())) return "—";

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(iso, locale = "en-US") {
  if (!iso) return "TBD";
  const date = new Date(iso);
  if (!isValidDate(date)) return "TBD";
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function formatTime(iso, locale = "en-US") {
  if (!iso) return "TBD";
  const date = new Date(iso);
  if (!isValidDate(date)) return "TBD";
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isToday(dateString) {
  if (!dateString) return false;
  // Handle date-only strings (YYYY-MM-DD) to avoid timezone issues
  if (
    typeof dateString === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(dateString)
  ) {
    const [year, month, day] = dateString.split("-").map(Number);
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() + 1 === month &&
      today.getDate() === day
    );
  }
  // Fallback for ISO strings with time
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return false;
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function formatDurationHours(hours) {
  const numericHours = Number(hours || 0);
  const unit = numericHours === 1 ? "hour" : "hours";
  return `${numericHours} ${unit}`;
}
