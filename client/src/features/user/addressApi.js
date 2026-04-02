import apiClient from "@/services/apiClient";

const ADDRESS_ROUTES = {
  ADDRESSES: "/addresses",
  ADDRESS_BY_ID: (id) => `/addresses/${id}`,
};

export const getAddresses = async () => {
  const response = await apiClient.get(ADDRESS_ROUTES.ADDRESSES);

  const data = response.data.data;

  return {
    addresses: data,
  };
};

export const createAddress = async (addressData) => {
  const response = await apiClient.post(ADDRESS_ROUTES.ADDRESSES, addressData);

  return response.data.data;
};

export const updateAddress = async (id, addressData) => {
  const response = await apiClient.patch(
    ADDRESS_ROUTES.ADDRESS_BY_ID(id),
    addressData,
  );

  return response.data.data;
};

export const deleteAddress = async (id) => {
  const response = await apiClient.delete(ADDRESS_ROUTES.ADDRESS_BY_ID(id));

  return response.data.data;
};

const addressApi = {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};

export default addressApi;
