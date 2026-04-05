import { NavLink } from "react-router-dom";
import { HiChartPie, HiCalendar, HiUserGroup, HiTemplate, HiUserCircle, HiCog } from "react-icons/hi";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NAV_PATHS = {
  USER_HOME: "/user",
  EVENTS: "/user/events",
  EVENT_CREATE: "/user/events/create",
  MY_EVENTS: "/user/me/events",
  TEMPLATES: "/user/templates",
  PROFILE: "/user/me",
  SETTINGS: "/user/settings",
};

const NAV_ITEMS = [
  { name: "Dashboard", to: NAV_PATHS.USER_HOME, end: true, icon: HiChartPie, roles: ["student", "admin", "teacher"] },
  { name: "Events", to: NAV_PATHS.EVENTS, end: false, icon: HiCalendar, roles: ["student", "admin", "teacher"] },
  { name: "My Events", to: NAV_PATHS.MY_EVENTS, end: true, icon: HiUserGroup, roles: ["student"] },
  { name: "Templates", to: NAV_PATHS.TEMPLATES, end: false, icon: HiTemplate, roles: ["admin", "teacher"] },
  { name: "Profile", to: NAV_PATHS.PROFILE, end: true, icon: HiUserCircle, roles: ["student", "admin", "teacher"] },
  { name: "Settings", to: NAV_PATHS.SETTINGS, end: false, icon: HiCog, roles: ["student", "admin", "teacher"] },
];

export const UserSidebar = ({ isMobileOpen = false, onMobileClose = () => {} }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [confirmId, setConfirmId] = useState(null);
  const handleAction = (fn, msg) => {
    fn();
    toast.success(msg);
    onMobileClose();
    navigate("/login", { replace: true });
  };

  const handleConfirm = (id, action) => {
    if (confirmId === id) {
      action();
      setConfirmId(null);
    } else {
      setConfirmId(id);
      setTimeout(() => setConfirmId(null), 3000);
    }
  };

  const role = (user?.role || "").toLowerCase();
  const navLinks = NAV_ITEMS.filter((item) => (role ? item.roles.includes(role) : item.roles.includes("student")));

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 bg-white text-slate-900 border-r border-slate-200 z-20">
        <div className="text-xl font-bold pl-10 p-2 tracking-wide border-b border-slate-200">
          Event Manager
          <div className="text-xs font-medium text-slate-500 mt-1">{user?.role || "User"} Console</div>
        </div>
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors font-medium ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm border-l-4 border-orange-500"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => handleConfirm("logout", () => handleAction(logout, "Logged out"))}
          className={`flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all border ${
            confirmId === "logout"
              ? "bg-red-50 border-red-200 text-red-600 shadow-sm"
              : "bg-white border-slate-200 text-red-600 hover:bg-red-50 hover:border-red-100 hover:text-red-600"
          }`}
        >
          <HiArrowRightOnRectangle className={`w-4 h-4 ${confirmId === "logout" ? "text-red-600" : "text-red-500"}`} />
          {confirmId === "logout" ? "Confirm Sign Out?" : "Sign Out"}
        </button>
      </aside>

      <div
        onClick={onMobileClose}
        className={`fixed inset-0 z-40 bg-slate-900/35 transition-opacity duration-200 md:hidden ${
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-white text-slate-900 shadow-xl transition-transform duration-200 md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="text-xl font-bold pl-6 p-4 tracking-wide border-b border-slate-200">
          Event Manager
          <div className="text-xs font-medium text-slate-500 mt-1">{user?.role || "User"} Console</div>
        </div>
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              end={link.end}
              onClick={onMobileClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors font-medium ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm border-l-4 border-orange-500"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => handleConfirm("logout", () => handleAction(logout, "Logged out"))}
          className={`mx-4 mb-4 flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all border ${
            confirmId === "logout"
              ? "bg-red-50 border-red-200 text-red-600 shadow-sm"
              : "bg-white border-slate-200 text-red-600 hover:bg-red-50 hover:border-red-100 hover:text-red-600"
          }`}
        >
          <HiArrowRightOnRectangle className={`w-4 h-4 ${confirmId === "logout" ? "text-red-600" : "text-red-500"}`} />
          {confirmId === "logout" ? "Confirm Sign Out?" : "Sign Out"}
        </button>
      </aside>
    </>
  );
};
