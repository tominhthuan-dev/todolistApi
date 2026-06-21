import axiosClient from "./axios/axiosClient";

export const getUsersApi = async () => {
  const response = await axiosClient.get(`/admin/users`);
  return response.data;
};
