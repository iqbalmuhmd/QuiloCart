import { useSelector } from "react-redux";
import { USER_ROLES, MERCHANT_STATUS } from "@/constants";

const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const role = auth.user?.role;
  const merchantStatus = auth.user?.merchant?.status ?? null;

  const isUser = role === USER_ROLES.USER;

  const isMerchant = role === USER_ROLES.MERCHANT;

  const isAdmin = role === USER_ROLES.ADMIN;

  const isApprovedMerchant = merchantStatus === MERCHANT_STATUS.APPROVED;

  const isPendingMerchant = merchantStatus === MERCHANT_STATUS.PENDING;

  const isRejectedMerchant = merchantStatus === MERCHANT_STATUS.REJECTED;

  const isBlockedMerchant = merchantStatus === MERCHANT_STATUS.BLOCKED;

  return {
    ...auth,
    isUser,
    isMerchant,
    isAdmin,
    merchantStatus,
    isApprovedMerchant,
    isPendingMerchant,
    isRejectedMerchant,
    isBlockedMerchant,
  };
};

export default useAuth;
