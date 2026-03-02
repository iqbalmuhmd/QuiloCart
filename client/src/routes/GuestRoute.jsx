import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { USER_ROLES, MERCHANT_STATUS } from "@/constants";

const GuestRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return children;
  }

  if (user.role === USER_ROLES.MERCHANT) {
    if (user.merchant?.status === MERCHANT_STATUS.PENDING) {
      return <Navigate to="/merchant/pending" replace />;
    }
    return <Navigate to="/merchant/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default GuestRoute;