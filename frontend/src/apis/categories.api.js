import api from "./axios";

export const getCategoryAPI = async () => {
  const response = await api.get("/categories");
  return response.data;
};