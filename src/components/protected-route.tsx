import { useAuth } from "@/contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import { getToken } from "@/services/apiAuth";
import { isTokenExpired } from "@/lib/jwt";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isAdmin, logout } = useAuth();

  const token = getToken();

  if (!token || isTokenExpired(token)) {
    logout();
    return <Navigate to="/secret-passage-to-admin-dashboard" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/secret-passage-to-admin-dashboard" replace />;
  }

  return children;
}
