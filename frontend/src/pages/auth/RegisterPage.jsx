import { Heading1 } from "../../components/typography/heading";
import RegisterForm from "../../components/auth/RegisterForm";
import { RedirectLink } from "../../components/ui/AuthLink";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import registerPageImage from "../../assets/images/registerPage.avif";

export default function RegisterPage() {
  const outletContext = useOutletContext();
  useEffect(() => {
    outletContext.setSidePanel({
      title: "Register From Here",
      children: <p>Join us today and start managing your events effortlessly.</p>,
      imageUrl: registerPageImage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Heading1 pageTitle="Register" className="text-slate-900 underline decoration-orange-400 decoration-4 underline-offset-4" />
      <RegisterForm />
      <div className="text-center mt-2">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <RedirectLink to="/login" txt="Login here" variant="link" className="" />
      </div>
    </>
  );
}
