import api from "./axios";

export const getProductsAPI = async (page, limit, search, category_id, sort) => {
  const response = await api.get("/products", {
    params: {
        page, limit, search, category_id, sort
    }
  });
  return response.data;
};

export const createProductsAPI = async (data) => {
  const response = await api.post("/products", data);
  return response.data;
};

export const updateProductsAPI = async (id, data) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProductsAPI = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};