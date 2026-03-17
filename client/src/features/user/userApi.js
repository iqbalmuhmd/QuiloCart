import apiClient from "@/services/apiClient";

const USER_ROUTES = {
  PROFILE: "/profile",
};

export const getProfile = async () => {
  const response = await apiClient.get(USER_ROUTES.PROFILE);

  const data = response.data.data;

  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    avatar: data.avatar,
  };
};

export const updateProfile = async (profileData) => {
  const response = await apiClient.patch(USER_ROUTES.PROFILE, profileData);

  return response.data.data;
};

const userApi = {
  getProfile,
  updateProfile,
};

export default userApi;
