import axios from "axios";

const API_URL ="http://localhost:3000";

export const getTodosApi =
  async (userId) => {
    const response =
      await axios.get(
        `${API_URL}/todos`,
        { params: { userId } } 
      );

    return response.data;
};

export const createTodoApi =
  async (data) => {
    const response = await axios.post(`${API_URL}/todos`, data);
    return response.data;
};

export const deleteTodoApi = async (id) => {

  const response = await axios.delete(`${API_URL}/todos/${id}`);

  return response.data;
};

export const updateTodoApi = async (id, data) => {

  const response = await axios.patch(`${API_URL}/todos/${id}`, data);

  return response.data;
};