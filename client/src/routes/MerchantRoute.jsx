import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const MerchantRoute = ({ children }) => {
  const { isAuthenticated, isMerchant, isPendingMerchant, isApprovedMerchant } =
    useAuth();

  const location = useLocation();
  const isPendingPage = location.pathname === "/merchant/pending";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isMerchant) {
    return <Navigate to="/" replace />;
  }

  if (isPendingMerchant && !isPendingPage) {
    return <Navigate to="/merchant/pending" replace />;
  }

  if (isApprovedMerchant && isPendingPage) {
    return <Navigate to="/merchant/dashboard" replace />;
  }

  if (!isApprovedMerchant && !isPendingMerchant) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default MerchantRoute;
