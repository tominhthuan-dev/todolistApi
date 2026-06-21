import axiosClient from "./axios/axiosClient";


export const loginApi = async (data) => {
  const response = await axiosClient.post(
    `/auth/login`,
    data
  );
  // trả về { access_token: "..." }
  return response.data;
};

export const getProfileApi = async () => {
  const response = await axiosClient.get(`/admin/profile`);

  return response.data;
};

export const logoutApi = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken")
};

export const registerApi =  async (data) => {
  const response = await axiosClient.post(
    `/auth/register`,
    data
  );
  return response.data;
};

export const refreshTokenApi = async (refreshToken) => {
  const response = await axiosClient.post(
    "/auth/refresh",
    {
      refreshToken,
    }
  );
  return response.data;
};