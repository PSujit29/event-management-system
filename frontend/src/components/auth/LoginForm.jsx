import { LabeledInput } from "../form/input";
import { FormButton } from "../form/FormButton";
import { RedirectLink } from "../ui/AuthLink";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";
import { parseApiError } from "../../utils/error.utils";
import { z } from "zod";

const loginDTO = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const LoginDefaultValue = { email: "", password: "" };
export default function LoginForm() {
  // prettier-ignore
  const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({ 
    defaultValues: LoginDefaultValue, 
    resolver: zodResolver(loginDTO) 
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };
      await login(payload);
      toast.success("Login successful!");
      navigate("/user");
    } catch (err) {
      toast.error(parseApiError(err, "Login failed. Please try again."));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLoginSubmit)}
        className="flex flex-col gap-5 w-full"
      >
        <fieldset
          disabled={isSubmitting}
          className="flex flex-col gap-5 border-none p-0 m-0"
        >
          <LabeledInput
            type="email"
            label="Email"
            name="email"
            handler={control}
            errMsg={errors?.email?.message}
          />
          <LabeledInput
            type="password"
            label="Password"
            name="password"
            handler={control}
            errMsg={errors?.password?.message}
          />
        </fieldset>
        <div>
          <div className="flex w-full justify-end">
            <RedirectLink
              to="/forget-password"
              variant="link"
              txt="Forget Password?"
              className="italic font-medium"
            />
          </div>

          <div className="flex w-full gap-3 mt-4">
            <FormButton
              type="reset"
              variant="danger"
              txt="Cancel"
              disabled={isSubmitting}
            />
            <FormButton
              type="submit"
              txt={isSubmitting ? "Logging in..." : "Login"}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </form>
    </>
  );
}
