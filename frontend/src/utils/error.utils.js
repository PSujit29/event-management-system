const STATUS_MESSAGE_MAP = {
  400: "Invalid request. Please check your input and try again.",
  401: "You are not authorized. Please log in again.",
  404: "Requested resource was not found.",
  409: "This action conflicts with existing data.",
  500: "Server error. Please try again shortly.",
};

export function getApiStatusMessage(status) {
  return STATUS_MESSAGE_MAP[status] || null;
}

export function parseApiError(error, fallbackMessage = "Something went wrong") {
  if (!error) return fallbackMessage;

  const serverMessage = error?.response?.data?.message;
  if (typeof serverMessage === "string" && serverMessage.trim()) return serverMessage;

  const statusMessage = getApiStatusMessage(error?.response?.status);
  if (statusMessage) return statusMessage;

  if (error?.code === "ERR_NETWORK") return "Network error. Please check your internet connection.";
  if (typeof error?.message === "string" && error.message.trim()) return error.message;

  return fallbackMessage;
}
