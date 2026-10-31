
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import productReducer from "./features/productSlice";
import categoryReducer from "./features/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
  },
});
