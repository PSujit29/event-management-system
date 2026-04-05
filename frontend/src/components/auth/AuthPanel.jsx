import { Heading1, SubHeading } from "../typography/heading";
import { Link } from "react-router-dom";

// 1. Left Side Panel
export const AuthLeftSidePanel = (authProps) => {
  const { title = "D - Hello World", children = <p>Lorem Epsum</p>, imageUrl = "" } = authProps;
  return (
    <aside
      className="hidden lg:flex lg:w-1/2 xl:w-1/3 flex-col gap-4 relative text-slate-50 justify-center p-8 overflow-hidden bg-slate-900"
      style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : "none", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Dark Blue Overlay to keep text readable */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900/90 via-slate-900/80 to-slate-800/70 z-0"></div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <Heading1 pageTitle={title} />
        <div className="flex flex-col text-slate-200 gap-y-2 text-center px-5 text-sm sm:text-base leading-relaxed">
          <SubHeading className="font-[cursive]">{children}</SubHeading>
        </div>
      </div>
    </aside>
  );
};

// 2. Right Side Panel
export const AuthRightSidePanel = (authProps) => {
  const { children } = authProps;
  return (
    <main className="flex flex-1 flex-col w-full lg:w-1/2 xl:w-2/3 bg-slate-100 justify-center items-center overflow-y-auto p-2 sm:p-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        {/* Keep link aligned with the form container width */}
        <Link to="/" className="mb-4 inline-flex text-slate-600 hover:text-slate-800">
          &larr; Back to Landing Page
        </Link>

        {children}
      </div>
    </main>
  );
};

// 3. Form Container
export const FormContainer = (formProps) => {
  const { children } = formProps;
  return (
    <div className="flex flex-col gap-y-3 bg-white p-4 sm:p-5 md:p-6 rounded-2xl border border-slate-200 shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
      {children}
    </div>
  );
};

// 4. Main Wrapper
export const AuthPanel = (authProps) => {
  const { children } = authProps;
  return <section className="flex flex-col lg:flex-row min-h-screen w-full bg-slate-50">{children}</section>;
};
