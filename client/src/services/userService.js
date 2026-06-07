import axios from "axios";

const API_URL = "http://localhost:3000";

export const getUsersApi = async () => {
  const response = await axios.get(`${API_URL}/admin/users`);
  return response.data;
};
