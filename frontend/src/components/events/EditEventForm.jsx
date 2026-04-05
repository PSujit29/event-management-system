import { LabeledInput, LabeledDateInput, LabeledTextArea } from "../form/input";
import { FormButton } from "../form/FormButton";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import { updateEvent } from "../../services/event.service";
import { parseApiError } from "../../utils/error.utils";

const DATE_INPUT_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_INPUT_REGEX = /^\d{2}:\d{2}$/;

function isValidDateInput(value) {
  if (!DATE_INPUT_REGEX.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsedDate = new Date(value + "T00:00:00");
  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() + 1 === month &&
    parsedDate.getDate() === day
  );
}

function isValidTimeInput(value) {
  if (!TIME_INPUT_REGEX.test(value)) return false;
  const [hours, minutes] = value.split(":").map(Number);
  return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
}

function isTodayOrFuture(dateStr, timeStr) {
  const now = new Date();
  const eventDateTime = new Date(dateStr + "T" + timeStr + ":00");
  return eventDateTime >= now;
}

const editEventSchema = z
  .object({
    name: z.string().trim().min(1, "Event Name is required"),
    description: z.string().trim().min(1, "Event Description is required"),
    startDate: z
      .string()
      .trim()
      .min(1, "Start Date is required")
      .refine(isValidDateInput, "Invalid date format"),
    startTime: z
      .string()
      .trim()
      .min(1, "Start Time is required")
      .refine(isValidTimeInput, "Start Time must be in HH:MM format"),
    duration: z.coerce.number().positive("Duration must be at least 1 hour"),
    subEvents: z.array(
      z.object({
        name: z.string().trim().min(1, "Sub-Event Name is required"),
        duration: z.coerce
          .number()
          .positive("Sub-Event Duration must be at least 1 hour"),
        description: z
          .string()
          .trim()
          .min(1, "Sub-Event Description is required"),
      }),
    ),
  })
  .refine(
    (data) =>
      data.subEvents.reduce((sum, sub) => sum + sub.duration, 0) <=
      data.duration,
    {
      message: "Total sub-event hours cannot exceed the main event duration",
      path: ["duration"],
    },
  )

export default function EditEventForm({ eventData }) {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { ...eventData, startTime: eventData?.startTime || "00:00" },
    resolver: zodResolver(editEventSchema),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subEvents",
  });

  useEffect(() => {
    if (eventData) {
      reset({ ...eventData, startTime: eventData.startTime || "00:00" });
    }
  }, [eventData, reset]);

  const submitForm = async (data) => {
    try {
      await updateEvent(eventData.eventId, data); 

      toast.success("Event updated successfully!");
      navigate(`/user/events/${eventData.eventId}`, { replace: true });
    } catch (err) {
      toast.error(parseApiError(err, "Failed to update event."));
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-5">
      <fieldset
        disabled={isSubmitting}
        className="flex flex-col gap-5 border-none p-0 m-0"
      >
        <LabeledInput
          label="Name"
          name="name"
          handler={control}
          errMsg={errors?.name?.message}
        />
        <LabeledTextArea
          label="Description"
          name="description"
          handler={control}
          errMsg={errors?.description?.message}
        />

        <LabeledDateInput
          label="Start Date"
          name="startDate"
          handler={control}
          errMsg={errors?.startDate?.message}
        />
        <LabeledInput
          type="time"
          label="Start Time"
          name="startTime"
          handler={control}
          errMsg={errors?.startTime?.message}
        />

        <LabeledInput
          type="number"
          label="Duration (hours)"
          name="duration"
          handler={control}
          errMsg={errors?.duration?.message}
        />

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Sub-Events</h3>
            <button
              type="button"
              className="cursor-pointer px-4 py-2 text-sm font-medium text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50"
              onClick={() => append({ name: "", duration: 1, description: "" })}
            >
              + Add Sub-Event
            </button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-5 rounded-xl bg-gray-50 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500">
                    Sub-Event {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex flex-col gap-5">
                  <LabeledInput
                    label="Name"
                    name={`subEvents.${index}.name`}
                    handler={control}
                    errMsg={errors?.subEvents?.[index]?.name?.message}
                  />
                  <LabeledInput
                    type="number"
                    label="Duration"
                    name={`subEvents.${index}.duration`}
                    handler={control}
                    errMsg={errors?.subEvents?.[index]?.duration?.message}
                  />
                  <LabeledTextArea
                    label="Description"
                    name={`subEvents.${index}.description`}
                    handler={control}
                    errMsg={errors?.subEvents?.[index]?.description?.message}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </fieldset>

      <div className="flex w-full gap-3 mt-4">
        <FormButton
          type="button"
          variant="danger"
          txt="Cancel"
          onClick={() => navigate(-1)}
        />
        <FormButton
          type="submit"
          txt={isSubmitting ? "Saving..." : "Save Changes"}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
