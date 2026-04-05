import { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Layouts & Guards
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
import ProtectedRoute from "./guards/ProtectedRoute";
import RoleRoute from "./guards/RoleRoute";

// Misc Pages
const LandingPage = lazy(() => import("../pages/misc/LandingPage"));
const ExploreEventsPage = lazy(() => import("../pages/misc/ExploreEventsPage"));
const HowItWorksPage = lazy(() => import("../pages/misc/HowItWorksPage"));
const OrganizersPage = lazy(() => import("../pages/misc/OrganizersPage"));
const ContactPage = lazy(() => import("../pages/misc/ContactPage"));
const Error404 = lazy(() => import("../pages/misc/Error404"));

// Auth Pages
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const ForgetPasswordPage = lazy(() => import("../pages/auth/ForgetPasswordPage"));

// Dashboard Pages
const OrganizerDashboardPage = lazy(() => import("../pages/dashboard/OrganizerDashboardPage"));
const StudentDashboardPage = lazy(() => import("../pages/dashboard/StudentDashboardPage"));

// Event Pages
const EventListPage = lazy(() => import("../pages/events/EventListPage"));
const EventDetailPage = lazy(() => import("../pages/events/EventDetailPage"));
const CreateEventPage = lazy(() => import("../pages/events/CreateEventPage"));
const EditEventPage = lazy(() => import("../pages/events/EditEventPage"));
const EventAttendeesPage = lazy(() => import("../pages/events/EventAttendeesPage"));
const MyEventsPage = lazy(() => import("../pages/events/MyEventsPage"));
const ProfilePage = lazy(() => import("../pages/user/ProfilePage"));
const SettingsPage = lazy(() => import("../pages/user/SettingsPage"));

// Template Pages
const TemplateListPage = lazy(() => import("../pages/templates/TemplateListPage"));
const TemplateDetailPage = lazy(() => import("../pages/templates/TemplateDetailPage"));
const CloneTemplatePage = lazy(() => import("../pages/templates/CloneTemplatePage"));

function DashboardHomePage() {
  const { user } = useAuth();
  const role = (user?.role || "").toLowerCase();

  if (role === "student") return <StudentDashboardPage />;
  if (role === "admin" || role === "teacher") return <OrganizerDashboardPage />;

  return <Navigate to="/user/events" replace />;
}

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/explore", element: <ExploreEventsPage /> },
  { path: "/how-it-works", element: <HowItWorksPage /> },
  { path: "/organizers", element: <OrganizersPage /> },
  { path: "/contact", element: <ContactPage /> },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forget-password", element: <ForgetPasswordPage /> },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHomePage /> },
      {
        path: "dashboard",
        element: (
          <RoleRoute allowedRoles={["Student"]}>
            <StudentDashboardPage />
          </RoleRoute>
        ),
      },

      { path: "events", element: <EventListPage /> },
      {
        path: "events/create",
        element: (
          <RoleRoute allowedRoles={["Admin", "Teacher"]}>
            <CreateEventPage />
          </RoleRoute>
        ),
      },
      { path: "events/:eventId", element: <EventDetailPage /> },
      { path: "events/edit/:eventId", element: <EditEventPage /> },
      {
        path: "events/:eventId/attendees",
        element: (
          <RoleRoute allowedRoles={["Admin", "Teacher"]}>
            <EventAttendeesPage />
          </RoleRoute>
        ),
      },
      {
        path: "templates",
        element: (
          <RoleRoute allowedRoles={["Admin", "Teacher"]}>
            <TemplateListPage />
          </RoleRoute>
        ),
      },
      {
        path: "templates/:templateId",
        element: (
          <RoleRoute allowedRoles={["Admin", "Teacher"]}>
            <TemplateDetailPage />
          </RoleRoute>
        ),
      },
      {
        path: "templates/:templateId/clone",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <CloneTemplatePage />
          </RoleRoute>
        ),
      },

      { path: "me", element: <ProfilePage /> },
      {
        path: "me/events",
        element: (
          <RoleRoute allowedRoles={["Student"]}>
            <MyEventsPage />
          </RoleRoute>
        ),
      },

      { path: "settings", element: <SettingsPage /> },
    ],
  },
  { path: "*", element: <Error404 /> },
]);

function RouteLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" aria-hidden="true" />
        <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-orange-500">Loading route</p>
        <p className="mt-2 text-sm text-slate-600">Preparing your page...</p>
      </div>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
