import { LabeledInput, SelectInput } from "../form/input";
import { FormButton } from "../form/FormButton";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";
import { parseApiError } from "../../utils/error.utils";

const registerDTO = z
  .object({
    firstName: z.string().trim().min(1, "First Name is required"),
    lastName: z.string().trim().min(1, "Last Name is required"),
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    role: z.enum(["Student", "Teacher", "Admin"]),
    rollNumber: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) =>
      data.role !== "Student" ||
      (data.rollNumber && data.rollNumber.trim().length > 0),
    { message: "Roll Number is required for students", path: ["rollNumber"] },
  );

export default function RegisterForm() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Student",
      rollNumber: "",
    },
    resolver: zodResolver(registerDTO),
  });

  const selectedRole = useWatch({ control, name: "role" });

  const submitForm = async (data) => {
    if (isSubmitting) return;
    const { confirmPassword: _, ...payload } = data;
    // Remove rollNumber if not a student
    if (payload.role !== "Student") delete payload.rollNumber;

    try {
      await registerUser(payload);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(parseApiError(err, "Registration failed."));
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-5">
      <fieldset
        disabled={isSubmitting}
        className="flex flex-col gap-5 border-none p-0 m-0"
      >
        <LabeledInput
          type="text"
          label="First Name"
          name="firstName"
          handler={control}
          errMsg={errors?.firstName?.message}
        />
        <LabeledInput
          type="text"
          label="Last Name"
          name="lastName"
          handler={control}
          errMsg={errors?.lastName?.message}
        />
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
        <LabeledInput
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          handler={control}
          errMsg={errors?.confirmPassword?.message}
        />

        <SelectInput
          label="Role"
          name="role"
          handler={control}
          errMsg={errors?.role?.message}
          options={[
            { value: "Student", label: "Student" },
            { value: "Teacher", label: "Teacher" },
            { value: "Admin", label: "Admin" },
          ]}
        />

        {selectedRole === "Student" && (
          <LabeledInput
            type="text"
            label="Roll Number"
            name="rollNumber"
            handler={control}
            errMsg={errors?.rollNumber?.message}
          />
        )}
      </fieldset>

      <div className="flex w-full gap-3 mt-4">
        <FormButton
          type="reset"
          variant="danger"
          txt="Cancel"
          disabled={isSubmitting}
        />
        <FormButton
          type="submit"
          txt={isSubmitting ? "Registering..." : "Register"}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
