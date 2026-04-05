import { Button as AppButton } from "../ui/AppButton";

const formToUiVariant = { primary: "default", secondary: "secondary", danger: "destructive" };

export const FormButton = ({ txt = "Button", type = "button", variant = "primary", className = "", ...props }) => {
  const mappedVariant = formToUiVariant[variant] || "default";

  return (
    <AppButton
      type={type}
      variant={mappedVariant}
      className={`w-full py-1.5 px-3 text-[13px] sm:text-sm font-semibold transition-all duration-200 transform active:scale-95 hover:scale-[0.98] ${className}`}
      {...props}
    >
      {txt}
    </AppButton>
  );
};
