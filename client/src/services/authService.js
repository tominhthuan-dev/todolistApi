import axios from "axios";

const API_URL =
  "http://localhost:3000";

export const loginApi = async (data) => {

  const response = await axios.post(
    `${API_URL}/auth/login`,
    data,
  );

  return response.data;
};