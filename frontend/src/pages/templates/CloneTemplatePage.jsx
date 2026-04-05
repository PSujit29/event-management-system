import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cloneTemplateToEvent, getTemplateById } from "../../services/template.service";
import { LabeledDateInput, LabeledInput, LabeledTextArea } from "../../components/form/input";
import { parseApiError } from "../../utils/error.utils";
import CloneTemplatePageHeader from "../../components/templates/CloneTemplatePageHeader";
import CloneTemplateErrorAlert from "../../components/templates/CloneTemplateErrorAlert";
import CloneTemplateFormActions from "../../components/templates/CloneTemplateFormActions";
import CloneTemplateSuccessSummary from "../../components/templates/CloneTemplateSuccessSummary";

const TIME_INPUT_REGEX = /^\d{2}:\d{2}$/;

function isValidTimeInput(value) {
  if (!TIME_INPUT_REGEX.test(value)) return false;
  const [hours, minutes] = value.split(":").map(Number);
  return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
}

const cloneTemplateSchema = z.object({
  name: z.string().trim().min(1, "Event Name is required"),
  description: z.string().trim().optional(),
  startDate: z.string().trim().min(1, "Start Date is required"),
  startTime: z.string().trim().min(1, "Event Time is required").refine(isValidTimeInput, "Event Time must be in HH:MM format"),
});

export default function CloneTemplatePage() {
  const { templateId } = useParams();
  const navigate = useNavigate();

  const [templateName, setTemplateName] = useState("");
  const [error, setError] = useState("");
  const [clonedEventSummary, setClonedEventSummary] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: "", description: "", startDate: "", startTime: "" }, resolver: zodResolver(cloneTemplateSchema) });

  useEffect(() => {
    async function fetchTemplateInfo() {
      try {
        const template = await getTemplateById(templateId);
        if (template) setTemplateName(template.name);
      } catch (err) {
        setError(parseApiError(err, "Failed to load template details."));
      }
    }

    if (templateId) fetchTemplateInfo();
  }, [templateId]);

  const submitForm = async (data) => {
    setError("");

    try {
      const newEvent = await cloneTemplateToEvent(templateId, data);
      setClonedEventSummary(newEvent);

      setTimeout(() => {
        navigate(`/user/events/${newEvent.eventId}`);
      }, 3000);
    } catch (err) {
      setError(parseApiError(err, "An error occurred while cloning the template."));
    }
  };

  if (clonedEventSummary) {
    return <CloneTemplateSuccessSummary clonedEventSummary={clonedEventSummary} />;
  }

  return (
    <div className="w-full bg-gray-50 py-6 px-2 sm:px-4 lg:px-8 flex justify-center">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <CloneTemplatePageHeader templateName={templateName} />

        <CloneTemplateErrorAlert error={error} />

        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          <fieldset disabled={isSubmitting} className="space-y-6 border-none p-0 m-0">
            <LabeledInput
              type="text"
              label="Event Name"
              name="name"
              handler={control}
              errMsg={errors?.name?.message}
              placeholder="e.g., Q3 Engineering Workshop"
            />

            <LabeledTextArea
              label="Description"
              name="description"
              handler={control}
              errMsg={errors?.description?.message}
              placeholder="Provide context or a brief overview for the attendees..."
            />

            <LabeledDateInput label="Start Date" name="startDate" handler={control} errMsg={errors?.startDate?.message} />

            <LabeledInput type="time" label="Event Time" name="startTime" handler={control} errMsg={errors?.startTime?.message} />
          </fieldset>

          <CloneTemplateFormActions isSubmitting={isSubmitting} onCancel={() => navigate(-1)} />
        </form>
      </div>
    </div>
  );
}
