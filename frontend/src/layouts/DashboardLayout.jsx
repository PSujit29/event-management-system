import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { UserHeader, UserSidebar } from "../components/user";

export default function UserLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => setIsMobileSidebarOpen(false), 0);
  }, [location]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <UserSidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 flex flex-col bg-gray-100 w-full">
        <UserHeader onMenuClick={() => setIsMobileSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
