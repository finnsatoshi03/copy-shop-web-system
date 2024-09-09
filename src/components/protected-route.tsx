import { useAuth } from "@/contexts/AuthProvider";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/secret-passage-to-admin-dashboard" replace />;
  }

  return children;
}
