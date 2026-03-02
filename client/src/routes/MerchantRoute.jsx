import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { USER_ROLES, MERCHANT_STATUS } from "@/constants";

const MerchantRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== USER_ROLES.MERCHANT) {
    return <Navigate to="/" replace />;
  }

  const isPendingPage = location.pathname === "/merchant/pending";

  if (user.merchant?.status === MERCHANT_STATUS.PENDING && !isPendingPage) {
    return <Navigate to="/merchant/pending" replace />;
  }

  if (user.merchant?.status === MERCHANT_STATUS.APPROVED && isPendingPage) {
    return <Navigate to="/merchant/dashboard" replace />;
  }

  return children;
};

export default MerchantRoute;
