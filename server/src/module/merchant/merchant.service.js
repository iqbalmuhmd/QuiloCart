import User from "@/module/user/user.model";
import Merchant from "./merchant.model";
import { ApiError } from "@/utils/ApiError";
import { USER_ROLES } from "@/utils/constants";
import { MERCHANT_STATUS } from "@/utils/constants";
import { withTransaction } from "@/utils/withTransaction";

export const registerMerchantService = async ({
  name,
  email,
  password,
  storeName,
  storeDescription,u
}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(409, "Email already exists");

  return withTransaction(async (session) => {
    const [user] = await User.create(
      [
        {
          name,
          email,
          password,
          role: USER_ROLES.MERCHANT,
        },
      ],
      { session },
    );

    const [merchant] = await Merchant.create(
      [
        {
          userId: user._id,
          storeName,
          storeDescription,
          status: MERCHANT_STATUS.PENDING,
        },
      ],
      { session },
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      merchant: {
        storeName: merchant.storeName,
        status: merchant.status,
      },
    };
  });
};
