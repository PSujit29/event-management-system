import { NavLink } from "react-router-dom";

export const RedirectLink = ({ to = "/", txt = "Go to Home", className = "", variant = "button" }) => {
  const variants = {
    button:
      "block w-full border border-slate-300 bg-white rounded-full text-center font-semibold transition-all duration-200 hover:bg-slate-100 hover:scale-[0.98] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1 py-1.5 px-3 text-[13px] sm:text-sm shadow-sm",

    link: "inline-block hover:underline font-semibold transition-colors duration-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-1 rounded-sm text-[12px] sm:text-[13px]",
  };

  return (
    <NavLink to={to} className={`text-slate-700 ${variants[variant]} ${className}`}>
      {txt}
    </NavLink>
  );
};
