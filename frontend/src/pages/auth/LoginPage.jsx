import LoginForm from "../../components/auth/LoginForm";
import { Heading1 } from "../../components/typography/heading";
import { RedirectLink } from "../../components/ui/AuthLink";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import loginPageImage from "../../assets/images/loginPage.avif";

export default function LoginPage() {
  //Read outlet context:
  const outletContext = useOutletContext();
  useEffect(() => {
    outletContext.setSidePanel({ title: "Login From Here", children: <p>Welcome back! Its been some while</p>, imageUrl: loginPageImage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Heading1 pageTitle="Login" className="text-slate-900 underline decoration-orange-400 decoration-4 underline-offset-4" />
      <LoginForm />
      <div className="text-center mt-4">
        <span className="text-[13px] sm:text-sm text-gray-600">Don't have an account? </span>
        <RedirectLink to="/register" txt="Register here" variant="link" className="not-italic no-underline font-semibold hover:underline" />
      </div>
    </>
  );
}
