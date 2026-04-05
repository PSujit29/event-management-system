import { LabeledInput } from "../form/input";
import { FormButton } from "../form/FormButton";
import { useForm } from "react-hook-form";
import { RedirectLink } from "../ui/AuthLink";
import { toast } from "sonner";

export default function ForgetPasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: { email: "" } });

  const sendReset = async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    toast.success("Reset link sent to your email!");
  };

  return (
    <form onSubmit={handleSubmit(sendReset)} className="flex flex-col gap-4">
      <LabeledInput type="email" label="Email" name="email" placeholder="Enter your email" handler={control} />

      <div className="flex flex-col w-full gap-4 mt-2">
        <FormButton type="submit" txt={isSubmitting ? "Sending..." : "Send Reset Link"} disabled={isSubmitting} />
        <div className="text-center">
          <RedirectLink to="/login" txt="← Back to Login" variant="link" className="sm:text-sm text-gray-500" />
        </div>
      </div>
    </form>
  );
}
