import Merchant from "@/module/merchant/merchant.model";
import { USER_ROLES } from "@/utils/constants";

export const formatUserResponse = async (user) => {
  let merchant = null;
  if (user.role === USER_ROLES.MERCHANT) {
    const merchantDoc = await Merchant.findOne({ userId: user._id }).select(
      "status",
    );
    if (merchantDoc) merchant = { status: merchantDoc.status };
  }

  return {
    userId: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    merchant,
  };
};
