import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const MerchantRoute = ({ children }) => {
  const {
    isAuthenticated,
    isMerchant,
    isPendingMerchant,
    isApprovedMerchant,
    isRejectedMerchant,
    isBlockedMerchant,
  } = useAuth();

  const location = useLocation();
  const isPendingPage = location.pathname === "/merchant/pending";
  const isRejectedPage = location.pathname === "/merchant/rejected";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isMerchant) {
    return <Navigate to="/" replace />;
  }

  if (isRejectedMerchant && !isRejectedPage) {
    return <Navigate to="/merchant/rejected" replace />;
  }

  if (isPendingMerchant && !isPendingPage) {
    return <Navigate to="/merchant/pending" replace />;
  }

  if (isApprovedMerchant && (isPendingPage || isRejectedPage)) {
    return <Navigate to="/merchant/dashboard" replace />;
  }

  if (isBlockedMerchant) {
    return <Navigate to="/merchant/blocked" replace />;
  }

  if (!isApprovedMerchant && !isPendingMerchant && !isRejectedMerchant) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default MerchantRoute;
