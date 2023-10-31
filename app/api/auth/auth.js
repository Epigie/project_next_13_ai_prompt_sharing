import apiClient from "./api-client.js";

const endpoint = "/auth";

export const loginApi = async (values) => {
  const user = await apiClient.post(`${endpoint}/login`, values);

  if (!user.ok) {
    throw { message: user?.data?.message, errors: user?.data?.errors };
  }

  return user?.data;
};

export const registerApi = async (values) => {
  const newUser = await apiClient.post(`${endpoint}/register`, values);

  if (!newUser.ok) {
    throw {
      message: newUser?.data?.message,
      errors: newUser?.data?.errors,
    };
  }
  return newUser?.data;
};
