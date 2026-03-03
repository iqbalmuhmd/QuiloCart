import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const GuestRoute = ({ children }) => {
  const { isAuthenticated, isMerchant, isPendingMerchant, isApprovedMerchant } =
    useAuth();

  if (!isAuthenticated) {
    return children;
  }

  if (isMerchant) {
    if (isPendingMerchant) {
      return <Navigate to="/merchant/pending" replace />;
    }

    if (isApprovedMerchant) {
      return <Navigate to="/merchant/dashboard" replace />;
    }
  }

  return <Navigate to="/" replace />;
};

export default GuestRoute;
