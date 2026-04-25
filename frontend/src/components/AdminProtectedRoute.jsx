import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function AdminProtectedRoute({ children }) {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (user?.role !== "ROLE_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminProtectedRoute;