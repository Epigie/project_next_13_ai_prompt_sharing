import { getSession } from "next-auth/react";
import apiClient from "../apiclient.js";

const endpoint = "/user";

export const getInfo = async () => {
  const user = await apiClient.get(endpoint);
  if (!user?.ok) {
    throw { message: user?.data?.message, errors: user?.data?.errors };
  }

  return user?.data;
};

export const updateMe = async (updates) => {
  const updated_user = await apiClient.post(`${endpoint}`, updates);

  if (!updated_user.ok) {
    throw { message: "Failed to update user.", status: 500 };
  }

  return updated_user.data.data;
};

export const logout = async () => {
  const user = await apiClient.post(`${endpoint}/logout`);

  if (!user?.ok) {
    throw { message: user?.data?.message, errors: response?.data?.errors };
  }
  return user?.data;
};
