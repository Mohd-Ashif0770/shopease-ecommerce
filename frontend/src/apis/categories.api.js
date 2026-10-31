import api from "./axios";

export const getCategoriesAPI = async () => {
  const response = await api.get("/categories");
  return response.data;
};