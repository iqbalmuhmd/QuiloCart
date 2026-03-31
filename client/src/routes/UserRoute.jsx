import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const UserRoute = ({ children }) => {
  const { isAuthenticated, isUser, isMerchant, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isUser) {
    if (isMerchant) return <Navigate to="/merchant/dashboard" replace />;
    if (isAdmin) return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserRoute;
