import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function RoleRoute({ allowedRoles = [], children }) {
  const { user } = useAuth();
  const role = (user?.role || "").toLowerCase();
  const isAllowed = allowedRoles.some((r) => r.toLowerCase() === role);

  if (!isAllowed) {
    return <Navigate to="/user/events" replace />;
  }

  return children;
}
