import axiosClient from "./axios/axiosClient";

export const getTodosApi = async (userId) => {
  const token = localStorage.getItem("token");
    const response =
      await axiosClient.get(
        `/todos`,
        { 
          params: { userId }, 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const createTodoApi = async (data) => {
    const token = localStorage.getItem("token");
    const response = await axiosClient.post(
      `/todos`, 
      data, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
};

export const deleteTodoApi = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axiosClient.delete(
    `/todos/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const updateTodoApi = async (id, data) => {
  const token = localStorage.getItem("token");
  const response = await axiosClient.patch(
    `/todos/${id}`,
    data, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};