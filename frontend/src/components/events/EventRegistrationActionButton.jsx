import { useState, useEffect } from "react";
import { registerForEvent, cancelRegistration } from "../../services/registration.service";
import { toast } from "sonner";
import { parseApiError } from "../../utils/error.utils";

export default function EventRegistrationActionButton({ eventId, initialIsRegistered, eventStatus }) {
  const [isRegistered, setIsRegistered] = useState(initialIsRegistered);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsRegistered(Boolean(initialIsRegistered));
  }, [initialIsRegistered]);

  const isClosed = eventStatus !== "Upcoming";

  const handleClick = async () => {
    if (isPending || isClosed) return;

    if (isRegistered) {
      const isConfirmed = window.confirm("Are you sure you want to cancel your registration?");
      if (!isConfirmed) return;
    }

    setIsPending(true);
    try {
      if (isRegistered) {
        await cancelRegistration(eventId);
        setIsRegistered(false);
        toast.success("Registration cancelled successfully!");
      } else {
        await registerForEvent(eventId);
        setIsRegistered(true);
        toast.success("Registered successfully");
      }
    } catch (err) {
      toast.error(parseApiError(err, "Failed to update registration"));
    } finally {
      setIsPending(false);
    }
  };

  if (isClosed) {
    return (
      <button disabled className="px-4 py-2 rounded-lg text-white bg-gray-500 cursor-not-allowed">
        Registration Closed
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`px-4 py-2 rounded-lg text-white transition ${
        isRegistered ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
      } ${isPending ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {isPending ? "Processing..." : isRegistered ? "Cancel Registration" : "Register"}
    </button>
  );
}
