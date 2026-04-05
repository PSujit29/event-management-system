import { useState } from "react";
import { NavLink } from "react-router-dom";
import { getToken } from "../../utils/storage.utils";
import logo from "./logo.avif";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = getToken();

  const navLinks = [
    { name: "Home", href: "/", end: true },
    { name: "Explore Events", href: "/explore" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Organizers", href: "/organizers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink className="flex items-center gap-2" to="/" onClick={() => setIsOpen(false)}>
          <img className="h-10 w-auto sm:h-12" src={logo} alt="Logo" />
        </NavLink>

        {/* Desktop Navigation */}
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[15px] font-medium text-slate-600">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  end={link.end}
                  className={({ isActive }) =>
                    `group relative inline-flex pb-1 transition ${isActive ? "text-[#1A325E]" : "text-slate-600 hover:text-[#1A325E]"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-[#F49425] transition-all duration-200 ${
                          isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                        }`}
                      ></span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {token ? (
              <NavLink
                className="rounded-lg bg-[#1A325E] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-105"
                to="/user"
              >
                Dashboard
              </NavLink>
            ) : (
              <>
                <NavLink className="rounded-lg px-5 py-2 text-sm font-semibold text-[#1A325E] transition hover:bg-slate-100" to="/login">
                  Login
                </NavLink>
                <NavLink
                  className="hidden sm:block rounded-lg bg-[#F49425] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#e0861d] transition-all"
                  to="/register"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex rounded-lg bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 md:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} border-t border-slate-100 bg-white p-4 space-y-2`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.href}
            end={link.end}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-base font-medium transition ${
                isActive
                  ? "bg-slate-50 text-[#1A325E] underline decoration-2 underline-offset-8 decoration-[#F49425]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#1A325E]"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
        {!token && (
          <NavLink
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg bg-[#F49425] px-4 py-3 text-center text-base font-semibold text-white sm:hidden"
          >
            Register
          </NavLink>
        )}
      </div>
    </header>
  );
}
