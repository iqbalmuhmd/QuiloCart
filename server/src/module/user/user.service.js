import { ApiError } from "@/utils/ApiError";
import User from "./user.model";

export const getProfileService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const updateProfileService = async (userId, data) => {
  const { name, phone, avatar } = data;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (name !== undefined) user.name = name;
  if (phone !== undefined) user.phone = phone;
  if (avatar !== undefined) user.avatar = phone;

  await user.save();

  return user;
};

export const createAddressService = async (userId, data) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (data.isDefault) {
    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });
  }

  user.addresses.push(data);

  await user.save();

  return user.addresses[user.addresses.length - 1];
};

export const getAddressesService = async (userId) => {
  const user = await User.findById(userId).select("addresses");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user.addresses;
};

export const updateAddressService = async (userId, addressId, data) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const address = user.addresses.id(addressId);

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  if (data.isDefault) {
    user.addresses.forEach((addr) => {
      addr.isDefault = false;
    });
  }

  Object.assign(address, data);

  await user.save();

  return address;
};

export const deleteAddressService = async (userId, addressId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const address = user.addresses.id(addressId);

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  address.deleteOne();

  await user.save();
};