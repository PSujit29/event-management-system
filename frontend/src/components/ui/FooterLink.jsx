import { NavLink } from "react-router-dom";


export const FooterLink = ({ href, children }) => {
  return (
    <NavLink className="text-white transition hover:text-white/75" to={href}>
      {children}
    </NavLink>
  );
};


export const IconLink = ({ href, children, label }) => {
  return (
    <NavLink className="text-white transition hover:text-white/75" to={href} target="_blank" rel="noreferrer">
      <span className="sr-only"> {label} </span>
      {children}
    </NavLink>
  );
}