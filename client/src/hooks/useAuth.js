import { useSelector } from "react-redux";
import { USER_ROLES, MERCHANT_STATUS } from "@/constants";

const useAuth = () => {
  const auth = useSelector((state) => state.auth);

  const isMerchant = auth.user?.role === USER_ROLES.MERCHANT;

  const isAdmin = auth.user?.role === USER_ROLES.ADMIN;

  const isApprovedMerchant =
    isMerchant && auth.user?.merchant?.status === MERCHANT_STATUS.APPROVED;

  const isPendingMerchant =
    isMerchant && auth.user?.merchant?.status === MERCHANT_STATUS.PENDING;

  return {
    ...auth,
    isMerchant,
    isAdmin,
    isApprovedMerchant,
    isPendingMerchant,
  };
};

export default useAuth;
