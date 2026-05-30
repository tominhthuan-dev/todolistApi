import axios from "axios";

const API_URL = "http://localhost:3000";

export const getUsersApi = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};
