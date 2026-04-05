import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { token, isInitialized } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return null; // Or <LoadingSpinner />
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
